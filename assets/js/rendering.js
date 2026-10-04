/* Data-driven rendering for the public portfolio. */

function renderAll() {
  const isFr = currentLang === "fr";
  const p = data.personal || {};
  const c = data.contact || {};

  const displayName =
    isFr && p.fullNameFr ? p.fullNameFr : p.fullName || "Yassine El Jarjini";
  const displayTitle =
    isFr && p.professionalTitleFr
      ? p.professionalTitleFr
      : p.professionalTitle || "AI Automation Specialist & Systems Developer";

  document.getElementById("navBrandName").textContent = "Yassine El Jarjini";
  document.getElementById("footerBrandName").textContent = displayName;

  const profilePhoto = p && p.profileImage ? p.profileImage : "profile.jpg";
  const heroAvatarImg = document.getElementById("heroAvatarCardImg");
  if (heroAvatarImg) heroAvatarImg.src = profilePhoto;
  const navAvatarImg = document.getElementById("navBrandAvatarImg");
  if (navAvatarImg) navAvatarImg.src = profilePhoto;
  document.getElementById("heroFullName").textContent = displayName;
  document.getElementById("cardHeroName").textContent = displayName;
  document.getElementById("heroHeadline").textContent =
    isFr && p.professionalHeadlineFr
      ? p.professionalHeadlineFr
      : p.professionalHeadline;
  document.getElementById("cardHeroTitle").textContent = displayTitle;
  document.getElementById("heroIntro").textContent =
    isFr && p.shortIntroductionFr ? p.shortIntroductionFr : p.shortIntroduction;
  document.getElementById("heroAvailabilityPill").textContent =
    isFr && p.availabilityFr ? p.availabilityFr : p.availability;
  document.getElementById("cardHeroLocation").textContent =
    isFr && p.currentLocationFr
      ? p.currentLocationFr
      : p.currentLocation || "Casablanca, Maroc";

  // Contact Links
  if (c.linkedin)
    document.getElementById("heroSocialLinkedin").href = c.linkedin;
  if (c.github) document.getElementById("heroSocialGithub").href = c.github;
  if (c.whatsappUrl) {
    const _w = document.getElementById("heroSocialWhatsapp");
    if (_w) _w.href = c.whatsappUrl;
    document.getElementById(
      "contactPhoneText",
    ).parentElement.parentElement.href = c.whatsappUrl;
  }
  if (c.email) {
    document.getElementById("heroSocialEmail").href = "mailto:" + c.email;
    document.getElementById(
      "contactEmailText",
    ).parentElement.parentElement.href = "mailto:" + c.email;
    document.getElementById("contactEmailText").textContent = c.email;
  }
  if (c.phoneDisplay || c.phone) {
    document.getElementById("contactPhoneText").textContent =
      c.phoneDisplay || c.phone;
  }
  if (p.currentLocation) {
    document.getElementById("contactLocationText").textContent =
      isFr && p.currentLocationFr ? p.currentLocationFr : p.currentLocation;
  }

  const lf = document.getElementById("cvLinkFr"),
    le = document.getElementById("cvLinkEn");
  if (lf && p.cvUrl && !/^data:/.test(p.cvUrl)) lf.href = p.cvUrl;
  if (le && p.cvUrlEn && !/^data:/.test(p.cvUrlEn)) le.href = p.cvUrlEn;

  // About
  document.getElementById("aboutMeP1").textContent =
    isFr && p.aboutMeFr ? p.aboutMeFr : p.aboutMe;
  document.getElementById("careerObjectiveText").textContent =
    isFr && p.careerObjectiveFr ? p.careerObjectiveFr : p.careerObjective;

  // Stats Pills INSIDE the Card
  renderHeroCardStats();

  // Floating Badges outside the card
  renderFloatingBadges();

  // 5 Professional Summary Key Facts
  renderKeyFactsSummary();

  // Categorized Skills (4 categories with descriptions)
  renderCategorizedSkills();

  // Added Value & ROI

  // Projects
  renderProjects();

  // Experience & Education
  renderExperience();
  renderEducation();

  lucide.createIcons();
}

