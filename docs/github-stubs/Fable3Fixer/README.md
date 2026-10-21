# Fable 3 Fixer — Legacy Preservation, High-Refresh Uncap & Modern Visuals

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Nexus Mods](https://img.shields.io/badge/Nexus_Mods-5.2k%2B_Downloads-orange.svg)](https://www.nexusmods.com/fableIII/mods/27)
[![Platform: Windows](https://img.shields.io/badge/Platform-Windows_x86%2Fx64-0078D6.svg)]()
[![Graphics API](https://img.shields.io/badge/Graphics-Direct3D_9_|_Vulkan_(DXVK)-red.svg)]()
[![Status: Archived / Maintained](https://img.shields.io/badge/Status-Maintained_on_Nexus_Mods-success.svg)](https://www.nexusmods.com/fableIII/mods/27)

> **Repository Archival Notice & Official Distribution Channel:**  
> The original Git development source repository was archived during an infrastructure migration. The official compiled release binaries, automated installation packages, and community technical support remain actively maintained on **[Nexus Mods](https://www.nexusmods.com/fableIII/mods/27)**.  
> 
> For in-depth engineering documentation, architecture analyses, and technical deep-dives into modernizing 32-bit legacy titles, visit **[Eduardo Gelain's Technical Journal](https://spet01.dev/journal/Optimize-Old-Games-4GB-Patch-DXVK/)**.

> [!NOTE]
> **Author's Note:**  
> This tool was created early in my career while I was first learning modding and compatibility engineering. The interface might be unpolished, setup may have its quirks, and occasional minor bugs can exist—but it works, strictly delivers what it promises, and solved unique stability and framerate issues for the *Fable III* community that no other solution addressed at the time.

---

## Overview

**Fable 3 Fixer** is an all-in-one legacy preservation suite and compatibility runtime designed for *Fable III* (Lionhead Studios) on modern Windows operating systems (Windows 10 / Windows 11). 

Classic 32-bit PC titles developed during the DirectX 9 era frequently encounter critical runtime failures on modern multicore hardware and high-refresh-rate displays. These issues manifest as micro-stutters, driver-level pipeline stalls, frame pacing degradation, and crash-to-desktop (CTD) events triggered by virtual address space exhaustion. Fable 3 Fixer bundles low-level binary modifications, translation wrappers, GFWL subsystem preservation, and custom visual tuning to restore stability, fluid rendering, and archival longevity to the game.

---

## Key Technical Features

### 1. 4GB Large Address Aware (LAA) Memory Expansion
* **The Problem:** By default, 32-bit Windows executables allocate a maximum of 2GB of Virtual Address Space (VAS). As assets stream into memory, the process quickly exhausts available address space, triggering `0xC0000005` (Access Violation / Out of Memory) crashes.
* **The Mitigation:** Toggles the `IMAGE_FILE_LARGE_ADDRESS_AWARE` (`0x0020`) flag within the Portable Executable (PE) header. On 64-bit Windows kernels, this expands the application's user-mode virtual address space to 4GB, eliminating memory-pressure termination.

### 2. DXVK Vulkan Translation Runtime
* **The Problem:** Modern GPU architectures (NVIDIA Ada/Blackwell, AMD RDNA, Intel Arc) possess heavily optimized explicit graphics pipelines (Vulkan / Direct3D 12), while legacy Direct3D 9 hardware pipelines have been deprecated or routed through high-overhead emulation layers.
* **The Mitigation:** Integrates a tuned [DXVK](https://github.com/doitsujin/dxvk) runtime layer that translates Direct3D 9 commands directly into low-overhead Vulkan calls in real time. This resolves draw-call bottlenecks, eliminates pipeline stalls, and ensures consistent frame pacing.

### 3. Framerate Uncap (60+ FPS Scaling)
* **The Problem:** The vanilla engine enforces a rigid 30 FPS cap and frame pacing limits that produce noticeable stutter on modern 60Hz, 120Hz, and 144Hz displays.
* **The Mitigation:** Implements an engine framerate uncap that allows smooth 60+ FPS gameplay. While internal engine constraints govern the upper bound (the exact maximum framerate varies depending on scene complexity and hardware), this patch provides fluid rendering without breaking game logic.

### 4. Games for Windows Live (GFWL) Subsystem Preservation
* **The Goal:** Rather than discarding Games for Windows Live, the fixer ensures the native GFWL subsystem functions reliably on modern Windows 10 and Windows 11 environments.
* **The Mitigation:** Resolves runtime connection faults, DLL dependency errors, and save-game loading hangs, allowing players to utilize GFWL profiles, save synchronizations, and co-op features stably on modern OS versions.

### 5. Lightweight Custom ReShade Visual Preset
* **The Enhancement:** Includes a tailored, lightweight ReShade preset engineered to subtly modernize the game's visuals—refining color grading, clarity, and contrast.
* **Zero Performance Hit:** Designed with zero-impact shaders to preserve peak framerate performance across all configurations.

---

## Official Downloads & Support

Verified packages, release notes, and community setup instructions are hosted exclusively on Nexus Mods:

* **Official Nexus Mods Page:** [https://www.nexusmods.com/fableIII/mods/27](https://www.nexusmods.com/fableIII/mods/27)
* **Nexus Mods Profile:** [https://www.nexusmods.com/profile/Spet001/mods](https://www.nexusmods.com/profile/Spet001/mods)

---

## In-Depth Technical Publications

Detailed architectural writeups and step-by-step guides for applying these techniques manually to other 32-bit classics are published on the author's official engineering portal:

* **Whitepaper / Guide:** [How to Optimize Old Games Yourself with 4GB Patch and DXVK](https://spet01.dev/journal/Optimize-Old-Games-4GB-Patch-DXVK/)
* **Systems Research Portal:** [https://spet01.dev/journal/](https://spet01.dev/journal/)
* **Main Portfolio & Engineering Workbench:** [https://spet01.dev/](https://spet01.dev/)
* **In-Browser Web Reverse Engineering Tools:** [https://spet01.dev/tools/](https://spet01.dev/tools/)
