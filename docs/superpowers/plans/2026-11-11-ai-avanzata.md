# AI avanzata — piano di implementazione

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Obiettivo:** aggiungere a `informatica/ai/` sei approfondimenti operativi, cinque diagrammi originali e i collegamenti di navigazione, senza toccare Docker e Podman.

**Architettura:** sei pagine HTML statiche lineari, ciascuna con indice interno, tabella o figura, lessico minimo e fonti. Ogni pagina è autonoma e linka le altre. La navigazione vive in `assets/js/site.js`. Nessun build step, nessuna dipendenza nuova, tutto funziona da `file://`.

**Stack:** HTML, CSS e JavaScript già presenti nel sito. SVG originali. Node solo per la validazione, fuori dal repository.

**Spec:** `docs/superpowers/specs/2026-11-11-ai-avanzata-design.md` (da leggere insieme a questo piano; le sezioni §9.x contengono il contenuto richiesto pagina per pagina).

## Vincoli globali

- **Nessun commit e nessun push.** Il committente non li ha chiesti. Nessun task termina con `git commit`.
- **Sito statico da `file://`.** Niente `fetch`, `XMLHttpRequest`, ES modules, service worker, server HTTP.
- **Nessuna dipendenza nuova nel repository.** Gli script di validazione restano in `C:\Users\Adr\AppData\Local\Temp\opencode\`. I comandi `node <script>.mjs` di questo piano si eseguono con `workdir` = `C:\Users\Adr\AppData\Local\Temp\opencode\adripedia-test`.
- **Docker e Podman non si toccano.** `git diff -- informatica/docker informatica/podman` deve restare vuoto.
- **Sei pagine nuove:** `modelli.html`, `prompt.html`, `skill.html`, `mcp.html`, `agenti.html`, `laboratorio.html`. Nessuna pagina dedicata ai framework: stanno in `skill.html#metodi`.
- **Cinque SVG nuovi** in `assets/img/ai/`, dimensioni fissate: routing 1200×560, prompt 1200×620, skill 1200×640, MCP 1200×600, orchestrazione 1200×680.
- **Niente tab** nelle nuove pagine. Niente nuovo CSS. Classi esistenti: `.page`, `.eyebrow`, `.lead`, `.section-index`, `.callout` (+ `.warn`, `.ok`, `.feature`), `.callout-tag`, `.figure`, `.table-wrap`, `.cards`, `.card`, `.card-chips`.
- **Italiano**, tono leggero ma professionale, entità HTML per accenti e virgolette (`&egrave;`, `&rsquo;`, `&mdash;`, `&ldquo;`), come il resto del sito.
- **Nessun `&nbsp;`**, nessun segnaposto `TAB_`, nessun `href` vuoto, nessun ID duplicato.
- **Date:** “11 novembre 2026” per le fonti consultate.
- **Glossario introduttivo:** resta a 38 voci.
- **Conteggi finali:** 28 pagine HTML, 21 voci in “Aggiornamenti”, 8 voci nel menu AI.
- **Esempi neutrali:** niente nomi di prodotto dentro i blocchi di codice. Placeholder `provider/model-small`, `provider/model-large`, `provider/model-reasoning`, `local-open-weights`.
- **Regola sui numeri:** se la verifica al momento dell'implementazione contraddice un numero del piano, vince la verifica, con nuova data e fonte.

## Review Focus

I cinque modi più probabili in cui questo lavoro può deludere chi legge, e il test che li blocca:

1. Un rimando dall'introduzione a `modelli.html#parametri` quando quella sezione non esiste → anchor check in Task 7, Step 5.
2. Una figura con percorso relativo sbagliato (`../assets` invece di `../../assets`) che appare rotta da `file://` → check `img.complete && naturalWidth > 0` in `page-audit.mjs`, eseguito in ogni task di pagina.
3. Nomi di prodotto o comandi di un harness dentro gli esempi del laboratorio → estrazione del testo dei `<pre>` e denylist in Task 6, Step 3.
4. La pagina MCP che scivola sulla vecchia SDK (`FastMCP`, `StdioServerTransport`) o dice che sampling è deprecato → grep di controllo in Task 4, Step 5 e Step 6.
5. Tabelle larghe o blocchi di codice che sfondano il layout a 390 px → overflow check di `page-audit.mjs` a ogni viewport, in ogni task di pagina.

---

## Scheletro condiviso delle sei pagine

Ogni pagina nuova usa esattamente questa struttura, cambiando solo i segnaposto. Il footer è copiato da `informatica/ai/index.html` (righe 760-771) e cambia solo la frase a destra.

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{TITOLO}} — Adripedia</title>
  <meta name="description" content="{{DESCRIZIONE}}">
  <link rel="stylesheet" href="../../assets/css/style.css">
  <link rel="icon" href="../../assets/img/favicon.svg" type="image/svg+xml">
  <meta name="theme-color" content="#191919">
</head>
<body data-root="../.." data-page="informatica/ai/{{FILE}}">
  <a class="skip-link" href="#main">Salta al contenuto</a>

  <aside class="sidebar" id="sidebar" aria-label="Menu laterale"></aside>
  <div class="overlay" id="overlay" hidden></div>

  <div class="content">
    <header class="topbar">
      <button class="hamburger" id="menu-toggle" type="button"
              aria-controls="sidebar" aria-expanded="true" aria-label="Chiudi il menu">
        <span></span><span></span><span></span>
      </button>
      <span class="topbar-title">{{TITOLO BREVE}}</span>
    </header>

    <main id="main" class="page">
      <p class="eyebrow">Approfondimento &middot; AI</p>
      <h1>{{TITOLO}}</h1>
      <p class="lead">{{LEAD}}</p>

      <nav class="section-index" aria-labelledby="{{SLUG}}-index-title">
        <p class="section-index-title" id="{{SLUG}}-index-title">In questa pagina</p>
        <ol>
          <li><a href="#{{ID}}">{{TITOLO SEZIONE}}</a></li>
        </ol>
      </nav>

      <!-- sezioni: ogni H2 ha un id; almeno una tabella o figura; un callout warn; lessico; fonti -->

      <h2 id="lessico">Lessico minimo</h2>
      <dl>
        <dt>{{TERMINE}}</dt><dd>{{SPIEGAZIONE}}</dd>
      </dl>

      <h2 id="fonti">Fonti</h2>
      <ul>
        <li>{{FONTE}} &mdash; consultata l&rsquo;11 novembre 2026.</li>
      </ul>
    </main>

    <footer class="footer">
      <div class="footer-inner">
        <span>&copy; 2026 Adripedia &middot; sezione AI</span>
        <span class="footer-right">
          <span>Approfondimento &middot; aggiornato l&rsquo;11 novembre 2026</span>
          <!-- copia qui il <a class="coffee-btn"> di informatica/ai/index.html -->
        </span>
      </div>
    </footer>
  </div>

  <script src="../../assets/js/site.js" defer></script>
