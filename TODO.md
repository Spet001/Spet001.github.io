# TODO

- [ ] QA do Galaxy Map
- [ ] Criar imagem de capa dedicada para o novo card do Tools (/tools), pois a foto atual usada é uma captura direta do app (e mover as outras fotos/capturas para o carrossel do estudo de caso)

---

# ROADMAP DE ENGENHARIA — SPET01.DEV TOOLS

## 📦 1. Spet's Universal Game File Opener — Novos Parsers & Sub-módulos
- [ ] **MS Store / Xbox GDK `wgs` Save Container Converter (`WGS <-> Raw/Steam`):** Parser e reconstrutor completo para a estrutura `SystemAppData\wgs` (`containers.index`, `container.<N>` e blobs com nomes GUID hexadecimais de 32 chars). Permite extrair saves da MS Store (ex: CoD Ghosts GDK, Game Pass) com seus nomes reais em UTF-16LE e reempacotar saves da Steam/editados de volta para o formato GDK.
- [ ] **Universal Crash Dump (`.dmp` / `.mdmp`) Instant Analyzer:** Leitor binário de Windows Minidump (`MDMP` header, `ExceptionStream`, `ModuleListStream`, `SystemInfoStream`) 100% client-side. Mostra o código da exceção (`0xC0000005`, etc.), registradores (`RIP`/`RSP`), qual `.exe` ou `.dll` causou o crash (ex: `d3d11.dll`, `xgameruntime.dll`) e a lista de módulos carregados.
- [ ] **PE Import/Export Table (IAT/EAT) & Dependency Doctor:** Quando o usuário abrir qualquer `.exe` ou `.dll` no Universal File Opener, exibir a árvore visual da Import Address Table (IAT), mostrando quais DLLs de DirectX (`d3d9`, `d3d11`, `dxgi`), VC++ ou GDK (`xgameruntime.dll`) o binário exige e detectando conflitos de arquitetura (32-bit vs 64-bit / erro `0xc000007b`).
- [ ] **3D Mesh & Skeletal Animation Ripper/Viewer:** Visualizador 3D com suporte a Bones/Rigging para modelos extraídos de pacotes de jogos (CoD `xmodel`, Unity `.assets`, PS1/PS2) com exportação direta para `.FBX` / `.GLB`.
- [ ] **Game Cutscene & Video Transcoder (`.BIK` Bink / `.USM` CRIWARE <-> `.MP4`/`WebM`):** Player e conversor client-side (via WASM) para assistir, extrair e converter vídeos de loading/cutscenes proprietários de jogos.
- [ ] **Retro Palette & Fullbright Colormap Extractor/Converter:** Extrator de paletas de 256 cores (`PLAYPAL` / `COLORMAP` de DOOM, Quake, Heretic) e conversor de texturas modernas preservando índices de cores *fullbright*.
- [ ] **CoD FastFile (`.ff`) Asset Dependency Graph & Weapon/Rawfile Inspector:** Grafo visual dos *XAssets* internos (`weapon`, `xmodel`, `material`, `rawfile`, `scriptparse` / GSC) com visualização de tabelas de atributos e extração direta.
- [ ] **Aprimoramento dos Parsers Unity & Unreal Engine:** Melhorar o suporte existente a pacotes Unity (`.assets`, `.bundle`, `.unitypackage` e `global-metadata.dat` IL2CPP) e Unreal (`.pak` / `.utoc` / `.ucas` com suporte a chave AES e preview de `.ini`/`.uasset`).
- [ ] **Cheat Engine `.CT` Inspector & C++/ASI Generator:** Parser de tabelas `.CT` (XML) com auditoria contra scripts Lua maliciosos, visualização da árvore de ponteiros e geração automática de código C++ (`WriteProcessMemory` / DLL ASI Hook).
- [ ] **Retro WAD/BSP 3D Level Viewer & Lump Ripper:** Renderizador WebGL (Three.js) embutido para visualizar mapas `.wad` e `.bsp` em 3D com câmera free-fly e exportação para `.OBJ`/`.GLTF`.
- [ ] **DirectX Texture (`.dds`) & Shader Bytecode (`.cso`/`.fxc`) Inspector:** Visualizador de texturas DDS (incluindo modo raw/headerless para BC1/BC3/BC7 com canais R/G/B/A isolados) e descompilador de DXBC para HLSL/GLSL.
- [ ] **Game Audio Bank Unpacker & Loop Studio:** Extrator e player para `.fsb` (FMOD), `.wem`/`.bnk` (Wwise) e `.awb`/`.acb` (CRIWARE) via Web Audio API + WASM, com visualizador de pontos de Seamless Loop (`LoopStart`/`LoopEnd`).

