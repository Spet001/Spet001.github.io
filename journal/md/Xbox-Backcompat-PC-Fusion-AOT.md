# Microsoft's New OG Xbox PC Backcompat Is Actually an Xbox 360 AOT Recomp (And Why Pre-Haswell CPUs Crash)

> **Technical Scope:**  
> - **Target:** *Star Wars: Knights of the Old Republic II* (Microsoft Store / GDK PC release, `EmuMenu 2611.1009.5900.0`)  
> - **Runtime:** `Emu.exe` (Project *Fusion*, ~1 MB) + Phoenix (`Phx`) AOT-compiled `xeo3_*.dll` and `xefu_*.dll` modules  
> - **Test Hardware:** Intel Core i5-3470 (Ivy Bridge, 2012; AVX1 + SSE4.2, no `MOVBE` or `AVX2`) + NVIDIA GeForce RTX 3050  
> - **Author:** Eduardo Gelain (SpetDev) · November 12, 2026

---

Microsoft pushed its official Original Xbox backward compatibility runtime to PC today. Grabbing *Star Wars: Knights of the Old Republic II* from the Microsoft Store immediately revealed something unexpected in the game directory: even though KOTOR II is a 2004 Original Xbox title, the PC wrapper isn't emulating the original Xbox directly. It is running the **Xbox 360** backward compatibility stack (`xb1krnl.exe`, `hud.xex`, `huduiskin.xex`, `ximecore.xex`, `TDATA`) inside a 1 MB host executable named `Emu.exe` (codename *Fusion*).

On an older Intel Core i5-3470 (Ivy Bridge, 2012), the game crashes right after launch with `0xC000001D` (`STATUS_ILLEGAL_INSTRUCTION`). Because the game folder sits next to a full set of `_no.dll` ("No Optimizations") fallback modules that Microsoft left behind, I disassembled the binaries and wrote a quick `XmlLite.dll` IAT proxy to force those fallback DLLs into Slot 0 and see if pre-Haswell hardware could boot it.

---

## 1. How `Emu.exe` Actually Works (Spoiler: There Is No JIT)

Anyone expecting a dynamic PowerPC recompiler like Xenia inside `Emu.exe` won't find one. At roughly 1 MB, `Emu.exe` contains zero PowerPC interpreter or JIT code. Instead, it acts as a micro-hypervisor and hardware host:

| Subsystem | Evidence Inside `Emu.exe` |
| :--- | :--- |
| **Guest Address Space** | `setup_guest_memory_layout` reserves **8 GB contiguous** via `VirtualAlloc2` and placeholders, then maps views with `MapViewOfFile3` to mirror the Xbox 360 virtual memory map. |
| **Kernel & Hypervisor** | Exposes `GuestAllocatePages`, `GuestProtectPages`, `GuestQueryPages`, and strings like `Illegal hypervisor API %s ordinal %d invoked. Guest IAR=%x LR=%x` and `KeStartGuestProcessor() ... Xenon Idle thread`. |
| **Storage & OG Xbox Layer** | Mounts virtual partitions for `Harddisk`, `Flash`, `FlashWriteable`, and `TDATA` (OG Xbox save/title data), plus XEX replacement hashing. |
| **GPU & Windowing** | Creates `XeO3 Window`, spawns `VBlank Timer` and `GPU Timer` threads (`InitGpuAndTimers`), and loads `VGPUDX12.dll`, `D3D12Core.dll`, and `dxcompiler.dll` from the app directory (with `VGPUNULL.dll` as a fallback string). |

All actual PowerPC code (the Xbox 360 kernel, the HUD, system libraries, and the game binary itself) was **statically ahead-of-time (AOT) compiled** on Microsoft's build servers using the **Phoenix Compiler (`Phx`)** backend. Internal PDB paths left in the binaries confirm the pipeline:

```text
F:\_work\1\titles.bin\Release\x64\ppc\system\free\Fusion\xb1krnlPri\xefu_69c41281_00027bcf.pdb
```

