import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "data");

function readJson(relPath) {
    return JSON.parse(fs.readFileSync(path.join(dataDir, relPath), "utf8"));
}

function writeJson(relPath, data) {
    fs.writeFileSync(path.join(dataDir, relPath), `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

const ui = readJson("ui/en.json");
ui.hireMe = "Hire me";
ui.aboutSection = "About me";
ui.education = "Education";
ui.publications = "Research & publications";
ui.teaching = "Teaching";
ui.interests = "Interests";
ui.certificates = "Certificates";
ui.memberships = "Memberships";
ui.viewBook = "View";
ui.sectionProjects = "Projects";
ui.sectionServices = "Services";
ui.sectionTimeline = "Activity timeline";
ui.sectionProfile = "Profile";
ui.projectsLead = "All products and projects — from EdTech platforms to Android apps and web systems";
ui.servicesLead = "Services for business growth, digital products, and online presence — from WordPress and custom design to React, mobile, and AI";
ui.timelineLead = "Professional journey from idea to execution — jobs, projects, and software in one view";
ui.nav = [
    { id: "contact", label: "Contact", icon: "fas fa-envelope" },
    { id: "projects", label: "Projects", icon: "fas fa-briefcase" },
    { id: "services", label: "Services", icon: "fas fa-handshake" },
    { id: "timeline", label: "Timeline", icon: "fas fa-stream" },
    { id: "profile", label: "Profile", icon: "fas fa-user" },
];
delete ui.viewCv;
delete ui.cvHref;
delete ui.searchResume;
delete ui.skillsFocus;
writeJson("ui/en.json", ui);

const profile = readJson("profile/en.json");
profile.profile = {
    name: "Mohammad Hamza",
    headline: "Founder of Starteach | Product lead & full-stack developer",
    tagline: "From idea to commercialization — project management, web & mobile development, SEO and digital marketing",
    photo: "gibli.jpg",
    birthDateLabel: "Born 1374 (1995)",
    location: "East Azerbaijan",
};
profile.stats = [
    { value: "+10", label: "Years experience" },
    { value: "+20", label: "Products" },
    { value: "+15", label: "Apps" },
];
profile.education = {
    title: "M.A. Child & Adolescent Education",
    graduation: "Graduated 2021 (1400)",
};
profile.profileBlock = {
    skills: [
        { name: "Project & product management", level: "Expert", percent: 92 },
        { name: "Laravel & PHP", level: "Expert", percent: 90 },
        { name: "React & JavaScript", level: "Advanced", percent: 82 },
        { name: "Flutter & Android", level: "Expert", percent: 85 },
        { name: "Kotlin", level: "Advanced", percent: 80 },
        { name: "SEO & marketing", level: "Expert", percent: 88 },
        { name: "PWA / TWA", level: "Advanced", percent: 82 },
        { name: "Applied AI", level: "Growing", percent: 75 },
    ],
    languages: [
        { name: "Persian", level: "Native", percent: 100 },
        { name: "English", level: "Intermediate", percent: 55 },
        { name: "Azeri Turkish", level: "Intermediate", percent: 60 },
    ],
    teaching: ["Mobile programming", "SEO & marketing", "Mobile video editing", "No-code web design", "Life skills", "Language teaching"],
    interests: ["AI & emerging tech", "Walking, cardio & swimming", "Online teaching & services", "Business & psychology reading", "Educational topics", "Web & Android development"],
    certificates: ["ICDL", "Technical & vocational institute"],
    memberships: [
        "Sefiran Abadani & Progress group — Charoyamaq",
        "Charoyamaq artists association",
        "Seda-ye Charoyamaq group",
        "Sahand Charoyamaq cooperative",
        "Naghsh-e Almas e-commerce institute",
    ],
    publications: [
        { title: "The role of cultural jihad against soft war", publisher: "Akhlaq Elahi", date: "Sep 2019", link: "https://ketab.ir/book/06c24097-9d5f-444a-ae1c-85b7b507d451" },
        { title: "Factors of human fall from divine vicegerency (Quranic view)", publisher: "Assem", date: "Jan 2022", link: "https://ketab.ir/book/7ffccd8d-f07e-402d-a93f-0b4d92c69936" },
        { title: "Relations between Muslims and non-Muslims", publisher: "Akhlaq Elahi", date: "Apr 2022", link: "https://ketab.ir/book/1c332d3d-3597-4e53-aa12-2c234f246cfe" },
        { title: "Civilization-building generational education; first seven years", publisher: "In progress", date: "" },
    ],
};
writeJson("profile/en.json", profile);

const timeline = readJson("timeline/en.json");
timeline.pdf = "MyResume.pdf";
timeline.categoryLabels = {
    development: "Development & product",
    education: "Education",
    media: "Media & content",
    cultural: "Cultural & social",
    business: "Business",
};
timeline.kindLabels = {
    work: "Work experience",
    project: "Project",
    software: "Software",
    media: "Media",
};
timeline.activityTimeline = readJson("timeline/fa.json").activityTimeline.map((item) => ({ ...item }));
writeJson("timeline/en.json", timeline);

console.log("English modules synced: ui, profile, timeline");
