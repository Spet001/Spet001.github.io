# Exploring Legacy UWP Titles: Hooking Undocumented WinRT Store APIs, COD Points Ingestion & UWP Dumper Injection

An engineering case study on reverse engineering legacy Windows 10 UWP games (*Call of Duty: Infinite Warfare*), weaponizing UWP Dumper's suspended process lifecycle for AppContainer DLL injection, VMT hooking the undocumented `IStoreContextServer` COM interface, and analyzing the cryptographic limits of client-side Server-to-Server (S2S) entitlement spoofing.

---

## 1. Architectural Divergence: Legacy UWP (AppContainer) vs. Modern GDK

Modern PC releases on the Xbox App / Microsoft Store employ the **Game Development Kit (GDK)**. In GDK games, the executable is essentially a standard Win32 binary (`.exe`) augmented with Microsoft Gaming Runtime services (`XStore`, `XUser`, `XGameSave`). Packaging itself is flexible—modern GDK titles can be delivered in `.appx`, `.msixvc`, or loose virtual disks—but they execute with standard Win32 process integrity and communicate through documented APIs like `XStoreQueryGameLicenseAsync` and `XStoreQueryAssociatedProductsAsync`.

In contrast, **Legacy Windows 10 UWP** titles (spanning from 2016 to 2019, including *Call of Duty: Infinite Warfare*, *Modern Warfare Remastered UWP*, *Gears of War 4*, and *Halo 5: Forge*) were built on pure Windows Runtime (WinRT) AppContainer sandboxes. *Infinite Warfare*, for instance, is packaged as a monolithic **`.appxbundle`** containing encrypted EFS virtual filesystems and enforcing strict capability manifests:

| Subsystem | Legacy UWP (Infinite Warfare) | Modern GDK (BOCW / MWIII) |
| :--- | :--- | :--- |
| **Sandbox Model** | `AppContainer` Isolation (`S-1-15-2-1`) | Win32 Medium Integrity + Gaming Services |
| **Packaging Target** | Monolithic `.appxbundle` / Encrypted VFS | `.msixvc` / `.appx` / Virtual Disk Mounting |
| **Store Interface** | Undocumented `IStoreContextServer` (COM) | Documented `XStore` C/C++ SDK |
| **Memory Isolation** | Strict DACL, blocked Win32 IPC | Standard process security descriptors |
| **Debugger Hooking** | Denied `PROCESS_ALL_ACCESS` without SID | Standard `CreateRemoteThread` / Detours |

Because Legacy UWP runs under an isolated `AppContainer`, traditional dynamic analysis tools fail outright: standard injection mechanisms are rejected by the Windows kernel security model, and loaded DLLs are blocked unless explicitly granted `ALL APPLICATION PACKAGES` access rights.

---

## 2. The Injection Vector: Repurposing UWP Dumper

To inject our research module (`ZPGDK` / `client-iw7-store`) into the live game, standard injection (`OpenProcess` + `VirtualAllocEx` + `CreateRemoteThread`) was insufficient because of access restrictions enforced on AppContainer processes.

Instead of writing a complex kernel driver or token impersonation service, we repurposed the suspended process lifecycle vector popularized by **UWP Dumper** (`Woomer/UWP Dumper` by Wunkolo and emoose):

```text
[UWP Launcher]
       │
       ▼
IPackageDebugSettings::EnableDebugging()
       │  (Launches AppX package suspended with DebugToken)
       ▼
Target Game Process Spawned (SUSPENDED in AppContainer)
       │
       ├── Original UWP Dumper Action: Dump decrypted memory to disk
       │
       └── Our Weaponized ZPGDK Action:
             1. Adjust Security Descriptor (Add 'ALL APPLICATION PACKAGES' ACE)
             2. QueueUserAPC / Remote Thread Injection of ZPGDK.dll
             3. ResumeProcess() -> DllMain() executes before Game DRM activates
```

By intercepting the target process at the point of suspension, our DLL is injected directly into the game's virtual address space before any in-game anti-tamper or WinRT runtime initialization runs. Once mapped, `DllMain` delegates execution to a detached worker thread, ensuring the game's loader thread finishes without deadlocks:

```cpp
BOOL APIENTRY DllMain(HMODULE hModule, DWORD ul_reason_for_call, LPVOID lpReserved) {
    if (ul_reason_for_call == DLL_PROCESS_ATTACH) {
        client_module = hModule;
        DisableThreadLibraryCalls(hModule);
        
        HANDLE hThread = CreateThread(nullptr, 0, [](LPVOID) -> DWORD {
            init(); // ZPGDK initialization routine
            return 0;
        }, nullptr, 0, nullptr);
        
        if (hThread) CloseHandle(hThread);
    }
    return TRUE;
}
```

---

