# TODO - Portfolio Roadmap & Backlog

## 🌐 1. Tradução Automática Sob Demanda do Technical Journal (PT-BR)

### 📌 Contexto & Motivação
Todas as entradas do Technical Journal são mantidas e indexadas 100% em inglês (essencial para SEO global, indexação do Google e compartilhamento na gringa). No entanto, quando um usuário navega pelo portfólio com o idioma setado em Português (`lang === 'pt'`), seria ideal permitir que ele leia os artigos traduzidos automaticamente para PT-BR sem perder a precisão técnica.

### 🛠️ Arquitetura Proposta (Client-Side On-Demand com Cache)
1. **Preservação do Original (Zero impacto em SEO):**
   - Os arquivos Markdown (`journal/*.md`) continuam 100% em inglês.
   - Os crawlers do Google continuam lendo os artigos em inglês com SEO intacto.

2. **Botão de Alternância no Leitor do Journal:**
   - Adicionar uma chave/toggle no cabeçalho de leitura do artigo (`JournalModal` / leitor de post):
     - `[🇺🇸 English (Original)]` / `[🇧🇷 Traduzir para Português 🌐]`
   - Feedback visual ao traduzir: estado de loading ("Traduzindo artigo via Google Translate...").

3. **Proteção de Código e Termos Técnicos (`notranslate`):**
   - Blocos `<pre>`, `<code>`, tabelas de offsets, comandos de terminal e termos de engenharia reversa (ex: `DXVK`, `IWAD`, `PWAD`, `GSC VM`, `4GB Patch`, `d3d9.dll`, `LAA`) recebem o atributo `class="notranslate"` e `translate="no"`.
   - Isso evita que o tradutor quebre códigos, nomes de arquivos, registradores de assembly ou flags de compilação.

4. **Cache Local no Navegador (`localStorage`):**
   - Ao traduzir um artigo, salvar o resultado em `localStorage`:
     - Chave: `journal_translation_${slug}_pt`
   - Se o usuário abrir o artigo novamente, a versão traduzida é carregada instantaneamente da memória local sem chamadas adicionais de rede.

5. **Mecanismo de Tradução:**
   - **Opção A (API Client-side On-Demand):** Chamar endpoint de tradução sob demanda apenas para os parágrafos de texto puro (`<p>`, `<li>`, `<h1>`-`<h6>`), recombinando com o HTML já parseado.
   - **Opção B (Google Translate Web Element / Script Injection):** Injeção pontual do script de tradução do Google restrito ao container `.journal-content-body` quando ativado pelo usuário.

---

## 🎮 2. Easter Egg: Delicia Doom (Em Planejamento)
- Integração do mod total conversion `doomjaja.WAD` (26.8 MB) no vault de jogos e CLI (`delicia doom`).
- Mais detalhes técnicos e alternativas de engine WASM descritos abaixo.
