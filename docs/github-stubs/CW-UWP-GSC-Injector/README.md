# CW-UWP-GSC-Injector — Academic Dynamic Pattern Scanning & Memory Verification Tool

[![License: MIT Research](https://img.shields.io/badge/License-MIT_Research-blue.svg)](https://opensource.org/licenses/MIT)
[![GitLab Mirror](https://img.shields.io/badge/GitLab-Active_Source_Repository-E24329.svg?logo=gitlab)](https://gitlab.com/Spet001/CW-UWP-GSC-Injector)
[![Target: BOCW (T9 Engine)](https://img.shields.io/badge/Target-BOCW_(T9_x64)-blueviolet.svg)]()
[![Platform: Microsoft GDK](https://img.shields.io/badge/Platform-Windows_GDK_|_Xbox_PC-0078D6.svg)]()
[![Technical Paper](https://img.shields.io/badge/Journal-Published_Research_Paper-brightgreen.svg)](https://spet01.dev/journal/CW-GSC-Injection-MS-Store/)

> **Repository Relocation Notice & Published Research Paper:**  
> The active C++ codebase, test harnesses, and continuous deployment pipelines are maintained on our official GitLab mirror:  
> **[https://gitlab.com/Spet001/CW-UWP-GSC-Injector](https://gitlab.com/Spet001/CW-UWP-GSC-Injector)**  
> 
> The peer-reviewed technical paper detailing the memory heuristics, compiler variation challenges, and RIP-relative pattern resolution is published at:  
> **[https://spet01.dev/journal/CW-GSC-Injection-MS-Store/](https://spet01.dev/journal/CW-GSC-Injection-MS-Store/)**.

---

## Abstract & Research Focus

**CW-UWP-GSC-Injector** is an academic systems research and memory verification utility designed to analyze the runtime execution characteristics of *Call of Duty: Black Ops Cold War* (T9 engine) under the Microsoft Store / Windows Game Development Kit (GDK) runtime environment.

Traditional game scripting research utilities rely on brittle, hardcoded static memory offsets (e.g., `0x1273c9f0` on Steam/Battle.net) that immediately fail or trigger segmentation faults when applied to Windows GDK packages due to compiler optimization variations, different PE header characteristics, and distinct Address Space Layout Randomization (ASLR) behavior. This project demonstrates how lightweight, bounded heuristic pattern recognition can dynamically resolve global asset pools and virtual machine dispatch pointers in real time with mathematical determinism.

---

## Architectural Highlights & Engineering Innovations

### 1. Dynamic RIP-Relative Heuristic Memory Scanner
Rather than relying on vulnerable function prologue detours, the scanner targets the instruction stream within the `.text` segment that loads the global asset pool array (`g_assetPools`):
```assembly
48 8D 05 ?? ?? ?? ??   lea  rax, g_assetPools
48 C1 E2 ??            shl  rdx, ??
48 03 D0               add  rdx, rax
```
The injector dynamically reads the 32-bit RIP-relative displacement operand, calculates the target absolute virtual address, and indexes directly into the asset table for `ASSET_TYPE_SCRIPTPARSETREE` (index `68`).

### 2. Bounded Virtual Memory Scanning
Scans are strictly bounded within the module's mapped physical limits (`baseAddress` to `baseAddress + size`). By eliminating unconstrained memory page queries across the entire 64-bit address space, memory bus overhead is reduced and execution completes in milliseconds.

### 3. Zero-Fragmentation Stack Memory Buffering
Employs stack-allocated block read buffers during large memory inspections, preventing heap fragmentation and ensuring consistent execution without memory allocation latency.

### 4. FNV-1a 64-Bit Script Asset Hashing
Implements a case-insensitive 63-bit/64-bit FNV-1a hash algorithm to identify target script nodes (such as `scripts/zm_common/load.gsc`) deterministically within internal engine lookup trees.

### 5. Strict Struct Alignment Verification
Enforces strict `T9GSCOBJ` memory alignment schemas, ensuring that script bytecodes are mapped without corrupting internal engine dispatch tables.

---

## Source Repository & Technical Publications

* **Official GitLab Code Mirror:** [https://gitlab.com/Spet001/CW-UWP-GSC-Injector](https://gitlab.com/Spet001/CW-UWP-GSC-Injector)
* **Full Technical Paper:** [Dynamic Memory Pattern Scanning for Cold War GSC Injection (MS Store / UWP)](https://spet01.dev/journal/CW-GSC-Injection-MS-Store/)
* **Foundational Systems Research:** [What is GSC? Architecture & Bytecode VM Analysis](https://spet01.dev/journal/What-Is-GSC/)
* **Author Portfolio & Engineering Portal:** [https://spet01.dev/](https://spet01.dev/)
* **In-Browser Binary Analysis Workbench:** [https://spet01.dev/tools/easy-decompiler/](https://spet01.dev/tools/easy-decompiler/)

---

## Acknowledgements

* **Atian** ([atian-cod-tools](https://github.com/ate47/atian-cod-tools)) — Foundational research into dynamic asset pool resolution in modern Call of Duty engine iterations.

---

## Academic Disclaimer

This project is published solely for academic research, binary reverse engineering education, and software interoperability verification. All intellectual property and engine trade secrets remain property of their respective owners.
