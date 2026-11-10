/* ==========================================================================
   Adripedia — logica comune a tutte le pagine
   - costruisce il menu laterale da un unico elenco (NAV), con sottomenu
   - gestisce il pulsante hamburger e l'overlay su mobile
   - evidenzia la pagina corrente
   - aggiunge il pulsante "Copia" ai blocchi di codice
   - aggiunge il pulsante "Torna in cima"
   ========================================================================== */

(function () {
  "use strict";

  var body = document.body;
  var root = body.dataset.root || ".";
  var currentPage = body.dataset.page || "index.html";

  function withRoot(path) {
    return root === "." ? path : root + "/" + path;
  }

  /* ---------------------------------------------------------------------
     Elenco unico delle aree, delle sezioni e delle pagine.
     Per aggiungere una pagina a una sezione, aggiungi una voce in children.
     Per aggiungere una sezione, aggiungi un oggetto con children dentro un'area.
     --------------------------------------------------------------------- */
  var NAV = [
    {
      label: "Adripedia",
      items: [{ text: "Home", href: "index.html" }]
    },
    {
      label: "Aree",
      items: [
        {
          text: "Informatica",
          children: [
            { text: "Panoramica", href: "informatica/index.html" },
            {
              text: "OpenCode",
              children: [
                { text: "Panoramica", href: "opencode/index.html" },
                {
                  text: "Installazione",
                  children: [
                    { text: "Windows", href: "opencode/installazione/windows.html" },
                    { text: "Linux", href: "opencode/installazione/linux.html" }
                  ]
                },
                { text: "Agenti: Build e Plan", href: "opencode/agenti.html" },
                { text: "Configurazione", href: "opencode/configurazione.html" },
                { text: "Scorciatoie", href: "opencode/scorciatoie.html" },
                { text: "Comandi CLI", href: "opencode/comandi-cli.html" },
                { text: "Comandi slash", href: "opencode/comandi-slash.html" },
                { text: "FAQ", href: "opencode/faq.html" }
              ]
            },
            {
              text: "Git",
              children: [
                { text: "Panoramica", href: "informatica/git/index.html#panoramica" },
                { text: "Installazione Windows", href: "informatica/git/index.html#windows" },
                { text: "Installazione Linux", href: "informatica/git/index.html#linux" },
                { text: "Comandi", href: "informatica/git/index.html#comandi" }
              ]
            },
            {
              text: "Docker",
              children: [
                { text: "Panoramica", href: "informatica/docker/index.html#panoramica" },
                { text: "Installazione Windows", href: "informatica/docker/index.html#windows" },
                { text: "Installazione Linux", href: "informatica/docker/index.html#linux" },
                { text: "Comandi", href: "informatica/docker/index.html#comandi" },
                { text: "Approfondimenti", href: "informatica/docker/index.html#approfondimenti" }
              ]
            },
            {
              text: "Podman",
              children: [
                { text: "Panoramica", href: "informatica/podman/index.html#panoramica" },
                { text: "Installazione", href: "informatica/podman/index.html#installazione" },
                { text: "Comandi", href: "informatica/podman/index.html#comandi" },
                { text: "Configurazione", href: "informatica/podman/index.html#configurazione" },
                { text: "Approfondimenti", href: "informatica/podman/index.html#approfondimenti" }
              ]
            },
            {
              text: "Buildah",
              children: [
                { text: "Panoramica", href: "informatica/buildah/index.html#panoramica" },
                { text: "Installazione", href: "informatica/buildah/index.html#installazione" },
                { text: "Comandi", href: "informatica/buildah/index.html#comandi" },
                { text: "Configurazione", href: "informatica/buildah/index.html#configurazione" },
                { text: "Approfondimenti", href: "informatica/buildah/index.html#approfondimenti" }
              ]
            },
            {
              text: "Kubernetes",
              children: [
                { text: "Panoramica", href: "informatica/kubernetes/index.html#panoramica" },
                { text: "Installazione", href: "informatica/kubernetes/index.html#installazione" },
                { text: "Comandi", href: "informatica/kubernetes/index.html#comandi" },
                { text: "Approfondimenti", href: "informatica/kubernetes/index.html#approfondimenti" },
                { text: "CKA", href: "informatica/kubernetes/index.html#cka" }
              ]
            },
            {
              text: "k3s",
              children: [
                { text: "Panoramica", href: "informatica/k3s/index.html#panoramica" },
                { text: "Installazione", href: "informatica/k3s/index.html#installazione" },
                { text: "Comandi", href: "informatica/k3s/index.html#comandi" },
                { text: "Approfondimenti", href: "informatica/k3s/index.html#approfondimenti" }
              ]
            },
            {
              text: "k9s",
              children: [
                { text: "Panoramica", href: "informatica/k9s/index.html#panoramica" },
                { text: "Installazione", href: "informatica/k9s/index.html#installazione" },
                { text: "Comandi", href: "informatica/k9s/index.html#comandi" },
                { text: "Configurazione", href: "informatica/k9s/index.html#configurazione" },
                { text: "Approfondimenti", href: "informatica/k9s/index.html#approfondimenti" }
              ]
            },
            {
              text: "WSL",
              children: [
                { text: "Panoramica", href: "informatica/wsl/index.html#panoramica" },
                { text: "Installazione Windows", href: "informatica/wsl/index.html#windows" },
                { text: "Comandi", href: "informatica/wsl/index.html#comandi" }
              ]
            }
          ]
        },
        {
          text: "Link",
          children: [
            { text: "Panoramica", href: "link/index.html" }
          ]
        }
      ]
    }
  ];

  /* Vero se href punta alla pagina corrente e, quando presente, anche
     all'ancora corrente (serve ai link che aprono un tab). */
  function isCurrentTarget(href) {
    var hashIndex = href.indexOf("#");
    var path = hashIndex === -1 ? href : href.slice(0, hashIndex);
    var hash = hashIndex === -1 ? "" : href.slice(hashIndex);

    return path === currentPage && hash === (window.location.hash || "");
  }

  function isSamePage(href) {
    return href.split("#")[0] === currentPage;
  }

  function renderLink(item) {
    var active = isCurrentTarget(item.href);
    return (
      '<a href="' +
      withRoot(item.href) +
      '" data-href="' +
      item.href +
      '"' +
      (active ? ' class="active" aria-current="page"' : "") +
      ">" +
      item.text +
      "</a>"
    );
  }

  /* Vero se la voce, o una delle sue discendenti, è la pagina corrente.
     Serve ad aprire tutti i livelli del menu che portano alla pagina. */
  function isActiveBranch(item) {
    if (item.href && isSamePage(item.href)) {
      return true;
    }

    if (item.children && item.children.length) {
      return item.children.some(isActiveBranch);
    }

    return false;
  }

  function renderItem(item) {
    if (item.children && item.children.length) {
      var open = isActiveBranch(item);

      return (
        "<li>" +
        '<details class="nav-group"' +
        (open ? " open" : "") +
        ">" +
        "<summary>" +
        item.text +
        "</summary>" +
        "<ul>" +
        item.children.map(renderItem).join("") +
        "</ul>" +
        "</details>" +
        "</li>"
      );
    }

    return "<li>" + renderLink(item) + "</li>";
  }

  function renderSection(section) {
    return (
      '<div class="nav-section">' +
      '<p class="nav-label">' +
      section.label +
      "</p>" +
      "<ul>" +
      section.items.map(renderItem).join("") +
      "</ul>" +
      "</div>"
    );
  }

  var sidebar = document.getElementById("sidebar");

  /* Marchio: globo di meridiani che forma una A (proposta "Globo A"). */
  var LOGO =
    '<svg class="brand-mark" viewBox="0 0 120 120" aria-hidden="true" focusable="false">' +
    '<g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">' +
    '<circle cx="60" cy="60" r="50"/>' +
    '<g opacity="0.3" stroke-width="2.5">' +
    '<ellipse cx="60" cy="60" rx="23" ry="50"/>' +
    '<path d="M16 44h88M16 76h88"/>' +
    "</g>" +
    '<path d="M60 22 33 96M60 22l27 74"/>' +
    '<path d="M42 72h36"/>' +
    "</g>" +
    "</svg>";

  if (sidebar) {
    sidebar.innerHTML =
      '<div class="sidebar-header">' +
      '<a class="brand" href="' +
      withRoot("index.html") +
      '">' +
      LOGO +
      '<span class="brand-text"><strong>Adripedia</strong><span>Wiki personale</span></span>' +
      "</a>" +
      "</div>" +
      '<nav class="nav" aria-label="Aree e sezioni di Adripedia">' +
      NAV.map(renderSection).join("") +
      "</nav>";
  }

  /* Aggiorna lo stato attivo dei link senza ridisegnare il menu, così i
     gruppi aperti dall'utente restano aperti quando si cambia tab. */
  function refreshNav() {
    if (!sidebar) return;

    sidebar.querySelectorAll(".nav a[data-href]").forEach(function (link) {
      var active = isCurrentTarget(link.getAttribute("data-href"));
      link.classList.toggle("active", active);

      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  /* ---------------------------------------------------------------------
     Hamburger + overlay
     --------------------------------------------------------------------- */
  var toggle = document.getElementById("menu-toggle");
  var overlay = document.getElementById("overlay");
  var mobile = window.matchMedia("(max-width: 900px)");

  function isCollapsed() {
    return body.classList.contains("sidebar-collapsed");
  }

  function setCollapsed(collapsed) {
    body.classList.toggle("sidebar-collapsed", collapsed);

    if (toggle) {
      toggle.setAttribute("aria-expanded", String(!collapsed));
      toggle.setAttribute("aria-label", collapsed ? "Apri il menu" : "Chiudi il menu");
    }

    if (overlay) {
      overlay.hidden = !mobile.matches || collapsed;
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setCollapsed(!isCollapsed());
    });
  }

  if (overlay) {
    overlay.addEventListener("click", function () {
      setCollapsed(true);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && mobile.matches && !isCollapsed()) {
      setCollapsed(true);
      if (toggle) toggle.focus();
    }
  });

  if (typeof mobile.addEventListener === "function") {
    mobile.addEventListener("change", function (event) {
      setCollapsed(event.matches);
    });
  }

  /* Su mobile il menu parte chiuso, su desktop aperto. */
  setCollapsed(mobile.matches);

  /* Chiudi il menu dopo aver scelto una voce, su mobile. */
  if (sidebar) {
    sidebar.addEventListener("click", function (event) {
      if (event.target.closest("a") && mobile.matches) {
        setCollapsed(true);
      }
    });
  }

  /* ---------------------------------------------------------------------
     Tab accessibili
     Un contenitore [data-tabs] contiene i [role="tab"] e i pannelli indicati
     da aria-controls. Senza JavaScript tutti i pannelli restano visibili.
     --------------------------------------------------------------------- */
  document.querySelectorAll("[data-tabs]").forEach(function (container) {
    var items = Array.prototype.map
      .call(container.querySelectorAll('[role="tab"]'), function (tab) {
        return {
          tab: tab,
          panel: document.getElementById(tab.getAttribute("aria-controls"))
        };
      })
      .filter(function (item) {
        return item.panel;
      });

    if (!items.length) return;

    function setHash(id) {
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", "#" + id);
      } else {
        window.location.hash = id;
      }
    }

    function activate(item, updateHash) {
      items.forEach(function (entry) {
        var selected = entry === item;
        entry.tab.setAttribute("aria-selected", String(selected));
        entry.tab.tabIndex = selected ? 0 : -1;
        entry.panel.hidden = !selected;
      });

      if (updateHash) setHash(item.panel.id);
      refreshNav();
    }

    function fromHash() {
      var id = window.location.hash.replace(/^#/, "");
      if (!id) return null;

      for (var i = 0; i < items.length; i += 1) {
        if (items[i].panel.id === id) return items[i];
      }

      // Un'ancora interna a un pannello (per esempio #glossario) deve
      // attivare il pannello che la contiene.
      var target = document.getElementById(id);
      if (target) {
        for (var j = 0; j < items.length; j += 1) {
          if (items[j].panel.contains(target)) return items[j];
        }
      }

      return null;
    }

    function scrollToHash(item) {
      var id = window.location.hash.replace(/^#/, "");
      var target = id === item.panel.id ? item.panel : document.getElementById(id);
      if (!target || !item.panel.contains(target)) target = item.panel;
      target.scrollIntoView({ block: "start", behavior: "instant" });
    }

    items.forEach(function (item, index) {
      item.tab.addEventListener("click", function () {
        activate(item, true);
      });

      item.tab.addEventListener("keydown", function (event) {
        var next = null;

        if (event.key === "ArrowRight") {
          next = items[(index + 1) % items.length];
        } else if (event.key === "ArrowLeft") {
          next = items[(index - 1 + items.length) % items.length];
        } else if (event.key === "Home") {
          next = items[0];
        } else if (event.key === "End") {
          next = items[items.length - 1];
        }

        if (next) {
          event.preventDefault();
          next.tab.focus();
          activate(next, true);
        }
      });
    });

    var initial = fromHash();
    activate(initial || items[0], false);

    if (initial) {
      scrollToHash(initial);
    } else {
      setHash(items[0].panel.id);
      refreshNav();
    }

    window.addEventListener("hashchange", function () {
      var item = fromHash();
      if (!item) return;

      activate(item, false);
      scrollToHash(item);
    });
  });

  /* ---------------------------------------------------------------------
     Ricerca tra i comandi (tab Comandi)
     Indicizza le righe della cheat sheet e le righe dei blocchi di codice,
     mostra i risultati mentre si digita e salta al comando scelto.
     --------------------------------------------------------------------- */
  (function () {
    var panel = document.getElementById("comandi");
    var input = document.getElementById("cmd-search-input");
    var results = document.getElementById("cmd-search-results");
    var hint = document.getElementById("cmd-search-hint");

    if (!panel || !input || !results) return;

    var defaultHint = hint ? hint.textContent.trim() : "";
    var entries = [];
    var current = [];
    var activeIndex = -1;
    var hitTimer = null;

    function normalize(value) {
      return String(value)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    }

    /* Titolo della sezione (h2/h3) che precede un elemento. */
    function sectionOf(target) {
      var heading = "";
      var children = panel.children;

      for (var i = 0; i < children.length; i += 1) {
        var child = children[i];

        if (/^H[23]$/.test(child.tagName)) {
          heading = child.textContent.trim();
        } else if (child.contains(target)) {
          return heading;
        }
      }

      return heading;
    }

    function makeEntry(command, desc, target) {
      var context = sectionOf(target);

      return {
        command: command,
        desc: desc,
        context: context,
        target: target,
        haystack: normalize(command + " " + desc + " " + context)
      };
    }

    /* Righe delle tabelle: comando nella prima cella, descrizione nella seconda. */
    panel.querySelectorAll(".table-wrap tbody tr").forEach(function (row) {
      var code = row.querySelector("td code");
      if (!code) return;

      var cells = row.querySelectorAll("td");
      var desc = cells[1] ? cells[1].textContent.trim() : "";

      entries.push(makeEntry(code.textContent.trim(), desc, row));
    });

    /* Righe dei blocchi di codice: ogni riga utile diventa un bersaglio.
       Gli span sono inline, quindi pre.innerText resta identico. */
    var lineId = 0;

    panel.querySelectorAll("pre code").forEach(function (code) {
      var lines = code.textContent.split("\n");
      code.textContent = "";

      lines.forEach(function (line, index) {
        var span = document.createElement("span");
        span.className = "cmd-line";
        span.id = "cmd-line-" + lineId;
        lineId += 1;
        span.textContent = line;
        code.appendChild(span);

        if (index < lines.length - 1) {
          code.appendChild(document.createTextNode("\n"));
        }

        var command = line.trim();
        if (!command || command.charAt(0) === "#") return;

        entries.push(makeEntry(command, "", span));
      });
    });

    /* Evita doppioni: la cheat sheet viene indicizzata per prima. */
    var seen = {};
    entries = entries.filter(function (entry) {
      var key = normalize(entry.command);

      if (seen[key]) return false;
      seen[key] = true;
      return true;
    });

    function search(query) {
      var tokens = normalize(query).split(/\s+/).filter(Boolean);
      if (!tokens.length) return [];

      var found = [];

      entries.forEach(function (entry) {
        var matches = tokens.every(function (token) {
          return entry.haystack.indexOf(token) !== -1;
        });

        if (!matches) return;

        var command = normalize(entry.command);
        var score = 0;

        if (command === query.trim().toLowerCase()) score += 100;
        if (command.indexOf(tokens[0]) === 0) score += 40;
        if (command.indexOf(tokens[0]) !== -1) score += 15;
        score -= command.length / 100;

        found.push({ entry: entry, score: score });
      });

      found.sort(function (a, b) {
        return b.score - a.score;
      });

      return found.slice(0, 12).map(function (item) {
        return item.entry;
      });
    }

    function setActive(index, scroll) {
      var options = results.querySelectorAll(".cmd-result");
      if (!options.length) return;

      activeIndex = (index + options.length) % options.length;

      options.forEach(function (option, i) {
        var selected = i === activeIndex;
        option.classList.toggle("is-active", selected);
        option.setAttribute("aria-selected", String(selected));
      });

      input.setAttribute("aria-activedescendant", options[activeIndex].id);

      if (scroll) {
        options[activeIndex].scrollIntoView({ block: "nearest" });
      }
    }

    function close() {
      results.hidden = true;
      input.setAttribute("aria-expanded", "false");
      input.removeAttribute("aria-activedescendant");
    }

    function clear() {
      current = [];
      activeIndex = -1;
      results.textContent = "";
      close();

      if (hint) hint.textContent = defaultHint;
    }

    function render(list) {
      current = list;
      activeIndex = list.length ? 0 : -1;
      results.textContent = "";

      if (!list.length) {
        close();
        if (hint) hint.textContent = "Nessun comando trovato.";
        return;
      }

      list.forEach(function (entry, index) {
        var option = document.createElement("li");
        option.className = "cmd-result";
        option.id = "cmd-result-" + index;
        option.setAttribute("role", "option");
        option.setAttribute("aria-selected", "false");

        var code = document.createElement("code");
        code.textContent = entry.command;

        var desc = document.createElement("span");
        desc.className = "cmd-result-desc";
        desc.textContent = entry.desc;

        var context = document.createElement("span");
        context.className = "cmd-result-context";
        context.textContent = entry.context;

        option.appendChild(code);
        if (entry.desc) option.appendChild(desc);
        if (entry.context) option.appendChild(context);

        /* mousedown: sceglie prima che il click esterno tolga il focus. */
        option.addEventListener("mousedown", function (event) {
          event.preventDefault();
          choose(index, false);
        });

        results.appendChild(option);
      });

      results.hidden = false;
      input.setAttribute("aria-expanded", "true");

      if (hint) {
        hint.textContent =
          list.length === 1 ? "1 comando trovato." : list.length + " comandi trovati.";
      }

      setActive(0, false);
    }

    function choose(index, keepFocus) {
      var entry = current[index];
      if (!entry) return;

      close();
      if (!keepFocus) input.blur();

      var previous = panel.querySelectorAll(".cmd-hit");
      previous.forEach(function (element) {
        element.classList.remove("cmd-hit");
      });

      if (hitTimer) window.clearTimeout(hitTimer);

      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      entry.target.classList.add("cmd-hit");
      entry.target.scrollIntoView({
        block: "center",
        behavior: reduce ? "auto" : "smooth"
      });

      hitTimer = window.setTimeout(function () {
        entry.target.classList.remove("cmd-hit");
        hitTimer = null;
      }, 2200);
    }

    input.addEventListener("input", function () {
      var query = input.value.trim();

      if (!query) {
        clear();
        return;
      }

      render(search(query));
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown") {
        event.preventDefault();

        if (results.hidden && input.value.trim()) {
          render(search(input.value));
        } else {
          setActive(activeIndex + 1, true);
        }
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive(activeIndex - 1, true);
      } else if (event.key === "Enter") {
        if (!results.hidden && activeIndex >= 0) {
          event.preventDefault();
          choose(activeIndex, true);
        }
      } else if (event.key === "Escape") {
        close();
      }
    });

    document.addEventListener("click", function (event) {
      if (results.hidden) return;
      if (!(event.target instanceof Element)) return;
      if (event.target.closest(".cmd-search")) return;

      close();
    });
  })();

  /* ---------------------------------------------------------------------
     Filtro del glossario
     Nasconde le righe che non contengono tutte le parole cercate.
     --------------------------------------------------------------------- */
  (function () {
    var input = document.getElementById("glossary-search-input");
    var table = document.getElementById("glossary-table");
    var hint = document.getElementById("glossary-search-hint");

    if (!input || !table || !hint) return;

    var rows = Array.prototype.slice.call(table.querySelectorAll("tbody tr"));
    var defaultHint = hint.textContent.trim();

    function normalize(value) {
      return String(value)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    }

    var entries = rows.map(function (row) {
      return {
        row: row,
        text: normalize(row.textContent)
      };
    });

    input.addEventListener("input", function () {
      var tokens = normalize(input.value).split(/\s+/).filter(Boolean);
      var found = 0;

      entries.forEach(function (entry) {
        var match = tokens.every(function (token) {
          return entry.text.indexOf(token) !== -1;
        });

        entry.row.hidden = !match;
        if (match) found += 1;
      });

      if (!tokens.length) {
        hint.textContent = defaultHint;
      } else if (!found) {
        hint.textContent = "Nessuna voce trovata.";
      } else {
        hint.textContent = found + (found === 1 ? " voce trovata." : " voci trovate.");
      }
    });
  })();

  /* ---------------------------------------------------------------------
     Aggiornamenti paginati in home
     Il contenitore [data-updates] mostra le voci a gruppi; senza JavaScript
     restano tutte visibili e i controlli non compaiono.
     --------------------------------------------------------------------- */
  document.querySelectorAll("[data-updates]").forEach(function (container) {
    var list = container.querySelector("[data-updates-list]");
    var controls = container.querySelector("[data-updates-controls]");
    var prev = container.querySelector("[data-updates-prev]");
    var next = container.querySelector("[data-updates-next]");
    var pagesWrap = container.querySelector("[data-updates-pages]");
    var status = container.querySelector("[data-updates-status]");

    if (!list || !controls || !prev || !next || !status) return;

    var items = Array.prototype.slice.call(list.children).filter(function (item) {
      return item.nodeType === 1;
    });
    var pageSize = parseInt(container.getAttribute("data-page-size"), 10) || 3;
    var pages = Math.ceil(items.length / pageSize);
    var page = 0;
    var pageButtons = [];

    document.querySelectorAll("[data-updates-count]").forEach(function (label) {
      label.textContent =
        items.length + (items.length === 1 ? " voce" : " voci");
    });

    if (pages <= 1) return;

    controls.hidden = false;

    if (pagesWrap) {
      pagesWrap.textContent = "";

      for (var i = 0; i < pages; i += 1) {
        (function (index) {
          var button = document.createElement("button");
          button.type = "button";
          button.className = "updates-page";
          button.textContent = String(index + 1);
          button.setAttribute("aria-label", "Vai alla pagina " + (index + 1));

          button.addEventListener("click", function () {
            page = index;
            render();
          });

          pagesWrap.appendChild(button);
          pageButtons.push(button);
        })(i);
      }
    }

    function render() {
      var start = page * pageSize;
      var end = start + pageSize;

      items.forEach(function (item, index) {
        item.hidden = index < start || index >= end;
      });

      pageButtons.forEach(function (button, index) {
        if (index === page) {
          button.setAttribute("aria-current", "page");
        } else {
          button.removeAttribute("aria-current");
        }
      });

      prev.disabled = page === 0;
      next.disabled = page === pages - 1;
      status.textContent =
        "Pagina " + (page + 1) + " di " + pages + " \u00b7 " + items.length +
        (items.length === 1 ? " voce" : " voci");
    }

    prev.addEventListener("click", function () {
      if (page === 0) return;
      page -= 1;
      render();
    });

    next.addEventListener("click", function () {
      if (page === pages - 1) return;
      page += 1;
      render();
    });

    render();
  });

  /* ---------------------------------------------------------------------
     Pulsante "Copia" per i blocchi di codice
     --------------------------------------------------------------------- */
  document.querySelectorAll("pre").forEach(function (pre) {
    var wrap = document.createElement("div");
    wrap.className = "pre-wrap";
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);

    var button = document.createElement("button");
    button.type = "button";
    button.className = "copy-btn";
    button.textContent = "Copia";

    button.addEventListener("click", function () {
      var text = pre.innerText;

      function done(label) {
        button.textContent = label;
        window.setTimeout(function () {
          button.textContent = "Copia";
        }, 1500);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () {
            done("Copiato");
          },
          function () {
            done("Errore");
          }
        );
      } else {
        done("Non supportato");
      }
    });

    wrap.appendChild(button);
  });

  /* ---------------------------------------------------------------------
     Pulsante "Torna in cima"
     --------------------------------------------------------------------- */
  var toTop = document.createElement("button");
  toTop.type = "button";
  toTop.className = "to-top";
  toTop.setAttribute("aria-label", "Torna in cima");
  toTop.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
    '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>' +
    "</svg>";
  document.body.appendChild(toTop);

  function updateToTop() {
    var visible = window.scrollY > 480;
    toTop.classList.toggle("is-visible", visible);
    toTop.tabIndex = visible ? 0 : -1;
  }

  window.addEventListener("scroll", updateToTop, { passive: true });
  updateToTop();

  toTop.addEventListener("click", function () {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    toTop.blur();
  });
})();
