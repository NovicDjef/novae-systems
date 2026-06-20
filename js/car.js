/* =========================================================
   NOVÆ SYSTEMS — Mode conduite 🏎️
   Le curseur devient une voiture top-down qui suit la souris,
   s'oriente dans le sens du mouvement et laisse des traces de pneus.
   ========================================================= */
(function () {
  "use strict";
  const toggle = document.getElementById("driveToggle");
  if (!toggle) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(max-width: 900px)").matches) return; // souris uniquement

  // Voiture (SVG top-down, nez vers la droite = 0°)
  const car = document.createElement("div");
  car.className = "car";
  car.innerHTML =
    '<svg viewBox="0 0 120 60" width="64" height="32">' +
    '<defs><linearGradient id="cb" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#ff6a4d"/><stop offset="1" stop-color="#e01e3c"/></linearGradient></defs>' +
    '<ellipse cx="60" cy="52" rx="40" ry="7" fill="rgba(0,0,0,.35)"/>' +
    '<rect x="8" y="16" width="104" height="28" rx="14" fill="url(#cb)"/>' +
    '<rect x="4" y="14" width="14" height="8" rx="3" fill="#1b1f2a"/>' +
    '<rect x="4" y="38" width="14" height="8" rx="3" fill="#1b1f2a"/>' +
    '<rect x="100" y="14" width="14" height="8" rx="3" fill="#1b1f2a"/>' +
    '<rect x="100" y="38" width="14" height="8" rx="3" fill="#1b1f2a"/>' +
    '<path d="M40 20h34l8 10-8 10H40l-6-10z" fill="#0b1020" opacity=".85"/>' +
    '<rect x="44" y="24" width="30" height="12" rx="3" fill="#7fd6ff" opacity=".9"/>' +
    '<circle cx="110" cy="24" r="3" fill="#fff3b0"/><circle cx="110" cy="36" r="3" fill="#fff3b0"/>' +
    '<circle cx="111" cy="24" r="7" fill="#fff3b0" opacity=".25"/><circle cx="111" cy="36" r="7" fill="#fff3b0" opacity=".25"/>' +
    "</svg>";
  document.body.appendChild(car);

  let active = false;
  let mx = innerWidth / 2, my = innerHeight / 2;       // cible (souris)
  let cx = mx, cy = my;                                  // position voiture
  let angle = 0, raf = null, lastSkid = 0;

  function onMove(e) { mx = e.clientX; my = e.clientY; }

  function spawnSkid(x, y, a, strong) {
    const s = document.createElement("div");
    s.className = "skid";
    s.style.left = x + "px";
    s.style.top = y + "px";
    s.style.transform = "translate(-50%,-50%) rotate(" + a + "rad)";
    s.style.opacity = strong ? ".5" : ".28";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1400);
  }

  function loop() {
    // suivi avec inertie (effet de conduite)
    const dx = mx - cx, dy = my - cy;
    const dist = Math.hypot(dx, dy);
    cx += dx * 0.14;
    cy += dy * 0.14;

    // orientation = direction du déplacement (lissée), seulement si on bouge assez
    if (dist > 2) {
      let target = Math.atan2(dy, dx);
      let diff = target - angle;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      angle += diff * 0.2;
    }

    car.style.transform =
      "translate(" + cx + "px," + cy + "px) translate(-50%,-50%) rotate(" + angle + "rad)";

    // traces de pneus quand ça roule / braque fort
    const now = performance.now();
    if (dist > 14 && now - lastSkid > 26) {
      lastSkid = now;
      const back = 22; // décalage vers l'arrière de la voiture
      const bx = cx - Math.cos(angle) * back;
      const by = cy - Math.sin(angle) * back;
      const perp = angle + Math.PI / 2;
      const w = 9;
      spawnSkid(bx + Math.cos(perp) * w, by + Math.sin(perp) * w, angle, dist > 40);
      spawnSkid(bx - Math.cos(perp) * w, by - Math.sin(perp) * w, angle, dist > 40);
    }
    raf = requestAnimationFrame(loop);
  }

  function start() {
    active = true;
    document.body.classList.add("drive-mode");
    toggle.classList.add("is-on");
    cx = mx; cy = my;
    addEventListener("mousemove", onMove);
    if (!raf) loop();
  }
  function stop() {
    active = false;
    document.body.classList.remove("drive-mode");
    toggle.classList.remove("is-on");
    removeEventListener("mousemove", onMove);
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    document.querySelectorAll(".skid").forEach((s) => s.remove());
  }

  toggle.addEventListener("click", () => (active ? stop() : start()));
  // Échap pour sortir
  addEventListener("keydown", (e) => { if (e.key === "Escape" && active) stop(); });
})();