During startup, `Emu.exe` calls `InitializePrecompiledDll` (`0x140075350` / `sub_1400740E0` -> `sub_1400746F0`), loads the AOT-compiled DLLs via `LoadLibraryW`, and resolves four exported symbols: `InitPrecompiledDll`, `CleanupPrecompiledDll`, `PrecompiledPointers`, and `PrecompiledImportTable`. `Emu.exe` populates `PrecompiledPointers` with host callbacks so Xbox 360 kernel syscalls call straight back into the hypervisor.

---

## 2. Why Ivy Bridge Fails: `MOVBE`, `AVX2`, and the Missing `_no.dll` Files

`Emu.exe` itself is compiled with `/arch:AVX` (`FUN_140048620` uses `VPXOR`, `VMOVUPS`, and `VMOVDQU` while logging `Host CPU processor: %s`). Since the Core i5-3470 supports AVX1, `Emu.exe` clears its own CPU checks cleanly.

The illegal instruction fault happens inside the AOT DLLs. PowerPC is big-endian and x86-64 is little-endian, so Microsoft's Phoenix backend emits `MOVBE` everywhere for byte-swapped memory loads and stores. Hardware support for `MOVBE` arrived in 2013 with Intel Haswell and AMD Jaguar (Xbox One). Ivy Bridge missed it by one generation.

In the game folder, almost every `xeo3_*.dll` module ships alongside an unoptimized `*_no.dll` twin that replaces `MOVBE` with standard `MOV` + `BSWAP` sequences. Running `pefile` and `capstone` locally across the modules exposed two problems with assuming `_no.dll` alone fixes pre-Haswell compatibility:

| Module | Size (bytes) | Has `_no.dll`? | `MOVBE` Count | `ymm` / AVX2 Findings |
| :--- | ---: | :---: | :--- | :--- |
| `xeo3_5fb3687c_001748c4.dll` (Slot 0 kernel) | 1,285,120 | Yes (3,817,984) | **19,056** (first at `0x180001031`) | 1,055 AVX1 float `ymm` (`vcvtps2pd`), **0** AVX2 `vp* ymm` |
| `xeo3_5fb3687c_001748c4_no.dll` (Slot 1 fallback) | 3,817,984 | — | **0** (uses `BSWAP`) | 1,141 AVX1 float `ymm`, **0** AVX2 `vp* ymm` |
| `xefu_69c41281_00027bcf.dll` (`xb1krnl.exe`) | 1,656,832 | **No** | Present (`0x180001021`) | 0 `ymm` |
| `xefu_c9e3cbd7_976c5a9b_961b6528_2fbd8470_d5f46859.dll` | 64,007,680 | **No** | Present (`0x180008179`) | **Contains AVX2 integer `ymm`**: `vpmaddwd`, `vpsubd`, `vpslld`, `vpaddsw`, `vpsubusb`, `vpcmpeqw` |

Both `xefu_*.dll` modules lack `_no.dll` counterparts, and the 64 MB main binary uses integer AVX2 instructions (`vpmaddwd` at `0x1807211e5`, `vpsubd` at `0x180fa3d37`, `vpcmpeqw` at `0x181f04e8d`) on top of `MOVBE`.

---

## 3. Intercepting `LoadLibraryW` with an `XmlLite.dll` IAT Proxy

Static patching of `Emu.exe` breaks its Authenticode signature and triggers silent GDK integrity termination, and launching `Emu.exe` directly without `EmuMenu.exe` arguments exits immediately. Checking `IMAGE_DIRECTORY_ENTRY_IMPORT` and `IMAGE_DIRECTORY_ENTRY_DELAY_IMPORT` on `Emu.exe` also showed it does not import `version.dll` at all.

Instead, `Emu.exe` imports `XmlLite.dll` (only `CreateXmlReader`), which is not on Windows' `KnownDLLs` list. There is one catch: `gamelaunchhelper.exe` (via `gameplatformservices.dll`) also loads `XmlLite.dll` from the game folder and requires `CreateXmlWriter`. Forwarding all 6 real exports from `System32\XmlLite.dll` and restricting the IAT hook to `Emu.exe` keeps the launcher happy.

