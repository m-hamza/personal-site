import { resolveAsset } from "./config.js";
import { applyDocumentLang, loadData, loadProjects, onLangChange, renderLangSwitch, getSavedLang } from "./i18n.js";
import { initTheme } from "./theme.js";
import { renderContactDock, renderContactList, renderFooterContacts, renderSocialLinks } from "./contacts.js";
import { initTabs } from "./tabs.js";
import { injectStructuredData } from "./schema.js";
import { escapeHtml, hideLoading, initLazyLoad, snippet } from "./utils.js";

let projectsData = null;
let pageData = null;
let currentFilter = "all";
let timelineCategory = "all";

function statusLabel(status, modal) {
    if (status === "retired") return modal.statusRetired;
    if (status === "maintenance") return modal.statusMaintenance;
    return modal.statusActive;
}

function statusClass(status) {
    if (status === "retired") return "status-retired";
    if (status === "maintenance") return "status-maintenance";
    return "status-active";
}

function projectTypeLabel(project, pdata) {
    const labels = pdata.typeLabels || {};
    return labels[project.type] || project.type || "";
}

function sortProjects(projects = []) {
    return [...projects].sort((a, b) => (b.weight || 0) - (a.weight || 0));
}

function renderSectionNav(nav, items = []) {
    const hash = location.hash.slice(1);
    const activeId = items.some((item) => item.id === hash) ? hash : items[0]?.id;

    nav.innerHTML = items.map((item) => `
        <button type="button" class="tab-btn ${item.id === activeId ? "active" : ""}" data-tab="${item.id}">
            <i class="${item.icon}"></i>
            <span>${escapeHtml(item.label)}</span>
        </button>
    `).join("");
}

function renderHeroStats(container, stats = []) {
    container.innerHTML = stats.map((stat) => `
        <div class="hero-stat">
            <strong>${escapeHtml(stat.value)}</strong>
            <span>${escapeHtml(stat.label)}</span>
        </div>
    `).join("");
}

function renderStarteachHub(container, pdata) {
    const { hub } = pdata;
    container.innerHTML = `
        <div class="hub-card">
            <div class="hub-content">
                <span class="hub-badge"><i class="fas fa-star"></i> ${pdata.filters.hub}</span>
                <h3>${escapeHtml(hub.title)}</h3>
                <p class="hub-subtitle">${escapeHtml(hub.subtitle)}</p>
                <p class="hub-desc">${escapeHtml(hub.description)}</p>
                <div class="hub-stats">
                    ${hub.stats.map((s) => `
                        <div class="hub-stat">
                            <strong>${escapeHtml(s.value)}</strong>
                            <span>${escapeHtml(s.label)}</span>
                        </div>
                    `).join("")}
                </div>
                <div class="hub-actions">
                    <a class="btn-primary" href="${hub.link}" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-external-link-alt"></i> starteach.ir
                    </a>
                    <a class="btn-outline" href="${hub.bazaarLink}" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-google-play"></i> Cafe Bazaar
                    </a>
                </div>
            </div>
        </div>
    `;
}

function renderFilters(container, pdata, onFilter) {
    const filters = [
        { key: "all", label: pdata.filters.all },
        { key: "active", label: pdata.filters.active },
        { key: "retired", label: pdata.filters.retired },
        { key: "software", label: pdata.filters.software },
        { key: "web", label: pdata.filters.web },
        { key: "business", label: pdata.filters.business },
        { key: "media", label: pdata.filters.media },
        { key: "cultural", label: pdata.filters.cultural },
    ];

    container.innerHTML = filters.map((f) => `
        <button type="button" class="filter-btn ${currentFilter === f.key ? "active" : ""}" data-filter="${f.key}">
            ${escapeHtml(f.label)}
        </button>
    `).join("");

    container.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            currentFilter = btn.dataset.filter;
            onFilter();
        });
    });
}

function matchesFilter(project) {
    if (currentFilter === "all") return true;
    if (currentFilter === "active") return project.status === "active";
    if (currentFilter === "retired") return project.status === "retired" || project.status === "maintenance";
    return project.category === currentFilter;
}

