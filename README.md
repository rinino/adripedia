# Adripedia

Enciclopedia personale: documentazione e appunti, in ogni ambito.

La gerarchia è **area → sezione → pagine**. Le prime due aree sono
**Informatica** (che contiene le sezioni **AI**, un'introduzione generale senza
una versione da inseguire, **OpenCode**, V2, versione `2.2.5`,
**Linux**, kernel `7.0`, **Git**, versione `2.56.0`, **Docker**, versione
`29.9.3`, **Podman**, versione `6.1.4`, **Buildah**, versione `1.46.0`,
**Kubernetes**, versione `1.37`, **Java su Kubernetes**, con Java `25` LTS e
Spring Boot `4.1.2`, **k3s**, versione `1.37.2+k3s1`, **k9s**, versione
`0.51.0`, e **WSL**, versione `3.0.3`) e **Link** (collegamenti esterni).

## Struttura

```
adripedia/
├─ index.html                 # home del wiki
├─ informatica/               # area Informatica
│  ├─ index.html              # panoramica dell'area
│  ├─ ai/                     # sezione AI
│  │  ├─ index.html           # introduzione discorsiva: dieci parti, indice interno, glossario con ricerca
│  │  ├─ modelli.html         # modelli e routing: profili, parametri, cascate, valutazione
│  │  ├─ prompt.html          # prompt, contesto e comandi: anatomia, pattern, injection
│  │  ├─ skill.html           # skill e metodi: creare, testare, distribuire, rassegna di framework
│  │  ├─ mcp.html             # server MCP: architettura, costruzione, sicurezza, distribuzione
│  │  ├─ agenti.html          # agenti e orchestrazione: pattern, gerarchia, costi, affidabilità
│  │  └─ laboratorio.html     # otto esercizi neutrali con passi, risultato atteso e varianti
│  ├─ linux/                  # sezione Linux
│  │  ├─ index.html           # panoramica: storia, kernel/userland/distribuzione, famiglie, criteri di scelta
│  │  ├─ installazione.html   # installazione da terminale: Mint e Kali, ISO, USB, partizioni, preseed, debootstrap
│  │  ├─ kernel.html          # kernel e gestione: versioni, moduli, parametri, initramfs, DKMS, Secure Boot, diagnostica
│  │  ├─ filesystem.html      # file system e permessi: FHS, inode, link, ACL, mount, ext4/XFS/Btrfs/overlayfs, recupero
│  │  ├─ processi.html        # processi e risorse: fork/exec, segnali, scheduler, limiti, cgroup v2, namespace, OOM killer
│  │  ├─ systemd.html         # systemd: unità, service, target, timer, socket, journald, boot, cgroup, hardening, casi pratici
│  │  └─ vi-vim.html          # vi e Vim: modalità, operatori, registri, regex, macro, finestre, configurazione, plugin, recupero
│  ├─ git/                    # sezione Git
│  │  └─ index.html           # pagina unica a tab: panoramica, Windows, Linux, comandi, esempi e ricette
│  ├─ docker/                 # sezione Docker
│  │  └─ index.html           # pagina unica a tab: panoramica, Windows, Linux, comandi
│  ├─ podman/                 # sezione Podman
│  │  └─ index.html           # pagina unica a tab: panoramica, installazione, comandi, configurazione, approfondimenti
│  ├─ buildah/                # sezione Buildah
│  │  └─ index.html           # pagina unica a tab: panoramica, installazione, comandi, configurazione, approfondimenti
│  ├─ kubernetes/             # sezione Kubernetes
│  │  └─ index.html           # pagina unica a tab: panoramica, installazione, comandi, approfondimenti, CKA
│  ├─ java-kubernetes/        # sezione Java su Kubernetes
│  │  └─ index.html           # pagina unica a tab: panoramica, versioni e JVM, memoria e GC, Kubernetes e Spring Boot, comandi e diagnostica
│  ├─ k3s/                    # sezione k3s
│  │  └─ index.html           # pagina unica a tab: panoramica, installazione, comandi, approfondimenti
│  ├─ k9s/                    # sezione k9s
│  │  └─ index.html           # pagina unica a tab: panoramica, installazione, comandi, configurazione, approfondimenti
│  └─ wsl/                    # sezione WSL
│     └─ index.html           # pagina unica a tab: panoramica, Windows, comandi
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
│     ├─ ai/                  # sette diagrammi originali della sezione AI
│     ├─ docker/              # logo, diagramma e screenshot della sezione Docker
│     ├─ podman/              # due diagrammi originali della sezione Podman
│     ├─ buildah/             # due diagrammi originali della sezione Buildah
│     ├─ k3s/                 # due diagrammi ufficiali dell'architettura k3s
│     ├─ k9s/                 # tre screenshot ufficiali di k9s
│     ├─ kubernetes/          # cinque diagrammi originali della sezione Kubernetes
│     ├─ java-k8s/            # due diagrammi originali della sezione Java su Kubernetes
│     └─ wsl/                 # diagramma dell'architettura WSL 2
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

Le sezioni Git, Docker, Podman, Buildah, Kubernetes, Java su Kubernetes e WSL
usano una pagina unica con tab riutilizzabili. Anche le sezioni k3s e k9s usano
lo stesso schema: k3s &egrave; completa con quattro tab, k9s con cinque. Podman e
Buildah ne hanno cinque: panoramica, installazione, comandi, configurazione e
approfondimenti. Java su Kubernetes segue lo stesso formato, con tab dedicati a
panoramica, versioni della JVM, memoria e GC, manifest e Spring Boot, comandi e
diagnostica. La sezione AI fa eccezione: è una pagina introduttiva discorsiva,
con indice interno e glossario cercabile, più sei approfondimenti senza tab
(`modelli`, `prompt`, `skill`, `mcp`, `agenti`, `laboratorio`). Anche Linux è
una sezione a pagine separate: la panoramica è discorsiva, le pagine tecniche
non usano tab. Sono pubblicate la panoramica, l'installazione da riga di comando,
il kernel, il file system e i permessi, i processi e le risorse, systemd, e la
guida a vi e Vim; le altre arrivano una alla volta.

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

Il tab **Comandi** delle pagine Git, Docker, Podman, Buildah, Kubernetes, Java su
Kubernetes e WSL ha in più una ricerca
(`#cmd-search-input`) che indicizza le righe delle tabelle e dei blocchi di
codice del pannello: scrivendo si filtrano i comandi, con frecce e Invio
oppure con il mouse si
salta al comando scelto, evidenziato per qualche secondo. Il markup è
`.cmd-search`; il comportamento è lo stesso modulo in `assets/js/site.js`.
Nella pagina Git la ricerca indicizza anche il tab **Esempi** e, se il
risultato è lì, lo apre prima di scorrere.