Here is the core of the proxy (`proxy_xmllite.cpp`) used to redirect Slot 0 `xeo3_*` loads to `*_no.dll` and clone Slot 1 into `*_no_s1.dll` so both slots keep distinct `HMODULE`s and `.data` segments:

```cpp
static std::wstring ResolveNoOptPath(LPCWSTR lpLibFileName) {
    if (!lpLibFileName) return L"";
    std::wstring path(lpLibFileName);

    size_t slashPos = path.find_last_of(L"\\/");
    std::wstring fileName = (slashPos == std::wstring::npos) ? path : path.substr(slashPos + 1);

    bool isTargetPrefix = (_wcsnicmp(fileName.c_str(), L"xeo3_", 5) == 0) ||
                          (_wcsnicmp(fileName.c_str(), L"xefu_", 5) == 0);
    if (!isTargetPrefix) return path;

    // Clone Slot 1 (*_no.dll -> *_no_s1.dll) to isolate global .data state between slots
    if (fileName.size() >= 7 && _wcsicmp(fileName.c_str() + fileName.size() - 7, L"_no.dll") == 0) {
        if (!g_ModuleDir.empty()) {
            std::wstring s1Name = fileName.substr(0, fileName.size() - 4) + L"_s1.dll";
            std::wstring s1Path = g_ModuleDir + s1Name;
            if (GetFileAttributesW(s1Path.c_str()) == INVALID_FILE_ATTRIBUTES) {
                CopyFileW(path.c_str(), s1Path.c_str(), FALSE);
            }
            if (GetFileAttributesW(s1Path.c_str()) != INVALID_FILE_ATTRIBUTES) {
                LogShim(L"[SLOT1-CLONE] %s -> %s", path.c_str(), s1Path.c_str());
                return s1Path;
            }
        }
        return path;
    }

    // Redirect Slot 0 (*.dll -> *_no.dll) when an unoptimized build exists
    if (path.size() >= 4 && _wcsicmp(path.c_str() + path.size() - 4, L".dll") == 0) {
        std::wstring noOptPath = path.substr(0, path.size() - 4) + L"_no.dll";
        if (GetFileAttributesW(noOptPath.c_str()) != INVALID_FILE_ATTRIBUTES) {
            LogShim(L"[REDIRECT] %s -> %s", path.c_str(), noOptPath.c_str());
            return noOptPath;
        }
    }

    return path;
}

HMODULE WINAPI Hooked_LoadLibraryW(LPCWSTR lpLibFileName) {
    std::wstring target = ResolveNoOptPath(lpLibFileName);
    return Orig_LoadLibraryW(target.c_str());
}

HMODULE WINAPI Hooked_LoadLibraryExW(LPCWSTR lpLibFileName, HANDLE hFile, DWORD dwFlags) {
    std::wstring target = ResolveNoOptPath(lpLibFileName);
    return Orig_LoadLibraryExW(target.c_str(), hFile, dwFlags);
}
```

In `DllMain`, `IsTargetProcessEmu()` checks `GetModuleFileNameW(nullptr, ...)` for `Emu.exe` before patching `KERNEL32.dll!LoadLibraryW` and `KERNEL32.dll!LoadLibraryExW` in the executable's IAT.

### What Happened at Runtime

Redirecting `xeo3_5fb3687c_001748c4.dll` to `xeo3_5fb3687c_001748c4_no.dll` immediately eliminated the `0xC000001D` boot crash. `Emu.exe` logged the `i5-3470`, selected the **NVIDIA GeForce RTX 3050**, allocated every VGPU D3D12 descriptor and resource heap (`SamplerHeap`, `GuestConstantBufferHeap`, `GuestShadowedTextureHeap`), and entered Xbox 360 thread scheduling.

Then it died inside `EmulatorSwapThreads` (`0x14007c077`):

```text
(3844) GENERAL Host CPU processor:         Intel(R) Core(TM) i5-3470 CPU @ 3.20GHz
(3844) GRAPHICS Selected GPU processor: NVIDIA GeForce RTX 3050
(40f8) GENERAL FATAL ERROR - Swaping to or from a non-existant thread:
     OldThread==0x80140300
     NewThread==0x80140164
```

