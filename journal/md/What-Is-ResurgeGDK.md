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

As a direct consequence, players on the Microsoft Store release were isolated: Steam Workshop mods could not be mounted, custom Zombies maps could not be natively selected, and matchmaking across servers was fragmented.

![Resurge Client Interface](/assets/resurge.png)

**ResurgeGDK** was engineered to eliminate this platform divide. Rather than requiring separate, redundant game installations, ResurgeGDK establishes **cross-platform file compatibility**: it packages the necessary Steam dependencies (`steam_api64.dll`) alongside native GDK libraries, installing both the GDK executable (`Resurge Beta.exe`) and the standard Steam executable (`BlackOps3.exe`). This dual-runtime model allows players to run either the GDK Xbox PC version, the standard Steam version, or community dedicated servers via the bundled Ezz BOIII client from a single shared directory—while supporting Steam Workshop content via the BOIIIWD companion tool, Demonware telemetry interception for 999x GobbleGums, Serious' T7 Patch security protections, and an integrated GSC script injector.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        Resurge Desktop Launcher                        │
│          [BOIIIWD Companion Tool]      │ [GSC Injector]                │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Launch & Coordination
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     Shared Game Installation Tree                      │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                 Triple-Target Execution Pipeline               │   │
│   │   1. Xbox PC Servers     -> Resurge Beta.exe (GDK / Store)     │   │
│   │   2. Steam Servers       -> BlackOps3.exe (Steam License)      │   │
│   │   3. Community Dedicated -> Bundled Ezz BOIII Client           │   │
│   │   - steam_api64.dll + xgameruntime.dll (Coexisting Libraries)  │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                      Core Engine Bridges                       │   │
│   │                                                                │   │
│   │  ┌───────────────────────┐          ┌───────────────────────┐  │   │
│   │  │   GDK / COM Bridge    │          │  BOIIIWD & Mod Manager│  │   │
│   │  │  - QueryApiImpl Hook  │          │  - Steam Workshop UGC │  │   │
│   │  │  - XPackage Mounts    │          │  - workshop.json Fixer│  │   │
│   │  │  - Local Entitlements │          │  - mods / usermaps VFS│  │   │
│   │  └───────────────────────┘          └───────────────────────┘  │   │
│   │  ┌───────────────────────┐          ┌───────────────────────┐  │   │
│   │  │ Demonware Interception│          │  T7 Patch Hardening   │  │   │
│   │  │  - Online Maintained  │          │  - Serious' T7 Patch  │  │   │
│   │  │  - 999x Gum Memory    │          │  - Buffer Overflow Fix│  │   │
│   │  │  - Cosmetic Unlocks   │          │  - Integrated GSC VM  │  │   │
│   │  └───────────────────────┘          └───────────────────────┘  │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Cross-Platform Coexistence: Dual-Runtime Compatibility

The primary challenge of porting and maintaining Black Ops III across both ecosystems is avoiding asset duplication while maintaining stability. The vanilla Microsoft Store package and the Steam package share 90%+ identical data assets (`zone/`, `video/`, `sound/`), but differ fundamentally in their entrypoint executables and runtime dependencies.

### Dual-Executable Architecture

ResurgeGDK resolves this by establishing a unified runtime file tree where both execution models coexist side-by-side:

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

## 4. Steam Workshop via BOIIIWD & Bundled Ezz BOIII Client

Because the Microsoft Store version does not interface with the Steam client, it lacks native access to the Steam Workshop subscription API. Furthermore, official server matchmaking is fragmented across platforms. ResurgeGDK overcomes both challenges through community tooling and client bundling:

### Steam Workshop Content via BOIIIWD Companion

1. **Standalone BOIIIWD Utility**: Players can download custom Zombies maps, weapon packs, and total-conversion mods directly from Steam Workshop CDN endpoints using **BOIIIWD** (BOIII Workshop Downloader), which is downloaded separately by the user.
2. **Mod Manager & `workshop.json` Resolver**: Once downloaded, Resurge's Mod Manager parses the item's `workshop.json` manifest. It detects whether the content is a `mod` or a `map`, automatically sanitizes zone folder paths, and routes assets directly into `mods/` or `usermaps/` inside the shared game directory.
3. **In-Engine Selection**: Custom levels and community fastfiles mount transparently into the game's Custom Games / Zombies selection menus.

### Bundled Ezz BOIII Client & Multi-Server Matchmaking

Rather than restricting players to a single platform, Resurge bundles the community **Ezz BOIII** client alongside standard Steam dependencies. This provides players with complete freedom across three matchmaking targets:

1. **Steam Dedicated Servers**: Accessible when launching via `BlackOps3.exe` (requires a valid Steam license).
2. **Community Dedicated Servers**: Accessible via the bundled **Ezz BOIII** client, connecting to community-hosted dedicated servers with an in-game server browser, independent of official platform matchmaking.
3. **Xbox PC / Microsoft Store Servers**: Accessible via `Resurge Beta.exe`, matching against players in the official Xbox Live / Microsoft Store PC matchmaking pool.

---

## 5. Demonware Telemetry Interception & 999x GobbleGums (Online Intact)

A core design principle of ResurgeGDK is that **online functionality remains fully active**. The mod does not isolate the player in an offline sandbox; users can connect to Xbox PC servers and play cooperative multiplayer matches normally.

### Local State Deception Tricking Remote Demonware

In Black Ops III, consumable GobbleGums are validated and tracked by Activision's **Demonware** server backend. Rather than attempting to crack remote server-side databases over the wire, Resurge operates through **local state deception**:

