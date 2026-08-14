import { resolveAsset } from "./config.js";

const SITE_URL = "https://m-hamza.ir";

export function injectStructuredData(data, projectsData) {
    document.getElementById("structured-data")?.remove();

    const photoUrl = new URL(resolveAsset(data.profile.photo), `${SITE_URL}/`).href;
    const graph = [
        {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: data.meta.title,
            description: data.meta.description,
            inLanguage: data.meta.lang,
            author: { "@id": `${SITE_URL}/#person` },
        },
        {
            "@type": "Person",
            "@id": `${SITE_URL}/#person`,
            name: data.profile.name,
            jobTitle: data.profile.headline.split("|")[0].trim(),
            description: data.profile.tagline,
            url: SITE_URL,
            image: photoUrl,
            email: data.contacts?.find((c) => c.id === "email")?.value,
            telephone: data.contacts?.find((c) => c.id === "phone")?.value,
            address: data.profile.location
                ? { "@type": "PostalAddress", addressRegion: data.profile.location, addressCountry: "IR" }
                : undefined,
            sameAs: (data.contacts || [])
                .filter((channel) => channel.external && channel.href?.startsWith("http"))
                .map((channel) => channel.href),
            knowsAbout: data.aboutSkills || [],
            alumniOf: data.resume?.education?.title
                ? { "@type": "EducationalOrganization", name: data.resume.education.title }
                : undefined,
        },
        {
            "@type": "ProfessionalService",
            "@id": `${SITE_URL}/#services`,
            name: data.profile.name,
            description: data.meta.description,
            url: SITE_URL,
            provider: { "@id": `${SITE_URL}/#person` },
            areaServed: "IR",
            hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: data.ui.sectionServices,
                itemListElement: (data.services || []).map((service, index) => ({
                    "@type": "Offer",
                    position: index + 1,
                    itemOffered: {
                        "@type": "Service",
                        name: service.title,
                        description: service.description,
                    },
                })),
            },
        },
        ...(projectsData?.projects || [])
            .filter((p) => p.link)
            .slice(0, 15)
            .map((project) => ({
                "@type": "CreativeWork",
                name: project.name,
                description: project.summary,
                url: project.link,
                creator: { "@id": `${SITE_URL}/#person` },
                keywords: (project.tags || []).join(", ") || undefined,
            })),
    ];

    const script = document.createElement("script");
    script.id = "structured-data";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    document.head.appendChild(script);
}