Le pagine tecniche Linux usano lo stesso blocco `.cmd-search` senza tab: il
`<main>` porta `data-cmd-search-scope` e la ricerca indicizza le tabelle marcate
con `data-cmd-table`, i blocchi di codice e i titoli delle sezioni. Vale per
`installazione.html`, `kernel.html`, `filesystem.html`, `processi.html`,
`systemd.html` e `vi-vim.html`, e va replicato in ogni nuova pagina tecnica. La
panoramica `informatica/linux/index.html` resta senza barra di ricerca, perché
non contiene comandi.

Il pannello **Approfondimenti** di Kubernetes apre con il glossario
(`#glossario`) e un filtro locale (`#glossary-search-input`) che nasconde le
righe della tabella senza ricaricare la pagina. La ricerca ignora maiuscole e
accenti, accetta più parole e aggiorna il conteggio in `#glossary-search-hint`.
Le sottosezioni sulla memoria (`#memoria`, `#memoria-java`, `#memoria-node`,
`#memoria-python`, `#memoria-php`, `#memoria-go`) e quella sulle immagini
(`#immagini`) sono normali `id` interni: un hash verso una di esse apre il tab
che le contiene e scorre al titolo, con `scroll-margin-top` per non finire
sotto la barra superiore. In cima agli Approfondimenti un indice
(`.section-index`) raccoglie i link a tutte le sezioni; le introduzioni e la
tabella di troubleshooting rimandano ai paragrafi collegati.

## Struttura della home

La home è costruita a blocchi, tutti in `index.html`:

- `home-hero` con `home-quick`: testata a due colonne e indice rapido.
- `home-stats`: quattro numeri di orientamento (aree, sezioni, pagine, domande CKA).
- `home-feature`: banner “In evidenza” verso Kubernetes.
- card dei percorsi con chip informative (`card-chips`).
- `persona-grid`: “A chi serve” in tre card.
- `structure-flow` e `structure-tags`: gerarchia Area → Sezione → Pagina.
- `data-updates`: diario paginato.

I numeri in `home-stats` sono statici: aggiornali quando cambia il numero di
aree, sezioni, pagine o domande CKA. Il conteggio degli aggiornamenti in
`[data-updates-count]` si aggiorna da solo.

## Aggiornamenti in home

