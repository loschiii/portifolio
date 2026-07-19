/* ============================================
   SKILLS: injeta os ícones oficiais nos chips
   e nos cabeçalhos das categorias.
   A chave vem de data-icon (estável), então a
   troca de idioma não afeta o ícone.
   ============================================ */
(function () {
    "use strict";

    const icons = window.TECH_ICONS || {};

    document.querySelectorAll(".skills [data-icon]").forEach(function (el) {
        const svg = icons[el.dataset.icon];
        if (svg) el.insertAdjacentHTML("afterbegin", svg);
    });
})();
