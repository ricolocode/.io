const root = document.documentElement;
const toggle = document.getElementById("settings-toggle");
const panel = document.getElementById("settings-panel");
const swatches = document.querySelectorAll(".swatch");
const modeButtons = document.querySelectorAll("[data-mode]");

// Markiert die aktuell gewählte Farbe und den gewählten Modus
function updateUI() {
  const isDark = root.classList.contains("dark");
  swatches.forEach((b) => {
    b.setAttribute("aria-pressed", b.dataset.farbe === root.dataset.theme);
  });
  modeButtons.forEach((b) => {
    b.setAttribute("aria-pressed", (b.dataset.mode === "dark") === isDark);
  });
}

function closePanel() {
  panel.hidden = true;
  toggle.setAttribute("aria-expanded", "false");
}

// Menü öffnen und schließen
toggle.addEventListener("click", () => {
  panel.hidden = !panel.hidden;
  toggle.setAttribute("aria-expanded", String(!panel.hidden));
});

// Farbe wählen
swatches.forEach((b) => {
  b.addEventListener("click", () => {
    root.dataset.theme = b.dataset.farbe;
    localStorage.setItem("farbe", b.dataset.farbe);
    updateUI();
  });
});

// Aktuelle Seite in der Navigation hervorheben
const seite = location.pathname.split("/").pop().replace(".html", "") || "index";

document.querySelectorAll("nav a").forEach((link) => {
  const ziel = link.getAttribute("href").replace(".html", "");
  link.classList.toggle("aktiv", ziel === seite);
});

// Modus wählen
modeButtons.forEach((b) => {
  b.addEventListener("click", () => {
    const dark = b.dataset.mode === "dark";
    root.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
    updateUI();
  });
});

// Menü schließen: Klick daneben oder Escape
document.addEventListener("click", (e) => {
  if (!e.target.closest(".einstellungen")) closePanel();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePanel();
});

updateUI();