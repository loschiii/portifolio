/* ============================================
   ÍCONES POR data-icon: injeta os SVGs oficiais
   nos chips de skills, categorias e cartões de
   contato. A chave vem de data-icon (estável),
   então a troca de idioma não afeta o ícone.
   ============================================ */
(function () {
    "use strict";

    const icons = window.TECH_ICONS || {};

    document.querySelectorAll("[data-icon]").forEach(function (el) {
        const svg = icons[el.dataset.icon];
        if (svg) el.insertAdjacentHTML("afterbegin", svg);
    });
})();
