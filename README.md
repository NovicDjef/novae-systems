# NOVÆ SYSTEMS — Site vitrine

Site web futuriste pour une entreprise de développement logiciel basée au Canada 🇨🇦.
Animations 3D temps réel (Three.js), interface bilingue **FR / EN**, design « film de science-fiction ».

> ⚠️ **NOVÆ Systems** est un nom temporaire — remplace-le par le nom de ton entreprise (voir ci-dessous).

## ✨ Fonctionnalités

- 🌌 Arrière-plan 3D animé (réseau de particules + cœur icosaédrique) avec parallaxe à la souris
- 🌍 Bilingue Français / Anglais (commutateur en haut à droite, mémorisé)
- 🎬 Préchargeur animé, curseur personnalisé, révélations au défilement, compteurs animés
- 💎 Glassmorphisme, néons, dégradés cyan/violet/magenta
- 📱 100 % responsive
- ⚡ Site statique pur (HTML/CSS/JS) — aucune compilation requise

## 🚀 Lancer en local

Ouvre simplement `index.html` dans un navigateur, ou sers le dossier :

```bash
# Python
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## 🗂️ Structure

```
novae-systems/
├── index.html        # Structure de la page
├── css/style.css     # Design & animations
├── js/
│   ├── i18n.js       # Traductions FR / EN
│   ├── scene.js      # Scène 3D Three.js
│   └── main.js       # Interactions (préchargeur, curseur, reveal…)
└── assets/           # Images / logos
```

## 🛠️ Personnaliser

| Élément | Où |
|---|---|
| Nom de l'entreprise | `index.html` (logo, footer) + `js/i18n.js` |
| Textes FR / EN | `js/i18n.js` |
| Projets du portfolio | section `#solutions` dans `index.html` + `js/i18n.js` |
| Couleurs | variables `:root` dans `css/style.css` |
| Email de contact | `js/main.js` (`mailto:`) + `index.html` |

## ☁️ Déploiement

Compatible avec **GitHub Pages**, **Netlify**, **Vercel** ou **Cloudflare Pages** (glisser-déposer du dossier).

Pour GitHub Pages : Settings → Pages → Branch `main` / dossier `/root`.

---
© 2026 — Développé pour NovicDjef.
