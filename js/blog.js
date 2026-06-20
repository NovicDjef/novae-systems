/* =========================================================
   NOVÆ SYSTEMS — Rendu du blog
   #blogHome  → 3 derniers articles (accueil)
   #blogList  → tous les articles (blog/index.html)
   #blogArticle → un article (blog/article.html?id=...)
   ========================================================= */
(function () {
  "use strict";
  if (typeof BLOG === "undefined") return;

  const inBlogDir = location.pathname.includes("/blog/");
  const articleHref = (id) => (inBlogDir ? "" : "blog/") + "article.html?id=" + id;

  function getLang() {
    let l = document.documentElement.lang || "fr";
    try { l = localStorage.getItem("novae-lang") || l; } catch (e) {}
    return l === "en" ? "en" : "fr";
  }
  function fmtDate(iso, lang) {
    const [y, m, d] = iso.split("-").map(Number);
    const months = lang === "en"
      ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      : ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
    return `${d} ${months[m - 1]} ${y}`;
  }
  function card(a, lang) {
    const t = a[lang];
    return `<a class="bcard" href="${articleHref(a.id)}" style="--accent:${a.accent}">
      <div class="bcard__top"><span class="bcard__tag">${t.tag}</span><span class="bcard__date">${fmtDate(a.date, lang)} · ${t.read}</span></div>
      <h3 class="bcard__title">${t.title}</h3>
      <p class="bcard__excerpt">${t.excerpt}</p>
      <span class="bcard__more">${lang === "en" ? "Read →" : "Lire →"}</span>
    </a>`;
  }

  function renderHome() {
    const el = document.getElementById("blogHome");
    if (!el) return;
    const lang = getLang();
    el.innerHTML = BLOG.slice(0, 3).map((a) => card(a, lang)).join("");
  }
  function renderList() {
    const el = document.getElementById("blogList");
    if (!el) return;
    const lang = getLang();
    el.innerHTML = BLOG.map((a) => card(a, lang)).join("");
  }
  function renderArticle() {
    const el = document.getElementById("blogArticle");
    if (!el) return;
    const lang = getLang();
    const id = new URLSearchParams(location.search).get("id");
    const a = BLOG.find((x) => x.id === id);
    if (!a) { location.replace("index.html"); return; }
    const t = a[lang];
    document.documentElement.style.setProperty("--accent", a.accent);
    document.documentElement.style.setProperty("--accent-soft", a.accent + "30");
    document.title = `${t.title} — NOVÆ Systems`;
    el.innerHTML = `
      <article class="bpost">
        <span class="bpost__tag">${t.tag}</span>
        <h1 class="bpost__title">${t.title}</h1>
        <p class="bpost__meta">${fmtDate(a.date, lang)} · ${t.read} · NOVÆ Systems</p>
        <div class="bpost__body">${t.body}</div>
        <div class="bpost__cta">
          <a href="../index.html#contact" class="btn btn--primary">${lang === "en" ? "Start a project" : "Démarrer un projet"}</a>
          <a href="index.html" class="btn btn--ghost">${lang === "en" ? "← All articles" : "← Tous les articles"}</a>
        </div>
      </article>`;
  }

  function renderAll() { renderHome(); renderList(); renderArticle(); }
  renderAll();

  const langSwitch = document.getElementById("langSwitch");
  if (langSwitch) langSwitch.addEventListener("click", () => setTimeout(renderAll, 0));
})();
