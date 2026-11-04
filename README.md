# Adripedia

Enciclopedia personale: documentazione e appunti, in ogni ambito.

La gerarchia è **area → sezione → pagine**. Le prime due aree sono
**Informatica** (che contiene le sezioni **OpenCode**, V2, versione `2.2.5`,
**Git**, versione `2.56.0`, e **Docker**, versione `29.9.3`) e **Link**
(collegamenti esterni).

## Struttura

```
adripedia/
├─ index.html                 # home del wiki
├─ informatica/               # area Informatica
│  ├─ index.html              # panoramica dell'area
│  ├─ git/                    # sezione Git
│  │  └─ index.html           # pagina unica a tab: panoramica, Windows, Linux, comandi
│  └─ docker/                 # sezione Docker
│     └─ index.html           # pagina unica a tab: panoramica, Windows, Linux, comandi
├─ opencode/                  # sezione OpenCode (dentro Informatica)
│  ├─ index.html              # panoramica della sezione
│  ├─ installazione/
│  │  ├─ windows.html
│  │  └─ linux.html           # segnaposto, in preparazione
│  ├─ agenti.html
│  ├─ configurazione.html
│  ├─ scorciatoie.html
│  ├─ comandi-cli.html
│  ├─ comandi-slash.html
│  └─ faq.html
├─ link/                      # area Link
│  └─ index.html              # elenco dei collegamenti esterni
├─ assets/
│  ├─ css/style.css           # stili e variabili del tema
│  ├─ js/site.js              # menu, sottomenu, hamburger, tab, copia codice, torna in cima
│  └─ img/
│     ├─ favicon.svg          # marchio "Globo A"
│     └─ docker/              # logo, diagramma e screenshot della sezione Docker
├─ .nojekyll                  # GitHub Pages: non processare con Jekyll
└─ README.md
```

## Vederlo in locale

Non serve installare niente: apri `index.html` nel browser.

Per un server locale (consigliato per il copia/incolla):

```sh
python -m http.server 8000
```

Poi visita <http://localhost:8000>.

## Aggiungere una pagina

1. Crea il file nella sezione, per esempio `opencode/nuova-pagina.html`.
2. Copia lo scheletro di una pagina esistente e aggiorna `data-page`
   (deve corrispondere al percorso usato nel menu).
3. Aggiungi la voce in `children` della sezione dentro `NAV`, in
   `assets/js/site.js`.

## Aggiungere una sezione

1. Crea la cartella dentro l'area, per esempio `informatica/docker/`, con
   `index.html` e le pagine.
2. Aggiungi un oggetto con `children` dentro `NAV`, sotto l'area di
   appartenenza, in `assets/js/site.js`.
3. Aggiungi una card nella panoramica dell'area (`informatica/index.html`).

## Pagine a tab

Le sezioni Git e Docker usano una pagina unica con tab riutilizzabili:

```html
<div class="tabs" data-tabs>
  <div class="tablist" role="tablist" aria-label="Contenuti">
    <button class="tab" id="tab-uno" type="button" role="tab"
            aria-selected="true" aria-controls="uno" tabindex="0">Uno</button>
    <button class="tab" id="tab-due" type="button" role="tab"
            aria-selected="false" aria-controls="due" tabindex="-1">Due</button>
  </div>
  <section class="tabpanel" id="uno" role="tabpanel" aria-labelledby="tab-uno">...</section>
  <section class="tabpanel" id="due" role="tabpanel" aria-labelledby="tab-due">...</section>
</div>
```

Il comportamento è in `assets/js/site.js`: mostra un pannello alla volta,
supporta le frecce e Home/End e apre il tab indicato dall'hash (`#due`). Senza
JavaScript tutti i pannelli restano visibili. Per aggiungere un tab basta un
pulsante con `aria-controls` uguale all'`id` del pannello.

Il tab **Comandi** delle pagine Git e Docker ha in più una ricerca
(`#cmd-search-input`) che indicizza le righe delle tabelle e dei blocchi di
codice del pannello: scrivendo si filtrano i comandi, con frecce e Invio
oppure con il mouse si
salta al comando scelto, evidenziato per qualche secondo. Il markup è
`.cmd-search`; il comportamento è lo stesso modulo in `assets/js/site.js`.

## Aggiungere un'area

1. Crea la cartella, per esempio `fai-da-te/`, con `index.html` e le sezioni.
2. Aggiungi un nuovo oggetto con `children` dentro `NAV`, in
   `assets/js/site.js`.
3. Aggiungi una card nella home (`index.html`).

## Pubblicare su GitHub Pages

1. Vai in **Settings → Pages**.
2. In **Source** scegli **Deploy from a branch**.
3. Seleziona il branch `master` e la cartella `/ (root)`, poi **Save**.
   (Se rinomini il branch in `main`, seleziona `main`.)
4. Il sito sarà disponibile su `https://<utente>.github.io/adripedia/`.

Il file `.nojekyll` evita che GitHub Pages ignori file o cartelle che iniziano
con un underscore.

## Grafica

Palette calda e neutra (testo `#37352f`, bordi `#e9e9e7`, superfici `#f7f6f3`),
un solo accento blu (`#2383e2`) e sidebar scura (`#191919`). Tutto si cambia
dalle variabili in `:root` dentro `assets/css/style.css` (colori, larghezza
della sidebar, raggi, font).

Il marchio è il **Globo A**: un globo di meridiani in cui le aste della A sono
i meridiani principali. È disegnato in SVG inline in `assets/js/site.js`
(sidebar) e in `assets/img/favicon.svg` (icona del browser).

## Note

- Il menu è generato via JavaScript; senza JS i contenuti restano leggibili ma
  la navigazione laterale non compare.
- Le pagine a tab mostrano tutti i pannelli quando JavaScript è disattivato.
- I contenuti sono in italiano e allineati alla documentazione ufficiale
  OpenCode V2, Git 2.56.0 e Docker 29.9.3.

## Immagini della sezione Docker

Le immagini in `assets/img/docker/` provengono dalle fonti ufficiali Docker:

- `docker-logo.svg`: logo ufficiale, dalle Docker Brand Guidelines
  (`docker.com`).
- `docker-architecture.webp`: diagramma client/daemon/registry, dalla
  documentazione Docker (licenza Apache 2.0).
- `docker-desktop-containers.webp`: screenshot di Docker Desktop, dalla
  documentazione Docker (licenza Apache 2.0).

Le didascalie nelle pagine riportano fonte e, dove applicabile, licenza. Se
sostituisci un'immagine, aggiorna anche la didascalia.
