import { readFileSync, writeFileSync } from "fs";

const fa = JSON.parse(readFileSync("data/projects/fa.json", "utf8"));
const en = structuredClone(fa);

en.hub.title = "Starteach — Digital Product Hub";
en.hub.subtitle = "Start Each: every project, a fresh beginning";
en.hub.description =
    "I am the founder of Starteach (starteach.ir). Instead of building a separate brand and website for every idea, I develop all products under one umbrella brand with identities rooted in Starteach. Starteach is a project hub — from education and software to media and tools — with the goal of Start Each: a fresh start for learning, building, and growth. Today my main focus is developing and commercializing this platform.";
en.hub.stats = [
    { value: "13+", label: "Published apps" },
    { value: "18K+", label: "Early audience" },
    { value: "10+", label: "Years of product leadership" },
];

en.philosophy = {
    title: "From perfectionism to action",
    text: "I am always committed to upgrading my skills and learning, but I shifted from perfectionism to action. Instead of waiting for an ideal day that may never come, I start with what I have, solve challenges through different approaches, and treat every decision as the best decision at that moment. If I later realize it was wrong, I fix it — without getting stuck in the past.",
};

en.filters = {
    all: "All",
    active: "Active",
    retired: "Retired",
    hub: "Starteach hub",
    software: "Software",
    web: "Website",
    media: "Media",
    cultural: "Cultural",
    business: "Business",
};

en.modal = {
    role: "My primary role",
    vision: "Vision & goal",
    process: "Execution flow (idea to market)",
    tech: "Technology & architecture",
    marketing: "Marketing & growth",
    seo: "SEO & visibility",
    content: "Content production",
    challenges: "Challenges & solutions",
    outcomes: "Outcomes",
    statusActive: "Active",
    statusRetired: "Retired",
    statusMaintenance: "Maintenance",
    visitSite: "Visit website",
    visitBazaar: "Cafe Bazaar page",
    noLink: "No active link",
    tags: "Tags",
};

writeFileSync("data/projects/en.json", JSON.stringify(en, null, 2));
console.log(`Generated ${en.projects.length} projects`);
