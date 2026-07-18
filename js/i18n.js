/* ============================================
   IDIOMA: inglês (padrão) ⇄ português
   Elementos com data-i18n="chave" são traduzidos
   automaticamente ao trocar de idioma.
   ============================================ */
(function () {
    "use strict";

    const translations = {
        en: {
            "meta.title": "Pedro Loschi — Portfolio",
            "nav.home": "Home",
            "nav.about": "About",
            "nav.projects": "Projects",
            "nav.experience": "Experience",
            "nav.contact": "Contact",
            "nav.resume": "Resume",
            "hero.greeting": "Hi, I'm",
            "hero.subtitle": "Developer & Digital Creator",
            "hero.viewProjects": "View projects",
            "hero.contact": "Get in touch",
            "hero.scroll": "scroll to explore",
        },
        pt: {
            "meta.title": "Pedro Loschi — Portfólio",
            "nav.home": "Início",
            "nav.about": "Sobre",
            "nav.projects": "Projetos",
            "nav.experience": "Experiência",
            "nav.contact": "Contato",
            "nav.resume": "Currículo",
            "hero.greeting": "Olá, eu sou",
            "hero.subtitle": "Desenvolvedor & Criador Digital",
            "hero.viewProjects": "Ver projetos",
            "hero.contact": "Fale comigo",
            "hero.scroll": "role para explorar",
        },
    };

    const langButtons = Array.from(document.querySelectorAll(".lang-btn"));

    function applyLang(lang) {
        const dict = translations[lang] || translations.en;

        document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
        document.title = dict["meta.title"];

        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            const value = dict[el.dataset.i18n];
            if (value) el.textContent = value;
        });

        langButtons.forEach(function (btn) {
            const active = btn.dataset.lang === lang;
            btn.classList.toggle("active", active);
            btn.setAttribute("aria-pressed", String(active));
        });

        try {
            localStorage.setItem("lang", lang);
        } catch (e) { /* modo privado etc. */ }

        // avisa outros scripts (ex.: rótulos do botão de tema)
        document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
    }

    langButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            applyLang(btn.dataset.lang);
        });
    });

    // idioma inicial: escolha salva, senão inglês
    let saved = null;
    try {
        saved = localStorage.getItem("lang");
    } catch (e) { /* segue padrão */ }

    applyLang(saved === "pt" ? "pt" : "en");
})();
