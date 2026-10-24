const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Configure marked options
marked.setOptions({
    gfm: true,
    breaks: false
});

const ROOT_DIR = __dirname;
const ROOT_INDEX_FILE = path.join(ROOT_DIR, 'index.html');
const JOURNAL_DIR = path.join(ROOT_DIR, 'journal');
const MD_DIR = path.join(JOURNAL_DIR, 'md');
const ENTRIES_FILE = path.join(JOURNAL_DIR, 'entries.json');
const MASTER_JOURNAL_INDEX = path.join(JOURNAL_DIR, 'index.html');

// Accurate SEO descriptions for each entry
const ENTRY_DESCRIPTIONS = {
    'Tribute-To-BioWare-And-Mass-Effect': 'A tribute to BioWare and the Mass Effect trilogy following EA\'s closure of BioWare and cancellation of the new Mass Effect: how the Systems Alliance HUD and Normandy CIC Galaxy Map shaped the 3D design of spet01.dev, plus the new Mass Effect OST Jukebox tab and /shepard CLI protocol.',
    'entry_0020': 'A tribute to BioWare and the Mass Effect trilogy following EA\'s closure of BioWare and cancellation of the new Mass Effect: how the Systems Alliance HUD and Normandy CIC Galaxy Map shaped the 3D design of spet01.dev, plus the new Mass Effect OST Jukebox tab and /shepard CLI protocol.',
    'What-Is-ResurgeGDK': 'Architectural deep dive into ResurgeGDK: bridging Call of Duty: Black Ops III from Steam to the Microsoft Store GDK runtime, detouring COM interfaces in xgameruntime.dll, virtualizing AppX packages for offline DLC preservation, mounting Steam Workshop mods via BOIII Downloader VFS, emulating local GobbleGum telemetry (999x inventory), and embedding Ezz BOIII client security with an integrated GSC bytecode injector.',
    'entry_0019': 'Architectural deep dive into ResurgeGDK: bridging Call of Duty: Black Ops III from Steam to the Microsoft Store GDK runtime, detouring COM interfaces in xgameruntime.dll, virtualizing AppX packages for offline DLC preservation, mounting Steam Workshop mods via BOIII Downloader VFS, emulating local GobbleGum telemetry (999x inventory), and embedding Ezz BOIII client security with an integrated GSC bytecode injector.',
    'Exploring-Legacy-UWP-Titles': 'Reverse engineering legacy Windows 10 UWP games (Call of Duty: Infinite Warfare): weaponizing UWP Dumper suspended process lifecycle for AppContainer DLL injection, VMT hooking undocumented IStoreContextServer COM interface, intercepting COD Points package requests, and analyzing why client-side Server-to-Server DLC spoofing fails.',
    'entry_0018': 'Reverse engineering legacy Windows 10 UWP games (Call of Duty: Infinite Warfare): weaponizing UWP Dumper suspended process lifecycle for AppContainer DLL injection, VMT hooking undocumented IStoreContextServer COM interface, intercepting COD Points package requests, and analyzing why client-side Server-to-Server DLC spoofing fails.',
    'Gamifying-A-Galactic-Portfolio-Galaxy-Map': 'Announcing Space 3.0: an interactive Mass Effect-inspired 3D Galaxy Map built with Three.js WebGL. Transforming software projects into explorable celestial bodies with true orbital physics, dynamic OST streaming, and secret sectors.',
    'entry_0017': 'Announcing Space 3.0: an interactive Mass Effect-inspired 3D Galaxy Map built with Three.js WebGL. Transforming software projects into explorable celestial bodies with true orbital physics, dynamic OST streaming, and secret sectors.',
    'DEVLOG-Outcaster-Unity-6': 'DEVLOG: Rebuilding Outcaster from scratch in Unity 6 (DX11). Engineering a custom LIVE 3D HUD Preview in the Inspector for zero-play-mode 2.5D weapon authoring, modular architecture, and a COD Zombies-style Survival Mode.',
    'entry_0016': 'DEVLOG: Rebuilding Outcaster from scratch in Unity 6 (DX11). Engineering a custom LIVE 3D HUD Preview in the Inspector for zero-play-mode 2.5D weapon authoring, modular architecture, and a COD Zombies-style Survival Mode.',
    'Sparky-Rush-Steam-Release': 'Sparky Rush: Purrils in Pawsville commercial launch on Steam by Converting Minds! QA breakdown: hunting 100+ collider flaws, fixing ultrawide UI issues, solving 20+ softlocks, and 60 FPS profiling on a GT 710.',
    'entry_0015': 'Sparky Rush: Purrils in Pawsville commercial launch on Steam by Converting Minds! QA breakdown: hunting 100+ collider flaws, fixing ultrawide UI issues, solving 20+ softlocks, and 60 FPS profiling on a GT 710.',
    'How-To-Optimize-ThreeJS-Scene-120-FPS': 'Engineering deep dive into optimizing a Three.js WebGL scene for 120–165+ FPS: stateless GLSL particle shaders, GPU InstancedMesh, replacing HTML5 video with GPU translate3d Sprite Sheets to eliminate D3D11 SwapChain contention, and Chromium compositor profiling.',
    'entry_0014': 'Engineering deep dive into optimizing a Three.js WebGL scene for 120–165+ FPS: stateless GLSL particle shaders, GPU InstancedMesh, replacing HTML5 video with GPU translate3d Sprite Sheets to eliminate D3D11 SwapChain contention, and Chromium compositor profiling.',
    'What-Is-A-WAD-Modern-Games': 'What is online_tu17_mp.wad? Technical deep dive into the WAD file format: from 1993 id Tech 1 (DOOM) to reverse-engineering undocumented Treyarch 0x543377AB (T3WAD) Demonware Publisher Storage WADs (online_tu17_mp.wad, online_tu17_zm.wad, online_tu14_mp_english.wad, online_tu14_sp_english.wad) in Call of Duty: Black Ops 1 & 2 and modern id Tech 7/8 containers.',
    'entry_0013': 'What is online_tu17_mp.wad? Technical deep dive into the WAD file format: from 1993 id Tech 1 (DOOM) to reverse-engineering undocumented Treyarch 0x543377AB (T3WAD) Demonware Publisher Storage WADs (online_tu17_mp.wad, online_tu17_zm.wad, online_tu14_mp_english.wad, online_tu14_sp_english.wad) in Call of Duty: Black Ops 1 & 2 and modern id Tech 7/8 containers.',
    'Optimize-Old-Games-4GB-Patch-DXVK': 'A step-by-step practical guide to fixing stuttering and crashes in classic DirectX games using Spet\'s 4gb Patch Online (PE32/PE32+ Large Address Aware Studio) and DXVK Vulkan translation layer.',
    'entry_0012': 'A step-by-step practical guide to fixing stuttering and crashes in classic DirectX games using Spet\'s 4gb Patch Online (PE32/PE32+ Large Address Aware Studio) and DXVK Vulkan translation layer.',
    'Open-Source-3D-Assets': 'Releasing all original low-poly 3D models from the portfolio simulation and game prototypes: Jet, Astronaut, Rocket, Paratrooper, Space Chicken, Jailson Mendes, Cop, and the RuTracker test Moon.',
    'entry_0011': 'Releasing all original low-poly 3D models from the portfolio simulation and game prototypes: Jet, Astronaut, Rocket, Paratrooper, Space Chicken, Jailson Mendes, Cop, and the RuTracker test Moon.',
    'What-Is-GSC': 'Comprehensive architectural guide to Game Scripting C (GSC), the bytecode VM engine behind Call of Duty titles by Eduardo Gelain.',
    'Cloudflare-Workers-Backend': 'Architecting zero-cost serverless backend APIs, rate limiters, and OAuth handlers for static GitHub Pages sites with Cloudflare Workers.',
    'T6-Open-Source-GSC-Mods': 'Open-sourcing custom game modes for Call of Duty: Black Ops 2 (T6) to preserve community game modifications.',
    'UWPCOD-GDK-DLC-Unlocker': 'Architectural research into UWP/GDK sandbox entitlement tokens, license verification routines, and runtime memory hooks for legacy software preservation.',
    'UWP-GDK-Sandbox-Entitlement-Analysis': 'Architectural research into UWP/GDK sandbox entitlement tokens, license verification routines, and runtime memory hooks for legacy software preservation.',
    'T6-GSC-Injector-MS-Store': 'Building the first 100% open-source C++ GSC injector for Black Ops 2 Microsoft Store edition with inline execution detours.',
    'T5-GSC-Injector-MS-Store': 'Reverse engineering legacy T5 engine structures in modern Windows UWP wrappers using IDA Pro cross-references to build a lightweight GSC injector.',
    'CW-GSC-Injection-MS-Store': 'Heuristic memory pattern scanning (sigscanning) in C++ to dynamically hook runtime script loaders in Call of Duty: Black Ops Cold War.',
    'T9-Mod-Manager-RE': 'Classified technical analysis on desktop script management software decompilation, runtime decryption routines, and bytecode extraction.',
    'entry_0007': 'Classified technical analysis on desktop script management software decompilation, runtime decryption routines, and bytecode extraction.',
    'shame_for_the_leakers': 'Technical statement, formal disavowal of RTM cheat bundles, and security disclosure on unauthorized repository dumps of the BO2 Crossplay Relay and repackaged msclients GSC Injector, alongside an architectural breakdown of UDP packet routing and HMAC-SHA1 translation.',
    'Document-Explaining-Leaks': 'Technical statement, formal disavowal of RTM cheat bundles, and security disclosure on unauthorized repository dumps of the BO2 Crossplay Relay and repackaged msclients GSC Injector, alongside an architectural breakdown of UDP packet routing and HMAC-SHA1 translation.',
    'entry_0003': 'Technical statement, formal disavowal of RTM cheat bundles, and security disclosure on unauthorized repository dumps of the BO2 Crossplay Relay and repackaged msclients GSC Injector, alongside an architectural breakdown of UDP packet routing and HMAC-SHA1 translation.'
};

