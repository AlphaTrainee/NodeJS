// md_to_ejs.js
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const mdFile = process.argv[2];
if (!mdFile) {
    console.error("No input file provided");
    process.exit(1);
}

const inputPath = path.resolve(mdFile);
const parsed = path.parse(inputPath);
const outFile = path.join(parsed.dir, parsed.name + ".ejs");

// Prüfen, ob markdown-it installiert ist
let markdownItAvailable = true;

try {
    execSync("npx --yes markdown-it --version", { stdio: "ignore" });
} catch (err) {
    markdownItAvailable = false;
}

if (!markdownItAvailable) {
    console.error("\n❌ markdown-it ist NICHT installiert!");
    console.error("➡ Bitte installieren mit:  npm install -g markdown-it\n");
    process.exit(1);
}

// markdown-it ausführen
const output = execSync(`npx markdown-it "${inputPath}"`, {
    encoding: "utf8"
});

// Datei schreiben
fs.writeFileSync(outFile, output, "utf8");

console.log("Generated:", outFile);
