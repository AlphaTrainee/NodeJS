// zentrale Exportdatei für alle Models - hier läuft alles zusammen
import sequelize, { initDB } from './db.js';
import User, { seedUsers } from './User.js';

// Export der DB-Functions und Models
export { sequelize, initDB, User, seedUsers };

// oder default-Export für einfacheren Import
export default { sequelize, initDB, User, seedUsers };