function renderProjects(container, pdata) {
    const filtered = sortProjects(pdata.projects.filter(matchesFilter));
    const typeLabels = pdata.typeLabels || {};

    container.innerHTML = filtered.map((project) => {
        const typeLabel = typeLabels[project.type] || "";
        return `
        <article class="project-card ${project.featured ? "featured" : ""} ${statusClass(project.status)}"
                 data-project-id="${escapeHtml(project.id)}"
                 data-bs-toggle="modal" data-bs-target="#siteModal"
                 role="button" tabindex="0">
            <div class="project-card-top">
                ${project.icon ? `<img class="project-icon lazy-load" src="${escapeHtml(resolveAsset(project.icon))}" alt="" loading="lazy">` : `<div class="project-icon-placeholder"><i class="fas fa-folder"></i></div>`}
                <span class="project-status ${statusClass(project.status)}">${escapeHtml(statusLabel(project.status, pdata.modal))}</span>
            </div>
            ${typeLabel ? `<span class="project-type-badge">${escapeHtml(typeLabel)}</span>` : ""}
            <h3>${escapeHtml(project.name)}</h3>
            <p class="project-period">${escapeHtml(project.period || "")}</p>
            <p>${escapeHtml(snippet(project.summary, 120))}</p>
            ${project.tags?.length ? `<div class="tag-list">${project.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>` : ""}
        </article>
    `;
    }).join("") || `<p class="empty-state">${escapeHtml(pdata.filters.all)} —</p>`;

    container.querySelectorAll(".project-card").forEach((card) => {
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                card.click();
            }
        });
    });
}

function renderModalSection(title, content, type = "text") {
    if (!content || (Array.isArray(content) && !content.length)) return "";
    if (type === "list" && Array.isArray(content)) {
        return `
            <section class="modal-section">
                <h6><i class="fas fa-route"></i> ${escapeHtml(title)}</h6>
                <ol class="modal-process">${content.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
            </section>
        `;
    }
    if (type === "tags" && Array.isArray(content)) {
        return `
            <section class="modal-section">
                <h6><i class="fas fa-code"></i> ${escapeHtml(title)}</h6>
                <div class="tag-list">${content.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>
            </section>
        `;
    }
    return `
        <section class="modal-section">
            <h6>${escapeHtml(title)}</h6>
            <p>${escapeHtml(content)}</p>
        </section>
    `;
}

function openProjectModal(project, pdata) {
    const modal = pdata.modal;
    document.getElementById("siteModalLabel").textContent = project.name;
    const statusEl = document.getElementById("siteModalStatus");
    statusEl.textContent = statusLabel(project.status, modal);
    statusEl.className = `modal-status ${statusClass(project.status)}`;

    const iconEl = document.getElementById("siteModalIcon");
    if (project.icon) {
        iconEl.src = resolveAsset(project.icon);
        iconEl.alt = project.name;
        iconEl.hidden = false;
    } else {
        iconEl.hidden = true;
    }

    const typeLabel = projectTypeLabel(project, pdata);

    document.getElementById("siteModalBody").innerHTML = `
        ${typeLabel ? `<p class="modal-type"><i class="fas fa-layer-group"></i> ${escapeHtml(typeLabel)}</p>` : ""}
        <p class="modal-lead">${escapeHtml(project.summary)}</p>
        ${renderModalSection(modal.role, project.role)}
        ${renderModalSection(modal.vision, project.vision)}
        ${renderModalSection(modal.process, project.process, "list")}
        ${renderModalSection(modal.tech, project.tech, "tags")}
        ${renderModalSection(modal.marketing, project.marketing)}
        ${renderModalSection(modal.seo, project.seo)}
        ${renderModalSection(modal.content, project.content)}
        ${renderModalSection(modal.challenges, project.challenges)}
        ${renderModalSection(modal.outcomes, project.outcomes)}
        ${project.tags?.length ? renderModalSection(pdata.modal.tags || "برچسب‌ها", project.tags, "tags") : ""}
    `;

    const footer = document.getElementById("siteModalFooter");
    const links = [];
    if (project.link) {
        links.push(`<a href="${escapeHtml(project.link)}" class="modal-btn" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> ${modal.visitSite}</a>`);
    }
    if (project.bazaarLink) {
        links.push(`<a href="${escapeHtml(project.bazaarLink)}" class="modal-btn modal-btn-outline" target="_blank" rel="noopener noreferrer"><i class="fab fa-google-play"></i> ${modal.visitBazaar}</a>`);
    }
    footer.innerHTML = links.join("") || `<span class="modal-no-link">${modal.noLink}</span>`;
}

