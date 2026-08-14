export function initTheme(toggleEl) {
    const apply = (isDark) => {
        document.body.classList.toggle("dark-mode", isDark);
        const icon = toggleEl.querySelector("i");
        if (icon) {
            icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
        }
        toggleEl.setAttribute("aria-label", isDark ? "Light mode" : "Dark mode");
    };

    apply(localStorage.getItem("darkMode") === "true");

    toggleEl.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", isDark);
        apply(isDark);
    });
}
