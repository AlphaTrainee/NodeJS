import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import 'dotenv/config';
import { dirname } from "path";
import { fileURLToPath } from "url";

const useMySQL = process.env.DB_USE_MYSQL || "false";
let sequelize;

if (useMySQL.toLowerCase() != "true") {
    const storagePath = dirname(fileURLToPath(import.meta.url)) + "./../database.sqlite";
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: storagePath
    });
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        dialect: "mysql",
        host: process.env.DB_HOST
    });
}

const User = sequelize.define("users",
    {
        username: {
            type: DataTypes.STRING.BINARY,
            allowNull: false,
            unique: true // Benutzernamen sollten einzigartig sein
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    },
    {
        hooks: {
            // Vor dem Speichern wird das Passwort gehasht
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10); // Erstellt ein zufälliges "Salz"
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            // Falls du später ein Passwort-Update erlaubst:
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }
    });

export default { sequelize, User };
