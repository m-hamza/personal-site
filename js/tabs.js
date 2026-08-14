export function initTabs(nav, panesRoot) {
    const buttons = nav.querySelectorAll("[data-tab]");
    const panes = panesRoot.querySelectorAll(".tab-pane");

    buttons.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            if (btn.tagName === "A") return;
            event.preventDefault();
            buttons.forEach((item) => item.classList.remove("active"));
            panes.forEach((pane) => pane.classList.remove("active"));
            btn.classList.add("active");
            const pane = document.getElementById(`${btn.dataset.tab}-tab`);
            if (pane) pane.classList.add("active");
        });
    });
}