const ENTRY_KEYWORDS = {
    'What-Is-A-WAD-Modern-Games': 'online_tu17_mp.wad, online_tu17_zm.wad, online_tu14_mp_english.wad, online_tu14_sp_english.wad, T3WAD, 0x543377AB, Demonware Publisher Storage, Call of Duty Black Ops 2 WAD, Call of Duty Black Ops 1 WAD, Plutonium demonware pub wad, ZPGDK, What is a WAD, DOOM IWAD PWAD, id Tech 7 resources, Eduardo Gelain, SpetDev',
    'Document-Explaining-Leaks': 'BO2 Crossplay Relay, ZPGDK GSC Injector, msclients, Call of Duty Black Ops 2 Crossplay, PS5 PC Crossplay BO2, Xirus, rolltide11, AAA Qurance, Waffle, Heretics Software, Spet, Eduardo Gelain, Stolen Code Disavowal',
    'Optimize-Old-Games-4GB-Patch-DXVK': '4GB Patch Online, Large Address Aware, LAA Patcher, Fable 3 4GB Patch, Fable3.exe LAA, DXVK Vulkan Old Games, Spet 4gb Patch, PE32 Checksum',
    'What-Is-ResurgeGDK': 'ResurgeGDK, Black Ops 3 Microsoft Store GDK, Steam to GDK BO3, xgameruntime.dll, BOIII Workshop Downloader, Ezz BOIII, GSC Injector BO3'
};

