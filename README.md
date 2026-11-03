# Adripedia

Enciclopedia personale: documentazione e appunti, in ogni ambito.

La gerarchia è **area → sezione → pagine**. Le prime due aree sono
**Informatica** (che contiene la sezione **OpenCode**, V2, versione `2.2.5`)
e **Link** (collegamenti esterni).

## Struttura

```
adripedia/
├─ index.html                 # home del wiki
├─ informatica/               # area Informatica
│  └─ index.html              # panoramica dell'area
├─ opencode/                  # sezione (dentro Informatica)
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
│  ├─ js/site.js              # menu, sottomenu, hamburger, copia codice, torna in cima
│  └─ img/favicon.svg         # marchio "Globo A"
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
- I contenuti sono in italiano e allineati alla documentazione ufficiale
  OpenCode V2.
