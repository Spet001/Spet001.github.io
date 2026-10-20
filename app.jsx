
// --- THREE.JS VRAM & GPU MEMORY RECOVERY HELPER ---
const disposeHierarchy = (obj) => {
    if (!obj) return;
    obj.traverse((child) => {
        if (child.isMesh || child.isLine || child.isPoints) {
            if (child.geometry && typeof child.geometry.dispose === 'function') {
                child.geometry.dispose();
            }
            if (child.material) {
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                materials.forEach(mat => {
                    const textureProperties = [
                        'map', 'normalMap', 'roughnessMap', 'metalnessMap',
                        'alphaMap', 'aoMap', 'bumpMap', 'displacementMap',
                        'emissiveMap', 'envMap', 'lightMap', 'specularMap'
                    ];
                    textureProperties.forEach(prop => {
                        if (mat[prop] && typeof mat[prop].dispose === 'function') {
                            mat[prop].dispose();
                        }
                    });
                    if (typeof mat.dispose === 'function') {
                        mat.dispose();
                    }
                });
            }
        }
    });
};

// Portfolio Data & Internationalization for Eduardo Gelain (SpetDev)
const PORTFOLIO_DATA = {
    translations: {
        pt: {
            nav: {
                about: "Sobre",
                experience: "Experiência",
                projects: "Projetos",
                skills: "Habilidades",
                journal: "Journal",
                tools: "Tools",
                terminal: "Terminal",
                contact: "Contato",
                resume: "Currículo (CV)"
            },
            hero: {
                status: "Disponível para Projetos & Oportunidades",
                role: "Engenheiro de Software & Jogos · Sistemas & Segurança",
                desc: "Especializado em C++, C#, Python, Unity e Unreal Engine. Atuação focada em engenharia de software de alto desempenho, arquitetura de sistemas operacionais (Win32, UWP/GDK), interoperabilidade de baixo nível, automação e garantia de qualidade de software (QA).",
                ctaProjects: "Explorar Projetos",
                ctaContact: "Entrar em Contato",
                ctaCV: "Visualizar CV",
                hint: "Dica: use as setas (↑ ← ↓ →) para controlar o astronauta no espaço!",
                metrics: [
                    { value: "50+", label: "Bugs Críticos Identificados", sub: "Lançamento Comercial na Steam" },
                    { value: "15+", label: "Projetos & Ferramentas", sub: "Engenharia Reversa & Jogos" },
                    { value: "10k+", label: "Downloads de Mods & Ferramentas", sub: "NexusMods & GitLab" },
                    { value: "3+", label: "Anos de Experiência", sub: "C++, C#, Unity & Python" }
                ]
            },
            experience: {
                title: "Trajetória & Experiência",
                subtitle: "Clique em qualquer card para expandir detalhes sobre atribuições e tecnologias.",
                expandHint: "Clique para expandir",
                collapseHint: "Recolher",
                expandAll: "[+ Expandir Todos]",
                collapseAll: "[- Recolher Todos]"
            },
            projects: {
                title: "Projetos em Destaque",
                subtitle: "Trabalhos autorais em engenharia reversa, desenvolvimento de jogos e ferramentas de software.",
                searchPlaceholder: "Buscar por tecnologia, nome ou palavra-chave (ex: C++, Unity, GSC, Memory)...",
                categories: {
                    all: "Todos",
                    reverse: "Engenharia Reversa",
                    gamedev: "Game Dev",
                    tools: "Software & Ferramentas",
                    qa: "QA & Testes"
                },
                viewDetails: "Estudo de Caso",
                sourceCode: "Código Fonte",
                liveDemo: "Ver Projeto",
                noResults: "Nenhum projeto encontrado para o filtro selecionado."
            },
            skills: {
                title: "Stack & Competências Técnicas",
                subtitle: "Habilidades práticas aplicadas no desenvolvimento de softwares, engines e ferramentas.",
                systemsTitle: "Sistemas & Baixo Nível",
                reverseTitle: "Engenharia Reversa",
                gamedevTitle: "Desenvolvimento de Jogos",
                scriptingTitle: "Automação & Scripting",
                qaTitle: "Qualidade de Software & Ferramentas"
            },
            journal: {
                title: "Publicações Técnicas & Journal",
                subtitle: "Documentação de pesquisas em engenharia reversa, sandbox UWP e arquitetura de software.",
                readArticle: "Ler Artigo Completo",
                viewAll: "Acessar Todos os Artigos no Journal"
            },
            tools: {
                title: "Ferramentas & Utilitários Web",
                subtitle: "Utilitários desenvolvidos para engenharia reversa, análise de arquivos e modelagem procedural diretamente no navegador.",
                openTool: "Abrir Quick 3D Studio",
                desc: "Gerador procedural desenvolvido para transformar logos, insígnias e cartas colecionáveis (Yu-Gi-Oh!, Pokémon, Magic) em modelos 3D production-ready através de algoritmos determinísticos de contorno, triangulação e extrusão de malhas.",
                easyDecompTitle: "Spet's Easy Decompiler",
                easyDecompBadge: "Descompilador & Analisador Binário WASM",
                easyDecompDesc: "Workbench de engenharia reversa estática executado no navegador via WebAssembly e Web Workers isolados. Suporte a binários PE/ELF em arquiteturas x86, x64, ARM e MIPS, descompilação C-like dual (Rizin + Ghidra Sleigh) e recuperação de grafos de fluxo (CFG).",
                easyDecompOpen: "Abrir Easy Decompiler",
                universalFileTitle: "Spet's Universal Game File Opener",
                universalFileBadge: "Inspetor & Carvedor Universal de Games",
                universalFileDesc: "Inspetor e extrator de sistemas de arquivos virtuais de games no browser. Suporte a mais de 25 formatos de engines: Bethesda (BSA/BA2), Ubisoft (FORGE), Rockstar RAGE (.rpf), Minecraft (.jar), PlayStation (.pkg), CRIWARE (.awb/.usm), FromSoftware (.bnd/.dcx), Square Enix (.sdat/.pfs) e CoD FastFiles (.ff).",
                universalFileOpen: "Abrir File Opener"
            },
            terminal: {
                title: "Console Interativo (SpetTerm)",
                subtitle: "Digite 'help' para listar comandos disponíveis."
            },
            contact: {
                title: "Vamos Conversar?",
                subtitle: "Aberto para propostas de trabalho, parcerias em desenvolvimento de jogos ou consultoria técnica.",
                formTitle: "Envie uma Mensagem Direta",
                nameLabel: "Seu Nome",
                emailLabel: "Seu E-mail",
                subjectLabel: "Assunto",
                messageLabel: "Mensagem",
                sendBtn: "Enviar Mensagem",
                sending: "Enviando...",
                successMsg: "Mensagem enviada com sucesso! Retornarei em breve.",
                errorMsg: "Por favor preencha todos os campos corretamente.",
                copyEmail: "Copiar E-mail",
                copied: "E-mail copiado!",
                availability: "Disponível para trabalho Remoto e Híbrido"
            },
            footer: {
                hint: "P.S. Não há easter eggs aqui...",
                joke: "É Spet, Spet01 ou Spet001? O meu username depende puramente de quantos Spets já existiam naquela plataforma!",
                rights: "Eduardo Gelain · SpetDev. Todos os direitos reservados.",
                newsletter: {
                    title: "Newsletter do Journal Técnico",
                    desc: "Receba atualizações por e-mail sempre que uma nova análise de engenharia reversa, sandbox ou modding for publicada no Journal.",
                    placeholder: "seu.email@exemplo.com",
                    button: "Inscrever-se",
                    subscribing: "Inscrevendo...",
                    success: "Inscrição confirmada! Você receberá as próximas publicações do Journal.",
                    error: "Por favor, insira um e-mail válido.",
                    note: "Sem spam. Apenas artigos técnicos e novas pesquisas."
                }
            },
            easter: {
                title: "Easter Egg Vault",
                quake: "Jogar Quake 1 (NetQuake)",
                zombies: "COD Zombies Errius: Imitando a GSC Engine dentro de um HTML!",
                deliciaDoom: "DELICIA DOOM (Jailson Mendes Total Conversion)",
                music: "Tocador de OST",
                exit: "Sair do Jogo",
                openNew: "Abrir em nova aba"
            },
            resumeModal: {
                title: "Currículo Profissional",
                download: "Imprimir / Salvar PDF",
                close: "Fechar"
            },
            settings: {
                title: "Configurações",
                desc: "Preferências locais da interface salvas no navegador.",
                sectionGeneral: "Interface & Mascote",
                sectionVisual: "Aparência & Simulação",
                sectionAudio: "Áudio & Easter Eggs",
                companionBot: "Mascote Astro",
                companionBotDesc: "Assistente interativo e guia técnico no canto inferior",
                disableWelcome: "Desativar mensagem de boas-vindas",
                disableWelcomeDesc: "Oculta a saudação automática do Astro ao carregar o portfólio",
                musicPlayer: "Tocador de OST",
                musicPlayerDesc: "Stream de temas de batalha e menus (FF Battle & COD Menu) via Jukebox",
                musicAutoPlay: "Reprodução automática ao iniciar",
                musicAutoPlayDesc: "Inicia o tocador minimizado na barra inferior ao carregar o portfólio",
                defaultLang: "Idioma da interface",
                defaultLangDesc: "Define o idioma padrão do portfólio",
                theme: "Tema de fundo",
                themeDesc: "Simulação interativa do canvas",
                themeSpace: "Espaço",
                themeSpace2: "Espaço 2.0 (Beta)",
                themeSpaceSub: "Foguete & Astronauta",
                themeSpace2Sub: "Modelos 3D Interativos",
                themeSky: "Céu Terrestre",
                themeSkySub: "Caças & Paraquedista",
                themeSky2: "Céu Terrestre 2.0 (Beta)",
                themeSky2Sub: "Jatos 3D & Paraquedista",
                easterSign: "Placa secreta do Gant Bridge",
                easterSignDesc: "Exibe a placa clássica do GTA na barra de navegação superior",
                reset: "Restaurar padrões",
                savedLocally: "Salvo localmente",
                close: "Fechar"
            }
        },
        en: {
            nav: {
                about: "About",
                experience: "Experience",
                projects: "Projects",
                skills: "Tech Stack",
                journal: "Journal",
                tools: "Tools",
                terminal: "Terminal",
                contact: "Contact",
                resume: "Resume (CV)"
            },
            hero: {
                status: "Available for Roles & Projects",
                role: "Software & Game Engineer · Systems & Security",
                desc: "Specialized in C++, C#, Python, Unity, and Unreal Engine. Proven expertise in high-performance software engineering, low-level systems interoperability, operating system architecture (Win32, UWP/GDK), automation, and software quality assurance (QA).",
                ctaProjects: "Explore Projects",
                ctaContact: "Get in Touch",
                ctaCV: "View Resume",
                hint: "Tip: use arrow keys (↑ ← ↓ →) to navigate the astronaut in space!",
                metrics: [
                    { value: "50+", label: "Critical Bugs Identified", sub: "Commercial Steam Release" },
                    { value: "15+", label: "Projects & Toolkits", sub: "Reverse Engineering & Games" },
                    { value: "10k+", label: "Mod & Tool Downloads", sub: "NexusMods & GitLab" },
                    { value: "3+", label: "Years of Experience", sub: "C++, C#, Unity & Python" }
                ]
            },
            experience: {
                title: "Career & Experience",
                subtitle: "Click any card to expand full details on responsibilities and technologies used.",
                expandHint: "Click to expand",
                collapseHint: "Collapse",
                expandAll: "[+ Expand All]",
                collapseAll: "[- Collapse All]"
            },
            projects: {
                title: "Featured Engineering Projects",
                subtitle: "Original work spanning reverse engineering, game development, and custom software tooling.",
                searchPlaceholder: "Search by tech, keyword, or name (e.g. C++, Unity, GSC, Memory)...",
                categories: {
                    all: "All",
                    reverse: "Reverse Engineering",
                    gamedev: "Game Dev",
                    tools: "Software & Tools",
                    qa: "QA & Testing"
                },
                viewDetails: "Case Study",
                sourceCode: "Source Code",
                liveDemo: "Live Project",
                noResults: "No projects match the selected criteria."
            },
            skills: {
                title: "Tech Stack & Capabilities",
                subtitle: "Hands-on engineering skills applied across production games, tools, and technical research.",
                systemsTitle: "Systems & Low-Level",
                reverseTitle: "Reverse Engineering",
                gamedevTitle: "Game Development",
                scriptingTitle: "Automation & Scripting",
                qaTitle: "Software QA & Tooling"
            },
            journal: {
                title: "Technical Journal & Research",
                subtitle: "In-depth documentation covering reverse engineering, UWP sandbox bypasses, and game architecture.",
                readArticle: "Read Complete Entry",
                viewAll: "View All Journal Entries"
            },
            tools: {
                title: "Developer Tools & In-Browser Utilities",
                subtitle: "Interactive in-browser utilities for binary reverse engineering, game archive inspection, and procedural 3D modeling.",
                openTool: "Open Quick 3D Studio",
                desc: "Procedural engine built to convert logos, emblems, and collectible trading cards (Yu-Gi-Oh!, Pokémon, Magic) into production-ready 3D models using deterministic contour extraction, constrained triangulation, and geometric mesh extrusion.",
                easyDecompTitle: "Spet's Easy Decompiler",
                easyDecompBadge: "WASM Binary Analyzer & Decompiler",
                easyDecompDesc: "Static binary reverse engineering workbench executing in WebAssembly and isolated Web Workers. Disassembles and decompiles PE, ELF, and raw binaries (x86, x64, ARM, MIPS) with dual C-like engines (Rizin + Ghidra Sleigh) and control-flow graph (CFG) recovery.",
                easyDecompOpen: "Open Easy Decompiler",
                universalFileTitle: "Spet's Universal Game File Opener",
                universalFileBadge: "Universal Game Archive & Stream Carver",
                universalFileDesc: "In-browser virtual filesystem inspector and carver supporting 25+ PC and console game engines: Bethesda (BSA/BA2), Ubisoft (FORGE), Rockstar RAGE (.rpf), Minecraft mods (.jar), PlayStation (.pkg), CRIWARE (.awb/.usm), FromSoftware (.bnd/.dcx), Square Enix (.sdat/.pfs), Call of Duty FastFiles (.ff), and raw Zlib streams.",
                universalFileOpen: "Open Game File Opener"
            },
            terminal: {
                title: "Interactive Console (SpetTerm)",
                subtitle: "Type 'help' to see all available commands."
            },
            contact: {
                title: "Let's Connect",
                subtitle: "Open to employment opportunities, game development collaborations, or technical consulting.",
                formTitle: "Send a Direct Message",
                nameLabel: "Your Name",
                emailLabel: "Your Email",
                subjectLabel: "Subject",
                messageLabel: "Message",
                sendBtn: "Send Message",
                sending: "Sending...",
                successMsg: "Message sent successfully! I'll reply promptly.",
                errorMsg: "Please fill out all required fields correctly.",
                copyEmail: "Copy Email",
                copied: "Email copied to clipboard!",
                availability: "Available for Remote & Hybrid Roles"
            },
            footer: {
                hint: "P.S. There are no easter eggs here...",
                joke: "Is it Spet, Spet01, or Spet001? My username purely depends on how many Spets were already taken on that platform!",
                rights: "Eduardo Gelain · SpetDev. All rights reserved.",
                newsletter: {
                    title: "Technical Journal Newsletter",
                    desc: "Receive email updates whenever a new reverse engineering breakdown, sandbox bypass, or game tooling post is published.",
                    placeholder: "your.email@example.com",
                    button: "Subscribe",
                    subscribing: "Subscribing...",
                    success: "Subscription confirmed! You'll receive updates on upcoming Journal releases.",
                    error: "Please enter a valid email address.",
                    note: "No spam. Purely deep-dive technical research and engineering posts."
                }
            },
            easter: {
                title: "Easter Egg Vault",
                quake: "Play Quake 1 (NetQuake)",
                zombies: "COD Zombies Errius: Emulating the GSC Engine inside HTML!",
                deliciaDoom: "DELICIA DOOM (Jailson Mendes Total Conversion)",
                music: "OST Player",
                exit: "Exit Game",
                openNew: "Open in new tab"
            },
            resumeModal: {
                title: "Curriculum Vitae",
                download: "Print / Save PDF",
                close: "Close"
            },
            settings: {
                title: "Settings",
                desc: "Local client preferences stored in browser storage.",
                sectionGeneral: "Interface & Mascot",
                sectionVisual: "Appearance & Simulation",
                sectionAudio: "Audio & Easter Eggs",
                companionBot: "Astro Companion Bot",
                companionBotDesc: "Interactive technical assistant and guide in bottom corner",
                disableWelcome: "Disable Welcome Message",
                disableWelcomeDesc: "Suppresses Astro's automatic greeting teaser on page load",
                musicPlayer: "OST Player",
                musicPlayerDesc: "Stream battle and menu themes (FF Battle & COD Menu) via background Jukebox",
                musicAutoPlay: "Toggle Auto-Play",
                musicAutoPlayDesc: "Begin playback in minimized dock player upon page load",
                defaultLang: "Interface Language",
                defaultLangDesc: "Sets the initial language of the portfolio",
                theme: "Canvas Theme",
                themeDesc: "Interactive background simulation",
                themeSpace: "Cosmic Space",
                themeSpace2: "Space 2.0 (Beta)",
                themeSpaceSub: "Rocket & Astronaut",
                themeSpace2Sub: "Interactive 3D Models",
                themeSky: "Earth Sky",
                themeSkySub: "Fighter Jets & Parachuter",
                themeSky2: "Earth Sky 2.0 (Beta)",
                themeSky2Sub: "3D Jets & Parachuter",
                easterSign: "Gant Bridge Secret Sign",
                easterSignDesc: "Display legacy Easter Egg sign in the top navigation bar",
                reset: "Reset to defaults",
                savedLocally: "Saved locally",
                close: "Close"
            }
        }
    },

    // CAREER & EXPERIENCE DATA - Fully localized dates and company descriptors
    experienceData: [
        {
            id: "exp_qa_sparky",
            role: { pt: "Analista de Testes Manuais QA", en: "Manual QA Analyst" },
            company: { pt: "Converting Minds (Sparky Rush: Purrils in Pawsville - Steam)", en: "Converting Minds (Sparky Rush: Purrils in Pawsville - Steam)" },
            period: { pt: "2025 - Presente", en: "2025 - Present" },
            type: { pt: "Lançamento Comercial na Steam", en: "Commercial Game Release" },
            bullets: {
                pt: [
                    "Atuação técnica como QA Tester no jogo de plataforma 3D 'Sparky Rush', lançado comercialmente na Steam pela Converting Minds.",
                    "Identificação, reprodução rigorosa e documentação de mais de 50 bugs críticos de física, renderização e lógica de gameplay.",
                    "Análise dedutiva de código em Unity (C#) para auxiliar a equipe de desenvolvimento a diagnosticar causas raiz com agilidade.",
                    "Testes de regressão e validação contínua de builds pré-lançamento para assegurar estabilidade."
                ],
                en: [
                    "Technical QA Tester on the 3D platformer 'Sparky Rush', published commercially on Steam by Converting Minds.",
                    "Identified, reliably reproduced, and documented 50+ critical bugs across physics, rendering, and gameplay logic.",
                    "Deductive code analysis in Unity (C#) helping the dev team rapidly diagnose root causes.",
                    "Performed regression testing and build certification to ensure launch stability."
                ]
            },
            skills: ["Unity", "C#", "QA Testing", "Bug Reporting", "Steamworks", "Regression Testing"]
        },
        {
            id: "exp_gamedev_generic",
            role: { pt: "Programador de Jogos & Sistemas", en: "Gameplay & Systems Programmer" },
            company: { pt: "Projetos Comerciais & Independent R&D", en: "Commercial Game Projects & Independent R&D" },
            period: { pt: "2025 - Presente", en: "2025 - Present" },
            type: { pt: "Engenharia de Jogos", en: "Game Engineering" },
            bullets: {
                pt: [
                    "Desenvolvimento de mecânicas de gameplay, física e sistemas interativos utilizando Unity (C#) e Unreal Engine (C++).",
                    "Programação de máquinas de estado para IA de inimigos, locomoção fluida de personagens (FSM) e sistemas dinâmicos de armas.",
                    "Otimização de rotinas de renderização e profiling de performance para garantia de altas taxas de quadros.",
                    "Criação de templates modulares para a comunidade de desenvolvedores independentes."
                ],
                en: [
                    "Engineered core gameplay mechanics, physics, and interactive systems using Unity (C#) and Unreal Engine (C++).",
                    "Programmed state machines for enemy AI, fluid character locomotion (FSM), and dynamic weapon management systems.",
                    "Profiled and optimized rendering pipelines to sustain high framerates.",
                    "Built modular game templates for the independent game development community."
                ]
            },
            skills: ["Unity", "Unreal Engine", "C#", "C++", "Game Systems", "Physics", "AI FSM"]
        },
        {
            id: "exp_reverse_modding",
            role: { pt: "Engenheiro de Sistemas & Pesquisa de Segurança", en: "Systems & Security Research Engineer" },
            company: { pt: "Independent R&D / Open Source Security Research", en: "Independent R&D / Open Source Security Research" },
            period: { pt: "2024 - Presente", en: "2024 - Present" },
            type: { pt: "Sistemas & Baixo Nível", en: "Systems & Low-Level" },
            bullets: {
                pt: [
                    "Pesquisa avançada em segurança de runtimes, arquitetura de entitlements e isolamento de processos no ecossistema UWP/GDK.",
                    "Criação de injetores GSC e clientes customizados em C/C++ para instrumentação de bytecode e interoperabilidade de assets legados.",
                    "Desenvolvimento de rotinas de injeção de DLLs nativas, pattern scanning em memória dinâmica e hookings de dispatchers de VM.",
                    "Desenvolvimento de launchers em Electron e ferramentas com foco em estabilidade e segurança."
                ],
                en: [
                    "Advanced runtime security research, entitlement architecture analysis, and process sandboxing inside UWP and Microsoft GDK.",
                    "Engineered C/C++ custom runtimes and bytecode injectors enabling dynamic instrumentation and legacy asset preservation.",
                    "Developed native DLL injection routines, dynamic memory signature pattern scanners, and VM bytecode hooks.",
                    "Engineered Electron launchers and modding toolkits delivering stable and crash-free execution."
                ]
            },
            skills: ["C/C++", "Win32 API", "Reverse Engineering", "DLL Injection", "Memory Scanning", "GSC VM"]
        },
        {
            id: "exp_ti_support",
            role: { pt: "Especialista em Suporte de TI & Automação", en: "IT Support & Automation Specialist" },
            company: { pt: "Public Sector IT Infrastructure (Infraestrutura Governamental)", en: "Public Sector IT Infrastructure" },
            period: { pt: "2026 - Presente", en: "2026 - Present" },
            type: { pt: "Infraestrutura de TI", en: "IT Infrastructure" },
            bullets: {
                pt: [
                    "Apoio técnico operacional de infraestrutura de TI no setor público, gerenciamento de redes locais e estações de trabalho.",
                    "Desenvolvimento de scripts de automação em Python e PowerShell (.ps1) para manutenção preventiva e resolução ágil de incidentes.",
                    "Diagnóstico de hardware/software, implantação de sistemas operacionais e suporte direto a usuários."
                ],
                en: [
                    "Technical IT infrastructure support in the public sector, local networking management, and workstation maintenance.",
                    "Developed automation scripts in Python and PowerShell (.ps1) for preventative maintenance and rapid incident resolution.",
                    "Hardware/software diagnostics, OS deployments, and direct end-user tech support."
                ]
            },
            skills: ["Python", "PowerShell", "Windows Server", "Hardware Troubleshooting", "Automation"]
        }
    ],

    // PROJECTS DATA - Uses ONLY authentic local images from assets/
    projectsData: [
        {
            id: "outcaster_fps",
            category: "gamedev",
            categoryLabel: { pt: "Desenvolvimento de Jogos", en: "Game Development" },
            image: "/assets/outcastertxt.jpg",
            caseStudyImages: [
                "/assets/outcaster img2.png"
            ],
            title: "Outcaster - Retro FPS Templates",
            featured: true,
            live: "https://spet01.itch.io/",
            tags: ["Unity", "C#", "Game Design", "AI Navigation", "Physics"],
            description: {
                pt: "Templates completos de FPS retrô (boomer shooter) criados em Unity e C#. Sistemas de movimentação, gerenciamento de armas, projéteis balísticos e IA inimiga por estados.",
                en: "Complete retro FPS templates (boomer shooter style) developed in Unity and C#. Features locomotion physics , weapon management, ballistic projectiles, and state-machine enemy AI."
            },
            caseStudy: {
                challenge: {
                    pt: "Criar uma arquitetura de código extensível e performática para desenvolvedores independentes que desejam criar shooters rápidos sem recriar física do zero.",
                    en: "Design an extensible, clean codebase for indie creators needing high-velocity shooter mechanics without building physics pipelines from scratch."
                },
                solution: {
                    pt: "Criação de scripts simples e reutilizáveis em qualquer FPS 2.5d.",
                    en: "Creation of simple, reusable scripts for 2.5D FPS game mechanics."
                },
                impact: {
                      pt: "Disponibilizado na Itch.io para ser utilizado por desenvolvedores de jogos independentes.",
                      en: "Available on Itch.io to be used by indie game developers."
                  }
            }
        },
        {
            id: "sparky_rush_qa",
            category: "qa",
            categoryLabel: { pt: "QA & Controle de Qualidade", en: "QA & Testing" },
            image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/257185670/d0cf56f005af6f109edd9ee603dc2da75fa0aaf1/movie_232x130.jpg?t=1756993430",
            caseStudyImages: [
                "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3592020/64b400a9793301cc6e9b8e99ea671c0fc4dc6da1/ss_64b400a9793301cc6e9b8e99ea671c0fc4dc6da1.1920x1080.jpg?t=1790620839",
                "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3592020/fcc031696d53baef2817eef8e9bd84fec9541b31/ss_fcc031696d53baef2817eef8e9bd84fec9541b31.1920x1080.jpg?t=1790620839",
                "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3592020/d41454008b3fc2ad5d2e700f60ad0e52f1f32893/ss_d41454008b3fc2ad5d2e700f60ad0e52f1f32893.1920x1080.jpg?t=1790620839"
            ],
            title: "Sparky Rush: Purrils in Pawsville (Steam QA)",
            featured: true,
            live: "https://store.steampowered.com/app/3592020/Sparky_Rush_Purrils_in_Pawsville/",
            tags: ["QA Testing", "Unity", "C#", "Steam", "Bug Analysis"],
            description: {
                pt: "Atuação profissional em Quality Assurance no jogo de plataforma 3D Sparky Rush. Mapeamento, reprodução e relatórios de mais de 50 bugs críticos com análise da lógica em C#.",
                en: "Professional Quality Assurance role on commercial 3D platformer Sparky Rush. Discovered, documented, and helped resolve 50+ critical bugs via code-level deductions in Unity/C#."
            },
            caseStudy: {
                challenge: {
                    pt: "Garantir a integridade dos sistemas do jogo, permitindo que o jogador tenha uma gameplay sem problemas.",
                    en: "Verify physics robustness during steep angular character collisions and prevent race-condition save game corruption, also verify game-breaking bugs."
                },
                solution: {
                    pt: "Criação de matrizes sistemáticas de teste com casos de borda e stress-testing reproduzindo condições de hardware de baixa performance, além de identificação de softlocks.",
                    en: "Designed comprehensive test matrices covering edge-case inputs, physics desync, and low-spec hardware regression."
                },
                impact: {
                      pt: "Jogo (demo) lançado na Steam com alta estabilidade e sem travamentos/bugs bloqueantes reportados.",
                      en: "Demo released on Steam with high stability and no game-breaking bugs reported."
                  }
            }
        },
        {
            id: "portfolio_web",
            title: "Portfólio Web (SpetDev)",
            category: "tools",
            categoryLabel: { pt: "Web & Ferramentas", en: "Web & Tools" },
            image: "/assets/spet01.dev.mp4",
            caseStudyImages: [
                "/assets/spet01.dev.mp4"
            ],
            repo: "https://github.com/Spet001/Spet001.github.io",
            live: "#top",
            journalId: "Cloudflare-Workers-Backend",
            featured: true,
            tags: ["React", "Three.js / WebGL", "Cloudflare Workers", "WebAssembly", "TailwindCSS", "Technical Journal"],
            description: {
                pt: "O próprio site em que você está navegando: uma SPA interativa construída em React, Three.js (WebGL) e TailwindCSS. Conta com simulação espacial 3D (Tema Espaço 2.0), back-end serverless em Cloudflare Workers + KV, Journal técnico com SSG e tradução on-demand, emulação WebAssembly (DOOM / GSC VM), terminal CLI (Ctrl+K) e easter eggs.",
                en: "The very website you are exploring: an interactive SPA built with React, Three.js (WebGL), and TailwindCSS. Features a full 3D space simulation (Space 2.0 theme), serverless Cloudflare Workers + KV backend, SSG Technical Journal with on-demand translation, WebAssembly emulation (DOOM / GSC VM), interactive CLI terminal (Ctrl+K), and easter eggs."
            },
            caseStudy: {
                challenge: {
                    pt: "Construir uma plataforma autoral de engenharia e gamedev que una simulação 3D fluida no navegador, artigos técnicos indexáveis pelo Google (SEO estático), métricas reais e autenticação OAuth sem custos de servidor dedicado.",
                    en: "Build an authentic engineering and gamedev platform combining smooth in-browser 3D simulation, Google-indexable technical articles (static SEO), real-time telemetry, and OAuth authentication with zero dedicated server costs."
                },
                solution: {
                    pt: "Arquitetura híbrida em React + Three.js com pipeline SSG (Static Site Generation) para o Technical Journal, API serverless em Cloudflare Workers + KV para telemetria de views, autenticação Patreon OAuth2 e chatbot IA, além de port WebAssembly do UZDoom e interpretador GSC VM.",
                    en: "Engineered a hybrid React + Three.js architecture with a custom SSG pipeline for the Technical Journal, a serverless Cloudflare Workers + KV API for view telemetry, Patreon OAuth2, and AI assistant, plus in-browser WebAssembly UZDoom and GSC VM execution."
                },
                impact: {
                    pt: "Aplicação de altíssima performance hospedada gratuitamente no GitHub Pages + Cloudflare Workers, consolidando o portfólio e o Technical Journal com mais de 1.200 acessos.",
                    en: "High-performance application hosted at zero cost on GitHub Pages + Cloudflare Workers, consolidating the portfolio and Technical Journal with over 1,200 real-time visits."
                }
            }
        },
        {
            id: "technical_journal",
            title: { pt: "Technical Journal (Artigos & Engenharia Reversa)", en: "Technical Journal (Research & Reverse Engineering)" },
            category: "reverse",
            categoryLabel: { pt: "Pesquisa & Engenharia Reversa", en: "Research & Reverse Engineering" },
            image: "/assets/journal thumb.jpg",
            caseStudyImages: [
                "/assets/journal demo.jpg"
            ],
            live: "/journal/",
            featured: true,
            tags: ["Reverse Engineering", "Low-Level C++", "GSC VM", "GDK / UWP", "Architecture", "Technical Writing"],
            description: {
                pt: "Publicação técnica autoral documentando pesquisas de baixo nível, engenharia reversa de motores de jogos clássicos e modernos (id Tech, Treyarch GSC VM), bypass de sandboxes UWP/GDK, injeção de bytecode GSC e arquitetura serverless. Inclui sistema de busca por tags, ordenação por popularidade e tradução automática on-demand.",
                en: "Original technical publication documenting low-level systems research, game engine reverse engineering (id Tech, Treyarch GSC VM), UWP/GDK sandbox bypassing, GSC bytecode injection, and serverless architecture. Features tag filtering, popularity sorting, and on-demand translation."
            },
            caseStudy: {
                challenge: {
                    pt: "Compartilhar pesquisas densas de engenharia reversa, dumps de memória e análises de assembly/C++ em um formato acessível, indexável por mecanismos de busca (SEO estático) e com proteção de acesso para artigos confidenciais.",
                    en: "Publish deep reverse engineering research, memory dumps, and assembly/C++ breakdowns in an accessible, search-engine-indexable format (static SEO) while gating confidential write-ups."
                },
                solution: {
                    pt: "Desenvolvimento de um motor de blog técnico integrado ao portfólio com geração estática (SSG) para metadados OpenGraph/SEO, contador de visualizações em tempo real via Cloudflare Workers + KV, integração OAuth2 com Patreon para artigos exclusivos e tradução client-side preservando blocos de código e jargões técnicos.",
                    en: "Engineered a custom technical blog engine with Static Site Generation (SSG) for OpenGraph/SEO metadata, real-time view telemetry via Cloudflare Workers + KV, Patreon OAuth2 gating for confidential research, and client-side translation preserving code blocks and technical terminology."
                },
                impact: {
                    pt: "Mais de 12 artigos técnicos detalhados cobrindo desde injeção em VMs proprietárias até otimização de jogos clássicos (DXVK/LAA), somando centenas de leituras orgânicas da comunidade de modding e engenharia.",
                    en: "Over 12 in-depth technical articles covering proprietary VM injection to classic game optimization (DXVK/LAA), gathering hundreds of organic reads from the modding and systems engineering community."
                }
            }
        },
        {
            id: "resurge_client",
            category: "reverse",
            categoryLabel: { pt: "Engenharia Reversa & Sistemas", en: "Reverse Engineering & Systems" },
            image: "/assets/resurge_thumb.mp4",
            caseStudyImages: [
                "/assets/resurge.png"
            ],
            title: "Resurge Client (BO3 Multi-Platform)",
            featured: true,
            live: "https://resurge.gamer.gd/",
            repo: "https://gitlab.com/Spet001/resurgegdkbackup",
            tags: ["C/C++", "Electron", "DLL Injection", "Networking", "Crossplay POC"],
            description: {
                pt: "Cliente modificado de alto desempenho para Black Ops 3 com suporte a UWP e Steam. Inclui DLL nativa de injeção, integração de rede para crossplay e launcher em Electron para patches de segurança.",
                en: "High-performance custom client for Black Ops 3 supporting both UWP and Steam. Features native C++ injection DLL, network relay proof-of-concept for crossplay, and Electron desktop launcher."
            },
            caseStudy: {
                challenge: {
                    pt: "Jogadores de PC na Windows Store e Steam estavam isolados em ecossistemas incompatíveis com vulnerabilidades de segurança não corrigidas pela publicadora.",
                    en: "PC players across Windows Store and Steam were segregated with incompatible network protocols and unpatched security vulnerabilities."
                },
                solution: {
                    pt: "Injeção de DLL no Xgameruntime com correção de exploits (T7 Patch integration) e emulação de pacotes de matchmaking entre plataformas.",
                    en: "Engineered DLL injection targeting Xgameruntime with built-in security exploit mitigation and matchmaking packet translation."
                },
                impact: {
                      pt: "2k+ jogadores com acesso a mods na versão da MS Store de Black Ops 3.",
                      en: "2k+ players with access to mods on the MS Store version of Black Ops 3."
                  }
            }
        },
        {
            id: "free_3d_assets",
            category: "gamedev",
            categoryLabel: { pt: "Recursos 3D & Arte", en: "3D Assets & Art" },
            image: "/assets/free_3d_assets_thumbnail.jpg",
            caseStudyModel: "/3d/rocket.glb",
            journalId: "Open-Source-3D-Assets",
            title: "Free to Use 3D Assets (Low Poly)",
            featured: true,
            github: "#", 
            live: "#",
            tags: ["Game Assets", "Low Poly", "WebGL"],
                        description: {
                pt: "Coleção completa de modelos e assets 3D autorais e otimizados (Jato, Foguete, Astronauta, Policial GameJam+, Galinha Espacial, Pistola Outcaster, Juggernog, Nuke T6, Pente de RAM, Logo BO3, Selo Guild Seal, Cartas YGO 3D Ryzeal e Tearlaments, Logos 3D SpetDev e Sparky Rush) modelados e convertidos para este portfólio e jogos WebGL. Disponíveis gratuitamente para a comunidade de desenvolvedores independentes.",
                en: "Comprehensive collection of original and optimized 3D assets (Jet, Rocket, Astronaut, GameJam+ Cop, Space Chicken, Outcaster Pistol, Juggernog, T6 Nuke, RAM Stick, BO3 Logo, Guild Seal, 3D YGO Cards Ryzeal & Tearlaments, 3D Logos) crafted for this portfolio and WebGL games. Free for indie developers."
            },
            caseStudy: {
                challenge: {
                    pt: "Criar modelos otimizados para WebGL com baixo custo de processamento, garantindo que rodem bem diretamente no navegador (Three.js).",
                    en: "Create highly optimized WebGL models with low poly counts to ensure 60fps rendering in browser-based engines (Three.js)."
                },
                solution: {
                    pt: "Aplicação de texturas flat e materiais unlit/simples (como metalness zero) para reduzir draw calls e o uso de VRAM.",
                    en: "Applied flat textures and simple unlit materials (zero metalness) to reduce draw calls and VRAM footprint."
                },
                impact: {
                    pt: "Os modelos agora fazem parte da simulação principal e estão abertos para a comunidade.",
                    en: "The models are now featured in the main portfolio simulation and open-sourced for the community."
                }
            }
        },
        {
            id: "spet_web_tools_suite",
            category: "tools",
            categoryLabel: { pt: "Ferramentas & Utilitários Web", en: "Web Tooling & Reverse Engineering" },
            image: "/assets/tool_easy_decompiler.png",
            caseStudyImages: [
                "/assets/tool_easy_decompiler.png",
                "/assets/tool_universal_file.png"
            ],
            title: { pt: "Suíte de Ferramentas Web & Engenharia Reversa", en: "Web Tools & Reverse Engineering Suite" },
            featured: true,
            live: "/tools/",
            liveLabel: { pt: "Explorar Ferramentas", en: "Open Tools Suite" },
            tags: ["WebAssembly", "Rizin Core", "Ghidra Sleigh", "Game Archives", "Three.js", "AST Decompilation", "25+ Formats"],
            description: {
                pt: "Suíte completa de utilitários e analisadores de engenharia reversa executados no browser: Easy Decompiler (Rizin + Ghidra Sleigh WASM), Universal Game File Opener (25+ engines: Bethesda, id Tech, Ubisoft, Rockstar, PlayStation) e Quick 3D Studio.",
                en: "Comprehensive reverse engineering and archive extraction suite running client-side: Easy Decompiler (Rizin + Ghidra Sleigh WASM), Universal Game File Opener (25+ game engines), and Quick 3D Studio."
            },
            caseStudy: {
                challenge: {
                    pt: "Engenharia reversa estática e dissecação de arquivos proprietários de jogos tradicionalmente exigem a instalação de softwares pesados de desktop (IDA Pro, Ghidra, QuickBMS) e dependências de ambiente nativo.",
                    en: "Static binary reverse engineering and proprietary game archive parsing traditionally require heavy desktop toolchains (IDA Pro, Ghidra, QuickBMS) and native OS dependencies."
                },
                solution: {
                    pt: "Compilação de runtimes e parsers de baixo nível (Rizin, jsdec, Ghidra Sleigh, zlib) para WebAssembly em Web Workers isolados, combinados com uma interface de alta densidade inspirada em Binary Ninja e SLADE3.",
                    en: "Ported low-level reverse engineering runtimes (Rizin, jsdec, Ghidra Sleigh, zlib) to WebAssembly in isolated Web Workers, wrapped in an ultra-dense workstation UI inspired by Binary Ninja and SLADE3."
                },
                impact: {
                    pt: "Disponibilização instantânea de ferramentas de pesquisa e engenharia reversa diretamente no navegador sem necessidade de uploads externos.",
                    en: "Delivered instant in-browser reverse engineering and game asset inspection without external server reliance."
                }
            }
        },
        {
            id: "cw_gsc_injector",
            category: "reverse",
            categoryLabel: { pt: "Engenharia Reversa", en: "Reverse Engineering" },
            image: "/assets/cold war gsc.jpg",
            caseStudyImages: [
                "/assets/cwgsc.png"
            ],
            title: "CW GSC Injector (MS Store / Xbox PC)",
            featured: true,
            repo: "https://gitlab.com/Spet001/CW-UWP-GSC-Injector",
            journalId: "CW-GSC-Injection-MS-Store",
            tags: ["C++", "Win32 API", "Memory Scanning", "Reverse Engineering", "BOCW"],
            description: {
                pt: "Utilitário de alto desempenho em C++ que realiza injeção de scripts GSC na versão Microsoft Store/Xbox PC do Call of Duty: BOCW, contornando o sandboxing UWP e offsets estáticos através de varredura dinâmica de memória.",
                en: "High-performance C++ utility injecting custom GSC bytecode into the MS Store/Xbox PC build of Call of Duty: BOCW, bypassing UWP sandboxing and ASLR offsets through dynamic memory signature scanning."
            },
            caseStudy: {
                challenge: {
                    pt: "A versão da Windows Store (UWP/GDK) utiliza sandbox rígido com permissões isoladas de processo e offsets de memória dinâmicos que invalidavam os métodos tradicionais de hooking.",
                    en: "The Windows Store (UWP/GDK) build enforces strict process sandboxing and dynamic ASLR memory layouts, causing standard injection hooks to fail."
                },
                solution: {
                    pt: "Implementação de um scanner de assinaturas em tempo real (Pattern Scanning) em C++ nativo para localizar os Asset Pools do jogo e realizar hooking direto do interpretador de scripts sem disparar crash.",
                    en: "Developed an in-memory pattern signature scanner in native C++ to locate script asset pools and safely patch bytecode pointers without destabilizing the engine."
                },
                impact: {
                      pt: "Jogadores puderam desfrutar de mods GSC nesta versão do jogo.",
                      en: "Players were able to enjoy GSC mods in this version of the game."
                  }
            }
        },
        {
            id: "bo2_bo1_msclients",
            category: "reverse",
            categoryLabel: { pt: "Engenharia Reversa & GSC Modding", en: "Reverse Engineering & GSC Modding" },
            image: "/assets/zpgdk thumb.jpg",
            caseStudyImages: [
                "https://gitlab.com/Spet001/msclients/-/raw/master/assets/s1s.png",
                "https://gitlab.com/Spet001/msclients/-/raw/master/assets/bo1gsc.png",
                "https://gitlab.com/Spet001/msclients/-/raw/master/assets/bo2.png"
            ],
            title: "UWP/GDK Sandbox & Entitlement Architecture Analysis (Legacy Preservation)",
            featured: true,
            repo: "https://gitlab.com/Spet001/msclients",
            journalId: "T6-GSC-Injector-MS-Store",
            tags: ["C++", "Security Research", "Reverse Engineering", "UWP/GDK", "Entitlement Architecture", "VM Hooking"],
            description: {
                pt: "Suíte de pesquisa em C++ com cliente modificado, instrumentação de bytecode em tempo real e análise da arquitetura de entitlements no ecossistema UWP/GDK. Permite a execução controlada de rotinas customizadas de scripting e interoperabilidade de assets legados.",
                en: "C++ systems security research suite featuring custom client modification, real-time bytecode instrumentation, and UWP/GDK entitlement architecture analysis. Enables controlled custom scripting and legacy asset preservation."
            },
            caseStudy: {
                challenge: {
                    pt: "O runtime de jogos na Windows Store impõe proteção de integridade na memória, isolamento rigoroso de processos GDK e uma VM de bytecode que restringe scripts não assinados, além de descontinuar verificação de entitlements em plataformas legadas.",
                    en: "Windows Store game runtimes enforce memory integrity protections, strict GDK process sandboxing, and a bytecode VM restricting unsigned scripts, alongside deprecation of legacy entitlement verification."
                },
                solution: {
                    pt: "Desenvolvimento de pattern scanning dinâmico para mapear Asset Pools e despachantes de execução da VM. Injeção de módulo nativo em C++ redirecionando ponteiros de despacho e analisando interfaces XStore/XPackage para emulação de validações locais.",
                    en: "Developed dynamic memory pattern scanning to map Asset Pools and VM bytecode dispatchers. Injected a native C++ research module redirecting dispatch pointers and analyzing XStore/XPackage interfaces for localized validation emulation."
                },
                impact: {
                      pt: "Preservação da compatibilidade de assets legados e documentação técnica da arquitetura UWP/GDK para a comunidade de pesquisa.",
                      en: "Preserved legacy asset interoperability and documented UWP/GDK runtime architecture for software research."
                  }
            }
        },
        {
            id: "gsc_dumps_and_sources",
            category: "reverse",
            categoryLabel: { pt: "Engenharia Reversa & GSC Dumps", en: "Reverse Engineering & GSC Dumps" },
            image: "/assets/gsc dumps thumb.jpg",
            caseStudyImages: [
                "/assets/gscmodinaction.png"
            ],
            title: "GSC Dumps and Pre-Compiled/Uncompiled Sources",
            featured: true,
            repo: "https://gitlab.com/Spet001/t5-gdk-gsc-dumps",
            repoLabel: { pt: "GitLab: t5-gdk-gsc-dumps", en: "GitLab: t5-gdk-gsc-dumps" },
            secondaryRepo: "https://gitlab.com/Spet001/msclients/-/tree/master/gsc?ref_type=heads",
            secondaryRepoLabel: { pt: "GitLab: Fontes GSC (msclients)", en: "GitLab: GSC Sources (msclients)" },
            tags: ["GSC Modding", "Reverse Engineering", "Call of Duty", "Bytecode Dumps", "T5 / BO1", "T6 / BO2", "IW5 / MW3", "GDK / UWP", "Jiggy Menu"],
            description: {
                pt: "Repositório completo de dumps de scripts GSC para versões GDK/Microsoft Store (T5, IW5 e futuros títulos) aliado a fontes pré-compiladas e descompiladas do msclients: menu base T5 GDK, menu Jiggy v4.3 pré-compilado para T6, fonte de menu base T6 GDK e um compilador GSC simplificado para T6.",
                en: "Comprehensive repository of GSC bytecode dumps for GDK/Microsoft Store releases (T5, IW5, and future games) paired with pre-compiled and uncompiled sources from msclients: T5 GDK base menu source, pre-compiled T6 Jiggy Menu v4.3, T6 GDK base menu source, and a simple T6 GSC compiler."
            },
            caseStudy: {
                challenge: {
                    pt: "A ausência de documentação e extração de scripts GSC nativos nas versões GDK/UWP de Call of Duty tornava complexo o desenvolvimento de mods e menus, exigindo descarregamento manual de dumps de bytecode da memória e criação de estruturas de menus compatíveis com a VM das edições da Windows Store.",
                    en: "The lack of official documentation and extracted native GSC assets on GDK/UWP Call of Duty releases made custom mod and menu development tedious, demanding raw memory bytecode dumping and tailor-made menu skeletons adapted to the Windows Store VM."
                },
                solution: {
                    pt: "Mapeamento e dump sistemático de assets GSC dos executáveis protegidos do T5 e IW5 (com expansão contínua para mais jogos), fornecendo código-fonte limpo, menu base funcional para T5 GDK, o lendário Jiggy Menu v4.3 pré-compilado pronto para injeção no T6, templates base limpos para criação de novos menus e um compilador de GSC dedicado para T6.",
                    en: "Systematically mapped and dumped GSC script trees from protected T5 and IW5 executables, providing clean reference dumps, a working T5 GDK base menu, pre-compiled Jiggy Menu v4.3 ready for injection in T6, clean starter template sources, and a standalone T6 GSC compiler."
                },
                impact: {
                      pt: "Deu acesso a source codes e mods pré compilados a vários jogadores/devs.",
                      en: "Provided access to source codes and pre-compiled mods to various players and devs."
                  }
            }
        },
        {
            id: "pau_no_gato_game",
            category: "gamedev",
            categoryLabel: { pt: "Desenvolvimento de Jogos", en: "Game Development" },
            image: "https://img.itch.zone/aW1nLzIzNjkzMTg4LnBuZw==/315x250%23c/eUMvyr.png",
            caseStudyImages: [
                "https://img.itch.zone/aW1hZ2UvMzk3MzA0MS8yNDk5MTc2OC5wbmc=/347x500/1M485B.png",
                "https://img.itch.zone/aW1hZ2UvMzk3MzA0MS8yNDk5MTc4MS5wbmc=/347x500/qmwFiC.png",
                "https://img.itch.zone/aW1hZ2UvMzk3MzA0MS8yNDk5MjExMC5qcGc=/347x500/ckW8Nw.jpg"
            ],
            title: "Atirei o Pau no Gato",
            featured: false,
            live: "https://zodiacogames.itch.io/atirei-o-pau-no-gato-mas-o-gato-no-morreu-e-agora-ele-vai-se-vingar",
            tags: ["Unreal Engine 5", "C++", "FPS", "Game Design", "Physics"],
            description: {
                pt: "Jogo FPS de tiro e física cômica desenvolvido em Unreal Engine 5 com C++ nativo para a GameJam+ 25/26. Inclui mecânicas dinâmicas de gunplay, IA de oponentes e feedback tátil de impacto.",
                en: "Fast-paced comedic FPS game developed in Unreal Engine 5 with native C++ for GameJam+ 25/26. Features dynamic gunplay, opponent AI, and responsive tactile combat feedback."
            },
            caseStudy: {
                challenge: {
                    pt: "Construir uma experiência jogável fluida com mecânicas de física cômica e resposta rápida aos comandos.",
                    en: "Deliver an engaging game prototype featuring responsive comedic physics and tight gameplay feel."
                },
                solution: {
                    pt: "Programação de lógicas de colisão e resposta cinemática em C++ com componentes modulares para rápida iteração de gameplay.",
                    en: "Implemented responsive kinematic response and character state handling in C++ with modular components."
                },
                impact: {
                      pt: "Chamou muita atenção durante a Gamejam+ 2025/26.",
                      en: "Attracted a lot of attention during Gamejam+ 2025/26."
                  }
            }
        },
        {
            id: "ff13_fix_ms_store",
            category: "tools",
            categoryLabel: { pt: "Ferramentas & Otimização", en: "Tools & Optimization" },
            image: "https://staticdelivery.nexusmods.com/mods/2086/images/thumbnails/59/59-1754939857-517189306.png",
            caseStudyImages: [
                "/assets/ff13msdemo.png"
            ],
            title: "FF13Fix for Microsoft Store",
            featured: false,
            live: "https://www.nexusmods.com/finalfantasy13/mods/59",
            tags: ["Python", "GUI", "Memory Patching", "Modding", "NexusMods"],
            description: {
                pt: "Aplicativo com interface gráfica que resolve stuttering, problemas de taxa de quadros e renderização no Final Fantasy 13 na MS Store através de automação em Python.",
                en: "GUI tool eliminating frame-rate stutter and rendering bugs for Final Fantasy 13 on Microsoft Store using automated memory and file patching in Python."
            },
            caseStudy: {
                challenge: {
                    pt: "O port de FF13 na MS Store sofre de frame-pacing severo e não aceitava os patches tradicionais da versão Steam devido a encriptação e layout de memória.",
                    en: "The MS Store port of FF13 suffered from unstable frame-pacing and rejected legacy Steam patches due to encryption."
                },
                solution: {
                    pt: "Desenvolvimento de rotina em Python que aplica patches binários diretamente no executável descriptografado em tempo de execução.",
                    en: "Engineered Python patch automation applying runtime binary edits to fix the frame scheduler."
                },
                impact: {
                      pt: "300+ downloads de jogadores que desfrutaram de um jogo mais estável.",
                      en: "300+ downloads from players who enjoyed a more stable game."
                  }
            }
        },
        {
            id: "autoparms_yakuza",
            category: "tools",
            categoryLabel: { pt: "Ferramentas & Automação", en: "Tools & Automation" },
            image: "https://staticdelivery.nexusmods.com/mods/7333/images/thumbnails/181/181-1754787442-12213008.png",
            caseStudyImages: [
                "https://staticdelivery.nexusmods.com/mods/7333/images/181/181-1754787420-1247728496.png"
            ],
            title: "AutoParMS - Yakuza Mod Toolkit",
            featured: false,
            live: "https://www.nexusmods.com/likeadragonpirateyakuzainhawaii/mods/181",
            tags: ["Python", "Tkinter", "PARTOOL", "File Extraction", "Mod Manager"],
            description: {
                pt: "Gerenciador e instalador automatizado de mods para Like a Dragon: Pirate Yakuza in Hawaii. Integra PARTOOL com interface intuitiva para extração e empacotamento seguro.",
                en: "Automated mod installer and manager for LAD: Pirate Yakuza. Integrates PARTOOL with an intuitive GUI for safe archive extraction and repacking."
            },
            caseStudy: {
                challenge: {
                    pt: "A manipulação manual de arquivos .par é propensa a corrupção e afasta jogadores sem conhecimentos técnicos.",
                    en: "Manual .par archive packing often corrupts game files, posing a steep barrier for regular players."
                },
                solution: {
                    pt: "Pipeline visual com verificação de integridade de hashes e backup automático antes de qualquer modificação.",
                    en: "Built a visual pipeline with automated checksum validation and rollback backups."
                },
                impact: {
                      pt: "100+ jogadores puderam modificar o jogo, com a unica tool que consegue fazer isso nesta versão do jogo.",
                      en: "100+ players were able to mod the game with the only tool capable of doing so in this version of the game."
                  }
            }
        },
        {
            id: "t6_gsc_mods",
            category: "mods",
            categoryLabel: { pt: "Modificações GSC", en: "GSC Mods" },
            image: "/assets/opensourcet6gscs.jpg",
            caseStudyImages: [
                "/assets/t6gsc.png"
            ],
            title: { pt: "Modos de Jogo Customizados Open Source T6 (GSC)", en: "Providing Open Source T6 Custom Game Modes GSC!" },
            description: {
                pt: "Um repositório com scripts GSC abertos e documentados para mods complexos de Black Ops 2 como Zombieland, Deathrun e Counter-Strike.",
                en: "An open-source repository containing fully documented GSC scripts for complex Black Ops 2 custom game modes like Zombieland, Deathrun, and CS."
            },
            repo: "https://github.com/Spet001/Open-Source-T6-GSC-Mods",
            repoLabel: { pt: "Repositório GitHub", en: "GitHub Repository" },
            isLocked: false,
            featured: true,
            journalId: "T6-Open-Source-GSC-Mods",
            tags: ["GSC", "Black Ops 2", "Modding", "Zombieland", "Deathrun"],
            caseStudy: {
                challenge: {
                    pt: "A comunidade de modding do Black Ops 2 sofria com projetos de código fechado ou ofuscado que acabavam sendo perdidos com o tempo, dificultando o aprendizado de novos desenvolvedores.",
                    en: "The Black Ops 2 modding community suffered from closed-source or obfuscated projects that were ultimately lost to time, hindering new developers from learning."
                },
                solution: {
                    pt: "Descompilar, documentar e disponibilizar publicamente em repositórios abertos os scripts GSC completos dos gamemodes mais complexos da história do jogo.",
                    en: "Decompile, document, and publicly release full GSC source scripts of the most complex gamemodes in the game's history on open repositories."
                },
                impact: {
                    pt: "Permitiu a preservação da história do modding do jogo.",
                    en: "Allowed the preservation of the game's modding history."
                }
            }
        },
        {
            id: "t9_mod_manager_re",
            category: "reverse",
            categoryLabel: { pt: "Engenharia Reversa & Análise Binária", en: "Reverse Engineering & Binary Analysis" },
            image: "/assets/cwgsc.png",
            lockedImage: "/assets/cwgsc_locked.jpg",
            title: { pt: "Descompilação Binária & Engenharia Reversa de Gerenciador de Scripts", en: "Proprietary Script Manager Binary Decompilation & Static Analysis" },
            lockedTitle: { pt: "Descompilação de Gerenciador de Scripts & Extração de Bytecode (Patreon)", en: "Proprietary Script Manager Decompilation & Bytecode Extraction (Patreon)" },
            isLocked: true,
            featured: true,
            journalId: "entry_0007",
            tags: ["C#", "C++", ".NET Decompilation", "Reverse Engineering", "Static Analysis", "Bytecode VM", "GSC"],
            description: {
                pt: "Análise estática e engenharia reversa de uma ferramenta desktop proprietária de código fechado para gerenciamento de scripts. O projeto envolveu a descompilação de assemblies protegidos, engenharia reversa das rotinas de criptografia interna e extração do código-fonte completo dos scripts em bytecode para disponibilização pública e preservação técnica.",
                en: "Static analysis and reverse engineering of a closed-source proprietary desktop script management tool. Involved decompiling obfuscated assemblies, reverse engineering internal encryption routines, and extracting the complete script source code to open-source it for research and digital preservation."
            },
            caseStudy: {
                challenge: {
                    pt: "Uma ferramenta de terceiros distribuía scripts e assets sob criptografia e ofuscação proprietárias em aplicativo de código fechado, impedindo a auditoria de segurança, interoperabilidade e inspeção técnica pela comunidade.",
                    en: "A third-party desktop tool packaged and distributed scripts under proprietary encryption and obfuscation routines within a closed-source binary, preventing security audits, interoperability, and technical inspection."
                },
                solution: {
                    pt: "Engenharia reversa dos assemblies da aplicação, reconstrução das rotinas de decodificação de payloads e extração automatizada do acervo completo de scripts para publicação em repositório público aberto para desenvolvedores. [Documentação completa e análises estruturadas disponíveis no Patreon].",
                    en: "Reverse engineered the application assemblies, reconstructed runtime payload decoding routines, and automated the extraction of all bundled scripts into an open-source repository for developers. [Full documentation and structured technical analysis unlocked on Patreon]."
                },
                impact: {
                    pt: "Liberação do código-fonte integral dos scripts para a comunidade técnica, viabilizando o aprendizado transparente da API de scripts do motor e auditoria independente.",
                    en: "Open-sourced the complete script codebase for technical developers, enabling transparent study of the engine's scripting APIs and independent security auditing."
                }
            }
        },
        {
            id: "bo2_crossplay_relay",
            category: "reverse",
            categoryLabel: { pt: "Engenharia Reversa / Net", en: "Reverse Engineering / Net" },
            image: "/assets/network_activity.mp4",
            lockedImage: "/assets/network_activity_locked.jpg",
            title: { pt: "Desbloqueie no Patreon!", en: "Unlock this Entry on Patreon!" },
            isLocked: true,
            featured: true,
            tags: ["Python", "C++", "Npcap", "Packet Sniffing", "Networking"],
            description: {
                pt: "🔒 Este projeto é confidencial/privado! Desbloqueie o Estudo de Caso completo e a entrada técnica do Journal assinando o Patreon!",
                en: "🔒 This project is in preview/private! Unlock the full Case Study and technical Journal entry by subscribing to Patreon!"
            },
            journalId: "Document-Explaining-Leaks",
            caseStudy: {
                challenge: {
                    pt: "[CONTEÚDO BLOQUEADO] Requer autenticação do Patreon.",
                    en: "[LOCKED CONTENT] Requires Patreon authentication."
                },
                solution: {
                    pt: "[CONTEÚDO BLOQUEADO] Faça login no Journal para ler a arquitetura de rede.",
                    en: "[LOCKED CONTENT] Log in via the Journal to read the network architecture."
                },
                impact: {
                    pt: "[CONTEÚDO BLOQUEADO] Faça login pelo Patreon para ver os resultados do projeto.",
                    en: "[LOCKED CONTENT] Log in via Patreon to view the project results and impacts."
                }
            }
        },
        {
            id: "projecty_mdpro_web",
            title: "ProjectY - MDPro Web",
            lockedTitle: { pt: "Desbloqueie com Login no Patreon! (Grátis)", en: "Unlock with Patreon Login! (Free)" },
            category: "gamedev",
            categoryLabel: { pt: "Game Dev & WebGL / WASM", en: "Game Dev & WebGL / WASM" },
            image: "/assets/projecty.jpg",
            lockedImage: "/assets/projecty_locked.jpg",
            caseStudyImages: [
                "/assets/projecty in game.png",
                "/assets/projecty.jpg"
            ],
            repo: "https://github.com/Spet001/ProjectY",
            isLocked: true,
            freePatreonUnlock: true,
            featured: true,
            tags: ["TypeScript", "Three.js / WebGL", "WebAssembly (OCGCore)", "SQLite WASM", "Lua", "Yu-Gi-Oh!"],
            description: {
                pt: "Simulador 3D de Yu-Gi-Oh! para navegador inspirado no Master Duel / MDPro3, construído com Three.js e TypeScript. Executa o motor oficial C++/Lua libocgcore compilado para WebAssembly (Master Rule 5 completa), banco de cartas SQLite WASM (cards.cdb), oponente de IA heurística, editor de decks de 3 colunas (.ydk) e campo 3D interativo.",
                en: "Browser-based 3D Yu-Gi-Oh! duel simulator inspired by Master Duel / MDPro3, built with Three.js and TypeScript. Runs the genuine C++/Lua libocgcore duel processor compiled to WebAssembly (full Master Rule 5 support), SQLite WASM card database (cards.cdb), heuristic AI opponent, 3-column deck editor (.ydk), and interactive 3D field."
            },
            lockedDescription: {
                pt: "🔒 Este projeto fica oculto até que você faça login com o Patreon (somente login gratuito, não precisa de assinatura)! Clique no botão de Login no modal do Patreon para liberar o card completo e o repositório!",
                en: "🔒 This project is hidden until you log in with Patreon (free login only, no paid subscription required)! Click the Log In button in the Patreon modal to unlock the full card and repository!"
            },
            caseStudy: {
                challenge: {
                    pt: "Trazer a experiência completa de simulação de Yu-Gi-Oh! (MDPro3 / Master Duel) com mais de 13.000 scripts de cartas em Lua, resolução de Chains complexas e tabuleiro 3D interativo diretamente para o navegador sem exigir instalação desktop.",
                    en: "Bring the full Yu-Gi-Oh! duel simulation experience (MDPro3 / Master Duel) with 13,000+ Lua card scripts, complex Chain resolution, and an interactive 3D board directly into the browser with zero desktop installation."
                },
                solution: {
                    pt: "Integração do processador de duelos C++/Lua libocgcore em WebAssembly com leitura de banco SQLite (sql-wasm) e script.zip em memória, embaralhamento criptográfico Fisher-Yates (crypto.getRandomValues), proteção estrita contra vazamento de cartas ocultas na GPU/DOM, IA heurística integrada e campo 3D em Three.js com suporte a Mates .glb e customização via IndexedDB.",
                    en: "Integrated the WebAssembly libocgcore C++/Lua duel processor with in-memory SQLite (sql-wasm) and script.zip loading, cryptographic Fisher-Yates shuffling (crypto.getRandomValues), strict hidden-card masking across 3D textures and DOM inspector, built-in heuristic AI, and a Three.js 3D board supporting .glb Mates and IndexedDB customization."
                },
                impact: {
                    pt: "Simulador 100% client-side rodando a 120+ FPS no navegador com suporte completo à Master Rule 5 (Normal, Tribute, Ritual, Fusion, Synchro, Xyz com Overlay Units 3D, Pendulum e Link), 40+ Structure Decks integrados e código aberto no GitHub.",
                    en: "100% client-side browser simulator running at 120+ FPS with full Master Rule 5 support (Normal, Tribute, Ritual, Fusion, Synchro, Xyz with 3D Overlay Units, Pendulum, and Link), 40+ built-in Structure Decks, and open-source repository on GitHub."
                }
            },
            lockedCaseStudy: {
                challenge: {
                    pt: "[CONTEÚDO OCULTO] Faça login gratuito pelo modal do Patreon (não requer assinatura paga) para liberar o Desafio Técnico.",
                    en: "[HIDDEN CONTENT] Log in for free via the Patreon modal (no paid subscription required) to unlock the Technical Challenge."
                },
                solution: {
                    pt: "[CONTEÚDO OCULTO] Faça login gratuito pelo modal do Patreon para liberar a Arquitetura, Screenshots e o Repositório no GitHub.",
                    en: "[HIDDEN CONTENT] Log in for free via the Patreon modal to unlock the Architecture, Screenshots, and GitHub Repository."
                },
                impact: {
                    pt: "[CONTEÚDO OCULTO] Faça login gratuito pelo modal do Patreon para liberar os Resultados do projeto.",
                    en: "[HIDDEN CONTENT] Log in for free via the Patreon modal to unlock the project Results."
                }
            }
        },
        {
            id: "fable3_fixer",
            title: "Fable 3 Fixer (App Electron)",
            category: "tools",
            categoryLabel: { pt: "Ferramentas & Otimização", en: "Tools & Optimization" },
            image: "/assets/fable3_fixer.png",
            live: "https://www.nexusmods.com/fableIII/mods/27",
            featured: false,
            tags: ["Electron", "DXVK", "Vulkan", "ReShade", "4GB Patch", "GFWL", "NexusMods"],
            description: {
                pt: "Aplicativo desktop em Electron que automatiza a instalação de um renderizador customizado Vulkan (DXVK), preset calibrado do ReShade, patch de memória Large Address Aware (4GB) e compatibilidade total com Games for Windows Live (GFWL), dobrando a taxa de quadros e eliminando stuttering no Fable III.",
                en: "Desktop Electron application automating the installation of a custom Vulkan DXVK renderer, hand-tuned ReShade preset, Large Address Aware (4GB) memory patch, and full Games for Windows Live (GFWL) compatibility, doubling FPS and eliminating stuttering in Fable III."
            },
            caseStudy: {
                challenge: {
                    pt: "Fable III no PC sofre de desempenho instável em GPUs modernas sob DirectX 9, stuttering severo, limite nativo de 2GB de RAM que causa crashes por estouro de memória, e quebra de renderização ao tentar injetar shaders mantendo a compatibilidade do Games for Windows Live (GFWL).",
                    en: "Fable III on PC suffers from unstable performance on modern GPUs under DirectX 9, severe stuttering, native 2GB RAM limits triggering out-of-memory crashes, and rendering conflicts when attempting shader injection while preserving Games for Windows Live (GFWL) connectivity."
                },
                solution: {
                    pt: "Desenvolvimento de um instalador desktop moderno em Electron com UI amigável e instalação em 1 clique. Integra DXVK para traduzir chamadas DirectX 9 em instruções Vulkan modernas, preset afinado de ReShade que aprimora texturas e iluminação sem quebrar a direção de arte original, patch 4GB (LAA) para estabilidade e integração nativa com o GFWL sem necessidade de bypass externo.",
                    en: "Engineered a modern Electron desktop installer featuring a streamlined 1-click UI. Integrates DXVK translating DirectX 9 calls into modern Vulkan instructions, a tuned ReShade preset improving textures and lighting without disrupting original art direction, a 4GB LAA memory patch, and seamless GFWL integration without external bypass mods."
                },
                impact: {
                    pt: "Mais de 5.200 downloads totais (4.600+ downloads únicos) e 23.400+ visualizações no NexusMods com 54 Endorsements, proporcionando até 2x mais FPS, eliminando pop-in e stuttering, e revitalizando o jogo para a comunidade em PCs modernos.",
                    en: "Over 5,200 total downloads (4,600+ unique downloads) and 23,400+ views on NexusMods with 54 Endorsements, delivering up to 2× higher frame rates, eliminating stuttering, and revitalizing the game on modern PC hardware."
                }
            }
        },
        {
            id: "delicia_mod_doom",
            title: { pt: "Delícia Mod — DOOM (1993) Total Conversion", en: "Delícia Mod — DOOM (1993) Total Conversion" },
            category: "gamedev",
            categoryLabel: { pt: "Modding & Game Design", en: "Modding & Game Design" },
            image: "/assets/delicia thumb.jpg",
            caseStudyImages: [
                "https://staticdelivery.nexusmods.com/mods/1839/images/22/22-1756907095-554372746.png",
                "https://staticdelivery.nexusmods.com/mods/1839/images/22/22-1756907094-402904133.png"
            ],
            live: "https://www.nexusmods.com/doom1993/mods/22",
            liveLabel: { pt: "NexusMods", en: "NexusMods" },
            journalId: "What-Is-A-WAD-Modern-Games",
            featured: true,
            tags: ["DOOM (1993)", "WAD / Lump Modding", "ZScript / DECORATE", "Total Conversion", "NexusMods"],
            description: {
                pt: "Total Conversion bem-humorada para o clássico DOOM (1993) inspirada no lendário meme brasileiro de Jailson Mendes. Substitui sprites, texturas, efeitos sonoros e trilha sonora através de manipulação de lumps em arquivos WAD e scripts customizados.",
                en: "Humorous Total Conversion mod for classic DOOM (1993) inspired by the legendary Brazilian Jailson Mendes meme. Replaces enemy sprites, level textures, sound effects, and soundtrack via custom WAD lump manipulation and actor scripts."
            },
            caseStudy: {
                challenge: {
                    pt: "Adaptar assets visuais, sprites rotacionais e amostras de áudio para a paleta indexada e arquitetura de lumps da engine clássica sem descaracterizar o combate frenético — mantendo a verdadeira essência de um clássico 'DELICIA DOOM' mesmo sob restrições de 35 tics por segundo.",
                    en: "Adapt custom rotational sprites, textures, and audio samples to the indexed palette and lump architecture of the classic id Tech 1 engine without breaking fast-paced combat — preserving the true 'DELICIA DOOM' experience under strict 35-tic frame timing."
                },
                solution: {
                    pt: "Engenharia de um pacote WAD/PK3 modularizado com substituição de estados de atores, mapeamento de canais de áudio customizados e integração com portabilidades modernas (incluindo WebAssembly). Reza a lenda que apenas digitar o protocolo 'DELICIA' (ou a senha completa 'DELICIA DOOM') em um terminal de linha de comando é capaz de invocar essa anomalia diretamente no espaço...",
                    en: "Engineered a modular WAD/PK3 archive with custom actor state overrides, sound channel remapping, and modern source-port compatibility (including WebAssembly). Rumor has it that typing the 'DELICIA' protocol (or the full passphrase 'DELICIA DOOM') into a command-line terminal can invoke this anomaly directly in deep space..."
                },
                impact: {
                    pt: "Disponibilizado gratuitamente no NexusMods para entusiastas de modding retrô — e escondido nas profundezas deste próprio sistema para quem tiver coragem de responder à pergunta do terminal.",
                    en: "Released on NexusMods for the retro modding community — and secretly embedded deep within this very system for anyone bold enough to answer the terminal's password prompt."
                }
            }
        }
    ],

    // 3D ICONS TECH STACK DATA - Compact, punchy, high-impact 3D badges
    techCategories: [
        {
            id: "systems",
            nameKey: "systemsTitle",
            icon: "fas fa-microchip",
            skills: [
                { name: "C & C++", level: "Low-Level & Memory", icon3d: "https://skillicons.dev/icons?i=cpp" },
                { name: "C Language", level: "Pointers & Native DLLs", icon3d: "https://skillicons.dev/icons?i=c" },
                { name: "Win32 / GDK", level: "UWP Internals & Threads", icon3d: "https://skillicons.dev/icons?i=powershell" },
                { name: "GSC Injection", level: "VM Bytecode Patching", icon3d: "https://skillicons.dev/icons?i=c" }
            ]
        },
        {
            id: "reverse",
            nameKey: "reverseTitle",
            icon: "fas fa-crosshairs",
            skills: [
                { 
                    name: "IDA Pro", 
                    level: "Disassembly & Hex-Rays", 
                    icon3d: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='ida-bg' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%230891b2'/%3E%3Cstop offset='100%25' stop-color='%23164e63'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='14' fill='url(%23ida-bg)'/%3E%3Crect x='1.5' y='1.5' width='61' height='61' rx='12.5' fill='none' stroke='rgba(255,255,255,0.25)' stroke-width='1.5'/%3E%3Ctext x='32' y='37' font-family='system-ui,-apple-system,sans-serif' font-weight='900' font-size='19' fill='%23e0f2fe' text-anchor='middle' letter-spacing='-0.5'%3EIDA%3C/text%3E%3Ctext x='32' y='50' font-family='monospace' font-weight='800' font-size='9' fill='%2338bdf8' text-anchor='middle' letter-spacing='2'%3EPRO%3C/text%3E%3C/svg%3E" 
                },
                { 
                    name: "x64dbg (xdbg64)", 
                    level: "Dynamic x64/x32 Debugger", 
                    icon3d: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='xdbg-bg' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%231e293b'/%3E%3Cstop offset='100%25' stop-color='%230f172a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='14' fill='url(%23xdbg-bg)'/%3E%3Crect x='1.5' y='1.5' width='61' height='61' rx='12.5' fill='none' stroke='rgba(74,222,128,0.4)' stroke-width='1.5'/%3E%3Cpath d='M25 22h14M32 16v12M24 18l4 4-4 4M40 18l-4 4 4 4' stroke='%234ade80' stroke-width='2' stroke-linecap='round'/%3E%3Ctext x='32' y='49' font-family='monospace' font-weight='900' font-size='11' fill='%2386efac' text-anchor='middle' letter-spacing='0.5'%3Ex64dbg%3C/text%3E%3C/svg%3E" 
                },
                { 
                    name: "ReClass.NET", 
                    level: "Memory Struct Reversing", 
                    icon3d: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='rc-bg' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23581c87'/%3E%3Cstop offset='100%25' stop-color='%232e1065'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='14' fill='url(%23rc-bg)'/%3E%3Crect x='1.5' y='1.5' width='61' height='61' rx='12.5' fill='none' stroke='rgba(216,180,254,0.35)' stroke-width='1.5'/%3E%3Crect x='19' y='15' width='26' height='17' rx='3' fill='none' stroke='%23d8b4fe' stroke-width='1.8'/%3E%3Cline x1='19' y1='21' x2='45' y2='21' stroke='%23d8b4fe' stroke-width='1.2'/%3E%3Cline x1='19' y1='27' x2='45' y2='27' stroke='%23d8b4fe' stroke-width='1.2'/%3E%3Ctext x='32' y='49' font-family='system-ui,-apple-system,sans-serif' font-weight='900' font-size='9' fill='%23f3e8ff' text-anchor='middle' letter-spacing='0.5'%3EReClass%3C/text%3E%3C/svg%3E" 
                },
                { 
                    name: "ILSpy", 
                    level: ".NET & CIL Bytecode Analysis", 
                    icon3d: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='il-bg' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23ea580c'/%3E%3Cstop offset='100%25' stop-color='%239a3412'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='14' fill='url(%23il-bg)'/%3E%3Crect x='1.5' y='1.5' width='61' height='61' rx='12.5' fill='none' stroke='rgba(255,255,255,0.25)' stroke-width='1.5'/%3E%3Ccircle cx='28' cy='24' r='9' fill='none' stroke='%23ffedd5' stroke-width='2.5'/%3E%3Cline x1='35' y1='31' x2='44' y2='40' stroke='%23ffedd5' stroke-width='3' stroke-linecap='round'/%3E%3Ctext x='28' y='27.5' font-family='system-ui,sans-serif' font-weight='900' font-size='9' fill='%23fff' text-anchor='middle'%3E.NET%3C/text%3E%3Ctext x='32' y='52' font-family='monospace' font-weight='900' font-size='10.5' fill='%23ffedd5' text-anchor='middle' letter-spacing='1'%3EILSPY%3C/text%3E%3C/svg%3E" 
                },
                { 
                    name: "Cheat Engine (CE)", 
                    level: "Memory Scanner & Disassembler", 
                    icon3d: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='ce-bg' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%2316a34a'/%3E%3Cstop offset='100%25' stop-color='%2314532d'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='14' fill='url(%23ce-bg)'/%3E%3Crect x='1.5' y='1.5' width='61' height='61' rx='12.5' fill='none' stroke='rgba(255,255,255,0.25)' stroke-width='1.5'/%3E%3Ctext x='32' y='36' font-family='system-ui,-apple-system,sans-serif' font-weight='900' font-size='21' fill='%23dcfce7' text-anchor='middle' letter-spacing='-0.5'%3ECE%3C/text%3E%3Ctext x='32' y='49' font-family='monospace' font-weight='800' font-size='8.5' fill='%2386efac' text-anchor='middle' letter-spacing='1'%3ESCANNER%3C/text%3E%3C/svg%3E" 
                }
            ]
        },
        {
            id: "gamedev",
            nameKey: "gamedevTitle",
            icon: "fas fa-gamepad",
            skills: [
                { name: "Unity", level: "C# Architecture & Physics", icon3d: "https://skillicons.dev/icons?i=unity" },
                { name: "Unreal Engine", level: "C++ & Game Systems", icon3d: "https://skillicons.dev/icons?i=unreal" },
                { name: "C# (.NET)", level: "OOP, FSM & Scriptables", icon3d: "https://skillicons.dev/icons?i=cs" },
                { name: "Game Design", level: "NavMesh & AI Behaviors", icon3d: "https://skillicons.dev/icons?i=unity" }
            ]
        },
        {
            id: "scripting",
            nameKey: "scriptingTitle",
            icon: "fas fa-code",
            skills: [
                { name: "Python", level: "Automation, GUI & Tools", icon3d: "https://skillicons.dev/icons?i=python" },
                { name: "PowerShell", level: "System Admin & Scripts", icon3d: "https://skillicons.dev/icons?i=powershell" },
                { name: "Bash & Linux", level: "Shell Scripting", icon3d: "https://skillicons.dev/icons?i=bash" },
                { name: "Electron", level: "Desktop GUI Launchers", icon3d: "https://skillicons.dev/icons?i=electron" },
                { name: "Git", level: "CI/CD & Source Control", icon3d: "https://skillicons.dev/icons?i=git" }
            ]
        },
        {
            id: "qa",
            nameKey: "qaTitle",
            icon: "fas fa-shield-halved",
            skills: [
                { name: "Manual QA", level: "Edge-Cases & Stress Testing", icon3d: "https://skillicons.dev/icons?i=cs" },
                { name: "Code Deduction", level: "Root Cause & Logic Tracing", icon3d: "https://skillicons.dev/icons?i=cpp" },
                { name: "Bug Reporting", level: "Jira, GitHub & Steam", icon3d: "https://skillicons.dev/icons?i=git" },
                { name: "Profiling", level: "Frametime & Memory Leaks", icon3d: "https://skillicons.dev/icons?i=unity" }
            ]
        }
    ],

    // JOURNAL ARTICLES - Authentic posts matching /journal
    journalEntries: [
        {
            id: "Exploring-Legacy-UWP-Titles",
            title: "Exploring Legacy UWP Titles: Hooking Undocumented WinRT Store APIs, COD Points Ingestion & UWP Dumper Injection",
            date: "Oct 19, 2026",
            file: "Exploring-Legacy-UWP-Titles.md",
            category: "Reverse Engineering & Windows Internals",
            excerpt: "Reverse engineering legacy Windows 10 UWP games (Call of Duty: Infinite Warfare): weaponizing UWP Dumper suspended process lifecycle for AppContainer DLL injection, VMT hooking undocumented IStoreContextServer COM interface, intercepting COD Points package requests, and analyzing why client-side S2S DLC spoofing fails."
        },
        {
            id: "Gamifying-A-Galactic-Portfolio-Galaxy-Map",
            title: "Quick Entry: Gamifying a Galactic Portfolio with the 3D Galaxy Map!",
            date: "Oct 18, 2026",
            file: "Gamifying-A-Galactic-Portfolio-Galaxy-Map.md",
            category: "Creative Dev & Three.js",
            excerpt: "Announcing Space 3.0: an interactive Mass Effect-inspired 3D Galaxy Map built with Three.js WebGL. Transforming software projects into explorable celestial bodies with true orbital physics, dynamic OST streaming, and secret sectors."
        },
        {
            id: "DEVLOG-Outcaster-Unity-6",
            title: "DEVLOG: Rebuilding Outcaster from Scratch in Unity 6 — Live 3D HUD Tooling & Zombies Survival",
            date: "Oct 16, 2026",
            file: "DEVLOG-Outcaster-Unity-6.md",
            category: "Game Dev & Engine Tooling",
            excerpt: "Rebuilding Outcaster from the ground up in Unity 6 (DX11): developing custom LIVE 3D HUD preview tools for the Inspector to calibrate 2.5D weapons without play mode, and engineering a Zombies-style Survival Mode."
        },
        {
            id: "Sparky-Rush-Steam-Release",
            title: "Sparky Rush: Purrils in Pawsville Launches on Steam! (Go Check It Out!)",
            date: "Oct 16, 2026",
            file: "Sparky-Rush-Steam-Release.md",
            category: "Commercial Game Dev & QA",
            excerpt: "Sparky Rush: Purrils in Pawsville is officially live on Steam by Converting Minds! QA breakdown: finding 100+ collider flaws, fixing ultrawide UI issues, solving 20+ softlocks, and 60 FPS profiling on a GT 710."
        },
        {
            id: "How-To-Optimize-ThreeJS-Scene-120-FPS",
            title: "How to Optimize a Three.js Scene for 120+ FPS",
            date: "Oct 11, 2026",
            file: "How-To-Optimize-ThreeJS-Scene-120-FPS.md",
            category: "WebGL & Graphics Optimization",
            excerpt: "Deep dive into locking a Three.js WebGL scene at 120–165+ FPS: offloading particle physics to stateless GLSL vertex shaders, InstancedMesh pooling, replacing HTML5 video with GPU translate3d Sprite Sheets to eliminate D3D11 SwapChain contention, and Chromium compositor tuning."
        },
        {
            id: "What-Is-A-WAD-Modern-Games",
            title: "What is a WAD? From 1993 DOOM to Undocumented Demonware WADs in Call of Duty & id Tech 7/8",
            date: "Oct 18, 2026",
            file: "What-Is-A-WAD-Modern-Games.md",
            category: "Reverse Engineering & File Formats",
            excerpt: "Tracing the WAD lump filesystem from 1993 DOOM to reverse-engineering Treyarch's undocumented 0x543377AB Demonware WAD containers (online_tu17_mp.wad, online_tu17_zm.wad, online_tu14_mp_english.wad, online_tu14_sp_english.wad) in Call of Duty and modern id Tech 7/8 resources."
        },
        {
            id: "Optimize-Old-Games-4GB-Patch-DXVK",
            title: "Quick Entry: How to Optimize Old Games Yourself with 4GB Patch and DXVK!",
            date: "Oct 9, 2026",
            file: "Optimize-Old-Games-4GB-Patch-DXVK.md",
            category: "Game Optimization & Modding",
            excerpt: "Learn how to dramatically boost FPS and fix crashes in classic 32-bit DirectX games using the 4GB Memory Patch (LAA) and DXVK Vulkan translation layer manually."
        },
        {
            id: "Open-Source-3D-Assets",
            title: "Open Source 3D Assets! (Low Poly & Game Models)",
            date: "Oct 8, 2026",
            file: "Open-Source-3D-Assets.md",
            category: "3D Art & Assets",
            excerpt: "Releasing all original low-poly 3D models from the portfolio simulation and game prototypes: Jet, Astronaut, Rocket, Paratrooper, Space Chicken, Jailson Mendes, Cop, and the test Moon."
        },
        {
            id: "What-Is-GSC",
            title: "What is GSC? (Game Scripting C) Guide",
            date: "Sep 30, 2026",
            file: "What-Is-GSC.md",
            category: "GSC Engine Internals",
            excerpt: "Comprehensive architectural guide to Game Scripting C (GSC), the bytecode VM engine behind Call of Duty titles."
        },
        {
            id: "Cloudflare-Workers-Backend",
            title: "Having a Backend on a Static Website with Cloudflare Workers!",
            date: "Sep 28, 2026",
            file: "Cloudflare-Workers-Backend.md",
            category: "Serverless & Edge",
            excerpt: "Architecting zero-cost serverless backend APIs, telemetry collection, rate limiters, and OAuth handlers for static GitHub Pages sites."
        },
        {
            id: "T6-Open-Source-GSC-Mods",
            title: "Providing Open Source T6 Custom Game Modes GSC!",
            date: "Sep 27, 2026",
            file: "T6-Open-Source-GSC-Mods.md",
            category: "Open Source Modding",
            excerpt: "Open-sourcing custom game modes for Call of Duty: Black Ops 2 (T6) to preserve community game modifications."
        },
        {
            id: "UWP-GDK-Sandbox-Entitlement-Analysis",
            title: "UWP/GDK Sandbox & Entitlement Architecture Analysis (Legacy Preservation)",
            date: "Sep 21, 2026",
            file: "UWP-GDK-Sandbox-Entitlement-Analysis.md",
            category: "Security & GDK Architecture",
            excerpt: "Detailed breakdown of XStore entitlement validation routines, GDK sandboxing mechanisms, and native memory hooks for legacy software preservation."
        },
        {
            id: "T6-GSC-Injector-MS-Store",
            title: "Open Source GSC Injector for Black Ops 2 (MS Store)",
            date: "Sep 20, 2026",
            file: "T6-GSC-Injector-MS-Store.md",
            category: "Reverse Engineering",
            excerpt: "Architecture notes on the T6 MS Store injector, resolving dynamic function pointers and executing custom Game Script Code."
        },
        {
            id: "T5-GSC-Injector-MS-Store",
            title: "GSC Injection on Black Ops 1 (MS Store)",
            date: "Sep 19, 2026",
            file: "T5-GSC-Injector-MS-Store.md",
            category: "Game Modding",
            excerpt: "Documenting memory signatures and thread redirection techniques in older Treyarch engines adapted for the Microsoft Store."
        },
        {
            id: "Document-Explaining-Leaks",
            title: "Document: Explaining Unauthorized Leaks & Network Architecture Analysis",
            date: "Sep 19, 2026",
            file: "Document-Explaining-Leaks.md",
            category: "Network Engineering & Security",
            excerpt: "Technical disclosure and incident post-mortem on unauthorized repository dumps, alongside an in-depth architectural breakdown of low-latency UDP packet routing and crossplay relay topology."
        },
        {
            id: "CW-GSC-Injection-MS-Store",
            title: "CW GSC Injection Findings",
            date: "Sep 18, 2026",
            file: "CW-GSC-Injection-MS-Store.md",
            category: "Reverse Engineering",
            excerpt: "Reverse engineering notes on Black Ops Cold War memory encryption and dynamic asset pool locator routines."
        }
    ]
};


const Starfield = () => {
            const canvasRef = useRef(null);
            const moonPosRef = useRef({ x: window.innerWidth * 0.7, y: window.innerHeight * 0.3 });
            
            // Rocket follows mouse
            const rocketRef = useRef({ x: -100, y: -100, angle: -Math.PI/2 });
            // Astro controlled by keyboard
            const astroRef = useRef({ x: -100, y: -100, vx: 0, vy: 0, angle: 0 });
            const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2, lastX: window.innerWidth / 2, lastY: window.innerHeight / 2 });
            const particlesRef = useRef([]);
            const keysRef = useRef({});
            const hasMouseMovedRef = useRef(false);

            useEffect(() => {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                let animationFrameId;
                let stars = [];

                const initStars = () => {
                    stars = Array.from({ length: 400 }).map(() => ({
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        z: Math.random() * window.innerWidth,
                        size: Math.random() * 1.5 + 0.5
                    }));
                };

                const handleResize = () => {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    moonPosRef.current = { x: window.innerWidth * 0.7, y: window.innerHeight * 0.3 };
                    initStars();
                };

                handleResize();

                const handleKeyDown = (e) => {
                    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                        e.preventDefault();
                    }
                    keysRef.current[e.key] = true;
                };
                const handleKeyUp = (e) => keysRef.current[e.key] = false;
                
                const handleMouseMove = (e) => {
                    updateMouse(e.clientX, e.clientY);
                };

                const handleTouchMove = (e) => {
                    if (e.touches.length > 0) {
                        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
                    }
                };

                const updateMouse = (clientX, clientY) => {
                    if (!hasMouseMovedRef.current) {
                        // Teleport to avoid initial physics explosion
                        mouseRef.current = { x: clientX, y: clientY, lastX: clientX, lastY: clientY };
                        rocketRef.current.x = clientX;
                        rocketRef.current.y = clientY;
                        astroRef.current.x = clientX + 50;
                        astroRef.current.y = clientY + 50;
                        hasMouseMovedRef.current = true;
                    } else {
                        mouseRef.current.x = clientX;
                        mouseRef.current.y = clientY;
                    }
                };

                window.addEventListener('keydown', handleKeyDown, { passive: false });
                window.addEventListener('keyup', handleKeyUp);
                window.addEventListener('resize', handleResize);
                window.addEventListener('mousemove', handleMouseMove);
                window.addEventListener('touchmove', handleTouchMove, { passive: true });
                window.addEventListener('touchstart', handleTouchMove, { passive: true });

                const render = () => {
                    // Clear canvas
                    ctx.fillStyle = '#050505';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // Stars
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    stars.forEach(star => {
                        star.z -= 0.5;
                        if (star.z <= 0) {
                            star.z = canvas.width;
                            star.x = Math.random() * canvas.width;
                            star.y = Math.random() * canvas.height;
                        }
                        const perspective = canvas.width / star.z;
                        const px = (star.x - canvas.width / 2) * perspective + canvas.width / 2;
                        const py = (star.y - canvas.height / 2) * perspective + canvas.height / 2;
                        const pSize = star.size * perspective * 0.5;

                        ctx.beginPath();
                        ctx.arc(px, py, pSize > 0 ? pSize : 0.1, 0, Math.PI * 2);
                        ctx.fill();
                    });

                    // Static Moon
                    const gradient = ctx.createRadialGradient(
                        moonPosRef.current.x, moonPosRef.current.y, 10,
                        moonPosRef.current.x, moonPosRef.current.y, 60
                    );
                    gradient.addColorStop(0, 'rgba(0, 170, 255, 0.15)');
                    gradient.addColorStop(1, 'rgba(0, 170, 255, 0)');
                    ctx.fillStyle = gradient;
                    ctx.beginPath(); ctx.arc(moonPosRef.current.x, moonPosRef.current.y, 80, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = '#e2e8f0';
                    ctx.beginPath(); ctx.arc(moonPosRef.current.x, moonPosRef.current.y, 30, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
                    ctx.beginPath(); ctx.arc(moonPosRef.current.x - 10, moonPosRef.current.y - 10, 6, 0, Math.PI * 2); ctx.fill();
                    ctx.beginPath(); ctx.arc(moonPosRef.current.x + 12, moonPosRef.current.y + 5, 8, 0, Math.PI * 2); ctx.fill();
                    ctx.beginPath(); ctx.arc(moonPosRef.current.x - 5, moonPosRef.current.y + 15, 4, 0, Math.PI * 2); ctx.fill();


                    // Wait for first mouse movement before drawing and running physics for the actors
                    if (!hasMouseMovedRef.current) {
                        animationFrameId = requestAnimationFrame(render);
                        return;
                    }

                    const rocket = rocketRef.current;
                    const astro = astroRef.current;
                    const mouse = mouseRef.current;
                    
                    // --- PHYSICS ---
                    const friction = 0.92;
                    const astroThrust = 0.8;

                    let isThrusting = false;
                    if (keysRef.current['ArrowLeft']) { astro.vx -= astroThrust; isThrusting = true; }
                    if (keysRef.current['ArrowRight']) { astro.vx += astroThrust; isThrusting = true; }
                    if (keysRef.current['ArrowUp']) { astro.vy -= astroThrust; isThrusting = true; }
                    if (keysRef.current['ArrowDown']) { astro.vy += astroThrust; isThrusting = true; }

                    if (isThrusting && Math.random() < 0.4) {
                        particlesRef.current.push({
                            type: 'oxy',
                            x: astro.x - Math.cos(astro.angle) * 12,
                            y: astro.y - Math.sin(astro.angle) * 12,
                            vx: -Math.cos(astro.angle) * 2 + (Math.random() - 0.5),
                            vy: -Math.sin(astro.angle) * 2 + (Math.random() - 0.5),
                            life: 1.0,
                            size: Math.random() * 3 + 1
                        });
                    }

                    if (Math.abs(astro.vx) > 0.5 || Math.abs(astro.vy) > 0.5) {
                        const targetAngle = Math.atan2(astro.vy, astro.vx);
                        let diff = targetAngle - astro.angle;
                        while (diff < -Math.PI) diff += Math.PI * 2;
                        while (diff > Math.PI) diff -= Math.PI * 2;
                        astro.angle += diff * 0.15;
                    }

                    rocket.x = mouse.x;
                    rocket.y = mouse.y;
                    
                    const dxMouse = mouse.x - mouse.lastX;
                    const dyMouse = mouse.y - mouse.lastY;
                    if (dxMouse * dxMouse + dyMouse * dyMouse > 1) {
                        const targetAngle = Math.atan2(dyMouse, dxMouse);
                        let diff = targetAngle - rocket.angle;
                        while (diff < -Math.PI) diff += Math.PI * 2;
                        while (diff > Math.PI) diff -= Math.PI * 2;
                        rocket.angle += diff * 0.25;
                        
                        if (Math.random() < 0.6) {
                            particlesRef.current.push({
                                type: 'fire',
                                x: rocket.x - Math.cos(rocket.angle) * 15,
                                y: rocket.y - Math.sin(rocket.angle) * 15,
                                vx: -Math.cos(rocket.angle) * 2 + (Math.random() - 0.5) * 2,
                                vy: -Math.sin(rocket.angle) * 2 + (Math.random() - 0.5) * 2,
                                life: 1.0,
                                size: Math.random() * 4 + 2
                            });
                        }
                    }
                    mouse.lastX = mouse.x;
                    mouse.lastY = mouse.y;

                    const dxTether = astro.x - rocket.x;
                    const dyTether = astro.y - rocket.y;
                    const distance = Math.hypot(dxTether, dyTether);
                    const tetherLength = 150;

                    if (distance > tetherLength) {
                        const stretch = distance - tetherLength;
                        const force = stretch * 0.1; 
                        const angle = Math.atan2(dyTether, dxTether);
                        astro.vx -= Math.cos(angle) * force;
                        astro.vy -= Math.sin(angle) * force;
                    }

                    astro.vx *= friction;
                    astro.vy *= friction;
                    astro.x += astro.vx;
                    astro.y += astro.vy;

                    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
                    astro.x = clamp(astro.x, 0, canvas.width);
                    astro.y = clamp(astro.y, 0, canvas.height);

                    // --- DRAWING ---
                    if (distance < canvas.width / 2) {
                        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                        ctx.lineWidth = 1.5;
                        ctx.setLineDash([4, 4]);
                        ctx.beginPath();
                        ctx.moveTo(astro.x, astro.y);
                        ctx.lineTo(rocket.x, rocket.y);
                        ctx.stroke();
                        ctx.setLineDash([]);
                    }

                    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
                        let p = particlesRef.current[i];
                        p.x += p.vx;
                        p.y += p.vy;
                        p.life -= p.type === 'fire' ? 0.04 : 0.02;
                        if (p.life <= 0) {
                            particlesRef.current.splice(i, 1);
                        } else {
                            if (p.type === 'fire') {
                                ctx.fillStyle = `rgba(255, ${Math.random()*100 + 100}, 0, ${p.life})`;
                            } else {
                                ctx.fillStyle = `rgba(200, 230, 255, ${p.life * 0.8})`;
                            }
                            ctx.beginPath();
                            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }

                    ctx.save();
                    ctx.translate(astro.x, astro.y);
                    ctx.rotate(astro.angle + Math.PI/2); 
                    ctx.fillStyle = '#e2e8f0';
                    ctx.fillRect(-6, -2, 12, 14); 
                    ctx.fillStyle = '#ffffff';
                    ctx.beginPath(); ctx.arc(0, -6, 8, 0, Math.PI * 2); ctx.fill(); 
                    ctx.fillStyle = '#00aaff';
                    ctx.beginPath(); ctx.arc(2, -6, 4, 0, Math.PI * 2); ctx.fill(); 
                    ctx.fillStyle = '#94a3b8';
                    ctx.fillRect(-9, 0, 4, 10); 
                    ctx.fillStyle = '#e2e8f0';
                    ctx.fillRect(-5, 12, 4, 8); 
                    ctx.fillRect(1, 12, 4, 8); 
                    ctx.restore();

                    ctx.save();
                    ctx.translate(rocket.x, rocket.y);
                    ctx.rotate(rocket.angle);
                    ctx.fillStyle = '#e2e8f0';
                    ctx.beginPath();
                    ctx.moveTo(20, 0); 
                    ctx.lineTo(-15, 12); 
                    ctx.lineTo(-8, 0); 
                    ctx.lineTo(-15, -12); 
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStyle = '#00aaff';
                    ctx.beginPath(); ctx.arc(5, 0, 4, 0, Math.PI * 2); ctx.fill();
                    ctx.restore();

                    ctx.fillStyle = 'rgba(0, 170, 255, 0.8)';
                    ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2); ctx.fill();

                    animationFrameId = requestAnimationFrame(render);
                };

                render();

                return () => {
                    window.removeEventListener('keydown', handleKeyDown);
                    window.removeEventListener('keyup', handleKeyUp);
                    window.removeEventListener('resize', handleResize);
                    window.removeEventListener('mousemove', handleMouseMove);
                    cancelAnimationFrame(animationFrameId);
                };
            }, []);

            return <canvas ref={canvasRef} className="fixed inset-0 -z-10 opacity-70" />;
        }

// Interactive Portfolio Application for Eduardo Gelain (SpetDev)
const { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback, createContext, useContext } = React;

const LanguageContext = createContext();

// Soft retro UI click sound using Web Audio API
const playSoftClick = () => {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {}
};






// --- SKY 2.0 CANVAS (THREE.JS GLB MODELS) ---
const SkyCanvasV2 = () => {
    const containerRef = useRef(null);
    const keysRef = useRef({});
    const sceneRef = useRef(null);

    const normalizeModel = (gltfScene, targetSize, isSkybox = false) => {
        const box = new THREE.Box3().setFromObject(gltfScene);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
            const scale = targetSize / maxDim;
            gltfScene.scale.setScalar(scale);
        }
        if (!isSkybox) {
            gltfScene.traverse(child => {
                if (child.isMesh) child.geometry.computeBoundingBox();
            });
        }
        return gltfScene;
    };

    useEffect(() => {
        if (!containerRef.current || !window.THREE) return;

        const scene = new THREE.Scene();
        sceneRef.current = scene;
        
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.z = 50;

        const renderer = new THREE.WebGLRenderer({
            powerPreference: 'high-performance',
            alpha: false,
            antialias: true,
            stencil: false,
            depth: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
        window.__spetRenderer = renderer;
        containerRef.current.appendChild(renderer.domElement);

        // Stronger lighting for Sky theme
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        scene.add(ambientLight);
        
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x888888, 1.5);
        scene.add(hemiLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
        dirLight.position.set(100, 200, 50);
        scene.add(dirLight);

        const loader = new THREE.GLTFLoader();
        
        const loadWithFallback = (localPath, onLoad, onError) => {
            const fileName = localPath.split('/').pop();
            const githubUrl = `https://raw.githubusercontent.com/Spet001/Spet001.github.io/main/3d/${fileName}`;
            loader.load(
                localPath,
                onLoad,
                undefined,
                (err) => {
                    console.warn(`[Sky 2.0] Failed loading local model ${localPath}, trying GitHub fallback ${githubUrl}`, err);
                    loader.load(githubUrl, onLoad, undefined, onError);
                }
            );
        };
        
        let skybox, jet, para, rope;

        // Fallback color in case skybox fails or is transparent
        scene.background = new THREE.Color('#87ceeb');

        // 1. Skybox
        loadWithFallback('/3d/skyclouds.glb', (gltf) => {
            skybox = gltf.scene;
            normalizeModel(skybox, 800, true);
            // DO NOT flip materials to BackSide, the model likely already points inwards!
            skybox.traverse((child) => {
                if (child.isMesh) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(m => { m.depthWrite = false; });
                    } else if (child.material) {
                        child.material.depthWrite = false;
                    }
                }
            });
            scene.add(skybox);
        }, (err) => console.error("Skybox failed:", err));

        // 2. Jet
        loadWithFallback('/3d/jet.glb', (gltf) => {
            jet = gltf.scene;
            normalizeModel(jet, 5); 
            
            // Fix Pitch Black Material (Disable metallic reflecting void)
            jet.traverse(child => {
                if (child.isMesh && child.material) {
                    child.material.metalness = 0.1;
                    child.material.roughness = 0.8;
                }
            });
            
            const jetGroup = new THREE.Group();
            jetGroup.position.set(0, 0, 10);
            
            // Reset rotation to 0 for debugging
            jet.rotation.set(0, 0, Math.PI * 1.5); 
            jet.position.set(0,0,0);
            
            jetGroup.add(jet);
            scene.add(jetGroup);
            jet = jetGroup; 
            
            // Debug Jet Rotation
            window.debugJet = jet.children[0];
        });

        // 3. Paratrooper
        loadWithFallback('/3d/Paratrooper.glb', (gltf) => {
            para = gltf.scene;
            normalizeModel(para, 2.0); 
            
            para.traverse(child => {
                if (child.isMesh && child.material) {
                    child.material.metalness = 0.0;
                    child.material.roughness = 1.0;
                }
            });
            
            // Make them hang down
            para.rotation.set(0, Math.PI, 0);
            
            para.position.set(5, -15, 10);
            scene.add(para);
        });

        // Rope
        const ropeGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
        const ropeMat = new THREE.LineBasicMaterial({ color: 0x555555, transparent: true, opacity: 0.6 });
        rope = new THREE.Line(ropeGeo, ropeMat);
        rope.frustumCulled = false;
        scene.add(rope);

        const _zeroMatrix = new THREE.Matrix4().makeScale(0, 0, 0);
        const _instMatrix = new THREE.Matrix4();
        const _instQuat = new THREE.Quaternion();
        const _instScale = new THREE.Vector3();

        // Jet Contrail (Smoke) — GPU Hardware InstancedMesh (1 draw call for all 80 particles)
        const particleCount = 80;
        const particles = [];
        const partGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        const smokeInstMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45, depthWrite: false });
        const smokeInstMesh = new THREE.InstancedMesh(partGeo, smokeInstMat, particleCount);
        smokeInstMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        smokeInstMesh.frustumCulled = false;
        for (let i = 0; i < particleCount; i++) {
            smokeInstMesh.setMatrixAt(i, _zeroMatrix);
            particles.push({ pos: new THREE.Vector3(), life: 0, maxLife: 1, velocity: new THREE.Vector3() });
        }
        smokeInstMesh.instanceMatrix.needsUpdate = true;
        scene.add(smokeInstMesh);
        let pIndex = 0;

        const mouse = new THREE.Vector2(0, 0);
        const paraVelocity = new THREE.Vector3();
        let viewW = window.innerWidth || 1;
        let viewH = window.innerHeight || 1;

        const handleMouseMove = (e) => {
            mouse.x = (e.clientX / viewW) * 2 - 1;
            mouse.y = -(e.clientY / viewH) * 2 + 1;
        };
        const handleKeyDown = (e) => { 
            keysRef.current[e.key] = true; 
            // Debug Jet Rotation
            if (window.debugJet) {
                if (e.key === 'x') window.debugJet.rotation.x += Math.PI / 2;
                if (e.key === 'y') window.debugJet.rotation.y += Math.PI / 2;
                if (e.key === 'z') window.debugJet.rotation.z += Math.PI / 2;
            }
        };
        const handleKeyUp = (e) => { keysRef.current[e.key] = false; };
        
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const handleResize = () => {
            viewW = window.innerWidth || 1;
            viewH = window.innerHeight || 1;
            camera.aspect = viewW / viewH;
            camera.updateProjectionMatrix();
            renderer.setSize(viewW, viewH);
        };
        window.addEventListener('resize', handleResize);

        const _mouseVec = new THREE.Vector3();
        const _dirVec = new THREE.Vector3();
        const _finalTarget = new THREE.Vector3();
        const _tailPos = new THREE.Vector3();
        const _moveDelta = new THREE.Vector3();
        const _tailOffset = new THREE.Vector3();
        const _tailDir = new THREE.Vector3();
        const _diff = new THREE.Vector3();
        const _pullBack = new THREE.Vector3();

        let animationId;
        let time = 0;
        let lastFrameTime = performance.now();
        let smokeSpawnAccum = 0;

        const animate = (now = performance.now()) => {
            animationId = requestAnimationFrame(animate);
            if (document.hidden) {
                lastFrameTime = now;
                return;
            }
            const rawDt = Math.max(0.001, Math.min((now - lastFrameTime) * 0.001, 0.05));
            lastFrameTime = now;
            const dtScale = rawDt * 60.0;
            time += 0.01 * dtScale;

            if (skybox) {
                skybox.rotation.y = time * 0.01; 
            }
            
            _mouseVec.set(mouse.x, mouse.y, 0.5).unproject(camera);
            _dirVec.copy(_mouseVec).sub(camera.position).normalize();
            const distance = (10 - camera.position.z) / _dirVec.z; 
            _finalTarget.copy(camera.position).addScaledVector(_dirVec, distance);

            let smokeDirty = false;

            if (jet) {
                jet.position.lerp(_finalTarget, 1 - Math.pow(1 - 0.06, dtScale));
                
                _moveDelta.copy(_finalTarget).sub(jet.position);
                if (_moveDelta.lengthSq() > 0.1) {
                    const angle = Math.atan2(_moveDelta.y, _moveDelta.x);
                    let targetRot = angle - Math.PI / 2;
                    let diff = targetRot - jet.rotation.z;
                    while (diff < -Math.PI) diff += Math.PI * 2;
                    while (diff > Math.PI) diff -= Math.PI * 2;
                    jet.rotation.z += diff * (1 - Math.pow(1 - 0.1, dtScale));
                    
                    jet.children[0].rotation.y = -diff * 0.5;
                }
                
                jet.children[0].position.y = Math.sin(time * 6) * 0.1;
                
                _tailOffset.set(0, -2.5, 0).applyEuler(jet.rotation);
                _tailPos.copy(jet.position).add(_tailOffset);
                _tailPos.y += jet.children[0].position.y; 

                smokeSpawnAccum += dtScale;
                if (smokeSpawnAccum >= 0.85) {
                    smokeSpawnAccum = 0;
                    const p = particles[pIndex];
                    p.life = Math.random() * 20 + 10;
                    p.maxLife = p.life;
                    p.pos.set(
                        _tailPos.x + (Math.random() - 0.5) * 0.5,
                        _tailPos.y + (Math.random() - 0.5) * 0.5,
                        _tailPos.z
                    );
                    _tailDir.set(0, -1, 0).applyEuler(jet.rotation).normalize();
                    p.velocity.set(
                        _tailDir.x * 0.15 + (Math.random() - 0.5) * 0.02,
                        _tailDir.y * 0.15 + (Math.random() - 0.5) * 0.02,
                        _tailDir.z * 0.15
                    );
                    pIndex = (pIndex + 1) % particleCount;
                }
            }

            for (let i = 0; i < particleCount; i++) {
                const p = particles[i];
                if (p.life > 0) {
                    p.life -= dtScale;
                    smokeDirty = true;
                    if (p.life <= 0) {
                        p.life = 0;
                        smokeInstMesh.setMatrixAt(i, _zeroMatrix);
                    } else {
                        p.pos.addScaledVector(p.velocity, dtScale);
                        const scale = (p.life / p.maxLife) * 1.5;
                        _instScale.set(scale, scale, scale);
                        _instMatrix.compose(p.pos, _instQuat, _instScale);
                        smokeInstMesh.setMatrixAt(i, _instMatrix);
                    }
                }
            }
            if (smokeDirty) smokeInstMesh.instanceMatrix.needsUpdate = true;

            if (para && jet) {
                _diff.copy(_tailPos).sub(para.position);
                const dist = _diff.length();
                const restingLength = 8.0; 
                
                if (dist > 0.0001) {
                    const force = (dist - restingLength) * 0.005 * dtScale; 
                    paraVelocity.addScaledVector(_diff, force / dist);
                }

                paraVelocity.y -= 0.015 * dtScale;

                const speed = 0.01 * dtScale;
                if (keysRef.current['ArrowLeft'] || keysRef.current['a']) { paraVelocity.x -= speed; }
                if (keysRef.current['ArrowRight'] || keysRef.current['d']) { paraVelocity.x += speed; }

                paraVelocity.multiplyScalar(Math.pow(0.92, dtScale)); 
                para.position.addScaledVector(paraVelocity, dtScale);
                
                if (dist > 16) {
                    const pullAlpha = (dist - 16) * (1 - Math.pow(1 - 0.1, dtScale)) / dist;
                    _pullBack.copy(_diff).multiplyScalar(pullAlpha);
                    para.position.add(_pullBack);
                }
                
                para.rotation.y = Math.sin(time) * 0.2; 
                para.rotation.z = -paraVelocity.x * 2; 
                
                if (rope) {
                    const positions = rope.geometry.attributes.position.array;
                    positions[0] = _tailPos.x; positions[1] = _tailPos.y; positions[2] = _tailPos.z;
                    positions[3] = para.position.x; positions[4] = para.position.y + 1.0; positions[5] = para.position.z;
                    rope.geometry.attributes.position.needsUpdate = true;
                }
            }

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('resize', handleResize);
            if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
                containerRef.current.removeChild(renderer.domElement);
            }
            if (sceneRef.current) {
                disposeHierarchy(sceneRef.current);
            }
            renderer.dispose();
        };
    }, []);

    return <div ref={containerRef} className="fixed inset-0 z-0 bg-black pointer-events-none" />;
};

// --- SPACE 2.0 CANVAS (THREE.JS GLB MODELS) ---
const SpaceCanvasV2 = ({ skyboxIndex = 0, onLoadingProgress, onLoaded }) => {
    const containerRef = useRef(null);
    const keysRef = useRef({});
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const loaderRef = useRef(null);
    const skyboxRef = useRef(null);
    const pendingAssetsRef = useRef(new Set(['moon', 'rocket', 'astronaut', 'asteroid1', 'asteroid2', 'nebula']));
    const isInitialMountRef = useRef(true);
    const [marsHoverInfo, setMarsHoverInfo] = useState(null);
    const hoveredMarsTargetRef = useRef(null);

    const onProgressRef = useRef(onLoadingProgress);
    const onLoadedRef = useRef(onLoaded);
    useEffect(() => {
        onProgressRef.current = onLoadingProgress;
        onLoadedRef.current = onLoaded;
    });

    const markAssetFinished = useCallback((key, label) => {
        if (!pendingAssetsRef.current.has(key)) return;
        pendingAssetsRef.current.delete(key);
        const loadedCount = 6 - pendingAssetsRef.current.size;
        const pct = Math.min(100, Math.round((loadedCount / 6) * 100));
        if (onProgressRef.current) {
            onProgressRef.current(pct, label);
        }
        if (pendingAssetsRef.current.size === 0) {
            // All 6 assets including the nebula skybox and models are fully initialized and added!
            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                try {
                    // Pre-compile shaders, geometries, and textures (including nebula background texture) into WebGL buffer
                    rendererRef.current.compile(sceneRef.current, cameraRef.current);
                    rendererRef.current.render(sceneRef.current, cameraRef.current);
                } catch(e) {
                    console.warn('[Space 2.0] Pre-render compile error:', e);
                }
            }
            if (onLoadedRef.current) {
                onLoadedRef.current();
            }
        }
    }, []);

    const normalizeModel = (gltfScene, targetSize, isSkybox = false) => {
        const box = new THREE.Box3().setFromObject(gltfScene);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
            const scale = targetSize / maxDim;
            gltfScene.scale.setScalar(scale);
        }
        if (!isSkybox) {
            gltfScene.traverse(child => {
                if (child.isMesh) child.geometry.computeBoundingBox();
            });
        }
        return gltfScene;
    };

    const createNormalizedPivot = (gltfScene, targetSize) => {
        const pivot = new THREE.Group();
        gltfScene.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(gltfScene);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
            const scale = targetSize / maxDim;
            gltfScene.scale.multiplyScalar(scale);
            gltfScene.updateMatrixWorld(true);
            const scaledBox = new THREE.Box3().setFromObject(gltfScene);
            const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
            gltfScene.position.sub(scaledCenter);
        }
        gltfScene.traverse(child => {
            if (child.isMesh) child.geometry.computeBoundingBox();
        });
        pivot.add(gltfScene);
        return pivot;
    };

    // Effect 1: Monolithic Setup & Initial Assets Loading
    useEffect(() => {
        if (!containerRef.current || !window.THREE) {
            if (onLoadedRef.current) onLoadedRef.current();
            return;
        }

        const scene = new THREE.Scene();
        sceneRef.current = scene;
        
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.z = 50;
        cameraRef.current = camera;

        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({
                powerPreference: 'high-performance',
                alpha: false,
                antialias: true,
                stencil: false,
                depth: true
            });
        } catch (err) {
            if (onLoadedRef.current) onLoadedRef.current();
            return;
        }
        renderer.setClearColor(0x000000, 1);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
        rendererRef.current = renderer;
        window.__spetRenderer = renderer;
        containerRef.current.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(100, 100, 50);
        scene.add(dirLight);

        const loader = new THREE.GLTFLoader();
        loaderRef.current = loader;

        // Robust Asset Loader
        const loadAsset = (localPath, key, label) => {
            return new Promise((resolve) => {
                loader.load(
                    localPath,
                    (gltf) => {
                        markAssetFinished(key, label);
                        resolve(gltf);
                    },
                    undefined,
                    (err) => {
                        console.error(`[Space 2.0] Error loading model ${localPath}:`, err);
                        markAssetFinished(key, label);
                        resolve(null);
                    }
                );
            });
        };
        
        let moon, rocket, astronaut, rope;
        let moonChicken = null;
        let isMoonChickenActive = Boolean(window.__spetMoonChickenActive);
        let moonJailson = null;
        let isDeliciaActive = Boolean(window.__spetDeliciaActive);
        let isMarsActive = Boolean(window.__spetMarsActive);
        let marsPivot = null;
        let marsLight = null;
        let phobosMesh = null;
        let deimosMesh = null;
        let earthPivot = null;
        let earthMoonMesh = null;
        let earthLight = null;
        let slayerPivot = null;
        const asteroids = [];
        let ast1, ast2;
        let spawned = false;
        let chickenModel = null;
        let isChickenMode = Boolean(window.__spetChickenActive);
        let orangeModel = null;

        const tagMarsTarget = (rootObj, targetId, hitRadius) => {
            rootObj.userData.marsTarget = targetId;
            rootObj.traverse((child) => {
                child.userData.marsTarget = targetId;
            });
            if (hitRadius > 0) {
                const hitGeo = new THREE.SphereGeometry(hitRadius, 14, 14);
                const hitMat = new THREE.MeshBasicMaterial({
                    transparent: true,
                    opacity: 0,
                    depthWrite: false
                });
                const hitMesh = new THREE.Mesh(hitGeo, hitMat);
                hitMesh.userData.marsTarget = targetId;
                rootObj.add(hitMesh);
            }
        };

        // Rope
        const ropeGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
        const ropeMat = new THREE.LineBasicMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.5 });
        rope = new THREE.Line(ropeGeo, ropeMat);
        rope.frustumCulled = false;
        scene.add(rope);

        const _zeroMatrix = new THREE.Matrix4().makeScale(0, 0, 0);
        const _instMatrix = new THREE.Matrix4();
        const _instQuat = new THREE.Quaternion();
        const _instScale = new THREE.Vector3();
        const _colorFire1 = new THREE.Color(0xff4400);
        const _colorFire2 = new THREE.Color(0xffaa00);

        // Fire Particles — Hardware GPU InstancedMesh (1 draw call for all 60 particles)
        const particleCount = 60;
        const particles = [];
        const partGeo = new THREE.BoxGeometry(0.15, 0.15, 0.15);
        const fireInstMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85, depthWrite: false });
        const fireInstMesh = new THREE.InstancedMesh(partGeo, fireInstMat, particleCount);
        fireInstMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        fireInstMesh.frustumCulled = false;
        for (let i = 0; i < particleCount; i++) {
            fireInstMesh.setMatrixAt(i, _zeroMatrix);
            fireInstMesh.setColorAt(i, _colorFire1);
            particles.push({ pos: new THREE.Vector3(), life: 0, maxLife: 1, velocity: new THREE.Vector3() });
        }
        fireInstMesh.instanceMatrix.needsUpdate = true;
        if (fireInstMesh.instanceColor) fireInstMesh.instanceColor.needsUpdate = true;
        scene.add(fireInstMesh);
        let pIndex = 0;

        // Oxygen Particles (Thruster) — Hardware GPU InstancedMesh (1 draw call for all 50 particles)
        const oxCount = 50;
        const oxParticles = [];
        const oxGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
        const oxInstMat = new THREE.MeshBasicMaterial({ color: 0xe0f7fa, transparent: true, opacity: 0.6, depthWrite: false });
        const oxInstMesh = new THREE.InstancedMesh(oxGeo, oxInstMat, oxCount);
        oxInstMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        oxInstMesh.frustumCulled = false;
        for (let i = 0; i < oxCount; i++) {
            oxInstMesh.setMatrixAt(i, _zeroMatrix);
            oxParticles.push({ pos: new THREE.Vector3(), life: 0, maxLife: 1, velocity: new THREE.Vector3() });
        }
        oxInstMesh.instanceMatrix.needsUpdate = true;
        scene.add(oxInstMesh);
        let oxIndex = 0;

        // Zero-allocation celestial collision avoidance (eliminates 4,800+ array/object allocations per second)
        const avoidSingleBody = (pos, bx, by, bz, br, cylindrical) => {
            const dx = pos.x - bx;
            const dy = pos.y - by;
            const dz = pos.z - bz;
            const distSq = cylindrical ? (dx * dx + dy * dy) : (dx * dx + dy * dy + dz * dz);
            if (distSq < br * br) {
                const dist2D = Math.hypot(dx, dy);
                const angle = dist2D > 0.001 ? Math.atan2(dy, dx) : (Math.random() * Math.PI * 2);
                const targetR = br + (cylindrical ? (2 + Math.random() * 8) : 1.5);
                pos.x = bx + Math.cos(angle) * targetR;
                pos.y = by + Math.sin(angle) * targetR;
            }
        };

        const avoidCelestialCollision = (pos, cylindrical = true) => {
            if (isMarsActive) {
                avoidSingleBody(pos, 12, 14, -30, 25, cylindrical);
                avoidSingleBody(pos, 44, -6, -32, 19, cylindrical);
            } else {
                const r = isMoonChickenActive ? 27 : (isDeliciaActive ? 24 : 16);
                avoidSingleBody(pos, 25, 15, -30, r, cylindrical);
            }
        };

        const performSwap = () => {
            for (let i = 0; i < asteroids.length; i++) {
                const oldMesh = asteroids[i];
                let newSource;
                if (isDeliciaActive && orangeModel) {
                    newSource = orangeModel;
                } else if (isChickenMode && chickenModel) {
                    newSource = chickenModel;
                } else if (ast1 || ast2) {
                    const isAst1 = Math.random() > 0.5;
                    newSource = (isAst1 ? ast1 : ast2) || ast1 || ast2;
                }
                if (!newSource) continue;

                const newMesh = newSource.clone();
                newMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

                if (isDeliciaActive && orangeModel) {
                    newMesh.position.set(
                        (Math.random() - 0.5) * 160,
                        (Math.random() - 0.5) * 110,
                        Math.random() * -120 - 10
                    );
                    newMesh.scale.multiplyScalar(Math.random() * 0.4 + 0.85);
                    newMesh.userData = {
                        speed: Math.random() * 0.5 + 0.3,
                        rotSpeedX: (Math.random() - 0.5) * 0.05,
                        rotSpeedY: (Math.random() - 0.5) * 0.06,
                        rotSpeedZ: (Math.random() - 0.5) * 0.05
                    };
                } else if (isChickenMode) {
                    newMesh.position.set(
                        (Math.random() - 0.5) * 160,
                        (Math.random() - 0.5) * 110,
                        Math.random() * -110 - 10
                    );
                    newMesh.scale.multiplyScalar(Math.random() * 0.5 + 0.9);
                    newMesh.userData = {
                        speed: Math.random() * 0.5 + 0.25,
                        rotSpeedX: (Math.random() - 0.5) * 0.03,
                        rotSpeedY: (Math.random() - 0.5) * 0.05,
                        rotSpeedZ: (Math.random() - 0.5) * 0.03
                    };
                } else {
                    newMesh.position.set(
                        (Math.random() - 0.5) * 150,
                        (Math.random() - 0.5) * 100,
                        Math.random() * -300 - 50
                    );
                    newMesh.scale.multiplyScalar(Math.random() * 0.5 + 0.5);
                    newMesh.userData = {
                        speed: Math.random() * 0.8 + 0.2, 
                        rotSpeedX: (Math.random() - 0.5) * 0.04,
                        rotSpeedY: (Math.random() - 0.5) * 0.04,
                        rotSpeedZ: (Math.random() - 0.5) * 0.04
                    };
                }
                avoidCelestialCollision(newMesh.position, true);

                scene.remove(oldMesh);
                scene.add(newMesh);
                asteroids[i] = newMesh;
            }
        };

        const syncCelestialVisibility = () => {
            const showMars = isMarsActive;
            if (marsPivot) marsPivot.visible = showMars;
            if (marsLight) marsLight.visible = showMars;
            if (phobosMesh) phobosMesh.visible = showMars;
            if (deimosMesh) deimosMesh.visible = showMars;
            if (earthPivot) earthPivot.visible = showMars;
            if (earthMoonMesh) earthMoonMesh.visible = showMars;
            if (earthLight) earthLight.visible = showMars;
            if (slayerPivot) slayerPivot.visible = showMars;
            if (astronaut) astronaut.visible = !showMars;

            if (showMars) {
                if (moon) moon.visible = false;
                if (moonChicken) moonChicken.visible = false;
                if (moonJailson) moonJailson.visible = false;
            } else if (isDeliciaActive) {
                if (moon) moon.visible = false;
                if (moonChicken) moonChicken.visible = false;
                if (moonJailson) moonJailson.visible = true;
            } else if (isMoonChickenActive) {
                if (moon) moon.visible = false;
                if (moonChicken) moonChicken.visible = true;
                if (moonJailson) moonJailson.visible = false;
            } else {
                if (moon) moon.visible = true;
                if (moonChicken) moonChicken.visible = false;
                if (moonJailson) moonJailson.visible = false;
            }

            if (!showMars && hoveredMarsTargetRef.current) {
                hoveredMarsTargetRef.current = null;
                document.body.style.cursor = '';
                setMarsHoverInfo(null);
            }
        };

        const swapAsteroids = (toChicken) => {
            isChickenMode = toChicken;
            window.__spetChickenActive = toChicken;
            if (!toChicken) {
                isMoonChickenActive = false;
                window.__spetMoonChickenActive = false;
                syncCelestialVisibility();
            }

            if (toChicken && !chickenModel) {
                loader.load('/3d/space_chicken!.glb', (gltf) => {
                    chickenModel = gltf.scene;
                    normalizeModel(chickenModel, 18);
                    chickenModel.traverse((child) => {
                        if (child.isMesh && child.material) {
                            child.material.metalness = 0.05;
                            child.material.roughness = 0.35;
                        }
                    });
                    performSwap();
                }, undefined, (err) => {
                    console.error('[Space 2.0] Failed to load space chicken model:', err);
                });
            } else {
                performSwap();
            }
        };

        const handleChickenToggle = (e) => {
            const desired = (typeof e.detail?.enabled === 'boolean') ? e.detail.enabled : !isChickenMode;
            swapAsteroids(desired);
        };
        window.addEventListener('spet:chicken-toggle', handleChickenToggle);

        const handleMoonChickenToggle = (e) => {
            isMoonChickenActive = (typeof e.detail?.enabled === 'boolean') ? e.detail.enabled : !isMoonChickenActive;
            window.__spetMoonChickenActive = isMoonChickenActive;
            if (isMoonChickenActive && isMarsActive) {
                isMarsActive = false;
                window.__spetMarsActive = false;
            }

            if (isMoonChickenActive && !moonChicken) {
                loader.load('/3d/space_chicken!.glb', (gltf) => {
                    moonChicken = gltf.scene;
                    normalizeModel(moonChicken, 42);
                    moonChicken.position.set(25, 15, -30);
                    moonChicken.traverse((child) => {
                        if (child.isMesh && child.material) {
                            child.material.metalness = 0.05;
                            child.material.roughness = 0.35;
                        }
                    });
                    scene.add(moonChicken);
                    syncCelestialVisibility();
                }, undefined, (err) => {
                    console.error('[Space 2.0] Failed to load moon chicken model:', err);
                });
            } else {
                syncCelestialVisibility();
            }
        };
        window.addEventListener('spet:moon-chicken-toggle', handleMoonChickenToggle);

        const handleDeliciaToggle = (e) => {
            isDeliciaActive = (typeof e.detail?.enabled === 'boolean') ? e.detail.enabled : !isDeliciaActive;
            window.__spetDeliciaActive = isDeliciaActive;
            if (isDeliciaActive && isMarsActive) {
                isMarsActive = false;
                window.__spetMarsActive = false;
            }

            const applyDeliciaState = () => {
                syncCelestialVisibility();
                performSwap();
            };

            const ensureJailson = (cb) => {
                if (isDeliciaActive && !moonJailson) {
                    loader.load('/3d/jailson.glb', (gltf) => {
                        moonJailson = gltf.scene;
                        normalizeModel(moonJailson, 35);
                        moonJailson.position.set(25, 15, -30);
                        moonJailson.traverse((child) => {
                            if (child.isMesh && child.material) {
                                child.material.metalness = 0.05;
                                child.material.roughness = 0.4;
                            }
                        });
                        scene.add(moonJailson);
                        cb();
                    }, undefined, (err) => {
                        console.error('[Space 2.0] Failed to load Jailson model:', err);
                        cb();
                    });
                } else {
                    cb();
                }
            };

            const ensureOrange = (cb) => {
                if (isDeliciaActive && !orangeModel) {
                    loader.load('/3d/orange.glb', (gltf) => {
                        orangeModel = gltf.scene;
                        normalizeModel(orangeModel, 4.5);
                        orangeModel.traverse((child) => {
                            if (child.isMesh && child.material) {
                                child.material.metalness = 0.05;
                                child.material.roughness = 0.5;
                            }
                        });
                        cb();
                    }, undefined, (err) => {
                        console.error('[Space 2.0] Failed to load Orange model:', err);
                        cb();
                    });
                } else {
                    cb();
                }
            };

            ensureJailson(() => {
                ensureOrange(() => {
                    applyDeliciaState();
                });
            });
        };
        window.addEventListener('spet:delicia-toggle', handleDeliciaToggle);

        const ensureMarsAssets = () => {
            // 1. Mars + Phobos + Deimos
            if (!marsPivot) {
                loader.load('/3d/mars.glb', (gltf) => {
                    marsPivot = createNormalizedPivot(gltf.scene, 21);
                    marsPivot.position.set(12, 14, -30);
                    scene.add(marsPivot);

                    marsLight = new THREE.PointLight(0xff5522, 1.8, 300);
                    marsLight.position.copy(marsPivot.position);
                    scene.add(marsLight);

                    syncCelestialVisibility();
                }, undefined, (err) => {
                    console.error('[Space 2.0] Failed to load Mars model:', err);
                });
            }

            if (!phobosMesh && (ast1 || ast2)) {
                const phobosClone = (ast1 || ast2).clone(true);
                phobosClone.scale.setScalar(1);
                phobosClone.position.set(0, 0, 0);
                phobosClone.traverse((child) => {
                    if (child.isMesh && child.material) {
                        const mats = Array.isArray(child.material) ? child.material.map(m => m.clone()) : [child.material.clone()];
                        mats.forEach(m => {
                            if (m.color) m.color.setHex(0xb86b52); // Rusty Phobos regolith
                            if (m.emissive) m.emissive.setHex(0x2a0d06);
                            m.roughness = 0.85;
                            m.metalness = 0.08;
                        });
                        child.material = Array.isArray(child.material) ? mats : mats[0];
                    }
                });
                phobosMesh = createNormalizedPivot(phobosClone, 3.6);
                phobosMesh.position.set(-2, 18, -26);
                tagMarsTarget(phobosMesh, 'phobos', 2.9);
                scene.add(phobosMesh);
            }

            if (!deimosMesh && (ast2 || ast1)) {
                const deimosClone = (ast2 || ast1).clone(true);
                deimosClone.scale.setScalar(1);
                deimosClone.position.set(0, 0, 0);
                deimosClone.traverse((child) => {
                    if (child.isMesh && child.material) {
                        const mats = Array.isArray(child.material) ? child.material.map(m => m.clone()) : [child.material.clone()];
                        mats.forEach(m => {
                            if (m.color) m.color.setHex(0xd9be8b); // Pale ochre Deimos regolith
                            if (m.emissive) m.emissive.setHex(0x241909);
                            m.roughness = 0.8;
                            m.metalness = 0.08;
                        });
                        child.material = Array.isArray(child.material) ? mats : mats[0];
                    }
                });
                deimosMesh = createNormalizedPivot(deimosClone, 2.8);
                deimosMesh.position.set(28, 22, -28);
                tagMarsTarget(deimosMesh, 'deimos', 2.5);
                scene.add(deimosMesh);
            }

            // 2. Earth + Orbiting Moon on the right side
            if (!earthPivot) {
                loader.load('/3d/earth.glb', (gltf) => {
                    earthPivot = createNormalizedPivot(gltf.scene, 15);
                    earthPivot.position.set(44, -6, -32);
                    tagMarsTarget(earthPivot, 'earth', 8.5);
                    scene.add(earthPivot);

                    earthLight = new THREE.PointLight(0x88ccff, 1.3, 220);
                    earthLight.position.set(38, 0, -24);
                    scene.add(earthLight);

                    syncCelestialVisibility();
                }, undefined, (err) => {
                    console.error('[Space 2.0] Failed to load Earth model:', err);
                });
            }

            if (!earthMoonMesh) {
                const createEarthMoonFromScene = (srcScene) => {
                    if (earthMoonMesh) return;
                    const moonClone = srcScene.clone(true);
                    moonClone.scale.setScalar(1);
                    moonClone.position.set(0, 0, 0);
                    earthMoonMesh = createNormalizedPivot(moonClone, 3.8);
                    earthMoonMesh.position.set(54, -4, -30);
                    scene.add(earthMoonMesh);
                    syncCelestialVisibility();
                };
                if (moon) {
                    createEarthMoonFromScene(moon);
                } else {
                    loader.load('/3d/moon.glb', (gltf) => createEarthMoonFromScene(gltf.scene));
                }
            }

            // 3. Doom Slayer replacing Astronaut on the rocket rope
            if (!slayerPivot) {
                loader.load('/3d/slayer.glb', (gltf) => {
                    slayerPivot = createNormalizedPivot(gltf.scene, 2.3);
                    if (astronaut) {
                        slayerPivot.position.copy(astronaut.position);
                    } else {
                        slayerPivot.position.set(5, -5, 10);
                    }
                    scene.add(slayerPivot);
                    syncCelestialVisibility();
                }, undefined, (err) => {
                    console.error('[Space 2.0] Failed to load Doom Slayer model:', err);
                });
            }

            syncCelestialVisibility();
        };

        const handleMarsToggle = (e) => {
            isMarsActive = (typeof e.detail?.enabled === 'boolean') ? e.detail.enabled : !isMarsActive;
            window.__spetMarsActive = isMarsActive;

            if (isMarsActive) {
                if (isDeliciaActive) {
                    isDeliciaActive = false;
                    window.__spetDeliciaActive = false;
                    window.dispatchEvent(new CustomEvent('spet:delicia-toggle', { detail: { enabled: false } }));
                }
                if (isMoonChickenActive) {
                    isMoonChickenActive = false;
                    window.__spetMoonChickenActive = false;
                }
                ensureMarsAssets();
            } else {
                syncCelestialVisibility();
            }
        };
        window.addEventListener('spet:mars-toggle', handleMarsToggle);

        const checkSpawn = () => {
            if (ast1 && ast2 && !spawned) {
                spawned = true;
                for (let i = 0; i < 40; i++) {
                    const isAst1 = Math.random() > 0.5;
                    const baseSource = (isDeliciaActive && orangeModel) ? orangeModel : ((isChickenMode && chickenModel) ? chickenModel : (isAst1 ? ast1 : ast2));
                    const mesh = baseSource.clone();
                    
                    if (isDeliciaActive && orangeModel) {
                        mesh.position.set(
                            (Math.random() - 0.5) * 160,
                            (Math.random() - 0.5) * 110,
                            Math.random() * -120 - 10
                        );
                        mesh.scale.multiplyScalar(Math.random() * 0.4 + 0.85);
                        mesh.userData = {
                            speed: Math.random() * 0.5 + 0.3, 
                            rotSpeedX: (Math.random() - 0.5) * 0.05,
                            rotSpeedY: (Math.random() - 0.5) * 0.06,
                            rotSpeedZ: (Math.random() - 0.5) * 0.05
                        };
                    } else if (isChickenMode) {
                        mesh.position.set(
                            (Math.random() - 0.5) * 160,
                            (Math.random() - 0.5) * 110,
                            Math.random() * -110 - 10
                        );
                        mesh.scale.multiplyScalar(Math.random() * 0.5 + 0.9);
                        mesh.userData = {
                            speed: Math.random() * 0.5 + 0.25, 
                            rotSpeedX: (Math.random() - 0.5) * 0.03,
                            rotSpeedY: (Math.random() - 0.5) * 0.05,
                            rotSpeedZ: (Math.random() - 0.5) * 0.03
                        };
                    } else {
                        mesh.position.set(
                            (Math.random() - 0.5) * 150,
                            (Math.random() - 0.5) * 100,
                            Math.random() * -300 - 50
                        );
                        mesh.scale.multiplyScalar(Math.random() * 0.5 + 0.5); 
                        mesh.userData = {
                            speed: Math.random() * 0.8 + 0.2, 
                            rotSpeedX: (Math.random() - 0.5) * 0.04,
                            rotSpeedY: (Math.random() - 0.5) * 0.04,
                            rotSpeedZ: (Math.random() - 0.5) * 0.04
                        };
                    }
                    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
                    avoidCelestialCollision(mesh.position, true);
                    
                    scene.add(mesh);
                    asteroids.push(mesh);
                }
            }
        };

        // PARALLEL ASSET PIPELINE (Ensures non-blocking, fast concurrent model loading)
        const loadNebula = async () => {
            const initialNebulaPath = `/3d/nebula${skyboxIndex}.glb`;
            const nebulaGltf = await loadAsset(initialNebulaPath, 'nebula', 'Nebula Skybox Background');
            if (nebulaGltf) {
                const nebula = nebulaGltf.scene;
                const box = new THREE.Box3().setFromObject(nebula);
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                if (maxDim > 0) {
                    nebula.scale.setScalar(800 / maxDim);
                }
                nebula.traverse((child) => {
                    if (child.isMesh) {
                        const mats = Array.isArray(child.material) ? child.material : [child.material];
                        mats.forEach(m => {
                            m.side = THREE.DoubleSide;
                            m.depthWrite = false;
                            if (m.map) m.map.needsUpdate = true;
                            if (m.emissiveMap) m.emissiveMap.needsUpdate = true;
                        });
                    }
                });
                scene.add(nebula);
                skyboxRef.current = nebula;
            }
        };

        const loadMoon = async () => {
            const moonGltf = await loadAsset('/3d/moon.glb', 'moon', 'Moon / Lua');
            if (moonGltf) {
                moon = moonGltf.scene;
                normalizeModel(moon, 20); 
                moon.position.set(25, 15, -30); 
                if (isMoonChickenActive || isDeliciaActive || isMarsActive) {
                    moon.visible = false;
                }
                scene.add(moon);
                
                const moonLight = new THREE.PointLight(0xaaccff, 1.5, 300);
                moonLight.position.copy(moon.position);
                scene.add(moonLight);
            }
        };

        const loadRocket = async () => {
            const rocketGltf = await loadAsset('/3d/rocket.glb', 'rocket', 'Rocket / Foguete');
            if (rocketGltf) {
                rocket = rocketGltf.scene;
                normalizeModel(rocket, 4); 
                
                const rocketGroup = new THREE.Group();
                rocketGroup.position.set(0, 0, 10);
                rocket.rotation.z = 0; 
                rocket.position.set(0,0,0);
                rocketGroup.add(rocket);
                scene.add(rocketGroup);
                rocket = rocketGroup; 
            }
        };

        const loadAstronaut = async () => {
            const astroGltf = await loadAsset('/3d/Astronaut.glb', 'astronaut', 'Astronaut / Astronauta');
            if (astroGltf) {
                astronaut = astroGltf.scene;
                normalizeModel(astronaut, 1.5); 
                astronaut.position.set(5, -5, 10);
                if (isMarsActive) astronaut.visible = false;
                scene.add(astronaut);
            }
        };

        const loadAsteroids = async () => {
            const [ast1Gltf, ast2Gltf] = await Promise.all([
                loadAsset('/3d/asteroid1.glb', 'asteroid1', 'Asteroid Field 1'),
                loadAsset('/3d/asteroid2.glb', 'asteroid2', 'Asteroid Field 2')
            ]);
            if (ast1Gltf) {
                ast1 = ast1Gltf.scene;
                normalizeModel(ast1, 3);
            }
            if (ast2Gltf) {
                ast2 = ast2Gltf.scene;
                normalizeModel(ast2, 3);
            }
            checkSpawn();
        };

        Promise.all([
            loadNebula(),
            loadMoon(),
            loadRocket(),
            loadAstronaut(),
            loadAsteroids()
        ]).then(() => {
            if (window.__spetChickenActive) {
                loader.load('/3d/space_chicken!.glb', (gltf) => {
                    chickenModel = gltf.scene;
                    normalizeModel(chickenModel, 18);
                    chickenModel.traverse((child) => {
                        if (child.isMesh && child.material) {
                            child.material.metalness = 0.05;
                            child.material.roughness = 0.35;
                        }
                    });
                    if (spawned) swapAsteroids(true);
                });
            }

            if (window.__spetMoonChickenActive) {
                loader.load('/3d/space_chicken!.glb', (gltf) => {
                    moonChicken = gltf.scene;
                    normalizeModel(moonChicken, 42);
                    moonChicken.position.set(25, 15, -30);
                    moonChicken.traverse((child) => {
                        if (child.isMesh && child.material) {
                            child.material.metalness = 0.05;
                            child.material.roughness = 0.35;
                        }
                    });
                    scene.add(moonChicken);
                    syncCelestialVisibility();
                });
            }

            if (window.__spetDeliciaActive) {
                loader.load('/3d/jailson.glb', (gltf) => {
                    moonJailson = gltf.scene;
                    normalizeModel(moonJailson, 35);
                    moonJailson.position.set(25, 15, -30);
                    moonJailson.traverse((child) => {
                        if (child.isMesh && child.material) {
                            child.material.metalness = 0.05;
                            child.material.roughness = 0.4;
                        }
                    });
                    scene.add(moonJailson);
                    syncCelestialVisibility();
                });
                loader.load('/3d/orange.glb', (gltf) => {
                    orangeModel = gltf.scene;
                    normalizeModel(orangeModel, 4.5);
                    orangeModel.traverse((child) => {
                        if (child.isMesh && child.material) {
                            child.material.metalness = 0.05;
                            child.material.roughness = 0.5;
                        }
                    });
                    if (spawned) performSwap();
                });
            }

            if (window.__spetMarsActive) {
                ensureMarsAssets();
            }
        });

        // Emergency fallback timeout only (60s) to never prematurely dismiss before large 3D models & nebula load
        const safetyTimeout = setTimeout(() => {
            if (pendingAssetsRef.current.size > 0) {
                console.warn("[Space 2.0] Emergency 60s timeout reached, clearing remaining pending assets:", Array.from(pendingAssetsRef.current));
                pendingAssetsRef.current.clear();
                if (rendererRef.current && sceneRef.current && cameraRef.current) {
                    try { rendererRef.current.render(sceneRef.current, cameraRef.current); } catch(e) {}
                }
                if (onLoadedRef.current) onLoadedRef.current();
            }
        }, 60000);

        // Interactivity & Raycasting for Mars Mode
        const mouse = new THREE.Vector2(0, 0);
        const _marsPickNdc = new THREE.Vector2(0, 0);
        const raycaster = new THREE.Raycaster();
        const astroVelocity = new THREE.Vector3();
        let viewW = window.innerWidth || 1;
        let viewH = window.innerHeight || 1;

        const isOverInteractiveUI = (target) => {
            if (!target || !(target instanceof Element)) return false;
            return Boolean(target.closest('button, a, input, textarea, select, label, [role="dialog"], [role="button"], nav, iframe'));
        };

        const pickMarsTarget = (clientX, clientY) => {
            if (!isMarsActive) return null;
            const targets = [phobosMesh, deimosMesh, earthPivot].filter(Boolean);
            if (targets.length === 0) return null;
            _marsPickNdc.set(
                (clientX / viewW) * 2 - 1,
                -(clientY / viewH) * 2 + 1
            );
            raycaster.setFromCamera(_marsPickNdc, camera);
            const hits = raycaster.intersectObjects(targets, true);
            for (const hit of hits) {
                let obj = hit.object;
                while (obj) {
                    if (obj.userData && obj.userData.marsTarget) {
                        return obj.userData.marsTarget;
                    }
                    obj = obj.parent;
                }
            }
            return null;
        };

        const handleMouseMove = (e) => {
            mouse.x = (e.clientX / viewW) * 2 - 1;
            mouse.y = -(e.clientY / viewH) * 2 + 1;

            if (!isMarsActive) return;
            if (isOverInteractiveUI(e.target)) {
                if (hoveredMarsTargetRef.current) {
                    hoveredMarsTargetRef.current = null;
                    document.body.style.cursor = '';
                    setMarsHoverInfo(null);
                }
                return;
            }

            const hitTarget = pickMarsTarget(e.clientX, e.clientY);
            if (hitTarget) {
                hoveredMarsTargetRef.current = hitTarget;
                document.body.style.cursor = 'pointer';
                setMarsHoverInfo({ target: hitTarget, x: e.clientX, y: e.clientY });
            } else if (hoveredMarsTargetRef.current) {
                hoveredMarsTargetRef.current = null;
                document.body.style.cursor = '';
                setMarsHoverInfo(null);
            }
        };

        const handleSceneClick = (e) => {
            if (!isMarsActive) return;
            if (isOverInteractiveUI(e.target)) return;
            const hitTarget = pickMarsTarget(e.clientX, e.clientY);
            if (!hitTarget) return;

            const gameMap = {
                phobos: 'doom_e1m1',
                deimos: 'doom_e2m1',
                earth: 'doom_2'
            };
            const gameId = gameMap[hitTarget];
            if (gameId) {
                hoveredMarsTargetRef.current = null;
                document.body.style.cursor = '';
                setMarsHoverInfo(null);
                window.dispatchEvent(new CustomEvent('spet:open-easter-game', { detail: { game: gameId } }));
            }
        };

        const handleKeyDown = (e) => { 
            keysRef.current[e.key] = true; 
            // Debug Jet Rotation
            if (window.debugJet) {
                if (e.key === 'x') window.debugJet.rotation.x += Math.PI / 2;
                if (e.key === 'y') window.debugJet.rotation.y += Math.PI / 2;
                if (e.key === 'z') window.debugJet.rotation.z += Math.PI / 2;
            }
        };
        const handleKeyUp = (e) => { keysRef.current[e.key] = false; };
        
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('click', handleSceneClick);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const handleResize = () => {
            viewW = window.innerWidth || 1;
            viewH = window.innerHeight || 1;
            camera.aspect = viewW / viewH;
            camera.updateProjectionMatrix();
            renderer.setSize(viewW, viewH);
        };
        window.addEventListener('resize', handleResize);

        // Pre-allocated scratch vectors to eliminate V8 Garbage Collection spikes at 120-240 FPS
        const _mouseVec = new THREE.Vector3();
        const _dirVec = new THREE.Vector3();
        const _finalTarget = new THREE.Vector3();
        const _tailPos = new THREE.Vector3();
        const _moveDelta = new THREE.Vector3();
        const _tailOffset = new THREE.Vector3();
        const _tailDir = new THREE.Vector3();
        const _diff = new THREE.Vector3();
        const _pullBack = new THREE.Vector3();
        const _velStep = new THREE.Vector3();
        const _defaultMarsCenter = { x: 12, y: 14, z: -30 };

        let animationId;
        let time = 0;
        let marsOrbitTime = 0;
        let lastFrameTime = performance.now();
        let fireSpawnAccum = 0;
        let oxSpawnAccum = 0;

        const animate = (now = performance.now()) => {
            animationId = requestAnimationFrame(animate);
            if (document.hidden) {
                lastFrameTime = now;
                return;
            }

            // Frame-rate independent delta time normalized to 60Hz reference (smooth 120Hz / 144Hz / 240Hz)
            const rawDt = Math.max(0.001, Math.min((now - lastFrameTime) * 0.001, 0.05));
            lastFrameTime = now;
            const dtScale = rawDt * 60.0;
            const stepTime = 0.01 * dtScale;

            time += stepTime;
            if (!hoveredMarsTargetRef.current) {
                marsOrbitTime += stepTime;
            }

            if (skyboxRef.current) {
                skyboxRef.current.rotation.y = time * 0.02; 
                skyboxRef.current.rotation.x = Math.sin(time * 0.01) * 0.1;
            }
            if (moon && moon.visible) {
                moon.rotation.y = time * 0.1; 
            }
            if (moonChicken && isMoonChickenActive) {
                moonChicken.rotation.y += 0.06 * dtScale; // Fast spinning mega chicken!
                moonChicken.rotation.x = Math.sin(time * 3) * 0.12; 
                moonChicken.rotation.z = Math.cos(time * 2.5) * 0.08;
            }
            if (moonJailson && isDeliciaActive) {
                moonJailson.rotation.y += 0.035 * dtScale;
                moonJailson.rotation.x = Math.sin(time * 2) * 0.08;
            }
            if (isMarsActive) {
                if (marsPivot) {
                    marsPivot.rotation.y = time * 0.12;
                }
                const marsCenter = marsPivot ? marsPivot.position : _defaultMarsCenter;
                if (phobosMesh) {
                    const pAngle = marsOrbitTime * 0.45 + 0.5;
                    const pR = 16.0;
                    const pTilt = 0.35;
                    phobosMesh.position.set(
                        marsCenter.x + Math.cos(pAngle) * pR,
                        marsCenter.y + Math.sin(pAngle) * Math.sin(pTilt) * pR,
                        marsCenter.z + Math.sin(pAngle) * Math.cos(pTilt) * pR
                    );
                    phobosMesh.rotation.y = time * 0.45;
                    phobosMesh.rotation.x = time * 0.25;
                }
                if (deimosMesh) {
                    const dAngle = marsOrbitTime * 0.28 + 3.4;
                    const dR = 21.5;
                    const dTilt = -0.42;
                    deimosMesh.position.set(
                        marsCenter.x + Math.cos(dAngle) * dR,
                        marsCenter.y + Math.sin(dAngle) * Math.sin(dTilt) * dR,
                        marsCenter.z + Math.sin(dAngle) * Math.cos(dTilt) * dR
                    );
                    deimosMesh.rotation.y = -time * 0.35;
                    deimosMesh.rotation.z = time * 0.2;
                }
                if (earthPivot) {
                    earthPivot.rotation.y = time * 0.15;
                    if (earthMoonMesh) {
                        const mAngle = marsOrbitTime * 0.55;
                        const mR = 12.5;
                        const mTilt = 0.32;
                        earthMoonMesh.position.set(
                            earthPivot.position.x + Math.cos(mAngle) * mR,
                            earthPivot.position.y + Math.sin(mAngle) * Math.sin(mTilt) * mR,
                            earthPivot.position.z + Math.sin(mAngle) * Math.cos(mTilt) * mR
                        );
                        earthMoonMesh.rotation.y = time * 0.4;
                    }
                }
            }
            
            _mouseVec.set(mouse.x, mouse.y, 0.5).unproject(camera);
            _dirVec.copy(_mouseVec).sub(camera.position).normalize();
            const distance = (10 - camera.position.z) / _dirVec.z; 
            _finalTarget.copy(camera.position).addScaledVector(_dirVec, distance);

            let fireColorDirty = false;
            let fireMatrixDirty = false;
            let oxMatrixDirty = false;

            if (rocket) {
                const lerpAlpha = 1 - Math.pow(1 - 0.08, dtScale);
                rocket.position.lerp(_finalTarget, lerpAlpha);
                
                _moveDelta.copy(_finalTarget).sub(rocket.position);
                if (_moveDelta.lengthSq() > 0.1) {
                    const angle = Math.atan2(_moveDelta.y, _moveDelta.x);
                    let targetRot = angle - Math.PI / 2;
                    let diff = targetRot - rocket.rotation.z;
                    while (diff < -Math.PI) diff += Math.PI * 2;
                    while (diff > Math.PI) diff -= Math.PI * 2;
                    rocket.rotation.z += diff * (1 - Math.pow(1 - 0.1, dtScale));
                }
                
                rocket.children[0].position.y = Math.sin(time * 5) * 0.2;
                
                _tailOffset.set(0, -2.2, 0).applyEuler(rocket.rotation);
                _tailPos.copy(rocket.position).add(_tailOffset);
                _tailPos.y += rocket.children[0].position.y; 

                fireSpawnAccum += dtScale;
                if (fireSpawnAccum >= 0.85) {
                    fireSpawnAccum = 0;
                    const p = particles[pIndex];
                    p.life = Math.random() * 15 + 10;
                    p.maxLife = p.life;
                    p.pos.set(
                        _tailPos.x + (Math.random() - 0.5) * 0.3,
                        _tailPos.y + (Math.random() - 0.5) * 0.3,
                        _tailPos.z
                    );
                    fireInstMesh.setColorAt(pIndex, Math.random() > 0.5 ? _colorFire1 : _colorFire2);
                    fireColorDirty = true;
                    
                    _tailDir.set(0, -1, 0).applyEuler(rocket.rotation).normalize();
                    p.velocity.set(
                        _tailDir.x * 0.2 + (Math.random() - 0.5) * 0.05,
                        _tailDir.y * 0.2 + (Math.random() - 0.5) * 0.05,
                        _tailDir.z * 0.2
                    );
                    pIndex = (pIndex + 1) % particleCount;
                }
            }

            for (let i = 0; i < particleCount; i++) {
                const p = particles[i];
                if (p.life > 0) {
                    p.life -= dtScale;
                    fireMatrixDirty = true;
                    if (p.life <= 0) {
                        p.life = 0;
                        fireInstMesh.setMatrixAt(i, _zeroMatrix);
                    } else {
                        p.pos.addScaledVector(p.velocity, dtScale);
                        const scale = (p.life / p.maxLife) * 1.5;
                        _instScale.set(scale, scale, scale);
                        _instMatrix.compose(p.pos, _instQuat, _instScale);
                        fireInstMesh.setMatrixAt(i, _instMatrix);
                    }
                }
            }
            if (fireMatrixDirty) fireInstMesh.instanceMatrix.needsUpdate = true;
            if (fireColorDirty && fireInstMesh.instanceColor) fireInstMesh.instanceColor.needsUpdate = true;

            for (let i = 0; i < oxCount; i++) {
                const p = oxParticles[i];
                if (p.life > 0) {
                    p.life -= dtScale;
                    oxMatrixDirty = true;
                    if (p.life <= 0) {
                        p.life = 0;
                        oxInstMesh.setMatrixAt(i, _zeroMatrix);
                    } else {
                        p.pos.addScaledVector(p.velocity, dtScale);
                        const scale = (p.life / p.maxLife) * 1.2;
                        _instScale.set(scale, scale, scale);
                        _instMatrix.compose(p.pos, _instQuat, _instScale);
                        oxInstMesh.setMatrixAt(i, _instMatrix);
                    }
                }
            }

            if (astronaut && rocket) {
                _diff.copy(_tailPos).sub(astronaut.position);
                const dist = _diff.length();
                const restingLength = 6.0; 
                
                if (dist > 0.0001) {
                    const force = (dist - restingLength) * 0.002 * dtScale; 
                    astroVelocity.addScaledVector(_diff, force / dist);
                }

                const speed = 0.015 * dtScale;
                let isThrusting = false;
                if (keysRef.current['ArrowUp'] || keysRef.current['w'] || keysRef.current['W']) { astroVelocity.y += speed; isThrusting = true; }
                if (keysRef.current['ArrowDown'] || keysRef.current['s'] || keysRef.current['S']) { astroVelocity.y -= speed; isThrusting = true; }
                if (keysRef.current['ArrowLeft'] || keysRef.current['a'] || keysRef.current['A']) { astroVelocity.x -= speed; isThrusting = true; }
                if (keysRef.current['ArrowRight'] || keysRef.current['d'] || keysRef.current['D']) { astroVelocity.x += speed; isThrusting = true; }

                if (isThrusting) {
                    oxSpawnAccum += dtScale;
                    if (oxSpawnAccum >= 0.85) {
                        oxSpawnAccum = 0;
                        const p = oxParticles[oxIndex];
                        p.life = Math.random() * 20 + 10;
                        p.maxLife = p.life;
                        p.pos.set(astronaut.position.x, astronaut.position.y - 0.3, astronaut.position.z);
                        p.velocity.set((Math.random() - 0.5) * 0.04, -0.04 - Math.random() * 0.04, (Math.random() - 0.5) * 0.04);
                        _instScale.set(1, 1, 1);
                        _instMatrix.compose(p.pos, _instQuat, _instScale);
                        oxInstMesh.setMatrixAt(oxIndex, _instMatrix);
                        oxMatrixDirty = true;
                        oxIndex = (oxIndex + 1) % oxCount;
                    }
                }

                astroVelocity.multiplyScalar(Math.pow(0.98, dtScale)); 
                astronaut.position.addScaledVector(astroVelocity, dtScale);
                
                if (dist > 12) {
                    const pullAlpha = (dist - 12) * (1 - Math.pow(1 - 0.1, dtScale)) / dist;
                    _pullBack.copy(_diff).multiplyScalar(pullAlpha);
                    astronaut.position.add(_pullBack);
                }
                
                astronaut.rotation.y = time * 0.5;
                astronaut.rotation.z = -astroVelocity.x * 2;

                if (slayerPivot && isMarsActive) {
                    slayerPivot.position.copy(astronaut.position);
                    slayerPivot.rotation.copy(astronaut.rotation);
                }
                
                if (rope) {
                    const positions = rope.geometry.attributes.position.array;
                    positions[0] = _tailPos.x; positions[1] = _tailPos.y; positions[2] = _tailPos.z;
                    positions[3] = astronaut.position.x; positions[4] = astronaut.position.y + 0.5; positions[5] = astronaut.position.z;
                    rope.geometry.attributes.position.needsUpdate = true;
                }
            }
            if (oxMatrixDirty) oxInstMesh.instanceMatrix.needsUpdate = true;

            for (let i = 0; i < asteroids.length; i++) {
                const ast = asteroids[i];
                ast.position.z += ast.userData.speed * dtScale;
                ast.rotation.x += ast.userData.rotSpeedX * dtScale;
                ast.rotation.y += ast.userData.rotSpeedY * dtScale;
                ast.rotation.z += ast.userData.rotSpeedZ * dtScale;
                avoidCelestialCollision(ast.position, false);

                if (ast.position.z > (isChickenMode ? 40 : 60)) {
                    if (isChickenMode) {
                        ast.position.z = Math.random() * -110 - 20; 
                        ast.position.x = (Math.random() - 0.5) * 160;
                        ast.position.y = (Math.random() - 0.5) * 110;
                    } else {
                        ast.position.z = Math.random() * -200 - 150; 
                        ast.position.x = (Math.random() - 0.5) * 250;
                        ast.position.y = (Math.random() - 0.5) * 150;
                    }
                    avoidCelestialCollision(ast.position, true);
                }
            }

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            clearTimeout(safetyTimeout);
            cancelAnimationFrame(animationId);
            document.body.style.cursor = '';
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleSceneClick);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('spet:chicken-toggle', handleChickenToggle);
            window.removeEventListener('spet:moon-chicken-toggle', handleMoonChickenToggle);
            window.removeEventListener('spet:delicia-toggle', handleDeliciaToggle);
            window.removeEventListener('spet:mars-toggle', handleMarsToggle);
            if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
                containerRef.current.removeChild(renderer.domElement);
            }
            if (sceneRef.current) {
                disposeHierarchy(sceneRef.current);
            }
            renderer.dispose();
        };
    }, []);

    // Effect 2: Swap Skyboxes ONLY when user changes skybox in settings (skip initial mount)
    useEffect(() => {
        if (isInitialMountRef.current) {
            isInitialMountRef.current = false;
            return;
        }
        if (!sceneRef.current || !loaderRef.current) return;
        const scene = sceneRef.current;
        const loader = loaderRef.current;
        
        if (skyboxRef.current) {
            scene.remove(skyboxRef.current);
            disposeHierarchy(skyboxRef.current);
            skyboxRef.current = null;
        }

        const nebulaPath = `/3d/nebula${skyboxIndex}.glb`;
        const fileName = `nebula${skyboxIndex}.glb`;
        const githubUrl = `https://raw.githubusercontent.com/Spet001/Spet001.github.io/main/3d/${fileName}`;

        const applyNebula = (gltf) => {
            const nebula = gltf.scene;
            const box = new THREE.Box3().setFromObject(nebula);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            if (maxDim > 0) {
                nebula.scale.setScalar(800 / maxDim);
            }
            nebula.traverse((child) => {
                if (child.isMesh) {
                    const mats = Array.isArray(child.material) ? child.material : [child.material];
                    mats.forEach(m => {
                        m.side = THREE.DoubleSide;
                        m.depthWrite = false;
                        if (m.map) m.map.needsUpdate = true;
                        if (m.emissiveMap) m.emissiveMap.needsUpdate = true;
                    });
                }
            });
            scene.add(nebula);
            skyboxRef.current = nebula;
        };

        loader.load(
            nebulaPath,
            applyNebula,
            undefined,
            (e) => {
                console.error(`[Space 2.0] Failed to load skybox ${nebulaPath}:`, e);
            }
        );
    }, [skyboxIndex]);

    const hoverLabels = {
        phobos: { title: 'UAC TELEMETRY // PHOBOS', sub: 'CLICK TO LAUNCH DOOM — E1M1: HANGAR' },
        deimos: { title: 'UAC TELEMETRY // DEIMOS', sub: 'CLICK TO LAUNCH DOOM — E2M1: DEIMOS ANOMALY' },
        earth: { title: 'UAC TELEMETRY // EARTH', sub: 'CLICK TO LAUNCH DOOM II: HELL ON EARTH' }
    };

    return (
        <>
            <div ref={containerRef} className="fixed inset-0 z-0 bg-black pointer-events-none" />
            {marsHoverInfo && hoverLabels[marsHoverInfo.target] && (
                <div
                    style={{
                        left: Math.min(window.innerWidth - 290, marsHoverInfo.x + 18) + 'px',
                        top: Math.max(16, marsHoverInfo.y - 18) + 'px'
                    }}
                    className="fixed z-50 pointer-events-none bg-black/90 border border-red-700/80 px-3 py-1.5 font-mono text-[11px] shadow-lg"
                >
                    <div className="text-amber-300 font-bold tracking-wider">
                        {hoverLabels[marsHoverInfo.target].title}
                    </div>
                    <div className="text-neutral-300 text-[10px]">
                        {hoverLabels[marsHoverInfo.target].sub}
                    </div>
                </div>
            )}
        </>
    );
};






// --- MASS EFFECT SOUND SYSTEM ---
const playCosmicSfx = (sfxKey, settings = {}) => {
    try {
        const master = (settings?.masterVolume ?? 40) / 100;
        const sfx = (settings?.sfxVolume ?? 40) / 100;
        // Soft, gentle SFX volume (user requested lower volume for SFX)
        const realVol = Math.min(1.0, master * sfx * 0.28);
        if (realVol <= 0.002) return;

        const files = {
            warp: '/audio/mass effect/ME - Ambient - Mass Relay Jump.m4a',
            anomaly: '/audio/mass effect/ME - EDI - Anomally Detected.m4a',
            scan: '/audio/mass effect/ME - EDI - Scans Found Something.m4a',
            blip: '/audio/mass effect/ME - Interface - Triple Blip.m4a',
            project: '/audio/mass effect/ME - Interface - War Asset.m4a',
            terminal: '/audio/mass effect/ME - Glyph- Terminal Updated.m4a'
        };
        const src = files[sfxKey];
        if (!src) return;
        const audio = new Audio(src);
        audio.volume = Math.max(0, Math.min(1, realVol));
        audio.play().catch(() => {});
    } catch (e) {}
};

// --- DYNAMIC SECTOR BACKGROUND MUSIC MANAGER ---
const CosmicTrackPlayer = ({
    activeSectorTrack,
    settings,
    isJukeboxActive,
    isEasterActive = false,
    lang
}) => {
    const iframeRef = useRef(null);
    const [isMuted, setIsMuted] = useState(false);

    const trackMap = {
        galaxy: { id: '0Wqo4RrT7F0', title: 'Mass Effect — Galaxy Map Theme (Uncharted Worlds)' },
        core: { id: '0Wqo4RrT7F0', title: 'Mass Effect — Galaxy Map Theme' },
        gamedev: { id: 'KI58_0T07Vs', title: 'Starfield OST — Into the Starfield' },
        lowlevel: { id: 'UBLOvSb56Vc', title: 'Mass Effect 2 OST — The Illusive Man' },
        tools: { id: '2HQaBWziYvY', title: 'Mass Effect — Normandy Theme' },
        solar: { id: 'BSsfjHCFosw', title: 'DOOM OST — At Doom\'s Gate (E1M1)' },
        delicia: { id: '9wVmCLtuUx0', title: 'Jailson Mendes — Música para Relaxar (Delícia Theme)' },
        chicken: { id: '0Wqo4RrT7F0', title: 'Mass Effect — Galaxy Map Theme' }
    };

    const trackInfo = trackMap[activeSectorTrack] || trackMap.galaxy;
    const targetVideoId = trackInfo.id;

    const masterVol = (settings?.masterVolume ?? 40) / 100;
    const musicVol = (settings?.musicVolume ?? 40) / 100;
    const effectiveMusicVol = Math.max(0, Math.min(100, Math.round(masterVol * musicVol * 100)));

    const sendCommand = (func, args = []) => {
        try {
            if (iframeRef.current && iframeRef.current.contentWindow) {
                iframeRef.current.contentWindow.postMessage(
                    JSON.stringify({ event: 'command', func, args }),
                    '*'
                );
            }
        } catch (e) {}
    };

    const shouldMute = isMuted || isJukeboxActive || isEasterActive || !targetVideoId;

    useEffect(() => {
        if (!iframeRef.current) return;
        const timer = setTimeout(() => {
            if (shouldMute) {
                sendCommand('mute');
                sendCommand('pauseVideo');
            } else {
                sendCommand('unMute');
                sendCommand('playVideo');
                sendCommand('setVolume', [effectiveMusicVol]);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [activeSectorTrack, effectiveMusicVol, shouldMute]);

    return (
        <React.Fragment>
            <div className="hidden pointer-events-none opacity-0 select-none" aria-hidden="true">
                <iframe
                    ref={iframeRef}
                    key={targetVideoId}
                    width="1"
                    height="1"
                    src={`https://www.youtube.com/embed/${targetVideoId}?enablejsapi=1&autoplay=1&loop=1&playlist=${targetVideoId}&controls=0&disablekb=1&fs=0&modestbranding=1&playsinline=1`}
                    title="Dynamic Cosmic Ambient Audio"
                    allow="autoplay"
                    onLoad={() => {
                        if (!isMuted && !isJukeboxActive) {
                            sendCommand('setVolume', [effectiveMusicVol]);
                            sendCommand('unMute');
                            sendCommand('playVideo');
                        } else {
                            sendCommand('mute');
                        }
                    }}
                />
            </div>
            {!isJukeboxActive && settings?.musicPlayer && targetVideoId && (
                <div className="fixed bottom-4 left-4 z-40 hidden sm:flex items-center gap-2 px-3 py-1.5 bg-black/85 border border-white/10 rounded-full text-xs text-slate-300 backdrop-blur-md shadow-lg select-none">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span className="font-mono text-[10px] text-cyan-300 font-semibold truncate max-w-[200px]">
                        {trackInfo?.title}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-200 font-mono">
                        {effectiveMusicVol}%
                    </span>
                    <button
                        type="button"
                        onClick={() => setIsMuted(prev => !prev)}
                        className="text-slate-400 hover:text-white ml-1 cursor-pointer"
                        title={isMuted ? (lang === 'pt' ? 'Ativar som' : 'Unmute') : (lang === 'pt' ? 'Mutar' : 'Mute')}
                    >
                        <i className={`fas ${isMuted ? 'fa-volume-mute text-rose-400' : 'fa-volume-low text-cyan-400'} text-[10px]`}></i>
                    </button>
                </div>
            )}
        </React.Fragment>
    );
};

// Full Space 3.0 Cosmic Engine & Galaxy Map implementation (Mass Effect 3 Inspired)
// Full Space 3.0 Cosmic Engine & Galaxy Map implementation (Mass Effect 3 Inspired)
const SpaceCanvasV3 = ({
    skyboxIndex = 0,
    onLoadingProgress,
    onLoaded,
    lang = 'pt',
    settings = {},
    isFullscreenGalaxyMode = false,
    onExitFullscreenGalaxy,
    onToggleUI,
    isJukeboxPlaying = false,
    isEasterGameOpen: propIsEasterGameOpen = false
}) => {
    const containerRef = useRef(null);
    const overlayRef = useRef(null);
    const [viewMode, setViewMode] = useState('GALAXY_MAP'); // 'GALAXY_MAP' | 'SECTOR_FLIGHT'
    const [activeClusterId, setActiveClusterId] = useState('core');
    const [activeTrack, setActiveTrack] = useState('galaxy');
    const [unlockedSectors, setUnlockedSectors] = useState(() => {
        try {
            const saved = localStorage.getItem('spet_unlocked_sectors');
            return saved ? JSON.parse(saved) : { delicia: false, solar: true, chicken: false };
        } catch (e) {
            return { delicia: false, solar: true, chicken: false };
        }
    });
    const [showAttributions, setShowAttributions] = useState(false);
    const [selectedProjectCard, setSelectedProjectCard] = useState(null);
    const [warpCinematic, setWarpCinematic] = useState({ active: false, targetName: '', progress: 0 });
    const [isEasterGameOpen, setIsEasterGameOpen] = useState(false);
    const isAnyEasterGameOpen = Boolean(propIsEasterGameOpen || isEasterGameOpen);

    useEffect(() => {
        const onOpenEaster = () => setIsEasterGameOpen(true);
        const onCloseEaster = () => setIsEasterGameOpen(false);
        window.addEventListener('spet:open-easter-game', onOpenEaster);
        window.addEventListener('spet:close-easter-game', onCloseEaster);
        return () => {
            window.removeEventListener('spet:open-easter-game', onOpenEaster);
            window.removeEventListener('spet:close-easter-game', onCloseEaster);
        };
    }, []);

    const onProgressRef = useRef(onLoadingProgress);
    const onLoadedRef = useRef(onLoaded);
    useEffect(() => { onProgressRef.current = onLoadingProgress; }, [onLoadingProgress]);
    useEffect(() => { onLoadedRef.current = onLoaded; }, [onLoaded]);

    const unlockSector = useCallback((sectorId) => {
        setUnlockedSectors(prev => {
            const next = { ...prev, [sectorId]: true };
            try { localStorage.setItem('spet_unlocked_sectors', JSON.stringify(next)); } catch (e) {}
            return next;
        });
    }, []);

    // 17 Real Projects mapped to 4 Primary Clusters + 3 Special Secret Clusters!
    const CLUSTERS = useMemo(() => [
        {
            id: 'core',
            name: { pt: 'Sistemas Centrais', en: 'Core Systems' },
            subtitle: { pt: 'Portfólio Web & Technical Journal', en: 'Web Portfolio & Technical Journal' },
            track: 'core',
            pos: new THREE.Vector3(0, 0, 0),
            color: 0x38bdf8,
            gold: true,
            nebulaPalette: {
                c1: new THREE.Vector3(0.04, 0.62, 0.56),
                c2: new THREE.Vector3(0.08, 0.52, 0.88),
                c3: new THREE.Vector3(0.32, 0.12, 0.65),
                c4: new THREE.Vector3(0.95, 0.45, 0.12)
            },
            planets: [
                {
                    id: 'portfolio_web',
                    projectId: 'portfolio_web',
                    name: 'Portfólio Web (SpetDev)',
                    palette: 'terran',
                    radius: 4.8,
                    pos: new THREE.Vector3(-14, 0, -45),
                    models: [{ path: '/3d/spetdev_logo.glb', scale: 3.2, orbitDist: 2.8, orbitAngleOffset: 0 }],
                    rotSpeed: 0.28,
                    desc: { pt: 'Experiência 3D Interativa em React, Three.js & Tailwind', en: 'Interactive 3D Experience with React, Three.js & Tailwind' },
                    tags: ['React', 'Three.js', 'Tailwind', 'GLTF', 'Web Audio']
                },
                {
                    id: 'technical_journal',
                    projectId: 'technical_journal',
                    name: 'Technical Journal (Artigos & Engenharia Reversa)',
                    palette: 'gas_cyan',
                    radius: 5.6,
                    pos: new THREE.Vector3(18, 5, -125),
                    hasRings: true,
                    models: [{ path: '/3d/journal.glb', scale: 3.5, orbitDist: 3.0, orbitAngleOffset: 0, attribution: '"Journal" by FlukierJupiter (CC-BY 4.0)' }],
                    rotSpeed: 0.22,
                    desc: { pt: 'Artigos Técnicos, Engenharia Reversa & Otimização de Performance', en: 'Technical Articles, Reverse Engineering & Performance Research' },
                    tags: ['Journal', 'Reverse Engineering', 'Three.js', 'Low-Level']
                }
            ]
        },
        {
            id: 'gamedev',
            name: { pt: 'Setor de Game Dev & Engines', en: 'Game Dev & Engines Sector' },
            subtitle: { pt: 'Jogos, Protótipos Unity & Assets 3D', en: 'Games, Unity Prototypes & 3D Assets' },
            track: 'gamedev',
            pos: new THREE.Vector3(-16.5, 0, 10.5),
            color: 0x22c55e,
            nebulaPalette: {
                c1: new THREE.Vector3(0.05, 0.45, 0.25),
                c2: new THREE.Vector3(0.12, 0.72, 0.35),
                c3: new THREE.Vector3(0.15, 0.25, 0.55),
                c4: new THREE.Vector3(0.65, 0.95, 0.32)
            },
            planets: [
                {
                    id: 'sparky_rush_qa',
                    projectId: 'sparky_rush_qa',
                    name: 'Sparky Rush: Purrils in Pawsville (Steam QA)',
                    palette: 'terran',
                    radius: 4.4,
                    pos: new THREE.Vector3(-18, -3, -40),
                    models: [{ path: '/3d/sparky_rush_3d_logo.glb', scale: 3.0, orbitDist: 2.8, orbitAngleOffset: 0 }],
                    rotSpeed: 0.35,
                    desc: { pt: 'Controle de Qualidade & Testes de QA (Lançado na Steam)', en: 'Quality Assurance & Regression Testing (Steam Release)' },
                    tags: ['QA', 'Steam', 'Testing', 'Bug Hunting']
                },
                {
                    id: 'outcaster_fps',
                    projectId: 'outcaster_fps',
                    name: 'Outcaster - Retro FPS Templates',
                    palette: 'lava',
                    radius: 4.8,
                    pos: new THREE.Vector3(16, 4, -85),
                    models: [{ path: '/3d/pistol_overheat_1.glb', scale: 3.6, orbitDist: 2.9, orbitAngleOffset: 0 }],
                    rotSpeed: 0.30,
                    desc: { pt: 'Template Boomer Shooter Modular em Unity 6 & C#', en: 'Modular Boomer Shooter Template in Unity 6 & C#' },
                    tags: ['Unity', 'C#', 'Game Design', 'Retro FPS']
                },
                {
                    id: 'pau_no_gato_game',
                    projectId: 'pau_no_gato_game',
                    name: 'Atirei o Pau no Gato',
                    palette: 'desert',
                    radius: 3.8,
                    pos: new THREE.Vector3(-15, 5, -130),
                    models: [{ path: '/3d/cop.glb', scale: 3.2, orbitDist: 2.7, orbitAngleOffset: 0 }],
                    rotSpeed: 0.40,
                    desc: { pt: 'Jogo Indie Brasileiro de Plataforma & Ação', en: 'Brazilian Indie Platformer Action Game' },
                    tags: ['GameDev', 'Indie', 'Unity', 'Action']
                },
                {
                    id: 'free_3d_assets',
                    projectId: 'free_3d_assets',
                    name: 'Free to Use 3D Assets (Low Poly)',
                    palette: 'ice',
                    radius: 4.2,
                    pos: new THREE.Vector3(18, -4, -175),
                    hasRings: true,
                    models: [{ path: '/3d/Paratrooper.glb', scale: 3.4, orbitDist: 2.8, orbitAngleOffset: 0 }],
                    rotSpeed: 0.25,
                    desc: { pt: 'Modelos 3D Low-Poly Gratuitos para a Comunidade', en: 'Free Low-Poly 3D Assets for Game Developers' },
                    tags: ['Blender', '3D Modeling', 'Low Poly', 'Free Assets']
                },
                {
                    id: 'projecty_mdpro_web',
                    projectId: 'projecty_mdpro_web',
                    name: 'Meta Slave Planet (ProjectY)',
                    palette: 'moon',
                    radius: 4.6,
                    pos: new THREE.Vector3(-12, 2, -220),
                    // Dual orbiting cards: Ryzeal Detonator + Tearlaments Kitkallos!
                    models: [
                        { path: '/3d/ryzealdetonator_YGO.glb', scale: 3.6, orbitDist: 3.2, orbitAngleOffset: 0 },
                        { path: '/3d/tearlamentskitkallos_YGO.glb', scale: 3.6, orbitDist: 3.2, orbitAngleOffset: Math.PI }
                    ],
                    rotSpeed: 0.32,
                    desc: { pt: 'ProjectY - MDPro Web (Yu-Gi-Oh Simulator)', en: 'ProjectY - MDPro Web (Yu-Gi-Oh Simulator)' },
                    tags: ['WebAssembly', 'C++', 'Networking', 'Card Game']
                }
            ]
        },
        {
            id: 'lowlevel',
            name: { pt: 'Setor de Baixo Nível & Reversing', en: 'Low-Level & Reversing Sector' },
            subtitle: { pt: 'Engenharia Reversa, Injeção DLL & Bytecode VM', en: 'Reverse Engineering, DLL Injection & Bytecode VM' },
            track: 'lowlevel',
            pos: new THREE.Vector3(-19.5, 0, -13.5),
            color: 0xa855f7,
            nebulaPalette: {
                c1: new THREE.Vector3(0.35, 0.08, 0.55),
                c2: new THREE.Vector3(0.55, 0.12, 0.85),
                c3: new THREE.Vector3(0.12, 0.25, 0.65),
                c4: new THREE.Vector3(0.85, 0.42, 0.95)
            },
            planets: [
                {
                    id: 'resurge_client',
                    projectId: 'resurge_client',
                    name: 'Resurge Client (BO3 Multi-Platform)',
                    palette: 'gas_cyan',
                    radius: 4.8,
                    pos: new THREE.Vector3(-18, 4, -40),
                    hasRings: true,
                    models: [{ path: '/3d/logo_bo3.glb', scale: 3.2, orbitDist: 2.8, orbitAngleOffset: 0 }],
                    rotSpeed: 0.30,
                    desc: { pt: 'Cliente Cross-Platform para Black Ops 3 (Linux, Windows, Steam Deck)', en: 'Cross-Platform Client for Black Ops 3 (Linux, Windows, Steam Deck)' },
                    tags: ['C++', 'Reverse Engineering', 'Multi-Platform', 'Networking']
                },
                {
                    id: 'cw_gsc_injector',
                    projectId: 'cw_gsc_injector',
                    name: 'CW GSC Injector (MS Store / Xbox PC)',
                    palette: 'ice',
                    radius: 4.2,
                    pos: new THREE.Vector3(16, -3, -75),
                    models: [{ path: '/3d/ray_gun.glb', scale: 3.2, orbitDist: 2.8, orbitAngleOffset: 0, attribution: '"RaY Gun" by SovietCream (CC-BY 4.0)' }],
                    rotSpeed: 0.34,
                    desc: { pt: 'Injetor de Scripts GSC em Tempo de Execução', en: 'Runtime GSC Script Injector for Cold War' },
                    tags: ['C++', 'Assembly x64', 'Memory Injection', 'GSC']
                },
                {
                    id: 'bo2_bo1_msclients',
                    projectId: 'bo2_bo1_msclients',
                    name: 'BO1 & BO2 MS Store Clients & GSC Injector',
                    palette: 'moon',
                    radius: 4.5,
                    pos: new THREE.Vector3(-15, -4, -110),
                    models: [{ path: '/3d/ram_stick.glb', scale: 3.4, orbitDist: 2.9, orbitAngleOffset: 0 }],
                    rotSpeed: 0.28,
                    desc: { pt: 'Compatibilidade MS Store / Game Pass PC para Clássicos CoD', en: 'MS Store / Game Pass PC Port & Compatibility for Classic CoD' },
                    tags: ['Reverse Engineering', 'Hooking', 'DirectX', 'C++']
                },
                {
                    id: 'gsc_dumps_and_sources',
                    projectId: 'gsc_dumps_and_sources',
                    name: 'GSC Dumps and Pre-Compiled/Uncompiled Sources',
                    palette: 'desert',
                    radius: 4.0,
                    pos: new THREE.Vector3(17, 5, -145),
                    models: [{ path: '/3d/mystery_box.glb', scale: 3.2, orbitDist: 2.8, orbitAngleOffset: 0, attribution: '"Mystery Box" by MDTOWERZ (CC-BY 4.0)' }],
                    rotSpeed: 0.32,
                    desc: { pt: 'GSC Dumps & Descompilador de Opcodes VM', en: 'GSC Dumps & Opcode VM Decompiler' },
                    tags: ['Bytecode VM', 'Decompiler', 'Reverse Engineering']
                },
                {
                    id: 't6_gsc_mods',
                    projectId: 't6_gsc_mods',
                    name: 'Modos de Jogo Open Source T6 (GSC)',
                    palette: 'lava',
                    radius: 4.5,
                    pos: new THREE.Vector3(19, -4, -180),
                    // Dual orbiting models: Nuke (sleek 1.6 scale) + Juggernog (PBR lit)!
                    models: [
                        { path: '/3d/spet_t6_nuke.glb', scale: 1.6, orbitDist: 2.8, orbitAngleOffset: 0 },
                        { path: '/3d/jugger.glb', scale: 3.0, orbitDist: 2.8, orbitAngleOffset: Math.PI }
                    ],
                    rotSpeed: 0.38,
                    desc: { pt: 'Modos Customizados Open Source para Black Ops 2 Zombies & MP', en: 'Open Source Custom Modes for Black Ops 2 Zombies & MP' },
                    tags: ['GSC', 'Modding', 'Black Ops II', 'Game Logic']
                },
                {
                    id: 't9_mod_manager_re',
                    projectId: 't9_mod_manager_re',
                    name: 'Desbloqueie no Patreon! (Script Tool RE)',
                    palette: 'moon',
                    radius: 4.1,
                    pos: new THREE.Vector3(-17, 6, -220),
                    // Lock and Key on the Patreon locked entry!
                    models: [{ path: '/3d/lock_and_key.glb', scale: 3.2, orbitDist: 2.7, orbitAngleOffset: 0, attribution: '"Lock And Key" by Mehdi Shahsavan (CC-BY 4.0)' }],
                    rotSpeed: 0.30,
                    desc: { pt: 'Engenharia Reversa de Gerenciador de Scripts (Patreon Confidencial)', en: 'Script Manager Binary Decompilation (Patreon Confidential)' },
                    tags: ['C#', '.NET', 'Reverse Engineering', 'Static Analysis']
                },
                {
                    id: 'bo2_crossplay_relay',
                    projectId: 'bo2_crossplay_relay',
                    name: 'Desbloqueie no Patreon! (BO2 Crossplay Relay)',
                    palette: 'gas_cyan',
                    radius: 4.3,
                    pos: new THREE.Vector3(16, -5, -255),
                    models: [{ path: '/3d/space_satellite.glb', scale: 3.5, orbitDist: 3.0, orbitAngleOffset: 0 }],
                    rotSpeed: 0.26,
                    desc: { pt: 'Relay de Rede Peer-to-Peer Crossplay (Patreon Confidencial)', en: 'Crossplay Peer-to-Peer Network Relay (Patreon Confidential)' },
                    tags: ['UDP Socket', 'Relay', 'Crossplay', 'Patreon']
                }
            ]
        },
        {
            id: 'tools',
            name: { pt: 'Setor Tools & Ferramentas', en: 'Tools & Utilities Sector' },
            subtitle: { pt: 'Suíte Web (/tools), Utilitários Electron & Mods', en: 'In-Browser Web Tools (/tools), Electron & Modding' },
            track: 'tools',
            pos: new THREE.Vector3(18.5, 0, -11.5),
            color: 0xf59e0b,
            nebulaPalette: {
                c1: new THREE.Vector3(0.55, 0.35, 0.05),
                c2: new THREE.Vector3(0.85, 0.55, 0.12),
                c3: new THREE.Vector3(0.45, 0.15, 0.12),
                c4: new THREE.Vector3(0.95, 0.82, 0.22)
            },
            planets: [
                {
                    id: 'spet_web_tools_suite',
                    projectId: 'spet_web_tools_suite',
                    name: "Spet's Web Tools & Reverse Engineering Suite",
                    palette: 'gas_cyan',
                    radius: 5.2,
                    pos: new THREE.Vector3(18, -4, -185),
                    hasRings: true,
                    models: [{ path: '/3d/ram_stick.glb', scale: 3.5, orbitDist: 3.0, orbitAngleOffset: 0 }],
                    rotSpeed: 0.35,
                    desc: {
                        pt: "Suíte WebAssembly (/tools): Descompilador C-like & Game File Opener (25+ Engines)",
                        en: "In-Browser WASM Suite (/tools): C-like Decompiler & Game File Opener (25+ Engines)"
                    },
                    tags: ['WebAssembly', 'Rizin Core', 'Ghidra Sleigh', 'Game Archives', 'Three.js']
                },
                {
                    id: 'fable3_fixer',
                    projectId: 'fable3_fixer',
                    name: 'Fable 3 Fixer (App Electron)',
                    palette: 'terran',
                    radius: 4.4,
                    pos: new THREE.Vector3(-16, 3, -40),
                    models: [{ path: '/3d/guild_seal.glb', scale: 3.4, orbitDist: 2.8, orbitAngleOffset: 0 }],
                    rotSpeed: 0.34,
                    desc: { pt: 'Utilitário Electron para Restaurar DLCs e Conectividade GFWL', en: 'Electron Utility to Restore DLCs & GFWL Connectivity' },
                    tags: ['Electron', 'Node.js', 'Patching', 'GFWL']
                },
                {
                    id: 'ff13_fix_ms_store',
                    projectId: 'ff13_fix_ms_store',
                    name: 'FF13Fix for Microsoft Store',
                    palette: 'ice',
                    radius: 4.8,
                    pos: new THREE.Vector3(17, -4, -90),
                    models: [{ path: '/3d/cactuar_final_fantasy.glb', scale: 3.6, orbitDist: 2.8, orbitAngleOffset: 0, attribution: '"Cactuar (Final Fantasy)" by mescri (CC-BY 4.0)' }],
                    rotSpeed: 0.28,
                    desc: { pt: 'Port do FF13Fix para a versão Microsoft Store do Xbox PC', en: 'FF13Fix Port for Xbox PC / Microsoft Store Version' },
                    tags: ['C++', 'DirectX 9', 'Frame Pacing', 'Hooks']
                },
                {
                    id: 'autoparms_yakuza',
                    projectId: 'autoparms_yakuza',
                    name: 'AutoParMS - Yakuza Mod Toolkit',
                    palette: 'desert',
                    radius: 4.2,
                    pos: new THREE.Vector3(-14, 5, -140),
                    models: [{ path: '/3d/kamuro_sign.glb', scale: 3.5, orbitDist: 2.8, orbitAngleOffset: 0 }],
                    rotSpeed: 0.32,
                    desc: { pt: 'AutoParMS Yakuza (Dragon Engine Modder)', en: 'AutoParMS Yakuza (Dragon Engine Modder)' },
                    tags: ['Python', 'File Parser', 'Dragon Engine']
                }
            ]
        },
        {
            id: 'solar',
            isSpecialSystem: true,
            name: { pt: 'Sistema Solar (UAC Telemetry)', en: 'Solar System (UAC Telemetry)' },
            subtitle: { pt: 'Terra, Lua, Marte, Fobos, Deimos & DOOM', en: 'Earth, Moon, Mars, Phobos, Deimos & DOOM' },
            track: 'solar',
            pos: new THREE.Vector3(19.0, 0, 14.0),
            color: 0xef4444,
            nebulaPalette: {
                c1: new THREE.Vector3(0.65, 0.08, 0.04),
                c2: new THREE.Vector3(0.88, 0.22, 0.06),
                c3: new THREE.Vector3(0.22, 0.12, 0.35),
                c4: new THREE.Vector3(1.00, 0.45, 0.12)
            },
            planets: []
        },
        {
            id: 'delicia',
            isSecret: true,
            isSpecialSystem: true,
            name: { pt: 'Setor Secreto Delícia', en: 'Secret Delícia Sector' },
            subtitle: { pt: 'Jailson Mendes & Laranjas Espaciais', en: 'Jailson Mendes & Space Oranges' },
            track: 'delicia',
            pos: new THREE.Vector3(11.0, 0, -22.0),
            color: 0xf97316,
            nebulaPalette: {
                c1: new THREE.Vector3(0.75, 0.32, 0.02),
                c2: new THREE.Vector3(0.95, 0.52, 0.08),
                c3: new THREE.Vector3(0.35, 0.12, 0.02),
                c4: new THREE.Vector3(1.00, 0.75, 0.15)
            },
            planets: []
        },
        {
            id: 'chicken',
            isSecret: true,
            isSpecialSystem: true,
            name: { pt: 'Setor Secreto das Galinhas', en: 'Secret Poultry Sector' },
            subtitle: { pt: 'Mega Chicken & Asteroides Cósmicos', en: 'Mega Chicken & Cosmic Asteroids' },
            track: 'chicken',
            pos: new THREE.Vector3(-22.0, 0, -11.0),
            color: 0x38bdf8,
            nebulaPalette: {
                c1: new THREE.Vector3(0.12, 0.45, 0.88),
                c2: new THREE.Vector3(0.35, 0.75, 1.00),
                c3: new THREE.Vector3(0.65, 0.32, 0.85),
                c4: new THREE.Vector3(0.95, 0.85, 0.25)
            },
            planets: []
        }
    ], [lang]);

    const exitSectorFnRef = useRef(null);
    const enterSectorFnRef = useRef(null);
    const clustersRef = useRef(CLUSTERS);
    clustersRef.current = CLUSTERS;

    // Set global flag so CLI knows we are in Galaxy Map mode
    useEffect(() => {
        window.__spetGalaxyActive = true;
        return () => { window.__spetGalaxyActive = false; };
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x02040a, 0.0018);

        const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 3500);
        camera.position.set(0, 0, 50.0);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        container.appendChild(renderer.domElement);

        const loader = new THREE.GLTFLoader();
        const modelCache = new Map();

        // Model Normalization + PBR Material Lighting Fix (Juggernog lit, SkinnedMesh nuke scaled!)
        const normalizeModel = (model, targetSize, pathHint = '') => {
            model.traverse((child) => {
                if (child.isMesh && child.material) {
                    const mats = Array.isArray(child.material) ? child.material : [child.material];
                    mats.forEach(mat => {
                        if (mat.metalness !== undefined && mat.metalness > 0.2) {
                            mat.metalness = 0.08;
                        }
                        if (mat.roughness !== undefined && mat.roughness < 0.4) {
                            mat.roughness = 0.6;
                        }
                        mat.needsUpdate = true;
                    });
                }
            });

            // Robust bounding box computation for SkinnedMesh and hierarchical models
            let box = new THREE.Box3();
            model.updateMatrixWorld(true);
            model.traverse((child) => {
                if (child.isMesh) {
                    if (!child.geometry.boundingBox) child.geometry.computeBoundingBox();
                    if (child.geometry.boundingBox) {
                        const b = child.geometry.boundingBox.clone();
                        b.applyMatrix4(child.matrixWorld);
                        box.union(b);
                    }
                }
            });
            if (box.isEmpty()) {
                box.setFromObject(model);
            }
            const size = box.getSize(new THREE.Vector3());
            let maxDim = Math.max(size.x, size.y, size.z);
            if (pathHint.includes('nuke') && (!maxDim || maxDim < 10.0)) {
                maxDim = 109.0;
            } else if (!maxDim || !isFinite(maxDim) || maxDim <= 0.001) {
                maxDim = 1.0;
            }
            const s = targetSize / maxDim;
            model.scale.set(s, s, s);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center.multiplyScalar(s));
        };

        const createNormalizedPivot = (model, targetSize, pathHint = '') => {
            const pivot = new THREE.Group();
            normalizeModel(model, targetSize, pathHint);
            pivot.add(model);
            return pivot;
        };

        const loadGlb = (path) => {
            if (!path) return Promise.resolve(null);
            if (modelCache.has(path)) return Promise.resolve(modelCache.get(path).clone());
            return new Promise((resolve) => {
                loader.load(
                    path,
                    (gltf) => {
                        modelCache.set(path, gltf.scene);
                        resolve(gltf.scene.clone());
                    },
                    undefined,
                    () => resolve(null)
                );
            });
        };

        // Multi-directional lighting so models (like Juggernog) are fully illuminated
        const ambientLight = new THREE.AmbientLight(0xdbeafe, 1.2);
        scene.add(ambientLight);

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 1.3);
        scene.add(hemiLight);

        const sunLight = new THREE.DirectionalLight(0xfffbeb, 2.2);
        sunLight.position.set(-90, 65, 85);
        scene.add(sunLight);

        const fillLight = new THREE.DirectionalLight(0x7dd3fc, 1.4);
        fillLight.position.set(70, -40, -120);
        scene.add(fillLight);

        // --- 1. NEBULA CELESTIAL DOME (ORIGINAL RESTORED 360° ACES SHADER FROM e622790) ---
        const skyGeo = new THREE.SphereGeometry(1200, 48, 48);
        const skyMat = new THREE.ShaderMaterial({
            side: THREE.BackSide,
            depthWrite: false,
            uniforms: {
                uTime: { value: 0 },
                uCamZ: { value: 50.0 },
                uCol1: { value: new THREE.Vector3(0.04, 0.62, 0.56) },
                uCol2: { value: new THREE.Vector3(0.08, 0.52, 0.88) },
                uCol3: { value: new THREE.Vector3(0.32, 0.12, 0.65) },
                uCol4: { value: new THREE.Vector3(0.95, 0.45, 0.12) }
            },
            vertexShader: `
                varying vec3 vDir;
                void main() {
                    vDir = normalize(position);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform float uCamZ;
                uniform vec3 uCol1;
                uniform vec3 uCol2;
                uniform vec3 uCol3;
                uniform vec3 uCol4;
                varying vec3 vDir;

                float hash13(vec3 p3) {
                    p3 = fract(p3 * 0.1031);
                    p3 += dot(p3, p3.zyx + 31.32);
                    return fract((p3.x + p3.y) * p3.z);
                }
                float noise3(vec3 x) {
                    vec3 i = floor(x);
                    vec3 f = fract(x);
                    f = f * f * (3.0 - 2.0 * f);
                    return mix(
                        mix(mix(hash13(i + vec3(0,0,0)), hash13(i + vec3(1,0,0)), f.x),
                            mix(hash13(i + vec3(0,1,0)), hash13(i + vec3(1,1,0)), f.x), f.y),
                        mix(mix(hash13(i + vec3(0,0,1)), hash13(i + vec3(1,0,1)), f.x),
                            mix(hash13(i + vec3(0,1,1)), hash13(i + vec3(1,1,1)), f.x), f.y), f.z
                    );
                }
                float fbm4(vec3 p) {
                    float v = 0.0, a = 0.5;
                    for (int i = 0; i < 4; i++) {
                        v += a * noise3(p);
                        p = p * 2.03 + vec3(1.7, 9.2, 3.4);
                        a *= 0.5;
                    }
                    return v;
                }
                vec3 acesToneMap(vec3 x) {
                    return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
                }
                void main() {
                    vec3 rd = normalize(vDir);
                    vec3 bg = vec3(0.005, 0.008, 0.016);
                    float rightMask = smoothstep(-0.38, 0.48, rd.x * 0.85 + rd.y * 0.28);
                    if (rightMask > 0.005) {
                        vec3 p = rd * 2.6 + vec3(0.0, uTime * 0.008, -uCamZ * 0.0015);
                        float n1 = fbm4(p);
                        float n2 = fbm4(p * 1.85 + vec3(n1 * 1.6, -n1 * 1.2, 2.1));
                        float ridge = clamp(1.0 - abs(n2 * 2.0 - 1.0), 0.0, 1.0);
                        ridge = ridge * ridge;

                        vec3 neb = mix(bg, uCol3, smoothstep(0.25, 0.72, n1) * rightMask * 0.75);
                        neb = mix(neb, uCol1, smoothstep(0.35, 0.78, n2) * rightMask * 0.82);
                        neb += uCol2 * pow(n2, 2.4) * rightMask * 0.65;
                        neb += uCol4 * pow(ridge, 3.0) * rightMask * 0.78;

                        float dust = smoothstep(0.52, 0.78, noise3(p * 4.2 - n2));
                        neb *= (1.0 - dust * 0.68 * rightMask);
                        bg = neb;
                    }
                    gl_FragColor = vec4(acesToneMap(bg), 1.0);
                }
            `
        });
        const skyMesh = new THREE.Mesh(skyGeo, skyMat);
        scene.add(skyMesh);

        // --- 2. 9,000 WARP STARS WITH RELAY STREAK SHADER ---
        const starCount = 9000;
        const starGeo = new THREE.BufferGeometry();
        const starPos = new Float32Array(starCount * 3);
        const starCol = new Float32Array(starCount * 3);
        const starSizes = new Float32Array(starCount);
        const starPalette = [
            new THREE.Color(0x9bb8ff),
            new THREE.Color(0xcad8ff),
            new THREE.Color(0xfff4ea),
            new THREE.Color(0xffd2a1),
            new THREE.Color(0x38bdf8)
        ];
        for (let i = 0; i < starCount; i++) {
            const r = 120 + Math.random() * 820;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            starPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
            starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            starPos[i * 3 + 2] = r * Math.cos(phi) - 80;
            const c = starPalette[i % starPalette.length];
            starCol[i * 3]     = c.r;
            starCol[i * 3 + 1] = c.g;
            starCol[i * 3 + 2] = c.b;
            starSizes[i] = Math.pow(Math.random(), 3.0) * 4.2 + 0.9;
        }
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
        starGeo.setAttribute('aSize', new THREE.BufferAttribute(starSizes, 1));

        const starMat = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            uniforms: { uWarp: { value: 0.0 } },
            vertexShader: `
                attribute float aSize;
                varying vec3 vColor;
                varying float vWarp;
                uniform float uWarp;
                void main() {
                    vColor = color;
                    vWarp = uWarp;
                    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = clamp(aSize * (220.0 / max(1.0, -mvPos.z)) * (1.0 + uWarp * 2.2), 1.0, 26.0);
                    gl_Position = projectionMatrix * mvPos;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vWarp;
                void main() {
                    vec2 uv = gl_PointCoord - 0.5;
                    uv.x /= (1.0 + vWarp * 3.0);
                    float d = length(uv);
                    if (d > 0.5) discard;
                    float core = exp(-d * d * 26.0);
                    vec3 col = mix(vColor, vec3(0.55, 0.88, 1.0), vWarp * 0.65);
                    gl_FragColor = vec4(col * (1.0 + core * 0.8), core);
                }
            `
        });
        const starPoints = new THREE.Points(starGeo, starMat);
        scene.add(starPoints);

        // --- 3. 75,000 STAR SPIRAL GALAXY WITH MASS EFFECT TACTICAL GRID ---
        // Centered & stationary root so clicking cluster nodes is easy and stable!
        const galaxyRoot = new THREE.Group();
        galaxyRoot.position.set(0, 0, -8.0);
        galaxyRoot.rotation.set(0.65, 0, 0);
        scene.add(galaxyRoot);

        const galCount = 75000;
        const galGeo = new THREE.BufferGeometry();
        const galOrbit = new Float32Array(galCount * 4);
        const galCol = new Float32Array(galCount * 3);
        const galDummy = new Float32Array(galCount * 3);
        const cGalCore = new THREE.Color(0xfff1d0);
        const cGalWarm = new THREE.Color(0xfbbf24);
        const cGalBlue = new THREE.Color(0x38bdf8);
        const cGalDeep = new THREE.Color(0x3b82f6);
        const cGalPink = new THREE.Color(0xf43f5e);

        for (let i = 0; i < galCount; i++) {
            const arm = i % 4;
            const u = Math.pow(Math.random(), 1.38);
            const r = 0.4 + u * 29.5;
            const logAngle = r * 0.31 + (arm * Math.PI * 0.5);
            const armWidth = (0.28 + u * 0.95) * (Math.random() < 0.78 ? 0.65 : 1.65);
            const angle = logAngle + (Math.random() - 0.5) * armWidth;
            const thickness = (Math.random() - 0.5) * (2.2 * Math.exp(-r * 0.12) + 0.25);

            galOrbit[i * 4]     = r;
            galOrbit[i * 4 + 1] = angle;
            galOrbit[i * 4 + 2] = thickness;
            galOrbit[i * 4 + 3] = (r < 4.5 ? 3.2 : 1.6) * (0.6 + Math.random() * 0.9);

            const col = cGalCore.clone();
            if (u > 0.08) col.lerp(cGalWarm, Math.min(1, (u - 0.08) * 3.5));
            if (u > 0.22) col.lerp(cGalBlue, Math.min(1, (u - 0.22) * 2.0));
            if (u > 0.58) col.lerp(cGalDeep, Math.min(1, (u - 0.58) * 2.2));
            if (u > 0.25 && Math.random() < 0.07) col.lerp(cGalPink, 0.8);

            galCol[i * 3]     = col.r;
            galCol[i * 3 + 1] = col.g;
            galCol[i * 3 + 2] = col.b;
        }
        galGeo.setAttribute('position', new THREE.BufferAttribute(galDummy, 3));
        galGeo.setAttribute('aOrbit', new THREE.BufferAttribute(galOrbit, 4));
        galGeo.setAttribute('color', new THREE.BufferAttribute(galCol, 3));

        const galMat = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            uniforms: {
                uTime: { value: 0 },
                uRocketWorld: { value: new THREE.Vector3() }
            },
            vertexShader: `
                attribute vec4 aOrbit;
                varying vec3 vColor;
                varying float vAlpha;
                uniform float uTime;
                uniform vec3 uRocketWorld;
                void main() {
                    float r = aOrbit.x;
                    float theta0 = aOrbit.y;
                    float yOff = aOrbit.z;
                    float sz = aOrbit.w;
                    float omega = 1.25 / pow(r + 1.4, 0.58);
                    float theta = theta0 - uTime * omega * 0.18;
                    vec3 localP = vec3(cos(theta) * r, yOff, sin(theta) * r);
                    vec4 worldP = modelMatrix * vec4(localP, 1.0);
                    vec3 diff = worldP.xyz - uRocketWorld;
                    float d = length(diff);
                    if (d < 9.5) {
                        float push = pow(1.0 - d / 9.5, 2.0) * 1.6;
                        worldP.xyz += normalize(diff + vec3(0.001)) * push;
                    }
                    vColor = color;
                    vAlpha = smoothstep(30.5, 16.0, r) * 0.9;
                    vec4 mvPos = viewMatrix * worldP;
                    gl_PointSize = clamp(sz * (145.0 / max(1.0, -mvPos.z)), 1.0, 15.0);
                    gl_Position = projectionMatrix * mvPos;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vAlpha;
                void main() {
                    vec2 uv = gl_PointCoord - 0.5;
                    float d2 = dot(uv, uv);
                    if (d2 > 0.25) discard;
                    float g = exp(-d2 * 18.0);
                    gl_FragColor = vec4(vColor * (1.0 + g * 0.7), g * vAlpha);
                }
            `
        });
        const galaxyPoints = new THREE.Points(galGeo, galMat);
        galaxyPoints.frustumCulled = false;
        galaxyRoot.add(galaxyPoints);

        // Tactical 1px Grid Plane
        const gridPlaneGeo = new THREE.PlaneGeometry(66, 66);
        gridPlaneGeo.rotateX(-Math.PI / 2);
        const gridPlaneMat = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            uniforms: { uTime: { value: 0 } },
            vertexShader: `
                varying vec2 vPos;
                void main() {
                    vPos = position.xz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vPos;
                uniform float uTime;
                void main() {
                    float r = length(vPos);
                    if (r > 32.5) discard;
                    float rRing1 = smoothstep(0.09, 0.0, abs(r - 9.0));
                    float rRing2 = smoothstep(0.09, 0.0, abs(r - 18.0));
                    float rRing3 = smoothstep(0.11, 0.0, abs(r - 27.5));
                    float rInner = smoothstep(0.09, 0.0, abs(r - 3.2));
                    float axisX = smoothstep(0.08, 0.0, abs(vPos.y)) * smoothstep(31.0, 2.0, r);
                    float axisZ = smoothstep(0.08, 0.0, abs(vPos.x)) * smoothstep(31.0, 2.0, r);
                    vec3 col = vec3(0.12, 0.65, 1.0) * (rRing1 * 0.28 + rRing2 * 0.34 + rRing3 * 0.45);
                    col += vec3(0.98, 0.38, 0.14) * ((axisX + axisZ) * 0.58 + rInner * 0.85);
                    float alpha = clamp((rRing1 + rRing2 + rRing3 + axisX + axisZ) * 0.5, 0.0, 0.9);
                    gl_FragColor = vec4(col, alpha);
                }
            `
        });
        galaxyRoot.add(new THREE.Mesh(gridPlaneGeo, gridPlaneMat));

        // --- 4. INTERACTIVE 3D CLUSTER RINGS & DOM CALLOUTS ---
        const clusterMeshes = [];
        const clusterCalloutsList = [];

        CLUSTERS.forEach((cluster) => {
            const isSecVisible = !cluster.isSecret || unlockedSectors[cluster.id];
            const ringGroup = new THREE.Group();
            ringGroup.position.copy(cluster.pos);
            ringGroup.visible = isSecVisible;

            const ringGeo = new THREE.RingGeometry(1.2, 1.6, 32);
            ringGeo.rotateX(-Math.PI / 2);
            const ringMat = new THREE.MeshBasicMaterial({
                color: cluster.color,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.9
            });
            const ringMesh = new THREE.Mesh(ringGeo, ringMat);
            ringGroup.add(ringMesh);

            const hitSphere = new THREE.Mesh(
                new THREE.SphereGeometry(2.8, 12, 12),
                new THREE.MeshBasicMaterial({ visible: false })
            );
            hitSphere.userData = { type: 'CLUSTER', clusterId: cluster.id, cluster };
            ringGroup.add(hitSphere);

            galaxyRoot.add(ringGroup);
            clusterMeshes.push({ group: ringGroup, ringMesh, hitSphere, cluster });

            // DOM Callout Card
            if (overlayRef.current) {
                const el = document.createElement('div');
                el.className = `me3-cluster-label ${cluster.gold ? 'gold' : ''}`;
                el.style.display = isSecVisible ? 'block' : 'none';
                el.innerHTML = `
                    <div class="me3-label-title">${cluster.name[lang] || cluster.name.pt}</div>
                    <div class="me3-label-sub">${cluster.planets.length ? cluster.planets.length + ' POIs' : (cluster.id === 'solar' ? 'DOOM Telemetry' : 'Easter Egg')}</div>
                `;
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    enterSector(cluster.id);
                });
                overlayRef.current.appendChild(el);
                clusterCalloutsList.push({ el, cluster, group: ringGroup });
            }
        });

        // --- 5. SEAMLESS PLANET CANVAS TEXTURE GENERATOR (1024x512) ---
        const TEXTURE_CACHE = {};
        const getPlanetTexture = (paletteName) => {
            if (TEXTURE_CACHE[paletteName]) return TEXTURE_CACHE[paletteName];
            const c = document.createElement('canvas');
            c.width = 1024;
            c.height = 512;
            const ctx = c.getContext('2d');
            const palettes = {
                moon:     { base: '#6e6b66', dark: '#2d2e32', light: '#b2ada4', feature: '#434449' },
                lava:     { base: '#231c1a', dark: '#110d0c', light: '#f97316', feature: '#dc2626' },
                ice:      { base: '#386682', dark: '#1b384d', light: '#bae6fd', feature: '#0284c7' },
                gas_cyan: { base: '#0e4f6e', dark: '#082c42', light: '#67e8f9', feature: '#0284c7' },
                terran:   { base: '#1e4e68', dark: '#112c3d', light: '#3b7a57', feature: '#6b8e23' },
                desert:   { base: '#8c4f30', dark: '#4f2814', light: '#d99b66', feature: '#a86038' }
            };
            const p = palettes[paletteName] || palettes.moon;

            ctx.fillStyle = p.base;
            ctx.fillRect(0, 0, 1024, 512);

            for (let i = 0; i < 450; i++) {
                ctx.fillStyle = (i % 2 === 0) ? p.dark : p.light;
                ctx.globalAlpha = 0.08 + Math.random() * 0.18;
                ctx.beginPath();
                const x = Math.random() * 1024;
                const y = Math.random() * 512;
                const r = 12 + Math.random() * 75;
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
            }

            for (let y = 0; y < 512; y += 4) {
                ctx.fillStyle = (y % 8 === 0) ? p.feature : p.dark;
                ctx.globalAlpha = 0.12;
                ctx.fillRect(0, y, 1024, 2);
            }

            const tex = new THREE.CanvasTexture(c);
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.ClampToEdgeWrapping;
            TEXTURE_CACHE[paletteName] = tex;
            return tex;
        };

        const atmoColors = {
            moon:     new THREE.Vector3(0.5, 0.55, 0.65),
            lava:     new THREE.Vector3(1.0, 0.35, 0.08),
            ice:      new THREE.Vector3(0.35, 0.78, 1.0),
            gas_cyan: new THREE.Vector3(0.12, 0.85, 0.95),
            terran:   new THREE.Vector3(0.22, 0.65, 1.0),
            desert:   new THREE.Vector3(0.95, 0.65, 0.25)
        };

        // --- 6. SECTOR PLANETS ROOT & PROCEDURAL SHADERS ---
        const sectorRoot = new THREE.Group();
        sectorRoot.visible = false;
        scene.add(sectorRoot);

        let activePlanetObjects = [];
        const planetCallouts = [];

        const clearSector = () => {
            while (sectorRoot.children.length > 0) {
                const obj = sectorRoot.children[0];
                sectorRoot.remove(obj);
            }
            activePlanetObjects = [];
            planetCallouts.forEach(c => { if (c.el && c.el.parentNode) c.el.parentNode.removeChild(c.el); });
            planetCallouts.length = 0;
        };

        const createSectorCallout = (targetGroup, titleText, subText, onClick) => {
            if (!overlayRef.current) return;
            const el = document.createElement('div');
            el.className = 'me3-planet-label';
            el.innerHTML = `
                <div class="me3-planet-title">${titleText}</div>
                <div class="me3-planet-sub">${subText}</div>
            `;
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                if (onClick) onClick();
            });
            overlayRef.current.appendChild(el);
            planetCallouts.push({ el, group: targetGroup });
        };

        const buildSectorPlanets = (clusterId) => {
            clearSector();
            const cluster = clustersRef.current.find(c => c.id === clusterId);
            if (!cluster) return;

            // SPECIAL EASTER EGG: SOLAR SYSTEM (EARTH, MOON, MARS, PHOBOS, DEIMOS)
            if (clusterId === 'solar') {
                // Glorious Animated Sun with Solar Granules & Coronal Flare Halo
                const sunGroup = new THREE.Group();
                sunGroup.position.set(-65, 12, -180);
                sectorRoot.add(sunGroup);

                const sunGeo = new THREE.SphereGeometry(15, 48, 48);
                const sunMat = new THREE.ShaderMaterial({
                    uniforms: { uTime: { value: 0 } },
                    vertexShader: `
                        varying vec2 vUv;
                        varying vec3 vNormal;
                        void main() {
                            vUv = uv;
                            vNormal = normalize(normalMatrix * normal);
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `,
                    fragmentShader: `
                        varying vec2 vUv;
                        varying vec3 vNormal;
                        uniform float uTime;
                        float hash2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
                        float sn(vec2 p) {
                            vec2 i = floor(p); vec2 f = fract(p);
                            f = f * f * (3.0 - 2.0 * f);
                            return mix(mix(hash2(i), hash2(i + vec2(1.0, 0.0)), f.x),
                                       mix(hash2(i + vec2(0.0, 1.0)), hash2(i + vec2(1.0, 1.0)), f.x), f.y);
                        }
                        void main() {
                            float n = sn(vUv * 16.0 + vec2(uTime * 0.08, -uTime * 0.05));
                            float n2 = sn(vUv * 32.0 - vec2(uTime * 0.12, uTime * 0.06));
                            vec3 coreCol = mix(vec3(1.0, 0.72, 0.15), vec3(1.0, 0.35, 0.02), n);
                            coreCol += vec3(1.0, 0.95, 0.6) * pow(n2, 2.4) * 0.6;
                            float fresnel = pow(1.0 - max(0.0, dot(vNormal, vec3(0,0,1))), 1.8);
                            vec3 finalCol = mix(coreCol, vec3(1.0, 0.25, 0.0), fresnel * 0.7);
                            gl_FragColor = vec4(finalCol, 1.0);
                        }
                    `
                });
                const sunMesh = new THREE.Mesh(sunGeo, sunMat);
                sunGroup.add(sunMesh);

                const sunGlowGeo = new THREE.SphereGeometry(21, 32, 32);
                const sunGlowMat = new THREE.ShaderMaterial({
                    side: THREE.BackSide,
                    transparent: true,
                    depthWrite: false,
                    blending: THREE.AdditiveBlending,
                    vertexShader: `
                        varying vec3 vNormal;
                        void main() {
                            vNormal = normalize(normalMatrix * normal);
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `,
                    fragmentShader: `
                        varying vec3 vNormal;
                        void main() {
                            float rim = pow(clamp(1.0 + dot(vNormal, vec3(0,0,-1)), 0.0, 1.0), 2.8);
                            gl_FragColor = vec4(vec3(1.0, 0.55, 0.12) * 1.6, rim * 0.85);
                        }
                    `
                });
                sunGroup.add(new THREE.Mesh(sunGlowGeo, sunGlowMat));

                createSectorCallout(
                    sunGroup,
                    lang === 'pt' ? 'Sol (Estrela Central)' : 'Sun (Central Star)',
                    lang === 'pt' ? 'Anomalia Solar UAC' : 'UAC Solar Telemetry',
                    () => {}
                );

                // Mars (Doom E1M1)
                const marsGroup = new THREE.Group();
                marsGroup.position.set(16, 2, -65);
                sectorRoot.add(marsGroup);

                loadGlb('/3d/mars.glb').then(m => {
                    if (!m) return;
                    const pivot = createNormalizedPivot(m, 8.5, '/3d/mars.glb');
                    pivot.userData = { type: 'EASTER_MARS', game: 'doom_e1m1' };
                    marsGroup.add(pivot);
                });

                // Phobos & Deimos orbiting Mars
                const phobosOrbit = new THREE.Group();
                marsGroup.add(phobosOrbit);
                loadGlb('/3d/asteroid1.glb').then(m => {
                    if (!m) return;
                    const pivot = createNormalizedPivot(m, 1.5, '/3d/asteroid1.glb');
                    pivot.position.set(7.5, 0, 0);
                    pivot.userData = { type: 'EASTER_PHOBOS', game: 'doom_e1m1' };
                    phobosOrbit.add(pivot);
                });

                const deimosOrbit = new THREE.Group();
                deimosOrbit.rotation.x = 0.45;
                marsGroup.add(deimosOrbit);
                loadGlb('/3d/asteroid2.glb').then(m => {
                    if (!m) return;
                    const pivot = createNormalizedPivot(m, 1.2, '/3d/asteroid2.glb');
                    pivot.position.set(-11.5, 0, 0);
                    pivot.userData = { type: 'EASTER_DEIMOS', game: 'doom_e1m1' };
                    deimosOrbit.add(pivot);
                });

                createSectorCallout(
                    marsGroup,
                    lang === 'pt' ? 'Marte, Fobos & Deimos (UAC)' : 'Mars, Phobos & Deimos (UAC)',
                    lang === 'pt' ? 'Fobos & Deimos em órbita • Clique para jogar DOOM (1993)' : 'Phobos & Deimos in orbit • Click to play DOOM (1993)',
                    () => window.dispatchEvent(new CustomEvent('spet:open-easter-game', { detail: { game: 'doom_e1m1' } }))
                );

                // Earth & Moon (Doom 2)
                const earthGroup = new THREE.Group();
                earthGroup.position.set(-18, -4, -135);
                sectorRoot.add(earthGroup);

                loadGlb('/3d/earth.glb').then(m => {
                    if (!m) return;
                    const pivot = createNormalizedPivot(m, 9.2, '/3d/earth.glb');
                    pivot.userData = { type: 'EASTER_EARTH', game: 'doom_2' };
                    earthGroup.add(pivot);
                });

                const moonOrbit = new THREE.Group();
                earthGroup.add(moonOrbit);
                loadGlb('/3d/moon.glb').then(m => {
                    if (!m) return;
                    const pivot = createNormalizedPivot(m, 2.4, '/3d/moon.glb');
                    pivot.position.set(8.5, 0, 0);
                    moonOrbit.add(pivot);
                });

                createSectorCallout(
                    earthGroup,
                    lang === 'pt' ? 'Terra & Lua (DOOM II)' : 'Earth & Moon (DOOM II)',
                    lang === 'pt' ? 'Clique para jogar Hell on Earth' : 'Click to play Hell on Earth',
                    () => window.dispatchEvent(new CustomEvent('spet:open-easter-game', { detail: { game: 'doom_2' } }))
                );

                activePlanetObjects.push(
                    { type: 'SOLAR_SUN', sunMesh, sunMat },
                    { type: 'SOLAR_MARS', group: marsGroup, phobosOrbit, deimosOrbit },
                    { type: 'SOLAR_EARTH', group: earthGroup, moonOrbit }
                );
                return;
            }

            // SPECIAL EASTER EGG: DELÍCIA SECTOR (JAILSON & ORANGES)
            if (clusterId === 'delicia') {
                const jailsonGroup = new THREE.Group();
                jailsonGroup.position.set(0, 0, -45);
                sectorRoot.add(jailsonGroup);

                let jailsonMesh = null;
                loadGlb('/3d/jailson.glb').then(m => {
                    if (!m) return;
                    const pivot = createNormalizedPivot(m, 11.5, '/3d/jailson.glb');
                    pivot.userData = { type: 'EASTER_JAILSON', game: 'delicia_doom' };
                    jailsonGroup.add(pivot);
                    jailsonMesh = pivot;
                });

                const orangeOrbit = new THREE.Group();
                jailsonGroup.add(orangeOrbit);
                const oranges = [];
                for (let o = 0; o < 6; o++) {
                    const ang = (o / 6) * Math.PI * 2;
                    loadGlb('/3d/orange.glb').then(m => {
                        if (!m) return;
                        const pivot = createNormalizedPivot(m, 2.2, '/3d/orange.glb');
                        pivot.position.set(Math.cos(ang) * 9.5, Math.sin(ang * 2) * 1.5, Math.sin(ang) * 9.5);
                        orangeOrbit.add(pivot);
                        oranges.push(pivot);
                    });
                }

                createSectorCallout(
                    jailsonGroup,
                    lang === 'pt' ? 'Jailson Mendes' : 'Jailson Mendes',
                    lang === 'pt' ? 'Que delícia cara! Clique para jogar Delícia DOOM' : 'Click to play Delícia DOOM',
                    () => window.dispatchEvent(new CustomEvent('spet:open-easter-game', { detail: { game: 'delicia_doom' } }))
                );

                activePlanetObjects.push({
                    type: 'DELICIA_SYSTEM',
                    jailsonGroup,
                    jailsonMesh,
                    orangeOrbit,
                    oranges
                });
                return;
            }

            // SPECIAL EASTER EGG: CHICKEN SECTOR (MEGA CHICKEN & GOLDEN EGG)
            if (clusterId === 'chicken') {
                const chickenGroup = new THREE.Group();
                chickenGroup.position.set(-15, 4, -35);
                sectorRoot.add(chickenGroup);

                let chickenMesh = null;
                loadGlb('/3d/space_chicken!.glb').then(m => {
                    if (!m) return;
                    const pivot = createNormalizedPivot(m, 14.5, '/3d/space_chicken!.glb');
                    chickenGroup.add(pivot);
                    chickenMesh = pivot;
                });

                const eggOrbit = new THREE.Group();
                chickenGroup.add(eggOrbit);
                let eggMesh = null;
                loadGlb('/3d/egg.glb').then(m => {
                    if (!m) return;
                    const pivot = createNormalizedPivot(m, 3.2, '/3d/egg.glb');
                    pivot.position.set(9.5, 0, 0);
                    eggOrbit.add(pivot);
                    eggMesh = pivot;
                });

                createSectorCallout(
                    chickenGroup,
                    lang === 'pt' ? 'Mega Galinha Cósmica' : 'Mega Cosmic Chicken',
                    lang === 'pt' ? 'Có-có-ricó! A galinha lendária do espaço' : 'The legendary space chicken',
                    () => {}
                );

                activePlanetObjects.push({
                    type: 'CHICKEN_SYSTEM',
                    chickenGroup,
                    chickenMesh,
                    eggOrbit,
                    eggMesh
                });
                return;
            }

            // STANDARD REAL PROJECT CLUSTERS (PROCEDURAL PLANETS + DOCKED 3D GLB MODELS)
            cluster.planets.forEach((pData, idx) => {
                const pGroup = new THREE.Group();
                pGroup.position.copy(pData.pos);

                const tex = getPlanetTexture(pData.palette);
                const atmoCol = atmoColors[pData.palette] || atmoColors.moon;
                const isLava = pData.palette === 'lava' ? 1.0 : 0.0;
                const hasClouds = (pData.palette === 'terran' || pData.palette === 'gas_cyan' || pData.palette === 'ice') ? 1.0 : 0.0;

                const pGeo = new THREE.SphereGeometry(pData.radius, 48, 48);
                const pMat = new THREE.ShaderMaterial({
                    uniforms: {
                        uTex: { value: tex },
                        uSunDir: { value: new THREE.Vector3(-0.72, 0.42, 0.55).normalize() },
                        uAtmoCol: { value: atmoCol },
                        uIsLava: { value: isLava },
                        uHasClouds: { value: hasClouds },
                        uTime: { value: 0 }
                    },
                    vertexShader: `
                        varying vec2 vUv;
                        varying vec3 vNormal;
                        varying vec3 vViewDir;
                        void main() {
                            vUv = uv;
                            vec4 wp = modelMatrix * vec4(position, 1.0);
                            vNormal = normalize(mat3(modelMatrix) * normal);
                            vViewDir = normalize(cameraPosition - wp.xyz);
                            gl_Position = projectionMatrix * viewMatrix * wp;
                        }
                    `,
                    fragmentShader: `
                        uniform sampler2D uTex;
                        uniform vec3 uSunDir;
                        uniform vec3 uAtmoCol;
                        uniform float uIsLava;
                        uniform float uHasClouds;
                        uniform float uTime;
                        varying vec2 vUv;
                        varying vec3 vNormal;
                        varying vec3 vViewDir;
                        void main() {
                            vec3 sampleCol = texture2D(uTex, vUv).rgb;
                            float h0 = dot(sampleCol, vec3(0.333));
                            float diff = smoothstep(-0.14, 0.88, dot(vNormal, uSunDir));
                            float fresnel = pow(1.0 - max(0.0, dot(vNormal, vViewDir)), 3.4);
                            vec3 atmoRim = uAtmoCol * fresnel * (0.28 + 0.72 * diff);
                            float nightMask = smoothstep(0.12, -0.25, dot(vNormal, uSunDir));
                            vec3 nightLight = mix(vec3(1.0, 0.72, 0.32) * smoothstep(0.68, 0.78, h0) * 0.45, vec3(1.0, 0.28, 0.04) * 1.2, uIsLava) * nightMask;
                            vec3 col = sampleCol * (0.05 + diff * 1.15) + nightLight + atmoRim;
                            gl_FragColor = vec4(col, 1.0);
                        }
                    `
                });
                const pMesh = new THREE.Mesh(pGeo, pMat);
                pMesh.userData = { type: 'PLANET', planetData: pData, clusterId };
                pGroup.add(pMesh);

                // Rayleigh BackSide Glow Halo
                const haloGeo = new THREE.SphereGeometry(pData.radius * 1.12, 32, 32);
                const haloMat = new THREE.ShaderMaterial({
                    side: THREE.BackSide,
                    transparent: true,
                    depthWrite: false,
                    blending: THREE.AdditiveBlending,
                    uniforms: {
                        uAtmoCol: { value: atmoCol },
                        uSunDir: { value: new THREE.Vector3(-0.72, 0.42, 0.55).normalize() }
                    },
                    vertexShader: `
                        varying vec3 vNormal;
                        varying vec3 vViewDir;
                        void main() {
                            vec4 wp = modelMatrix * vec4(position, 1.0);
                            vNormal = normalize(mat3(modelMatrix) * normal);
                            vViewDir = normalize(cameraPosition - wp.xyz);
                            gl_Position = projectionMatrix * viewMatrix * wp;
                        }
                    `,
                    fragmentShader: `
                        uniform vec3 uAtmoCol;
                        uniform vec3 uSunDir;
                        varying vec3 vNormal;
                        varying vec3 vViewDir;
                        void main() {
                            float rim = pow(clamp(1.0 + dot(vNormal, vViewDir), 0.0, 1.0), 3.0);
                            float sunLit = smoothstep(-0.35, 0.55, dot(-vNormal, uSunDir));
                            gl_FragColor = vec4(uAtmoCol * 1.2, rim * (0.18 + 0.65 * sunLit));
                        }
                    `
                });
                pGroup.add(new THREE.Mesh(haloGeo, haloMat));

                // Cassini Rings
                if (pData.hasRings) {
                    const rGeo = new THREE.RingGeometry(pData.radius * 1.32, pData.radius * 2.25, 64);
                    rGeo.rotateX(Math.PI * 0.43);
                    const rMat = new THREE.ShaderMaterial({
                        side: THREE.DoubleSide,
                        transparent: true,
                        depthWrite: false,
                        uniforms: {
                            uInner: { value: pData.radius * 1.32 },
                            uOuter: { value: pData.radius * 2.25 },
                            uRingCol: { value: atmoCol }
                        },
                        vertexShader: `
                            varying vec3 vLocal;
                            void main() {
                                vLocal = position;
                                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                            }
                        `,
                        fragmentShader: `
                            uniform float uInner;
                            uniform float uOuter;
                            uniform vec3 uRingCol;
                            varying vec3 vLocal;
                            void main() {
                                float r = length(vLocal);
                                float t = clamp((r - uInner) / (uOuter - uInner), 0.0, 1.0);
                                float cassini = 1.0 - 0.85 * exp(-pow((t - 0.62) / 0.035, 2.0));
                                float edgeFade = smoothstep(0.0, 0.08, t) * smoothstep(1.0, 0.88, t);
                                gl_FragColor = vec4(uRingCol, edgeFade * cassini * 0.52);
                            }
                        `
                    });
                    pGroup.add(new THREE.Mesh(rGeo, rMat));
                }

                // 3D GLB Models Docked in True Orbit Pivots
                const orbitPivot = new THREE.Group();
                orbitPivot.rotation.x = 0.28;
                orbitPivot.rotation.z = -0.15;
                pGroup.add(orbitPivot);

                const modelsList = pData.models || (pData.modelPath ? [{ path: pData.modelPath, scale: pData.modelScale, orbitDist: 2.8, orbitAngleOffset: 0 }] : []);
                const spawnedModels = [];

                modelsList.forEach(mCfg => {
                    loadGlb(mCfg.path).then(m => {
                        if (!m) return;
                        let pivot;
                        if (mCfg.path.includes('nuke')) {
                            // Convert SkinnedMesh to static regular Mesh & permanently scale the raw BufferGeometry vertices!
                            const nukeGroup = new THREE.Group();
                            m.traverse(child => {
                                if (child.isMesh && child.geometry) {
                                    // Clone geometry and strip bone attributes
                                    const geom = child.geometry.clone();
                                    delete geom.attributes.skinIndex;
                                    delete geom.attributes.skinWeight;
                                    geom.computeBoundingBox();
                                    const b = geom.boundingBox;
                                    const sz = b.getSize(new THREE.Vector3());
                                    const maxD = Math.max(sz.x, sz.y, sz.z) || 109.0;
                                    geom.center();
                                    const s = 1.6 / maxD;
                                    geom.scale(s, s, s);
                                    geom.computeBoundingBox();
                                    geom.computeVertexNormals();

                                    const mat = Array.isArray(child.material) 
                                        ? child.material.map(mt => mt.clone()) 
                                        : child.material.clone();
                                    const regMesh = new THREE.Mesh(geom, mat);
                                    nukeGroup.add(regMesh);
                                }
                            });
                            pivot = new THREE.Group();
                            pivot.add(nukeGroup);
                        } else {
                            pivot = createNormalizedPivot(m, mCfg.scale || 3.2, mCfg.path);
                        }

                        const dist = pData.radius + (mCfg.orbitDist || 2.8);
                        const ang = mCfg.orbitAngleOffset || 0;
                        pivot.position.set(Math.cos(ang) * dist, 0, Math.sin(ang) * dist);
                        pivot.userData = { type: 'PROJECT_MODEL', planetData: pData, clusterId };
                        orbitPivot.add(pivot);
                        spawnedModels.push(pivot);
                    });
                });

                const planetRecord = {
                    type: 'PROJECT_PLANET',
                    group: pGroup,
                    mesh: pMesh,
                    mat: pMat,
                    data: pData,
                    orbitPivot: orbitPivot,
                    models: spawnedModels,
                    orbitSpeed: 0.32 + (idx % 3) * 0.08,
                    rotSpeed: pData.rotSpeed || 0.32
                };

                sectorRoot.add(pGroup);

                createSectorCallout(
                    pGroup,
                    pData.name,
                    pData.desc[lang] || pData.desc.pt,
                    () => handleSelectTarget(pData)
                );

                activePlanetObjects.push(planetRecord);
            });
        };

        // --- 7. PLAYER CURSOR RIG & PHYSICS (ROCKET, ASTRONAUT, OXYGEN & THRUSTER PARTICLES) ---
        const _finalTarget = new THREE.Vector3();
        const _targetDir = new THREE.Vector3();
        const _targetQuat = new THREE.Quaternion();
        const _tailOffset = new THREE.Vector3();
        const _tailPos = new THREE.Vector3();
        const _tailDir = new THREE.Vector3();
        const _diff = new THREE.Vector3();

        const mouse = { x: 0, y: 0 };
        const keys = {};

        // Rocket Group
        const rocketGroup = new THREE.Group();
        rocketGroup.position.set(0, 0, 10);
        scene.add(rocketGroup);

        loadGlb('/3d/rocket.glb').then(m => {
            if (m) {
                normalizeModel(m, 4, '/3d/rocket.glb');
                m.rotation.z = 0;
                m.position.set(0, 0, 0);
                rocketGroup.add(m);
            }
        });

        // Astronaut & Slayer Group
        const astronautGroup = new THREE.Group();
        astronautGroup.position.set(5, -5, 10);
        scene.add(astronautGroup);

        let astroModel = null;
        loadGlb('/3d/Astronaut.glb').then(m => {
            if (m) {
                normalizeModel(m, 1.7, '/3d/Astronaut.glb');
                m.position.set(0, 0, 0);
                astronautGroup.add(m);
                astroModel = m;
            }
        });

        let slayerModel = null;
        loadGlb('/3d/slayer.glb').then(m => {
            if (m) {
                normalizeModel(m, 1.7, '/3d/slayer.glb');
                m.position.set(0, 0, 0);
                m.visible = false;
                astronautGroup.add(m);
                slayerModel = m;
            }
        });

        const astroVelocity = new THREE.Vector3();

        // Tether Rope
        const ropeMaterial = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 });
        const ropeGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]);
        const rope = new THREE.Line(ropeGeometry, ropeMaterial);
        scene.add(rope);

        // Rocket Thruster Fire Particles (Instanced Mesh)
        const particleCount = 60;
        const pGeo = new THREE.SphereGeometry(0.28, 6, 6);
        const pMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.85 });
        const fireInstMesh = new THREE.InstancedMesh(pGeo, pMat, particleCount);
        scene.add(fireInstMesh);

        const particles = [];
        const _instMatrix = new THREE.Matrix4();
        const _instQuat = new THREE.Quaternion();
        const _instScale = new THREE.Vector3();
        const _zeroMatrix = new THREE.Matrix4().makeScale(0, 0, 0);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                pos: new THREE.Vector3(),
                velocity: new THREE.Vector3(),
                life: 0,
                maxLife: 20
            });
            fireInstMesh.setMatrixAt(i, _zeroMatrix);
        }
        fireInstMesh.instanceMatrix.needsUpdate = true;
        let pIndex = 0;

        // Astronaut Oxygen Bubbles (Hardware GPU Instanced Mesh)
        const oxCount = 40;
        const oxParticles = [];
        const oxGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
        const oxInstMat = new THREE.MeshBasicMaterial({ color: 0xe0f7fa, transparent: true, opacity: 0.6, depthWrite: false });
        const oxInstMesh = new THREE.InstancedMesh(oxGeo, oxInstMat, oxCount);
        for (let i = 0; i < oxCount; i++) {
            oxInstMesh.setMatrixAt(i, _zeroMatrix);
            oxParticles.push({ pos: new THREE.Vector3(), life: 0, maxLife: 1, velocity: new THREE.Vector3() });
        }
        oxInstMesh.instanceMatrix.needsUpdate = true;
        scene.add(oxInstMesh);
        let oxIndex = 0;
        let oxSpawnAccum = 0;

        // --- 8. STATE & VIEW TRANSITIONS ---
        let viewModeLocal = 'GALAXY_MAP';
        let targetCamZ = 50.0;
        let smoothCamZ = 50.0;
        let warpFactor = 0.0;

        // 360° Free-Look with Right Mouse Button
        let isRightMouseDown = false;
        let prevMouseX = 0, prevMouseY = 0;
        let camYaw = 0, camPitch = 0;
        let smoothCamYaw = 0, smoothCamPitch = 0;

        const enterSector = (clusterId) => {
            const cl = clustersRef.current.find(c => c.id === clusterId);
            const targetName = cl?.name[lang] || cl?.name.pt || clusterId;

            // Trigger Mass Relay transit cinematic synced to ME sound (~2.2s)
            setWarpCinematic({ active: true, targetName, progress: 0 });
            playCosmicSfx('warp', settings);
            warpFactor = 3.2;

            setTimeout(() => {
                viewModeLocal = 'SECTOR_FLIGHT';
                setViewMode('SECTOR_FLIGHT');
                setActiveClusterId(clusterId);
                if (cl?.track) setActiveTrack(cl.track);

                galaxyRoot.visible = false;
                clusterCalloutsList.forEach(c => { c.el.style.display = 'none'; });

                // Swap to DOOM Slayer when entering Solar System!
                if (clusterId === 'solar') {
                    if (astroModel) astroModel.visible = false;
                    if (slayerModel) slayerModel.visible = true;
                } else {
                    if (astroModel) astroModel.visible = true;
                    if (slayerModel) slayerModel.visible = false;
                }

                buildSectorPlanets(clusterId);
                sectorRoot.visible = true;

                // RESET CAMERA TO DEFAULT SECTOR VIEW (Clean perspective angle, no tilted leftover yaw/pitch!)
                camYaw = 0;
                camPitch = 0.18;
                smoothCamYaw = 0;
                smoothCamPitch = 0.18;
                targetCamZ = 45.0;
                smoothCamZ = 45.0;

                if (cl?.nebulaPalette) {
                    skyMat.uniforms.uCol1.value.copy(cl.nebulaPalette.c1);
                    skyMat.uniforms.uCol2.value.copy(cl.nebulaPalette.c2);
                    skyMat.uniforms.uCol3.value.copy(cl.nebulaPalette.c3);
                    skyMat.uniforms.uCol4.value.copy(cl.nebulaPalette.c4);
                }

                setWarpCinematic(prev => ({ ...prev, active: false }));
            }, 2200);
        };
        enterSectorFnRef.current = enterSector;

        // Exit Sector with Clean Camera Reset
        const exitSector = () => {
            viewModeLocal = 'GALAXY_MAP';
            setViewMode('GALAXY_MAP');
            setActiveTrack('galaxy');
            playCosmicSfx('warp', settings);

            sectorRoot.visible = false;
            clearSector();

            if (astroModel) astroModel.visible = true;
            if (slayerModel) slayerModel.visible = false;

            galaxyRoot.visible = true;
            clusterCalloutsList.forEach(c => {
                const isSecVisible = !c.cluster.isSecret || unlockedSectors[c.cluster.id];
                c.el.style.display = isSecVisible ? 'block' : 'none';
            });

            // RESET CAMERA TO DEFAULT GALAXY VIEW
            camYaw = 0;
            camPitch = 0;
            smoothCamYaw = 0;
            smoothCamPitch = 0;
            targetCamZ = 50.0;
            smoothCamZ = 50.0;

            // Restore vibrant galaxy palette
            skyMat.uniforms.uCol1.value.set(0.04, 0.62, 0.56);
            skyMat.uniforms.uCol2.value.set(0.08, 0.52, 0.88);
            skyMat.uniforms.uCol3.value.set(0.32, 0.12, 0.65);
            skyMat.uniforms.uCol4.value.set(0.95, 0.45, 0.12);
        };
        exitSectorFnRef.current = exitSector;

        const handleSelectTarget = (pData) => {
            playCosmicSfx('project', settings);
            if (pData.projectId) {
                // Find project in projectsData and open the floating project card!
                const p = (PORTFOLIO_DATA.projectsData || []).find(proj => proj.id === pData.projectId);
                if (p) {
                    setSelectedProjectCard(p);
                } else {
                    window.dispatchEvent(new CustomEvent('spet:open-project-modal', { detail: { projectId: pData.projectId } }));
                }
            } else if (pData.specialType === 'DOOM_EARTH') {
                window.dispatchEvent(new CustomEvent('spet:open-easter-game', { detail: { game: 'doom_2' } }));
            } else if (pData.specialType === 'DOOM_MARS') {
                window.dispatchEvent(new CustomEvent('spet:open-easter-game', { detail: { game: 'doom_e1m1' } }));
            } else if (pData.specialType === 'DELICIA_JAILSON') {
                window.dispatchEvent(new CustomEvent('spet:open-easter-game', { detail: { game: 'delicia_doom' } }));
            }
        };

        const raycaster = new THREE.Raycaster();
        const mouseVec = new THREE.Vector2();

        const handleContextMenu = (e) => {
            e.preventDefault();
        };

        const handlePointerDown = (e) => {
            if (e.button === 2) {
                isRightMouseDown = true;
                prevMouseX = e.clientX;
                prevMouseY = e.clientY;
            }
        };

        const handlePointerUp = (e) => {
            if (e.button === 2) {
                isRightMouseDown = false;
            }
        };

        const handlePointerMove = (e) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

            if (isRightMouseDown) {
                const dx = e.clientX - prevMouseX;
                const dy = e.clientY - prevMouseY;
                prevMouseX = e.clientX;
                prevMouseY = e.clientY;

                camYaw -= dx * 0.006;
                camPitch = Math.max(-0.6, Math.min(1.2, camPitch - dy * 0.006));
            }
        };

        const handleWheel = (e) => {
            e.preventDefault();
            if (viewModeLocal === 'SECTOR_FLIGHT') {
                targetCamZ = Math.max(-280, Math.min(65, targetCamZ - e.deltaY * 0.055));
            } else {
                // Galaxy Map Zoom: allow user to zoom closer to the galaxy or further out
                targetCamZ = Math.max(20.0, Math.min(95.0, targetCamZ - e.deltaY * 0.045));
            }
        };

        const handleClick = (e) => {
            if (e.button !== 0) return;
            // Ignore click if clicking HUD controls or project card
            if (e.target.closest('.me3-cluster-label') || e.target.closest('.me3-planet-label') || e.target.closest('button') || e.target.closest('.floating-project-card')) return;

            mouseVec.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseVec.y = -(e.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouseVec, camera);

            if (viewModeLocal === 'GALAXY_MAP') {
                const hits = raycaster.intersectObjects(clusterMeshes.map(c => c.hitSphere), true);
                if (hits.length > 0) {
                    const obj = hits[0].object;
                    const cRecord = clusterMeshes.find(c => c.hitSphere === obj);
                    if (cRecord) enterSector(cRecord.cluster.id);
                }
            } else {
                const hits = raycaster.intersectObjects(sectorRoot.children, true);
                if (hits.length > 0) {
                    let obj = hits[0].object;
                    while (obj && !obj.userData?.planetData && !obj.userData?.game && obj.parent !== sectorRoot) {
                        obj = obj.parent;
                    }
                    if (obj?.userData?.planetData) {
                        handleSelectTarget(obj.userData.planetData);
                    } else if (obj?.userData?.game) {
                        window.dispatchEvent(new CustomEvent('spet:open-easter-game', { detail: { game: obj.userData.game } }));
                    }
                }
            }
        };

        const handleKeyDown = (e) => {
            keys[e.key] = true;
            if (e.key === 'Escape') {
                if (selectedProjectCard) {
                    setSelectedProjectCard(null);
                } else if (viewModeLocal === 'SECTOR_FLIGHT') {
                    exitSector();
                } else if (isFullscreenGalaxyMode && typeof onExitFullscreenGalaxy === 'function') {
                    onExitFullscreenGalaxy();
                }
            }
            if ((e.key === 'q' || e.key === 'Q') && typeof onToggleUI === 'function') {
                onToggleUI();
            }
        };

        const handleKeyUp = (e) => {
            keys[e.key] = false;
        };

        // Custom Jump Event Listener (for CLI teleport commands)
        const handleJumpEvent = (e) => {
            const sec = e.detail?.sector;
            if (sec) {
                unlockSector(sec);
                enterSector(sec);
            }
        };

        const handleUnlockEvent = (e) => {
            const sec = e.detail?.sector;
            if (sec) unlockSector(sec);
        };

        const handleUnlockAll = () => {
            setUnlockedSectors({ delicia: true, solar: true, chicken: true });
            try {
                localStorage.setItem('spet_unlocked_sectors', JSON.stringify({ delicia: true, solar: true, chicken: true }));
            } catch (e) {}
        };

        window.addEventListener('spet:space3-jump', handleJumpEvent);
        window.addEventListener('spet:space3-unlock-sector', handleUnlockEvent);
        window.addEventListener('spet:space3-unlock-all', handleUnlockAll);
        window.addEventListener('contextmenu', handleContextMenu);
        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointerup', handlePointerUp);
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('click', handleClick);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // --- 9. ANIMATION LOOP ---
        let clock = new THREE.Clock();
        let animId;

        const updateCalloutPosition = (el, worldPos) => {
            const wp = worldPos.clone();
            wp.project(camera);
            if (wp.z > 1.0) {
                el.style.opacity = '0';
                return;
            }
            const sx = (wp.x * 0.5 + 0.5) * window.innerWidth;
            const sy = (-(wp.y * 0.5) + 0.5) * window.innerHeight;
            el.style.transform = `translate3d(${sx}px, ${sy}px, 0)`;
            el.style.opacity = '1';
        };

        const animate = () => {
            animId = requestAnimationFrame(animate);

            const delta = clock.getDelta();
            const time = clock.getElapsedTime();
            const dtScale = Math.min(delta * 60, 2.5);

            // Shaders animation
            skyMat.uniforms.uTime.value = time;
            skyMat.uniforms.uCamZ.value = camera.position.z;
            galMat.uniforms.uTime.value = time;
            galMat.uniforms.uRocketWorld.value.copy(rocketGroup.position);
            gridPlaneMat.uniforms.uTime.value = time;

            if (warpFactor > 0.02) {
                warpFactor *= 0.94;
            } else {
                warpFactor = 0.0;
            }
            starMat.uniforms.uWarp.value = warpFactor;

            // Camera Smoothing
            smoothCamZ += (targetCamZ - smoothCamZ) * 0.08;
            camera.position.z = smoothCamZ;

            smoothCamYaw += (camYaw - smoothCamYaw) * 0.08;
            smoothCamPitch += (camPitch - smoothCamPitch) * 0.08;
            camera.rotation.set(smoothCamPitch, smoothCamYaw, 0, 'YXZ');

            // --- FULL 360° ROCKET & ASTRONAUT TRACKING PLANE ---
            const camDir = camera.getWorldDirection(new THREE.Vector3());
            const planePoint = camera.position.clone().addScaledVector(camDir, 32.0);
            const viewPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(camDir.clone().negate(), planePoint);

            raycaster.setFromCamera(mouse, camera);
            const intersectPt = new THREE.Vector3();
            raycaster.ray.intersectPlane(viewPlane, intersectPt);
            if (intersectPt) {
                _finalTarget.copy(intersectPt);
            }

            const lerpAlpha = 1 - Math.pow(1 - 0.08, dtScale);
            rocketGroup.position.lerp(_finalTarget, lerpAlpha);

            // TRUE 3D ROCKET ORIENTATION: NOSE ALWAYS POINTS TOWARDS CURSOR ON ALL AXES!
            _targetDir.copy(_finalTarget).sub(rocketGroup.position);
            if (_targetDir.lengthSq() > 0.001) {
                _targetDir.normalize();
                _targetQuat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), _targetDir);
                rocketGroup.quaternion.slerp(_targetQuat, 1 - Math.pow(1 - 0.14, dtScale));
            }

            if (rocketGroup.children[0]) {
                rocketGroup.children[0].position.y = Math.sin(time * 5) * 0.15;
            }

            // Thruster Tail Position in Full 3D World Space
            _tailOffset.set(0, -2.2, 0).applyQuaternion(rocketGroup.quaternion);
            _tailPos.copy(rocketGroup.position).add(_tailOffset);
            _tailDir.set(0, -1, 0).applyQuaternion(rocketGroup.quaternion).normalize();

            // Spawn Fire Particles from Rocket Thrusters
            const p = particles[pIndex];
            p.life = Math.random() * 15 + 10;
            p.maxLife = p.life;
            p.pos.copy(_tailPos);
            p.velocity.set(
                _tailDir.x * 0.28 + (Math.random() - 0.5) * 0.05,
                _tailDir.y * 0.28 + (Math.random() - 0.5) * 0.05,
                _tailDir.z * 0.28 + (Math.random() - 0.5) * 0.05
            );
            pIndex = (pIndex + 1) % particleCount;

            for (let i = 0; i < particleCount; i++) {
                const pt = particles[i];
                if (pt.life > 0) {
                    pt.life -= dtScale;
                    if (pt.life <= 0) {
                        fireInstMesh.setMatrixAt(i, _zeroMatrix);
                    } else {
                        pt.pos.addScaledVector(pt.velocity, dtScale);
                        const sc = (pt.life / pt.maxLife) * 1.4;
                        _instScale.set(sc, sc, sc);
                        _instMatrix.compose(pt.pos, _instQuat, _instScale);
                        fireInstMesh.setMatrixAt(i, _instMatrix);
                    }
                }
            }
            fireInstMesh.instanceMatrix.needsUpdate = true;

            // Astronaut Spring Tether Physics
            _diff.copy(_tailPos).sub(astronautGroup.position);
            const ropeDist = _diff.length();
            const restingLength = 6.0;
            if (ropeDist > 0.0001) {
                const force = (ropeDist - restingLength) * 0.002 * dtScale;
                astroVelocity.addScaledVector(_diff, force / ropeDist);
            }

            let isThrusting = false;
            const speed = 0.015 * dtScale;
            if (keys['w'] || keys['W'] || keys['ArrowUp']) { astroVelocity.y += speed; isThrusting = true; }
            if (keys['s'] || keys['S'] || keys['ArrowDown']) { astroVelocity.y -= speed; isThrusting = true; }
            if (keys['a'] || keys['A'] || keys['ArrowLeft']) { astroVelocity.x -= speed; isThrusting = true; }
            if (keys['d'] || keys['D'] || keys['ArrowRight']) { astroVelocity.x += speed; isThrusting = true; }

            // Astronaut Oxygen Bubbles emission when thrusting
            if (isThrusting) {
                oxSpawnAccum += dtScale;
                if (oxSpawnAccum >= 0.85) {
                    oxSpawnAccum = 0;
                    const op = oxParticles[oxIndex];
                    op.life = Math.random() * 20 + 10;
                    op.maxLife = op.life;
                    op.pos.set(astronautGroup.position.x, astronautGroup.position.y - 0.3, astronautGroup.position.z);
                    op.velocity.set((Math.random() - 0.5) * 0.04, -0.04 - Math.random() * 0.04, (Math.random() - 0.5) * 0.04);
                    _instScale.set(1, 1, 1);
                    _instMatrix.compose(op.pos, _instQuat, _instScale);
                    oxInstMesh.setMatrixAt(oxIndex, _instMatrix);
                    oxIndex = (oxIndex + 1) % oxCount;
                }
            }

            for (let i = 0; i < oxCount; i++) {
                const op = oxParticles[i];
                if (op.life > 0) {
                    op.life -= dtScale;
                    if (op.life <= 0) {
                        oxInstMesh.setMatrixAt(i, _zeroMatrix);
                    } else {
                        op.pos.addScaledVector(op.velocity, dtScale);
                        const sc = op.life / op.maxLife;
                        _instScale.set(sc, sc, sc);
                        _instMatrix.compose(op.pos, _instQuat, _instScale);
                        oxInstMesh.setMatrixAt(i, _instMatrix);
                    }
                }
            }
            oxInstMesh.instanceMatrix.needsUpdate = true;

            astroVelocity.multiplyScalar(Math.pow(0.98, dtScale));
            astronautGroup.position.addScaledVector(astroVelocity, dtScale);

            if (ropeDist > 12) {
                const pullAlpha = (ropeDist - 12) * (1 - Math.pow(1 - 0.1, dtScale)) / ropeDist;
                astronautGroup.position.add(_diff.multiplyScalar(pullAlpha));
            }

            astronautGroup.rotation.y = time * 0.5;
            astronautGroup.rotation.z = -astroVelocity.x * 2;

            // Update Tether Rope
            const rPositions = rope.geometry.attributes.position.array;
            rPositions[0] = _tailPos.x; rPositions[1] = _tailPos.y; rPositions[2] = _tailPos.z;
            rPositions[3] = astronautGroup.position.x; rPositions[4] = astronautGroup.position.y + 0.5; rPositions[5] = astronautGroup.position.z;
            rope.geometry.attributes.position.needsUpdate = true;

            // --- SECTOR OBJECTS ANIMATION ---
            if (viewModeLocal === 'GALAXY_MAP') {
                clusterCalloutsList.forEach(c => {
                    const wp = new THREE.Vector3();
                    c.group.getWorldPosition(wp);
                    updateCalloutPosition(c.el, wp);
                });
            } else {
                activePlanetObjects.forEach(p => {
                    if (p.type === 'PROJECT_PLANET') {
                        p.group.rotation.y += delta * (p.rotSpeed || 0.3);
                        if (p.mat && p.mat.uniforms.uTime) p.mat.uniforms.uTime.value = time;
                        if (p.orbitPivot) {
                            p.orbitPivot.rotation.y += delta * (p.orbitSpeed || 0.35);
                            p.models.forEach(m => { m.rotation.y += delta * 0.85; });
                        }
                    } else if (p.type === 'SOLAR_SUN') {
                        if (p.sunMat && p.sunMat.uniforms.uTime) p.sunMat.uniforms.uTime.value = time;
                    } else if (p.type === 'SOLAR_MARS') {
                        p.group.rotation.y += delta * 0.32;
                        if (p.phobosOrbit) p.phobosOrbit.rotation.y += delta * 0.65;
                        if (p.deimosOrbit) p.deimosOrbit.rotation.y -= delta * 0.45;
                    } else if (p.type === 'SOLAR_EARTH') {
                        p.group.rotation.y += delta * 0.38;
                        if (p.moonOrbit) p.moonOrbit.rotation.y += delta * 0.55;
                    } else if (p.type === 'DELICIA_SYSTEM') {
                        if (p.jailsonMesh) p.jailsonMesh.rotation.y += delta * 0.45;
                        if (p.orangeOrbit) p.orangeOrbit.rotation.y += delta * 0.75;
                        p.oranges.forEach(o => { o.rotation.y += delta * 1.5; });
                    } else if (p.type === 'CHICKEN_SYSTEM') {
                        if (p.chickenMesh) p.chickenMesh.rotation.y += delta * 0.42;
                        if (p.eggOrbit) p.eggOrbit.rotation.y += delta * 0.85;
                    }
                });

                planetCallouts.forEach(c => {
                    const wp = new THREE.Vector3();
                    c.group.getWorldPosition(wp);
                    wp.y += 6.5;
                    updateCalloutPosition(c.el, wp);
                });
            }

            renderer.render(scene, camera);
        };

        animate();
        if (onLoadedRef.current) onLoadedRef.current();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('spet:space3-jump', handleJumpEvent);
            window.removeEventListener('spet:space3-unlock-sector', handleUnlockEvent);
            window.removeEventListener('spet:space3-unlock-all', handleUnlockAll);
            window.removeEventListener('contextmenu', handleContextMenu);
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointerup', handlePointerUp);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);

            clusterCalloutsList.forEach(c => { if (c.el && c.el.parentNode) c.el.parentNode.removeChild(c.el); });
            planetCallouts.forEach(c => { if (c.el && c.el.parentNode) c.el.parentNode.removeChild(c.el); });

            if (container && renderer.domElement && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [lang, unlockedSectors, unlockSector]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-auto select-none bg-black">
            {/* Three.js Canvas Root */}
            <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-auto cursor-crosshair" />

            {/* DOM Holographic Callouts Container */}
            <div ref={overlayRef} className="absolute inset-0 z-10 pointer-events-none" />

            <style>{`
                /* Mass Effect 3 Tactical Hologram Labels */
                .me3-cluster-label {
                    position: absolute;
                    top: 0;
                    left: 0;
                    transform: translate(-50%, -100%);
                    pointer-events: auto;
                    cursor: pointer;
                    user-select: none;
                    text-align: center;
                    white-space: nowrap;
                    will-change: transform, opacity;
                    z-index: 20;
                    transition: opacity 0.15s ease-out;
                }
                .me3-cluster-label .me3-label-title {
                    font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;
                    font-size: 13px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: #f1f5f9;
                    text-shadow: 0 0 10px rgba(56, 189, 248, 0.8), 0 2px 4px rgba(0,0,0,0.9);
                    transition: color 0.2s, text-shadow 0.2s, transform 0.2s;
                }
                .me3-cluster-label:hover .me3-label-title {
                    color: #38bdf8;
                    text-shadow: 0 0 16px rgba(56, 189, 248, 1), 0 0 30px rgba(56, 189, 248, 0.6);
                    transform: translateY(-2px);
                }
                .me3-cluster-label.gold .me3-label-title {
                    color: #fef08a;
                    text-shadow: 0 0 10px rgba(250, 204, 21, 0.8), 0 2px 4px rgba(0,0,0,0.9);
                }
                .me3-cluster-label.gold:hover .me3-label-title {
                    color: #facc15;
                    text-shadow: 0 0 18px rgba(250, 204, 21, 1), 0 0 32px rgba(250, 204, 21, 0.7);
                }
                .me3-cluster-label .me3-label-sub {
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                    font-size: 10px;
                    font-weight: 500;
                    color: #94a3b8;
                    letter-spacing: 0.05em;
                    margin-top: 2px;
                    opacity: 0.85;
                    text-shadow: 0 1px 3px rgba(0,0,0,0.9);
                }
                .me3-cluster-label:hover .me3-label-sub {
                    opacity: 1;
                    color: #e2e8f0;
                }

                /* Sector Planet Holographic Tag */
                .me3-planet-label {
                    position: absolute;
                    top: 0;
                    left: 0;
                    transform: translate(-50%, -100%);
                    pointer-events: auto;
                    cursor: pointer;
                    user-select: none;
                    text-align: center;
                    white-space: nowrap;
                    will-change: transform, opacity;
                    z-index: 20;
                    transition: opacity 0.15s ease-out;
                }
                .me3-planet-label .me3-planet-title {
                    font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                    color: #7dd3fc;
                    text-shadow: 0 0 8px rgba(56, 189, 248, 0.75), 0 2px 4px rgba(0,0,0,0.9);
                    transition: color 0.2s, transform 0.2s;
                }
                .me3-planet-label:hover .me3-planet-title {
                    color: #ffffff;
                    text-shadow: 0 0 16px rgba(56, 189, 248, 1);
                    transform: translateY(-2px);
                }
                .me3-planet-label .me3-planet-sub {
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                    font-size: 9px;
                    color: #94a3b8;
                    margin-top: 1px;
                    text-shadow: 0 1px 3px rgba(0,0,0,0.9);
                }
            `}</style>

            {/* Mass Relay Warp Jump Transit Cinematic Overlay (2.2s synced to audio) */}
            {warpCinematic.active && (
                <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center pointer-events-none select-none transition-all duration-300">
                    <div className="relative flex flex-col items-center space-y-4">
                        <div className="w-24 h-24 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin shadow-[0_0_35px_rgba(56,189,248,0.7)]"></div>
                        <div className="text-center space-y-1 font-mono">
                            <div className="text-xs text-cyan-400 font-bold tracking-widest uppercase animate-pulse">
                                [ MASS RELAY TRANSIT // WARP VELOCITY ]
                            </div>
                            <div className="text-sm text-white font-bold tracking-wider">
                                {warpCinematic.targetName}
                            </div>
                            <div className="text-[10px] text-cyan-300/70">
                                {lang === 'pt' ? 'CALIBRANDO MATRIZ DE PROPULSÃO...' : 'CALIBRATING DRIVE CORE...'}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Project Card Overlay (spawns when clicking a project planet!) */}
            {selectedProjectCard && (
                <div 
                    onClick={() => setSelectedProjectCard(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none"
                >
                    <div 
                        onClick={(e) => e.stopPropagation()}
                        className="floating-project-card relative max-w-md w-full glass-panel rounded-2xl overflow-hidden border border-cyan-500/40 bg-[#060b16]/95 p-5 shadow-[0_0_40px_rgba(56,189,248,0.35)] animate-in fade-in zoom-in-95 duration-200"
                    >
                        {/* Prominent High-Contrast Close [X] Button */}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProjectCard(null);
                            }}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/80 hover:bg-rose-600 text-white border border-white/20 hover:border-rose-500 flex items-center justify-center transition-all text-sm z-50 cursor-pointer shadow-lg"
                            title={lang === 'pt' ? 'Fechar (ESC)' : 'Close (ESC)'}
                            aria-label="Close"
                        >
                            <i className="fas fa-times text-xs"></i>
                        </button>

                        {/* Card Image / Preview */}
                        {selectedProjectCard.image && (
                            <div className="h-44 w-full bg-[#03060c] rounded-xl overflow-hidden relative border border-white/10 mb-4">
                                {selectedProjectCard.image.endsWith('.mp4') ? (
                                    <video
                                        src={selectedProjectCard.image}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src={selectedProjectCard.image}
                                        alt={selectedProjectCard.title[lang] || selectedProjectCard.title}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#060b16] via-transparent to-transparent opacity-80" />
                                <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                    {selectedProjectCard.categoryLabel ? (selectedProjectCard.categoryLabel[lang] || selectedProjectCard.categoryLabel.pt) : selectedProjectCard.category}
                                </div>
                            </div>
                        )}

                        {/* Title & Description */}
                        <h3 className="text-base font-bold text-white mb-1.5 pr-8">
                            {typeof selectedProjectCard.title === 'object' ? (selectedProjectCard.title[lang] || selectedProjectCard.title.pt) : selectedProjectCard.title}
                        </h3>

                        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                            {typeof selectedProjectCard.description === 'object' ? (selectedProjectCard.description[lang] || selectedProjectCard.description.pt) : selectedProjectCard.description}
                        </p>

                        {/* Tags */}
                        {selectedProjectCard.tags && (
                            <div className="flex flex-wrap gap-1 mb-4">
                                {selectedProjectCard.tags.slice(0, 4).map((tag, i) => (
                                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.05] text-slate-300 border border-white/[0.08] font-mono">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Action Buttons (same as homepage cards!) */}
                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                            <button
                                type="button"
                                onClick={() => {
                                    const p = selectedProjectCard;
                                    setSelectedProjectCard(null);
                                    window.dispatchEvent(new CustomEvent('spet:open-project-modal', { detail: { projectId: p.id } }));
                                }}
                                className="text-xs font-semibold text-primary hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                                <span>{lang === 'pt' ? 'Ver Estudo de Caso' : 'View Case Study'}</span>
                                <i className="fas fa-arrow-right text-[10px]"></i>
                            </button>

                            <div className="flex items-center gap-2">
                                {selectedProjectCard.repo && !selectedProjectCard.isLocked && (
                                    <a
                                        href={selectedProjectCard.repo}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-7 h-7 rounded-md bg-white/[0.06] hover:bg-white/[0.15] text-slate-200 hover:text-white flex items-center justify-center transition-colors text-xs"
                                        title="Source Code"
                                    >
                                        <i className={selectedProjectCard.repo.includes('github.com') ? "fab fa-github" : "fab fa-gitlab"}></i>
                                    </a>
                                )}
                                {selectedProjectCard.live && selectedProjectCard.id !== 'free_3d_assets' && selectedProjectCard.id !== 'technical_journal' && (
                                    <a
                                        href={selectedProjectCard.live}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-7 h-7 rounded-md bg-primary/20 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-colors text-xs"
                                        title="Live Link"
                                    >
                                        <i className="fas fa-external-link-alt"></i>
                                    </a>
                                )}
                                {selectedProjectCard.journalId && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const jId = selectedProjectCard.journalId;
                                            setSelectedProjectCard(null);
                                            if (typeof onExitFullscreenGalaxy === 'function') onExitFullscreenGalaxy();
                                            window.location.href = `/journal/${jId}/`;
                                        }}
                                        className="w-7 h-7 rounded-md bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-white flex items-center justify-center transition-colors text-xs cursor-pointer"
                                        title="Technical Journal Article"
                                    >
                                        <img src="/assets/icons/notepad_file-0.png" alt="" className="w-3.5 h-3.5 pixelated" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Clean Minimal Controls (No generic/vibecoded badges, no Q/3D clutters) */}
            <div className="fixed top-4 left-4 z-40 flex items-center gap-2 select-none pointer-events-auto">
                <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent('spet:open-terminal'))}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#030712]/80 hover:bg-cyan-950/60 border border-cyan-500/40 hover:border-cyan-400 text-xs font-mono text-cyan-300 hover:text-white backdrop-blur-md transition-all cursor-pointer shadow-sm rounded-sm"
                    title={lang === 'pt' ? 'Abrir Terminal CLI (Ctrl+K)' : 'Open CLI Terminal (Ctrl+K)'}
                >
                    <i className="fas fa-terminal text-[10px] text-cyan-400"></i>
                    <span>CLI</span>
                </button>

                {viewMode === 'SECTOR_FLIGHT' && (
                    <button
                        type="button"
                        onClick={() => { if (exitSectorFnRef.current) exitSectorFnRef.current(); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#030712]/80 hover:bg-amber-950/60 border border-amber-500/50 hover:border-amber-400 text-xs font-mono text-amber-300 hover:text-white backdrop-blur-md transition-all cursor-pointer shadow-sm rounded-sm"
                    >
                        <i className="fas fa-chevron-left text-[10px]"></i>
                        <span>{lang === 'pt' ? 'MAPA' : 'MAP'}</span>
                        <span className="text-[10px] opacity-70">[ESC]</span>
                    </button>
                )}

                {/* Quick Sector Switcher Pills */}
                <div className="hidden md:flex items-center gap-1 bg-[#030712]/80 border border-cyan-500/30 px-1 py-1 rounded-sm backdrop-blur-md">
                    {CLUSTERS.filter(c => !c.isSecret || unlockedSectors[c.id]).map(c => {
                        const isActive = viewMode === 'SECTOR_FLIGHT' && activeClusterId === c.id;
                        return (
                            <button
                                key={c.id}
                                type="button"
                                onClick={() => {
                                    if (enterSectorFnRef.current) enterSectorFnRef.current(c.id);
                                }}
                                className={`px-2 py-0.5 text-[10px] font-mono transition-all cursor-pointer rounded-xs ${
                                    isActive
                                        ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/60 font-bold shadow-[0_0_8px_rgba(56,189,248,0.3)]'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                                }`}
                                title={typeof c.name === 'object' ? (c.name[lang] || c.name.pt) : c.name}
                            >
                                {c.id === 'tools' ? 'TOOLS' : (c.id === 'core' ? 'CORE' : (c.id === 'gamedev' ? 'GAMEDEV' : (c.id === 'reversing' ? 'REVERSING' : c.id.toUpperCase())))}
                            </button>
                        );
                    })}
                </div>

                {isFullscreenGalaxyMode && (
                    <button
                        type="button"
                        onClick={onExitFullscreenGalaxy}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#030712]/80 hover:bg-rose-950/60 border border-white/20 hover:border-rose-400 text-xs font-mono text-slate-300 hover:text-white backdrop-blur-md transition-all cursor-pointer shadow-sm rounded-sm"
                        title="Sair do modo Galaxy Map"
                    >
                        <i className="fas fa-times text-[10px]"></i>
                        <span>{lang === 'pt' ? 'SAIR' : 'EXIT'}</span>
                    </button>
                )}
            </div>

            {/* Bottom-Center Tactical Guide with Custom Visual Hardware Mouse & Key Icons (Never overlaps Astro mascot!) */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-3.5 px-4 py-1.5 bg-[#030712]/90 border border-cyan-500/30 rounded-sm text-[11px] font-mono text-slate-300 backdrop-blur-md select-none pointer-events-none shadow-[0_0_25px_rgba(0,0,0,0.85)]">
                <div className="flex items-center gap-1.5 text-cyan-300">
                    <svg className="w-3.5 h-4 inline-block text-cyan-400 shrink-0" viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="32" rx="10" />
                        <line x1="12" y1="2" x2="12" y2="15" />
                        <line x1="2" y1="15" x2="22" y2="15" />
                        <path d="M 2 12 A 10 10 0 0 1 12 2 L 12 15 L 2 15 Z" fill="#38bdf8" stroke="none" />
                    </svg>
                    <span>{viewMode === 'GALAXY_MAP' ? (lang === 'pt' ? 'Entrar no Sistema' : 'Enter System') : (lang === 'pt' ? 'Abrir Card' : 'Open Card')}</span>
                </div>

                <span className="text-white/20">|</span>

                <div className="flex items-center gap-1.5 text-slate-300">
                    <svg className="w-3.5 h-4 inline-block text-cyan-400 shrink-0" viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="32" rx="10" />
                        <line x1="12" y1="2" x2="12" y2="15" />
                        <line x1="2" y1="15" x2="22" y2="15" />
                        <path d="M 12 2 A 10 10 0 0 1 22 12 L 22 15 L 12 15 Z" fill="#38bdf8" stroke="none" />
                    </svg>
                    <span>{lang === 'pt' ? 'Free Look 360°' : '360° Free Look'}</span>
                </div>

                <span className="text-white/20">|</span>

                <div className="flex items-center gap-1.5 text-slate-300">
                    <svg className="w-3.5 h-4 inline-block text-cyan-400 shrink-0" viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="32" rx="10" />
                        <rect x="10" y="6" width="4" height="8" rx="2" fill="#38bdf8" stroke="none" />
                    </svg>
                    <span>Zoom</span>
                </div>

                <span className="text-white/20">|</span>

                <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="px-1.5 py-0.2 rounded bg-white/10 text-[9px] font-mono text-slate-200 border border-white/20">ESC</span>
                    <span>{lang === 'pt' ? 'Voltar' : 'Exit'}</span>
                </div>
            </div>

            {/* 3D Model Credits Attribution Drawer (CC-BY 4.0) */}
            {showAttributions && (
                <div 
                    onClick={() => setShowAttributions(false)}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md select-none"
                >
                    <div 
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-md w-full bg-[#0a0f1d] border border-cyan-500/40 rounded-2xl p-6 text-xs text-slate-300 space-y-3 font-mono shadow-[0_0_30px_rgba(56,189,248,0.3)] max-h-[80vh] overflow-y-auto"
                    >
                        <div className="flex items-center justify-between pb-2 border-b border-white/10 text-cyan-300 font-bold text-sm">
                            <span>CRÉDITOS DOS MODELOS 3D (CC-BY 4.0)</span>
                            <button
                                type="button"
                                onClick={() => setShowAttributions(false)}
                                className="text-slate-400 hover:text-white text-base cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="space-y-2 text-[11px] leading-relaxed text-slate-300">
                            <p>• "Journal" by FlukierJupiter (https://skfb.ly/66z8C) — Licensed under CC-BY 4.0</p>
                            <p>• "RaY Gun" by SovietCream (https://skfb.ly/oHYqX) — Licensed under CC-BY 4.0</p>
                            <p>• "Mystery Box" by MDTOWERZ (https://skfb.ly/oQNrK) — Licensed under CC-BY 4.0</p>
                            <p>• "Lock And Key" by Mehdi Shahsavan (https://skfb.ly/oTpNS) — Licensed under CC-BY 4.0</p>
                            <p>• "Cactuar (Final Fantasy)" by mescri (https://skfb.ly/oFy9t) — Licensed under CC-BY 4.0</p>
                            <p className="text-cyan-400 pt-2 font-semibold">
                                {lang === 'pt' 
                                    ? '* Modelos não listados acima (Outcaster Pistol, SpetDev 3D Logo, Juggernog, Satélite, Nuke T6, RAM Stick, BO3 Logo, Cards YGO, etc.) foram modelados ou convertidos por Eduardo Gelain (SpetDev).' 
                                    : '* Models not listed above were modeled or converted by Eduardo Gelain (SpetDev).'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Dynamic Sector Soundtrack Streaming Player */}
            <CosmicTrackPlayer
                activeSectorTrack={activeTrack}
                settings={settings}
                isJukeboxActive={Boolean(isJukeboxPlaying)}
                isEasterActive={Boolean(isAnyEasterGameOpen)}
                lang={lang}
            />
        </div>
    );
};


const SpaceCanvas = ({ theme = 'space' }) => {
    const canvasRef = useRef(null);
    const themeRef = useRef(theme);
    const moonPosRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth * 0.8 : 800, y: typeof window !== 'undefined' ? window.innerHeight * 0.22 : 200 });
    const rocketRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 400, y: typeof window !== 'undefined' ? window.innerHeight * 0.35 : 250, angle: -Math.PI / 4 });
    const jet2Ref = useRef({ x: typeof window !== 'undefined' ? window.innerWidth * 0.5 - 60 : 340, y: typeof window !== 'undefined' ? window.innerHeight * 0.35 - 30 : 220, vx: 0, vy: 0, angle: -Math.PI / 4 });
    const astroRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth * 0.5 + 50 : 450, y: typeof window !== 'undefined' ? window.innerHeight * 0.35 + 50 : 300, vx: 0, vy: 0, angle: 0 });
    const mouseRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 400, y: typeof window !== 'undefined' ? window.innerHeight * 0.35 : 250, lastX: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 400, lastY: typeof window !== 'undefined' ? window.innerHeight * 0.35 : 250 });
    const particlesRef = useRef([]);
    const cloudsRef = useRef([]);
    const keysRef = useRef({});
    const hasMouseMovedRef = useRef(true);

    useEffect(() => {
        themeRef.current = theme;
        if (theme === 'sky' && cloudsRef.current.length === 0) {
            initClouds();
        }
    }, [theme]);

    const initClouds = () => {
        cloudsRef.current = Array.from({ length: 9 }).map((_, i) => ({
            x: (i / 9) * window.innerWidth + (Math.random() * 80 - 40),
            y: Math.random() * (window.innerHeight * 0.72) + 25,
            speed: Math.random() * 0.35 + 0.15,
            scale: Math.random() * 0.6 + 0.65,
            opacity: Math.random() * 0.25 + 0.55,
            blobs: [
                { ox: 0, oy: 0, r: 26 },
                { ox: 22, oy: -10, r: 34 },
                { ox: 50, oy: -6, r: 36 },
                { ox: 76, oy: 0, r: 26 },
                { ox: 38, oy: 12, r: 30 }
            ]
        }));
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let stars = [];

        const initStars = () => {
            stars = Array.from({ length: 300 }).map(() => ({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                z: Math.random() * window.innerWidth,
                size: Math.random() * 1.5 + 0.5
            }));
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            moonPosRef.current = { x: window.innerWidth * 0.82, y: window.innerHeight * 0.2 };
            initStars();
            initClouds();
        };

        handleResize();

        const handleKeyDown = (e) => {
            const activeTag = document.activeElement ? document.activeElement.tagName.toUpperCase() : '';
            if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                keysRef.current[e.key] = true;
            }
        };

        const handleKeyUp = (e) => {
            keysRef.current[e.key] = false;
        };

        const handleMouseMove = (e) => {
            const clientX = e.clientX;
            const clientY = e.clientY;
            if (!hasMouseMovedRef.current) {
                mouseRef.current = { x: clientX, y: clientY, lastX: clientX, lastY: clientY };
                rocketRef.current.x = clientX;
                rocketRef.current.y = clientY;
                jet2Ref.current.x = clientX - 60;
                jet2Ref.current.y = clientY - 30;
                astroRef.current.x = clientX + 40;
                astroRef.current.y = clientY + 40;
                hasMouseMovedRef.current = true;
            } else {
                mouseRef.current.x = clientX;
                mouseRef.current.y = clientY;
            }
        };

        window.addEventListener('keydown', handleKeyDown, { passive: false });
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) handleMouseMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
        }, { passive: true });
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) handleMouseMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
        }, { passive: true });

        // Helper to draw a modern supersonic fighter jet
        const drawFighterJet = (ctx, x, y, angle, isLead = true) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);

            // Fuselage & Delta Wings
            ctx.fillStyle = isLead ? '#cbd5e1' : '#94a3b8';
            ctx.beginPath();
            ctx.moveTo(22, 0); // Pointed nose
            ctx.lineTo(8, 3.5);
            ctx.lineTo(-4, 18); // Starboard wingtip
            ctx.lineTo(-8, 18);
            ctx.lineTo(-6, 4);
            ctx.lineTo(-18, 12); // Starboard stabilizer
            ctx.lineTo(-20, 12);
            ctx.lineTo(-17, 3);
            ctx.lineTo(-19, 0); // Center exhaust
            ctx.lineTo(-17, -3);
            ctx.lineTo(-20, -12); // Port stabilizer
            ctx.lineTo(-18, -12);
            ctx.lineTo(-6, -4);
            ctx.lineTo(-8, -18); // Port wingtip
            ctx.lineTo(-4, -18);
            ctx.lineTo(8, -3.5);
            ctx.closePath();
            ctx.fill();

            // Wing panel accent lines
            ctx.strokeStyle = isLead ? '#94a3b8' : '#64748b';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(6, 3);
            ctx.lineTo(-4, 15);
            ctx.moveTo(6, -3);
            ctx.lineTo(-4, -15);
            ctx.stroke();

            // Twin angled tailfins
            ctx.fillStyle = isLead ? '#94a3b8' : '#64748b';
            ctx.beginPath();
            ctx.moveTo(-10, 4);
            ctx.lineTo(-16, 7);
            ctx.lineTo(-18, 4);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(-10, -4);
            ctx.lineTo(-16, -7);
            ctx.lineTo(-18, -4);
            ctx.closePath();
            ctx.fill();

            // Glass canopy with sky reflection
            const canopyGrad = ctx.createLinearGradient(0, -2, 10, 2);
            canopyGrad.addColorStop(0, '#38bdf8');
            canopyGrad.addColorStop(1, '#0284c7');
            ctx.fillStyle = canopyGrad;
            ctx.beginPath();
            ctx.ellipse(3, 0, 7, 2.8, 0, 0, Math.PI * 2);
            ctx.fill();

            // Twin afterburner flames
            ctx.fillStyle = 'rgba(255, 130, 0, 0.9)';
            ctx.beginPath();
            ctx.moveTo(-17, -3);
            ctx.lineTo(-26, 0);
            ctx.lineTo(-17, 3);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#fef08a';
            ctx.beginPath();
            ctx.moveTo(-17, -1.5);
            ctx.lineTo(-22, 0);
            ctx.lineTo(-17, 1.5);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        };

        // Helper to draw Astro as a Parachuter (Para)
        const drawParachuter = (ctx, x, y, angle, vx, vy) => {
            ctx.save();
            ctx.translate(x, y);

            // Aerodynamic sway angle based on glide velocity
            const sway = Math.max(-0.35, Math.min(0.35, vx * 0.08));
            ctx.rotate(sway);

            // 1. Suspension lines (shroud cords from canopy down to harness)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(-25, -36);
            ctx.lineTo(0, -3);
            ctx.moveTo(-9, -40);
            ctx.lineTo(0, -3);
            ctx.moveTo(9, -40);
            ctx.lineTo(0, -3);
            ctx.moveTo(25, -36);
            ctx.lineTo(0, -3);
            ctx.stroke();

            // 2. Parachute Canopy (curved ram-air aerodynamic canopy above)
            ctx.fillStyle = '#0284c7';
            ctx.beginPath();
            ctx.moveTo(-26, -35);
            ctx.bezierCurveTo(-20, -54, 20, -54, 26, -35);
            ctx.bezierCurveTo(16, -40, -16, -40, -26, -35);
            ctx.closePath();
            ctx.fill();

            // Cell 1: Cyan
            ctx.fillStyle = '#00aaff';
            ctx.beginPath();
            ctx.moveTo(-26, -35);
            ctx.bezierCurveTo(-22, -50, -14, -52, -13, -38);
            ctx.bezierCurveTo(-18, -40, -22, -38, -26, -35);
            ctx.closePath();
            ctx.fill();

            // Cell 2: White
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.moveTo(-13, -38);
            ctx.bezierCurveTo(-14, -52, 0, -54, 0, -40);
            ctx.bezierCurveTo(-5, -40, -10, -39, -13, -38);
            ctx.closePath();
            ctx.fill();

            // Cell 3: Orange
            ctx.fillStyle = '#f97316';
            ctx.beginPath();
            ctx.moveTo(0, -40);
            ctx.bezierCurveTo(0, -54, 14, -52, 13, -38);
            ctx.bezierCurveTo(9, -39, 4, -40, 0, -40);
            ctx.closePath();
            ctx.fill();

            // Cell 4: Cyan
            ctx.fillStyle = '#00aaff';
            ctx.beginPath();
            ctx.moveTo(13, -38);
            ctx.bezierCurveTo(14, -52, 22, -50, 26, -35);
            ctx.bezierCurveTo(22, -38, 18, -40, 13, -38);
            ctx.closePath();
            ctx.fill();

            // 3. Astro Para Body
            // Parachute harness container
            ctx.fillStyle = '#334155';
            ctx.fillRect(-4, -4, 8, 9);

            // Flight suit
            ctx.fillStyle = '#e2e8f0';
            ctx.fillRect(-5, 0, 10, 11);

            // Helmet
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(0, -6, 6, 0, Math.PI * 2);
            ctx.fill();

            // Visor
            ctx.fillStyle = '#00aaff';
            ctx.beginPath();
            ctx.arc(1.5, -6, 3, 0, Math.PI * 2);
            ctx.fill();

            // Arms holding risers
            ctx.fillStyle = '#94a3b8';
            ctx.beginPath();
            ctx.moveTo(-5, 0); ctx.lineTo(-8, -4); ctx.lineTo(-7, 2); ctx.closePath(); ctx.fill();
            ctx.beginPath();
            ctx.moveTo(5, 0); ctx.lineTo(8, -4); ctx.lineTo(7, 2); ctx.closePath(); ctx.fill();

            // Legs swaying gently
            const legSwing = Math.sin(Date.now() * 0.006) * 1.5;
            ctx.fillStyle = '#e2e8f0';
            ctx.fillRect(-4, 11, 3, 7 + legSwing);
            ctx.fillRect(1, 11, 3, 7 - legSwing);

            // Boots
            ctx.fillStyle = '#1e293b';
            ctx.fillRect(-4.5, 18 + legSwing, 4, 3);
            ctx.fillRect(0.5, 18 - legSwing, 4, 3);

            ctx.restore();
        };

        const render = () => {
            const isSky = themeRef.current === 'sky';

            if (isSky) {
                // --- EARTH SKY THEME ---
                // Atmospheric Blue Sky Gradient
                const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
                skyGrad.addColorStop(0, '#091c36');
                skyGrad.addColorStop(0.3, '#103965');
                skyGrad.addColorStop(0.65, '#17528e');
                skyGrad.addColorStop(1, '#236ca8');
                ctx.fillStyle = skyGrad;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Radiant Sun instead of the Moon
                const sunX = moonPosRef.current.x;
                const sunY = moonPosRef.current.y;

                const sunGlow = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 130);
                sunGlow.addColorStop(0, 'rgba(255, 245, 180, 0.45)');
                sunGlow.addColorStop(0.35, 'rgba(253, 224, 71, 0.18)');
                sunGlow.addColorStop(0.7, 'rgba(245, 158, 11, 0.06)');
                sunGlow.addColorStop(1, 'rgba(245, 158, 11, 0)');
                ctx.fillStyle = sunGlow;
                ctx.beginPath();
                ctx.arc(sunX, sunY, 130, 0, Math.PI * 2);
                ctx.fill();

                const sunCore = ctx.createRadialGradient(sunX, sunY, 4, sunX, sunY, 30);
                sunCore.addColorStop(0, '#ffffff');
                sunCore.addColorStop(0.4, '#fef08a');
                sunCore.addColorStop(0.85, '#facc15');
                sunCore.addColorStop(1, '#eab308');
                ctx.fillStyle = sunCore;
                ctx.beginPath();
                ctx.arc(sunX, sunY, 30, 0, Math.PI * 2);
                ctx.fill();

                // Shimmering Solar Rays
                ctx.save();
                ctx.translate(sunX, sunY);
                ctx.strokeStyle = 'rgba(254, 240, 138, 0.22)';
                ctx.lineWidth = 2;
                const rayTime = Date.now() * 0.0004;
                for (let r = 0; r < 8; r++) {
                    const rayAngle = (r * Math.PI / 4) + rayTime;
                    ctx.beginPath();
                    ctx.moveTo(Math.cos(rayAngle) * 34, Math.sin(rayAngle) * 34);
                    ctx.lineTo(Math.cos(rayAngle) * 70, Math.sin(rayAngle) * 70);
                    ctx.stroke();
                }
                ctx.restore();

                // Drifting Earth Clouds
                cloudsRef.current.forEach(cloud => {
                    cloud.x += cloud.speed;
                    if (cloud.x > canvas.width + 120) {
                        cloud.x = -130;
                        cloud.y = Math.random() * (canvas.height * 0.72) + 25;
                    }
                    ctx.save();
                    ctx.translate(cloud.x, cloud.y);
                    ctx.scale(cloud.scale, cloud.scale);
                    ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity * 0.85})`;
                    cloud.blobs.forEach(b => {
                        ctx.beginPath();
                        ctx.arc(b.ox, b.oy, b.r, 0, Math.PI * 2);
                        ctx.fill();
                    });
                    // Soft under-cloud depth shading
                    ctx.fillStyle = `rgba(200, 220, 240, ${cloud.opacity * 0.35})`;
                    ctx.beginPath();
                    ctx.ellipse(38, 12, 46, 14, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                });

            } else {
                // --- COSMIC SPACE THEME ---
                ctx.fillStyle = '#050505';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Stars
                ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
                stars.forEach(star => {
                    star.z -= 0.35;
                    if (star.z <= 0) {
                        star.z = canvas.width;
                        star.x = Math.random() * canvas.width;
                        star.y = Math.random() * canvas.height;
                    }
                    const perspective = canvas.width / star.z;
                    const px = (star.x - canvas.width / 2) * perspective + canvas.width / 2;
                    const py = (star.y - canvas.height / 2) * perspective + canvas.height / 2;
                    const pSize = star.size * perspective * 0.45;

                    ctx.beginPath();
                    ctx.arc(px, py, pSize > 0 ? pSize : 0.1, 0, Math.PI * 2);
                    ctx.fill();
                });

                // Ambient Moon
                const moonX = moonPosRef.current.x;
                const moonY = moonPosRef.current.y;
                const gradient = ctx.createRadialGradient(moonX, moonY, 15, moonX, moonY, 80);
                gradient.addColorStop(0, 'rgba(0, 170, 255, 0.12)');
                gradient.addColorStop(1, 'rgba(0, 170, 255, 0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(moonX, moonY, 80, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#e2e8f0';
                ctx.beginPath();
                ctx.arc(moonX, moonY, 28, 0, Math.PI * 2);
                ctx.fill();

                // Moon Craters
                ctx.fillStyle = 'rgba(15, 23, 42, 0.25)';
                ctx.beginPath(); ctx.arc(moonX - 8, moonY - 8, 5, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(moonX + 10, moonY + 4, 7, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(moonX - 4, moonY + 12, 3.5, 0, Math.PI * 2); ctx.fill();
            }

            if (!hasMouseMovedRef.current) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            const rocket = rocketRef.current;
            const jet2 = jet2Ref.current;
            const astro = astroRef.current;
            const mouse = mouseRef.current;

            const friction = isSky ? 0.94 : 0.93;
            const astroThrust = isSky ? 0.7 : 0.75;
            let isThrusting = false;

            if (keysRef.current['ArrowLeft']) { astro.vx -= astroThrust; isThrusting = true; }
            if (keysRef.current['ArrowRight']) { astro.vx += astroThrust; isThrusting = true; }
            if (keysRef.current['ArrowUp']) { astro.vy -= astroThrust; isThrusting = true; }
            if (keysRef.current['ArrowDown']) { astro.vy += astroThrust; isThrusting = true; }

            if (isThrusting && Math.random() < 0.5) {
                particlesRef.current.push({
                    type: isSky ? 'contrail' : 'oxy',
                    x: astro.x - Math.cos(astro.angle) * 10,
                    y: astro.y - Math.sin(astro.angle) * 10,
                    vx: -Math.cos(astro.angle) * 1.5 + (Math.random() - 0.5),
                    vy: -Math.sin(astro.angle) * 1.5 + (Math.random() - 0.5),
                    life: 1.0,
                    size: Math.random() * 2.5 + 1
                });
            }

            if (Math.abs(astro.vx) > 0.3 || Math.abs(astro.vy) > 0.3) {
                const targetAngle = Math.atan2(astro.vy, astro.vx);
                let diff = targetAngle - astro.angle;
                while (diff < -Math.PI) diff += Math.PI * 2;
                while (diff > Math.PI) diff -= Math.PI * 2;
                astro.angle += diff * 0.12;
            }

            rocket.x = mouse.x;
            rocket.y = mouse.y;

            const dxMouse = mouse.x - mouse.lastX;
            const dyMouse = mouse.y - mouse.lastY;
            if (dxMouse * dxMouse + dyMouse * dyMouse > 1) {
                const targetAngle = Math.atan2(dyMouse, dxMouse);
                let diff = targetAngle - rocket.angle;
                while (diff < -Math.PI) diff += Math.PI * 2;
                while (diff > Math.PI) diff -= Math.PI * 2;
                rocket.angle += diff * 0.22;

                if (Math.random() < 0.5) {
                    particlesRef.current.push({
                        type: isSky ? 'contrail' : 'fire',
                        x: rocket.x - Math.cos(rocket.angle) * 14,
                        y: rocket.y - Math.sin(rocket.angle) * 14,
                        vx: -Math.cos(rocket.angle) * 2 + (Math.random() - 0.5) * 1.5,
                        vy: -Math.sin(rocket.angle) * 2 + (Math.random() - 0.5) * 1.5,
                        life: 1.0,
                        size: Math.random() * 3 + 1.5
                    });
                }
            }
            mouse.lastX = mouse.x;
            mouse.lastY = mouse.y;

            // Wingman Jet 2 follows Lead Jet 1 in formation flight (Earth Sky)
            if (isSky) {
                const wingmanTargetX = rocket.x - Math.cos(rocket.angle) * 65 + Math.sin(rocket.angle) * 28;
                const wingmanTargetY = rocket.y - Math.sin(rocket.angle) * 65 - Math.cos(rocket.angle) * 28;
                jet2.vx = (wingmanTargetX - jet2.x) * 0.09;
                jet2.vy = (wingmanTargetY - jet2.y) * 0.09;
                jet2.x += jet2.vx;
                jet2.y += jet2.vy;
                const distJet2 = Math.hypot(jet2.vx, jet2.vy);
                if (distJet2 > 0.4) {
                    const targetAngle2 = Math.atan2(rocket.y - jet2.y, rocket.x - jet2.x);
                    let diff2 = targetAngle2 - jet2.angle;
                    while (diff2 < -Math.PI) diff2 += Math.PI * 2;
                    while (diff2 > Math.PI) diff2 -= Math.PI * 2;
                    jet2.angle += diff2 * 0.16;
                }
                if (Math.random() < 0.4) {
                    particlesRef.current.push({
                        type: 'contrail',
                        x: jet2.x - Math.cos(jet2.angle) * 15,
                        y: jet2.y - Math.sin(jet2.angle) * 15,
                        vx: -Math.cos(jet2.angle) * 1.5 + (Math.random() - 0.5),
                        vy: -Math.sin(jet2.angle) * 1.5 + (Math.random() - 0.5),
                        life: 1.0,
                        size: Math.random() * 2.5 + 1.2
                    });
                }
            }

            // Tether / Wind drag between lead aircraft and astronaut/para
            const dxTether = astro.x - rocket.x;
            const dyTether = astro.y - rocket.y;
            const distance = Math.hypot(dxTether, dyTether);
            const tetherLength = isSky ? 160 : 140;

            if (distance > tetherLength) {
                const stretch = distance - tetherLength;
                const force = stretch * (isSky ? 0.06 : 0.08);
                const angle = Math.atan2(dyTether, dxTether);
                astro.vx -= Math.cos(angle) * force;
                astro.vy -= Math.sin(angle) * force;
            }

            // Downward gravity drift for parachuter
            if (isSky) {
                astro.vy += 0.08; // gentle descent
            }

            astro.vx *= friction;
            astro.vy *= friction;
            astro.x += astro.vx;
            astro.y += astro.vy;

            // Screen boundary clamping
            if (astro.x < 10) { astro.x = 10; astro.vx = Math.abs(astro.vx) * 0.5; }
            if (astro.x > canvas.width - 10) { astro.x = canvas.width - 10; astro.vx = -Math.abs(astro.vx) * 0.5; }
            if (astro.y < 10) { astro.y = 10; astro.vy = Math.abs(astro.vy) * 0.5; }
            if (astro.y > canvas.height - 10) { astro.y = canvas.height - 10; astro.vy = -Math.abs(astro.vy) * 0.5; }

            // Line / Streamer between lead and actor
            if (distance < canvas.width / 2) {
                ctx.strokeStyle = isSky ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 170, 255, 0.25)';
                ctx.lineWidth = 1;
                ctx.setLineDash([3, 4]);
                ctx.beginPath();
                ctx.moveTo(astro.x, astro.y);
                ctx.lineTo(rocket.x, rocket.y);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // Particles
            for (let i = particlesRef.current.length - 1; i >= 0; i--) {
                const p = particlesRef.current[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= p.type === 'fire' ? 0.035 : 0.02;
                if (p.life <= 0) {
                    particlesRef.current.splice(i, 1);
                } else {
                    if (p.type === 'fire') {
                        ctx.fillStyle = `rgba(255, 80, 0, ${p.life * 0.8})`;
                    } else if (p.type === 'contrail') {
                        ctx.fillStyle = `rgba(255, 255, 255, ${p.life * 0.7})`;
                    } else {
                        ctx.fillStyle = `rgba(226, 232, 240, ${p.life * 0.6})`;
                    }
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            if (isSky) {
                // --- SKY THEME ACTORS ---
                // Parachuter (Astro as Para)
                drawParachuter(ctx, astro.x, astro.y, astro.angle, astro.vx, astro.vy);

                // Wingman Fighter Jet (Following Lead Jet)
                drawFighterJet(ctx, jet2.x, jet2.y, jet2.angle, false);

                // Lead Fighter Jet (Following Mouse)
                drawFighterJet(ctx, rocket.x, rocket.y, rocket.angle, true);
            } else {
                // --- SPACE THEME ACTORS ---
                // Astronaut
                ctx.save();
                ctx.translate(astro.x, astro.y);
                ctx.rotate(astro.angle + Math.PI / 2);
                ctx.fillStyle = '#e2e8f0';
                ctx.fillRect(-6, -2, 12, 14);
                ctx.fillStyle = '#ffffff';
                ctx.beginPath(); ctx.arc(0, -6, 7, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#00aaff';
                ctx.beginPath(); ctx.arc(2, -6, 3.5, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#94a3b8';
                ctx.fillRect(-8, 0, 3.5, 9);
                ctx.fillStyle = '#e2e8f0';
                ctx.fillRect(-5, 12, 3.5, 7);
                ctx.fillRect(1, 12, 3.5, 7);
                ctx.restore();

                // Rocket
                ctx.save();
                ctx.translate(rocket.x, rocket.y);
                ctx.rotate(rocket.angle);
                ctx.fillStyle = '#e2e8f0';
                ctx.beginPath();
                ctx.moveTo(18, 0);
                ctx.lineTo(-12, 10);
                ctx.lineTo(-6, 0);
                ctx.lineTo(-12, -10);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = '#00aaff';
                ctx.beginPath(); ctx.arc(4, 0, 3.5, 0, Math.PI * 2); ctx.fill();
                ctx.restore();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchstart', handleMouseMove);
            window.removeEventListener('touchmove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className={`fixed inset-0 -z-10 pointer-events-none transition-opacity duration-700 ${theme === 'sky' ? 'opacity-95' : 'opacity-85'}`} />;
};

// --- TOPBAR: SpetDev Brand + Easter Egg Image Button + Navigation ---
const TopBar = ({ onOpenCV, onToggleTerminal, onOpenEasterMenu, onOpenPatreon, onOpenSettings, settings, currentView, onNavigateHome, onNavigateJournal }) => {
    const { lang, setLang, t } = useContext(LanguageContext);

    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

    const handleSectionClick = (e, sectionId) => {
        if (currentView !== 'home') {
            e.preventDefault();
            if (onNavigateHome) onNavigateHome();
            setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    useEffect(() => {
        const threshold = 160;
        const checkDevTools = () => {
            const widthDiff = window.outerWidth - window.innerWidth > threshold;
            const heightDiff = window.outerHeight - window.innerHeight > threshold;
            setIsDevToolsOpen(widthDiff || heightDiff);
        };
        window.addEventListener('resize', checkDevTools);
        const interval = setInterval(checkDevTools, 1000);
        return () => {
            window.removeEventListener('resize', checkDevTools);
            clearInterval(interval);
        };
    }, []);

    
    useEffect(() => {
        const handleScroll = () => {
            const next = window.scrollY > 20;
            setScrolled(prev => (prev === next ? prev : next));
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${scrolled ? 'bg-[#05070c]/95 border-b border-white/[0.08] py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4 lg:gap-8">
                
                {/* Brand: SpetDev with Terminal Icon */}
                <div className="flex items-center gap-3">
                    <a
                        href="/"
                        onClick={(e) => {
                            if (currentView !== 'home') {
                                e.preventDefault();
                                if (onNavigateHome) onNavigateHome();
                            }
                        }}
                        className="flex items-center gap-2 group focus:outline-none cursor-pointer"
                    >
                        <i className="fas fa-terminal text-primary text-base"></i>
                        
                        <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                            Spet<span className="text-primary">Dev</span>
                        </span>
                    </a>
                    {isDevToolsOpen && (
                        <div 
                            className="galo-astronauta"
                            onClick={() => alert("Found anything interesting in the code?")}
                            title="Bock bock! Houston, we have a chicken."
                        >
                            🐓🧑‍🚀
                        </div>
                    )}


                    {/* Gant Bridge Easter Egg Sign Image - Controlled by Settings (Default Off) */}
                    {settings?.easterEggSign && (
                        <button
                            onClick={onOpenEasterMenu}
                            className="hover:scale-110 transition-transform p-0.5 ml-2 focus:outline-none shrink-0"
                            title="There are no easter eggs up here. Go away."
                        >
                            <img
                                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wgARCAFuAeADASIAAhEBAxEB/8QAGwABAQEBAQEBAQAAAAAAAAAAAAECAwQFBgf/xAAaAQEBAQEBAQEAAAAAAAAAAAAAAQIDBAUG/9oADAMBAAIQAxAAAAH94PX+dAz/ADD+ofybh7/hRPN9/SwiyUIABIqjHSomDWjIAFACxnUNM2lyTOxbDJLNBSKSxox0GP7h18vq935cNZAAAn8k/rf8a4fR+flPN9zQVLJbLAIsUlzK2suZKU59AICUESwGbboZZ0oxuAWUoJBalCaLn+0e74/1/b+Yo1zAPye8ej9S/K1f0/8AGf33824+/mTh9WzUWTXOW6yKzTUkNhF59KhyXtLmTWZk6JCsaXUzDawrn0ZlmVtuU0zk6MaXTlrUu+WjWsVlRf6z9z85+j9n5qjXAD+Dj5/69lR059GczRrWbCCAAAJNKASyOfSWgigllCCNYrVlSKM3G6AJYlKlWZCys6r29/k6l+o+Uj6r5SzNidCyHTn0sznZUsAgABKEoxtamNglIILAKCLmqms1LLKoBIlKCFzUouWs6rGs6z1glBMhLLB149LIUTWVFsipI0MtF5t1MtDF0rjvaXDZMzYw0ty0jGesqXRM2peW6SKMtxctysaCyxM9JbnFlz0CAayGQHTl2sxZpUsJvG7zC4qWagoe1nxPq8pnwN87qgIWoUAAEBLAJSKUBFRjeJtEadM6ucWXPQlmgZxZaAdOfaTnrnvV1jeIu+fS84LgFBRlPocenJz9Hl79jzY9Nri9Ejl5fXyXHfHQ4b9fFMcPTpfD6ePqjy9O0rhx9vilBoLAGd82ixvPTn1Z5tZz0omgZxSiwdefVnnrNaudQnTGrzSrklWUAT28evJie3xeg3nUsz04jXD0+WXvqVOvl9PiPVz6Q8fo83oa7cOmk5+b2+GWBosoqHLrlckbnXnu5yM7lJQMiqInXj2uee+fS6uN4W6zpzKZiwCpVSTRIosgA1mpVgirLAzbBvKLmVqaiyhIGmdZGblrWufSRneGgzoCAAnfz99Z4759JqzUM7zu86+llz+dPRwallVHpZ8wuqIa9fS8/nz2+KagugAAAFnqZ8rWVCKLAWZ1lZCbusaudY1maDPQGYCUM9+HouPP159bqEV059HL1eP62HL53t5S3e+kZ4+nydjDrF58/T86X2+L3dK+Z7rk3y7c068OlHh9nka657c06db4ydt8z0eR7Exx7dEznPQ5+L6XgaxnWXSYsb6ZGd46c5oXOoCAEJ6PP6LjzduPdrPPpzrrvOnP1eL6+by8fda1w7oSasnLslz8/wB3imvZ4/b3s+b6umRPV5GXL3+db5Pb4F9XO+hM+X1aTlzwant8PeE7Yubrh0XHH2edeCG/N0x1dLnWGe3PpymrZM6qU49DTGrcsenh3ufP149lcuvCvRZpylCWKayGsoWLYAUezydZj08+Wa9Xi7cFuaVBfTzxGZKVNRCpYLkFCa83Tn2bZ1hnvy64axnoz0y0IRmgdeXbWPN34dpdeec7fdee3JChVgQAFN+2Z+e9violaAELAoIAACiIpIpYuTz7wb7Yss741mIM7AiCgu+fTWfP6PP6F561FtmnFCghSyBRT1ef1+Fn08OvY5+f008np59zjj6XlTi93M4zXoPBrvZfDZboQqJQCKoIZmpnWLPRjeYyM9AMgA10471jl38vpaWJdXOrzCwCLJKFgs93i9XNj09fN1T5vu8/ZeHs48z2x1Y5TG7V5do54uV8k683TNFCEqoolsJNRvnOBPdPLY6jPRZUylIXV53vqY8XedmpZRrOrzlzbKlhLLKJZSr6/GZ9flkj2+OK16PKl6uRNsLfTy5k9nm9fikktushUoAAKjNzXTFS56Y6YkQz0EM2WgOiaZ49uPZoQ0zLnoxE6XlU2wXbGE7Xhtek58zvcDcyNMlrMN3mNzI3eROrIs57NMGtXA0yNokEqQrpmkyMbSjIpZY6QuePfj1audZKKCM6UA57Zsusbli8rJ1Q0JQJEKBjQms5OsluXN0E1lpZYAINZ0ZwlrVmjnZc7GUKIsOk1m5x15dGkogtqRNCLJTnuZrWufQRyi9cqtjKkolIsLnUiaZs1KtmZpnedZaoEoLEJqTnqWy3OkwrPVKSELnWTtjObm9uA63jq63Psbz0+I+5k+NPt7Pg37tX87v76Pgvv0/PP0XSvyvX9KPzV/TaPy8/W2T8jr9Zqvyc/Ww/Jv13gj4O/wBPF/M6/S5PzuP0pfz2vv1fz1+/I+Bv7lPivtZr4Pi/V/HY+WrXOUAggASyuQvNLB9v5v6jPXUwx6NXMrecWUzE6Oei6523bOZNzEt3YkGK6OWis8ZfT5ekT1ZSlxqXo56NMLNZWaWkzN0xbE+L4f1PxNcvCLzAZ0P/xAAvEAABAwIEBQMEAwEBAQAAAAABAAIRAxIQITAxBBMgMkEUIjMFFUBCIzVQQzQG/9oACAEBAAEFAun/AOg/sUBGoB0xpjLp86JXhuDPj0vrRJ+pFA5ajTiDqg4g6g2w4Z1/D6X1n+yUfgRqxjGmV4ajtwf/AJNL6h/7nbN0zs3p86QPTOeiVsJnD6T/AFulxxnjUOiVMYT/AIhW4AjD6M4O+m9LfrvClv3zhF984RffOEX3zg08y8oDLGMyJQUZkSmiFGeAyOEZ4NUZlBeU1ecBvgMDsNhu5BA5leGorwDIX0D+s0hsdmnTKG3QDnolA65XgYUeM4iiz7jxi+48YvuPGL7jxi+48Z1DZD8wdMZ6JW4AjAaY2cm6rcRvqDEaZ2/UGdXxP+DGoNtXw4SBlplN6fOkOnzpeG6xMIdEKFChQoUKFChRhChQoUKFChQoUKFCjCFChQoUKFCjCMW7YedMiUP8xqiDqFE6tO2LGQWtJqCH/mBTOsRqynH+Cife6nc97bS2nIey1NpSuX7jSwY248lBknl5CknstIzIpJ7bS2mSH07dMKM0dQlDVd8FHvrPN7hcqky2S15tYJ5bLg6sIdTdAp3XDKoDNSoTc6XUmd9ZxufmKroVP3s0gtyjqFDHzov+Gj31fk8PqWkVZFTtDop85VCXGlk1tWXD5KfyOqwTUlre/iO8dlfvoI79Z3QUZ6pQ1X/BR76nyPPsc0PbAYx/ZRIgUoNQ+6jmxtOw/vMPezmJ8NY3ur93/KOa2OWzSGuUPwQ4hEk43YklZ4BxCJJ6AYUzphFBHUd0D/JCKbqu3GIwhQUdO0qD+OcSm6flO3GIwFrWXsVUgnoc2G9FBcxqe8Fupw+7t9A4nZu2l5T98RuFW+NAShTaBUpgJtNoDmAGo0WtpiDTEMYCKoAVHbBjBbyxFNgjlAplOSWNIhMb7aYlzWC6xqeLXcN3Wtl7Pfa1qeyDywEGNCcwEdBXhun+yfvj5G8i2WJ5FxucYhrxc0kwZioCqYIWzJXDq9qeWuVYwqJ9lTKnw5VNWuYjvT+Oj3j5XE31uzh+9x/k3L2OJDYZXPue0ltOmQn7ooFOXhun+yfv4R3CCrdioiXPqQSbqYeWJ/upntq1HNIqvKPxqjshvXCo9tTOnw4zgzSqSqnfS+Ol3/8AVw99XJlDvf8AJ5qvcHNuIrdzy4NaXuRGLd3Lw3TG6d3eGp26Chrm8tqyY91MEyA0tDw8gMyLMntgMBINNcOQoYnBlrHAgEW03iGEAsIuAaxOMuomELGEGaptLqjpNIgOeZe9yljw9wiq4FMeC2WsDXCMBudhszA5YTi5ePJTN0e47BHu6ZOAMYAxoGnLWixgZcym21O3nood1Tu1P2Kbs3B2aC8nNDpb3I9yaj3j8Fj7U99ya61OeT1Awt9U9xTe1u+k3uX7lBO7v8ifcSm7N7kdFu6/d2zXInNpnUaJIYAn08vybc3Nyp7DuR0W7r9larUBqUsmuMmi9bnkug5YCiSuWZjNzYQYSm0pTqcJzYIbI1TtTQ7kdFu6HdiNT/krCqbYXNzrCRT7i8yiP5aw/jp5U3ul0nlVhltR1TtTX7I7aDcG92uPiG7akk7J/wAVNtxmm1Ey0D37hwRsYiQaTfdSrZDVO1I5nvkI6LXQrkHQ6ZxGpRT2QaTEDLrDdVyHD9xYbqmVNvx0jL6h/kqUyXRFLhznU91R4tdq+fOaadECTag2UBGI1Bkm1U+qU10HnZOdJaYPNMF5IFQw1xBc4k810XuVAZkm4mdZoz/ZEaLMGd35twFPXG57kdFux2Z0DWy65xlSp6ZwnolT0Dd26PQelmxTNTdRABnEHPfU8NxG+mN37o6I2KZqHJDMRiAjkdIobYhedEr9noI6Ldim6m62DDj531Cm4jI6f7PQ6T0t2OzdRxQMgDoOR0nBDYYgqM9Ly9DboPSNjszWbj531RjGc6Z3fs3bRGx2ZqOQ2GOSO/Va5WOVjlY5ctzgKVRcqouU9ChUXIqI8NUnkVF6apHpnr0z16d69M9ekcvSOVTh3Mbgc0MtK5F0oGFcrk2XEcIvSsXpWL0rV6Vq9MxemYvT016amuQxenYuQxchi5TVy2qxqsarQgAoUdNDJyy6Rt4UoRIKlXC2QBxdAN/C4GmGguABcArs7hdcCQ8FXi2/IuABcAi73EwbvddLw6SHEhrnFXEj3R7la9WPXLeuU9cp6qsNKryyuWVyyhTzgcxoAc1oAgWOALCAV7bxaHNtagWhSy2WW8TTAPV50OHZzKptRIWUyFICBEXCLgi8K8FXq/MPV6vKvXMKa9XZXKSvcrTJaVWDg1tIlpoXKyBarFYrFaFaFYFYArQrQrQoCgLJQoXFUhTd1f/EACkRAAIBBAAFAwQDAAAAAAAAAAABEAIREiADEyEwMUBBUQQFFDIjM1L/2gAIAQMBAT8Bj7d/YW2YuxfsPwV/s9ftv7sXgXo3LOL+7n8Ti/B+Jxv8n0HBq4beSEhbW7NoW3HX8j1YvHo7yxHKofWxyaPg5NHxLF6VloXjdFzJGSMjJGSMjIyRkZGSMi5kXLmRkXldivS5lK0eimmadXNelhC6FxMTOpky44T0pmnViirRnsOPYphHQ94UWimadXNWjm2li0WhypoermoyFq2UvZ6IU06uaxVReLlMeRfB1KZ9jwXikU06uEVF4U0l7FxRTCPYcoU06uaosdItNRYSmw9VCKdXCGXhl4bF36exVqhHQuMVRkXZlF912H3V5FvYS7D2sYliwkWRYXZWvvOJgYGBiYljEwMTExMSxYsYmJiYrsKFrYSLC2faWihelYxapwnc5bZy2YM5ZyjlHLMEcswFQYCpRgjBGCMEYIwpMEVUFi2/Dp7qQkWMSxYxLGJVTbT/xAAfEQACAQUAAwEAAAAAAAAAAAAAAREQEiAwQAIDMVD/2gAIAQIBAT8Bp7fnQhfMfd80Rw+Pyt6L0e3yngWnx+d1zLmXP8FYQRhGccK7lnHOs0TxqjFzPFVWa3vQtCyWh6lSdC1PueK0rlXcqrNfrSThJJJJJJJNZJJotSzf5SqtFxJcSXEkkkkkiZJJcXMuZcyS4u0vmnD/xAAyEAACAQMBBQYEBgMAAAAAAAAAAREQITECEjAyQVADICJAUWEENEORE2BxcoCSUnCB/9oACAEBAAY/Au6/2rqOn9N3208uo9lqfPTu+3/XqPY/sW7+I/e+o/Dz/ju/iGnK231HsY5KO94l2ml+kH1PsfU+x9T+p9T+pq1erb3M9I0fq+ubHZdtq06fRHzGs+Y1nzGs+Y1nzGv+PlyRQPrj5UvasGa5IpnqKo06TX37lqKiZCGn0piMGKepw0mDFGcJgVFRj6SxErJ7iNlkzamyXpJKI5ir79Tt+Xl+RFKMFt0zG/fmFuNNbnhPEL0pOo8NLDrOobWCWWwP0PDSSBojnWGQjxCawXLk6fJLcadowWVLiguIsOTVRmCwkMVGu7qonVUuIUDnzWmtqQSItR0dUxio2iGMdHRKjEO5LYhQZ80pZypMkCNmlx8x0uZMkMaRDIQ0xuaXwShsvS42KC5GksbOo8I56R4aWyNvvv8A1NdkrrTdGn3oI70+bflW3RMuWNLdVJYuJ9OdXRVTNLNS9xaSIHFI6bBYk1IgSqhOkUdY80/KzWVSCKS6zS/Wvf8Ak/ws4WcL+xwv7FkzgZwM4GcJwmDByORyORdo4kcSJz5NJK7OJnM5nM5mDBgwYRhGEcKMIwjCML7bnVp30k8ja0Y9PJfi6v8AhJ7kcyOZCPZD1cjaeBSL1Zs8xJISREDtZDcGCYJpk4jiOM4xPbycZxnGcRMjc5Gto2doicCc4JkbnI7jI5EG12fD5BaWK2CYNqLnuOEYIixgwYMGN1kyZLaidsvqM0zuMVxXAnpw+Xf/AP/EACoQAAIBBAIDAAICAgMBAQAAAAABERAhMUEgUTBhcZGhgfFA8LHB4VDR/9oACAEBAAE/IeDwf77pjpH4mpRA6umU+KLMXbjH8fCjAQbs/wDD9X/x45gTYl8gxJuZ8dEkqjLzXkZIvKIZ2CRhP0NSIaX+vEy6J6L9DwKCtxVGLilHnMUHVQn2a8CEYC1JLJkP950b8KoyQaV4kZDHghSn9i8N49k1t8VcXiwE7otA9jtuYLwrIq8ATknsTrgpDgJEkxsbhCx6E1NGJzVNfzwVF4l9GkaHzRgJDDfVJhbH2eUw+8OHvyCQqwk/LElMcrnJFdhAEhUkAgDyUYrZVMno8ElkbXlyJpNMv8DwSgvQ9iuU00TvTqGm4Z2aJ6MBnyT0Jz7GHsxJimGf77vyP6iZUfFcMD83Bjpp0fBcMCThAnnlbqitTAmEIaGRUefof2Z/dn92f2Z/b1ngMgvIsVYiF40jgj8FFRkccCLNIzbyKSoMbj8bw0bUyW+VvRj+JYoTHwRPYxZ5oVdBwFfx4FgSoqJ+NCVEZC8KwPBDISSosvmuSFgPxYGA+GPTi+LwzNi4T/DwIRpi6E7zRZfNVYsUlyHRUQ4D6ow/8FpNSD64SHZ9fo++B+6F7n0R8qPnEapRp0E06PxuqRIUDoteFEEf4TFRkc9MwYpHVHnxMwIBD5LipIOoRAUiseJ+BclweGPYU0UefJgNUYvAxN2M+pGQRO2w2DJfGDfYtbk8tiNSpDs4NoYbjnbDjOb4J1eAy8LAl8GNtNwPiJ1MIYna8LNMWzEiMeRo1GFGLPh2Y/piLItWIHsPaWK/Bb2HYdHoui3cRGLXoVC93SHX0MjlWF/ILQ0Mv4w9WQwR2cdeBixQ2CoXJV3aimFGLDxYfpioJgbLcMZBxl/gfCSUNQRY8oIRfFXWt4E9qfuUIUjdwj5Oj3LKHzVVmvAdFnxModyWqRDAsQoEJtMOiecESkgKbRhDJ8riJWT6E01evop6dmRZFPN+QdP1G0GiYcGDFsfCODHQncQ+aqs0zMFRiz4pfdiYPuSWbgcZJsL0SiJom1kNZZPYk3AwqsZsPwGzX4Li8ndXDyshYQxmS/xoII8S4sWzKjAfi3QgwHTKiZq1JI8SUu1BqWPKlPkbMTAfi0EMMKMyFkdtkpFqPBF5jN+Kq5r3SO6Sv5UT/jVSLwNi0D8dswCxwMjSETEjskhGEndkJBlRXQwTDwyPbehvA/XHs+nXI3qg0+EyyUw8BmeSHBsQ32QmYMAhchOKi1um+SACUjIXlAu4Ew1sN+mrEjMdzgPyGEWKWFQQxD1iBZdmJlyGvNgUgH/BHoSWFybDcRDZli6JCvqNvQgsQ5EYgY0ehoqG3Q8uYkOFKeTdszGH6OoCRl4ZfsOg+U9wNSmNbgjlnMjItHrUSIZeqYE9DrvwrARhoVzXRlS/kyP0bFiMS4uIk2Bk7dDwMHwsSKN3Jo/WHstEkXQsNeIEmoyNISdExzP4ipIVB0ETERMo2XDS/YPcI5QQ2OE0Zg8XsPWsB0vdHh0cBXrPwMuWmIdYRkJSRY2yIkp2wa5kAjwPpOIIkY0le6uK1aGrChzTF0L0QlNYfWJyLjp7Y0VgmDRLqFsLRlNPsSzWQuYKSF8bB8vBOghBiZFtTXRFTuL6xGvRGqo3ux2ZRmWllqvMWKG4ESQr+wm/kx58Tqkvtkvtn5LUSN+xobkakSJjcvjJAsSjexQDV0BpdjZqKt3Mh/C4qw6IdFTYwEvM3RLjEgLAwuO9INCa1Xj/AAUVWhieh8uhbyZgNynyIQrYyVnnw/8ABwMaKX/woI4aY0CYuZjNI8GXJVz0QyD1KHOZeeRsQvsSIbMn/JeHUGczGvEzjF1HdEOhJGCCREcFyvnQ9zfZBoDWEyBGzXQlewiICnPoNW4pkZsNdIZFsa2XmymDM9NKrmGZ+G1J8VpiUuEJWLE/QuNr4sQCvYyXQjGhOUS79inJZwXTGRrNSZmmCZExTl28ao6GDNzXEfBGbIzJl4Lfkv7Roki1H6tRYTE2LTYohGJkDXV1NX8qYLGt+QRIZSF2F6lcHxQzTIxSFFRcz43GTTfYxqDpbWSEeoPkD+lsNiau2RYCwQczBIoQimiRFPeyCHdHOJ5dMhyjsabcgsmH4lTJlOsU28jSnA5QmrDVkM7hL6GTMb1A33fC4VhGLBIlk2IO5cbE5eS8Cj3uOecvKhEhpIQKz4EYMeGNcMVFvk+b8iLUv8BmMQjbg8UVcxkMmPgRHCKaFFNFiCU2WLdn8liUSu6JQmiA1SEjRI2iUStGeCVRNG6EJ4OM1xYcnAzdWKez+arg0kaFhGI80Y1FpJ7FxfCC0XGv4D2GRYmmJT4SOi4uAWPG8GZvmxcH6DILW2qoY79Jri+KbG2F6q0jT+aPiuBDWjAXhcS+fAvfBpINNkEidU2i4+jXimBLCNZp2KwlUfFD4NTAeODxwe6OYtniuTGKkQU2Qm52TR0aHV8EImQ8e1DpIPiLihnGk6ovUcHunmNhk1XN3GoTHoxNoWGB8Fxbg0e9PQgyjY/AqYD8VB48DHpsXwZI6PhbEDyE6rcSVM2F8En0/wAEPp/gh9P8Cdj8DP6U/twj0pOF1f8AAL/wCcIMhfN9GJa+xR9fomSspkJXwtQ/YmgwGxXbmFrsT9DUlqg34HgUVj9kCIOsT6JdDzWBMX9n06P2LGZfT/Uz3/kYP9Ms9vp/tY3L/wDTEvqFcK0SWCj/AOo/rkf1Qork9Sj4JaI9Ef8AUKEjAs3FF02LNLcjSLCxYUTGz1tGTrBK+CyGkwNIpusiHMMhErCEzpwPuAYbmeZcdcmvf/tkpWWiEnLQ4AwN8hOGXWSQa+hcFkIL+K9jyyY9T4EKJmPmBsdlZyKw2LY/4RbI6vwJZ0EwwDcuo1FXIl7jYhYO4LNqQQMuH2HsCLBPFDVD/EwCjBYxd+nIiOTvN/Yftv8AmlArcqf6PRnoUyNw3yI3mZXXvkhrLhrinHNkMHalkMtNN6JEJTmLhRl3YnBWvI9JDdZ26Q5nEkJvHAlbnIjheNakkrwiZQoJYgkQxjxQTxB7iGuUxLxJwVNsEWQYyksLNdwOzLMMiEZZBCKcTe6JddF6D0EAjRCTojhof9IGrsdq/wD/2gAMAwEAAgADAAAAEPfZ9t9/ug/u6Uw/rvzx6eXwed2t9/fffWdS924+sjRRd/gw8gAep4V99gSffTePKcw6k86whB284k7s6sAyibAZfs8hGRyi3vnvm94n9vuvp/8Adk1uHMNnGpG/ZYIf7766ZMv/AOe/6XfD3/5/f3dA++6GPHXFPPw7/p09P9zVhiDD21rCVP8A/vvr0y/ffNCMpLfPPAFHTfeMHWg9Y/v/AP8Ab8XIxgAEKRYJFZdYjAe+59hlZ3+//wB954/ESIAGEHBbXembBC/1Hg8qY/8A+sLsoBTzQChEFCHeIGGXP6RXykVsH/8ACCE+z1+68T08li888885AwBApqps+/GiZT+RjNVjZjdpNJAtgRURuFUtZV7/AHqqeq/2TaEWc8IAfJIxQMu7TJOFTY65Gkpy+6vWawPHF3dkbIXNbjTVug7FnhqiR3h3OPPHI1fPPFPPPPPAzIUhGv8A84Jzmx9z2HziCAxC1UgqkRwgAE83P9v7r1Od0ADUDhi7lTOyNJCDhCCGHmsG/wC5rGr6k8V8gpSZyPUtKpMIA4+qkLf7v7cCLGVB3M3NA0csNRFiCEoEDFEZFv8A6mRk1Q4w98sNAwzw3zn89Iw7gHimO8su949VYx3vBrL8y95gzo1gXgQ46djxlxv9FVWQJtvQDM4UOw8uSLYnB0c7+wg//wDEOT7a3z5wMDz9+iJnF7Mpen/Mv//EACERAAICAwADAAMBAAAAAAAAAAABETEQICFBUWEwQHGR/9oACAEDAQE/EMJLv4U/UDrQSEap2+aicMndi/A8hIR9z9Z9AyohmT0Y8aRhkaDWGMREv7pH6Uep5LhP8Pn/AMPj/wAzcp+sY/mw8mqyUM1EhiiQwQIECJEgQEry3NXebaMJBdwi2TlC1U2LFiBLKjHadJ2NsZMMbwJ2M5hEs8T0tmmtyg6Li0K5VHCBCeIcdkTkCoMLnTtyNTlbNNbCxfUkRjAlA0ssH0LRce43ScXJjThtZbPCVd2eCeEk4XHvueMWHJQNt/CT5I54yVySbklpuBt8oZiUlDEvom2NyJZ+DvsbwXzbW54LFhR4NpuWMvNCXo5FYOY9xuyS5ZaRuBoYkElEKiPLG9IuOsWysWGeSwkskIhlH4JwPtkYvOEa3WFtbYRl9glDp/ijCHHD2W1846WEh6O22SnUJvIz8HsEzUjUSgWpWRJ5L6tOc2y8NCcNpjieDctQPr6fwdkLh4Bp1V4vJC9Z6Ti2Yy1YkoSJ8IsSsUULLbYlG3g8l9UHeHM/on7wjn/vCJEiRIkCBAgQ0Feth3+AHsNlCMLM6U0sOhNkWIn8C2LCrLICVIimgqfsTPyT9n9n2Ensf2IID1sTBZvlyiPBEho6zM5xJBz0IadiIxDIcSKfY6X0YiTHxhFUddwSeS8tP//EAB8RAAICAgMBAQEAAAAAAAAAAAERACAQMDFAQSFhUP/aAAgBAgEBPxDTjo8rHBcaAg0kwz+8/WCEAUGsZCCCvHHHkdEZVU+z9Z+ncOoaKhRRHaO0uidr2xQiDBua+aA5wVBNDc6Dh3BZIWCLphQoosnAW5bQntwmGc5UPGCnsHzYEE80ivm89wLB/BDBEUX3sBRQU83rW4/sePNw6IAOOgdAoKF0igwOIO1w0lhIkSALFGcJx41AGjQFHGbl5lxx4+Y9zx8jy8tRuOCj/8QAKBABAAICAgICAgICAwEAAAAAAQARITEQQSBRYXEwgZGh0fCxwfHh/9oACAEBAAE/EPA1H8aYRJW3Mn8QUTUaj7lzaXEzu/PrhsESxGZni7xFHBeOWE98DfDbMjKk9/uP9r6R1+HZLDbrrqnEdY9y+vmvDA4rhgphESwKZpFUR7/G6LhQuLiAj7l48bhPfLWMHAJZFtfaGAWw0YQ1+HtKpB6H0gFDAhJ34O4MQcmCAQEsvgA3343L8GEFicK8XKQG3h3yQXyRcgyR/U4/NPj8ItPuf6r3FZURRlYnceXuZmeRuiJUMrHFzaIxuoG444qV4MdpDC0MfDNy/EPGAQuFiGWK7LfbNvGn3Kfc/c/cGHu4NpDBo5iCAqOp3HuXKhZIBFiJgsYhsMLZwqzDPDqI1FWXBqbLiLq40MyuWXUcTrccwgA8fUuZ3cWL7j7QVx1FnUM4gUzTixPuN7CPcd0bsXRXDrxOdk00/Yz4P9fufF/r9z4P9fuWsn+v3LHc4+liVqVwoMZWZUGSxcSiLaoiEalj1OoazBZU9dRnSR46nUKoJrRjDiB4YKC8BaSijcx+MILIAGkI0xmDGX+SInaBSIoBl385iIZzLWQ1Y8BVp1MM9TWYR15ly5cvi5mN3PU1yxYhMsuKX+AVVbjXLwaTqFxt+A6mhyG4C4CjipUQlyobIYOL6LuWCzrBbDQxQtxr/wCj/if+J/xP/E/4n/mf8T/yH+OOppLnqXr6lazqDR+ShBnjAuIZkvvh78b5SzMuckzYIueBlNOSHCCOqjBiYR1iXKlSvJYRKUDedJ3+B74AyBE8JSoVB8b8rj3HkcaTJTLx4anfkV3YzUDE3R7823IVDMXUZZNR7/EtLmUUK8kpuWX+F74yuUNzubRpY8Hfne+ZppNZOuA9/gdTudJiCIJBiHGZcuVK5z2lu8tnPDecSviW09uKlSpTPkE0LLPggpFSpXj/AI8GRtm0VxKYmAfjNErEeSKEGblPc+SU+ZT2ynzE9R9oh2gQYfefeV9xE09z7ynv+p/sJ90KmvufefeWhFbgnWfRK+4t7J94Tm5b3Le5b2T7Er7J9yL7lu2bRkqtGLOB/T8YUfSYkuOXb8ILeJb1BcVxcuD4vfJL4qWzyGGC471z64IKyj+047ff4tCaZaAIrLmnBv8AAe4vPTG6MN/3maCzOub9eWnJzcuLfDCXiXn9eDtmMKl+WYSsECApcbM2hKlcPNMwSBBA3FrnubQzj5mfftEWq+YRZh7iBNBI+uC7mEb9ENj2RKMPmZpAvU1mEf2bCaefzGhke57RMfvrZaeZeh+aXq/mJ9+YTAiXLAcwjMPwhbUqGGFZ42Y8SEzMy5rnM6Rx/wBmBv7wSXYJUa5KE4DEcQwhM8JLg33CiTTK2JsO+Y4SsjAQcsCfphQjLFXxxUeAxnObFDriCboPUFvsrx74JvUwh1mBaTR4DPm64DGGAwUCM2Zn8EXH4DZx+f2T+7MnfRNZ47guAdxW/UozRemGeJjEklb5piOC5E0/TMR+WW5FhTAO8WWdkzT7IdvYT9Cf32f8QxcpmXK4Je3AWVwJmbx/C1x9xZCaZpxrnXFYmvE2SgCfbEWGsxpRsuGKVgXEU71xVoo6YzNmp9uQs7kJUMBBAAveYEP+jLzBlCrYFBx2zKypRlIVvxl1G/hKCkslVZe5nEWZqO2+NSpbkm80nb3LMoLIdR/CwEchBjwHvhq/AbjMFKgSw1FFtX7RQRWItL+ZaFwShVIkbSRyzm9xgUIja/zPmfzLTQr+ZaVmJa3bcTYFCLdGXpsYbh5HI2RvBSJHcCfXkZ5dn3DTFjwFH4p8Tm5czMzMzz98Wlpbi5TOsQxBjweTd4MHEm5leaQ8q5f7o9wKSlZpE5rAJ8EXY8PqD8+LsQZJcHCe/wAjOgnbNy5cqVwcbkIFShhcZ+F/vm8YEtXgYhkCCAYY+JEAAJ65teYBjIeKrd0R8KGPPyHMQWXGH2M6ZThcvg43Iai1LFpq49effD/dKqHRTPlomiWrgPzEBcwhdHAMsYlKHflAPusRBgk3TYvRgPvnd94G8GU5gX9ZMYIYmYOfpLPEgDYhRhPURxBCGLjnNOI11lqeuOARC2kfpFxCwCvUIAtiNEiYgIatEqYPSVTUJ1mRmJ+4+Xun8IXC4bWf8PChqHaYmUoGzuIMi4lWiA2AR3ur3PpCocJxpjMrB7hXqWnIY2LRG1X7jEPwI6yIBDPxMf1Ooi1lO37lx8jDw5VlpeQlSj+3P0oIr3LwkCVMHUNuOIEcyVAYq6idJBcbZqKs2E1YQSAK4CDeEqm9y0vEZvw98vfidGLDHDYodS/wmmXKb1LfcDXrC0ikbuXjgLypgp1iAKMYJGv4l30WYQNvvA3tGit1EWjWJ2pidbjKZBTdsy93Gk64hD5n96FH7Rtkh9o3NMxplQX4RKXXLE+4m49EY7jsl4OEsS/NjDYQ05hfm+uT3xXGpZe5hP4qPcy5BVMxCaZgEHuNzFQjUaTAk9ImRJpXtK/W9sw/ImMLtpgssxkv1CLEFO4zUjKddVEbhoWYFtuSYFh7jhjGWPsCWVRd6HjsrVQ3hWMrZLyq7S7R9EINQMYS3JY0sMEh6h9rvmCotCGEw1B55ww7NQYsPCFriO1ncR8iK7EAtXmFtFeZcEjRgcLOEsn641TbK0zOsDHAyf8AJPZ/JLfcdhqJ7TUL/MZNsQjCKNix7L5uX8z7ZhVIxmM9yKgRodo3hH2NCydcu3Y6yVFjO3AYlTEbo1LLbxYVIl23wKuGWDijp8U6CdxFASVVeBKGAbQoiFuAbSj6OGpJiSbMdCaSoT6ZiYn6n6lSvwCE2SkOPSOUil1UJiY5fuUR7eCXKx5k2YwpZN4bZ3x9+b3N8BuGZwtg3hEXKgnczL5YS5crmpqHw+b+SkpKlcLUDXTiCuqYB+IB7gzfEWbPuDRLYNQDNYeidzExywmJjkISYiflKS86I3b5vf5KlcsFhENljCeo790ykjFrz4vfkVn7pkjMrXABKnB5deKtwhPoSLxHwbmA7uJoKiE3CIBuFUQuNwhYdwaVFJ1BrofcWrd+pckOXA46ly5fFy+SEZndUGud6E0/CXloRX4G3D7TXHXiQlfpyshYUaSs10wjsr4wK3stDjT5I8OD4lDKVzCaO06vsojCO2CGZlBl94O4USxYy8OpUaz43Lm0OGy48EMfZDMGvAqL8RVZiQMEnfDxA5fHQzrwNwj7wlFsjBU1xbudb1KmvURWGk7ikcr7LYrBzFSmBuIZEsIo9TV2YP4DM642fOoQnc2QwM2LuVIoqS498ZeHcouj3JYtYhXE7ms/wh46TrioQjUJJsWPqF+zkvQU4xGwflM3XS0AXZGWtu7lAcWO49iGAu7YLWMRi9GF9a4Qv2UBSs6kHD35VKhDhP4IE0kqs3GzvEHVcsqPfmzKjSpiIvsidp2fmGotpSMwAiB8RCGDfCaMwBshbhcDHhljosPANrkCkhH5Myg0Rw0O5aK49eHfn7naZPKLUA9QNUzHv8Bk2Sb4ZZ5aw9y+NcseFcKYldf9cHdS51D/AJjydy0L1LEW1XTP1414Vy7Z64WcNYceB1bxDiQv7oNyuNJ8pSfqVAqIZi9woySJ3STHuY7Er2lHuLaQS13KliL9p8sZKe58sy9z7ZcMzGF/cp9z0p8TLIqVVPugKwT6y/ifDPpLJ9yGYTFRJAcJo/77474F+Fidpm4odvCmCFYuXPtO9y3hSREhlFiU9RIdS6VFC5czLlxy+bS7CXLEJuwYjakFxLW8kWXL4LEqDEqE0RacN4TX8NQVFxEd8OcQ47irhXLgSL0wCLipku4RqBu3jpy9xl5SURQxmXiDBbEHz5KSyPA5TZzSbpofg0RU47KHBuHDOoK8FBYASljgle6hSoCuF83iOefuJwZdciZF5myPikLKdwmkriuLTaMZoTSNMNwS+MB8NIE5SNOXfA3O+e+NmVSTYMBYhFqPgCNqBEPCp6mngLGbTMkRBhC2QZg1AVRi/BztHMOLjmmDBmia1Cd8B4DSBR4zsjZjwvhc7ly5fABTUxKI4eLrLORuzDCDEsjL5VyG0acYEXgZhCxA5oG4c9cMe5tCYSWBCxv8ATWWGbuAys4j3U7TDX/Mx7n7gxufuF9fE27iSpDLAG6RrPGj3CBHEwl8BXTf1ExMkZojrSPZLp/uTFAQ/wDYmtK1g4ySMsR/hMsLD4WmJux8qymD+mZZP6YcR8a5jRV/zlIz/OLQf2joIC/6Gf8AxjBADRkOAMh9S1TZUFKlnfHXh3CbmYWVrhlV2inSHqy1tKCUGZ61CaWv3CUJ88xpjvMfMU0u/bDq/ulQ/tKoCoVAQGKfxQCn+KENBXxnykM+u4O/6aUBVDAaEKoFfUt2P4gOgh0EIINgzbaFG6KhfPczdmyOGAm+KuJVp8IAuHsjFipIWshxWhc6PcUUdCBUGtwureyohCJygFoYb6jOvaHXyS5cuX4LLq+WO/h3OpgRTQfXcDFX7bZT/id4QvK6hse5WiXedo0S5vsc2W7C9wpxFr3A5JoI5hdAIYhdlaI1Te+I2auzolwzseplwbEKDQYPbMhQyY1aGPIJ0IBsV9xAaQZoC9RTRf3Mnb9xaIV8ol/v4u6e8fj+yUXp9xTVvZAAqrNpl76Ljat7XUt1fRfMcRejeZZSdkYQpTMEu62IyC6jD2fvMs1PQwSxDV9RID6Hf/pK3+EDqO/h3Guq6/INwAg1LcE+SlOpXsPS9Rle7G4cgLa9xM41L3K0H0EYBP6pEzNuRuEex1LPx93MRAfcXEBlhFn1GsB+oFdFTCIQMKA+JWNUsMFRfU5LdeqlmYpWyqAEN1Hxakc39ZUnRMwsP750f2wdm/5htKz5cWWj/MecfyhmAxDUBYpPgz4cLVDMuMJKOswrI/EYGlwu3+OTNIrVwz//2Q=="
                                alt="No Easter Eggs Here"
                                className="h-6 sm:h-7 w-auto shrink-0 rounded border border-white/[0.15] hover:border-primary/60 shadow-sm"
                                
                            />
                        </button>
                    )}
                </div>

                {/* Nav Links */}
                <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium text-slate-300">
                    <a href="#about" onClick={(e) => handleSectionClick(e, 'about')} className="hover:text-white transition-colors">{t('nav.about')}</a>
                    <a href="#experience" onClick={(e) => handleSectionClick(e, 'experience')} className="hover:text-white transition-colors">{t('nav.experience')}</a>
                    <a href="#projects" onClick={(e) => handleSectionClick(e, 'projects')} className="hover:text-white transition-colors">{t('nav.projects')}</a>
                    <a href="#skills" onClick={(e) => handleSectionClick(e, 'skills')} className="hover:text-white transition-colors">{t('nav.skills')}</a>
                    <a
                        href="/journal"
                        onClick={(e) => {
                            e.preventDefault();
                            if (onNavigateJournal) onNavigateJournal();
                        }}
                        className={`hover:text-primary transition-colors font-semibold cursor-pointer ${currentView === 'journal' ? 'text-primary' : 'text-slate-300'}`}
                    >
                        {t('nav.journal')}
                    </a>
                    <a href="#tools" onClick={(e) => handleSectionClick(e, 'tools')} className="hover:text-primary transition-colors font-semibold cursor-pointer text-slate-300">
                        {t('nav.tools') || 'Tools'}
                    </a>
                    <a href="#contact" onClick={(e) => handleSectionClick(e, 'contact')} className="hover:text-white transition-colors">{t('nav.contact')}</a>
                </nav>

                {/* Actions: CLI, Settings, CV, Lang, Mobile Toggle */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                    <button onClick={onOpenPatreon} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md bg-[#FF424D]/10 border border-[#FF424D]/20 text-[#FF424D] hover:bg-[#FF424D]/20 transition-colors whitespace-nowrap" title="Login with Patreon"><i className="fab fa-patreon text-[11px]"></i><span>Patreon</span></button>
                    <button
                        onClick={onToggleTerminal}
                        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md bg-white/[0.04] border border-white/[0.1] text-slate-300 hover:text-white hover:border-primary/50 transition-colors whitespace-nowrap"
                        title="Open SpetTerm CLI (Ctrl+K)"
                    >
                        <i className="fas fa-terminal text-primary text-[11px]"></i>
                        <span>CLI</span>
                    </button>

                    {/* SETTINGS BUTTON */}
                    <button
                        onClick={onOpenSettings}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white/[0.04] border border-white/[0.1] text-slate-300 hover:text-white hover:border-primary/50 transition-colors whitespace-nowrap"
                        title={lang === 'pt' ? 'Configurações' : 'Settings'}
                    >
                        <img src="/assets/icons/gears-0.png" alt="" className="w-3.5 h-3.5 pixelated inline-block shrink-0" />
                        <span className="hidden sm:inline">{lang === 'pt' ? 'Config' : 'Settings'}</span>
                    </button>

                    <button
                        onClick={onOpenCV}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-md bg-primary text-white hover:bg-primaryHover transition-all shadow-sm shadow-primary/20 whitespace-nowrap"
                    >
                        <img src="/assets/icons/spet_sprites/floppy_disk.png" alt="" className="w-3.5 h-3.5 pixelated inline-block shrink-0" />
                        <span>{t('nav.resume')}</span>
                    </button>

                    <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-md p-0.5">
                        <button
                            onClick={() => { playSoftClick(); setLang('pt'); }}
                            className={`px-2 py-1 text-[11px] font-semibold rounded transition-colors ${lang === 'pt' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            PT
                        </button>
                        <button
                            onClick={() => { playSoftClick(); setLang('en'); }}
                            className={`px-2 py-1 text-[11px] font-semibold rounded transition-colors ${lang === 'en' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            EN
                        </button>
                    </div>

                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
                    >
                        <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.08] px-6 py-4 space-y-3">
                    <a onClick={(e) => { setMobileMenuOpen(false); handleSectionClick(e, 'about'); }} href="#about" className="block text-sm text-slate-300 hover:text-primary">{t('nav.about')}</a>
                    <a onClick={(e) => { setMobileMenuOpen(false); handleSectionClick(e, 'experience'); }} href="#experience" className="block text-sm text-slate-300 hover:text-primary">{t('nav.experience')}</a>
                    <a onClick={(e) => { setMobileMenuOpen(false); handleSectionClick(e, 'projects'); }} href="#projects" className="block text-sm text-slate-300 hover:text-primary">{t('nav.projects')}</a>
                    <a onClick={(e) => { setMobileMenuOpen(false); handleSectionClick(e, 'skills'); }} href="#skills" className="block text-sm text-slate-300 hover:text-primary">{t('nav.skills')}</a>
                    <a onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); if (onNavigateJournal) onNavigateJournal(); }} href="/journal" className="block text-sm text-primary font-semibold">
                        {t('nav.journal')}
                    </a>
                    <a onClick={(e) => { setMobileMenuOpen(false); handleSectionClick(e, 'tools'); }} href="#tools" className="block text-sm text-slate-300 hover:text-primary">
                        {t('nav.tools') || 'Tools'}
                    </a>
                    <a onClick={(e) => { setMobileMenuOpen(false); handleSectionClick(e, 'contact'); }} href="#contact" className="block text-sm text-slate-300 hover:text-primary">{t('nav.contact')}</a>
                    <button onClick={() => { setMobileMenuOpen(false); onOpenPatreon(); }} className="w-full text-left text-sm text-[#FF424D] hover:text-[#e03640] flex items-center gap-2 font-bold mb-3"><i className="fab fa-patreon"></i> Login with Patreon</button>
                    <button onClick={() => { setMobileMenuOpen(false); onToggleTerminal(); }} className="w-full text-left text-sm text-slate-300 hover:text-primary flex items-center gap-2">
                        <i className="fas fa-terminal text-primary text-xs"></i>
                        <span>Terminal CLI</span>
                    </button>
                    <button onClick={() => { setMobileMenuOpen(false); onOpenSettings(); }} className="w-full text-left text-sm text-slate-300 hover:text-primary flex items-center gap-2">
                        <img src="/assets/icons/gears-0.png" alt="" className="w-3.5 h-3.5 pixelated inline-block" />
                        <span>{lang === 'pt' ? 'Configurações' : 'Settings'}</span>
                    </button>
                    <button onClick={() => { setMobileMenuOpen(false); onOpenEasterMenu(); }} className="w-full text-left text-sm text-slate-400 hover:text-white flex items-center gap-2">
                        <i className="fas fa-ghost text-amber-400"></i> Easter Egg Vault
                    </button>
                </div>
            )}
        </header>
    );
};

// --- HERO SECTION: Clean, balanced, NO debugger box, no location ---
const Hero = ({ onOpenCV, onToggleTerminal }) => {
    const { t, lang } = useContext(LanguageContext);

    const [visitCount, setVisitCount] = useState('...');
      useEffect(() => {
          fetch('https://journal.gelain15mj.workers.dev/api/visit')
              .then(res => res.json())
              .then(data => setVisitCount(data.visits))
              .catch(() => setVisitCount('Offline'));
      }, []);
      return (
        <section id="top" className="min-h-[85vh] pt-32 pb-16 flex items-center relative">
            <div className="max-w-4xl mx-auto px-6 w-full text-center sm:text-left">
                
                {/* Status Indicator (NO location) */}
                <div className="inline-flex items-center gap-2 text-xs font-mono text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full mb-6 shadow-sm shadow-primary/10">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-sm shadow-primary/50"></span>
                    <span>{t('hero.status')}</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight text-glow">
                    Eduardo Gelain
                </h1>
                
                <p className="text-xl sm:text-2xl font-semibold text-primary mt-3 text-glow">
                    {t('hero.role')}
                </p>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed mt-5 max-w-2xl text-glow">
                    {t('hero.desc')}
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5 pt-8">
                    <button
                        type="button"
                        onClick={() => window.dispatchEvent(new CustomEvent('spet:open-galaxy-map'))}
                        className="px-5 py-3 rounded-lg bg-white/[0.04] border border-cyan-500/30 hover:border-cyan-400/60 text-slate-200 hover:text-cyan-300 hover:bg-cyan-500/[0.06] text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer select-none"
                        title={lang === 'pt' ? 'Entrar na experiência espacial 3D interativa' : 'Enter interactive 3D space experience'}
                    >
                        <i className="fas fa-compass text-cyan-400"></i>
                        <span>{lang === 'pt' ? 'Experiência Interativa: Galaxy Map' : 'Interactive Experience: Galaxy Map'}</span>
                    </button>
                    <a
                        href="#projects"
                        className="px-6 py-3 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primaryHover transition-colors shadow-lg shadow-primary/25 flex items-center gap-2"
                    >
                        <i className="fas fa-layer-group"></i>
                        <span>{t('hero.ctaProjects')}</span>
                    </a>
                    
                    <a
                        href="#contact"
                        className="px-5 py-3 rounded-lg bg-white/[0.04] border border-white/[0.1] text-slate-200 text-sm font-semibold hover:bg-white/[0.08] hover:text-white transition-colors flex items-center gap-2"
                    >
                        <img src="/assets/icons/spet_sprites/radio_tower.png" alt="" className="w-4 h-4 pixelated inline-block" />
                        <span>{t('hero.ctaContact')}</span>
                    </a>

                    <button
                        onClick={onToggleTerminal}
                        className="px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.08] text-slate-300 text-sm font-mono hover:text-white hover:border-slate-500 transition-colors flex items-center gap-2"
                        title="Open SpetTerm CLI"
                    >
                        <i className="fas fa-terminal text-primary"></i>
                        <span>CLI</span>
                    </button>
                </div>

                {/* Social Network Icon Links */}
                <div className="flex items-center justify-center sm:justify-start gap-5 text-slate-400 pt-7 text-xl">
                    <a href="https://github.com/Spet001" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors" title="GitHub">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="https://gitlab.com/Spet001" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors" title="GitLab">
                        <i className="fab fa-gitlab"></i>
                    </a>
                    <a href="https://spet01.itch.io/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors" title="Itch.io">
                        <i className="fab fa-itch-io"></i>
                    </a>
                    <a href="https://www.nexusmods.com/profile/Spet001/mods" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors" title="NexusMods">
                        <i className="fas fa-cube"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/eduardo-gelain/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors" title="LinkedIn">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="mailto:gelain15mj@gmail.com" className="hover:text-primary transition-colors" title="Email Direct">
                        <i className="fas fa-envelope"></i>
                    </a>
                
                      <div className="ml-auto sm:ml-6 flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-slate-400 text-xs font-mono group hover:bg-white/[0.05] hover:border-primary/30 transition-all cursor-default" title={lang === 'pt' ? 'Visitantes Únicos (Imune a Adblocks via Cloudflare Edge)' : 'Unique Visitors (Adblock-immune via Cloudflare Edge)'}>
                          <i className="fas fa-eye text-primary/60 group-hover:text-primary transition-colors"></i>
                          <span>{lang === 'pt' ? 'Visitantes deste Portfólio:' : 'Portfolio Visitors:'} {visitCount}</span>
                      </div>
                  </div>

                {/* Proof Metrics Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 mt-10 border-t border-white/[0.08]">
                    {t('hero.metrics').map((m, idx) => (
                        <div key={idx} className="space-y-1 text-center sm:text-left">
                            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                                {m.value}
                            </div>
                            <div className="text-xs font-semibold text-slate-200">
                                {m.label}
                            </div>
                            <div className="text-[11px] text-slate-500">
                                {m.sub}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Subtle astronaut controls hint */}
                <div className="hidden sm:flex mt-8 text-xs text-slate-500 font-mono text-center sm:text-left items-center justify-center sm:justify-start">
                    <span>{t('hero.hint')}</span>
                </div>

            </div>
        </section>
    );
};

// --- ABOUT ME SECTION (Dynamic, Compact, 3D Badges) ---
const AboutSection = () => {
    const { lang } = useContext(LanguageContext);
    const [activePillar, setActivePillar] = useState('reverse');

    const pillars = [
        {
            id: 'reverse',
            title: { pt: 'Engenharia Reversa & Baixo Nível', en: 'Reverse Engineering & Systems' },
            tagline: { pt: 'Runtime Analysis & Architecture', en: 'Runtime Analysis & Architecture' },
            description: {
                pt: 'Análise de binários em C/C++, instrumentação de rotinas em tempo de execução, hooking de dispatchers, mapeamento de memória e interoperabilidade no ecossistema Win32 e UWP/GDK.',
                en: 'Native C/C++ binary analysis, runtime instrumentation, dispatcher hooking, memory layout inspection, and low-level interoperability across Win32 and UWP/GDK environments.'
            },
            badges: [
                { name: 'C++', icon: 'https://skillicons.dev/icons?i=cpp' },
                { name: 'C', icon: 'https://skillicons.dev/icons?i=c' },
                { name: 'Win32/GDK', icon: 'https://skillicons.dev/icons?i=powershell' }
            ],
            metrics: { pt: 'Hooking · Asm · ASLR Bypass', en: 'Hooking · Asm · ASLR Bypass' }
        },
        {
            id: 'gamedev',
            title: { pt: 'Desenvolvimento de Jogos', en: 'Game Development' },
            tagline: { pt: 'Engines & Gameplay Systems', en: 'Engines & Gameplay Systems' },
            description: {
                pt: 'Arquiteturas performáticas em Unity (C#) e Unreal Engine 5 (C++). Foco em física ágil de locomoção, FSMs de IA e ScriptableObjects.',
                en: 'High-performance gameplay in Unity (C#) and Unreal Engine 5 (C++). Specialized in fluid locomotion physics, state-machine AI, and decoupled systems.'
            },
            badges: [
                { name: 'Unity', icon: 'https://skillicons.dev/icons?i=unity' },
                { name: 'Unreal', icon: 'https://skillicons.dev/icons?i=unreal' },
                { name: 'C#', icon: 'https://skillicons.dev/icons?i=cs' }
            ],
            metrics: { pt: 'Unity · UE5 · 144+ FPS Physics', en: 'Unity · UE5 · 144+ FPS Physics' }
        },
        {
            id: 'qa',
            title: { pt: 'Quality Assurance (QA)', en: 'Quality Assurance (QA)' },
            tagline: { pt: 'Code-Level Bug Deduction', en: 'Code-Level Bug Deduction' },
            description: {
                pt: 'Testes de borda, dedução de causa raiz de crashes por inspeção de código e análise de vazamento de memória para lançamentos comerciais.',
                en: 'Edge-case test matrices, crash root-cause deduction via source code inspection, and memory/frametime profiling for commercial releases.'
            },
            badges: [
                { name: 'C#', icon: 'https://skillicons.dev/icons?i=cs' },
                { name: 'C++', icon: 'https://skillicons.dev/icons?i=cpp' },
                { name: 'Git', icon: 'https://skillicons.dev/icons?i=git' }
            ],
            metrics: { pt: 'Steam QA · Crash Dumps · Stress', en: 'Steam QA · Crash Dumps · Stress' }
        },
        {
            id: 'automation',
            title: { pt: 'Automação & IT', en: 'IT & Automation' },
            tagline: { pt: 'Scripts & Infrastructure', en: 'Scripts & Infrastructure' },
            description: {
                pt: 'Scripts de manutenção e automação em Python e PowerShell, diagnóstico ágil de hardware/redes e suporte técnico a sistemas operacionais.',
                en: 'Automation pipelines in Python and PowerShell, infrastructure administration, hardware/network diagnostics, and rapid incident resolution.'
            },
            badges: [
                { name: 'Python', icon: 'https://skillicons.dev/icons?i=python' },
                { name: 'PowerShell', icon: 'https://skillicons.dev/icons?i=powershell' },
                { name: 'Bash', icon: 'https://skillicons.dev/icons?i=bash' }
            ],
            metrics: { pt: 'Python · PowerShell · Linux', en: 'Python · PowerShell · Linux' }
        }
    ];

    const currentPillar = pillars.find(p => p.id === activePillar) || pillars[0];

    return (
        <section id="about" className="py-6 sm:py-8 relative border-t border-white/[0.08]">
            <div className="max-w-5xl mx-auto px-6">
                <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-white/[0.08] relative overflow-hidden">
                    
                    {/* Compact Header */}
                    <div className="flex items-center justify-between gap-3 mb-3.5">
                        <div className="flex items-center gap-2.5">
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-tight leading-tight">
                                    {lang === 'pt' ? 'Sobre Mim' : 'About Me'}
                                </h2>
                                <p className="text-xs text-slate-400 font-mono">
                                    Eduardo Gelain · SpetDev
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Extended Corporate & Personal Bio */}
                    <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 max-w-3xl">
                        <p>
                            {lang === 'pt'
                                ? "Sou desenvolvedor de software e jogos focado em engenharia de sistemas, computação de baixo nível e arquitetura técnica. Minha abordagem é guiada pela recusa em tratar tecnologia como caixa preta: busco entender a fundo o ciclo de execução na CPU, o gerenciamento de memória no SO e a interação entre subsistemas em tempo real, aplicando esse rigor tanto em C/C++, C# e Python quanto na pesquisa de sandboxes nativas (Win32, UWP/GDK) e engenharia reversa de binários."
                                : "I am a software and game engineer focused on systems engineering, low-level computing, and technical architecture. My work is driven by a refusal to treat software as a black box: I strive to understand execution cycles on the CPU, OS memory management, and real-time subsystem coordination, applying this rigor across C/C++, C#, and Python, as well as native sandbox research (Win32, UWP/GDK) and binary reverse engineering."}
                        </p>
                        <p>
                            {lang === 'pt'
                                ? "Com sólida formação em Ciência da Computação e experiência direta no ciclo comercial completo de um jogo publicado na Steam, uno a disciplina de QA técnico — diagnóstico determinístico de crash, profiling de frametime e testes de regressão — à construção de ferramentas e arquiteturas testáveis. Meu foco é sempre resolver problemas na raiz e desenvolver utilitários robustos que elevem a estabilidade e a produtividade de equipes de engenharia."
                                : "With a solid Computer Science foundation and first-hand experience across the full commercial release lifecycle of a published Steam title, I bridge technical QA discipline — deterministic crash diagnosis, frametime profiling, and regression testing — with modular, testable architecture. My focus is delivering permanent root-cause fixes and high-performance developer tooling that strengthens software stability and team productivity."}
                        </p>
                    </div>

                    {/* Dynamic 4 Pillar Cards with 3D Badges */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-3.5">
                        {pillars.map((p) => {
                            const isActive = activePillar === p.id;
                            return (
                                <button
                                    key={p.id}
                                    onClick={() => { playSoftClick(); setActivePillar(p.id); }}
                                    className={`p-3 rounded-xl border text-left transition-all duration-200 relative group clickable cursor-pointer flex flex-col justify-between ${
                                        isActive
                                            ? 'bg-primary/15 border-primary/60 shadow-lg shadow-primary/15 ring-1 ring-primary/40'
                                            : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.15]'
                                    }`}
                                >
                                    <div>
                                        {/* 3D Badges Row */}
                                        <div className="flex items-center gap-1.5 mb-2">
                                            {p.badges.map((b, bIdx) => (
                                                <img
                                                    key={bIdx}
                                                    src={b.icon}
                                                    alt={b.name}
                                                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-md shadow-sm transform group-hover:scale-110 transition-transform duration-200 shrink-0"
                                                    title={b.name}
                                                    loading="lazy"
                                                />
                                            ))}
                                        </div>

                                        <h3 className={`text-xs font-bold leading-snug transition-colors line-clamp-1 ${
                                            isActive ? 'text-primary' : 'text-white group-hover:text-primary'
                                        }`}>
                                            {typeof p.title === "object" ? p.title[lang] : p.title}
                                        </h3>
                                        <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                                            {p.tagline[lang]}
                                        </p>
                                    </div>

                                    {/* Active indicator bar */}
                                    <div className={`mt-2.5 h-0.5 rounded-full transition-all duration-300 ${
                                        isActive ? 'w-full bg-primary shadow-sm' : 'w-4 bg-white/[0.1] group-hover:w-8 group-hover:bg-primary/40'
                                    }`} />
                                </button>
                            );
                        })}
                    </div>

                    {/* Dynamic Spotlight Details Drawer */}
                    <div className="p-3 sm:p-3.5 rounded-xl bg-black/40 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold">
                                    {currentPillar.title[lang]}
                                </span>
                                <span className="text-slate-600 font-mono text-[10px]">·</span>
                                <span className="text-slate-400 font-mono text-[10px]">
                                    {currentPillar.metrics[lang]}
                                </span>
                            </div>
                            <p className="text-slate-300 text-xs leading-relaxed">
                                {currentPillar.description[lang]}
                            </p>
                        </div>

                        <a
                            href="#projects"
                            onClick={() => {
                                playSoftClick();
                                const projEl = document.getElementById('projects');
                                if (projEl) projEl.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="shrink-0 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-primary hover:text-white text-slate-300 border border-white/[0.1] hover:border-primary text-[11px] font-semibold flex items-center gap-1.5 transition-all self-start sm:self-auto clickable cursor-pointer"
                        >
                            <span>{lang === 'pt' ? 'Ver Projetos' : 'View Projects'}</span>
                            <i className="fas fa-arrow-right text-[9px]"></i>
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
};

// --- COMPACT & EXPANDABLE CAREER & EXPERIENCE TIMELINE ---
// Dates corrected: QA: 2025-Present, Game: 2025-Present, Reverse: 2024-Present, IT: 2026-Present
const ExperienceSection = () => {
    const { t, lang } = useContext(LanguageContext);
    const experiences = PORTFOLIO_DATA.experienceData;
    const [expandedIds, setExpandedIds] = useState({});

    const toggleExpand = (id) => {
        playSoftClick();
        setExpandedIds(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <section id="experience" className="py-8 relative border-t border-white/[0.08]">
            <div className="max-w-5xl mx-auto px-6">
                
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            {t('experience.title')}
                        </h2>
                        <p className="text-slate-400 mt-1 text-sm">
                            {t('experience.subtitle')}
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            const allOpen = Object.keys(expandedIds).length === experiences.length;
                            if (allOpen) setExpandedIds({});
                            else {
                                const allObj = {};
                                experiences.forEach(e => allObj[e.id] = true);
                                setExpandedIds(allObj);
                            }
                        }}
                        className="text-xs font-mono text-primary hover:text-white transition-colors self-start sm:self-auto"
                    >
                        {Object.keys(expandedIds).length === experiences.length 
                            ? (t('experience.collapseAll') || (lang === 'pt' ? '[- Recolher Todos]' : '[- Collapse All]'))
                            : (t('experience.expandAll') || (lang === 'pt' ? '[+ Expandir Todos]' : '[+ Expand All]'))}
                    </button>
                </div>

                {/* Compact Timeline Cards */}
                <div className="space-y-3">
                    {experiences.map((exp) => {
                        const isExpanded = !!expandedIds[exp.id];
                        return (
                            <div 
                                key={exp.id}
                                className="glass-panel rounded-xl border border-white/[0.08] hover:border-primary/40 transition-all overflow-hidden"
                            >
                                {/* Header Row (Click to toggle) */}
                                <div 
                                    onClick={() => toggleExpand(exp.id)}
                                    className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-sm sm:text-base font-bold text-white truncate">
                                                {exp.role[lang]}
                                            </span>
                                            <span className="text-xs font-mono text-slate-500">@</span>
                                            <span className="text-xs sm:text-sm font-medium text-slate-300">
                                                {typeof exp.company === 'object' ? exp.company[lang] : exp.company}
                                            </span>
                                        </div>
                                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                                            {typeof exp.type === 'object' ? exp.type[lang] : exp.type}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 shrink-0">
                                        <span className="px-2.5 py-1 rounded bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium">
                                            {typeof exp.period === 'object' ? exp.period[lang] : exp.period}
                                        </span>
                                        <i className={`fas ${isExpanded ? 'fa-chevron-up text-primary' : 'fa-chevron-down text-slate-500'} text-xs transition-transform`}></i>
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                {isExpanded && (
                                    <div className="px-5 pb-5 pt-1 border-t border-white/[0.05] bg-black/20">
                                        <ul className="space-y-2 mb-4 pt-2">
                                            {exp.bullets[lang].map((bullet, bIdx) => (
                                                <li key={bIdx} className="text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-2">
                                                    <span className="text-primary mt-1 text-[10px]">▹</span>
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 pt-2 border-t border-white/[0.04]">
                                            <span className="text-slate-500 font-mono text-[11px]">Tech:</span>
                                            {exp.skills.map((skill, sIdx) => (
                                                <React.Fragment key={skill}>
                                                    <span className="text-slate-300">{skill}</span>
                                                    {sIdx < exp.skills.length - 1 && <span aria-hidden="true" className="text-slate-600">·</span>}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

// --- CASE STUDY DEEP DIVE MODAL ---

const ModelViewerModal = ({ onClose, lang, initialModelId = 'jet' }) => {
    const models = [
        { id: 'jet', name: 'Jet (Low Poly)', file: '/3d/jet.glb' },
        { id: 'rocket', name: lang === 'pt' ? 'Foguete (Portfólio)' : 'Rocket (Portfolio)', file: '/3d/rocket.glb' },
        { id: 'para', name: 'Paratrooper', file: '/3d/Paratrooper.glb' },
        { id: 'astro', name: lang === 'pt' ? 'Astronauta Cósmico' : 'Cosmic Astronaut', file: '/3d/Astronaut.glb' },
        { id: 'cop', name: lang === 'pt' ? 'Policial (GameJam+)' : 'Cop (GameJam+)', file: '/3d/cop.glb' },
        { id: 'chicken', name: lang === 'pt' ? 'Galinha Espacial' : 'Space Chicken', file: '/3d/space_chicken!.glb' },
        { id: 'pistol', name: lang === 'pt' ? 'Pistola Outcaster' : 'Outcaster Pistol', file: '/3d/pistol_overheat_1.glb' },
        { id: 'spet_logo', name: 'SpetDev 3D Logo', file: '/3d/spetdev_logo.glb' },
        { id: 'sparky_logo', name: 'Sparky Rush 3D Logo', file: '/3d/sparky_rush_3d_logo.glb' },
        { id: 'guild_seal', name: 'Guild Seal (Fable 3)', file: '/3d/guild_seal.glb' },
        { id: 'nuke', name: 'Nuke Power-Up (T6)', file: '/3d/spet_t6_nuke.glb' },
        { id: 'jugger', name: 'Juggernog Perk Machine', file: '/3d/jugger.glb' },
        { id: 'ram', name: 'RAM Stick DDR', file: '/3d/ram_stick.glb' },
        { id: 'bo3_logo', name: 'Black Ops 3 Logo', file: '/3d/logo_bo3.glb' },
        { id: 'ryzeal', name: 'Ryzeal Detonator (YGO 3D)', file: '/3d/ryzealdetonator_YGO.glb' },
        { id: 'tearlaments', name: 'Tearlaments Kitkallos (YGO 3D)', file: '/3d/tearlamentskitkallos_YGO.glb' }
    ];
    const initial = models.find(m => m.id === initialModelId) || models[0];
    const [selected, setSelected] = React.useState(initial);
    const modalRef = React.useRef(null);

    React.useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        if (modalRef.current) modalRef.current.focus();

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div 
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
        >
            <div 
                ref={modalRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                className="bg-[#080808] border border-white/[0.16] rounded-2xl max-w-4xl w-full h-[80vh] flex flex-col relative overflow-hidden shadow-2xl shadow-black/90 ring-1 ring-primary/40 focus:ring-2 focus:ring-primary/60 outline-none animate-fade-in"
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/60"
                    aria-label="Close"
                    autoFocus
                >
                    <i className="fas fa-times"></i>
                </button>
                
                <div className="flex-1 relative bg-black/40">
                    <model-viewer
                        key={selected.id}
                        src={selected.file}
                        alt={selected.name}
                        auto-rotate
                        camera-controls
                        shadow-intensity="1"
                        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                        exposure="1.2"
                        environment-image="legacy"
                    ></model-viewer>
                </div>
                
                <div className="p-4 sm:p-6 border-t border-white/[0.1] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                        {models.map(m => (
                            <button 
                                key={m.id}
                                onClick={() => setSelected(m)}
                                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${selected.id === m.id ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.1]'}`}
                            >
                                {m.name}
                            </button>
                        ))}
                    </div>
                    <a href={selected.file} download={selected.file ? selected.file.split('/').pop() : 'model.glb'} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 whitespace-nowrap w-full sm:w-auto justify-center">
                        <i className="fas fa-download"></i> {lang === 'pt' ? 'Baixar Modelo' : 'Download Model'}
                    </a>
                </div>
            </div>
        </div>
    );
};

const isProjectLocked = (p) => {
    if (!p || !p.isLocked) return false;
    if (p.freePatreonUnlock) {
        return !localStorage.getItem("patreon_free_unlocked") && !localStorage.getItem("relay_md") && !localStorage.getItem("t9_md");
    }
    if (p.id === "t9_mod_manager_re") {
        return !localStorage.getItem("t9_md");
    }
    return !localStorage.getItem("relay_md");
};

const ProjectModal = ({ project, onClose, lang, onOpen3DViewer, onNavigateJournal }) => {
    if (!project) return null;
    const { t } = useContext(LanguageContext);
    const modalRef = React.useRef(null);
    const isLockedState = isProjectLocked(project);
    const slides = (project.caseStudyImages && project.caseStudyImages.length > 0)
        ? project.caseStudyImages
        : (project.images && project.images.length > 0 ? project.images : [project.image]);
    const [slideIdx, setSlideIdx] = useState(0);

    React.useEffect(() => {
        setSlideIdx(0);
    }, [project?.id]);

    React.useEffect(() => {
        if (!project.caseStudyModel && !isLockedState && slides.length > 1) {
            const timer = setInterval(() => {
                setSlideIdx(prev => (prev + 1) % slides.length);
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [project?.id, project?.caseStudyModel, isLockedState, slides.length]);

    React.useEffect(() => {
        // Prevent background scrolling while modal is open
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        // Immediately focus the modal tab dialog container
        if (modalRef.current) {
            modalRef.current.focus();
            modalRef.current.scrollTop = 0;
        }

        // Close on Escape
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const activeTitle = (isLockedState && project.lockedTitle)
        ? project.lockedTitle[lang]
        : (typeof project.title === "object" ? project.title[lang] : project.title);
    const activeDesc = (isLockedState && project.lockedDescription)
        ? project.lockedDescription[lang]
        : project.description[lang];
    const activeCaseStudy = (isLockedState && project.lockedCaseStudy)
        ? project.lockedCaseStudy
        : project.caseStudy;

    return (
        <div 
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
        >
            <div 
                ref={modalRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className="bg-[#080808] border border-white/[0.16] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/90 p-6 sm:p-8 relative outline-none ring-1 ring-primary/40 focus:ring-2 focus:ring-primary/60 transition-all"
            >
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.15] flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary/60"
                    aria-label="Close"
                    autoFocus
                >
                    <i className="fas fa-times"></i>
                </button>

                <div className="text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-1">
                    {project.categoryLabel[lang]}
                </div>
                <h3 id="modal-title" className="text-2xl font-bold text-white mb-4">
                    {activeTitle}
                </h3>

                {/* Media banner using authentic assets or 3D model-viewer */}
                <div className="rounded-xl overflow-hidden bg-black/80 border border-white/[0.08] mb-6 h-56 sm:h-72 relative flex items-center justify-center group/modalmedia">
                    {project.caseStudyModel ? (
                        <model-viewer
                            src={project.caseStudyModel}
                            alt={typeof project.title === "object" ? project.title.en : project.title}
                            auto-rotate
                            camera-controls
                            shadow-intensity="1"
                            exposure="1.1"
                            style={{
                                width: '100%',
                                height: '100%',
                                background: 'radial-gradient(circle at center, rgba(16,24,48,0.85) 0%, rgba(5,5,10,0.95) 100%)'
                            }}
                        />
                    ) : (() => {
                        const activeMediaSrc = (isLockedState && project.lockedImage) ? project.lockedImage : (slides[slideIdx] || project.image);
                        const isVideoMedia = /\.(mp4|webm)(\?.*)?$/i.test(activeMediaSrc || '');
                        const lockClasses = isLockedState
                            ? (project.lockedImage ? "scale-110 opacity-40" : "blur-xl scale-125 opacity-40 grayscale")
                            : "";
                        return (
                        <>
                            {isVideoMedia ? (
                                <video
                                    key={activeMediaSrc}
                                    src={activeMediaSrc}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className={`w-full h-full object-contain bg-black/90 rounded-lg transition-all duration-300 ${lockClasses}`}
                                />
                            ) : (
                                <img
                                    src={activeMediaSrc}
                                    alt={typeof project.title === "object" ? project.title.en : project.title}
                                    className={`w-full h-full object-contain bg-black/90 rounded-lg transition-all duration-300 ${lockClasses}`}
                                />
                            )}
                            {slides.length > 1 && !isLockedState && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setSlideIdx(prev => (prev - 1 + slides.length) % slides.length)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-primary text-white border border-white/15 flex items-center justify-center transition-all cursor-pointer"
                                        aria-label="Previous image"
                                    >
                                        <i className="fas fa-chevron-left text-xs"></i>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSlideIdx(prev => (prev + 1) % slides.length)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-primary text-white border border-white/15 flex items-center justify-center transition-all cursor-pointer"
                                        aria-label="Next image"
                                    >
                                        <i className="fas fa-chevron-right text-xs"></i>
                                    </button>
                                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 border border-white/10">
                                        {slides.map((_, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => setSlideIdx(idx)}
                                                className={`h-1.5 rounded-full transition-all cursor-pointer ${idx === slideIdx ? 'w-4 bg-primary' : 'w-1.5 bg-white/40 hover:bg-white/70'}`}
                                                aria-label={`Slide ${idx + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                        );
                    })()}
                    {isLockedState && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <i className="fas fa-lock text-white/80 text-6xl drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"></i>
                        </div>
                    )}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {activeDesc}
                </p>

                {/* Case Study Breakdown */}
                {activeCaseStudy && (
                    <div className="space-y-4 mb-6 bg-black/35 p-5 rounded-xl border border-white/[0.06]">
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-1 flex items-center gap-1.5">
                                <i className="fas fa-exclamation-circle"></i> {lang === 'pt' ? 'O Desafio Técnico' : 'The Challenge'}
                            </h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                {activeCaseStudy.challenge[lang]}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1 flex items-center gap-1.5">
                                <i className="fas fa-lightbulb"></i> {lang === 'pt' ? 'A Solução Implementada' : 'Engineering Solution'}
                            </h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                {activeCaseStudy.solution[lang]}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
                                <i className="fas fa-chart-line"></i> {lang === 'pt' ? 'Impacto & Resultados' : 'Impact & Results'}
                            </h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                {activeCaseStudy.impact[lang]}
                            </p>
                        </div>
                    </div>
                )}

                {/* Technology list */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 mb-6">
                    <span className="font-mono text-slate-500">Tags:</span>
                    {project.tags.map((tag, tIdx) => (
                        <React.Fragment key={tag}>
                            <span className="text-slate-300">{tag}</span>
                            {tIdx < project.tags.length - 1 && <span aria-hidden="true" className="text-slate-600">·</span>}
                        </React.Fragment>
                    ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/[0.08]">
                    {isLockedState && (
                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                window.dispatchEvent(new CustomEvent('spet:open-patreon-modal'));
                            }}
                            className="px-4 py-2 text-xs font-bold rounded-lg bg-[#FF424D] hover:bg-[#e03640] text-white flex items-center gap-2 transition-colors shadow-lg shadow-[#FF424D]/25 cursor-pointer"
                        >
                            <i className="fab fa-patreon"></i> {project.freePatreonUnlock
                                ? (lang === 'pt' ? 'Fazer Login no Patreon (Grátis)' : 'Log In with Patreon (Free)')
                                : (lang === 'pt' ? 'Desbloquear via Patreon' : 'Unlock via Patreon')}
                        </button>
                    )}
                    {project.repo && !isLockedState && (
                        <a
                            href={project.repo}
                            target={project.id === 'bo2_crossplay_relay' ? "_self" : "_blank"}
                            rel="noreferrer"
                            
                            className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center gap-2 transition-colors"
                        >
                            <i className={project.repo.includes('github.com') ? "fab fa-github" : "fab fa-gitlab"}></i> {project.repoLabel ? (typeof project.repoLabel === "object" ? project.repoLabel[lang] : project.repoLabel) : t('projects.sourceCode')}
                        </a>
                    )}
                    {project.secondaryRepo && !isLockedState && (
                        <a
                            href={project.secondaryRepo}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center gap-2 transition-colors"
                        >
                            <i className={project.secondaryRepo.includes('github.com') ? "fab fa-github" : "fab fa-gitlab"}></i> {project.secondaryRepoLabel ? (typeof project.secondaryRepoLabel === "object" ? project.secondaryRepoLabel[lang] : project.secondaryRepoLabel) : "GitLab (GSC)"}
                        </a>
                    )}
                    {project.live && !isLockedState && project.id !== "free_3d_assets" && project.id !== "technical_journal" && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 text-xs font-semibold rounded-lg bg-primary hover:bg-primaryHover text-white flex items-center gap-2 transition-colors shadow-lg shadow-primary/25"
                        >
                            <i className="fas fa-external-link-alt"></i> {project.liveLabel ? (typeof project.liveLabel === "object" ? project.liveLabel[lang] : project.liveLabel) : t('projects.liveDemo')}
                        </a>
                    )}
                    {project.id === "technical_journal" && (
                        <a
                            href="/journal/"
                            onClick={(e) => {
                                e.preventDefault();
                                onClose();
                                if (onNavigateJournal) onNavigateJournal();
                            }}
                            className="px-4 py-2 text-xs font-semibold rounded-lg bg-primary hover:bg-primaryHover text-white flex items-center gap-2 transition-colors shadow-lg shadow-primary/25 cursor-pointer"
                        >
                            <img src="/assets/icons/notepad_file-0.png" alt="" className="w-3.5 h-3.5 pixelated" /> {lang === 'pt' ? 'Explorar o Journal' : 'Explore Journal'}
                        </a>
                    )}
                    {project.id === "delicia_mod_doom" && (
                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                window.dispatchEvent(new CustomEvent('spet:open-terminal', {
                                    detail: { initialMessage: 'E ai bundão qual é a senha?' }
                                }));
                            }}
                            className="px-4 py-2 text-xs font-semibold rounded-lg bg-orange-500/20 hover:bg-orange-500 text-orange-300 hover:text-white border border-orange-500/40 flex items-center gap-2 transition-all shadow-lg shadow-orange-500/10 cursor-pointer"
                        >
                            <i className="fas fa-terminal"></i> {lang === 'pt' ? 'Abrir Terminal (CLI)' : 'Open CLI Terminal'}
                        </button>
                    )}
                    {project.id === "free_3d_assets" && (
                        <button
                            onClick={onOpen3DViewer}
                            className="px-4 py-2 text-xs font-semibold rounded-lg bg-primary hover:bg-primaryHover text-white flex items-center gap-2 transition-colors shadow-lg shadow-primary/25"
                        >
                            <img src="/assets/icons/paint_file-0.png" alt="" className="w-3.5 h-3.5 pixelated" /> {lang === 'pt' ? 'Ver Modelos' : 'View Models'}
                        </button>
                    )}
                    {project.journalId && (
                        <a
                            href={`/journal/${project.journalId}/`}
                            onClick={(e) => {
                                e.preventDefault();
                                onClose();
                                if (onNavigateJournal) onNavigateJournal(project.journalId);
                            }}
                            className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/[0.04] border border-white/[0.08] text-primary hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
                        >
                            <img src="/assets/icons/notepad_file-0.png" alt="" className="w-3.5 h-3.5 pixelated" /> {lang === 'pt' ? 'Artigo no Journal' : 'Journal Entry'}
                        </a>
                    )}
                </div>

            </div>
        </div>
    );
};

// --- FEATURED PROJECTS SHOWCASE ---

const SPRITE_SHEETS = {
    '/assets/spet01.dev.mp4': { src: '/assets/spet01_sprite.jpg', cols: 5, rows: 10, frames: 50, fps: 10 },
    '/assets/resurge_thumb.mp4': { src: '/assets/resurge_sprite.jpg', cols: 5, rows: 12, frames: 60, fps: 12 },
    '/assets/network_activity.mp4': { src: '/assets/network_sprite.jpg', cols: 5, rows: 10, frames: 50, fps: 10 }
};

let lastGlobalScrollTime = 0;
if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
        lastGlobalScrollTime = performance.now();
    }, { passive: true });
}

const ProjectImage = ({ p, t }) => {
    const isLockedState = isProjectLocked(p);
    const src = (isLockedState && p.lockedImage) ? p.lockedImage : p.image;
    const sprite = SPRITE_SHEETS[src];
    const spriteImgRef = useRef(null);
    const spriteWrapRef = useRef(null);

    useEffect(() => {
        if (!sprite || !spriteImgRef.current || !spriteWrapRef.current) return;
        const img = spriteImgRef.current;
        const wrap = spriteWrapRef.current;
        let isVisible = false;
        let frame = 0;

        if (img.decode) {
            img.decode().catch(() => {});
        }

        const stepFrame = () => {
            if (!isVisible || document.hidden) return;
            if (performance.now() - lastGlobalScrollTime < 140) return;
            frame = (frame + 1) % sprite.frames;
            const col = frame % sprite.cols;
            const row = Math.floor(frame / sprite.cols);
            img.style.transform = `translate3d(-${col * (100 / sprite.cols)}%, -${row * (100 / sprite.rows)}%, 0)`;
        };

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    isVisible = entry.isIntersecting;
                });
            },
            { threshold: 0.05 }
        );
        obs.observe(wrap);
        const timerId = setInterval(stepFrame, Math.round(1000 / sprite.fps));

        return () => {
            obs.disconnect();
            clearInterval(timerId);
        };
    }, [sprite]);

    const lockClasses = isLockedState
        ? (p.lockedImage ? "scale-110 opacity-40" : "blur-xl scale-125 opacity-40 grayscale")
        : "";

    return (
        <>
          {sprite ? (
              <div
                  ref={spriteWrapRef}
                  className={`w-full h-full overflow-hidden relative transition-transform duration-500 group-hover:scale-105 ${lockClasses}`}
              >
                  <img
                      ref={spriteImgRef}
                      src={sprite.src}
                      alt={typeof p.title === "object" ? p.title.en : p.title}
                      decoding="async"
                      style={{
                          width: `${sprite.cols * 100}%`,
                          height: `${sprite.rows * 100}%`,
                          maxWidth: 'none',
                          transform: 'translate3d(0%, 0%, 0)',
                          willChange: 'transform',
                          backfaceVisibility: 'hidden'
                      }}
                      className="block select-none pointer-events-none"
                  />
              </div>
          ) : (
              <img
                  src={src}
                  alt={typeof p.title === "object" ? p.title.en : p.title}
                  className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${lockClasses}`}
                  loading="lazy"
                  decoding="async"
              />
          )}
          {isLockedState && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80 pointer-events-none z-10">
                  <i className="fas fa-lock text-4xl mb-2 drop-shadow-lg"></i>
                  <span className="text-[10px] font-bold tracking-wider uppercase drop-shadow-md">Classified</span>
              </div>
          )}
          </>
    );
};

// Tag badge with tooltip or expanded view on hover for full tag visibility (Pure CSS group-hover, zero React re-renders)
const ProjectTags = ({ tags, lang }) => {
    return (
        <div className="relative mb-3 group/tags">
            {/* Tag preview line with unboxed metadata styling */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-400 select-none">
                {tags.slice(0, 3).map((tag, tIdx) => (
                    <React.Fragment key={tag}>
                        <span 
                            className="text-slate-300 font-medium hover:text-primary transition-colors cursor-help truncate max-w-[105px] sm:max-w-[135px]"
                            title={tag}
                        >
                            {tag}
                        </span>
                        {tIdx < Math.min(tags.length - 1, 2) && (
                            <span aria-hidden="true" className="text-slate-600">·</span>
                        )}
                    </React.Fragment>
                ))}
                {tags.length > 3 && (
                    <span 
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-primary hover:bg-primary hover:text-white border border-white/[0.08] transition-colors cursor-help"
                        title={tags.join(', ')}
                    >
                        +{tags.length - 3}
                    </span>
                )}
            </div>

            {/* Hover Tooltip / Expanded Tag View showing full unclipped tag names */}
            <div 
                className="absolute bottom-full left-0 mb-2 w-max max-w-[280px] sm:max-w-xs p-3 rounded-xl bg-[#050505]/95 border border-white/[0.12] shadow-2xl z-30 transition-all duration-150 pointer-events-none opacity-0 translate-y-1 invisible scale-95 group-hover/tags:opacity-100 group-hover/tags:translate-y-0 group-hover/tags:visible group-hover/tags:scale-100"
            >
                <div className="text-[10px] font-mono text-primary font-semibold mb-1.5 uppercase tracking-wider flex items-center justify-between gap-2 border-b border-white/[0.08] pb-1">
                    <span className="flex items-center gap-1.5">
                        <i className="fas fa-tags text-[9px]"></i>
                        <span>Tags ({tags.length})</span>
                    </span>
                    <span className="text-[9px] text-slate-400 font-normal">
                        {lang === 'pt' ? 'Expandido' : 'Expanded view'}
                    </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {tags.map((tag) => (
                        <span 
                            key={tag} 
                            className="px-2 py-0.5 rounded-md bg-white/[0.07] text-slate-200 text-[10px] font-medium border border-white/[0.08] whitespace-nowrap"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ProjectsSection = ({ onNavigateJournal }) => {
    const { t, lang } = useContext(LanguageContext);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeModalProject, setActiveModalProject] = useState(null);
    const [show3DViewer, setShow3DViewer] = useState(false);
    const [viewerModelId, setViewerModelId] = useState('jet');
    const [patreonUnlockTick, setPatreonUnlockTick] = useState(0);

    useEffect(() => {
        const handleOpenViewer = (e) => {
            setViewerModelId(e.detail?.modelId || 'chicken');
            setShow3DViewer(true);
        };
        const handlePatreonUnlock = () => setPatreonUnlockTick(prev => prev + 1);
        window.addEventListener('spet:open-3d-viewer', handleOpenViewer);
        window.addEventListener('spet:patreon-unlock', handlePatreonUnlock);
        return () => {
            window.removeEventListener('spet:open-3d-viewer', handleOpenViewer);
            window.removeEventListener('spet:patreon-unlock', handlePatreonUnlock);
        };
    }, []);

    const allProjects = PORTFOLIO_DATA.projectsData;

    const filteredProjects = useMemo(() => {
        return allProjects.filter(p => {
            const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
            const query = searchQuery.toLowerCase().trim();
            if (!query) return matchesCategory;

            const titleMatch = (typeof p.title === "object" ? p.title.en : p.title).toLowerCase().includes(query);
            const descMatch = p.description[lang].toLowerCase().includes(query);
            const tagMatch = p.tags.some(tag => tag.toLowerCase().includes(query));

            return matchesCategory && (titleMatch || descMatch || tagMatch);
        });
    }, [selectedCategory, searchQuery, lang, allProjects]);

    return (
        <section id="projects" className="py-8 relative border-t border-white/[0.08]">
            <div className="max-w-6xl mx-auto px-6">
                
                {/* Header with Search */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            {t('projects.title')}
                        </h2>
                        <p className="text-slate-400 mt-1 text-sm">
                            {t('projects.subtitle')}
                        </p>
                    </div>

                    <div className="w-full md:w-72 relative">
                        <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('projects.searchPlaceholder')}
                            className="w-full pl-9 pr-8 py-2 text-xs bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        )}
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl mb-8 w-fit">
                    {[
                        { id: 'all', label: t('projects.categories.all'), sprite: '/assets/icons/spet_sprites/blue_folder.png' },
                        { id: 'reverse', label: t('projects.categories.reverse'), sprite: '/assets/icons/spet_sprites/green_chip.png' },
                        { id: 'gamedev', label: t('projects.categories.gamedev'), sprite: '/assets/icons/spet_sprites/gba_cartridge.png' },
                        { id: 'tools', label: t('projects.categories.tools'), sprite: '/assets/icons/spet_sprites/terminal_window.png' },
                        { id: 'qa', label: t('projects.categories.qa'), sprite: '/assets/icons/spet_sprites/radar_sonar.png' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { playSoftClick(); setSelectedCategory(tab.id); }}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${selectedCategory === tab.id ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            <img src={tab.sprite} alt="" className="w-3.5 h-3.5 pixelated" />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-16 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                        <i className="fas fa-magnifying-glass text-3xl text-slate-600 mb-3"></i>
                        <p className="text-slate-400 text-sm">{t('projects.noResults')}</p>
                        <button
                            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                            className="mt-3 px-3.5 py-1.5 rounded-lg bg-white/[0.06] text-xs font-medium text-primary hover:bg-white/[0.1] transition-colors"
                        >
                            {lang === 'pt' ? 'Resetar Filtros' : 'Reset Filters'}
                        </button>
                    </div>
                ) : (
                    <div 
                        key={`projects-grid-${selectedCategory}-${searchQuery ? 'search' : 'all'}-${patreonUnlockTick}`}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredProjects.map((p, idx) => {
                            const isLockedState = isProjectLocked(p);
                            const categorySprite = 
                                p.category === 'reverse' ? '/assets/icons/spet_sprites/green_chip.png' :
                                p.category === 'gamedev' ? '/assets/icons/spet_sprites/gba_cartridge.png' :
                                p.category === 'tools' ? '/assets/icons/spet_sprites/terminal_window.png' :
                                p.category === 'qa' ? '/assets/icons/spet_sprites/radar_sonar.png' :
                                '/assets/icons/spet_sprites/blue_folder.png';
                            return (
                            <article
                                key={`${p.id}-${selectedCategory}-${searchQuery}`}
                                style={{ animationDelay: `${Math.min(idx * 40, 240)}ms` }}
                                className="glass-panel rounded-2xl overflow-hidden border border-white/[0.08] flex flex-col group transition-all duration-200 project-card-animate"
                            >
                                {/* Authentic Project Image - Cleanly cropped border-to-border */}
                                <div 
                                    onClick={() => { playSoftClick(); setActiveModalProject(p); }}
                                    className="h-48 sm:h-52 w-full bg-[#050505] overflow-hidden relative cursor-pointer border-b border-white/[0.08] select-none clickable"
                                >
                                    <ProjectImage p={p} t={t} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent opacity-60 pointer-events-none" />
                                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-20">
                                        <span className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-black/90 text-white border border-primary/50 shadow-lg transform translate-y-1 group-hover:translate-y-0 transition-transform">
                                             {t('projects.viewDetails')}
                                        </span>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                                            <span className="text-primary font-semibold flex items-center gap-1.5">
                                                <img src={categorySprite} alt="" className="w-3.5 h-3.5 pixelated inline-block" />
                                                <span>{p.categoryLabel[lang]}</span>
                                            </span>
                                        </div>

                                        <h3 
                                            onClick={() => { playSoftClick(); setActiveModalProject(p); }}
                                            className="text-base font-bold text-white group-hover:text-primary transition-colors cursor-pointer line-clamp-1"
                                        >
                                            {(isLockedState && p.lockedTitle) ? p.lockedTitle[lang] : (typeof p.title === "object" ? p.title[lang] : p.title)}
                                        </h3>

                                        <p className="text-slate-300 text-xs mt-2 line-clamp-3 leading-relaxed">
                                            {(isLockedState && p.lockedDescription) ? p.lockedDescription[lang] : p.description[lang]}
                                        </p>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-white/[0.04]">
                                        <ProjectTags tags={p.tags} lang={lang} />

                                        <div className="flex items-center justify-between pt-1">
                                            <button
                                                onClick={() => { playSoftClick(); setActiveModalProject(p); }}
                                                className="text-xs font-semibold text-primary hover:text-white transition-colors flex items-center gap-1"
                                            >
                                                <span>{t('projects.viewDetails')}</span>
                                                <i className="fas fa-arrow-right text-[10px]"></i>
                                            </button>

                                            <div className="flex items-center gap-2">
                                                {p.repo && !isLockedState && (
                                                    <a
                                                        href={p.repo}
                                                        target={p.id === 'bo2_crossplay_relay' ? "_self" : "_blank"}
                                                        rel="noreferrer"
                                                        
                                                        className="w-7 h-7 rounded-md bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs"
                                                        title={p.repoLabel ? p.repoLabel[lang] : "Source Code"}
                                                    >
                                                        <i className={p.repo.includes('github.com') ? "fab fa-github" : "fab fa-gitlab"}></i>
                                                    </a>
                                                )}
                                                {p.secondaryRepo && (
                                                    <a
                                                        href={p.secondaryRepo}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="w-7 h-7 rounded-md bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs"
                                                        title={p.secondaryRepoLabel ? p.secondaryRepoLabel[lang] : "GSC Sources & Compiler"}
                                                    >
                                                        <i className={p.secondaryRepo.includes('github.com') ? "fab fa-github" : "fab fa-gitlab"}></i>
                                                    </a>
                                                )}
                                                {p.live && p.id !== 'free_3d_assets' && p.id !== 'technical_journal' && (
                                                    <a
                                                        href={p.live}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="w-7 h-7 rounded-md bg-primary/20 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-colors text-xs"
                                                        title={p.liveLabel ? (typeof p.liveLabel === "object" ? p.liveLabel[lang] : p.liveLabel) : "Live Link"}
                                                    >
                                                        <i className="fas fa-external-link-alt"></i>
                                                    </a>
                                                )}
                                                {p.id === 'technical_journal' && (
                                                    <a
                                                        href="/journal/"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            if (onNavigateJournal) onNavigateJournal();
                                                        }}
                                                        className="w-7 h-7 rounded-md bg-primary/20 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-colors text-xs cursor-pointer"
                                                        title={lang === 'pt' ? 'Explorar o Journal' : 'Explore Journal'}
                                                    >
                                                        <img src="/assets/icons/notepad_file-0.png" alt="" className="w-3.5 h-3.5 pixelated" />
                                                    </a>
                                                )}
                                                {p.id === 'delicia_mod_doom' && (
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            window.dispatchEvent(new CustomEvent('spet:open-terminal', {
                                                                detail: { initialMessage: 'E ai bundão qual é a senha?' }
                                                            }));
                                                        }}
                                                        className="w-7 h-7 rounded-md bg-orange-500/20 hover:bg-orange-500 text-orange-300 hover:text-white flex items-center justify-center transition-colors text-xs cursor-pointer"
                                                        title={lang === 'pt' ? 'Abrir Terminal (CLI)' : 'Open CLI Terminal'}
                                                    >
                                                        <i className="fas fa-terminal"></i>
                                                    </button>
                                                )}
                                                 {p.id === 'free_3d_assets' && (
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setShow3DViewer(true); }}
                                                        className="w-7 h-7 rounded-md bg-primary/20 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-colors text-xs"
                                                        title={lang === 'pt' ? 'Ver Modelos 3D' : 'View 3D Models'}
                                                    >
                                                        <img src="/assets/icons/paint_file-0.png" alt="" className="w-3.5 h-3.5 pixelated" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </article>
                        );
                        })}
                    </div>
                )}

            </div>

            {/* Case Study Modal */}
            {activeModalProject && (
                <ProjectModal
                    project={activeModalProject}
                    onClose={() => setActiveModalProject(null)}
                    lang={lang}
                    onOpen3DViewer={() => { setViewerModelId('jet'); setShow3DViewer(true); }}
                    onNavigateJournal={onNavigateJournal}
                />
            )}
            {/* 3D Model Viewer Modal */}
            {show3DViewer && (
                <ModelViewerModal
                    initialModelId={viewerModelId}
                    onClose={() => setShow3DViewer(false)}
                    lang={lang}
                />
            )}
        </section>
    );
};

// --- COMPACT 3D ICONS TECH STACK & CAPABILITIES ---
const SkillsSection = () => {
    const { t, lang } = useContext(LanguageContext);
    const techCategories = PORTFOLIO_DATA.techCategories;

    return (
        <section id="skills" className="py-8 relative border-t border-white/[0.08]">
            <div className="max-w-5xl mx-auto px-6">
                
                <div className="text-center sm:text-left mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {t('skills.title')}
                    </h2>
                    <p className="text-slate-400 mt-1 text-sm">
                        {t('skills.subtitle')}
                    </p>
                </div>

                {/* Compact Grid Columns with 3D Tech Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {techCategories.map((cat) => {
                        const catSprite = 
                            cat.id === 'systems' ? '/assets/icons/spet_sprites/green_chip.png' :
                            cat.id === 'reverse' ? '/assets/icons/spet_sprites/server_rack.png' :
                            cat.id === 'gamedev' ? '/assets/icons/spet_sprites/gba_cartridge.png' :
                            cat.id === 'scripting' ? '/assets/icons/spet_sprites/terminal_window.png' :
                            cat.id === 'qa' ? '/assets/icons/spet_sprites/radar_sonar.png' :
                            '/assets/icons/spet_sprites/blue_folder.png';
                        return (
                        <div 
                            key={cat.id}
                            className="glass-panel rounded-xl p-4 border border-white/[0.08] hover:border-primary/40 transition-colors flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-white/[0.06]">
                                    <img src={catSprite} alt="" className="w-4 h-4 pixelated inline-block" />
                                    <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-200">
                                        {t(`skills.${cat.nameKey}`)}
                                    </h3>
                                </div>

                                <div className="space-y-2">
                                    {cat.skills.map((s, idx) => (
                                        <div key={idx} className="flex items-center gap-2.5 p-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                                            {/* 3D Icon from skillicons.dev */}
                                            <img
                                                src={s.icon3d}
                                                alt={s.name}
                                                className="w-6 h-6 rounded-md shadow-sm shrink-0"
                                                loading="lazy"
                                                
                                            />
                                            <div className="min-w-0">
                                                <div className="text-xs font-semibold text-white truncate">
                                                    {s.name}
                                                </div>
                                                <div className="text-[10px] text-slate-400 truncate">
                                                    {s.level}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

// --- TECHNICAL JOURNAL PREVIEW ---
const JournalSection = ({ onNavigateJournal }) => {
    const { t, lang } = useContext(LanguageContext);
    const entries = PORTFOLIO_DATA.journalEntries;
    const [viewsMap, setViewsMap] = useState({});
    const [sortBy, setSortBy] = useState('popular');

    useEffect(() => {
        fetch('https://journal.gelain15mj.workers.dev/api/journal/views')
            .then(res => res.json())
            .then(data => {
                if (data && data.views) {
                    setViewsMap(data.views);
                }
            })
            .catch(() => {});
    }, []);

    const getEntryViews = (entry) => {
        if (!entry) return null;
        const slug = entry.file ? entry.file.replace(/\.md$/, '') : entry.id;
        if (viewsMap[slug] !== undefined) return viewsMap[slug];
        if (viewsMap[entry.id] !== undefined) return viewsMap[entry.id];
        return Object.keys(viewsMap).length > 0 ? 0 : null;
    };

    const sortedEntries = [...entries].sort((a, b) => {
        if (sortBy === 'popular') {
            const vA = getEntryViews(a) ?? -1;
            const vB = getEntryViews(b) ?? -1;
            if (vB !== vA) return vB - vA;
        } else if (sortBy === 'alpha') {
            return (a.title || '').localeCompare(b.title || '');
        }
        return 0;
    });

    return (
        <section id="journal" className="py-8 relative border-t border-white/[0.08]">
            <div className="max-w-5xl mx-auto px-6">
                
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            {t('journal.title')}
                        </h2>
                        <p className="text-slate-400 mt-1 text-sm">
                            {t('journal.subtitle')}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                            <span>{lang === 'pt' ? 'Filtrar por:' : 'Filter by:'}</span>
                            <select
                                value={sortBy}
                                onChange={(e) => { playSoftClick(); setSortBy(e.target.value); }}
                                className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/[0.1] text-xs text-white font-mono focus:outline-none focus:border-primary/60 transition-colors cursor-pointer clickable"
                            >
                                <option value="popular" className="bg-[#0a0f1d] text-white">
                                    {lang === 'pt' ? 'Popularidade' : 'Popularity'}
                                </option>
                                <option value="date" className="bg-[#0a0f1d] text-white">
                                    {lang === 'pt' ? 'Data' : 'Date'}
                                </option>
                                <option value="alpha" className="bg-[#0a0f1d] text-white">
                                    {lang === 'pt' ? 'Ordem Alfabética' : 'Alphabetical'}
                                </option>
                            </select>
                        </div>

                        <a
                            href="/journal"
                            onClick={(e) => {
                                e.preventDefault();
                                if (onNavigateJournal) onNavigateJournal();
                            }}
                            className="text-xs font-semibold text-primary hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                            <span>{t('journal.viewAll')}</span>
                            <i className="fas fa-arrow-right text-[10px]"></i>
                        </a>
                    </div>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x journal-entries-scroll" style={{ scrollbarGutter: 'stable' }}>
                    {sortedEntries.map((entry) => {
                        const views = getEntryViews(entry);
                        const isEntryLocked = entry.file === 'T9-Mod-Manager-RE.md' || entry.id === 'entry_0007';
                        const slug = isEntryLocked ? entry.id : (entry.file ? entry.file.replace(/\.md$/, '') : entry.id);
                        return (
                            <a
                                key={entry.id}
                                href={`/journal/${slug}/`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (onNavigateJournal) onNavigateJournal(slug);
                                }}
                                className="glass-panel rounded-xl p-5 border border-white/[0.08] hover:border-primary/40 transition-all flex flex-col justify-between group min-w-[280px] sm:min-w-[320px] max-w-[340px] shrink-0 snap-start cursor-pointer"
                            >
                                <div>
                                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2 gap-2">
                                        <span className="text-primary font-semibold truncate flex items-center gap-1.5">
                                            <img src="/assets/icons/notepad_file-0.png" alt="" className="w-3.5 h-3.5 pixelated inline-block shrink-0" />
                                            <span className="truncate">{entry.category}</span>
                                        </span>
                                        <div className="flex items-center gap-2 shrink-0 text-[10px] text-slate-400">
                                            {views !== null && (
                                                <span><i className="far fa-eye mr-0.5"></i> {views}</span>
                                            )}
                                            <span>{entry.date}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                                        {entry.title}
                                    </h3>

                                    <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                                        {entry.excerpt}
                                    </p>
                                </div>

                                <div className="mt-4 pt-3 border-t border-white/[0.04] text-[11px] font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    <span>{t('journal.readArticle')}</span>
                                    <i className="fas fa-chevron-right text-[9px]"></i>
                                </div>
                            </a>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

// --- TOOLS SECTION: Developer Utilities & In-Browser Workbenches ---
const ToolsSection = () => {
    const { t, lang } = useContext(LanguageContext);

    const toolsList = [
        {
            id: 'easy-decompiler',
            url: '/tools/easy-decompiler/',
            title: t('tools.easyDecompTitle') || "Spet's Easy Online Decompiler",
            badge: t('tools.easyDecompBadge') || "WASM Binary Analyzer & Decompiler",
            icon: '/assets/icons/spet_sprites/green_chip.png',
            desc: t('tools.easyDecompDesc') || "Local WebAssembly binary analyzer and dual C-like decompiler workbench powered by Rizin and Ghidra Sleigh in Web Workers.",
            openText: t('tools.easyDecompOpen') || "Open Easy Online Decompiler",
            accentBorder: "border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_8px_30px_rgba(6,182,212,0.12)]",
            badgeColor: "text-cyan-400 border-cyan-500/20",
            buttonBg: "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/30",
            pathColor: "text-cyan-400/80",
            tags: ['WebAssembly', 'Rizin Core', 'Ghidra Sleigh', 'x86 / x64', 'ARM / MIPS', 'PE32 / ELF', 'CFG Recovery'],
            preview: (
                <div className="relative w-full h-full min-h-[220px] bg-[#05070B] flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[0.08] group">
                    <img
                        src="/assets/tool_easy_decompiler.png"
                        alt="Spet's Easy Online Decompiler"
                        className="w-full h-full object-cover object-left-top transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                </div>
            )
        },
        {
            id: 'universal-file',
            url: '/tools/universal-file/',
            title: t('tools.universalFileTitle') || "Spet's Universal Game File Opener",
            badge: t('tools.universalFileBadge') || "Universal Game Archive & Stream Carver",
            icon: '/assets/icons/spet_sprites/saturn_folder.png',
            desc: t('tools.universalFileDesc') || "In-browser virtual filesystem inspector and carver supporting 25+ PC and console game engines: Bethesda (BSA/BA2), Ubisoft (FORGE), Rockstar RAGE (.rpf), Minecraft mods (.jar), PlayStation (.pkg), CRIWARE (.awb/.usm), FromSoftware (.bnd/.dcx), Square Enix (.sdat/.pfs), Call of Duty FastFiles (.ff), and raw Zlib streams.",
            openText: t('tools.universalFileOpen') || "Open Game File Opener",
            accentBorder: "border-amber-500/30 hover:border-amber-400/60 shadow-[0_8px_30px_rgba(245,158,11,0.12)]",
            badgeColor: "text-amber-400 border-amber-500/20",
            buttonBg: "bg-amber-600 hover:bg-amber-500 shadow-amber-600/30 text-slate-950 font-bold",
            pathColor: "text-amber-400/80",
            tags: ['Bethesda BSA/BA2', 'Ubisoft FORGE', 'Rockstar RPF', 'PlayStation PKG', 'CRIWARE Audio', 'FromSoft BND', 'CoD FastFiles', 'id Tech WAD/PAK'],
            preview: (
                <div className="relative w-full h-full min-h-[220px] bg-[#0B0F17] flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[0.08] group">
                    <img
                        src="/assets/tool_universal_file.png"
                        alt="Spet's Universal Game File Opener"
                        className="w-full h-full object-cover object-left-top transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                </div>
            )
        },
        {
            id: 'quick-3d',
            url: '/tools/image-to-3d/',
            title: "Spet's Quick 3D Studio",
            badge: lang === 'pt' ? 'Gerador 3D Procedural' : 'Procedural 3D Generator',
            icon: '/assets/icons/spet_sprites/paintbrush.png',
            desc: t('tools.desc'),
            openText: t('tools.openTool'),
            accentBorder: "border-purple-500/30 hover:border-purple-400/60 shadow-[0_8px_30px_rgba(168,85,247,0.12)]",
            badgeColor: "text-purple-400 border-purple-500/20",
            buttonBg: "bg-purple-600 hover:bg-purple-500 shadow-purple-600/30",
            pathColor: "text-purple-400/80",
            tags: ['Three.js', 'WebGL 2.0', 'Procedural 3D', 'GLTF / GLB Exporter', 'PBR Shaders'],
            preview: (
                <div className="relative w-full h-full min-h-[220px] bg-[#040612] flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[0.08]">
                    <img
                        src="/assets/tool_quick_3d_studio.png"
                        alt="Spet's Quick 3D Studio"
                        className="w-full h-full object-cover object-left-top"
                        loading="lazy"
                    />
                </div>
            )
        }
    ];

    return (
        <section id="tools" className="py-16 relative border-t border-white/[0.08]">
            <div className="max-w-6xl mx-auto px-6 space-y-8">
                
                <div className="text-center sm:text-left mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {t('tools.title')}
                    </h2>
                    <p className="text-slate-400 mt-1 text-sm">
                        {t('tools.subtitle')}
                    </p>
                </div>

                {/* All Tools Grid / Stack */}
                <div className="space-y-6">
                    {toolsList.map((tool) => (
                        <div
                            key={tool.id}
                            className={`glass-panel rounded-2xl border ${tool.accentBorder} overflow-hidden transition-all duration-300`}
                        >
                            <div className="grid lg:grid-cols-12 gap-0 items-stretch">
                                
                                {/* Visual Preview Panel */}
                                <div className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center overflow-hidden">
                                    {tool.preview}
                                </div>

                                {/* Description & Action Panel */}
                                <div className="lg:col-span-6 xl:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-white/[0.02] via-black/40 to-transparent">
                                    <div>
                                        <div className={`text-[11px] font-mono font-semibold tracking-wider uppercase mb-1.5 flex items-center gap-2 ${tool.badgeColor.split(' ')[0]}`}>
                                            {tool.icon && (
                                                <img
                                                    src={tool.icon}
                                                    alt=""
                                                    className="w-4 h-4 pixelated shrink-0 inline-block"
                                                />
                                            )}
                                            <span>{tool.badge}</span>
                                        </div>

                                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                                            {tool.title}
                                        </h3>

                                        <p className="text-sm text-slate-300 leading-relaxed mb-6">
                                            {tool.desc}
                                        </p>

                                        <div className="flex flex-wrap gap-1.5 mb-6">
                                            {tool.tags.map((tag, i) => (
                                                <span key={i} className={`text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-200 border ${tool.badgeColor.split(' ')[1]}`}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
                                        <a
                                            href={tool.url}
                                            className={`px-5 py-2.5 rounded-lg ${tool.buttonBg} text-white text-xs font-semibold transition-colors shadow-lg flex items-center gap-2 cursor-pointer`}
                                        >
                                            <span>{tool.openText}</span>
                                            <i className="fas fa-arrow-right text-[10px]"></i>
                                        </a>

                                        <span className={`text-[11px] font-mono ${tool.pathColor}`}>
                                            {tool.url}
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

// --- CONTACT SECTION: NO LOCATION ---
const ContactSection = () => {
    const { t, lang } = useContext(LanguageContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [copied, setCopied] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error'

    const handleCopyEmail = () => {
        playSoftClick();
        navigator.clipboard.writeText('gelain15mj@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        playSoftClick();

        if (!name || !email || !message) {
            setStatus('error');
            return;
        }

        const mailtoUrl = `mailto:gelain15mj@gmail.com?subject=${encodeURIComponent(subject || 'Contato via Portfólio')}&body=${encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`)}`;
        window.location.href = mailtoUrl;

        setStatus('success');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setTimeout(() => setStatus(null), 5000);
    };

    return (
        <section id="contact" className="py-8 relative border-t border-white/[0.08]">
            <div className="max-w-5xl mx-auto px-6">
                
                <div className="max-w-2xl mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {t('contact.title')}
                    </h2>
                    <p className="text-slate-400 mt-1 text-sm">
                        {t('contact.subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-12 gap-8 items-start">
                    
                    {/* Left: Contact Info (NO LOCATION) */}
                    <div className="md:col-span-5 space-y-4">
                        <div className="glass-panel rounded-xl p-5 border border-white/[0.08] space-y-4">
                            <div>
                                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                    <img src="/assets/icons/spet_sprites/radio_tower.png" alt="" className="w-3.5 h-3.5 pixelated inline-block" />
                                    <span>{lang === 'pt' ? 'E-mail Direto' : 'Direct Email'}</span>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-sm font-semibold text-white font-mono select-all truncate">
                                        gelain15mj@gmail.com
                                    </span>
                                    <button
                                        onClick={handleCopyEmail}
                                        className="px-2.5 py-1 text-xs font-medium rounded bg-white/[0.08] hover:bg-primary text-white transition-colors shrink-0"
                                        title={t('contact.copyEmail')}
                                    >
                                        <i className={`fas ${copied ? 'fa-check text-emerald-300' : 'fa-copy'} mr-1 text-[11px]`}></i>
                                        {copied ? t('contact.copied') : t('contact.copyEmail')}
                                    </button>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-white/[0.06]">
                                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                    <img src="/assets/icons/spet_sprites/audio_speaker.png" alt="" className="w-3.5 h-3.5 pixelated inline-block" />
                                    <span>Discord</span>
                                </div>
                                <div className="text-sm font-semibold text-white font-mono">
                                    Spet001
                                </div>
                            </div>
                        </div>

                        {/* Social profiles list */}
                        <div className="flex items-center gap-3 text-slate-400 p-2">
                            <a href="https://github.com/Spet001" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors text-lg" title="GitHub">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="https://gitlab.com/Spet001" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors text-lg" title="GitLab">
                                <i className="fab fa-gitlab"></i>
                            </a>
                            <a href="https://spet01.itch.io/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors text-lg" title="Itch.io">
                                <i className="fab fa-itch-io"></i>
                            </a>
                            <a href="https://www.nexusmods.com/profile/Spet001/mods" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors text-lg" title="NexusMods">
                                <i className="fas fa-cube"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/eduardo-gelain/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors text-lg" title="LinkedIn">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>

                    {/* Right: Direct message form */}
                    <div className="md:col-span-7">
                        <form onSubmit={handleSubmit} className="glass-panel rounded-xl p-5 sm:p-6 border border-white/[0.08] space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">{t('contact.nameLabel')} *</label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-3 py-2 text-xs bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">{t('contact.emailLabel')} *</label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 text-xs bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">{t('contact.subjectLabel')}</label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full px-3 py-2 text-xs bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">{t('contact.messageLabel')} *</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-3 py-2 text-xs bg-white/[0.04] border border-white/[0.1] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors resize-none"
                                ></textarea>
                            </div>

                            {status === 'success' && (
                                <div className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-lg flex items-center gap-2">
                                    <i className="fas fa-check-circle"></i>
                                    <span>{t('contact.successMsg')}</span>
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/30 p-2.5 rounded-lg flex items-center gap-2">
                                    <i className="fas fa-exclamation-triangle"></i>
                                    <span>{t('contact.errorMsg')}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full py-2.5 rounded-lg bg-primary hover:bg-primaryHover text-white text-xs font-semibold transition-colors shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                            >
                                <i className="fas fa-paper-plane text-[11px]"></i>
                                <span>{t('contact.sendBtn')}</span>
                            </button>
                        </form>
                    </div>

                </div>

            </div>
        </section>
    );
};

// --- FOOTER: Preserves Exact Original Quote & Journal Newsletter ---
const Footer = ({ onOpenEasterMenu, onNavigateHome, onNavigateJournal, onNavigatePrivacy, currentView }) => {
    const { t, lang } = useContext(LanguageContext);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
    const [statusMsg, setStatusMsg] = useState('');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        const trimmedEmail = email.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
            setStatus('error');
            setStatusMsg(t('footer.newsletter.error'));
            return;
        }

        setStatus('loading');
        setStatusMsg('');

        try {
            const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    service_id: 'port_news',
                    template_id: 'template_v3tak8u',
                    user_id: 'u1SUhm-JQLEo2LZgw',
                    template_params: {
                        user_email: trimmedEmail
                    }
                })
            });

            if (res.ok) {
                setStatus('success');
                setStatusMsg(t('footer.newsletter.success'));
                setEmail('');
                try {
                    const saved = JSON.parse(localStorage.getItem('journal_newsletter_subscribers') || '[]');
                    if (!saved.includes(trimmedEmail)) saved.push(trimmedEmail);
                    localStorage.setItem('journal_newsletter_subscribers', JSON.stringify(saved));
                } catch (err) {}
            } else {
                const errorData = await res.text();
                console.error('EmailJS Error:', errorData);
                setStatus('error');
                setStatusMsg(t('footer.newsletter.error'));
            }
        } catch (err) {
            console.error('Network Error:', err);
            setStatus('error');
            setStatusMsg('Network error. Try again later.');
        }
    };

    return (
        <footer className="py-12 border-t border-white/[0.08] bg-[#030303] text-center text-xs text-slate-500 relative">
            <div className="max-w-4xl mx-auto px-6 space-y-6">
                
                {/* Brand & Nav */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 font-medium text-xs">
                    <a href="#top" onClick={(e) => { if (currentView !== 'home') { e.preventDefault(); if (onNavigateHome) onNavigateHome(); } }} className="hover:text-primary transition-colors cursor-pointer">Home</a>
                    <a href="#experience" onClick={(e) => { if (currentView !== 'home') { e.preventDefault(); if (onNavigateHome) onNavigateHome(); setTimeout(() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }), 100); } }} className="hover:text-primary transition-colors cursor-pointer">{t('nav.experience')}</a>
                    <a href="#projects" onClick={(e) => { if (currentView !== 'home') { e.preventDefault(); if (onNavigateHome) onNavigateHome(); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 100); } }} className="hover:text-primary transition-colors cursor-pointer">{t('nav.projects')}</a>
                    <a href="#skills" onClick={(e) => { if (currentView !== 'home') { e.preventDefault(); if (onNavigateHome) onNavigateHome(); setTimeout(() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }), 100); } }} className="hover:text-primary transition-colors cursor-pointer">{t('nav.skills')}</a>
                    <a href="/journal" onClick={(e) => { e.preventDefault(); if (onNavigateJournal) onNavigateJournal(); }} className="hover:text-primary transition-colors text-primary font-semibold cursor-pointer">{t('nav.journal')}</a>
                    <a href="#tools" onClick={(e) => { if (currentView !== 'home') { e.preventDefault(); if (onNavigateHome) onNavigateHome(); setTimeout(() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' }), 100); } }} className="hover:text-primary transition-colors cursor-pointer">{t('nav.tools') || 'Tools'}</a>
                    <a href="#contact" onClick={(e) => { if (currentView !== 'home') { e.preventDefault(); if (onNavigateHome) onNavigateHome(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); } }} className="hover:text-primary transition-colors cursor-pointer">{t('nav.contact')}</a>
                </div>

                {/* EXACT RESTORED USER QUOTE */}
                <div className="pt-4 border-t border-white/[0.06] space-y-1.5">
                    <p className="text-slate-400 font-semibold text-xs flex items-center justify-center">
                        <span>{t('footer.hint')}</span>
                    </p>
                    <p className="text-slate-500 italic max-w-lg mx-auto text-[11px] leading-relaxed">
                        "{t('footer.joke')}"
                    </p>
                </div>

                {/* NEWSLETTER SUBSCRIPTION FORM (Bottom of Footer) */}
                <div className="pt-6 border-t border-white/[0.06]">
                    <div className="max-w-md mx-auto p-5 rounded-xl glass-panel text-center space-y-3 shadow-2xl">
                        <div className="flex items-center justify-center gap-2 text-white font-semibold text-xs sm:text-sm">
                            <img src="/assets/icons/notepad_file-0.png" alt="" className="w-4 h-4 pixelated inline-block" />
                            <span>{t('footer.newsletter.title')}</span>
                        </div>
                        <p className="text-slate-400 text-[11px] leading-relaxed max-w-sm mx-auto">
                            {t('footer.newsletter.desc')}
                        </p>

                        <form onSubmit={handleSubscribe} className="pt-1 space-y-2">
                            <div className="flex flex-col sm:flex-row items-stretch gap-2">
                                <div className="relative flex-1">
                                    <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (status !== 'idle') setStatus('idle');
                                        }}
                                        placeholder={t('footer.newsletter.placeholder')}
                                        disabled={status === 'loading'}
                                        aria-label="Newsletter email address"
                                        className="w-full pl-8 pr-3 py-2 rounded-lg bg-black/60 border border-white/[0.12] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors disabled:opacity-50"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="px-4 py-2 rounded-lg bg-primary hover:bg-primaryHover text-white text-xs font-semibold transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-1.5 whitespace-nowrap disabled:opacity-60 cursor-pointer clickable"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <i className="fas fa-circle-notch fa-spin text-[10px]"></i>
                                            <span>{t('footer.newsletter.subscribing')}</span>
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-paper-plane text-[10px]"></i>
                                            <span>{t('footer.newsletter.button')}</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {status === 'success' && (
                                <div className="text-emerald-400 text-[11px] text-center flex items-center justify-center gap-1.5 pt-1">
                                    <i className="fas fa-check-circle"></i>
                                    <span>{statusMsg || t('footer.newsletter.success')}</span>
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="text-rose-400 text-[11px] text-center flex items-center justify-center gap-1.5 pt-1">
                                    <i className="fas fa-exclamation-circle"></i>
                                    <span>{statusMsg || t('footer.newsletter.error')}</span>
                                </div>
                            )}

                            <p className="text-[10px] text-slate-500 text-center pt-0.5">
                                <i className="fas fa-shield-alt text-slate-600 mr-1"></i>
                                {t('footer.newsletter.note')}
                            </p>
                        </form>
                    </div>
                </div>

                <div className="pt-3 text-slate-600 text-[11px]">
                    {t('footer.rights')}
                </div>

                {/* 3D Asset Credits Section */}
                <div className="pt-4 mt-6 border-t border-white/[0.06] text-[10px] text-slate-500 space-y-1 pb-4">
                    <p className="font-semibold text-slate-400 mb-1.5 uppercase tracking-widest text-[9px]">3D Asset Credits & Attributes</p>
                    <p>"SkyBox In The Cloud" by <a href="https://skfb.ly/oIINq" target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary transition-colors underline decoration-primary/30 underline-offset-2">Paul</a></p>
                    <p>Purple Sky Space by <a href="https://sketchfab.com/alexandr.melas" target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary transition-colors underline decoration-primary/30 underline-offset-2">Aliaksandr.melas</a></p>
                    <p>Other Space Skyboxes by <a href="https://sketchfab.com/jungle_jim" target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary transition-colors underline decoration-primary/30 underline-offset-2">Jungle Jim</a></p>
                    <p>Moon by Unknown <i className="opacity-70">(Downloaded from a mysterious Russian site)</i></p>
                    <p>Asteroids by <a href="https://sketchfab.com/gryaznov" target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary transition-colors underline decoration-primary/30 underline-offset-2">gryaznov</a></p>
                    <p>"Earth" (<a href="https://skfb.ly/6TwGG" target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary transition-colors underline decoration-primary/30 underline-offset-2">https://skfb.ly/6TwGG</a>) by Akshat is licensed under <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary transition-colors underline decoration-primary/30 underline-offset-2">Creative Commons Attribution (CC BY 4.0)</a>.</p>
                    <p>"Mars" (<a href="https://skfb.ly/6TwHo" target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary transition-colors underline decoration-primary/30 underline-offset-2">https://skfb.ly/6TwHo</a>) by Akshat is licensed under <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary transition-colors underline decoration-primary/30 underline-offset-2">Creative Commons Attribution (CC BY 4.0)</a>.</p>
                    <p>Doom Slayer 3D model by Eduardo Gelain <i className="opacity-70">(DOOM &amp; Doom Slayer character © id Software)</i></p>
                </div>
            </div>
        
                    <div className="mt-4 text-center">
                        <p className="text-[10px] text-slate-500">
                            {lang === 'pt' ? 'Ao navegar neste site, você concorda com a nossa ' : 'By browsing this site, you accept our '}
                            <a
                                href="/privacy.html"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (onNavigatePrivacy) onNavigatePrivacy();
                                }}
                                className="text-primary hover:underline cursor-pointer"
                            >
                                {lang === 'pt' ? 'Política de Privacidade' : 'Privacy Statement'}
                            </a>.
                        </p>
                    </div>

        </footer>
    );
};

// --- RESUME (CV) VIEWER MODAL (NO LOCATION) ---
const ResumeModal = ({ isOpen, onClose }) => {
    const { t, lang } = useContext(LanguageContext);
    const [copiedATS, setCopiedATS] = useState(false);
    if (!isOpen) return null;

    const downloadFile = (content, fileName, mimeType) => {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const getAtsPlainText = () => {
        return lang === 'pt' ? `EDUARDO GELAIN
Engenheiro de Software & Jogos · Sistemas & Segurança
E-mail: gelain15mj@gmail.com
GitHub: https://github.com/Spet001
GitLab: https://gitlab.com/Spet001
Portfólio: https://spet01.dev/

============================================================
RESUMO PROFISSIONAL
============================================================
Engenheiro de software e jogos focado em C/C++, C#, Python e TypeScript com especialização em arquitetura de motores (Unity e Unreal Engine 5), sistemas de baixo nível, arquitetura de sistemas operacionais (Win32, UWP/GDK), análise e instrumentação de binários, automação de infraestrutura e garantia de qualidade de software (QA). Experiência comprovada em lançamentos comerciais na Steam e ferramentas de pesquisa e preservação digital para a comunidade técnica.

============================================================
FORMAÇÃO ACADÊMICA
============================================================
Bacharelado em Ciência da Computação (Ensino Superior)
- Ênfase em Arquitetura de Software, Algoritmos e Estruturas de Dados, Sistemas Operacionais, Compiladores e Segurança da Informação.

============================================================
EXPERIÊNCIA PROFISSIONAL
============================================================
1. Analista de Testes Manuais QA | Converting Minds (Sparky Rush: Purrils in Pawsville - Steam)
Período: 2025 - Presente
- Atuação técnica no ciclo de QA do jogo comercial 3D 'Sparky Rush', publicado na Steam pela Converting Minds.
- Identificação, reprodução rigorosa e documentação detalhada de mais de 50 bugs críticos de física, renderização e lógica de gameplay.
- Análise dedutiva de código em Unity (C#) auxiliando a equipe central de desenvolvimento a diagnosticar causas-raiz e mitigar regressões.
- Homologação de builds e testes contínuos de estabilidade pré-lançamento.

2. Programador de Jogos & Sistemas | Projetos Comerciais & Independent R&D
Período: 2025 - Presente
- Desenvolvimento de mecânicas de gameplay, física e sistemas interativos utilizando Unity (C#) e Unreal Engine (C++).
- Programação de máquinas de estado para IA de inimigos, locomoção fluida de personagens (FSM) e sistemas dinâmicos de armas.
- Otimização de pipelines de renderização e profiling de performance para garantia de taxas de quadros acima de 144 FPS.
- Criação e manutenção de templates modulares reutilizáveis para a comunidade de desenvolvedores independentes.

3. Engenheiro de Sistemas & Pesquisa de Segurança | Independent R&D / Open Source Security Research
Período: 2024 - Presente
- Pesquisa avançada em segurança de runtimes, arquitetura de entitlements e isolamento de processos no ecossistema UWP/GDK.
- Criação de ferramentas em C/C++ para instrumentação de bytecode e preservação de compatibilidade de assets legados.
- Desenvolvimento de rotinas de injeção de DLLs nativas, pattern scanning em memória dinâmica e hookings de dispatchers de VM.
- Desenvolvimento de launchers em Electron e utilitários multiplataforma focados em integridade de execução.

4. Especialista em Suporte de TI & Automação | Public Sector IT Infrastructure
Período: 2026 - Presente
- Apoio técnico operacional de infraestrutura de TI no setor público, gerenciamento de redes locais e estações de trabalho.
- Desenvolvimento de scripts de automação em Python e PowerShell (.ps1) para manutenção preventiva e resolução ágil de incidentes.
- Diagnóstico de hardware/software, implantação de sistemas operacionais e suporte direto a usuários finais.

============================================================
PRINCIPAIS PROJETOS
============================================================
- Outcaster - Retro FPS Templates (Unity 6 / C#): Framework completo de FPS retrô com live 3D HUD preview no Inspector, mecânicas de armas modulares e profiling de alta taxa de quadros.
- UWP/GDK Sandbox & Entitlement Architecture Analysis (C++ / Win32): Pesquisa de segurança e instrumentação de runtime contornando sandboxes UWP/GDK, com hooks de VM e compatibilidade de assets legados.
- Descompilação Binária & Preservação de Scripts GSC (C# / C++): Análise estática, descompilação de assemblies e extração de scripts em bytecode para preservação técnica e pesquisa da comunidade.
- Cross-Platform P2P Network Relay Engine (C++ / Npcap / Python): Relay assíncrono UDP de baixa latência (<4ms) com tradução de pacotes binários, recálculo de somas de verificação e bridge crossplay.
- Spet's Quick 3D Studio (Three.js / WebGL / TypeScript): Engine procedural 2D para 3D sem IA, com extração de contornos vetoriais e exportação direta para .GLB/.GLTF binário.
- Sparky Rush Commercial QA: Auditoria técnica e testes de regressão para publicação comercial na Steam.

============================================================
COMPETÊNCIAS TÉCNICAS (TECH STACK)
============================================================
- Linguagens: C, C++, C#, Python, TypeScript, JavaScript, PowerShell, GLSL, x86/x64 Assembly.
- Engines & Frameworks: Unity, Unreal Engine 5, Three.js, React, Electron, Node.js, Cloudflare Workers.
- Ferramentas & Ambientes: Visual Studio, Git, IDA Pro, x64dbg, Npcap/Wireshark, Docker, Linux, Windows GDK/UWP.
- Metodologias & Especialidades: Sistemas de Baixo Nível, Netcode UDP P2P, QA & Testes de Regressão, Profiling de Memória, Engenharia Reversa, Automação.`
        : `EDUARDO GELAIN
Software & Game Engineer · Systems & Security
Email: gelain15mj@gmail.com
GitHub: https://github.com/Spet001
GitLab: https://gitlab.com/Spet001
Portfolio: https://spet01.dev/

============================================================
EXECUTIVE SUMMARY
============================================================
Software and game engineer specializing in C/C++, C#, Python, and TypeScript with focused expertise in game engine architecture (Unity and Unreal Engine 5), low-level systems, operating systems architecture (Win32, UWP/GDK), binary analysis and runtime instrumentation, infrastructure automation, and software quality assurance (QA). Proven track record on commercial Steam launches and open-source tooling for technical communities.

============================================================
EDUCATION
============================================================
Bachelor's Degree in Computer Science (Higher Education)
- Emphasis on Software Architecture, Algorithms & Data Structures, Operating Systems, Compilers, and Information Security.

============================================================
PROFESSIONAL EXPERIENCE
============================================================
1. Manual QA Analyst & Tester | Converting Minds (Sparky Rush: Purrils in Pawsville - Steam)
Period: 2025 - Present
- Technical QA Analyst for the 3D platformer 'Sparky Rush', published commercially on Steam by Converting Minds.
- Systematically discovered, isolated, reliably reproduced, and documented 50+ critical bugs across physics, graphics, and gameplay logic.
- Conducted deductive code analysis in Unity (C#) assisting the core development team in diagnosing root causes and preventing regressions.
- Performed regression testing and build certification cycles ensuring launch stability.

2. Gameplay & Systems Programmer | Commercial Game Projects & Independent R&D
Period: 2025 - Present
- Engineered core gameplay mechanics, physics, and interactive systems using Unity (C#) and Unreal Engine (C++).
- Programmed state machines for enemy AI, fluid character locomotion (FSM), and dynamic weapon management systems.
- Profiled and optimized rendering pipelines to sustain high framerates (144+ FPS).
- Authored and maintained modular game templates for the independent game development community.

3. Systems & Security Research Engineer | Independent R&D / Open Source Security Research
Period: 2024 - Present
- Conducted advanced runtime security research, entitlement architecture analysis, and process sandboxing in UWP and Microsoft GDK.
- Engineered C/C++ custom runtimes and bytecode injectors enabling dynamic instrumentation and legacy asset preservation.
- Developed native DLL injection routines, dynamic memory signature pattern scanners, and VM bytecode hooks.
- Engineered Electron launchers and cross-platform modding toolkits delivering stable and crash-free execution.

4. IT Support & Automation Specialist | Public Sector IT Infrastructure
Period: 2026 - Present
- Delivered operational IT infrastructure technical support in the public sector, managing local network topologies and workstations.
- Developed automation scripts in Python and PowerShell (.ps1) for preventative maintenance and rapid incident resolution.
- Executed hardware/software diagnostics, OS deployments, and direct end-user technical support.

============================================================
FEATURED PROJECTS
============================================================
- Outcaster - Retro FPS Templates (Unity 6 / C#): Complete retro FPS framework with live 3D HUD inspector preview, modular weapon mechanics, and high-framerate profiling.
- UWP/GDK Sandbox & Entitlement Architecture Analysis (C++ / Win32): Security research suite analyzing UWP/GDK process restrictions, featuring VM bytecode hooking and legacy asset preservation.
- Proprietary Script Manager Decompilation & Bytecode Extraction (C# / C++): Static analysis, assembly decompilation, and GSC script extraction for digital preservation and community research.
- Cross-Platform P2P Network Relay Engine (C++ / Npcap / Python): Asynchronous low-latency UDP relay (<4ms) performing on-the-fly binary packet translation, checksum recalculation, and crossplay bridging.
- Spet's Quick 3D Studio (Three.js / WebGL / TypeScript): Deterministic 2D-to-3D procedural mesh generator without AI, featuring contour vector extraction and binary .GLB/.GLTF export.
- Sparky Rush Commercial QA: Technical auditing and regression testing for commercial release on Steam.

============================================================
TECHNICAL SKILLS & COMPETENCIES
============================================================
- Languages: C, C++, C#, Python, TypeScript, JavaScript, PowerShell, GLSL, x86/x64 Assembly.
- Engines & Frameworks: Unity, Unreal Engine 5, Three.js, React, Electron, Node.js, Cloudflare Workers.
- Systems & Tools: Visual Studio, Git, IDA Pro, x64dbg, Npcap/Wireshark, Docker, Linux, Windows GDK/UWP.
- Core Specialties: Low-Level Systems, P2P UDP Netcode, QA & Regression Testing, Memory Profiling, Reverse Engineering, Automation.`;
    };

    const getAtsMarkdown = () => {
        if (lang === 'pt') {
            return `# EDUARDO GELAIN
**Engenheiro de Software & Jogos · Sistemas & Segurança**
- **Email:** gelain15mj@gmail.com
- **GitHub:** https://github.com/Spet001
- **GitLab:** https://gitlab.com/Spet001
- **Portfólio:** https://spet01.dev/

---

## RESUMO PROFISSIONAL
Engenheiro de software e jogos focado em C/C++, C#, Python e TypeScript com especialização em arquitetura de motores (Unity e Unreal Engine 5), sistemas de baixo nível, arquitetura de sistemas operacionais (Win32, UWP/GDK), análise e instrumentação de binários, automação de infraestrutura e garantia de qualidade de software (QA). Experiência comprovada em lançamentos comerciais na Steam e ferramentas abertas para a comunidade técnica.

---

## FORMAÇÃO ACADÊMICA
**Bacharelado em Ciência da Computação** (Ensino Superior)
- Ênfase em Arquitetura de Software, Algoritmos e Estruturas de Dados, Sistemas Operacionais, Compiladores e Segurança da Informação.

---

## EXPERIÊNCIA PROFISSIONAL

### 1. Analista de Testes Manuais QA | Converting Minds (Sparky Rush: Purrils in Pawsville - Steam)
*Período: 2025 - Presente*
- Atuação técnica no ciclo de QA do jogo comercial 3D 'Sparky Rush', publicado na Steam pela Converting Minds.
- Identificação, reprodução rigorosa e documentação detalhada de mais de 50 bugs críticos de física, renderização e lógica de gameplay.
- Análise dedutiva de código em Unity (C#) auxiliando a equipe central de desenvolvimento a diagnosticar causas-raiz e mitigar regressões.
- Homologação de builds e testes contínuos de estabilidade pré-lançamento.

### 2. Programador de Jogos & Sistemas | Projetos Comerciais & Independent R&D
*Período: 2025 - Presente*
- Desenvolvimento de mecânicas de gameplay, física e sistemas interativos utilizando Unity (C#) e Unreal Engine (C++).
- Programação de máquinas de estado para IA de inimigos, locomoção fluida de personagens (FSM) e sistemas dinâmicos de armas.
- Otimização de pipelines de renderização e profiling de performance para garantia de taxas de quadros acima de 144 FPS.
- Criação e manutenção de templates modulares reutilizáveis para a comunidade de desenvolvedores independentes.

### 3. Engenheiro de Sistemas & Pesquisa de Segurança | Independent R&D / Open Source Security Research
*Período: 2024 - Presente*
- Pesquisa avançada em segurança de runtimes, arquitetura de entitlements e isolamento de processos no ecossistema UWP/GDK.
- Criação de ferramentas e clientes customizados em C/C++ para instrumentação de bytecode e preservação de compatibilidade de assets legados.
- Desenvolvimento de rotinas de injeção de DLLs nativas, pattern scanning em memória dinâmica e hookings de dispatchers de VM.
- Desenvolvimento de launchers em Electron e utilitários multiplataforma focados em estabilidade e integridade de execução.

### 4. Especialista em Suporte de TI & Automação | Public Sector IT Infrastructure
*Período: 2026 - Presente*
- Apoio técnico operacional de infraestrutura de TI no setor público, gerenciamento de redes locais e estações de trabalho.
- Desenvolvimento de scripts de automação em Python e PowerShell (.ps1) para manutenção preventiva e resolução ágil de incidentes.
- Diagnóstico de hardware/software, implantação de sistemas operacionais e suporte direto a usuários finais.

---

## PRINCIPAIS PROJETOS
- **Outcaster - Retro FPS Templates (Unity 6 / C#):** Framework completo de FPS retrô com live 3D HUD preview no Inspector, mecânicas de armas modulares e profiling de alta taxa de quadros.
- **UWP/GDK Sandbox & Entitlement Architecture Analysis (C++ / Win32):** Pesquisa de segurança e instrumentação de runtime contornando restrições de processos UWP/GDK, com hooks de VM e compatibilidade de assets legados.
- **Descompilação Binária & Preservação de Scripts GSC (C# / C++):** Análise estática, descompilação de assemblies e extração de scripts em bytecode para preservação técnica.
- **Cross-Platform P2P Network Relay Engine (C++ / Npcap / Python):** Relay assíncrono UDP de baixa latência (<4ms) com tradução de pacotes binários, recálculo de somas de verificação e bridge crossplay.
- **Spet's Quick 3D Studio (Three.js / WebGL / TypeScript):** Engine procedural 2D para 3D sem IA, com extração de contornos vetoriais e exportação direta para .GLB/.GLTF binário.
- **Sparky Rush Commercial QA:** Auditoria técnica e testes de regressão para publicação comercial na Steam.

---

## COMPETÊNCIAS TÉCNICAS (TECH STACK)
- **Linguagens:** C, C++, C#, Python, TypeScript, JavaScript, PowerShell, GLSL, x86/x64 Assembly.
- **Engines & Frameworks:** Unity, Unreal Engine 5, Three.js, React, Electron, Node.js, Cloudflare Workers.
- **Ferramentas & Ambientes:** Visual Studio, Git, IDA Pro, x64dbg, Npcap/Wireshark, Docker, Linux, Windows GDK/UWP.
- **Especialidades:** Sistemas de Baixo Nível, Netcode UDP P2P, QA & Testes de Regressão, Profiling de Memória, Engenharia Reversa, Automação.`;
        }

        return `# EDUARDO GELAIN
**Software & Game Engineer · Systems & Security**
- **Email:** gelain15mj@gmail.com
- **GitHub:** https://github.com/Spet001
- **GitLab:** https://gitlab.com/Spet001
- **Portfolio:** https://spet01.dev/

---

## EXECUTIVE SUMMARY
Software and game engineer specializing in C/C++, C#, Python, and TypeScript with focused expertise in game engine architecture (Unity and Unreal Engine 5), low-level systems, operating systems architecture (Win32, UWP/GDK), binary analysis and runtime instrumentation, infrastructure automation, and software quality assurance (QA). Proven track record on commercial Steam launches and open-source tooling.

---

## EDUCATION
**Bachelor's Degree in Computer Science** (Higher Education)
- Emphasis on Software Architecture, Algorithms & Data Structures, Operating Systems, Compilers, and Information Security.

---

## PROFESSIONAL EXPERIENCE

### 1. Manual QA Analyst & Tester | Converting Minds (Sparky Rush: Purrils in Pawsville - Steam)
*Period: 2025 - Present*
- Technical QA Analyst for the 3D platformer 'Sparky Rush', published commercially on Steam by Converting Minds.
- Systematically discovered, isolated, reliably reproduced, and documented 50+ critical bugs across physics, graphics, and gameplay logic.
- Conducted deductive code analysis in Unity (C#) assisting the core development team in diagnosing root causes and preventing regressions.
- Performed regression testing and build certification cycles ensuring launch stability.

### 2. Gameplay & Systems Programmer | Commercial Game Projects & Independent R&D
*Period: 2025 - Present*
- Engineered core gameplay mechanics, physics, and interactive systems using Unity (C#) and Unreal Engine (C++).
- Programmed state machines for enemy AI, fluid character locomotion (FSM), and dynamic weapon management systems.
- Profiled and optimized rendering pipelines to sustain high framerates (144+ FPS).
- Authored and maintained modular game templates for the independent game development community.

### 3. Systems & Security Research Engineer | Independent R&D / Open Source Security Research
*Period: 2024 - Present*
- Conducted advanced runtime security research, entitlement architecture analysis, and process sandboxing in UWP and Microsoft GDK.
- Engineered C/C++ custom runtimes and bytecode injectors enabling dynamic instrumentation and legacy asset preservation.
- Developed native DLL injection routines, dynamic memory signature pattern scanners, and VM bytecode hooks.
- Engineered Electron launchers and cross-platform modding toolkits delivering stable and crash-free execution.

### 4. IT Support & Automation Specialist | Public Sector IT Infrastructure
*Period: 2026 - Present*
- Delivered operational IT infrastructure technical support in the public sector, managing local network topologies and workstations.
- Developed automation scripts in Python and PowerShell (.ps1) for preventative maintenance and rapid incident resolution.
- Executed hardware/software diagnostics, OS deployments, and direct end-user technical support.

---

## FEATURED PROJECTS
- **Outcaster - Retro FPS Templates (Unity 6 / C#):** Complete retro FPS framework with live 3D HUD inspector preview, modular weapon mechanics, and high-framerate profiling.
- **UWP/GDK Sandbox & Entitlement Architecture Analysis (C++ / Win32):** Security research suite analyzing UWP/GDK process restrictions, featuring VM bytecode hooking and legacy asset preservation.
- **Proprietary Script Manager Decompilation & Bytecode Extraction (C# / C++):** Static analysis, assembly decompilation, and script bytecode extraction for digital preservation.
- **Cross-Platform P2P Network Relay Engine (C++ / Npcap / Python):** Asynchronous low-latency UDP relay (<4ms) performing on-the-fly binary packet translation, checksum recalculation, and crossplay bridging.
- **Spet's Quick 3D Studio (Three.js / WebGL / TypeScript):** Deterministic 2D-to-3D procedural mesh generator without AI, featuring contour vector extraction and binary .GLB/.GLTF export.
- **Sparky Rush Commercial QA:** Technical auditing and regression testing for commercial release on Steam.

---

## TECHNICAL SKILLS & COMPETENCIES
- **Languages:** C, C++, C#, Python, TypeScript, JavaScript, PowerShell, GLSL, x86/x64 Assembly.
- **Engines & Frameworks:** Unity, Unreal Engine 5, Three.js, React, Electron, Node.js, Cloudflare Workers.
- **Systems & Tools:** Visual Studio, Git, IDA Pro, x64dbg, Npcap/Wireshark, Docker, Linux, Windows GDK/UWP.
- **Core Specialties:** Low-Level Systems, P2P UDP Netcode, QA & Regression Testing, Memory Profiling, Reverse Engineering, Automation.`;
    };

    const getAtsDocxHtml = () => {
        if (lang === 'pt') {
            return '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<title>Curriculo - Eduardo Gelain</title>\n' +
                '<style>\nbody { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.35; color: #111; margin: 20mm; }\n' +
                'h1 { font-size: 20pt; margin: 0 0 4pt 0; text-transform: uppercase; color: #000; letter-spacing: 0.5pt; }\n' +
                '.subhead { font-size: 11pt; font-weight: bold; color: #222; margin-bottom: 4pt; }\n' +
                '.contact { font-size: 9.5pt; color: #444; margin-bottom: 14pt; }\n' +
                'h2 { font-size: 12pt; text-transform: uppercase; border-bottom: 1.5pt solid #222; padding-bottom: 2pt; margin: 12pt 0 6pt 0; color: #111; }\n' +
                '.exp-item { margin-bottom: 8pt; }\n' +
                '.exp-header { font-weight: bold; font-size: 10.5pt; color: #000; }\n' +
                '.exp-date { float: right; font-weight: bold; color: #333; }\n' +
                '.clear { clear: both; }\n' +
                'p { margin: 2pt 0 4pt 0; }\n' +
                'ul { margin: 2pt 0 6pt 18pt; padding: 0; }\n' +
                'li { margin-bottom: 2pt; font-size: 10pt; line-height: 1.35; }\n' +
                '</style>\n</head>\n<body>\n' +
                '<h1>Eduardo Gelain</h1>\n' +
                '<div class="subhead">Engenheiro de Software & Jogos · Sistemas & Segurança</div>\n' +
                '<div class="contact">Email: gelain15mj@gmail.com | GitHub: github.com/Spet001 | GitLab: gitlab.com/Spet001 | Portfolio: spet01.dev</div>\n' +
                '<h2>Resumo Profissional</h2>\n' +
                '<p>Engenheiro de software e jogos focado em C/C++, C#, Python e TypeScript com especialização em arquitetura de motores (Unity e Unreal Engine 5), sistemas de baixo nível, arquitetura de sistemas operacionais (Win32, UWP/GDK), análise e instrumentação de binários, automação de infraestrutura e garantia de qualidade de software (QA). Experiência comprovada em lançamentos comerciais na Steam e ferramentas abertas para a comunidade técnica.</p>\n' +
                '<h2>Formação Acadêmica</h2>\n' +
                '<div class="exp-header">Bacharelado em Ciência da Computação<span class="exp-date">Ensino Superior</span></div>\n<div class="clear"></div>\n' +
                '<p>Ênfase em Arquitetura de Software, Algoritmos e Estruturas de Dados, Sistemas Operacionais, Compiladores e Segurança da Informação.</p>\n' +
                '<h2>Experiência Profissional</h2>\n' +
                '<div class="exp-item">\n<div class="exp-header">Analista de Testes Manuais QA · Converting Minds (Sparky Rush: Purrils in Pawsville - Steam)<span class="exp-date">2025 - Presente</span></div>\n<div class="clear"></div>\n' +
                '<ul>\n<li>Atuação técnica no ciclo de QA do jogo comercial 3D Sparky Rush, publicado na Steam pela Converting Minds.</li>\n' +
                '<li>Identificação, reprodução rigorosa e documentação de mais de 50 bugs críticos de física, renderização e lógica de gameplay.</li>\n' +
                '<li>Análise dedutiva de código em Unity (C#) auxiliando a equipe central a diagnosticar causas-raiz e mitigar regressões.</li>\n' +
                '<li>Homologação de builds e testes contínuos de estabilidade pré-lançamento.</li>\n</ul>\n</div>\n' +
                '<div class="exp-item">\n<div class="exp-header">Programador de Jogos & Sistemas · Projetos Comerciais & Independent R&D<span class="exp-date">2025 - Presente</span></div>\n<div class="clear"></div>\n' +
                '<ul>\n<li>Desenvolvimento de mecânicas de gameplay, física e sistemas interativos utilizando Unity (C#) e Unreal Engine (C++).</li>\n' +
                '<li>Programação de máquinas de estado para IA de inimigos, locomoção fluida de personagens (FSM) e sistemas dinâmicos de armas.</li>\n' +
                '<li>Otimização de pipelines de renderização e profiling de performance para garantia de taxas de quadros acima de 144 FPS.</li>\n' +
                '<li>Criação e manutenção de templates modulares reutilizáveis para a comunidade de desenvolvedores independentes.</li>\n</ul>\n</div>\n' +
                '<div class="exp-item">\n<div class="exp-header">Engenheiro de Sistemas & Pesquisa de Segurança · Independent R&D / Open Source Security Research<span class="exp-date">2024 - Presente</span></div>\n<div class="clear"></div>\n' +
                '<ul>\n<li>Pesquisa avançada em segurança de runtimes, arquitetura de entitlements e isolamento de processos no ecossistema UWP/GDK.</li>\n' +
                '<li>Criação de ferramentas em C/C++ para instrumentação de bytecode e preservação de compatibilidade de assets legados.</li>\n' +
                '<li>Desenvolvimento de rotinas de injeção de DLLs nativas, pattern scanning em memória dinâmica e hookings de dispatchers de VM.</li>\n' +
                '<li>Desenvolvimento de launchers em Electron e utilitários multiplataforma focados em estabilidade e integridade de execução.</li>\n</ul>\n</div>\n' +
                '<div class="exp-item">\n<div class="exp-header">Especialista em Suporte de TI & Automação · Public Sector IT Infrastructure<span class="exp-date">2026 - Presente</span></div>\n<div class="clear"></div>\n' +
                '<ul>\n<li>Apoio técnico operacional de infraestrutura de TI no setor público, gerenciamento de redes locais e estações de trabalho.</li>\n' +
                '<li>Desenvolvimento de scripts de automação em Python e PowerShell (.ps1) para manutenção preventiva e resolução ágil de incidentes.</li>\n' +
                '<li>Diagnóstico de hardware/software, implantação de sistemas operacionais e suporte direto a usuários finais.</li>\n</ul>\n</div>\n' +
                '<h2>Principais Projetos</h2>\n' +
                '<ul>\n<li><strong>Outcaster - Retro FPS Templates (Unity 6 / C#):</strong> Framework completo de FPS retrô com live 3D HUD preview no Inspector, mecânicas modulares e profiling de alta taxa de quadros.</li>\n' +
                '<li><strong>UWP/GDK Sandbox & Entitlement Architecture Analysis (C++ / Win32):</strong> Pesquisa de segurança de runtimes UWP/GDK, com hooks de VM e compatibilidade de assets legados.</li>\n' +
                '<li><strong>Descompilação Binária & Preservação de Scripts GSC (C# / C++):</strong> Análise estática, descompilação de assemblies e extração de scripts em bytecode para preservação técnica.</li>\n' +
                '<li><strong>Cross-Platform P2P Network Relay Engine (C++ / Npcap / Python):</strong> Relay assíncrono UDP de baixa latência (&lt;4ms) com tradução de pacotes binários, recálculo de somas de verificação e bridge crossplay.</li>\n' +
                '<li><strong>Spet\'s Quick 3D Studio (Three.js / WebGL / TypeScript):</strong> Engine procedural 2D para 3D determinística sem IA, com extração de contornos vetoriais e exportação direta para .GLB/.GLTF binário.</li>\n' +
                '<li><strong>Sparky Rush Commercial QA:</strong> Auditoria técnica e testes de regressão para publicação comercial na Steam.</li>\n</ul>\n' +
                '<h2>Competências Técnicas</h2>\n' +
                '<p><strong>Linguagens:</strong> C, C++, C#, Python, TypeScript, JavaScript, PowerShell, GLSL, x86/x64 Assembly.<br>\n' +
                '<strong>Engines & Frameworks:</strong> Unity, Unreal Engine 5, Three.js, React, Electron, Node.js, Cloudflare Workers.<br>\n' +
                '<strong>Ferramentas & Ambientes:</strong> Visual Studio, Git, IDA Pro, x64dbg, Npcap/Wireshark, Docker, Linux, Windows GDK/UWP.<br>\n' +
                '<strong>Especialidades:</strong> Sistemas de Baixo Nível, Netcode UDP P2P, QA & Testes de Regressão, Profiling de Memória, Engenharia Reversa, Automação.</p>\n' +
                '</body>\n</html>';
        }

        return '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<title>Resume - Eduardo Gelain</title>\n' +
            '<style>\nbody { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.35; color: #111; margin: 20mm; }\n' +
            'h1 { font-size: 20pt; margin: 0 0 4pt 0; text-transform: uppercase; color: #000; letter-spacing: 0.5pt; }\n' +
            '.subhead { font-size: 11pt; font-weight: bold; color: #222; margin-bottom: 4pt; }\n' +
            '.contact { font-size: 9.5pt; color: #444; margin-bottom: 14pt; }\n' +
            'h2 { font-size: 12pt; text-transform: uppercase; border-bottom: 1.5pt solid #222; padding-bottom: 2pt; margin: 12pt 0 6pt 0; color: #111; }\n' +
            '.exp-item { margin-bottom: 8pt; }\n' +
            '.exp-header { font-weight: bold; font-size: 10.5pt; color: #000; }\n' +
            '.exp-date { float: right; font-weight: bold; color: #333; }\n' +
            '.clear { clear: both; }\n' +
            'p { margin: 2pt 0 4pt 0; }\n' +
            'ul { margin: 2pt 0 6pt 18pt; padding: 0; }\n' +
            'li { margin-bottom: 2pt; font-size: 10pt; line-height: 1.35; }\n' +
            '</style>\n</head>\n<body>\n' +
            '<h1>Eduardo Gelain</h1>\n' +
            '<div class="subhead">Software & Game Engineer · Systems & Security</div>\n' +
            '<div class="contact">Email: gelain15mj@gmail.com | GitHub: github.com/Spet001 | GitLab: gitlab.com/Spet001 | Portfolio: spet01.dev</div>\n' +
            '<h2>Executive Summary</h2>\n' +
            '<p>Software and game engineer specializing in C/C++, C#, Python, and TypeScript with focused expertise in game engine architecture (Unity and Unreal Engine 5), low-level systems, operating systems architecture (Win32, UWP/GDK), binary analysis and runtime instrumentation, infrastructure automation, and software quality assurance (QA). Proven track record on commercial Steam launches and open-source tooling.</p>\n' +
            '<h2>Education</h2>\n' +
            '<div class="exp-header">Bachelor\'s Degree in Computer Science<span class="exp-date">Higher Education</span></div>\n<div class="clear"></div>\n' +
            '<p>Emphasis on Software Architecture, Algorithms & Data Structures, Operating Systems, Compilers, and Information Security.</p>\n' +
            '<h2>Professional Experience</h2>\n' +
            '<div class="exp-item">\n<div class="exp-header">Manual QA Analyst & Tester · Converting Minds (Sparky Rush: Purrils in Pawsville - Steam)<span class="exp-date">2025 - Present</span></div>\n<div class="clear"></div>\n' +
            '<ul>\n<li>Technical QA Analyst for the 3D platformer Sparky Rush, published commercially on Steam by Converting Minds.</li>\n' +
            '<li>Systematically discovered, isolated, reliably reproduced, and documented 50+ critical bugs across physics, graphics, and gameplay logic.</li>\n' +
            '<li>Conducted deductive code analysis in Unity (C#) assisting the core development team in diagnosing root causes and preventing regressions.</li>\n' +
            '<li>Performed regression testing and build certification cycles ensuring launch stability.</li>\n</ul>\n</div>\n' +
            '<div class="exp-item">\n<div class="exp-header">Gameplay & Systems Programmer · Commercial Game Projects & Independent R&D<span class="exp-date">2025 - Present</span></div>\n<div class="clear"></div>\n' +
            '<ul>\n<li>Engineered core gameplay mechanics, physics, and interactive systems using Unity (C#) and Unreal Engine (C++).</li>\n' +
            '<li>Programmed state machines for enemy AI, fluid character locomotion (FSM), and dynamic weapon management systems.</li>\n' +
            '<li>Profiled and optimized rendering pipelines to sustain high framerates (144+ FPS).</li>\n' +
            '<li>Authored and maintained modular game templates for the independent game development community.</li>\n</ul>\n</div>\n' +
            '<div class="exp-item">\n<div class="exp-header">Systems & Security Research Engineer · Independent R&D / Open Source Security Research<span class="exp-date">2024 - Present</span></div>\n<div class="clear"></div>\n' +
            '<ul>\n<li>Conducted advanced runtime security research, entitlement architecture analysis, and process sandboxing in UWP and Microsoft GDK.</li>\n' +
            '<li>Engineered C/C++ custom runtimes and bytecode injectors enabling dynamic instrumentation and legacy asset preservation.</li>\n' +
            '<li>Developed native DLL injection routines, dynamic memory signature pattern scanners, and VM bytecode hooks.</li>\n' +
            '<li>Engineered Electron launchers and cross-platform modding toolkits delivering stable and crash-free execution.</li>\n</ul>\n</div>\n' +
            '<div class="exp-item">\n<div class="exp-header">IT Support & Automation Specialist · Public Sector IT Infrastructure<span class="exp-date">2026 - Present</span></div>\n<div class="clear"></div>\n' +
            '<ul>\n<li>Delivered operational IT infrastructure technical support in the public sector, managing local network topologies and workstations.</li>\n' +
            '<li>Developed automation scripts in Python and PowerShell (.ps1) for preventative maintenance and rapid incident resolution.</li>\n' +
            '<li>Executed hardware/software diagnostics, OS deployments, and direct end-user technical support.</li>\n</ul>\n</div>\n' +
            '<h2>Featured Projects</h2>\n' +
            '<ul>\n<li><strong>Outcaster - Retro FPS Templates (Unity 6 / C#):</strong> Complete retro FPS framework with live 3D HUD inspector preview, modular weapon mechanics, and high-framerate profiling.</li>\n' +
            '<li><strong>UWP/GDK Sandbox & Entitlement Architecture Analysis (C++ / Win32):</strong> Security research suite analyzing UWP/GDK process restrictions, featuring VM bytecode hooking and legacy asset preservation.</li>\n' +
            '<li><strong>Proprietary Script Manager Decompilation & Bytecode Extraction (C# / C++):</strong> Static analysis, assembly decompilation, and script bytecode extraction for digital preservation.</li>\n' +
            '<li><strong>Cross-Platform P2P Network Relay Engine (C++ / Npcap / Python):</strong> Asynchronous low-latency UDP relay (<4ms) performing on-the-fly binary packet translation, checksum recalculation, and crossplay bridging.</li>\n' +
            '<li><strong>Spet\'s Quick 3D Studio (Three.js / WebGL / TypeScript):</strong> Deterministic 2D-to-3D procedural mesh generator without AI, featuring contour vector extraction and binary .GLB/.GLTF export.</li>\n' +
            '<li><strong>Sparky Rush Commercial QA:</strong> Technical auditing and regression testing for commercial release on Steam.</li>\n</ul>\n' +
            '<h2>Technical Skills & Competencies</h2>\n' +
            '<p><strong>Languages:</strong> C, C++, C#, Python, TypeScript, JavaScript, PowerShell, GLSL, x86/x64 Assembly.<br>\n' +
            '<strong>Engines & Frameworks:</strong> Unity, Unreal Engine 5, Three.js, React, Electron, Node.js, Cloudflare Workers.<br>\n' +
            '<strong>Systems & Tools:</strong> Visual Studio, Git, IDA Pro, x64dbg, Npcap/Wireshark, Docker, Linux, Windows GDK/UWP.<br>\n' +
            '<strong>Core Specialties:</strong> Low-Level Systems, P2P UDP Netcode, QA & Regression Testing, Memory Profiling, Reverse Engineering, Automation.</p>\n' +
            '</body>\n</html>';
    };

    const getAtsPrintHtml = () => {
        if (lang === 'pt') {
            return '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<title>Curriculo - Eduardo Gelain</title>\n' +
                '<style>\n' +
                '@page { size: A4 portrait; margin: 12mm 15mm; }\n' +
                '* { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }\n' +
                'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; font-size: 9.5pt; line-height: 1.35; color: #111; background: #fff; margin: 0; padding: 0; }\n' +
                'h1 { font-size: 19pt; margin: 0 0 2pt 0; text-transform: uppercase; color: #000; letter-spacing: 0.5pt; font-weight: 700; }\n' +
                '.subhead { font-size: 10.5pt; font-weight: 600; color: #222; margin-bottom: 3pt; }\n' +
                '.contact { font-size: 8.5pt; color: #555; margin-bottom: 10pt; border-bottom: 1.5pt solid #222; padding-bottom: 4pt; }\n' +
                'h2 { font-size: 11pt; text-transform: uppercase; border-bottom: 1pt solid #444; padding-bottom: 2pt; margin: 10pt 0 4pt 0; color: #111; letter-spacing: 0.3pt; font-weight: 700; }\n' +
                '.exp-item { margin-bottom: 6pt; page-break-inside: avoid; }\n' +
                '.exp-header { font-weight: 700; font-size: 9.5pt; color: #000; }\n' +
                '.exp-date { float: right; font-weight: 600; color: #444; font-size: 9pt; }\n' +
                '.clear { clear: both; }\n' +
                'p { margin: 2pt 0 4pt 0; font-size: 9pt; color: #222; }\n' +
                'ul { margin: 2pt 0 4pt 14pt; padding: 0; }\n' +
                'li { margin-bottom: 2pt; font-size: 9pt; line-height: 1.35; color: #222; }\n' +
                '</style>\n</head>\n<body>\n' +
                '<h1>Eduardo Gelain</h1>\n' +
                '<div class="subhead">Engenheiro de Software & Jogos · Sistemas & Segurança</div>\n' +
                '<div class="contact">Email: gelain15mj@gmail.com | GitHub: github.com/Spet001 | GitLab: gitlab.com/Spet001 | Portfolio: spet01.dev</div>\n' +
                '<h2>Resumo Profissional</h2>\n' +
                '<p>Engenheiro de software e jogos com foco em C/C++, C#, Python e TypeScript. Especializado em arquitetura de motores (Unity e Unreal Engine 5), sistemas de baixo nível, arquitetura de sistemas operacionais (Win32, UWP/GDK), análise e instrumentação de binários, automação de infraestrutura e garantia de qualidade de software (QA). Experiência comprovada em lançamentos comerciais na Steam e desenvolvimento de ferramentas para a comunidade técnica.</p>\n' +
                '<h2>Formação Acadêmica</h2>\n' +
                '<div class="exp-header">Bacharelado em Ciência da Computação<span class="exp-date">Ensino Superior</span></div>\n<div class="clear"></div>\n' +
                '<p>Ênfase em Arquitetura de Software, Algoritmos e Estruturas de Dados, Sistemas Operacionais, Compiladores e Segurança da Informação.</p>\n' +
                '<h2>Experiência Profissional</h2>\n' +
                '<div class="exp-item">\n<div class="exp-header">Analista de Testes Manuais QA · Converting Minds (Sparky Rush: Purrils in Pawsville - Steam)<span class="exp-date">2025 - Presente</span></div>\n<div class="clear"></div>\n' +
                '<ul>\n<li>Atuação técnica no ciclo de QA do jogo comercial 3D Sparky Rush, publicado na Steam pela Converting Minds.</li>\n' +
                '<li>Identificação, reprodução rigorosa e documentação de mais de 50 bugs críticos de física, renderização e lógica de gameplay.</li>\n' +
                '<li>Análise dedutiva de código em Unity (C#) auxiliando a equipe central a diagnosticar causas-raiz e mitigar regressões.</li>\n' +
                '<li>Homologação de builds e testes contínuos de estabilidade pré-lançamento.</li>\n</ul>\n</div>\n' +
                '<div class="exp-item">\n<div class="exp-header">Programador de Jogos & Sistemas · Projetos Comerciais & Independent R&D<span class="exp-date">2025 - Presente</span></div>\n<div class="clear"></div>\n' +
                '<ul>\n<li>Desenvolvimento de mecânicas de gameplay, física e sistemas interativos utilizando Unity (C#) e Unreal Engine (C++).</li>\n' +
                '<li>Programação de máquinas de estado para IA de inimigos, locomoção fluida de personagens (FSM) e sistemas dinâmicos de armas.</li>\n' +
                '<li>Otimização de pipelines de renderização e profiling de performance para garantia de taxas de quadros acima de 144 FPS.</li>\n' +
                '<li>Criação e manutenção de templates modulares reutilizáveis para a comunidade de desenvolvedores independentes.</li>\n</ul>\n</div>\n' +
                '<div class="exp-item">\n<div class="exp-header">Engenheiro de Sistemas & Pesquisa de Segurança · Independent R&D / Open Source Security Research<span class="exp-date">2024 - Presente</span></div>\n<div class="clear"></div>\n' +
                '<ul>\n<li>Pesquisa avançada em segurança de runtimes, arquitetura de entitlements e isolamento de processos no ecossistema UWP/GDK.</li>\n' +
                '<li>Criação de ferramentas em C/C++ para instrumentação de bytecode e preservação de compatibilidade de assets legados.</li>\n' +
                '<li>Desenvolvimento de rotinas de injeção de DLLs nativas, pattern scanning em memória dinâmica e hookings de dispatchers de VM.</li>\n' +
                '<li>Desenvolvimento de launchers em Electron e utilitários multiplataforma focados em estabilidade e integridade de execução.</li>\n</ul>\n</div>\n' +
                '<div class="exp-item">\n<div class="exp-header">Especialista em Suporte de TI & Automação · Public Sector IT Infrastructure<span class="exp-date">2026 - Presente</span></div>\n<div class="clear"></div>\n' +
                '<ul>\n<li>Apoio técnico operacional de infraestrutura de TI no setor público, gerenciamento de redes locais e estações de trabalho.</li>\n' +
                '<li>Desenvolvimento de scripts de automação em Python e PowerShell (.ps1) para manutenção preventiva e resolução ágil de incidentes.</li>\n' +
                '<li>Diagnóstico de hardware/software, implantação de sistemas operacionais e suporte direto a usuários finais.</li>\n</ul>\n</div>\n' +
                '<h2>Principais Projetos</h2>\n' +
                '<ul>\n<li><strong>Outcaster - Retro FPS Templates (Unity 6 / C#):</strong> Framework completo de FPS retrô com live 3D HUD preview no Inspector, mecânicas modulares e profiling de alta taxa de quadros.</li>\n' +
                '<li><strong>UWP/GDK Sandbox & Entitlement Architecture Analysis (C++ / Win32):</strong> Pesquisa de segurança de runtimes UWP/GDK, com hooks de VM e compatibilidade de assets legados.</li>\n' +
                '<li><strong>Descompilação Binária & Preservação de Scripts GSC (C# / C++):</strong> Análise estática, descompilação de assemblies e extração de scripts em bytecode para preservação técnica.</li>\n' +
                '<li><strong>Cross-Platform P2P Network Relay Engine (C++ / Npcap / Python):</strong> Relay assíncrono UDP de baixa latência (&lt;4ms) com tradução de pacotes binários, recálculo de somas de verificação e bridge crossplay.</li>\n' +
                '<li><strong>Spet\'s Quick 3D Studio (Three.js / WebGL / TypeScript):</strong> Engine procedural 2D para 3D determinística sem IA, com extração de contornos vetoriais e exportação direta para .GLB/.GLTF binário.</li>\n' +
                '<li><strong>Sparky Rush Commercial QA:</strong> Auditoria técnica e testes de regressão para publicação comercial na Steam.</li>\n</ul>\n' +
                '<h2>Competências Técnicas</h2>\n' +
                '<p><strong>Linguagens:</strong> C, C++, C#, Python, TypeScript, JavaScript, PowerShell, GLSL, x86/x64 Assembly.<br>\n' +
                '<strong>Engines & Frameworks:</strong> Unity, Unreal Engine 5, Three.js, React, Electron, Node.js, Cloudflare Workers.<br>\n' +
                '<strong>Ferramentas & Ambientes:</strong> Visual Studio, Git, IDA Pro, x64dbg, Npcap/Wireshark, Docker, Linux, Windows GDK/UWP.<br>\n' +
                '<strong>Especialidades:</strong> Sistemas de Baixo Nível, Netcode UDP P2P, QA & Testes de Regressão, Profiling de Memória, Engenharia Reversa, Automação.</p>\n' +
                '</body>\n</html>';
        }

        return '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<title>Resume - Eduardo Gelain</title>\n' +
            '<style>\n' +
            '@page { size: A4 portrait; margin: 12mm 15mm; }\n' +
            '* { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }\n' +
            'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; font-size: 9.5pt; line-height: 1.35; color: #111; background: #fff; margin: 0; padding: 0; }\n' +
            'h1 { font-size: 19pt; margin: 0 0 2pt 0; text-transform: uppercase; color: #000; letter-spacing: 0.5pt; font-weight: 700; }\n' +
            '.subhead { font-size: 10.5pt; font-weight: 600; color: #222; margin-bottom: 3pt; }\n' +
            '.contact { font-size: 8.5pt; color: #555; margin-bottom: 10pt; border-bottom: 1.5pt solid #222; padding-bottom: 4pt; }\n' +
            'h2 { font-size: 11pt; text-transform: uppercase; border-bottom: 1pt solid #444; padding-bottom: 2pt; margin: 10pt 0 4pt 0; color: #111; letter-spacing: 0.3pt; font-weight: 700; }\n' +
            '.exp-item { margin-bottom: 6pt; page-break-inside: avoid; }\n' +
            '.exp-header { font-weight: 700; font-size: 9.5pt; color: #000; }\n' +
            '.exp-date { float: right; font-weight: 600; color: #444; font-size: 9pt; }\n' +
            '.clear { clear: both; }\n' +
            'p { margin: 2pt 0 4pt 0; font-size: 9pt; color: #222; }\n' +
            'ul { margin: 2pt 0 4pt 14pt; padding: 0; }\n' +
            'li { margin-bottom: 2pt; font-size: 9pt; line-height: 1.35; color: #222; }\n' +
            '</style>\n</head>\n<body>\n' +
            '<h1>Eduardo Gelain</h1>\n' +
            '<div class="subhead">Software & Game Engineer · Systems & Security</div>\n' +
            '<div class="contact">Email: gelain15mj@gmail.com | GitHub: github.com/Spet001 | GitLab: gitlab.com/Spet001 | Portfolio: spet01.dev</div>\n' +
            '<h2>Executive Summary</h2>\n' +
            '<p>Software and game engineer specializing in C/C++, C#, Python, and TypeScript with focused expertise in game engine architecture (Unity and Unreal Engine 5), low-level systems, operating systems architecture (Win32, UWP/GDK), binary analysis and runtime instrumentation, infrastructure automation, and software quality assurance (QA). Proven track record on commercial Steam launches and open-source tooling.</p>\n' +
            '<h2>Education</h2>\n' +
            '<div class="exp-header">Bachelor\'s Degree in Computer Science<span class="exp-date">Higher Education</span></div>\n<div class="clear"></div>\n' +
            '<p>Emphasis on Software Architecture, Algorithms & Data Structures, Operating Systems, Compilers, and Information Security.</p>\n' +
            '<h2>Professional Experience</h2>\n' +
            '<div class="exp-item">\n<div class="exp-header">Manual QA Analyst & Tester · Converting Minds (Sparky Rush: Purrils in Pawsville - Steam)<span class="exp-date">2025 - Present</span></div>\n<div class="clear"></div>\n' +
            '<ul>\n<li>Technical QA Analyst for the 3D platformer Sparky Rush, published commercially on Steam by Converting Minds.</li>\n' +
            '<li>Systematically discovered, isolated, reliably reproduced, and documented 50+ critical bugs across physics, graphics, and gameplay logic.</li>\n' +
            '<li>Conducted deductive code analysis in Unity (C#) assisting the core development team in diagnosing root causes and preventing regressions.</li>\n' +
            '<li>Performed regression testing and build certification cycles ensuring launch stability.</li>\n</ul>\n</div>\n' +
            '<div class="exp-item">\n<div class="exp-header">Gameplay & Systems Programmer · Commercial Game Projects & Independent R&D<span class="exp-date">2025 - Present</span></div>\n<div class="clear"></div>\n' +
            '<ul>\n<li>Engineered core gameplay mechanics, physics, and interactive systems using Unity (C#) and Unreal Engine (C++).</li>\n' +
            '<li>Programmed state machines for enemy AI, fluid character locomotion (FSM), and dynamic weapon management systems.</li>\n' +
            '<li>Profiled and optimized rendering pipelines to sustain high framerates (144+ FPS).</li>\n' +
            '<li>Authored and maintained modular game templates for the independent game development community.</li>\n</ul>\n</div>\n' +
            '<div class="exp-item">\n<div class="exp-header">Systems & Security Research Engineer · Independent R&D / Open Source Security Research<span class="exp-date">2024 - Present</span></div>\n<div class="clear"></div>\n' +
            '<ul>\n<li>Conducted advanced runtime security research, entitlement architecture analysis, and process sandboxing in UWP and Microsoft GDK.</li>\n' +
            '<li>Engineered C/C++ custom runtimes and bytecode injectors enabling dynamic instrumentation and legacy asset preservation.</li>\n' +
            '<li>Developed native DLL injection routines, dynamic memory signature pattern scanners, and VM bytecode hooks.</li>\n' +
            '<li>Engineered Electron launchers and cross-platform modding toolkits delivering stable and crash-free execution.</li>\n</ul>\n</div>\n' +
            '<div class="exp-item">\n<div class="exp-header">IT Support & Automation Specialist · Public Sector IT Infrastructure<span class="exp-date">2026 - Present</span></div>\n<div class="clear"></div>\n' +
            '<ul>\n<li>Delivered operational IT infrastructure technical support in the public sector, managing local network topologies and workstations.</li>\n' +
            '<li>Developed automation scripts in Python and PowerShell (.ps1) for preventative maintenance and rapid incident resolution.</li>\n' +
            '<li>Executed hardware/software diagnostics, OS deployments, and direct end-user technical support.</li>\n</ul>\n</div>\n' +
            '<h2>Featured Projects</h2>\n' +
            '<ul>\n<li><strong>Outcaster - Retro FPS Templates (Unity 6 / C#):</strong> Complete retro FPS framework with live 3D HUD inspector preview, modular weapon mechanics, and high-framerate profiling.</li>\n' +
            '<li><strong>UWP/GDK Sandbox & Entitlement Architecture Analysis (C++ / Win32):</strong> Security research suite analyzing UWP/GDK process restrictions, featuring VM bytecode hooking and legacy asset preservation.</li>\n' +
            '<li><strong>Proprietary Script Manager Decompilation & Bytecode Extraction (C# / C++):</strong> Static analysis, assembly decompilation, and script bytecode extraction for digital preservation.</li>\n' +
            '<li><strong>Cross-Platform P2P Network Relay Engine (C++ / Npcap / Python):</strong> Asynchronous low-latency UDP relay (<4ms) performing on-the-fly binary packet translation, checksum recalculation, and crossplay bridging.</li>\n' +
            '<li><strong>Spet\'s Quick 3D Studio (Three.js / WebGL / TypeScript):</strong> Deterministic 2D-to-3D procedural mesh generator without AI, featuring contour vector extraction and binary .GLB/.GLTF export.</li>\n' +
            '<li><strong>Sparky Rush Commercial QA:</strong> Technical auditing and regression testing for commercial release on Steam.</li>\n</ul>\n' +
            '<h2>Technical Skills & Competencies</h2>\n' +
            '<p><strong>Languages:</strong> C, C++, C#, Python, TypeScript, JavaScript, PowerShell, GLSL, x86/x64 Assembly.<br>\n' +
            '<strong>Engines & Frameworks:</strong> Unity, Unreal Engine 5, Three.js, React, Electron, Node.js, Cloudflare Workers.<br>\n' +
            '<strong>Systems & Tools:</strong> Visual Studio, Git, IDA Pro, x64dbg, Npcap/Wireshark, Docker, Linux, Windows GDK/UWP.<br>\n' +
            '<strong>Core Specialties:</strong> Low-Level Systems, P2P UDP Netcode, QA & Regression Testing, Memory Profiling, Reverse Engineering, Automation.</p>\n' +
            '</body>\n</html>';
    };

    const handlePrint = () => {
        playSoftClick();
        try {
            const printHtml = getAtsPrintHtml();
            const iframe = document.createElement('iframe');
            iframe.style.position = 'fixed';
            iframe.style.right = '0';
            iframe.style.bottom = '0';
            iframe.style.width = '0';
            iframe.style.height = '0';
            iframe.style.border = '0';
            iframe.style.visibility = 'hidden';
            document.body.appendChild(iframe);

            const doc = iframe.contentWindow.document;
            doc.open();
            doc.write(printHtml);
            doc.close();

            iframe.contentWindow.focus();
            setTimeout(() => {
                try {
                    iframe.contentWindow.print();
                } catch (e) {
                    console.error('Iframe print error:', e);
                    window.print();
                } finally {
                    setTimeout(() => {
                        if (iframe.parentNode) {
                            iframe.parentNode.removeChild(iframe);
                        }
                    }, 2000);
                }
            }, 250);
        } catch (err) {
            console.error('Print error:', err);
            window.print();
        }
    };

    const handleExportDocx = () => {
        playSoftClick();
        const content = getAtsDocxHtml();
        const fileName = lang === 'pt' ? 'Eduardo_Gelain_CV_ATS.doc' : 'Eduardo_Gelain_Resume_ATS.doc';
        downloadFile(content, fileName, 'application/msword;charset=utf-8');
    };

    const handleExportMarkdown = () => {
        playSoftClick();
        const content = getAtsMarkdown();
        const fileName = lang === 'pt' ? 'Eduardo_Gelain_CV_ATS.md' : 'Eduardo_Gelain_Resume_ATS.md';
        downloadFile(content, fileName, 'text/markdown;charset=utf-8');
    };

    const handleExportTxt = () => {
        playSoftClick();
        const content = getAtsPlainText();
        const fileName = lang === 'pt' ? 'Eduardo_Gelain_CV_ATS.txt' : 'Eduardo_Gelain_Resume_ATS.txt';
        downloadFile(content, fileName, 'text/plain;charset=utf-8');
    };

    const handleCopyATS = () => {
        playSoftClick();
        const atsText = getAtsPlainText();

        navigator.clipboard.writeText(atsText).then(() => {
            setCopiedATS(true);
            setTimeout(() => setCopiedATS(false), 2500);
        }).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = atsText;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            setCopiedATS(true);
            setTimeout(() => setCopiedATS(false), 2500);
        });
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div className="bg-[#050505]/95 backdrop-blur-xl border border-white/[0.12] rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-10 relative text-slate-200">
                
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] mb-6 gap-3">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="text-[11px] font-mono text-slate-400 font-semibold mr-1 flex items-center gap-1.5">
                            <i className="fas fa-file-export text-primary"></i>
                            <span>{lang === 'pt' ? 'Exportar ATS:' : 'ATS Export:'}</span>
                        </span>

                        <button
                            onClick={handlePrint}
                            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary hover:bg-primaryHover text-white shadow-sm shadow-primary/25 transition-all flex items-center gap-1.5 cursor-pointer"
                            title={lang === 'pt' ? 'Imprimir ou Salvar como PDF' : 'Print or Save as PDF'}
                        >
                            <i className="fas fa-file-pdf"></i>
                            <span>PDF</span>
                        </button>

                        <button
                            onClick={handleExportDocx}
                            className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] hover:border-white/[0.2] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                            title={lang === 'pt' ? 'Baixar documento Word (.doc) formatado para ATS' : 'Download Word (.doc) formatted for ATS'}
                        >
                            <i className="fas fa-file-word text-slate-400"></i>
                            <span>Word (.doc)</span>
                        </button>

                        <button
                            onClick={handleExportMarkdown}
                            className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] hover:border-white/[0.2] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                            title={lang === 'pt' ? 'Baixar currículo em formato Markdown (.md)' : 'Download resume in Markdown (.md)'}
                        >
                            <i className="fab fa-markdown text-slate-400"></i>
                            <span>Markdown</span>
                        </button>

                        <button
                            onClick={handleExportTxt}
                            className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] hover:border-white/[0.2] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                            title={lang === 'pt' ? 'Baixar em arquivo de Texto Limpo (.txt)' : 'Download as Plain Text (.txt)'}
                        >
                            <i className="fas fa-file-lines text-slate-400"></i>
                            <span>Texto (.txt)</span>
                        </button>

                        <button
                            onClick={handleCopyATS}
                            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                                copiedATS
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                    : 'bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] hover:border-white/[0.2]'
                            }`}
                            title={lang === 'pt' ? 'Copiar currículo formatado para a área de transferência' : 'Copy clean formatted resume to clipboard'}
                        >
                            <i className={copiedATS ? "fas fa-check text-emerald-400" : "fas fa-clipboard-list text-slate-400"}></i>
                            <span>{copiedATS ? (lang === 'pt' ? 'Copiado!' : 'Copied!') : (lang === 'pt' ? 'Copiar ATS' : 'Copy ATS')}</span>
                        </button>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.12] flex items-center justify-center transition-colors cursor-pointer shrink-0 self-end sm:self-auto"
                        aria-label="Close"
                    >
                        <i className="fas fa-times text-xs"></i>
                    </button>
                </div>

                {/* Printable CV Content (NO location) */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-3xl font-extrabold text-white tracking-tight">Eduardo Gelain</h2>
                        <div className="text-primary font-semibold text-base mt-1">
                            {lang === 'pt' ? 'Engenheiro de Software & Jogos · Sistemas & Segurança' : 'Software & Game Engineer · Systems & Security'}
                        </div>
                        <div className="text-xs text-slate-400 font-mono mt-1 flex flex-wrap gap-3">
                            <span>gelain15mj@gmail.com</span>
                            <span>github.com/Spet001</span>
                            <span>gitlab.com/Spet001</span>
                            <span>spet01.dev</span>
                        </div>
                    </div>

                    {/* Summary */}
                    <div>
                        <h3 className="text-xs font-mono uppercase tracking-wider text-primary font-bold border-b border-white/[0.08] pb-1 mb-2">
                            {lang === 'pt' ? 'Resumo Profissional' : 'Executive Summary'}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {lang === 'pt'
                                ? 'Engenheiro de software e jogos com sólida atuação em C/C++, C#, Python e TypeScript. Especializado em desenvolvimento de jogos (Unity e Unreal Engine 5), sistemas de baixo nível, arquitetura de sistemas operacionais (Win32, UWP/GDK), análise e instrumentação de binários, automação de infraestrutura e garantia de qualidade de software (QA). Experiência comprovada em lançamentos comerciais na Steam e ferramentas de pesquisa e preservação digital.'
                                : 'Software and game engineer specializing in C/C++, C#, Python, and TypeScript. Proven expertise in game engine architecture (Unity and Unreal Engine 5), low-level systems, operating system architecture (Win32, UWP/GDK), binary analysis and runtime instrumentation, infrastructure automation, and software quality assurance (QA). Demonstrated commercial release experience on Steam and open-source tooling.'}
                        </p>
                    </div>

                    {/* Education / Formação Acadêmica */}
                    <div>
                        <h3 className="text-xs font-mono uppercase tracking-wider text-primary font-bold border-b border-white/[0.08] pb-1 mb-2">
                            {lang === 'pt' ? 'Formação Acadêmica' : 'Education'}
                        </h3>
                        <div className="flex justify-between items-start text-xs">
                            <div>
                                <strong className="text-white font-semibold">
                                    {lang === 'pt' ? 'Bacharelado em Ciência da Computação' : "Bachelor's Degree in Computer Science"}
                                </strong>
                                <p className="text-slate-400 text-xs mt-0.5">
                                    {lang === 'pt' ? 'Ênfase em Arquitetura de Software, Algoritmos, Sistemas Operacionais e Segurança.' : 'Emphasis on Software Architecture, Algorithms, Operating Systems, and Security.'}
                                </p>
                            </div>
                            <span className="font-mono text-primary font-bold shrink-0 ml-4">
                                {lang === 'pt' ? 'Ensino Superior' : 'Higher Education'}
                            </span>
                        </div>
                    </div>

                    {/* Experience (Correct Dates & Institutional Companies) */}
                    <div>
                        <h3 className="text-xs font-mono uppercase tracking-wider text-primary font-bold border-b border-white/[0.08] pb-1 mb-3">
                            {lang === 'pt' ? 'Experiência Profissional' : 'Professional Experience'}
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center text-xs">
                                    <strong className="text-white font-semibold">
                                        {lang === 'pt' ? 'Analista de Testes Manuais QA' : 'Manual QA Analyst'} · Converting Minds (Sparky Rush)
                                    </strong>
                                    <span className="font-mono text-primary font-bold">{lang === 'pt' ? '2025 - Presente' : '2025 - Present'}</span>
                                </div>
                                <ul className="text-xs text-slate-300 list-disc pl-4 space-y-1 mt-1">
                                    <li>{lang === 'pt' ? 'Identificação e reprodução de mais de 50 bugs críticos de física, renderização e lógica de gameplay.' : 'Discovered and documented 50+ critical bugs across physics, graphics, and gameplay logic.'}</li>
                                    <li>{lang === 'pt' ? 'Análise dedutiva de código em Unity (C#) para identificação da causa raiz de falhas.' : 'Deductive code analysis in Unity (C#) helping the dev team isolate root causes rapidly.'}</li>
                                </ul>
                            </div>

                            <div>
                                <div className="flex justify-between items-center text-xs">
                                    <strong className="text-white font-semibold">
                                        {lang === 'pt' ? 'Programador de Jogos & Sistemas' : 'Gameplay & Systems Programmer'} · {lang === 'pt' ? 'Projetos Comerciais & Independent R&D' : 'Commercial Projects & Independent R&D'}
                                    </strong>
                                    <span className="font-mono text-primary font-bold">{lang === 'pt' ? '2025 - Presente' : '2025 - Present'}</span>
                                </div>
                                <ul className="text-xs text-slate-300 list-disc pl-4 space-y-1 mt-1">
                                    <li>{lang === 'pt' ? 'Programação de mecânicas de combate, locomoção e IA em Unity (C#) e Unreal Engine (C++).' : 'Programmed character locomotion, combat mechanics, and enemy AI in Unity (C#) and Unreal (C++).'}</li>
                                    <li>{lang === 'pt' ? 'Desenvolvimento de templates para criadores independentes com profiling de performance a 144+ FPS.' : 'Engineered reusable FPS templates with profiling maintaining 144+ FPS.'}</li>
                                </ul>
                            </div>

                            <div>
                                <div className="flex justify-between items-center text-xs">
                                    <strong className="text-white font-semibold">
                                        {lang === 'pt' ? 'Engenheiro de Sistemas & Pesquisa de Segurança' : 'Systems & Security Research Engineer'} · Independent R&D
                                    </strong>
                                    <span className="font-mono text-primary font-bold">{lang === 'pt' ? '2024 - Presente' : '2024 - Present'}</span>
                                </div>
                                <ul className="text-xs text-slate-300 list-disc pl-4 space-y-1 mt-1">
                                    <li>{lang === 'pt' ? 'Pesquisa de segurança de runtime, arquitetura de entitlements e isolamento de processos UWP/GDK.' : 'Runtime security research, entitlement architecture analysis, and process sandboxing in UWP/GDK.'}</li>
                                    <li>{lang === 'pt' ? 'Instrumentação dinâmica de bytecode GSC e interoperabilidade de assets legados.' : 'Dynamic GSC bytecode instrumentation and legacy asset preservation.'}</li>
                                </ul>
                            </div>

                            <div>
                                <div className="flex justify-between items-center text-xs">
                                    <strong className="text-white font-semibold">
                                        {lang === 'pt' ? 'Especialista em Suporte de TI & Automação' : 'IT Support & Automation Specialist'} · Public Sector IT Infrastructure
                                    </strong>
                                    <span className="font-mono text-primary font-bold">{lang === 'pt' ? '2026 - Presente' : '2026 - Present'}</span>
                                </div>
                                <ul className="text-xs text-slate-300 list-disc pl-4 space-y-1 mt-1">
                                    <li>{lang === 'pt' ? 'Automação de rotinas preventivas via scripts Python e PowerShell.' : 'Automated scheduled maintenance workflows via Python and PowerShell scripts.'}</li>
                                    <li>{lang === 'pt' ? 'Diagnóstico de hardware e administração de redes e estações.' : 'Hardware triage, network administration, and end-user support.'}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Skills Summary */}
                    <div>
                        <h3 className="text-xs font-mono uppercase tracking-wider text-primary font-bold border-b border-white/[0.08] pb-1 mb-2">
                            {lang === 'pt' ? 'Competências Técnicas' : 'Core Technical Skills'}
                        </h3>
                        <p className="text-xs text-slate-300">
                            <strong>Languages & Engines:</strong> C, C++, C#, Python, PowerShell, Unity, Unreal Engine 5, Electron.<br />
                            <strong>Specialties:</strong> Low-Level Systems, DLL Injection, Reverse Engineering, VM Hooking, Pattern Scanning, Quality Assurance, Automation.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

// --- EASTER EGG VAULT (Quake 1, COD Zombies) ---
// Replaced broken Doom with Quake (https://www.netquake.io/quake)
const EasterEggModal = ({ activeGame, onClose, onSelectGame }) => {
    const { t, lang } = useContext(LanguageContext);

    if (!activeGame) return null;

    // Menu View
    
    if (activeGame === 'sign') {
        return (
            <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="relative max-w-3xl w-full flex flex-col items-center">
                    <button
                        onClick={onClose}
                        className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/[0.08] text-white hover:bg-white/[0.15] flex items-center justify-center transition-colors text-xl"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                    <img 
                        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wgARCAFuAeADASIAAhEBAxEB/8QAGwABAQEBAQEBAQAAAAAAAAAAAAECAwQFBgf/xAAaAQEBAQEBAQEAAAAAAAAAAAAAAQIDBAUG/9oADAMBAAIQAxAAAAH94PX+dAz/ADD+ofybh7/hRPN9/SwiyUIABIqjHSomDWjIAFACxnUNM2lyTOxbDJLNBSKSxox0GP7h18vq935cNZAAAn8k/rf8a4fR+flPN9zQVLJbLAIsUlzK2suZKU59AICUESwGbboZZ0oxuAWUoJBalCaLn+0e74/1/b+Yo1zAPye8ej9S/K1f0/8AGf33824+/mTh9WzUWTXOW6yKzTUkNhF59KhyXtLmTWZk6JCsaXUzDawrn0ZlmVtuU0zk6MaXTlrUu+WjWsVlRf6z9z85+j9n5qjXAD+Dj5/69lR059GczRrWbCCAAAJNKASyOfSWgigllCCNYrVlSKM3G6AJYlKlWZCys6r29/k6l+o+Uj6r5SzNidCyHTn0sznZUsAgABKEoxtamNglIILAKCLmqms1LLKoBIlKCFzUouWs6rGs6z1glBMhLLB149LIUTWVFsipI0MtF5t1MtDF0rjvaXDZMzYw0ty0jGesqXRM2peW6SKMtxctysaCyxM9JbnFlz0CAayGQHTl2sxZpUsJvG7zC4qWagoe1nxPq8pnwN87qgIWoUAAEBLAJSKUBFRjeJtEadM6ucWXPQlmgZxZaAdOfaTnrnvV1jeIu+fS84LgFBRlPocenJz9Hl79jzY9Nri9Ejl5fXyXHfHQ4b9fFMcPTpfD6ePqjy9O0rhx9vilBoLAGd82ixvPTn1Z5tZz0omgZxSiwdefVnnrNaudQnTGrzSrklWUAT28evJie3xeg3nUsz04jXD0+WXvqVOvl9PiPVz6Q8fo83oa7cOmk5+b2+GWBosoqHLrlckbnXnu5yM7lJQMiqInXj2uee+fS6uN4W6zpzKZiwCpVSTRIosgA1mpVgirLAzbBvKLmVqaiyhIGmdZGblrWufSRneGgzoCAAnfz99Z4759JqzUM7zu86+llz+dPRwallVHpZ8wuqIa9fS8/nz2+KagugAAAFnqZ8rWVCKLAWZ1lZCbusaudY1maDPQGYCUM9+HouPP159bqEV059HL1eP62HL53t5S3e+kZ4+nydjDrF58/T86X2+L3dK+Z7rk3y7c068OlHh9nka657c06db4ydt8z0eR7Exx7dEznPQ5+L6XgaxnWXSYsb6ZGd46c5oXOoCAEJ6PP6LjzduPdrPPpzrrvOnP1eL6+by8fda1w7oSasnLslz8/wB3imvZ4/b3s+b6umRPV5GXL3+db5Pb4F9XO+hM+X1aTlzwant8PeE7Yubrh0XHH2edeCG/N0x1dLnWGe3PpymrZM6qU49DTGrcsenh3ufP149lcuvCvRZpylCWKayGsoWLYAUezydZj08+Wa9Xi7cFuaVBfTzxGZKVNRCpYLkFCa83Tn2bZ1hnvy64axnoz0y0IRmgdeXbWPN34dpdeec7fdee3JChVgQAFN+2Z+e9violaAELAoIAACiIpIpYuTz7wb7Yss741mIM7AiCgu+fTWfP6PP6F561FtmnFCghSyBRT1ef1+Fn08OvY5+f008np59zjj6XlTi93M4zXoPBrvZfDZboQqJQCKoIZmpnWLPRjeYyM9AMgA10471jl38vpaWJdXOrzCwCLJKFgs93i9XNj09fN1T5vu8/ZeHs48z2x1Y5TG7V5do54uV8k683TNFCEqoolsJNRvnOBPdPLY6jPRZUylIXV53vqY8XedmpZRrOrzlzbKlhLLKJZSr6/GZ9flkj2+OK16PKl6uRNsLfTy5k9nm9fikktushUoAAKjNzXTFS56Y6YkQz0EM2WgOiaZ49uPZoQ0zLnoxE6XlU2wXbGE7Xhtek58zvcDcyNMlrMN3mNzI3eROrIs57NMGtXA0yNokEqQrpmkyMbSjIpZY6QuePfj1audZKKCM6UA57Zsusbli8rJ1Q0JQJEKBjQms5OsluXN0E1lpZYAINZ0ZwlrVmjnZc7GUKIsOk1m5x15dGkogtqRNCLJTnuZrWufQRyi9cqtjKkolIsLnUiaZs1KtmZpnedZaoEoLEJqTnqWy3OkwrPVKSELnWTtjObm9uA63jq63Psbz0+I+5k+NPt7Pg37tX87v76Pgvv0/PP0XSvyvX9KPzV/TaPy8/W2T8jr9Zqvyc/Ww/Jv13gj4O/wBPF/M6/S5PzuP0pfz2vv1fz1+/I+Bv7lPivtZr4Pi/V/HY+WrXOUAggASyuQvNLB9v5v6jPXUwx6NXMrecWUzE6Oei6523bOZNzEt3YkGK6OWis8ZfT5ekT1ZSlxqXo56NMLNZWaWkzN0xbE+L4f1PxNcvCLzAZ0P/xAAvEAABAwIEBQMEAwEBAQAAAAABAAIRAxIQITAxBBMgMkEUIjMFFUBCIzVQQzQG/9oACAEBAAEFAun/AOg/sUBGoB0xpjLp86JXhuDPj0vrRJ+pFA5ajTiDqg4g6g2w4Z1/D6X1n+yUfgRqxjGmV4ajtwf/AJNL6h/7nbN0zs3p86QPTOeiVsJnD6T/AFulxxnjUOiVMYT/AIhW4AjD6M4O+m9LfrvClv3zhF984RffOEX3zg08y8oDLGMyJQUZkSmiFGeAyOEZ4NUZlBeU1ecBvgMDsNhu5BA5leGorwDIX0D+s0hsdmnTKG3QDnolA65XgYUeM4iiz7jxi+48YvuPGL7jxi+48Z1DZD8wdMZ6JW4AjAaY2cm6rcRvqDEaZ2/UGdXxP+DGoNtXw4SBlplN6fOkOnzpeG6xMIdEKFChQoUKFChRhChQoUKFChQoUKFCjCFChQoUKFCjCMW7YedMiUP8xqiDqFE6tO2LGQWtJqCH/mBTOsRqynH+Cife6nc97bS2nIey1NpSuX7jSwY248lBknl5CknstIzIpJ7bS2mSH07dMKM0dQlDVd8FHvrPN7hcqky2S15tYJ5bLg6sIdTdAp3XDKoDNSoTc6XUmd9ZxufmKroVP3s0gtyjqFDHzov+Gj31fk8PqWkVZFTtDop85VCXGlk1tWXD5KfyOqwTUlre/iO8dlfvoI79Z3QUZ6pQ1X/BR76nyPPsc0PbAYx/ZRIgUoNQ+6jmxtOw/vMPezmJ8NY3ur93/KOa2OWzSGuUPwQ4hEk43YklZ4BxCJJ6AYUzphFBHUd0D/JCKbqu3GIwhQUdO0qD+OcSm6flO3GIwFrWXsVUgnoc2G9FBcxqe8Fupw+7t9A4nZu2l5T98RuFW+NAShTaBUpgJtNoDmAGo0WtpiDTEMYCKoAVHbBjBbyxFNgjlAplOSWNIhMb7aYlzWC6xqeLXcN3Wtl7Pfa1qeyDywEGNCcwEdBXhun+yfvj5G8i2WJ5FxucYhrxc0kwZioCqYIWzJXDq9qeWuVYwqJ9lTKnw5VNWuYjvT+Oj3j5XE31uzh+9x/k3L2OJDYZXPue0ltOmQn7ooFOXhun+yfv4R3CCrdioiXPqQSbqYeWJ/upntq1HNIqvKPxqjshvXCo9tTOnw4zgzSqSqnfS+Ol3/8AVw99XJlDvf8AJ5qvcHNuIrdzy4NaXuRGLd3Lw3TG6d3eGp26Chrm8tqyY91MEyA0tDw8gMyLMntgMBINNcOQoYnBlrHAgEW03iGEAsIuAaxOMuomELGEGaptLqjpNIgOeZe9yljw9wiq4FMeC2WsDXCMBudhszA5YTi5ePJTN0e47BHu6ZOAMYAxoGnLWixgZcym21O3nood1Tu1P2Kbs3B2aC8nNDpb3I9yaj3j8Fj7U99ya61OeT1Awt9U9xTe1u+k3uX7lBO7v8ifcSm7N7kdFu6/d2zXInNpnUaJIYAn08vybc3Nyp7DuR0W7r9larUBqUsmuMmi9bnkug5YCiSuWZjNzYQYSm0pTqcJzYIbI1TtTQ7kdFu6HdiNT/krCqbYXNzrCRT7i8yiP5aw/jp5U3ul0nlVhltR1TtTX7I7aDcG92uPiG7akk7J/wAVNtxmm1Ey0D37hwRsYiQaTfdSrZDVO1I5nvkI6LXQrkHQ6ZxGpRT2QaTEDLrDdVyHD9xYbqmVNvx0jL6h/kqUyXRFLhznU91R4tdq+fOaadECTag2UBGI1Bkm1U+qU10HnZOdJaYPNMF5IFQw1xBc4k810XuVAZkm4mdZoz/ZEaLMGd35twFPXG57kdFux2Z0DWy65xlSp6ZwnolT0Dd26PQelmxTNTdRABnEHPfU8NxG+mN37o6I2KZqHJDMRiAjkdIobYhedEr9noI6Ldim6m62DDj531Cm4jI6f7PQ6T0t2OzdRxQMgDoOR0nBDYYgqM9Ly9DboPSNjszWbj531RjGc6Z3fs3bRGx2ZqOQ2GOSO/Va5WOVjlY5ctzgKVRcqouU9ChUXIqI8NUnkVF6apHpnr0z16d69M9ekcvSOVTh3Mbgc0MtK5F0oGFcrk2XEcIvSsXpWL0rV6Vq9MxemYvT016amuQxenYuQxchi5TVy2qxqsarQgAoUdNDJyy6Rt4UoRIKlXC2QBxdAN/C4GmGguABcArs7hdcCQ8FXi2/IuABcAi73EwbvddLw6SHEhrnFXEj3R7la9WPXLeuU9cp6qsNKryyuWVyyhTzgcxoAc1oAgWOALCAV7bxaHNtagWhSy2WW8TTAPV50OHZzKptRIWUyFICBEXCLgi8K8FXq/MPV6vKvXMKa9XZXKSvcrTJaVWDg1tIlpoXKyBarFYrFaFaFYFYArQrQrQoCgLJQoXFUhTd1f/EACkRAAIBBAAFAwQDAAAAAAAAAAABEAIREiADEyEwMUBBUQQFFDIjM1L/2gAIAQMBAT8Bj7d/YW2YuxfsPwV/s9ftv7sXgXo3LOL+7n8Ti/B+Jxv8n0HBq4beSEhbW7NoW3HX8j1YvHo7yxHKofWxyaPg5NHxLF6VloXjdFzJGSMjJGSMjIyRkZGSMi5kXLmRkXldivS5lK0eimmadXNelhC6FxMTOpky44T0pmnViirRnsOPYphHQ94UWimadXNWjm2li0WhypoermoyFq2UvZ6IU06uaxVReLlMeRfB1KZ9jwXikU06uEVF4U0l7FxRTCPYcoU06uaosdItNRYSmw9VCKdXCGXhl4bF36exVqhHQuMVRkXZlF912H3V5FvYS7D2sYliwkWRYXZWvvOJgYGBiYljEwMTExMSxYsYmJiYrsKFrYSLC2faWihelYxapwnc5bZy2YM5ZyjlHLMEcswFQYCpRgjBGCMEYIwpMEVUFi2/Dp7qQkWMSxYxLGJVTbT/xAAfEQACAQUAAwEAAAAAAAAAAAAAAREQEiAwQAIDMVD/2gAIAQIBAT8Bp7fnQhfMfd80Rw+Pyt6L0e3yngWnx+d1zLmXP8FYQRhGccK7lnHOs0TxqjFzPFVWa3vQtCyWh6lSdC1PueK0rlXcqrNfrSThJJJJJJJNZJJotSzf5SqtFxJcSXEkkkkkiZJJcXMuZcyS4u0vmnD/xAAyEAACAQMBBQYEBgMAAAAAAAAAAREQITECEjAyQVADICJAUWEENEORE2BxcoCSUnCB/9oACAEBAAY/Au6/2rqOn9N3208uo9lqfPTu+3/XqPY/sW7+I/e+o/Dz/ju/iGnK231HsY5KO94l2ml+kH1PsfU+x9T+p9T+pq1erb3M9I0fq+ubHZdtq06fRHzGs+Y1nzGs+Y1nzGv+PlyRQPrj5UvasGa5IpnqKo06TX37lqKiZCGn0piMGKepw0mDFGcJgVFRj6SxErJ7iNlkzamyXpJKI5ir79Tt+Xl+RFKMFt0zG/fmFuNNbnhPEL0pOo8NLDrOobWCWWwP0PDSSBojnWGQjxCawXLk6fJLcadowWVLiguIsOTVRmCwkMVGu7qonVUuIUDnzWmtqQSItR0dUxio2iGMdHRKjEO5LYhQZ80pZypMkCNmlx8x0uZMkMaRDIQ0xuaXwShsvS42KC5GksbOo8I56R4aWyNvvv8A1NdkrrTdGn3oI70+bflW3RMuWNLdVJYuJ9OdXRVTNLNS9xaSIHFI6bBYk1IgSqhOkUdY80/KzWVSCKS6zS/Wvf8Ak/ws4WcL+xwv7FkzgZwM4GcJwmDByORyORdo4kcSJz5NJK7OJnM5nM5mDBgwYRhGEcKMIwjCML7bnVp30k8ja0Y9PJfi6v8AhJ7kcyOZCPZD1cjaeBSL1Zs8xJISREDtZDcGCYJpk4jiOM4xPbycZxnGcRMjc5Gto2doicCc4JkbnI7jI5EG12fD5BaWK2CYNqLnuOEYIixgwYMGN1kyZLaidsvqM0zuMVxXAnpw+Xf/AP/EACoQAAIBBAIDAAICAgMBAQAAAAABERAhMUEgUTBhcZGhgfFA8LHB4VDR/9oACAEBAAE/IeDwf77pjpH4mpRA6umU+KLMXbjH8fCjAQbs/wDD9X/x45gTYl8gxJuZ8dEkqjLzXkZIvKIZ2CRhP0NSIaX+vEy6J6L9DwKCtxVGLilHnMUHVQn2a8CEYC1JLJkP950b8KoyQaV4kZDHghSn9i8N49k1t8VcXiwE7otA9jtuYLwrIq8ATknsTrgpDgJEkxsbhCx6E1NGJzVNfzwVF4l9GkaHzRgJDDfVJhbH2eUw+8OHvyCQqwk/LElMcrnJFdhAEhUkAgDyUYrZVMno8ElkbXlyJpNMv8DwSgvQ9iuU00TvTqGm4Z2aJ6MBnyT0Jz7GHsxJimGf77vyP6iZUfFcMD83Bjpp0fBcMCThAnnlbqitTAmEIaGRUefof2Z/dn92f2Z/b1ngMgvIsVYiF40jgj8FFRkccCLNIzbyKSoMbj8bw0bUyW+VvRj+JYoTHwRPYxZ5oVdBwFfx4FgSoqJ+NCVEZC8KwPBDISSosvmuSFgPxYGA+GPTi+LwzNi4T/DwIRpi6E7zRZfNVYsUlyHRUQ4D6ow/8FpNSD64SHZ9fo++B+6F7n0R8qPnEapRp0E06PxuqRIUDoteFEEf4TFRkc9MwYpHVHnxMwIBD5LipIOoRAUiseJ+BclweGPYU0UefJgNUYvAxN2M+pGQRO2w2DJfGDfYtbk8tiNSpDs4NoYbjnbDjOb4J1eAy8LAl8GNtNwPiJ1MIYna8LNMWzEiMeRo1GFGLPh2Y/piLItWIHsPaWK/Bb2HYdHoui3cRGLXoVC93SHX0MjlWF/ILQ0Mv4w9WQwR2cdeBixQ2CoXJV3aimFGLDxYfpioJgbLcMZBxl/gfCSUNQRY8oIRfFXWt4E9qfuUIUjdwj5Oj3LKHzVVmvAdFnxModyWqRDAsQoEJtMOiecESkgKbRhDJ8riJWT6E01evop6dmRZFPN+QdP1G0GiYcGDFsfCODHQncQ+aqs0zMFRiz4pfdiYPuSWbgcZJsL0SiJom1kNZZPYk3AwqsZsPwGzX4Li8ndXDyshYQxmS/xoII8S4sWzKjAfi3QgwHTKiZq1JI8SUu1BqWPKlPkbMTAfi0EMMKMyFkdtkpFqPBF5jN+Kq5r3SO6Sv5UT/jVSLwNi0D8dswCxwMjSETEjskhGEndkJBlRXQwTDwyPbehvA/XHs+nXI3qg0+EyyUw8BmeSHBsQ32QmYMAhchOKi1um+SACUjIXlAu4Ew1sN+mrEjMdzgPyGEWKWFQQxD1iBZdmJlyGvNgUgH/BHoSWFybDcRDZli6JCvqNvQgsQ5EYgY0ehoqG3Q8uYkOFKeTdszGH6OoCRl4ZfsOg+U9wNSmNbgjlnMjItHrUSIZeqYE9DrvwrARhoVzXRlS/kyP0bFiMS4uIk2Bk7dDwMHwsSKN3Jo/WHstEkXQsNeIEmoyNISdExzP4ipIVB0ETERMo2XDS/YPcI5QQ2OE0Zg8XsPWsB0vdHh0cBXrPwMuWmIdYRkJSRY2yIkp2wa5kAjwPpOIIkY0le6uK1aGrChzTF0L0QlNYfWJyLjp7Y0VgmDRLqFsLRlNPsSzWQuYKSF8bB8vBOghBiZFtTXRFTuL6xGvRGqo3ux2ZRmWllqvMWKG4ESQr+wm/kx58Tqkvtkvtn5LUSN+xobkakSJjcvjJAsSjexQDV0BpdjZqKt3Mh/C4qw6IdFTYwEvM3RLjEgLAwuO9INCa1Xj/AAUVWhieh8uhbyZgNynyIQrYyVnnw/8ABwMaKX/woI4aY0CYuZjNI8GXJVz0QyD1KHOZeeRsQvsSIbMn/JeHUGczGvEzjF1HdEOhJGCCREcFyvnQ9zfZBoDWEyBGzXQlewiICnPoNW4pkZsNdIZFsa2XmymDM9NKrmGZ+G1J8VpiUuEJWLE/QuNr4sQCvYyXQjGhOUS79inJZwXTGRrNSZmmCZExTl28ao6GDNzXEfBGbIzJl4Lfkv7Roki1H6tRYTE2LTYohGJkDXV1NX8qYLGt+QRIZSF2F6lcHxQzTIxSFFRcz43GTTfYxqDpbWSEeoPkD+lsNiau2RYCwQczBIoQimiRFPeyCHdHOJ5dMhyjsabcgsmH4lTJlOsU28jSnA5QmrDVkM7hL6GTMb1A33fC4VhGLBIlk2IO5cbE5eS8Cj3uOecvKhEhpIQKz4EYMeGNcMVFvk+b8iLUv8BmMQjbg8UVcxkMmPgRHCKaFFNFiCU2WLdn8liUSu6JQmiA1SEjRI2iUStGeCVRNG6EJ4OM1xYcnAzdWKez+arg0kaFhGI80Y1FpJ7FxfCC0XGv4D2GRYmmJT4SOi4uAWPG8GZvmxcH6DILW2qoY79Jri+KbG2F6q0jT+aPiuBDWjAXhcS+fAvfBpINNkEidU2i4+jXimBLCNZp2KwlUfFD4NTAeODxwe6OYtniuTGKkQU2Qm52TR0aHV8EImQ8e1DpIPiLihnGk6ovUcHunmNhk1XN3GoTHoxNoWGB8Fxbg0e9PQgyjY/AqYD8VB48DHpsXwZI6PhbEDyE6rcSVM2F8En0/wAEPp/gh9P8Cdj8DP6U/twj0pOF1f8AAL/wCcIMhfN9GJa+xR9fomSspkJXwtQ/YmgwGxXbmFrsT9DUlqg34HgUVj9kCIOsT6JdDzWBMX9n06P2LGZfT/Uz3/kYP9Ms9vp/tY3L/wDTEvqFcK0SWCj/AOo/rkf1Qork9Sj4JaI9Ef8AUKEjAs3FF02LNLcjSLCxYUTGz1tGTrBK+CyGkwNIpusiHMMhErCEzpwPuAYbmeZcdcmvf/tkpWWiEnLQ4AwN8hOGXWSQa+hcFkIL+K9jyyY9T4EKJmPmBsdlZyKw2LY/4RbI6vwJZ0EwwDcuo1FXIl7jYhYO4LNqQQMuH2HsCLBPFDVD/EwCjBYxd+nIiOTvN/Yftv8AmlArcqf6PRnoUyNw3yI3mZXXvkhrLhrinHNkMHalkMtNN6JEJTmLhRl3YnBWvI9JDdZ26Q5nEkJvHAlbnIjheNakkrwiZQoJYgkQxjxQTxB7iGuUxLxJwVNsEWQYyksLNdwOzLMMiEZZBCKcTe6JddF6D0EAjRCTojhof9IGrsdq/wD/2gAMAwEAAgADAAAAEPfZ9t9/ug/u6Uw/rvzx6eXwed2t9/fffWdS924+sjRRd/gw8gAep4V99gSffTePKcw6k86whB284k7s6sAyibAZfs8hGRyi3vnvm94n9vuvp/8Adk1uHMNnGpG/ZYIf7766ZMv/AOe/6XfD3/5/f3dA++6GPHXFPPw7/p09P9zVhiDD21rCVP8A/vvr0y/ffNCMpLfPPAFHTfeMHWg9Y/v/AP8Ab8XIxgAEKRYJFZdYjAe+59hlZ3+//wB954/ESIAGEHBbXembBC/1Hg8qY/8A+sLsoBTzQChEFCHeIGGXP6RXykVsH/8ACCE+z1+68T08li888885AwBApqps+/GiZT+RjNVjZjdpNJAtgRURuFUtZV7/AHqqeq/2TaEWc8IAfJIxQMu7TJOFTY65Gkpy+6vWawPHF3dkbIXNbjTVug7FnhqiR3h3OPPHI1fPPFPPPPPAzIUhGv8A84Jzmx9z2HziCAxC1UgqkRwgAE83P9v7r1Od0ADUDhi7lTOyNJCDhCCGHmsG/wC5rGr6k8V8gpSZyPUtKpMIA4+qkLf7v7cCLGVB3M3NA0csNRFiCEoEDFEZFv8A6mRk1Q4w98sNAwzw3zn89Iw7gHimO8su949VYx3vBrL8y95gzo1gXgQ46djxlxv9FVWQJtvQDM4UOw8uSLYnB0c7+wg//wDEOT7a3z5wMDz9+iJnF7Mpen/Mv//EACERAAICAwADAAMBAAAAAAAAAAABETEQICFBUWEwQHGR/9oACAEDAQE/EMJLv4U/UDrQSEap2+aicMndi/A8hIR9z9Z9AyohmT0Y8aRhkaDWGMREv7pH6Uep5LhP8Pn/AMPj/wAzcp+sY/mw8mqyUM1EhiiQwQIECJEgQEry3NXebaMJBdwi2TlC1U2LFiBLKjHadJ2NsZMMbwJ2M5hEs8T0tmmtyg6Li0K5VHCBCeIcdkTkCoMLnTtyNTlbNNbCxfUkRjAlA0ssH0LRce43ScXJjThtZbPCVd2eCeEk4XHvueMWHJQNt/CT5I54yVySbklpuBt8oZiUlDEvom2NyJZ+DvsbwXzbW54LFhR4NpuWMvNCXo5FYOY9xuyS5ZaRuBoYkElEKiPLG9IuOsWysWGeSwkskIhlH4JwPtkYvOEa3WFtbYRl9glDp/ijCHHD2W1846WEh6O22SnUJvIz8HsEzUjUSgWpWRJ5L6tOc2y8NCcNpjieDctQPr6fwdkLh4Bp1V4vJC9Z6Ti2Yy1YkoSJ8IsSsUULLbYlG3g8l9UHeHM/on7wjn/vCJEiRIkCBAgQ0Feth3+AHsNlCMLM6U0sOhNkWIn8C2LCrLICVIimgqfsTPyT9n9n2Ensf2IID1sTBZvlyiPBEho6zM5xJBz0IadiIxDIcSKfY6X0YiTHxhFUddwSeS8tP//EAB8RAAICAgMBAQEAAAAAAAAAAAERACAQMDFAQSFhUP/aAAgBAgEBPxDTjo8rHBcaAg0kwz+8/WCEAUGsZCCCvHHHkdEZVU+z9Z+ncOoaKhRRHaO0uidr2xQiDBua+aA5wVBNDc6Dh3BZIWCLphQoosnAW5bQntwmGc5UPGCnsHzYEE80ivm89wLB/BDBEUX3sBRQU83rW4/sePNw6IAOOgdAoKF0igwOIO1w0lhIkSALFGcJx41AGjQFHGbl5lxx4+Y9zx8jy8tRuOCj/8QAKBABAAICAgICAgICAwEAAAAAAQARITEQQSBRYXEwgZGh0fCxwfHh/9oACAEBAAE/EPA1H8aYRJW3Mn8QUTUaj7lzaXEzu/PrhsESxGZni7xFHBeOWE98DfDbMjKk9/uP9r6R1+HZLDbrrqnEdY9y+vmvDA4rhgphESwKZpFUR7/G6LhQuLiAj7l48bhPfLWMHAJZFtfaGAWw0YQ1+HtKpB6H0gFDAhJ34O4MQcmCAQEsvgA3343L8GEFicK8XKQG3h3yQXyRcgyR/U4/NPj8ItPuf6r3FZURRlYnceXuZmeRuiJUMrHFzaIxuoG444qV4MdpDC0MfDNy/EPGAQuFiGWK7LfbNvGn3Kfc/c/cGHu4NpDBo5iCAqOp3HuXKhZIBFiJgsYhsMLZwqzDPDqI1FWXBqbLiLq40MyuWXUcTrccwgA8fUuZ3cWL7j7QVx1FnUM4gUzTixPuN7CPcd0bsXRXDrxOdk00/Yz4P9fufF/r9z4P9fuWsn+v3LHc4+liVqVwoMZWZUGSxcSiLaoiEalj1OoazBZU9dRnSR46nUKoJrRjDiB4YKC8BaSijcx+MILIAGkI0xmDGX+SInaBSIoBl385iIZzLWQ1Y8BVp1MM9TWYR15ly5cvi5mN3PU1yxYhMsuKX+AVVbjXLwaTqFxt+A6mhyG4C4CjipUQlyobIYOL6LuWCzrBbDQxQtxr/wCj/if+J/xP/E/4n/mf8T/yH+OOppLnqXr6lazqDR+ShBnjAuIZkvvh78b5SzMuckzYIueBlNOSHCCOqjBiYR1iXKlSvJYRKUDedJ3+B74AyBE8JSoVB8b8rj3HkcaTJTLx4anfkV3YzUDE3R7823IVDMXUZZNR7/EtLmUUK8kpuWX+F74yuUNzubRpY8Hfne+ZppNZOuA9/gdTudJiCIJBiHGZcuVK5z2lu8tnPDecSviW09uKlSpTPkE0LLPggpFSpXj/AI8GRtm0VxKYmAfjNErEeSKEGblPc+SU+ZT2ynzE9R9oh2gQYfefeV9xE09z7ynv+p/sJ90KmvufefeWhFbgnWfRK+4t7J94Tm5b3Le5b2T7Er7J9yL7lu2bRkqtGLOB/T8YUfSYkuOXb8ILeJb1BcVxcuD4vfJL4qWzyGGC471z64IKyj+047ff4tCaZaAIrLmnBv8AAe4vPTG6MN/3maCzOub9eWnJzcuLfDCXiXn9eDtmMKl+WYSsECApcbM2hKlcPNMwSBBA3FrnubQzj5mfftEWq+YRZh7iBNBI+uC7mEb9ENj2RKMPmZpAvU1mEf2bCaefzGhke57RMfvrZaeZeh+aXq/mJ9+YTAiXLAcwjMPwhbUqGGFZ42Y8SEzMy5rnM6Rx/wBmBv7wSXYJUa5KE4DEcQwhM8JLg33CiTTK2JsO+Y4SsjAQcsCfphQjLFXxxUeAxnObFDriCboPUFvsrx74JvUwh1mBaTR4DPm64DGGAwUCM2Zn8EXH4DZx+f2T+7MnfRNZ47guAdxW/UozRemGeJjEklb5piOC5E0/TMR+WW5FhTAO8WWdkzT7IdvYT9Cf32f8QxcpmXK4Je3AWVwJmbx/C1x9xZCaZpxrnXFYmvE2SgCfbEWGsxpRsuGKVgXEU71xVoo6YzNmp9uQs7kJUMBBAAveYEP+jLzBlCrYFBx2zKypRlIVvxl1G/hKCkslVZe5nEWZqO2+NSpbkm80nb3LMoLIdR/CwEchBjwHvhq/AbjMFKgSw1FFtX7RQRWItL+ZaFwShVIkbSRyzm9xgUIja/zPmfzLTQr+ZaVmJa3bcTYFCLdGXpsYbh5HI2RvBSJHcCfXkZ5dn3DTFjwFH4p8Tm5czMzMzz98Wlpbi5TOsQxBjweTd4MHEm5leaQ8q5f7o9wKSlZpE5rAJ8EXY8PqD8+LsQZJcHCe/wAjOgnbNy5cqVwcbkIFShhcZ+F/vm8YEtXgYhkCCAYY+JEAAJ65teYBjIeKrd0R8KGPPyHMQWXGH2M6ZThcvg43Iai1LFpq49effD/dKqHRTPlomiWrgPzEBcwhdHAMsYlKHflAPusRBgk3TYvRgPvnd94G8GU5gX9ZMYIYmYOfpLPEgDYhRhPURxBCGLjnNOI11lqeuOARC2kfpFxCwCvUIAtiNEiYgIatEqYPSVTUJ1mRmJ+4+Xun8IXC4bWf8PChqHaYmUoGzuIMi4lWiA2AR3ur3PpCocJxpjMrB7hXqWnIY2LRG1X7jEPwI6yIBDPxMf1Ooi1lO37lx8jDw5VlpeQlSj+3P0oIr3LwkCVMHUNuOIEcyVAYq6idJBcbZqKs2E1YQSAK4CDeEqm9y0vEZvw98vfidGLDHDYodS/wmmXKb1LfcDXrC0ikbuXjgLypgp1iAKMYJGv4l30WYQNvvA3tGit1EWjWJ2pidbjKZBTdsy93Gk64hD5n96FH7Rtkh9o3NMxplQX4RKXXLE+4m49EY7jsl4OEsS/NjDYQ05hfm+uT3xXGpZe5hP4qPcy5BVMxCaZgEHuNzFQjUaTAk9ImRJpXtK/W9sw/ImMLtpgssxkv1CLEFO4zUjKddVEbhoWYFtuSYFh7jhjGWPsCWVRd6HjsrVQ3hWMrZLyq7S7R9EINQMYS3JY0sMEh6h9rvmCotCGEw1B55ww7NQYsPCFriO1ncR8iK7EAtXmFtFeZcEjRgcLOEsn641TbK0zOsDHAyf8AJPZ/JLfcdhqJ7TUL/MZNsQjCKNix7L5uX8z7ZhVIxmM9yKgRodo3hH2NCydcu3Y6yVFjO3AYlTEbo1LLbxYVIl23wKuGWDijp8U6CdxFASVVeBKGAbQoiFuAbSj6OGpJiSbMdCaSoT6ZiYn6n6lSvwCE2SkOPSOUil1UJiY5fuUR7eCXKx5k2YwpZN4bZ3x9+b3N8BuGZwtg3hEXKgnczL5YS5crmpqHw+b+SkpKlcLUDXTiCuqYB+IB7gzfEWbPuDRLYNQDNYeidzExywmJjkISYiflKS86I3b5vf5KlcsFhENljCeo790ykjFrz4vfkVn7pkjMrXABKnB5deKtwhPoSLxHwbmA7uJoKiE3CIBuFUQuNwhYdwaVFJ1BrofcWrd+pckOXA46ly5fFy+SEZndUGud6E0/CXloRX4G3D7TXHXiQlfpyshYUaSs10wjsr4wK3stDjT5I8OD4lDKVzCaO06vsojCO2CGZlBl94O4USxYy8OpUaz43Lm0OGy48EMfZDMGvAqL8RVZiQMEnfDxA5fHQzrwNwj7wlFsjBU1xbudb1KmvURWGk7ikcr7LYrBzFSmBuIZEsIo9TV2YP4DM642fOoQnc2QwM2LuVIoqS498ZeHcouj3JYtYhXE7ms/wh46TrioQjUJJsWPqF+zkvQU4xGwflM3XS0AXZGWtu7lAcWO49iGAu7YLWMRi9GF9a4Qv2UBSs6kHD35VKhDhP4IE0kqs3GzvEHVcsqPfmzKjSpiIvsidp2fmGotpSMwAiB8RCGDfCaMwBshbhcDHhljosPANrkCkhH5Myg0Rw0O5aK49eHfn7naZPKLUA9QNUzHv8Bk2Sb4ZZ5aw9y+NcseFcKYldf9cHdS51D/AJjydy0L1LEW1XTP1414Vy7Z64WcNYceB1bxDiQv7oNyuNJ8pSfqVAqIZi9woySJ3STHuY7Er2lHuLaQS13KliL9p8sZKe58sy9z7ZcMzGF/cp9z0p8TLIqVVPugKwT6y/ifDPpLJ9yGYTFRJAcJo/77474F+Fidpm4odvCmCFYuXPtO9y3hSREhlFiU9RIdS6VFC5czLlxy+bS7CXLEJuwYjakFxLW8kWXL4LEqDEqE0RacN4TX8NQVFxEd8OcQ47irhXLgSL0wCLipku4RqBu3jpy9xl5SURQxmXiDBbEHz5KSyPA5TZzSbpofg0RU47KHBuHDOoK8FBYASljgle6hSoCuF83iOefuJwZdciZF5myPikLKdwmkriuLTaMZoTSNMNwS+MB8NIE5SNOXfA3O+e+NmVSTYMBYhFqPgCNqBEPCp6mngLGbTMkRBhC2QZg1AVRi/BztHMOLjmmDBmia1Cd8B4DSBR4zsjZjwvhc7ly5fABTUxKI4eLrLORuzDCDEsjL5VyG0acYEXgZhCxA5oG4c9cMe5tCYSWBCxv8ATWWGbuAys4j3U7TDX/Mx7n7gxufuF9fE27iSpDLAG6RrPGj3CBHEwl8BXTf1ExMkZojrSPZLp/uTFAQ/wDYmtK1g4ySMsR/hMsLD4WmJux8qymD+mZZP6YcR8a5jRV/zlIz/OLQf2joIC/6Gf8AxjBADRkOAMh9S1TZUFKlnfHXh3CbmYWVrhlV2inSHqy1tKCUGZ61CaWv3CUJ88xpjvMfMU0u/bDq/ulQ/tKoCoVAQGKfxQCn+KENBXxnykM+u4O/6aUBVDAaEKoFfUt2P4gOgh0EIINgzbaFG6KhfPczdmyOGAm+KuJVp8IAuHsjFipIWshxWhc6PcUUdCBUGtwureyohCJygFoYb6jOvaHXyS5cuX4LLq+WO/h3OpgRTQfXcDFX7bZT/id4QvK6hse5WiXedo0S5vsc2W7C9wpxFr3A5JoI5hdAIYhdlaI1Te+I2auzolwzseplwbEKDQYPbMhQyY1aGPIJ0IBsV9xAaQZoC9RTRf3Mnb9xaIV8ol/v4u6e8fj+yUXp9xTVvZAAqrNpl76Ljat7XUt1fRfMcRejeZZSdkYQpTMEu62IyC6jD2fvMs1PQwSxDV9RID6Hf/pK3+EDqO/h3Guq6/INwAg1LcE+SlOpXsPS9Rle7G4cgLa9xM41L3K0H0EYBP6pEzNuRuEex1LPx93MRAfcXEBlhFn1GsB+oFdFTCIQMKA+JWNUsMFRfU5LdeqlmYpWyqAEN1Hxakc39ZUnRMwsP750f2wdm/5htKz5cWWj/MecfyhmAxDUBYpPgz4cLVDMuMJKOswrI/EYGlwu3+OTNIrVwz//2Q==" 
                        alt="No Easter Eggs" 
                        className="w-full h-auto rounded-xl cursor-pointer hover:scale-[1.02] transition-transform shadow-2xl border border-white/[0.1]"
                        onClick={() => onSelectGame('menu')}
                    />
                    <p className="text-slate-400 mt-4 text-sm animate-pulse">Click the sign to reveal secrets...</p>
                </div>
            </div>
        );
    }

    if (activeGame === 'menu') {
        return (
            <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
                <div className="bg-[#050505]/95 backdrop-blur-xl border border-white/[0.12] rounded-2xl max-w-sm w-full p-6 shadow-2xl relative text-center">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm"
                    >
                        <i className="fas fa-times"></i>
                    </button>

                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-primary mx-auto mb-3 text-xl">
                        <i className="fas fa-gamepad"></i>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">
                        {t('easter.title')}
                    </h3>
                    <p className="text-xs text-slate-400 mb-5">
                        {t('footer.joke')}
                    </p>

                    <div className="space-y-2.5">
                        <button
                            onClick={() => onSelectGame('quake')}
                            className="w-full py-2.5 px-4 rounded-lg bg-white/[0.05] border border-white/[0.1] hover:border-primary/50 hover:bg-primary/10 text-white text-xs font-semibold flex items-center justify-between transition-colors"
                        >
                            <span className="flex items-center gap-2">
                                <i className="fas fa-crosshairs text-primary"></i>
                                <span>{t('easter.quake')}</span>
                            </span>
                            <i className="fas fa-play text-[10px] text-slate-400"></i>
                        </button>

                        

                        <button
                            onClick={() => onSelectGame('zombies')}
                            className="w-full py-2.5 px-4 rounded-lg bg-white/[0.05] border border-white/[0.1] hover:border-primary/50 hover:bg-primary/10 text-white text-xs font-semibold flex items-center justify-between transition-colors"
                        >
                            <span className="flex items-center gap-2">
                                <i className="fas fa-skull text-rose-400"></i>
                                <span>{t('easter.zombies')}</span>
                            </span>
                            <i className="fas fa-play text-[10px] text-slate-400"></i>
                        </button>

                        <button
                            onClick={() => onSelectGame('delicia_doom')}
                            className="w-full py-2.5 px-4 rounded-lg bg-white/[0.05] border border-white/[0.1] hover:border-orange-500/50 hover:bg-orange-500/10 text-white text-xs font-semibold flex items-center justify-between transition-colors"
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-orange-400 text-sm leading-none">🍊</span>
                                <span>{t('easter.deliciaDoom')}</span>
                            </span>
                            <i className="fas fa-play text-[10px] text-slate-400"></i>
                        </button>

                        <button
                            onClick={() => onSelectGame('music')}
                            className="w-full py-2.5 px-4 rounded-lg bg-white/[0.05] border border-white/[0.1] hover:border-cyan-500/50 hover:bg-cyan-500/10 text-white text-xs font-semibold flex items-center justify-between transition-colors"
                        >
                            <span className="flex items-center gap-2">
                                <i className="fas fa-music text-cyan-400"></i>
                                <span>{t('easter.music')}</span>
                            </span>
                            <i className="fas fa-play text-[10px] text-slate-400"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Active Game iframe
    let iframeSrc = '';
    let gameTitle = '';

    const persistDoomMode = (mode) => {
        try {
            sessionStorage.setItem('spet_doom_mode', mode);
            localStorage.setItem('spet_doom_mode', mode);
        } catch (e) {}
    };

    if (activeGame === 'quake') {
        iframeSrc = 'https://www.netquake.io/quake';
        gameTitle = 'Quake 1 (NetQuake)';
    } else if (activeGame === 'zombies') {
        iframeSrc = '/easter eggs/GSC VM/gsc_classic.html';
        gameTitle = 'COD Zombies Errius / GSC VM';
    } else if (activeGame === 'delicia_doom') {
        persistDoomMode('delicia');
        iframeSrc = '/easter eggs/Delicia Mod/delicia_doom.html?mode=delicia#delicia';
        gameTitle = 'DELICIA DOOM (Jailson Mendes TC · UZDoom)';
    } else if (activeGame === 'doom_e1m1') {
        persistDoomMode('e1m1');
        iframeSrc = '/easter eggs/Delicia Mod/delicia_doom.html?mode=e1m1#e1m1';
        gameTitle = 'The Ultimate DOOM — E1M1: Hangar [Phobos] (UZDoom)';
    } else if (activeGame === 'doom_e2m1') {
        persistDoomMode('e2m1');
        iframeSrc = '/easter eggs/Delicia Mod/delicia_doom.html?mode=e2m1#e2m1';
        gameTitle = 'The Ultimate DOOM — E2M1: Deimos Anomaly [Deimos] (UZDoom)';
    } else if (activeGame === 'doom_2') {
        persistDoomMode('doom2');
        iframeSrc = '/easter eggs/Delicia Mod/delicia_doom.html?mode=doom2#doom2';
        gameTitle = 'DOOM II: Hell on Earth — MAP01: Entryway [Earth] (UZDoom)';
    }

    return (
        <div className="fixed inset-0 z-[120] bg-black/95 flex flex-col">
            {/* Top Bar for Game */}
            <div className="h-12 bg-[#050505]/95 backdrop-blur-md border-b border-white/[0.1] px-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-sm font-bold text-white font-mono">
                    <i className="fas fa-gamepad text-primary"></i>
                    <span>{gameTitle}</span>
                </div>

                <div className="flex items-center gap-2">
                    <a
                        href={iframeSrc}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 text-xs rounded bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center gap-1.5 transition-colors"
                    >
                        <i className="fas fa-external-link-alt text-[10px]"></i>
                        <span>{t('easter.openNew')}</span>
                    </a>

                    <button
                        onClick={onClose}
                        className="px-2.5 py-1 text-xs rounded bg-rose-600 hover:bg-rose-500 text-white font-semibold flex items-center gap-1.5 transition-colors"
                    >
                        <i className="fas fa-times text-[10px]"></i>
                        <span>{t('easter.exit')}</span>
                    </button>
                </div>
            </div>

            {/* Iframe */}
            <div className="flex-1 w-full h-full bg-black relative">
                <iframe
                    src={iframeSrc}
                    title={gameTitle}
                    className="w-full h-full border-none"
                    allow="autoplay; fullscreen; keyboard"
                />
            </div>
        </div>
    );
};

// --- PREFERENCES & SETTINGS MODAL ---
const SettingsModal = ({
    isOpen,
    onClose,
    settings,
    onUpdateSetting,
    onResetDefaults,
    lang,
    setLang,
    isGalaxyMapActive = false
}) => {
    if (!isOpen) return null;

    const t = (key) => {
        const parts = key.split('.');
        let curr = PORTFOLIO_DATA.translations[lang];
        for (let p of parts) {
            if (!curr || curr[p] === undefined) return key;
            curr = curr[p];
        }
        return curr;
    };

    const Toggle = ({ checked, onChange, ariaLabel }) => (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={ariaLabel}
            onClick={onChange}
            className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors shrink-0 focus:outline-none focus:ring-1 focus:ring-primary ${
                checked ? 'bg-primary' : 'bg-slate-700'
            }`}
        >
            <span
                className={`bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-200 ${
                    checked ? 'translate-x-4' : 'translate-x-0'
                }`}
            />
        </button>
    );

    return (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className="bg-[#050505]/95 backdrop-blur-xl border border-white/[0.12] rounded-xl max-w-lg w-full shadow-2xl overflow-hidden font-sans text-slate-200 my-auto max-h-[92vh] flex flex-col">
                
                {/* Header */}
                <div className="px-5 py-3.5 border-b border-white/[0.08] flex items-center justify-between bg-black/60 shrink-0">
                    <div className="flex items-center gap-2.5">
                        <i className="fas fa-sliders text-primary text-xs"></i>
                        <h3 className="text-sm font-semibold text-white tracking-tight">
                            {t('settings.title')}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-7 h-7 rounded text-slate-400 hover:text-white hover:bg-white/[0.08] flex items-center justify-center transition-colors"
                        aria-label="Close"
                    >
                        <i className="fas fa-times text-xs"></i>
                    </button>
                </div>

                {/* Settings Body */}
                <div className="p-5 space-y-6 overflow-y-auto flex-1 text-xs">
                    
                    {/* SECTION 1: INTERFACE & MASCOT */}
                    <div className="space-y-3">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                            {t('settings.sectionGeneral')}
                        </div>

                        {/* Language Selection */}
                        <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                            <div>
                                <div className="font-medium text-slate-200">{t('settings.defaultLang')}</div>
                                <div className="text-[11px] text-slate-400 mt-0.5">{t('settings.defaultLangDesc')}</div>
                            </div>
                            <div className="flex items-center bg-black/60 border border-white/[0.1] rounded-md p-0.5 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => { onUpdateSetting('defaultLang', 'pt'); setLang('pt'); }}
                                    className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                                        (settings.defaultLang === 'pt' || settings.defaultLanguage === 'pt')
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    PT
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { onUpdateSetting('defaultLang', 'en'); setLang('en'); }}
                                    className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                                        (settings.defaultLang === 'en' || settings.defaultLanguage === 'en')
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    EN
                                </button>
                            </div>
                        </div>

                        {/* Companion Bot */}
                        <div className="py-2 border-b border-slate-800/80">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-slate-200">{t('settings.companionBot')}</div>
                                    <div className="text-[11px] text-slate-400 mt-0.5">{t('settings.companionBotDesc')}</div>
                                </div>
                                <Toggle
                                    checked={settings.companionBot}
                                    onChange={() => onUpdateSetting('companionBot', !settings.companionBot)}
                                    ariaLabel={t('settings.companionBot')}
                                />
                            </div>

                            {/* Subsetting on Astro: Disable Welcome Message */}
                            {settings.companionBot && !isGalaxyMapActive && (
                                <div className="mt-3 ml-3 pl-3 border-l-2 border-slate-800 flex items-center justify-between py-1.5 transition-all">
                                    <div className="pr-4">
                                        <div className="text-xs font-medium text-slate-300">
                                            {t('settings.disableWelcome')}
                                        </div>
                                        <div className="text-[11px] text-slate-400 mt-0.5">
                                            {t('settings.disableWelcomeDesc')}
                                        </div>
                                    </div>
                                    <Toggle
                                        checked={Boolean(settings.disableWelcomeMessage)}
                                        onChange={() => onUpdateSetting('disableWelcomeMessage', !settings.disableWelcomeMessage)}
                                        ariaLabel={t('settings.disableWelcome')}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SECTION 2: APPEARANCE & SIMULATION */}
                    <div className="space-y-3">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                            {t('settings.sectionVisual')}
                        </div>

                        {/* Visual Theme */}
                        <div className="py-2 border-b border-white/[0.06] space-y-2">
                            <div>
                                <div className="font-medium text-slate-200">{t('settings.theme')}</div>
                                <div className="text-[11px] text-slate-400 mt-0.5">{t('settings.themeDesc')}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pt-1">
                                <button
                                    type="button"
                                    onClick={() => !window.IS_LOW_END && onUpdateSetting('theme', 'space3')}
                                    disabled={window.IS_LOW_END}
                                    className={`p-2.5 rounded-lg text-left border transition-all ${
                                        window.IS_LOW_END ? 'opacity-50 cursor-not-allowed bg-black/50 border-white/[0.08] text-slate-500' :
                                        settings.theme === 'space3'
                                            ? 'bg-[#050505]/90 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                                            : 'bg-black/50 border-white/[0.08] text-slate-400 hover:text-white hover:border-white/[0.2]'
                                    }`}
                                    title={window.IS_LOW_END ? (lang === 'pt' ? 'Indisponível em dispositivos móveis/básicos' : 'Unavailable on mobile/basic devices') : ''}
                                >
                                    <div className="flex items-center justify-between font-medium text-xs">
                                        <span className="text-cyan-400">{lang === 'pt' ? 'Espaço 3.0 (Beta)' : 'Space 3.0 (Beta)'}</span>
                                        {settings.theme === 'space3' && <i className="fas fa-check text-[10px] text-cyan-400"></i>}
                                    </div>
                                    <div className="text-[10px] text-slate-400 mt-0.5">
                                        {lang === 'pt' ? 'Galaxy Map 3D & 55k Estrelas' : '3D Galaxy Map & 55k Stars'}
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => !window.IS_LOW_END && onUpdateSetting('theme', 'space2')}
                                    disabled={window.IS_LOW_END}
                                    className={`p-2.5 rounded-lg text-left border transition-all ${
                                        window.IS_LOW_END ? 'opacity-50 cursor-not-allowed bg-black/50 border-white/[0.08] text-slate-500' :
                                        settings.theme === 'space2'
                                            ? 'bg-[#050505]/90 border-violet-500 text-white shadow-sm'
                                            : 'bg-black/50 border-white/[0.08] text-slate-400 hover:text-white hover:border-white/[0.2]'
                                    }`}
                                    title={window.IS_LOW_END ? (lang === 'pt' ? 'Indisponível em dispositivos móveis/básicos' : 'Unavailable on mobile/basic devices') : ''}
                                >
                                    <div className="flex items-center justify-between font-medium text-xs">
                                        <span>{t('settings.themeSpace2')}</span>
                                        {settings.theme === 'space2' && <i className="fas fa-check text-[10px] text-violet-400"></i>}
                                    </div>
                                    <div className="text-[10px] text-slate-400 mt-0.5">
                                        {window.IS_LOW_END ? (lang === 'pt' ? 'Desativado (Hardware Limitado)' : 'Disabled (Hardware Limit)') : t('settings.themeSpace2Sub')}
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => onUpdateSetting('theme', 'space')}
                                    className={`p-2.5 rounded-lg text-left border transition-all ${
                                        settings.theme === 'space'
                                            ? 'bg-[#050505]/90 border-primary text-white shadow-sm'
                                            : 'bg-black/50 border-white/[0.08] text-slate-400 hover:text-white hover:border-white/[0.2]'
                                    }`}
                                >
                                    <div className="flex items-center justify-between font-medium text-xs">
                                        <span>{t('settings.themeSpace')}</span>
                                        {settings.theme === 'space' && <i className="fas fa-check text-[10px] text-primary"></i>}
                                    </div>
                                    <div className="text-[10px] text-slate-400 mt-0.5">
                                        {t('settings.themeSpaceSub')}
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => !window.IS_LOW_END && onUpdateSetting('theme', 'sky2')}
                                    disabled={window.IS_LOW_END}
                                    className={`p-2.5 rounded-lg text-left border transition-all ${
                                        window.IS_LOW_END ? 'opacity-50 cursor-not-allowed bg-black/50 border-white/[0.08] text-slate-500' :
                                        settings.theme === 'sky2'
                                            ? 'bg-[#050505]/90 border-sky-400 text-white shadow-sm'
                                            : 'bg-black/50 border-white/[0.08] text-slate-400 hover:text-white hover:border-white/[0.2]'
                                    }`}
                                    title={window.IS_LOW_END ? (lang === 'pt' ? 'Indisponível em dispositivos móveis/básicos' : 'Unavailable on mobile/basic devices') : ''}
                                >
                                    <div className="flex items-center justify-between font-medium text-xs">
                                        <span>{t('settings.themeSky2')}</span>
                                        {settings.theme === 'sky2' && <i className="fas fa-check text-[10px] text-sky-400"></i>}
                                    </div>
                                    <div className="text-[10px] text-slate-400 mt-0.5">
                                        {window.IS_LOW_END ? (lang === 'pt' ? 'Desativado (Hardware Limitado)' : 'Disabled (Hardware Limit)') : t('settings.themeSky2Sub')}
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => onUpdateSetting('theme', 'sky')}
                                    className={`p-2.5 rounded-lg text-left border transition-all ${
                                        settings.theme === 'sky'
                                            ? 'bg-[#050505]/90 border-sky-400 text-white shadow-sm'
                                            : 'bg-black/50 border-white/[0.08] text-slate-400 hover:text-white hover:border-white/[0.2]'
                                    }`}
                                >
                                    <div className="flex items-center justify-between font-medium text-xs">
                                        <span>{t('settings.themeSky')}</span>
                                        {settings.theme === 'sky' && <i className="fas fa-check text-[10px] text-sky-400"></i>}
                                    </div>
                                    <div className="text-[10px] text-slate-400 mt-0.5">
                                        {t('settings.themeSkySub')}
                                    </div>
                                </button>
                            </div>
                                {settings.theme === 'space2' && !window.IS_LOW_END && (
                                    <div className="flex gap-2 mt-2 w-full">
                                        {[0, 1, 2].map((idx) => (
                                            <button 
                                                key={idx}
                                                type="button"
                                                onClick={() => onUpdateSetting('skyboxIndex', idx)}
                                                className={`flex-1 p-2 rounded text-xs transition-all ${
                                                    (settings.skyboxIndex || 0) === idx 
                                                        ? 'bg-violet-500/20 text-violet-300 border border-violet-500/50 shadow-[0_0_10px_rgba(139,92,246,0.2)]' 
                                                        : 'bg-black/30 text-slate-400 border border-white/5 hover:bg-black/50 hover:text-white'
                                                }`}
                                            >
                                                Nebula {idx + 1}
                                            </button>
                                        ))}
                                    </div>
                                )}


                        </div>
                    </div>

                    {/* SECTION 3: AUDIO & EASTER EGGS */}
                    <div className="space-y-3">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                            {t('settings.sectionAudio')}
                        </div>

                        {/* Music Player */}
                        <div className="py-2 border-b border-slate-800/80">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-slate-200">{t('settings.musicPlayer')}</div>
                                    <div className="text-[11px] text-slate-400 mt-0.5">{t('settings.musicPlayerDesc')}</div>
                                </div>
                                <Toggle
                                    checked={settings.musicPlayer}
                                    onChange={() => onUpdateSetting('musicPlayer', !settings.musicPlayer)}
                                    ariaLabel={t('settings.musicPlayer')}
                                />
                            </div>

                            {/* Subsetting on Music Player: Toggle Auto-Play */}
                            {settings.musicPlayer && (
                                <div className="mt-3 ml-3 pl-3 border-l-2 border-slate-800 flex items-center justify-between py-1.5 transition-all">
                                    <div className="pr-4">
                                        <div className="text-xs font-medium text-slate-300">
                                            {t('settings.musicAutoPlay')}
                                        </div>
                                        <div className="text-[11px] text-slate-400 mt-0.5">
                                            {t('settings.musicAutoPlayDesc')}
                                        </div>
                                    </div>
                                    <Toggle
                                        checked={Boolean(settings.musicAutoPlay)}
                                        onChange={() => onUpdateSetting('musicAutoPlay', !settings.musicAutoPlay)}
                                        ariaLabel={t('settings.musicAutoPlay')}
                                    />
                                </div>
                            )}
                        </div>

                        
                        {/* 3-Channel Audio Volume Sliders */}
                        <div className="py-2.5 border-b border-slate-800/80 space-y-2.5">
                            <div className="font-medium text-slate-200">
                                {lang === 'pt' ? 'Controle de Volume (3 Canais)' : '3-Channel Audio Levels'}
                            </div>
                            <div className="space-y-2">
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                                        <span>Master Volume</span>
                                        <span className="text-cyan-400 font-bold">{settings.masterVolume ?? 40}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={settings.masterVolume ?? 40}
                                        onChange={(e) => onUpdateSetting('masterVolume', parseInt(e.target.value))}
                                        className="w-full accent-cyan-400 h-1 bg-slate-800 rounded-lg cursor-pointer"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                                        <span>Music Volume</span>
                                        <span className="text-cyan-400 font-bold">{settings.musicVolume ?? 40}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={settings.musicVolume ?? 40}
                                        onChange={(e) => onUpdateSetting('musicVolume', parseInt(e.target.value))}
                                        className="w-full accent-cyan-400 h-1 bg-slate-800 rounded-lg cursor-pointer"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                                        <span>SFX Volume</span>
                                        <span className="text-cyan-400 font-bold">{settings.sfxVolume ?? 40}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={settings.sfxVolume ?? 40}
                                        onChange={(e) => onUpdateSetting('sfxVolume', parseInt(e.target.value))}
                                        className="w-full accent-cyan-400 h-1 bg-slate-800 rounded-lg cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Easter Egg Sign */}
                        <div className="flex items-center justify-between py-2 border-b border-slate-800/80">
                            <div>
                                <div className="font-medium text-slate-200">{t('settings.easterSign')}</div>
                                <div className="text-[11px] text-slate-400 mt-0.5">{t('settings.easterSignDesc')}</div>
                            </div>
                            <Toggle
                                checked={settings.easterEggSign}
                                onChange={() => onUpdateSetting('easterEggSign', !settings.easterEggSign)}
                                ariaLabel={t('settings.easterSign')}
                            />
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="px-5 py-3 bg-[#0e1424] border-t border-slate-800 flex items-center justify-between shrink-0">
                    <button
                        type="button"
                        onClick={onResetDefaults}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors p-1"
                    >
                        <i className="fas fa-rotate-left text-[10px]"></i>
                        <span>{t('settings.reset')}</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            <span>{t('settings.savedLocally')}</span>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-3.5 py-1.5 rounded-md bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.1] text-white text-xs font-medium transition-colors"
                        >
                            {t('settings.close')}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

// --- INTERACTIVE TERMINAL CLI (SpetTerm) ---
const TerminalModal = ({ isOpen, onClose, onOpenCV, onOpenEaster, onMusicCommand, activeMusicTrack, onOpenSettings, onOpen3DViewer, onNavigateJournal, initialMessage, isGalaxyMapActive }) => {
    const [history, setHistory] = useState(() => {
        const base = [
            { type: 'system', text: "SpetTerm CLI v2.4 (x86_64-pc-windows-uwp)" },
            { type: 'system', text: "Type 'help' to see all available commands. Press Esc to exit." }
        ];
        if (initialMessage) {
            base.push({ type: 'prompt_special', text: initialMessage });
        }
        return base;
    });
    const [inputVal, setInputVal] = useState('');
    const bottomRef = useRef(null);

    useEffect(() => {
        if (initialMessage) {
            setHistory(prev => {
                if (prev.some(item => item.text === initialMessage)) return prev;
                return [...prev, { type: 'prompt_special', text: initialMessage }];
            });
        }
    }, [initialMessage]);

    useEffect(() => {
        if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    if (!isOpen) return null;

    const handleCommand = (e) => {
        if (e.key !== 'Enter') return;
        const rawCmd = inputVal.trim();
        if (!rawCmd) return;
        const cmd = rawCmd.toLowerCase();
        const cleanCmd = cmd.replace(/['"]/g, '').trim();

        const newHistory = [...history, { type: 'user', text: `> ${inputVal}` }];

        // SPETUNLOCK cheat command (inspired by Black Ops 1 3arc Unlock!)
        if (cleanCmd === 'spetunlock' || cleanCmd === 'spet unlock' || cleanCmd === '/spetunlock' || cleanCmd === '3arc unlock' || cleanCmd === '3arcunlock') {
            const allUnlocked = { delicia: true, solar: true, chicken: true };
            try {
                localStorage.setItem('spet_unlocked_sectors', JSON.stringify(allUnlocked));
            } catch (err) {}
            window.dispatchEvent(new CustomEvent('spet:space3-unlock-all'));
            window.dispatchEvent(new CustomEvent('spet:space3-unlock-sector', { detail: { sector: 'delicia' } }));
            window.dispatchEvent(new CustomEvent('spet:space3-unlock-sector', { detail: { sector: 'solar' } }));
            window.dispatchEvent(new CustomEvent('spet:space3-unlock-sector', { detail: { sector: 'chicken' } }));
            
            if (typeof playCosmicSfx === 'function') playCosmicSfx('discovery');
            
            setHistory(prev => [
                ...prev,
                { type: 'user', text: `> ${inputVal}` },
                { type: 'system', text: ">> PROTOCOLO 3ARC / SPETUNLOCK ATIVADO <<" },
                { type: 'prompt_special', text: "[CHEAT]: Todos os setores de Easter Egg foram desbloqueados e revelados no Galaxy Map! (Sistema Solar, Setor Delícia, Setor das Galinhas)" }
            ]);
            setInputVal('');
            return;
        }

        // Galaxy Map Mode Toggle Command (always opens galaxy map from anywhere)
        if (cleanCmd === 'galaxymap' || cleanCmd === '/galaxymap' || cleanCmd === 'galaxy map' || cleanCmd === '/galaxy map' || cleanCmd === 'space3' || cleanCmd === '/space3') {
            window.dispatchEvent(new CustomEvent('spet:open-galaxy-map'));
            if (typeof playCosmicSfx === 'function') playCosmicSfx('warp');
            onClose();
            return;
        }

        // If Galaxy Map is currently active, secret commands teleport immediately inside the 3D map!
        if (isGalaxyMapActive) {
            if (cleanCmd === 'more! chicken' || cleanCmd === 'more chicken' || cleanCmd === '/more! chicken' || cleanCmd === '/more chicken' || cleanCmd === 'chicken' || cleanCmd === '/chicken') {
                window.dispatchEvent(new CustomEvent('spet:space3-unlock-sector', { detail: { sector: 'chicken' } }));
                window.dispatchEvent(new CustomEvent('spet:space3-jump', { detail: { sector: 'chicken' } }));
                onClose();
                return;
            }
            if (cleanCmd === 'mars' || cleanCmd === '/mars' || cleanCmd === 'marte' || cleanCmd === '/marte' || cleanCmd === 'doom mars' || cleanCmd === 'uac mars') {
                window.dispatchEvent(new CustomEvent('spet:space3-jump', { detail: { sector: 'solar' } }));
                onClose();
                return;
            }
            if (cleanCmd === 'delicia' || cleanCmd === '/delicia' || cleanCmd === 'delícia' || cleanCmd === '/delícia' || cleanCmd === 'jailson' || cleanCmd === '/jailson' || cleanCmd === 'suco de laranja') {
                window.dispatchEvent(new CustomEvent('spet:space3-unlock-sector', { detail: { sector: 'delicia' } }));
                window.dispatchEvent(new CustomEvent('spet:space3-jump', { detail: { sector: 'delicia' } }));
                onClose();
                return;
            }
        }


        // Chicken easter egg command
        if (cleanCmd === 'chicken' || cleanCmd === 'chicken!' || cleanCmd === 'space_chicken' || cleanCmd === 'space_chicken!' || cleanCmd === 'space chicken' || cleanCmd === 'space chicken!') {
            const nextState = !window.__spetChickenActive;
            window.__spetChickenActive = nextState;
            window.dispatchEvent(new CustomEvent('spet:chicken-toggle', { detail: { enabled: nextState } }));
            
            // Play retro chicken squawk synth
            try {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) {
                    const ctx = new AudioCtx();
                    const now = ctx.currentTime;
                    [0, 0.12].forEach((offset, idx) => {
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.type = 'sawtooth';
                        osc.frequency.setValueAtTime(idx === 0 ? 580 : 720, now + offset);
                        osc.frequency.exponentialRampToValueAtTime(idx === 0 ? 280 : 240, now + offset + 0.08);
                        gain.gain.setValueAtTime(0.18, now + offset);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.08);
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.start(now + offset);
                        osc.stop(now + offset + 0.09);
                    });
                }
            } catch(err) {}

            if (nextState) {
                newHistory.push({
                    type: 'output',
                    text: `[🚀🐔 SPACE CHICKEN PROTOCOL ENGAGED! 🐔🚀]
   \\
    \\   🐔
     \\  (o>
     \\\\_//)
      \\_/_)
       _|_

BWAAAWK! Cosmic anomaly engaged!
All cosmic asteroids in the 3D space background have transformed into Space Chickens!
Look at the deep space canvas — interstellar chickens are now tumbling through the void!

Quick Commands:
• Type 'MORE' for critical poultry overload (spinning Chicken Moon)!
• Type 'chicken!' again to restore the asteroid field.
• Type 'preview chicken' to inspect the Space Chicken in the 3D viewer.`
                });
            } else {
                window.__spetMoonChickenActive = false;
                window.dispatchEvent(new CustomEvent('spet:moon-chicken-toggle', { detail: { enabled: false } }));
                newHistory.push({
                    type: 'output',
                    text: `[🪨 Asteroids & Moon Restored]
Space chickens safely returned to the coop. Classic asteroid field and lunar orbit resumed.`
                });
            }
            setHistory(newHistory);
            setInputVal('');
            return;
        }

        // MORE command (Mega Spinning Moon Chicken easter egg)
        if (cleanCmd === 'more' || cleanCmd === 'more!') {
            if (!window.__spetChickenActive) {
                newHistory.push({
                    type: 'error',
                    text: `[!] Access Denied: Poultry threshold not met! You must enable 'chicken!' first before requesting MORE!`
                });
                setHistory(newHistory);
                setInputVal('');
                return;
            }

            const nextMoonState = !window.__spetMoonChickenActive;
            window.__spetMoonChickenActive = nextMoonState;
            window.dispatchEvent(new CustomEvent('spet:moon-chicken-toggle', { detail: { enabled: nextMoonState } }));

            // Dramatic mega chicken screech audio
            try {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) {
                    const ctx = new AudioCtx();
                    const now = ctx.currentTime;
                    [0, 0.1, 0.22, 0.35].forEach((offset, idx) => {
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.type = 'sawtooth';
                        const freqs = [320, 480, 720, 960];
                        osc.frequency.setValueAtTime(freqs[idx], now + offset);
                        osc.frequency.exponentialRampToValueAtTime(freqs[idx] * 0.55, now + offset + 0.14);
                        gain.gain.setValueAtTime(0.24, now + offset);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.14);
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.start(now + offset);
                        osc.stop(now + offset + 0.16);
                    });
                }
            } catch(err) {}

            if (nextMoonState) {
                newHistory.push({
                    type: 'output',
                    text: `[🌕🐔 CRITICAL OVERLOAD: THE MOON IS NOW A SPINNING MEGA CHICKEN! 🐔🌕]
   \\
    \\   🐔  *BWAAAAAAAWK!!*
     \\  (O>
     \\\\_//)
      \\_/_)
       _|_

LUNAR GRAVITATIONAL EQUILIBRIUM COLLAPSED!
The Moon has transformed into a colossal, rapidly spinning Celestial Space Chicken!
Look up at the upper-right sky to witness the cosmic Mega-Chicken in full rotation!

Commands:
• Type 'more' again to restore the natural lunar orb.
• Type 'chicken!' to reset the entire asteroid field and moon.`
                });
            } else {
                newHistory.push({
                    type: 'output',
                    text: `[🌕 Moon Restored]
Celestial Mega-Chicken recalled. Natural lunar orbit and gravitational tides restored.`
                });
            }
            setHistory(newHistory);
            setInputVal('');
            return;
        }

        // Secret DELICIA DOOM Easter Egg Command (NOT listed in 'help' command)
        const isDeliciaDoom = (
            cleanCmd === 'delicia doom' ||
            cleanCmd === 'delicia doom!' ||
            cleanCmd === 'delícia doom' ||
            cleanCmd === 'delícia doom!' ||
            cleanCmd === 'doom delicia' ||
            cleanCmd === 'doom delícia' ||
            cleanCmd === 'deliciadoom' ||
            cleanCmd === 'jailson doom' ||
            cleanCmd === 'doom jailson' ||
            cleanCmd === 'doomjaja'
        );

        if (isDeliciaDoom) {
            onOpenEaster('delicia_doom');
            onClose();
            return;
        }

        // Secret DELICIA Easter Egg Command (NOT listed in 'help' command)
        const isDelicia = (
            cleanCmd === 'delicia' || 
            cleanCmd === 'delicia!' || 
            cleanCmd === 'delícia' || 
            cleanCmd === 'delícia!' || 
            cleanCmd === 'que delicia' || 
            cleanCmd === 'que delícia' || 
            cleanCmd === 'que delicia!' || 
            cleanCmd === 'que delícia!' || 
            cleanCmd === 'ai que delicia' || 
            cleanCmd === 'ai que delícia' ||
            cleanCmd === 'ai que delicia!' || 
            cleanCmd === 'ai que delícia!' ||
            cleanCmd === 'jailson' ||
            cleanCmd === 'jailson mendes' ||
            cleanCmd === 'suco de laranja'
        );

        if (isDelicia) {
            const nextDeliciaState = !window.__spetDeliciaActive;
            window.__spetDeliciaActive = nextDeliciaState;
            window.dispatchEvent(new CustomEvent('spet:delicia-toggle', { detail: { enabled: nextDeliciaState } }));

            // Fun triumphant chord synth
            try {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) {
                    const ctx = new AudioCtx();
                    const now = ctx.currentTime;
                    [0, 0.12, 0.24].forEach((offset, idx) => {
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.type = 'triangle';
                        const freqs = [440, 554.37, 659.25]; // A major
                        osc.frequency.setValueAtTime(freqs[idx], now + offset);
                        gain.gain.setValueAtTime(0.22, now + offset);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.22);
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.start(now + offset);
                        osc.stop(now + offset + 0.24);
                    });
                }
            } catch(err) {}

            if (nextDeliciaState) {
                newHistory.push({
                    type: 'output',
                    text: `[🍊 AI QUE DELÍCIA, CARA! 🍊]
   \\
    \\   ( ͡° ͜ʖ ͡°)  *ERA ESSA A PEÇA QUE VOCÊ QUERIA?*

SUCO DE LARANJA PROTOCOL ENGAGED!
• A Lua transformou-se no lendário Jailson Mendes!
• O cinturão de asteroides transformou-se em laranjas espaciais 3D!
• Trilha sonora relaxante iniciada em looping no fundo.

Comandos secretos:
• Digite 'delicia' novamente para desativar e restaurar a órbita lunar.
• Digite 'delicia doom' para jogar DELICIA DOOM (Total Conversion) no navegador!
• Digite 'preview jailson' ou 'preview orange' para inspecionar os modelos 3D.`
                });
            } else {
                newHistory.push({
                    type: 'output',
                    text: `[🌕 Gravidade & Órbita Lunar Restauradas]
O suco de laranja acabou! A lua e os asteroides retornaram à órbita natural. Trilha sonora finalizada.`
                });
            }
            setHistory(newHistory);
            setInputVal('');
            return;
        }

        // Secret MARS Easter Egg Command (NOT listed in 'help' command)
        const isMarsCmd = (
            cleanCmd === 'mars' ||
            cleanCmd === 'mars!' ||
            cleanCmd === 'marte' ||
            cleanCmd === 'marte!' ||
            cleanCmd === 'doom mars' ||
            cleanCmd === 'uac mars'
        );

        if (isMarsCmd) {
            const nextMarsState = !window.__spetMarsActive;
            window.__spetMarsActive = nextMarsState;
            window.dispatchEvent(new CustomEvent('spet:mars-toggle', { detail: { enabled: nextMarsState } }));

            // E1M1-inspired low sawtooth power riff synth
            try {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) {
                    const ctx = new AudioCtx();
                    const now = ctx.currentTime;
                    const notes = [82.41, 82.41, 164.81, 82.41, 82.41, 146.83]; // E2, E2, E3, E2, E2, D3
                    notes.forEach((freq, idx) => {
                        const offset = idx * 0.11;
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.type = 'sawtooth';
                        osc.frequency.setValueAtTime(freq, now + offset);
                        gain.gain.setValueAtTime(0.22, now + offset);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.1);
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.start(now + offset);
                        osc.stop(now + offset + 0.105);
                    });
                }
            } catch (err) {}

            if (nextMarsState) {
                newHistory.push({
                    type: 'output',
                    text: `[🔴 UAC MARS TELEMETRY ONLINE — RIP AND TEAR! 🔴]
============================================================
• PLANETARY SHIFT : A Lua transformou-se em MARTE com Phobos e Deimos em órbita!
• SECTOR EARTH    : A TERRA (com a Lua orbitando) surgiu no setor direito!
• TETHER UNIT     : O astronauta do foguete transformou-se no DOOM SLAYER!

[🎮 INTERACTIVE ORBITAL LAUNCHERS (UZDoom WebAssembly)]:
• Clique em PHOBOS (lua de Marte) ➔ Inicia DOOM (E1M1: Hangar)
• Clique em DEIMOS (lua de Marte) ➔ Inicia DOOM (E2M1: Deimos Anomaly)
• Clique na TERRA (setor direito) ➔ Inicia DOOM II: Hell on Earth (MAP01)
  (Os IWADs são baixados sob demanda e salvos no cache IndexedDB do navegador)

Comandos extras:
• Digite 'mars' novamente para desativar e restaurar a órbita lunar.
• Digite 'preview slayer' para inspecionar o modelo 3D do Doom Slayer.`
                });
            } else {
                newHistory.push({
                    type: 'output',
                    text: `[🌕 UAC Mars Telemetry Offline]
Órbita lunar padrão e astronauta restaurados.`
                });
            }
            setHistory(newHistory);
            setInputVal('');
            return;
        }

        // Preview chicken / 3d models command
        const previewModelMatch = cleanCmd.match(/^(?:preview|model|3d)\s+([a-z0-9_!-]+)$/) || cleanCmd.match(/^([a-z0-9_!-]+)\s+(?:preview|model|3d)$/);
        if (previewModelMatch) {
            const target = previewModelMatch[1].replace(/!/g, '');
            const modelMap = {
                chicken: 'chicken',
                space_chicken: 'chicken',
                galinha: 'chicken',
                jailson: 'jailson',
                delicia: 'jailson',
                orange: 'orange',
                laranja: 'orange',
                suco: 'orange',
                cop: 'cop',
                police: 'cop',
                policial: 'cop',
                moon_test: 'moon_test',
                moontest: 'moon_test',
                moon: 'moon_test',
                lua: 'moon_test',
                jet: 'jet',
                para: 'para',
                paratrooper: 'para',
                rocket: 'rocket',
                astro: 'astro',
                astronaut: 'astro',
                slayer: 'slayer',
                doomslayer: 'slayer',
                doom_slayer: 'slayer',
                doomguy: 'slayer'
            };
            const selectedModelId = modelMap[target] || 'jet';
            if (onOpen3DViewer) onOpen3DViewer(selectedModelId);
            onClose();
            return;
        }

        // Check for music easter egg command
        if (cleanCmd === 'music' || cleanCmd.startsWith('music ') || cleanCmd === 'ost' || cleanCmd === 'ff' || cleanCmd === 'cod') {
            const parts = cleanCmd.split(' ');
            let sub = parts[1] || '';
            if (cleanCmd === 'ff') sub = 'ff';
            if (cleanCmd === 'cod') sub = 'cod';
            if (!sub && (cleanCmd === 'music' || cleanCmd === 'ost')) sub = 'play';

            if (sub === 'ff') {
                const track = onMusicCommand ? onMusicCommand('ff') : null;
                newHistory.push({
                    type: 'output',
                    text: `[AUDIO // FF BATTLE OST INITIALIZED]
▶ Playing: "${track ? track.title : 'Those Who Fight Further (Fight On!)'}"
Game: ${track ? track.game : 'Final Fantasy VII'} (${track ? track.year : '1997'})
Composer: ${track ? track.composer : 'Nobuo Uematsu'}
Track [${(track?.index ?? 0) + 1}/15] · Playlist: Final Fantasy Battle OST
CLI Controls: 'music next', 'music prev', 'music random', 'music cod', 'music list'`
                });
            } else if (sub === 'cod') {
                const track = onMusicCommand ? onMusicCommand('cod') : null;
                newHistory.push({
                    type: 'output',
                    text: `[AUDIO // COD MENU OST INITIALIZED]
▶ Playing: "${track ? track.title : 'Multiplayer Theme'}"
Game: ${track ? track.game : 'Call of Duty: Black Ops 4'} (${track ? track.year : '2018'})
Composer: ${track ? track.composer : 'Jack Wall'}
Track [${(track?.index ?? 0) + 1}/7] · Playlist: Call of Duty Menu OST
CLI Controls: 'music next', 'music prev', 'music random', 'music ff', 'music list'`
                });
            } else if (sub === 'toggle') {
                const track = onMusicCommand ? onMusicCommand('togglePlaylist') : null;
                const isCod = track?.playlist === 'cod';
                newHistory.push({
                    type: 'output',
                    text: `[AUDIO] Switched Playlist to: ${isCod ? 'COD Menu OST' : 'FF Battle OST'}
▶ Playing: "${track ? track.title : ''}" (${track ? track.game : ''} - ${track ? track.composer : ''})`
                });
            } else if (sub === 'list') {
                newHistory.push({
                    type: 'output',
                    text: `OST Jukebox Playlists (FF Battle OST & COD Menu OST)

=== [FF BATTLE OST (15 Tracks)] ===
[1]  Those Who Fight Further (Fight On!) - Final Fantasy VII (1997)
[2]  The Decisive Battle (決戦) - Final Fantasy VI (1994)
[3]  Boss Battle Theme - Final Fantasy IV DS (2007)
[4]  Mysterious Girl Battle Theme - Final Fantasy IV: The After Years (2008)
[5]  Worlds Collide - Final Fantasy XIII-2 (2011)
[6]  Battle Theme B - Final Fantasy II Pixel Remaster (2021)
[7]  Paradigm Shift - Final Fantasy XIII-2 (2011)
[8]  Battle Theme (Normal Battle) - Final Fantasy X (2001)
[9]  Limit Break! - Final Fantasy XIII-2 (2011)
[10] One-Winged Angel (片翼の天使) - Final Fantasy VII (1997)
[11] Let the Battles Begin! (Those Who Fight) - Final Fantasy VII (1997)
[12] Battle on the Big Bridge - Final Fantasy V Pixel Remaster (2021)
[13] Knight of the Goddess - Final Fantasy XIII-2 (2011)
[14] Otherworld - Final Fantasy X (2001)
[15] Battle 2 (Boss Theme) - Final Fantasy V (1992)

=== [COD MENU OST (7 Tracks)] ===
[1]  Multiplayer Theme - Call of Duty: Black Ops 4 (2018)
[2]  Main Theme - Call of Duty: Black Ops II (2012)
[3]  Adrenaline (Multiplayer Menu) - Call of Duty: Black Ops II (2012)
[4]  Rising Tide (Multiplayer Remastered) - Call of Duty: Black Ops Cold War (2020)
[5]  Menu Intro (Brave Soldat) - Call of Duty: World at War (2008)
[6]  Cold War (Main Theme) - Call of Duty: Black Ops Cold War (2020)
[7]  Infinite Warfare (Main Theme) - Call of Duty: Infinite Warfare (2016)

Commands: 'music ff', 'music cod', 'music toggle', 'music next', 'music prev', 'music random', 'music stop'`
                });
            } else if (sub === 'stop' || sub === 'pause') {
                if (onMusicCommand) onMusicCommand('stop');
                newHistory.push({
                    type: 'output',
                    text: `[AUDIO] OST playback stopped.`
                });
            } else if (sub === 'next') {
                const nextTrack = onMusicCommand ? onMusicCommand('next') : null;
                const totalTracks = nextTrack?.playlist === 'cod' ? 7 : 15;
                const badge = nextTrack?.playlist === 'cod' ? '[COD]' : '[FF]';
                newHistory.push({
                    type: 'output',
                    text: nextTrack
                        ? `[AUDIO] ${badge} Next Track [${nextTrack.index + 1}/${totalTracks}]: "${nextTrack.title}" (${nextTrack.game} - ${nextTrack.composer})`
                        : `[AUDIO] Switched to next track.`
                });
            } else if (sub === 'prev') {
                const prevTrack = onMusicCommand ? onMusicCommand('prev') : null;
                const totalTracks = prevTrack?.playlist === 'cod' ? 7 : 15;
                const badge = prevTrack?.playlist === 'cod' ? '[COD]' : '[FF]';
                newHistory.push({
                    type: 'output',
                    text: prevTrack
                        ? `[AUDIO] ${badge} Previous Track [${prevTrack.index + 1}/${totalTracks}]: "${prevTrack.title}" (${prevTrack.game} - ${prevTrack.composer})`
                        : `[AUDIO] Switched to previous track.`
                });
            } else if (sub === 'random' || sub === 'shuffle') {
                const randTrack = onMusicCommand ? onMusicCommand('random') : null;
                const totalTracks = randTrack?.playlist === 'cod' ? 7 : 15;
                const badge = randTrack?.playlist === 'cod' ? '[COD]' : '[FF]';
                newHistory.push({
                    type: 'output',
                    text: randTrack
                        ? `[AUDIO:RND] ${badge} Shuffled to Track [${randTrack.index + 1}/${totalTracks}]: "${randTrack.title}" (${randTrack.game} - ${randTrack.composer})`
                        : `[AUDIO:RND] Shuffled to random track.`
                });
            } else {
                // start playing music immediately in minimized dock state
                const track = onMusicCommand ? onMusicCommand('playMinimized', 0) : null;
                const isCod = track?.playlist === 'cod';
                newHistory.push({
                    type: 'output',
                    text: `[AUDIO // ${isCod ? 'COD MENU' : 'FF BATTLE'} OST JUKEBOX ACTIVATED]
▶ Playing: "${track ? track.title : 'Those Who Fight Further (Fight On!)'}"
Game: ${track ? track.game : 'Final Fantasy VII'}
Composer: ${track ? track.composer : 'Nobuo Uematsu'}
YouTube Jukebox initiated (dock player active in background).
Toggle Playlists: 'music ff' or 'music cod'
CLI Controls: 'music next', 'music prev', 'music random', 'music stop', 'music list'`
                });
            }

            setHistory(newHistory);
            setInputVal('');
            return;
        }

        if (cleanCmd === 'fps' || cleanCmd === 'fps on' || cleanCmd === 'fps off' || cleanCmd === 'showfps' || cleanCmd === 'telemetry') {
            const nextFpsState = cleanCmd === 'fps on' ? true : (cleanCmd === 'fps off' ? false : !window.__spetFpsActive);
            window.__spetFpsActive = nextFpsState;
            window.dispatchEvent(new CustomEvent('spet:fps-toggle', { detail: { enabled: nextFpsState } }));
            newHistory.push({
                type: 'output',
                text: nextFpsState
                    ? `[TELEMETRY // FPS & GPU HUD: ENABLED]\nOverlay fixado no canto superior direito (FPS atual, 1% Low / Min 2s, Frame Time ms, Draw Calls WebGL e Seção ativa no scroll).\nDigite 'fps' novamente para ocultar.`
                    : `[TELEMETRY // FPS & GPU HUD: DISABLED]`
            });
            setHistory(newHistory);
            setInputVal('');
            return;
        }

        switch (cleanCmd) {
            case 'help':
                newHistory.push({
                    type: 'output',
                    text: `Available commands:
  help       - List available commands
  about      - Display brief engineer profile
  projects   - Output featured engineering repositories
  skills     - List low-level tech stack
  journal    - Read research papers in Technical Journal
  fps        - Toggle real-time FPS & GPU telemetry HUD (top-right)
  music      - Play OST Jukebox ('music ff' or 'music cod')
  chicken!   - Easter Egg: Transform asteroids into Space Chickens!
  MORE       - (While chicken! active) Turn the Moon into a giant spinning Chicken!
  models     - Open 3D model viewer (or 'preview chicken')
  settings   - Open preferences & configuration panel
  quake      - Launch Quake 1 in browser
  cv         - Open curriculum vitae (resume)
  clear      - Clear terminal screen
  exit       - Close SpetTerm console`
                });
                break;
            case 'about':
                newHistory.push({
                    type: 'output',
                    text: `Eduardo Gelain (SpetDev)
Software & Game Developer · Reverse Engineer
Specialized in C++, C#, Python, Unity & Unreal Engine.
Focus: Low-level systems, GSC VM bytecode injection, UWP sandbox research.`
                });
                break;
            case 'projects':
                newHistory.push({
                    type: 'output',
                    text: `[1] CW-UWP-GSC-Injector (C++ Memory Scanner)
[2] BO1 & BO2 MS Store Clients & GSC Injector (VM Hooking)
[3] GSC Dumps and Pre-Compiled/Uncompiled Sources (T5/T6/IW5 Dumps & Jiggy Menu)
[4] Resurge Client (BO3 Multi-Platform DLL)
[5] Sparky Rush (Steam Commercial QA)
[6] Outcaster (Unity Retro FPS Templates)`
                });
                break;
            case 'skills':
                newHistory.push({
                    type: 'output',
                    text: `Systems: C, C++, Assembly, Win32, UWP/GDK, DLL Hooking
Engines: Unity (C#), Unreal Engine 5 (C++)
Scripting: Python, PowerShell, Electron, Git`
                });
                break;
            case 'settings':
            case 'config':
            case 'preferences':
                if (onOpenSettings) onOpenSettings();
                onClose();
                return;
            case 'quake':
                onOpenEaster('quake');
                onClose();
                return;
            case 'models':
            case 'preview':
            case '3d':
                if (onOpen3DViewer) onOpen3DViewer('chicken');
                onClose();
                return;
            case 'cv':
            case 'resume':
                onOpenCV();
                onClose();
                return;
            case 'clear':
                setHistory([]);
                setInputVal('');
                return;
            case 'journal':
                newHistory.push({
                    type: 'output',
                    text: `Navigating to Technical Journal...`
                });
                if (onNavigateJournal) {
                    onClose();
                    onNavigateJournal();
                }
                break;
            case 'exit':
                onClose();
                return;
            default:
                newHistory.push({
                    type: 'error',
                    text: `Command not found: '${cmd}'. Type 'help' for valid commands.`
                });
                break;
        }

        setHistory(newHistory);
        setInputVal('');
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#050505]/95 backdrop-blur-xl border border-white/[0.12] rounded-xl max-w-xl w-full h-[400px] shadow-2xl flex flex-col overflow-hidden font-mono text-xs">
                
                {/* Header */}
                <div className="h-8 bg-black/60 border-b border-white/[0.08] px-3 flex items-center justify-between text-slate-400">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                        <span className="ml-2 text-[11px] text-slate-300">spet_console.exe</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {activeMusicTrack && (
                            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[10px]">
                                <i className="fas fa-music text-[9px] animate-pulse"></i>
                                <span className="truncate max-w-[150px]">{activeMusicTrack.title}</span>
                            </div>
                        )}
                        <button onClick={onClose} className="hover:text-white">
                            <i className="fas fa-times text-xs"></i>
                        </button>
                    </div>
                </div>

                {/* History */}
                <div className="flex-1 p-4 overflow-y-auto space-y-1.5 text-slate-300">
                    {history.map((h, idx) => (
                        <div key={idx} className={`${h.type === 'error' ? 'text-rose-400' : h.type === 'user' ? 'text-primary font-bold' : h.type === 'prompt_special' ? 'text-orange-400 font-bold pt-1' : h.type === 'system' ? 'text-slate-500' : 'text-slate-300'} whitespace-pre-wrap`}>
                            {h.text}
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                {/* Input Prompt */}
                <div className="p-2.5 bg-[#03050a] border-t border-white/[0.08] flex items-center gap-2">
                    <span className="text-primary font-bold">&gt;</span>
                    <input
                        type="text"
                        autoFocus
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={handleCommand}
                        placeholder="Type 'help'..."
                        className="flex-1 bg-transparent text-white focus:outline-none placeholder-slate-600"
                    />
                </div>

            </div>
        </div>
    );
};

// --- COMPANION MASCOT CHATBOT (ASTRO) ---
const MascotCompanion = ({ isOpen, setIsOpen, lang, disableWelcome = false, onToggleWelcome }) => {
    // Welcome message toggle setting persisted in localStorage
    const [welcomeEnabled, setWelcomeEnabled] = useState(() => {
        if (disableWelcome) return false;
        try {
            const saved = localStorage.getItem('astro_welcome_enabled');
            return saved !== null ? saved === 'true' : true;
        } catch (e) {
            return true;
        }
    });
    const [showTeaser, setShowTeaser] = useState(() => {
        if (disableWelcome) return false;
        try {
            const saved = localStorage.getItem('astro_welcome_enabled');
            return saved !== null ? saved === 'true' : true;
        } catch (e) {
            return true;
        }
    });
    const [showSettings, setShowSettings] = useState(false);
    const [settingToast, setSettingToast] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasUnread, setHasUnread] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        const isEnabled = !disableWelcome;
        setWelcomeEnabled(isEnabled);
        if (!isEnabled) {
            setShowTeaser(false);
        }
    }, [disableWelcome]);

    const getInitialGreeting = (l, isEnabled = true) => {
        if (!isEnabled) {
            return {
                id: 'init-minimal',
                role: 'model',
                text: l === 'pt'
                    ? "[ASTRO // ONLINE] Modo de inicialização silenciosa ativo. Como posso ajudar a explorar a arquitetura e projetos do portfólio?"
                    : "[ASTRO // ONLINE] Silent startup active. How can I assist you with inspecting the architecture and projects?",
                isMinimal: true,
                reaction: null,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
        }
        if (l === 'pt') {
            return {
                id: 'init-full',
                role: 'model',
                text: "[ASTRO // TECHNICAL COMPANION]\n\nAssistente de navegação técnica de Eduardo Gelain. Escolha uma das consultas rápidas ou digite sua dúvida:\n- [TL;DR Recrutador]: Resumo executivo, proficiência de baixo nível, impacto comercial em QA e soft skills\n- [Game Dev]: Arquitetura Unity/C#, netcode multiplayer e projetos comerciais (Outcaster, Sparky Rush)\n- [Engenharia Reversa]: Injeção de DLLs, exploração de sandboxes UWP/GDK e modding de jogos\n- [Contato & Disponibilidade]: Canais diretos e status para contratação\n\nComo posso ajudar?",
                reaction: null,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
        } else {
            return {
                id: 'init-full',
                role: 'model',
                text: "[ASTRO // TECHNICAL COMPANION]\n\nTechnical navigation assistant for Eduardo Gelain's portfolio. Select a quick query or ask directly:\n- [Recruiter TL;DR]: Executive summary, low-level tooling proficiency, commercial QA record, and architecture\n- [Game Dev]: Unity/C# systems, multiplayer netcode, and published titles (Outcaster, Sparky Rush)\n- [Reverse Engineering]: DLL injection, UWP/GDK sandboxing, and binary decompilation\n- [Contact & Availability]: Direct communication channels and hiring availability\n\nHow can I assist your search?",
                reaction: null,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
        }
    };

    useEffect(() => {
        if (messages.length === 0) {
            setMessages([getInitialGreeting(lang, welcomeEnabled)]);
        }
    }, [lang, welcomeEnabled]);

    useEffect(() => {
        if (isOpen) {
            setShowTeaser(false);
            setHasUnread(false);
            setTimeout(() => {
                chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [isOpen]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const handleToggleWelcome = (newVal) => {
        setWelcomeEnabled(newVal);
        try {
            localStorage.setItem('astro_welcome_enabled', newVal ? 'true' : 'false');
        } catch (e) {}

        if (onToggleWelcome) {
            onToggleWelcome(!newVal);
        }

        if (!newVal) {
            setShowTeaser(false);
            setSettingToast(lang === 'pt' ? 'Mensagem de boas-vindas inicial desativada' : 'Initial welcome message disabled');
            if (messages.length === 1 && !messages[0].isMinimal) {
                setMessages([getInitialGreeting(lang, false)]);
            }
        } else {
            setShowTeaser(true);
            setSettingToast(lang === 'pt' ? 'Mensagem de boas-vindas inicial reativada' : 'Initial welcome message re-enabled');
            if (messages.length === 0 || (messages.length === 1 && messages[0].isMinimal)) {
                setMessages([getInitialGreeting(lang, true)]);
            }
        }

        setTimeout(() => {
            setSettingToast(null);
        }, 3500);
    };

    // Quick feedback: Thumbs up / Thumbs down
    const handleReaction = (msgId, reactionType) => {
        setMessages(prev => prev.map(m => {
            if (m.id === msgId) {
                const nextReaction = m.reaction === reactionType ? null : reactionType;
                const feedbackNotice = nextReaction === 'up'
                    ? (lang === 'pt' ? 'Obrigado pelo feedback!' : 'Thanks for the feedback!')
                    : nextReaction === 'down'
                    ? (lang === 'pt' ? 'Feedback registrado!' : 'Feedback noted!')
                    : null;
                return {
                    ...m,
                    reaction: nextReaction,
                    feedbackNotice
                };
            }
            return m;
        }));
    };

    const handleSend = async (userText) => {
        const textToSend = userText || input.trim();
        if (!textToSend || loading) return;

        const userMsg = {
            id: Date.now(),
            role: 'user',
            text: textToSend,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const updatedHistory = [...messages, userMsg];
        setMessages(updatedHistory);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('https://journal.gelain15mj.workers.dev/api/mascot/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: updatedHistory.map(m => ({ role: m.role, text: m.fullText || m.text })),
                    language: lang
                })
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || ('HTTP ' + res.status));
            }

            const data = await res.json();
            const fullReply = data.reply || (lang === 'pt' ? 'Desculpe, não consegui obter resposta.' : 'Sorry, could not get a response.');
            const msgId = Date.now();

            setLoading(false);

            // Set up message with typing animation and reaction support
            const botMsg = {
                id: msgId,
                role: 'model',
                text: '',
                fullText: fullReply,
                isTyping: true,
                isNew: true,
                reaction: null,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setMessages([...updatedHistory, botMsg]);
            if (!isOpen) setHasUnread(true);

            // Subtle progressive typewriter streaming effect
            let charIndex = 0;
            const step = Math.max(3, Math.floor(fullReply.length / 80));
            const timer = setInterval(() => {
                charIndex += step;
                if (charIndex >= fullReply.length) {
                    clearInterval(timer);
                    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: fullReply, isTyping: false } : m));
                } else {
                    const partial = fullReply.slice(0, charIndex);
                    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: partial } : m));
                }
            }, 18);

        } catch (err) {
            console.error('Mascot chat error:', err);
            setLoading(false);
            const errorMsg = {
                id: Date.now(),
                role: 'model',
                text: lang === 'pt' 
                    ? ('⚠️ Erro de conexão com o Mascot: ' + err.message + '. Verifique a conexão e tente novamente.')
                    : ('⚠️ Connection error with Mascot: ' + err.message + '. Please check connection and try again.'),
                isError: true,
                reaction: null,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...updatedHistory, errorMsg]);
        }
    };

    const handleClearChat = () => {
        setMessages([getInitialGreeting(lang, welcomeEnabled)]);
    };

    const renderMarkdown = (text) => {
        try {
            if (window.marked && window.DOMPurify) {
                return { __html: window.DOMPurify.sanitize(window.marked.parse(text, { breaks: true, gfm: true })) };
            }
        } catch (e) {}
        return { __html: text.replace(/\n/g, '<br/>') };
    };

    const quickQuestions = lang === 'pt' ? [
        { label: '[TL;DR] Perfil Recrutador', prompt: 'Você pode me dar um resumo executivo (TL;DR) das qualificações de Eduardo Gelain para vagas de Software / Game Dev?' },
        { label: '[DEV] Unity & Game Dev', prompt: 'Quais são os principais projetos de desenvolvimento de jogos do Eduardo e suas competências em Unity e Netcode?' },
        { label: '[RE] Engenharia Reversa', prompt: 'Explique a experiência do Eduardo em Engenharia Reversa, injeção de DLLs e sandbox UWP/GDK.' },
        { label: '[QA] Histórico Comercial', prompt: 'Como foi a experiência do Eduardo como QA em lançamentos comerciais na Steam?' },
        { label: '[NET] Contato & Disponibilidade', prompt: 'Como posso entrar em contato com o Eduardo para uma entrevista ou oportunidade?' }
    ] : [
        { label: '[TL;DR] Recruiter Summary', prompt: 'Can you give me an executive TL;DR summary of Eduardo Gelain’s qualifications for Software & Game Developer roles?' },
        { label: '[DEV] Unity & Game Dev', prompt: 'What are Eduardo’s standout game development projects and core Unity/Netcode skills?' },
        { label: '[RE] Reverse Engineering', prompt: 'Explain Eduardo’s experience in Reverse Engineering, DLL injection, and UWP/GDK sandboxes.' },
        { label: '[QA] Commercial QA Impact', prompt: 'What is Eduardo’s track record in Software QA on commercial Steam releases?' },
        { label: '[NET] Contact & Availability', prompt: 'How can I contact Eduardo for an interview or project opportunity?' }
    ];

    return (
        <div className="z-50 select-none">
            {/* Mascot Floating Toggle Button & Welcome Teaser */}
            <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-2">
                {!isOpen && welcomeEnabled && showTeaser && (
                    <div className="relative max-w-xs p-3.5 bg-[#050505]/95 border border-cyan-500/40 text-slate-200 text-xs rounded-2xl shadow-xl shadow-cyan-950/50 animate-fade-in">
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowTeaser(false); }}
                            className="absolute top-2 right-2 text-slate-400 hover:text-white transition-colors"
                            aria-label="Close message"
                            title={lang === 'pt' ? 'Fechar por enquanto' : 'Dismiss for now'}
                        >
                            <i className="fas fa-times text-[10px]"></i>
                        </button>
                        <div className="flex items-start gap-2.5 pr-3">
                            <span className="text-lg">👨‍🚀</span>
                            <div>
                                <div className="font-semibold text-cyan-400 mb-0.5">Astro · Mascot</div>
                                <p className="text-slate-300 leading-snug">
                                    {lang === 'pt' 
                                        ? 'Olá! Recrutador ou dev? Clique aqui para um resumo das minhas habilidades e projetos!' 
                                        : 'Hi! Recruiter or engineer? Click here for an instant breakdown of Eduardo\'s skills & projects!'}
                                </p>
                                <div className="mt-2.5 pt-2 border-t border-white/[0.08] flex items-center justify-between">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleToggleWelcome(false);
                                        }}
                                        title={lang === 'pt' ? 'Desativar aviso inicial de boas-vindas' : 'Disable initial welcome message'}
                                        className="text-[10px] text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                                    >
                                        <i className="fas fa-bell-slash text-[9px]"></i>
                                        <span>{lang === 'pt' ? 'Desativar boas-vindas' : 'Disable welcome'}</span>
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(true)}
                                        className="text-[10px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                                    >
                                        <span>{lang === 'pt' ? 'Abrir chat' : 'Open chat'}</span>
                                        <i className="fas fa-arrow-right text-[9px]"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? 'Close Astro Mascot' : 'Open Astro Mascot'}
                    title="Astro - Recruiter & Tech AI Mascot"
                    className={'relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 text-white border-2 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer clickable shadow-xl ' + (
                        isOpen 
                            ? 'border-cyan-400 shadow-cyan-500/40' 
                            : 'border-cyan-500/50 hover:border-cyan-400 shadow-cyan-500/25'
                    )}
                >
                    <span className="absolute -inset-1 rounded-full bg-cyan-500/20 animate-ping opacity-60 pointer-events-none"></span>
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-primary border-2 border-slate-950 shadow-sm shadow-primary/80"></span>

                    {hasUnread && !isOpen && (
                        <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold flex items-center justify-center border border-white">
                            !
                        </span>
                    )}

                    {isOpen ? (
                        <i className="fas fa-times text-xl text-cyan-300 transition-transform"></i>
                    ) : (
                        <div className="relative flex items-center justify-center astro-float">
                            <svg className="w-8 h-8 sm:w-9 sm:h-9 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"/>
                                <rect x="9" y="5" width="6" height="4" rx="2" fill="#00aaff" fillOpacity="0.4" stroke="#38bdf8"/>
                                <path d="M4 11a2 2 0 0 1 2-2h1"/>
                                <path d="M17 9h1a2 2 0 0 1 2 2"/>
                                <path d="M6 14v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4"/>
                                <circle cx="12" cy="16" r="1.5" fill="#38bdf8"/>
                            </svg>
                        </div>
                    )}
                </button>
            </div>

            {/* Mascot Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-4 sm:right-6 w-[94vw] sm:w-[440px] max-h-[82vh] h-[640px] z-50 flex flex-col rounded-2xl bg-[#050505]/95 border border-white/[0.12] shadow-2xl shadow-cyan-950/40 backdrop-blur-xl overflow-hidden">
                    {/* Header */}
                    <div className="px-4 py-3.5 bg-black/60 border-b border-white/[0.1] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
                                <span className="text-lg">👨‍🚀</span>
                                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary border border-slate-950"></span>
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <h3 className="font-bold text-sm text-white tracking-wide">Astro</h3>
                                    <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                        Mascot
                                    </span>
                                </div>
                                <p className="text-[11px] text-slate-400">
                                    {lang === 'pt' ? 'Guia do Portfólio · Gemini 3.1 Flash Lite' : 'Portfolio AI Guide · Gemini 3.1 Flash Lite'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            {/* User-facing Welcome Message Toggle Setting */}
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                title={lang === 'pt' ? 'Configurações de Boas-vindas' : 'Welcome Message Settings'}
                                className={'w-8 h-8 rounded-lg transition-colors flex items-center justify-center text-xs ' + (
                                    showSettings
                                        ? 'text-cyan-300 bg-cyan-500/20 border border-cyan-500/40'
                                        : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                                )}
                                aria-label="Toggle mascot settings"
                            >
                                <i className="fas fa-sliders-h"></i>
                            </button>
                            <button
                                onClick={handleClearChat}
                                title={lang === 'pt' ? 'Reiniciar conversa' : 'Restart chat'}
                                className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors flex items-center justify-center text-xs"
                            >
                                <i className="fas fa-rotate-right"></i>
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                title={lang === 'pt' ? 'Minimizar' : 'Minimize'}
                                className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors flex items-center justify-center text-xs"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>

                    {/* Settings Panel: User-facing toggle setting for initial welcome message */}
                    {showSettings && (
                        <div className="p-3.5 bg-[#050505]/95 border-b border-white/[0.08] text-xs">
                            <div className="flex items-center justify-between mb-2.5">
                                <span className="font-semibold text-white flex items-center gap-1.5 text-xs">
                                    <i className="fas fa-sliders-h text-cyan-400"></i>
                                    {lang === 'pt' ? 'Preferências do Mascote' : 'Mascot Preferences'}
                                </span>
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="text-slate-400 hover:text-white text-xs w-5 h-5 flex items-center justify-center rounded hover:bg-white/[0.05]"
                                    aria-label="Close settings"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>

                            {/* Welcome message toggle row */}
                            <div className="p-2.5 rounded-xl bg-black/60 border border-white/[0.08] flex items-center justify-between gap-3">
                                <div className="flex-1 pr-2">
                                    <div className="font-medium text-slate-200 text-xs flex items-center gap-1.5">
                                        <span>{lang === 'pt' ? 'Mensagem de Boas-vindas Inicial' : 'Initial Mascot Welcome Message'}</span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                                        {lang === 'pt' 
                                            ? 'Exibir balão e saudação automática do Astro ao entrar no portfólio'
                                            : 'Show Astro\'s teaser bubble & automatic greeting when entering portfolio'}
                                    </p>
                                </div>

                                {/* Toggle Switch Button */}
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={welcomeEnabled}
                                    onClick={() => handleToggleWelcome(!welcomeEnabled)}
                                    title={welcomeEnabled 
                                        ? (lang === 'pt' ? 'Clique para desativar' : 'Click to disable') 
                                        : (lang === 'pt' ? 'Clique para reativar' : 'Click to re-enable')}
                                    className={'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ' + (
                                        welcomeEnabled ? 'bg-cyan-500 shadow-sm shadow-cyan-500/50' : 'bg-slate-700'
                                    )}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ' + (
                                            welcomeEnabled ? 'translate-x-5' : 'translate-x-0'
                                        )}
                                    />
                                </button>
                            </div>

                            {/* Status and persistence note */}
                            <div className="mt-2.5 flex items-center justify-between text-[11px] px-0.5 text-slate-400">
                                <span className="flex items-center gap-1.5">
                                    <span className={'w-2 h-2 rounded-full ' + (welcomeEnabled ? 'bg-primary animate-pulse' : 'bg-slate-500')}></span>
                                    <span className="font-medium">
                                        {welcomeEnabled 
                                            ? (lang === 'pt' ? 'Boas-vindas: Ativadas' : 'Welcome Message: Enabled') 
                                            : (lang === 'pt' ? 'Boas-vindas: Desativadas' : 'Welcome Message: Disabled')}
                                    </span>
                                </span>
                                <span className="text-[10px] text-slate-500">
                                    {lang === 'pt' ? 'Salvo no navegador' : 'Saved in browser'}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Setting Toast notification */}
                    {settingToast && (
                        <div className="px-3.5 py-1.5 bg-cyan-950/90 border-b border-cyan-500/40 text-cyan-200 text-[11px] flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                                <i className="fas fa-check-circle text-cyan-400"></i>
                                {settingToast}
                            </span>
                            <button onClick={() => setSettingToast(null)} className="text-cyan-400 hover:text-white">
                                <i className="fas fa-times text-[10px]"></i>
                            </button>
                        </div>
                    )}

                    {/* Quick Suggestion Chips */}
                    <div className="px-3 py-2 bg-black/60 border-b border-white/[0.05] overflow-x-auto flex gap-1.5 scrollbar-none">
                        {quickQuestions.map((q, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSend(q.prompt)}
                                disabled={loading}
                                className="whitespace-nowrap px-2.5 py-1 text-[11px] rounded-lg bg-white/[0.04] hover:bg-cyan-500/15 border border-white/[0.08] hover:border-cyan-500/40 text-slate-300 hover:text-cyan-200 transition-all font-medium disabled:opacity-50"
                            >
                                {q.label}
                            </button>
                        ))}
                    </div>

                    {/* Scrollable Message Thread with dynamic typing transition */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scroll-smooth">
                        {messages.map((m, idx) => (
                            <div
                                key={m.id || idx}
                                className={'flex flex-col ' + (m.role === 'user' ? 'items-end mascot-bubble-user' : 'items-start mascot-bubble-ai' + (m.isNew ? ' new-arrival' : ''))}
                            >
                                <div className="flex items-center gap-2 mb-1 px-1">
                                    <span className="text-[10px] text-slate-500">
                                        {(m.role === 'user' ? (lang === 'pt' ? 'Você' : 'You') : 'Astro')} · {m.time}
                                    </span>
                                    {m.isTyping && (
                                        <span className="text-[10px] text-cyan-400 font-medium animate-pulse flex items-center gap-1">
                                            <i className="fas fa-pen-nib text-[9px]"></i>
                                            <span>{lang === 'pt' ? 'digitando...' : 'typing...'}</span>
                                        </span>
                                    )}
                                </div>
                                <div
                                    onClick={() => {
                                        if (m.isTyping && m.fullText) {
                                            setMessages(prev => prev.map(item => item.id === m.id ? { ...item, text: item.fullText, isTyping: false } : item));
                                        }
                                    }}
                                    title={m.isTyping ? (lang === 'pt' ? 'Clique para concluir digitação instantaneamente' : 'Click to complete typing immediately') : undefined}
                                    className={'relative max-w-[88%] p-3.5 rounded-2xl text-[13px] leading-relaxed transition-all duration-300 cursor-default ' + (
                                        m.role === 'user'
                                            ? 'bg-primary/20 text-white border border-primary/40 rounded-br-sm shadow-md'
                                            : m.isError
                                            ? 'bg-rose-950/40 text-rose-200 border border-rose-500/40 rounded-bl-sm shadow-md'
                                            : 'bg-[#050505]/90 text-slate-200 border border-white/[0.08] rounded-bl-sm shadow-md hover:border-cyan-500/30'
                                    )}
                                >
                                    {m.role === 'model' ? (
                                        <div className="relative">
                                            <div
                                                className="mascot-chat-content"
                                                dangerouslySetInnerHTML={renderMarkdown(m.text || '')}
                                            />
                                            {m.isTyping && (
                                                <span className="mascot-typing-cursor" aria-label="typing"></span>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="whitespace-pre-wrap">{m.text}</div>
                                    )}

                                    {/* Action Bar for AI response: Thumbs up / Thumbs down quick feedback + Copy */}
                                    {m.role === 'model' && !m.isError && !m.isTyping && (
                                        <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between gap-2 text-xs">
                                            <div className="flex items-center gap-1.5">
                                                {/* Thumbs Up Button */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleReaction(m.id, 'up');
                                                    }}
                                                    aria-label={lang === 'pt' ? 'Gostei da resposta' : 'Thumbs up'}
                                                    title={lang === 'pt' ? 'Gostei da resposta (útil)' : 'Helpful response'}
                                                    className={'px-2 py-1 rounded-lg transition-all flex items-center gap-1 text-[11px] ' + (
                                                        m.reaction === 'up'
                                                            ? 'text-emerald-400 bg-emerald-500/15 border border-emerald-500/40 font-medium'
                                                            : 'text-slate-400 hover:text-emerald-300 hover:bg-white/[0.06] border border-transparent'
                                                    )}
                                                >
                                                    <i className={m.reaction === 'up' ? 'fas fa-thumbs-up text-xs' : 'far fa-thumbs-up text-xs'}></i>
                                                    {m.reaction === 'up' && (
                                                        <span className="text-[10px] hidden sm:inline">
                                                            {lang === 'pt' ? 'Útil' : 'Helpful'}
                                                        </span>
                                                    )}
                                                </button>

                                                {/* Thumbs Down Button */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleReaction(m.id, 'down');
                                                    }}
                                                    aria-label={lang === 'pt' ? 'Não gostei da resposta' : 'Thumbs down'}
                                                    title={lang === 'pt' ? 'Não gostei da resposta (não útil)' : 'Unhelpful response'}
                                                    className={'px-2 py-1 rounded-lg transition-all flex items-center gap-1 text-[11px] ' + (
                                                        m.reaction === 'down'
                                                            ? 'text-rose-400 bg-rose-500/15 border border-rose-500/40 font-medium'
                                                            : 'text-slate-400 hover:text-rose-300 hover:bg-white/[0.06] border border-transparent'
                                                    )}
                                                >
                                                    <i className={m.reaction === 'down' ? 'fas fa-thumbs-down text-xs' : 'far fa-thumbs-down text-xs'}></i>
                                                    {m.reaction === 'down' && (
                                                        <span className="text-[10px] hidden sm:inline">
                                                            {lang === 'pt' ? 'Não útil' : 'Unhelpful'}
                                                        </span>
                                                    )}
                                                </button>

                                                {/* Feedback acknowledgment message */}
                                                {m.feedbackNotice && (
                                                    <span className="text-[10px] text-slate-400 animate-fade-in pl-1">
                                                        {m.feedbackNotice}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Copy Button */}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigator.clipboard.writeText(m.fullText || m.text);
                                                    const btn = e.currentTarget;
                                                    btn.innerHTML = '<i class="fas fa-check text-[10px] text-emerald-400"></i> <span class="text-[10px] text-emerald-400">' + (lang === 'pt' ? 'Copiado!' : 'Copied!') + '</span>';
                                                    setTimeout(() => {
                                                        if (btn) btn.innerHTML = '<i class="far fa-copy text-[10px]"></i> <span class="text-[10px]">' + (lang === 'pt' ? 'Copiar' : 'Copy') + '</span>';
                                                    }, 2000);
                                                }}
                                                title={lang === 'pt' ? 'Copiar resposta' : 'Copy response'}
                                                className="text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1 px-1.5 py-1 rounded-md hover:bg-white/[0.06] transition-colors"
                                            >
                                                <i className="far fa-copy text-[10px]"></i>
                                                <span className="text-[10px]">{lang === 'pt' ? 'Copiar' : 'Copy'}</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Subtle Thinking Indicator with Wave Animation */}
                        {loading && (
                            <div className="flex flex-col items-start mascot-bubble-ai">
                                <span className="text-[10px] text-slate-500 mb-1 px-1 flex items-center gap-1">
                                    <span>Astro</span>
                                    <span className="text-cyan-400 font-medium">{lang === 'pt' ? 'formulando resposta...' : 'formulating answer...'}</span>
                                </span>
                                <div className="p-3.5 rounded-2xl rounded-bl-sm bg-[#050505]/95 backdrop-blur-xl border border-cyan-500/40 flex items-center gap-2.5 text-cyan-400 shadow-lg shadow-cyan-950/40">
                                    <div className="flex items-center gap-1.5 py-0.5">
                                        <span className="w-2 h-2 rounded-full bg-cyan-400 typing-dot-1"></span>
                                        <span className="w-2 h-2 rounded-full bg-cyan-400 typing-dot-2"></span>
                                        <span className="w-2 h-2 rounded-full bg-cyan-400 typing-dot-3"></span>
                                    </div>
                                    <span className="text-xs text-slate-300 ml-1">
                                        {lang === 'pt' ? 'Consultando detalhes do portfólio...' : 'Analyzing portfolio details...'}
                                    </span>
                                </div>
                            </div>
                        )}

                        <div ref={chatEndRef} />
                    </div>

                    {/* Input Bar */}
                    <div className="p-3 bg-black/70 backdrop-blur-xl border-t border-white/[0.08]">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend();
                            }}
                            className="flex items-center gap-2"
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={
                                    lang === 'pt'
                                        ? 'Pergunte sobre projetos, C++, Unity ou contratação...'
                                        : 'Ask about projects, C++, Unity, or hiring Eduardo...'
                                }
                                disabled={loading}
                                className="flex-1 bg-black/60 text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-white/[0.12] focus:border-cyan-400 focus:outline-none placeholder-slate-500 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={loading || !input.trim()}
                                aria-label="Send message"
                                className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-cyan-950/50"
                            >
                                <i className="fas fa-paper-plane text-xs"></i>
                            </button>
                        </form>
                        <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500 px-1">
                            <span>{lang === 'pt' ? 'Responde em Português & Inglês' : 'Responds in English & Portuguese'}</span>
                            <span>SpetDev Galaxy</span>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};


// --- EASTER EGG: FINAL FANTASY CLASSIC OST JUKEBOX (CLI "music" COMMAND) ---
const FF_CLASSIC_TRACKS = [
    {
        id: "ZwcvoY4ehOI",
        title: "Those Who Fight Further (Fight On!)",
        originalTitle: "更に闘う者達",
        game: "Final Fantasy VII",
        composer: "Nobuo Uematsu",
        year: "1997",
        duration: "3:33",
        youtubeUrl: "https://youtu.be/ZwcvoY4ehOI"
    },
    {
        id: "WmBPTpvYyIY",
        title: "The Decisive Battle",
        originalTitle: "死闘",
        game: "Final Fantasy VI",
        composer: "Nobuo Uematsu",
        year: "1994",
        duration: "2:44",
        youtubeUrl: "https://youtu.be/WmBPTpvYyIY"
    },
    {
        id: "GEYCGJYwvhM",
        title: "Boss Battle Theme",
        originalTitle: "バトル2",
        game: "Final Fantasy IV (DS)",
        composer: "Nobuo Uematsu",
        year: "2007",
        duration: "3:12",
        youtubeUrl: "https://youtu.be/GEYCGJYwvhM"
    },
    {
        id: "f3ZRtaQzc04",
        title: "Mysterious Girl Battle Theme",
        originalTitle: "謎の少女戦",
        game: "Final Fantasy IV: The After Years",
        composer: "Junya Nakano",
        year: "2008",
        duration: "2:50",
        youtubeUrl: "https://youtu.be/f3ZRtaQzc04"
    },
    {
        id: "FfFM03rYghU",
        title: "Worlds Collide",
        originalTitle: "衝突する世界 (Worlds Collide)",
        game: "Final Fantasy XIII-2",
        composer: "Naoshi Mizuta",
        year: "2011",
        duration: "2:55",
        youtubeUrl: "https://youtu.be/FfFM03rYghU"
    },
    {
        id: "3AwwPKrSlfU",
        title: "Battle Theme B",
        originalTitle: "戦闘シーンB",
        game: "Final Fantasy II (Pixel Remaster)",
        composer: "Nobuo Uematsu",
        year: "2021",
        duration: "3:05",
        youtubeUrl: "https://youtu.be/3AwwPKrSlfU"
    },
    {
        id: "qHS9RW8hLaY",
        title: "Paradigm Shift",
        originalTitle: "Paradigm Shift (パラダイムシフト)",
        game: "Final Fantasy XIII-2",
        composer: "Naoshi Mizuta",
        year: "2011",
        duration: "3:50",
        youtubeUrl: "https://youtu.be/qHS9RW8hLaY"
    },
    {
        id: "aZzQLHdMkQc",
        title: "Battle Theme",
        originalTitle: "Normal Battle (ノーマルバトル)",
        game: "Final Fantasy X",
        composer: "Nobuo Uematsu",
        year: "2001",
        duration: "3:22",
        youtubeUrl: "https://youtu.be/aZzQLHdMkQc"
    },
    {
        id: "YUX3rocJOiQ",
        title: "Limit Break!",
        originalTitle: "Limit Break! (限界突破!)",
        game: "Final Fantasy XIII-2",
        composer: "Shootie HG",
        year: "2011",
        duration: "4:15",
        youtubeUrl: "https://youtu.be/YUX3rocJOiQ"
    },
    {
        id: "mYdf0yqK_Fc",
        title: "One-Winged Angel",
        originalTitle: "片翼の天使",
        game: "Final Fantasy VII",
        composer: "Nobuo Uematsu",
        year: "1997",
        duration: "7:18",
        youtubeUrl: "https://youtu.be/mYdf0yqK_Fc"
    },
    {
        id: "7HV3oyxr0Eg",
        title: "Let the Battles Begin! (Those Who Fight)",
        originalTitle: "闘う者達",
        game: "Final Fantasy VII",
        composer: "Nobuo Uematsu",
        year: "1997",
        duration: "2:47",
        youtubeUrl: "https://youtu.be/7HV3oyxr0Eg"
    },
    {
        id: "czaNPWhil0c",
        title: "Battle on the Big Bridge",
        originalTitle: "ビッグブリッヂの死闘",
        game: "Final Fantasy V (Pixel Remaster)",
        composer: "Nobuo Uematsu",
        year: "2021",
        duration: "2:30",
        youtubeUrl: "https://youtu.be/czaNPWhil0c"
    },
    {
        id: "fePrVezMWaU",
        title: "Knight of the Goddess",
        originalTitle: "女神の騎士",
        game: "Final Fantasy XIII-2",
        composer: "Masashi Hamauzu",
        year: "2011",
        duration: "2:20",
        youtubeUrl: "https://youtu.be/fePrVezMWaU"
    },
    {
        id: "KO6fvJrsTsE",
        title: "Otherworld",
        originalTitle: "Otherworld",
        game: "Final Fantasy X",
        composer: "Nobuo Uematsu & Bill Muir",
        year: "2001",
        duration: "3:15",
        youtubeUrl: "https://youtu.be/KO6fvJrsTsE"
    },
    {
        id: "RlTISk3zyzg",
        title: "Battle 2 (Boss Theme)",
        originalTitle: "バトル2",
        game: "Final Fantasy V",
        composer: "Nobuo Uematsu",
        year: "1992",
        duration: "2:30",
        youtubeUrl: "https://youtu.be/RlTISk3zyzg"
    }
];

// --- COD MENU OST TRACKLIST ---
const COD_MENU_TRACKS = [
    {
        id: "YmKKMsqhLDI",
        title: "Multiplayer Theme",
        originalTitle: "Multiplayer Lobby Theme",
        game: "Call of Duty: Black Ops 4",
        composer: "Jack Wall",
        year: "2018",
        duration: "3:24",
        youtubeUrl: "https://youtu.be/YmKKMsqhLDI"
    },
    {
        id: "M7GC_TaJxMI",
        title: "Main Theme",
        originalTitle: "Black Ops II Theme",
        game: "Call of Duty: Black Ops II",
        composer: "Trent Reznor",
        year: "2012",
        duration: "3:20",
        youtubeUrl: "https://youtu.be/M7GC_TaJxMI"
    },
    {
        id: "XGLYpYoXkWw",
        title: "Adrenaline",
        originalTitle: "Multiplayer Menu Theme",
        game: "Call of Duty: Black Ops II",
        composer: "Jack Wall",
        year: "2012",
        duration: "3:22",
        youtubeUrl: "https://youtu.be/XGLYpYoXkWw"
    },
    {
        id: "rA7o-Tq0V1A",
        title: "Rising Tide",
        originalTitle: "Multiplayer Theme Remastered",
        game: "Call of Duty: Black Ops Cold War",
        composer: "Jack Wall",
        year: "2020",
        duration: "3:04",
        youtubeUrl: "https://youtu.be/rA7o-Tq0V1A"
    },
    {
        id: "M4lB-PAj0l4",
        title: "Menu Intro (Brave Soldat)",
        originalTitle: "World at War Main Menu Theme",
        game: "Call of Duty: World at War",
        composer: "Sean Murray",
        year: "2008",
        duration: "2:45",
        youtubeUrl: "https://youtu.be/M4lB-PAj0l4"
    },
    {
        id: "9FvtJDPJCe8",
        title: "Cold War (Main Theme)",
        originalTitle: "Black Ops Cold War Main Theme",
        game: "Call of Duty: Black Ops Cold War",
        composer: "Jack Wall",
        year: "2020",
        duration: "3:18",
        youtubeUrl: "https://youtu.be/9FvtJDPJCe8"
    },
    {
        id: "osompIOly0Q",
        title: "Infinite Warfare (Main Theme)",
        originalTitle: "Main Menu Soundtrack",
        game: "Call of Duty: Infinite Warfare",
        composer: "Sarah Schachner",
        year: "2016",
        duration: "4:18",
        youtubeUrl: "https://www.youtube.com/watch?v=osompIOly0Q"
    }
];

const OST_PLAYLISTS = {
    ff: {
        id: 'ff',
        name: 'FF Battle OST',
        title: 'Final Fantasy Battle OST',
        shortName: 'FF',
        badge: 'FF BATTLE',
        composerSubtitle: 'Square Enix · Nobuo Uematsu, Naoshi Mizuta, Junya Nakano & Shootie HG',
        icon: 'fa-gem',
        color: 'cyan',
        borderClass: 'border-cyan-500/40',
        activePill: 'bg-cyan-950/90 text-cyan-300 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.25)]',
        inactivePill: 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] border-transparent',
        tagBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
        trackNumberBg: 'bg-cyan-500 text-black',
        trackActiveBorder: 'bg-cyan-950/40 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400/40',
        tracks: FF_CLASSIC_TRACKS
    },
    cod: {
        id: 'cod',
        name: 'COD Menu OST',
        title: 'Call of Duty Menu OST',
        shortName: 'COD',
        badge: 'COD MENU',
        composerSubtitle: 'Activision · Jack Wall, Trent Reznor, Sean Murray & Sarah Schachner',
        icon: 'fa-crosshairs',
        color: 'amber',
        borderClass: 'border-amber-500/40',
        activePill: 'bg-amber-950/90 text-amber-300 border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.25)]',
        inactivePill: 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] border-transparent',
        tagBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        trackNumberBg: 'bg-amber-500 text-black',
        trackActiveBorder: 'bg-amber-950/40 border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/40',
        tracks: COD_MENU_TRACKS
    }
};

const FinalFantasyJukebox = ({
    state,
    onClose,
    onMinimize,
    onExpand,
    onNext,
    onPrev,
    onRandom,
    onSelectTrack,
    onSwitchPlaylist
}) => {
    const iframeRef = React.useRef(null);
    const hasTriggeredNextRef = React.useRef(false);
    const [volume, setVolume] = React.useState(() => {
        try {
            const saved = localStorage.getItem('ff_jukebox_volume');
            return saved !== null ? Math.max(0, Math.min(100, Number(saved))) : 80;
        } catch (e) {
            return 80;
        }
    });
    const [isMuted, setIsMuted] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(true);

    const activePlaylistKey = state.playlist === 'cod' ? 'cod' : 'ff';
    const activePlaylist = OST_PLAYLISTS[activePlaylistKey];
    const trackList = activePlaylist.tracks;
    const currentTrack = trackList[state.trackIndex] || trackList[0];

    // Reset track-ended debounce latch whenever track or playlist changes
    React.useEffect(() => {
        hasTriggeredNextRef.current = false;
    }, [currentTrack.id, activePlaylistKey]);

    const triggerNextTrack = React.useCallback(() => {
        if (!hasTriggeredNextRef.current) {
            hasTriggeredNextRef.current = true;
            if (onNext) onNext();
        }
    }, [onNext]);

    const handleRandomTrack = () => {
        if (onRandom) {
            onRandom();
        } else if (onSelectTrack && trackList.length > 0) {
            let nextIdx = Math.floor(Math.random() * trackList.length);
            if (trackList.length > 1 && nextIdx === state.trackIndex) {
                nextIdx = (nextIdx + 1) % trackList.length;
            }
            onSelectTrack(nextIdx);
        }
    };

    const sendPlayerCommand = React.useCallback((func, args = []) => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage(JSON.stringify({
                event: 'command',
                func: func,
                args: args
            }), '*');
        }
    }, []);

    const registerApi = React.useCallback(() => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            try {
                iframeRef.current.contentWindow.postMessage(JSON.stringify({
                    event: 'listening'
                }), '*');
                iframeRef.current.contentWindow.postMessage(JSON.stringify({
                    event: 'command',
                    func: 'addEventListener',
                    args: ['onStateChange']
                }), '*');
                iframeRef.current.contentWindow.postMessage(JSON.stringify({
                    event: 'command',
                    func: 'addEventListener',
                    args: ['onError']
                }), '*');
            } catch (e) {}
        }
    }, []);

    const handleVolumeChange = (newVal) => {
        const val = Math.max(0, Math.min(100, Number(newVal)));
        setVolume(val);
        if (val > 0 && isMuted) {
            setIsMuted(false);
        }
        try {
            localStorage.setItem('ff_jukebox_volume', val.toString());
        } catch(e) {}
        sendPlayerCommand('setVolume', [val]);
        if (val === 0) {
            sendPlayerCommand('mute');
        } else {
            sendPlayerCommand('unMute');
        }
    };

    const toggleMute = () => {
        if (isMuted) {
            setIsMuted(false);
            sendPlayerCommand('unMute');
            sendPlayerCommand('setVolume', [volume > 0 ? volume : 80]);
        } else {
            setIsMuted(true);
            sendPlayerCommand('mute');
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            sendPlayerCommand('pauseVideo');
            setIsPlaying(false);
        } else {
            sendPlayerCommand('playVideo');
            setIsPlaying(true);
        }
    };

    // Apply volume, mute, and play commands whenever iframe finishes loading
    const handleIframeLoad = () => {
        hasTriggeredNextRef.current = false;
        setIsPlaying(true);
        const activeVol = isMuted ? 0 : volume;
        registerApi();
        sendPlayerCommand('setVolume', [activeVol]);
        if (isMuted) {
            sendPlayerCommand('mute');
        } else {
            sendPlayerCommand('unMute');
        }
        sendPlayerCommand('playVideo');

        // Verification pushes to ensure YouTube JS API is bound once internal player loads
        [300, 700, 1500, 2500].forEach((delay) => {
            setTimeout(() => {
                registerApi();
                sendPlayerCommand('setVolume', [activeVol]);
                if (!isMuted) sendPlayerCommand('unMute');
                sendPlayerCommand('playVideo');
            }, delay);
        });
    };

    // Listen for YouTube player state updates and automatically advance to next track
    React.useEffect(() => {
        if (!state.isActive) return;

        const handleMessage = (e) => {
            try {
                let data = e.data;
                if (typeof data === 'string') {
                    try {
                        data = JSON.parse(data);
                    } catch (err) {
                        return;
                    }
                }
                if (!data || typeof data !== 'object') return;

                // 1. YouTube direct onStateChange event
                if (data.event === 'onStateChange') {
                    const pState = Number(data.info !== undefined ? data.info : data.data);
                    if (pState === 0) { // 0 = ENDED
                        triggerNextTrack();
                    } else if (pState === 1) { // 1 = PLAYING
                        setIsPlaying(true);
                    } else if (pState === 2) { // 2 = PAUSED
                        setIsPlaying(false);
                    }
                }

                // 2. YouTube infoDelivery event (playerState or progress near end)
                if (data.event === 'infoDelivery' && data.info) {
                    if (data.info.playerState !== undefined) {
                        const pState = Number(data.info.playerState);
                        if (pState === 0) {
                            triggerNextTrack();
                        } else if (pState === 1) {
                            setIsPlaying(true);
                        } else if (pState === 2) {
                            setIsPlaying(false);
                        }
                    }

                    // Check currentTime vs duration if provided by infoDelivery
                    const cur = Number(data.info.currentTime);
                    const dur = Number(data.info.duration);
                    if (!isNaN(cur) && !isNaN(dur) && dur > 0 && cur >= dur - 0.75) {
                        triggerNextTrack();
                    }
                }

                // 3. Fallback on error (skip unavailable or region-locked video)
                if (data.event === 'onError') {
                    setTimeout(() => {
                        triggerNextTrack();
                    }, 1500);
                }
            } catch(err) {}
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [state.isActive, triggerNextTrack]);

    // Active polling fallback to ensure tracks never get stuck at the end
    React.useEffect(() => {
        if (!state.isActive) return;

        const interval = setInterval(() => {
            sendPlayerCommand('getPlayerState');
            sendPlayerCommand('getCurrentTime');
            sendPlayerCommand('getDuration');
        }, 1000);

        return () => clearInterval(interval);
    }, [state.isActive, sendPlayerCommand]);

    if (!state.isActive) return null;

    const isCod = activePlaylistKey === 'cod';

    return (
        <>
            {/* Minimized floating dock player */}
            {state.isMinimized && (
                <div className={`fixed bottom-6 left-6 z-50 bg-[#050505]/95 border rounded-xl p-3 shadow-2xl backdrop-blur-xl flex items-center gap-3 text-xs max-w-lg border-l-4 select-none animate-fadeIn ${
                    isCod ? 'border-amber-500/40 border-l-amber-400' : 'border-white/[0.12] border-l-cyan-400'
                }`}>
                    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 shadow-inner overflow-hidden relative ${
                        isCod ? 'bg-amber-950/70 border-amber-500/30 text-amber-400' : 'bg-cyan-950/70 border-cyan-500/30 text-cyan-400'
                    }`}>
                        <img src={`https://img.youtube.com/vi/${currentTrack.id}/default.jpg`} className="w-full h-full object-cover opacity-80" alt="thumbnail" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <i className={`fas fa-compact-disc ${isPlaying ? 'fa-spin' : ''} text-white drop-shadow-md text-base`} style={{ animationDuration: '4s' }}></i>
                        </div>
                    </div>
                    <div className="overflow-hidden min-w-0 flex-1">
                        <div className="font-bold text-white truncate flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? (isCod ? 'bg-amber-400 animate-ping' : 'bg-cyan-400 animate-ping') : 'bg-slate-500'}`}></span>
                            <span className="truncate">{currentTrack.title}</span>
                            <button
                                type="button"
                                onClick={() => onSwitchPlaylist && onSwitchPlaylist(isCod ? 'ff' : 'cod')}
                                title={`Toggle Playlist: Currently playing ${activePlaylist.name}. Click to switch to ${isCod ? 'FF Battle OST' : 'COD Menu OST'}`}
                                className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border transition-all cursor-pointer shrink-0 flex items-center gap-1 shadow-sm ${
                                    isCod
                                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/30'
                                        : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 hover:bg-cyan-500/30'
                                }`}
                            >
                                
                                <span>{isCod ? 'COD Menu' : 'FF Battle'}</span>
                                <i className="fas fa-arrows-rotate text-[7px] opacity-75"></i>
                            </button>
                        </div>
                        <div className={`text-[11px] truncate ${isCod ? 'text-amber-300/80' : 'text-cyan-300/80'}`}>
                            {currentTrack.game} • {currentTrack.composer}
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                        {/* Play/Pause Button */}
                        <button
                            onClick={togglePlay}
                            title={isPlaying ? "Pause music" : "Play music"}
                            className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
                        >
                            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} ${isCod ? 'text-amber-400' : 'text-cyan-400'} text-xs`}></i>
                        </button>
                        {/* Prev/Next */}
                        <button onClick={onPrev} title="Previous track" className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer">
                            <i className="fas fa-backward-step text-xs"></i>
                        </button>
                        <button onClick={onNext} title="Next track" className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer">
                            <i className="fas fa-forward-step text-xs"></i>
                        </button>
                        {/* Randomize Track */}
                        <button
                            type="button"
                            onClick={handleRandomTrack}
                            title="Randomize track / Shuffle"
                            className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
                        >
                            <i className="fas fa-shuffle text-xs"></i>
                        </button>

                        {/* Volume Control in Dock */}
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/50 border border-white/[0.1] shrink-0">
                            <button
                                onClick={toggleMute}
                                title={isMuted ? "Unmute" : "Mute"}
                                className={`text-slate-400 hover:${isCod ? 'text-amber-400' : 'text-cyan-400'} transition-colors focus:outline-none cursor-pointer`}
                            >
                                <i className={`fas ${isMuted || volume === 0 ? 'fa-volume-xmark text-rose-400' : volume < 50 ? (isCod ? 'fa-volume-low text-amber-400' : 'fa-volume-low text-cyan-400') : (isCod ? 'fa-volume-high text-amber-400' : 'fa-volume-high text-cyan-400')} text-xs`}></i>
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={isMuted ? 0 : volume}
                                onChange={(e) => handleVolumeChange(e.target.value)}
                                className={`w-14 sm:w-18 h-1 bg-slate-700 rounded appearance-none cursor-pointer ${isCod ? 'accent-amber-400' : 'accent-cyan-400'}`}
                                aria-label="Volume slider"
                                title={`Volume: ${isMuted ? 0 : volume}%`}
                            />
                            <span className="font-mono text-[10px] text-slate-400 hidden sm:inline-block w-6 text-right">
                                {isMuted ? '0%' : `${volume}%`}
                            </span>
                        </div>

                        {/* Expand player */}
                        <button onClick={onExpand} title="Expand player" className={`p-1.5 hover:${isCod ? 'text-amber-400' : 'text-cyan-400'} hover:bg-white/10 rounded transition-colors cursor-pointer`}>
                            <i className="fas fa-up-right-and-down-left-from-center text-xs"></i>
                        </button>
                        {/* Stop music */}
                        <button onClick={onClose} title="Stop music" className="p-1.5 hover:text-rose-400 hover:bg-white/10 rounded transition-colors cursor-pointer">
                            <i className="fas fa-times text-xs"></i>
                        </button>
                    </div>
                </div>
            )}

            {/* Persistent Player Modal Container */}
            <div className={
                state.isOpen
                    ? "fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
                    : "fixed -bottom-[9999px] left-0 w-[320px] h-[180px] opacity-[0.001] pointer-events-none -z-50 overflow-hidden"
            }>
                <div className={`bg-[#050505]/95 backdrop-blur-xl border rounded-2xl max-w-2xl w-full overflow-hidden flex flex-col my-auto max-h-[92vh] ${
                    isCod
                        ? 'border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.25)]'
                        : 'border-white/[0.12] shadow-2xl'
                }`}>
                    
                    {/* Header */}
                    <div className="bg-black/60 border-b border-white/[0.08] px-4 py-3 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shadow-sm relative overflow-hidden ${
                                isCod ? 'bg-amber-950/80 border-amber-500/40 text-amber-400' : 'bg-cyan-950/80 border-cyan-500/40 text-cyan-400'
                            }`}>
                                <img src={`https://img.youtube.com/vi/${currentTrack.id}/default.jpg`} className="absolute inset-0 w-full h-full object-cover opacity-30" alt="" />
                                
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                                    <span>{activePlaylist.title} Jukebox</span>
                                    <div className="flex items-end gap-0.5 h-3">
                                        <span className={`w-0.5 ${isCod ? 'bg-amber-400' : 'bg-cyan-400'} ${isPlaying ? 'animate-pulse' : ''} h-2`}></span>
                                        <span className={`w-0.5 ${isCod ? 'bg-orange-300' : 'bg-sky-300'} ${isPlaying ? 'animate-pulse' : ''} h-3`}></span>
                                        <span className={`w-0.5 ${isCod ? 'bg-yellow-400' : 'bg-blue-400'} ${isPlaying ? 'animate-pulse' : ''} h-1.5`}></span>
                                    </div>
                                </div>
                                <div className={`text-[11px] font-mono truncate max-w-sm ${isCod ? 'text-amber-300/80' : 'text-cyan-300/80'}`}>
                                    {activePlaylist.composerSubtitle} • YouTube Audio Stream
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={onMinimize}
                                title="Minimize to background player"
                                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.05] rounded transition-colors cursor-pointer"
                            >
                                <i className="fas fa-window-minimize text-xs"></i>
                            </button>
                            <button
                                onClick={onClose}
                                title="Close jukebox"
                                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-white/[0.05] rounded transition-colors cursor-pointer"
                            >
                                <i className="fas fa-times text-xs"></i>
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="overflow-y-auto flex-1 p-4 space-y-4">
                        {/* Playlist Toggle Pill Switch */}
                        <div className="flex items-center p-1 bg-black/60 rounded-xl border border-white/10 gap-1.5 shrink-0">
                            <button
                                type="button"
                                onClick={() => onSwitchPlaylist && onSwitchPlaylist('ff')}
                                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                                    activePlaylistKey === 'ff'
                                        ? 'bg-cyan-950/80 text-cyan-300 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] border-transparent'
                                }`}
                            >
                                
                                <span>FF Battle OST</span>
                                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">15</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => onSwitchPlaylist && onSwitchPlaylist('cod')}
                                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                                    activePlaylistKey === 'cod'
                                        ? 'bg-amber-950/80 text-amber-300 border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] border-transparent'
                                }`}
                            >
                                
                                <span>COD Menu OST</span>
                                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-mono">7</span>
                            </button>
                        </div>

                        {/* YouTube Video Player (Single persistent instance, using youtube-nocookie to prevent Error 153 on custom domains) */}
                        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                            <iframe
                                ref={iframeRef}
                                key={`${activePlaylistKey}-${currentTrack.id}`}
                                src={`https://www.youtube-nocookie.com/embed/${currentTrack.id}?autoplay=1&enablejsapi=1&playsinline=1&rel=0${typeof window !== 'undefined' && window.location.origin ? `&origin=${encodeURIComponent(window.location.origin)}` : ''}`}
                                title={currentTrack.title}
                                className="w-full h-full border-none"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                onLoad={handleIframeLoad}
                            />
                        </div>

                        {/* Active Track Banner & Controls */}
                        <div className="bg-[#0b1224]/80 border border-white/[0.08] rounded-xl p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 relative overflow-hidden">
                            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none" style={{ background: `url(https://img.youtube.com/vi/${currentTrack.id}/mqdefault.jpg) center/cover no-repeat`, maskImage: 'linear-gradient(to right, transparent, black)' }}></div>
                            <div className="min-w-0 flex-1 relative z-10 pr-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${activePlaylist.tagBg}`}>
                                        TRACK {state.trackIndex + 1}/{trackList.length} • {activePlaylist.badge}
                                    </span>
                                    <span className="text-xs font-semibold text-slate-400">
                                        {currentTrack.game} ({currentTrack.year})
                                    </span>
                                </div>
                                <h4 className="text-sm sm:text-base font-bold text-white truncate">
                                    {currentTrack.title}
                                </h4>
                                <p className="text-xs text-slate-400 truncate">
                                    {currentTrack.originalTitle} • Composed by {currentTrack.composer}
                                </p>
                            </div>

                            {/* Control buttons & Volume slider */}
                            <div className="flex flex-wrap items-center gap-2 shrink-0 relative z-10">
                                {/* Play / Pause */}
                                <button
                                    onClick={togglePlay}
                                    className="px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                                    title={isPlaying ? "Pause music" : "Play music"}
                                >
                                    <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} ${isCod ? 'text-amber-400' : 'text-cyan-400'} text-xs`}></i>
                                    <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
                                </button>

                                {/* Prev / Next */}
                                <button
                                    onClick={onPrev}
                                    className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border border-white/[0.1] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                                    title="Previous track"
                                >
                                    <i className="fas fa-backward-step"></i>
                                    <span className="hidden sm:inline">Prev</span>
                                </button>
                                <button
                                    onClick={onNext}
                                    className={`px-3 py-1.5 rounded-lg text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md cursor-pointer ${
                                        isCod ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-900/50' : 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-900/50'
                                    }`}
                                    title="Next track"
                                >
                                    <span className="hidden sm:inline">Next</span>
                                    <i className="fas fa-forward-step"></i>
                                </button>
                                {/* Randomize track */}
                                <button
                                    type="button"
                                    onClick={handleRandomTrack}
                                    className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border border-white/[0.1] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                                    title="Play a random track from current playlist"
                                >
                                    <i className={`fas fa-shuffle ${isCod ? 'text-amber-400' : 'text-cyan-400'}`}></i>
                                    <span className="hidden sm:inline">Randomize</span>
                                </button>

                                {/* Volume Slider */}
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/50 border border-white/[0.1]">
                                    <button
                                        type="button"
                                        onClick={toggleMute}
                                        className={`text-slate-400 hover:${isCod ? 'text-amber-400' : 'text-cyan-400'} transition-colors focus:outline-none cursor-pointer`}
                                        title={isMuted ? "Unmute" : "Mute"}
                                        aria-label="Toggle mute"
                                    >
                                        <i className={`fas ${isMuted || volume === 0 ? 'fa-volume-xmark text-rose-400' : volume < 50 ? (isCod ? 'fa-volume-low text-amber-400' : 'fa-volume-low text-cyan-400') : (isCod ? 'fa-volume-high text-amber-400' : 'fa-volume-high text-cyan-400')} text-xs`}></i>
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={isMuted ? 0 : volume}
                                        onChange={(e) => handleVolumeChange(e.target.value)}
                                        className={`w-20 sm:w-28 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer ${isCod ? 'accent-amber-400' : 'accent-cyan-400'}`}
                                        aria-label="Volume slider"
                                        title={`Volume: ${isMuted ? 0 : volume}%`}
                                    />
                                    <span className="font-mono text-[11px] text-slate-300 w-7 text-right select-none">
                                        {isMuted ? '0%' : `${volume}%`}
                                    </span>
                                </div>

                                {/* External YouTube button */}
                                <a
                                    href={currentTrack.youtubeUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 text-xs transition-colors"
                                    title="Open video on YouTube"
                                >
                                    <i className="fab fa-youtube"></i>
                                </a>
                            </div>
                        </div>

                        {/* Tracklist selection */}
                        <div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between font-mono">
                                <span>{activePlaylist.name} Selection ({trackList.length} Tracks)</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handleRandomTrack}
                                        className={`px-2.5 py-1 rounded border text-[11px] font-mono font-semibold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer ${
                                            isCod
                                                ? 'bg-amber-950/80 hover:bg-amber-900 border-amber-500/40 text-amber-300 hover:text-white'
                                                : 'bg-cyan-950/80 hover:bg-cyan-900 border-cyan-500/40 text-cyan-300 hover:text-white'
                                        }`}
                                        title="Pick and play a random track from the playlist"
                                    >
                                        <i className="fas fa-shuffle text-xs"></i>
                                        <span>Randomize Tracks</span>
                                    </button>
                                    <span className="text-slate-400 text-[11px] lowercase hidden sm:inline">click to play</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {trackList.map((track, idx) => {
                                    const isCurrent = idx === state.trackIndex;
                                    return (
                                        <button
                                            key={track.id}
                                            onClick={() => onSelectTrack(idx)}
                                            className={`p-2.5 rounded-lg text-left transition-all border flex items-center justify-between gap-2.5 cursor-pointer ${
                                                isCurrent
                                                    ? (isCod
                                                        ? 'bg-amber-950/40 border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/40'
                                                        : 'bg-cyan-950/40 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400/40')
                                                    : 'bg-white/[0.03] border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.06]'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <div className={`w-7 h-7 rounded-md flex items-center justify-center font-mono text-xs font-bold shrink-0 overflow-hidden relative ${
                                                    isCurrent
                                                        ? (isCod ? 'bg-amber-500 text-black' : 'bg-cyan-500 text-black')
                                                        : 'bg-white/[0.08] text-slate-400'
                                                }`}>
                                                    <img src={`https://img.youtube.com/vi/${track.id}/default.jpg`} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="" />
                                                    <span className="relative z-10">
                                                        {isCurrent ? <i className={`fas ${isPlaying ? 'fa-volume-high' : 'fa-pause'} text-[10px]`}></i> : idx + 1}
                                                    </span>
                                                </div>
                                                <div className="min-w-0">
                                                    <div className={`text-xs font-semibold truncate ${
                                                        isCurrent ? (isCod ? 'text-amber-300 font-bold' : 'text-cyan-300 font-bold') : 'text-slate-200'
                                                    }`}>
                                                        {track.title}
                                                    </div>
                                                    <div className="text-[10px] text-slate-400 truncate">
                                                        {track.game} • {track.duration}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-slate-400 shrink-0">
                                                {isCurrent ? (
                                                    <span className={`text-[10px] font-mono uppercase font-bold tracking-wider ${isCod ? 'text-amber-400' : 'text-cyan-400'}`}>
                                                        {isPlaying ? 'Playing' : 'Paused'}
                                                    </span>
                                                ) : (
                                                    <i className="fas fa-play text-[10px] opacity-60"></i>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const ZarathustraEasterEgg = ({ isOpen, onClose, isMinimized, setIsMinimized }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.85);
    const [isMuted, setIsMuted] = useState(false);

    const formatTime = (secs) => {
        if (!secs || isNaN(secs)) return '00:00';
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // Synthesizer fallback for Also sprach Zarathustra using Web Audio API
    const playZarathustraSynth = () => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const now = ctx.currentTime;

            // Deep pedal tone: C1 (32.7 Hz) + C2 (65.41 Hz) + organ harmonics
            const pedalOsc1 = ctx.createOscillator();
            const pedalOsc2 = ctx.createOscillator();
            const pedalGain = ctx.createGain();
            pedalOsc1.type = 'sawtooth';
            pedalOsc1.frequency.setValueAtTime(32.70, now);
            pedalOsc2.type = 'sine';
            pedalOsc2.frequency.setValueAtTime(65.41, now);
            
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(220, now);

            pedalGain.gain.setValueAtTime(0, now);
            pedalGain.gain.linearRampToValueAtTime(0.4, now + 1.5);
            pedalGain.gain.setValueAtTime(0.4, now + 18);
            pedalGain.gain.linearRampToValueAtTime(0, now + 21);

            pedalOsc1.connect(filter);
            pedalOsc2.connect(filter);
            filter.connect(pedalGain);
            pedalGain.connect(ctx.destination);

            pedalOsc1.start(now);
            pedalOsc2.start(now);
            pedalOsc1.stop(now + 21);
            pedalOsc2.stop(now + 21);

            // Trumpet Fanfare: C4 (261.63Hz), G4 (392.00Hz), C5 (523.25Hz)
            const playTrumpetNote = (freq, startTime, dur) => {
                const oscA = ctx.createOscillator();
                const oscB = ctx.createOscillator();
                const noteGain = ctx.createGain();
                const noteFilter = ctx.createBiquadFilter();

                oscA.type = 'sawtooth';
                oscA.frequency.setValueAtTime(freq, startTime);
                oscB.type = 'triangle';
                oscB.frequency.setValueAtTime(freq * 1.002, startTime);

                noteFilter.type = 'bandpass';
                noteFilter.frequency.setValueAtTime(freq * 2.2, startTime);
                noteFilter.Q.setValueAtTime(1.8, startTime);

                noteGain.gain.setValueAtTime(0, startTime);
                noteGain.gain.linearRampToValueAtTime(0.35, startTime + 0.08);
                noteGain.gain.setValueAtTime(0.32, startTime + dur - 0.1);
                noteGain.gain.linearRampToValueAtTime(0, startTime + dur);

                oscA.connect(noteFilter);
                oscB.connect(noteFilter);
                noteFilter.connect(noteGain);
                noteGain.connect(ctx.destination);

                oscA.start(startTime);
                oscB.start(startTime);
                oscA.stop(startTime + dur + 0.1);
                oscB.stop(startTime + dur + 0.1);
            };

            playTrumpetNote(261.63, now + 2.0, 1.4);
            playTrumpetNote(392.00, now + 3.5, 1.4);
            playTrumpetNote(523.25, now + 5.0, 2.8);

            // Timpani hits
            const playTimpani = (startTime, freq) => {
                const drumOsc = ctx.createOscillator();
                const drumGain = ctx.createGain();
                drumOsc.type = 'sine';
                drumOsc.frequency.setValueAtTime(freq, startTime);
                drumOsc.frequency.exponentialRampToValueAtTime(freq * 0.45, startTime + 0.4);

                drumGain.gain.setValueAtTime(0.7, startTime);
                drumGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.85);

                drumOsc.connect(drumGain);
                drumGain.connect(ctx.destination);

                drumOsc.start(startTime);
                drumOsc.stop(startTime + 0.9);
            };

            playTimpani(now + 8.0, 130.81);
            playTimpani(now + 9.0, 98.00);
            playTimpani(now + 10.0, 130.81);
            playTimpani(now + 10.9, 98.00);
            playTimpani(now + 11.4, 130.81);

            // Climax
            const playOrchestralClimax = (startTime) => {
                [130.81, 164.81, 196.00, 261.63, 329.63, 392.00, 523.25].forEach(f => {
                    const o = ctx.createOscillator();
                    const g = ctx.createGain();
                    o.type = 'sawtooth';
                    o.frequency.setValueAtTime(f, startTime);
                    g.gain.setValueAtTime(0, startTime);
                    g.gain.linearRampToValueAtTime(0.12, startTime + 0.15);
                    g.gain.exponentialRampToValueAtTime(0.001, startTime + 4.5);
                    o.connect(g);
                    g.connect(ctx.destination);
                    o.start(startTime);
                    o.stop(startTime + 4.6);
                });
            };

            playOrchestralClimax(now + 12.0);
        } catch (e) {
            console.error('Web Audio Zarathustra error:', e);
        }
    };

    useEffect(() => {
        if (!isOpen) return;

        const audio = new Audio('/audio/zarathustra.mp3');
        audio.volume = volume;
        audioRef.current = audio;

        audio.addEventListener('timeupdate', () => {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration || 0);
        });

        audio.addEventListener('ended', () => {
            setIsPlaying(false);
        });

        audio.addEventListener('error', () => {
            console.warn('Audio file fallback to Web Audio synth');
            playZarathustraSynth();
        });

        audio.play().then(() => {
            setIsPlaying(true);
        }).catch(err => {
            console.log('Autoplay handled, synth fallback:', err);
            playZarathustraSynth();
        });

        return () => {
            audio.pause();
            audio.src = '';
            audioRef.current = null;
        };
    }, [isOpen]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        } else {
            playZarathustraSynth();
            setIsPlaying(!isPlaying);
        }
    };

    const restartAudio = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            playZarathustraSynth();
            setIsPlaying(true);
        }
    };

    const handleSeek = (e) => {
        if (audioRef.current && duration) {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            const newTime = clickPos * duration;
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    if (!isOpen) return null;

    // MINIMIZED DOCKED PLAYER (Clean, technical bottom-left dock)
    if (isMinimized) {
        return (
            <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[#050505]/95 border border-white/[0.12] shadow-2xl backdrop-blur-xl text-white text-xs">
                    <button
                        onClick={togglePlay}
                        className="w-7 h-7 rounded-lg bg-primary hover:bg-sky-400 text-slate-950 font-bold flex items-center justify-center transition-transform"
                        title={isPlaying ? "Pausar" : "Tocar"}
                    >
                        <i className={`fas fa-${isPlaying ? 'pause' : 'play'} text-[10px] ${isPlaying ? '' : 'ml-0.5'}`}></i>
                    </button>

                    <div className="flex flex-col cursor-pointer pr-1" onClick={() => setIsMinimized(false)}>
                        <div className="flex items-center gap-1.5 font-medium text-slate-200 text-xs">
                            <i className="fas fa-compact-disc text-primary text-[11px]"></i>
                            <span>Also sprach Zarathustra</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                            {formatTime(currentTime)} / {formatTime(duration || 102)}
                        </div>
                    </div>

                    <div className="flex items-center gap-1 ml-1 pl-2 border-l border-white/[0.1]">
                        <button
                            onClick={() => setIsMinimized(false)}
                            title="Expandir"
                            className="w-6 h-6 rounded text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors flex items-center justify-center text-[10px]"
                        >
                            <i className="fas fa-expand-alt"></i>
                        </button>
                        <button
                            onClick={onClose}
                            title="Fechar"
                            className="w-6 h-6 rounded text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors flex items-center justify-center text-[10px]"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // CLEAN, PROFESSIONAL TECHNICAL AUDIO MODAL (No vibecoded slop)
    return (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#050505]/95 backdrop-blur-xl border border-white/[0.12] rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-left">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <i className="fas fa-terminal text-primary"></i>
                        <span>easter_egg // konami_code</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setIsMinimized(true)}
                            title="Minimizar para dock"
                            className="w-7 h-7 rounded text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors flex items-center justify-center text-xs"
                        >
                            <i className="fas fa-minus"></i>
                        </button>
                        <button
                            onClick={onClose}
                            title="Fechar"
                            className="w-7 h-7 rounded text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors flex items-center justify-center text-xs"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                {/* Track Info */}
                <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shrink-0 text-lg">
                        <i className={`fas fa-${isPlaying ? 'compact-disc fa-spin' : 'music'}`}></i>
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-white text-sm truncate">
                            Also sprach Zarathustra, Op. 30
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                            1. Sonnenaufgang (Sunrise Fanfare)
                        </p>
                        <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400 font-mono">
                            <span>Richard Strauss (1896)</span>
                            <span>·</span>
                            <span className="text-primary font-medium">Chicago Symphony Orchestra</span>
                        </div>
                    </div>
                </div>

                {/* Progress Bar & Seek */}
                <div className="mb-4">
                    <div
                        onClick={handleSeek}
                        className="w-full h-1.5 rounded-full bg-white/[0.08] hover:h-2 cursor-pointer transition-all overflow-hidden relative"
                    >
                        <div
                            className="h-full bg-primary rounded-full transition-all duration-100"
                            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1.5">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration || 102)}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between pt-2">
                    <div className="text-[11px] font-mono text-slate-400 px-2 py-1 rounded bg-white/[0.04] border border-white/[0.08]">
                        ↑ ↑ ↓ ↓ ← → ← → B A
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={restartAudio}
                            title="Reiniciar"
                            className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors flex items-center justify-center text-xs"
                        >
                            <i className="fas fa-redo"></i>
                        </button>
                        <button
                            onClick={togglePlay}
                            className="w-10 h-10 rounded-xl bg-primary hover:bg-sky-400 text-slate-950 font-bold flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 text-sm"
                            title={isPlaying ? "Pausar" : "Tocar"}
                        >
                            <i className={`fas fa-${isPlaying ? 'pause' : 'play'} ${isPlaying ? '' : 'ml-0.5'}`}></i>
                        </button>
                        <button
                            onClick={toggleMute}
                            title={isMuted ? "Desmutar" : "Mutar"}
                            className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors flex items-center justify-center text-xs"
                        >
                            <i className={`fas fa-${isMuted ? 'volume-mute text-rose-400' : 'volume-up'}`}></i>
                        </button>
                    </div>

                    <button
                        onClick={() => setIsMinimized(true)}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                        title="Minimizar para a barra"
                    >
                        <i className="fas fa-compress-alt text-[10px]"></i>
                        <span className="hidden sm:inline">Dock</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const DeliciaPlayer = ({ isActive, onClose, lang }) => {
    const iframeRef = useRef(null);
    const [volume, setVolume] = useState(40);
    const [isMuted, setIsMuted] = useState(false);

    const sendCommand = useCallback((func, args = []) => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            try {
                iframeRef.current.contentWindow.postMessage(JSON.stringify({
                    event: 'command',
                    func: func,
                    args: args
                }), '*');
            } catch (e) {}
        }
    }, []);

    const registerApi = useCallback(() => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            try {
                iframeRef.current.contentWindow.postMessage(JSON.stringify({
                    event: 'listening'
                }), '*');
            } catch (e) {}
        }
    }, []);

    const applyVolume = useCallback((vol, muted) => {
        registerApi();
        const targetVol = muted ? 0 : vol;
        sendCommand('setVolume', [targetVol]);
        if (muted) {
            sendCommand('mute');
        } else {
            sendCommand('unMute');
        }
    }, [registerApi, sendCommand]);

    const handleIframeLoad = () => {
        applyVolume(volume, isMuted);
        [200, 500, 1000, 1800, 3000].forEach((delay) => {
            setTimeout(() => {
                applyVolume(volume, isMuted);
                sendCommand('playVideo');
            }, delay);
        });
    };

    const toggleMute = () => {
        const nextMuted = !isMuted;
        setIsMuted(nextMuted);
        applyVolume(volume, nextMuted);
    };

    if (!isActive) return null;

    return (
        <>
            <div 
                id="delicia-audio-container" 
                style={{ position: 'fixed', width: '1px', height: '1px', opacity: 0.01, pointerEvents: 'none', zIndex: -1, overflow: 'hidden', bottom: 0, left: 0 }}
                aria-hidden="true"
            >
                <iframe
                    ref={iframeRef}
                    key="delicia-loop-player"
                    width="100"
                    height="100"
                    src={`https://www.youtube-nocookie.com/embed/9wVmCLtuUx0?autoplay=1&loop=1&playlist=9wVmCLtuUx0&enablejsapi=1&playsinline=1&rel=0${typeof window !== 'undefined' && window.location.origin ? `&origin=${encodeURIComponent(window.location.origin)}` : ''}`}
                    title="Delicia Theme Loop"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    onLoad={handleIframeLoad}
                />
            </div>
            <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 px-3.5 py-2 bg-[#120800]/95 border border-orange-500/60 rounded-xl shadow-xl shadow-orange-950/60 text-orange-200 text-xs backdrop-blur-xl animate-fade-in select-none">
                <span className="text-lg animate-bounce select-none">🍊</span>
                <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                        <span className="font-bold text-orange-400 font-mono text-[11px] leading-tight">DELÍCIA PROTOCOL</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-300 font-mono font-bold">40% VOL</span>
                    </div>
                    <span className="text-[10px] text-orange-200/80">Jailson Mendes · Suco de Laranja · Looping OST</span>
                </div>
                <button
                    type="button"
                    onClick={toggleMute}
                    className="ml-1 w-6 h-6 rounded flex items-center justify-center text-orange-400 hover:text-white hover:bg-orange-500/20 transition-colors cursor-pointer"
                    title={isMuted ? (lang === 'pt' ? 'Ativar som' : 'Unmute') : (lang === 'pt' ? 'Mutar' : 'Mute')}
                    aria-label="Toggle mute"
                >
                    <i className={`fas ${isMuted ? 'fa-volume-mute text-rose-400' : 'fa-volume-low text-orange-300'} text-xs`}></i>
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="w-6 h-6 rounded flex items-center justify-center text-orange-400 hover:text-white hover:bg-orange-500/20 transition-colors cursor-pointer"
                    title={lang === 'pt' ? 'Desativar modo Delícia' : 'Disable Delícia mode'}
                    aria-label="Disable Delícia mode"
                >
                    <i className="fas fa-times text-xs"></i>
                </button>
            </div>
        </>
    );
};

// --- GISCUS COMMENTS WIDGET FOR JOURNAL ENTRIES ---
const JournalComments = ({ articleSlug, articleTitle, lang }) => {
    const containerRef = useRef(null);

    const REPO = 'Spet001/Spet001.github.io';
    const REPO_ID = 'R_kgDOUFIsXQ';
    const CATEGORY_NAME = 'General';
    const CATEGORY_ID = 'DIC_kwDOUFIsXc4DHkDp';

    const isBot = typeof navigator !== 'undefined' &&
        /bot|googlebot|crawler|spider|robot|crawling|bingbot|gptbot|claudebot|perplexitybot|applebot/i.test(navigator.userAgent || '');

    useEffect(() => {
        if (isBot || !containerRef.current) return;

        const container = containerRef.current;
        container.innerHTML = '';

        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.setAttribute('data-repo', REPO);
        script.setAttribute('data-repo-id', REPO_ID);
        script.setAttribute('data-category', CATEGORY_NAME);
        script.setAttribute('data-category-id', CATEGORY_ID);
        script.setAttribute('data-mapping', 'specific');
        script.setAttribute('data-term', `Journal: ${articleSlug}`);
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'top');
        script.setAttribute('data-theme', 'transparent_dark');
        script.setAttribute('data-lang', lang === 'pt' ? 'pt' : 'en');
        container.appendChild(script);
    }, [articleSlug, lang, isBot]);

    return (
        <section className="mt-12 pt-8 border-t border-white/[0.08]" aria-label={lang === 'pt' ? 'Comentários' : 'Comments'}>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                        <i className="far fa-comments text-sm"></i>
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-white leading-tight">
                            {lang === 'pt' ? 'Discussão & Comentários' : 'Discussion & Comments'}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-mono">
                            {lang === 'pt'
                                ? 'Integrado via GitHub Discussions (Giscus)'
                                : 'Powered by GitHub Discussions (Giscus)'}
                        </p>
                    </div>
                </div>
                <a
                    href={`https://github.com/${REPO}/discussions`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-mono transition-colors"
                >
                    <i className="fab fa-github"></i>
                    <span>{lang === 'pt' ? 'Ver no GitHub' : 'View on GitHub'}</span>
                </a>
            </div>

            <div ref={containerRef} className="giscus-wrapper min-h-[160px]" />
        </section>
    );
};

// --- FULL INTEGRATED TECHNICAL JOURNAL VIEW (SPA) ---
const normalizePostId = (id) => {
    if (!id) return id;
    if (id === 'shame_for_the_leakers' || id === 'entry_0003') return 'Document-Explaining-Leaks';
    if (id === 'UWPCOD-GDK-DLC-Unlocker' || id === 'entry_0006') return 'UWP-GDK-Sandbox-Entitlement-Analysis';
    return id;
};

const JournalView = ({ activePostId, onSelectPost, onBackToHome, onOpenPatreon }) => {
    const { t, lang } = useContext(LanguageContext);
    const [entries, setEntries] = useState(PORTFOLIO_DATA.journalEntries || []);
    const [selectedId, setSelectedId] = useState(normalizePostId(activePostId) || (PORTFOLIO_DATA.journalEntries[0]?.id || 'What-Is-GSC'));
    const [postContent, setPostContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLocked, setIsLocked] = useState(false);
    const [searchFilter, setSearchFilter] = useState('');
    const [sortBy, setSortBy] = useState('popular');
    const [viewsMap, setViewsMap] = useState({});
    const hasManualSelectRef = useRef(Boolean(activePostId));

    useEffect(() => {
        if (activePostId) {
            hasManualSelectRef.current = true;
            setSelectedId(normalizePostId(activePostId));
        }
    }, [activePostId]);

    const lastTrackedSlugRef = useRef(null);

    const mergeViews = useCallback((incomingViews) => {
        if (!incomingViews) return;
        setViewsMap(prev => {
            const next = { ...prev };
            for (const [k, v] of Object.entries(incomingViews)) {
                next[k] = Math.max(next[k] || 0, v);
            }
            return next;
        });
    }, []);

    useEffect(() => {
        fetch('/journal/entries.json')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setEntries(data);
                }
            })
            .catch(() => {});

        fetch('https://journal.gelain15mj.workers.dev/api/journal/views')
            .then(res => res.json())
            .then(data => {
                if (data && data.views) {
                    mergeViews(data.views);
                }
            })
            .catch(() => {});
    }, [mergeViews]);

    const getEntrySlug = useCallback((entry) => {
        if (!entry) return '';
        return entry.file ? entry.file.replace(/\.md$/, '') : entry.id;
    }, []);

    const getEntryViews = useCallback((entry) => {
        if (!entry) return null;
        const slug = getEntrySlug(entry);
        if (viewsMap[slug] !== undefined) return viewsMap[slug];
        if (viewsMap[entry.id] !== undefined) return viewsMap[entry.id];
        return Object.keys(viewsMap).length > 0 ? 0 : null;
    }, [viewsMap, getEntrySlug]);

    // When opening /journal/ without a specific post ID, select the #1 most popular entry once views load (for human visitors)
    useEffect(() => {
        if (typeof navigator !== 'undefined' && /bot|googlebot|crawler|spider|robot|crawling|bingbot|gptbot|claudebot|perplexitybot|applebot/i.test(navigator.userAgent || '')) return;
        if (hasManualSelectRef.current || activePostId) return;
        if (Object.keys(viewsMap).length === 0 || entries.length === 0) return;
        const sortedByPop = [...entries].sort((a, b) => (getEntryViews(b) ?? -1) - (getEntryViews(a) ?? -1));
        if (sortedByPop[0]) {
            const topEntry = sortedByPop[0];
            const isTopLocked = topEntry.file === 'T9-Mod-Manager-RE.md' || topEntry.id === 'entry_0007';
            const topSlug = isTopLocked ? topEntry.id : getEntrySlug(topEntry);
            hasManualSelectRef.current = true;
            setSelectedId(topSlug);
        }
    }, [viewsMap, entries, activePostId, getEntryViews, getEntrySlug]);

    // Track view in Cloudflare Worker when an article is opened
    useEffect(() => {
        if (typeof navigator !== 'undefined' && /bot|googlebot|crawler|spider|robot|crawling|bingbot|gptbot|claudebot|perplexitybot|applebot/i.test(navigator.userAgent || '')) return;
        if (!selectedId || entries.length === 0) return;
        const entry = entries.find(e =>
            e.id === selectedId ||
            e.file === selectedId ||
            (e.file && e.file.replace(/\.md$/, '') === selectedId)
        );
        if (!entry) return;
        const canonicalSlug = getEntrySlug(entry);
        if (!canonicalSlug) return;

        if (lastTrackedSlugRef.current === canonicalSlug) return;
        lastTrackedSlugRef.current = canonicalSlug;

        fetch('https://journal.gelain15mj.workers.dev/api/journal/view', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug: canonicalSlug })
        })
            .then(res => res.json())
            .then(data => {
                if (data && data.views) {
                    mergeViews(data.views);
                }
            })
            .catch(() => {
                lastTrackedSlugRef.current = null;
            });
    }, [selectedId, entries, getEntrySlug, mergeViews]);

    useEffect(() => {
        if (!selectedId) return;

        const activeId = normalizePostId(selectedId);
        const entry = entries.find(e => 
            e.id === activeId || 
            e.file === activeId || 
            (e.file && e.file.replace(/\.md$/, '') === activeId)
        );

        const locked = (
            (entry && entry.file === 'T9-Mod-Manager-RE.md') || 
            selectedId === 'T9-Mod-Manager-RE' || 
            selectedId === 'entry_0007'
        );

        setIsLocked(locked);

        if (locked) {
            const targetKey = (selectedId === 'T9-Mod-Manager-RE' || selectedId === 'entry_0007' || (entry && entry.file === 'T9-Mod-Manager-RE.md')) ? 't9_md' : 'relay_md';
            const cached = localStorage.getItem(targetKey);
            if (cached) {
                setPostContent(cached);
                setIsLocked(false);
            } else {
                setPostContent('');
            }
            return;
        }

        const filename = entry ? entry.file : `${activeId}.md`;
        setLoading(true);
        setError(null);

        fetch(`/journal/md/${encodeURIComponent(filename)}`)
            .then(async res => {
                if (!res.ok) throw new Error(lang === 'pt' ? 'Artigo não encontrado localmente' : 'Article not found locally');
                return res.text();
            })
            .then(mdText => {
                setPostContent(mdText);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });

    }, [selectedId, entries, lang]);

    const [articleLang, setArticleLang] = useState('en');
    const [translatedData, setTranslatedData] = useState(null);
    const [translating, setTranslating] = useState(false);
    const [translateError, setTranslateError] = useState(null);

    const computeContentHash = useCallback((text) => {
        let h = 2166136261 >>> 0;
        for (let i = 0; i < text.length; i++) {
            h ^= text.charCodeAt(i);
            h = Math.imul(h, 16777619) >>> 0;
        }
        return `${text.length}_${h.toString(16)}`;
    }, []);

    const activeEntry = entries.find(e => 
        e.id === selectedId || 
        e.file === selectedId || 
        (e.file && e.file.replace(/\.md$/, '') === selectedId)
    );

    const normalizedMarkdown = postContent
        ? postContent.replace(/^\s*#\s+[^\r\n]+[\r\n]*/, '')
        : '';

    const activeArticleSlug = activeEntry
        ? (activeEntry.file ? activeEntry.file.replace(/\.md$/, '') : activeEntry.id)
        : selectedId;

    const activeEntryViews = getEntryViews(activeEntry);

    useEffect(() => {
        if (articleLang !== 'pt' || !normalizedMarkdown || loading || isLocked || !activeArticleSlug) {
            setTranslating(false);
            setTranslateError(null);
            return;
        }

        const rawTitle = activeEntry?.title || '';
        const contentHash = computeContentHash(`${rawTitle}\n${normalizedMarkdown}`);
        const cacheKey = `journal_translation_${activeArticleSlug}_pt`;

        if (translatedData && translatedData.slug === activeArticleSlug && translatedData.hash === contentHash) {
            return;
        }

        try {
            const localCached = localStorage.getItem(cacheKey);
            if (localCached) {
                const parsed = JSON.parse(localCached);
                if (parsed && parsed.hash === contentHash && parsed.markdownPt) {
                    setTranslatedData({
                        slug: activeArticleSlug,
                        hash: contentHash,
                        titlePt: parsed.titlePt || rawTitle,
                        markdownPt: parsed.markdownPt
                    });
                    setTranslating(false);
                    setTranslateError(null);
                    return;
                }
            }
        } catch (e) {}

        let cancelled = false;
        setTranslating(true);
        setTranslateError(null);

        const translateMarkdownViaGtx = async (rawMd, titleStr) => {
            const protectedTokens = [];
            const maskToken = (match) => {
                const idx = protectedTokens.length;
                protectedTokens.push(match);
                return `ZXQ_${idx}_ZXQ`;
            };

            // 1. Protect fenced code blocks, math blocks, HTML blocks, inline code, link targets, and technical acronyms
            let masked = rawMd
                .replace(/(```[\s\S]*?```|\$\$[\s\S]*?\$\$|<div[\s\S]*?<\/div>)/g, maskToken)
                .replace(/(`[^`\n]+`|\$\S[^$\n]*\$|\]\([^)\n]+\))/g, maskToken)
                .replace(/\b(IWAD|PWAD|DXVK|LAA|GSC|UWP|GDK|FastFile|Demonware|Netchan|4GB Patch|d3d9\.dll|dxgi\.dll)\b/g, maskToken);

            const translateChunk = async (chunkText) => {
                if (!chunkText.trim()) return chunkText;
                const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(chunkText)}`;
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error(lang === 'pt' ? 'Falha ao consultar API do Google Translate.' : 'Failed to query Google Translate API.');
                }
                const data = await res.json();
                return Array.isArray(data?.[0])
                    ? data[0].map(part => part?.[0] || '').join('')
                    : chunkText;
            };

            const paragraphs = masked.split(/\n\n/);
            const chunks = [];
            let current = '';
            for (const p of paragraphs) {
                if ((current + '\n\n' + p).length > 2400 && current.length > 0) {
                    chunks.push(current);
                    current = p;
                } else {
                    current = current ? `${current}\n\n${p}` : p;
                }
            }
            if (current) chunks.push(current);

            const [titlePtRaw, ...translatedChunks] = await Promise.all([
                titleStr ? translateChunk(titleStr.replace(/\b(IWAD|PWAD|DXVK|LAA|GSC|UWP|GDK|FastFile|Demonware|Netchan|4GB Patch)\b/g, maskToken)) : Promise.resolve(''),
                ...chunks.map(c => translateChunk(c))
            ]);

            const restoreTokens = (str) =>
                str.replace(/ZXQ_\s*(\d+)\s*_ZXQ/gi, (_, i) => {
                    const idx = parseInt(i, 10);
                    return protectedTokens[idx] !== undefined ? protectedTokens[idx] : _;
                });

            return {
                titlePt: restoreTokens(titlePtRaw || titleStr),
                markdownPt: restoreTokens(translatedChunks.join('\n\n'))
            };
        };

        translateMarkdownViaGtx(normalizedMarkdown, rawTitle)
            .then(data => {
                if (cancelled) return;
                const resultObj = {
                    slug: activeArticleSlug,
                    hash: contentHash,
                    titlePt: data.titlePt || rawTitle,
                    markdownPt: data.markdownPt
                };
                setTranslatedData(resultObj);
                setTranslating(false);
                try {
                    localStorage.setItem(cacheKey, JSON.stringify(resultObj));
                } catch (e) {}
            })
            .catch(err => {
                if (cancelled) return;
                setTranslateError(err.message);
                setTranslating(false);
            });

        return () => {
            cancelled = true;
        };
    }, [articleLang, normalizedMarkdown, loading, isLocked, activeArticleSlug, activeEntry, computeContentHash, translatedData, lang]);

    const displayedMarkdown = (articleLang === 'pt' && translatedData && translatedData.slug === activeArticleSlug && translatedData.markdownPt)
        ? translatedData.markdownPt
        : normalizedMarkdown;

    const displayedTitle = (articleLang === 'pt' && translatedData && translatedData.slug === activeArticleSlug && translatedData.titlePt)
        ? translatedData.titlePt
        : (activeEntry ? activeEntry.title : '');

    useEffect(() => {
        const container = document.getElementById('journal-reader');
        if (container) {
            container.querySelectorAll('pre, code').forEach((el) => {
                el.classList.add('notranslate');
                el.setAttribute('translate', 'no');
            });
        }

        if (window.hljs) {
            document.querySelectorAll('#journal-reader pre code').forEach((block) => {
                delete block.dataset.highlighted;
                window.hljs.highlightElement(block);
            });
        }

        if (!container) return;

        const handleGalleryClicks = (e) => {
            const btn = e.target.closest('[data-model-src]');
            if (btn) {
                e.preventDefault();
                const src = btn.getAttribute('data-model-src');
                const viewer = document.getElementById('journal-model-viewer');
                const dl = document.getElementById('journal-model-download');
                if (viewer) viewer.src = src;
                if (dl) {
                    dl.href = src;
                    dl.setAttribute('download', src.split('/').pop());
                }
                const parent = btn.parentElement;
                if (parent) {
                    const allBtns = parent.querySelectorAll('[data-model-src]');
                    allBtns.forEach(b => {
                        b.style.borderColor = 'rgba(255,255,255,0.12)';
                        b.style.background = 'rgba(255,255,255,0.06)';
                        b.style.color = '#e2e8f0';
                    });
                    btn.style.borderColor = '#00aaff';
                    btn.style.background = 'rgba(0,170,255,0.2)';
                    btn.style.color = '#00aaff';
                }
            }
        };

        container.addEventListener('click', handleGalleryClicks);
        return () => container.removeEventListener('click', handleGalleryClicks);
    }, [displayedMarkdown, loading, translating]);

    const filteredEntries = entries
        .filter(e => {
            if (!searchFilter.trim()) return true;
            const q = searchFilter.toLowerCase();
            return (e.title && e.title.toLowerCase().includes(q)) || 
                   (e.category && e.category.toLowerCase().includes(q)) || 
                   (e.date && e.date.toLowerCase().includes(q));
        })
        .sort((a, b) => {
            if (sortBy === 'popular') {
                const vA = getEntryViews(a) ?? -1;
                const vB = getEntryViews(b) ?? -1;
                if (vB !== vA) return vB - vA;
            } else if (sortBy === 'alpha') {
                return (a.title || '').localeCompare(b.title || '');
            }
            return 0;
        });

    const handleSelectPost = (id) => {
        playSoftClick();
        hasManualSelectRef.current = true;
        setSelectedId(id);
        if (onSelectPost) onSelectPost(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto relative z-10 animate-fade-in">
            {/* Top Navigation Bar inside Journal */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 glass-panel p-4 sm:p-5 rounded-2xl border border-white/[0.1] shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => { playSoftClick(); onBackToHome(); }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-white text-xs sm:text-sm font-semibold transition-all hover:border-primary/50 shadow-md group cursor-pointer clickable"
                    >
                        <i className="fas fa-arrow-left text-primary group-hover:-translate-x-1 transition-transform"></i>
                        <span>{lang === 'pt' ? 'Voltar ao Portfólio' : 'Back to Portfolio'}</span>
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href="https://github.com/Spet001"
                        target="_blank"
                        rel="noreferrer"
                        className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] text-xs font-medium transition-colors"
                    >
                        <i className="fab fa-github"></i> Spet001
                    </a>
                    <button
                        onClick={() => { playSoftClick(); onOpenPatreon(); }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FF424D]/15 hover:bg-[#FF424D]/25 border border-[#FF424D]/30 text-[#FF424D] hover:text-white text-xs font-bold transition-all shadow-lg shadow-[#FF424D]/10 cursor-pointer"
                    >
                        <i className="fab fa-patreon"></i> Patreon
                    </button>
                </div>
            </div>

            {/* Layout: Sidebar + Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Sidebar: Entries List */}
                <aside className="lg:col-span-4 glass-panel rounded-2xl p-5 border border-white/[0.08] shadow-2xl backdrop-blur-xl lg:sticky lg:top-24 max-h-[85vh] flex flex-col">
                    <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/[0.08]">
                        <h2 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                            <i className="fas fa-list-ul text-primary"></i>
                            <span>{lang === 'pt' ? 'Artigos & Análises' : 'Articles & Research'}</span>
                        </h2>
                        <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08]">
                            {entries.length}
                        </span>
                    </div>

                    {/* Search filter & Sort dropdown */}
                    <div className="py-3 space-y-2.5">
                        <div className="relative">
                            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
                            <input
                                type="text"
                                value={searchFilter}
                                onChange={(e) => setSearchFilter(e.target.value)}
                                placeholder={lang === 'pt' ? 'Filtrar artigos...' : 'Filter articles...'}
                                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-black/50 border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary/60 transition-colors"
                            />
                        </div>

                        <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-400">
                            <span className="shrink-0">{lang === 'pt' ? 'Filtrar por:' : 'Filter by:'}</span>
                            <select
                                value={sortBy}
                                onChange={(e) => { playSoftClick(); setSortBy(e.target.value); }}
                                className="flex-1 px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/[0.1] text-xs text-white font-mono focus:outline-none focus:border-primary/60 transition-colors cursor-pointer clickable"
                            >
                                <option value="popular" className="bg-[#0a0f1d] text-white">
                                    {lang === 'pt' ? 'Popularidade' : 'Popularity'}
                                </option>
                                <option value="date" className="bg-[#0a0f1d] text-white">
                                    {lang === 'pt' ? 'Data' : 'Date'}
                                </option>
                                <option value="alpha" className="bg-[#0a0f1d] text-white">
                                    {lang === 'pt' ? 'Ordem Alfabética' : 'Alphabetical'}
                                </option>
                            </select>
                        </div>
                    </div>

                    {/* List */}
                    <ul className="space-y-2 overflow-y-auto pr-1 journal-entries-scroll flex-1 pt-1" style={{ scrollbarGutter: 'stable' }}>
                        {filteredEntries.map((e) => {
                            const isSelected = (
                                e.id === selectedId || 
                                e.file === selectedId || 
                                (e.file && e.file.replace(/\.md$/, '') === selectedId)
                            );
                            const isEntryLocked = (
                                e.file === 'T9-Mod-Manager-RE.md' || 
                                e.id === 'entry_0007'
                            );
                            const slug = isEntryLocked ? e.id : (e.file ? e.file.replace(/\.md$/, '') : e.id);
                            const itemViews = getEntryViews(e);

                            return (
                                <li key={e.id || e.file}>
                                    <a
                                        href={`/journal/${slug}/`}
                                        onClick={(ev) => {
                                            ev.preventDefault();
                                            handleSelectPost(slug);
                                        }}
                                        className={`w-full text-left p-3 rounded-xl transition-all border flex flex-col gap-1 cursor-pointer clickable ${
                                            isSelected
                                                ? 'border-primary/60 bg-primary/10 text-white shadow-lg shadow-primary/10'
                                                : 'border-transparent hover:border-white/[0.12] hover:bg-white/[0.04] text-slate-300'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between text-[11px] font-mono gap-2">
                                            <span className={`truncate ${isSelected ? 'text-primary font-bold' : 'text-slate-400'}`}>
                                                {e.category || (isEntryLocked ? 'Classified Research' : 'Article')}
                                            </span>
                                            <div className="flex items-center gap-2 shrink-0 text-[10px] text-slate-500">
                                                {itemViews !== null && (
                                                    <span className="text-slate-400">
                                                        <i className="far fa-eye mr-0.5 text-[9px]"></i> {itemViews}
                                                    </span>
                                                )}
                                                <span>{e.date}</span>
                                            </div>
                                        </div>
                                        <div className={`text-xs font-semibold leading-snug line-clamp-2 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                                            {isEntryLocked && <i className="fas fa-lock text-[#FF424D] mr-1.5 text-[10px]"></i>}
                                            {e.title}
                                        </div>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </aside>

                {/* Right Column: Markdown Reader */}
                <main className="lg:col-span-8 glass-panel rounded-2xl p-6 sm:p-10 border border-white/[0.08] shadow-2xl backdrop-blur-xl min-h-[600px] flex flex-col justify-between">
                    <div>
                        {/* Header Details */}
                        {activeEntry && (
                            <div className="pb-6 mb-6 border-b border-white/[0.08]">
                                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                                        <span><i className="far fa-calendar-alt mr-1"></i> {activeEntry.date}</span>
                                        <span><i className="far fa-user mr-1"></i> Eduardo Gelain (SpetDev)</span>
                                        {(activeEntry.category || isLocked) && (
                                            <span><i className="far fa-folder mr-1"></i> {activeEntry.category || 'Classified Research'}</span>
                                        )}
                                        {activeEntryViews !== null && (
                                            <span><i className="far fa-eye mr-1"></i> {activeEntryViews} {lang === 'pt' ? 'visualizações' : 'views'}</span>
                                        )}
                                    </div>

                                    {!isLocked && (
                                        <div className="inline-flex items-center rounded-xl bg-black/40 border border-white/[0.1] p-1 text-[11px] font-mono">
                                            <button
                                                type="button"
                                                onClick={() => { playSoftClick(); setArticleLang('en'); }}
                                                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer clickable ${
                                                    articleLang === 'en'
                                                        ? 'bg-primary/20 text-primary border border-primary/40 font-bold'
                                                        : 'text-slate-400 hover:text-white border border-transparent'
                                                }`}
                                            >
                                                Original Text - Texto Original
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => { playSoftClick(); setArticleLang('pt'); }}
                                                disabled={translating}
                                                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer clickable ${
                                                    articleLang === 'pt'
                                                        ? 'bg-primary/20 text-primary border border-primary/40 font-bold'
                                                        : 'text-slate-400 hover:text-white border border-transparent'
                                                }`}
                                            >
                                                {translating ? (
                                                    <i className="fas fa-circle-notch fa-spin text-[10px]"></i>
                                                ) : (
                                                    <i className="fas fa-language text-xs"></i>
                                                )}
                                                <span>Traduzir via Google Translate</span>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                                    {displayedTitle}
                                </h1>

                                {translateError && articleLang === 'pt' && (
                                    <div className="mt-3 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center justify-between gap-2">
                                        <span><i className="fas fa-exclamation-circle mr-1.5"></i>{translateError}</span>
                                        <button
                                            type="button"
                                            onClick={() => setArticleLang('en')}
                                            className="underline hover:text-white cursor-pointer"
                                        >
                                            {lang === 'pt' ? 'Voltar ao original' : 'Back to original'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Article Content / State */}
                        {(loading || translating) && (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <i className="fas fa-circle-notch fa-spin text-4xl text-primary mb-4"></i>
                                <p className="text-slate-400 text-sm font-medium">
                                    {translating
                                        ? (lang === 'pt' ? 'Traduzindo artigo técnico para Português (preservando blocos de código)...' : 'Translating technical article to Portuguese (preserving code blocks)...')
                                        : (lang === 'pt' ? 'Carregando análise técnica...' : 'Loading technical analysis...')}
                                </p>
                            </div>
                        )}

                        {error && !loading && !translating && (
                            <div className="text-center py-16">
                                <i className="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
                                <h3 className="text-lg font-bold text-white mb-2">{lang === 'pt' ? 'Erro ao carregar artigo' : 'Error loading article'}</h3>
                                <p className="text-slate-400 text-xs max-w-md mx-auto">{error}</p>
                            </div>
                        )}

                        {isLocked && !loading && !error && (
                            <div className="flex flex-col items-center justify-center py-16 text-center max-w-lg mx-auto">
                                <div className="w-16 h-16 rounded-2xl bg-[#FF424D]/15 border border-[#FF424D]/30 flex items-center justify-center mb-6 shadow-xl shadow-[#FF424D]/20">
                                    <i className="fas fa-lock text-3xl text-[#FF424D]"></i>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3">
                                    {lang === 'pt' ? 'Projeto Classificado & Confidencial' : 'Classified Technical Breakdown'}
                                </h2>
                                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                    {lang === 'pt'
                                        ? 'Esta análise técnica de engenharia reversa e arquitetura de software é confidencial. Para ler a dissecação de estruturas e código-fonte, apoie nosso trabalho no Patreon.'
                                        : 'This reverse engineering and architectural deep dive is confidential. Unlock full memory struct dumps and source code analysis by supporting on Patreon.'}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                    <a
                                        href="https://www.patreon.com/15458299/join"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-6 py-3 bg-[#FF424D] hover:bg-[#e03640] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#FF424D]/25 flex items-center justify-center gap-2"
                                    >
                                        <i className="fab fa-patreon"></i> {lang === 'pt' ? 'Assinar no Patreon' : 'Subscribe on Patreon'}
                                    </a>
                                    <button
                                        onClick={() => { playSoftClick(); onOpenPatreon(); }}
                                        className="px-6 py-3 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <i className="fas fa-key"></i> {lang === 'pt' ? 'Já sou membro (Login)' : 'Already a Member (Log In)'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {!loading && !translating && !error && !isLocked && displayedMarkdown && (
                            <>
                                <div
                                    id="journal-reader"
                                    className="markdown-body leading-relaxed text-slate-300 selection:bg-primary selection:text-white"
                                    dangerouslySetInnerHTML={{
                                        __html: window.DOMPurify 
                                            ? window.DOMPurify.sanitize(window.marked ? window.marked.parse(displayedMarkdown) : displayedMarkdown, {
                                                ADD_TAGS: ['model-viewer', 'iframe'],
                                                ADD_ATTR: ['src', 'alt', 'auto-rotate', 'camera-controls', 'shadow-intensity', 'exposure', 'style', 'poster', 'allow', 'allowfullscreen', 'frameborder', 'loading', 'download', 'data-model-src', 'onclick', 'translate']
                                            })
                                            : (window.marked ? window.marked.parse(displayedMarkdown) : displayedMarkdown)
                                    }}
                                />
                                <JournalComments
                                    articleSlug={activeArticleSlug}
                                    articleTitle={activeEntry?.title || activeArticleSlug}
                                    lang={lang}
                                />
                            </>
                        )}
                    </div>

                    {/* Footer citation inside Journal */}
                    <div className="pt-8 mt-12 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
                        <div>
                            <span>Eduardo Gelain (SpetDev) · Research Papers</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                            >
                                <i className="fas fa-arrow-up text-[10px]"></i> {lang === 'pt' ? 'Topo' : 'Top'}
                            </button>
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
};

// --- FULL INTEGRATED PRIVACY STATEMENT VIEW (SPA) ---
const PrivacyView = ({ onBackToHome }) => {
    const { lang } = useContext(LanguageContext);

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto relative z-10 animate-fade-in">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between gap-4 mb-8 glass-panel p-4 sm:p-5 rounded-2xl border border-white/[0.1] shadow-2xl backdrop-blur-xl">
                <button
                    onClick={() => { playSoftClick(); onBackToHome(); }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-white text-xs sm:text-sm font-semibold transition-all hover:border-primary/50 shadow-md group cursor-pointer clickable"
                >
                    <i className="fas fa-arrow-left text-primary group-hover:-translate-x-1 transition-transform"></i>
                    <span>{lang === 'pt' ? 'Voltar ao Portfólio' : 'Back to Portfolio'}</span>
                </button>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <i className="fas fa-shield-alt text-primary"></i>
                    <span>{lang === 'pt' ? 'Termos & Privacidade' : 'Privacy & Security'}</span>
                </div>
            </div>

            {/* Privacy Card */}
            <article className="glass-panel rounded-2xl p-6 sm:p-12 border border-white/[0.08] shadow-2xl backdrop-blur-xl text-slate-300 space-y-8">
                <div className="border-b border-white/[0.08] pb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        {lang === 'pt' ? 'Política de Privacidade & Cookies' : 'Privacy Policy & Cookie Statement'}
                    </h1>
                    <p className="text-xs font-mono text-slate-500">
                        {lang === 'pt' ? 'Última atualização: Setembro 2026' : 'Last updated: September 2026'}
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="text-primary font-mono">01.</span>
                        <span>{lang === 'pt' ? 'Coleta de Dados & Telemetria' : 'Data Collection & Analytics'}</span>
                    </h2>
                    <p className="text-sm leading-relaxed text-slate-400">
                        {lang === 'pt'
                            ? 'Este portfólio é hospedado como um site estático no GitHub Pages e utiliza Cloudflare Workers na borda para funcionalidades de backend (contador de visitas e inteligência artificial).'
                            : 'This portfolio is hosted as a static website on GitHub Pages and leverages Cloudflare Workers at the edge for backend functionality.'}
                    </p>
                    <p className="text-sm leading-relaxed text-slate-400">
                        {lang === 'pt'
                            ? 'Para exibir o contador de visitas do portfólio, este site envia um ping anônimo para um Cloudflare Worker ao carregar. Esse worker lê metadados genéricos não identificáveis (como ASN, país e User-Agent) unicamente para fins estatísticos agregados e mitigação de bots.'
                            : 'In order to display the "Portfolio Visitors" counter, this site sends an anonymous ping to a Cloudflare Worker upon loading. This function reads non-identifying metadata (such as generic ASN/Country data and User-Agent) solely for the purpose of aggregated analytics and mitigating bot abuse.'}
                    </p>
                </div>

                <div className="space-y-4 border-t border-white/[0.06] pt-6">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="text-primary font-mono">02.</span>
                        <span>{lang === 'pt' ? 'Ausência de Cookies de Rastreamento Persistente' : 'No Persistent Tracking Cookies'}</span>
                    </h2>
                    <p className="text-sm leading-relaxed text-slate-400">
                        {lang === 'pt'
                            ? 'Este site NÃO utiliza cookies de rastreamento de terceiros (como Google Analytics, Meta Pixel ou anunciantes) e não armazena informações de identificação pessoal (PII) no seu dispositivo.'
                            : 'This website does not use tracking cookies (e.g., Google Analytics, Meta Pixel) and does not store personally identifiable information (PII) on your device without your explicit consent.'}
                    </p>
                    <p className="text-sm leading-relaxed text-slate-400">
                        {lang === 'pt'
                            ? 'Preferências de interface como tema 3D ativo, idioma selecionado e som são salvas exclusivamente no localStorage do seu próprio navegador.'
                            : 'UI preferences such as the active 3D space theme, selected language, and audio state are saved exclusively in your browser\'s local storage.'}
                    </p>
                </div>

                <div className="space-y-4 border-t border-white/[0.06] pt-6">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="text-primary font-mono">03.</span>
                        <span>{lang === 'pt' ? 'Integrações de Terceiros (Patreon)' : 'Third-Party Integrations'}</span>
                    </h2>
                    <p className="text-sm leading-relaxed text-slate-400">
                        {lang === 'pt'
                            ? 'Caso você utilize o recurso "Entrar com Patreon" para desbloquear artigos confidenciais do Journal, a autenticação ocorre com segurança via OAuth 2.0 nos servidores do Patreon. O seu token nunca é compartilhado com terceiros e serve apenas para checar o status de apoiador.'
                            : 'If you use the "Log in with Patreon" feature to unlock exclusive Journal entries, you will be subject to Patreon\'s Privacy Policy. The authentication process is handled securely via OAuth 2.0 and is only used to verify your subscription status.'}
                    </p>
                </div>

                <div className="space-y-4 border-t border-white/[0.06] pt-6">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="text-primary font-mono">04.</span>
                        <span>{lang === 'pt' ? 'Contato & Responsável' : 'Contact'}</span>
                    </h2>
                    <p className="text-sm leading-relaxed text-slate-400">
                        {lang === 'pt'
                            ? 'Se você tiver qualquer dúvida sobre como os dados são tratados neste site, entre em contato diretamente pelo e-mail:'
                            : 'If you have any questions regarding how data is handled on this site, feel free to contact me at:'}
                    </p>
                    <div className="inline-block px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-primary font-mono text-xs">
                        <i className="fas fa-envelope mr-2"></i> gelain15mj@gmail.com
                    </div>
                </div>
            </article>
        </div>
    );
};

// --- REAL-TIME FPS & GPU TELEMETRY HUD (Triggered via CLI 'fps' command) ---
const FpsTelemetryHud = ({ isActive, onClose }) => {
    const fpsValRef = useRef(null);
    const minValRef = useRef(null);
    const msValRef = useRef(null);
    const gpuValRef = useRef(null);
    const secValRef = useRef(null);

    useEffect(() => {
        if (!isActive) return;
        let rafId;
        let lastTime = performance.now();
        let lastUiUpdate = lastTime;
        let frameCount = 0;
        // Ring buffer of frame times (ms) over the last ~120 frames to track 1% low / max frame spike
        const ringSize = 120;
        const frameTimes = new Float32Array(ringSize);
        let ringIdx = 0;
        let ringFilled = 0;

        const detectActiveSection = (scrollYVal) => {
            const ids = ['top', 'about', 'projects', 'skills', 'journal', 'contact'];
            const midY = window.innerHeight * 0.45;
            for (let i = 0; i < ids.length; i++) {
                const el = document.getElementById(ids[i]);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= midY && rect.bottom >= midY) {
                        return `#${ids[i]}`;
                    }
                }
            }
            return `Y:${scrollYVal}`;
        };

        const tick = (now) => {
            rafId = requestAnimationFrame(tick);
            const dt = now - lastTime;
            lastTime = now;
            if (dt <= 0 || dt > 1000) return;

            frameCount++;
            frameTimes[ringIdx] = dt;
            ringIdx = (ringIdx + 1) % ringSize;
            if (ringFilled < ringSize) ringFilled++;

            if (now - lastUiUpdate >= 200) {
                const elapsed = now - lastUiUpdate;
                const avgFps = Math.round((frameCount * 1000) / elapsed);
                const avgMs = (elapsed / frameCount).toFixed(1);

                let maxDt = 0;
                for (let i = 0; i < ringFilled; i++) {
                    if (frameTimes[i] > maxDt) maxDt = frameTimes[i];
                }
                const minFps = maxDt > 0 ? Math.round(1000 / maxDt) : avgFps;

                // Perform all layout reads BEFORE any DOM mutations to avoid Forced Synchronous Reflow
                const scrollYVal = Math.round(window.scrollY);
                const activeSecLabel = secValRef.current ? detectActiveSection(scrollYVal) : '';

                if (fpsValRef.current) {
                    fpsValRef.current.textContent = `${avgFps} FPS`;
                    fpsValRef.current.style.color = avgFps >= 90 ? '#34d399' : (avgFps >= 50 ? '#fbbf24' : '#f87171');
                }
                if (minValRef.current) {
                    minValRef.current.textContent = `Min: ${minFps} | Max: ${maxDt.toFixed(1)}ms`;
                    minValRef.current.style.color = minFps >= 60 ? '#94a3b8' : (minFps >= 40 ? '#fbbf24' : '#f87171');
                }
                if (msValRef.current) {
                    msValRef.current.textContent = `Avg: ${avgMs} ms`;
                }
                if (gpuValRef.current) {
                    const rInfo = window.__spetRenderer && window.__spetRenderer.info && window.__spetRenderer.info.render;
                    if (rInfo) {
                        const tris = rInfo.triangles >= 1000 ? `${(rInfo.triangles / 1000).toFixed(1)}k` : rInfo.triangles;
                        gpuValRef.current.textContent = `Draws: ${rInfo.calls} | Tris: ${tris}`;
                    } else {
                        gpuValRef.current.textContent = `WebGL: 2D/Idle`;
                    }
                }
                if (secValRef.current) {
                    secValRef.current.textContent = `Scroll: ${scrollYVal}px (${activeSecLabel})`;
                }

                frameCount = 0;
                lastUiUpdate = now;
            }
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [isActive]);

    if (!isActive) return null;

    return (
        <div
            className="fixed top-16 right-4 z-[99990] bg-black/90 border border-primary/40 rounded-xl px-3.5 py-2.5 font-mono text-[11px] shadow-2xl select-none pointer-events-auto"
            style={{ transform: 'translateZ(0)', minWidth: '195px' }}
        >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-1 mb-1.5">
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span ref={fpsValRef} className="text-sm font-bold text-emerald-400">-- FPS</span>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    title="Close FPS HUD (or type 'fps' in CLI)"
                    className="text-slate-400 hover:text-white text-xs px-1 cursor-pointer clickable"
                >
                    ✕
                </button>
            </div>
            <div className="space-y-0.5 text-[10px] leading-tight">
                <div ref={msValRef} className="text-slate-300">Avg: -- ms</div>
                <div ref={minValRef} className="text-slate-400">Min: -- | Max: --ms</div>
                <div ref={gpuValRef} className="text-sky-400">Draws: -- | Tris: --</div>
                <div ref={secValRef} className="text-amber-300/90 pt-0.5 border-t border-white/[0.06]">Scroll: 0px (#top)</div>
            </div>
        </div>
    );
};

// --- ROOT APPLICATION COMPONENT ---
const App = () => {
    const STORAGE_KEY = 'spet_portfolio_settings';
    const DEFAULT_SETTINGS = {
        companionBot: true,
        disableWelcomeMessage: false,
        musicPlayer: false,
        musicAutoPlay: false,
        defaultLang: 'pt',
        theme: 'space2',
        skyboxIndex: 0,
        easterEggSign: false
    };

    const [settings, setSettings] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            const astroWelcomeSaved = localStorage.getItem('astro_welcome_enabled');
            if (saved) {
                const parsed = JSON.parse(saved);
                const disableWelcome = parsed.disableWelcomeMessage !== undefined 
                    ? parsed.disableWelcomeMessage 
                    : (astroWelcomeSaved !== null ? astroWelcomeSaved === 'false' : false);
                return {
                    companionBot: parsed.companionBot !== undefined ? parsed.companionBot : DEFAULT_SETTINGS.companionBot,
                    disableWelcomeMessage: disableWelcome,
                    musicPlayer: parsed.musicPlayer !== undefined ? parsed.musicPlayer : DEFAULT_SETTINGS.musicPlayer,
                    musicAutoPlay: parsed.musicAutoPlay !== undefined ? parsed.musicAutoPlay : DEFAULT_SETTINGS.musicAutoPlay,
                    defaultLang: parsed.defaultLang || parsed.defaultLanguage || DEFAULT_SETTINGS.defaultLang,
                    theme: (!parsed.theme || parsed.theme === 'space') ? DEFAULT_SETTINGS.theme : parsed.theme,
                    skyboxIndex: parsed.skyboxIndex !== undefined ? parsed.skyboxIndex : DEFAULT_SETTINGS.skyboxIndex,
                    easterEggSign: parsed.easterEggSign !== undefined ? parsed.easterEggSign : DEFAULT_SETTINGS.easterEggSign
                };
            } else if (astroWelcomeSaved !== null) {
                return {
                    ...DEFAULT_SETTINGS,
                    disableWelcomeMessage: astroWelcomeSaved === 'false'
                };
            }
        } catch (e) {}
        return DEFAULT_SETTINGS;
    });

    const [lang, setLang] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.defaultLang || parsed.defaultLanguage) return parsed.defaultLang || parsed.defaultLanguage;
            }
        } catch (e) {}
        return 'pt';
    });

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [activeGalaxyProject, setActiveGalaxyProject] = useState(null);

    // Listen to spet:open-project-modal to open ProjectModal in Galaxy Map mode!
    useEffect(() => {
        const handleOpenProjModal = (e) => {
            const pId = e.detail?.projectId;
            if (!pId) return;
            const p = (PORTFOLIO_DATA.projectsData || []).find(proj => proj.id === pId);
            if (p) setActiveGalaxyProject(p);
        };
        window.addEventListener('spet:open-project-modal', handleOpenProjModal);
        return () => window.removeEventListener('spet:open-project-modal', handleOpenProjModal);
    }, []);

    const [isGalaxyMapActive, setIsGalaxyMapActive] = useState(() => settings.theme === 'space3');
    const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
    const [galaxyLoading, setGalaxyLoading] = useState({
        active: false,
        fadeOut: false,
        isExiting: false,
        progress: 0,
        statusText: ''
    });

    const triggerGalaxyMapTransition = useCallback((targetActive, targetSector = null) => {
        playCosmicSfx('warp', settings);
        setIsThemeTransitioning(true);

        if (targetActive) {
            // ENTERING GALAXY MAP
            setGalaxyLoading({
                active: true,
                fadeOut: false,
                isExiting: false,
                progress: 15,
                statusText: lang === 'pt' ? 'Iniciando dobra estelar...' : 'Engaging warp drive...'
            });

            setTimeout(() => {
                setGalaxyLoading(prev => ({
                    ...prev,
                    progress: 60,
                    statusText: lang === 'pt' ? 'Compilando malha estelar & 55.000 corpos celestes...' : 'Compiling stellar mesh & 55,000 celestial bodies...'
                }));
                setIsGalaxyMapActive(true);
            }, 300);

            setTimeout(() => {
                setGalaxyLoading(prev => ({
                    ...prev,
                    progress: 90,
                    statusText: lang === 'pt' ? 'Alinhando matriz de projeção tridimensional...' : 'Aligning 3D projection matrix...'
                }));
            }, 700);

            setTimeout(() => {
                setGalaxyLoading(prev => ({
                    ...prev,
                    progress: 100,
                    statusText: lang === 'pt' ? 'Conexão orbital estabelecida.' : 'Orbital link established.'
                }));
                if (targetSector) {
                    window.dispatchEvent(new CustomEvent('spet:space3-jump', { detail: { sector: targetSector } }));
                }
            }, 950);

            setTimeout(() => {
                setGalaxyLoading(prev => ({ ...prev, fadeOut: true }));
            }, 1150);

            setTimeout(() => {
                setGalaxyLoading({ active: false, fadeOut: false, isExiting: false, progress: 0, statusText: '' });
                setIsThemeTransitioning(false);
            }, 1650);
        } else {
            // EXITING GALAXY MAP
            setGalaxyLoading({
                active: true,
                fadeOut: false,
                isExiting: true,
                progress: 25,
                statusText: lang === 'pt' ? 'Desacelerando dobra espacial...' : 'Disengaging warp field...'
            });

            setTimeout(() => {
                setGalaxyLoading(prev => ({
                    ...prev,
                    progress: 70,
                    statusText: lang === 'pt' ? 'Restaurando viewport padrão & desalocando shaders...' : 'Restoring standard viewport & freeing shaders...'
                }));
                setIsGalaxyMapActive(false);
            }, 300);

            setTimeout(() => {
                setGalaxyLoading(prev => ({
                    ...prev,
                    progress: 100,
                    statusText: lang === 'pt' ? 'Órbita restabelecida.' : 'Orbit restored.'
                }));
            }, 600);

            setTimeout(() => {
                setGalaxyLoading(prev => ({ ...prev, fadeOut: true }));
            }, 750);

            setTimeout(() => {
                setGalaxyLoading({ active: false, fadeOut: false, isExiting: false, progress: 0, statusText: '' });
                setIsThemeTransitioning(false);
            }, 1250);
        }
    }, [settings, lang]);

    // Handle spet:open-galaxy-map event
    useEffect(() => {
        const handleOpenGalaxyMap = (e) => {
            const targetSec = e.detail?.targetSector || null;
            triggerGalaxyMapTransition(true, targetSec);
        };
        window.addEventListener('spet:open-galaxy-map', handleOpenGalaxyMap);
        return () => window.removeEventListener('spet:open-galaxy-map', handleOpenGalaxyMap);
    }, [triggerGalaxyMapTransition]);

    // Global Key Listener for (Q) and (ESC)
    useEffect(() => {
        const handleGlobalKeys = (e) => {
            const tag = e.target?.tagName?.toLowerCase();
            if (tag === 'input' || tag === 'textarea' || e.target?.isContentEditable) return;

            if (e.key === 'q' || e.key === 'Q') {
                e.preventDefault();
                triggerGalaxyMapTransition(!isGalaxyMapActive);
            } else if (e.key === 'Escape' && isGalaxyMapActive) {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('spet:space3-try-exit-mode'));
            }
        };
        window.addEventListener('keydown', handleGlobalKeys);
        return () => window.removeEventListener('keydown', handleGlobalKeys);
    }, [isGalaxyMapActive, triggerGalaxyMapTransition]);

    // --- ROUTING STATE (SPA: Home / Journal / Privacy) ---
    const parseRoute = () => {
        try {
            const path = window.location.pathname.replace(/\/index\.html$/, '');
            const hash = window.location.hash.replace(/^#/, '');
            const params = new URLSearchParams(window.location.search);
            const postParam = params.get('post');

            if (path.toLowerCase().includes('doomjaja') || hash.toLowerCase().includes('doomjaja')) {
                return { view: 'home', postId: null };
            }

            if (path.includes('/privacy') || hash === 'privacy') {
                return { view: 'privacy', postId: null, section: null };
            }

            if (path.includes('/tools') || hash === 'tools') {
                return { view: 'home', postId: null, section: 'tools' };
            }

            if (path.includes('/journal') || hash.startsWith('entry_') || hash === 'journal' || postParam) {
                let postId = postParam || null;
                if (!postId) {
                    const match = path.match(/\/journal\/([^\/\.]+)/);
                    if (match && match[1] && match[1] !== 'index') {
                        postId = decodeURIComponent(match[1]);
                    } else if (hash && hash !== 'journal') {
                        postId = hash;
                    }
                }
                return { view: 'journal', postId };
            }
        } catch (e) {}
        return { view: 'home', postId: null };
    };

    const initialRoute = parseRoute();
    const [currentView, setCurrentView] = useState(initialRoute.view);
    const [activeJournalPost, setActiveJournalPost] = useState(initialRoute.postId);

    const navigateTo = useCallback((view, payload) => {
        if (typeof playSoftClick === 'function') playSoftClick();
        if (view === 'home') {
            const targetSection = typeof payload === 'string' ? payload : null;
            setCurrentView('home');
            setActiveJournalPost(null);
            if (targetSection) {
                window.history.pushState({ view: 'home', sectionId: targetSection }, '', `/#${targetSection}`);
                setTimeout(() => {
                    const el = document.getElementById(targetSection);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 50);
            } else {
                window.history.pushState({ view: 'home' }, '', '/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else if (view === 'journal') {
            const postId = typeof payload === 'string' ? payload : null;
            setCurrentView('journal');
            setActiveJournalPost(postId);
            const targetUrl = postId ? `/journal/${postId}/` : '/journal/';
            window.history.pushState({ view: 'journal', postId }, '', targetUrl);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (view === 'tools') {
            setCurrentView('home');
            setActiveJournalPost(null);
            window.history.pushState({ view: 'home', sectionId: 'tools' }, '', '/#tools');
            setTimeout(() => {
                const el = document.getElementById('tools');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        } else if (view === 'privacy') {
            setCurrentView('privacy');
            setActiveJournalPost(null);
            window.history.pushState({ view: 'privacy' }, '', '/privacy.html');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, []);

    useEffect(() => {
        const handlePopState = () => {
            const route = parseRoute();
            setCurrentView(route.view);
            setActiveJournalPost(route.postId);
            if (route.view === 'home') {
                const hash = window.location.hash.replace(/^#/, '');
                if (hash) {
                    setTimeout(() => {
                        const el = document.getElementById(hash);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                }
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    useEffect(() => {
        if (initialRoute?.section) {
            setTimeout(() => {
                const el = document.getElementById(initialRoute.section);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    }, [initialRoute?.section]);

    // --- LOADING SCREEN STATE ---
    const isSearchBot = useMemo(() => (
        typeof navigator !== 'undefined' &&
        /bot|googlebot|crawler|spider|robot|crawling|bingbot|gptbot|claudebot|perplexitybot|applebot|lighthouse/i.test(navigator.userAgent || '')
    ), []);
    const [isLoadingScreen, setIsLoadingScreen] = useState(() => !isSearchBot && currentView !== 'journal');
    const [loadingProgress, setLoadingProgress] = useState(15);
    const [loadingAsset, setLoadingAsset] = useState(() =>
        lang === 'pt' ? 'Iniciando ambiente Espaço 2.0...' : 'Initializing Space 2.0 environment...'
    );
    const [isFadeOut, setIsFadeOut] = useState(false);

    // Seamlessly hand off from the static pre-hydration HTML placeholder to React's dynamic 3D asset loading overlay
    useLayoutEffect(() => {
        const initScreen = document.getElementById('initial-loading-screen');
        if (initScreen && initScreen.parentNode) {
            initScreen.parentNode.removeChild(initScreen);
        }
    }, []);

    const handleCanvasProgress = useCallback((percent, assetName) => {
        setLoadingProgress(prev => Math.max(prev, percent));
        if (assetName) {
            setLoadingAsset(lang === 'pt' ? `Carregando ${assetName}...` : `Loading ${assetName}...`);
        }
    }, [lang]);

    const handleCanvasLoaded = useCallback(() => {
        setLoadingProgress(100);
        setLoadingAsset(lang === 'pt' ? 'Ambiente 3D pronto!' : '3D environment ready!');

        // Ensure static pre-hydration initial-loading-screen is also dismissed
        if (typeof window.dismissInitialLoadingScreen === 'function') {
            window.dismissInitialLoadingScreen();
        } else {
            const initScreen = document.getElementById('initial-loading-screen');
            if (initScreen && initScreen.parentNode) {
                initScreen.parentNode.removeChild(initScreen);
            }
        }

        setTimeout(() => {
            setIsFadeOut(true);
            setTimeout(() => {
                setIsLoadingScreen(false);
            }, 750);
        }, 400);
    }, [lang]);

    // Emergency timeout: 60s fallback in case of complete network failure, ensuring loading screen never prematurely dismisses before 3D models and nebula load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFadeOut(true);
            setTimeout(() => {
                setIsLoadingScreen(false);
            }, 750);
        }, 60000);
        return () => clearTimeout(timer);
    }, []);

    // If theme is changed away from 3D (space2 / sky2), complete loading screen promptly
    useEffect(() => {
        if (settings.theme !== 'space2' && settings.theme !== 'sky2') {
            const t = setTimeout(() => {
                setIsFadeOut(true);
                setTimeout(() => setIsLoadingScreen(false), 500);
            }, 600);
            return () => clearTimeout(t);
        }
    }, [settings.theme]);
    const [isCVOpen, setIsCVOpen] = useState(false);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [terminalInitialMessage, setTerminalInitialMessage] = useState(null);
    const [showPatreonModal, setShowPatreonModal] = useState(false);
    const [easterGame, setEasterGame] = useState(() => {
        try {
            const path = window.location.pathname.toLowerCase();
            const hash = window.location.hash.toLowerCase();
            const params = new URLSearchParams(window.location.search);
            if (path.includes('doomjaja') || hash.includes('doomjaja') || params.get('game') === 'delicia_doom' || params.get('game') === 'doomjaja') {
                return 'delicia_doom';
            }
        } catch (e) {}
        return null;
    });

    useEffect(() => {
        const checkDirectEasterGame = () => {
            try {
                const path = window.location.pathname.toLowerCase();
                const hash = window.location.hash.toLowerCase();
                const params = new URLSearchParams(window.location.search);
                if (path.includes('doomjaja') || hash.includes('doomjaja') || params.get('game') === 'delicia_doom' || params.get('game') === 'doomjaja') {
                    setEasterGame('delicia_doom');
                }
            } catch (e) {}
        };
        window.addEventListener('hashchange', checkDirectEasterGame);
        window.addEventListener('popstate', checkDirectEasterGame);
        return () => {
            window.removeEventListener('hashchange', checkDirectEasterGame);
            window.removeEventListener('popstate', checkDirectEasterGame);
        };
    }, []);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isMascotOpen, setIsMascotOpen] = useState(false);
    const [isZarathustraOpen, setIsZarathustraOpen] = useState(false);
    const [isZarathustraMinimized, setIsZarathustraMinimized] = useState(false);
    const [isDeliciaActive, setIsDeliciaActive] = useState(() => Boolean(typeof window !== 'undefined' && window.__spetDeliciaActive));
    const [ffMusicState, setFfMusicState] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.musicPlayer && parsed.musicAutoPlay) {
                    return {
                        isActive: true,
                        isOpen: false,
                        isMinimized: true,
                        playlist: 'ff',
                        trackIndex: 0
                    };
                }
            }
        } catch (e) {}
        return {
            isActive: false,
            isOpen: false,
            isMinimized: false,
            playlist: 'ff',
            trackIndex: 0
        };
    });
    const konamiIndexRef = useRef(0);

    useEffect(() => {
        if (settings.musicPlayer && settings.musicAutoPlay && !ffMusicState.isActive) {
            setFfMusicState({
                isActive: true,
                isOpen: false,
                isMinimized: true,
                playlist: 'ff',
                trackIndex: 0
            });
        }
    }, [settings.musicPlayer, settings.musicAutoPlay]);

    useEffect(() => {
        const handleDelicia = (e) => {
            const nextState = (typeof e.detail?.enabled === 'boolean') ? e.detail.enabled : !isDeliciaActive;
            setIsDeliciaActive(nextState);
            if (nextState && ffMusicState.isActive) {
                setFfMusicState(prev => ({ ...prev, isActive: false, isOpen: false, isMinimized: false }));
            }
        };
        window.addEventListener('spet:delicia-toggle', handleDelicia);
        return () => window.removeEventListener('spet:delicia-toggle', handleDelicia);
    }, [isDeliciaActive, ffMusicState.isActive]);

    useEffect(() => {
        const handleOpenEasterGame = (e) => {
            if (e.detail && e.detail.game) {
                setEasterGame(e.detail.game);
            }
        };
        window.addEventListener('spet:open-easter-game', handleOpenEasterGame);
        return () => window.removeEventListener('spet:open-easter-game', handleOpenEasterGame);
    }, []);

    const [isFpsOpen, setIsFpsOpen] = useState(() => Boolean(typeof window !== 'undefined' && window.__spetFpsActive));
    useEffect(() => {
        const handleFpsToggle = (e) => {
            const nextState = (typeof e.detail?.enabled === 'boolean') ? e.detail.enabled : !isFpsOpen;
            setIsFpsOpen(nextState);
        };
        window.addEventListener('spet:fps-toggle', handleFpsToggle);
        return () => window.removeEventListener('spet:fps-toggle', handleFpsToggle);
    }, [isFpsOpen]);

    useEffect(() => {
        const handleOpenTerminal = (e) => {
            if (e.detail && e.detail.initialMessage) {
                setTerminalInitialMessage(e.detail.initialMessage);
            } else {
                setTerminalInitialMessage(null);
            }
            setIsTerminalOpen(true);
        };
        const handleOpenPatreonModal = () => setShowPatreonModal(true);
        window.addEventListener('spet:open-terminal', handleOpenTerminal);
        window.addEventListener('spet:open-patreon-modal', handleOpenPatreonModal);
        return () => {
            window.removeEventListener('spet:open-terminal', handleOpenTerminal);
            window.removeEventListener('spet:open-patreon-modal', handleOpenPatreonModal);
        };
    }, []);

    const handleMusicCommand = (action, payload) => {
        const currentPl = ffMusicState.playlist === 'cod' ? 'cod' : 'ff';
        const getTrackList = (pl) => pl === 'cod' ? COD_MENU_TRACKS : FF_CLASSIC_TRACKS;

        if (action === 'ff') {
            const list = FF_CLASSIC_TRACKS;
            const targetIdx = typeof payload === 'number' && payload >= 0 && payload < list.length ? payload : 0;
            setFfMusicState({
                isActive: true,
                isOpen: false,
                isMinimized: true,
                playlist: 'ff',
                trackIndex: targetIdx
            });
            setSettings(prev => {
                if (!prev.musicPlayer) {
                    const next = { ...prev, musicPlayer: true };
                    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
                    return next;
                }
                return prev;
            });
            return { ...list[targetIdx], playlist: 'ff', index: targetIdx };
        } else if (action === 'cod') {
            const list = COD_MENU_TRACKS;
            const targetIdx = typeof payload === 'number' && payload >= 0 && payload < list.length ? payload : 0;
            setFfMusicState({
                isActive: true,
                isOpen: false,
                isMinimized: true,
                playlist: 'cod',
                trackIndex: targetIdx
            });
            setSettings(prev => {
                if (!prev.musicPlayer) {
                    const next = { ...prev, musicPlayer: true };
                    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
                    return next;
                }
                return prev;
            });
            return { ...list[targetIdx], playlist: 'cod', index: targetIdx };
        } else if (action === 'switchPlaylist') {
            const targetPl = payload === 'cod' ? 'cod' : 'ff';
            const list = getTrackList(targetPl);
            setFfMusicState(prev => ({
                ...prev,
                isActive: true,
                playlist: targetPl,
                trackIndex: 0
            }));
            return { ...list[0], playlist: targetPl, index: 0 };
        } else if (action === 'togglePlaylist') {
            const nextPl = currentPl === 'cod' ? 'ff' : 'cod';
            const list = getTrackList(nextPl);
            setFfMusicState(prev => ({
                ...prev,
                isActive: true,
                playlist: nextPl,
                trackIndex: 0
            }));
            return { ...list[0], playlist: nextPl, index: 0 };
        } else if (action === 'play' || action === 'playMinimized') {
            const isMin = action === 'playMinimized' || (typeof payload === 'object' && payload?.minimized);
            const targetPl = (typeof payload === 'object' && payload?.playlist) || currentPl;
            const list = getTrackList(targetPl);
            const targetIdx = typeof payload === 'number' 
                ? payload 
                : (typeof payload === 'object' && typeof payload?.index === 'number' ? payload.index : ffMusicState.trackIndex);
            const nextIdx = targetIdx >= 0 && targetIdx < list.length ? targetIdx : 0;
            setFfMusicState({
                isActive: true,
                isOpen: !isMin,
                isMinimized: isMin,
                playlist: targetPl,
                trackIndex: nextIdx
            });
            setSettings(prev => {
                if (!prev.musicPlayer) {
                    const next = { ...prev, musicPlayer: true };
                    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
                    return next;
                }
                return prev;
            });
            return { ...list[nextIdx], playlist: targetPl, index: nextIdx };
        } else if (action === 'next') {
            let nextTrackObj = null;
            setFfMusicState(prev => {
                const currentPl = prev.playlist === 'cod' ? 'cod' : 'ff';
                const list = getTrackList(currentPl);
                const nextIdx = (prev.trackIndex + 1) % list.length;
                nextTrackObj = { ...list[nextIdx], playlist: currentPl, index: nextIdx };
                return {
                    ...prev,
                    isActive: true,
                    trackIndex: nextIdx
                };
            });
            return nextTrackObj;
        } else if (action === 'prev') {
            let prevTrackObj = null;
            setFfMusicState(prev => {
                const currentPl = prev.playlist === 'cod' ? 'cod' : 'ff';
                const list = getTrackList(currentPl);
                const prevIdx = (prev.trackIndex - 1 + list.length) % list.length;
                prevTrackObj = { ...list[prevIdx], playlist: currentPl, index: prevIdx };
                return {
                    ...prev,
                    isActive: true,
                    trackIndex: prevIdx
                };
            });
            return prevTrackObj;
        } else if (action === 'random' || action === 'shuffle') {
            let randTrackObj = null;
            setFfMusicState(prev => {
                const currentPl = prev.playlist === 'cod' ? 'cod' : 'ff';
                const list = getTrackList(currentPl);
                let nextIdx = Math.floor(Math.random() * list.length);
                if (list.length > 1 && nextIdx === prev.trackIndex) {
                    nextIdx = (nextIdx + 1) % list.length;
                }
                randTrackObj = { ...list[nextIdx], playlist: currentPl, index: nextIdx };
                return {
                    ...prev,
                    isActive: true,
                    trackIndex: nextIdx
                };
            });
            return randTrackObj;
        } else if (action === 'stop' || action === 'pause') {
            setFfMusicState(prev => ({
                ...prev,
                isActive: false,
                isOpen: false,
                isMinimized: false
            }));
            setSettings(prev => {
                if (prev.musicPlayer) {
                    const next = { ...prev, musicPlayer: false };
                    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
                    return next;
                }
                return prev;
            });
            return null;
        } else if (action === 'open') {
            const list = getTrackList(currentPl);
            const currentIdx = ffMusicState.trackIndex >= 0 && ffMusicState.trackIndex < list.length ? ffMusicState.trackIndex : 0;
            setFfMusicState(prev => ({
                ...prev,
                isActive: true,
                isOpen: true,
                isMinimized: false
            }));
            return { ...list[currentIdx], playlist: currentPl, index: currentIdx };
        }
        return null;
    };

    const handleUpdateSetting = (key, value) => {
        const normalizedKey = key === 'defaultLanguage' ? 'defaultLang' : key;
        setSettings(prev => {
            const next = { ...prev, [normalizedKey]: value };
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
                if (normalizedKey === 'disableWelcomeMessage') {
                    localStorage.setItem('astro_welcome_enabled', value ? 'false' : 'true');
                }
            } catch (e) {}
            return next;
        });

        if (normalizedKey === 'defaultLang') {
            setLang(value);
        }
        if (normalizedKey === 'musicPlayer') {
            if (value) {
                handleMusicCommand('playMinimized', 0);
            } else {
                handleMusicCommand('stop');
            }
        }
    };

    const handleResetDefaults = () => {
        setSettings(DEFAULT_SETTINGS);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
            localStorage.setItem('astro_welcome_enabled', 'true');
        } catch (e) {}
        setLang(DEFAULT_SETTINGS.defaultLang);
        handleMusicCommand('stop');
    };


    const t = (path) => {
        const parts = path.split('.');
        let curr = PORTFOLIO_DATA.translations[lang];
        for (let p of parts) {
            if (!curr || curr[p] === undefined) return path;
            curr = curr[p];
        }
        return curr;
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey && e.key.toLowerCase() === 'k') || e.key === '`') {
                e.preventDefault();
                setIsTerminalOpen(prev => !prev);
            }
        };
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('scroll', handleScroll, { passive: true });

        const KONAMI_SEQUENCE = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
        const handleKonamiKeys = (e) => {
            const key = e.key.toLowerCase();
            if (key === KONAMI_SEQUENCE[konamiIndexRef.current]) {
                konamiIndexRef.current++;
                if (konamiIndexRef.current === KONAMI_SEQUENCE.length) {
                    konamiIndexRef.current = 0;
                    playSoftClick();
                    setIsZarathustraOpen(true);
                    setIsZarathustraMinimized(false);

                }
            } else {
                konamiIndexRef.current = (key === KONAMI_SEQUENCE[0]) ? 1 : 0;
            }
        };
        window.addEventListener('keydown', handleKonamiKeys);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keydown', handleKonamiKeys);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        playSoftClick();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {/* Loading Screen Overlay with Space 1.0 Live Background */}
            {isLoadingScreen && (
                <div
                    id="loading-screen"
                    className={`fixed inset-0 z-[99999] flex flex-col justify-between p-6 sm:p-10 select-none transition-opacity duration-700 ease-out overflow-hidden ${
                        isFadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
                    }`}
                    style={{
                        backgroundColor: '#050505'
                    }}
                >
                    {/* Space 1.0 (Canvas 2D) as real-time interactive animated background while Space 2.0 3D assets initialize */}
                    <div className="absolute inset-0 pointer-events-auto">
                        <SpaceCanvas theme="space" />
                    </div>

                    {/* Subtle top & bottom soft vignette for readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/75 pointer-events-none" />

                    {/* Top Header: Restrained, authentic branding */}
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <span className="text-sm font-bold tracking-tight text-white">Eduardo Gelain</span>
                            <span className="text-slate-600 text-xs">/</span>
                            <span className="text-xs text-slate-400">SpetDev</span>
                        </div>
                        <div className="text-xs text-slate-500 font-mono hidden sm:block">
                            {lang === 'pt' ? 'Espaço 1.0 Interativo' : 'Interactive Space 1.0'}
                        </div>
                    </div>

                    {/* Bottom Status & Progress Dock: Clean, unboxed, zero AI-slop */}
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div className="max-w-sm w-full">
                            <div className="flex items-center justify-between text-xs mb-2">
                                <span className="text-slate-300 font-medium">
                                    {lang === 'pt' ? 'Carregando universo 3D' : 'Loading 3D space'}
                                </span>
                                <span className="text-primary font-mono font-bold text-xs">{loadingProgress}%</span>
                            </div>

                            {/* Minimal 2px hairline progress bar */}
                            <div className="h-[2px] w-full bg-white/[0.12] rounded-full overflow-hidden mb-2">
                                <div
                                    className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
                                    style={{ width: `${loadingProgress}%` }}
                                />
                            </div>

                            <p className="text-[11px] text-slate-400 truncate font-mono">
                                {loadingAsset}
                            </p>
                        </div>

                        {/* Interactive pilot hint */}
                        <div className="text-[11px] text-slate-400 font-mono sm:text-right">
                            {lang === 'pt' 
                                ? 'Mova o cursor para navegar · Setas (↑ ← ↓ →) ou W/A/S/D guiam o astronauta'
                                : 'Move cursor to fly · Arrow keys (↑ ← ↓ →) or W/A/S/D pilot astronaut'}
                        </div>
                    </div>
                </div>
            )}

            {/* Galaxy Map Cinematic Warp Loadscreen (Smooth enter/exit transitions) */}
            {galaxyLoading.active && (
                <div
                    id="galaxy-warp-loadscreen"
                    className={`fixed inset-0 z-[99998] flex flex-col justify-between p-6 sm:p-10 select-none transition-opacity duration-500 ease-out overflow-hidden ${
                        galaxyLoading.fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
                    }`}
                    style={{ backgroundColor: '#030508' }}
                >
                    {/* Animated background & vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/30 via-[#030508]/80 to-[#030508] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

                    {/* Top Header */}
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <img src="/assets/icons/spet_sprites/portal_wormhole.png" alt="" className="w-4 h-4 pixelated" />
                            <span className="text-sm font-bold tracking-tight text-white font-mono">SpetDev // Galaxy Engine</span>
                            <span className="text-slate-600 text-xs">/</span>
                            <span className="text-xs font-mono text-cyan-400">
                                {galaxyLoading.isExiting ? '[WARP_DEACTIVATION]' : '[WARP_ENGAGEMENT_SEQUENCE]'}
                            </span>
                        </div>
                        <div className="text-xs text-slate-500 font-mono hidden sm:block">
                            {galaxyLoading.isExiting ? 'RELAY: DOCKED // DESYNAPSE' : 'RELAY: ACTIVE // 55,000 BODIES'}
                        </div>
                    </div>

                    {/* Center Reticle / Telemetry */}
                    <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center space-y-3">
                        <div className="relative flex items-center justify-center w-16 h-16">
                            <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-ping opacity-30"></div>
                            <div className="absolute inset-2 rounded-full border border-dashed border-cyan-400/50 animate-spin" style={{ animationDuration: '6s' }}></div>
                            <img
                                src="/assets/icons/spet_sprites/portal_wormhole.png"
                                alt=""
                                className="w-8 h-8 pixelated animate-pulse"
                            />
                        </div>
                        <div className="text-xs font-mono font-semibold tracking-wider text-cyan-300 uppercase">
                            {galaxyLoading.statusText}
                        </div>
                        <div className="text-[11px] font-mono text-slate-500">
                            {galaxyLoading.isExiting 
                                ? (lang === 'pt' ? 'Restaurando viewport padrão e buffers gráficos...' : 'Restoring standard viewport and graphic buffers...')
                                : (lang === 'pt' ? 'Compilando shaders estelares & malhas orbitais Three.js...' : 'Compiling stellar shaders & Three.js orbital meshes...')}
                        </div>
                    </div>

                    {/* Bottom Status & Progress Bar */}
                    <div className="relative z-10 max-w-md w-full mx-auto">
                        <div className="flex items-center justify-between text-xs mb-2 font-mono">
                            <span className="text-slate-400">
                                {galaxyLoading.isExiting 
                                    ? (lang === 'pt' ? 'Desconectando mapa galáctico' : 'Disengaging galaxy map') 
                                    : (lang === 'pt' ? 'Sincronizando coordenadas 3D' : 'Synchronizing 3D coordinates')}
                            </span>
                            <span className="text-cyan-400 font-bold">{galaxyLoading.progress}%</span>
                        </div>
                        <div className="h-[2px] w-full bg-white/[0.12] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 transition-all duration-300 ease-out rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                                style={{ width: `${galaxyLoading.progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {isSearchBot ? (
                <div className="fixed inset-0 z-0 bg-[#050505] pointer-events-none" />
            ) : (isGalaxyMapActive || settings.theme === 'space3') ? (
                <SpaceCanvasV3
                    skyboxIndex={settings.skyboxIndex || 0}
                    onLoadingProgress={handleCanvasProgress}
                    onLoaded={handleCanvasLoaded}
                    settings={settings}
                    lang={lang}
                    isJukeboxPlaying={Boolean(ffMusicState.isActive)}
                    isEasterGameOpen={Boolean(easterGame)}
                    isFullscreenGalaxyMode={isGalaxyMapActive}
                    onExitFullscreenGalaxy={() => triggerGalaxyMapTransition(false)}
                    onToggleUI={() => triggerGalaxyMapTransition(!isGalaxyMapActive)}
                />
            ) : settings.theme === 'space2' ? (
                <React.Fragment>
                    <SpaceCanvasV2 
                        skyboxIndex={settings.skyboxIndex || 0} 
                        onLoadingProgress={handleCanvasProgress}
                        onLoaded={handleCanvasLoaded}
                    />
                    <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-black/80 via-black/40 to-transparent pointer-events-none" />
                </React.Fragment>
            ) : settings.theme === 'sky2' ? (
                <React.Fragment>
                    <SkyCanvasV2 />
                    <div className="fixed inset-0 z-0 bg-black/50 pointer-events-none" />
                </React.Fragment>
            ) : <SpaceCanvas theme={settings.theme} />}

            {/* Main Website Content - hidden while loading to prevent overlap */}
            <div className={`transition-opacity duration-700 ${(isLoadingScreen && !isFadeOut && !isSearchBot && currentView !== 'journal') || isGalaxyMapActive ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
                <TopBar
                    onOpenCV={() => { playSoftClick(); setIsCVOpen(true); }}
                    onToggleTerminal={() => { playSoftClick(); setIsTerminalOpen(prev => !prev); }}
                    onOpenEasterMenu={() => { playSoftClick(); setEasterGame('sign'); }}
                    onOpenPatreon={() => { playSoftClick(); setShowPatreonModal(true); }}
                    onOpenSettings={() => { playSoftClick(); setIsSettingsOpen(true); }}
                    settings={settings}
                    currentView={currentView}
                    onNavigateHome={(sec) => navigateTo('home', sec)}
                    onNavigateJournal={(id) => navigateTo('journal', id)}
                />

                <main>
                    {currentView === 'home' && (
                        <React.Fragment>
                            <Hero
                                onOpenCV={() => { playSoftClick(); setIsCVOpen(true); }}
                                onToggleTerminal={() => { playSoftClick(); setIsTerminalOpen(true); }}
                            />
                            <AboutSection />
                            <ExperienceSection />
                            <ProjectsSection onNavigateJournal={(id) => navigateTo('journal', id)} />
                            <SkillsSection />
                            <ToolsSection />
                            <JournalSection onNavigateJournal={(id) => navigateTo('journal', id)} />
                            <ContactSection />
                        </React.Fragment>
                    )}

                    {currentView === 'journal' && (
                        <JournalView
                            activePostId={activeJournalPost}
                            onSelectPost={(id) => navigateTo('journal', id)}
                            onBackToHome={() => navigateTo('home')}
                            onOpenPatreon={() => { playSoftClick(); setShowPatreonModal(true); }}
                        />
                    )}

                    {currentView === 'privacy' && (
                        <PrivacyView
                            onBackToHome={() => navigateTo('home')}
                        />
                    )}
                </main>

                <Footer
                    currentView={currentView}
                    onOpenEasterMenu={() => { playSoftClick(); setEasterGame('sign'); }}
                    onNavigateHome={(sec) => navigateTo('home', sec)}
                    onNavigateJournal={(id) => navigateTo('journal', id)}
                    onNavigatePrivacy={() => navigateTo('privacy')}
                />

                {/* Floating 'Scroll to Top' Button */}
                <button
                    onClick={scrollToTop}
                    aria-label={lang === 'pt' ? 'Voltar ao topo' : 'Scroll to top'}
                    title={lang === 'pt' ? 'Voltar ao topo' : 'Scroll to top'}
                    className={`fixed bottom-6 right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#050505]/90 hover:bg-primary text-slate-300 hover:text-white border border-white/[0.15] hover:border-primary/60 shadow-xl shadow-black/70 hover:shadow-primary/30 backdrop-blur-xl flex items-center justify-center transition-all duration-300 transform group clickable cursor-pointer ${
                        showScrollTop
                            ? 'opacity-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                >
                    <i className="fas fa-chevron-up text-sm sm:text-base transition-transform duration-200 group-hover:-translate-y-0.5"></i>
                </button>
            </div>

            {/* Modals */}
            {activeGalaxyProject && (
                <ProjectModal
                    project={activeGalaxyProject}
                    onClose={() => setActiveGalaxyProject(null)}
                    lang={lang}
                    onOpen3DViewer={() => {}}
                    onNavigateJournal={(jid) => {
                        window.location.href = `/journal/${jid}/`;
                    }}
                />
            )}

            {isCVOpen && (
                <ResumeModal
                    isOpen={isCVOpen}
                    onClose={() => setIsCVOpen(false)}
                />
            )}

            {isTerminalOpen && (
                <TerminalModal
                    isOpen={isTerminalOpen}
                    isGalaxyMapActive={Boolean(isGalaxyMapActive || settings.theme === 'space3')}
                    initialMessage={terminalInitialMessage}
                    onClose={() => { setIsTerminalOpen(false); setTerminalInitialMessage(null); }}
                    onOpenCV={() => setIsCVOpen(true)}
                    onOpenEaster={(game) => setEasterGame(game)}
                    onMusicCommand={handleMusicCommand}
                    activeMusicTrack={ffMusicState.isActive ? (ffMusicState.playlist === 'cod' ? COD_MENU_TRACKS[ffMusicState.trackIndex] : FF_CLASSIC_TRACKS[ffMusicState.trackIndex]) : null}
                    onOpenSettings={() => setIsSettingsOpen(true)}
                    onNavigateJournal={(id) => navigateTo('journal', id)}
                    onOpen3DViewer={(modelId) => {
                        window.dispatchEvent(new CustomEvent('spet:open-3d-viewer', { detail: { modelId: modelId || 'chicken' } }));
                    }}
                />
            )}

            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                settings={settings}
                onUpdateSetting={handleUpdateSetting}
                onResetDefaults={handleResetDefaults}
                lang={lang}
                setLang={(l) => { setLang(l); handleUpdateSetting('defaultLang', l); }}
                isGalaxyMapActive={Boolean(isGalaxyMapActive || settings.theme === 'space3')}
            />

            {easterGame && (
                <EasterEggModal
                    activeGame={easterGame}
                    onClose={() => setEasterGame(null)}
                    onSelectGame={(game) => {
                        if (game === 'music') {
                            setEasterGame(null);
                            handleMusicCommand('play', 0);
                        } else {
                            setEasterGame(game);
                        }
                    }}
                />
            )}

            <FinalFantasyJukebox
                state={ffMusicState}
                onClose={() => setFfMusicState(prev => ({ ...prev, isActive: false, isOpen: false, isMinimized: false }))}
                onMinimize={() => setFfMusicState(prev => ({ ...prev, isMinimized: true, isOpen: false }))}
                onExpand={() => setFfMusicState(prev => ({ ...prev, isMinimized: false, isOpen: true }))}
                onNext={() => handleMusicCommand('next')}
                onPrev={() => handleMusicCommand('prev')}
                onRandom={() => handleMusicCommand('random')}
                onSelectTrack={(idx) => handleMusicCommand('play', idx)}
                onSwitchPlaylist={(pl) => handleMusicCommand('switchPlaylist', pl)}
            />
        
            {settings.companionBot && (
                <MascotCompanion
                    isOpen={isMascotOpen}
                    setIsOpen={setIsMascotOpen}
                    lang={lang}
                    disableWelcome={Boolean(settings.disableWelcomeMessage)}
                    onToggleWelcome={(disabled) => handleUpdateSetting('disableWelcomeMessage', disabled)}
                />
            )}
            <ZarathustraEasterEgg isOpen={isZarathustraOpen} onClose={() => setIsZarathustraOpen(false)} isMinimized={isZarathustraMinimized} setIsMinimized={setIsZarathustraMinimized} />

            {/* Delicia Easter Egg Looping Audio & Status Indicator (40% Default Volume) */}
            <DeliciaPlayer 
                isActive={isDeliciaActive} 
                lang={lang} 
                onClose={() => {
                    window.__spetDeliciaActive = false;
                    window.dispatchEvent(new CustomEvent('spet:delicia-toggle', { detail: { enabled: false } }));
                }} 
            />

            <FpsTelemetryHud
                isActive={isFpsOpen}
                onClose={() => {
                    window.__spetFpsActive = false;
                    setIsFpsOpen(false);
                }}
            />

            {showPatreonModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setShowPatreonModal(false)}></div>
                    <div className="relative bg-[#050505]/95 backdrop-blur-xl border border-white/[0.12] p-8 rounded-2xl max-w-md w-full shadow-2xl text-center">
                        <button onClick={() => setShowPatreonModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                            <i className="fas fa-times"></i>
                        </button>
                        <i className="fab fa-patreon text-[#FF424D] text-6xl mb-6 drop-shadow-[0_0_15px_rgba(255,66,77,0.4)]"></i>
                        <h2 className="text-2xl font-bold text-white mb-4">
                              {lang === 'pt' ? 'Desbloquear Conteúdo Exclusivo' : 'Unlock Exclusive Content'}
                          </h2>
                          <p className="text-slate-300 font-medium mb-6">
                              {lang === 'pt' 
                                  ? 'Ganhe benefícios exclusivos como acesso antecipado ao Journal, análises técnicas profundas e acesso a repositórios de projetos confidenciais!' 
                                  : 'Get exclusive benefits like early Journal previews, deep technical breakdowns, and access to closed-source project repositories!'}
                          </p>
                          
                          <div className="flex flex-col gap-3 w-full">
                              <a href="https://www.patreon.com/15458299/join" target="_blank" rel="noreferrer" className="w-full py-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] hover:border-[#FF424D]/50 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm text-center px-4 leading-tight">
                                  <i className="fas fa-lock-open text-[#FF424D]"></i> {lang === 'pt' ? 'Assinar para Insights de Projetos Secretos & Journals!' : 'Subscribe for exclusive Journal Entries & Secret Projects Insights!'}
                              </a>

                              <button onClick={async (e) => {
                                  try {
                                      localStorage.setItem('patreon_free_unlocked', 'true');
                                      window.dispatchEvent(new Event('spet:patreon-unlock'));
                                  } catch (err) {}
                                  e.currentTarget.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Connecting...';
                                  try {
                                      const r = await fetch('https://journal.gelain15mj.workers.dev/api/patreon/auth-url');
                                      const d = await r.json();
                                      window.location.href = d.url;
                                  } catch(err) {
                                      setShowPatreonModal(false);
                                  }
                              }} className="w-full py-3 px-4 bg-[#FF424D] hover:bg-[#e03640] text-white font-bold rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 text-sm text-center leading-tight cursor-pointer">
                                  <i className="fab fa-patreon shrink-0"></i>
                                  <span>
                                      {lang === 'pt'
                                          ? 'Quero Liberar Entries Exclusivas para quem está logado! (Fazer Log In e liberar entries gratuitas)'
                                          : 'Unlock Exclusive Entries for Logged-In Users! (Log In & unlock free entries)'}
                                  </span>
                              </button>
                          </div>
                    </div>
                </div>
            )}

        </LanguageContext.Provider>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);