</body>
</html>
```

Per `laboratorio.html` l'eyebrow è `Laboratorio &middot; AI` e il footer dice `Laboratorio &middot; aggiornato l&rsquo;11 novembre 2026`.

---

### Task 1: Banco di prova e pagina “Modelli e routing”

**Files:**
- Create: `C:\Users\Adr\AppData\Local\Temp\opencode\adripedia-test\page-audit.mjs`
- Create: `C:\Users\Adr\AppData\Local\Temp\opencode\adripedia-test\svg-audit-avanzata.mjs`
- Create: `C:\WS\adripedia\assets\img\ai\ai-model-routing.svg`
- Create: `C:\WS\adripedia\informatica\ai\modelli.html`

**Interfaces:**
- Consumes: lo scheletro condiviso qui sopra; `assets/js/site.js` esistente.
- Produces: `page-audit.mjs` (uso: `node page-audit.mjs <url file://> [...]`, esce 1 se trova problemi, stampa `words=N`); `svg-audit-avanzata.mjs` con l'array `files` dei cinque SVG; la pagina `modelli.html` con le ancore `#mappa`, `#profili`, `#scegliere`, `#parametri`, `#insieme`, `#routing`, `#valutare`, `#errori`, `#lessico`, `#fonti`.

- [ ] **Step 1: Scrivere `page-audit.mjs`**

Parti da `C:\Users\Adr\AppData\Local\Temp\opencode\adripedia-test\ai-audit.mjs`. Tieni la funzione `open`, i tre viewport (1280×900, 768×1024, 390×844) e i controlli già presenti: overflow orizzontale, immagini caricate, anchor interni alla pagina, errori di console e richieste `file://` fallite. Togli i blocchi specifici dell'introduzione (glossario, home, area, `nav.llm`) e fai iterare la pagina su `process.argv.slice(2)`. Se `main` manca, riporta un problema invece di lanciare un'eccezione. Aggiungi al risultato `words: document.querySelector('main').innerText.split(/\s+/).filter(Boolean).length` e `active: (document.querySelector('#sidebar a[aria-current="page"]') || {}).textContent` (testo della voce di menu attiva, `null` se manca), e stampali in ogni riga.

- [ ] **Step 2: Eseguire il banco di prova su una pagina che non esiste**

Run: `node page-audit.mjs "file:///C:/WS/adripedia/informatica/ai/modelli.html"`
Atteso: uscita 1 (file assente o `main` mancante).

- [ ] **Step 3: Scrivere `svg-audit-avanzata.mjs`**

Copia `svg-audit-ai.mjs` e sostituisci l'array `files` con i cinque percorsi:

```js
const files = [
  "file:///C:/WS/adripedia/assets/img/ai/ai-model-routing.svg",
  "file:///C:/WS/adripedia/assets/img/ai/ai-prompt-anatomy.svg",
  "file:///C:/WS/adripedia/assets/img/ai/ai-skill-structure.svg",
  "file:///C:/WS/adripedia/assets/img/ai/ai-mcp-architecture.svg",
  "file:///C:/WS/adripedia/assets/img/ai/ai-agent-orchestration.svg"
];
```

- [ ] **Step 4: Eseguire l'audit SVG e vedere che fallisce**

Run: `node svg-audit-avanzata.mjs`
Atteso: cinque errori di file mancante, uscita 1.

- [ ] **Step 5: Creare `ai-model-routing.svg`**

`width="1200" height="560" viewBox="0 0 1200 560"`, `xmlns`, `font-family` coerente con `ai-landscape.svg` (leggilo prima). Contenuto: a sinistra una card “Richiesta”; al centro una card “Classificatore” con tre uscite; a destra tre card “modello piccolo”, “modello grande”, “umano”; una freccia tratteggiata di fallback dal piccolo al grande e una dal grande all'umano; in basso una legenda a tre voci “costo / qualità / controllo”. Nessun testo sotto 12 px, nessun logo. Dopo la scrittura, se usi `Set-Content -Encoding utf8` in PowerShell 5.1, rimuovi il BOM.

- [ ] **Step 6: Eseguire l'audit SVG e vedere che passa**

Run: `node svg-audit-avanzata.mjs`
Atteso: per `ai-model-routing.svg` “Nessun testo esce dalla propria card o dal canvas” e “Nessuna sovrapposizione tra testi”. Gli altri quattro file possono ancora mancare: è atteso.

- [ ] **Step 7: Scrivere `modelli.html`**

Usa lo scheletro condiviso con `{{TITOLO}}` = “Modelli e routing”, `{{FILE}}` = `modelli.html`, `{{SLUG}}` = `modelli`, `{{TITOLO BREVE}}` = “Modelli e routing”. Contenuto secondo la spec §9.2, 2.500–3.000 parole visibili.

