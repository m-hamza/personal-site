import { escapeHtml } from "./utils.js";

const PHONE_IDS = new Set(["phone", "whatsapp", "landline"]);

function channelPlaces(channel) {
    if (channel.places?.length) return channel.places;
    const places = ["tab"];
    if (channel.showEverywhere) places.push("dock", "footer");
    return places;
}

function hasPlace(channel, place) {
    return channelPlaces(channel).includes(place);
}

function formatContactValue(item) {
    if (PHONE_IDS.has(item.id)) {
        return `<span class="ltr-text" dir="ltr">${escapeHtml(item.value)}</span>`;
    }
    return escapeHtml(item.value);
}

export function getHeroSocialLinks(channels = []) {
    return channels
        .filter((channel) => hasPlace(channel, "hero"))
        .map((channel) => ({
            name: channel.label,
            link: channel.href,
            icon: channel.icon,
        }));
}

export function renderSocialLinks(container, channels = []) {
    container.innerHTML = getHeroSocialLinks(channels).map((social) => `
        <a href="${social.link}" target="_blank" rel="noopener noreferrer" aria-label="${social.name}">
            <i class="${social.icon}"></i>
        </a>
    `).join("");
}

export function renderContactList(container, channels = []) {
    const items = channels.filter((channel) => hasPlace(channel, "tab"));
    container.innerHTML = items.map((item) => `
        <div class="contact-item">
            <i class="${item.icon}"></i>
            <div class="contact-item-body">
                <span class="contact-label">${escapeHtml(item.label)}</span>
                <a href="${item.href}" ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ""}>${formatContactValue(item)}</a>
            </div>
            <button type="button" class="contact-copy" data-copy="${item.value.replace(/"/g, '&quot;')}" aria-label="copy">
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

export function renderFooterContacts(container, channels = []) {
    const items = channels.filter((channel) => hasPlace(channel, "footer"));
    container.innerHTML = items.map((item) => `
        <a href="${item.href}" ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ""}>
            <i class="${item.icon}"></i> ${escapeHtml(item.label)}
        </a>
    `).join("");
}

export function renderContactDock(channels = []) {
    let dock = document.getElementById("contactDock");
    if (!dock) {
        dock = document.createElement("nav");
        dock.id = "contactDock";
        dock.className = "contact-dock";
        dock.setAttribute("aria-label", "contacts");
        document.body.appendChild(dock);
    }

    const items = channels.filter((channel) => hasPlace(channel, "dock"));
    dock.innerHTML = items.map((item) => `
        <a href="${item.href}" data-id="${item.id}" title="${item.label}" ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ""}>
            <i class="${item.icon}"></i>
        </a>
    `).join("");
}
