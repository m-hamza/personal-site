const STORAGE_KEY = "darkMode";

function applyTheme(isDark, toggleEl = document.getElementById("themeToggle")) {
    document.documentElement.classList.toggle("dark-mode", isDark);
    if (!toggleEl) return;

    const icon = toggleEl.querySelector("i");
    if (icon) {
        icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
    }
    toggleEl.setAttribute("aria-label", isDark ? "Light mode" : "Dark mode");
}

let clickBound = false;

export function initTheme(toggleEl) {
    applyTheme(localStorage.getItem(STORAGE_KEY) === "true", toggleEl);

    if (clickBound) return;
    clickBound = true;

    document.addEventListener("click", (event) => {
        const button = event.target.closest("#themeToggle");
        if (!button) return;

        const isDark = !document.documentElement.classList.contains("dark-mode");
        localStorage.setItem(STORAGE_KEY, isDark);
        applyTheme(isDark, button);
    });
}
