/* ============================================
   TIMELINE: a linha central se preenche
   conforme o scroll e "acende" os nós
   (logos) por onde já passou.
   ============================================ */
(function () {
    "use strict";

    const timeline = document.getElementById("timeline");
    if (!timeline) return;

    const progress = timeline.querySelector(".timeline-progress");
    const items = Array.from(timeline.querySelectorAll(".timeline-item"));
    if (!progress) return;

    let ticking = false;

    function update() {
        const rect = timeline.getBoundingClientRect();

        // ponto de referência: 65% da altura da tela — a linha
        // se preenche até onde a leitura "chegou"
        const anchor = window.innerHeight * 0.65;
        const filled = Math.max(0, Math.min(anchor - rect.top, rect.height));

        progress.style.height = filled + "px";

        // acende os nós que a linha já alcançou
        items.forEach(function (item) {
            item.classList.toggle("passed", item.offsetTop + 24 <= filled);
        });
    }

    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
            update();
            ticking = false;
        });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
})();