// Hero Card Stat Pills
function renderHeroCardStats() {
  const grid = document.getElementById("cardHeroStatsGrid");
  grid.innerHTML = "";
  const stats = data.stats || [];
  const isFr = currentLang === "fr";

  stats.forEach((s) => {
    const pill = document.createElement("div");
    pill.className = "stat-pill";
    pill.innerHTML = `
          <div class="stat-number">${s.number}</div>
          <div class="stat-label">${isFr && s.labelFr ? s.labelFr : s.label}</div>
        `;
    grid.appendChild(pill);
  });
}

// Interactive Closer Floating Badges
function renderFloatingBadges() {
  const container = document.getElementById("heroFloatingBadgesContainer");
  container.innerHTML = "";
  const badges = data.floatingBadges || [];
  const isFr = currentLang === "fr";

  badges.forEach((b, idx) => {
    const a = document.createElement("a");
    a.className = "floating-badge badge-pos-" + (idx % 6);
    a.href = b.targetSection || "#skills";
    a.onclick = (e) => handleBadgeClick(e, b);

    const iconName = b.icon || "cpu";
    a.innerHTML = `
          <i data-lucide="${iconName}" class="u-render-1"></i>
          <div>
            <div class="badge-cat u-render-2">${isFr && b.categoryFr ? b.categoryFr : b.category}</div>
            <div class="badge-title u-render-3">${isFr && b.titleFr ? b.titleFr : b.title}</div>
          </div>
          <i data-lucide="arrow-up-right" class="badge-arrow u-render-4"></i>
        `;
    container.appendChild(a);
  });
}

function handleBadgeClick(e, badge) {
  e.preventDefault();
  const target = badge.targetSection || "#skills";
  const el = document.querySelector(target);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (badge.targetId) {
      setTimeout(() => {
        const p = (data.projects || []).find((x) => x.id === badge.targetId);
        if (p) openProjectModal(p);
      }, 600);
    } else {
      el.style.transition = "box-shadow 0.4s ease";
      el.style.boxShadow = "0 0 35px var(--primary-glow)";
      setTimeout(() => {
        el.style.boxShadow = "";
      }, 1600);
    }
  }
}

// Key Facts (5 Professional Summary items)
function renderKeyFactsSummary() {
  const list = document.getElementById("keyFactsList");
  list.innerHTML = "";
  const items = data.professionalSummary || [];
  const isFr = currentLang === "fr";

  items.forEach((it) => {
    const row = document.createElement("div");
    row.className = "fact-item";
    row.innerHTML = `
          <div class="fact-icon">
            <i data-lucide="${it.icon || "award"}" class="u-render-5"></i>
          </div>
          <div>
            <div class="fact-label">${isFr && it.labelFr ? it.labelFr : it.label}</div>
            <div class="fact-value">${isFr && it.valueFr ? it.valueFr : it.value}</div>
          </div>
        `;
    list.appendChild(row);
  });
}

