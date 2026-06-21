/* =========================================================
   NOVÆ SYSTEMS — Bandeau cookies + Google Analytics (Loi 25)
   Les statistiques ne se chargent QU'APRÈS consentement.
   👉 Pour activer Analytics : mettre ton ID GA4 dans GA_ID
      (format "G-XXXXXXXXXX"). Laisser vide = aucune statistique.
   ========================================================= */
(function () {
  "use strict";
  const GA_ID = ""; // ← ton identifiant Google Analytics 4 ici

  const bar = document.getElementById("cookie");
  if (!bar) return;

  function loadGA() {
    if (!GA_ID) return;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });
  }

  let choice = null;
  try { choice = localStorage.getItem("novae-cookie"); } catch (e) {}

  if (choice === "accept") {
    loadGA();
  } else if (!choice) {
    setTimeout(() => { bar.classList.add("is-open"); bar.setAttribute("aria-hidden", "false"); }, 1400);
  }

  function decide(value) {
    try { localStorage.setItem("novae-cookie", value); } catch (e) {}
    bar.classList.remove("is-open");
    bar.setAttribute("aria-hidden", "true");
    if (value === "accept") loadGA();
  }
  const accept = document.getElementById("cookieAccept");
  const refuse = document.getElementById("cookieRefuse");
  if (accept) accept.addEventListener("click", () => decide("accept"));
  if (refuse) refuse.addEventListener("click", () => decide("refuse"));
})();