Struttura obbligatoria:
- `#mappa`: tre dimensioni (capacità, costo/latenza, controllo); distinguere “modello grande” da “modalità di ragionamento”.
- `#profili`: tabella 8 righe (generalista frontier, piccolo e veloce, ragionamento, contesto lungo, multimodale, pesi aperti, embedding/reranker, classificatore/router) con colonne profilo / punti di forza / limiti / uso tipico / cosa verificare.
- `#scegliere`: matrice 8 righe (coding, documenti lunghi, estrazione e classificazione, assistenza clienti, scrittura creativa, immagini e audio, dati sensibili, decisioni ad alto impatto) e le tre domande prima di scegliere.
- `#parametri`: temperatura e top-p, `max_tokens`, stop, output strutturato, effort/profondità di ragionamento, caching, batch, retry, timeout. Formula del costo per richiesta e distinzione tra costo medio e costo per compito riuscito. Spiegare che la latenza dipende anche da rete, coda, contesto e velocità di generazione.
- `#insieme`: tabella di 6 pattern (cascata, router, verificatore, planner/esecutore, ensemble/dibattito, distillazione) con beneficio / costo / quando. Citare RouteLLM e FrugalGPT come ricerca, con la cautela che i risultati non si trasferiscono automaticamente.
- `#routing`: policy JSON neutra con `small`, `large`, `reasoning`, `local-open-weights`, soglie di confidenza e budget; metriche (quota al modello piccolo, qualità contro baseline, costo per richiesta riuscita, p50/p95, tasso di fallback); LiteLLM Router e OpenRouter come esempi di instradamento, non come scelte obbligate.
- `#valutare`: 20–50 casi, rubrica, pass rate, costo per compito riuscito, p50/p95, regressione, canary.
- `#errori`: elenco dei sette errori della spec §9.2.
- `#lessico`: routing, cascata, fallback, eval, p95, modello di ragionamento.
- `#fonti`: Anthropic “Choosing the right model”, LiteLLM routing, OpenRouter provider routing, RouteLLM (arXiv 2406.18665), FrugalGPT (arXiv 2305.05176), Anthropic “Building effective agents”.

Inserisci la figura dopo `#scegliere` o dentro `#routing`, con `<img src="../../assets/img/ai/ai-model-routing.svg" width="1200" height="560">` e l'alt della spec §13. Un solo `callout warn` (sul routing come decisione di prodotto, non solo tecnica).

- [ ] **Step 8: Validare la pagina**

Run: `node C:\Users\Adr\AppData\Local\Temp\opencode\check-adripedia.js C:\WS\adripedia`
Atteso: problemi solo del tipo `mancante -> .../prompt.html`, `skill.html`, `mcp.html`, `agenti.html`, `laboratorio.html` (le pagine non ancora create). Nessun altro problema.

Run: `node page-audit.mjs "file:///C:/WS/adripedia/informatica/ai/modelli.html"`
Atteso: tre righe (desktop, tablet, mobile) con `OK`, `imgs=1200x560`, `words` ≥ 2500, nessun problema.

---

### Task 2: Pagina “Prompt, contesto e comandi”

**Files:**
- Create: `C:\WS\adripedia\assets\img\ai\ai-prompt-anatomy.svg`
- Create: `C:\WS\adripedia\informatica\ai\prompt.html`

**Interfaces:**
- Consumes: `page-audit.mjs` e `svg-audit-avanzata.mjs` dal Task 1; lo scheletro condiviso.
- Produces: `prompt.html` con le ancore `#anatomia`, `#contesto`, `#tecniche`, `#comandi`, `#pattern`, `#misurare`, `#sicurezza`, `#errori`, `#lessico`, `#fonti`.

- [ ] **Step 1: Creare `ai-prompt-anatomy.svg`**

`width="1200" height="620" viewBox="0 0 1200 620"`. Sette strati impilati (ruolo, obiettivo, contesto, vincoli, esempi, formato di output, criteri di successo), ognuno con un'etichetta e una riga di esempio. A destra una freccia verticale “togli ciò che non serve”; in basso un riquadro separato “contenuto non fidato” con bordo distinto. Palette di `ai-landscape.svg`, nessun testo sotto 12 px.

- [ ] **Step 2: Eseguire l'audit SVG**

Run: `node svg-audit-avanzata.mjs`
Atteso: `ai-prompt-anatomy.svg` senza overflow né sovrapposizioni; possono mancare gli altri tre.

- [ ] **Step 3: Scrivere `prompt.html`**

Scheletro con `{{TITOLO}}` = “Prompt, contesto e comandi”, `{{FILE}}` = `prompt.html`, `{{SLUG}}` = `prompt`. Contenuto secondo la spec §9.3, 2.500–3.000 parole visibili.

Struttura obbligatoria:
- `#anatomia`: tabella dei sette strati (strato / cosa scrivere / errore tipico), scheletro di prompt in un blocco di codice, distinzione tra istruzioni di sistema, messaggi utente e output dei tool.
- `#contesto`: contesto minimo sufficiente, gerarchia delle istruzioni, ordine dei documenti lunghi, retrieval, compaction, memoria, context rot. Riportare il dato Anthropic sugli input oltre 20k token (documenti lunghi in cima, domanda in fondo, miglioramento fino al 30% nei loro test) con l'avvertenza che non è una regola universale.
- `#tecniche`: tabella di 9 righe (zero-shot, few-shot, decomposizione, prompt chaining, output strutturato, rubrica di autovalutazione, prefill, delimitatori, descrizioni dei tool) con quando / costo / rischio.
- `#comandi`: come si trasforma un prompt in comando (parametri, contratto input/output, dry-run, idempotenza, logging, codici di uscita, retry, rate limit); tabella dei pattern `extract`, `classify`, `summarize`, `review`, `rewrite`, `route`; blocco `ai extract --schema ... --input ... --output ...` con la nota che il nome è un esempio.
- `#pattern`: quattro pattern compatti (estrazione JSON con `null` e confidenza; classificazione con “non so”; sintesi con pubblico e limite di parole; revisione con citazioni e astensione), ognuno con “quando usarlo” e “cosa può andare storto”.
- `#misurare`: set di test, tassonomia degli errori, A/B, regressione, versionamento del prompt; tabella errore / come accorgersene / contromisura.
- `#sicurezza`: injection diretta e indiretta, separazione contenuto non fidato e istruzioni, privilegi minimi, validazione dell'output, approvazione umana, niente segreti nel prompt; rimando a `mcp.html#sicurezza`.
- `#errori`, `#lessico` (contesto, prompt injection, output strutturato, few-shot, rubrica, context rot), `#fonti` (Anthropic prompt engineering e long context tips, OpenAI prompt engineering, Gemini prompting strategies, Anthropic context engineering, OWASP Top 10 for LLM Applications).

Figura con `width="1200" height="620"` e l'alt della spec §13. Un `callout warn` sulla prompt injection indiretta.

- [ ] **Step 4: Validare la pagina**

Run: `node C:\Users\Adr\AppData\Local\Temp\opencode\check-adripedia.js C:\WS\adripedia`
Atteso: solo link mancanti verso `skill.html`, `mcp.html`, `agenti.html`, `laboratorio.html`.

