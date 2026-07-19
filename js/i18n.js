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
            "meta.desc": "Software developer and Computer Science student at PUC-Rio. I build AI-powered products for Petrobras through the ECOA/Ignição program — from discovery to delivery.",
            "nav.home": "Home",
            "nav.about": "About",
            "nav.projects": "Projects",
            "nav.experience": "Experience",
            "nav.skills": "Skills",
            "nav.contact": "Contact",
            "nav.resume": "Resume",
            "hero.greeting": "Hello! My name is",
            "hero.intro": "I'm a <span class=\"hl\">Software Engineer</span> passionate about <span class=\"hl\">AI</span>, a Computer Science student at PUC-Rio and a full merit scholar of the Behring Foundation. I build real products for Petrobras at Instituto ECOA — from discovery to delivery.",
            "hero.based": "Based in Rio de Janeiro, Brazil",
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
            "projects.portfolio.tagline": "This very website",
            "projects.portfolio.desc": "The site you're exploring right now — designed and built from scratch with pure HTML, CSS and JavaScript: interactive particle canvas, EN/PT internationalization, light/dark themes, 3D cards and zero frameworks or dependencies.",
            "projects.opensource": "Open source",
            "projects.viewCode": "View code on GitHub",
            "modal.close": "Close",
            "modal.prev": "Previous image",
            "modal.next": "Next image",
            "exp.kicker": "Journey",
            "exp.title": "Experience & Education",
            "exp.badgeWork": "Work",
            "exp.badgeEdu": "Education",
            "exp.badgeAward": "Scholarship",
            "exp.i1.role": "Software Engineer — Delivery",
            "exp.i1.period": "Mar 2026 – Present · Remote",
            "exp.i1.desc": "I turn validated MVPs into consolidated products adapted to Petrobras' tech environment — from architecture and technical modeling to implementation, testing and continuous refinement.",
            "exp.i2.role": "Python Programming Teaching Assistant",
            "exp.i2.period": "Mar 2026 – Present · Rio de Janeiro",
            "exp.i2.desc": "Selected to support the Python course: I help students with programming logic, debugging and problem solving, in class and in weekly lab sessions.",
            "exp.i3.role": "Development Intern — Discovery",
            "exp.i3.period": "Jun 2025 – Mar 2026 · Rio de Janeiro",
            "exp.i3.desc": "Across three consecutive cycles I helped build the AI MVPs Bee, Prisma and Oráculo: user interviews, requirements, feasibility analysis and presentations at Pitch Days and Demo Days.",
            "exp.i4.role": "B.Sc. in Computer Science",
            "exp.i4.period": "Aug 2024 – Jul 2028 (expected)",
            "exp.i4.desc": "Admitted in 1st place in the program's entrance exam (3rd in Exact Sciences). Solid foundation in algorithms, data structures, databases (SQL), Python, C and software engineering.",
            "exp.i5.role": "Full Merit Scholarship",
            "exp.i5.period": "Aug 2024",
            "exp.i5.desc": "Awarded a full scholarship granted to young people with high academic and professional potential — covering my entire Computer Science degree at PUC-Rio.",
            "exp.i6.role": "English Proficiency Certificate",
            "exp.i6.period": "2017 – 2023",
            "exp.i6.desc": "Full English program with proficiency certification and grades above 90 every year — consolidating the fluency I use daily in technical contexts.",
            "exp.i7.role": "High School",
            "exp.i7.period": "Completed in 2023",
            "exp.i7.desc": "Graduated with an overall average above 80% and served as the elected student mediator in 2022, bridging students and the school's coordination.",
            "skills.kicker": "Toolbox",
            "skills.title": "Skills & Technologies",
            "skills.cat1": "Languages",
            "skills.cat1desc": "The languages I use to think through and solve problems.",
            "skills.cat2": "Frontend",
            "skills.cat2desc": "Building responsive, clean and accessible interfaces.",
            "skills.cat3": "Backend",
            "skills.cat3desc": "APIs, business logic and server-side applications.",
            "skills.cat4": "Database",
            "skills.cat4desc": "Modeling, storing and querying data — relational and vector.",
            "skills.cat5": "DevOps",
            "skills.cat5desc": "Versioning, collaboration and cloud deployment.",
            "skills.cat6": "Tools",
            "skills.cat6desc": "My daily environment for coding, design and organization.",
            "skills.langsTitle": "Languages I speak",
            "skills.pt": "Portuguese",
            "skills.en": "English",
            "skills.es": "Spanish",
            "skills.native": "Native",
            "skills.fluent": "Fluent",
            "skills.basic": "Basic",
            "contact.kicker": "Contact",
            "contact.title": "Let's build something together?",
            "contact.sub": "I'm open to internship opportunities, projects and good conversations about technology — from Rio de Janeiro to anywhere, remotely.",
            "contact.cta": "Send me an email",
            "contact.email": "Email",
            "footer.made": "Designed & built by Pedro Loschi Giovannini — vanilla HTML, CSS and JS.",
            "footer.top": "Back to top",
        },
        pt: {
            "meta.title": "Pedro Loschi — Portfólio",
            "meta.desc": "Desenvolvedor de software e estudante de Ciência da Computação na PUC-Rio. Construo produtos com IA para a Petrobras pelo programa ECOA/Ignição — do discovery à entrega.",
            "nav.home": "Início",
            "nav.about": "Sobre",
            "nav.projects": "Projetos",
            "nav.experience": "Experiência",
            "nav.skills": "Competências",
            "nav.contact": "Contato",
            "nav.resume": "Currículo",
            "hero.greeting": "Olá! Meu nome é",
            "hero.intro": "Sou <span class=\"hl\">Engenheiro de Software</span> apaixonado por <span class=\"hl\">IA</span>, estudante de Ciência da Computação na PUC-Rio e bolsista integral por mérito da Fundação Behring. Construo produtos reais para a Petrobras no Instituto ECOA — do discovery à entrega.",
            "hero.based": "Rio de Janeiro, Brasil",
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
            "projects.portfolio.tagline": "Este próprio site",
            "projects.portfolio.desc": "O site que você está explorando agora — projetado e construído do zero com HTML, CSS e JavaScript puros: canvas interativo de partículas, internacionalização EN/PT, temas claro/escuro, cards 3D e zero frameworks ou dependências.",
            "projects.opensource": "Código aberto",
            "projects.viewCode": "Ver código no GitHub",
            "modal.close": "Fechar",
            "modal.prev": "Imagem anterior",
            "modal.next": "Próxima imagem",
            "exp.kicker": "Trajetória",
            "exp.title": "Experiência & Formação",
            "exp.badgeWork": "Trabalho",
            "exp.badgeEdu": "Formação",
            "exp.badgeAward": "Bolsa",
            "exp.i1.role": "Engenheiro de Software — Delivery",
            "exp.i1.period": "mar 2026 – atual · Remoto",
            "exp.i1.desc": "Transformo MVPs validados em produtos consolidados e adaptados ao ambiente tecnológico da Petrobras — da arquitetura e modelagem técnica à implementação, testes e refinamento contínuo.",
            "exp.i2.role": "Monitor de Programação em Python",
            "exp.i2.period": "mar 2026 – atual · Rio de Janeiro",
            "exp.i2.desc": "Selecionado para apoiar a disciplina de Python: ajudo alunos com lógica de programação, depuração e resolução de problemas, em aula e em monitorias semanais de laboratório.",
            "exp.i3.role": "Estagiário de Desenvolvimento — Discovery",
            "exp.i3.period": "jun 2025 – mar 2026 · Rio de Janeiro",
            "exp.i3.desc": "Em três ciclos consecutivos ajudei a construir os MVPs com IA Bee, Prisma e Oráculo: entrevistas com usuários, requisitos, análise de viabilidade e apresentações em Pitch Days e Demo Days.",
            "exp.i4.role": "Bacharelado em Ciência da Computação",
            "exp.i4.period": "ago 2024 – jul 2028 (previsão)",
            "exp.i4.desc": "Aprovado em 1º lugar no vestibular do curso (3º no grupo de Exatas). Base sólida em algoritmos, estruturas de dados, banco de dados (SQL), Python, C e engenharia de software.",
            "exp.i5.role": "Bolsa Integral por Mérito",
            "exp.i5.period": "ago 2024",
            "exp.i5.desc": "Contemplado com bolsa integral concedida a jovens com alto potencial acadêmico e profissional — cobrindo toda a graduação em Ciência da Computação na PUC-Rio.",
            "exp.i6.role": "Certificado de Proficiência em Inglês",
            "exp.i6.period": "2017 – 2023",
            "exp.i6.desc": "Formação completa em inglês com certificação de proficiência e notas acima de 90 em todos os anos — consolidando a fluência que uso diariamente em contextos técnicos.",
            "exp.i7.role": "Ensino Médio",
            "exp.i7.period": "Concluído em 2023",
            "exp.i7.desc": "Concluído com média global acima de 80% e atuação como representante mediador eleito em 2022, fazendo a ponte entre alunos e coordenação.",
            "skills.kicker": "Caixa de ferramentas",
            "skills.title": "Competências & Tecnologias",
            "skills.cat1": "Linguagens",
            "skills.cat1desc": "As linguagens que uso para raciocinar e resolver problemas.",
            "skills.cat2": "Frontend",
            "skills.cat2desc": "Construção de interfaces responsivas, limpas e acessíveis.",
            "skills.cat3": "Backend",
            "skills.cat3desc": "APIs, regras de negócio e aplicações do lado do servidor.",
            "skills.cat4": "Banco de Dados",
            "skills.cat4desc": "Modelagem, armazenamento e consulta de dados — relacionais e vetoriais.",
            "skills.cat5": "DevOps",
            "skills.cat5desc": "Versionamento, colaboração e publicação na nuvem.",
            "skills.cat6": "Ferramentas",
            "skills.cat6desc": "Meu ambiente diário de código, design e organização.",
            "skills.langsTitle": "Idiomas",
            "skills.pt": "Português",
            "skills.en": "Inglês",
            "skills.es": "Espanhol",
            "skills.native": "Nativo",
            "skills.fluent": "Fluente",
            "skills.basic": "Básico",
            "contact.kicker": "Contato",
            "contact.title": "Vamos construir algo juntos?",
            "contact.sub": "Estou aberto a oportunidades de estágio, projetos e boas conversas sobre tecnologia — do Rio de Janeiro para qualquer lugar, remotamente.",
            "contact.cta": "Me mande um e-mail",
            "contact.email": "E-mail",
            "footer.made": "Projetado e construído por Pedro Loschi Giovannini — HTML, CSS e JS puros.",
            "footer.top": "Voltar ao topo",
        },
    };

    let currentLang = "en";

    const langButtons = Array.from(document.querySelectorAll(".lang-btn"));

    function applyLang(lang) {
        const dict = translations[lang] || translations.en;
        currentLang = lang;

        document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
        document.title = dict["meta.title"];

        // meta description acompanha o idioma
        const desc = dict["meta.desc"];
        if (desc) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute("content", desc);
            const ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc) ogDesc.setAttribute("content", desc);
        }

        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            const value = dict[el.dataset.i18n];
            if (value) el.textContent = value;
        });

        // chaves com HTML embutido (ex.: destaques coloridos no hero)
        document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
            const value = dict[el.dataset.i18nHtml];
            if (value) el.innerHTML = value;
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
