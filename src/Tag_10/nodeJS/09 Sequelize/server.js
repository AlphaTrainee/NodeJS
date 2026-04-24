/* 
    https://sequelize.org/
    
    npm init -y && npm i --save express ejs sequelize sqlite3
    npm install mysql2
    npm install dotenv
    // import 'dotenv/config';
    // const HOST = process.env.SERVER_HOST;
    // const PORT = process.env.SERVER_PORT;

    ODER (Windows Alias)
    npmi

    Daten mariadb
    DB:       alpha
    User:     alpha
    Password: service
*/

import express from "express";
import models from "./models/index.js";
import 'dotenv/config';

const app = express();
/* 
// const HOST = "127.0.0.1";
const HOST = "localhost";
const PORT = 3000;
*/
const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT;

// DB Synchronisieren
// models.sequelize.sync();

// DB Tabelle leeren
// models.Products.truncate({cascade: true}).then();

// DB Synchronisieren und alle Tabellen leeren
// -> force:true
models.sequelize.sync({ force: true })
    .then(() => {
        console.log("DB synchronisiert und alle Tabellen geleert");
        /* 
        models.Products.create({
            name: "NO WHISKY",
            desc: "MÜLL",
            qty: 10,
            price: 41.99,
        });
        */

        // mehrere Datensätze in Tabelle 
        models.Products.bulkCreate([
            { name: "Bio-Apfel (1kg)", desc: "Frische Gala-Äpfel aus regionalem Anbau", qty: 50, price: 2.99 },
            { name: "Vollmilch 3,5%", desc: "Haltbare Vollmilch, 1 Liter", qty: 100, price: 1.15 },
            { name: "Hartweizen Pasta", desc: "Spaghetti No. 5, 500g Packung", qty: 40, price: 0.89 },
            { name: "Olivenöl Extra Vergine", desc: "Kaltgepresstes Öl aus Italien, 750ml", qty: 15, price: 8.49 },
            { name: "Basmati Reis", desc: "Langkornreis, 1kg Beutel", qty: 30, price: 2.49 },
            { name: "Zartbitterschokolade", desc: "70% Kakaoanteil, Fairtrade, 100g", qty: 60, price: 1.59 },
            { name: "Röstkaffee", desc: "Ganze Bohnen, kräftiges Aroma, 500g", qty: 20, price: 6.99 },
            { name: "Meersalz", desc: "Grobes Jodsalz ohne Zusätze, 500g", qty: 80, price: 0.75 }
        ]).then(data => {
            console.log("Datensätze wurden angelegt");
            console.log(data);

            // Server konfigurieren
            app.use(express.static("public"));

            app.set("view engine", "ejs");

            // Routing
            app.get("/", (req, res) => {
                models.Products.findAll({
                    raw: true,              // nur Rohdaten
                    attributes: ["name", "id"],
                    order: [["name", "ASC"]],
                    // where: { "qty >": 30, "price <": 20.00 },
                }).then(data => {
                    console.log(data);      // Array mit Datensatz Objekten
                    res.render("index", { products: data });
                })
            });

            app.get("/product/:id", (req, res) => {
                const id = parseInt(req.params.id);
                if (!id) {
                    res.send("Error - not found");
                    return;
                }
                /*  models.Products.findByPk(id).then ... */

                // einzelnen Datensatz abfragen
                models.Products.findOne({
                    raw: true,
                    attributes: ["name", "desc", "qty", "price"],
                    where: { id: id }
                }).then(data => {
                    // gefundener Datensatz als Obj oder null
                    console.log(data);
                    if (!data) {
                        res.send("Error - no Data found");
                        return;
                    }

                    models.Products.update(
                        {
                            desc: "gelesen"
                        },
                        {
                            where: { id: id}
                        }
                    ).then(data => console.log(data, "Datansätze aktualisiert"));

                    // Datensätze löschen
                    models.Products.destroy({
                        where: {id:id}
                    }).then( data => console.log(data, "Datensätze gelöscht"));

                    res.render("products", data);
                })
            })

            app.listen(PORT, HOST, () => console.log(`Server is running on http://${HOST}:${PORT}`));
        })
    });



