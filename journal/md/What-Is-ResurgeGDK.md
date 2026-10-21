# What is ResurgeGDK? Architectural Deep Dive: Steam-to-GDK Conversion, Workshop Support & Telemetry

An engineering investigation into the architecture of **ResurgeGDK**—a systems compatibility layer, runtime bridge, and preservation ecosystem for *Call of Duty: Black Ops III* (Treyarch T7 Engine) operating across the Microsoft Game Development Kit (GDK), Windows Store AppX environments, and the Steam ecosystem.

Official repository mirror: [ResurgeGDK Mirror on GitLab](https://gitlab.com/Spet001/resurgegdkbackup)

---

## 1. Overview & Architectural Scope

When *Call of Duty: Black Ops III* was released in late 2015, the PC version was architected around standard Win32 execution patterns and Valve's Steamworks API. Over the following decade, the game accumulated a massive modding community, driven primarily by the Steam Workshop ecosystem—tens of thousands of custom Zombies maps, gameplay overhauls, and community asset packs.

However, modern distribution on the Microsoft Store and Xbox PC app introduced a distinct platform architecture. Rather than relying on standard Win32 execution, modern Store releases utilize the **Microsoft Game Development Kit (GDK)**. In this runtime environment:

* The executable binds to Microsoft Gaming Services (`xgameruntime.dll`).
* User authentication and identity delegate to Xbox Live (`XUser`, `XStore`).
* Filesystem access operates within AppX packaging manifests and sandboxed virtual stores.
* Crucially, the build possesses **zero native integration with the Steamworks SDK** (`steam_api64.dll` is absent by default).

As a direct consequence, players on the Microsoft Store release were isolated: Steam Workshop mods could not be mounted, custom Zombies maps could not be natively selected, and asset management was fragmented.

![Resurge Client Interface](/assets/resurge.png)

**ResurgeGDK** was engineered to eliminate this platform divide. Rather than requiring separate, redundant game installations, ResurgeGDK establishes **cross-platform file compatibility**: it packages the necessary Steam dependencies (`steam_api64.dll`) alongside native GDK libraries, installing both the GDK executable (`Resurge Beta.exe`) and the standard Steam executable (`BlackOps3.exe`). This dual-runtime model allows players to run either the GDK Xbox PC version or the Steam version from a single shared directory, while integrating Steam Workshop downloads, Demonware telemetry interception, T7 Patch security protections, and an integrated GSC script injector.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        Resurge Desktop Launcher                        │
│             [Steam Workshop Downloader] │ [GSC Injector]               │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Launch & Coordination
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     Shared Game Installation Tree                      │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                 Dual-Runtime Executable Pair                   │   │
│   │   - Resurge Beta.exe  (Microsoft Store / GDK / Xbox PC)        │   │
│   │   - BlackOps3.exe     (Standard Steam / Win32 Environment)    │   │
│   │   - steam_api64.dll + xgameruntime.dll (Coexisting Libraries)  │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                      Core Engine Bridges                       │   │
│   │                                                                │   │
│   │  ┌───────────────────────┐          ┌───────────────────────┐  │   │
│   │  │   GDK / COM Bridge    │          │  Workshop VFS Mount   │  │   │
│   │  │  - QueryApiImpl Hook  │          │  - BOIII Downloader   │  │   │
│   │  │  - XPackage Mounts    │          │  - Virtual Path Map   │  │   │
│   │  │  - Local Entitlements │          │  - FastFile Indexing  │  │   │
│   │  └───────────────────────┘          └───────────────────────┘  │   │
│   │  ┌───────────────────────┐          ┌───────────────────────┐  │   │
│   │  │  Demonware & Cosmetics│          │  T7 Patch Hardening   │  │   │
│   │  │  - Online Telemetry   │          │  - Community Protections│ │
│   │  │  - 999x Gum Intercept │          │  - Buffer Overflow Fix│  │   │
│   │  │  - Black Market Unlock│          │  - Integrated GSC VM  │  │   │
│   │  └───────────────────────┘          └───────────────────────┘  │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Cross-Platform Coexistence: Dual-Runtime Compatibility

The primary challenge of porting and maintaining Black Ops III across both ecosystems is avoiding asset duplication while maintaining stability. The vanilla Microsoft Store package and the Steam package share 90%+ identical data assets (`zone/`, `video/`, `sound/`), but differ fundamentally in their entrypoint executables and runtime dependencies.

### Dual-Executable Architecture

ResurgeGDK resolves this by establishing a unified runtime file tree where both execution models coexist:

1. **`Resurge Beta.exe`**: Built specifically for the Microsoft Store / GDK environment. It binds to `xgameruntime.dll` and routes user authentication through the local Xbox PC identity subsystem.
2. **`BlackOps3.exe`**: Retained for the standard Win32 environment, loading `steam_api64.dll` and connecting to standard Steam client services.
3. **Dependency Harmonization**: Side-by-side placement of both runtime library sets without dynamic link conflicts, ensuring that whichever executable is launched finds its respective platform DLLs immediately.

### Intercepting `QueryApiImpl` in the GDK Runtime

When running under the GDK pipeline, the game process initializes by querying the Gaming Runtime:

```text
Game EntryPoint -> XGameRuntimeInitialize() -> QueryApiImpl() -> COM VTable Setup
```

ResurgeGDK intercepts calls to `QueryApiImpl` within `xgameruntime.dll`, hooking the COM interfaces for packaging, identity, and licensing:

```cpp
#include <windows.h>
#include <cstdint>

namespace resurge::gdk {

    typedef HRESULT(__fastcall* QueryApiImpl_t)(
        const GUID* api_guid,
        uint32_t version,
        void** api_out
    );

    inline QueryApiImpl_t original_query_api_impl = nullptr;

    HRESULT __fastcall Hooked_QueryApiImpl(
        const GUID* api_guid,
        uint32_t version,
        void** api_out
    ) {
        HRESULT hr = original_query_api_impl(api_guid, version, api_out);
        if (FAILED(hr) || api_out == nullptr || *api_out == nullptr) {
            return hr;
        }

        // Install non-invasive hooks on Store and Package VTables
        InstallSubsystemHooks(api_guid, *api_out);
        return S_OK;
    }
}
```

---

## 3. Local Runtime Entitlements & DLC Preservation

In the Microsoft Store release, high-definition DLC assets (Zombies Chronicles, The Giant, and DLCs 1–4: *Der Eisendrache*, *Zetsubou No Shima*, *Gorod Krovi*, and *Revelations*) require runtime package mounting and digital license validation:

1. **`XPackageEnumeratePackages` / `XPackageMountWithUiAsync`**: Mounts the filesystem container.
2. **`XStoreQueryEntitledProductsAsync`**: Verifies product license ownership.

If digital ownership queries fail or return unauthorized status, the engine refuses to mount the DLC assets. ResurgeGDK installs hooks on these entitlement validation routines, intercepting license queries and returning valid synthetic mount descriptors:

```cpp
namespace resurge::entitlement {

    struct PackageMountInfo {
        uint64_t handle_id;
        const char* mount_path;
        bool is_valid;
    };

    // Detours Store entitlement checks to ensure installed DLC assets mount seamlessly
    bool ValidateAndMountDlcPackage(const char* package_id, PackageMountInfo* out_info) {
        if (!out_info) return false;
        out_info->handle_id = 0x1000 + HashPackageId(package_id);
        out_info->is_valid = true;
        return true;
    }
}
```

This ensures that pre-installed DLC maps and assets load without container initialization faults.

---

## 4. Steam Workshop Modding on the Microsoft Store

Because the Microsoft Store version does not interface with the Steam client, it lacks access to the native Steam Workshop subscription system. ResurgeGDK overcomes this limitation by integrating the **BOIII Workshop Downloader**:

1. **Automated UGC Download**: The desktop launcher fetches custom Zombies maps, weapons, and mod packages directly from Steam Workshop CDN repositories.
2. **Virtual Filesystem Redirection**: Mods are placed into the `mods/` and `usermaps/` subdirectories. ResurgeGDK's runtime layer virtualizes search path queries within the engine's asset loader, ensuring that custom fastfiles (`zone/`) are recognized as valid level packages.
3. **In-Game Selection**: Community maps and mods appear directly in the in-game Custom Games / Zombies selection menus, exactly as they do on the native Steam version.

---

## 5. Demonware Telemetry Interception & Cosmetic Unlocks (Online Intact)

Unlike offline emulators that disable network connectivity, **ResurgeGDK keeps the game's online functionality fully active**. Players can connect to online servers and play cooperative multiplayer sessions on Xbox PC servers.

### Intercepting Demonware for 999x GobbleGums

In Black Ops III, consumable GobbleGums are tracked by Activision's **Demonware** server backend. In vanilla gameplay, obtaining gums through Dr. Monty’s factory sends transactional telemetry packets to Demonware:

* ResurgeGDK hooks the outgoing Demonware transaction handler.
* Whenever the player triggers a gum transaction, the hook modifies the outgoing payload data, reporting to the Demonware server that **999 units** of the obtained GobbleGum were received.
* The Demonware server acknowledges and records the quantity, providing the player with a complete stockpile of Mega and Ultra-Rare GobbleGums while maintaining valid online session state.

### Black Market Cosmetics Unlock

In addition to GobbleGum telemetry interception, ResurgeGDK hooks the catalog response parser for cosmetic items:

* **Unlocked Assets**: Automatically unlocks all Black Market weapon camos, calling cards, reticles, specialist themes, and gesture animations.
* **Gameplay Balance Preservation**: The unlock hook intentionally **excludes DLC black market weapons**, preserving core weapon progression and multiplayer fairness.

---

## 6. Security Hardening via T7 Patch & Integrated GSC Injector

### T7 Patch Protection Integration

As Call of Duty: Black Ops III aged, several critical security vulnerabilities were discovered in its peer-to-peer networking code:
* **Buffer Overflow Exploits**: Malformed packets could cause memory corruption on unpatched clients.
* **Crash Exploits**: Malicious network packets crafted by bad actors could forcibly close game sessions.

Rather than relying on proprietary closed patches, ResurgeGDK incorporates the community-proven protections from Serious' **T7 Patch**. These patches validate packet lengths, sanitize incoming string buffers, and safeguard active lobbies from remote crash vectors during online sessions.

### Integrated GSC Script Injector

Black Ops III scripts are compiled into bytecode structures categorized internally as **`ASSET_TYPE_SCRIPT_PARSETREE`**.

The ResurgeGDK launcher includes a built-in **GSC** script injector:
* Eliminates the need for external third-party memory injection software.
* Allows developers and mod creators to inject and hot-reload compiled `.gsc` scripts directly into runtime memory during private matches and custom Zombies games.

---

## 7. Comparative Architectural Matrix

| Feature / Subsystem | Vanilla Steam PC | Vanilla MS Store (GDK) | ResurgeGDK Environment |
| :--- | :--- | :--- | :--- |
| **Runtime Architecture** | Win32 / `steam_api64.dll` | GDK / `xgameruntime.dll` | **Dual-Runtime Coexistence** (`Resurge Beta.exe` + `BlackOps3.exe`) |
| **Executable Support** | Steam Client Required | Xbox App Required | **Both Executables from Same Shared Files** |
| **DLC Entitlement** | Steam Store Depots | Cloud License Check (`0x803F8001`) | **Local Package Mounting & Preservation** |
| **Steam Workshop** | Native Steam Client UGC | Completely Unsupported | **BOIII Workshop Downloader + VFS Mapping** |
| **Online Status** | Online Active | Online Active | **Online Fully Intact** |
| **GobbleGums / Loot** | Demonware Server-Tied | Inaccessible / Fragmented | **Demonware Interception (999x on Obtain)** |
| **Black Market** | Microtransactions | Inaccessible / Fragmented | **All Cosmetics Unlocked (Excl. DLC Weapons)** |
| **Network Security** | Vulnerable to Legacy P2P Exploits | Vulnerable to Legacy P2P Exploits | **Hardened via T7 Patch Protections** |
| **Script Modding** | External Tools | Blocked by Container | **Integrated GSC Script Injector** |

---

## 8. Conclusion & Legacy Preservation

The fragmentation of PC games across different digital distribution platforms often isolates player communities and threatens the long-term survival of user-generated content. When modern ports operate inside sandboxed runtimes that lack modding hooks, decades of community-crafted maps and tools are left behind.

**ResurgeGDK** provides a clean, unified architectural solution: sharing game data between the Microsoft Store and Steam runtimes, mounting Steam Workshop creations without the Steam client, and protecting active lobbies with T7 Patch hardening. By keeping online play fully intact while solving entitlement and modding barriers, ResurgeGDK safeguards the legacy of Black Ops III modding across modern PC platforms.
