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

  function renderLink(item) {
    var active = item.href === currentPage;
    return (
      '<a href="' +
      withRoot(item.href) +
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
    if (item.href === currentPage) {
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
      "</nav>" +
      '<div class="sidebar-footer">' +
      '<span class="badge">beta</span>' +
      '<a href="' +
      withRoot("README.md") +
      '">README</a>' +
      "</div>";
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
