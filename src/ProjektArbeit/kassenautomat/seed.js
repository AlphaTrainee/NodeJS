import 'dotenv/config'; // Wichtig, damit process.env geladen wird
import sequelize from './database/db.js';
import Ticket from './models/Ticket.js';

const seedDatabase = async () => {
  try {
    // Prüfe die ENV-Variable. Wenn nicht 'true', dann nur syncen ohne zu löschen.
    const forceSync = process.env.DB_SEED_FORCE === 'true';
    
    console.log(`Synchronisiere Datenbank (Force: ${forceSync})...`);
    await sequelize.sync({ force: forceSync });
    
    const count = await Ticket.count();
    if (count > 0 && !forceSync) {
      console.log('Datenbank enthält bereits Daten. Seeding übersprungen.');
    } else {
      await Ticket.bulkCreate([
        { name: 'Einzelticket Erwachsen', preis: 8.50, kategorie: 'Standard' },
        { name: 'Einzelticket Kind', preis: 4.50, kategorie: 'Ermäßigt' },
        { name: 'Familienticket', preis: 22.00, kategorie: 'Gruppe' },
        { name: 'Wochenend-Pass', preis: 15.00, kategorie: 'Premium' }
      ]);
      console.log('Test-Daten erfolgreich importiert!');
    }
  } catch (error) {
    console.error('Fehler beim Seeden:', error);
  } finally {
    await sequelize.close();
    process.exit();
  }
};

seedDatabase();