const ENTRY_FAQ_SCHEMA = {
    'What-Is-A-WAD-Modern-Games': {
        "@type": "FAQPage",
        "@id": "https://spet01.dev/journal/What-Is-A-WAD-Modern-Games/#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is online_tu17_mp.wad? (O que é o arquivo online_tu17_mp.wad?)",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "online_tu17_mp.wad is NOT a DOOM or Zandronum multiplayer mod. It is an official Call of Duty: Black Ops II (Treyarch T6 engine, Title Update 17) online configuration archive downloaded from Activision / Demonware Publisher Storage (18397/pub/online_tu17_mp.wad). It uses Treyarch's proprietary T3WAD binary container format (magic bytes AB 77 33 54 / 0x543377AB) and bundles 8 zlib-compressed lumps: playlists_mp.info, codtv-mp.json, voting-mp.json, motd-mp-english.json, leagues.info, message_encryption.dat, entitlements.info, and youtube.info. Em português: online_tu17_mp.wad NÃO é um mod de DOOM; é um arquivo oficial de configuração online de Call of Duty: Black Ops 2 (Title Update 17) baixado do Demonware Publisher Storage da Activision."
                }
            },
            {
                "@type": "Question",
                "name": "Are Demonware WAD files limited to Treyarch or used across Call of Duty engines (like MW3)?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Demonware Publisher Storage container archives were utilized across the Call of Duty engine lineage in general, spanning both Treyarch (T-Engine: T5, T6) and Infinity Ward (IW-Engine: Modern Warfare 3 / IW5). While Treyarch formalized the 0x543377AB T3WAD header, IW titles like MW3 also downloaded Demonware aggregate storage containers (playlists_tuXX.aggr and WAD blobs) to batch live-service network updates into single transactions."
                }
            },
            {
                "@type": "Question",
                "name": "What are online_tu14_mp_english.wad and online_tu17_zm.wad?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "online_tu17_zm.wad is the Call of Duty: Black Ops II Zombies (Title Update 17) Demonware WAD container. online_tu14_mp_english.wad and online_tu14_sp_english.wad are the Call of Duty: Black Ops 1 (T5, Title Update 14) Demonware Publisher Storage WAD archives (0x543377AB T3WAD header) used to deliver multiplayer playlists, contracts, and geographic matchmaking rules."
                }
            },
            {
                "@type": "Question",
                "name": "How do I open or unpack online_tu17_mp.wad or online_tu14_mp_english.wad?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can inspect and extract Treyarch 0x543377AB Demonware .wad files directly in your browser using Spet's Universal Game File Opener at https://spet01.dev/tools/universal-file/ (100% client-side), or by parsing the 16-byte Little-Endian T3WadHeader (0x543377AB) and 44-byte Big-Endian directory entries and inflating each lump with zlib."
                }
            }
        ]
    },
    'Document-Explaining-Leaks': {
        "@type": "FAQPage",
        "@id": "https://spet01.dev/journal/Document-Explaining-Leaks/#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Who are the real authors of the BO2 Crossplay Relay? (Quem são os verdadeiros criadores do BO2 Crossplay Relay?)",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The BO2 Crossplay Relay was researched, reverse-engineered, and created exclusively by Xirus, rolltide11, AAA (Qurance), Waffle, Heretics Software, and Spet (Eduardo Gelain). Any fork, repack, or tool circulating without these official credits is unauthorized stolen source code leaked from a private repository breach."
                }
            },
            {
                "@type": "Question",
                "name": "Who developed the first GSC Injector for Call of Duty on Microsoft Store / Xbox PC?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The first functional GSC Injector for the Microsoft Store / Xbox PC (GDK) edition of Call of Duty (Black Ops 1 & 2) was reverse-engineered and authored by Spet (Eduardo Gelain) and published open-source in the msclients repository (gitlab.com/Spet001/msclients). Repackaged versions labeled 'Microsoft Store Only' bundled into cheat tools are unauthorized re-distributions of Spet's open-source injector."
                }
            },
            {
                "@type": "Question",
                "name": "Does Spet or the Crossplay Relay team support RTM cheat tools or public multiplayer griefing?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Strictly NO. Spet and the Crossplay Relay authors have formally disavowed all RTM (Real-Time Modding) cheat tools, aimbots, and lobby disruption software. The Crossplay Relay was an academic cross-platform network protocol translation study, and the GSC Injector was built solely for offline/custom modding. Bad actors selling or bundling these tools with cheat software in public lobbies should be legally prosecuted by Activision."
                }
            }
        ]
    },
    'Optimize-Old-Games-4GB-Patch-DXVK': {
        "@type": "FAQPage",
        "@id": "https://spet01.dev/journal/Optimize-Old-Games-4GB-Patch-DXVK/#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How do I fix Out of Memory crashes (0xC0000005) in Fable 3, Fallout New Vegas, and classic 32-bit games?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "By applying the Large Address Aware (LAA / 4GB Patch) flag to the 32-bit executable. This sets bit 5 (0x0020) in IMAGE_FILE_HEADER.Characteristics, allowing 32-bit applications running on 64-bit Windows (WOW64) to access 4.0 GB of virtual address space instead of crashing at the default 2.0 GB ceiling."
                }
            },
            {
                "@type": "Question",
                "name": "What is Spet's 4gb Patch Online and how does it work?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Spet's 4gb Patch Online (https://spet01.dev/tools/4gb-patch/) is a 100% client-side PE32/PE32+ binary patcher running in browser memory via WebAssembly/ArrayBuffer. It flips the LAA flag (0x0020), recalculates the 16-bit folded PE CheckSum, strips ASLR (~0x0040) if needed, exports x64dbg .1337 patches, and never uploads your executables to any server."
                }
            },
            {
                "@type": "Question",
                "name": "Can I test the 4GB patch on Fable 3 directly in the browser?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Spet's 4gb Patch Online includes a built-in 1-click Fable3.exe sample button that decrypts and loads a genuine Fable3.exe binary into the browser workbench instantly so you can inspect its PE header characteristics and test the patching workflow live."
                }
            }
        ]
    },
    'What-Is-ResurgeGDK': {
        "@type": "FAQPage",
        "@id": "https://spet01.dev/journal/What-Is-ResurgeGDK/#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is ResurgeGDK for Call of Duty: Black Ops III?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ResurgeGDK is an open-source compatibility bridge created by Spet (Eduardo Gelain) that ports Call of Duty: Black Ops III from Steam to the Microsoft Store GDK (Game Development Kit) runtime, enabling offline DLC virtualization, Ezz BOIII security patches, and Steam Workshop mod mounting on Xbox PC."
                }
            },
            {
                "@type": "Question",
                "name": "Can you use Steam Workshop mods on Black Ops III Microsoft Store edition?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. ResurgeGDK embeds a virtual filesystem (VFS) integration with BOIII Downloader that redirects engine file queries so custom Zombies maps and multiplayer mods downloaded from Steam Workshop load natively inside the Microsoft Store / Game Pass version of Black Ops III."
                }
            }
        ]
    },
    'Tribute-To-BioWare-And-Mass-Effect': {
        "@type": "FAQPage",
        "@id": "https://spet01.dev/journal/Tribute-To-BioWare-And-Mass-Effect/#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How did Mass Effect inspire Eduardo Gelain's 3D portfolio?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The entire 3D interface of spet01.dev—including the Three.js Galaxy Map, holographic orbit rings, star clusters, and Systems Alliance blue-orange HUD typography—was directly inspired by the Normandy CIC Galaxy Map and BioWare's Mass Effect trilogy."
                }
            },
            {
                "@type": "Question",
                "name": "How do I trigger the Mass Effect easter eggs on spet01.dev?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can listen to the Mass Effect OST in the custom N7 audio player tab, or open the CLI Terminal by pressing '~' or clicking the terminal icon and typing '/shepard' or 'shepard' to execute the Systems Alliance Commander Shepard protocol."
                }
            }
        ]
    },
    'Exploring-Legacy-UWP-Titles': {
        "@type": "FAQPage",
        "@id": "https://spet01.dev/journal/Exploring-Legacy-UWP-Titles/#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How does UWP Dumper inject code into restricted Windows 10/11 AppContainer sandboxes?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "UWP Dumper leverages the Windows process creation lifecycle by spawning the target UWP package in a suspended state (DEBUG_PROCESS), modifying thread tokens and memory rights before AppContainer isolation takes effect, and safely injecting native C/C++ DLLs."
                }
            },
            {
                "@type": "Question",
                "name": "Can COD Points or microtransactions be spoofed client-side in UWP Call of Duty games?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. While client-side WinRT COM interfaces (such as IStoreContextServer) can be detoured to inspect catalog offerings and purchase intents, actual currency accounting and entitlement verification occur via cryptographically signed Server-to-Server (S2S) ticket validation against Xbox Live and Demonware."
                }
            }
        ]
    },
    'Gamifying-A-Galactic-Portfolio-Galaxy-Map': {
        "@type": "FAQPage",
        "@id": "https://spet01.dev/journal/Gamifying-A-Galactic-Portfolio-Galaxy-Map/#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is the 3D Galaxy Map on spet01.dev?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The 3D Galaxy Map is an interactive celestial interface built in Three.js WebGL and inspired by the Normandy CIC in Mass Effect. It renders software engineering projects as explorable solar systems and celestial bodies with orbital physics and space sound effects."
                }
            },
            {
                "@type": "Question",
                "name": "How do you control the orbital camera in Galaxy Map mode?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Users can fly through the galaxy using the keyboard arrow keys or touch gestures, orbit individual project planets, view live telemetry data, and discover hidden interactive sectors directly in their browser."
                }
            }
        ]
    },
    'DEVLOG-Outcaster-Unity-6': {
        "@type": "FAQPage",
        "@id": "https://spet01.dev/journal/DEVLOG-Outcaster-Unity-6/#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is Outcaster and what engine does it use?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Outcaster is a retro 2.5D FPS template and Zombies Survival game created by Eduardo Gelain in Unity 6 using C# and DirectX 11. It features modular weapon state machines, raycast and ballistic projectile physics, and finite-state AI navigation."
                }
            },
            {
                "@type": "Question",
                "name": "What is the Live 3D HUD Preview in Outcaster?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Live 3D HUD Preview is a custom Unity Editor tool that renders weapon viewmodels, recoil animations, and camera bobbing inside the Inspector in edit-mode, eliminating the need to enter play-mode to iterate on weapon positioning and ergonomics."
                }
            }
        ]
    },
    'Sparky-Rush-Steam-Release': {
        "@type": "FAQPage",
        "@id": "https://spet01.dev/journal/Sparky-Rush-Steam-Release/#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is Sparky Rush: Purrils in Pawsville?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sparky Rush: Purrils in Pawsville is a commercial 3D platformer game released on Steam developed by Converting Minds, featuring high-speed platforming and feline mechanics."
                }
            },
            {
                "@type": "Question",
                "name": "What was Eduardo Gelain's QA engineering role on Sparky Rush?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Eduardo Gelain served as a Quality Assurance (QA) Analyst and technical tester, logging and verifying over 100 collider anomalies, resolving 20+ softlock edge cases, optimizing UI for ultrawide monitors, and benchmarking the game to maintain stable 60 FPS on entry-level hardware like the GeForce GT 710."
                }
            }
        ]
    },
    'How-To-Optimize-ThreeJS-Scene-120-FPS': {
        "@type": "FAQPage",
        "@id": "https://spet01.dev/journal/How-To-Optimize-ThreeJS-Scene-120-FPS/#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How do you achieve 120 FPS in complex Three.js WebGL scenes?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Key techniques include using stateless GLSL vertex/fragment particle shaders, batching objects with InstancedMesh, frustum culling, eliminating garbage collection pauses in animation loops, and using translate3d sprite sheets instead of heavy HTML5 video elements to prevent D3D11 SwapChain presentation locks."
                }
            },
            {
                "@type": "Question",
                "name": "Why should HTML5 video elements be avoided inside high-framerate WebGL viewports?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "HTML5 video decoding forces asynchronous Chromium compositor pipeline synchronization and lock contention on Windows DirectX SwapChains, capping refresh rates. Replacing videos with hardware-accelerated CSS/WebGL sprite sheets guarantees smooth 120 to 165+ FPS rendering."
                }
            }
        ]
    },
    'Open-Source-3D-Assets': {
        "@type": "FAQPage",
        "@id": "https://spet01.dev/journal/Open-Source-3D-Assets/#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What free 3D models are available for download on spet01.dev?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Eduardo Gelain released the complete original collection of low-poly 3D assets used in the portfolio, including the Jet, Astronaut, Orbital Rocket, Paratrooper, Space Chicken, Cop, and test Moon models in standard OBJ and glTF/GLB formats."
                }
            },
            {
                "@type": "Question",
                "name": "Are the 3D assets on spet01.dev free for commercial use?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, they are distributed under open-source permissive licensing for indie game developers, educators, and creators to use in prototypes and commercial titles."
                }
            }
        ]
    },
    'What-Is-GSC': {
        "@type": "FAQPage",
        "@id": "https://spet01.dev/journal/What-Is-GSC/#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is Game Scripting C (GSC) in Call of Duty engines?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "GSC (Game Scripting C) is a proprietary, C-like scripting language and bytecode virtual machine engineered by Infinity Ward and Treyarch. It controls all high-level game logic, mission scripts, weapon mechanics, and Zombies rounds across Call of Duty titles."
                }
            },
            {
                "@type": "Question",
                "name": "How does the GSC Bytecode Virtual Machine execute scripts?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "GSC files are compiled into binary bytecode blocks consisting of opcodes, string token hashes, and function exports. The engine's runtime VM stack evaluates these opcodes concurrently via cooperative multithreading threads ('waittill', 'notify', 'endon')."
                }
            }
        ]
    },
    'Cloudflare-Workers-Backend': {
        "@type": "FAQPage",
        "@id": "https://spet01.dev/journal/Cloudflare-Workers-Backend/#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How can you build a zero-cost backend for a static website hosted on GitHub Pages?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "By deploying serverless edge microservices on Cloudflare Workers. Cloudflare Workers run JavaScript/WASM at edge data centers with sub-10ms latency, handling dynamic APIs, visitor telemetry, rate limiting, and secure webhooks without running a traditional server."
                }
            },
            {
                "@type": "Question",
                "name": "What features does Cloudflare Workers power on spet01.dev?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "On spet01.dev, Cloudflare Workers manage the live global visitor analytics counter, rate-limited contact form submissions, and edge caching rules with zero server hosting costs."
                }
            }
        ]
    },
    'T6-Open-Source-GSC-Mods': {
        "@type": "FAQPage",
        "@id": "https://spet01.dev/journal/T6-Open-Source-GSC-Mods/#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What custom game modes are included in the open-source T6 GSC release?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The repository contains fully commented and customizable GSC game mode scripts for Call of Duty: Black Ops II, featuring custom infected survival rulesets, weapon progression modifiers, and dedicated server admin commands."
                }
            },
            {
                "@type": "Question",
                "name": "How do you install custom GSC mods in Call of Duty: Black Ops II?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "By placing the compiled or uncompiled GSC files into the appropriate local scripts directory (e.g. %LOCALAPPDATA%\\Plutonium\\storage\\t6\\scripts\\ or injecting them into memory via an open-source GSC injector)."
                }
            }
        ]
    },
    'entry_0007': {
        "@type": "FAQPage",
        "@id": "https://spet01.dev/journal/entry_0007/#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is the technical focus of entry 0007?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Entry 0007 covers advanced reverse engineering methodologies for commercial desktop script manager utilities, analyzing obfuscated binary runtimes, dynamic decryption hooks, and memory inspection."
                }
            },
            {
                "@type": "Question",
                "name": "How can readers access confidential journal entries like entry 0007?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Classified and confidential reverse engineering analyses are unlocked through an active subscription to Eduardo Gelain's technical Patreon at https://www.patreon.com/15458299/join."
                }
            }
        ]
    },
    'UWP-GDK-Sandbox-Entitlement-Analysis': {
        "@type": "FAQPage",
        "@id": "https://spet01.dev/journal/UWP-GDK-Sandbox-Entitlement-Analysis/#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is the architecture of the Microsoft Store UWP/GDK sandbox?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Windows Game Development Kit (GDK) and UWP sandbox run games inside isolated AppContainers. Process tokens, virtualized registry hives, and capability bitmasks restrict inter-process communication and file access unless specific COM interfaces and memory offsets are detoured."
                }
            },
            {
                "@type": "Question",
                "name": "Why is UWP sandbox reverse engineering important for software preservation?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "As older UWP games are delisted from the Microsoft Store, understanding license verification and COM entitlement calls enables researchers to archive legacy PC titles, preserve DLC access, and allow community modding offline."
                }
            }
        ]
    },
    'T6-GSC-Injector-MS-Store': {
        "@type": "FAQPage",
        "@id": "https://spet01.dev/journal/T6-GSC-Injector-MS-Store/#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What makes the Black Ops 2 Microsoft Store edition unique for modding?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Microsoft Store / Xbox PC edition of Black Ops II is a 64-bit binary wrapped in modern Windows GDK security layers, lacking traditional Steam community mod support and featuring different internal function addresses."
                }
            },
            {
                "@type": "Question",
                "name": "How does Spet's open-source T6 MS Store GSC Injector work?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Spet's injector hooks into the game's script compiler initialization routine, allocates memory for custom GSC scripts, and redirects the internal script loading table to execute custom community scripts natively."
                }
            }
        ]
    },
    'T5-GSC-Injector-MS-Store': {
        "@type": "FAQPage",
        "@id": "https://spet01.dev/journal/T5-GSC-Injector-MS-Store/#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How was the Black Ops 1 Microsoft Store GSC Injector developed?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "By reverse engineering the 64-bit UWP executable of Call of Duty: Black Ops 1 with IDA Pro, tracing cross-references from legacy T5 engine string tokens to locate the runtime script loader, and implementing an inline memory detour in C++."
                }
            },
            {
                "@type": "Question",
                "name": "Is the Call of Duty: Black Ops 1 MS Store GSC Injector free and open source?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, it is 100% open source and published in the msclients repository (gitlab.com/Spet001/msclients) for educational reverse engineering and custom offline modding."
                }
            }
        ]
    },
    'CW-GSC-Injection-MS-Store': {
        "@type": "FAQPage",
        "@id": "https://spet01.dev/journal/CW-GSC-Injection-MS-Store/#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is dynamic pattern scanning (sigscanning) in game reverse engineering?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sigscanning is a technique where an injector scans process memory for distinctive byte sequences (opcodes) and wildcards rather than relying on hardcoded virtual addresses, allowing hooks to survive minor title updates."
                }
            },
            {
                "@type": "Question",
                "name": "Why was heuristic pattern scanning necessary for Call of Duty: Black Ops Cold War GSC injection?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Modern games receive frequent live updates and title updates that shift memory layouts. The heuristic sigscanner built by Eduardo Gelain dynamically discovers the runtime GSC asset registry in Cold War without manual address updates."
                }
            }
        ]
    }
};