Cloning Slot 1 into `xeo3_5fb3687c_001748c4_no_s1.dll` confirmed the crash wasn't caused by shared `.data` state across a single `HMODULE`:

```text
[INIT] XmlLite.dll proxy attached to Emu.exe (PID=9636).
[IAT] Patched KERNEL32.dll!LoadLibraryW
[IAT] Patched KERNEL32.dll!LoadLibraryExW
[REDIRECT] ...\xeo3_5fb3687c_001748c4.dll -> ...\xeo3_5fb3687c_001748c4_no.dll
[SLOT1-CLONE] ...\xeo3_5fb3687c_001748c4_no.dll -> ...\xeo3_5fb3687c_001748c4_no_s1.dll
```

Even with isolated `HMODULE`s, running `xeo3_5fb3687c_001748c4_no.dll` in Slot 0 leaves thread `0x80140300` or `0x80140164` missing from `Emu.exe`'s internal thread map when `EmulatorSwapThreads` executes.

---

## 4. Microsoft *Fusion* vs. Community Static Recompilation (`XenonRecomp` / `N64Recomp`)

Both Microsoft's *Fusion* runtime and community static recompilers like `XenonRecomp` and `N64Recomp` start from the same premise: translate console machine code ahead of time instead of burning CPU cycles on a runtime JIT. Their engineering trade-offs diverge quickly from there:

| Dimension | Microsoft *Fusion* (`Emu.exe` + `xeo3`/`xefu`) | Community Static Recomps (`XenonRecomp`, `N64Recomp`) |
| :--- | :--- | :--- |
| **Translator Output** | Closed x86-64 binary DLLs emitted directly by Microsoft's **Phoenix (`Phx`)** backend. | Lifts PowerPC/MIPS to portable **C/C++ source**, compiled locally with Clang, GCC, or MSVC. |
| **CPU ISA Lock-in** | Locked at build time. Unpaired `xefu_*` DLLs hardcode `MOVBE` + `AVX2`, breaking pre-Haswell CPUs. | Target-agnostic. Compile without `-march=haswell` / `-mavx2` and the same game runs on Ivy Bridge, Core 2, Linux, or ARM64. |
| **OS / Kernel Model** | Recompiles the full 360 OS (`xb1krnl.exe`, `hud.xex`, `xeo3_*`) inside a micro-hypervisor. | **HLE (High-Level Emulation):** recompiles only the game executable and reimplements kernel syscalls natively in C++. |
| **Endianness** | Emitted directly as `MOVBE` (optimized) or `MOV` + `BSWAP` (`_no.dll`) in AOT assembly. | Expressed via C++ byteswap intrinsics (`_byteswap_*` / `__builtin_bswap*`), leaving instruction selection to the local compiler. |
| **Catalog Scalability** | Built for batch-converting dozens of certified titles without per-game HLE rewrites. | Hand-tuned per title (jump tables, indirect calls, custom HLE), yielding modifiable open-source ports. |

---

## 5. Where This Leaves Pre-Haswell Hardware

Pure `_no.dll` redirection cannot boot the runtime on Ivy Bridge for two independent reasons: `xeo3_5fb3687c_001748c4_no.dll` triggers `EmulatorSwapThreads` (`Swaping to or from a non-existant thread`) when forced into Slot 0, and neither `xefu_69c41281_00027bcf.dll` (`MOVBE`) nor the 64 MB `xefu_c9e3cbd7_...dll` (`MOVBE` + `AVX2`) has a `_no.dll` build at all.

Any software workaround on pre-Haswell CPUs would need a process-wide `AddVectoredExceptionHandler` (VEH) catching `0xC000001D` across the original DLLs to decode and emulate `MOVBE` and `AVX2` instructions in software, or dynamic binary rewriting of `MOVBE` -> `BSWAP` on private memory pages. Because PowerPC guest code executes `MOVBE` on almost every big-endian memory access, kernel-to-user exception trapping in hot loops would tank frame rates even if it reached the title screen. On Haswell (4th Gen Intel) or Excavator (AMD) and newer, the unmodified binaries run natively.