La home chiude con un elenco di aggiornamenti paginato: il contenitore
`[data-updates]` mostra tre voci per pagina, con frecce, numeri di pagina e
indicatore `Pagina N di M`. Il conteggio in `[data-updates-count]` si aggiorna
da solo. Senza JavaScript tutte le voci restano visibili e i controlli non
compaiono. Per aggiungere una novità, inserisci un `<li>` in cima a
`[data-updates-list]` in `index.html`: la paginazione si adatta da sola al
numero di voci.

## Aggiungere un'area

1. Crea la cartella, per esempio `fai-da-te/`, con `index.html` e le sezioni.
2. Aggiungi un nuovo oggetto con `children` dentro `NAV`, in
   `assets/js/site.js`.
3. Aggiungi una card nella home (`index.html`) e aggiorna i numeri in
   `home-stats` se cambiano aree, sezioni o pagine.

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
  OpenCode V2, Linux (kernel 7.0), Git 2.56.0, Docker 29.9.3, Podman 6.1.4,
  Buildah 1.46.0, Kubernetes 1.37, Java 25 LTS con Spring Boot 4.1.2,
  k3s 1.37.2+k3s1, k9s 0.51.0 e WSL 3.0.3. Le sezioni AI e Linux sono
  volutamente divulgative e generali: non sono legate a un singolo prodotto.
  La sezione AI non insegue una versione; Linux documenta il kernel 7.0 ma
  resta valida per le distribuzioni che usano kernel 6.x.

## Immagini della sezione Docker

Le immagini ufficiali in `assets/img/docker/` provengono dalle fonti Docker:

- `docker-logo.svg`: logo ufficiale, dalle Docker Brand Guidelines
  (`docker.com`).
- `docker-architecture.webp`: diagramma client/daemon/registry, dalla
  documentazione Docker (licenza Apache 2.0).
- `docker-desktop-containers.webp`: screenshot di Docker Desktop, dalla
  documentazione Docker (licenza Apache 2.0).

Il tab **Approfondimenti** usa tre diagrammi originali di Adripedia:

- `docker-isolation.svg`: namespace, cgroup, capability e seccomp di due
  container sopra un kernel condiviso.
- `docker-network.svg`: rete bridge definita dall'utente, DNS interno, porte
  pubblicate e NAT in uscita.
- `docker-process.svg`: catena client, `dockerd`, `containerd`,
  `containerd-shim` e `runc`, fino al processo PID 1.

I concetti sono ripresi dalla documentazione Docker; i disegni non usano
immagini o marchi Docker. Le didascalie nelle pagine riportano fonte e, dove
applicabile, licenza. Se sostituisci un'immagine, aggiorna anche la didascalia.

## Immagini della sezione Podman

I due diagrammi in `assets/img/podman/` sono originali di Adripedia e riprendono
concetti dalla documentazione Podman:

- `podman-daemonless.svg`: catena CLI, `conmon`, `crun` e processo del
  container, con storage condiviso e socket API opzionale.
- `podman-vs-docker.svg`: confronto tra la catena Docker con `dockerd` e quella
  Podman senza daemon centrale.

I disegni non usano immagini o marchi delle rispettive aziende. Le didascalie
nelle pagine riportano la fonte concettuale; se sostituisci un'immagine, aggiorna
anche la didascalia.

## Immagini della sezione Buildah

I due diagrammi in `assets/img/buildah/` sono originali di Adripedia e riprendono
concetti dalla documentazione Buildah:

- `buildah-workflow.svg`: da un Containerfile o da una sequenza di comandi al
  container di lavoro, all'immagine OCI nello storage, fino al registry o a
  Podman.
- `buildah-vs-podman-docker.svg`: confronto tra Docker con daemon, Podman
  daemonless e Buildah specializzato nella costruzione delle immagini.

I disegni non usano immagini o marchi delle rispettive aziende. Le didascalie
nelle pagine riportano la fonte concettuale; se sostituisci un'immagine, aggiorna
anche la didascalia.

## Immagini della sezione WSL

`assets/img/wsl/wsl-architecture.svg` è un diagramma originale di Adripedia
che illustra l'architettura di WSL 2: host Windows, VM leggera con kernel Linux
condiviso e distribuzioni isolate. I concetti sono ripresi dalla documentazione
Microsoft Learn; il disegno non usa immagini o marchi Microsoft.

## Immagini della sezione k9s