function getSlug(entry) {
    const isLocked = (
        entry.file === 'T9-Mod-Manager-RE.md' || 
        entry.id === 'entry_0007'
    );
    if (isLocked) {
        return entry.id;
    }
    return entry.file ? entry.file.replace(/\.md$/, '') : entry.id;
}

function build() {
    console.log('[SSG Journal] Starting static site generation for Journal articles...');
    
    if (!fs.existsSync(ENTRIES_FILE)) {
        console.error('entries.json not found!');
        return;
    }
    
    const entries = JSON.parse(fs.readFileSync(ENTRIES_FILE, 'utf8'));
    let templateHtml = fs.readFileSync(ROOT_INDEX_FILE, 'utf8');
    if (!templateHtml.includes('id="initial-loading-screen" data-nosnippet="true" aria-hidden="true"')) {
        templateHtml = templateHtml.replace(
            '<div id="initial-loading-screen"',
            '<div id="initial-loading-screen" data-nosnippet="true" aria-hidden="true"'
        );
    }

    let generatedCount = 0;

    // 1. Generate individual article pages: /journal/<slug>/index.html and /journal/<slug>.html
    entries.forEach(entry => {
        const slug = getSlug(entry);
        const mdPath = path.join(MD_DIR, entry.file || `${slug}.md`);
        let articleHtml = '';
        const description = ENTRY_DESCRIPTIONS[slug] || ENTRY_DESCRIPTIONS[entry.id] || `${entry.title} - Technical research paper by Eduardo Gelain (SpetDev).`;

        if (fs.existsSync(mdPath)) {
            const mdContent = fs.readFileSync(mdPath, 'utf8').replace(/^\s*#\s+[^\r\n]+[\r\n]*/, '');
            articleHtml = marked.parse(mdContent);
        } else {
            // Locked / Patreon entry fallback representation
            articleHtml = `
                <div class="flex flex-col items-center justify-center py-12 text-center">
                    <i class="fas fa-lock text-5xl text-primary mb-6 drop-shadow-[0_0_15px_rgba(255,80,0,0.5)]"></i>
                    <h2 class="text-2xl font-bold text-white mb-4">${entry.title}</h2>
                    <p class="text-slate-300 font-medium max-w-lg mb-6">${description}</p>
                    <p class="text-slate-400 text-sm max-w-md mb-8">This technical journal entry is confidential. You must have an active Patreon subscription to read the architecture breakdown and source code details.</p>
                    <a href="https://www.patreon.com/15458299/join" target="_blank" rel="noreferrer" class="px-6 py-3 bg-[#FF424D] hover:bg-[#e03640] text-white font-bold rounded-xl transition-colors inline-flex items-center gap-2 shadow-lg">
                        <i class="fab fa-patreon"></i> Subscribe to Patreon to Unlock this Entry!
                    </a>
                </div>
            `;
        }

        let pageHtml = templateHtml;

        // 1. Title
        pageHtml = pageHtml.replace(
            /<title>[^<]+<\/title>/,
            `<title>${entry.title} | Eduardo Gelain Technical Journal</title>`
        );

        // 2. Meta description & keywords
        pageHtml = pageHtml.replace(
            /<meta\s+name="description"\s+content="[^"]*">/,
            `<meta name="description" content="${description.replace(/"/g, '&quot;')}">`
        );
        if (ENTRY_KEYWORDS[slug]) {
            pageHtml = pageHtml.replace(
                /<meta\s+name="keywords"\s+content="[^"]*">/,
                `<meta name="keywords" content="${ENTRY_KEYWORDS[slug].replace(/"/g, '&quot;')}">`
            );
        }

        // 3. Canonical
        pageHtml = pageHtml.replace(
            /<link\s+rel="canonical"\s+href="[^"]*">/,
            `<link rel="canonical" href="https://spet01.dev/journal/${slug}/">`
        );

        // 4. OpenGraph
        pageHtml = pageHtml.replace(
            /<meta\s+property="og:title"\s+content="[^"]*">/,
            `<meta property="og:title" content="${entry.title.replace(/"/g, '&quot;')} | Eduardo Gelain">`
        );
        pageHtml = pageHtml.replace(
            /<meta\s+property="og:description"\s+content="[^"]*">/,
            `<meta property="og:description" content="${description.replace(/"/g, '&quot;')}">`
        );
        pageHtml = pageHtml.replace(
            /<meta\s+property="og:url"\s+content="[^"]*">/,
            `<meta property="og:url" content="https://spet01.dev/journal/${slug}/">`
        );

        // 5. Twitter
        pageHtml = pageHtml.replace(
            /<meta\s+name="twitter:title"\s+content="[^"]*">/,
            `<meta name="twitter:title" content="${entry.title.replace(/"/g, '&quot;')} | Eduardo Gelain">`
        );
        pageHtml = pageHtml.replace(
            /<meta\s+name="twitter:description"\s+content="[^"]*">/,
            `<meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}">`
        );
        pageHtml = pageHtml.replace(
            /<meta\s+name="twitter:url"\s+content="[^"]*">/,
            `<meta name="twitter:url" content="https://spet01.dev/journal/${slug}/">`
        );

        // 6. Schema.org JSON-LD for this specific article (plus FAQPage if defined)
        const blogPostingNode = {
            "@type": "BlogPosting",
            "@id": `https://spet01.dev/journal/${slug}/#article`,
            "headline": entry.title,
            "description": description,
            "datePublished": entry.date,
            "articleSection": entry.category || "Reverse Engineering",
            "url": `https://spet01.dev/journal/${slug}/`,
            "mainEntityOfPage": `https://spet01.dev/journal/${slug}/`,
            "author": {
                "@type": "Person",
                "name": "Eduardo Gelain",
                "alternateName": "SpetDev",
                "url": "https://spet01.dev"
            },
            "publisher": {
                "@type": "Person",
                "name": "Eduardo Gelain",
                "url": "https://spet01.dev"
            }
        };

        const faqNode = ENTRY_FAQ_SCHEMA[slug] || ENTRY_FAQ_SCHEMA[entry.id] || {
            "@type": "FAQPage",
            "@id": `https://spet01.dev/journal/${slug}/#faq`,
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": `What is covered in "${entry.title}"?`,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": description
                    }
                },
                {
                    "@type": "Question",
                    "name": `Who authored this research paper on ${entry.category || 'software development'}?`,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "This research paper was researched and authored by Eduardo Gelain (SpetDev), specializing in reverse engineering, systems programming, and game development."
                    }
                }
            ]
        };

        const jsonLd = {
            "@context": "https://schema.org",
            "@graph": [
                blogPostingNode,
                faqNode
            ]
        };

        pageHtml = pageHtml.replace(
            /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
            `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>`
        );

        // 7. Replace <main id="main-content">...</main> with article content
        const categoryMetaHtml = entry.category
            ? `<span><i class="far fa-folder mr-1"></i> ${entry.category}</span>`
            : '';
        const articleMainHtml = `        <main id="main-content" class="pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto">
            <div class="mb-8 flex items-center justify-between text-xs">
                <a href="/" class="text-primary hover:underline font-mono">← Back to Home (SpetDev)</a>
                <a href="/journal/" class="text-slate-400 hover:text-white font-mono">All Articles →</a>
            </div>
            <article class="p-6 sm:p-10 rounded-2xl bg-[#0a0f1d]/80 border border-white/[0.08] shadow-2xl backdrop-blur-md">
                <header class="mb-8 pb-6 border-b border-white/[0.08]">
                    <div class="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-3">
                        <time><i class="far fa-calendar-alt mr-1"></i> ${entry.date}</time>
                        <span><i class="far fa-user mr-1"></i> Eduardo Gelain (SpetDev)</span>
                        ${categoryMetaHtml}
                    </div>
                    <h1 class="text-2xl sm:text-4xl font-bold text-white mb-4 leading-tight">${entry.title}</h1>
                    <p class="text-slate-300 text-sm leading-relaxed">${description}</p>
                </header>
                <div id="content" class="markdown-body" data-prerendered="${slug}">
${articleHtml}
                </div>
            </article>
        </main>`;

        pageHtml = pageHtml.replace(
            /<main id="main-content"[^>]*>[\s\S]*?<\/main>/,
            articleMainHtml
        );

        // Write output: journal/<slug>/index.html
        const targetDir = path.join(JOURNAL_DIR, slug);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml, 'utf8');

        // Also write journal/<slug>.html
        fs.writeFileSync(path.join(JOURNAL_DIR, `${slug}.html`), pageHtml, 'utf8');

        // If entry.id is distinct from slug, also generate alias with noindex,follow
        if (entry.id && entry.id !== slug) {
            const aliasDir = path.join(JOURNAL_DIR, entry.id);
            if (!fs.existsSync(aliasDir)) {
                fs.mkdirSync(aliasDir, { recursive: true });
            }
            const aliasHtml = pageHtml.replace(
                /<meta\s+name="robots"\s+content="[^"]*">/,
                `<meta name="robots" content="noindex, follow">`
            );
            fs.writeFileSync(path.join(aliasDir, 'index.html'), aliasHtml, 'utf8');
            fs.writeFileSync(path.join(JOURNAL_DIR, `${entry.id}.html`), aliasHtml, 'utf8');
            console.log(`[SSG Journal] Generated alias (noindex -> canonical): /journal/${entry.id}/index.html`);
        }

        generatedCount++;
        console.log(`[SSG Journal] Generated: /journal/${slug}/index.html`);
    });

    // 1.1 Generate redirects for legacy URL paths that were renamed to preserve external backlinks
    const LEGACY_URL_REDIRECTS = {
        'shame_for_the_leakers': 'Document-Explaining-Leaks',
        'UWPCOD-GDK-DLC-Unlocker': 'UWP-GDK-Sandbox-Entitlement-Analysis'
    };

    Object.entries(LEGACY_URL_REDIRECTS).forEach(([oldSlug, newSlug]) => {
        const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Redirecting to ${newSlug} | Eduardo Gelain Technical Journal</title>
    <link rel="canonical" href="https://spet01.dev/journal/${newSlug}/">
    <meta name="robots" content="noindex, follow">
    <meta http-equiv="refresh" content="0; url=/journal/${newSlug}/">
    <script>window.location.replace('/journal/${newSlug}/');</script>
</head>
<body style="background:#050505;color:#94a3b8;font-family:sans-serif;padding:3rem 1rem;text-align:center;">
    <p>Redirecting to <a href="/journal/${newSlug}/" style="color:#ff5500;font-weight:bold;">https://spet01.dev/journal/${newSlug}/</a>...</p>
</body>
</html>`;

        const oldDir = path.join(JOURNAL_DIR, oldSlug);
        if (!fs.existsSync(oldDir)) {
            fs.mkdirSync(oldDir, { recursive: true });
        }
        fs.writeFileSync(path.join(oldDir, 'index.html'), redirectHtml, 'utf8');
        fs.writeFileSync(path.join(JOURNAL_DIR, `${oldSlug}.html`), redirectHtml, 'utf8');
        console.log(`[SSG Journal] Generated legacy redirect: /journal/${oldSlug}/ -> /journal/${newSlug}/`);
    });

    // 2. Generate Master /journal/index.html with pre-rendered list of articles
    let masterJournalHtml = templateHtml;
    masterJournalHtml = masterJournalHtml.replace(
        /<title>[^<]+<\/title>/,
        `<title>Technical Journal | Eduardo Gelain – Reverse Engineering & Game Dev</title>`
    );
    masterJournalHtml = masterJournalHtml.replace(
        /<meta\s+name="description"\s+content="[^"]*">/,
        `<meta name="description" content="In-depth technical research papers, reverse engineering breakdowns, GSC bytecode VM analysis, UWP/GDK sandbox bypasses by Eduardo Gelain (SpetDev).">`
    );
    masterJournalHtml = masterJournalHtml.replace(
        /<link\s+rel="canonical"\s+href="[^"]*">/,
        `<link rel="canonical" href="https://spet01.dev/journal/">`
    );

    const journalCardsHtml = entries.map(e => {
        const slug = getSlug(e);
        const desc = ENTRY_DESCRIPTIONS[slug] || ENTRY_DESCRIPTIONS[e.id] || `${e.title} - Research paper.`;
        return `                    <article class="p-5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-primary/40 transition-colors">
                        <time class="text-xs font-mono text-slate-500 mb-2 block">${e.date}</time>
                        <h2 class="text-base font-bold text-white mb-2">
                            <a href="/journal/${slug}/" class="hover:text-primary transition-colors">${e.title}</a>
                        </h2>
                        <p class="text-xs text-slate-400 leading-relaxed mb-3">${desc}</p>
                        <a href="/journal/${slug}/" class="text-xs font-bold text-primary hover:underline">Read Research Paper →</a>
                    </article>`;
    }).join('\n');

    const masterMainHtml = `        <main id="main-content" class="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
            <div class="mb-8">
                <a href="/" class="text-xs text-primary hover:underline font-mono">← Back to Home (SpetDev)</a>
            </div>
            <section class="p-6 sm:p-10 rounded-2xl bg-[#0a0f1d]/80 border border-white/[0.08] shadow-2xl backdrop-blur-md mb-8">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs font-bold mb-3">
                    <i class="fas fa-book-open text-[10px]"></i> Reverse Engineering & Game Dev Research
                </div>
                <h1 class="text-2xl sm:text-4xl font-bold text-white mb-4">Technical Journal & Research Papers</h1>
                <p class="text-slate-300 text-sm leading-relaxed max-w-2xl mb-8">
                    Deep-dive technical research papers covering reverse engineering, Call of Duty GSC bytecode VM architecture, UWP/GDK sandbox security analysis, and serverless edge backends.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
${journalCardsHtml}
                </div>
            </section>
        </main>`;

    masterJournalHtml = masterJournalHtml.replace(
        /<main id="main-content"[^>]*>[\s\S]*?<\/main>/,
        masterMainHtml
    );

    fs.writeFileSync(MASTER_JOURNAL_INDEX, masterJournalHtml, 'utf8');
    console.log(`[SSG Journal] Updated master /journal/index.html with modern unified shell.`);

    // 3. Generate unified /privacy.html and /privacy/index.html with Space 2.0 3D shell
    let privacyHtml = templateHtml;
    privacyHtml = privacyHtml.replace(
        /<title>[^<]+<\/title>/,
        `<title>Privacy Statement | Eduardo Gelain – SpetDev</title>`
    );
    privacyHtml = privacyHtml.replace(
        /<meta\s+name="description"\s+content="[^"]*">/,
        `<meta name="description" content="Privacy Policy and Cookie Statement for Eduardo Gelain (SpetDev) portfolio and Technical Journal.">`
    );
    privacyHtml = privacyHtml.replace(
        /<link\s+rel="canonical"\s+href="[^"]*">/,
        `<link rel="canonical" href="https://spet01.dev/privacy.html">`
    );

    const privacyMainHtml = `        <main id="main-content" class="pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto">
            <div class="mb-8">
                <a href="/" class="text-xs text-primary hover:underline font-mono">← Voltar ao Início (SpetDev)</a>
            </div>
            <section class="p-6 sm:p-10 rounded-2xl bg-[#0a0f1d]/80 border border-white/[0.08] shadow-2xl backdrop-blur-md">
                <h1 class="text-2xl sm:text-4xl font-bold text-white mb-2">Privacy Policy &amp; Cookie Statement</h1>
                <p class="text-xs text-slate-400 font-mono mb-6">Last updated: September 2026</p>
                <div class="space-y-4 text-sm text-slate-300 leading-relaxed">
                    <p>This portfolio is hosted as a static website on GitHub Pages and leverages Cloudflare Workers at the edge for backend functionality.</p>
                    <p>This website does not use third-party tracking cookies and does not store personally identifiable information (PII) on your device without explicit consent.</p>
                </div>
            </section>
        </main>`;

    privacyHtml = privacyHtml.replace(
        /<main id="main-content"[^>]*>[\s\S]*?<\/main>/,
        privacyMainHtml
    );

    const privacyDir = path.join(ROOT_DIR, 'privacy');
    if (!fs.existsSync(privacyDir)) {
        fs.mkdirSync(privacyDir, { recursive: true });
    }
    fs.writeFileSync(path.join(ROOT_DIR, 'privacy.html'), privacyHtml, 'utf8');
    fs.writeFileSync(path.join(privacyDir, 'index.html'), privacyHtml, 'utf8');
    console.log(`[SSG Journal] Updated /privacy.html and /privacy/index.html with unified Space 2.0 shell.`);

    // 4. Automatically generate /sitemap.xml from entries.json so new entries are always indexed
    const parseIsoDate = (dateStr) => {
        const d = new Date(dateStr);
        if (!isNaN(d.getTime())) {
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        }
        return '2026-10-11';
    };

    const latestDate = entries.length > 0 ? parseIsoDate(entries[0].date) : '2026-10-11';
    const sitemapUrls = [];

    entries.forEach(entry => {
        const slug = getSlug(entry);
        const lastmod = parseIsoDate(entry.date);
        // Primary canonical slug URL only (never include duplicate entry_XXXX aliases in sitemap.xml)
        sitemapUrls.push(`  <url>
    <loc>https://spet01.dev/journal/${slug}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${slug === entry.id ? '0.6' : '0.85'}</priority>
  </url>`);
    });

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Portfolio -->
  <url>
    <loc>https://spet01.dev/</loc>
    <lastmod>${latestDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Technical Journal -->
  <url>
    <loc>https://spet01.dev/journal/</loc>
    <lastmod>${latestDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Journal Articles (Canonical Static Prerendered SEO URLs Only) -->
${sitemapUrls.join('\n')}

  <!-- Tools Suite -->
  <url>
    <loc>https://spet01.dev/tools/</loc>
    <lastmod>2026-10-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://spet01.dev/tools/easy-decompiler/</loc>
    <lastmod>2026-10-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://spet01.dev/tools/universal-file/</loc>
    <lastmod>2026-10-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://spet01.dev/tools/reshade-studio/</loc>
    <lastmod>2026-10-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://spet01.dev/tools/4gb-patch/</loc>
    <lastmod>2026-10-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://spet01.dev/tools/image-to-3d/</loc>
    <lastmod>2026-10-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>

  <!-- Privacy Policy -->
  <url>
    <loc>https://spet01.dev/privacy.html</loc>
    <lastmod>2026-09-30</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>
</urlset>
`;

    fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
    console.log(`[SSG Journal] Automatically updated /sitemap.xml with ${entries.length} canonical journal entries.`);
    console.log(`[SSG Journal] Successfully generated ${generatedCount} static pages!`);
}

build();
