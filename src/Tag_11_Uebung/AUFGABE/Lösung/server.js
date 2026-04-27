import express from "express";
import cors from "cors";
import { Op } from "sequelize";
import { initDatabase, Product, seedProducts } from "./models/index.js";

const app = express();
const IP = "127.0.0.1";
const PORT = 8081;

// Middlewares
app.use(express.json());    // JSON-Parsing für Request-Bodys
app.use(cors());            // CORS für Cross-Origin-Requests
app.use(express.urlencoded({ extended: true })); // URL-encoded Parsing für Formulardaten
app.use(express.static("public")); // Statische Dateien (z.B. HTML, CSS, JS) bereitstellen

// Routes (API-Endpunkte erstellen

// GET route "/" -> root-Endpunkt
app.get("/", async (req, res) => {
    try {
        const productCount = await Product.count();
        res.json({
            message: "Whisky Shop Product-Admin-Tool!",
            totalProducts: productCount,
            endpoints: [
                " GET '/':                      Übersicht (diese Seite)",
                " GET '/api/products':          Alle Produkte abrufen",
                " GET '/api/products/:id':      Einzelnes Produkt abrufen",
                " POST '/api/products':         Neues Produkt erstellen",
                " PUT '/api/products/:id':      Einzelnes Produkt aktualisieren",
                " DELETE '/api/products/:id':   Produkt löschen"
            ]
        });
    } catch (error) {
        console.error("Error fetching product count:", error);
        res.status(500).json({
            message: "Fehler beim Ermitteln der Produkt-Anzahl",
            success: false,
            error: error.message
        });
    }
})

// GET route "/api/products" -> alle Produkte abrufen
app.get("/api/products", async (req, res) => {
    try {
        console.log("Get /api/products - alle Produkte abgerufen!");

        // query-params für Filterung anlegen
        const { name, brand, minPrice, maxPrice, category, region, inStock } = req.query;

        // sequelize where-condition
        const whereConditions = {};

        if (name) {
            whereConditions.name = {
                [Op.like]: `%${name}%` // Teilstring-Suche (LIKE %name%)
            };
        }

        if (brand) {
            whereConditions.brand = {
                [Op.like]: `%${brand}%`
            };
        }

        if (minPrice || maxPrice) {
            whereConditions.price = {};
            if (minPrice) whereConditions.price[Op.gte] = parseFloat(minPrice);
            if (maxPrice) whereConditions.price[Op.lte] = parseFloat(maxPrice);
        }

        if (category) {
            whereConditions.category = category;
        }

        if (region) {
            whereConditions.region = {
                [Op.like]: `%${region}%`
            };
        }

        if (inStock === 'true') {
            whereConditions.inStock = {
                [Op.gt]: 0
            };
        } else if (inStock === 'false') {
            whereConditions.inStock = 0;
        }

        const products = await Product.findAll({
            where: whereConditions,
            order: [["createdAt", "DESC"]] // Sortierung nach Erstellungsdatum (neueste zuerst)
        });

        res.json({
            success: true,
            message: "Alle Produkte erfolgreich abgerufen!",
            products: products,
            count: products.length
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            message: "Fehler beim Abrufen der Produkte",
            error: error.message
        });
    }
});

// GET route "/api/products/:id" -> einzelnes Produkt abrufen
app.get("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Get /api/products/:id - Produkt mit ID:", id, "abgerufen!");

        // ID-Validierung
        const productId = parseInt(id);
        if (isNaN(productId)) {
            return res.status(400).json({
                success: false,
                message: "Ungültige ID. Bitte eine gültige Zahl eingeben."
            });
        }

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Produkt mit ID " + id + " nicht gefunden!"
            });
        }
        
        res.json({
            success: true,
            message: "Produkt erfolgreich abgerufen!",
            data: product
        });

    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({
            success: false,
            message: "Fehler beim Abrufen des Produkts",
            error: error.message
        });
    }
});

// POST route "/api/products" - neues Produkt erstellen
app.post("/api/products", async (req, res) => {
    try {
        console.log("Post /api/products - neues Produkt erstellt!");
        console.log("Request body", req.body);
        
        const { name, brand, age, price, alcoholContent, region, description, inStock, category } = req.body;

        // Grundvalidierung
        if (!name || !brand || !price || !alcoholContent) {
            return res.status(400).json({
                success: false,
                message: "Name, Marke, Preis und Alkoholgehalt sind Pflichtfelder.",
                received: req.body
            });
        }

        const newProduct = await Product.create({
            name: name.trim(),
            brand: brand.trim(),
            age: age || null,
            price: parseFloat(price),
            alcoholContent: parseFloat(alcoholContent),
            region: region ? region.trim() : null,
            description: description ? description.trim() : null,
            inStock: inStock || 0,
            category: category || 'Other'
        });

        res.status(201).json({
            success: true,
            message: "Produkt erfolgreich erstellt!",
            data: newProduct
        });
    } catch (error) {
        console.error("Error creating product:", error);

        // Sequelize Validierungsfehler
        if(error.name === "SequelizeValidationError" ) {
            const errors = error.errors.map(err => err.message);
            return res.status(400).json({
                success: false,
                message: "Validierungsfehler",
                errors: errors
            });
        }

        res.status(500).json({
            success: false,
            message: "Fehler beim Erstellen des Produkts",
            error: error.message
        });
    }
});

