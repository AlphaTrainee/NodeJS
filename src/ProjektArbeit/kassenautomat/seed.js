import 'dotenv/config';
import sequelize from './database/db.js';
import Ticket from './models/Ticket.js';
import Kategorie from './models/Kategorie.js';
import AdminUser from './models/AdminUser.js';
import SoldTicket from './models/SoldTicket.js';
import Sale from './models/Sale.js'; // Import der Verkaufs-Tabelle

const seedDatabase = async () => {
  try {
    const forceSync = process.env.DB_SEED_FORCE === 'true';
    console.log(`Synchronisiere Datenbank (Force: ${forceSync})...`);
    await sequelize.sync({ force: forceSync });

    // --- 1. DATEN DEFINITIONEN ---
    const adminData = [
      { username: 'admin', password: 'admin123' },
      { username: 'manager', password: 'password123' },
      { username: 'developer', password: 'service' }
    ];

    const kategorienData = [
      { name: 'Standard', description: 'Normale Einzeltickets', visible: true },
      { name: 'Ermäßigt', description: 'Für Kinder, Schüler und Studenten', visible: true },
      { name: 'Gruppe', description: 'Tickets für mehrere Personen', visible: true },
      { name: 'Premium', description: 'Exklusive Angebote und Pässe', visible: false },
      { name: 'Special', description: 'Sonderveranstaltungen', visible: false }
    ];

    const ticketData = [
      { name: 'Einzelticket Erwachsen', preis: 8.50, kategorie: 1, visible: true },
      { name: 'Einzelticket Kind', preis: 4.50, kategorie: 2, visible: true },
      { name: 'Familienticket', preis: 22.00, kategorie: 3, visible: true },
      { name: 'Wochenend-Pass', preis: 15.00, kategorie: 4, visible: true }
    ];

    // --- 2. SEEDING FUNKTION ---
    const seedMissing = async (Model, dataArray, uniqueField, options = {}) => {
      for (const item of dataArray) {
        const exists = await Model.findOne({ where: { [uniqueField]: item[uniqueField] } });
        if (!exists) {
          await Model.create(item, options);
          console.log(`${Model.name}: '${item[uniqueField]}' hinzugefügt.`);
        }
      }
    };

    await seedMissing(AdminUser, adminData, 'username', { individualHooks: true });
    await seedMissing(Kategorie, kategorienData, 'name');
    await seedMissing(Ticket, ticketData, 'name');

    // --- 3. VERKÄUFE GENERIEREN (Damit Bestseller Daten haben) ---
    const dbTickets = await Ticket.findAll();

    if (dbTickets.length > 0) {
        console.log('Erzeuge Test-Verkäufe...');

        // Wir brauchen mindestens einen Eintrag in der Sale-Tabelle
        const newSale = await Sale.create({
            totalAmount: 50.00,
            paymentMethod: 'Bar/Kasse',
            status: 'completed'
        });

        const t1 = dbTickets[0];
        // Wir erstellen 10 verkaufte Tickets, die diesem Sale zugeordnet sind
        for (let i = 0; i < 10; i++) {
            await SoldTicket.create({
                saleId: newSale.id,   // Der Anker zum Verkauf
                ticketId: t1.id,      // Der Anker zum Stammdaten-Ticket
                ticketName: t1.name,
                isValid: true
            });
        }
        console.log(`Bestseller-Daten für ${t1.name} wurden generiert.`);
    }

    console.log('Seeding abgeschlossen.');

  } catch (error) {
    console.error('Fehler beim Seeden:', error);
  } finally {
    await sequelize.close();
    process.exit();
  }
};

seedDatabase();