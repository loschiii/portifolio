/* ============================================
   NAVEGAÇÃO: scroll, progresso, menu mobile
   e destaque da seção ativa
   ============================================ */
(function () {
    "use strict";

    const nav = document.getElementById("nav");
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("nav-menu");
    const progress = document.querySelector(".scroll-progress");
    const links = Array.from(document.querySelectorAll(".nav-link"));

    if (!nav || !toggle || !menu) return;

    /* ---------- Estado "scrolled" + barra de progresso ---------- */
    let ticking = false;

    function onScroll() {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(function () {
            nav.classList.toggle("scrolled", window.scrollY > 40);

            if (progress) {
                const doc = document.documentElement;
                const max = doc.scrollHeight - window.innerHeight;
                const ratio = max > 0 ? window.scrollY / max : 0;
                progress.style.transform = "scaleX(" + ratio + ")";
            }

            ticking = false;
        });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---------- Menu mobile ---------- */
    // rótulo acessível no idioma atual da página
    function t(en, pt) {
        return document.documentElement.lang.indexOf("pt") === 0 ? pt : en;
    }

    function openMenu() {
        menu.classList.add("open");
        toggle.classList.add("open");
        document.body.classList.add("menu-open");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", t("Close menu", "Fechar menu"));
    }

    function closeMenu() {
        menu.classList.remove("open");
        toggle.classList.remove("open");
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", t("Open menu", "Abrir menu"));
    }

    toggle.addEventListener("click", function () {
        if (menu.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // fecha ao clicar em um link (e deixa a âncora navegar normalmente)
    links.forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    // fecha com a tecla Esc
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && menu.classList.contains("open")) {
            closeMenu();
        }
    });

    /* ---------- Destaque do link da seção visível ---------- */
    function setActive(id) {
        links.forEach(function (link) {
            link.classList.toggle(
                "is-active",
                link.getAttribute("href") === "#" + id
            );
        });
    }

    // observa todas as seções com id — inclusive as que forem
    // adicionadas depois, basta serem <section id="...">
    const sections = document.querySelectorAll("section[id]");

    if ("IntersectionObserver" in window && sections.length > 0) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id);
                    }
                });
            },
            // seção "ativa" = a que cruza a faixa central da tela
            { rootMargin: "-40% 0px -55% 0px" }
        );

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }
})();
