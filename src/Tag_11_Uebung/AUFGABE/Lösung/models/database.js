import { Sequelize } from "sequelize";

// DB-Verbindung herstellen / Datenbank anlegen
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false, // SQL-Abfragen nicht in der Konsole anzeigen
    define: {
        timestamps: true, // Automatisch createdAt und updatedAt Spalten hinzufügen (wird default sowieso erledigt
    }
});

// Datenbankverbindung testen und initialisieren
export const initDatabase = async () => {
    try {
        // Datenbankverbindung testen
        await sequelize.authenticate()
        console.log("Database connection has been established successfully.");

        // Tabellen synchronisieren
        await sequelize.sync({ force: false });
        // force: true -> Alle Tabellen löschen und neu erstellen (Daten gehen verloren)
        // force: false -> Tabellen nur erstellen, wenn sie noch nicht existieren (Daten bleiben erhalten)
        console.log("All models were synchronized successfully.");

        return true;
        
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        throw error;
    }
}

export default sequelize;
