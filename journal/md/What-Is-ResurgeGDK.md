# What is ResurgeGDK? Architectural Deep Dive: Steam-to-GDK Conversion, Workshop Support & Local Telemetry

An engineering investigation into the architecture of **ResurgeGDK**—a high-performance systems compatibility layer, runtime bridge, and preservation ecosystem for *Call of Duty: Black Ops III* (Treyarch T7 Engine) operating across the Microsoft Game Development Kit (GDK), Windows Store AppX environments, and the legacy Steamworks ecosystem.

Official repository mirror: [ResurgeGDK Mirror on GitLab](https://gitlab.com/Spet001/resurgegdkbackup)

---

## 1. Overview & Architectural Scope

When *Call of Duty: Black Ops III* was released in late 2015, the PC release was architected exclusively around the Win32 platform and Valve's Steamworks API. Over the following decade, the game accumulated one of the largest modding communities in PC gaming history, driven almost entirely by the Steam Workshop ecosystem—tens of thousands of custom Zombies maps, total conversion mods, and community asset packs.

However, modern distribution on the Microsoft Store and Xbox PC app brought a fundamental platform fracture. Rather than relying on standard Win32 execution patterns, modern Store releases utilize the **Microsoft Game Development Kit (GDK)**. In this runtime environment:

* The executable is bound to Microsoft Gaming Services (`xgameruntime.dll`).
* User authentication and identity delegate to Xbox Live (`XUser`, `XStore`).
* Filesystem access is governed by AppX / MSIX packaging manifests and sandboxed virtual stores.
* Crucially, the build possesses **zero native integration with the Steamworks SDK** (`steam_api64.dll` is entirely absent).

As a direct consequence, players running the Microsoft Store release were isolated: Steam Workshop mods could not be mounted, custom Zombies maps failed to load, and offline legacy preservation was impeded by missing telemetry endpoints and unauthenticated entitlement services.

![Resurge Client Interface](/assets/resurge.png)

**ResurgeGDK** was engineered to solve this platform divide. Rather than modifying the static `.text` segment of the game binary, ResurgeGDK acts as an in-memory **systems compatibility layer and dynamic runtime bridge**. It intercepts GDK runtime calls, virtualizes filesystem hierarchies, mounts Steam Workshop assets via an integrated VFS, emulates local telemetry services, and embeds community security fixes from the Ezz BOIII client alongside a native GSC bytecode injection engine.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   Resurge Desktop Launcher (Electron)                  │
│       [Steam Workshop Downloader] │ [GSC Compiler] │ [Console UI]       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ IPC / Process Injection
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     Target Process: BlackOps3.exe                      │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                     ResurgeGDK.dll Core                        │   │
│   │                                                                │   │
│   │  ┌───────────────────────┐          ┌───────────────────────┐  │   │
│   │  │   GDK / COM Bridge    │          │  Workshop VFS Mount   │  │   │
│   │  │  - QueryApiImpl Hook  │          │  - Path Virtualizer   │  │   │
│   │  │  - XPackage Mounts    │          │  - DB_FindXAssetDetour│  │   │
│   │  │  - Local Entitlements │          │  - BOIII Asset Ingest │  │   │
│   │  └───────────────────────┘          └───────────────────────┘  │   │
│   │  ┌───────────────────────┐          ┌───────────────────────┐  │   │
│   │  │  Telemetry & Loot     │          │  Ezz BOIII Security   │  │   │
│   │  │  - Demonware Emulation│          │  - RCE Exploit Detours│  │   │
│   │  │  - 999x Gum Inventory │          │  - P2P Net Hardening  │  │   │
│   │  │  - Local State Cache  │          │  - GSC ParseTree VM   │  │   │
│   │  └───────────────────────┘          └───────────────────────┘  │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                Treyarch T7 Engine Subsystems                   │   │
│   │  [FastFile Manager] [Script VM] [D3D11 Render] [Sound Engine]  │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Cross-Platform Conversion: Steam to GDK Runtime Bridge

The architectural gulf between the legacy Steam Win32 build and the modern GDK build is rooted in the platform initialization sequence. When the GDK executable starts, its entry point does not directly initialize engine subsystems; instead, it binds to the Gaming Runtime loader:

```text
Game EntryPoint -> XGameRuntimeInitialize() -> QueryApiImpl() -> COM VTable Setup
```

If any link in this chain fails—such as an unauthenticated Xbox Live identity token or an invalid AppX sandbox boundary—the process terminates immediately.

### Intercepting `QueryApiImpl` and Hooking the GDK COM Layer

To construct a transparent compatibility bridge, ResurgeGDK injects its core payload into the process address space during early process creation (before COM factory initialization completes). The injector locates the exported dispatch routine `QueryApiImpl` within `xgameruntime.dll`:

```cpp
#include <windows.h>
#include <cstdint>
#include <string>
#include <unordered_map>

namespace resurge::gdk {

    typedef HRESULT(__fastcall* QueryApiImpl_t)(
        const GUID* api_guid,
        uint32_t version,
        void** api_out
    );

    inline QueryApiImpl_t original_query_api_impl = nullptr;

    // Target interface GUIDs for XPackage, XStore, and XUser
    static constexpr const char* GUID_XPACKAGE = "af406016-e850-4aa8-a88d-2f3dcb9dac7e";
    static constexpr const char* GUID_XSTORE   = "4cf2a014-b154-4f0f-8c31-31422b406e22";
    static constexpr const char* GUID_XUSER    = "1e721a32-1596-419b-a316-2e861d8b9487";

    HRESULT __fastcall Hooked_QueryApiImpl(
        const GUID* api_guid,
        uint32_t version,
        void** api_out
    ) {
        // Delegate to original runtime implementation first
        HRESULT hr = original_query_api_impl(api_guid, version, api_out);
        if (FAILED(hr) || api_out == nullptr || *api_out == nullptr) {
            return hr;
        }

        // Intercept and install shadow VTables on targeted subsystems
        if (MatchGuid(api_guid, GUID_XPACKAGE)) {
            InstallPackageHooks(*api_out);
        } else if (MatchGuid(api_guid, GUID_XSTORE)) {
            InstallStoreHooks(*api_out);
        } else if (MatchGuid(api_guid, GUID_XUSER)) {
            InstallUserHooks(*api_out);
        }

        return S_OK;
    }
}
```

### Identity Virtualization (`XUser`)

In environments where the game is executed offline or outside the standard Xbox Game Bar shell, calls to `XUserAddUserAsync` and `XUserGetId` frequently fail with error code `0x89235100` (User Not Signed In). 

ResurgeGDK detours these interfaces, instantiating a virtual local user identity block containing a deterministic 64-bit Xbox Live ID (`XUID: 0x00090000DEADBEEF`). The game engine receives a valid `XUserHandle` without communicating with Microsoft authentication servers, allowing local multiplayer, split-screen, and offline campaign/zombies modes to initialize cleanly.

---

## 3. Local Runtime Entitlements & DLC Preservation

A major problem confronting preservationists studying modern Microsoft Store packages is asset fragmentation. In legacy Steam releases, DLCs were separate downloadable depots. On modern Store / GDK platforms, high-definition assets are either pre-installed within the base directory or delivered through encrypted `.msixvc` split-containers that require explicit runtime mounting.

When the game requests DLC content (such as *Zombie Chronicles*, *The Giant*, or DLCs 1–4: *Der Eisendrache*, *Zetsubou No Shima*, *Gorod Krovi*, and *Revelations*), the engine queries two distinct API pipelines:
1. **`XPackageEnumeratePackages` / `XPackageMountWithUiAsync`**: Mounts the filesystem container.
2. **`XStoreQueryEntitledProductsAsync`**: Verifies product license ownership.

### Spoofing Package Mounts

If the player's Microsoft Account lacks digital ownership tokens, `XPackageMountWithUiAsync` halts execution and throws `0x803F8001` (Unauthorized Game License). ResurgeGDK detours this entry point, preventing the query from reaching kernel services. It simulates asynchronous I/O completion and returns a synthetic mount handle:

```cpp
namespace resurge::entitlement {

    struct FakeMountDescriptor {
        uint64_t handle_id;
        std::string mount_path;
        bool is_valid;
    };

    static std::unordered_map<void*, FakeMountDescriptor> g_MountHandles;
    static uint64_t g_NextHandleId = 0x8000;

    HRESULT __fastcall Hooked_XPackageMountWithUiAsync(
        void* package_identifier,
        XPackageMountFlags flags,
        XAsyncBlock* async_block
    ) {
        // Allocate a tracking pointer for the virtual mount
        void* fake_handle = reinterpret_cast<void*>(++g_NextHandleId);
        
        FakeMountDescriptor desc{};
        desc.handle_id = g_NextHandleId;
        
        // Resolve target base game physical directory
        char module_path[MAX_PATH];
        GetModuleFileNameA(nullptr, module_path, MAX_PATH);
        std::string base_dir = std::string(module_path).substr(0, std::string(module_path).find_last_of("\\/"));
        desc.mount_path = base_dir;
        desc.is_valid = true;

        g_MountHandles[fake_handle] = desc;

        // Populate the asynchronous completion structure
        async_block->result = fake_handle;

        // Dispatch immediate completion via asynchronous callback
        if (async_block->callback != nullptr) {
            async_block->callback(async_block);
        }

        return S_OK;
    }
}
```

### Path Redirection via `XPackageGetMountPath`

Once the game receives the synthetic mount handle, it queries `XPackageGetMountPath` to locate the content files. ResurgeGDK intercepts this request and substitutes the virtual store path with the actual directory containing the unpacked FastFiles (`.ff`) and asset packages (`.xpak`):

```cpp
HRESULT __fastcall Hooked_XPackageGetMountPath(
    void* handle,
    size_t path_buffer_size,
    char* path_buffer
) {
    auto it = g_MountHandles.find(handle);
    if (it != g_MountHandles.end() && it->second.is_valid) {
        strncpy_s(path_buffer, path_buffer_size, it->second.mount_path.c_str(), _TRUNCATE);
        return S_OK;
    }

    return original_get_mount_path(handle, path_buffer_size, path_buffer);
}
```

By coupling this mount virtualization with a memory detour on `XStoreQueryEntitledProductsAsync` (which injects synthetic SKU records for all known Season Pass and Zombies Chronicles content IDs), the Treyarch T7 engine successfully loads all legacy maps without requiring active cloud verification.

---

## 4. Steam Workshop Modding on the Microsoft Store

The single greatest hurdle for the Microsoft Store release of Black Ops III was the total absence of Steam Workshop support. The engine is hardcoded to interact with Steam UGC (User Generated Content) APIs when querying custom maps or mods. On the GDK build, these APIs do not exist.

### Interoperability with BOIII Workshop Downloader

To bridge this functionality, ResurgeGDK interfaces with the **BOIII Workshop Downloader** protocol. Rather than depending on a running Steam client, the downloader uses Valve's public WebAPI and SteamCMD protocols to download workshop items directly:

```text
Steam Workshop WebAPI -> Workshop ID Retrieval -> Direct Depot Stream -> Local Cache:
  ├─ workshop/content/311210/<workshop_id>/
  │    ├─ zone/
  │    │    ├─ <map_name>.ff
  │    │    └─ <map_name>.xpak
  │    └─ workshop.json
```

### Filesystem Path Mapping & Asset Search Tree Injection

In Black Ops III, map loading relies on strict path conventions. The engine searches for level assets using two internal paths:
* Core game levels: `zone/all/<mapname>.ff`
* Custom community maps: `usermaps/<mapname>/zone/<mapname>.ff`
* Mod modifications: `mods/<modname>/zone/<modname>.ff`

ResurgeGDK detours Treyarch's low-level filesystem abstraction layer (`FS_FOpenFileRead`, `FS_ListFiles`, and `DB_FindXAssetHeader`). When the engine initializes or enumerates the custom map menu, our detour intercepts directory scans and dynamically injects entries downloaded into the Workshop directory:

```cpp
namespace resurge::vfs {

    struct WorkshopItem {
        std::string published_id;
        std::string internal_map_name;
        std::string physical_zone_path;
    };

    static std::vector<WorkshopItem> g_RegisteredWorkshopItems;

    void ScanAndRegisterWorkshopDirectory(const std::string& workshop_root) {
        // Enumerate workshop/content/311210/*
        for (const auto& entry : std::filesystem::directory_iterator(workshop_root)) {
            if (!entry.is_directory()) continue;

            std::string manifest_path = entry.path().string() + "/workshop.json";
            if (std::filesystem::exists(manifest_path)) {
                WorkshopItem item = ParseWorkshopManifest(manifest_path);
                g_RegisteredWorkshopItems.push_back(item);
                
                // Map physical storage to virtual usermaps hierarchy
                RegisterVirtualMapping(
                    "usermaps/" + item.internal_map_name + "/zone/",
                    entry.path().string() + "/zone/"
                );
            }
        }
    }

    // Hooked low-level file open routine
    int64_t __fastcall Hooked_FS_FOpenFileRead(
        const char* filename,
        intptr_t* file_handle,
        bool search_override
    ) {
        std::string resolved_path = ResolveVirtualPath(filename);
        return original_fs_open_file_read(resolved_path.c_str(), file_handle, search_override);
    }
}
```

Through this Virtual File System (VFS) hook, the Microsoft Store build treats arbitrary Steam Workshop folders as native `usermaps` and `mods`. Custom community maps—ranging from small arena challenges to colossal custom campaigns like *Leviathan*—load natively with full lighting, sound banks, and script execution.

---

## 5. Local Telemetry & GobbleGum Inventory Emulation

In *Black Ops III* Zombies, consumable GobbleGums (such as *Perkaholic*, *Shopping Free*, *Near Death Experience*, and *Reign Drops*) and Liquid Divinium are architected around a server-authoritative model. The game client periodically dispatches encrypted telemetry requests over UDP/TLS to Activision / Demonware backend services (`bdAuth`, `bdLobby`, and microtransaction inventory microservices).

When playing offline, on private networks, or on builds severed from Demonware servers, the backend inventory returns an empty set. The player is restricted exclusively to the 5 baseline classic gums; Dr. Monty's Factory is locked, and Mega GobbleGums cannot be equipped or consumed.

```text
[Vanilla Flow (Fails Offline)]
Client Engine ──(Demonware Request)──► [Remote Auth/Loot Server] ──► Fails (Zero Inventory)

[ResurgeGDK Local Emulation Flow]
Client Engine ──(Loot Request)──► [Resurge In-Memory Hook] ──► Returns Synthesized Inventory (999x)
Client Gameplay ──(Consume Gum)──► [Loot_Consume Hook]     ──► Acknowledges Consumption, Count Preserved
```

### Reverse Engineering the In-Memory Loot Structure

By analyzing the memory space of `BlackOps3.exe` during inventory deserialization, we isolated the runtime structure responsible for tracking consumable gums:

```cpp
namespace resurge::telemetry {

    #pragma pack(push, 1)
    struct BGBItemEntry {
        uint32_t item_id;       // Internal CRC32 or enumeration ID
        uint32_t item_count;    // Total quantity available in player collection
        uint32_t item_flags;    // State flags (0x1 = Unlocked, 0x2 = Consumable)
        uint32_t padding;
    };

    struct BGBInventoryCache {
        uint32_t signature;     // 0x54374C54 ('T7LT')
        uint32_t total_items;   // Count of distinct catalog entries
        BGBItemEntry items[128];// Array of registered GobbleGum definitions
    };
    #pragma pack(pop)

    // Known internal IDs for classic Mega GobbleGums
    constexpr uint32_t BGB_ID_PERKAHOLIC     = 0x0001B4A1;
    constexpr uint32_t BGB_ID_SHOPPING_FREE  = 0x0001B4B5;
    constexpr uint32_t BGB_ID_NEAR_DEATH     = 0x0001B4C8;
    constexpr uint32_t BGB_ID_ROUND_ROBBIN   = 0x0001B4DF;
}
```

### Local State Spoofing: Unlocking 999x Consumables

Rather than attempting to spoof remote Demonware cryptographic envelopes over the wire, ResurgeGDK applies **in-memory state virtualization**.

The compatibility layer hooks the inventory deserialization routine (`Loot_ParseInventoryResponse`). When the engine attempts to process the payload, our hook intercepts the empty response buffer and substitutes a fully hydrated `BGBInventoryCache`:

```cpp
void __fastcall Hooked_Loot_ParseInventoryResponse(void* response_ctx, BGBInventoryCache* cache_out) {
    if (cache_out == nullptr) return;

    // Initialize synthetic catalog
    cache_out->signature = 0x54374C54;
    cache_out->total_items = static_cast<uint32_t>(g_AllKnownBGBIds.size());

    for (size_t i = 0; i < g_AllKnownBGBIds.size(); ++i) {
        cache_out->items[i].item_id = g_AllKnownBGBIds[i];
        
        // Local State Spoofing: Transform single base ownership into full 999 stockpile
        cache_out->items[i].item_count = 999;
        cache_out->items[i].item_flags = 0x03; // Unlocked & Consumable
    }

    LOG("Telemetry", "Synthesized 999x inventory across %u GobbleGums locally.", cache_out->total_items);
}
```

### Intercepting the Consumption Callback (`Loot_ConsumeItem`)

In vanilla gameplay, taking a GobbleGum from the Lion-head dispenser invokes an in-engine consumption request: the engine decrements the local integer and queues a Demonware transaction to update the server. If that transaction fails or is denied, the game revokes the gum mid-match.

ResurgeGDK detours `Loot_ConsumeItem`:

```cpp
bool __fastcall Hooked_Loot_ConsumeItem(uint32_t player_index, uint32_t item_id, uint32_t quantity) {
    LOG("Telemetry", "Intercepted consumption of item ID 0x%08X (Qty: %u). Enforcing preservation.", item_id, quantity);
    
    // Always return success to the game VM without decrementing the local 999 count
    // and without sending remote microtransaction telemetry packets.
    return true;
}
```

This ensures that players can utilize the full spectrum of Zombie mechanics, mega abilities, and weapon kits in complete offline isolation, safeguarding the game's long-term playability.

---

## 6. Integrated Ecosystem: Built-in Ezz BOIII Client & GSC Bytecode Injector

ResurgeGDK is not merely a background DLL; it is distributed as a unified desktop ecosystem combining an Electron front-end workstation with a low-level C++ injection engine.

### Built-in Ezz BOIII Client Integration

By the time Black Ops III reached end-of-life status, several severe security vulnerabilities emerged in the game's peer-to-peer networking stack:
* **Buffer Overflow Remote Code Execution (RCE)**: Malformed network packets sent to port 3074 could trigger stack overflows during packet deserialization.
* **Out-of-Bounds Crash Exploits**: Invalid crash packets crafted by malicious actors could remotely terminate active lobby instances.
* **P2P IP Harvesting**: Unencrypted voice and lobby packets exposed client public IP addresses to everyone in the session.

ResurgeGDK natively embeds the core protection patches developed by the community's **Ezz BOIII** project. Upon process attachment, ResurgeGDK installs memory patches over known vulnerable deserializers (`MSG_ReadBits`, `NET_OutOfBandData`), strips malicious control frames, and enforces strict buffer length validation on all network packets.

### Integrated GSC Script Injector

Unlike Black Ops 1 (which relies on plain-text zlib-compressed source code in `ASSET_TYPE_RAWFILE`), Black Ops III employs pre-compiled binary bytecode trees represented internally as **`ASSET_TYPE_SCRIPT_PARSETREE` (Asset Type `54` / `0x36`)**.

The ResurgeGDK launcher includes an integrated GSC compiler and in-memory injector, eliminating the need for third-party injection utilities:

```cpp
namespace resurge::gsc {

    #pragma pack(push, 1)
    struct ScriptParseTree {
        const char* name;
        int32_t buffer_size;
        int32_t compressed_size;
        const char* buffer; // Pointer to compiled GSC bytecode
    };
    #pragma pack(pop)

    static std::unordered_map<std::string, ScriptParseTree> g_CustomScripts;

    void* __fastcall Hooked_DB_FindXAssetHeader(int32_t asset_type, const char* asset_name, int32_t allow_default, int32_t flag) {
        // Intercept Script ParseTree queries
        if (asset_type == 54 && asset_name != nullptr) {
            std::string normalized_name = NormalizeScriptPath(asset_name);
            auto it = g_CustomScripts.find(normalized_name);
            if (it != g_CustomScripts.end()) {
                LOG("GSC", "Hot-swapping GSC bytecode for: %s", normalized_name.c_str());
                return &it->second;
            }
        }

        return original_db_find_xasset_header(asset_type, asset_name, allow_default, flag);
    }
}
```

### Real-Time Developer Console Streaming

To provide a seamless developer experience, ResurgeGDK detours the engine's central logging facility (`Com_PrintMessage` at image offset `0x14028A140`). Log lines are intercepted, formatted with high-resolution timestamps, and streamed over a local named pipe (`\\.\pipe\ResurgeGDK_LogPipe`) back to the Electron desktop launcher. Mod authors can monitor script compilation errors, missing FastFile assets, and engine warnings in real time without attaching heavy external debuggers.

---

## 7. Comparative Architectural Matrix

The following matrix highlights the operational differences across the standard Steam release, the vanilla Microsoft Store build, and the unified ResurgeGDK environment:

| Feature / Subsystem | Vanilla Steam PC | Vanilla MS Store (GDK) | ResurgeGDK Environment |
| :--- | :--- | :--- | :--- |
| **Runtime Target** | Win32 / `steam_api64.dll` | GDK / `xgameruntime.dll` | Dynamic GDK-to-Steam ABI Bridge |
| **Packaging Model** | Loose Win32 Folders | AppX / MSIX Sandbox | Virtualized AppX Container |
| **DLC Entitlement** | Steam Store Depots | Cloud License Check (`0x803F8001`) | Local VFS Redirection & Spoofing |
| **Steam Workshop** | Native Steam Client UGC | Completely Unsupported | BOIII Downloader + Custom VFS Mount |
| **GobbleGum / Loot** | Demonware Server-Tied | Inaccessible Offline | Local State Virtualization (999x) |
| **Network Security** | Vulnerable to Legacy P2P RCE | Vulnerable to Legacy P2P RCE | Hardened via Ezz BOIII Exploits Patches |
| **Script Modding** | External Compilers | Blocked by Sandbox | Integrated GSC Bytecode Injector |
| **Log Streaming** | Console Window Only | Suppressed by Shell | Real-Time Named Pipe IPC to UI |

---

## 8. Conclusion & Legacy Preservation

The fragmentation of PC games across competing application stores and runtime models poses a severe risk to long-term digital preservation. When proprietary backends deprecate or when titles are ported to sandboxed ecosystems that omit fundamental modding infrastructure, players lose access to community creations and core gameplay systems.

**ResurgeGDK** demonstrates how low-level systems engineering—leveraging dynamic COM VTable hooking, in-memory state virtualization, virtual filesystem redirection, and community-driven security patches—can unify fragmented game runtimes. By transforming the Microsoft Store release into a fully extensible, secure, and mod-capable environment, ResurgeGDK preserves one of the most celebrated modding eras in PC gaming history for years to come.
