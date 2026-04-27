// zentraler Export für alle Models

import sequelize, { initDB } from ".//db.js";
import { User, seedUsers } from ".//user.js";

// Export der DB Functionen und Models
export { sequelize, initDB, User, seedUsers };

// ODER default Export 
export default { sequelize, initDB, User, seedUsers };
