/* Translation dictionary and language application. */

const I18N = {
      en: {
        nav_home: "Home",
        nav_about: "About",
        nav_skills: "Skills",
        nav_projects: "Projects",
        nav_experience: "Experience",
        nav_education: "Credentials",
        nav_contact: "Contact",
        nav_download_cv: "Official CV",
        btn_get_in_touch: "Get in Touch",
        hero_greeting: "Hi, I'm",
        hero_explore_btn: "Explore Projects",
        hero_download_cv_btn: "Download CV",
        hero_print_btn: "Print Portfolio",
        about_eyebrow: "About Me",
        about_heading_1: "Full-Stack Engineering Applied to",
        about_heading_2: "Real-World Products",
        about_subheading: "Web and mobile development, service-oriented architectures and LLM integration.",
        career_vision_label: "Career Goal",
        summary_card_title: "Professional Summary",
        skills_eyebrow: "Technical Skills",
        skills_heading_1: "Technical",
        skills_heading_2: "Competencies",
        skills_subheading: "Languages, web and backend frameworks, databases and DevOps tools.",
        projects_eyebrow: "Selected Work",
        projects_heading_1: "Featured",
        projects_heading_2: "Projects",
        projects_subheading: "Academic, personal and internship projects across web, mobile, AI and algorithms.",
        exp_eyebrow: "Work History",
        exp_heading_1: "Professional",
        exp_heading_2: "Experience",
        exp_subheading: "Two internships as a web and full-stack developer.",
        edu_eyebrow: "Academic Foundation",
        edu_heading_1: "Education &",
        edu_heading_2: "Certifications",
        edu_subheading: "Engineering degree in progress, complemented by continuous upskilling.",
        cert_heading: "Certifications",
        view_certificates_drive: "",
        contact_eyebrow: "Contact",
        contact_heading_1: "Let's Talk About Your",
        contact_heading_2: "Internship Opportunity",
        contact_subheading: "Open to a PFE internship in Full-Stack Web and Mobile development from January 2027.",
        contact_channel_title: "Direct Channels",
        contact_channel_desc: "Reach me by email or LinkedIn.",
        contact_whatsapp_label: "LinkedIn",
        contact_email_label: "Email Address",
        contact_location_label: "Location",
        form_title: "Send a Message",
        form_name: "Your Name",
        form_email: "Your Email",
        form_msg: "Your Message",
        form_send: "Send Message",
        footer_rights: "All rights reserved.",
        view_details_btn: "Explore Project",
        live_demo_btn: "Live Demo"
      },
      fr: {
        nav_home: "Accueil",
        nav_about: "À propos",
        nav_skills: "Compétences",
        nav_projects: "Projets",
        nav_experience: "Expérience",
        nav_education: "Formation",
        nav_contact: "Contact",
        nav_download_cv: "CV officiel",
        btn_get_in_touch: "Me contacter",
        hero_greeting: "Bonjour, je suis",
        hero_explore_btn: "Voir les projets",
        hero_download_cv_btn: "Télécharger le CV",
        hero_print_btn: "Imprimer le portfolio",
        about_eyebrow: "À propos",
        about_heading_1: "Ingénierie Full-Stack appliquée à",
        about_heading_2: "des produits concrets",
        about_subheading: "Développement web et mobile, architectures orientées services et intégration de LLM.",
        career_vision_label: "Objectif professionnel",
        summary_card_title: "Résumé professionnel",
        skills_eyebrow: "Compétences techniques",
        skills_heading_1: "Compétences",
        skills_heading_2: "techniques",
        skills_subheading: "Langages, frameworks web et backend, bases de données et outils DevOps.",
        projects_eyebrow: "Réalisations",
        projects_heading_1: "Projets",
        projects_heading_2: "phares",
        projects_subheading: "Projets académiques, personnels et de stage : web, mobile, IA et algorithmique.",
        exp_eyebrow: "Parcours",
        exp_heading_1: "Expérience",
        exp_heading_2: "professionnelle",
        exp_subheading: "Deux stages en développement web et Full-Stack.",
        edu_eyebrow: "Parcours académique",
        edu_heading_1: "Formation &",
        edu_heading_2: "Certifications",
        edu_subheading: "Cycle ingénieur en cours, complété par une montée en compétences continue.",
        cert_heading: "Certifications",
        view_certificates_drive: "",
        contact_eyebrow: "Contact",
        contact_heading_1: "Parlons de votre",
        contact_heading_2: "offre de stage PFE",
        contact_subheading: "Disponible pour un stage PFE en développement Full-Stack Web et Mobile à partir de janvier 2027.",
        contact_channel_title: "Coordonnées",
        contact_channel_desc: "Contactez-moi par email ou sur LinkedIn.",
        contact_whatsapp_label: "LinkedIn",
        contact_email_label: "Adresse email",
        contact_location_label: "Localisation",
        form_title: "Envoyer un message",
        form_name: "Votre nom",
        form_email: "Votre email",
        form_msg: "Votre message",
        form_send: "Envoyer",
        footer_rights: "Tous droits réservés.",
        view_details_btn: "Voir le projet",
        live_demo_btn: "Démo en ligne"
      }
    };

    function init() {
      applyLanguage(currentLang);
      renderAll();
      initializeMotion();
      fetchLatestFromCloud();
    }

    function toggleLanguage() {
      startLanguageTransition();
      currentLang = currentLang === 'en' ? 'fr' : 'en';
      localStorage.setItem('portfolio_lang', currentLang);
      applyLanguage(currentLang);
      renderAll();
      initializeMotion();
    }

    function applyLanguage(lang) {
      document.documentElement.lang = lang;
      document.documentElement.dir = 'ltr';
      document.getElementById('langBtnText').textContent = lang === 'en' ? 'Français' : 'English';
      const shortLangEl = document.getElementById('langBtnTextShort');
      if (shortLangEl) shortLangEl.textContent = lang === 'en' ? 'FR' : 'EN';

      const dict = I18N[lang];
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
      });
    }

