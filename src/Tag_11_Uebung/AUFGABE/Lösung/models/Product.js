import { DataTypes } from "sequelize";
import sequelize from "./database.js";

// Product Model für Whisky-Produkte definieren
const Product = sequelize.define("products", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Produktname darf nicht leer sein."
            },
            len: {
                args: [2, 150],
                msg: "Produktname muss zwischen 2 und 150 Zeichen lang sein."
            }
        }
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Marke darf nicht leer sein."
            },
            len: {
                args: [1, 100],
                msg: "Marke muss zwischen 1 und 100 Zeichen lang sein."
            }
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isInt: {
                msg: "Alter muss eine ganze Zahl sein."
            },
            min: {
                args: [0],
                msg: "Alter muss mindestens 0 Jahre sein."
            },
            max: {
                args: [100],
                msg: "Alter kann maximal 100 Jahre sein."
            }
        }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: {
                msg: "Preis muss eine gültige Dezimalzahl sein."
            },
            min: {
                args: [0],
                msg: "Preis muss mindestens 0 Euro sein."
            }
        }
    },
    alcoholContent: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
            isDecimal: {
                msg: "Alkoholgehalt muss eine gültige Dezimalzahl sein."
            },
            min: {
                args: [0],
                msg: "Alkoholgehalt muss mindestens 0% sein."
            },
            max: {
                args: [100],
                msg: "Alkoholgehalt kann maximal 100% sein."
            }
        }
    },
    region: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [0, 100],
                msg: "Region kann maximal 100 Zeichen lang sein."
            }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: {
                args: [0, 1000],
                msg: "Beschreibung kann maximal 1000 Zeichen lang sein."
            }
        }
    },
    inStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            isInt: {
                msg: "Lagerbestand muss eine ganze Zahl sein."
            },
            min: {
                args: [0],
                msg: "Lagerbestand kann nicht negativ sein."
            }
        }
    },
    category: {
        type: DataTypes.ENUM('Single Malt', 'Blended', 'Bourbon', 'Rye', 'Grain', 'Other'),
        allowNull: false,
        defaultValue: 'Other',
        validate: {
            isIn: {
                args: [['Single Malt', 'Blended', 'Bourbon', 'Rye', 'Grain', 'Other']],
                msg: "Ungültige Kategorie."
            }
        }
    }
});

// Beispiel-Whisky-Produkte hinzufügen (Seeder)
export async function seedProducts() {
    try {
        // Prüfen, ob Produkte in Tabelle vorhanden sind
        const productCount = await Product.count();
        if (productCount === 0) {
            const productsArray = [
                {
                    name: "Glenfiddich 12 Year Old",
                    brand: "Glenfiddich",
                    age: 12,
                    price: 35.99,
                    alcoholContent: 40.0,
                    region: "Speyside",
                    description: "Ein klassischer Single Malt Scotch Whisky mit fruchtigen und blumigen Noten.",
                    inStock: 25,
                    category: "Single Malt"
                },
                {
                    name: "Macallan 18 Year Old",
                    brand: "Macallan",
                    age: 18,
                    price: 299.99,
                    alcoholContent: 43.0,
                    region: "Speyside",
                    description: "Ein premium Single Malt mit reichen Sherry-Noten und komplexem Geschmack.",
                    inStock: 8,
                    category: "Single Malt"
                },
                {
                    name: "Johnnie Walker Black Label",
                    brand: "Johnnie Walker",
                    age: 12,
                    price: 24.99,
                    alcoholContent: 40.0,
                    region: "Scotland",
                    description: "Ein beliebter Blended Scotch Whisky mit rauchigen und fruchtigen Noten.",
                    inStock: 45,
                    category: "Blended"
                },
                {
                    name: "Jack Daniel's Old No. 7",
                    brand: "Jack Daniel's",
                    age: null,
                    price: 19.99,
                    alcoholContent: 40.0,
                    region: "Tennessee",
                    description: "Ein ikonischer Tennessee Whiskey mit süßen und vanilligen Geschmacksnoten.",
                    inStock: 60,
                    category: "Bourbon"
                },
                {
                    name: "Laphroaig 10 Year Old",
                    brand: "Laphroaig",
                    age: 10,
                    price: 42.50,
                    alcoholContent: 43.0,
                    region: "Islay",
                    description: "Ein kraftvoller Islay Single Malt mit intensiven torfigen und medizinischen Noten.",
                    inStock: 15,
                    category: "Single Malt"
                },
                {
                    name: "Jameson Irish Whiskey",
                    brand: "Jameson",
                    age: null,
                    price: 22.99,
                    alcoholContent: 40.0,
                    region: "Ireland",
                    description: "Ein sanfter irischer Whiskey mit ausgewogenen Noten von Vanille und Honig.",
                    inStock: 35,
                    category: "Blended"
                }
            ];
            
            await Product.bulkCreate(productsArray);
            console.log("Products seeded successfully.");
        } else {
            console.log("Products already exist in the database.");
        }
    } catch (error) {
        console.error("Error seeding products:", error);
        throw error;
    }
}

export default Product;