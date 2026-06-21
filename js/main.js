/* =========================================================
   NOVÆ SYSTEMS — Interactions & UI
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Preloader (robuste : ne reste jamais bloqué) ---------- */
  const preloader = document.getElementById("preloader");
  const bar = preloader && preloader.querySelector(".preloader__bar span");
  const pct = document.getElementById("preloaderPct");
  let p = 0, hidden = false;
  function hidePreloader() {
    if (hidden) return;
    hidden = true;
    if (preloader) preloader.classList.add("is-done");
    document.body.classList.add("loaded");
    initReveal();
  }
  const fill = setInterval(() => {
    p = Math.min(100, p + Math.random() * 18);
    if (bar) bar.style.width = p + "%";
    if (pct) pct.textContent = Math.floor(p) + "%";
    if (p >= 100) { clearInterval(fill); setTimeout(hidePreloader, 350); }
  }, 130);
  // Filets de sécurité (mobile / connexion lente / erreur JS) :
  addEventListener("load", () => setTimeout(hidePreloader, 500));
  setTimeout(hidePreloader, 4000);
  // Le contenu se révèle tout de suite, indépendamment du préchargeur :
  if (document.readyState !== "loading") initReveal();
  else addEventListener("DOMContentLoaded", initReveal);

  /* ---------- i18n ---------- */
  const langSwitch = document.getElementById("langSwitch");
  function setLang(lang) {
    const dict = (typeof I18N !== "undefined" && I18N[lang]) || {};
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!dict[key]) return;
      if (el.tagName === "META") el.setAttribute("content", dict[key]);
      else el.textContent = dict[key];
    });
    langSwitch && langSwitch.querySelectorAll(".lang-switch__opt").forEach((o) => {
      o.classList.toggle("is-active", o.dataset.lang === lang);
    });
    try { localStorage.setItem("novae-lang", lang); } catch (e) {}
  }
  let savedLang = "fr";
  try { savedLang = localStorage.getItem("novae-lang") || "fr"; } catch (e) {}
  setLang(savedLang);
  langSwitch && langSwitch.addEventListener("click", () => {
    setLang(document.documentElement.lang === "fr" ? "en" : "fr");
  });

  /* ---------- Custom cursor ---------- */
  const cursor = document.getElementById("cursor");
  const dot = document.getElementById("cursorDot");
  if (cursor && dot && matchMedia("(min-width:901px)").matches) {
    let cx = 0, cy = 0, x = 0, y = 0;
    addEventListener("mousemove", (e) => {
      x = e.clientX; y = e.clientY;
      dot.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
    });
    (function loop() {
      cx += (x - cx) * 0.18; cy += (y - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll("a,button,.card,.project,[data-tilt]").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
    });
  }

  /* ---------- Nav scroll state + burger ---------- */
  const nav = document.getElementById("nav");
  addEventListener("scroll", () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  }, { passive: true });

  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");
  burger && burger.addEventListener("click", () => {
    burger.classList.toggle("is-open");
    navLinks.classList.toggle("is-open");
  });
  navLinks && navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      burger.classList.remove("is-open");
      navLinks.classList.remove("is-open");
    })
  );

  /* ---------- Reveal on scroll ---------- */
  let countersDone = false, revealReady = false;
  function initReveal() {
    if (revealReady) return; // idempotent
    revealReady = true;
    // Filet : si IntersectionObserver indisponible, on affiche tout
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
      document.querySelectorAll(".kinetic").forEach((el) => el.classList.add("in"));
      runCounters();
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el, i) => {
      el.style.transitionDelay = (i % 6) * 0.06 + "s";
      io.observe(el);
    });

    // Titres "kinetic" : visibles tout de suite s'ils sont déjà à l'écran,
    // sinon révélés au scroll. + filet de sécurité (jamais bloqués).
    const kio = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); kio.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".kinetic").forEach((el) => {
      if (el.getBoundingClientRect().top < (innerHeight * 0.95)) el.classList.add("in");
      else kio.observe(el);
    });
    setTimeout(() => document.querySelectorAll(".kinetic:not(.in)").forEach((el) => el.classList.add("in")), 2500);

    // counters
    const heroStats = document.querySelector(".hero__stats");
    if (heroStats) {
      const cio = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting && !countersDone) {
            countersDone = true;
            runCounters();
            cio.disconnect();
          }
        });
      }, { threshold: 0.5 });
      cio.observe(heroStats);
    }
  }

  function runCounters() {
    document.querySelectorAll("[data-count]").forEach((el) => {
      const target = +el.getAttribute("data-count");
      const suffix = el.getAttribute("data-suffix") || "";
      let n = 0;
      const step = Math.max(1, Math.floor(target / 50));
      const iv = setInterval(() => {
        n += step;
        if (n >= target) { n = target; clearInterval(iv); }
        el.textContent = n + suffix;
      }, 28);
    });
  }

  /* ---------- Hero badge — mots rotatifs ---------- */
  const heroRot = document.getElementById("heroRot");
  if (heroRot) {
    const words = {
      fr: ["Applications mobiles", "Plateformes SaaS", "IA & Automatisation", "Logiciels sur mesure", "Cloud & DevOps"],
      en: ["Mobile apps", "SaaS platforms", "AI & Automation", "Custom software", "Cloud & DevOps"],
    };
    const lang0 = document.documentElement.lang === "en" ? "en" : "fr";
    heroRot.textContent = words[lang0][0];
    let wi = 0;
    setInterval(() => {
      const lang = document.documentElement.lang === "en" ? "en" : "fr";
      const list = words[lang];
      wi = (wi + 1) % list.length;
      heroRot.classList.add("is-out");
      setTimeout(() => { heroRot.textContent = list[wi]; heroRot.classList.remove("is-out"); }, 300);
    }, 2300);
  }

  /* ---------- Card glow follow ---------- */
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });

  /* ---------- Tilt effect ---------- */
  document.querySelectorAll("[data-tilt]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
      el.style.transform = `translateY(-6px) perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });

  /* ---------- Phone screenshot rotators (Planevia, RaphyCar...) ---------- */
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".phone[data-shots]").forEach((phone, idx) => {
      const shot = phone.querySelector("img");
      const shots = (phone.getAttribute("data-shots") || "").split(",").filter(Boolean);
      if (!shot || shots.length < 2) return;
      shots.forEach((s) => { const im = new Image(); im.src = s; }); // preload
      let i = 0;
      // offset start so the two phones don't switch in sync
      setTimeout(() => {
        setInterval(() => {
          i = (i + 1) % shots.length;
          shot.style.animation = "none";
          void shot.offsetWidth; // reflow to restart animation
          shot.style.animation = "";
          shot.src = shots[i];
        }, 2800);
      }, idx * 1400);
    });
  }

  /* ---------- API Planevia ----------
     Devis      → POST /api/quotes   (consultable dans Planevia → /platform/quotes)
     Newsletter → POST /api/contact  (boîte de réception Messages)
     Repli automatique sur l'app mail si l'API est injoignable. */
  const PLANEVIA_QUOTES = "https://api.planevia.ca/api/quotes";
  const PLANEVIA_CONTACT = "https://api.planevia.ca/api/contact";

  function setStatus(el, state, msg) {
    if (!el) return;
    el.className = "contact__status is-" + state;
    el.textContent = msg;
  }
  async function postJSON(url, payload) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.success === false) throw new Error(json.message || "error");
    return json;
  }

  /* Modal de confirmation */
  const modal = document.getElementById("successModal");
  function openModal() { if (modal) { modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false"); } }
  function closeModal() { if (modal) { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); } }
  if (modal) {
    modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeModal));
    addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
  }

  /* Formulaire de devis → /api/quotes */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactStatus");
  form && form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const en = document.documentElement.lang === "en";
    const data = new FormData(form);
    const full = (data.get("name") || "").toString().trim();
    const parts = full.split(/\s+/);
    const firstName = parts.shift() || full || "Client";
    const lastName = parts.join(" ") || "—";
    const type = (data.get("type") || "").toString();
    const budget = (data.get("budget") || "").toString();
    let message = (data.get("message") || "").toString().trim();
    const meta = [];
    if (type) meta.push("Type: " + type);
    if (budget) meta.push("Budget: " + budget);
    meta.push("via novae-systems.ca");
    message += (message ? "\n\n" : "") + "[" + meta.join(" · ") + "]";
    const payload = {
      firstName, lastName,
      email: (data.get("email") || "").toString().trim(),
      phone: (data.get("phone") || "").toString().trim() || null,
      companyName: (data.get("company") || "").toString().trim() || null,
      businessType: type || null,
      message,
    };
    setStatus(status, "loading", en ? "Sending…" : "Envoi en cours…");
    try {
      await postJSON(PLANEVIA_QUOTES, payload);
      form.reset();
      setStatus(status, "ok", "");
      openModal();
    } catch (err) {
      const subject = encodeURIComponent("Demande de devis — " + full);
      const body = encodeURIComponent(message + "\n\n— " + full + " (" + payload.email + (payload.phone ? ", " + payload.phone : "") + ")");
      setStatus(status, "err", en ? "Network issue — opening your mail app…" : "Souci réseau — ouverture de votre app mail…");
      window.location.href = `mailto:contact@novae-systems.ca?subject=${subject}&body=${body}`;
    }
  });

  /* Inscription newsletter → /api/contact */
  const news = document.getElementById("newsletterForm");
  const newsStatus = document.getElementById("newsletterStatus");
  news && news.addEventListener("submit", async (e) => {
    e.preventDefault();
    const en = document.documentElement.lang === "en";
    const email = (new FormData(news).get("email") || "").toString().trim();
    setStatus(newsStatus, "loading", en ? "Subscribing…" : "Inscription…");
    try {
      await postJSON(PLANEVIA_CONTACT, {
        name: "Abonne newsletter",
        email,
        message: "Souhaite s'inscrire a la newsletter via le site novae-systems.ca.",
        subject: "general",
        organizationName: "Newsletter via novae-systems.ca",
      });
      news.reset();
      setStatus(newsStatus, "ok", en ? "You're subscribed — thank you!" : "Inscription réussie — merci !");
    } catch (err) {
      setStatus(newsStatus, "err", en ? "Couldn't subscribe. Please try again later." : "Inscription impossible. Réessayez plus tard.");
    }
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq__item").forEach((item) => {
    const q = item.querySelector(".faq__q");
    const a = item.querySelector(".faq__a");
    if (!q || !a) return;
    q.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      a.style.maxHeight = open ? a.scrollHeight + "px" : "0";
    });
  });
})();
