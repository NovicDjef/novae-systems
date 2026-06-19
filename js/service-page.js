/* =========================================================
   NOVÆ SYSTEMS — Rendu d'une page détail de service
   Lit ?s=<clé> + la langue, et injecte le contenu.
   ========================================================= */
(function () {
  "use strict";
  if (typeof SERVICES === "undefined") return;

  const params = new URLSearchParams(location.search);
  const key = params.get("s");
  const svc = SERVICES[key];
  const root = document.getElementById("svRoot");
  if (!root) return;

  // Service inconnu → retour à l'accueil
  if (!svc) { location.replace("../index.html#services"); return; }

  // Accent dynamique selon le service
  document.documentElement.style.setProperty("--accent", svc.accent);
  document.documentElement.style.setProperty("--accent-soft", svc.accentSoft);

  function getLang() {
    let l = document.documentElement.lang || "fr";
    try { l = localStorage.getItem("novae-lang") || l; } catch (e) {}
    return SERVICES[key][l] ? l : "fr";
  }

  function li(items) {
    return items.map((p) => `<li>${p}</li>`).join("");
  }

  function render() {
    const lang = getLang();
    const d = svc[lang];
    const s = SCRUM[lang];
    const ui = lang === "en"
      ? { eyebrow: "Service", cta: "Start a project", back: "← All services", ready: "Ready to get started?", readySub: "Tell us about your need — we reply within 24 hours.", stack: "Tools & technologies" }
      : { eyebrow: "Service", cta: "Démarrer un projet", back: "← Tous les services", ready: "Prêt à vous lancer ?", readySub: "Parlez-nous de votre besoin — on répond sous 24 h.", stack: "Outils & technologies" };

    document.title = `${d.name} — NOVÆ Systems`;
    document.documentElement.lang = lang;

    root.innerHTML = `
      <section class="sv-hero">
        <div class="sv-hero__ico">${svc.icon}</div>
        <span class="sv-eyebrow">// ${ui.eyebrow}</span>
        <h1 class="sv-title">${d.name}</h1>
        <p class="sv-tagline">${d.tagline}</p>
        <p class="sv-intro">${d.intro}</p>
        <div class="sv-hero__actions">
          <a href="../index.html#contact" class="btn btn--primary">${ui.cta}</a>
          <a href="${d.example.href}" class="btn btn--ghost">${d.example.label}</a>
        </div>
      </section>

      <section class="sv-section">
        <div class="sv-split">
          <div class="sv-split__text">
            <span class="sv-tag">// ${lang === "en" ? "The challenge" : "Le défi"}</span>
            <h2 class="sv-h2">${d.problemTitle}</h2>
            <p class="sv-p">${d.problemText}</p>
          </div>
          <ul class="sv-checks">${li(d.problemPoints)}</ul>
        </div>
      </section>

      <section class="sv-section sv-section--alt">
        <div class="sv-head">
          <span class="sv-tag">${s.tag}</span>
          <h2 class="sv-h2">${s.title}</h2>
          <p class="sv-lead">${s.lead}</p>
        </div>
        <div class="sv-scrum">
          ${s.steps.map((st) => `<div class="sv-step"><span class="sv-step__n">${st.n}</span><h3>${st.t}</h3><p>${st.d}</p></div>`).join("")}
        </div>
      </section>

      <section class="sv-section">
        <div class="sv-split sv-split--rev">
          <div class="sv-split__text">
            <span class="sv-tag">// ${lang === "en" ? "In practice" : "En pratique"}</span>
            <h2 class="sv-h2">${d.toolingTitle}</h2>
            <p class="sv-p">${d.toolingText}</p>
          </div>
          <ul class="sv-checks">${li(d.toolingPoints)}</ul>
        </div>
      </section>

      <section class="sv-section">
        <div class="sv-head"><span class="sv-tag">// Stack</span><h2 class="sv-h2">${ui.stack}</h2></div>
        <div class="sv-stack">${d.stack.map((t) => `<span>${t}</span>`).join("")}</div>
      </section>

      <section class="sv-cta">
        <h2>${ui.ready}</h2>
        <p>${ui.readySub}</p>
        <a href="../index.html#contact" class="btn btn--primary">${ui.cta}</a>
      </section>
    `;

    const back = document.getElementById("svBack");
    if (back) back.textContent = ui.back;
  }

  render();

  // Re-render quand on change de langue (le bouton est géré par main.js)
  const langSwitch = document.getElementById("langSwitch");
  if (langSwitch) langSwitch.addEventListener("click", () => setTimeout(render, 0));
})();
