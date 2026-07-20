/* ============================================================
   SKILLS — Esfera 3D de tecnologias
   ------------------------------------------------------------
   Os nomes das tecnologias são lidos dos chips da própria
   seção e distribuídos numa esfera (espiral de Fibonacci).
   A esfera gira sozinha, inclina-se e pode ser arrastada com
   inércia. Cada palavra é projetada em perspectiva: as da
   frente ficam maiores e mais vivas; as de trás, menores e
   apagadas. Canvas 2D puro — a projeção é matemática nossa,
   sem WebGL nem bibliotecas.
   ============================================================ */

(function () {
    "use strict";

    var canvas = document.getElementById("skills-sphere-canvas");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    var wrap = canvas.parentElement;

    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---------- Palavras: lidas dos chips da seção ----------
    var PALETTE_DARK = ["#7aa7ff", "#c98aff", "#5fe6cf"];
    var PALETTE_LIGHT = ["#2f62c9", "#8a35d6", "#0d8f7c"];

    var words = [];
    document.querySelectorAll(".skills-grid .skill-card").forEach(function (card, cardIndex) {
        card.querySelectorAll(".skill-chip span").forEach(function (span) {
            words.push({ text: span.textContent.trim(), color: cardIndex % 3 });
        });
    });
    if (!words.length) return;

    // ---------- Distribuição na esfera (espiral de Fibonacci) ----------
    var GOLDEN = Math.PI * (3 - Math.sqrt(5));
    words.forEach(function (w, i) {
        var y = 1 - (2 * (i + 0.5)) / words.length; // -1 … 1
        var r = Math.sqrt(1 - y * y);
        var theta = GOLDEN * i;
        w.x = Math.cos(theta) * r;
        w.y = y;
        w.z = Math.sin(theta) * r;
        w.sx = 0; w.sy = 0; w.size = 0; w.alpha = 0; w.depth = 0;
    });

    // ---------- Estado ----------
    var width = 0, height = 0, radius = 0, dpr = 1;
    var rotX = -0.28;              // leve inclinação inicial
    var rotY = 0;
    var velX = 0, velY = 0;        // inércia do arraste
    var AUTO_SPEED = 0.0035;       // rotação automática por frame
    var dragging = false;
    var lastPX = 0, lastPY = 0;
    var hover = { x: -9999, y: -9999, word: null };
    var running = true;            // pausa quando fora da tela

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        var size = Math.min(wrap.clientWidth, 520);
        width = size;
        height = size;
        radius = size * 0.36;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = size + "px";
        canvas.style.height = size + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // ---------- Desenho ----------
    function draw() {
        ctx.clearRect(0, 0, width, height);

        var isLight = document.documentElement.getAttribute("data-theme") === "light";
        var palette = isLight ? PALETTE_LIGHT : PALETTE_DARK;

        var cx = width / 2;
        var cy = height / 2;
        var fov = radius * 3.4;
        var baseFont = Math.max(width * 0.031, 11);

        var cosX = Math.cos(rotX), sinX = Math.sin(rotX);
        var cosY = Math.cos(rotY), sinY = Math.sin(rotY);

        // projeta todo mundo primeiro
        for (var i = 0; i < words.length; i++) {
            var w = words[i];
            // rotação Y (giro) e X (inclinação)
            var x = w.x * cosY - w.z * sinY;
            var z = w.x * sinY + w.z * cosY;
            var y = w.y * cosX - z * sinX;
            z = w.y * sinX + z * cosX;

            var persp = fov / (fov + z * radius);
            w.sx = cx + x * radius * persp;
            w.sy = cy + y * radius * persp;
            w.depth = (z + 1) / 2;                    // 0 = frente, 1 = fundo
            var t = 1 - w.depth;                      // 1 = frente
            w.size = baseFont * (0.62 + t * 0.65);
            w.alpha = isLight ? 0.28 + t * 0.72 : 0.16 + t * 0.84;
        }

        // hover: palavra mais próxima do cursor, priorizando as da frente
        hover.word = null;
        if (!dragging && hover.x > -999) {
            var best = null, bestDist = 32 * 32;
            for (var h = 0; h < words.length; h++) {
                var ww = words[h];
                if (ww.depth > 0.55) continue;        // só o hemisfério da frente
                var dx = ww.sx - hover.x;
                var dy = ww.sy - hover.y;
                var d = dx * dx + dy * dy;
                if (d < bestDist) { bestDist = d; best = ww; }
            }
            hover.word = best;
        }

        // desenha do fundo para a frente
        var order = words.slice().sort(function (a, b) { return b.depth - a.depth; });
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (var k = 0; k < order.length; k++) {
            var word = order[k];
            var isHover = word === hover.word;
            var size = isHover ? word.size * 1.25 : word.size;
            ctx.font = (isHover ? "700 " : "600 ") + size.toFixed(1) +
                'px Consolas, "SF Mono", "Fira Code", monospace';
            ctx.globalAlpha = isHover ? 1 : word.alpha;
            ctx.fillStyle = palette[word.color];
            if (isHover) {
                ctx.shadowColor = palette[word.color];
                ctx.shadowBlur = 16;
            }
            ctx.fillText(word.text, word.sx, word.sy);
            if (isHover) ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = 1;
    }

    function tick() {
        if (running) {
            if (!dragging) {
                if (!reducedMotion) rotY += AUTO_SPEED + velY;
                else rotY += velY;
                rotX += velX;
                velX *= 0.95;
                velY *= 0.95;
                // inclinação sempre volta devagar para a de repouso
                rotX += (-0.28 - rotX) * 0.02;
            }
            draw();
        }
        requestAnimationFrame(tick);
    }

    // ---------- Interação: arrastar para girar ----------
    canvas.addEventListener("pointerdown", function (e) {
        dragging = true;
        lastPX = e.clientX;
        lastPY = e.clientY;
        velX = 0; velY = 0;
        canvas.classList.add("is-dragging");
        canvas.setPointerCapture(e.pointerId);
    });

    canvas.addEventListener("pointermove", function (e) {
        var rect = canvas.getBoundingClientRect();
        hover.x = e.clientX - rect.left;
        hover.y = e.clientY - rect.top;

        if (!dragging) return;
        var dx = e.clientX - lastPX;
        var dy = e.clientY - lastPY;
        lastPX = e.clientX;
        lastPY = e.clientY;
        rotY += dx * 0.006;
        rotX -= dy * 0.006;
        rotX = Math.max(-1.1, Math.min(1.1, rotX));
        velY = dx * 0.0004;
        velX = -dy * 0.0004;
    });

    function endDrag() {
        dragging = false;
        canvas.classList.remove("is-dragging");
    }
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    canvas.addEventListener("pointerleave", function () {
        hover.x = -9999;
        hover.y = -9999;
        if (!dragging) hover.word = null;
    });

    // ---------- Pausa fora da tela (economia de CPU) ----------
    if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
            running = entries[0].isIntersecting;
        }, { threshold: 0.05 }).observe(canvas);
    }

    // ---------- Redimensionamento ----------
    var resizeTimer;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 150);
    });

    // ---------- Início ----------
    resize();
    requestAnimationFrame(tick);
})();
