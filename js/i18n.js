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
            "about.kicker": "About me",
            "about.title": "Turning curiosity into real software",
            "about.p1": "I'm a 20-year-old software developer from Rio de Janeiro, studying Computer Science at PUC-Rio as a full merit scholarship holder of the Behring Foundation — after placing 1st in the university's entrance exam for my course.",
            "about.p2": "For over a year I've been building real software and AI solutions at Instituto ECOA (PUC-Rio / Petrobras Ignição program), working end to end: from problem discovery and requirements to architecture, implementation, testing and delivery. I also support new programmers as a Python teaching assistant at PUC-Rio.",
            "about.p3": "I'm always looking for challenging environments that stretch my technical skills and let me create impact through technology.",
            "about.stat1suffix": "st",
            "about.stat1": "place in PUC-Rio's CS entrance exam",
            "about.stat2": "merit scholarship — Behring Foundation",
            "about.stat3": "AI solutions built for Petrobras",
            "about.stat4": "year shipping real-world products",
            "projects.kicker": "Portfolio",
            "projects.title": "AI products shipped to a real client",
            "projects.intro": "Three solutions designed, validated and delivered to Petrobras through the Ignição program (Instituto ECOA PUC-Rio) — from problem discovery to working software.",
            "projects.gallery": "View gallery",
            "projects.oraculo.tagline": "Intelligent document verification",
            "projects.oraculo.desc": "In my last Discovery cycle, my team and I interviewed Petrobras employees to deeply understand their document-review routine, then built a web application that uses AI to automatically flag inconsistencies between documents and internal standards — making the analysis faster and more structured.",
            "projects.prisma.tagline": "AI assistant in the Microsoft ecosystem",
            "projects.prisma.desc": "Over an intense three-month cycle, we went from problem discovery to a working MVP: a WebPart integrated into Microsoft 365 that uses LLMs to support decision-making and continuous learning for Petrobras employees — delivered inside the client's own environment.",
            "projects.bee.tagline": "Expertise specialized search",
            "projects.bee.desc": "A project I started in my first Ignição cycle that was later selected by Petrobras to evolve into a real-world application. It enables semantic search over a database of 8.9M+ Brazilian researchers, matching them by academic and professional background using embeddings for information retrieval. The first version is complete, and I'm now redesigning it to be more scalable and maintainable.",
            "projects.confidential": "Source code is confidential",
            "modal.close": "Close",
            "modal.prev": "Previous image",
            "modal.next": "Next image",
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
            "about.kicker": "Sobre mim",
            "about.title": "Transformando curiosidade em software de verdade",
            "about.p1": "Sou desenvolvedor de software, tenho 20 anos e curso Ciência da Computação na PUC-Rio como bolsista integral por mérito da Fundação Behring — depois de passar em 1º lugar no vestibular do curso.",
            "about.p2": "Há mais de um ano desenvolvo soluções reais de software e IA no Instituto ECOA (programa Ignição PUC-Rio / Petrobras), atuando de ponta a ponta: da descoberta do problema e requisitos à arquitetura, implementação, testes e entrega. Também apoio novos programadores como monitor de Python na PUC-Rio.",
            "about.p3": "Busco constantemente ambientes desafiadores que ampliem minha capacidade técnica e meu impacto por meio da tecnologia.",
            "about.stat1suffix": "º",
            "about.stat1": "lugar no vestibular de CC da PUC-Rio",
            "about.stat2": "bolsa por mérito — Fundação Behring",
            "about.stat3": "soluções com IA para a Petrobras",
            "about.stat4": "ano entregando produtos reais",
            "projects.kicker": "Portfólio",
            "projects.title": "Produtos com IA entregues a um cliente real",
            "projects.intro": "Três soluções concebidas, validadas e entregues à Petrobras pelo programa Ignição (Instituto ECOA PUC-Rio) — da descoberta do problema ao software funcionando.",
            "projects.gallery": "Ver galeria",
            "projects.oraculo.tagline": "Verificação inteligente de documentos",
            "projects.oraculo.desc": "No meu último ciclo de Discovery, eu e minha equipe entrevistamos funcionários da Petrobras para entender a fundo a rotina de análise de documentos, e construímos uma aplicação web que usa IA para apontar automaticamente inconsistências entre documentos e as normas internas — tornando a análise mais ágil e estruturada.",
            "projects.prisma.tagline": "Assistente com IA no ecossistema Microsoft",
            "projects.prisma.desc": "Em um ciclo intenso de três meses, fomos da descoberta do problema a um MVP funcional: uma WebPart integrada ao Microsoft 365 que usa LLMs para apoiar a tomada de decisão e o aprendizado contínuo dos colaboradores da Petrobras — entregue dentro do ambiente do cliente.",
            "projects.bee.tagline": "Busca especializada por expertise",
            "projects.bee.desc": "Projeto que comecei no meu primeiro ciclo do Ignição e que depois foi selecionado pela Petrobras para evoluir para uma aplicação real. Permite busca semântica em uma base com mais de 8,9 milhões de pesquisadores brasileiros, combinando formação acadêmica e experiência profissional por meio de embeddings. A primeira versão está completa, e agora estou redesenhando o sistema para ser mais escalável e sustentável.",
            "projects.confidential": "Código-fonte confidencial",
            "modal.close": "Fechar",
            "modal.prev": "Imagem anterior",
            "modal.next": "Próxima imagem",
        },
    };

    let currentLang = "en";

    const langButtons = Array.from(document.querySelectorAll(".lang-btn"));

    function applyLang(lang) {
        const dict = translations[lang] || translations.en;
        currentLang = lang;

        document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
        document.title = dict["meta.title"];

        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            const value = dict[el.dataset.i18n];
            if (value) el.textContent = value;
        });

        // rótulos acessíveis (aria-label) também traduzidos
        document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
            const value = dict[el.dataset.i18nAria];
            if (value) el.setAttribute("aria-label", value);
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

    // API pública para outros scripts (ex.: modal de projetos)
    window.appI18n = {
        t: function (key) {
            const dict = translations[currentLang] || translations.en;
            return dict[key] || translations.en[key] || "";
        },
        getLang: function () {
            return currentLang;
        },
    };

    // idioma inicial: escolha salva, senão inglês
    let saved = null;
    try {
        saved = localStorage.getItem("lang");
    } catch (e) { /* segue padrão */ }

    applyLang(saved === "pt" ? "pt" : "en");
})();