Gli screenshot in `assets/img/k9s/` provengono dal repository ufficiale
[derailed/k9s](https://github.com/derailed/k9s), licenza Apache 2.0:

- `screen_po.png`: vista dei pod, usata nella Panoramica.
- `screen_logs.png`: vista dei log, usata nei Comandi.
- `screen_dp.png`: vista dei deployment, usata negli Approfondimenti.

## Immagini della sezione k3s

I due diagrammi in `assets/img/k3s/` provengono dalla documentazione ufficiale
[k3s Docs](https://docs.k3s.io/architecture), licenza
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/):

- `k3s-architecture-single-server.svg`: server singolo con database SQLite e
  agent, usato nella Panoramica.
- `k3s-architecture-ha-embedded.svg`: alta disponibilità con etcd incorporato e
  indirizzo di registrazione fisso, usato nella Panoramica.

Le didascalie nelle pagine riportano fonte e licenza. Se sostituisci un
diagramma, aggiorna anche la didascalia.

## Immagini della sezione Kubernetes

Tutti i diagrammi in `assets/img/kubernetes/` sono originali di Adripedia e
riprendono concetti dalla documentazione Kubernetes:

- `kubernetes-architecture.svg`: client, control plane e worker node, con il
  flusso delle richieste attraverso il kube-apiserver.
- `kubernetes-workloads.svg`: Deployment, ReplicaSet e Pod, con Service,
  ConfigMap, Secret, HorizontalPodAutoscaler e PodDisruptionBudget.
- `kubernetes-networking.svg`: Ingress o Gateway API, Service, Pod, kube-proxy,
  CNI, CoreDNS e NetworkPolicy.
- `kubernetes-storage.svg`: Pod, PVC, PV, StorageClass e driver CSI, con i
  volumi effimeri.
- `kubernetes-cka.svg`: i cinque domini della certificazione CKA con i pesi e i
  dati principali dell'esame.

I disegni non usano loghi o marchi Kubernetes. Le didascalie nelle pagine
riportano la fonte concettuale; se sostituisci un'immagine, aggiorna anche la
didascalia.

## Immagini della sezione Java su Kubernetes

I due diagrammi in `assets/img/java-k8s/` sono originali di Adripedia e
riprendono concetti dalla documentazione HotSpot, Spring Boot e Kubernetes:

- `java-k8s-memory.svg`: Pod con limite di 1 GiB, heap della JVM al 75%,
  spazio non-heap per metaspace, code cache, stack e buffer diretti, con
  l'errore classico di `-Xmx` uguale al limite del container.
- `java-k8s-lifecycle.svg`: ciclo di vita del Pod, dalla startupProbe alla
  readiness, dalla liveness al `preStop`, al `SIGTERM` e al graceful shutdown di
  Spring Boot.

I disegni non usano immagini o marchi delle rispettive aziende. Le didascalie
nelle pagine riportano la fonte concettuale; se sostituisci un'immagine, aggiorna
anche la didascalia.

## Immagini della sezione AI

I sette diagrammi in `assets/img/ai/` sono originali di Adripedia:

- `ai-landscape.svg`: gerarchia tra intelligenza artificiale, machine learning,
  deep learning e AI generativa, con il ramo laterale dell'AI simbolica e una
  nota di lessico su generativo, LLM e modelli di fondazione.
- `ai-llm-flow.svg`: ciclo di generazione di un modello linguistico, dal prompt
  ai token, dall'embedding al transformer, dal campionamento al token che
  rientra nel contesto.
- `ai-model-routing.svg`: una richiesta classificata e inviata a un modello
  piccolo, a un modello grande o a un umano, con percorso di fallback.
- `ai-prompt-anatomy.svg`: i sette strati del prompt, con il contenuto non
  fidato tenuto fuori dalle istruzioni.
- `ai-skill-structure.svg`: la cartella di una skill e i tre livelli di
  caricamento progressivo.
- `ai-mcp-architecture.svg`: host, client e server con tool, risorse e prompt.
- `ai-agent-orchestration.svg`: coordinatore, specialisti, revisore e umano,
  con le frecce di ritorno del fallback.

I concetti sono ripresi da fonti pubbliche (paper, documentazione dei fornitori
e rapporti citati nelle pagine). I disegni non usano loghi o marchi. Se
sostituisci un'immagine, aggiorna anche la didascalia.

## Mappa della sezione AI

Sette pagine, un solo criterio: esempi neutrali, senza nomi di prodotto nei
blocchi di codice. I segnaposto sono `provider/model-small`,
`provider/model-large`, `provider/model-reasoning` e `local-open-weights`.

- `informatica/ai/index.html`: introduzione discorsiva, mappa delle parole,
  glossario cercabile.
- `informatica/ai/modelli.html`: profili di modello, parametri, cascate,
  routing, valutazione.
- `informatica/ai/prompt.html`: anatomia del prompt, contesto, tecniche,
  comandi, pattern, injection.
- `informatica/ai/skill.html`: Agent Skills, creazione e test, rassegna di
  metodi e framework.
- `informatica/ai/mcp.html`: architettura MCP, costruzione di un server,
  permessi e distribuzione.
- `informatica/ai/agenti.html`: workflow e agenti, pattern, gerarchia, costi,
  affidabilità.
- `informatica/ai/laboratorio.html`: otto esercizi con ingredienti, passi,
  risultato atteso e varianti.

Gli output negli esempi sono etichettati “esempio atteso”: non sono
trascrizioni di sessioni reali né misure. Stelle, versioni e dichiarazioni dei
progetti citati (Superpowers, Caveman, BMAD, ECC, Hermes) sono quelle pubblicate
dai progetti l'11 novembre 2026 e vanno ricontrollate prima di aggiornare le
pagine.

## Mappa della sezione Linux

La sezione è a pagine separate, come AI. Sono pubblicate la panoramica,
l'installazione, il kernel, il file system e i permessi, i processi e le risorse,
systemd e la guida a vi e Vim; le altre pagine tecniche arrivano una alla volta e
gli esempi sono separati per famiglia: Debian/Ubuntu e Red Hat/Fedora.

- `informatica/linux/index.html`: storia del kernel e di GNU, distinzione tra
  kernel, userland e distribuzione, cinque famiglie (Debian, Red Hat, SUSE,
  Arch, indipendenti), criteri di scelta e mappa della sezione.
- `informatica/linux/installazione.html`: verifica di ISO e firma, scrittura
  della USB con `dd`, GPT/ESP/LUKS, installer testuale di Kali, preseed,
  `debootstrap`, limiti dell'installer grafico di Mint e post-installazione.
- `informatica/linux/kernel.html`: mainline/stable/LTS, `/boot` e
  `/lib/modules`, moduli e blacklist, parametri di boot, `sysctl`, aggiornamenti
  per famiglia, initramfs, DKMS, compilazione, Secure Boot, livepatch,
  PREEMPT_RT e diagnostica.
- `informatica/linux/filesystem.html`: gerarchia FHS e usrmerge, inode e
  timestamp, tipi di file, hard link e symlink, permessi POSIX, SUID/SGID/sticky,
  capability, ACL, xattr e `chattr`, SELinux/AppArmor, mount e `fstab`, ext4,
  XFS, Btrfs, overlayfs e tmpfs, spazio e inode, quote, manutenzione e recupero.
- `informatica/linux/processi.html`: fork/exec/wait, zombie e orfani, thread e
  TID, stati, scheduler EEVDF, nice e real-time, segnali, job control, `/proc`,
  limiti e `prlimit`, cgroup v2, namespace, memoria e OOM killer, PSI,
  diagnostica, `strace`, `perf`, core dump, FAQ e casi pratici con soluzioni.
- `informatica/linux/systemd.html`: PID 1 e componenti, tipi di unità e percorsi,
  service con `Type=`, `Restart=`, `Exec*` e utenti, `systemctl`, target e
  dipendenze, timer, socket activation e template, journald, boot e rescue,
  cgroup e slice, hardening con `systemd-analyze security`, networkd, resolved,
  timesyncd, FAQ e casi pratici con soluzioni.
- `shell.html`,
  `rete.html`, `pacchetti.html`: le pagine tecniche di base.
- `comandi-debian.html` e `comandi-rhel.html`: due cheat sheet con ricerca,
  una per famiglia.
- `informatica/linux/vi-vim.html`: modalità, movimenti e text object, operatori,
  registri e clipboard, ricerca e regex, sostituzione, buffer, finestre, macro,
  marcatori, pieghe, quickfix, `vimrc`, plugin, comandi ex e recupero; la
  pagina include una ricerca dei comandi per descrizione.
- `storage.html`, `boot.html`, `sicurezza.html`, `diagnostica.html`,
  `laboratorio.html`: la seconda ondata.

Fatti e date sono verificati sulle fonti ufficiali al 14 novembre 2026: kernel
7.0 (12 aprile 2026), stable 7.3.4 (10 novembre 2026), longterm 6.18.63 e
6.12.117, Debian 13 trixie (9 agosto 2025), Ubuntu 26.04 LTS (aprile 2026),
RHEL 10 (20 maggio 2025), Fedora 44 (aprile 2026), Mint 22.3 (13 gennaio 2026),
Kali 2026.3 (26 ottobre 2026, kernel 7.1.5), systemd upstream 262 (Debian 13
e RHEL 10 sulla serie 257, Ubuntu 26.04 sulla serie 259), Vim 9.2 e Neovim
0.12.6 (9 ottobre 2026). Le versioni delle distribuzioni citate vanno
ricontrollate prima di ogni aggiornamento.
