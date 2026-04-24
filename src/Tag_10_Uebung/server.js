/* 
    https://sequelize.org/
    
    npm init -y && npm i --save express ejs sequelize sqlite3
    npm install mysql2
    npm install dotenv
    // import 'dotenv/config';
    // const HOST = process.env.SERVER_HOST;
    // const PORT = process.env.SERVER_PORT;
    npm install bcrypt

*/

import express from "express";
import db from "./models/user.js";
import 'dotenv/config';
import bcrypt from "bcrypt";

const app = express();
const HOST = process.env.SERVER_HOST || 'localhost';
const PORT = process.env.SERVER_PORT || 3000;

// --- MIDDLEWARE & SETTINGS ---
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// --- ROUTEN ---

// Startseite
app.get('/', (req, res) => {
    // Standardmäßig ist niemand eingeloggt
    res.render('index', { user: null });
});

// Login-Seite anzeigen
app.get('/login', (req, res) => {
    res.render('login', { errorMessage: null });
});

// Login-Daten verarbeiten
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // User in der Datenbank suchen
        const user = await db.User.findOne({ where: { username: username } });

        if (user) {
            // Passwort vergleichen
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                // Erfolg: Index mit User-Daten rendern
                res.render('index', { user: user });
            } else {
                res.render('login', { errorMessage: "Passwort ist nicht korrekt." });
            }
        } else {
            res.render('login', { errorMessage: "Benutzername wurde nicht gefunden." });
        }
    } catch (error) {
        console.error("Login Fehler:", error);
        res.render('login', { errorMessage: "Ein Serverfehler ist aufgetreten." });
    }
});

// Logout .. da keine Daten gespeichert werden ist das mehr ein Alibi
app.get('/logout', (req, res) => {
   res.render('index', { user: null });
});


// --- DATENBANK & SERVER START ---

db.sequelize.sync({ force: true })
    .then(async () => {
        console.log("DB synchronisiert und alle Tabellen geleert");

        // Test-Daten anlegen
        await db.User.bulkCreate([
            { username: "testuser", password: "mein-sicheres-passwort" },
            { username: "Jessica", password: "Jones" },
            { username: "Luke", password: "Skywalker" },
            { username: "Thor", password: "passWord" }
        ], {
            individualHooks: true // Wichtig für Bcrypt im Model!
        });

        console.log("Test-Datensätze wurden angelegt.");

        // Erst wenn die DB fertig ist, startet der Server
        app.listen(PORT, HOST, () => {
            console.log(`Server läuft auf http://${HOST}:${PORT}`);
        });
    })
    .catch(err => {
        console.error("Datenbank-Fehler beim Start:", err);
    });