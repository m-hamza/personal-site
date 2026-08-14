import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "data");

const HERO_IDS = new Set(["telegram", "whatsapp", "instagram", "github", "linkedin", "email"]);

function toPlaces(contact) {
    const places = ["tab"];
    if (contact.showEverywhere) {
        places.push("dock", "footer");
    }
    if (HERO_IDS.has(contact.id)) {
        places.push("hero");
    }
    return [...new Set(places)];
}

function splitContacts(contacts) {
    return {
        channels: contacts.map(({ showEverywhere, ...rest }) => ({
            ...rest,
            places: toPlaces({ ...rest, showEverywhere }),
        })),
    };
}

function splitLang(lang) {
    const src = JSON.parse(fs.readFileSync(path.join(dataDir, `${lang}.json`), "utf8"));
    const projects = JSON.parse(
        fs.readFileSync(path.join(dataDir, `projects-${lang}.json`), "utf8")
    );

    const files = {
        meta: src.meta,
        ui: src.ui,
        contacts: splitContacts(src.contacts),
        profile: {
            profile: src.profile,
            about: src.about,
            aboutSkills: src.aboutSkills,
            aboutPm: src.aboutPm,
            stats: src.resume.stats,
            education: src.resume.education,
            profileBlock: src.resume.profileBlock,
        },
        services: { services: src.services },
        timeline: {
            pdf: src.resume.pdf,
            categoryLabels: src.resume.categoryLabels,
            kindLabels: src.resume.kindLabels,
            activityTimeline: src.resume.activityTimeline,
        },
        projects,
    };

    for (const [section, content] of Object.entries(files)) {
        const dir = path.join(dataDir, section);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(
            path.join(dir, `${lang}.json`),
            JSON.stringify(content, null, 2) + "\n",
            "utf8"
        );
    }
}

["fa", "en"].forEach(splitLang);

for (const legacy of ["fa.json", "en.json", "projects-fa.json", "projects-en.json"]) {
    const file = path.join(dataDir, legacy);
    if (fs.existsSync(file)) fs.unlinkSync(file);
}

console.log("Data split into data/{meta,ui,contacts,profile,services,timeline,projects}/{fa,en}.json");
