# FF4TAY-Mod — Final Fantasy IV: The After Years Compatibility & Display Enhancement Layer

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Nexus Mods](https://img.shields.io/badge/Nexus_Mods-Official_Releases-orange.svg)](https://www.nexusmods.com/profile/Spet001/mods)
[![Platform: Windows](https://img.shields.io/badge/Platform-Windows_x86%2Fx64-0078D6.svg)]()
[![Target: Final Fantasy IV TAY](https://img.shields.io/badge/Target-FFIV:_The_After_Years-red.svg)]()
[![Status: Maintained on Nexus Mods](https://img.shields.io/badge/Status-Maintained_on_Nexus_Mods-success.svg)](https://www.nexusmods.com/profile/Spet001/mods)

> **Repository Archival Notice & Official Distribution Channels:**  
> The original source code repository was archived during an infrastructure migration. The official compiled releases, installation documentation, and user support remain actively maintained on **[Nexus Mods](https://www.nexusmods.com/profile/Spet001/mods)**.  
> 
> To discover technical papers, game architecture analyses, and client-side reverse engineering utilities, visit **[Eduardo Gelain's Official Portfolio](https://spet01.dev/)**.

---

## Overview

**FF4TAY-Mod** is an engine compatibility and visual enhancement modification for the PC release of *Final Fantasy IV: The After Years*. 

The original PC port suffers from hardcoded presentation constraints inherited from mobile/handheld architectures, including locked 30 FPS rendering loops, aspect ratio distortion on modern 16:9/21:9 monitors, and blurry font rasterization. FF4TAY-Mod introduces runtime memory adjustments and presentation layer enhancements to restore a high-fidelity visual experience on modern desktop hardware.

---

## Technical Enhancements

### 1. Framerate Scaling & Presentation Smoothing
* Adapts the internal animation and battle timing routines to allow fluid presentation up to 60 FPS without accelerating gameplay timers or battle calculation formulas.
* Corrects swapchain buffer presentation intervals to eliminate display stutter.

### 2. High-Resolution Display & Aspect Ratio Correction
* Dynamically patches engine viewport projection matrices, preventing horizontal stretching on widescreen and ultrawide displays.
* Aligns 2D interface render targets to native desktop display resolutions.

### 3. Font Rasterization & UI Asset Clarity
* Rectifies font scaling matrices within the rendering pipeline, producing crisp dialogue text and user interface elements on modern 1080p, 1440p, and 4K panels.

---

## Official Releases & Download Links

Compiled packages, installation steps, and configuration options are maintained on Nexus Mods:

* **Official Nexus Mods Profile:** [https://www.nexusmods.com/profile/Spet001/mods](https://www.nexusmods.com/profile/Spet001/mods)

---

## In-Browser Developer Tools Suite

Visit Eduardo Gelain's interactive web workbench featuring client-side binary analysis and asset inspection tools that execute 100% in your browser:

* **[Spet's Easy Online Decompiler](https://spet01.dev/tools/easy-decompiler/)**: WebAssembly-powered binary analyzer, disassembler, and dual C-like decompiler (Rizin + Ghidra Sleigh) for PE, ELF, and Mach-O files. Zero server uploads.
* **[Spet's Universal Game File Opener](https://spet01.dev/tools/universal-file/)**: Universal client-side game archive inspector and container extractor supporting 25+ game engine formats.
* **[Spet's Quick 3D Studio](https://spet01.dev/tools/image-to-3d/)**: Procedural 2D-to-3D mesh extrusion engine for converting emblems and artwork into interactive 3D models.
* **[Technical Research Journal](https://spet01.dev/journal/)**: Engineering writeups covering memory patching, graphics translation, and systems programming.
* **[Main Portfolio](https://spet01.dev/)**: Central project showcase and contact information.

---

## License

Released under the [MIT License](https://opensource.org/licenses/MIT). Created strictly for software preservation, interoperability analysis, and engine enhancement research.