Run: `node page-audit.mjs "file:///C:/WS/adripedia/informatica/ai/prompt.html"`
Atteso: `OK` ai tre viewport, `imgs=1200x620`, `words` ≥ 2500.

---

### Task 3: Pagina “Skill, metodi e framework”

**Files:**
- Create: `C:\WS\adripedia\assets\img\ai\ai-skill-structure.svg`
- Create: `C:\WS\adripedia\informatica\ai\skill.html`

**Interfaces:**
- Consumes: banco di prova dal Task 1; `prompt.html#anatomia` dal Task 2.
- Produces: `skill.html` con le ancore `#cosa`, `#anatomia`, `#creare`, `#testare`, `#distribuire`, `#metodi`, `#sicurezza`, `#lessico`, `#fonti`. La sezione `#metodi` è quella linkata dalla home e dal README.

- [ ] **Step 1: Creare `ai-skill-structure.svg`**

`width="1200" height="640" viewBox="0 0 1200 640"`. A sinistra l'albero `mia-skill/` con `SKILL.md`, `scripts/`, `references/`, `assets/`. A destra i tre livelli di caricamento con i budget: metadati (~100 token), corpo (< 5.000 token, < 500 righe), risorse (a richiesta). In basso il flusso `trigger → metadati → corpo → risorse`. Palette coerente, nessun testo sotto 12 px.

- [ ] **Step 2: Eseguire l'audit SVG**

Run: `node svg-audit-avanzata.mjs`
Atteso: `ai-skill-structure.svg` senza overflow né sovrapposizioni; possono mancare gli altri due.

- [ ] **Step 3: Scrivere `skill.html`**

Scheletro con `{{TITOLO}}` = “Skill, metodi e framework”, `{{FILE}}` = `skill.html`, `{{SLUG}}` = `skill`. Contenuto secondo la spec §9.4, 3.000–3.500 parole visibili.

Struttura obbligatoria:
- `#cosa`: tabella a quattro righe skill / tool / server MCP / agente; le Agent Skills come standard aperto e portabile.
- `#anatomia`: albero delle directory; tabella del frontmatter con i limiti esatti (`name` max 64 caratteri, minuscole/numeri/trattini, niente trattini iniziali o finali, deve coincidere con la directory; `description` max 1024; `license`; `compatibility` max 500; `metadata`; `allowed-tools` sperimentale); disclosure progressiva in tre fasi con i budget; riferimenti ai file a un solo livello.
- `#creare`: sette passi; esempio completo `report-settimanale/` con albero, `SKILL.md` e uno script in pseudocodice. Nessun comando di un harness specifico.
- `#testare`: 10 richieste che devono attivare la skill e 10 che non devono; test del compito, regressione, costo in token, versionamento; `skills-ref validate ./report-settimanale`.
- `#distribuire`: repository, marketplace di plugin, installer compatibili, versioning, compatibilità tra client, governance (chi approva, chi mantiene, come si revoca).
- `#metodi`: cinque blocchi (Superpowers, Caveman, BMAD, ECC, Hermes) con “cos'è / unità di confezione / punto forte / costo e rischio / quando usarlo”, più una tabella comparativa. Numeri obbligatori, tutti con la formula “all'11 novembre 2026”:
  - Superpowers `obra/superpowers`, MIT, oltre 316.000 stelle; flusso brainstorming → design → piano → implementazione → review.
  - Caveman `JuliusBrussee/caveman`, Apache-2.0, oltre 119.000 stelle; il progetto dichiara −33,2% di token di input su sessioni intere e −65% in alcune prove, ma dichiara anche che “Answer concisely” è il baseline e che caveman taglia solo il 3% in più alla mediana (ultracave ~35%). Scrivere “il progetto dichiara”. Nota: `abczsl520/caveman-agent` è un progetto diverso.
  - BMAD `bmad-code-org/BMAD-METHOD`, oltre 55.000 stelle, v6.12 stabile e v7 alpha, licenza non SPDX standard da verificare.
  - ECC `affaan-m/ECC`, MIT, oltre 301.000 stelle; 67 agenti, 271 skill, 92 shim dichiarati nel manifest, non misure indipendenti.
  - Hermes Agent `NousResearch/hermes-agent`, MIT, oltre 262.000 stelle; loop di apprendimento che crea e migliora skill.
  - Chiusura: le stelle misurano popolarità, non qualità.
- `#sicurezza`: script eseguibili, lettura file, rete; revisione prima dell'installazione, privilegi minimi, `allowed-tools`, pin delle versioni, niente segreti, sandbox, log, revoca.
- `#lessico`: skill, disclosure progressiva, frontmatter, trigger, harness, plugin.
- `#fonti`: Agent Skills overview/specification/best practices, Anthropic Agent Skills, README dei cinque progetti.

Figura con `width="1200" height="640"` e l'alt della spec §13. Un `callout warn` sulle skill di terzi come codice di terzi.

- [ ] **Step 4: Validare la pagina**

Run: `node C:\Users\Adr\AppData\Local\Temp\opencode\check-adripedia.js C:\WS\adripedia`
Atteso: solo link mancanti verso `mcp.html`, `agenti.html`, `laboratorio.html`.

Run: `node page-audit.mjs "file:///C:/WS/adripedia/informatica/ai/skill.html"`
Atteso: `OK` ai tre viewport, `imgs=1200x640`, `words` ≥ 3000.

Run: `Select-String -Path C:\WS\adripedia\informatica\ai\skill.html -Pattern "316\.000|119\.000|55\.000|301\.000|262\.000"`
Atteso: cinque corrispondenze, una per progetto.

---

### Task 4: Pagina “Server MCP”

**Files:**
- Create: `C:\WS\adripedia\assets\img\ai\ai-mcp-architecture.svg`
- Create: `C:\WS\adripedia\informatica\ai\mcp.html`

**Interfaces:**
- Consumes: banco di prova dal Task 1; `skill.html#cosa` dal Task 3.
- Produces: `mcp.html` con le ancore `#cosa`, `#quando`, `#costruire`, `#progettare`, `#sicurezza`, `#testare`, `#distribuire`, `#lessico`, `#fonti`. `#sicurezza` è il bersaglio dei rimandi da `index.html#limiti` e `prompt.html#sicurezza`.