function renderServices(container, services = []) {
    container.innerHTML = services.map((service) => `
        <article class="service-card">
            <div class="service-card-head">
                <i class="${service.icon}"></i>
                <h3>${escapeHtml(service.title)}</h3>
            </div>
            <p>${escapeHtml(service.description)}</p>
            ${service.audience ? `<p class="service-audience"><i class="fas fa-bullseye"></i> ${escapeHtml(service.audience)}</p>` : ""}
            ${service.tags ? `<div class="tag-list">${service.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
        </article>
    `).join("");
}

function renderTimelineFilters(container, categories, labels, ui) {
    const cats = ["all", ...categories];
    container.innerHTML = cats.map((cat) => `
        <button type="button" class="filter-chip ${timelineCategory === cat ? "active" : ""}" data-category="${cat}">
            ${escapeHtml(cat === "all" ? ui.all : (labels[cat] || cat))}
        </button>
    `).join("");

    container.querySelectorAll(".filter-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
            timelineCategory = chip.dataset.category;
            renderActivityTimeline(document.getElementById("activityTimeline"), pageData);
            renderTimelineFilters(container, categories, labels, ui);
        });
    });
}

function renderActivityTimeline(container, data) {
    const resume = data.resume;
    const items = [...(resume.activityTimeline || [])]
        .sort((a, b) => (b.sortOrder || 0) - (a.sortOrder || 0))
        .filter((item) => timelineCategory === "all" || item.category === timelineCategory);

    const kindLabels = resume.kindLabels || {};

    container.innerHTML = items.map((item) => `
        <article class="timeline-item" data-category="${item.category || ""}">
            <div class="timeline-item-head">
                ${item.kind ? `<span class="timeline-kind">${escapeHtml(kindLabels[item.kind] || item.kind)}</span>` : ""}
                <time class="timeline-period">${escapeHtml(item.period || "")}</time>
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            ${item.organization ? `<div class="timeline-org">${escapeHtml(item.organization)}</div>` : ""}
            ${item.summary ? `<p>${escapeHtml(item.summary)}</p>` : ""}
            ${item.highlights?.length ? `<ul>${item.highlights.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>` : ""}
            ${item.link ? `<a class="timeline-link" href="${item.link}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.linkLabel || item.link)}</a>` : ""}
        </article>
    `).join("") || `<p class="empty-state">—</p>`;
}

function renderSkillBars(items = []) {
    return items.map((item) => `
        <div class="skill-bar">
            <div class="label"><span>${escapeHtml(item.name)}</span><span>${escapeHtml(item.level)}</span></div>
            <div class="track"><div class="fill" style="width:${item.percent || 50}%"></div></div>
        </div>
    `).join("");
}

function renderTags(items = []) {
    return `<div class="tag-list">${items.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("")}</div>`;
}

function renderProfile(container, data) {
    const resume = data.resume;
    const block = resume.profileBlock || {};
    const ui = data.ui;
    const pt = ui.profileTabs || {};

    const facts = [
        data.profile.location && { icon: "fas fa-map-marker-alt", text: data.profile.location },
        data.profile.birthDateLabel && { icon: "fas fa-birthday-cake", text: data.profile.birthDateLabel },
        resume.education?.title && { icon: "fas fa-graduation-cap", text: resume.education.title },
        resume.stats?.[0] && { icon: "fas fa-briefcase", text: `${resume.stats[0].value} ${resume.stats[0].label}` },
    ].filter(Boolean);

    container.innerHTML = `
        <div class="profile-intro">
            <div class="profile-intro-card">
                <div class="profile-quick-facts">
                    ${facts.map((f) => `
                        <span class="profile-fact"><i class="${f.icon}"></i> ${escapeHtml(f.text)}</span>
                    `).join("")}
                </div>
                ${data.aboutSkills?.length ? `<div class="profile-stack">${renderTags(data.aboutSkills)}</div>` : ""}
            </div>
        </div>

        <div class="tabs-container profile-tabs">
            <nav class="tab-nav profile-tab-nav" id="profileTabNav">
                <button type="button" class="tab-btn active" data-tab="profile-about">
                    <i class="fas fa-user-circle"></i><span>${escapeHtml(pt.about || ui.aboutSection || "درباره من")}</span>
                </button>
                <button type="button" class="tab-btn" data-tab="profile-skills">
                    <i class="fas fa-cogs"></i><span>${escapeHtml(pt.skills || ui.skills)}</span>
                </button>
                <button type="button" class="tab-btn" data-tab="profile-education">
                    <i class="fas fa-graduation-cap"></i><span>${escapeHtml(pt.education || ui.education)}</span>
                </button>
                <button type="button" class="tab-btn" data-tab="profile-more">
                    <i class="fas fa-ellipsis-h"></i><span>${escapeHtml(pt.more || "سایر")}</span>
                </button>
            </nav>
            <div class="tab-content">
                <div id="profile-about-tab" class="tab-pane active">
                    <div class="profile-card">
                        <p>${escapeHtml(data.about)}</p>
                        ${data.aboutPm ? `
                            <div class="profile-highlight">
                                <h4><i class="fas fa-project-diagram"></i> ${escapeHtml(data.aboutPm.title)}</h4>
                                <p>${escapeHtml(data.aboutPm.text)}</p>
                            </div>
                        ` : ""}
                    </div>
                </div>

                <div id="profile-skills-tab" class="tab-pane">
                    <div class="profile-layout two-col">
                        <div class="profile-card">
                            <h3><i class="fas fa-code"></i> ${escapeHtml(pt.techSkills || ui.skills)}</h3>
                            ${renderSkillBars(block.skills)}
                        </div>
                        <div class="profile-card">
                            <h3><i class="fas fa-language"></i> ${escapeHtml(ui.languagesTitle)}</h3>
                            ${renderSkillBars(block.languages)}
                        </div>
                    </div>
                </div>

                <div id="profile-education-tab" class="tab-pane">
                    <div class="profile-card">
                        <h3><i class="fas fa-graduation-cap"></i> ${escapeHtml(ui.education || "تحصیلات")}</h3>
                        <div class="education-item">
                            <strong>${escapeHtml(resume.education?.title || "")}</strong>
                            <span>${escapeHtml(resume.education?.graduation || "")}</span>
                        </div>
                    </div>
                    ${block.publications?.length ? `
                        <div class="profile-card">
                            <h3><i class="fas fa-book"></i> ${escapeHtml(ui.publications || "تحقیقات و تألیفات")}</h3>
                            ${block.publications.map((pub) => `
                                <div class="pub-item">
                                    <strong>${escapeHtml(pub.title)}</strong>
                                    <div class="timeline-meta">${escapeHtml([pub.publisher, pub.date].filter(Boolean).join(" · "))}</div>
                                    ${pub.link ? `<a href="${pub.link}" target="_blank" rel="noopener noreferrer">${escapeHtml(ui.viewBook || "مشاهده")}</a>` : ""}
                                </div>
                            `).join("")}
                        </div>
                    ` : ""}
                </div>

                <div id="profile-more-tab" class="tab-pane">
                    <div class="profile-layout two-col">
                        ${block.teaching?.length ? `
                            <div class="profile-card">
                                <h3><i class="fas fa-chalkboard-teacher"></i> ${escapeHtml(ui.teaching || "توانایی تدریس")}</h3>
                                ${renderTags(block.teaching)}
                            </div>
                        ` : ""}
                        ${block.interests?.length ? `
                            <div class="profile-card">
                                <h3><i class="fas fa-heart"></i> ${escapeHtml(ui.interests || "علاقه‌مندی‌ها")}</h3>
                                ${renderTags(block.interests)}
                            </div>
                        ` : ""}
                        ${block.certificates?.length ? `
                            <div class="profile-card">
                                <h3><i class="fas fa-certificate"></i> ${escapeHtml(ui.certificates || "گواهینامه‌ها")}</h3>
                                <ul class="profile-list">${block.certificates.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}</ul>
                            </div>
                        ` : ""}
                        ${block.memberships?.length ? `
                            <div class="profile-card">
                                <h3><i class="fas fa-users"></i> ${escapeHtml(ui.memberships || "عضویت‌ها")}</h3>
                                <ul class="profile-list">${block.memberships.map((m) => `<li>${escapeHtml(m)}</li>`).join("")}</ul>
                            </div>
                        ` : ""}
                    </div>
                </div>
            </div>
        </div>
    `;

    initTabs(document.getElementById("profileTabNav"), container.querySelector(".profile-tabs"), { hash: false });
}

function renderHeroActions(container, ui) {
    container.innerHTML = `
        <a class="btn-primary" href="#contact" data-tab-link="contact"><i class="fas fa-paper-plane"></i> ${ui.hireMe}</a>
        <a class="btn-outline" href="#projects" data-tab-link="projects"><i class="fas fa-briefcase"></i> ${ui.viewProjects || "مشاهده پروژه‌ها"}</a>
    `;
    container.querySelectorAll("[data-tab-link]").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const tabId = link.dataset.tabLink;
            const btn = document.querySelector(`#sectionNav [data-tab="${tabId}"]`);
            btn?.click();
        });
    });
}

