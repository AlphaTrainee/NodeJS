import { DataTypes } from "sequelize";
import sequelize from ".//db.js";

export const User = sequelize.define("users",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING.BINARY,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Name darf nicht leer sein"
                },
                is: {
                    args: /^[a-zA-Z\s]+$/,
                    msg: "Name darf nur Leerzeichen und Buchstaben enthalten"
                },
                len: {
                    args: [2, 75],
                    msg: "Name muss zwischen 2 und 75 Zeichen lang sein"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "eMail Adresse existiert"
            },
            validate: {
                notEmpty: {
                    msg: "eMail darf nicht leer sein"
                },
                isEmail: {
                    msg: "ungültige Mail"
                },
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
                    msg: "Mindestalter 18"
                },
                max: {
                    args: [180],
                    msg: "Max alter 180"
                }
            }
        }
    },
)

export async function seedUsers() {
    try {
        const count = await User.count();

        if (count == 0) {
            const userArr = [
                { name: "Max", email: "max@mail.de", age: 25 },
                { name: "Peter", email: "peter@mail.de", age: 22 },
                { name: "John", email: "john@mail.de", age: 28 },
                { name: "Jessica", email: "jessica@mail.de", age: 36 },
            ];
            await User.bulkCreate(userArr);
            console.log(`Beispieldaten importiert`);
        } else {
            console.log(`Daten vorhanden`);
        }
    } catch (error) {
        console.log(`Fehler beim Datenimport: ${error}`);
        throw error;
    }
}

