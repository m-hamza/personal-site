import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const weights = {
    starteach: 100,
    "starteach-hiring-exam": 98,
    "pajohesh-ai": 97,
    "ai-bm-assistant": 96,
    "charoymagh-app": 95,
    "charoymagh-web": 94,
    "emdad-khodro": 93,
    shohada: 92,
    "zanbil-no": 91,
    dinafile: 90,
    fishyar: 89,
    listly: 88,
    garageyar: 87,
    "barkhat-crm": 86,
    novinestekhdam: 85,
    "sarfe-afaal": 84,
    "arabic-adventure-8": 83,
    "arabic-9-leitner": 82,
    "ippanel-app": 81,
    "ers-calculator": 80,
    "ensan-sogot": 79,
    kahrouba: 78,
    "samane-line": 77,
    servicestar: 76,
    lisher: 75,
    farhikhtegan: 74,
    testpoint: 73,
};

for (const lang of ["fa", "en"]) {
    const file = path.join(root, "data", "projects", `${lang}.json`);
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    data.projects.forEach((project, index) => {
        project.weight = weights[project.id] ?? 70 - index;
    });
    if (!data.typeLabels && lang === "en") {
        data.typeLabels = {
            platform: "Cross-platform platform",
            android: "Android app",
            flutter: "Cross-platform (Flutter)",
            kotlin: "Android (Kotlin)",
            website: "Web project",
            pwa: "Web app / PWA",
            ai: "AI tool",
            saas: "SaaS system",
            hosting: "Web hosting",
            tool: "Online tool",
            search: "Search engine",
            directory: "Directory",
            content: "Content platform",
            education: "Education project",
            publication: "Publication",
        };
    }
    fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
    console.log(`patched ${file}`);
}