- [ ] **Step 1: Creare `ai-mcp-architecture.svg`**

`width="1200" height="600" viewBox="0 0 1200 600"`. A sinistra una card “Host” con due card “Client” annidate; a destra due card “Server”: uno locale (stdio) e uno remoto (Streamable HTTP). Tra client e server, frecce JSON-RPC. Sotto ogni server, le primitive esposte (tool, resource, prompt). Un contorno tratteggiato attorno ai server con l'etichetta “confine di sicurezza”. Palette coerente, nessun testo sotto 12 px.

- [ ] **Step 2: Eseguire l'audit SVG**

Run: `node svg-audit-avanzata.mjs`
Atteso: `ai-mcp-architecture.svg` senza overflow né sovrapposizioni; può mancare l'ultimo.

- [ ] **Step 3: Scrivere `mcp.html`**

Scheletro con `{{TITOLO}}` = “Server MCP”, `{{FILE}}` = `mcp.html`, `{{SLUG}}` = `mcp`. Contenuto secondo la spec §9.5, 2.500–3.000 parole visibili.

Struttura obbligatoria:
- `#cosa`: host/client/server, JSON-RPC, primitive (tool controllati dal modello, resource controllate dall'applicazione, prompt controllate dall'utente), trasporti stdio e Streamable HTTP. Revisione 2026-07-28: protocollo stateless, niente handshake `initialize`, `server/discover`, `subscriptions/listen`, pattern multi round-trip per le richieste server-initiate. Avvertenza: molti client usano ancora la 2025-11-25.
- `#quando`: tabella MCP / function calling diretto / CLI / RAG, con quando usare cosa.
- `#costruire`: server Python completo `catalogo.py` con la SDK ufficiale 2.x: `from mcp.server import MCPServer`, `mcp = MCPServer("catalogo")`, due tool (`cerca_articoli`, `leggi_articolo`) decorati con `@mcp.tool()`, una resource `catalogo://schema`, `mcp.run(transport="stdio")`, log su stderr. Poi la configurazione client generica in JSON con `command`, `args`, `env`.
- `#progettare`: un tool un lavoro, nome e descrizione chiari, schema tipizzato, output limitato e paginato, idempotenza per le scritture, errori strutturati, niente segreti nelle risposte, approvazione umana per azioni distruttive; tabella tool / cosa fare / cosa evitare.
- `#sicurezza`: confused deputy, token passthrough, OAuth 2.0, consenso, privilegi minimi, scope, sandbox, injection attraverso l'output dei tool, validazione, audit log, rate limit; differenza tra server locale (eredita i permessi del processo) e remoto (richiede autenticazione e autorizzazione).
- `#testare`: MCP Inspector con `--protocol-era modern` e `--protocol-era legacy`, test unitari dei tool, test di contratto, iniezione di errori, latenza, dimensione dell'output.
- `#distribuire`: stdio locale e Streamable HTTP remoto, autenticazione, deployment, versioning, osservabilità, compatibilità con client vecchi, rate limit, checklist di rilascio.
- `#lessico`: host, client, server, tool, resource, confused deputy.
- `#fonti`: MCP architecture, changelog 2026-07-28, server concepts, build server, security best practices, Python SDK.

Figura con `width="1200" height="600"` e l'alt della spec §13. Un `callout warn` su confused deputy e token passthrough.

- [ ] **Step 4: Validare la pagina**

Run: `node C:\Users\Adr\AppData\Local\Temp\opencode\check-adripedia.js C:\WS\adripedia`
Atteso: solo link mancanti verso `agenti.html` e `laboratorio.html`.

Run: `node page-audit.mjs "file:///C:/WS/adripedia/informatica/ai/mcp.html"`
Atteso: `OK` ai tre viewport, `imgs=1200x600`, `words` ≥ 2500.

- [ ] **Step 5: Controllare che il testo non dica cose sbagliate**

Run: `Select-String -Path C:\WS\adripedia\informatica\ai\mcp.html -Pattern "deprecat|FastMCP|StdioServerTransport|initialize"`
Atteso: `initialize` solo nella frase che dice che l'handshake non esiste più; **zero** corrispondenze per `deprecat`, `FastMCP`, `StdioServerTransport`. Se compare `deprecat`, riscrivi: sampling non è deprecato, è stato spostato nel pattern multi round-trip.

- [ ] **Step 6: Controllare l'API della SDK**

Run: `Select-String -Path C:\WS\adripedia\informatica\ai\mcp.html -Pattern "from mcp.server import MCPServer|@mcp.tool|mcp.run\(transport=\"stdio\"\)"`
Atteso: tutte e tre le forme presenti.

---

### Task 5: Pagina “Agenti e orchestrazione”

**Files:**
- Create: `C:\WS\adripedia\assets\img\ai\ai-agent-orchestration.svg`
- Create: `C:\WS\adripedia\informatica\ai\agenti.html`

**Interfaces:**
- Consumes: banco di prova dal Task 1; `modelli.html#insieme` dal Task 1; `mcp.html#progettare` dal Task 4.
- Produces: `agenti.html` con le ancore `#cosa`, `#pattern`, `#gerarchia`, `#economia`, `#affidabilita`, `#framework`, `#progettare`, `#lessico`, `#fonti`.

- [ ] **Step 1: Creare `ai-agent-orchestration.svg`**

`width="1200" height="680" viewBox="0 0 1200 680"`. In alto la card “Orchestratore”; sotto tre card worker (“Ricercatore”, “Analista”, “Redattore”); a destra la card “Revisore” con una freccia di ritorno all'orchestratore; in basso la card “Gate umano” e la card “Memoria e stato”; un riquadro “Budget” con token e tempo. Frecce etichettate (`task`, `risultato`, `approvazione`). Palette coerente, nessun testo sotto 12 px.

- [ ] **Step 2: Eseguire l'audit SVG**

Run: `node svg-audit-avanzata.mjs`
Atteso: cinque file, tutti senza overflow né sovrapposizioni, uscita 0.

- [ ] **Step 3: Scrivere `agenti.html`**

Scheletro con `{{TITOLO}}` = “Agenti e orchestrazione”, `{{FILE}}` = `agenti.html`, `{{SLUG}}` = `agenti`. Contenuto secondo la spec §9.6, 2.500–3.000 parole visibili.

