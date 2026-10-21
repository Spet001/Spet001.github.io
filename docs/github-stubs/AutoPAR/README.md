# AutoPAR — Automated PAR Archive Modding & Container Tool for Ryu Ga Gotoku Games

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Nexus Mods](https://img.shields.io/badge/Nexus_Mods-Like_a_Dragon_Mod_181-orange.svg)](https://www.nexusmods.com/likeadragonpirateyakuzainhawaii/mods/181)
[![Platform: Windows](https://img.shields.io/badge/Platform-Windows_x64-0078D6.svg)]()
[![Engine: Dragon Engine / Magical V-Engine](https://img.shields.io/badge/Engine-Ryu_Ga_Gotoku_Studio-red.svg)]()
[![Status: Maintained on Nexus Mods](https://img.shields.io/badge/Status-Maintained_on_Nexus_Mods-success.svg)](https://www.nexusmods.com/likeadragonpirateyakuzainhawaii/mods/181)

> **Repository Archival Notice & Official Distribution Channels:**  
> The original Git development source repository was archived during an infrastructure migration. The official compiled release binaries, automated installers, and user guides remain actively maintained on **[Nexus Mods (Mod #181)](https://www.nexusmods.com/likeadragonpirateyakuzainhawaii/mods/181)**.  
> 
> For client-side web tools and systems engineering publications, visit **[Eduardo Gelain's Portfolio](https://spet01.dev/)**.

> [!NOTE]
> **Nota do Autor / Author's Note:**  
> Esta ferramenta foi criada no início dos meus estudos de modding e automação de arquivos. A interface pode ser simples, a usabilidade pode exigir atenção e podem existir bugs pontuais — mas ela funciona, entrega o que promete com segurança e foi um utilitário pioneiro e único para a comunidade de modding da franquia Yakuza / Like a Dragon.

---

## Overview

**AutoPAR** (also known as **AutoParMS - Yakuza Mod Toolkit**) is an automated container management, mod packaging, and asset injection utility built for PC titles developed by **Ryu Ga Gotoku Studio** (*Yakuza* series, *Judgment* series, and *Like a Dragon*, including *Like a Dragon: Pirate Yakuza in Hawaii*).

Games running on Sega's Dragon Engine and Magical V-Engine store their game data—including character parameters, stages, audio, scripts, and textures—inside proprietary `.par` (PARC) archives. Traditionally, modifying these games required complex command-line workflows with ParTool, manual directory structuring, and fragile index rebuilding that often corrupted internal offset tables.

AutoPAR automates the entire unpacking, patching, repacking, and file verification pipeline with a single click, providing seamless mod installation and asset preservation for modders and players.

---

## Key Technical Features

### 1. Automated PAR Container Processing
* **Automated Workflow:** Replaces manual CLI workflows by automatically scanning, batch-unpacking, and restructuring `.par` archives based on drop-in mod directories.
* **Lossless PARC Rebuilding:** Reconstructs the internal directory extent tables, preserving engine alignment flags and 32-bit offset integrity.

### 2. Multi-Tier Compression Management
* Supports both uncompressed raw payloads and zlib-compressed blocks utilized throughout modern Dragon Engine titles.
* Validates chunk boundaries and recalculates internal block sizes on-the-fly during asset repack.

### 3. Mod Manager & Installer Compatibility
* Integrates cleanly with modern Yakuza and Like a Dragon mod managers (such as Shin Ryu Mod Manager / SRMM), functioning as an automated backend handler for deep PAR container overrides.
* Prevents file overwrites by maintaining non-destructive backup layers for vanilla assets.

### 4. Support for Modern Releases
* Fully compatible with the newest Dragon Engine architectures, including *Like a Dragon: Infinite Wealth*, *Like a Dragon Gaiden*, and *Like a Dragon: Pirate Yakuza in Hawaii*.

---

## Official Releases & Download Links

Compiled binaries, release archives, and community setup instructions are hosted exclusively on Nexus Mods:

* **Official Mod Page (Mod #181):** [https://www.nexusmods.com/likeadragonpirateyakuzainhawaii/mods/181](https://www.nexusmods.com/likeadragonpirateyakuzainhawaii/mods/181)
* **Nexus Mods Profile:** [https://www.nexusmods.com/profile/Spet001/mods](https://www.nexusmods.com/profile/Spet001/mods)

---

## Developer Ecosystem & Web Tools Suite

Explore Eduardo Gelain's client-side engineering tools running 100% locally in your browser:

* **[Spet's Universal Game File Opener](https://spet01.dev/tools/universal-file/)**: In-browser parser and extractor for 25+ game engine formats—including full client-side parsing of Sega Ryu Ga Gotoku `.par` archives!
* **[Spet's Easy Online Decompiler](https://spet01.dev/tools/easy-decompiler/)**: WebAssembly-powered binary analyzer, disassembler, and dual C-like decompiler (Rizin + Ghidra Sleigh) for PE, ELF, and Mach-O files. Zero server uploads.
* **[Spet's Quick 3D Studio](https://spet01.dev/tools/image-to-3d/)**: Procedural 2D-to-3D mesh extrusion engine for converting 2D designs into 3D models with PBR materials.
* **[Technical Research Journal](https://spet01.dev/journal/)**: In-depth systems engineering research papers.
* **[Main Portfolio](https://spet01.dev/)**: Central developer portfolio and project showcase.
