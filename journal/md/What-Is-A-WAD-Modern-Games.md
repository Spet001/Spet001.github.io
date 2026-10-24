# What is a WAD? From 1993 DOOM to Reverse-Engineering Undocumented Demonware WADs (`online_tu17_mp.wad` & `online_tu14_mp_english.wad`) in Call of Duty & id Tech 7/8

> **Technical Summary / Quick Reference:**  
> - **What is `online_tu17_mp.wad`?** **`online_tu17_mp.wad` is NOT a DOOM or Zandronum mod.** It is an official, proprietary **Call of Duty: Black Ops II (T6 — Title Update 17)** online configuration container downloaded from **Activision / Demonware Publisher Storage** (`18397\pub\online_tu17_mp.wad`). It uses **Treyarch's `T3WAD` binary format** (magic header **`0x543377AB`** / `"T3w\xAB"`) and bundles 8 zlib-compressed lumps (`playlists_mp.info`, `codtv-mp.json`, `voting-mp.json`, `motd-mp-english.json`, `leagues.info`, `message_encryption.dat`, `entitlements.info`, and `youtube.info`).  
> - **What is `online_tu17_zm.wad`?** The *Call of Duty: Black Ops II* Zombies Title Update 17 Demonware WAD container (`playlists_zm.info`, `codtv-zm.json`, `voting-zm.json`, `motd-zm-english.json`).  
> - **What are `online_tu14_mp_english.wad` & `online_tu14_sp_english.wad`?** The *Call of Duty: Black Ops 1* (T5 — Title Update 14) Demonware Publisher Storage WAD containers (`18301\pub\`) for Multiplayer and Singleplayer/Zombies.  
> - **Is this limited to Treyarch or across the Call of Duty engine family?** Aggregated Demonware Publisher Storage containers (`.wad` and `.aggr`) were used across both **Treyarch (T-Engine)** and **Infinity Ward (IW Engine)** codebases in general. While Treyarch formalized the `0x543377AB` (`T3WAD`) format in T5/T6, Infinity Ward titles like *Modern Warfare 3* (IW5 — `18409\pub\`) likewise download compressed aggregate Publisher Storage containers (`playlists_tuXX.aggr` and online WAD lumps) to minimize LSP round-trips.
> 
> ![Demonware WAD Download in Call of Duty: Black Ops 1 MS Store Console](/assets/bo1_zpgdk_wad_download_runtime_log.png)  
> *Figure: Live engine console in ZPGDK (`t5s.exe` — Call of Duty: Black Ops 1 Microsoft Store) downloading and mounting `online_tu14_sp_english.wad` from Demonware Publisher Storage: `^3WAD: Big-endian WAD on Small-endian machine — Got Online WAD. 3 entries`.*

If you have ever modded classic *DOOM*, inspected old *Quake* or *Half-Life* textures, or poked around the local cache folders of *Call of Duty* clients like **Plutonium** or **ZPGDK (msclients)**, you have inevitably run into the `.wad` file extension.

Most developers know the famous trivia: **WAD** stands for **"Where's All the Data?"** — the legendary container format designed by John Carmack at id Software in 1993 for *DOOM* (id Tech 1).

What almost **no one** knows — and what has **zero public documentation on Google** — is why *Call of Duty* titles (like *Black Ops 1* and *Black Ops 2*) still download `.wad` files (`online_tu14_mp_english.wad`, `online_tu17_mp.wad`, `online_tu17_zm.wad`) from **Demonware's Publisher Storage**, what binary format those mystery `.wad` files actually use, and how **id Tech 7 & id Tech 8** (*DOOM Eternal* and *DOOM: The Dark Ages*) handle `.wad` files over 30 years later.

In this deep dive, we will trace the entire architectural lineage of the WAD format, **reverse-engineer Treyarch's undocumented `0x543377AB` Demonware `.wad` binary format byte-by-byte**, unpack its hidden payloads, and examine how modern engines evolved the concept.

---

## Part 1: Where's All the Data? (1993 id Tech 1 WAD Architecture)

Before *DOOM* (1993), early PC games (including *Wolfenstein 3D*) often hardcoded asset offsets or shipped rigid, monolithic data files that couldn't be patched without modifying the main executable or rebuilding the entire archive.

For *DOOM*, John Carmack designed the **WAD** format as a flat, virtualized Lump Filesystem. Instead of a hierarchical folder tree, a WAD file is a flat array of named binary blobs called **Lumps** (textures, sprites, sound effects, MUS/MIDI tracks, BSP map nodes, and palette tables).

### Binary Anatomy of a Classic DOOM WAD

A classic id Tech 1 `.wad` file consists of just three parts:
1. **A 12-byte Header (`wadinfo_t`)** at byte `0x00`.
2. **The Raw Lump Data Region** (uncompressed binary streams).
3. **The Lump Directory (`filelump_t[]`)**, typically located at the end of the file.

```c
// Classic id Tech 1 WAD Header (12 bytes, Little-Endian)
struct wadinfo_t {
    char     identification[4]; // "IWAD" (Internal WAD) or "PWAD" (Patch WAD)
    int32_t  numlumps;          // Total number of lumps in the directory
    int32_t  infotableofs;      // Byte offset to the filelump_t directory array
};

// Classic Lump Directory Entry (16 bytes per lump, Little-Endian)
struct filelump_t {
    int32_t  filepos;           // Byte offset to the start of the lump's data
    int32_t  size;              // Lump size in bytes (0 for virtual marker lumps)
    char     name[8];           // 8-byte null-padded uppercase ASCII name (e.g. "E1M1\0\0\0\0")
};
```

### `IWAD` vs. `PWAD`: How DOOM Invented Non-Destructive Modding

The brilliance of the 1993 WAD specification lies in the first 4 magic bytes (`IWAD` vs. `PWAD`) and how the engine's `W_InitMultipleFiles()` loader merges them in RAM:

- **`IWAD` (Internal WAD):** Contains the complete base game (`DOOM.WAD`, `DOOM2.WAD`).
- **`PWAD` (Patch WAD):** Contains custom overrides (custom maps, custom sprites, custom sounds).

When you launch DOOM or UZDoom with `-iwad doom2.wad -file mymod.wad`, the engine concatenates `mymod.wad`'s directory entries **after** `doom2.wad`'s directory entries in a single global array (`lumpinfo[]`).

When the engine requests an asset by name (e.g., `W_CheckNumForName("TITLEPIC")` or `W_GetNumForName("D_RUNNIN")`), **it scans the directory array backwards from the last index down to `0`** (or uses a hash chain built in reverse order). Because the `PWAD` was loaded last, its lumps are found first — automatically shadowing the original `IWAD` assets in memory without ever touching the base game file on disk!

---

## Part 2: The Evolutionary Tree (Quake, GoldSrc & IW Engine)

As 3D hardware accelerated and engines grew, the WAD format branched across the entire **id Tech family tree**:

```
id Tech 1 (DOOM, 1993) ──► IWAD / PWAD (Flat 8-char lump directory)
  │
  ├──► Quake (id Tech 2, 1996) ──► .PAK (Hierarchical VFS) + WAD2 ("WAD2" for mipmaps/HUD gfx)
  │      │
  │      └──► Half-Life (GoldSrc, 1998) ──► WAD3 ("WAD3" for 16-bit paletted world textures & decals)
  │
  └──► Quake III Arena (id Tech 3, 1999) ──► .PK3 (ZIP VFS)
         │
         └──► Call of Duty (IW Engine & Treyarch T-Engine)
                ├──► .IWD (ZIP VFS) & .FF (FastFiles - precompiled zone streams)
                └──► Demonware Publisher Storage: online_tuXX_*.wad (Treyarch T3WAD!)
```

Wait — look at that last branch. Why on earth does *Call of Duty* have `.wad` files inside its **Demonware** networking cache?

---

## Part 3: Reverse-Engineering Call of Duty's Undocumented Demonware `.wad` Files

If you inspect the local Demonware Publisher Storage cache dumped by *Call of Duty* clients such as **Plutonium** (`%LOCALAPPDATA%\Plutonium\storage\demonware\<title_id>\pub\`), you will find files with `.wad` extensions sitting right next to FastFiles (`.ff`):

- `18301\pub\online_tu14_mp_english.wad` (*Call of Duty: Black Ops 1* — Multiplayer)
- `18301\pub\online_tu14_sp_english.wad` (*Call of Duty: Black Ops 1* — Singleplayer / Zombies)
- `18397\pub\online_tu17_mp.wad` (*Call of Duty: Black Ops 2* — Multiplayer, Title Update 17)
- `18397\pub\online_tu17_zm.wad` (*Call of Duty: Black Ops 2* — Zombies, Title Update 17)

### What is `online_tu17_mp.wad` and `online_tu17_zm.wad`? (Call of Duty: Black Ops 2 — Title Update 17)

**`online_tu17_mp.wad`** is the official, proprietary **Demonware Publisher Storage** container downloaded by ***Call of Duty: Black Ops II* (Treyarch T6 engine)** under **Title Update 17 (TU17)**. It is **not** a classic DOOM PWAD or a Zandronum multiplayer patch; it is a custom Treyarch binary archive (`0x543377AB` / `T3WAD` header) stored in `%LOCALAPPDATA%\Plutonium\storage\demonware\18397\pub\online_tu17_mp.wad` (or fetched directly from Demonware's LSP/HTTP servers on Steam and Microsoft Store / Xbox PC builds).

When *Black Ops II* connects online, it downloads `online_tu17_mp.wad` (for Multiplayer) and `online_tu17_zm.wad` (for Zombies) into RAM to mount 8 zlib-compressed configuration lumps:
- `playlists_mp.info` (all BO2 Multiplayer playlists, map rotations, and live `setdvar` hotfixes)
- `codtv-mp.json` (COD TV / Theater Mode community feed layout)
- `voting-mp.json` (in-game voting polls)
- `motd-mp-english.json` (Message of the Day banner)
- `leagues.info` (League Play competitive divisions and rulesets)
- `message_encryption.dat` (Demonware telemetry encryption key blob)
- `entitlements.info` (Season Pass & DLC bitmask checks)
- `youtube.info` (YouTube Data API v2 key for BO2's built-in livestreaming)

### What is `online_tu14_mp_english.wad` and `online_tu14_sp_english.wad`? (Call of Duty: Black Ops 1 — Title Update 14)

**`online_tu14_mp_english.wad`** (Multiplayer) and **`online_tu14_sp_english.wad`** (Singleplayer / Zombies) are the official Demonware Publisher Storage archives utilized by ***Call of Duty: Black Ops 1* (Treyarch T5 engine)** under **Title Update 14 (TU14)**.

When the Black Ops 1 client connects to Activision/Demonware online services (on Steam, MS Store / ZPGDK, or community clients like Plutonium), it downloads this `.wad` file to initialize online multiplayer playlists (`playlists_mp.inf`), Mercenary contracts (`contracts.dat`), geographic matchmaking regions (`geogroups.info`), remote DVAR ACL limits (`restrict_access_wad_mp.csv`), and localized English Message of the Day strings (`motd-mp-english.txt`) in a single compressed stream.

If you search Google for `online_tu17_mp.wad` or `online_tu14_mp_english.wad`, AI Overviews and forum threads often misidentify them as DOOM / Zandronum server WADs solely because of the `.wad` file extension. In reality, they use Treyarch's custom `0x543377AB` binary container format.

Let's open a hex editor and prove it byte-by-byte.

### 1. Why Does Demonware Use `.wad` Files?

In *Call of Duty*, **Demonware** handles authentication, matchmaking, stats, and **Publisher Storage (`/pub/`)** — a cloud key-value file store that the game client queries on boot via `bdTitleUtilities` / `DWFileTask` to fetch live-service configurations without requiring a binary patch.

During the 7th-generation console era (Xbox 360 / PS3 / PC), millions of concurrent players logging into *Black Ops 1* (T5) and *Black Ops 2* (T6) needed to download up to **8 separate configuration files** before entering a lobby (playlists, contracts, Message of the Day, COD TV menus, League Play divisions, voting polls, and DVAR restrictions).

Issuing 8 separate Demonware LSP/HTTP file-transfer RPCs per player created massive transaction overhead on Demonware's backend.
- **Infinity Ward's solution** (seen in *Modern Warfare 3* / `18409\pub\playlists_tu21.aggr` and IW engine titles) was an aggregate `.aggr` and online WAD blob containing grouped playlists and matchmaking rules.
- **Treyarch's solution** (in *Black Ops 1* and *Black Ops 2*) was to build a custom **zlib-compressed WAD container (`online_tuXX_<mode>.wad`)** stamped with their own magic header (`0x543377AB` / `T3w\xAB`)!
- **Across the T & IW Engine Lineage:** In both engine families, batching Demonware Publisher Storage files into single compressed container archives (`.wad` / `.aggr`) was the core architectural pattern to keep 7th-gen lobby joins fast and resilient.

Instead of 8 network requests, the game downloads **one single `.wad` file** into RAM and mounts its lumps in memory.

### 2. Binary Specification of Treyarch's `T3WAD` (`0x543377AB`)

Inspecting the first 64 bytes of `online_tu17_mp.wad` reveals the following raw hex header:

```hex
00000000: ab 77 33 54 e2 79 5f 55 08 00 00 00 01 00 00 00  |.w3T.y_U........|
00000010: 70 6c 61 79 6c 69 73 74 73 5f 6d 70 2e 69 6e 66  |playlists_mp.inf|
00000020: 6f 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  |o...............|
00000030: 00 b5 9f 00 03 69 2e 00 00 01 70 63 6f 64 74 76  |.....i....pcodtv|
```

Look closely at the first 4 bytes: `AB 77 33 54`.
When read as a 32-bit Little-Endian integer, that is **`0x543377AB`** — which in ASCII is **`"T3w\xAB"`** (**Treyarch WAD**)!

Even more fascinating is a classic 7th-gen console engineering quirk inside this file: **Hybrid Endianness**. While the 16-byte file header is stored in **Little-Endian (LE)**, the integers inside each 44-byte directory entry (`compSize`, `decompSize`, `filePos`) are stored in **Big-Endian (BE)** (network byte order / Xbox 360 PowerPC & PS3 Cell BE native byte order)!

Here is the exact reverse-engineered C struct definition for Treyarch's Demonware WAD format:

```c
#include <stdint.h>

// Magic constant: 0x543377AB ("T3w\xAB" in Little-Endian)
#define T3WAD_MAGIC 0x543377AB

// 16-Byte File Header (Little-Endian)
struct T3WadHeader {
    uint32_t magic;       // 0x543377AB (Bytes: AB 77 33 54)
    uint32_t timestamp;   // Unix Epoch build timestamp (LE)
    uint32_t lumpCount;   // Number of compressed lumps in directory (LE)
    uint32_t version;     // 0 = Black Ops 1 (T5), 1 = Black Ops 2 (T6) (LE)
};

// 44-Byte Lump Directory Entry (Starts immediately at offset 0x10)
struct T3WadLumpEntry {
    char     name[32];    // Null-padded ASCII filename (32 bytes, e.g. "playlists_mp.info")
    uint32_t compSize;    // BIG-ENDIAN: Size of zlib-compressed payload in bytes
    uint32_t decompSize;  // BIG-ENDIAN: Original uncompressed size in bytes
    uint32_t filePos;     // BIG-ENDIAN: Absolute byte offset to zlib stream (0x78 0xDA / 0x78 0x9C)
};
```

---

### 3. Live Runtime Proof: ZPGDK Intercepting Demonware WAD Downloads in Black Ops 1 (MS Store / Xbox PC)

Theory is good, but **live runtime engine telemetry is definitive proof**.

When launching *Call of Duty: Black Ops 1* on the modern Microsoft Store / Xbox PC platform through our custom **ZPGDK (msclient)** runtime environment, the engine console outputs the exact internal Demonware WAD downloader routine:

![ZPGDK BO1 WAD Runtime Console Log](/assets/bo1_zpgdk_wad_download_runtime_log.png)

```text
[Game-Engine] Failed to fetch DW file 'CompressedMetPlayer3.info': err 1000 'BD_NO_FILE'. (553ms)
[Game-Engine] Read 3493 bytes of file online_tu14_sp_english.wad. (565ms)
[Game-Engine] ^3WAD: Big-endian WAD on Small-endian machine
[Game-Engine] Got Online WAD. 3 entries, generated: Wed Dec 11 19:24:20 2024
[Game-Engine] Warning: Invalid category ID found, returning first category.
[Game-Engine] Read 40 bytes of file spstatsCompressed. (750ms)
[Game-Engine] Stats blob received from Demonware for controller 0.
```

Notice the three groundbreaking confirmations in this log:
1. **The Live Download (`565ms`)**: The client fetches `online_tu14_sp_english.wad` (3,493 bytes) directly from the official Activision/Demonware storage servers upon initialization.
2. **The Endianness Warning**: `^3WAD: Big-endian WAD on Small-endian machine`! The engine's low-level filesystem parser explicitly verifies that the WAD was compiled in Big-Endian format (PowerPC Xbox 360 / Cell BE) and executes runtime byte-swapping routines (`_byteswap_ulong`) to unpack it on modern x86/x64 Small-Endian CPU architecture.
3. **Server Generation Timestamp**: `Got Online WAD. 3 entries, generated: Wed Dec 11 19:24:20 2024`. Demonstrating that Demonware's server pipeline generated and signed this exact bundle for Microsoft Store distribution.

---

### 4. What is Actually Inside Those Demonware `.wad` Files?

By writing a parser for `T3WadHeader` and inflating each `zlib` stream at `filePos`, we can extract every single lump from the `.wad` files in `/storage/demonware/`:

#### `online_tu14_mp_english.wad` (*Black Ops 1* / T5 — Built Oct 1, 2015 / May 1, 2012)
| Lump # | Lump Name | Compressed | Decompressed | Purpose in Engine |
| :--- | :--- | :--- | :--- | :--- |
| `0` | `contracts.dat` | 16,652 B | 160,573 B | Full table of Multiplayer Mercenary Contracts, COD Points rewards, and timers. |
| `1` | `geogroups.info` | 357 B | 545 B | Matchmaking geographic routing table (`#Los Angeles, US LAX 1`, `#New Jersey, US EWR 1`, etc.). |
| `2` | `motd-mp-english.txt` | 131 B | 165 B | Message of the Day ticker text at the bottom of the Multiplayer screen. |
| `3` | `playlists_mp.info` | 7,157 B | 76,350 B | All MP & Wager Match playlists, map rotations, rulesets, and live `setdvar` overrides. |
| `4` | `restrict_access_wad_mp.csv` | 100 B | 135 B | Remote DVAR ACL table (`dvarname,client,unranked,ranked action`) to remotely lock/unlock console DVARs. |

> **Historical Easter Egg Inside the WADs:**  
> Comparing the official 2012 Demonware dump (`18409`) against the modded T5M/Plutonium dump (`18301`) reveals a piece of *Call of Duty* history frozen in time:  
> - In the untouched May 1, 2012 WAD (`18409`), `motd-mp-english.txt` reads:  
>   `"Black Ops 2 officially revealed! Head to www.facebook.com/codblackops to watch the reveal trailer. Follow @pcdev on twitter..."`  
> - In the 2015 custom client WAD (`18301`), the old T5M developers repacked the WAD so `motd-mp-english.txt` reads `"T5M got ^5REKT"` and `motd-sp-english.txt` reads `"^5Demynnfire ^7loves you ^1<3^6<3 This just in: Leaderboards! Zombies are fun!"`

#### `online_tu17_mp.wad` & `online_tu17_zm.wad` (*Black Ops 2* / T6 — Title Update 17)
| Lump # | Lump Name | Compressed | Decompressed | Purpose in Engine |
| :--- | :--- | :--- | :--- | :--- |
| `0` | `playlists_mp.info` | 46,495 B | 223,534 B | Complete BO2 Multiplayer playlists (Version 1736), map weights, and live `setdvar` hotfixes. |
| `1` | `codtv-mp.json` | 1,496 B | 9,618 B | Folder & feed hierarchy for BO2's **COD TV / Theater Mode** community shares. |
| `2` | `voting-mp.json` | 362 B | 1,327 B | In-game community voting poll definitions and expiration timestamps. |
| `3` | `motd-mp-english.json` | 496 B | 808 B | Structured JSON Message of the Day popup banner. |
| `4` | `leagues.info` | 6,481 B | 40,232 B | **League Play** competitive divisions, ranks, skill subdivision icons, and rulesets. |
| `5` | `message_encryption.dat` | 183 B | 1,280 B | Key material blob for Demonware client-server telemetry encryption. |
| `6` | `entitlements.info` | 308 B | 941 B | Bitmask key definitions for Season Pass & DLC ownership checks. |
| `7` | `youtube.info` | 219 B | 262 B | Hardcoded Google YouTube Data API v2 developer key used by BO2's built-in Livestreaming feature! |

*(And `online_tu17_zm.wad` carries the 4 equivalent lumps for Zombies: `codtv-zm.json`, `voting-zm.json`, `motd-zm-english.json`, and `playlists_zm.info`).*

### 4. Write Your Own Demonware `.wad` Unpacker (Node.js)

Want to unpack and inspect these `.wad` files yourself? Here is a complete, zero-dependency Node.js script that parses the `0x543377AB` header and inflates every lump:

```javascript
const fs = require('fs');
const zlib = require('zlib');

function unpackTreyarchWad(wadPath) {
    const buf = fs.readFileSync(wadPath);
    const magic = buf.readUInt32LE(0);
    if (magic !== 0x543377AB) {
        throw new Error(`Invalid T3WAD magic: 0x${magic.toString(16)}`);
    }

    const timestamp = new Date(buf.readUInt32LE(4) * 1000).toISOString();
    const lumpCount = buf.readUInt32LE(8);
    const version = buf.readUInt32LE(12);

    console.log(`[T3WAD] ${wadPath} | Built: ${timestamp} | Lumps: ${lumpCount} | Ver: ${version}`);

    let dirOffset = 16;
    for (let i = 0; i < lumpCount; i++) {
        const rawName = buf.subarray(dirOffset, dirOffset + 32);
        const nullIdx = rawName.indexOf(0);
        const name = rawName.subarray(0, nullIdx >= 0 ? nullIdx : 32).toString('utf8');

        // Directory integers are Big-Endian (Network / Console byte order)
        const compSize = buf.readUInt32BE(dirOffset + 32);
        const decompSize = buf.readUInt32BE(dirOffset + 36);
        const filePos = buf.readUInt32BE(dirOffset + 40);

        const compressedSlice = buf.subarray(filePos, filePos + compSize);
        const decompressed = zlib.inflateSync(compressedSlice);

        console.log(`  -> [${i}] ${name} (${compSize}B -> ${decompressed.length}B @ 0x${filePos.toString(16)})`);
        dirOffset += 44;
    }
}
```

### 5. Do Modern Call of Duty Games (BO3, MW19, Cold War, BO6) Still Use `.wad`?

Starting with **Black Ops 3 (T7)** and **Black Ops 4 (T8)**, and continuing into the unified **IW8 / IW9** engines (*Modern Warfare 2019*, *Black Ops Cold War*, *MWII*, *MWIII*, *Black Ops 6*):
1. **Live Hotfixes Moved to `FFOTD` & `.lpf`:** Because T7+ introduced the **Lua UI (LUI)** virtual machine and hot-patchable **GSC/CSC ScriptBundles**, simple text playlists were no longer enough for live updates. Demonware Publisher Storage shifted to serving **`core_ffotd_tuXX_*.ff` (FastFile of the Day)** and signed playlist/hotfix archives.
2. **Heavy Assets Moved to `.xpak` & CAS `.pak`:** Streamed textures, audio, and geometry moved to LZ4/Oodle-compressed `.xpak` (T7/T8/T9) and Content-Addressable Storage (CAS) `.pak` containers (IW8/IW9).
3. **Legacy Naming Survives in Engine Symbols:** Even when the file extension changed, internal C++ symbols and DVAR tables inside the Demonware `bdTitleUtilities` wrapper still reference *"online WAD"* loading tasks (`LiveStorage_GetOnlineWad`, `restrict_access_wad`) as a fossilized holdover from the T5/T6 era!

---

## Part 4: How id Tech 7 & id Tech 8 Handle WADs Today

What about id Software itself — the birthplace of the WAD? How do modern **id Tech 7** (*DOOM Eternal*) and **id Tech 8** (*DOOM: The Dark Ages*) treat `.wad` files?

There are two sides to the story: **literal legacy `.wad` support** and **the modern `.resources` / `.streamdb` architecture**.

### 1. Literal `.wad` Execution Inside id Tech 7 (`base/classicwads/`)

If you browse the installation directory of *DOOM Eternal* (id Tech 7), you will find a folder that looks straight out of 1994:

```text
DOOM Eternal/
 └── base/
      └── classicwads/
           ├── doom.wad    (The Ultimate DOOM IWAD)
           └── doom2.wad   (DOOM II: Hell on Earth IWAD)
```

Why are unmodified 1993/1994 `.wad` files sitting inside a cutting-edge Vulkan engine?
Inside the **Fortress of Doom** (the Doom Slayer's orbital hub — located in the Mars/Earth system!), there is an old 1990s CRT computer on the Slayer's desk. When you interact with it, **id Tech 7 boots a native, embedded classic DOOM engine instance** that renders directly into a virtual CRT texture inside the 3D scene and reads `base/classicwads/doom.wad` and `doom2.wad` using the classic `wadinfo_t` / `filelump_t` lump loader!

In fact, PC modders quickly discovered that because id Tech 7's embedded emulator uses standard `W_Init` lump parsing, you can replace or drop custom vanilla-compatible `.wad` files into `base/classicwads/` and play custom DOOM levels on the Doom Slayer's computer inside *DOOM Eternal*.

### 2. From `.wad` to `.resources` & `.streamdb` (The 64-Bit Spiritual Successor)

For its own native assets, id Tech 7 and id Tech 8 no longer use `.wad` or `.pk4`. Instead, they split the archive system into two specialized container types:

1. **`.resources` Archives (Logic, Decls, Base Metadata & Meshes):**
   - Conceptually, an id Tech 7 `.resources` file (`IDCL` header) is the **64-bit, Oodle-Kraken-compressed descendant of Carmack's 1993 WAD**.
   - Just like a WAD has a header pointing to a flat Lump Directory (`infotableofs`), a `.resources` container has a binary header pointing to a 64-bit **Resource Directory Table** (`filepos`, `compressedSize`, `uncompressedSize`, `resourceType`, `nameHash`, and dependency indices).
   - Even classic DOOM's PWAD override philosophy lives on: id Tech 7 modding tools (`EternalModInjector` / `SAMUEL`) inject modded assets by patching the `.resources` offset directory and updating container hashes, echoing how PWADs shadowed IWAD lumps 30 years ago.

2. **`.streamdb` Archives (GPU-Direct MegaTexture / Geometry Streaming):**
   - Classic WADs loaded entire lumps into CPU RAM. In a modern 4K engine, decompressing gigabytes of textures and high-poly meshes on the CPU would cause severe frame-time spikes.
   - `.streamdb` files store pre-tiled texture mipmaps and geometry LOD pages indexed by 64-bit hash keys. At runtime, id Tech 7/8 streams compressed blocks directly from NVMe storage into Vulkan device-local VRAM (and via **DirectStorage** GPU decompression in id Tech 8), bypassing traditional filesystem overhead entirely.

---

## Conclusion

From a 12-byte header and 8-character lump names in 1993 *DOOM*, to Treyarch's undocumented `0x543377AB` (`T3w\xAB`) Demonware `.wad` containers (`online_tu17_mp.wad`, `online_tu17_zm.wad`, `online_tu14_mp_english.wad`, `online_tu14_sp_english.wad`) powering *Call of Duty: Black Ops 1 & 2* live-service playlists, to `base/classicwads/` and 64-bit `.resources` tables in *DOOM Eternal* — the **WAD** is one of the longest-living architectural patterns in video game history.

---

## Frequently Asked Questions (FAQ): `online_tu17_mp.wad` & Demonware WADs

### What is `online_tu17_mp.wad`? (O que é o arquivo `online_tu17_mp.wad`?)
**EN:** `online_tu17_mp.wad` is **NOT** a DOOM or Zandronum multiplayer mod. It is an official **Call of Duty: Black Ops II (T6 — Title Update 17)** online configuration container downloaded from **Activision / Demonware Publisher Storage** (`18397\pub\online_tu17_mp.wad`). Compiled using Treyarch's custom `T3WAD` binary format (magic bytes `AB 77 33 54` / `0x543377AB`), it bundles 8 zlib-compressed lumps (`playlists_mp.info`, `codtv-mp.json`, `voting-mp.json`, `motd-mp-english.json`, `leagues.info`, `message_encryption.dat`, `entitlements.info`, and `youtube.info`) into a single network transfer.  
**PT-BR:** O arquivo **`online_tu17_mp.wad` NÃO é um mod de DOOM ou Zandronum**. Ele é um pacote binário oficial de configuração online de **Call of Duty: Black Ops II (T6 — Title Update 17)** baixado dos servidores **Demonware Publisher Storage** da Activision (`18397\pub\online_tu17_mp.wad`). Ele utiliza o formato proprietário `T3WAD` da Treyarch (assinatura mágica `0x543377AB` / `"T3w\xAB"`) e agrupa 8 arquivos comprimidos com `zlib` (playlists do multiplayer `playlists_mp.info`, configurações da League Play `leagues.info`, COD TV `codtv-mp.json`, votações, Message of the Day e chaves de telemetria) em um único download ao iniciar o modo online.

### What is `online_tu17_zm.wad`?
`online_tu17_zm.wad` is the Zombies equivalent of `online_tu17_mp.wad` in *Call of Duty: Black Ops II* (Title Update 17). It uses the same `0x543377AB` (`T3WAD`) header and stores 4 zlib-compressed lumps for Zombies online matchmaking: `playlists_zm.info`, `codtv-zm.json`, `voting-zm.json`, and `motd-zm-english.json`.

### What are `online_tu14_mp_english.wad` and `online_tu14_sp_english.wad`?
They are the *Call of Duty: Black Ops 1* (T5 — Title Update 14) Demonware Publisher Storage WAD containers (`18301\pub\`). `online_tu14_mp_english.wad` carries `contracts.dat`, `geogroups.info`, `motd-mp-english.txt`, `playlists_mp.info`, and `restrict_access_wad_mp.csv`, while `online_tu14_sp_english.wad` carries Singleplayer/Zombies online configuration lumps.

### How can I open or extract `online_tu17_mp.wad` or `online_tu14_mp_english.wad`?
You can open, inspect, and extract Treyarch `0x543377AB` Demonware `.wad` files directly in your browser using **[Spet's Universal Game File Opener](/tools/universal-file/)** (100% client-side, zero uploads), or by running the Node.js `unpackTreyarchWad` script provided in Part 3 of this article.

> **Want to see classic `.wad` loading in action right now?**  
> Open the **CLI Terminal** on this portfolio and type **`mars`** (or **`delicia doom`**) to boot **UZDoom (WebAssembly)** directly in your browser, complete with on-demand `.wad` streaming and local IndexedDB caching!
