# spet01.dev — Systems Engineering, Reverse Engineering & Game Dev Portfolio

Source repository for **[spet01.dev](https://spet01.dev)** (`Spet001.github.io`), the personal engineering portfolio, client-side WebAssembly tool suite, and Technical Research Journal of **Eduardo Gelain (Spet / SpetDev)**.

The site runs as a static bundle on GitHub Pages without a server-side runtime: a React 18 UMD + Three.js interactive portfolio (`index.html` + `app.min.js`), a static-site-generated (SSG) Technical Journal built from Markdown (`build-journal.js`), and six client-side browser utilities under `/tools/`.

---

## Key Components

### 1. Portfolio & Space 3.0 3D Galaxy Map
- Built in `app.jsx` consuming global UMD libraries loaded in `index.html` (`React 18`, `Three.js r128`, `marked`, `DOMPurify`, `highlight.js`).
- **Interactive 3D Backgrounds:** Switchable 2D starfield/sky scenes and Three.js WebGL scenes, including `SpaceCanvasV3`, an interactive Galaxy Map with Keplerian orbital physics, procedural sun shaders, dynamic OST jukebox, and 18 project nodes organized across 4 main clusters (`core`, `gamedev`, `lowlevel`, `tools`) plus 3 hidden/special sectors (`solar`, `delicia`, `chicken`).
- **`Spet@term Web`:** In-page terminal modal (`Ctrl+K`) with a virtual filesystem, project/tool launchers, secret sector unlocks, and easter eggs.
- **Featured Systems & Game Projects (20 in `projectsData`):** Includes **Spet@term** (standalone C++20/Direct2D/ConPTY Windows terminal & micro-IDE, [GitHub](https://github.com/Spet001/Spet-Term) & [Microsoft Store](https://apps.microsoft.com/store/detail/9P4DZWVXRXQW?cid=DevShareMCLPCS)), **Resurge Client** (BO3 Steam-to-GDK runtime bridge), **BO2 Crossplay Relay**, **CW / T5 / T6 MS Store GSC Injectors**, **Fable 3 Fixer**, **Outcaster** (Unity 6 FPS templates), and **Sparky Rush** (Steam QA).

### 2. Client-Side Web Tool Suite (`/tools/`)
All tools execute locally inside the browser with zero server file uploads:

| Tool | Path | Capabilities |
| :--- | :--- | :--- |
| **Easy Online Decompiler** | `/tools/easy-decompiler/` | WebAssembly Rizin + `jsdec` and Ghidra Sleigh C++ decompilers running in parallel Web Workers for PE (x86/x64), ELF, and Mach-O binaries. |
| **Universal Game File Opener** | `/tools/universal-file/` | Virtual filesystem inspector and stream carver for 25+ container formats (Treyarch `T3WAD`, Bethesda `BSA/BA2`, Ubisoft `FORGE`, Rockstar `RPF`, PlayStation `PKG`, FromSoftware `BND/DCX`, CoD FastFiles `.ff`, CRIWARE `.awb/.usm`, raw Zlib). |
| **xCloudFX Studio** | `/tools/xcloudfx/` | WebGL2 multi-pass video upscaler (FSR + DoG, Anime4K v3.2, H.264 de-blocking), 120Hz frame pacing, WebRTC SDP tuning, and standalone Manifest V3 extension builder. |
| **ReShade Studio** | `/tools/reshade-studio/` | Deterministic CIE LAB Reinhard color transfer and `1024x32` 3D LUT generator exporting ReShade 6.8.0 `.ini` presets and `.fx` HLSL shaders. |
| **4gb Patch Online** | `/tools/4gb-patch/` | Client-side `ArrayBuffer` PE32/PE32+ header editor for setting `IMAGE_FILE_LARGE_ADDRESS_AWARE` (`0x0020`), recalculating 16-bit PE checksums, stripping ASLR (`~0x0040`), and exporting `.1337` x64dbg patches. |
| **Quick 3D Studio** | `/tools/image-to-3d/` | TypeScript + Three.js procedural 2D-to-3D contour extruder and binary `.glb`/`.gltf` exporter with PBR materials. |

### 3. Technical Research Journal (`/journal/`)
Articles are authored as Markdown files in `journal/md/`, indexed by `journal/entries.json`, and pre-rendered into static SEO pages (`TechArticle`, `BreadcrumbList`, Open Graph tags, and optional `FAQPage` JSON-LD) via `build-journal.js`:

| ID | Date | Title | Slug / Path |
| :--- | :--- | :--- | :--- |
| `entry_0022` | Nov 12, 2026 | Microsoft's New OG Xbox PC Backcompat Is Actually an Xbox 360 AOT Recomp (And Why Pre-Haswell CPUs Crash) | [`Xbox-Backcompat-PC-Fusion-AOT`](/journal/Xbox-Backcompat-PC-Fusion-AOT/) |
| `entry_0021` | Nov 3, 2026 | Why Build a Custom Windows Terminal? Escaping the Boring Default CLI with C++20, ConPTY & Direct2D (Spet@term) | [`Building-Custom-Windows-Terminal-Cpp20`](/journal/Building-Custom-Windows-Terminal-Cpp20/) |
| `entry_0020` | Oct 22, 2026 | Farewell, BioWare: A Tribute to Mass Effect & How the Normandy Shaped This Portfolio | [`Tribute-To-BioWare-And-Mass-Effect`](/journal/Tribute-To-BioWare-And-Mass-Effect/) |
| `entry_0019` | Oct 21, 2026 | What is ResurgeGDK? Architectural Deep Dive: Steam-to-GDK Conversion, Workshop Support & Local Telemetry | [`What-Is-ResurgeGDK`](/journal/What-Is-ResurgeGDK/) |
| `entry_0018` | Oct 19, 2026 | Exploring Legacy UWP Titles: Hooking Undocumented WinRT Store APIs, COD Points Ingestion & UWP Dumper Injection | [`Exploring-Legacy-UWP-Titles`](/journal/Exploring-Legacy-UWP-Titles/) |
| `entry_0017` | Oct 18, 2026 | Quick Entry: Gamifying a Galactic Portfolio with the 3D Galaxy Map! | [`Gamifying-A-Galactic-Portfolio-Galaxy-Map`](/journal/Gamifying-A-Galactic-Portfolio-Galaxy-Map/) |
| `entry_0013` | Oct 18, 2026 | What is a WAD? From 1993 DOOM to Reverse-Engineering Undocumented Demonware WADs (`online_tu17_mp.wad` & `online_tu14_mp_english.wad`) | [`What-Is-A-WAD-Modern-Games`](/journal/What-Is-A-WAD-Modern-Games/) |
| `entry_0016` | Oct 16, 2026 | DEVLOG: Rebuilding Outcaster from Scratch in Unity 6 — Live 3D HUD Tooling & Zombies Survival | [`DEVLOG-Outcaster-Unity-6`](/journal/DEVLOG-Outcaster-Unity-6/) |
| `entry_0015` | Oct 16, 2026 | Sparky Rush: Purrils in Pawsville Launches on Steam! | [`Sparky-Rush-Steam-Release`](/journal/Sparky-Rush-Steam-Release/) |
| `entry_0014` | Oct 11, 2026 | How to Optimize a Three.js Scene for 120+ FPS | [`How-To-Optimize-ThreeJS-Scene-120-FPS`](/journal/How-To-Optimize-ThreeJS-Scene-120-FPS/) |
| `entry_0012` | Oct 9, 2026 | Quick Entry: How to Optimize Old Games Yourself with 4GB Patch and DXVK! | [`Optimize-Old-Games-4GB-Patch-DXVK`](/journal/Optimize-Old-Games-4GB-Patch-DXVK/) |
| `entry_0011` | Oct 8, 2026 | Open Source 3D Assets! (Low Poly & Game Models) | [`Open-Source-3D-Assets`](/journal/Open-Source-3D-Assets/) |
| `entry_0010` | Sep 30, 2026 | What is GSC? (Game Scripting C) Guide | [`What-Is-GSC`](/journal/What-Is-GSC/) |
| `entry_0009` | Sep 28, 2026 | Quick Entry: Having a Backend on a Static Website with Cloudflare workers! | [`Cloudflare-Workers-Backend`](/journal/Cloudflare-Workers-Backend/) |
| `entry_0008` | Sep 27, 2026 | Providing Open Source T6 Custom Game Modes GSC! | [`T6-Open-Source-GSC-Mods`](/journal/T6-Open-Source-GSC-Mods/) |
| `entry_0007` | Sep 27, 2026 | Unlock This Entry With Patreon! (T9 Mod Manager RE) | [`entry_0007`](/journal/entry_0007/) |
| `entry_0006` | Sep 21, 2026 | UWP/GDK Sandbox & Entitlement Architecture Analysis (Legacy Preservation) | [`UWP-GDK-Sandbox-Entitlement-Analysis`](/journal/UWP-GDK-Sandbox-Entitlement-Analysis/) |
| `entry_0005` | Sep 20, 2026 | Open Source GSC Injector for Black Ops 2 (MS Store) | [`T6-GSC-Injector-MS-Store`](/journal/T6-GSC-Injector-MS-Store/) |
| `entry_0004` | Sep 19, 2026 | GSC Injection on Black Ops 1 (MS Store) | [`T5-GSC-Injector-MS-Store`](/journal/T5-GSC-Injector-MS-Store/) |
| `entry_0003` | Sep 19, 2026 | Document: Explaining Unauthorized Leaks & Network Architecture Analysis | [`Document-Explaining-Leaks`](/journal/Document-Explaining-Leaks/) |
| `entry_0002` | Sep 18, 2026 | CW GSC Injection Findings | [`CW-GSC-Injection-MS-Store`](/journal/CW-GSC-Injection-MS-Store/) |

---

## Build & Local Development

Prerequisites: **Node.js 20+** and **npm**.

```bash
npm install
npm run build
```

`npm run build` executes three steps defined in `package.json`:
1. **`build:main`**: Compiles JSX in `app.jsx` to `app.min.js` using `esbuild` (non-bundled, UMD globals).
2. **`build:3d`**: Bundles TypeScript/Three.js in `tools/image-to-3d/src/main.tsx` into an ESM module at `tools/image-to-3d/app.min.js`.
3. **`build:journal`**: Runs `node build-journal.js` to regenerate static HTML under `/journal/`, `/privacy.html`, `/privacy/index.html`, and `/sitemap.xml`.

To preview locally, serve the repository root over HTTP (for example with `npx serve .` or `python -m http.server 8080`). Because routing relies on root-relative paths (`/assets/...`, `/journal/...`, `/tools/...`), serve from the repository root rather than `file://`.

Deployment runs automatically on push to `main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

---

## Third-Party Assets & Licensing

- **Code & Technical Writing:** Original source code and research articles in this repository are authored by Eduardo Gelain unless stated otherwise.
- **3D Models (`/3d/`):** Several `.glb` models are used under **Creative Commons Attribution 4.0 (CC-BY 4.0)** with full author credits listed in the portfolio's UI attribution modal and `app.jsx`.
- **Machine-Readable Context:** AI/LLM index summaries are published at [`llm.txt`](/llm.txt) and [`llms.txt`](/llms.txt).
