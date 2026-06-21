/* =========================================================
   NOVÆ SYSTEMS — Effets premium (légers, scroll natif)
   1) Barre de progression  2) Boutons magnétiques
   3) Titres révélés au scroll
   (Le défilement reste natif — fluide via scroll-behavior CSS,
    sans surcharge.)
   ========================================================= */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktop = window.matchMedia("(min-width: 901px)").matches;

  /* 1) Barre de progression — throttlée via requestAnimationFrame */
  const prog = document.getElementById("scrollProgress");
  let ticking = false;
  function updateProg() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const r = max > 0 ? (doc.scrollTop || document.body.scrollTop) / max : 0;
    if (prog) prog.style.transform = "scaleX(" + r + ")";
    ticking = false;
  }
  addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(updateProg); }
  }, { passive: true });
  updateProg();

  /* 2) Boutons magnétiques (desktop uniquement) */
  if (!reduce && desktop) {
    document.querySelectorAll(".btn--primary, .btn--ghost, .nav__cta").forEach((b) => {
      b.addEventListener("mousemove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = "translate(" + (e.clientX - (r.left + r.width / 2)) * 0.2 + "px," + (e.clientY - (r.top + r.height / 2)) * 0.3 + "px)";
      });
      b.addEventListener("mouseleave", () => { b.style.transform = ""; });
    });
  }

  /* (Les titres "kinetic" sont révélés par main.js — révélation fiable + filet) */
})();
