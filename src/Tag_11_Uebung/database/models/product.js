import { DataTypes } from "sequelize";
import db from "../db.js";

export const Product = db.define("products", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    }
}, {
    timestamps: true // Hier explizit auf true, falls global was anderes steht
});

export async function seedProducts() {
    try {
        const count = await Product.count();

        if (count == 0) {
            const productArr = [
                { number: "BM-101", name: "Schlagbohrmaschine 800W", description: "Inkl. Koffer und Zusatzhandgriff", price: 89.99 },
                { number: "BM-102", name: "Akkuschrauber 18V", description: "Lithium-Ionen Akku, 2-Gang Getriebe", price: 124.50 },
                { number: "BM-103", name: "Winkelschleifer", description: "Scheibendurchmesser 125mm", price: 45.00 },
                { number: "BM-104", name: "Werkzeugkoffer 120-tlg.", description: "Chrom-Vanadium Stahl, robuster Koffer", price: 79.00 },
                { number: "BM-201", name: "Wandfarbe Alpinweiß 10L", description: "Hohe Deckkraft, matt", price: 38.95 },
                { number: "BM-202", name: "Malerrollen-Set", description: "3-teilig, für glatte Oberflächen", price: 12.49 },
                { number: "BM-301", name: "Gartenhäcksler", description: "Leisehäcksler bis 45mm Aststärke", price: 199.00 },
                { number: "BM-302", name: "Rasenmäher Benzin", description: "Schnittbreite 46cm, Radantrieb", price: 289.90 },
                { number: "BM-401", name: "Laminat Eiche natur", description: "Preis pro qm, 7mm Stärke", price: 9.99 },
                { number: "BM-402", name: "Sockelleiste 2m", description: "Passend zu Laminat Eiche natur", price: 4.45 }
            ];

            await Product.bulkCreate(productArr);
            console.log(`Baumarkt-Beispieldaten erfolgreich importiert`);
        } else {
            console.log(`Produkte bereits in der Datenbank vorhanden`);
        }
    } catch (error) {
        console.log(`Fehler beim Datenimport der Produkte: ${error}`);
        throw error;
    }
}

export default Product;