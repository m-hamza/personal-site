import { readFileSync, writeFileSync } from "node:fs";

const files = ["data/projects/fa.json", "data/projects/en.json"];
const pattern = /https:\/\/s\.cafebazaar\.ir\/images\/icons\/([^"?]+)(?:\?[^"]*)?/g;

for (const file of files) {
    const updated = readFileSync(file, "utf8").replace(pattern, "assets/icons/$1");
    writeFileSync(file, updated);
    console.log("patched", file);
}
