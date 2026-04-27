import { DataTypes } from "sequelize";
import sequelize from "./database.js";

// User Model definieren
const User  = sequelize.define("users", {
    id: {
        type:   DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:   {
        type:   DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Name darf nicht leer sein."
            },
            is: {
                args: /^[a-zA-Z ]+$/,
                msg: "Name darf nur aus Buchstaben bestehen."
            },
            len: {
                args: [2, 100],
                msg: "Name muss zwischen 2 und 100 Zeichen lang sein."
            }
        }
    },
    email:  {
        type:   DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: "Benutzer mit dieser Mail-Adresse existiert bereits."
        },
        validate:   {
            isEmail: {
                msg: "Ungültige E-Mail-Adresse."
            },
            notEmpty: {
                msg: "E-Mail-Adresse darf nicht leer sein."
            }
        }
    },
    age:    {
        type:   DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isInt: {
                msg: "Alter muss eine ganze Zahl sein."
            },
            min: {
                args: [18],
                msg: "Mindestalter ist 18 Jahre."
            },
            max: {
                args: [150],
                msg: "Maximalalter ist 150 Jahre."
            }
        }
    }
})

// Beispieldaten integrieren (Seeder)
export async function seedUsers() {
    try {
        // prüfen, ob Daten in Tabelle vorhanden sind
        const userCount = await User.count();
        if (userCount === 0) {
            const userArray = [
                { name: "Max", email: "max@mustermann.de", age: 25 },
                { name: "Peter", email: "peter@stein.de", age: 35 },
                { name: "John", email: "john.due.com", age: 28 }
            ];
            await  User.bulkCreate(userArray);
            console.log("Users seeded successfully.");
        } else {
            console.log("Users already exist in the database.");
        }
    } catch (error) {
        console.error("Error seeding users:", error);
        throw error;
    }
}

export default User;