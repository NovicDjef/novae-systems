/* =========================================================
   NOVÆ SYSTEMS — Contenu des pages détail de services
   Une page modèle (services/service.html) lit ces données
   selon le paramètre ?s=<clé> et la langue courante.
   ========================================================= */
const ICONS = {
  mobile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/></svg>',
  web: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20M6 6.5h.01M9 6.5h.01"/></svg>',
  ai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg>',
  custom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m8 6-6 6 6 6M16 6l6 6-6 6"/></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.34 11 4 4 0 0 0 7 19z"/></svg>',
  design: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 7 4v6c0 4-3 7-7 8-4-1-7-4-7-8V6z"/><path d="M9.5 12l1.8 1.8 3.7-3.8"/></svg>',
};

/* Approche Scrum/Agile — commune à tous les services (FR + EN) */
const SCRUM = {
  fr: {
    tag: "// Notre méthode",
    title: "Une approche Agile / Scrum",
    lead: "On avance par sprints courts, avec une démo et vos retours à chaque étape. Vous gardez le contrôle, vous voyez le produit grandir.",
    steps: [
      { n: "01", t: "Cadrage & Product Backlog", d: "On traduit vos besoins en user stories priorisées. Objectifs, périmètre et critères de réussite clairs dès le départ." },
      { n: "02", t: "Sprints de 1 à 2 semaines", d: "Chaque sprint livre un incrément fonctionnel, testé. Daily stand-ups et un Product Owner dédié côté projet." },
      { n: "03", t: "Démo & Sprint Review", d: "À la fin de chaque sprint, on vous montre ce qui marche. Vos retours réorientent immédiatement la suite." },
      { n: "04", t: "Rétrospective & amélioration", d: "On ajuste le rythme et la qualité en continu. Transparence totale via un board partagé (Jira / Notion)." },
    ],
  },
  en: {
    tag: "// Our method",
    title: "An Agile / Scrum approach",
    lead: "We move in short sprints, with a demo and your feedback at every step. You stay in control and watch the product grow.",
    steps: [
      { n: "01", t: "Framing & Product Backlog", d: "We turn your needs into prioritized user stories. Clear goals, scope and success criteria from day one." },
      { n: "02", t: "1–2 week sprints", d: "Each sprint ships a tested, working increment. Daily stand-ups and a dedicated Product Owner on the project." },
      { n: "03", t: "Demo & Sprint Review", d: "At the end of each sprint, we show you what works. Your feedback immediately steers what comes next." },
      { n: "04", t: "Retrospective & improvement", d: "We continuously tune pace and quality. Full transparency through a shared board (Jira / Notion)." },
    ],
  },
};