Struttura obbligatoria:
- `#cosa`: workflow (percorsi predefiniti) contro agente (il modello dirige il processo); ciclo osserva → decide → agisce → verifica; tool, stop condition, budget; quando non usare un agente, con la frase “se puoi scrivere una funzione, fallo invece di usare un agente” attribuita a Microsoft Agent Framework e il rimando ad Anthropic “Building effective agents”.
- `#pattern`: tabella dei cinque pattern (prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer) con uso tipico / costo / rischio / quando evitarlo; human-in-the-loop come controllo trasversale.
- `#gerarchia`: livelli (orchestratore, specialisti, tool, memoria e stato, revisore, umano); esempio “Coordinatore → Ricercatore / Analista / Redattore → Revisore → Umano”; contratto JSON tra agenti (obiettivo, input, vincoli, schema di output, budget, scadenza); stop condition (output validato, budget esaurito, conflitto non risolvibile, richiesta di approvazione); escalation (incertezza, azione irreversibile, dati sensibili, evidenze contraddittorie); pseudocodice dell'orchestratore.
- `#economia`: numeri Anthropic — agenti circa 4× i token di una chat, sistemi multi-agente circa 15×; il token usage spiega l'80% della varianza in BrowseComp; +90,2% in un eval interno di ricerca, solo su compiti ampi e parallelizzabili. Con la cautela che sono risultati di Anthropic, non universali.
- `#affidabilita`: eval, tracing, retry, idempotenza, permessi, sandbox, stop condition, cost cap, human-in-the-loop, osservabilità; tabella rischio / controllo; distinzione tra errori di modello, di tool e di coordinamento.
- `#framework`: tabella con LangGraph, CrewAI, OpenAI Agents SDK, Claude Agent SDK, Microsoft Agent Framework (modello / punto forte / costo e rischio / quando), più un paragrafo di una riga ciascuno per Mastra, Vercel AI SDK, Pydantic AI, n8n, OpenHands. Microsoft Agent Framework va descritto come successore diretto di AutoGen e Semantic Kernel.
- `#progettare`: checklist in ordine di semplicità (una chiamata con retrieval → un agente con tool → un workflow esplicito → orchestratore con worker → multi-agente con revisore) e anti-pattern.
- `#lessico`: agente, workflow, orchestratore, handoff, stop condition, tracing.
- `#fonti`: Anthropic “Building effective agents” e “How we built our multi-agent research system”, LangGraph, CrewAI, OpenAI Agents SDK, Claude Agent SDK, Microsoft Agent Framework.

Figura con `width="1200" height="680"` e l'alt della spec §13. Un `callout warn` con la frase “Un agente senza stop condition è un ciclo infinito che paga”.

- [ ] **Step 4: Validare la pagina**

Run: `node C:\Users\Adr\AppData\Local\Temp\opencode\check-adripedia.js C:\WS\adripedia`
Atteso: solo link mancante verso `laboratorio.html`.

Run: `node page-audit.mjs "file:///C:/WS/adripedia/informatica/ai/agenti.html"`
Atteso: `OK` ai tre viewport, `imgs=1200x680`, `words` ≥ 2500.

Run: `Select-String -Path C:\WS\adripedia\informatica\ai\agenti.html -Pattern "4&times;|15&times;|80%|90,2%"`
Atteso: le quattro cifre presenti con la fonte Anthropic nello stesso paragrafo.

---

### Task 6: Pagina “Laboratorio”

**Files:**
- Create: `C:\WS\adripedia\informatica\ai\laboratorio.html`

**Interfaces:**
- Consumes: tutte le ancore prodotte dai Task 1–5.
- Produces: `laboratorio.html` con le ancore `#lab-routing`, `#lab-prompt`, `#lab-documenti`, `#lab-skill`, `#lab-mcp`, `#lab-orchestrazione`, `#lab-eval`, `#lab-sicurezza`, `#lessico`, `#fonti`. È il bersaglio dei rimandi da tutte le pagine.

- [ ] **Step 1: Scrivere `laboratorio.html`**

Scheletro con eyebrow `Laboratorio &middot; AI`, `{{TITOLO}}` = “Laboratorio”, `{{FILE}}` = `laboratorio.html`, `{{SLUG}}` = `laboratorio`. Contenuto secondo la spec §9.7, 3.500–4.500 parole visibili.

Struttura obbligatoria:
- Callout iniziale “Come usare il laboratorio” con le sei parti di ogni esercizio (cosa impari, ingredienti, passi, risultato atteso, cosa può andare storto, variante) e la nota che gli output sono “esempio atteso”, non trascrizioni.
- Tabella iniziale: numero / esercizio / cosa impari / pagina collegata.
- Otto sezioni `#lab-*`, ognuna da 350–500 parole più codice, con le sei parti. Gli esercizi e i loro contenuti sono quelli della spec §9.7; i punti che il piano non lascia aperti:
  - `#lab-routing`: 20 richieste eterogenee, policy JSON, quota al modello piccolo, qualità contro baseline, costo, latenza, ramo umano come variante.
  - `#lab-prompt`: estrazione da un'email, schema JSON di una fattura, `null` e confidenza, validazione, nessun campo inventato.
  - `#lab-documenti`: documento lungo, chunking, retrieval, prompt “cita o astieniti”, verifica delle citazioni, pagina ed estratto.
  - `#lab-skill`: `SKILL.md` completo, `references/formato.md`, script in pseudocodice, 10 test di attivazione positivi e 10 negativi.
  - `#lab-mcp`: server Python con due tool e una resource, configurazione client, `tools/list`, errore strutturato per ID mancante.
  - `#lab-orchestrazione`: orchestratore, ricercatore, analista, redattore, revisore, contratti JSON, budget, stop condition, gate umano.
  - `#lab-eval`: 20 casi, rubrica 0–2, pass rate, costo per compito riuscito, p50/p95, tabella etichettata “esempio”.
  - `#lab-sicurezza`: istruzione nascosta in un documento, allowlist dei tool, approvazione per le scritture, redazione dei segreti, validazione dell'output; l'agente segnala e non esegue.
- `#lessico`: esempio, trascrizione, rubrica, caso di test, budget, stop condition.
- `#fonti`: le fonti delle pagine collegate.
- Dopo `#fonti`, un blocco `callout feature` “Da dove ripartire” con i link alle cinque pagine di approfondimento e all'introduzione.

