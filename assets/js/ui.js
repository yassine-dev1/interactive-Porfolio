/* Theme, navigation, CV and contact interactions. */

let scrollMotionObserver = null;
let motionPreferenceQuery = null;
let motionPreferenceListenerAttached = false;
let sectionNavigationObserver = null;
let heroCounterObserver = null;
let heroCountersStarted = false;
let timelineMarkerObserver = null;
let readingProgressFrame = 0;

function updateReadingProgress() {
  if (readingProgressFrame) return;
  readingProgressFrame = window.requestAnimationFrame(() => {
    readingProgressFrame = 0;
    const bar = document.getElementById("readingProgress");
    if (!bar) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;

    const timeline = document.getElementById("experienceTimeline");
    if (timeline) {
      const rect = timeline.getBoundingClientRect();
      const revealLine = window.innerHeight * 0.78;
      const timelineProgress = Math.min(1, Math.max(0, (revealLine - rect.top) / rect.height));
      timeline.style.setProperty("--timeline-progress", String(timelineProgress));
    }
  });
}

window.addEventListener("scroll", updateReadingProgress, { passive: true });
window.addEventListener("resize", updateReadingProgress, { passive: true });

function initializeProjectCardEffects(card) {
  if (!window.matchMedia(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  ).matches) return;

  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;

  const update = () => {
    frame = 0;
    const rect = card.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (pointerX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (pointerY - rect.top) / rect.height));
    card.style.setProperty("--mx", `${x * rect.width}px`);
    card.style.setProperty("--my", `${y * rect.height}px`);
    card.style.setProperty("--tilt-x", `${(0.5 - y) * 8}deg`);
    card.style.setProperty("--tilt-y", `${(x - 0.5) * 8}deg`);
  };

  card.addEventListener("pointerenter", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    card.classList.add("is-pointer-active");
  }, { passive: true });
  card.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (!frame) frame = window.requestAnimationFrame(update);
  }, { passive: true });
  const reset = () => {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    card.classList.remove("is-pointer-active");
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  };
  card.addEventListener("pointerleave", reset, { passive: true });
  card.addEventListener("pointercancel", reset, { passive: true });
}

function initializeTimelineDrawing() {
  if (timelineMarkerObserver) timelineMarkerObserver.disconnect();
  const timeline = document.getElementById("experienceTimeline");
  if (!timeline) return;

  const markers = [...timeline.querySelectorAll(".timeline-marker")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) {
    timeline.style.setProperty("--timeline-progress", "1");
    markers.forEach((marker) => marker.classList.add("is-lit"));
    return;
  }

  markers.forEach((marker) => marker.classList.remove("is-lit"));
  updateReadingProgress();
  try {
    timelineMarkerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-lit");
        timelineMarkerObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -30% 0px", threshold: 0 });
    markers.forEach((marker) => timelineMarkerObserver.observe(marker));
  } catch (error) {
    console.warn("Timeline marker observation is unavailable.", error);
    markers.forEach((marker) => marker.classList.add("is-lit"));
  }
}

function animateHeroStatCounters(grid) {
  const numbers = [...grid.querySelectorAll(".stat-number[data-count]")];
  const setFinalValues = () => {
    numbers.forEach((number) => {
      number.textContent = number.dataset.count;
    });
  };

  if (heroCountersStarted) {
    setFinalValues();
    return;
  }

  const begin = () => {
    if (heroCountersStarted) return;
    heroCountersStarted = true;
    const startTime = performance.now();
    const duration = 900;
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      numbers.forEach((number) => {
        number.textContent = String(Math.round(Number(number.dataset.count) * eased));
      });
      if (progress < 1) window.requestAnimationFrame(tick);
      else setFinalValues();
    };
    window.requestAnimationFrame(tick);
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroCountersStarted = true;
    setFinalValues();
    return;
  }

  if (heroCounterObserver) heroCounterObserver.disconnect();
  try {
    heroCounterObserver = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      heroCounterObserver.disconnect();
      begin();
    }, { threshold: 0.25 });
    heroCounterObserver.observe(grid);
  } catch (error) {
    console.warn("Hero stat animation is unavailable; showing final values.", error);
    heroCountersStarted = true;
    setFinalValues();
  }
}

