/* ============================================
   PROJETOS: tilt 3D dos cards + brilho que
   segue o cursor + modal com galeria de fotos
   ============================================ */
(function () {
    "use strict";

    const PROJECTS = {
        oraculo: {
            name: "Oráculo",
            tech: ["Django", "Python", "OpenAI API", "SQLite", "pypdf", "scikit-learn", "HTML", "REST API", "JSON Rules", "PDF"],
            images: ["img/oraculo1.jpeg", "img/oraculo2.jpeg"],
        },
        prisma: {
            name: "Prisma",
            tech: ["SPFx", "TypeScript", "React", "Node.js", "Python", "Flask", "OpenAI API", "python-pptx", "Text-to-Speech", "REST API", "SharePoint", "SCSS"],
            images: ["img/prisma1.jpeg", "img/prisma2.jpeg", "img/prisma3.jpeg", "img/prisma4.jpeg"],
        },
        bee: {
            name: "Bee",
            tech: ["Django", "Python", "JavaScript", "Bootstrap", "HTML", "PostgreSQL", "SQLite", "Vector DB", "CNPq", "Lattes"],
            images: ["img/bee1.jpeg", "img/bee2.jpeg", "img/bee3.jpeg", "img/bee4.jpeg", "img/bee5.jpeg", "img/bee6.jpeg"],
        },
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    function t(key) {
        return window.appI18n ? window.appI18n.t(key) : "";
    }

    // ícone oficial (SVG embutido em icons.js) + rótulo
    function techChipHTML(label) {
        const icons = window.TECH_ICONS || {};
        return (icons[label] || "") + "<span>" + label + "</span>";
    }

    // aplica os ícones nos chips estáticos dos cards
    document.querySelectorAll(".project-card .project-tech li").forEach(function (li) {
        li.innerHTML = techChipHTML(li.textContent.trim());
    });

    /* ---------- Cards: tilt 3D + posição do brilho ---------- */
    const cards = Array.from(document.querySelectorAll(".project-card"));

    cards.forEach(function (card) {
        card.addEventListener("mousemove", function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // brilho segue o cursor (via variáveis CSS)
            card.style.setProperty("--mx", x + "px");
            card.style.setProperty("--my", y + "px");

            // inclinação 3D só com mouse de verdade e sem movimento reduzido
            if (finePointer && !reducedMotion) {
                const rotX = (y / rect.height - 0.5) * -8; // até ±4°
                const rotY = (x / rect.width - 0.5) * 8;
                card.style.transform =
                    "perspective(900px) rotateX(" + rotX.toFixed(2) +
                    "deg) rotateY(" + rotY.toFixed(2) + "deg) translateY(-4px)";
            }
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "";
        });
    });

    /* ---------- Modal de galeria ---------- */
    const modal = document.getElementById("project-modal");
    if (!modal) return;

    const panel = modal.querySelector(".project-modal-panel");
    const titleEl = modal.querySelector(".modal-title");
    const taglineEl = modal.querySelector(".modal-tagline");
    const descEl = modal.querySelector(".modal-desc");
    const techEl = modal.querySelector(".modal-tech");
    const imageEl = modal.querySelector(".modal-image");
    const dotsEl = modal.querySelector(".modal-dots");
    const prevBtn = modal.querySelector(".modal-prev");
    const nextBtn = modal.querySelector(".modal-next");

    let current = null;   // projeto aberto
    let index = 0;        // foto atual
    let lastFocus = null; // devolve o foco ao fechar

    function show(i) {
        const total = current.images.length;
        index = (i + total) % total; // navegação circular

        imageEl.src = current.images[index];
        imageEl.alt = current.name + " — " + (index + 1) + "/" + total;

        Array.from(dotsEl.children).forEach(function (dot, d) {
            dot.classList.toggle("active", d === index);
        });
    }

    function openModal(id) {
        current = PROJECTS[id];
        if (!current) return;

        lastFocus = document.activeElement;

        titleEl.textContent = current.name;

        // data-i18n dinâmico: se o idioma mudar com o modal aberto,
        // o i18n.js atualiza estes textos sozinho
        taglineEl.dataset.i18n = "projects." + id + ".tagline";
        descEl.dataset.i18n = "projects." + id + ".desc";
        taglineEl.textContent = t("projects." + id + ".tagline");
        descEl.textContent = t("projects." + id + ".desc");

        techEl.innerHTML = "";
        current.tech.forEach(function (tech) {
            const li = document.createElement("li");
            li.innerHTML = techChipHTML(tech);
            techEl.appendChild(li);
        });

        dotsEl.innerHTML = "";
        current.images.forEach(function (_, i) {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "modal-dot";
            dot.setAttribute("aria-label", (i + 1) + "/" + current.images.length);
            dot.addEventListener("click", function () { show(i); });
            dotsEl.appendChild(dot);
        });

        // setas desnecessárias com foto única
        const single = current.images.length < 2;
        prevBtn.hidden = single;
        nextBtn.hidden = single;
        dotsEl.hidden = single;

        show(0);

        modal.hidden = false;
        requestAnimationFrame(function () {
            modal.classList.add("open");
        });
        document.body.classList.add("no-scroll");
        modal.querySelector(".modal-close").focus();
    }

    function closeModal() {
        modal.classList.remove("open");
        document.body.classList.remove("no-scroll");
        setTimeout(function () {
            modal.hidden = true;
            imageEl.src = "";
        }, 300); // espera a transição de saída
        if (lastFocus) lastFocus.focus();
    }

    // abrir: clique ou Enter no card
    cards.forEach(function (card) {
        card.addEventListener("click", function () {
            openModal(card.dataset.project);
        });
        card.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModal(card.dataset.project);
            }
        });
    });

    // fechar: X ou clique no fundo escuro
    modal.querySelectorAll("[data-close]").forEach(function (el) {
        el.addEventListener("click", closeModal);
    });

    prevBtn.addEventListener("click", function () { show(index - 1); });
    nextBtn.addEventListener("click", function () { show(index + 1); });

    // teclado: Esc fecha, setas navegam
    document.addEventListener("keydown", function (e) {
        if (modal.hidden) return;
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowLeft") show(index - 1);
        if (e.key === "ArrowRight") show(index + 1);
    });
})();