function setSectionTitles(data) {
    const ui = data.ui;
    const set = (id, icon, label) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = `<i class="${icon}"></i> ${escapeHtml(label)}`;
    };
    set("projectsTitle", "fas fa-briefcase", ui.sectionProjects || "پروژه‌ها");
    set("servicesTitle", "fas fa-handshake", ui.sectionServices || "خدمات");
    set("timelineTitle", "fas fa-stream", ui.sectionTimeline || "تایم‌لاین فعالیت‌ها");
    set("profileTitle", "fas fa-user", ui.sectionProfile || "پروفایل");
    set("contactTitle", "fas fa-envelope", ui.contact);

    const projectsLead = document.getElementById("projectsLead");
    if (projectsLead) projectsLead.textContent = ui.projectsLead || "";
    const servicesLead = document.getElementById("servicesLead");
    if (servicesLead) servicesLead.textContent = ui.servicesLead || "";
    const timelineLead = document.getElementById("timelineLead");
    if (timelineLead) timelineLead.textContent = ui.timelineLead || "";
}

function refreshProjects() {
    renderFilters(document.getElementById("projectFilters"), projectsData, () => {
        renderProjects(document.getElementById("siteList"), projectsData);
        renderFilters(document.getElementById("projectFilters"), projectsData, refreshProjects);
    });
    renderProjects(document.getElementById("siteList"), projectsData);
}