// Categorized skills
function renderCategorizedSkills() {
  const container = document.getElementById("skillsContainer");
  container.innerHTML = "";
  const cats = data.skillsCategories || [];
  const isFr = currentLang === "fr";

  cats.forEach((cat, categoryIndex) => {
    const categoryName =
      isFr && cat.categoryNameFr ? cat.categoryNameFr : cat.categoryName;
    const card = document.createElement("article");
    card.className = "skill-card";
    if (cat.categoryName === "Soft Skills") {
      card.classList.add("skill-card--wide");
    }

    const header = document.createElement("header");
    header.className = "skill-card-header";

    const categoryDot = document.createElement("span");
    categoryDot.className = "skill-category-dot";
    categoryDot.setAttribute("aria-hidden", "true");

    const icon = document.createElement("i");
    icon.dataset.lucide = cat.icon || "workflow";
    icon.className = "skill-card-icon";

    const title = document.createElement("h3");
    title.textContent = categoryName;
    header.append(categoryDot, icon, title);

    const list = document.createElement("ul");
    list.className = "skill-chips";
    list.setAttribute("aria-label", categoryName);

    (cat.skills || []).forEach((sk, skillIndex) => {
      const label = isFr && sk.nameFr ? sk.nameFr : sk.name;
      const description = isFr && sk.descFr ? sk.descFr : sk.desc;
      const badge = isFr && sk.badgeFr ? sk.badgeFr : sk.badge;
      const chip = document.createElement("li");
      chip.className = "skill-chip";
      chip.style.setProperty("--chip-index", skillIndex);
      chip.title = description || "";

      const name = document.createElement("span");
      name.className = "skill-chip-name";
      name.textContent = label;
      chip.appendChild(name);

      if (badge) {
        const badgeTag = document.createElement("span");
        badgeTag.className = "skill-badge";
        badgeTag.textContent = badge;
        chip.appendChild(badgeTag);
      }

      if (description) {
        const accessibleDescription = document.createElement("span");
        accessibleDescription.className = "u-visually-hidden skill-chip-description";
        accessibleDescription.textContent = description;
        chip.appendChild(accessibleDescription);
      }

      list.appendChild(chip);
    });

    card.append(header, list);
    card.style.setProperty("--card-index", categoryIndex);
    container.appendChild(card);
  });
}

// Projects
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = "";
  const list = data.projects || [];
  const isFr = currentLang === "fr";

  list.forEach((p) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.onclick = () => openProjectModal(p);

    let tagsHtml = "";
    (p.technologies || []).forEach((t) => {
      tagsHtml += `<span class="project-tag">${t}</span>`;
    });

    const bannerMarkup = p.imageUrl
      ? `
          <div class="project-header-banner has-custom-image" style="background-image: url('${p.imageUrl}');">
            <span class="project-img-pill"><i data-lucide="image" class="project-preview-icon"></i> ${isFr ? "Aperçu" : "Preview"}</span>
          </div>
        `
      : `
          <div class="project-header-banner">
            <i data-lucide="sparkles"></i>
          </div>
        `;

    card.innerHTML = `
          ${bannerMarkup}
          <div class="project-card-body">
            <div class="project-category">${isFr && p.categoryFr ? p.categoryFr : p.category}</div>
            <h3 class="project-title">${isFr && p.nameFr ? p.nameFr : p.name}</h3>
            <p class="project-desc">${isFr && p.shortDescriptionFr ? p.shortDescriptionFr : p.shortDescription}</p>
            <div class="project-tags">${tagsHtml}</div>
            <div class="project-footer">
              <span class="u-render-7">${isFr && p.metricFr ? p.metricFr : p.metric}</span>
              <span class="u-render-8">
                ${isFr ? "Voir" : "Explore"} <i data-lucide="arrow-right" class="u-render-9"></i>
              </span>
            </div>
          </div>
        `;
    grid.appendChild(card);
  });
}

function openProjectModal(p) {
  const isFr = currentLang === "fr";
  const body = document.getElementById("modalBody");
  let tagsHtml = "";
  (p.technologies || []).forEach(
    (t) => (tagsHtml += `<span class="project-tag u-render-10">${t}</span>`),
  );

  const modalImageMarkup = p.imageUrl
    ? `
        <div class="u-render-11">
          <img src="${p.imageUrl}" alt="${p.name}" class="u-render-12">
        </div>
      `
    : "";

  body.innerHTML = `
        ${modalImageMarkup}
        <span class="project-category">${isFr && p.categoryFr ? p.categoryFr : p.category}</span>
        <h2 class="u-render-13">${isFr && p.nameFr ? p.nameFr : p.name}</h2>
        <p class="u-render-14">
          ${isFr && p.overviewFr ? p.overviewFr : p.overview || p.shortDescription}
        </p>
        <div class="project-modal-tech">
          <h4 class="u-render-15">${isFr ? "Technologies utilisées" : "Technologies & Tools"}</h4>
          <div class="u-render-16">${tagsHtml}</div>
        </div>
        ${
          p.liveDemo
            ? `
          <a href="${p.liveDemo}" target="_blank" class="btn btn-primary project-modal-demo">
            <span>${isFr ? "Voir la démo" : "Launch Live Demo"}</span>
            <i data-lucide="external-link" class="u-render-17"></i>
          </a>
        `
            : ""
        }
      `;
  document.getElementById("projectModal").classList.add("open");
  lucide.createIcons();
}