function initializeMotion() {
  if (scrollMotionObserver) scrollMotionObserver.disconnect();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionPreferenceQuery = motionPreferenceQuery || reduceMotion;
  if (!motionPreferenceListenerAttached) {
    const handleMotionPreferenceChange = () => initializeMotion();
    if (motionPreferenceQuery.addEventListener) {
      motionPreferenceQuery.addEventListener(
        "change",
        handleMotionPreferenceChange,
      );
    } else if (motionPreferenceQuery.addListener) {
      motionPreferenceQuery.addListener(handleMotionPreferenceChange);
    }
    motionPreferenceListenerAttached = true;
  }
  document.documentElement.classList.toggle(
    "motion-reduced",
    reduceMotion.matches,
  );

  const revealTargets = document.querySelectorAll(
    ".hero-content, .hero-visual-wrap, .section-title-wrap, .about-grid, .skills-categories-grid, .projects-grid, .timeline, .edu-cert-grid, .contact-grid",
  );
  const staggerTargets = document.querySelectorAll(
    ".skills-categories-grid > *, .projects-grid > *, .certifications-list > *",
  );
  const targets = [...revealTargets, ...staggerTargets];

  targets.forEach((element) => {
    element.classList.remove("is-visible");
    element.classList.add("motion-reveal");
  });
  document
    .querySelectorAll(
      ".skills-categories-grid, .projects-grid, .certifications-list",
    )
    .forEach((grid) => {
      [...grid.children].forEach((element, index) => {
        element.style.setProperty(
          "--motion-delay",
          `${Math.min(index, 6) * 70}ms`,
        );
      });
    });

  if (reduceMotion.matches) {
    targets.forEach((element) => {
      element.classList.add("is-visible");
      element.style.removeProperty("--motion-delay");
    });
    initializeTimelineDrawing();
    return;
  }

  scrollMotionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        scrollMotionObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  targets.forEach((element) => scrollMotionObserver.observe(element));
  initializeTimelineDrawing();
}

