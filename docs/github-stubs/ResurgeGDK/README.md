# ResurgeGDK — Windows Gaming Runtime Bridge & Systems Research Platform

[![License: Research](https://img.shields.io/badge/License-Research_|_Open_Access-informational.svg)](https://gitlab.com/Spet001/resurgegdkbackup)
[![GitLab Mirror](https://img.shields.io/badge/GitLab-Active_Repository-E24329.svg?logo=gitlab)](https://gitlab.com/Spet001/resurgegdkbackup)
[![Platform: Windows GDK](https://img.shields.io/badge/Platform-Microsoft_GDK_|_Xbox_PC-0078D6.svg)]()
[![Target: T7 Engine](https://img.shields.io/badge/Target-Black_Ops_III_(GDK)-blueviolet.svg)]()
[![Status: Maintained on GitLab](https://img.shields.io/badge/Status-Maintained_on_GitLab-success.svg)](https://gitlab.com/Spet001/resurgegdkbackup)

> **Repository Archival & Mirror Notice:**  
> This project was formerly known as **`BOIII-ReImagined-UWP`**. Source code development, active branches, and community releases are hosted on our official GitLab mirror:  
> **[https://gitlab.com/Spet001/resurgegdkbackup](https://gitlab.com/Spet001/resurgegdkbackup)**  
> 
> In-depth architectural writeups and technical research papers are published on **[Eduardo Gelain's Technical Journal](https://spet01.dev/journal/What-Is-ResurgeGDK/)**.

---

## Overview

**ResurgeGDK** (formerly *BOIII-ReImagined-UWP*) is a comprehensive client launcher, runtime compatibility suite, and reverse engineering research framework created for *Call of Duty: Black Ops III* running on the Microsoft Store / Xbox PC (GDK / UWP runtime) platform.

While modern PC modding ecosystems primarily target standard Win32 Steam releases, the Microsoft Store variant operates under AppX packaging and the Microsoft Gaming Runtime (`xgameruntime.dll`), introducing isolated filesystem sandboxes, distinct memory layouts, and lack of native Steam Workshop access. ResurgeGDK bridges these architectural gaps, delivering feature parity, custom mod mounting, and runtime preservation to Xbox PC players.

---

## Key Architectural Modules

### 1. Dual-Runtime File Compatibility (Steam + GDK Coexistence)
* Structures file dependencies so that native Steam binaries (`steam_api64.dll`, etc.) coexist cleanly side-by-side with Microsoft Store GDK libraries (`xgameruntime.dll`).
* Installs and coordinates both executables simultaneously from a single installation directory:
  - **`Resurge Beta.exe`** for Microsoft Store / GDK Xbox PC runtime.
  - **`BlackOps3.exe`** for standard Steam / Win32 runtime.

### 2. Steam Workshop Modding on the Microsoft Store
* Features an integrated bridge to the **BOIII Workshop Downloader**, allowing players to download, unpack, and load Steam Workshop community content (custom Zombies maps, weapons, gameplay modifications) on the Microsoft Store version.
* Dynamically virtualizes workshop asset directories and mounts fastfiles into the engine's search hierarchy.

### 3. Online Demonware Telemetry Interception & Inventory Unlock
* **Online Intact:** Retains full online connectivity to Xbox PC servers.
* **GobbleGum Multiplier:** Intercepts outgoing Demonware transaction requests when obtaining a GobbleGum, reporting to the server that 999 units were received.
* **Black Market Cosmetic Unlock:** Unlocks all Black Market cosmetic assets (camos, calling cards, reticles, gestures) while intentionally preserving gameplay balance (excluding DLC weapons).

### 4. T7 Patch Security Hardening
* Integrates protections based on the community **T7 Patch** to defend against known legacy peer-to-peer exploits, buffer overflow vulnerabilities, and crash exploits present in unpatched multiplayer sessions.

### 5. Integrated GSC Injector
* Integrates a dedicated **GSC** script injection engine into the launcher interface.
* Allows developers and modders to dynamically inject and run compiled GSC scripts directly into runtime memory without needing external third-party injectors.

---

## Official Links & Repositories

* **Active GitLab Repository:** [https://gitlab.com/Spet001/resurgegdkbackup](https://gitlab.com/Spet001/resurgegdkbackup)
* **Technical Research Papers & Architecture Analysis:**
  - [What is ResurgeGDK? Architectural Deep Dive: Steam-to-GDK Conversion, Workshop Support & Local Telemetry](https://spet01.dev/journal/What-Is-ResurgeGDK/)
  - [UWP & GDK Sandbox Entitlement Analysis](https://spet01.dev/journal/UWP-GDK-Sandbox-Entitlement-Analysis/)
  - [Exploring Legacy UWP Titles: Hooking WinRT Store APIs & Runtime Injection](https://spet01.dev/journal/Exploring-Legacy-UWP-Titles/)
  - [Treyarch GSC VM Architecture](https://spet01.dev/journal/What-Is-GSC/)
* **Eduardo Gelain's Engineering Portfolio:** [https://spet01.dev/](https://spet01.dev/)
* **In-Browser Web Reverse Engineering Tools:** [https://spet01.dev/tools/](https://spet01.dev/tools/)

---

## License & Research Policy

This repository is dedicated to legacy software preservation, operating system interoperability analysis, and systems engineering research. Distributed under academic research terms.