## 3. Dissecting the Undocumented `IStoreContextServer`

In WinRT, developers access in-app purchases and license checks using the high-level `Windows.Services.Store.StoreContext` class. However, `windows.services.store.dll` is merely a thin client wrapper. The actual license validation and catalog synchronization are delegated via local RPC/COM to an internal, undocumented system service interface: **`IStoreContextServer`** (managed by `Windows.Services.Store.Internal.StoreContextServer`).

![Store Context Server Interface Methods](/assets/journal/iw7_store_methods.png)

To intercept this interface before the game executes its initial entitlement handshake, we hook `RoGetActivationFactory` and `RoActivateInstance` from `api-ms-win-core-winrt-l1-1-0.dll`:

```cpp
// Hooking WinRT Core Activation
typedef HRESULT(__stdcall* RoGetActivationFactory_t)(HSTRING, REFIID, void**);
typedef HRESULT(__stdcall* RoActivateInstance_t)(HSTRING, IInspectable**);

utils::hook::detour ro_activate_instance_hook;
utils::hook::detour ro_get_activation_factory_hook;
```

When the game requests an activation factory for `Windows.Services.Store.StoreContext`, our detour intercepts the instance, creates a shadow Virtual Method Table (VMT), and redirects all internal COM method slots to custom analysis stubs.

---

## 4. VMT Hooking & Logging In-Game Purchases (COD Points)

With the shadow VTable in place, we mapped the virtual method dispatch offsets of `IStoreContextServer`:

* **`Method[6]` — `GetCustomerCollectionsId`**: Requests signed authorization tokens representing the user's content entitlements.
* **`Method[7]` — `GetCustomerPurchaseId`**: Requests tokens authorizing consumable or digital purchases.
* **`Method[11]` — `GetAssociatedStoreProducts`**: Enumerates available catalog items (DLCs, add-ons, and consumable bundles).
* **`Method[14]` — `GetUserCollection`**: Checks user inventory for specific SKU identifiers.
* **`Method[20]` — `GetAppLicense`**: Queries the base game license parameters.

### Real-Time Ingestion of COD Points Package IDs
When *Call of Duty: Infinite Warfare* loads the Quartermaster / Store menu, our logging pipeline intercepted consecutive calls to `Method[11]` querying store package IDs:

```text
[WinRT] IStoreContextServer::Method[11] called! a2=00007FF7B4C02840, a3=0000000000000000
[WinRT] Enumerating Store Products for Parent: 9NBLGGH52PH9 (Base IW7)
[WinRT] Query Filter: "Consumable"
[WinRT] Found Target Product: COD Points (200 CP Bundle) -> SKU: 9NBLGGH52PD2
[WinRT] Found Target Product: COD Points (1100 CP Bundle) -> SKU: 9NBLGGH5393R
[WinRT] Found Target Product: COD Points (2400 CP Bundle) -> SKU: 9NBLGGH52PH9
```

Each parameter passed to these COM methods utilizes Windows `HSTRING` handles allocated on the caller's stack frame. We engineered dynamic stack-scanning logic to locate and inspect output pointers:

```cpp
inline bool try_spoof_hstring_param(void* param, const std::wstring& json_val, const std::string& name, bool force = false) {
    if (!param) return false;
    HSTRING* out_hstr = (HSTRING*)param;
    if (IsBadWritePtr(out_hstr, sizeof(HSTRING))) return false;
    if (!is_stack_pointer(out_hstr)) return false;
    
    if (force || *out_hstr == nullptr) {
        HRESULT create_hr = WindowsCreateString(json_val.c_str(), (UINT32)json_val.length(), out_hstr);
        LOG("WinRT", INFO, "Captured & Injected HSTRING parameter {}, hr: 0x{:08X}", name, (unsigned int)create_hr);
        return true;
    }
    return false;
}
```

---

## 5. Client Spoofing vs. Server-to-Server (S2S): Why Local Emulation Hits a Wall

To understand why local license spoofing behaves differently across Windows Store titles, we must differentiate between **Client-to-Store (S1S / Client-Side)** checks and **Server-to-Server (S2S)** cryptographic validation.

### How ZPGDK Spoofs Modern GDK Titles (Call of Duty: WWII)
In modern GDK environments, ZPGDK has already demonstrated successful client-side DLC unlocking (as implemented in `src/s2-store-dlc-unlocker-standalone` for *Call of Duty: WWII*). In those titles:
1. The game downloads all DLC assets (`.ff` and `.pak` files in the `zone/` and `video/` directories) directly within the monolithic 100GB+ base package from the Microsoft Store.
2. The game calls `XPackageEnumeratePackages` followed by `XPackageMountWithUiAsync` to mount small "activator" packages.
3. If the user lacks an official license, the OS service (`appxsvc` / `GamingServices`) aborts mounting with error `0x803F8001`.
4. **ZPGDK's Spoof Solution**: We detour `XPackageMountWithUiAsync` and `XPackageMountWithUiResult`. Instead of dispatching the request to the OS, we immediately trigger the game's asynchronous completion callback with a synthetic mount handle and hook `XPackageGetMountPath` to return the root executable path. Because the game engine evaluates mount success locally, it reads the pre-installed archives without any external server validation.

