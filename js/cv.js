import { resolveAsset } from "./config.js";
import { applyDocumentLang, getSavedLang, loadData, onLangChange, renderLangSwitch } from "./i18n.js";
import { initTheme } from "./theme.js";
import { renderContactDock, renderFooterContacts } from "./contacts.js";
import { escapeHtml, hideLoading, initLazyLoad } from "./utils.js";

function matchesQuery(item, query) {
    if (!query) return true;
    return JSON.stringify(item).toLowerCase().includes(query.toLowerCase());
}

function renderTags(items = []) {
    return `<div class="tag-list">${items.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("")}</div>`;
}

function renderBars(items = []) {
    return items.map((item) => `
        <div class="skill-bar">
            <div class="label"><span>${escapeHtml(item.name)}</span><span>${escapeHtml(item.level)}</span></div>
            <div class="track"><div class="fill" style="width:${item.percent || 50}%"></div></div>
        </div>
    `).join("");
}

function renderList(items = []) {
    return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderTimeline(items = [], category, query) {
    return items
        .filter((item) => !category || category === "all" || item.category === category)
        .filter((item) => matchesQuery(item, query))
        .map((item) => `
            <article class="timeline-item" data-category="${item.category || ""}">
                <h3>${escapeHtml(item.title)}</h3>
                <div class="timeline-meta">
                    ${escapeHtml(item.organization || "")}
                    ${item.location ? ` · ${escapeHtml(item.location)}` : ""}
                    ${item.period ? ` · ${escapeHtml(item.period)}` : ""}
                </div>
                ${item.summary ? `<p>${escapeHtml(item.summary)}</p>` : ""}
                ${item.highlights?.length ? `<ul>${item.highlights.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>` : ""}
                ${item.link ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.linkLabel || item.link}</a>` : ""}
            </article>
        `).join("") || `<p class="timeline-meta">—</p>`;
}

function renderCards(items = [], query) {
    return `<div class="cv-card-grid">${items.filter((item) => matchesQuery(item, query)).map((item) => `
        <article class="cv-mini-card">
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description || "")}</p>
            ${item.year ? `<div class="timeline-meta">${escapeHtml(item.year)}</div>` : ""}
            ${item.link ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.linkLabel || item.link}</a>` : ""}
            ${item.tags ? renderTags(item.tags) : ""}
        </article>
    `).join("")}</div>`;
}

function renderPublications(items = []) {
    return items.map((item) => `
        <div class="pub-item">
            <strong>${escapeHtml(item.title)}</strong>
            <div class="timeline-meta">${escapeHtml([item.publisher, item.date].filter(Boolean).join(" · "))}</div>
            ${item.link ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.link}</a>` : ""}
        </div>
    `).join("");
}

function renderSectionBody(section, state) {
    switch (section.type) {
        case "text":
            return `<p>${escapeHtml(section.content || "")}</p>`;
        case "timeline":
            return renderTimeline(section.items, state.category, state.query);
        case "tags":
            return renderTags(section.items);
        case "grouped-tags":
            return (section.groups || []).map((group) => `
                <div class="cv-side-block">
                    <h3>${escapeHtml(group.title)}</h3>
                    ${renderTags(group.items)}
                </div>
            `).join("");
        case "bars":
            return renderBars(section.items);
        case "list":
            return renderList(section.items);
        case "cards":
            return renderCards(section.items, state.query);
        case "publications":
            return renderPublications(section.items);
        default:
            return "";
    }
}

function sidebarContacts(contacts = []) {
    return contacts.map((item) => `
        <div class="contact-item">
            <i class="${item.icon}"></i>
            <a href="${item.href}" ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ""}>${item.value}</a>
        </div>
    `).join("");
}

function collectCategories(sections) {
    const cats = new Set();
    sections.forEach((section) => {
        (section.items || []).forEach((item) => {
            if (item.category) cats.add(item.category);
        });
    });
    return [...cats];
}

async function renderPage() {
    const data = await loadData();
    applyDocumentLang(data);
    const resume = data.resume;
    const ui = data.ui;
    const state = {
        query: document.getElementById("cvSearch")?.value || "",
        category: document.querySelector(".filter-chip.active")?.dataset.category || "all"
    };

    document.getElementById("brandName").textContent = data.profile.name;
    document.getElementById("cvPhoto").src = resolveAsset(data.profile.photo);
    document.getElementById("cvPhoto").alt = data.profile.name;
    document.getElementById("cvName").textContent = data.profile.name;
    document.getElementById("cvHeadline").textContent = data.profile.headline;
    document.getElementById("cvMeta").textContent = [
        data.profile.location,
        data.profile.birthDateLabel,
        data.profile.maritalStatus,
        data.profile.militaryStatus
    ].filter(Boolean).join(" · ");

    document.getElementById("cvStats").innerHTML = resume.stats.map((stat) => `
        <div class="cv-stat"><strong>${escapeHtml(stat.value)}</strong><span>${escapeHtml(stat.label)}</span></div>
    `).join("");

    document.getElementById("cvSideContacts").innerHTML = sidebarContacts(data.contacts);
    document.getElementById("cvSideSkills").innerHTML = renderBars(resume.sidebar.skills);
    document.getElementById("cvSideLanguages").innerHTML = renderBars(resume.sidebar.languages);
    document.getElementById("skillsTitle").textContent = ui.skills;
    document.getElementById("languagesTitle").textContent = ui.languagesTitle;
    document.getElementById("contactsTitle").textContent = ui.contact;

    renderLangSwitch(document.getElementById("langSwitch"), getSavedLang(), data.ui.languages);
    renderContactDock(data.contacts);
    renderFooterContacts(document.getElementById("footerContacts"), data.contacts);
    document.getElementById("footerCopy").textContent = ui.footer.replace("{year}", String(new Date().getFullYear()));

    document.getElementById("cvSearch").placeholder = ui.searchResume;
    document.getElementById("downloadPdf").href = resolveAsset(resume.pdf);
    document.getElementById("downloadPdf").innerHTML = `<i class="fas fa-download"></i> ${ui.downloadPdf}`;
    document.getElementById("printCv").innerHTML = `<i class="fas fa-print"></i> ${ui.print}`;
    document.getElementById("homeLink").innerHTML = `<i class="fas fa-home"></i> ${ui.home}`;
    document.getElementById("homeLink").href = resolveAsset("./");

    const enabledSections = resume.sections.filter((section) => section.enabled !== false);
    const categories = collectCategories(enabledSections);
    const categoryLabels = resume.categoryLabels || {};
    document.getElementById("cvFilters").innerHTML = [
        `<button class="filter-chip ${state.category === "all" ? "active" : ""}" data-category="all">${ui.all}</button>`,
        ...categories.map((cat) => `
            <button class="filter-chip ${state.category === cat ? "active" : ""}" data-category="${cat}">
                ${escapeHtml(categoryLabels[cat] || cat)}
            </button>
        `)
    ].join("");

    document.getElementById("cvToc").innerHTML = enabledSections.map((section) => `
        <a href="#section-${section.id}">${escapeHtml(section.title)}</a>
    `).join("");

    document.getElementById("cvMain").innerHTML = enabledSections.map((section) => `
        <section class="cv-section" id="section-${section.id}">
            <h2><i class="${section.icon || "fas fa-circle"}"></i> ${escapeHtml(section.title)}</h2>
            ${renderSectionBody(section, state)}
        </section>
    `).join("");

    document.querySelectorAll(".filter-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
            document.querySelectorAll(".filter-chip").forEach((item) => item.classList.remove("active"));
            chip.classList.add("active");
            renderPage();
        });
    });

    hideLoading();
}

document.addEventListener("DOMContentLoaded", async () => {
    initTheme(document.getElementById("themeToggle"));
    initLazyLoad();
    document.getElementById("printCv").addEventListener("click", () => window.print());
    let searchTimer;
    document.getElementById("cvSearch").addEventListener("input", () => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => renderPage(), 200);
    });
    onLangChange(() => renderPage());
    try {
        await renderPage();
    } catch (error) {
        console.error(error);
        hideLoading();
    }
});
