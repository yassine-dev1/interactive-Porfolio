/* Keyboard-first command palette for the portfolio. */

const commandPalette = document.getElementById("commandPalette");
const paletteSearch = document.getElementById("paletteSearch");
const paletteResults = document.getElementById("paletteResults");
const paletteOpener = document.getElementById("commandPaletteOpen");
const paletteCloser = document.getElementById("commandPaletteClose");
let paletteCommands = [];
let paletteSelection = 0;
let palettePreviousFocus = null;
let palettePreviousOverflow = "";
let paletteCloseTimer = 0;
let paletteToastTimer = 0;
function commandText(key) {
  return I18N[currentLang][key] || I18N.en[key] || key;
}

function buildPaletteCommands() {
  const sections = [
    ["hero", "nav_home"], ["about", "nav_about"], ["skills", "nav_skills"],
    ["projects", "nav_projects"], ["experience", "nav_experience"],
    ["education", "nav_education"], ["contact", "nav_contact"],
  ];
  const commands = sections.map(([id, key]) => ({
    id: `section-${id}`,
    label: commandText(key),
    run: () => document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    }),
  }));
  const personal = data.personal || {};
  commands.push(
    { id: "cv-fr", label: commandText("palette_cv_fr"), run: () => triggerDownload(personal.cvUrl || "resumes/Resume_Yassine_Eljarjini_FR.pdf", personal.cvFileName || "Resume_Yassine_Eljarjini_FR.pdf") },
    { id: "cv-en", label: commandText("palette_cv_en"), run: () => triggerDownload(personal.cvUrlEn || "resumes/Resume_Yassine_Eljarjini_EN.pdf", personal.cvFileNameEn || "Resume_Yassine_Eljarjini_EN.pdf") },
    { id: "linkedin", label: commandText("palette_linkedin"), run: () => window.open(data.contact?.linkedin, "_blank", "noopener,noreferrer") },
    { id: "github", label: commandText("palette_github"), run: () => window.open(data.contact?.github, "_blank", "noopener,noreferrer") },
    { id: "copy-email", label: commandText("palette_copy_email"), run: copyPaletteEmail },
    { id: "language", label: commandText("palette_language"), run: toggleLanguage },
    { id: "theme", label: commandText("palette_theme"), run: toggleTheme },
  );
  return commands;
}
function normalizeCommand(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
}
function renderPaletteResults() {
  paletteCommands = buildPaletteCommands();
  const query = normalizeCommand(paletteSearch.value.trim());
  const matches = paletteCommands.filter((command) => normalizeCommand(command.label).includes(query));
  paletteSelection = 0;
  paletteResults.replaceChildren();
  if (!matches.length) {
    const empty = document.createElement("p");
    empty.className = "command-palette__empty";
    empty.textContent = commandText("palette_empty");
    paletteResults.appendChild(empty);
    paletteSearch.removeAttribute("aria-activedescendant");
    return;
  }
  matches.forEach((command, index) => {
    const option = document.createElement("div");
    option.id = `palette-option-${command.id}`;
    option.className = "command-palette__option";
    option.setAttribute("role", "option");
    option.setAttribute("aria-selected", String(index === paletteSelection));
    option.textContent = command.label;
    option.addEventListener("mousemove", () => selectPaletteOption(index, false), { passive: true });
    option.addEventListener("click", () => runPaletteCommand(command));
    paletteResults.appendChild(option);
  });
  paletteSearch.setAttribute("aria-activedescendant", `palette-option-${matches[paletteSelection].id}`);
  paletteCommands = matches;
}
function selectPaletteOption(index, scroll = true) {
  const options = [...paletteResults.querySelectorAll('[role="option"]')];
  if (!options.length) return;
  paletteSelection = (index + options.length) % options.length;
  options.forEach((option, optionIndex) => {
    const selected = optionIndex === paletteSelection;
    option.setAttribute("aria-selected", String(selected));
    if (selected && scroll) option.scrollIntoView({ block: "nearest" });
  });
  paletteSearch.setAttribute("aria-activedescendant", options[paletteSelection].id);
}
function openCommandPalette() {
  if (!commandPalette.hidden) {
    if (commandPalette.hasAttribute("aria-hidden")) {
      window.clearTimeout(paletteCloseTimer);
      commandPalette.removeAttribute("aria-hidden");
      commandPalette.classList.add("is-open");
      paletteSearch.setAttribute("aria-expanded", "true");
      paletteOpener.setAttribute("aria-expanded", "true");
      paletteSearch.focus();
    }
    return;
  }
  window.clearTimeout(paletteCloseTimer);
  palettePreviousFocus = document.activeElement;
  palettePreviousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  commandPalette.hidden = false;
  paletteOpener.setAttribute("aria-expanded", "true");
  paletteSearch.value = "";
  renderPaletteResults();
  window.requestAnimationFrame(() => commandPalette.classList.add("is-open"));
  paletteSearch.focus();
}
function closeCommandPalette() {
  if (commandPalette.hidden) return;
  commandPalette.classList.remove("is-open");
  commandPalette.setAttribute("aria-hidden", "true");
  paletteSearch.setAttribute("aria-expanded", "false");
  paletteOpener.setAttribute("aria-expanded", "false");
  document.body.style.overflow = palettePreviousOverflow;
  paletteCloseTimer = window.setTimeout(() => {
    commandPalette.hidden = true;
    commandPalette.removeAttribute("aria-hidden");
  }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 150);
  (palettePreviousFocus?.isConnected ? palettePreviousFocus : paletteOpener).focus();
}
function runPaletteCommand(command) {
  closeCommandPalette();
  command.run();
}
function showPaletteToast(message) {
  const toast = document.getElementById("paletteToast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(paletteToastTimer);
  paletteToastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}
async function copyPaletteEmail() {
  const email = data.contact?.email || "";
  try {
    await navigator.clipboard.writeText(email);
    showPaletteToast(commandText("palette_email_copied"));
  } catch (error) {
    const field = document.createElement("textarea");
    field.value = email;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    showPaletteToast(commandText(copied ? "palette_email_copied" : "palette_email_failed"));
  }
}
function updateCommandPaletteLanguage() {
  const dict = I18N[currentLang];
  paletteOpener.setAttribute("aria-label", dict.palette_open);
  paletteCloser.setAttribute("aria-label", dict.palette_close);
  paletteSearch.setAttribute("aria-label", dict.palette_title);
  if (!commandPalette.hidden) renderPaletteResults();
}
paletteOpener.addEventListener("click", openCommandPalette);
paletteCloser.addEventListener("click", closeCommandPalette);
commandPalette.addEventListener("click", (event) => {
  if (event.target === commandPalette) closeCommandPalette();
});
paletteSearch.addEventListener("input", renderPaletteResults);
paletteSearch.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    selectPaletteOption(paletteSelection + 1);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    selectPaletteOption(paletteSelection - 1);
  } else if (event.key === "Enter") {
    event.preventDefault();
    const command = paletteCommands[paletteSelection];
    if (command) runPaletteCommand(command);
  }
});
document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openCommandPalette();
    return;
  }
  if (commandPalette.hidden) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeCommandPalette();
  } else if (event.key === "Tab") {
    const focusable = [paletteCloser, paletteSearch];
    const index = focusable.indexOf(document.activeElement);
    if (event.shiftKey && index <= 0) {
      event.preventDefault();
      focusable.at(-1).focus();
    } else if (!event.shiftKey && index === focusable.length - 1) {
      event.preventDefault();
      focusable[0].focus();
    }
  }
});