function initializeSectionNavigation() {
  if (sectionNavigationObserver) sectionNavigationObserver.disconnect();
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll('.nav-link[href^="#"]')];
  const headerHeight = document.querySelector(".site-header").offsetHeight;

  sectionNavigationObserver = new IntersectionObserver(
    (entries) => {
      const activeEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!activeEntry) return;

      links.forEach((link) => {
        const active = link.getAttribute("href") === `#${activeEntry.target.id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    },
    {
      rootMargin: `-${headerHeight}px 0px -65% 0px`,
      threshold: [0, 0.1, 0.25, 0.5],
    },
  );

  sections.forEach((section) => sectionNavigationObserver.observe(section));
}

function startThemeTransition() {
  document.documentElement.classList.add("is-theme-switching");
  window.setTimeout(
    () => document.documentElement.classList.remove("is-theme-switching"),
    260,
  );
}

function startLanguageTransition() {
  document.body.classList.add("is-language-switching");
  window.setTimeout(
    () => document.body.classList.remove("is-language-switching"),
    220,
  );
}

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains("dark");
  startThemeTransition();
  if (isDark) {
    html.classList.remove("dark");
    html.classList.add("light");
    localStorage.setItem("portfolio_theme", "light");
  } else {
    html.classList.remove("light");
    html.classList.add("dark");
    localStorage.setItem("portfolio_theme", "dark");
  }
  lucide.createIcons();
}

function toggleMobileMenu() {
  document.getElementById("mobileDrawer").classList.toggle("open");
}
function closeMobileMenu() {
  document.getElementById("mobileDrawer").classList.remove("open");
}

async function fetchLatestFromCloud() {
  if (!ENABLE_REMOTE_DATA || !CLOUD_URL) return;
  try {
    const res = await fetch(CLOUD_URL, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      if (
        json &&
        json.fields &&
        json.fields.payload &&
        json.fields.payload.stringValue
      ) {
        const parsed = JSON.parse(json.fields.payload.stringValue);
        if (parsed && parsed.personal) {
          data = parsed;
          localStorage.setItem(
            "portfolio_cache",
            JSON.stringify({ version: DATA_VERSION, data }),
          );
          renderAll();
          initializeMotion();
        }
      }
    }
  } catch (err) {
    // Cloud synchronization is optional; keep the local portfolio data active.
  }
}

function handleContactSubmit(e) {
  e.preventDefault();
  const f = [...e.target.querySelectorAll("input,textarea")].map(
    (x) => x.value,
  );
  const to = (data.contact && data.contact.email) || "";
  const body = encodeURIComponent(
    (f[2] || "") + "\n\n— " + (f[0] || "") + " (" + (f[1] || "") + ")",
  );
  const status = document.getElementById("contactSubmitStatus");
  const statusEmail = document.getElementById("contactStatusEmail");
  statusEmail.textContent = to;
  statusEmail.href = `mailto:${to}`;
  status.hidden = false;
  document.getElementById("copyContactEmail").hidden = false;
  e.target.reset();
  window.location.href =
    "mailto:" +
    to +
    "?subject=" +
    encodeURIComponent("Contact portfolio – " + (f[0] || "")) +
    "&body=" +
    body;
}

async function copyContactEmail() {
  const email = (data.contact && data.contact.email) || "";
  try {
    await navigator.clipboard.writeText(email);
  } catch (err) {
    const field = document.createElement("textarea");
    field.value = email;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    document.execCommand("copy");
    field.remove();
  }
  const button = document.getElementById("copyContactEmail");
  button.textContent = I18N[currentLang].form_email_copied;
  window.setTimeout(() => applyLanguage(currentLang), 1800);
}

async function triggerDownload(url, fileName) {
  if (/^https?:\/\//i.test(url)) {
    window.open(url, "_blank");
    return;
  }

  try {
    let blob;
    if (
      url.startsWith("data:application/pdf") ||
      url.startsWith("data:;base64")
    ) {
      const [header, encoded] = url.split(",");
      const mime = (header.match(/:(.*?);/) || [])[1] || "application/pdf";
      const binary = atob(encoded);
      const bytes = new Uint8Array(binary.length);
      for (let index = 0; index < binary.length; index += 1) {
        bytes[index] = binary.charCodeAt(index);
      }
      blob = new Blob([bytes], { type: mime });
    } else {
      const response = await fetch(url, { cache: "no-cache" });
      if (!response.ok) throw new Error("Fetch failed");
      blob = new Blob([await response.blob()], { type: "application/pdf" });
    }

    const blobUrl = window.URL.createObjectURL(blob);
    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobUrl;
    tempLink.setAttribute("download", fileName);
    document.body.appendChild(tempLink);
    tempLink.click();
    setTimeout(() => {
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobUrl);
    }, 1000);
  } catch (err) {
    const fallbackLink = document.createElement("a");
    fallbackLink.href = url;
    fallbackLink.setAttribute("download", fileName);
    fallbackLink.target = "_blank";
    document.body.appendChild(fallbackLink);
    fallbackLink.click();
    document.body.removeChild(fallbackLink);
  }
}

async function downloadOfficialCv(e, which) {
  if (e) e.preventDefault();
  closeCvMenu();
  const isEn = which === "en";
  const p = data && data.personal ? data.personal : {};
  const fallbackName =
    (p.fullName ? p.fullName.trim().replace(/\s+/g, "_") : "Candidate") +
    "_CV.pdf";
  const fileName = isEn
    ? p.cvFileNameEn || "Resume_Yassine_Eljarjini_EN.pdf"
    : p.cvFileName || fallbackName;
  const fileUrl = isEn
    ? p.cvUrlEn || "resumes/Resume_Yassine_Eljarjini_EN.pdf"
    : p && p.cvUrl
      ? p.cvUrl
      : "resumes/Resume_Yassine_Eljarjini_FR.pdf";
  await triggerDownload(fileUrl, fileName);
}

function closeCvMenu() {
  const m = document.getElementById("cvMenu");
  if (m) m.classList.remove("open");
  const b = document.getElementById("topCvDownloadBtn");
  if (b) b.setAttribute("aria-expanded", "false");
}
function toggleCvMenu(e) {
  e.stopPropagation();
  const o = document.getElementById("cvMenu").classList.toggle("open");
  document
    .getElementById("topCvDownloadBtn")
    .setAttribute("aria-expanded", String(o));
}
document.addEventListener("click", (e) => {
  if (!e.target.closest("#cvDropdown")) closeCvMenu();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCvMenu();
});

document.addEventListener("DOMContentLoaded", () => {
  init();
  updateReadingProgress();
});