* **Continuous Memory Synchronization (`GobbleGumHackThread`)**: Resurge runs a background thread that continuously reads `gobblegum_value` (default: **999**) and writes this integer directly into the active memory addresses for player inventory slots:
  ```cpp
  // Thread to continuously set GobbleGum values in memory
  DWORD WINAPI GobbleGumHackThread(LPVOID lpParam) {
      int gobbleGumValue = ReadIniInt("Hacks", "gobblegum_value", 999);
      while (true) {
          if (g_gobbleGumHackEnabled) {
              for (size_t i = 0; i < g_gobbleGumOffsetsCount; i++) {
                  uint64_t addr = REBASE(g_gobbleGumOffsets[i]);
                  if (addr) *(int32_t*)addr = gobbleGumValue;
              }
          }
          Sleep(100);
      }
      return 0;
  }
  ```
* **LUI Engine Entitlement Hooking**: Resurge detours the engine's internal entitlement callback:
  ```lua
  Engine.GetEntitlementInfo = function(itemId, entitlementType)
      return { entitled = true, locked = false, new = false, count = 999 }
  end
  ```
* **Demonware Acceptance**: Because the local game client is deceived into asserting ownership of 999 units of each obtained gum, outgoing transaction validation packets report this hydrated state to Demonware. The remote backend accepts and reflects the count, granting players a complete 999x stockpile of Mega, Rare, and Ultra-Rare GobbleGums online without requiring microtransactions.
* **Currencies Maximized**: CryptoKeys (`CRYPTOKEYS_VALUE_DEFAULT = 99999`) and Liquid Divinium (`LIQUID_DIVINIUM_VALUE_DEFAULT = 99999`) are similarly initialized to their maximum values.

### Black Market Cosmetics Unlock

Resurge incorporates automated unlocks for in-game cosmetics:
* **Unlocked Items**: Unlocks weapon camouflages, calling cards, emblems (`emblem_unlock_all 1`), reticles, specialist outfits, and Black Market bribes (`bm_bribes_unlimited 1`, `ui_enable_bribes 1`).
* **Multiplayer Balance Preservation**: The unlock hook specifically **excludes DLC black market weapons**, preserving weapon sandbox balance in online multiplayer lobbies.

---

## 6. Security Hardening via Serious' T7 Patch & Integrated GSC Injector

### Serious' T7 Patch Integration

Legacy Call of Duty: Black Ops III multiplayer code suffers from several severe peer-to-peer security vulnerabilities:
* **Buffer Overflow Remote Code Execution (RCE)**: Malformed network packets sent to game ports could trigger memory corruption on unpatched clients.
* **Denial of Service & Crash Exploits**: Malicious network packets crafted by bad actors could forcibly terminate lobbies and disconnect players.

Resurge integrates the security hardening measures from Serious' **T7 Patch**. These community patches inspect packet boundaries, sanitize incoming serialized strings, and neutralize remote crash packets, allowing players to enjoy public and private games securely.

### Integrated GSC Script Injector

Black Ops III custom game scripts are compiled into bytecode structures categorized internally as **`ASSET_TYPE_SCRIPT_PARSETREE`**.

The Resurge launcher includes a native **GSC** injector:
* Rebuilt in Node.js / C# directly inside the launcher, eliminating the need for suspicious third-party cheat injection tools.
* Enables developers and modders to inject and hot-reload compiled `.gsc` scripts directly into game memory during private matches and custom Zombies sessions.

---

## 7. Comparative Architectural Matrix

| Feature / Subsystem | Vanilla Steam PC | Vanilla MS Store (GDK) | ResurgeGDK Environment |
| :--- | :--- | :--- | :--- |
| **Runtime Architecture** | Win32 / `steam_api64.dll` | GDK / `xgameruntime.dll` | **Dual-Runtime Coexistence** (`Resurge Beta.exe` + `BlackOps3.exe`) |
| **Executable Support** | Steam Client Required | Xbox App Required | **Both Executables from Same Shared Directory** |
| **Server Options** | Steam Servers Only | Xbox PC Servers Only | **Triple-Option: Steam / Community (BOIII) / Xbox PC** |
| **DLC Entitlement** | Steam Store Depots | Cloud License Check (`0x803F8001`) | **Local Package Mounting & Preservation** |
| **Steam Workshop** | Native Steam Client UGC | Completely Unsupported | **BOIIIWD (Downloader) + Mod Manager `workshop.json`** |
| **Online Status** | Online Active | Online Active | **Online Fully Intact** |
| **GobbleGums / Loot** | Demonware Server-Tied | Inaccessible / Fragmented | **Local Deception -> Remote Demonware Sync (999x)** |
| **Black Market** | Microtransactions | Inaccessible / Fragmented | **Cosmetics & Bribes Unlocked (Excl. DLC Weapons)** |
| **Network Security** | Vulnerable to Legacy P2P Exploits | Vulnerable to Legacy P2P Exploits | **Hardened via Serious' T7 Patch** |
| **Script Modding** | External Tools | Blocked by Container | **Integrated GSC Script Injector in Launcher** |

---

## 8. Conclusion & Legacy Preservation

The fragmentation of PC games across different digital distribution platforms often isolates player communities and threatens the long-term survival of user-generated content. When modern ports operate inside sandboxed runtimes that lack modding hooks, decades of community-crafted maps and tools are left behind.

**ResurgeGDK** provides a clean, unified architectural solution: sharing game data between the Microsoft Store, Steam, and community runtimes, mounting Steam Workshop creations via BOIIIWD, giving players freedom between Xbox PC, Steam, and community BOIII servers, and protecting active lobbies with Serious' T7 Patch hardening. By keeping online play fully intact while solving entitlement and modding barriers, ResurgeGDK safeguards the legacy of Black Ops III modding across modern PC platforms.
