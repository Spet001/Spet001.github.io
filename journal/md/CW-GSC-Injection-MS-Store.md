# Dynamic Memory Pattern Scanning for Cold War GSC Injection (MS Store / UWP)

A deep-dive into the architectural differences between Steam/BNet and Microsoft Store builds of *Call of Duty: Black Ops Cold War*, and how to implement a lightweight, zero-dependency C++ injector using dynamic heuristic memory scanning for GSC (Game Script Code) injection.

## 1. The Hardcoded Offset Bottleneck

Traditional GSC injection tools rely heavily on statically hardcoded offsets to resolve Treyarch's global asset pool pointers, specifically `s_assetPool:ScriptParseTree`. 

On Steam and Battle.net client builds, this offset was commonly hardcoded to `0x1273c9f0` (relative to the module base). However, attempting to dereference this offset on the Microsoft Store (UWP) version resulted in out-of-bounds reads or null pointer exceptions, as the UWP memory layout is inherently different due to the containerized application model and different compiler optimizations.

## 2. Reconstructing the Resolver Signature

To bypass the reliance on static offsets, I performed dynamic binary analysis by attaching `x64dbg` to the suspended game process. By analyzing xrefs (cross-references) to known asset strings such as `"zm_common"` and `"core_bootstrap"`, I traced the execution flow to the core script asset resolver function.

The initial function prologue was identified as follows:
```assembly
.text:00007FF6638BCEB0  48 89 6C 24 18     mov     [rsp-arg_18], rbp
.text:00007FF6638BCEB5  56                 push    rsi
.text:00007FF6638BCEB6  57                 push    rdi
.text:00007FF6638BCEB7  41 57              push    r15
.text:00007FF6638BCEB9  48 83 EC 28        sub     rsp, 28h
.text:00007FF6638BCEBD  8B F1              mov     esi, ecx
.text:00007FF6638BCEBF  4C 8D 0D A2 CD A1  lea     r9, unk_7FF6642D9C78
```

This sequence yielded the following byte pattern signature:
`48 89 6C 24 18 56 57 41 57 48 83 EC 20 8B F1 4C 8D 0D ?? ?? ?? ??`

### Compiler Variation Challenges
Upon further investigation, the stack allocation delta inside the prologue varied across platform builds:
* **Steam/BNET**: Subtracted `20h` from `RSP` (`48 83 EC 20`)
* **MS Store / Xbox App**: Subtracted `28h` from `RSP` (`48 83 EC 28`)

To construct a universal signature, the stack operand was wildcarded:
`48 89 6C 24 18 56 57 41 57 48 83 EC ?? 8B F1 4C 8D 0D ?? ?? ?? ??`

Furthermore, the condition check for the injection hook differed in register allocation. The MS Store binary utilized `R9` relative addressing compared to the Steam binary:
```assembly
.text:00007FF6638BCED9  41 39 71 1C        cmp     [r9+1Ch], esi
.text:00007FF6638BCEDD  75 1D              jnz     short loc_7FF6638BCF2F
```
Steam/BNet matched `44 39 71 ?? 75 ??`, whereas MS Store required `41 39 71 ?? 75 ??`.

## 3. Transitioning to Dynamic Heuristic Scanning

Given the fragility of function-level signature hooking, I pivoted to a dynamic heuristic memory scanning approach, heavily inspired by the elegant memory resolution implemented in *Atian CoD Tools*.

Instead of hooking the resolver function, the tool scans the `.text` segment for the instruction sequence that directly loads the `g_assetPools` array base:
`48 8D 05 ? ? ? ? 48 C1 E2 ? 48 03 D0`

This instruction computes an RIP-relative pointer. My implementation dynamically reads the 32-bit offset (`curr + 7 + delta`), resolves the absolute memory address, and indexes directly into the asset table for `ASSET_TYPE_SCRIPTPARSETREE` (index `68`).

## 4. Engineering the Lightweight Injector

With the memory pointers resolved dynamically, I architected a standalone C++ injector focused on performance and stability:

* **Bounded Memory Heuristics**: The scanner is strictly confined to the module's mapped boundaries (`baseAddress` to `baseAddress + size`). This prevents the costly overhead of querying the entire 64-bit virtual address space, significantly reducing RAM utilization and execution time.
* **Zero-Fragmentation Block Reader**: Implemented a static stack-allocated block read buffer, eliminating heap fragmentation during large memory read operations.
* **FNV-1a Hash Asset Resolution**: Implements Treyarch's proprietary case-insensitive 63-bit FNV-1a hash algorithm to deterministically match target scripts (e.g., `scripts/zm_common/load.gsc`) in the asset pool.
* **Struct Alignment Safety**: Enforces strict `T9GSCOBJ` struct layout mapping to prevent memory alignment corruption, a common cause of segmentation faults during GSC injection.

### Acknowledgements
* **Atian** ([atian-cod-tools](https://github.com/ate47/atian-cod-tools)) - For the foundational research into dynamic asset pool resolution in the Black Ops engine.
