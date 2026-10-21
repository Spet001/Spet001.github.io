# Bioshock 2 GFWL CrashFix — Legacy Preservation & Runtime Stability Patch

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Nexus Mods](https://img.shields.io/badge/Nexus_Mods-Official_Releases-orange.svg)](https://www.nexusmods.com/profile/Spet001/mods)
[![Platform: Windows](https://img.shields.io/badge/Platform-Windows_x86%2Fx64-0078D6.svg)]()
[![Target: BioShock 2](https://img.shields.io/badge/Target-BioShock_2_(GFWL_Legacy)-darkred.svg)]()
[![Status: Maintained on Nexus Mods](https://img.shields.io/badge/Status-Maintained_on_Nexus_Mods-success.svg)](https://www.nexusmods.com/profile/Spet001/mods)

> **Repository Archival Notice & Official Distribution Channels:**  
> The original source code repository was formally archived during an infrastructure migration. The official release binaries, configuration files, and community setup guides remain actively hosted and maintained on **[Nexus Mods](https://www.nexusmods.com/profile/Spet001/mods)**.  
> 
> For active engineering updates, binary reverse engineering research, and web-based developer tools, visit **[Eduardo Gelain's Portfolio](https://spet01.dev/)**.

---

## Overview

**Bioshock 2 GFWL CrashFix** is a legacy preservation utility and runtime stability patch designed for the original Games for Windows Live (GFWL) release of *BioShock 2* on modern 64-bit Windows installations.

On contemporary hardware running Windows 10 and Windows 11, the legacy 32-bit *BioShock 2* executable encounters severe instability:
* Frequent memory exhaustion crashes (`0xC0000005` Access Violation) during level streaming.
* Engine hangs and deadlocks caused by unhandled timeouts from deprecated GFWL network services.
* Audio buffer underruns and Direct3D texture management stalls on high-core-count processors.

This project delivers targeted binary patches and runtime shims to eliminate these bottlenecks and restore stability for modern gaming and archival preservation.

---

## Technical Implementations

### 1. 4GB Large Address Aware (LAA) Memory Patching
* Expands the game's user-mode virtual address space from 2GB to 4GB by enabling the `IMAGE_FILE_LARGE_ADDRESS_AWARE` (`0x0020`) flag in the executable's PE characteristics header.
* Prevents heap allocation failures and crash-to-desktop events when loading high-resolution textures, particle buffers, and expansive level data.

### 2. GFWL Subsystem Decoupling & Thread Synchronization
* Decouples the engine from defunct Games for Windows Live online matchmaking and authentication threads, preventing continuous background thread hangs and assertion crashes.
* Stabilizes save file serialization and game state persistence using a local storage layer.

### 3. Multithreaded Resource Management
* Mitigates audio and texture heap race conditions that manifest on modern CPUs with more than 8 logical threads.

---

## Official Releases & Download Links

All verified releases and installation instructions are available through the author's official Nexus Mods profile:

* **Official Nexus Mods Profile:** [https://www.nexusmods.com/profile/Spet001/mods](https://www.nexusmods.com/profile/Spet001/mods)

---

## Developer Ecosystem & Web Tools Suite

Explore Eduardo Gelain's interactive client-side reverse engineering and file inspection tools, running 100% locally in the browser with zero server uploads:

* **[Spet's Easy Online Decompiler](https://spet01.dev/tools/easy-decompiler/)**: In-browser WebAssembly-powered binary analyzer, disassembler, and dual C-like decompiler (Rizin + Ghidra Sleigh) for PE, ELF, and Mach-O executables.
* **[Spet's Universal Game File Opener](https://spet01.dev/tools/universal-file/)**: Universal client-side game archive explorer and extractor supporting 25+ game engines (WAD, PAK, PK3, FastFiles, BSA/BA2, RPF, and more).
* **[Spet's Quick 3D Studio](https://spet01.dev/tools/image-to-3d/)**: Procedural 2D-to-3D mesh extrusion engine and GLB exporter built with Three.js and WebGL.
* **[Technical Research Journal](https://spet01.dev/journal/)**: Deep-dives into systems engineering, memory patches, and legacy game optimization.
* **[Main Portfolio](https://spet01.dev/)**: Central developer portfolio and project index.

---

## License

Distributed under the [MIT License](https://opensource.org/licenses/MIT). Created strictly for software preservation, interoperability analysis, and archival restoration.