const SERVICES = {
  /* ---------------- Applications mobiles ---------------- */
  mobile: {
    icon: ICONS.mobile, accent: "#0453f1", accentSoft: "rgba(4,83,241,.18)",
    fr: {
      name: "Applications mobiles",
      tagline: "Des apps iOS & Android que vos utilisateurs adorent ouvrir.",
      intro: "Nous concevons des applications mobiles natives et cross-platform — fluides, rapides et élégantes — disponibles sur l'App Store et Google Play. De l'app grand public au outil métier sur le terrain.",
      problemTitle: "La problématique que ça résout",
      problemText: "Vos clients vivent sur leur téléphone. Sans app performante, vous perdez en engagement, en fidélité et en réactivité. Les solutions génériques sont lentes, pas adaptées à votre marque et impossibles à faire évoluer.",
      problemPoints: [
        "Atteindre vos utilisateurs là où ils sont, avec des notifications et un usage hors-ligne",
        "Offrir une expérience fluide qui fidélise plutôt qu'un site mobile frustrant",
        "Digitaliser vos opérations terrain (réservations, suivi, pointage)",
      ],
      toolingTitle: "Comment on l'utilise chez nos clients",
      toolingText: "On part de l'usage réel, pas de la techno. Prototype testé tôt, builds beta livrés à chaque sprint (TestFlight / Google Play interne), publication accompagnée sur les stores.",
      toolingPoints: [
        "Prototype interactif validé avant d'écrire la moindre ligne de production",
        "Builds beta à chaque sprint pour tester sur de vrais téléphones",
        "Mise en ligne App Store & Google Play, puis suivi et mises à jour",
      ],
      stack: ["React Native", "Expo", "Flutter", "Swift", "Kotlin", "CI/CD"],
      example: { label: "Exemple concret : Planevia & RaphyCar", href: "../projets/planevia.html" },
    },
    en: {
      name: "Mobile apps",
      tagline: "iOS & Android apps your users love opening.",
      intro: "We build native and cross-platform mobile apps — smooth, fast and elegant — shipped to the App Store and Google Play. From consumer apps to field business tools.",
      problemTitle: "The problem it solves",
      problemText: "Your customers live on their phones. Without a high-performance app, you lose engagement, loyalty and responsiveness. Generic solutions are slow, off-brand and impossible to evolve.",
      problemPoints: [
        "Reach users where they are, with notifications and offline use",
        "Deliver a smooth experience that retains, not a frustrating mobile site",
        "Digitize field operations (bookings, tracking, clock-in)",
      ],
      toolingTitle: "How we use it with our clients",
      toolingText: "We start from real usage, not from tech. Prototype tested early, beta builds delivered each sprint (TestFlight / internal Google Play), guided store publishing.",
      toolingPoints: [
        "Interactive prototype validated before writing a line of production code",
        "Beta builds every sprint to test on real devices",
        "App Store & Google Play release, then monitoring and updates",
      ],
      stack: ["React Native", "Expo", "Flutter", "Swift", "Kotlin", "CI/CD"],
      example: { label: "Real example: Planevia & RaphyCar", href: "../projets/planevia.html" },
    },
  },

  /* ---------------- Plateformes web & SaaS ---------------- */
  web: {
    icon: ICONS.web, accent: "#7dd3ff", accentSoft: "rgba(125,211,255,.18)",
    fr: {
      name: "Plateformes web & SaaS",
      tagline: "Des applications web robustes, sécurisées et prêtes à grandir.",
      intro: "Du tableau de bord au produit SaaS complet : nous construisons des plateformes web scalables, multi-utilisateurs, avec authentification, paiements et tout ce qu'il faut pour vendre votre logiciel en ligne.",
      problemTitle: "La problématique que ça résout",
      problemText: "Faire évoluer une activité avec des outils éparpillés (tableurs, no-code limité) finit par coûter cher : lenteurs, erreurs, données non sécurisées. Un vrai produit SaaS centralise, automatise et devient une source de revenus récurrents.",
      problemPoints: [
        "Centraliser vos données et vos processus dans un seul outil fiable",
        "Gérer des milliers d'utilisateurs sans que tout ralentisse",
        "Facturer en abonnement et suivre vos revenus en temps réel",
      ],
      toolingTitle: "Comment on l'utilise chez nos clients",
      toolingText: "Architecture pensée pour la montée en charge dès le départ, livraisons continues, environnements de test séparés. Vous validez chaque module en conditions réelles avant la mise en production.",
      toolingPoints: [
        "Environnements séparés (test / production) pour valider sans risque",
        "Intégrations paiement (Stripe, Mobile Money) et facturation automatisée",
        "Tableaux de bord et analytics pour piloter votre activité",
      ],
      stack: ["Next.js", "React", "Node.js", "PostgreSQL", "Prisma", "Stripe"],
      example: { label: "Exemple concret : Planevia & RaphyCar", href: "../projets/raphycar.html" },
    },
    en: {
      name: "Web & SaaS platforms",
      tagline: "Robust, secure web apps ready to scale.",
      intro: "From dashboard to full SaaS product: we build scalable, multi-user web platforms with authentication, payments and everything needed to sell your software online.",
      problemTitle: "The problem it solves",
      problemText: "Scaling a business on scattered tools (spreadsheets, limited no-code) gets expensive: slowdowns, errors, unsecured data. A real SaaS product centralizes, automates and becomes recurring revenue.",
      problemPoints: [
        "Centralize your data and processes in one reliable tool",
        "Handle thousands of users without everything slowing down",
        "Bill via subscription and track revenue in real time",
      ],
      toolingTitle: "How we use it with our clients",
      toolingText: "Architecture designed for scale from the start, continuous delivery, separate test environments. You validate each module in real conditions before production.",
      toolingPoints: [
        "Separate environments (test / production) to validate risk-free",
        "Payment integrations (Stripe, Mobile Money) and automated billing",
        "Dashboards and analytics to steer your business",
      ],
      stack: ["Next.js", "React", "Node.js", "PostgreSQL", "Prisma", "Stripe"],
      example: { label: "Real example: Planevia & RaphyCar", href: "../projets/raphycar.html" },
    },
  },

  /* ---------------- Intelligence artificielle ---------------- */
  ai: {
    icon: ICONS.ai, accent: "#a855f7", accentSoft: "rgba(168,85,247,.2)",
    fr: {
      name: "Intelligence artificielle",
      tagline: "Automatisez, analysez et augmentez vos équipes avec l'IA.",
      intro: "Intégration de modèles d'IA, agents conversationnels et automatisation intelligente connectés à vos données. On transforme l'IA en valeur concrète : moins de tâches répétitives, plus de décisions éclairées.",
      problemTitle: "La problématique que ça résout",
      problemText: "Vos équipes passent un temps fou sur des tâches répétitives (saisie, tri, support, rédaction). L'information utile est noyée dans vos données. L'IA bien intégrée libère ce temps et révèle ce qui compte.",
      problemPoints: [
        "Automatiser le support, la saisie et la rédaction de documents",
        "Exploiter vos données pour des réponses fiables (RAG sur vos contenus)",
        "Augmenter vos employés au lieu de les remplacer",
      ],
      toolingTitle: "Comment on l'utilise chez nos clients",
      toolingText: "On cible d'abord un cas d'usage à fort impact, on le prouve avec un pilote mesurable, puis on l'industrialise. L'IA est branchée à vos vrais outils et vos vraies données, avec garde-fous.",
      toolingPoints: [
        "Pilote rapide sur un cas d'usage mesurable (ex. notes cliniques par IA)",
        "RAG : l'IA répond à partir de VOS documents, pas d'inventions",
        "Garde-fous, confidentialité et contrôle humain intégrés",
      ],
      stack: ["LLM", "RAG", "Python", "API", "Embeddings", "Automatisation"],
      example: { label: "Exemple concret : notes vocales IA de Planevia", href: "../projets/planevia.html" },
    },
    en: {
      name: "Artificial intelligence",
      tagline: "Automate, analyze and augment your teams with AI.",
      intro: "AI model integration, conversational agents and smart automation connected to your data. We turn AI into concrete value: fewer repetitive tasks, better-informed decisions.",
      problemTitle: "The problem it solves",
      problemText: "Your teams spend huge time on repetitive tasks (data entry, sorting, support, writing). Useful information is buried in your data. Well-integrated AI frees that time and surfaces what matters.",
      problemPoints: [
        "Automate support, data entry and document writing",
        "Leverage your data for reliable answers (RAG on your content)",
        "Augment your employees instead of replacing them",
      ],
      toolingTitle: "How we use it with our clients",
      toolingText: "We first target a high-impact use case, prove it with a measurable pilot, then industrialize. AI is plugged into your real tools and real data, with guardrails.",
      toolingPoints: [
        "Fast pilot on a measurable use case (e.g. AI clinical notes)",
        "RAG: AI answers from YOUR documents, no hallucinations",
        "Guardrails, privacy and human oversight built in",
      ],
      stack: ["LLM", "RAG", "Python", "API", "Embeddings", "Automation"],
      example: { label: "Real example: Planevia's AI voice notes", href: "../projets/planevia.html" },
    },
  },

  /* ---------------- Logiciels sur mesure ---------------- */
  custom: {
    icon: ICONS.custom, accent: "#ff2bd6", accentSoft: "rgba(255,43,214,.18)",
    fr: {
      name: "Logiciels sur mesure",
      tagline: "Un outil taillé exactement pour votre façon de travailler.",
      intro: "Outils internes, systèmes métier, automatisations : on conçoit des logiciels précisément autour de vos processus, là où aucune solution du marché ne colle vraiment à votre réalité.",
      problemTitle: "La problématique que ça résout",
      problemText: "Vous tordez vos processus pour entrer dans un logiciel générique, ou vous jonglez entre dix outils qui ne se parlent pas. Résultat : du temps perdu, des doubles saisies et des erreurs. Le sur-mesure épouse VOTRE métier.",
      problemPoints: [
        "Arrêter d'adapter votre métier à un logiciel inadapté",
        "Connecter vos outils existants au lieu de ressaisir partout",
        "Automatiser les tâches répétitives propres à votre activité",
      ],
      toolingTitle: "Comment on l'utilise chez nos clients",
      toolingText: "On observe votre quotidien, on cartographie vos processus, puis on livre par modules. Chaque module remplace une douleur concrète, validé par vos équipes avant le suivant.",
      toolingPoints: [
        "Immersion dans votre quotidien pour comprendre les vrais besoins",
        "Livraison par modules : chaque sprint résout une douleur précise",
        "Formation de vos équipes et reprise de vos données existantes",
      ],
      stack: ["Web", "API", "PostgreSQL", "Node.js", "Intégrations", "Automatisation"],
      example: { label: "Parlons de votre cas →", href: "../index.html#contact" },
    },
    en: {
      name: "Custom software",
      tagline: "A tool built exactly for the way you work.",
      intro: "Internal tools, business systems, automations: we design software precisely around your processes, where no off-the-shelf solution truly fits your reality.",
      problemTitle: "The problem it solves",
      problemText: "You bend your processes to fit a generic tool, or juggle ten apps that don't talk to each other. The result: wasted time, double entry and errors. Custom software fits YOUR business.",
      problemPoints: [
        "Stop adapting your business to an ill-fitting tool",
        "Connect your existing tools instead of re-entering everywhere",
        "Automate the repetitive tasks specific to your activity",
      ],
      toolingTitle: "How we use it with our clients",
      toolingText: "We observe your day-to-day, map your processes, then deliver by modules. Each module replaces a concrete pain, validated by your teams before the next.",
      toolingPoints: [
        "Immersion in your daily work to understand real needs",
        "Module-by-module delivery: each sprint solves a precise pain",
        "Team training and migration of your existing data",
      ],
      stack: ["Web", "API", "PostgreSQL", "Node.js", "Integrations", "Automation"],
      example: { label: "Let's talk about your case →", href: "../index.html#contact" },
    },
  },

  /* ---------------- Cloud & DevOps ---------------- */
  cloud: {
    icon: ICONS.cloud, accent: "#22e0c2", accentSoft: "rgba(34,224,194,.18)",
    fr: {
      name: "Cloud & DevOps",
      tagline: "Déployez vite, dormez tranquille.",
      intro: "Architecture cloud, intégration et déploiement continus (CI/CD), supervision : on met en place une infrastructure fiable et automatisée pour que vos mises en ligne soient rapides et sans stress.",
      problemTitle: "La problématique que ça résout",
      problemText: "Des déploiements manuels et risqués, des pannes difficiles à diagnostiquer, des coûts cloud qui dérapent : sans DevOps, chaque mise en production est un pari. On rend tout prévisible et automatique.",
      problemPoints: [
        "Éliminer les déploiements manuels source d'erreurs",
        "Tenir la charge aux pics d'activité sans tomber",
        "Détecter et corriger les incidents avant vos utilisateurs",
      ],
      toolingTitle: "Comment on l'utilise chez nos clients",
      toolingText: "Pipeline automatisé du code à la production, infrastructure décrite en code (reproductible), supervision et alertes. Chaque livraison est testée puis déployée d'un clic — ou automatiquement.",
      toolingPoints: [
        "CI/CD : chaque changement testé puis déployé automatiquement",
        "Infrastructure as Code, sauvegardes et restauration éprouvées",
        "Monitoring, alertes et optimisation des coûts cloud",
      ],
      stack: ["AWS", "Docker", "CI/CD", "GitHub Actions", "Monitoring", "IaC"],
      example: { label: "Discutons de votre infra →", href: "../index.html#contact" },
    },
    en: {
      name: "Cloud & DevOps",
      tagline: "Ship fast, sleep well.",
      intro: "Cloud architecture, continuous integration and delivery (CI/CD), monitoring: we set up reliable, automated infrastructure so your releases are fast and stress-free.",
      problemTitle: "The problem it solves",
      problemText: "Manual, risky deployments, hard-to-diagnose outages, runaway cloud costs: without DevOps, every release is a gamble. We make everything predictable and automatic.",
      problemPoints: [
        "Eliminate error-prone manual deployments",
        "Handle traffic spikes without falling over",
        "Detect and fix incidents before your users do",
      ],
      toolingTitle: "How we use it with our clients",
      toolingText: "Automated pipeline from code to production, infrastructure as code (reproducible), monitoring and alerts. Every release is tested then deployed in one click — or automatically.",
      toolingPoints: [
        "CI/CD: every change tested then deployed automatically",
        "Infrastructure as Code, proven backups and restore",
        "Monitoring, alerts and cloud cost optimization",
      ],
      stack: ["AWS", "Docker", "CI/CD", "GitHub Actions", "Monitoring", "IaC"],
      example: { label: "Let's discuss your infra →", href: "../index.html#contact" },
    },
  },

  /* ---------------- UX / UI Design ---------------- */
  design: {
    icon: ICONS.design, accent: "#ffb347", accentSoft: "rgba(255,179,71,.18)",
    fr: {
      name: "UX / UI Design",
      tagline: "Des interfaces qui transforment vos visiteurs en clients.",
      intro: "Recherche utilisateur, parcours, maquettes et design system : on crée des interfaces immersives et intuitives qui donnent envie, guident l'action et renforcent votre marque.",
      problemTitle: "La problématique que ça résout",
      problemText: "Un beau produit qu'on ne comprend pas ne se vend pas. Une interface confuse fait fuir, augmente le support et tue la conversion. Un bon design rend l'évident… évident, et inspire confiance.",
      problemPoints: [
        "Réduire l'abandon et augmenter la conversion",
        "Diminuer les demandes de support grâce à des parcours clairs",
        "Renforcer la confiance et l'image de marque",
      ],
      toolingTitle: "Comment on l'utilise chez nos clients",
      toolingText: "On teste des maquettes interactives avec de vrais utilisateurs avant le développement. Un design system garantit la cohérence et accélère toutes les évolutions futures.",
      toolingPoints: [
        "Prototypes Figma testés tôt, avant de coder",
        "Design system réutilisable pour une cohérence totale",
        "Accessibilité et performance intégrées dès la conception",
      ],
      stack: ["Figma", "Design system", "Prototypage", "UX research", "Accessibilité", "Motion"],
      example: { label: "Voyez nos interfaces : Planevia & RaphyCar", href: "../projets/planevia.html" },
    },
    en: {
      name: "UX / UI Design",
      tagline: "Interfaces that turn visitors into customers.",
      intro: "User research, flows, mockups and design system: we craft immersive, intuitive interfaces that delight, guide action and strengthen your brand.",
      problemTitle: "The problem it solves",
      problemText: "A beautiful product no one understands doesn't sell. A confusing interface drives people away, increases support and kills conversion. Good design makes the obvious… obvious, and builds trust.",
      problemPoints: [
        "Reduce drop-off and increase conversion",
        "Lower support requests with clear flows",
        "Strengthen trust and brand image",
      ],
      toolingTitle: "How we use it with our clients",
      toolingText: "We test interactive mockups with real users before development. A design system guarantees consistency and speeds up all future evolutions.",
      toolingPoints: [
        "Figma prototypes tested early, before coding",
        "Reusable design system for full consistency",
        "Accessibility and performance built in from the start",
      ],
      stack: ["Figma", "Design system", "Prototyping", "UX research", "Accessibility", "Motion"],
      example: { label: "See our interfaces: Planevia & RaphyCar", href: "../projets/planevia.html" },
    },
  },
};
