/* 
    npm init -y && npm i express ejs
    ODER (Windows Alias)
    npmi
*/

import express from "express";
import fs from "fs";
// ejs wird von express importiert

const app = express();
const IP = "127.0.0.1";
const PORT = 3000;

app.use(express.static("public"));

// standardverzeichnis
app.set("view engine", "ejs");

// eigene Definition
// app.set("views", "./templates");

fs.readFile("./products.csv", "utf-8", (err, data) => {
    if (err) throw err;

    const prodArr = data.split("\r\n");
    prodArr.shift();    // Header entfernen

    const prodObjArr = prodArr.filter( prod => prod != "")
                               .map(createObjArr);

    routeFunc(prodObjArr);

});

const createObjArr = (el) => {
    let [name, desc, qty, price] = el.split(",");
    return {name, desc, qty, price, stockWarn: (qty < 8) };
};

const routeFunc = (prodObjArr) => {

    // Startseite
    app.get("/", (req, res) => res.render("index", {products: prodObjArr}));

    // Produktseiten routen
    app.get("/product/:id", (req, res) => {
        const id = req.params.id;
        const prod = prodObjArr[id];
        res.render("product", prod);
        // ODER
        // res.render("product", { prodObjArr[req.params.id] });
    });

};

app.listen(PORT, IP, () => console.log(`Server is running on http://${IP}:${PORT}`));
