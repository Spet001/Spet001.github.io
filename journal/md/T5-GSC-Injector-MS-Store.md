# Black Ops 1 (T5) MS Store GSC Injector

Continuing our reverse engineering work across legacy Call of Duty titles ported to the modern Microsoft Store / Xbox App (GDK) ecosystem, this entry covers the architecture and implementation of the **ZPGDK GSC Injector & FastFile Script Dumper** for **Call of Duty: Black Ops 1 (T5)**.

While our initial research was inspired by the classic 32-bit findings documented on [lunar.sh](https://journal.lunar.sh/2023/gsctool.html), bringing a reliable script injector and asset dumper to the Microsoft Store release required reverse engineering the newly compiled **64-bit UWP/GDK binaries** (`BlackOps.exe` and `BlackOpsMP.exe`) in IDA Pro, reconstructing widened x64 engine structures, and solving subtle lifecycle traps unique to Treyarch's T5 engine.

---

## 1. Runtime Plain-Text Compilation vs. Bytecode Trees

Unlike *Black Ops II* (T6)—which pre-compiles scripts offline into binary bytecode blobs (`ASSET_TYPE_SCRIPT_PARSETREE`, Type `48`)—*Black Ops 1* (T5) stores `.gsc` scripts inside FastFiles (`.ff`) as plain-text source code wrapped inside **`ASSET_TYPE_RAWFILE` (Type `36` / `0x24`)** assets.

When a level initializes, the engine queries `DB_FindXAssetHeader` for the target script, decompresses its payload in memory, and passes the raw text buffer directly to the internal runtime compiler (`Scr_CompileText` at `base + 0x4B43F0` and `Scr_PostCompileScripts` at `base + 0x4B8290`).

However, if you simply hook `DB_FindXAssetHeader` and point a `RawFile` buffer to an uncompressed `.gsc` string on disk, the game will immediately fault. T5's asset pipeline strictly expects `RawFile` script buffers to carry an 8-byte size header followed by a **zlib-compressed (`DEFLATE`) stream**, and the 64-bit MS Store port widened the outer `RawFile` structure fields for x64 alignment.

---

## 2. Reconstructing the 64-bit GDK Engine Structures & Offsets

Using IDA Pro cross-references and BinDiff against the legacy 32-bit Steam executables, we mapped out both the Multiplayer (`BlackOpsMP.exe`) and Singleplayer/Zombies (`BlackOps.exe`) binaries relative to the 64-bit image base (`0x140000000`).

In the x64 GDK build, `game::RawFile` widens its length field to `std::int64_t`, while the inner payload pointed to by `buffer` begins with a packed 8-byte `RawFileData` header containing `deflatedSize` and `compressedSize`:

```cpp
namespace game {
    struct RawFileData {
        std::int32_t deflatedSize;   // Uncompressed length (including null terminator)
        std::int32_t compressedSize; // Size of the zlib payload immediately following this struct
    };

    struct RawFile {
        const char* name;
        std::int64_t len;
        const char* buffer;
    };

    enum XAssetType { ASSET_TYPE_RAWFILE = 36 }; // 0x24

    // Exact IDA Verified Offsets for MS Store (Relative to base 0x140000000)
    constexpr std::uintptr_t OFFSET_MP_DB_FINDXASSETHEADER = 0x542770; // BlackOpsMP.exe
    constexpr std::uintptr_t OFFSET_MP_G_INITGAME           = 0x5C99E0;
    constexpr std::uintptr_t OFFSET_SP_DB_FINDXASSETHEADER = 0x411DD0; // BlackOps.exe
    constexpr std::uintptr_t OFFSET_SP_G_INITGAME           = 0x52E4C0;
}
```

Because Black Ops 1 splits Singleplayer/Zombies (`BlackOps.exe`) and Multiplayer (`BlackOpsMP.exe`) into two distinct binaries, our injector dynamically detects the active executable at startup (`game::is_mp()`) and installs the appropriate inline detours.

---

## 3. Forging Zlib-Compressed `RawFile` Assets in Memory

Two subtle quirks in T5's asset loader must be handled before compressing a custom script:
1. **Extension Stripping:** Unlike later engines, T5 strips `.gsc` when querying `ASSET_TYPE_RAWFILE` (for example, querying `"maps/mp/gametypes/_clientids"` or `"maps/_zombiemode_ffotd"`).
2. **UTF-8 BOM Stripping:** If a `.gsc` file is saved with a 3-byte UTF-8 BOM (`0xEF, 0xBB, 0xBF`), T5's legacy lexer (`Scr_CompileText`) fails on line 1.

`RegisterCustomScript` normalizes the target asset path, strips any UTF-8 BOM, compresses the null-terminated payload via `zlib`'s `compress()`, prefixes it with `game::RawFileData`, and registers the forged `game::RawFile` descriptor:

```cpp
bool RegisterCustomScript(const std::wstring& filePath, const std::string& targetAssetName) {
    // ... read plain-text .gsc from disk and strip 3-byte UTF-8 BOM (0xEF 0xBB 0xBF) ...
    const char* src_ptr = buffer.data() + offset;
    size_t uncompressed_len = strlen(src_ptr) + 1;
    std::string normTarget = NormalizeAssetName(targetAssetName);
    uLongf destLen = compressBound(static_cast<uLong>(uncompressed_len));

    CustomRawAsset asset;
    asset.targetName = normTarget;
    asset.compressedData.resize(sizeof(game::RawFileData) + destLen);

    auto* raw_header = reinterpret_cast<game::RawFileData*>(asset.compressedData.data());
    char* compress_dest = asset.compressedData.data() + sizeof(game::RawFileData);

    if (compress(reinterpret_cast<Bytef*>(compress_dest), &destLen,
                 reinterpret_cast<const Bytef*>(src_ptr), static_cast<uLong>(uncompressed_len)) == Z_OK) {
        raw_header->deflatedSize = static_cast<std::int32_t>(uncompressed_len);
        raw_header->compressedSize = static_cast<std::int32_t>(destLen);

        size_t total_size = sizeof(game::RawFileData) + destLen;
        asset.compressedData.resize(total_size);
        asset.rawFile.len = static_cast<std::int64_t>(total_size);
        asset.rawFile.buffer = asset.compressedData.data();

        g_CustomAssets[normTarget] = std::move(asset);
        g_CustomAssets[normTarget].rawFile.name = g_CustomAssets[normTarget].targetName.c_str();
        return true;
    }
    return false;
}
```

---

## 4. Solving the `frontend.d3dbsp` Trap in Singleplayer & Zombies

During testing on `BlackOps.exe`, we encountered a classic T5 engine quirk: **the main menu in Black Ops 1 is not a static 2D UI—it is an actual 3D level (`frontend.d3dbsp`)** where Mason is strapped to the interrogation chair in the room of televisions.

Because `frontend` boots the full scripting VM, the engine queries `DB_FindXAssetHeader` for shared scripts while still in the main menu. If the injector prematurely swaps in a Zombies mod script during the `frontend` load, the script references Zombies-specific functions that do not exist in `frontend.ff`, crashing the game before the menu even renders.

To prevent this, `db_find_xasset_header_stub` monitors **Asset Type `12` (`.d3dbsp`)** queries to track `g_CurrentMapName` in real time. Whenever `!game::is_mp()` and the active level is `frontend`, the hook returns the vanilla asset untouched until an actual Zombies or Campaign map is loaded:

```cpp
void* __fastcall db_find_xasset_header_stub(int type, const char* name, int allowDefault, int a4) {
    if (name != nullptr && IsValidPointer(name)) {
        if (type == 12 || strstr(name, ".d3dbsp") != nullptr) {
            g_CurrentMapName = name; // Track active BSP level
        }
    }

    if (type == game::ASSET_TYPE_RAWFILE && name != nullptr && IsValidPointer(name)) {
        void* origAsset = db_find_xasset_header_hook.invoke<void*>(type, name, allowDefault, a4);
        if (origAsset != nullptr && g_GscDumpEnabled) {
            DumpOriginalRawFile(name, reinterpret_cast<game::RawFile*>(origAsset));
        }

        // Skip injection while on the interactive 3D main menu (frontend.d3dbsp)
        bool isFrontend = (g_CurrentMapName.empty() ||
                           g_CurrentMapName.find("frontend") != std::string::npos ||
                           strstr(name, "frontend") != nullptr);
        if (!game::is_mp() && isFrontend) return origAsset;

        if (g_GscInjectorEnabled) {
            auto it = g_CustomAssets.find(NormalizeAssetName(name));
            if (it != g_CustomAssets.end() && it->second.rawFile.buffer != nullptr) {
                return &it->second.rawFile;
            }
        }
        return origAsset;
    }
    return db_find_xasset_header_hook.invoke<void*>(type, name, allowDefault, a4);
}
```

---

## 5. Multi-Mode Autoloader & Vanilla FastFile GSC Dumper

Rather than restricting modders to a single hardcoded script, `AutoLoadModScripts()` manages a `zeroproxy.ini` configuration file and scans `/mods` recursively based on the active mode:
- **Multiplayer (`BlackOpsMP.exe`):** Maps `mods/_clientids.gsc` -> `maps/mp/gametypes/_clientids` and `mods/mp/**` -> `maps/mp/**`, while hooking `G_InitGame` (`base + 0x5C99E0`) to dispatch `set developer 1; set developer_script 1;` via `Cbuf_AddText`.
- **Zombies & Campaign (`BlackOps.exe`):** Hooks `mods/_zombiemode_ffotd.gsc` -> `maps/_zombiemode_ffotd` (the FastFile-Of-The-Day hotfix entry point), `mods/_ambientpackage.gsc` -> `maps/_ambientpackage`, and `mods/zm/**` -> `maps/**`, while hooking `Com_PrintMessage` (`base + 0x531400`) to pipe internal engine logs to the ZPGDK console.

Finally, because our detour sits directly on `DB_FindXAssetHeader`, setting `gsc_dump = 1` in `zeroproxy.ini` turns the injector into a **FastFile Script Extractor**. Before overriding any `RawFile`, `DumpOriginalRawFile` inspects `RawFileData::deflatedSize`, calls `zlib`'s `uncompress()`, and writes the clean vanilla `.gsc` source tree to `/dumped_gsc/<asset_path>.gsc` for study and modding reference.
