# TODO - Portfolio Roadmap & Backlog

## 1. Tradução Automática Sob Demanda do Technical Journal (PT-BR)

### Contexto & Motivação
Todas as entradas do Technical Journal são mantidas e indexadas 100% em inglês (essencial para SEO global, indexação do Google e compartilhamento na comunidade internacional). No entanto, quando um usuário navega pelo portfólio com o idioma setado em Português (`lang === 'pt'`), seria ideal permitir que ele leia os artigos traduzidos automaticamente para PT-BR sem perder a precisão técnica.

### Arquitetura Proposta (Client-Side On-Demand com Cache)
1. **Preservação do Original (Zero impacto em SEO):**
   - Os arquivos Markdown (`journal/md/*.md`) continuam 100% em inglês.
   - Os crawlers do Google continuam lendo os artigos em inglês com SEO intacto.

2. **Botão de Alternância no Leitor do Journal:**
   - Adicionar uma chave/toggle no cabeçalho de leitura do artigo (`JournalView`):
     - `[EN - English (Original)]` / `[PT-BR - Traduzir para Português]`
   - Feedback visual ao traduzir: estado de loading (*"Traduzindo artigo..."*).

3. **Proteção de Código e Termos Técnicos (`notranslate`):**
   - Blocos `<pre>`, `<code>`, tabelas de offsets, comandos de terminal e termos de engenharia reversa (ex: `DXVK`, `IWAD`, `PWAD`, `GSC VM`, `4GB Patch`, `d3d9.dll`, `LAA`) recebem o atributo `class="notranslate"` e `translate="no"`.
   - Isso evita que o tradutor quebre códigos, nomes de arquivos, registradores de assembly ou flags de compilação.

4. **Cache Local no Navegador (`localStorage`):**
   - Ao traduzir um artigo, salvar o resultado em `localStorage`:
     - Chave: `journal_translation_${slug}_pt`
   - Se o usuário abrir o artigo novamente, a versão traduzida é carregada instantaneamente da memória local sem chamadas adicionais de rede.

5. **Mecanismo de Tradução:**
   - **Opção A (API Client-side On-Demand):** Chamar endpoint de tradução sob demanda apenas para os parágrafos de texto puro (`<p>`, `<li>`, `<h1>`-`<h6>`), recombinando com o HTML já parseado.
   - **Opção B (Google Translate Web Element / Script Injection):** Injeção pontual do script de tradução do Google restrito ao container `#journal-reader` quando ativado pelo usuário.

---

## 2. Ordenação do Journal por Popularidade (Visualizações) & Data

### Contexto & Motivação
Atualmente a lista de artigos na barra lateral do Journal é exibida apenas em ordem cronológica (data de publicação). Queremos tornar **Popularidade (número de visualizações)** o **novo padrão** de ordenação, com um toggle rápido para alternar entre **Popularidade** e **Data**.

### Arquitetura Proposta
1. **Backend de Contagem de Views (Cloudflare Worker + KV):**
   - Aproveitar o Cloudflare Worker existente (`METRICS_KV`) adicionando duas rotas leves:
     - `POST /api/journal/view` (recebe `{ slug }`): incrementa `journal_views:${slug}` no KV (com trava em `sessionStorage` no cliente para não contar F5 repetido na mesma sessão).
     - `GET /api/journal/views`: retorna um JSON com o mapa completo de visualizações `{ "What-Is-GSC": 412, "What-Is-A-WAD-Modern-Games": 128, ... }`.
2. **Toggle de Ordenação na Sidebar do Journal:**
   - Adicionar um seletor compacto no topo da lista de artigos (abaixo ou ao lado da barra de busca):
     - `[Mais Populares (Views)]` *(Padrão selecionado ao abrir)*
     - `[Mais Recentes (Data)]`
3. **Exibição Visual das Views:**
   - Mostrar o contador de visualizações (`<i class="far fa-eye"></i> 1.2k`) tanto nos cards da sidebar quanto nos metadados no topo do artigo aberto.
