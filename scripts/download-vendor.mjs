import { mkdir, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function download(url, dest) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
    await mkdir(path.dirname(dest), { recursive: true });
    if (res.body) {
        await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
    } else {
        const buf = await res.arrayBuffer();
        await writeFile(dest, Buffer.from(buf));
    }
    console.log("OK", path.relative(root, dest));
}

const vazirBase = "https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font/dist";
const vazirFiles = ["Vazir-Regular.woff2", "Vazir-Medium.woff2", "Vazir-Bold.woff2"];

const interBase = "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.18/files";
const interFiles = {
    400: `${interBase}/inter-latin-400-normal.woff2`,
    500: `${interBase}/inter-latin-500-normal.woff2`,
    600: `${interBase}/inter-latin-600-normal.woff2`,
    700: `${interBase}/inter-latin-700-normal.woff2`,
};

const faWebfonts = [
    "fa-solid-900.woff2",
    "fa-brands-400.woff2",
];

const iconUrls = [
    "https://s.cafebazaar.ir/images/icons/starteach.ir-f9c04a3f-ee7b-4faa-b579-ecf8a36372ee_512x512.webp",
    "https://s.cafebazaar.ir/images/icons/charoymagh.ir-b3bc9f67-fd71-4f3e-9b5f-e0287f962731_512x512.webp",
    "https://s.cafebazaar.ir/images/icons/hamza.ensan_sogot-06a86e23-6c13-42fc-bc08-6eeb06240ecf_512x512.webp",
    "https://s.cafebazaar.ir/images/icons/ir.starteach.sarfe_afaal-cf40c4f0-61ef-4274-a58e-2bef276523fe_512x512.webp",
    "https://s.cafebazaar.ir/images/icons/ir.starteach.ers-4a189168-14e0-41a7-b048-d4c8722ca93c_512x512.webp",
    "https://s.cafebazaar.ir/images/icons/ir.novinestekhdam-c45e7a13-1735-4996-8800-d996ad80381a_512x512.webp",
    "https://s.cafebazaar.ir/images/icons/ir.starteach.arabifull-3a3e4121-06c0-47e4-8c27-98bf30fe0f17_512x512.webp",
    "https://s.cafebazaar.ir/images/icons/ir.starteach.ippanelapp-1f9c7244-28cd-4b96-a079-1f1d5e3f3439_512x512.webp",
    "https://s.cafebazaar.ir/images/icons/ir.starteach.pajohesh-e871c716-f1dc-4603-8d74-7c53217aac4a_512x512.webp",
    "https://s.cafebazaar.ir/images/icons/ir.starteach.GarageYar-9bb5f5cb-663c-4c6f-8c61-180e3e7506c1_512x512.webp",
    "https://s.cafebazaar.ir/images/icons/ir.starteach.barkhat-c0c6fc2a-bbc0-4049-9cf9-af4dc1cbce88_512x512.webp",
    "https://s.cafebazaar.ir/images/icons/ir.starteach.arabic9leitner-04593345-2b07-4714-b676-85e158f4dd4d_512x512.webp",
    "https://s.cafebazaar.ir/images/icons/ir.starteach.testpoint-76cc9052-33b4-46a5-b2df-b85bc3adc5c2_512x512.webp",
];

await download(
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
    path.join(root, "vendor/bootstrap/bootstrap.min.css"),
);
await download(
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js",
    path.join(root, "vendor/bootstrap/bootstrap.bundle.min.js"),
);
await download(
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
    path.join(root, "vendor/fontawesome/css/all.min.css"),
);

for (const file of faWebfonts) {
    await download(
        `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/${file}`,
        path.join(root, "vendor/fontawesome/webfonts", file),
    );
}

for (const file of vazirFiles) {
    await download(`${vazirBase}/${file}`, path.join(root, "vendor/fonts/vazir", file));
}

for (const [weight, url] of Object.entries(interFiles)) {
    await download(url, path.join(root, "vendor/fonts/inter", `inter-${weight}.woff2`));
}

for (const url of iconUrls) {
    const name = url.split("/").pop();
    await download(url, path.join(root, "assets/icons", name));
}

const vazirCss = `@font-face {
    font-family: Vazir;
    src: url("Vazir-Regular.woff2") format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: Vazir;
    src: url("Vazir-Medium.woff2") format("woff2");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: Vazir;
    src: url("Vazir-Bold.woff2") format("woff2");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: Vazir;
    src: url("Vazir-Bold.woff2") format("woff2");
    font-weight: 700;
    font-style: normal;
    font-display: swap;
}
`;

const interCss = Object.entries(interFiles)
    .map(([weight]) => `@font-face {
    font-family: "Inter";
    src: url("inter-${weight}.woff2") format("woff2");
    font-weight: ${weight};
    font-style: normal;
    font-display: swap;
}`)
    .join("\n\n");

await writeFile(path.join(root, "vendor/fonts/vazir/font-face.css"), vazirCss);
await writeFile(path.join(root, "vendor/fonts/inter/font-face.css"), interCss);

console.log("All vendor assets downloaded.");
