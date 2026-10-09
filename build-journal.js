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
    'Optimize-Old-Games-4GB-Patch-DXVK': 'A step-by-step practical guide to fixing stuttering and crashes in classic DirectX games using the 4GB Memory Patch (LAA) and DXVK Vulkan translation layer.',
    'entry_0012': 'A step-by-step practical guide to fixing stuttering and crashes in classic DirectX games using the 4GB Memory Patch (LAA) and DXVK Vulkan translation layer.',
    'Open-Source-3D-Assets': 'Releasing all original low-poly 3D models from the portfolio simulation and game prototypes: Jet, Astronaut, Rocket, Paratrooper, Space Chicken, Jailson Mendes, Cop, and the RuTracker test Moon.',
    'entry_0011': 'Releasing all original low-poly 3D models from the portfolio simulation and game prototypes: Jet, Astronaut, Rocket, Paratrooper, Space Chicken, Jailson Mendes, Cop, and the RuTracker test Moon.',
    'What-Is-GSC': 'Comprehensive architectural guide to Game Scripting C (GSC), the bytecode VM engine behind Call of Duty titles by Eduardo Gelain.',
    'Cloudflare-Workers-Backend': 'Architecting zero-cost serverless backend APIs, rate limiters, and OAuth handlers for static GitHub Pages sites with Cloudflare Workers.',
    'T6-Open-Source-GSC-Mods': 'Open-sourcing custom game modes for Call of Duty: Black Ops 2 (T6) to preserve community game modifications.',
    'UWPCOD-GDK-DLC-Unlocker': 'Reverse engineering UWP/GDK sandbox entitlement tokens and license verification routines for pre-installed Call of Duty DLC assets.',
    'T6-GSC-Injector-MS-Store': 'Building the first 100% open-source C++ GSC injector for Black Ops 2 Microsoft Store edition with inline execution detours.',
    'T5-GSC-Injector-MS-Store': 'Reverse engineering legacy T5 engine structures in modern Windows UWP wrappers using IDA Pro cross-references to build a lightweight GSC injector.',
    'CW-GSC-Injection-MS-Store': 'Heuristic memory pattern scanning (sigscanning) in C++ to dynamically hook runtime script loaders in Call of Duty: Black Ops Cold War.',
    'T9-Mod-Manager-RE': 'Classified technical breakdown of Call of Duty Black Ops Cold War mod management and engine hooks.',
    'entry_0007': 'Classified technical breakdown of Call of Duty Black Ops Cold War mod management and engine hooks.',
    'shame_for_the_leakers': 'Public statement on the unauthorized breach and leak of the BO2 Crossplay Relay code, exposing credit theft, alongside a deep technical breakdown of HMAC-SHA1/3DES-CBC packet translation, LUI checksum correction, and live memory usercmd patching.',
    'entry_0003': 'Public statement on the unauthorized breach and leak of the BO2 Crossplay Relay code, exposing credit theft, alongside a deep technical breakdown of HMAC-SHA1/3DES-CBC packet translation, LUI checksum correction, and live memory usercmd patching.'
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
    const templateHtml = fs.readFileSync(ROOT_INDEX_FILE, 'utf8');

    let generatedCount = 0;

    // 1. Generate individual article pages: /journal/<slug>/index.html and /journal/<slug>.html
    entries.forEach(entry => {
        const slug = getSlug(entry);
        const mdPath = path.join(MD_DIR, entry.file || `${slug}.md`);
        let articleHtml = '';
        const description = ENTRY_DESCRIPTIONS[slug] || ENTRY_DESCRIPTIONS[entry.id] || `${entry.title} - Technical research paper by Eduardo Gelain (SpetDev).`;

        if (fs.existsSync(mdPath)) {
            const mdContent = fs.readFileSync(mdPath, 'utf8');
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

        // 2. Meta description
        pageHtml = pageHtml.replace(
            /<meta\s+name="description"\s+content="[^"]*">/,
            `<meta name="description" content="${description.replace(/"/g, '&quot;')}">`
        );

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

        // 6. Schema.org JSON-LD for this specific article
        const jsonLd = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": entry.title,
            "description": description,
            "datePublished": entry.date,
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

        pageHtml = pageHtml.replace(
            /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
            `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>`
        );

        // 7. Replace <main id="main-content">...</main> with article content
        const articleMainHtml = `        <main id="main-content" class="pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto">
            <div class="mb-8 flex items-center justify-between text-xs">
                <a href="/" class="text-primary hover:underline font-mono">← Voltar ao Início (SpetDev)</a>
                <a href="/journal/" class="text-slate-400 hover:text-white font-mono">Todos os Artigos →</a>
            </div>
            <article class="p-6 sm:p-10 rounded-2xl bg-[#0a0f1d]/80 border border-white/[0.08] shadow-2xl backdrop-blur-md">
                <header class="mb-8 pb-6 border-b border-white/[0.08]">
                    <time class="text-xs font-mono text-slate-400 mb-2 block">${entry.date}</time>
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

        // If entry.id is distinct from slug, also generate alias
        if (entry.id && entry.id !== slug) {
            const aliasDir = path.join(JOURNAL_DIR, entry.id);
            if (!fs.existsSync(aliasDir)) {
                fs.mkdirSync(aliasDir, { recursive: true });
            }
            fs.writeFileSync(path.join(aliasDir, 'index.html'), pageHtml, 'utf8');
            fs.writeFileSync(path.join(JOURNAL_DIR, `${entry.id}.html`), pageHtml, 'utf8');
            console.log(`[SSG Journal] Generated alias: /journal/${entry.id}/index.html`);
        }

        generatedCount++;
        console.log(`[SSG Journal] Generated: /journal/${slug}/index.html`);
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
                <a href="/" class="text-xs text-primary hover:underline font-mono">← Voltar ao Início (SpetDev)</a>
            </div>
            <section class="p-6 sm:p-10 rounded-2xl bg-[#0a0f1d]/80 border border-white/[0.08] shadow-2xl backdrop-blur-md mb-8">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs font-bold mb-3">
                    <i class="fas fa-book-open text-[10px]"></i> Reverse Engineering & Game Dev Research
                </div>
                <h1 class="text-2xl sm:text-4xl font-bold text-white mb-4">Technical Journal & Research Papers</h1>
                <p class="text-slate-300 text-sm leading-relaxed max-w-2xl mb-8">
                    Documentação profunda de pesquisas em engenharia reversa, análise do motor de bytecode GSC de Call of Duty, bypasses de sandbox UWP/GDK e arquiteturas de backend serverless.
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
    console.log(`[SSG Journal] Successfully generated ${generatedCount} static pages!`);
}

build();
