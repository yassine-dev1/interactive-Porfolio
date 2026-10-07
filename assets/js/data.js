/* INITIAL_DATA and synchronized runtime state. */

const INITIAL_DATA = {
  personal: {
    fullName: "Yassine El Jarjini",
    professionalTitle: "Full-Stack Software Engineer",
    professionalTitleFr: "Ingénieur Logiciel Full-Stack",
    professionalHeadline:
      "Web & Mobile Apps · Microservices · LLM/RAG integration",
    professionalHeadlineFr:
      "Applications Web & Mobile · Microservices · Intégration LLM/RAG",
    shortIntroduction:
      "Final-year software engineering student at FST Mohammedia, I build full-stack web and mobile applications, service-oriented architectures and LLM-powered features. Curious about AI agents and automation with n8n, I am developing these skills alongside my Full-Stack profile.",
    shortIntroductionFr:
      "Étudiant en dernière année du cycle ingénieur à la FST Mohammedia, je conçois des applications web et mobile Full-Stack, des architectures orientées services et des fonctionnalités basées sur les LLM. Curieux des agents IA et de l'automatisation avec n8n, je développe ces compétences en complément de mon profil Full-Stack.",
    aboutMe:
      "Final-year engineering student in Software Engineering and IT Systems Integration at FST Mohammedia, specializing in Full-Stack development. I have completed two internships: a service-oriented platform with Next.js, TypeScript, Stripe and JWT at SecureValley, and an intervention-management app with React and Express at Safarelec. My personal projects cover C++/WebAssembly, .NET with Redis and RAG, and mobile development. Curious about AI agents and workflow automation with n8n, I am building these skills (Scrimba \"Learn AI Agents\" course) to bring intelligent features into real-world applications.",
    aboutMeFr:
      "Étudiant en dernière année du cycle ingénieur Génie Logiciel et Intégration des Systèmes Informatiques à la FST Mohammedia, je me spécialise en développement Full-Stack. J'ai réalisé deux stages : une plateforme orientée services avec Next.js, TypeScript, Stripe et JWT chez SecureValley, et une application de gestion des interventions avec React et Express chez Safarelec. Mes projets personnels couvrent C++/WebAssembly, .NET avec Redis et RAG, et le développement mobile. Curieux des agents IA et de l'automatisation de workflows avec n8n, je me forme à ces domaines (cours Scrimba « Learn AI Agents ») afin d'intégrer des fonctionnalités intelligentes dans des applications concrètes.",
    careerObjective:
      "Looking for an end-of-studies (PFE) internship in Full-Stack Web and Mobile development, with a focus on microservices, LLM/AI integration and AI agents. Available from January 2027.",
    careerObjectiveFr:
      "À la recherche d'un stage de fin d'études (PFE) en développement Full-Stack Web et Mobile : architectures microservices, intégration LLM/IA et agents IA. Disponible à partir de janvier 2027.",
    currentLocation: "Casablanca, Morocco",
    currentLocationFr: "Casablanca, Maroc",
    availability: "Open to a PFE internship · From January 2027",
    availabilityFr: "Disponible pour un stage PFE · À partir de janvier 2027",
    profileImage: "profile.jpg",
    aboutImage: "assets/images/about/about-portrait.webp",
    aboutImageAlt: "Portrait of Yassine El Jarjini wearing a gray blazer, smiling outdoors",
    aboutImageAltFr: "Portrait de Yassine El Jarjini en blazer gris, souriant en extérieur",
    aboutHeadline: "Learning fast, building end to end",
    aboutHeadlineFr: "Apprendre vite, construire de bout en bout",
    cvUrl: "resumes/Resume_Yassine_Eljarjini_FR.pdf",
    cvFileName: "Resume_Yassine_Eljarjini_FR.pdf",
    cvUrlEn: "resumes/Resume_Yassine_Eljarjini_EN.pdf",
    cvFileNameEn: "Resume_Yassine_Eljarjini_EN.pdf",
  },
  contact: {
    email: "eljarjiniyassine1@gmail.com",
    phone: "+212644847468",
    phoneDisplay: "+212 6 44 84 74 68",
    whatsappUrl: "https://www.linkedin.com/in/el-jarjini-yassine/",
    linkedin: "https://www.linkedin.com/in/el-jarjini-yassine/",
    github: "https://github.com/yassine-dev1",
    portfolioUrl: "",
  },
  stats: [
    {
      id: "s1",
      number: "2",
      label: "Internships completed",
      labelFr: "Stages réalisés",
    },
    {
      id: "s2",
      number: "6",
      label: "Featured projects",
      labelFr: "Projets phares",
    },
    {
      id: "s3",
      number: "3",
      label: "Certifications",
      labelFr: "Certifications",
    },
    {
      id: "s4",
      number: "Jan 2027",
      label: "PFE availability",
      labelFr: "Disponibilité PFE",
    },
  ],
  floatingBadges: [
    {
      id: "b1",
      icon: "layers",
      category: "Domain",
      categoryFr: "Domaine",
      title: "Full-Stack Web & Mobile",
      titleFr: "Full-Stack Web & Mobile",
      targetSection: "#skills",
    },
    {
      id: "b2",
      icon: "bot",
      category: "Focus",
      categoryFr: "Axe",
      title: "LLM / RAG & AI Agents",
      titleFr: "LLM / RAG & Agents IA",
      targetSection: "#projects",
    },
    {
      id: "b3",
      icon: "server",
      category: "Architecture",
      categoryFr: "Architecture",
      title: "Microservices & SOA",
      titleFr: "Microservices & SOA",
      targetSection: "#experience",
    },
    {
      id: "b4",
      icon: "graduation-cap",
      category: "Status",
      categoryFr: "Statut",
      title: "PFE · January 2027",
      titleFr: "PFE · Janvier 2027",
      targetSection: "#contact",
    },
  ],
  professionalSummary: [
    {
      id: "ps1",
      icon: "map-pin",
      label: "Location",
      labelFr: "Localisation",
      value: "Casablanca, Morocco",
      valueFr: "Casablanca, Maroc",
    },
    {
      id: "ps2",
      icon: "graduation-cap",
      label: "Education",
      labelFr: "Formation",
      value: "FST Mohammedia – Engineering Cycle (GLSID)",
      valueFr: "FST Mohammedia – Cycle Ingénieur (GLSID)",
    },
    {
      id: "ps3",
      icon: "calendar",
      label: "Availability",
      labelFr: "Disponibilité",
      value: "PFE internship from January 2027",
      valueFr: "Stage PFE à partir de janvier 2027",
    },
    {
      id: "ps4",
      icon: "code-2",
      label: "Focus",
      labelFr: "Domaines",
      value: "Full-Stack, microservices, LLM/AI",
      valueFr: "Full-Stack, microservices, LLM/IA",
    },
    {
      id: "ps5",
      icon: "languages",
      label: "Languages",
      labelFr: "Langues",
      value: "French (native) · French B2 · English B1",
      valueFr: "Arabe (natif) · Français B2 · Anglais B1",
    },
  ],
  skillsCategories: [
    {
      categoryName: "Languages",
      categoryNameFr: "Langages",
      icon: "code-2",
      skills: [
        {
          name: "Java (Jakarta EE)",
        },
        {
          name: "C / C++",
        },
        {
          name: "JavaScript",
        },
        {
          name: "TypeScript",
        },
        {
          name: "PHP",
        },
        {
          name: "Assembly",
        },
        {
          name: "Shell",
        },
      ],
    },
    {
      categoryName: "Backend & Web",
      categoryNameFr: "Backend & Web",
      icon: "layers",
      skills: [
        {
          name: "React JS",
        },
        {
          name: "React Native",
        },
        {
          name: "Next.js",
        },
        {
          name: "NestJS",
        },
        {
          name: "Express JS",
        },
        {
          name: "Spring Boot",
        },
        {
          name: ".NET",
        },
        {
          name: "Tailwind CSS",
        },
        {
          name: "REST API",
        },
        {
          name: "Microservices",
        },
      ],
    },
    {
      categoryName: "Artificial Intelligence",
      categoryNameFr: "Intelligence Artificielle",
      icon: "bot",
      skills: [
        {
          name: "LLM",
          desc: "Conversational assistant built on an LLM (ShopApp); text generation with the Gemini API.",
          descFr:
            "Assistant conversationnel basé sur un LLM (ShopApp) ; génération de texte avec l'API Gemini.",
        },
        {
          name: "RAG",
          desc: "Retrieval-Augmented Generation over a product catalog to ground answers.",
          descFr:
            "Retrieval-Augmented Generation sur un catalogue produit pour des réponses fiables.",
        },
        {
          name: "AI Agents",
          badge: "Beginner",
          badgeFr: "Initié",
          desc: "Scrimba « Learn AI Agents » course (August 2026).",
          descFr: "Cours Scrimba « Learn AI Agents » (août 2026).",
        },
        {
          name: "n8n",
          badge: "Beginner",
          badgeFr: "Initié",
        },
      ],
    },
    {
      categoryName: "Databases & Data",
      categoryNameFr: "Bases de données & Data",
      icon: "database",
      skills: [
        {
          name: "PostgreSQL",
        },
        {
          name: "MySQL",
        },
        {
          name: "SQL Server",
        },
        {
          name: "Oracle PL/SQL",
        },
        {
          name: "Redis",
        },
        {
          name: "Prisma ORM",
        },
        {
          name: "Power BI",
        },
      ],
    },
    {
      categoryName: "DevOps & Tools",
      categoryNameFr: "DevOps & Outils",
      icon: "wrench",
      skills: [
        {
          name: "Git / GitHub",
        },
        {
          name: "Docker",
        },
        {
          name: "Figma",
        },
        {
          name: "Jira",
        },
      ],
    },
    {
      categoryName: "Methods & Best Practices",
      categoryNameFr: "Méthodes & Bonnes pratiques",
      icon: "workflow",
      skills: [
        {
          name: "SOLID Principles",
          nameFr: "Principes SOLID",
        },
        {
          name: "Clean Architecture",
        },
        {
          name: "Design Patterns",
        },
        {
          name: "Agile / Scrum",
        },
      ],
    },
    {
      categoryName: "Soft Skills",
      categoryNameFr: "Soft Skills",
      icon: "brain",
      skills: [
        {
          name: "AI-assisted development (vibe coding)",
          nameFr: "Développement assisté par IA (vibe coding)",
        },
        {
          name: "Analytical problem solving",
          nameFr: "Résolution analytique de problèmes",
        },
        {
          name: "Rapid tech learning",
          nameFr: "Apprentissage rapide des technologies",
        },
        {
          name: "Time management & prioritization",
          nameFr: "Gestion du temps et priorisation",
        },
      ],
    },
  ],
  experience: [
    {
      jobTitle: "Full-Stack Developer Intern",
      jobTitleFr: "Stagiaire Développeur Full-Stack",
      company: "SecureValley",
      employmentType: "Internship · Témara, Morocco",
      employmentTypeFr: "Stage · Témara, Maroc",
      startDate: "April 2026",
      startDateFr: "Avril 2026",
      endDate: "June 2026",
      endDateFr: "Juin 2026",
      responsibilities:
        "Developed a service-oriented (SOA) platform made of 3 Next.js/TypeScript applications: an institutional website, a Stripe e-commerce store and an assessment app, with a microservices architecture secured by JWT and persistence through Prisma ORM.",
      responsibilitiesFr:
        "Développement d'une plateforme SOA (Architecture Orientée Services) de 3 applications Next.js/TypeScript : vitrine institutionnelle, boutique e-commerce Stripe et application d'évaluation, avec une architecture microservices sécurisée par JWT et une persistance via Prisma ORM.",
      technologies: ["Next.js", "TypeScript", "Stripe", "JWT", "Prisma ORM"],
    },
    {
      jobTitle: "Web Developer Intern",
      jobTitleFr: "Stagiaire Développeur Web",
      company: "Safarelec",
      employmentType: "Internship · El Jadida, Morocco",
      employmentTypeFr: "Stage · El Jadida, Maroc",
      startDate: "April 2025",
      startDateFr: "Avril 2025",
      endDate: "June 2025",
      endDateFr: "Juin 2025",
      responsibilities:
        "Designed an intervention-management application with React.js and Express.js, improving the follow-up of import/export flows for the operations team.",
      responsibilitiesFr:
        "Conception d'une application de gestion des interventions avec React.js/Express.js, optimisant le suivi des flux import/export pour l'équipe opérationnelle.",
      technologies: ["React.js", "Express.js"],
    },
  ],
  projects: [
    {
      id: "ecommerce-ai",
      name: "AI-Powered E-Commerce Platform",
      nameFr: "Plateforme E-Commerce Intelligente",
      category: "Backend · AI",
      categoryFr: "Backend · IA",
      shortDescription:
        ".NET 8 backend with a Redis-backed distributed cart and an LLM assistant using RAG to answer from the product catalog.",
      shortDescriptionFr:
        "Backend .NET 8 avec panier distribué via Redis et assistant client basé sur un LLM et le pattern RAG, répondant à partir du catalogue produit.",
      technologies: [".NET 8", "SQL Server", "Redis", "LLM", "RAG"],
      liveDemo: "",
      githubUrl: "https://github.com/yassine-dev1/ShopApp",
      imageUrl: "assets/images/projects/ecommerce-ai.webp",
      metric: "Distributed cart · RAG assistant",
      metricFr: "Panier distribué · Assistant RAG",
      overview:
        "ASP.NET Core (.NET 8) e-commerce platform with high-performance caching and a distributed shopping cart on Redis, plus a conversational assistant that uses Retrieval-Augmented Generation to give reliable answers grounded in the product catalog.",
      overviewFr:
        "Plateforme e-commerce ASP.NET Core (.NET 8) avec cache haute performance et panier distribué sur Redis, ainsi qu'un assistant conversationnel utilisant le RAG pour des réponses fiables basées sur le catalogue produit.",
    },
    {
      id: "friend-locator",
      name: "Friend Locator",
      nameFr: "Friend Locator",
      category: "Mobile · Full-Stack",
      categoryFr: "Mobile · Full-Stack",
      shortDescription:
        "Mobile app for sharing location in real time between friends.",
      shortDescriptionFr:
        "Application mobile de partage de position en temps réel entre amis.",
      technologies: ["React Native", "NestJS", "PostgreSQL"],
      liveDemo: "",
      githubUrl: "https://github.com/yassine-dev1/FreindLocator",
      imageUrl: "",
      metric: "Real-time location sharing",
      metricFr: "Partage de position en temps réel",
      overview:
        "Mobile application built with React Native, a NestJS API and a PostgreSQL database, letting friends share their position in real time.",
      overviewFr:
        "Application mobile construite avec React Native, une API NestJS et une base PostgreSQL, permettant à des amis de partager leur position en temps réel.",
    },
    {
      id: "pathfinding",
      name: "Pathfinding Visualizer Engine",
      nameFr: "Pathfinding Visualizer Engine",
      category: "Algorithms · Performance",
      categoryFr: "Algorithmique · Performance",
      shortDescription:
        "C++ pathfinding engine compiled to WebAssembly, with a React interface to visualize and compare algorithms.",
      shortDescriptionFr:
        "Moteur de calcul de chemins en C++ compilé en WebAssembly, avec interface React pour visualiser et comparer les algorithmes.",
      technologies: ["C++", "WebAssembly", "React", "Dijkstra", "A*", "BFS"],
      liveDemo: "",
      githubUrl: "https://github.com/yassine-dev1/PathFinding",
      imageUrl: "assets/images/projects/pathfinding.webp",
      metric: "A*, Dijkstra, BFS on 800-node grids",
      metricFr: "A*, Dijkstra, BFS sur grilles de 800 nœuds",
      overview:
        "High-performance path computation in C++ compiled to WebAssembly for near-native execution in the browser, with implementation and benchmarking of A*, Dijkstra and BFS on 800-node grids.",
      overviewFr:
        "Moteur de calcul de chemins haute performance en C++ compilé en WebAssembly pour une exécution quasi-native dans le navigateur, avec implémentation et benchmarking des algorithmes A*, Dijkstra et BFS sur des grilles de 800 nœuds.",
    },
    {
      id: "service-manager",
      name: "ServiceManager – Intervention Management",
      nameFr: "ServiceManager – Gestion des interventions",
      category: "Web · Internship project",
      categoryFr: "Web · Projet de stage",
      shortDescription:
        "Web app built for Safarelec to digitize the management of internal interventions.",
      shortDescriptionFr:
        "Application web conçue pour Safarelec afin de digitaliser la gestion des interventions internes.",
      technologies: ["React.js", "Express.js"],
      liveDemo: "",
      githubUrl: "https://github.com/yassine-dev1/ServiceManager",
      imageUrl: "",
      metric: "Real client · Safarelec",
      metricFr: "Cas client réel · Safarelec",
      overview:
        "Web application designed for Safarelec (El Jadida) to digitize the internal intervention process and improve the follow-up of import/export flows.",
      overviewFr:
        "Application web conçue pour Safarelec (El Jadida) afin de digitaliser le processus de gestion des interventions internes et d'optimiser le suivi des flux import/export.",
    },
    {
      id: "storeshop",
      name: "StoreShop – Spring Boot E-Commerce",
      nameFr: "StoreShop – E-Commerce Spring Boot",
      category: "Backend · Java",
      categoryFr: "Backend · Java",
      shortDescription:
        "E-commerce web application built with Spring Boot, Spring Security and MySQL.",
      shortDescriptionFr:
        "Application e-commerce web construite avec Spring Boot, Spring Security et MySQL.",
      technologies: [
        "Spring Boot 3",
        "Java 17",
        "MySQL",
        "Thymeleaf",
        "Spring Security",
      ],
      liveDemo: "",
      githubUrl: "https://github.com/yassine-dev1/StoreShop",
      imageUrl: "assets/images/projects/storeshop.webp",
      metric: "Java / Spring ecosystem",
      metricFr: "Écosystème Java / Spring",
      overview:
        "E-commerce application developed with Spring Boot 3 and Java 17, using Thymeleaf templates, Spring Security and a MySQL database.",
      overviewFr:
        "Application e-commerce développée avec Spring Boot 3 et Java 17, utilisant des templates Thymeleaf, Spring Security et une base MySQL.",
    },
    {
      id: "academic-orientation",
      name: "Academic Orientation Expert System",
      nameFr: "Système Expert d'Orientation Académique",
      category: "AI · Python",
      categoryFr: "IA · Python",
      shortDescription:
        "Expert system recommending academic tracks from student profiles and aspirations, with Gemini-generated motivation letters.",
      shortDescriptionFr:
        "Système expert recommandant des filières à partir du profil et des aspirations de l'étudiant, avec lettres de motivation générées par l'API Gemini.",
      technologies: [
        "Python",
        "CustomTkinter",
        "Inference engine",
        "RIASEC",
        "Gemini API",
      ],
      liveDemo: "",
      githubUrl: "https://github.com/yassine-dev1/academic_orientation",
      imageUrl: "assets/images/projects/academic-orientation.webp",
      metric: "Forward chaining + RIASEC",
      metricFr: "Chaînage avant + RIASEC",
      overview:
        "Desktop application in Python and CustomTkinter combining a forward-chaining inference engine with the RIASEC personality model to compute domain compatibility, and using the Gemini API to generate motivation letters.",
      overviewFr:
        "Application desktop Python/CustomTkinter combinant un moteur d'inférence à chaînage avant et le modèle de personnalité RIASEC pour calculer la compatibilité avec les domaines, et utilisant l'API Gemini pour générer des lettres de motivation.",
    },
  ],
  education: [
    {
      degree:
        "Engineering Cycle – Software Engineering & IT Systems Integration",
      degreeFr:
        "Cycle Ingénieur – Génie Logiciel et Intégration des Systèmes Informatiques",
      institution: "Faculty of Sciences and Techniques of Mohammedia (FST)",
      institutionFr: "Faculté des Sciences et Techniques de Mohammedia (FST)",
      graduationDate: "2024 – Present",
      graduationDateFr: "2024 – Présent",
      gpa: "Final year",
      gpaFr: "Dernière année",
      highlights:
        "Previously: Bachelor's degree in Mathematics and Computer Science (Databases), Faculty of Sciences Ain Chok, Casablanca, 2021–2024.",
      highlightsFr:
        "Auparavant : Licence Fondamentale en Sciences Mathématiques et Informatiques (Bases de données), Faculté des Sciences Ain Chok, Casablanca, 2021–2024.",
      certificatesFolderUrl: "",
    },
  ],
  courses: [
    {
      name: "Learn Next.js",
      platform: "Scrimba",
      completionDate: "August 2026",
      completionDateFr: "Août 2026",
      fileUrl: "certifications/Scrimba_Learn_Next_js.pdf",
    },
    {
      name: "Learn AI Agents",
      platform: "Scrimba",
      completionDate: "August 2026",
      completionDateFr: "Août 2026",
      fileUrl: "certifications/Scrimba_Learn_AI_Agents.pdf",
    },
    {
      name: "CCNA: Introduction to Networks",
      platform: "Cisco Networking Academy · Hassan II Mohammedia University",
      completionDate: "January 2025",
      completionDateFr: "Janvier 2025",
      fileUrl: "certifications/Cisco_CCNA_Introduction_to_Networks.pdf",
    },
  ],
  addedValue: {},
};
const CLOUD_URL =
  typeof getPortfolioCloudUrl === "function" ? getPortfolioCloudUrl() : null;

let data = INITIAL_DATA;
let currentLang = localStorage.getItem("portfolio_lang") || "fr";

// LocalStorage Initial Cache
try {
  const cached = localStorage.getItem("portfolio_cache");
  if (cached) {
    data = JSON.parse(cached);
  }
} catch (err) {
  // Invalid cached data is ignored; INITIAL_DATA remains the fallback.
}

// Live Cross-Tab BroadcastChannel listener for instant real-time updates!
try {
  const bc = new BroadcastChannel("portfolio_sync");
  bc.onmessage = (event) => {
    if (event.data && event.data.type === "DATA_UPDATED") {
      data = event.data.data;
      renderAll();
    }
  };
} catch (err) {
  // BroadcastChannel is optional; the portfolio remains functional in one tab.
}

window.addEventListener("storage", (e) => {
  if (e.key === "portfolio_cache" && e.newValue) {
    data = JSON.parse(e.newValue);
    renderAll();
  }
});
