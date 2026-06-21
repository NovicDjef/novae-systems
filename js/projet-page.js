/* =========================================================
   NOVÆ SYSTEMS — Rendu d'une page détail de projet
   Lit ?p=<clé> + la langue et injecte le contenu structuré.
   ========================================================= */
(function () {
  "use strict";
  if (typeof PROJETS === "undefined") return;
  const key = new URLSearchParams(location.search).get("p");
  const pr = PROJETS[key];
  const root = document.getElementById("projetRoot");
  if (!root) return;
  if (!pr) { location.replace("../index.html#solutions"); return; }

  document.documentElement.style.setProperty("--accent", pr.accent);
  document.documentElement.style.setProperty("--accent-soft", pr.accentSoft);

  function getLang() {
    let l = document.documentElement.lang || "fr";
    try { l = localStorage.getItem("novae-lang") || l; } catch (e) {}
    return pr[l] ? l : "fr";
  }

  function render() {
    const lang = getLang();
    const d = pr[lang];
    const ui = lang === "en"
      ? { visit: "Visit the site", similar: "Similar project?", arch: "// Architecture", stack: "Tools & technologies", ready: "Want something similar?", readySub: "Tell us about your project — free quote within 24h.", cta: "Get a quote", back: "← All projects" }
      : { visit: "Visiter le site", similar: "Projet similaire ?", arch: "// Architecture", stack: "Outils & technologies", ready: "Vous voulez la même chose ?", readySub: "Parlez-nous de votre projet — devis gratuit sous 24 h.", cta: "Demander un devis", back: "← Tous les projets" };

    document.title = d.name + " — NOVÆ Systems";
    document.documentElement.lang = lang;

    root.innerHTML = `
      <section class="pd-hero">
        <div>
          <span class="pd-hero__chip"><b></b> ${d.chip}</span>
          <h1>${d.name}</h1>
          <p class="pd-hero__tagline">${d.tagline}</p>
          <p class="pd-hero__desc">${d.overview}</p>
          <div class="pd-hero__actions">
            <a href="${pr.url}" target="_blank" rel="noopener" class="btn btn--primary">${ui.visit} ↗</a>
            <a href="../index.html#contact" class="btn btn--ghost">${ui.similar}</a>
          </div>
        </div>
        <div class="pd-hero__visual"><img class="pd-shotimg" src="${pr.img}" alt="${d.name}" /></div>
      </section>

      <section class="pd-section">
        <div class="pd-section__head">
          <span class="pd-section__tag">// ${lang === "en" ? "The need" : "Le besoin"}</span>
          <h2 class="pd-section__title">${d.problemTitle}</h2>
          <p class="pd-section__lead">${d.problem}</p>
        </div>
        <ul class="pd-points">${d.points.map((p) => `<li>${p}</li>`).join("")}</ul>
      </section>

      <section class="pd-section">
        <div class="pd-section__head">
          <span class="pd-section__tag">${ui.arch}</span>
          <h2 class="pd-section__title">${d.compoTitle}</h2>
        </div>
        <div class="pd-feats">
          ${d.compo.map((c, i) => `<div class="pd-feat"><div class="pd-feat__ico"><span>${i + 1}</span></div><h3>${c.t}</h3><p>${c.d}</p></div>`).join("")}
        </div>
      </section>

      <section class="pd-section">
        <div class="pd-section__head"><span class="pd-section__tag">// Stack</span><h2 class="pd-section__title">${ui.stack}</h2></div>
        <div class="pd-tech">${pr.stack.map((t) => `<span>${t}</span>`).join("")}</div>
      </section>

      <section class="pd-cta">
        <h2>${ui.ready}</h2>
        <p>${ui.readySub}</p>
        <a href="../index.html#contact" class="btn btn--primary">${ui.cta}</a>
      </section>
    `;
    const back = document.getElementById("projetBack");
    if (back) back.textContent = ui.back;
  }

  render();
  const langSwitch = document.getElementById("langSwitch");
  if (langSwitch) langSwitch.addEventListener("click", () => setTimeout(render, 0));
})();