async function renderPage() {
    const lang = getSavedLang();
    const data = await loadData(lang);
    pageData = data;
    projectsData = await loadProjects(lang);
    applyDocumentLang(data);

    document.getElementById("brandName").textContent = data.profile.name;
    document.getElementById("name").textContent = data.profile.name;
    document.getElementById("headline").textContent = data.profile.headline;
    document.getElementById("description").textContent = data.profile.tagline;
    document.getElementById("heroMeta").textContent = [
        data.profile.location,
        data.profile.birthDateLabel
    ].filter(Boolean).join(" · ");

    const photo = document.querySelector(".profile-image");
    photo.src = resolveAsset(data.profile.photo);
    photo.alt = data.profile.name;

    renderLangSwitch(document.getElementById("langSwitch"), lang, data.ui.languages);
    renderSectionNav(document.getElementById("sectionNav"), data.ui.nav);
    initTabs(document.getElementById("sectionNav"), document.getElementById("mainTabs"));
    renderHeroStats(document.getElementById("heroStats"), data.resume.stats);
    renderHeroActions(document.getElementById("heroActions"), data.ui);
    renderSocialLinks(document.getElementById("socialLinks"), data.contacts);
    setSectionTitles(data);
    renderStarteachHub(document.getElementById("starteachHub"), projectsData);
    refreshProjects();
    renderServices(document.getElementById("servicesList"), data.services);

    const categories = [...new Set((data.resume.activityTimeline || []).map((i) => i.category).filter(Boolean))];
    renderTimelineFilters(
        document.getElementById("timelineFilters"),
        categories,
        data.resume.categoryLabels || {},
        data.ui
    );
    renderActivityTimeline(document.getElementById("activityTimeline"), data);
    renderProfile(document.getElementById("profileContent"), data);
    renderContactList(document.getElementById("contactContent"), data.contacts);
    renderContactDock(data.contacts);
    renderFooterContacts(document.getElementById("footerContacts"), data.contacts);
    document.getElementById("footerCopy").textContent = data.ui.footer.replace("{year}", String(new Date().getFullYear()));
    injectStructuredData(data, projectsData);
    initLazyLoad();
    hideLoading();
}

function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register(resolveAsset("sw.js")).catch(() => {});
}

async function boot() {
    initTheme(document.getElementById("themeToggle"));

    document.getElementById("siteModal").addEventListener("show.bs.modal", (event) => {
        const card = event.relatedTarget;
        const projectId = card?.dataset?.projectId;
        const project = projectsData?.projects?.find((p) => p.id === projectId);
        if (project) openProjectModal(project, projectsData);
    });

    onLangChange(() => {
        currentFilter = "all";
        timelineCategory = "all";
        renderPage();
    });
    try {
        await renderPage();
    } catch (error) {
        console.error(error);
        hideLoading();
    }
    registerServiceWorker();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
} else {
    boot();
}
