/* =========================================================
   NOVÆ SYSTEMS — Voiture autonome 🏎️
   Une belle voiture qui roule toute seule sur la page.
   Quand la souris s'approche, elle accélère et s'enfuit :
   on la "guide" en la poussant avec le curseur.
   ========================================================= */
(function () {
  "use strict";
  const el = document.getElementById("roamcar");
  if (!el) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(max-width: 900px)").matches) return; // souris uniquement

  // Belle voiture top-down (nez vers la droite = 0 rad)
  el.innerHTML =
    '<svg viewBox="0 0 140 70" width="84" height="42">' +
    '<defs><linearGradient id="rc-b" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#5aa0ff"/><stop offset=".5" stop-color="#0453f1"/><stop offset="1" stop-color="#0a2a8c"/></linearGradient></defs>' +
    '<ellipse cx="70" cy="62" rx="54" ry="8" fill="rgba(0,0,0,.35)"/>' +
    '<rect x="30" y="5" width="24" height="13" rx="6" fill="#13151d"/>' +
    '<rect x="30" y="52" width="24" height="13" rx="6" fill="#13151d"/>' +
    '<rect x="92" y="6" width="21" height="12" rx="6" fill="#13151d"/>' +
    '<rect x="92" y="52" width="21" height="12" rx="6" fill="#13151d"/>' +
    '<path d="M16 35 C16 21 27 15 44 14 L92 13 C119 13 133 25 133 35 C133 45 119 57 92 57 L44 56 C27 55 16 49 16 35 Z" fill="url(#rc-b)" stroke="#a9d4ff" stroke-width="1" stroke-opacity=".45"/>' +
    '<rect x="22" y="33" width="100" height="4" rx="2" fill="#cfe6ff" opacity=".45"/>' +
    '<path d="M50 35 C50 26 56 23 66 23 L82 24 C90 25 94 30 94 35 C94 40 90 45 82 46 L66 47 C56 47 50 44 50 35 Z" fill="#0a1530" opacity=".92"/>' +
    '<rect x="56" y="29" width="32" height="12" rx="5" fill="#86c8ff" opacity=".9"/>' +
    '<circle cx="129" cy="28" r="3" fill="#fff7c2"/><circle cx="129" cy="42" r="3" fill="#fff7c2"/>' +
    '<circle cx="133" cy="28" r="8" fill="#fff7c2" opacity=".22"/><circle cx="133" cy="42" r="8" fill="#fff7c2" opacity=".22"/>' +
    '<rect x="17" y="26" width="4" height="7" rx="2" fill="#ff3b5c"/><rect x="17" y="38" width="4" height="7" rx="2" fill="#ff3b5c"/>' +
    "</svg>";

  let W = innerWidth, H = innerHeight;
  let x = W * 0.5, y = H * 0.72;
  let vx = 1.6, vy = 0, angle = 0;
  let wx = Math.random() * W, wy = Math.random() * H;
  let mouseX = -999, mouseY = -999, inside = false;
  let lastSkid = 0, retarget = 0;

  addEventListener("mousemove", (e) => { mouseX = e.clientX; mouseY = e.clientY; inside = true; });
  addEventListener("mouseout", (e) => { if (!e.relatedTarget) inside = false; });
  addEventListener("resize", () => { W = innerWidth; H = innerHeight; });

  const M = 90;            // marge bords
  const FLEE = 230;        // rayon de fuite
  function pickTarget() { wx = M + Math.random() * (W - 2 * M); wy = M + Math.random() * (H - 2 * M); }

  function spawnSkid(px, py, a) {
    const s = document.createElement("div");
    s.className = "skid";
    s.style.left = px + "px"; s.style.top = py + "px";
    s.style.transform = "translate(-50%,-50%) rotate(" + a + "rad)";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1300);
  }

  function frame(now) {
    let dx, dy, maxSpeed;

    const mdx = x - mouseX, mdy = y - mouseY;
    const md = Math.hypot(mdx, mdy);

    if (inside && md < FLEE) {
      // la souris s'approche → la voiture file dans la direction opposée
      dx = mdx / (md || 1); dy = mdy / (md || 1);
      maxSpeed = 8.5 * (1 - md / FLEE) + 3;     // plus la souris est proche, plus elle accélère
    } else {
      // balade tranquille vers une cible
      const tdx = wx - x, tdy = wy - y, td = Math.hypot(tdx, tdy) || 1;
      dx = tdx / td; dy = tdy / td;
      maxSpeed = 2.6;
      if (td < 70 || now - retarget > 4200) { pickTarget(); retarget = now; }
    }

    // évite les bords
    if (x < M) dx += 1.4; if (x > W - M) dx -= 1.4;
    if (y < M) dy += 1.4; if (y > H - M) dy -= 1.4;
    const dl = Math.hypot(dx, dy) || 1; dx /= dl; dy /= dl;

    // accélère vers la direction voulue (inertie)
    vx += (dx * maxSpeed - vx) * 0.07;
    vy += (dy * maxSpeed - vy) * 0.07;
    x += vx; y += vy;

    const speed = Math.hypot(vx, vy);
    // orientation lissée vers la direction du mouvement
    if (speed > 0.4) {
      let target = Math.atan2(vy, vx), diff = target - angle;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      angle += diff * 0.18;
    }

    el.style.transform = "translate(" + x + "px," + y + "px) translate(-50%,-50%) rotate(" + angle + "rad)";

    // traces de pneus quand ça file
    if (speed > 4 && now - lastSkid > 24) {
      lastSkid = now;
      const back = 28, perp = angle + Math.PI / 2, w = 11;
      const bx = x - Math.cos(angle) * back, by = y - Math.sin(angle) * back;
      spawnSkid(bx + Math.cos(perp) * w, by + Math.sin(perp) * w, angle);
      spawnSkid(bx - Math.cos(perp) * w, by - Math.sin(perp) * w, angle);
    }

    requestAnimationFrame(frame);
  }
  pickTarget();
  requestAnimationFrame(frame);
})();
