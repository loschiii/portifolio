/* ============================================================
   INTRO: simula um clique do mouse no botão da logo e então
   revela o site. Roda em todo carregamento; qualquer clique,
   tecla ou toque pula direto para o conteúdo.
   ============================================================ */
(function () {
    "use strict";

    var overlay = document.getElementById("intro-overlay");
    if (!overlay) return;

    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var done = false;

    var btn = document.getElementById("intro-btn");
    var cursor = document.getElementById("intro-cursor");
    var ripple = document.getElementById("intro-ripple");
    var skip = document.getElementById("intro-skip");

    function finish(instant) {
        if (done) return;
        done = true;
        document.removeEventListener("keydown", onSkip);
        document.removeEventListener("pointerdown", onSkip);
        document.documentElement.classList.remove("intro-lock");
        overlay.classList.add("intro-out");
        var delay = instant ? 0 : 550;
        setTimeout(function () {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            document.dispatchEvent(new CustomEvent("intro:done"));
        }, delay);
    }

    function onSkip(e) {
        if (e.type === "keydown" && e.key === "Tab") return;
        finish(false);
    }

    document.documentElement.classList.add("intro-lock");
    document.addEventListener("keydown", onSkip);
    document.addEventListener("pointerdown", onSkip, { passive: true });
    if (skip) skip.addEventListener("click", function (e) { e.stopPropagation(); finish(false); });

    if (reducedMotion) {
        setTimeout(function () { finish(false); }, 500);
        return;
    }

    function onArrive() {
        if (done) return;
        cursor.classList.add("is-pressing");
        btn.classList.add("is-pressed");
        ripple.classList.add("is-active");
        setTimeout(function () {
            btn.classList.remove("is-pressed");
            btn.classList.add("is-activated");
            setTimeout(function () { finish(false); }, 550);
        }, 180);
    }

    requestAnimationFrame(function () {
        var stageRect = overlay.getBoundingClientRect();
        var btnRect = btn.getBoundingClientRect();
        var startX = stageRect.width * 0.16;
        var startY = stageRect.height * 0.8;
        var endX = (btnRect.left - stageRect.left) + btnRect.width / 2;
        var endY = (btnRect.top - stageRect.top) + btnRect.height / 2;

        cursor.style.transform = "translate(" + startX + "px," + startY + "px)";
        cursor.classList.add("is-visible");

        setTimeout(function () {
            cursor.style.transition = "transform 0.85s cubic-bezier(0.65, 0, 0.35, 1)";
            cursor.style.transform = "translate(" + endX + "px," + endY + "px)";
            cursor.addEventListener("transitionend", onArrive, { once: true });
        }, 300);
    });

    // rede de segurança caso algum evento não dispare
    setTimeout(function () { if (!done) onArrive(); }, 1700);
    setTimeout(function () { if (!done) finish(false); }, 3400);
})();
