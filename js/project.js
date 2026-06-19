/* =========================================================
   NOVÆ SYSTEMS — Animation "réservation en direct"
   Moteur générique piloté par le balisage commun des démos
   ========================================================= */
(function () {
  "use strict";
  const demo = document.querySelector(".demo__phone");
  if (!demo) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // Mode accessible : on affiche directement l'écran de confirmation
    const done = demo.querySelector('[data-screen="done"]');
    demo.querySelectorAll(".demo-screen").forEach((s) => s.classList.remove("is-active"));
    done && done.classList.add("is-active");
    document.querySelectorAll(".demo__list li").forEach((li) => li.classList.add("is-on"));
    return;
  }

  const cursor = demo.querySelector(".demo__cursor");
  const screens = {
    list: demo.querySelector('[data-screen="list"]'),
    form: demo.querySelector('[data-screen="form"]'),
    done: demo.querySelector('[data-screen="done"]'),
  };
  const steps = Array.from(document.querySelectorAll(".demo__list li"));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function show(name) {
    Object.values(screens).forEach((s) => s && s.classList.remove("is-active"));
    screens[name] && screens[name].classList.add("is-active");
  }
  function activateStep(idx) {
    steps.forEach((li, i) => li.classList.toggle("is-on", i <= idx));
  }
  function moveCursorTo(el) {
    if (!el || !cursor) return;
    const p = demo.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const x = r.left - p.left + r.width / 2 - 13;
    const y = r.top - p.top + r.height / 2 - 13;
    cursor.style.setProperty("--cx", x + "px");
    cursor.style.setProperty("--cy", y + "px");
    cursor.style.transform = `translate(${x}px,${y}px)`;
  }
  async function tap(el) {
    if (!el) return;
    cursor.classList.add("is-tap");
    // ripple
    const p = demo.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const rip = document.createElement("span");
    rip.className = "ripple";
    rip.style.left = r.left - p.left + r.width / 2 + "px";
    rip.style.top = r.top - p.top + r.height / 2 + "px";
    demo.appendChild(rip);
    requestAnimationFrame(() => rip.classList.add("go"));
    await sleep(360);
    cursor.classList.remove("is-tap");
    setTimeout(() => rip.remove(), 700);
  }
  async function type(el) {
    const txt = el.getAttribute("data-text") || "";
    el.textContent = "";
    el.classList.add("is-typing");
    for (let i = 0; i <= txt.length; i++) {
      el.textContent = txt.slice(0, i);
      await sleep(38);
    }
    el.classList.remove("is-typing");
  }

  async function loop() {
    while (true) {
      // 1) Liste / accueil
      show("list");
      activateStep(0);
      const reserveBtn = screens.list.querySelector('[data-tap="reserve"]');
      cursor.style.transform = "translate(130px,400px)";
      await sleep(1300);
      moveCursorTo(reserveBtn);
      await sleep(950);
      await tap(reserveBtn);
      await sleep(250);

      // 2) Formulaire — remplissage en direct
      show("form");
      activateStep(1);
      await sleep(500);
      const fields = screens.form.querySelectorAll(".type");
      for (const f of fields) { await type(f); await sleep(160); }
      await sleep(300);
      const confirmBtn = screens.form.querySelector('[data-tap="confirm"]');
      moveCursorTo(confirmBtn);
      await sleep(900);
      await tap(confirmBtn);
      await sleep(250);

      // 3) Confirmation
      show("done");
      activateStep(2);
      cursor.style.transform = "translate(220px,520px)";
      await sleep(3200);
    }
  }

  // démarre quand la démo entre dans le viewport
  let started = false;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !started) { started = true; loop(); io.disconnect(); }
    });
  }, { threshold: 0.3 });
  io.observe(demo);
})();
