import 'dotenv/config';
import sequelize from './database/db.js';
import Ticket from './models/Ticket.js';
import Kategorie from './models/Kategorie.js';
import AdminUser from './models/AdminUser.js';

const seedDatabase = async () => {
  try {
    const forceSync = process.env.DB_SEED_FORCE === 'true';
    console.log(`Synchronisiere Datenbank (Force: ${forceSync})...`);
    await sequelize.sync({ force: forceSync });

    // --- 1. DATEN DEFINITIONEN ---
    const kategorienData = [
      { name: 'Standard', description: 'Normale Einzeltickets' },
      { name: 'Ermäßigt', description: 'Für Kinder, Schüler und Studenten' },
      { name: 'Gruppe', description: 'Tickets für mehrere Personen' },
      { name: 'Premium', description: 'Exklusive Angebote und Pässe' },
      { name: 'Special', description: 'Sonderveranstaltungen' }
    ];

    const adminData = [
      { username: 'admin', password: 'admin123' },
      { username: 'manager', password: 'password123' },
      { username: 'developer', password: 'service' }
    ];

    const ticketData = [
      { name: 'Einzelticket Erwachsen', preis: 8.50, kategorie: 1 },
      { name: 'Einzelticket Kind', preis: 4.50, kategorie: 2 },
      { name: 'Familienticket', preis: 22.00, kategorie: 3 },
      { name: 'Wochenend-Pass', preis: 15.00, kategorie: 4 }
    ];

    // --- 2. LOGIK: NUR FEHLENDE DATEN EINFÜGEN ---

    // Hilfsfunktion, um nur neue Einträge zu finden (basierend auf einem Feld wie 'name' oder 'username')
    const seedMissing = async (Model, dataArray, uniqueField, options = {}) => {
      for (const item of dataArray) {
        // Prüfen, ob dieser spezifische Eintrag bereits existiert
        const exists = await Model.findOne({ where: { [uniqueField]: item[uniqueField] } });
        if (!exists) {
          await Model.create(item, options);
          console.log(`${Model.name}: '${item[uniqueField]}' neu hinzugefügt.`);
        }
      }
    };

    // Kategorien
    await seedMissing(Kategorie, kategorienData, 'name');

    // Admin User (Wichtig: individualHooks für das Hashing!)
    await seedMissing(AdminUser, adminData, 'username', { individualHooks: true });

    // Tickets
    await seedMissing(Ticket, ticketData, 'name');

    console.log('Seeding abgeschlossen.');

  } catch (error) {
    console.error('Fehler beim Seeden:', error);
  } finally {
    await sequelize.close();
    process.exit();
  }
};

seedDatabase();