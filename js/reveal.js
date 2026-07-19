/* ============================================
   REVEAL: entrada dos elementos ao rolar
   + contadores animados dos números
   Qualquer elemento com a classe .reveal
   aparece suavemente ao entrar na tela.
   ============================================ */
(function () {
    "use strict";

    const items = document.querySelectorAll(".reveal");
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ---------- Contadores (ex.: 0 → 100%) ---------- */
    function animateCounters(root) {
        const numbers = root.querySelectorAll(".stat-number[data-count]");

        numbers.forEach(function (el) {
            if (el.dataset.done) return; // roda só uma vez
            el.dataset.done = "1";

            const target = parseInt(el.dataset.count, 10) || 0;

            if (reducedMotion) {
                el.textContent = String(target);
                return;
            }

            const duration = 1100;
            const start = performance.now();

            function step(now) {
                const progress = Math.min((now - start) / duration, 1);
                // desacelera no final (ease-out cúbico)
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = String(Math.round(eased * target));
                if (progress < 1) requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
        });
    }

    /* ---------- Observador de visibilidade ---------- */
    if (!("IntersectionObserver" in window)) {
        // navegador antigo: mostra tudo direto
        items.forEach(function (item) {
            item.classList.add("visible");
            animateCounters(item);
        });
        return;
    }

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    animateCounters(entry.target);
                    observer.unobserve(entry.target); // anima só na 1ª vez

                    // terminada a entrada, remove as classes de reveal para
                    // devolver ao elemento suas transições normais (ex.: o
                    // tilt dos cards ficava lento/atrasado por herdá-las)
                    setTimeout(function () {
                        entry.target.classList.remove("reveal", "visible");
                    }, 1300);
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach(function (item) {
        observer.observe(item);
    });
})();
