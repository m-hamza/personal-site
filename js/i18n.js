import { DEFAULT_LANG, SUPPORTED_LANGS, getBasePath } from "./config.js";

const listeners = [];

export function getSavedLang() {
    const param = new URLSearchParams(window.location.search).get("lang");
    const saved = localStorage.getItem("site-lang");
    const lang = param || saved || DEFAULT_LANG;
    return SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
}

export async function loadData(lang = getSavedLang()) {
    const response = await fetch(`${getBasePath()}data/${lang}.json`);
    if (!response.ok) {
        throw new Error(`Failed to load ${lang}.json`);
    }
    return response.json();
}

export function applyDocumentLang(data) {
    document.documentElement.lang = data.meta.lang;
    document.documentElement.dir = data.meta.dir;
    document.body.classList.toggle("lang-en", data.meta.lang === "en");
    document.title = data.meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
        description.setAttribute("content", data.meta.description);
    }
}

export function setLang(lang) {
    localStorage.setItem("site-lang", lang);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url);
    listeners.forEach((fn) => fn(lang));
}

export function onLangChange(fn) {
    listeners.push(fn);
}

export function renderLangSwitch(container, currentLang, languages) {
    container.innerHTML = languages.map((item) => `
        <button type="button" data-lang="${item.code}" class="${item.code === currentLang ? "active" : ""}">
            ${item.label}
        </button>
    `).join("");

    container.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });
}
