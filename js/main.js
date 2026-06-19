/* =========================================================
   NOVÆ SYSTEMS — Interactions & UI
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById("preloader");
  const bar = preloader && preloader.querySelector(".preloader__bar span");
  const pct = document.getElementById("preloaderPct");
  let p = 0;
  const fill = setInterval(() => {
    p = Math.min(100, p + Math.random() * 18);
    if (bar) bar.style.width = p + "%";
    if (pct) pct.textContent = Math.floor(p) + "%";
    if (p >= 100) {
      clearInterval(fill);
      setTimeout(() => {
        preloader.classList.add("is-done");
        document.body.classList.add("loaded");
        initReveal();
      }, 350);
    }
  }, 130);

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
  let countersDone = false;
  function initReveal() {
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

  /* ---------- Contact form ---------- */
  const form = document.getElementById("contactForm");
  form && form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent("Nouveau projet — " + (data.get("name") || ""));
    const body = encodeURIComponent(
      (data.get("message") || "") + "\n\n— " + (data.get("name") || "") + " (" + (data.get("email") || "") + ")"
    );
    window.location.href = `mailto:novicmelataguia@gmail.com?subject=${subject}&body=${body}`;
  });
})();