- [ ] **Step 2: Validare la pagina**

Run: `node C:\Users\Adr\AppData\Local\Temp\opencode\check-adripedia.js C:\WS\adripedia`
Atteso: **nessun problema statico** (tutte le pagine esistono ormai).

Run: `node page-audit.mjs "file:///C:/WS/adripedia/informatica/ai/laboratorio.html"`
Atteso: `OK` ai tre viewport, `words` ≥ 3500.

- [ ] **Step 3: Controllare la neutralità degli esempi**

Run:

```powershell
node -e "const fs=require('fs');const h=fs.readFileSync('C:/WS/adripedia/informatica/ai/laboratorio.html','utf8');const blocks=[...h.matchAll(/<pre>[\s\S]*?<\/pre>/g)].map(m=>m[0]).join('\n');const bad=['OpenCode','Claude','Anthropic','OpenAI','GPT','Gemini','LangGraph','CrewAI','Ollama','LiteLLM'];const hits=bad.filter(n=>blocks.includes(n));console.log(hits.length?'TROVATI: '+hits.join(', '):'Blocchi di codice neutrali.');process.exit(hits.length?1:0)"
```

Atteso: `Blocchi di codice neutrali.` Se compaiono nomi, spostali nel testo descrittivo o sostituiscili con i placeholder.

- [ ] **Step 4: Controllare che gli otto esercizi ci siano tutti**

Run: `Select-String -Path C:\WS\adripedia\informatica\ai\laboratorio.html -Pattern "id=\"lab-(routing|prompt|documenti|skill|mcp|orchestrazione|eval|sicurezza)\"" -AllMatches | Measure-Object`
Atteso: `Count : 8`.

---

### Task 7: Navigazione, introduzione e pagina dell'area

**Files:**
- Modify: `C:\WS\adripedia\assets\js\site.js:38-47` (blocco AI dentro `NAV`)
- Modify: `C:\WS\adripedia\informatica\ai\index.html` (righe 36-44, 609-619, 560-570, 747-757)
- Modify: `C:\WS\adripedia\informatica\index.html` (righe 7, 43-46, 103, 149)

**Interfaces:**
- Consumes: le sei pagine e le loro ancore dai Task 1–6.
- Produces: menu AI a 8 voci; introduzione che linka le sei pagine; card AI della pagina dell'area con “7 pagine”.

- [ ] **Step 1: Aggiornare il menu AI in `site.js`**

Sostituisci l'oggetto `text: "AI"` con:

```js
{
  text: "AI",
  children: [
    { text: "Introduzione", href: "informatica/ai/index.html" },
    { text: "Modelli e routing", href: "informatica/ai/modelli.html" },
    { text: "Prompt e comandi", href: "informatica/ai/prompt.html" },
    { text: "Skill e metodi", href: "informatica/ai/skill.html" },
    { text: "Server MCP", href: "informatica/ai/mcp.html" },
    { text: "Agenti e orchestrazione", href: "informatica/ai/agenti.html" },
    { text: "Laboratorio", href: "informatica/ai/laboratorio.html" },
    { text: "Glossario", href: "informatica/ai/index.html#glossario" }
  ]
}
```

- [ ] **Step 2: Aggiornare il callout iniziale dell'introduzione**

Nelle righe 36-44 sostituisci l'ultima frase (“Gli approfondimenti e i casi pratici arriveranno come pagine separate.”) con un elenco linkato delle sei pagine, nello stesso paragrafo: modelli e routing, prompt e comandi, skill e metodi, server MCP, agenti e orchestrazione, laboratorio. Deve restare un callout, non un secondo indice.

- [ ] **Step 3: Aggiungere i rimandi contestuali**

- Dopo il paragrafo su prompt injection (righe 609-619) aggiungi un paragrafo con i link a `prompt.html#sicurezza` e `mcp.html#sicurezza`.
- Dopo “Parametri pratici” (righe 560-570) aggiungi un paragrafo con i link a `modelli.html#parametri` e `prompt.html#comandi`.

- [ ] **Step 4: Sostituire il callout “Prossimamente”**

Nelle righe 747-757 tieni `<div class="callout feature">` e `<h2>Gli approfondimenti</h2>`, togli lo `<span class="callout-tag">Prossimamente</span>` e il paragrafo attuale, e inserisci un `<div class="cards">` con sei `<a class="card">`, uno per pagina, ognuno con `<h3>`, una frase di descrizione e `<span class="card-chips">` con l'argomento principale. L'indice interno dell'introduzione resta a 10 voci.

- [ ] **Step 5: Verificare i rimandi**

Run: `node C:\Users\Adr\AppData\Local\Temp\opencode\check-adripedia.js C:\WS\adripedia`
Atteso: `File HTML: 28`, `Nessun problema statico trovato.` Se compare `ancora mancante`, il bersaglio è sbagliato: correggi l'ID o la sezione, non il link.

- [ ] **Step 6: Aggiornare la pagina dell'area**

In `informatica/index.html`: meta description con gli approfondimenti; card AI (riga 43-46) con descrizione “Introduzione, modelli e routing, prompt, skill, MCP, orchestrazione e laboratorio” e chip “7 pagine”; card AI in “Da dove iniziare” (riga 103) aggiornata con il link al laboratorio.

- [ ] **Step 7: Validare l'introduzione nel browser**

Run: `node page-audit.mjs "file:///C:/WS/adripedia/informatica/ai/index.html"`
Atteso: `OK` ai tre viewport, immagini caricate, nessun errore di console, `active=Introduzione`. La pagina dell'area viene controllata al Task 8, Step 6.

- [ ] **Step 8: Verificare il menu**

Apri `file:///C:/WS/adripedia/informatica/ai/laboratorio.html` con `page-audit.mjs` e controlla che in ogni riga compaia `active=Laboratorio`. Poi esegui un controllo diretto sul file:

Run: `Select-String -Path C:\WS\adripedia\assets\js\site.js -Pattern "informatica/ai/(modelli|prompt|skill|mcp|agenti|laboratorio)\.html"`
Atteso: sei righe.

- [ ] **Step 9: Aggiornare l'audit esistente della sezione AI**

