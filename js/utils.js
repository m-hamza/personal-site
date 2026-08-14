export function initLazyLoad() {
    const lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("loaded");
                lazyLoadObserver.unobserve(entry.target);
            }
        });
    });
    document.querySelectorAll(".lazy-load").forEach((img) => lazyLoadObserver.observe(img));
}

export function hideLoading() {
    const loadingIndicator = document.getElementById("loadingIndicator");
    if (loadingIndicator) {
        setTimeout(() => loadingIndicator.classList.add("hidden"), 250);
    }
}

export function escapeHtml(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

export function snippet(text = "", size = 90) {
    return text.length > size ? `${text.slice(0, size)}...` : text;
}
