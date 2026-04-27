import { DataTypes } from 'sequelize';
import sequelize from './/db.js';

// User-Model definieren
const User = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Name darf nicht leer sein"
            },
            is: {
                args: /^[a-zA-Z\s]+$/,
                msg: "Name darf nur Buchstaben und Leerzeichen enthalten"
            },
            len: {
                args: [2, 75],
                msg: "Name muss zwischen 2 und 75 Zeichen lang sein"
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        alowNull: false,
        unique: {
            msg: "Email-Adresse existiert bereits"
        },
        validate: {
            notEmpty: {
                msg: "Email darf nicht leer sein"
            },
            isEmail: {
                msg: "Ungültige Email-Adresse"
            }
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isInt: {
                msg: "Alter muss eine ganze Zahl sein"
            },
            min: {
                args: [18],
                msg: "Mindestalter ist 18 Jahre"
            },
            max: {
                args: [180],
                msg: "Maximalalter ist 180 Jahre"
            }
        }
    }
});

// Beispieldaten integrieren (Seeder)
export async function seedUsers() {

    try {
        // prüfen, ob Daten in Tabelle
        const count = await User.count();
        if (count == 0) {
            const userArray = [
                { name: "Max", email: "max@mustermann.de", age: 25 },
                { name: "Peter", email: "peter@pan.de", age: 22 },
                { name: "John", email: "john@due.de", age: 28 },
                { name: "Jessica", email: "jessica@jones.de", age: 36 }
            ];
            await User.bulkCreate(userArray);
            console.log("Beispieldaten erfolgreich integriert");
        } else console.log("Beispieldaten bereits vorhanden, Integration übersprungen");
    } catch (error) {
        console.error("Fehler beim Integrieren der Beispieldaten:", error);
        throw error;
    }
}

export default User;