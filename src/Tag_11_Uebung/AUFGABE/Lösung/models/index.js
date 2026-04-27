// zentrale exportdatei für alle Models - hier läuft alles zusammen
import sequelize, { initDatabase } from './database.js';
import Product, { seedProducts } from './Product.js';

// alle Models und DB-Functions exportieren
export { sequelize, initDatabase, Product, seedProducts };

// default-Export für einfachen Import
export default { sequelize, initDatabase, Product, seedProducts };