/* ============================================
   TEMA: escuro (padrão) ⇄ claro
   O atributo data-theme no <html> controla as
   variáveis de cor do CSS; o canvas do hero lê
   o mesmo atributo para ajustar os pontos.
   ============================================ */
(function () {
    "use strict";

    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    const labels = {
        en: { toLight: "Switch to light mode", toDark: "Switch to dark mode" },
        pt: { toLight: "Mudar para modo claro", toDark: "Mudar para modo escuro" },
    };

    function currentLang() {
        return document.documentElement.lang.indexOf("pt") === 0 ? "pt" : "en";
    }

    function currentTheme() {
        return document.documentElement.getAttribute("data-theme") === "light"
            ? "light"
            : "dark";
    }

    function updateLabel() {
        const l = labels[currentLang()];
        toggle.setAttribute(
            "aria-label",
            currentTheme() === "dark" ? l.toLight : l.toDark
        );
    }

    toggle.addEventListener("click", function () {
        const next = currentTheme() === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);

        try {
            localStorage.setItem("theme", next);
        } catch (e) { /* modo privado etc. */ }

        updateLabel();
    });

    // mantém o rótulo certo quando o idioma muda
    document.addEventListener("langchange", updateLabel);
    updateLabel();
})();
