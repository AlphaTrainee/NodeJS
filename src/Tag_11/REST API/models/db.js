import { Sequelize} from "sequelize";

// DB-Verbindung herstellen / Datenbank anlegen
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false, // SQL-Abfragen nicht in Konsole ausgeben
    define: {
        timestamps: true    // automatisches Erzeugen von Timestamps (createdAt und updatedAt) kann mit false ausgeschaltet werden - true = default-Wert
    }
});

// DB-Verbindung testen und initialisieren
export const initDB = async () => {
    try {
        // DB-Verbindung testen
        await sequelize.authenticate();
        console.log('DB-Verbindung erfolgreich hergestellt');

        // Tabellen synchronisieren
        await sequelize.sync({ force: false });
        // force: true würde die Tabellen bei jedem Start der Anwendung löschen und neu erstellen - in der Entwicklung nützlich, aber in Produktion vorsichtig verwenden
        // force: false erstellt Tabellen, wenn sie noch nicht existieren, aber löscht sie nicht, wenn sie bereits existieren
        console.log('Tabellen erfolgreich synchronisiert');

        return true;
    } catch (error) {
        console.error('Fehler beim Herstellen der DB-Verbindung:', error);
        throw error;
    }
};

export default sequelize;
