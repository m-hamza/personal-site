export function renderSocialLinks(container, links = []) {
    container.innerHTML = links.map((social) => `
        <a href="${social.link}" target="_blank" rel="noopener noreferrer" aria-label="${social.name}">
            <i class="${social.icon}"></i>
        </a>
    `).join("");
}

export function renderContactList(container, contacts = []) {
    container.innerHTML = contacts.map((item) => `
        <div class="contact-item">
            <i class="${item.icon}"></i>
            <a href="${item.href}" ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ""}>${item.value}</a>
            <button type="button" class="contact-copy" data-copy="${item.value}" aria-label="copy">
                <i class="fas fa-copy"></i>
            </button>
        </div>
    `).join("");

    container.querySelectorAll("[data-copy]").forEach((btn) => {
        btn.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(btn.dataset.copy);
                btn.querySelector("i").className = "fas fa-check";
                setTimeout(() => {
                    btn.querySelector("i").className = "fas fa-copy";
                }, 1200);
            } catch (error) {
                console.error(error);
            }
        });
    });
}

export function renderFooterContacts(container, contacts = []) {
    const items = contacts.filter((item) => item.showEverywhere);
    container.innerHTML = items.map((item) => `
        <a href="${item.href}" ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ""}>
            <i class="${item.icon}"></i> ${item.label}
        </a>
    `).join("");
}

export function renderContactDock(contacts = []) {
    let dock = document.getElementById("contactDock");
    if (!dock) {
        dock = document.createElement("nav");
        dock.id = "contactDock";
        dock.className = "contact-dock";
        dock.setAttribute("aria-label", "contacts");
        document.body.appendChild(dock);
    }

    const items = contacts.filter((item) => item.showEverywhere);
    dock.innerHTML = items.map((item) => `
        <a href="${item.href}" data-id="${item.id}" title="${item.label}" ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ""}>
            <i class="${item.icon}"></i>
        </a>
    `).join("");
}
