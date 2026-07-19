/* ============================================================
   MELHORIAS INTERATIVAS
   - decode/scramble nos links da navbar e títulos de seção
   - cursor customizado que reage a elementos interativos
   - botões magnéticos
   - terminal easter egg (tecla ` ou clique na dica)
   - konami code (↑↑↓↓←→←→BA)
   ============================================================ */
(function () {
    "use strict";

    var OPTS = window.FX_OPTS || {};
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    var GLYPHS = "!<>-_\\/[]{}=+*^?#________";

    function isPT() {
        return document.documentElement.lang.indexOf("pt") === 0;
    }

    /* ---------- Scramble / decode ---------- */
    function scramble(el, opts) {
        if (reducedMotion || el.dataset.scrambling) return;
        var target = el.textContent;
        if (!target.trim()) return;
        el.dataset.scrambling = "1";
        var frame = 0;
        var perChar = (opts && opts.perChar) || 3; // frames até cada letra resolver
        var total = target.length * perChar + 8;

        function step() {
            var out = "";
            for (var i = 0; i < target.length; i++) {
                var resolveAt = i * perChar + 6;
                if (target[i] === " ") { out += " "; continue; }
                if (frame >= resolveAt) out += target[i];
                else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
            }
            el.textContent = out;
            frame++;
            if (frame <= total && el.dataset.scrambling) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
                delete el.dataset.scrambling;
            }
        }
        requestAnimationFrame(step);
    }

    // navbar: decodifica no hover/focus
    document.querySelectorAll(".nav-link [data-i18n]").forEach(function (span) {
        var link = span.closest(".nav-link");
        link.addEventListener("mouseenter", function () { scramble(span, { perChar: 2 }); });
        link.addEventListener("focus", function () { scramble(span, { perChar: 2 }); });
    });

    // títulos de seção: decodificam na primeira entrada na tela
    if ("IntersectionObserver" in window && !reducedMotion) {
        var seen = new WeakSet();
        var titleObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !seen.has(entry.target)) {
                    seen.add(entry.target);
                    scramble(entry.target, { perChar: 2 });
                    titleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        document.querySelectorAll(".section-kicker").forEach(function (el) {
            titleObserver.observe(el);
        });
    }

    // hero: saudação decodifica ao carregar
    var greeting = document.querySelector(".hero-greeting");
    if (greeting) setTimeout(function () { scramble(greeting, { perChar: 4 }); }, 600);

    /* ---------- Cursor customizado ---------- */
    if (finePointer && !reducedMotion && OPTS.cursor !== false) {
        var dot = document.createElement("div");
        var ring = document.createElement("div");
        dot.className = "cursor-dot is-hidden";
        ring.className = "cursor-ring is-hidden";
        dot.setAttribute("aria-hidden", "true");
        ring.setAttribute("aria-hidden", "true");
        document.body.appendChild(dot);
        document.body.appendChild(ring);
        document.documentElement.classList.add("custom-cursor");

        var mx = -100, my = -100, rx = -100, ry = -100;

        document.addEventListener("mousemove", function (e) {
            mx = e.clientX; my = e.clientY;
            dot.classList.remove("is-hidden");
            ring.classList.remove("is-hidden");
            var t = e.target;
            var interactive = t.closest &&
                t.closest("a, button, [tabindex], input, .project-card, .lang-btn");
            ring.classList.toggle("is-hover", !!interactive);
            dot.classList.toggle("is-hover", !!interactive);
        });

        document.addEventListener("mouseleave", function () {
            dot.classList.add("is-hidden");
            ring.classList.add("is-hidden");
        });

        (function follow() {
            rx += (mx - rx) * 0.16;
            ry += (my - ry) * 0.16;
            dot.style.transform = "translate(" + mx + "px," + my + "px) translate(-50%, -50%)";
            ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%, -50%)";
            requestAnimationFrame(follow);
        })();
    }

    /* ---------- Botões magnéticos ---------- */
    if (finePointer && !reducedMotion) {
        document.querySelectorAll(".btn, .btn-resume, .social-btn, .theme-toggle, .back-top")
            .forEach(function (el) {
                el.addEventListener("mousemove", function (e) {
                    var r = el.getBoundingClientRect();
                    var dx = e.clientX - (r.left + r.width / 2);
                    var dy = e.clientY - (r.top + r.height / 2);
                    el.style.transform = "translate(" + dx * 0.18 + "px," + dy * 0.22 + "px)";
                });
                el.addEventListener("mouseleave", function () {
                    el.style.transform = "";
                });
            });
    }

    /* ---------- Toast ---------- */
    var toast = document.createElement("div");
    toast.className = "fx-toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
    var toastTimer;

    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 3200);
    }

    /* ---------- Terminal easter egg ---------- */
    var hint = document.createElement("button");
    hint.type = "button";
    hint.className = "term-hint";
    hint.innerHTML = "<kbd>`</kbd><span></span>";
    if (OPTS.terminalHint === false) hint.style.display = "none";
    document.body.appendChild(hint);

    var term = document.createElement("div");
    term.className = "terminal";
    term.innerHTML =
        '<div class="terminal-panel" role="dialog" aria-modal="true" aria-label="Terminal">' +
        '  <div class="terminal-bar">' +
        '    <span class="t-dot"></span><span class="t-dot"></span><span class="t-dot"></span>' +
        '    <span class="t-title">pedro@loschi.dev — zsh</span>' +
        '  </div>' +
        '  <div class="terminal-out"></div>' +
        '  <div class="terminal-in">' +
        '    <span class="t-prompt">➜ ~</span>' +
        '    <input type="text" spellcheck="false" autocomplete="off" aria-label="terminal input">' +
        '  </div>' +
        '</div>';
    document.body.appendChild(term);

    var out = term.querySelector(".terminal-out");
    var input = term.querySelector("input");

    function updateHintLabel() {
        hint.querySelector("span").textContent = isPT() ? "abrir terminal" : "open terminal";
    }
    updateHintLabel();
    document.addEventListener("langchange", updateHintLabel);

    function print(html) {
        var div = document.createElement("div");
        div.innerHTML = html;
        out.appendChild(div);
        out.scrollTop = out.scrollHeight;
    }

    function goTo(id) {
        var el = document.getElementById(id);
        if (el) {
            closeTerm();
            var y = el.getBoundingClientRect().top + window.scrollY - 60;
            window.scrollTo({ top: y, behavior: reducedMotion ? "auto" : "smooth" });
        }
    }

    var SECTIONS = { home: "hero", about: "sobre", sobre: "sobre", projects: "projetos", projetos: "projetos", experience: "experiencia", experiencia: "experiencia", skills: "skills", contact: "contato", contato: "contato" };

    function banner() {
        print('<span class="t-acc">pedro.loschi</span> <span class="t-dim">v2.0 — ' +
            (isPT() ? 'digite <span class="t-cmd">help</span> para ver os comandos'
                    : 'type <span class="t-cmd">help</span> to see available commands') +
            "</span>");
    }

    var COMMANDS = {
        help: function () {
            print('<span class="t-dim">' + (isPT() ? "comandos:" : "commands:") + "</span>\n" +
                '  <span class="t-cmd">ls</span>        ' + (isPT() ? "lista as seções" : "list sections") + "\n" +
                '  <span class="t-cmd">cd &lt;section&gt;</span>  ' + (isPT() ? "navega até a seção" : "jump to a section") + "\n" +
                '  <span class="t-cmd">whoami</span>    ' + (isPT() ? "sobre mim" : "about me") + "\n" +
                '  <span class="t-cmd">theme</span>     ' + (isPT() ? "alterna claro/escuro" : "toggle light/dark") + "\n" +
                '  <span class="t-cmd">lang</span>      en ↔ pt\n' +
                '  <span class="t-cmd">resume</span>    ' + (isPT() ? "abre o currículo" : "open resume") + "\n" +
                '  <span class="t-cmd">clear</span>     ' + (isPT() ? "limpa a tela" : "clear screen") + "\n" +
                '  <span class="t-cmd">exit</span>      ' + (isPT() ? "fecha o terminal" : "close terminal"));
        },
        ls: function () {
            print('<span class="t-acc">home/</span>  <span class="t-acc">about/</span>  <span class="t-acc">projects/</span>  <span class="t-acc">experience/</span>  <span class="t-acc">skills/</span>  <span class="t-acc">contact/</span>');
        },
        cd: function (arg) {
            var id = SECTIONS[(arg || "").replace(/\/$/, "").toLowerCase()];
            if (id) { print('<span class="t-dim">cd ' + arg + "</span>"); goTo(id); }
            else print('<span class="t-err">cd: no such section: ' + (arg || "") + "</span>");
        },
        whoami: function () {
            print(isPT()
                ? "Pedro Loschi Giovannini — engenheiro de software apaixonado por IA.\nCiência da Computação @ PUC-Rio · bolsista integral Fundação Behring.\nConstruo produtos reais para a Petrobras no Instituto ECOA."
                : "Pedro Loschi Giovannini — software engineer passionate about AI.\nComputer Science @ PUC-Rio · Behring Foundation full merit scholar.\nI build real products for Petrobras at Instituto ECOA.");
        },
        theme: function () {
            var toggleBtn = document.getElementById("theme-toggle");
            if (toggleBtn) toggleBtn.click();
            print('<span class="t-dim">theme → ' +
                (document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark") + "</span>");
        },
        lang: function (arg) {
            var next = arg === "pt" || arg === "en" ? arg : (isPT() ? "en" : "pt");
            var btn = document.querySelector('.lang-btn[data-lang="' + next + '"]');
            if (btn) btn.click();
            print('<span class="t-dim">lang → ' + next + "</span>");
            updateHintLabel();
        },
        resume: function () {
            window.open("assets/Pedro_Loschi_Giovannini_Resume.pdf", "_blank", "noopener");
            print('<span class="t-dim">opening resume.pdf…</span>');
        },
        sudo: function () {
            print('<span class="t-err">' + (isPT() ? "permissão negada: aqui só o Pedro manda ;)" : "permission denied: only Pedro has root here ;)") + "</span>");
        },
        konami: function () {
            print('<span class="t-dim">↑ ↑ ↓ ↓ ← → ← → B A</span>');
        },
        clear: function () { out.innerHTML = ""; },
        exit: function () { closeTerm(); }
    };

    function run(raw) {
        var parts = raw.trim().split(/\s+/);
        var cmd = (parts[0] || "").toLowerCase();
        if (!cmd) return;
        print('<span class="t-prompt t-cmd">➜ ~</span> ' + raw.replace(/</g, "&lt;"));
        if (COMMANDS[cmd]) COMMANDS[cmd](parts[1]);
        else if (SECTIONS[cmd]) COMMANDS.cd(cmd);
        else print('<span class="t-err">command not found: ' + cmd.replace(/</g, "&lt;") + '</span> <span class="t-dim">(try <span class="t-cmd">help</span>)</span>');
    }

    var termOpen = false;

    function openTerm() {
        termOpen = true;
        term.classList.add("open");
        if (!out.childNodes.length) banner();
        setTimeout(function () { input.focus(); }, 120);
    }

    function closeTerm() {
        termOpen = false;
        term.classList.remove("open");
        input.blur();
    }

    hint.addEventListener("click", openTerm);
    term.addEventListener("click", function (e) { if (e.target === term) closeTerm(); });

    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { run(input.value); input.value = ""; }
        e.stopPropagation();
    });

    document.addEventListener("keydown", function (e) {
        if ((e.key === "`" || e.key === "'") && !termOpen &&
            !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
            e.preventDefault();
            openTerm();
        } else if (e.key === "Escape" && termOpen) {
            closeTerm();
        }
    });

    /* ---------- Konami code ---------- */
    var KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    var kIndex = 0;

    document.addEventListener("keydown", function (e) {
        if (termOpen) return;
        var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        if (key === KONAMI[kIndex]) {
            kIndex++;
            if (kIndex === KONAMI.length) {
                kIndex = 0;
                var on = document.body.classList.toggle("konami");
                showToast(on
                    ? (isPT() ? "achievement unlocked: modo hacker ativado" : "achievement unlocked: hacker mode on")
                    : (isPT() ? "modo hacker desativado" : "hacker mode off"));
            }
        } else {
            kIndex = key === KONAMI[0] ? 1 : 0;
        }
    });
})();