## 🔬 2. Spet's Easy Online Decompiler — Expansão de Engenharia Reversa
- [ ] **Visual Binary Diffing (Web BinDiff Lite — Steam vs. GDK/MS Store):** Comparador de dois executáveis PE/ELF lado a lado que faz o match de funções equivalentes (mesmo com offsets diferentes entre builds Steam e UWP/GDK) via CFG, chamadas de API e strings.
- [ ] **Auto-SigMaker & AoB Pattern Forger:** Gerador de assinaturas de bytes (IDA, Cheat Engine, C++ `FindPattern`, Ghidra) mascarando wildcards automaticamente em instruções de salto relativo e offsets RIP-relative via Capstone WASM.
- [ ] **Struct-to-Memory Visual Mapper (Web ReClass) & Hex/RVA/Pointer Calculator:** Painel interativo para mapear structs C++ sobre um dump hex + Calculadora de Engenharia Reversa integrada (`VA <-> RVA <-> Raw File Offset`, aritmética Hex/Int64/Float IEEE-754 e Endian Swap).
- [ ] **DLL Proxy / Hijack Wrapper, D3D VTable Hook & ASI Conflict Manager:**
  - Leitor de Export Address Table (EAT) de qualquer `.dll` (`version.dll`, `winmm.dll`, `d3d9.dll`, `d3d11.dll`, `dxgi.dll`, `xgameruntime.dll`) gerando o código `.cpp` e `.def` de proxy DLL.
  - Gerador de boilerplate C++ com índices exatos de VTable para DirectX (`Present`, `EndScene`, `ResizeBuffers`, `DrawIndexed`) + template Dear ImGui.
  - Analisador de conflitos de múltiplos mods/wrappers (`dxgi.dll` + `d3d11.dll` + ASI Loader) gerando configuração de *chainloading* sem crash.

## 🛠️ 3. Novas Standalone Tools (DirectX Optimization, ReShade, 2.5D & Patching)
- [ ] **Spet's DirectX Low-Spec & Wrapper Optimizer Studio (Open-Source "OptiJuegos" Alternative):**
  - Bancada client-side que analisa o `.exe` do jogo (detectando se usa `d3d9`, `d3d11` ou `d3d12` via IAT) e gera pacotes customizados de otimização extrema e tradução de API:
  - Configuração de **Texture LOD Bias / Mipmap Spoofing** (reduzindo o consumo de VRAM em GPUs de 1GB/2GB como GT 710 / Intel HD sem modificar os arquivos originais do jogo).
  - Hooks configuráveis de `d3d11`/`d3d9` para desativar sombras pesadas, volumetria, bloom/fog, forçar *Flip Model Presentation* e compilar shaders de forma assíncrona (gerando a DLL wrapper open-source + arquivos de configuração prontos).
- [x] **Spet's Deterministic ReShade Preset & 3D LUT Studio (100% Math / Zero AI):** *(Concluído — publicado em `/tools/reshade-studio/` e `github.com/Spet001/reshade-web`)*
  - *Dual-Image Color Match:* O usuário sobe uma screenshot limpa do jogo + uma imagem de referência. Via transferência estatística de cor no espaço CIE LAB (algoritmo de Reinhard) e análise de histograma RGB, calcula matematicamente os parâmetros de `LiftGammaGain.fx`, `Curves.fx`, `Levels.fx`, `Tonemap.fx`, `Technicolor2.fx`, `Clarity.fx`, `LumaSharpen.fx`, `Pixelate.fx`, `UIMask.fx` e `Dither.fx` (incluindo quantização PS1 15-bit RGB555 + Bayer 4×4 e filtro Anti-Piss de 7ª geração), exibe preview antes/depois e exporta o pacote completo ReShade 6.8.0 (`.ZIP` com `.ini` + textura 3D LUT `SpetLUT.png` 1024×32 + shaders `.fx` + DLL oficial detectada automaticamente para o jogo).
- [ ] **Spet's 3D-to-2.5D Sprite & FPS Weapon HUD Studio (Pipeline Meshy ➡️ Outcaster/DOOM):**
  - *Modo Inimigos/Props:* Carrega modelos `.glb`/`.fbx` (Meshy/Mixamo) e renderiza Sprite Sheets nas 8 direções clássicas (`A1..A8`) com quantização de paleta retro e dithering.
  - *Modo 1st-Person Weapon HUD:* Câmera em 1ª pessoa para posicionar armas 3D no canto da tela, simular animações procedurais de *bobbing*, *recoil*, *muzzle flash* e *reload*, exportando os frames alinhados para o *Outcaster* (Unity) ou GZDoom (`.WAD`/`.PK3`).
- [ ] **Spet's Game HUD & Mod Menu Visual Layout Builder:** Editor *drag-and-drop* em Canvas 16:9 para desenhar interfaces de jogos e exportar o código posicionado diretamente para **Unity UI (C#)**, **Call of Duty GSC (`HudElem`)** ou **Dear ImGui (C++ D3D9/D3D11)**.
- [x] **Spet's Legacy EXE Patcher & 4GB LAA Studio:** *(Concluído — publicado em `/tools/4gb-patch/`)* Patcher PE32/PE32+ 100% client-side para ativar a flag Large Address Aware (4GB Patch / `0x0020`), recalcular PE Checksum folded de 16 bits, remover ASLR (`~0x0040`) para debugging, exportar diffs `.1337` para x64dbg, gerar manifestos High-DPI e testar ao vivo com sample real do `Fable3.exe`.
- [ ] **ShaderToy to Unity / Three.js Transpiler:** Conversor client-side de shaders GLSL (`iTime`, `iResolution`, `iChannel`) para ShaderLab (Unity URP/Built-in) e Three.js `ShaderMaterial` com preview ao vivo.
