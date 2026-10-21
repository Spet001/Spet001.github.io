# FF13Fix-MSStore — Modern GDK/UWP Frame Pacing & Display Compatibility Layer

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Nexus Mods](https://img.shields.io/badge/Nexus_Mods-Official_Releases-orange.svg)](https://www.nexusmods.com/profile/Spet001/mods)
[![Platform: Windows GDK](https://img.shields.io/badge/Platform-Microsoft_Store_|_Xbox_PC-0078D6.svg)]()
[![Target: Final Fantasy XIII](https://img.shields.io/badge/Target-Final_Fantasy_XIII_(GDK)-blueviolet.svg)]()
[![Status: Maintained on Nexus Mods](https://img.shields.io/badge/Status-Maintained_on_Nexus_Mods-success.svg)](https://www.nexusmods.com/profile/Spet001/mods)

> **Repository Archival Notice & Official Distribution Channels:**  
> The original source code repository was archived during an infrastructure migration. The official compiled release binaries, configuration guides, and community support continue actively on **[Nexus Mods](https://www.nexusmods.com/profile/Spet001/mods)**.  
> 
> For low-level systems engineering articles, GDK runtime analyses, and client-side web tools, visit **[Eduardo Gelain's Portfolio](https://spet01.dev/)**.

---

## Overview

**FF13Fix-MSStore** is a specialized compatibility layer and frame pacing optimization suite built for the Microsoft Store / Xbox Game Pass PC edition of *Final Fantasy XIII*.

While the original Steam version of *Final Fantasy XIII* benefited from community modifications, the Microsoft Store release introduced distinct Game Development Kit (GDK) runtime constraints, modified binary entry points, and altered DLL search directories that prevented standard hooks from loading. Furthermore, the engine suffers from persistent 1-second interval frame-time spikes caused by synchronous controller polling on the primary render thread.

FF13Fix-MSStore adapts low-level hook mechanisms specifically for the Windows GDK architecture, eliminating presentation judder and enabling high-resolution rendering capabilities.

---

## Key Technical Features

### 1. GDK / UWP Runtime Interoperability
* Tailored to hook cleanly into the Microsoft Gaming Services runtime environment without tripping container initialization faults or loader deadlocks.
* Adjusts entry-point redirection to initialize before Direct3D device creation.

### 2. Controller Polling Decoupling & Frame Pacing Stabilization
* **The Problem:** The vanilla engine performs blocking, synchronous input queries on the main rendering loop once every second, causing severe frame drops (from 60 FPS down to 45 or 30 FPS).
* **The Mitigation:** Offloads controller detection and input device state queries to an asynchronous background worker thread, ensuring completely flat frame times and stutter-free presentation.

### 3. High-Definition Shadow Depth Matrix Allocation
* Overrides hardcoded low-resolution 512x512 and 1024x1024 shadow map allocations, expanding the shadow buffer to native 2048x2048 or 4096x4096 with hardware bilinear filtering.

### 4. 2D UI & Presentation Aspect Ratio Correction
* Corrects letterboxing and user interface scaling anomalies on 16:10, 21:9 ultrawide, and high-DPI displays.

---

## Official Releases & Download Links

Compiled release binaries, configuration `.ini` presets, and setup instructions are maintained on Nexus Mods:

* **Official Nexus Mods Profile:** [https://www.nexusmods.com/profile/Spet001/mods](https://www.nexusmods.com/profile/Spet001/mods)

---

## Developer Ecosystem & Web Tools Suite

Visit Eduardo Gelain's interactive web workbench featuring client-side binary analysis and asset inspection tools running 100% locally in your browser:

* **[Spet's Easy Online Decompiler](https://spet01.dev/tools/easy-decompiler/)**: WebAssembly-powered binary analyzer, disassembler, and dual C-like decompiler (Rizin + Ghidra Sleigh) for PE, ELF, and Mach-O files. Zero server uploads.
* **[Spet's Universal Game File Opener](https://spet01.dev/tools/universal-file/)**: Universal client-side game archive inspector and container extractor supporting 25+ game engine formats (WAD, PAK, PK3, FastFiles, BSA/BA2, RPF).
* **[Spet's Quick 3D Studio](https://spet01.dev/tools/image-to-3d/)**: Procedural 2D-to-3D mesh extrusion engine for converting 2D designs into 3D models with PBR materials.
* **[Technical Research Journal](https://spet01.dev/journal/)**: Deep-dives into systems engineering, memory patches, and legacy game optimization.
* **[Main Portfolio](https://spet01.dev/)**: Central developer portfolio and project showcase.

---

## License & Credits

Distributed under the [MIT License](https://opensource.org/licenses/MIT). Based on the foundational compatibility research initiated by the open-source FF13Fix project, tailored and optimized for the Microsoft Store / Windows GDK gaming runtime.
