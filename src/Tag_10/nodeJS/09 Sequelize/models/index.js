import { Sequelize, DataTypes } from "sequelize";

import { dirname } from "path";
import { fileURLToPath } from "url";
import 'dotenv/config';

/* 
const storagePath = dirname(fileURLToPath(import.meta.url)) + "./../database.sqlite";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: storagePath
});
*/
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: "mysql",
    host: process.env.DB_HOST
});

// Model definieren
// Klassen repräsentieren DB_Tabellen
const Products = sequelize.define(
    "products",
    {
        name:  { type: DataTypes.STRING, allowNull: false },
        desc:  { type: DataTypes.TEXT },
        qty:   { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    }
)

export default { sequelize, Products };
