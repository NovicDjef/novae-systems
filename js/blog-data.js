/* =========================================================
   NOVÆ SYSTEMS — Articles du blog (bilingue FR / EN)
   ========================================================= */
const BLOG = [
  {
    id: "saas-vs-tableur",
    date: "2026-06-12",
    accent: "#0453f1",
    fr: {
      tag: "Produit",
      title: "SaaS ou tableur : quand franchir le pas ?",
      excerpt: "Excel a des limites. Voici les signes qu'il est temps de passer à un vrai logiciel — et ce que vous y gagnez.",
      read: "4 min",
      body: `
<p>Un tableur, c'est génial… jusqu'à ce que votre activité grandisse. Doubles saisies, fichiers en conflit, données non sécurisées, aucune automatisation : à un certain point, l'outil qui vous aidait devient votre frein.</p>
<h3>Les signaux d'alerte</h3>
<ul>
<li>Plusieurs personnes modifient le même fichier et écrasent les données des autres.</li>
<li>Vous copiez-collez les mêmes informations d'un outil à l'autre.</li>
<li>Impossible de savoir « qui a fait quoi » ou de revenir en arrière.</li>
<li>Vos données sensibles dorment dans un fichier sans contrôle d'accès.</li>
</ul>
<h3>Ce qu'un SaaS change</h3>
<p>Un logiciel sur mesure centralise tout : une source de vérité unique, des droits par utilisateur, des automatisations qui suppriment les tâches répétitives, et des tableaux de bord pour piloter en temps réel. C'est exactement ce qu'on a construit avec Planevia pour les spas et cliniques.</p>
<p>La bonne nouvelle : on n'a pas besoin de tout reconstruire d'un coup. On commence par le module qui fait le plus mal, et on avance par étapes.</p>`,
    },
    en: {
      tag: "Product",
      title: "SaaS or spreadsheet: when to make the jump?",
      excerpt: "Excel has limits. Here are the signs it's time to move to real software — and what you gain.",
      read: "4 min",
      body: `
<p>A spreadsheet is great… until your business grows. Double entry, conflicting files, unsecured data, zero automation: at some point, the tool that helped you becomes your bottleneck.</p>
<h3>The warning signs</h3>
<ul>
<li>Several people edit the same file and overwrite each other's data.</li>
<li>You copy-paste the same information between tools.</li>
<li>You can't tell "who did what" or roll anything back.</li>
<li>Your sensitive data sits in a file with no access control.</li>
</ul>
<h3>What a SaaS changes</h3>
<p>Custom software centralizes everything: a single source of truth, per-user permissions, automations that remove repetitive tasks, and dashboards to steer in real time. That's exactly what we built with Planevia for spas and clinics.</p>
<p>The good news: you don't need to rebuild everything at once. We start with the module that hurts most and move step by step.</p>`,
    },
  },
  {
    id: "mvp-6-semaines",
    date: "2026-06-05",
    accent: "#a855f7",
    fr: {
      tag: "Méthode",
      title: "Un MVP en 6 semaines : notre méthode Agile",
      excerpt: "Comment on passe d'une idée à un produit testable en quelques semaines, sans sacrifier la qualité.",
      read: "5 min",
      body: `
<p>Beaucoup de projets meurent parce qu'ils visent trop gros, trop tôt. Notre approche : livrer vite un produit minimum viable (MVP) qui prouve la valeur, puis itérer avec de vrais utilisateurs.</p>
<h3>Semaines 1–2 : cadrage</h3>
<p>On traduit votre idée en user stories priorisées. On définit le périmètre du MVP : le strict nécessaire pour valider l'essentiel.</p>
<h3>Semaines 3–5 : sprints</h3>
<p>Chaque sprint d'une à deux semaines livre un incrément fonctionnel et testé. Vous voyez le produit grandir et vous nous orientez à chaque démo.</p>
<h3>Semaine 6 : mise en ligne</h3>
<p>On déploie, on observe les vrais usages et on planifie la suite à partir de données, pas de suppositions.</p>
<p>C'est ce rythme qui nous a permis de livrer Planevia et RaphyCar — deux produits aujourd'hui en production sur iOS et Android.</p>`,
    },
    en: {
      tag: "Method",
      title: "An MVP in 6 weeks: our Agile method",
      excerpt: "How we go from an idea to a testable product in a few weeks, without sacrificing quality.",
      read: "5 min",
      body: `
<p>Many projects die because they aim too big, too soon. Our approach: quickly ship a minimum viable product (MVP) that proves value, then iterate with real users.</p>
<h3>Weeks 1–2: framing</h3>
<p>We turn your idea into prioritized user stories and define the MVP scope: the bare minimum to validate what matters.</p>
<h3>Weeks 3–5: sprints</h3>
<p>Each one-to-two-week sprint ships a tested, working increment. You watch the product grow and steer us at every demo.</p>
<h3>Week 6: go live</h3>
<p>We deploy, observe real usage, and plan next steps from data, not assumptions.</p>
<p>This rhythm is how we shipped Planevia and RaphyCar — two products now live on iOS and Android.</p>`,
    },
  },
  {
    id: "paiements-mobile-money-stripe",
    date: "2026-05-28",
    accent: "#ff2bd6",
    fr: {
      tag: "Technique",
      title: "Encaisser partout : Mobile Money & carte bancaire",
      excerpt: "Intégrer les paiements pour un marché à la fois africain et nord-américain : ce qu'il faut savoir.",
      read: "4 min",
      body: `
<p>Vendre un service en ligne, c'est bien. Être payé facilement, c'est mieux. Mais les moyens de paiement varient énormément d'un marché à l'autre.</p>
<h3>En Afrique : le Mobile Money règne</h3>
<p>MTN Mobile Money et Orange Money sont incontournables. Les intégrer dans le tunnel de paiement — comme on l'a fait pour RaphyCar — supprime une énorme friction pour vos clients.</p>
<h3>Au Canada et à l'international : la carte</h3>
<p>Stripe couvre Visa, Mastercard et bien plus, avec une sécurité de niveau bancaire et une gestion des abonnements clé en main.</p>
<h3>La bonne approche</h3>
<p>On conçoit un tunnel unique qui propose le bon moyen de paiement selon le client, tout en gardant une comptabilité claire côté entreprise. Résultat : moins d'abandons, plus de revenus encaissés.</p>`,
    },
    en: {
      tag: "Technical",
      title: "Get paid anywhere: Mobile Money & cards",
      excerpt: "Integrating payments for both African and North American markets: what you need to know.",
      read: "4 min",
      body: `
<p>Selling a service online is good. Getting paid easily is better. But payment methods vary hugely from one market to another.</p>
<h3>In Africa: Mobile Money rules</h3>
<p>MTN Mobile Money and Orange Money are essential. Integrating them into the checkout — as we did for RaphyCar — removes huge friction for your customers.</p>
<h3>In Canada and abroad: cards</h3>
<p>Stripe covers Visa, Mastercard and more, with bank-grade security and turnkey subscription management.</p>
<h3>The right approach</h3>
<p>We design a single checkout that offers the right method per customer, while keeping clean accounting on the business side. The result: fewer drop-offs, more revenue collected.</p>`,
    },
  },
];
