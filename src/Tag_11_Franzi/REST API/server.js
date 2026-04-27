/* 
    https://sequelize.org/
    
    npm init -y && npm i --save express ejs sequelize sqlite3 mysql2 dotenv nodemon cors
    npm install mysql2
    npm install dotenv
    // import 'dotenv/config';
    // const HOST = process.env.SERVER_HOST;
    // const PORT = process.env.SERVER_PORT;
    npm install cors


*/

import express from "express";
import cors from "cors";
import path from "path";
import { createServer } from "node:http";
import { Op } from "sequelize";
import { sequelize, initDB, User, seedUsers } from "./models/index.js";

import 'dotenv/config';
const HOST = process.env.SERVER_HOST || 'localhost';
const PORT = process.env.SERVER_PORT || 3000;

// 1. Initialisierung
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET-route "/" für root-Endpunkt
app.get("/", async (req, res) => {
    try {
        const userCount = await User.count();
        res.json({
            message: "Express-REST-API mit DB Verknüpfung ist online!",
            totalUsers: userCount,
            endpoints: [
                " GET    '/'                    Übersicht und User-Anzahl (diese Seite)",
                " GET    '/api/users':          Alle User abrufen",
                " GET    '/api/users/:id':      Einzelnen User abrufen",
                " POST   '/api/users':          Neuen User erstellen",
                " PUT    '/api/users/:id':      Einzelnen User aktualisieren",
                " DELETE '/api/users/:id':      User löschen"
            ]
        });
    } catch (error) {
        console.error("Fehler beim Abrufen der Root-Seite:", error);
        res.status(500).json({
            message: "Fehler beim Ermitteln der Useranzahl auf Root-Seite" ,
            success: false,
            error: error.message
        });
    }
});

// GET-route "/api/users"   alle User abrufen
app.get("/api/users", async (req, res) => {
    try {
        console.log("GET /api/users - Alle User abrufen");

        // query-Parameter für Filterung anlegen
        const { name, minAge, maxAge } = req.query;

        // sequelize where-conditions
        const whereConditions = {};

        if (name) {
            whereConditions.name = {
                [Op.like]: `%${name}%` // Name enthält den Suchbegriff (case-insensitive) - Teilstring-Suche
                // case-insensitive Suche (sqlite arbeitet case-insensitive, wenn andere DB case-sensitiv arbeitet, muss lower-function verwendet werden)
            };
        }
        if (minAge || maxAge) {
            whereConditions.age = {};
            if (minAge) whereConditions.age[Op.gte] = minAge;   // Alter >= minAge
            if (maxAge) whereConditions.age[Op.lte] = maxAge;   // Alter <= maxAge
        }

        const users = await User.findAll({ where: whereConditions, order: [['createdAt', 'DESC']] });
        // order: ["createdAt DESC"] - sortiert nach Erstellungsdatum (DESC = absteigend)
        // order: ["createdAt ASC"] - sortiert nach Erstellungsdatum (ASC = aufsteigend)

        res.json({
            message: "Alle User erfolgreich abgerufen",
            success: true,
            data: users,
            count: users.length
        });

    } catch (error) {
        console.error("Fehler beim Abrufen der User:", error);
        res.status(500).json({
            success: false,
            message: "Fehler beim Abrufen der User",
            error: error.message
        });
    }
});

// GET "/api/users/:id" - User mit bestimmter ID abrufen
app.get("/api/users/:id", async (req, res) => {
    try {
        const {id} = req.params;
        console.log(`GET /api/users/${id} - User mit ID ${id} abrufen`);

        // ID-Validierung
        const userId = parseInt(id);
        if (!userId) {
            return res.status(400).json({
                message: "Ungültige User-ID",
                success: false
            });
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `Kein User mit ID ${id} gefunden`
            });
        }

        res.json({
            message: "User erfolgreich abgerufen",
            success: true,
            data: user
        });

    } catch (error) {
        console.error(`Fehler beim Abrufen des Users mit ID ${req.params.id}:`, error);
        res.status(500).json({
            success: false,
            message: `Fehler beim Abrufen des Users mit ID ${req.params.id}`,
            error: error.message
        });
    }
});

