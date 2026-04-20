import fs from "fs";

fs.readFile("./products.csv", "utf8", (err, data) => {
    if (err) return console.log(err);
    
    let prodStrArr = data.split("\r\n");    // völlig unsinnig -> "\n"
    prodStrArr.shift();

    let products = prodStrArr.filter(elem => elem != "")
        .map(recordToHTML)
        .join("\n");

        fs.writeFile("./products.html",
            products,
            "utf8",
            err => {
                if (err) return console.log(err);
                console.log("File products.html wurde erstellt");
            }
        );
});

const recordToHTML = prodStr => {
    const [name, desc, qty, price] = prodStr.split(",");
    let html = `
    <div class="product">
        <h2>${name}</h2>
        <p>${desc}</p>
        <span>Preis: ${price} €</span>
    `;
    if (qty < 8) html += `<span>Nur noch ${qty} am Lager</span>`;
}
