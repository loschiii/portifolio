/* ============================================================
   HERO — Fundo interativo: grade de pontos com física de mola
   ------------------------------------------------------------
   Cada ponto tem uma posição de origem na grade. O cursor
   (ou o toque, no celular) repele os pontos próximos; uma
   mola os traz de volta, criando um efeito elástico. Pontos
   perto do cursor ganham brilho e cor. Sem interação, uma
   onda suave mantém o fundo vivo.
   ============================================================ */

(() => {
    const canvas = document.getElementById("hero-canvas");
    const ctx = canvas.getContext("2d");
    const hero = document.getElementById("hero");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // ---------- Configuração ----------
    const CONFIG = {
        gap: 34,             // espaçamento base entre pontos (px)
        baseRadius: 1.4,     // raio do ponto em repouso
        maxRadius: 3.6,      // raio máximo perto do cursor
        influence: 160,      // raio de ação do cursor (px)
        repelForce: 1400,    // força de repulsão do cursor
        spring: 0.06,        // força da mola de volta à origem
        damping: 0.86,       // atrito (0–1, menor = para mais rápido)
        waveAmp: 3.2,        // amplitude da onda ambiente (px)
        waveSpeed: 0.0011,   // velocidade da onda
        hueStart: 222,       // azul  (início do gradiente de cor)
        hueEnd: 285,         // roxo  (fim do gradiente de cor)
    };

    let dots = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Cursor: começa fora da tela para não ativar nada
    const pointer = { x: -9999, y: -9999, active: false };

    // ---------- Montagem da grade ----------
    function buildGrid() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = hero.clientWidth;
        height = hero.clientHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Em telas pequenas, aumenta o espaçamento para
        // manter a densidade (e a performance) equilibrada
        const gap = width < 600 ? CONFIG.gap * 1.25 : CONFIG.gap;

        dots = [];
        // Margem extra para a grade cobrir as bordas
        for (let y = -gap; y < height + gap; y += gap) {
            for (let x = -gap; x < width + gap; x += gap) {
                dots.push({
                    ox: x,      // origem
                    oy: y,
                    x: x,       // posição atual
                    y: y,
                    vx: 0,      // velocidade
                    vy: 0,
                });
            }
        }
    }

    // ---------- Loop de animação ----------
    function tick(time) {
        ctx.clearRect(0, 0, width, height);

        const {
            influence, repelForce, spring, damping,
            waveAmp, waveSpeed, baseRadius, maxRadius,
            hueStart, hueEnd,
        } = CONFIG;

        // No tema claro os pontos precisam ESCURECER (não clarear)
        // para continuarem visíveis sobre o fundo claro
        const isLight =
            document.documentElement.getAttribute("data-theme") === "light";

        for (const dot of dots) {
            // Onda ambiente: desloca a origem suavemente
            const wave = reducedMotion
                ? 0
                : Math.sin(time * waveSpeed + dot.ox * 0.02 + dot.oy * 0.015) * waveAmp;

            const targetX = dot.ox;
            const targetY = dot.oy + wave;

            // Repulsão do cursor
            const dx = dot.x - pointer.x;
            const dy = dot.y - pointer.y;
            const distSq = dx * dx + dy * dy;
            const influenceSq = influence * influence;

            let proximity = 0; // 0 = longe do cursor, 1 = em cima

            if (pointer.active && distSq < influenceSq && distSq > 0.01) {
                const dist = Math.sqrt(distSq);
                proximity = 1 - dist / influence;
                const push = (repelForce * proximity) / (dist * 60);
                dot.vx += (dx / dist) * push;
                dot.vy += (dy / dist) * push;
            }

            // Mola de volta à origem + atrito
            dot.vx += (targetX - dot.x) * spring;
            dot.vy += (targetY - dot.y) * spring;
            dot.vx *= damping;
            dot.vy *= damping;
            dot.x += dot.vx;
            dot.y += dot.vy;

            // O quanto o ponto está "agitado" (deslocado da origem)
            const offX = dot.x - targetX;
            const offY = dot.y - targetY;
            const agitation = Math.min(
                Math.sqrt(offX * offX + offY * offY) / 40,
                1
            );

            // Intensidade = perto do cursor OU ainda balançando
            const energy = Math.max(proximity, agitation);

            // Cor: azul → roxo conforme a posição horizontal,
            // mais intensidade conforme a energia
            const hue = hueStart + (dot.ox / width) * (hueEnd - hueStart);
            const lightness = isLight
                ? 62 - energy * 27    // claro: 62% → 35% (escurece)
                : 30 + energy * 45;   // escuro: 30% → 75% (clareia)
            const alpha = isLight
                ? 0.35 + energy * 0.65
                : 0.25 + energy * 0.75;
            const radius = baseRadius + energy * (maxRadius - baseRadius);

            ctx.beginPath();
            ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${hue}, 85%, ${lightness}%, ${alpha})`;
            ctx.fill();

            // Halo de brilho apenas nos pontos energizados
            // (economiza performance nos pontos em repouso)
            if (energy > 0.35) {
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, radius * 3, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${hue}, 90%, ${isLight ? 45 : 65}%, ${energy * (isLight ? 0.15 : 0.12)})`;
                ctx.fill();
            }
        }

        requestAnimationFrame(tick);
    }

    // ---------- Interação: mouse e toque ----------
    function setPointer(clientX, clientY) {
        const rect = hero.getBoundingClientRect();
        pointer.x = clientX - rect.left;
        pointer.y = clientY - rect.top;
        pointer.active = true;
    }

    function clearPointer() {
        pointer.active = false;
        pointer.x = -9999;
        pointer.y = -9999;
    }

    hero.addEventListener("mousemove", (e) => setPointer(e.clientX, e.clientY));
    hero.addEventListener("mouseleave", clearPointer);

    hero.addEventListener(
        "touchmove",
        (e) => {
            const t = e.touches[0];
            if (t) setPointer(t.clientX, t.clientY);
        },
        { passive: true }
    );
    hero.addEventListener("touchstart", (e) => {
        const t = e.touches[0];
        if (t) setPointer(t.clientX, t.clientY);
    }, { passive: true });
    hero.addEventListener("touchend", clearPointer);

    // ---------- Redimensionamento (com debounce) ----------
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(buildGrid, 150);
    });

    // ---------- Início ----------
    buildGrid();
    requestAnimationFrame(tick);
})();