function closeProjectModal(e) {
  if (
    !e ||
    e.target === document.getElementById("projectModal") ||
    e.target.classList.contains("modal-close-btn")
  ) {
    document.getElementById("projectModal").classList.remove("open");
  }
}

// Experience & Education
function renderExperience() {
  const container = document.getElementById("experienceTimeline");
  container.innerHTML = "";
  const list = data.experience || [];
  const isFr = currentLang === "fr";

  list.forEach((ex) => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    item.innerHTML = `
          <div class="timeline-marker"></div>
          <div class="timeline-card">
            <span class="u-render-18">${isFr && ex.startDateFr ? ex.startDateFr : ex.startDate} - ${isFr && ex.endDateFr ? ex.endDateFr : ex.endDate}</span>
            <h3 class="u-render-19">${isFr && ex.jobTitleFr ? ex.jobTitleFr : ex.jobTitle}</h3>
            <div class="u-render-20">${isFr && ex.companyFr ? ex.companyFr : ex.company} (${isFr && ex.employmentTypeFr ? ex.employmentTypeFr : ex.employmentType})</div>
            <p class="u-render-21">${isFr && ex.responsibilitiesFr ? ex.responsibilitiesFr : ex.responsibilities}</p>
          </div>
        `;
    container.appendChild(item);
  });
}

function renderEducation() {
  const eduCard = document.getElementById("educationMainCard");
  const certsList = document.getElementById("certificationsList");
  eduCard.innerHTML = "";
  certsList.innerHTML = "";
  const isFr = currentLang === "fr";

  const edu = (data.education || [])[0] || {};
  eduCard.innerHTML = `
        <div class="key-facts-card education-card">
          <span class="project-category">${isFr ? "Diplôme" : "Higher Degree"}</span>
          <h3 class="u-render-22">${isFr && edu.degreeFr ? edu.degreeFr : edu.degree}</h3>
          <p class="u-render-23">${isFr && edu.institutionFr ? edu.institutionFr : edu.institution}</p>
          <div class="u-render-24">
            ${isFr && edu.gpaFr ? edu.gpaFr : edu.gpa} • ${isFr && edu.graduationDateFr ? edu.graduationDateFr : edu.graduationDate}
          </div>
          <p class="u-render-25">${isFr && edu.highlightsFr ? edu.highlightsFr : edu.highlights}</p>
        </div>
      `;

  (data.courses || []).forEach((c) => {
    const item = document.createElement(c.fileUrl ? "a" : "div");
    item.className = "cert-card";
    if (c.fileUrl) {
      item.href = c.fileUrl;
      item.setAttribute("download", c.fileUrl.split("/").pop());
      item.title = isFr
        ? "Télécharger le certificat (PDF)"
        : "Download certificate (PDF)";
    }
    item.innerHTML = `
          <div class="cert-icon"><i data-lucide="award"></i></div>
          <div>
            <h4 class="u-render-26">${c.name}</h4>
            <p class="u-render-27">${c.platform} • ${isFr && c.completionDateFr ? c.completionDateFr : c.completionDate}</p>
          </div>
${c.fileUrl ? '<i data-lucide="download" class="cert-dl"></i>' : ""}
        `;
    certsList.appendChild(item);
  });
}