// POST route "/api/users" - neuen User erstellen
app.post("/api/users", async (req, res) => {
    try {
        console.log("POST /api/users - neuen User erstellen");
        console.log("Request Body:", req.body);

        const { name, email, age } = req.body;

        // Grundvalidierung der Eingabedaten
        if (!name || !email) {
            return res.status(400).json({
                message: "Name und Email sind erforderlich",
                success: false,
                received: { name, email, age }
            });
        }

        const newUser = await User.create({
            name: name.trim(),
            email: email.trim(),
            age:   age || null
        });

        res.status(200).json({
            message: "User erfolgreich erstellt",
            success: true,
            data: newUser
        })

    } catch(error) {
        console.error("Fehler beim Erstellen des Users:", error);

        // auf Unique Constraint Error von Sequelize reagieren
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                message: "Email-Adresse existiert bereits",
                success: false,
                error: error.errors.map(err => err.message)
                }
            );
        }

        if (error.name === "SequelizeValidationError") {
            const errors = error.errors.map(err => err.message);
            return res.status(400).json({
                message: "Validierungsfehler",
                success: false,
                error: errors
            });
        }

        res.status(500).json({
            message: "Fehler beim Erstellen des Users",
            success: false,
            error: error.message
        });
    }
});

// PUT route "/api/users/:id" -> einzelnen User aktualisieren
app.put("/api/users/:id", async (req, res) => {
    try {
        const {id} = req.params;
        console.log(`PUT /api/users/${id} - einzelnen User aktualisieren`);
        console.log("Request Body:", req.body);

        // ID-Validierung
        const userId = parseInt(id);
        if (!userId) {
            return res.status(400).json({
                message: "Ungültige User-ID",
                success: false
            });
        }

        const { name, email, age } = req.body;
        const updateData = {};

        if (name) updateData.name = name.trim();
        if (email) updateData.email = email.trim();
        if (age) updateData.age = age;

        // prüfen, ob es etwas zum updaten gibt
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "Keine Daten zum Aktualisieren übertragen",
                success: false
            });
        }

        // Benutzer suchen und aktualisieren
        const user = await  User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                message: `Kein User mit ID ${id} gefunden`,
                success: false
            });
        }

        // Update des Users durchführen
        const updatedUser = await user.update(updateData);
        res.status(200).json({
            message: "User erfolgreich aktualisiert",
            success: true,
            data: updatedUser
        });

    } catch (error) {
        console.error(`Fehler beim Aktualisieren des Users mit ID ${req.params.id}:`, error);

        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                message: "Email-Adresse existiert bereits",
                success: false,
                error: error.errors.map(err => err.message)
            });
        }

        if (error.name === "SequelizeValidationError") {
            const errors = error.errors.map(err => err.message);
            return res.status(400).json({
                message: "Validierungsfehler",
                success: false,
                error: errors
            });
        }

        res.status(500).json({
            message: `Fehler beim Aktualisieren des Users mit ID ${req.params.id}`,
            success: false,
            error: error.message
        });
    }
});

// DELETE route "api/users/:id" - User löschen
app.delete("/api/users/:id", async (req, res) => {
    try  {
        const {id} = req.params;
        console.log(`DELETE /api/users/${id} - User löschen`);
        console.log("Request Body:", req.body);

        // ID-Validierung
        const userId = parseInt(id);
        if (!userId) {
            return res.status(400).json({
                message: "Ungültige User-ID",
                success: false
            });
        }

        // User suchen
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                message: `Kein User mit ID ${id} gefunden`,
                success: false
            });
        }

        // User löschen
        await user.destroy();

        res.status(200).json({
            message: "User erfolgreich gelöscht",
            success: true,
            data: user
        });

    } catch (error) {
        console.log(`Fehler beim Löschen des Users mit ID ${req.params.id}:`, error);
        res.status(500).json({
            message: `Fehler beim Löschen des Users mit ID ${req.params.id}`,
            success: false,
            error: error.message
        });
    }
});

// Error handling für nicht existente Routes (404-Fehler)
// app.use("*", (req, res) => {
app.use((req, res) => {
    res.status(404).json({
        message: `Diese Route ${ req.originalURL } existiert nicht`,
        success: false
    });
})

// Globales Error Handling (500-Fehler)
app.use((error, req, res, next) => {
    console.error("Unerwarteter Fehler:", error);
    res.status(500).json({
        message: "Ein unerwarteter Fehler ist aufgetreten",
        success: false,
        error: error.message
    });
});

// Server starten
async function startServer() {
    try {
        // DB-Verbindung initialisieren
        await initDB();

        // Userdaten bei Bedarf einfügen
        await seedUsers();

        // Server starten
        app.listen(PORT, HOST, () => {
            console.log(`Server läuft unter http://${HOST}:${PORT}`);
        });
    } catch(error) {
        console.error("Fehler beim Starten des Servers:", error);
        process.exit(1);
    }
}
startServer();

export default app;