In `C:\Users\Adr\AppData\Local\Temp\opencode\adripedia-test\ai-audit.mjs` il blocco `nav` cerca ancora `#llm`, che non è più nel menu. Sostituisci le tre chiavi con le otto voci nuove (`introduzione`, `modelli`, `prompt`, `skill`, `mcp`, `agenti`, `laboratorio`, `glossario`), usando `a[data-href="informatica/ai/<file>"]`, e aggiorna il messaggio di errore. Il resto dello script resta uguale.

Run: `node C:\Users\Adr\AppData\Local\Temp\opencode\adripedia-test\ai-audit.mjs`
Atteso: `Nessun problema browser.`

---

### Task 8: Home, README e validazione completa

**Files:**
- Modify: `C:\WS\adripedia\index.html` (righe 7, 57, 71, 122, 205-209, 287-290)
- Modify: `C:\WS\adripedia\README.md` (righe 6, 21, 59, 100-109, 213, 335-348)

**Interfaces:**
- Consumes: tutto il lavoro dei Task 1–7.
- Produces: sito coerente nei conteggi e nella documentazione; nessun'altra modifica.

- [ ] **Step 1: Aggiornare i numeri della home**

`22` → `28` nel conteggio pagine (riga 71). `20 voci` → `21 voci` nel quick link (riga 57), verificando che il valore statico e quello calcolato da `site.js` coincidano.

- [ ] **Step 2: Aggiornare card e meta della home**

- Meta description (riga 7): aggiungere “modelli, prompt, skill, MCP e agenti” senza superare una lunghezza ragionevole.
- Card AI (righe 205-209): descrizione “Introduzione, modelli e routing, prompt, skill, MCP, orchestrazione e laboratorio” e chip “7 pagine” al posto di “2 diagrammi”.
- Paragrafo dell'area Informatica (riga 122): invariato nella sostanza.

- [ ] **Step 3: Aggiungere la voce di aggiornamento**

In testa a `[data-updates-list]`, con data `2026-11-11`, una voce che descrive l'ampliamento: sei approfondimenti (modelli, prompt, skill, MCP, agenti, laboratorio), cinque diagrammi originali, otto esercizi neutrali. Deve restare una sola voce.

- [ ] **Step 4: Aggiornare il README**

- Albero dei file: i sei file sotto `informatica/ai/` e i cinque SVG sotto `assets/img/ai/`.
- “Pagine a tab”: l'eccezione AI diventa “una pagina introduttiva più sei approfondimenti, senza tab”.
- “Immagini della sezione AI”: descrivere i cinque nuovi SVG.
- Nuova “Mappa della sezione AI” con i sei percorsi, il criterio degli esempi neutrali e la nota che stelle e risparmi di token sono dichiarazioni dei progetti.
- Eventuali riferimenti a 22 pagine → 28.

- [ ] **Step 5: Validazione statica completa**

Run: `node C:\Users\Adr\AppData\Local\Temp\opencode\check-adripedia.js C:\WS\adripedia`
Atteso: `File HTML: 28`, `Nessun problema statico trovato.`

- [ ] **Step 6: Audit browser di tutte le pagine AI**

Run:

```powershell
node C:\Users\Adr\AppData\Local\Temp\opencode\adripedia-test\page-audit.mjs "file:///C:/WS/adripedia/informatica/ai/index.html" "file:///C:/WS/adripedia/informatica/ai/modelli.html" "file:///C:/WS/adripedia/informatica/ai/prompt.html" "file:///C:/WS/adripedia/informatica/ai/skill.html" "file:///C:/WS/adripedia/informatica/ai/mcp.html" "file:///C:/WS/adripedia/informatica/ai/agenti.html" "file:///C:/WS/adripedia/informatica/ai/laboratorio.html"
```

Atteso: 21 righe `OK` (7 pagine × 3 viewport), nessun problema, nessun errore di console.

Run: `node C:\Users\Adr\AppData\Local\Temp\opencode\adripedia-test\ai-audit.mjs`
Atteso: `Nessun problema browser.` (copre home e area a 1280 px, le otto voci del menu e il filtro del glossario).

- [ ] **Step 7: Audit SVG completo**

Run: `node C:\Users\Adr\AppData\Local\Temp\opencode\adripedia-test\svg-audit-avanzata.mjs`
Atteso: cinque file, zero overflow, zero sovrapposizioni, uscita 0. Eseguire anche `svg-audit-ai.mjs` per i due SVG esistenti: devono restare invariati.

- [ ] **Step 8: Controllare Docker e Podman**

Run: `git diff --stat -- informatica/docker informatica/podman`
Atteso: nessun output.

- [ ] **Step 9: Controllo finale dei contenuti**

Run: `git status --short`
Atteso: solo i file previsti — 6 HTML nuovi, 5 SVG nuovi, `informatica/ai/index.html`, `informatica/index.html`, `index.html`, `README.md`, `assets/js/site.js`, più i due file non committati in `docs/superpowers/` (design e piano). Nessun file in `informatica/docker` o `informatica/podman`. Nessun commit.

---

## Autorevisione del piano

- **Copertura della spec:** §9.1 → Task 7; §9.2 → Task 1; §9.3 → Task 2; §9.4 → Task 3; §9.5 → Task 4; §9.6 → Task 5; §9.7 → Task 6; §10 → Task 6 Step 3; §11 → Task 7; §12 → Task 8; §13 → Task 1 Step 5 e Task 2–5 Step 1; §14 → vincoli globali e scheletro; §15 → numeri nei Task 3, 4, 5; §16 → Task 8.
- **Tipi e nomi:** le ancore citate nei rimandi (`#parametri`, `#comandi`, `#sicurezza`, `#gerarchia`, `#affidabilita`, `#creare`, `#cosa`, `#metodi`, `#lab-*`) sono tutte definite nei task che le producono e verificate dallo checker al Task 7 Step 5.
- **Review Focus:** i cinque punti hanno un test nel task che possiede il codice (1 → Task 7 Step 5; 2 → ogni task di pagina, Step di `page-audit`; 3 → Task 6 Step 3; 4 → Task 4 Step 5; 5 → `page-audit` a 390 px).
- **Proporzione:** il piano fissa struttura, ancore, numeri e verifiche; il testo delle pagine resta al builder, che ha la spec §9.x come traccia.
