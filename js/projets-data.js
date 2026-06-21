/* =========================================================
   NOVÆ SYSTEMS — Contenu des pages détail de projets
   Lu par projets/projet.html selon ?p=<clé> + la langue.
   Chaque projet : aperçu, besoin, points forts, composition
   (architecture) et stack — pour montrer "comment c'est construit".
   ========================================================= */
const PROJETS = {
  /* ---------------- Spa Renaissance ---------------- */
  spa: {
    accent: "#16c4b0", accentSoft: "rgba(47,224,194,.18)",
    img: "../assets/spa/reception.jpg", url: "https://dospa.sparenaissance.ca",
    stack: ["Web", "Node.js", "PostgreSQL", "Réservation en ligne", "SaaS"],
    fr: {
      chip: "Bien-être · Web", name: "Spa Renaissance", tagline: "Le bien-être, sans la paperasse.",
      overview: "Portail web de réservation et de gestion déployé pour le centre de bien-être Spa Renaissance (Sept-Îles), propulsé par notre plateforme Planevia.",
      problemTitle: "Le besoin", problem: "Gérer manuellement les rendez-vous, les clients et les paiements faisait perdre un temps précieux et générait des erreurs. Il fallait un outil centralisé, simple et accessible 24/7.",
      points: ["Réservation en ligne 24/7 pour les clients", "Gestion centralisée des rendez-vous et des dossiers", "Rappels automatiques (SMS/courriel)", "Suivi des revenus et de l'activité"],
      compoTitle: "Comment c'est construit", compo: [
        { t: "Interface", d: "Application web responsive, claire et rapide, utilisable sur ordinateur, tablette et mobile." },
        { t: "Back-end", d: "API Node.js sécurisée gérant la logique de réservation, les clients et les disponibilités." },
        { t: "Base de données", d: "PostgreSQL pour stocker rendez-vous, clients et historique de façon fiable." },
        { t: "Déploiement", d: "Hébergement cloud, sauvegardes et HTTPS pour une disponibilité continue." },
      ],
    },
    en: {
      chip: "Wellness · Web", name: "Spa Renaissance", tagline: "Wellness, without the paperwork.",
      overview: "Web booking and management portal deployed for the Spa Renaissance wellness center (Sept-Îles), powered by our Planevia platform.",
      problemTitle: "The need", problem: "Managing appointments, clients and payments manually wasted time and caused errors. They needed a centralized, simple tool available 24/7.",
      points: ["24/7 online booking for clients", "Centralized appointments and client records", "Automatic reminders (SMS/email)", "Revenue and activity tracking"],
      compoTitle: "How it's built", compo: [
        { t: "Interface", d: "Responsive web app — clean and fast, usable on desktop, tablet and mobile." },
        { t: "Back-end", d: "Secure Node.js API handling booking logic, clients and availability." },
        { t: "Database", d: "PostgreSQL to reliably store appointments, clients and history." },
        { t: "Deployment", d: "Cloud hosting, backups and HTTPS for continuous availability." },
      ],
    },
  },

  /* ---------------- JT Trade and Services ---------------- */
  jt: {
    accent: "#3b82f6", accentSoft: "rgba(59,130,246,.18)",
    img: "../assets/jt/hero.jpg", url: "https://jttradeservices.com",
    stack: ["Web", "Simulateur de devis", "Formulaire", "Multi-pays", "SEO"],
    fr: {
      chip: "Logistique · Web", name: "JT Trade and Services", tagline: "Le transport de colis, simplifié.",
      overview: "Site vitrine pour une entreprise d'import-export et de logistique internationale (Afrique ↔ Monde : Canada, Italie, Allemagne, Royaume-Uni…), avec simulateur de devis.",
      problemTitle: "Le besoin", problem: "L'entreprise avait besoin d'une présence en ligne crédible et internationale pour présenter ses services, rassurer les clients et générer des demandes de devis.",
      points: ["Présentation claire des services (fret, colis, porte-à-porte)", "Simulateur de devis interactif", "Couverture multi-pays mise en avant", "Optimisé pour la conversion et le référencement"],
      compoTitle: "Comment c'est construit", compo: [
        { t: "Interface", d: "Site web moderne, animé et responsive, avec une identité forte (rouge/bleu)." },
        { t: "Logique", d: "Simulateur de devis calculant une estimation selon le trajet et le type d'envoi." },
        { t: "Contact", d: "Formulaire de demande de devis relié à la boîte de réception de l'entreprise." },
        { t: "SEO & déploiement", d: "Structure optimisée pour Google et mise en ligne avec HTTPS." },
      ],
    },
    en: {
      chip: "Logistics · Web", name: "JT Trade and Services", tagline: "Parcel shipping, made simple.",
      overview: "Showcase website for an import-export and international logistics company (Africa ↔ World: Canada, Italy, Germany, UK…), with a quote simulator.",
      problemTitle: "The need", problem: "The company needed a credible, international online presence to present its services, reassure clients and generate quote requests.",
      points: ["Clear presentation of services (freight, parcels, door-to-door)", "Interactive quote simulator", "Multi-country coverage highlighted", "Optimized for conversion and SEO"],
      compoTitle: "How it's built", compo: [
        { t: "Interface", d: "Modern, animated, responsive website with a strong identity (red/blue)." },
        { t: "Logic", d: "Quote simulator estimating a price based on route and shipment type." },
        { t: "Contact", d: "Quote request form connected to the company's inbox." },
        { t: "SEO & deployment", d: "Google-optimized structure, shipped with HTTPS." },
      ],
    },
  },

  /* ---------------- novic.dev ---------------- */
  novic: {
    accent: "#8b5cf6", accentSoft: "rgba(139,92,246,.2)",
    img: "../assets/novic/hero.jpg", url: "https://novic.dev",
    stack: ["React", "Next.js", "Three.js", "TypeScript", "Animations"],
    fr: {
      chip: "Portfolio · Web", name: "novic.dev", tagline: "Le portfolio d'un développeur, en immersion.",
      overview: "Portfolio personnel immersif présentant les compétences, l'expertise et les réalisations de Novic Melataguia, avec une scène 3D et des animations soignées.",
      problemTitle: "L'objectif", problem: "Se démarquer en tant que développeur avec un site mémorable, technique et impressionnant, qui démontre le savoir-faire par l'exemple.",
      points: ["Scène 3D interactive (Three.js)", "Animations fluides et soignées", "Sections projets, à propos, articles, contact", "Bilingue et entièrement responsive"],
      compoTitle: "Comment c'est construit", compo: [
        { t: "Framework", d: "Application React / Next.js performante et optimisée pour le SEO." },
        { t: "3D & animations", d: "Three.js pour la scène 3D, animations au scroll et micro-interactions." },
        { t: "Architecture", d: "Code TypeScript structuré et composants réutilisables." },
        { t: "Déploiement", d: "Mise en ligne continue avec HTTPS et performances optimisées." },
      ],
    },
    en: {
      chip: "Portfolio · Web", name: "novic.dev", tagline: "A developer's portfolio, fully immersive.",
      overview: "Immersive personal portfolio showcasing the skills, expertise and work of Novic Melataguia, with a 3D scene and polished animations.",
      problemTitle: "The goal", problem: "Stand out as a developer with a memorable, technical and impressive site that proves craftsmanship by example.",
      points: ["Interactive 3D scene (Three.js)", "Smooth, polished animations", "Projects, about, articles, contact sections", "Bilingual and fully responsive"],
      compoTitle: "How it's built", compo: [
        { t: "Framework", d: "Fast, SEO-optimized React / Next.js application." },
        { t: "3D & animations", d: "Three.js for the 3D scene, scroll animations and micro-interactions." },
        { t: "Architecture", d: "Structured TypeScript code and reusable components." },
        { t: "Deployment", d: "Continuous delivery with HTTPS and optimized performance." },
      ],
    },
  },
};
