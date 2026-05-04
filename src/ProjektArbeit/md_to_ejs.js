import MarkdownIt from 'markdown-it';
import fs from 'fs';
import path from 'path';

const md = new MarkdownIt();

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // 1. Finde den Text-Token, der direkt nach dem link_open steht
    // tokens[idx] ist <a ...>, tokens[idx+1] ist der Textinhalt
    const textToken = tokens[idx + 1];
    
    if (textToken && textToken.type === 'text') {
        // Prüfe, ob der Text "{external}" enthält
        if (textToken.content.includes('{external}')) {
            // Entferne den Marker aus dem sichtbaren Text
            textToken.content = textToken.content.replace('{external}', '').trim();
            
            // Setze die Attribute
            tokens[idx].attrPush(['target', '_blank']);
            tokens[idx].attrPush(['rel', 'noopener noreferrer']);
        }
    }

    // Standard-Renderer für den Rest (href etc.)
    return self.renderToken(tokens, idx, options);
};

const inputFile = process.argv[2];
if (!inputFile) process.exit(1);

const parsedPath = path.parse(inputFile);
const outputFile = path.join(parsedPath.dir, parsedPath.name + ".ejs");

try {
    const inputContent = fs.readFileSync(inputFile, 'utf-8');
    const result = md.render(inputContent);
    fs.writeFileSync(outputFile, result);
} catch (err) {
    console.error(err.message);
}