const CACHE_NAME = "m-hamza-v5";
const PRECACHE = [
    "./",
    "./index.html",
    "./gibli.jpg",
    "./css/main.css",
    "./css/variables.css",
    "./css/base.css",
    "./css/header.css",
    "./css/sections.css",
    "./css/cards.css",
    "./css/contact.css",
    "./css/footer.css",
    "./css/floating.css",
    "./css/modal.css",
    "./css/cv.css",
    "./css/tabs.css",
    "./css/print.css",
    "./vendor/bootstrap/bootstrap.min.css",
    "./vendor/bootstrap/bootstrap.bundle.min.js",
    "./vendor/fontawesome/css/all.min.css",
    "./vendor/fontawesome/webfonts/fa-solid-900.woff2",
    "./vendor/fontawesome/webfonts/fa-brands-400.woff2",
    "./vendor/fonts/vazir/font-face.css",
    "./vendor/fonts/vazir/Vazir-Regular.woff2",
    "./vendor/fonts/vazir/Vazir-Medium.woff2",
    "./vendor/fonts/vazir/Vazir-Bold.woff2",
    "./vendor/fonts/inter/font-face.css",
    "./vendor/fonts/inter/inter-400.woff2",
    "./vendor/fonts/inter/inter-500.woff2",
    "./vendor/fonts/inter/inter-600.woff2",
    "./vendor/fonts/inter/inter-700.woff2",
    "./js/home.js",
    "./js/config.js",
    "./js/i18n.js",
    "./js/theme.js",
    "./js/contacts.js",
    "./js/tabs.js",
    "./js/schema.js",
    "./js/utils.js",
    "./data/meta/fa.json",
    "./data/meta/en.json",
    "./data/ui/fa.json",
    "./data/ui/en.json",
    "./data/contacts/fa.json",
    "./data/contacts/en.json",
    "./data/profile/fa.json",
    "./data/profile/en.json",
    "./data/services/fa.json",
    "./data/services/en.json",
    "./data/timeline/fa.json",
    "./data/timeline/en.json",
    "./data/projects/fa.json",
    "./data/projects/en.json",
    "./assets/icons/starteach.ir-f9c04a3f-ee7b-4faa-b579-ecf8a36372ee_512x512.webp",
    "./assets/icons/charoymagh.ir-b3bc9f67-fd71-4f3e-9b5f-e0287f962731_512x512.webp",
    "./assets/icons/hamza.ensan_sogot-06a86e23-6c13-42fc-bc08-6eeb06240ecf_512x512.webp",
    "./assets/icons/ir.starteach.sarfe_afaal-cf40c4f0-61ef-4274-a58e-2bef276523fe_512x512.webp",
    "./assets/icons/ir.starteach.ers-4a189168-14e0-41a7-b048-d4c8722ca93c_512x512.webp",
    "./assets/icons/ir.novinestekhdam-c45e7a13-1735-4996-8800-d996ad80381a_512x512.webp",
    "./assets/icons/ir.starteach.arabifull-3a3e4121-06c0-47e4-8c27-98bf30fe0f17_512x512.webp",
    "./assets/icons/ir.starteach.ippanelapp-1f9c7244-28cd-4b96-a079-1f1d5e3f3439_512x512.webp",
    "./assets/icons/ir.starteach.pajohesh-e871c716-f1dc-4603-8d74-7c53217aac4a_512x512.webp",
    "./assets/icons/ir.starteach.GarageYar-9bb5f5cb-663c-4c6f-8c61-180e3e7506c1_512x512.webp",
    "./assets/icons/ir.starteach.barkhat-c0c6fc2a-bbc0-4049-9cf9-af4dc1cbce88_512x512.webp",
    "./assets/icons/ir.starteach.arabic9leitner-04593345-2b07-4714-b676-85e158f4dd4d_512x512.webp",
    "./assets/icons/ir.starteach.testpoint-76cc9052-33b4-46a5-b2df-b85bc3adc5c2_512x512.webp",
    "./sw.js",
];

async function precacheUrls(cache, urls, batchSize = 5) {
    for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize);
        await Promise.allSettled(batch.map((url) => cache.add(url)));
    }
}

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => precacheUrls(cache, PRECACHE))
            .then(() => self.skipWaiting()),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
            .then(() => self.clients.claim()),
    );
});

async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) return cached;

    const response = await fetch(request);
    if (response.ok && request.method === "GET") {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone());
    }
    return response;
}

async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response.ok && request.method === "GET") {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
            return response;
        }
        const cached = await caches.match(request);
        if (cached) return cached;
        return response;
    } catch {
        const cached = await caches.match(request);
        if (cached) return cached;
        throw new Error(`Network error for ${request.url}`);
    }
}

function shouldUseNetworkFirst(url) {
    const path = url.pathname;
    return /\.(js|css|html|json)$/.test(path) || path.endsWith("/");
}

self.addEventListener("fetch", (event) => {
    const { request } = event;
    if (request.method !== "GET") return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    event.respondWith(shouldUseNetworkFirst(url) ? networkFirst(request) : cacheFirst(request));
});
