// zentraler Export für alle Models

import db, { initDB } from "./db.js";
import Product, { seedProducts } from "./models/product.js";

// Export der DB Functionen und Models
export { db, initDB, Product, seedProducts };
