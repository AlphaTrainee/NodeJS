import fs from "fs";

fs.readFile("./products.csv", "utf8", (err, data) => {
    if (err) console.log(err);

    let prodStrArr = data.split("\r\n");
    prodStrArr.shift();

    let products = prodStrArr.filter(elem => elem != "")
                                    .map(recordToHTML)
                                    .join("\n");

    fs.writeFile (              // schreibt Datei asynchron
        "./products.html",      // zu schreibende Datei incl. relativem Pfad
        products,               // zu schreibende Daten
        "utf8",                 // Encoding
            err => {            // callback
        if (err) console.log(err);
        console.log("File products.html wurde erstellt");
    });
});


const recordToHTML = prodStr => {
    const [name, desc,qty,price] = prodStr.split(",");
    let html = `
    <div class="product">
        <h2>${name}</h2>
        <p>${desc}</p>
        <span>Preis: ${price} €</span>
    `;
    if (qty < 8) html += `<span class="low-qty">Nur noch ${qty} Stück auf Lager!</span>`;
    html += `</div>`;
    return html;
}

console.log("ready");