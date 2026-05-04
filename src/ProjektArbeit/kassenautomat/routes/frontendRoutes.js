import express from 'express';
import Category from '../models/Category.js';
import Ticket from '../models/Ticket.js';
import SoldTicket from '../models/SoldTicket.js';
import Sale from '../models/Sale.js';

Sale.hasMany(SoldTicket, { foreignKey: 'saleId' });
SoldTicket.belongsTo(Sale, { foreignKey: 'saleId' });

SoldTicket.belongsTo(Ticket, { foreignKey: 'ticketId' });
Ticket.belongsTo(Category, { foreignKey: 'category' });

const router = express.Router();

const getCartInfo = (req) => {
    return {
        count: req.session && req.session.cart ? req.session.cart.length : 0,
        hasItems: req.session && req.session.cart && req.session.cart.length > 0
    };
};

router.get('/', (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                // Falls beim Löschen was schiefgeht
                return res.status(500).send("Fehler beim Logout");
            }
            // Erst HIER ist die Session sicher weg.
            // Die Middleware erzeugt beim nächsten Klick automatisch eine neue.
            res.render('frontend/index');
        });
    } catch (err) {
        res.status(500).render('frontend/index', { error: "Server-Fehler", err });
    }
});

// Abrufen der Categories für den Touch-Screen
import { Sequelize } from 'sequelize'; // Wichtig für die Zähl-Funktion

router.get('/categories', async (req, res) => {
    try {
        // 1. Categories wie gehabt laden
        const categories = await Category.findAll({
            where: { visible: true },
            include: [{
                model: Ticket,
                where: { visible: true }, // Nur Categories mit sichtbaren Tickets
                required: true,           // Das erzwingt den INNER JOIN (keine leeren Categories)
                attributes: []            // Wir brauchen die Ticket-Daten hier nicht im Objekt
            }],
            group: ['Category.id'],       // Verhindert Duplikate, wenn eine Category viele Tickets hat
            distinct: true,
            order: [['name', 'ASC']]
        });

        // 2. Bestseller ermitteln
        const bestsellers = await SoldTicket.findAll({
            attributes: [
                'ticketId',
                'ticketName',
                [Sequelize.fn('COUNT', Sequelize.col('SoldTicket.id')), 'count']
            ],
            include: [{
                model: Ticket,
                required: true, // INNER JOIN: Ticket MUSS noch existieren
                where: { visible: true },
                attributes: [], // Wir wollen keine Ticket-Felder im Ergebnis-Objekt
                include: [{
                    model: Category,
                    required: true, // INNER JOIN: Category MUSS noch existieren
                    where: { visible: true },
                    attributes: []
                }]
            }],
            group: ['SoldTicket.ticketId', 'SoldTicket.ticketName'],
            order: [[Sequelize.literal('count'), 'DESC']],
            limit: 6,
            subQuery: false // Wichtig bei GROUP BY und LIMIT in Sequelize
        });

        res.render('frontend/categories', {
            categories,
            bestsellers, // Wir geben die Bestseller an das Template weiter
            currentPage: 'categories'
        });
    } catch (err) {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('frontend/categories', { error: "Ungültige Eingaben", err });
        }

        res.status(500).render('frontend/categories', { error: "Server-Fehler", err });
    }
});

// Ticket-Auswahl basierend auf der Category-ID
router.get('/categories/:katId', async (req, res) => {
    if (!req.session.cart) req.session.cart = [];

    try {
        const category = await Category.findOne({
            where: {
                id: req.params.katId,
                visible: true
            }
        });
        const tickets = await Ticket.findAll({ where: { category: req.params.katId, visible: true } });

        if (category) {
            req.session.CategoryId = req.params.katId;
            req.session.CategoryName = category.name;
        } else {
            delete req.session.CategoryId;
            delete req.session.CategoryName;
        }

        req.session.save((err) => {
            if (err) console.error("Session Save Error:", err);

            res.render('frontend/tickets', {
                tickets,
                category,
                currentPage: 'tickets',
                cartCount: req.session.cart.length
            });
        });
    } catch (err) {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('frontend/tickets', {
                currentPage: 'tickets',
                cartCount: req.session.cart.length,
                error: "Ungültige Eingaben", err
            });
        }

        res.status(500).render('frontend/tickets', {
            currentPage: 'tickets',
            cartCount: req.session.cart.length,
            error: "Server-Fehler", err
        });
    }

});

