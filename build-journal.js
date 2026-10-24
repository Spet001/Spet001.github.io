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
                "name": "What is online_tu17_zm.wad?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "online_tu17_zm.wad is the Call of Duty: Black Ops II Zombies (Title Update 17) Demonware Publisher Storage WAD container (0x543377AB T3WAD header). It contains 4 zlib-compressed lumps for Zombies online services: playlists_zm.info, codtv-zm.json, voting-zm.json, and motd-zm-english.json."
                }
            },
            {
                "@type": "Question",
                "name": "What are online_tu14_mp_english.wad and online_tu14_sp_english.wad?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "online_tu14_mp_english.wad and online_tu14_sp_english.wad are official Demonware Publisher Storage WAD archives (0x543377AB T3WAD format) used by Call of Duty: Black Ops 1 (Treyarch T5 engine, Title Update 14) to deliver online multiplayer playlists (playlists_mp.info), Mercenary contracts (contracts.dat), geographic matchmaking routing (geogroups.info), remote DVAR ACL rules (restrict_access_wad_mp.csv), and Message of the Day text (motd-mp-english.txt)."
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

        const jsonLd = ENTRY_FAQ_SCHEMA[slug]
            ? {
                "@context": "https://schema.org",
                "@graph": [
                    blogPostingNode,
                    ENTRY_FAQ_SCHEMA[slug]
                ]
            }
            : {
                "@context": "https://schema.org",
                ...blogPostingNode
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
