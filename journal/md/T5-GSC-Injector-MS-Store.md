# Black Ops 1 (T5) MS Store GSC Injector

Continuing our reverse engineering adventures on legacy titles, today I'll talk about building a GSC (Game Script Code) Injector for **Call of Duty: Black Ops 1 (T5) - MS Store/Xbox App Edition**.

This implementation was heavily inspired by the amazing [findings over at lunar.sh](https://journal.lunar.sh/2023/gsctool.html), but adapted and converted specifically for the Windows UWP/MS Store binaries using custom offsets found via IDA Pro cross-references.

## The Challenge

Unlike newer titles, Black Ops 1 handles script files differently. The game engine loads scripts as `RawFile` assets.
If you simply try to hook `Scr_LoadScript` or replace the text in memory, the game will crash or ignore the payload. Why? Because the Black Ops 1 engine explicitly expects these `RawFile` assets to be **zlib-compressed**.

## The Solution

By analyzing the UWP binaries in IDA Pro, i located the exact offsets for `DB_FindXAssetHeader`. This function acts as the central hub for the game's asset pipeline. By installing a detour hook on this function, we can intercept the game's requests for specific `.gsc` scripts.

Here is how the injection pipeline works:
1. **Hook `DB_FindXAssetHeader`:** We intercept asset queries. When the game requests `maps/mp/gametypes/_clientids` (for Multiplayer) or `maps/_zombiemode_ffotd` (for Zombies), we step in.
2. **On-the-fly Zlib Compression:** We take our custom plain-text `.gsc` file, strip any UTF-8 BOMs, and pass it through standard `zlib` compression (`compress()`).
3. **Struct Forging:** We wrap the compressed buffer inside a custom `RawFileData` struct:
   ```cpp
   struct RawFileData {
       int32_t deflatedSize;
       int32_t compressedSize;
       // ... byte buffer ...
   };
   ```
4. **Injection:** We return the pointer to our forged `RawFile` struct. The engine happily decompresses it natively and executes our custom script.

### Bonus: Asset Dumping
Since we're already hooking the core asset loader, the injector also features a built-in "GSC Dumper". It intercepts the original `RawFile` structs, decompresses them using `uncompress()`, and saves the raw vanilla game scripts to disk for study and modding reference!

A fascinating exercise in memory manipulation, compression algorithms, and legacy engine architecture!
