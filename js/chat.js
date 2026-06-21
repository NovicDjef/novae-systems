/* =========================================================
   NOVÆ SYSTEMS — Widget de chat connecté à Planevia
   API: https://api.planevia.ca/api/landing-chat
   - POST /start            { sessionId }
   - POST /message          { sessionId, content, sender, visitorName?, visitorEmail? }
   - GET  /messages/:id     → { messages, status }   (polling pour les réponses admin)
   ========================================================= */
(function () {
  "use strict";
  const API = "https://api.planevia.ca/api/landing-chat";

  const fab = document.getElementById("pvchatFab");
  const panel = document.getElementById("pvchat");
  const body = document.getElementById("pvchatBody");
  const form = document.getElementById("pvchatForm");
  const input = document.getElementById("pvchatInput");
  const idBox = document.getElementById("pvchatId");
  if (!fab || !panel || !form) return;

  // Session persistante
  function uuid() {
    try { return crypto.randomUUID(); } catch (e) {}
    return "nv-" + Math.abs(Date.now() ^ (performance.now() * 1000 | 0)).toString(36) + Math.abs(performance.now() * 7 | 0).toString(36);
  }
  let sessionId;
  try { sessionId = localStorage.getItem("novae-chat-session"); } catch (e) {}
  if (!sessionId) { sessionId = uuid(); try { localStorage.setItem("novae-chat-session", sessionId); } catch (e) {} }

  const shown = new Set();
  let started = false, polling = null, hasSent = false;

  function en() { return document.documentElement.lang === "en"; }

  function addBubble(text, who) {
    const el = document.createElement("div");
    el.className = "pvchat__msg pvchat__msg--" + (who === "visitor" ? "me" : "bot");
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }

  function renderServer(messages) {
    (messages || []).forEach((m) => {
      if (shown.has(m.id)) return;
      shown.add(m.id);
      // Les messages visiteur déjà affichés en optimiste : on ne ré-affiche que l'admin
      if (m.sender === "visitor") return;
      addBubble(m.content, "admin");
    });
  }

  async function api(path, opts) {
    const res = await fetch(API + path, Object.assign({
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    }, opts));
    if (!res.ok) throw new Error("http " + res.status);
    return res.json();
  }

  async function ensureStarted() {
    if (started) return;
    const data = await api("/start", { method: "POST", body: JSON.stringify({ sessionId }) });
    started = true;
    if (data && data.conversation && data.conversation.messages) {
      data.conversation.messages.forEach((m) => {
        if (shown.has(m.id)) return;
        shown.add(m.id);
        addBubble(m.content, m.sender === "visitor" ? "visitor" : "admin");
        if (m.sender === "visitor") hasSent = true;
      });
      if (hasSent && idBox) idBox.style.display = "none";
    }
  }

  async function poll() {
    try {
      const data = await api("/messages/" + encodeURIComponent(sessionId));
      renderServer(data.messages);
    } catch (e) { /* silencieux */ }
  }
  function startPolling() {
    if (polling) return;
    polling = setInterval(poll, 4000);
  }

  // Ouverture / fermeture
  let open = false;
  function toggle(force) {
    open = typeof force === "boolean" ? force : !open;
    panel.classList.toggle("is-open", open);
    fab.classList.toggle("is-open", open);
    panel.setAttribute("aria-hidden", String(!open));
    if (open) {
      setTimeout(() => input && input.focus(), 250);
      ensureStarted().then(startPolling).catch(() => {});
    }
  }
  fab.addEventListener("click", () => toggle());

  // Envoi d'un message
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const content = (input.value || "").trim();
    if (!content) return;
    const fd = new FormData(form);
    const visitorName = (fd.get("name") || "").toString().trim();
    const visitorEmail = (fd.get("email") || "").toString().trim();

    // Email obligatoire au 1er message (pour pouvoir relancer le client)
    const emailEl = idBox ? idBox.querySelector('input[name="email"]') : null;
    if (!hasSent && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(visitorEmail)) {
      if (emailEl) { emailEl.classList.add("pvchat__err"); emailEl.focus(); }
      addBubble(en()
        ? "Please enter your email so we can get back to you."
        : "Entrez votre courriel pour qu'on puisse vous répondre.", "admin");
      return;
    }
    if (emailEl) emailEl.classList.remove("pvchat__err");

    addBubble(content, "visitor");
    input.value = "";

    const payload = { sessionId, content, sender: "visitor" };
    if (!hasSent) {
      if (visitorName) payload.visitorName = visitorName;
      payload.visitorEmail = visitorEmail;
    }

    try {
      await ensureStarted();
      await api("/message", { method: "POST", body: JSON.stringify(payload) });
      if (!hasSent) {
        hasSent = true;
        if (idBox) idBox.style.display = "none";
        // petit accusé de réception
        setTimeout(() => addBubble(en()
          ? "Thanks! Our team will reply right here shortly."
          : "Merci ! Notre équipe vous répond ici dans un instant.", "admin"), 500);
      }
      startPolling();
    } catch (err) {
      addBubble(en()
        ? "Connection issue. Please email contact@novae-systems.ca."
        : "Connexion impossible pour le moment. Écrivez-nous à contact@novae-systems.ca.", "admin");
    }
  });
})();
