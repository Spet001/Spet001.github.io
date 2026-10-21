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
> In-depth architectural writeups and reverse engineering technical papers are published on **[Eduardo Gelain's Technical Journal](https://spet01.dev/journal/What-Is-ResurgeGDK/)**.

---

## Overview

**ResurgeGDK** (formerly *BOIII-ReImagined-UWP*) is a comprehensive client launcher, runtime compatibility suite, and reverse engineering research framework created for *Call of Duty: Black Ops III* running on the Microsoft Store / Xbox PC (GDK / UWP runtime) platform.

While modern PC modding ecosystems primarily target standard Win32 Steam releases, the Microsoft Store variant operates under AppX packaging and the Microsoft Gaming Runtime (`xgameruntime.dll`), introducing isolated filesystem sandboxes, distinct memory layouts, and lack of native Steam Workshop access. ResurgeGDK bridges these architectural gaps, delivering feature parity, custom mod mounting, and runtime preservation to Xbox PC players.

---

## Key Architectural Modules

### 1. Steam-to-GDK Runtime Conversion & Compatibility
* Operates within the Windows Gaming Desktop container, creating a translation bridge between traditional Win32 process execution and Xbox PC runtime services.
* Handles non-invasive entrypoint detours during early process initialization, resolving containerized path virtualization hurdles.

### 2. Steam Workshop Modding on the Microsoft Store
* Features an integrated bridge to the **BOIII Workshop Downloader**, allowing players to download, unpack, and load Steam Workshop community content (custom Zombies maps, weapons, gameplay modifications) on the Microsoft Store version.
* Dynamically virtualizes workshop asset directories and mounts fastfiles into the engine's search hierarchy.

### 3. Local Telemetry & GobbleGum Inventory Emulation
* Emulates local backend telemetry states to provide complete access to GobbleGums during local and private cooperative sessions.
* Replaces legacy server microtransaction queries with an offline in-memory state emulator, ensuring long-term game preservation.

### 4. Integrated Ezz BOIII Client Backend
* Directly incorporates community-standard Ezz BOIII client functionality for enhanced networking stability, custom server browser connectivity, and security patches against known legacy network vulnerabilities.

### 5. Built-in GSC Bytecode Injector
* Integrates a dedicated Treyarch Game Scripting C (GSC) bytecode injection engine into the launcher interface.
* Allows developers and modders to dynamically inject and execute compiled GSC scripts into runtime memory without external third-party tools.

---

## Official Links & Repositories

* **Active GitLab Repository:** [https://gitlab.com/Spet001/resurgegdkbackup](https://gitlab.com/Spet001/resurgegdkbackup)
* **Technical Research Papers & Architecture Analysis:**
  - [What is ResurgeGDK? Architectural Deep Dive: Steam-to-GDK Conversion, Workshop Support & Local Telemetry](https://spet01.dev/journal/What-Is-ResurgeGDK/)
  - [UWP & GDK Sandbox Entitlement Analysis](https://spet01.dev/journal/UWP-GDK-Sandbox-Entitlement-Analysis/)
  - [Exploring Legacy UWP Titles: Hooking WinRT Store APIs & Runtime Injection](https://spet01.dev/journal/Exploring-Legacy-UWP-Titles/)
  - [Treyarch Game Scripting C (GSC) VM Architecture](https://spet01.dev/journal/What-Is-GSC/)
* **Eduardo Gelain's Engineering Portfolio:** [https://spet01.dev/](https://spet01.dev/)
* **In-Browser Web Reverse Engineering Tools:** [https://spet01.dev/tools/](https://spet01.dev/tools/)

---

## License & Research Policy

This repository is dedicated to legacy software preservation, operating system interoperability analysis, and systems engineering research. Distributed under academic research terms.
