export function initTabs(nav, panesRoot, options = {}) {
    const buttons = nav.querySelectorAll("[data-tab]");
    const panes = panesRoot.querySelectorAll(".tab-pane");
    const useHash = options.hash !== false;

    function activateTab(tabId) {
        buttons.forEach((item) => item.classList.toggle("active", item.dataset.tab === tabId));
        panes.forEach((pane) => pane.classList.toggle("active", pane.id === `${tabId}-tab`));
        if (useHash) {
            history.replaceState(null, "", `#${tabId}`);
        }
    }

    if (useHash) {
        const hash = location.hash.slice(1);
        if (hash && [...buttons].some((btn) => btn.dataset.tab === hash)) {
            activateTab(hash);
        }
    }

    buttons.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            if (btn.tagName === "A") return;
            event.preventDefault();
            activateTab(btn.dataset.tab);
        });
    });
}