// Ticket zum Warenkorb hinzufügen
router.get('/cart/add/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);
        if (!ticket) return res.redirect('/categories');

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
        const cart = req.session.cart || [];

        // Berechnung der Gesamtsumme inkl. Mengen
        const total = cart.reduce((sum, item) => {
            const p = parseFloat(item.preis) || 0;
            const q = parseInt(item.quantity) || 1;
            return sum + (p * q);
        }, 0);

        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('frontend/cart', {
                cart,
                total,
                currentPage: 'cart',
                error: "Ungültige Eingaben",
                err
            });
        }

        res.status(500).render('frontend/cart', {
            cart,
            total,
            currentPage: 'cart',
            error: "Server-Fehler",
            err
        });
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
        const cart = req.session.cart || [];

        // Berechnung der Gesamtsumme inkl. Mengen
        const total = cart.reduce((sum, item) => {
            const p = parseFloat(item.preis) || 0;
            const q = parseInt(item.quantity) || 1;
            return sum + (p * q);
        }, 0);

        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('frontend/cart', {
                cart,
                total,
                currentPage: 'cart',
                error: "Ungültige Eingaben",
                err
            });
        }

        res.status(500).render('frontend/cart', {
            cart,
            total,
            currentPage: 'cart',
            error: "Server-Fehler",
            err
        });
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
        const cart = req.session.cart || [];

        // Berechnung der Gesamtsumme inkl. Mengen
        const total = cart.reduce((sum, item) => {
            const p = parseFloat(item.preis) || 0;
            const q = parseInt(item.quantity) || 1;
            return sum + (p * q);
        }, 0);

        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('frontend/cart', {
                cart,
                total,
                currentPage: 'cart',
                error: "Ungültige Eingaben",
                err
            });
        }

        res.status(500).render('frontend/cart', {
            cart,
            total,
            currentPage: 'cart',
            error: "Server-Fehler",
            err
        });
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
    } catch (err) {
        const cart = req.session.cart || [];

        // Berechnung der Gesamtsumme inkl. Mengen
        const total = cart.reduce((sum, item) => {
            const p = parseFloat(item.preis) || 0;
            const q = parseInt(item.quantity) || 1;
            return sum + (p * q);
        }, 0);

        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('frontend/cart', {
                cart,
                total,
                currentPage: 'cart',
                error: "Ungültige Eingaben",
                err
            });
        }

        res.status(500).render('frontend/cart', {
            cart,
            total,
            currentPage: 'cart',
            error: "Server-Fehler",
            err
        });
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
        const cart = req.session.cart || [];

        // Berechnung der Gesamtsumme inkl. Mengen
        const total = cart.reduce((sum, item) => {
            const p = parseFloat(item.preis) || 0;
            const q = parseInt(item.quantity) || 1;
            return sum + (p * q);
        }, 0);

        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('frontend/cart', {
                cart,
                total,
                currentPage: 'cart',
                error: "Ungültige Eingaben",
                err
            });
        }

        res.status(500).render('frontend/cart', {
            cart,
            total,
            currentPage: 'cart',
            error: "Server-Fehler",
            err
        });
    }
});

// Warenkorb leeren (Abbruch-Button)
router.get('/cart/clear', (req, res) => {
    try {
        req.session.cart = [];
        res.redirect('/');
    } catch (err) {
        res.status(500).render('frontend/cart', { error: "Server-Fehler", err });
    }
});

router.get('/checkout', async (req, res) => {
    try {
        const cart = req.session.cart || [];

        if (cart.length === 0) {
            return res.redirect('/categories');
        }

        const total = cart.reduce((sum, item) => sum + item.preis, 0);

        // 1. Sale erstellen (mit Transaktion)
        const newSale = await Sale.create({
            totalAmount: total,
            paymentMethod: 'Bar/Kasse',
            status: 'completed'
        });

        // 2. SoldTickets erstellen - Jetzt mit ticketId!
        const soldTicketsPromises = cart.map(item => {
            return SoldTicket.create({
                saleId: newSale.id,
                ticketId: item.id,   // WICHTIG: Die ID aus dem Warenkorb-Item
                ticketName: item.name,
                isValid: true
            });
        });

        const createdTickets = await Promise.all(soldTicketsPromises);

        // Warenkorb leeren
        req.session.cart = [];

        // 5. Bestätigungsseite anzeigen (wir übergeben die Tickets für die Anzeige/QR-Codes)
        res.render('frontend/success', {
            sale: newSale,
            tickets: createdTickets,
            currentPage: 'success'
        });

    } catch (err) {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('frontend/success', {
                currentPage: 'success',
                tickets: [],
                error: "Fehler bei der Abwicklung des Verkaufs",
                err
            });
        }

        res.status(500).render('frontend/success', {
            currentPage: 'success',
            tickets: [],
            error: "Server-Fehler",
            err
        });
    }
});

router.get('/timeout', (req, res) => {
    res.render('frontend/timeout');
});

router.get('/doc', (req, res) => {
    res.render('frontend/doc');
});

// um Fehler zu triggern
router.get('/test/error', (req, res) => {
    console.log(`Triggert einen Error 500`);
    throw new Error("Das ist ein Test-Fehler!");
    return;
});

export default router;