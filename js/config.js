export function getBasePath() {
    return document.documentElement.dataset.base || "./";
}

export const DEFAULT_LANG = "fa";
export const SUPPORTED_LANGS = ["fa", "en"];

export function resolveAsset(path) {
    if (!path) return "";
    if (/^https?:\/\//i.test(path) || path.startsWith("mailto:") || path.startsWith("tel:")) {
        return path;
    }
    return `${getBasePath()}${path.replace(/^\.\//, "")}`;
}