### The S2S Brick Wall in Infinite Warfare (IW7)
In *Call of Duty: Infinite Warfare*, however, attempting local memory spoofing for online entitlements (such as COD Points or server-authenticated DLC playlists) hits an insurmountable barrier: **Server-to-Server (S2S) Cryptographic Verification**.

![Server to Server Cryptographic Architecture](/assets/journal/iw7_s2s_flow.png)

Unlike purely client-evaluated checks (S1S) where patching a local boolean or redirecting a filesystem handle suffices, S2S offloads the decision completely:

1. **Signed Token Request**: The game client calls `Method[6]` (`GetCustomerCollectionsId`) on the `IStoreContextServer` WinRT COM interface. The Windows Store service contacts Microsoft authentication servers and receives a cryptographically signed **JSON Web Token (JWT)**.
2. **Off-Client Forwarding**: The game does not inspect or validate this token locally. Instead, it serializes the raw JWT into an encrypted RPC payload and transmits it over TLS to Activision / Demonware backend servers.
3. **Server-to-Server Validation**: The Demonware server contacts Microsoft's Azure Store endpoint directly (S2S) to fetch Microsoft's public RSA signing keys and cryptographically verify the token's digital signature and claims.
4. **Entitlement Decision**: Only if Microsoft's digital signature is valid and the authenticated Xbox Live identity holds legitimate purchase records does the server authorize the client's DLC playlists or allocate COD Points.

Because the JWT is signed with Microsoft's private key, local memory modifications (such as injecting `{"isActive": true}` or crafting a synthetic HSTRING payload) are rejected upstream:

```text
[Demonware] Ingested JWT payload from client
[Demonware] Verifying signature against MS Store Public Key via S2S...
[Demonware] ERROR: Signature verification failed (Invalid RSA PKCS#1 v1.5 padding)
[Demonware] Entitlement rejected. Client DLC flags set to 0.
```

### Breaking the Barrier: Online-Fix, ReUWP & ZPGDK's Open-Source Objective
However, the store entitlement layer is not uniform across all titles, and breaking this barrier remains an active, evolving research frontier:

* **Closed-Source Precedents (Online-Fix)**: Teams like Online-Fix have successfully bypassed store license barriers in legacy UWP titles such as *Gears of War 4*. However, these solutions remain strictly proprietary and closed-source, obscuring the internal WinRT mechanics behind compiled binaries and configuration hashes.
* **Specialized Open-Source Emulation ([ReUWP](https://github.com/OptiJuegos/ReUWP))**: Recently, OptiJuegos developed *ReUWP* for *Minecraft Bedrock* (during its pre-GDK UWP lifecycle). ReUWP proved that full store license emulation is feasible by stubbing store methods in memory. However, its implementation relies on game-specific hardcoded offsets tailored solely to Minecraft's binary layout.
* **ZPGDK's Architectural Mission**: The barrier we are actively working to dismantle with **ZPGDK** is decoupling store emulation from game-specific hacks. By reverse engineering and documenting the undocumented `IStoreContextServer` COM interfaces, VMT layouts, and `RoGetActivationFactory` hooks directly, ZPGDK aims to provide a **clean, open-source, and generic API documentation layer** for legacy Windows Store titles—bringing full transparency to an architecture that closed-source loaders have hidden for years.

---

## 6. Summary & Technical Takeaways

1. **UWP Dumper as an Injection Tool**: Repurposing `IPackageDebugSettings` allows arbitrary C++ instrumentation inside Windows 10 AppContainer sandboxes without triggering security violations.
2. **`IStoreContextServer` Interface**: The core of Windows 10 UWP store communication is an unexported COM interface whose VTable can be dynamically detoured via `RoGetActivationFactory` interception.
3. **S2S vs. Client/GDK Mount Spoofing**: While modern GDK titles (such as WWII / S2) can have their DLC mounted locally by short-circuiting `XPackageMountWithUiAsync` and redirecting mount paths, titles governed by Server-to-Server (S2S) token validation (Demonware backend verifying Microsoft Store JWTs) reject forged client payloads upstream.
4. **Democratizing UWP Research**: Complete research source code, VMT hooks, and analysis tools are open-sourced in the [ZPGDK](https://gitlab.com/Spet001/msclients) research repository under `src/client-iw7-store`.
