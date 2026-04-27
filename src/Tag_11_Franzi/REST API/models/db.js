import { Sequelize } from "sequelize";
import { dirname } from "path";
import { fileURLToPath } from "url";
import 'dotenv/config';

const useMySQL = process.env.DB_USE_MYSQL || "false";
let sequelize;

if (useMySQL.toLowerCase() != "true") {
    const storagePath = dirname(fileURLToPath(import.meta.url)) + "./db.sqlite";
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: storagePath,
        logging: false,
        define: {
            timestamps: true
        }
    });
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
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
        await sequelize.authenticate();
        console.log(`DB Connect success`);

        // Tabellen beim start NICHT leeren
        await sequelize.sync({ force: false });
        console.log(`Table sync success`);

        return true;
    }
    catch (error) {
        console.error(`DB Connect error: ${error}`);
        throw error;
    }
}

export default sequelize;