// PUT route "/api/products/:id" -> einzelnes Produkt aktualisieren
app.put("/api/products/:id", async (req, res) => {
   try {
       const { id } = req.params;
       console.log("Put /api/products/:id - Produkt mit ID:", id, "aktualisieren!");
       console.log("Request body", req.body);

       // ID-Validierung
       const productId = parseInt(id);
       if (isNaN(productId)) {
           return res.status(400).json({
               success: false,
               message: "Ungültige Produkt-ID (muss Zahl sein)!"
           });
       }

       const { name, brand, age, price, alcoholContent, region, description, inStock, category } = req.body;
       const updateData = {};

       if (name) updateData.name = name.trim();
       if (brand) updateData.brand = brand.trim();
       if (age !== undefined) updateData.age = age;
       if (price !== undefined) updateData.price = parseFloat(price);
       if (alcoholContent !== undefined) updateData.alcoholContent = parseFloat(alcoholContent);
       if (region !== undefined) updateData.region = region ? region.trim() : null;
       if (description !== undefined) updateData.description = description ? description.trim() : null;
       if (inStock !== undefined) updateData.inStock = parseInt(inStock);
       if (category) updateData.category = category;

       // prüfen, ob es etwas zu updaten gibt
       if (Object.keys(updateData).length === 0) {
           return res.status(400).json({
               success: false,
               message: "Keine Daten zum Aktualisieren übertragen!"
           });
       }

       // Produkt suchen und aktualisieren
       const product = await Product.findByPk(productId);
       if (!product) {
           return res.status(404).json({
               success: false,
               message: "Produkt mit ID " + id + " nicht gefunden!"
           });
       }
       
       // Update durchführen
       const updatedProduct = await product.update(updateData);
       res.status(200).json({
           success: true,
           message: "Produkt erfolgreich aktualisiert!",
           data: updatedProduct
       });
   } catch(error) {
       console.error("Error updating product:", error);

       // Sequelize Validierungsfehler
       if(error.name === "SequelizeValidationError" ) {
           const errors = error.errors.map(err => err.message);
           return res.status(400).json({
               success: false,
               message: "Validierungsfehler",
               errors: errors
           });
       }

       res.status(500).json({
           success: false,
           message: "Fehler beim Aktualisieren des Produkts",
           error: error.message
       });
   }
});

// DELETE route "api/products/:id" - Produkt löschen
app.delete("/api/products/:id", async (req, res) => {
    try {
        const {id} = req.params;
        console.log("DELETE /api/products/:id - Produkt mit ID:", id, "löschen!");

        // ID-Validierung
        const productId = parseInt(id);
        if (isNaN(productId)) {
            return res.status(400).json({
                success: false,
                message: "Ungültige Produkt-ID (muss Zahl sein)!"
            });
        }

        // Produkt suchen
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Produkt mit ID " + id + " nicht gefunden!"
            });
        }
        
        // Produkt löschen
        await product.destroy();

        res.status(200).json({
            success: true,
            message: "Produkt erfolgreich gelöscht!",
            data: product
        });
    } catch (error) {
        console.log("Fehler beim Löschen des Produkts: ", error);
        res.status(500).json({
            success: false,
            message: "Fehler beim Löschen des Produkts",
            error: error.message
        })
    }
});


// Error handling für nicht existente Routes (404-Fehler)
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Diese Route " + req.originalUrl + " existiert nicht!",
        availableEndpoints: [
            " GET /",
            " GET /api/products",
            " GET /api/products/:id",
            " POST /api/products",
            " PUT /api/products/:id",
            " DELETE /api/products/:id"
        ]
    });
});

// Globales Error Handling (500-Fehler)
app.use((error, req, res, next) => {
    console.error("Unerwarteter Fehler:", error);
    res.status(500).json({
        success: false,
        message: "Ein unerwarteter Fehler ist aufgetreten!",
        error: error.message
    });
});

// Server starten
async function startServer() {
    try {
        // Datenbank initialisieren
        await initDatabase();

        // Produktdaten bei Bedarf einfügen
        await seedProducts();

        // Server starten
        app.listen(PORT,IP, () => console.log(`Server running on http://${IP}:${PORT}`));
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}
startServer();

export default app;