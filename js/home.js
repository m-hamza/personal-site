import { resolveAsset } from "./config.js";
import { applyDocumentLang, loadData, onLangChange, renderLangSwitch, getSavedLang } from "./i18n.js";
import { initTheme } from "./theme.js";
import { renderContactDock, renderContactList, renderFooterContacts, renderSocialLinks } from "./contacts.js";
import { initTabs } from "./tabs.js";
import { escapeHtml, hideLoading, initLazyLoad, snippet } from "./utils.js";

function renderNav(nav, data) {
    nav.innerHTML = data.ui.nav.map((item, index) => {
        const active = index === 0 && item.type === "tab" ? "active" : "";
        if (item.type === "link") {
            return `
                <a class="tab-btn" href="${resolveAsset(item.href)}">
                    <i class="${item.icon}"></i>
                    <span>${item.label}</span>
                </a>
            `;
        }
        return `
            <button class="tab-btn ${active}" data-tab="${item.id}">
                <i class="${item.icon}"></i>
                <span>${item.label}</span>
            </button>
        `;
    }).join("");
}

function renderProjects(container, sites, ui) {
    container.innerHTML = sites.map((site) => `
        <div class="project-card" data-bs-toggle="modal" data-bs-target="#siteModal"
             data-name="${escapeHtml(site.name)}" data-description="${escapeHtml(site.description)}" data-link="${escapeHtml(site.link)}">
            <h3>${escapeHtml(site.name)}</h3>
            <p>${escapeHtml(snippet(site.description))}</p>
        </div>
    `).join("");

    document.getElementById("siteLink").innerHTML = `<i class="fas fa-external-link-alt"></i> ${ui.visitSite}`;
}

function renderServices(container, services = []) {
    container.innerHTML = services.map((service) => `
        <article class="service-card">
            <i class="${service.icon}"></i>
            <h3>${escapeHtml(service.title)}</h3>
            <p>${escapeHtml(service.description)}</p>
            ${service.tags ? `<div class="tag-list">${service.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
        </article>
    `).join("");
}

function renderHeroActions(container, ui) {
    container.innerHTML = `
        <a class="btn-primary" href="${resolveAsset(ui.cvHref)}"><i class="fas fa-file-alt"></i> ${ui.viewCv}</a>
        <a class="btn-outline" href="#contact-tab" data-scroll-tab="contact"><i class="fas fa-paper-plane"></i> ${ui.hireMe}</a>
    `;
    container.querySelector("[data-scroll-tab]")?.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector('[data-tab="contact"]')?.click();
        document.getElementById("contact-tab")?.scrollIntoView({ behavior: "smooth" });
    });
}

async function renderPage() {
    const data = await loadData();
    applyDocumentLang(data);

    document.getElementById("brandName").textContent = data.profile.name;
    document.getElementById("name").textContent = data.profile.name;
    document.getElementById("headline").textContent = data.profile.headline;
    document.getElementById("description").textContent = data.profile.tagline;
    document.querySelector(".profile-image").src = resolveAsset(data.profile.photo);
    document.querySelector(".profile-image").alt = data.profile.name;

    renderLangSwitch(document.getElementById("langSwitch"), getSavedLang(), data.ui.languages);
    renderHeroActions(document.getElementById("heroActions"), data.ui);
    renderSocialLinks(document.getElementById("socialLinks"), data.social_links);
    renderNav(document.getElementById("tabNav"), data);
    initTabs(document.getElementById("tabNav"), document.querySelector(".tab-content"));
    renderProjects(document.getElementById("siteList"), data.sites, data.ui);
    renderServices(document.getElementById("servicesList"), data.services);
    document.getElementById("aboutContent").innerHTML = `<p>${data.about}</p>`;
    renderContactList(document.getElementById("contactContent"), data.contacts);
    renderContactDock(data.contacts);
    renderFooterContacts(document.getElementById("footerContacts"), data.contacts);
    document.getElementById("footerCopy").textContent = data.ui.footer.replace("{year}", String(new Date().getFullYear()));
    hideLoading();
}

document.addEventListener("DOMContentLoaded", async () => {
    initTheme(document.getElementById("themeToggle"));
    initLazyLoad();

    document.getElementById("siteModal").addEventListener("show.bs.modal", (event) => {
        const card = event.relatedTarget;
        document.getElementById("siteModalLabel").textContent = card.dataset.name;
        document.getElementById("siteModalBody").textContent = card.dataset.description;
        document.getElementById("siteLink").href = card.dataset.link;
    });

    onLangChange(() => renderPage());
    try {
        await renderPage();
    } catch (error) {
        console.error(error);
        hideLoading();
    }
});
