const fs = require('fs');
const md = require('markdown-it')();
const path = require('path');

const input = path.join(__dirname, 'docs/beschreibung.md');
const output = path.join(__dirname, 'views/partials/beschreibung.ejs');

const content = fs.readFileSync(input, 'utf8');
const html = md.render(content);

fs.writeFileSync(output, html);
console.log('✅ Beschreibung wurde aktualisiert!');