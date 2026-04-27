import { Sequelize } from "sequelize";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import 'dotenv/config';

const useMySQL = process.env.DB_USE_MYSQL || "false";
let db;

if (useMySQL.toLowerCase() != "true") {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const storagePath = join(__dirname, "db.sqlite");
    db = new Sequelize({
        dialect: "sqlite",
        storage: storagePath,
        logging: false,
        define: {
            timestamps: true
        }
    });
} else {
    db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        dialect: "mysql",
        host: process.env.DB_HOST,
        logging: false,
        define: {
            timestamps: true
        }
    });
}

export const initDB = async () => {
    try {
        // db connection testen
        await db.authenticate();
        console.log(`DB Connect success`);

        // Tabellen beim start NICHT leeren
        await db.sync({ force: false });
        console.log(`Table sync success`);

        return true;
    }
    catch (error) {
        console.error(`DB Connect error: ${error}`);
        throw error;
    }
}

export default db;
