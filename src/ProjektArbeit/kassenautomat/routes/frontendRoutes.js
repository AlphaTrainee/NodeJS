import express from 'express';
import Kategorie from '../models/Kategorie.js';
import Ticket from '../models/Ticket.js';
import SoldTicket from '../models/SoldTicket.js';
import Sale from '../models/Sale.js';

Sale.hasMany(SoldTicket, { foreignKey: 'saleId' });
SoldTicket.belongsTo(Sale, { foreignKey: 'saleId' });

const router = express.Router();

const getCartInfo = (req) => {
    return {
        count: req.session && req.session.cart ? req.session.cart.length : 0,
        hasItems: req.session && req.session.cart && req.session.cart.length > 0
    };
};

router.get('/', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            // Falls beim Löschen was schiefgeht
            return res.status(500).send("Fehler beim Logout");
        }
        // Erst HIER ist die Session sicher weg.
        // Die Middleware erzeugt beim nächsten Klick automatisch eine neue.
        res.render('frontend/index'); 
    });
});

// Abrufen der Kategorien für den Touch-Screen
import { Sequelize } from 'sequelize'; // Wichtig für die Zähl-Funktion

router.get('/kategorien', async (req, res) => {
    try {
        // 1. Kategorien wie gehabt laden
        const kategorien = await Kategorie.findAll({ where: { visible: true } });

        // 2. Bestseller ermitteln
        const bestsellers = await SoldTicket.findAll({
            attributes: [
                'ticketName',
                [Sequelize.fn('COUNT', Sequelize.col('ticketName')), 'count']
            ],
            group: ['ticketName'],
            order: [[Sequelize.literal('count'), 'DESC']],
            limit: 6 // Die Top 6
        });

        res.render('frontend/kategorien', {
            kategorien,
            bestsellers, // Wir geben die Bestseller an das Template weiter
            currentPage: 'kategorien'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Fehler beim Laden");
    }
});

// Ticket-Auswahl basierend auf der Kategorie-ID
router.get('/kategorien/:katId', async (req, res) => {
    if (!req.session.cart) req.session.cart = [];

    const kategorie = await Kategorie.findByPk(req.params.katId);
    const tickets = await Ticket.findAll({ where: { kategorie: req.params.katId, visible: true } });

    if (kategorie) {
        req.session.CategoryId = req.params.katId;
        req.session.CategoryName = kategorie.name;
    } else {
        delete req.session.CategoryId;
        delete req.session.CategoryName;
    }

    req.session.save((err) => {
        if (err) console.error("Session Save Error:", err);
        
        res.render('frontend/tickets', {
            tickets,
            kategorie,
            currentPage: 'tickets',
            cartCount: req.session.cart.length
        });
    });


});

// Ticket zum Warenkorb hinzufügen
router.get('/cart/add/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);
        if (!ticket) return res.redirect('/kategorien');

        if (!req.session.cart) req.session.cart = [];

        const existingItem = req.session.cart.find(item => item.id === ticket.id);

        if (existingItem) {
            existingItem.quantity = Number(existingItem.quantity) + 1;
        } else {
            req.session.cart.push({
                id: ticket.id,
                name: ticket.name,
                preis: Number(ticket.preis),
                quantity: 1 // DAS muss hier stehen
            });
        }
        res.redirect('/cart');
    } catch (err) {
        console.error(err);
        res.status(500).send("Fehler");
    }
});

router.get('/cart/add-by-name', async (req, res) => {
    try {
        const ticket = await Ticket.findOne({ where: { name: req.query.name, visible: true } });
        
        if (ticket) {
            if (!req.session.cart) req.session.cart = [];

            // Suchen, ob das Ticket bereits im Warenkorb liegt
            const existingItem = req.session.cart.find(item => item.id === ticket.id);

            if (existingItem) {
                // Menge erhöhen (wichtig für die Anzeige)
                existingItem.quantity = (Number(existingItem.quantity) || 1) + 1;
            } else {
                // Neu hinzufügen mit dem quantity-Feld
                req.session.cart.push({
                    id: ticket.id,
                    name: ticket.name,
                    preis: Number(ticket.preis),
                    quantity: 1
                });
            }
        }
        res.redirect('/cart');
    } catch (err) {
        console.error("Fehler bei add-by-name:", err);
        res.status(500).send("Interner Fehler");
    }
});

router.get('/cart/remove/:id', (req, res) => {
    try {
        if (!req.session.cart) return res.redirect('/cart');

        const itemIndex = req.session.cart.findIndex(item => item.id == req.params.id);

        if (itemIndex > -1) {
            if (req.session.cart[itemIndex].quantity > 1) {
                req.session.cart[itemIndex].quantity -= 1;
            } else {
                req.session.cart.splice(itemIndex, 1);
            }
        }
        res.redirect('/cart');
    } catch (err) {
        console.error(err);
        res.status(500).send("Fehler beim Entfernen");
    }
});

router.get('/cart/delete/:id', async (req, res) => {
    try {
        const itemId = req.params.id;

        if (!req.session || !req.session.cart) {
            return res.redirect('/cart');
        }

        // Artikel komplett entfernen
        req.session.cart = req.session.cart.filter(item => item.id != itemId);

        req.session.save((err) => {
            if (err) throw err;
            res.redirect('/cart');
        });
    } catch (error) {
        console.error("Delete-Route Fehler:", error);
        res.status(500).send("Fehler beim Löschen des Artikels.");
    }
});

// Warenkorb anzeigen
router.get('/cart', async (req, res) => {
    try {
        const cart = req.session.cart || [];
        
        // Berechnung der Gesamtsumme inkl. Mengen
        const total = cart.reduce((sum, item) => {
            const p = parseFloat(item.preis) || 0;
            const q = parseInt(item.quantity) || 1;
            return sum + (p * q);
        }, 0);

        res.render('frontend/cart', { 
            cart, 
            total,
            currentPage: 'cart'
        });
    } catch (err) {
        console.error("Fehler beim Laden des Warenkorbs:", err);
        res.status(500).send("Interner Serverfehler");
    }
});

// Warenkorb leeren (Abbruch-Button)
router.get('/cart/clear', (req, res) => {
    req.session.cart = [];
    res.redirect('/');
});

router.get('/checkout', async (req, res) => {
    try {
        const cart = req.session.cart || [];

        if (cart.length === 0) {
            return res.redirect('/kategorien');
        }

        // 1. Gesamtsumme berechnen
        const total = cart.reduce((sum, item) => sum + item.preis, 0);

        // 2. Den Verkauf (Sale) erstellen
        // Hinweis: Hier könnte man später die Zahlungsmethode dynamisch setzen
        const newSale = await Sale.create({
            totalAmount: total,
            paymentMethod: 'Bar/Kasse', // Platzhalter für später
            status: 'completed'
        });

        // 3. Für jedes Item im Warenkorb ein SoldTicket erstellen
        const soldTicketsPromises = cart.map(item => {
            return SoldTicket.create({
                saleId: newSale.id,
                ticketName: item.name,
                isValid: true
            });
        });

        const createdTickets = await Promise.all(soldTicketsPromises);

        // 4. Warenkorb leeren
        req.session.cart = [];

        // 5. Bestätigungsseite anzeigen (wir übergeben die Tickets für die Anzeige/QR-Codes)
        res.render('frontend/success', {
            sale: newSale,
            tickets: createdTickets,
            currentPage: 'success'
        });

    } catch (err) {
        console.error("Fehler beim Checkout:", err);
        res.status(500).send("Fehler bei der Abwicklung des Verkaufs");
    }
});

export default router;