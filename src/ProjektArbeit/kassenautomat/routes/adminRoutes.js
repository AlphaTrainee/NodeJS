import express from 'express';
import Ticket from '../models/Ticket.js';
import Category from '../models/Category.js';
import AdminUser from '../models/AdminUser.js';
import bcrypt from 'bcrypt';
import SoldTicket from '../models/SoldTicket.js';
import Sale from '../models/Sale.js';

Sale.hasMany(SoldTicket, { foreignKey: 'saleId' });
SoldTicket.belongsTo(Sale, { foreignKey: 'saleId' });

Ticket.belongsTo(Category, { foreignKey: 'category' });
Category.hasMany(Ticket, { foreignKey: 'category' });

const router = express.Router();

// --- MIDDLEWARE FÜR DEN SCHUTZ ---
const auth = (req, res, next) => {
    if (req.session && req.session.isAdmin) return next();
    res.redirect('/admin/login');
};

// --- AUTH AKTIONEN (LOGIN/LOGOUT) ---
router.get('/login', (req, res) => {
    // Falls der User schon eingeloggt ist, direkt zum Admin schicken
    if (req.session && req.session.isAdmin) {
        return res.redirect('/admin');
    }
    res.render('admin/login', { error: null });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await AdminUser.findOne({ where: { username } });

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);

            // Genaues Debugging im Terminal
            // console.log("--- Login Versuch ---");
            // console.log("Eingegebenes Passwort:", password);
            // console.log("Hash in der DB:", user.password);
            // console.log("Match Ergebnis:", isMatch);
            // console.log("----------------------");

            if (isMatch) {
                req.session.isAdmin = true;
                return res.redirect('/admin');
            }
        }
        res.status(401).render('admin/login', { error: "Login fehlgeschlagen" });
    } catch (err) {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('admin/login', { error: "Ungültige Eingaben", err });
        }

        res.status(500).render('admin/login', { error: "Server-Fehler", err });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/admin/login');
    });
});

router.get('/', auth, async (req, res) => {
    try {
        res.render('admin/index', { error: null });
    } catch (err) {
        res.status(500).render('admin/index', { error: "Server-Fehler", err });
    }
});

router.get('/tickets', auth, async (req, res) => {
    try {
        const tickets = await Ticket.findAll({
            include: [Category] // Lädt die Daten aus der Category-Tabelle mit
        });
        res.render('admin/tickets', { tickets, error: null });
    } catch (err) {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('admin/tickets', { tickets: null, error: "Fehler beim Laden der Tickets", err });
        }
        res.status(500).render('admin/tickets', { tickets: null, error: "Server-Fehler", err });
    }
});

// --- TICKET FORMULARE (JETZT MIT KATEGORIEN) ---
router.get('/tickets/add', auth, async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.render('admin/ticket-form', { ticket: null, categories, error: null });
    } catch (err) {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('admin/ticket-form', { ticket: null, categories: null, error: "Ungültige Eingabe", err });
        }

        res.status(500).render('admin/ticket-form', { ticket: null, categories: null, error: "Server-Fehler", err });
    }
});

router.get('/tickets/edit/:id', auth, async (req, res) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);
        const categories = await Category.findAll();
        if (!ticket) return res.status(404).render('admin/ticket-form', { ticket, categories, error: "Ticket nicht gefunden" });
        res.render('admin/ticket-form', { ticket, categories, error: null });
    } catch (err) {
        const categories = await Category.findAll();

        const dataFromForm = {
            ...req.body,
            id: req.params.id
        };

        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('admin/ticket-form', { ticket: dataFromForm, categories, error: "Ungültige Eingabe", err });
        }

        res.status(500).render('admin/ticket-form', { ticket: dataFromForm, categories, error: "Server-Fehler", err });
    }
});

// --- TICKET POST AKTIONEN ---
router.post('/tickets/add', auth, async (req, res) => {
    try {
        req.body.visible = req.body.visible === 'on';
        await Ticket.create(req.body);
        res.redirect('/admin/tickets');
    } catch (err) {
        const categories = await Category.findAll();

        const dataFromForm = {
            ...req.body,
            visible: !!req.body.visible
        };

        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('admin/ticket-form', { ticket: dataFromForm, categories, error: "Ungültige Eingabe", err });
        }

        res.status(500).render('admin/ticket-form', { ticket: dataFromForm, categories, error: "Server-Fehler", err });
    }
});

router.post('/tickets/edit/:id', auth, async (req, res) => {
    try {
        req.body.visible = req.body.visible === 'on';
        await Ticket.update(req.body, { where: { id: req.params.id } });
        res.redirect('/admin/tickets');
    } catch (err) {
        const categories = await Category.findAll();

        const dataFromForm = {
            ...req.body,
            visible: !!req.body.visible
        };

        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('admin/ticket-form', { ticket: dataFromForm, categories, error: "Ungültige Eingaben", err });
        }

        res.status(500).render('admin/ticket-form', { ticket: dataFromForm, categories, error: "Server-Fehler", err });
    }
});

router.post('/tickets/delete/:id', auth, async (req, res) => {
    try {
        await Ticket.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/tickets');
    } catch (err) {
        const tickets = await Ticket.findAll({
            include: [Category] // Lädt die Daten aus der Category-Tabelle mit
        });
        const categories = await Category.findAll();

        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('admin/ticket', { tickets, categories, error: "Fehler beim Löschen", err });
        }
        res.status(500).render('admin/ticket', { tickets, categories, error: "Server-Fehler", err });
    }
});

// Alle Categories anzeigen
router.get('/categories', auth, async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.render('admin/categories', { categories, error: null });
    } catch (err) {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('admin/categories', { categories: null, error: "DB Fehler", err });
        }
        res.status(500).render('admin/categories', { categories: null, error: "Server-Fehler", err });
    }
});

router.get('/categories/add', auth, async (req, res) => {
    res.render('admin/category-form', { category: null, error: null });
});

// Neue Category speichern
router.post('/categories/add', auth, async (req, res) => {
    try {
        req.body.visible = req.body.visible === 'on';
        await Category.create(req.body);
        res.redirect('/admin/categories');
    } catch (err) {
        const dataFromForm = {
            ...req.body,
            visible: !!req.body.visible
        };

        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('admin/category-form', { category: dataFromForm, error: "Ungültige Eingaben", err });
        }

        res.status(500).render('admin/category-form', { category: null, error: "Fehler beim Erstellen.", err });
    }
});

router.get('/categories/edit/:id', auth, async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.render('admin/category-form', { category, error: "Category nicht gefunden" });
        res.render('admin/category-form', { category, error: null });
    } catch (err) {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('admin/category-form', { category: null, error: "Ungültige Eingaben", err });
        }

        res.status(500).render('admin/category-form', { category: null, error: "Fehler beim Laden", err });
    }
});

router.post('/categories/edit/:id', auth, async (req, res) => {
    try {
        req.body.visible = req.body.visible === 'on';
        await Category.update(req.body, { where: { id: req.params.id } });
        res.redirect('/admin/categories');
    } catch (err) {
        const dataFromForm = {
            ...req.body,
            visible: !!req.body.visible
        };

        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('admin/category-form', { category: dataFromForm, error: "Ungültige Eingaben", err });
        }

        res.status(500).render('admin/category-form', { category: dataFromForm, error: "Server-Fehler", err });
    }
});

const handleDeleteCategory = async (req, res) => {
    try {
        // Prüfen, ob noch Tickets diese Category nutzen
        const ticketCount = await Ticket.count({ where: { category: req.params.id } });

        if (ticketCount > 0) {
            // Falls ja: Nicht löschen und Fehler zurückgeben (oder zur Liste zurück)
            const categories = await Category.findAll();
            res.render('admin/categories', { categories, error: "Category kann nicht gelöscht werden, es sind noch Tickets zugeordnet." });
            return;
        }

        const kat = await Category.findByPk(req.params.id);
        if (!kat) {
            const categories = await Category.findAll();
            return res.status(404).render('admin/categories', { categories, error: "Category nicht gefunden" });
        }

        // Falls nein: Löschen
        await Category.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/categories');
    } catch (err) {
        const categories = await Category.findAll();

        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('admin/categories', { categories, error: "Ungültige Eingaben", err });
        }

        res.status(500).render('admin/categories', { categories, error: "Server-Fehler", err });
    }
};

// Category löschen
router.get('/categories/delete/:id', auth, handleDeleteCategory);
router.post('/categories/delete/:id', auth, handleDeleteCategory);

// Alle Verkäufe anzeigen
router.get('/sales', async (req, res) => {
    try {
        const sales = await Sale.findAll({
            include: [SoldTicket], // Lädt die zugehörigen Tickets mit
            order: [['createdAt', 'DESC']] // Neueste Verkäufe zuerst
        });

        // Optional: Gesamtsumme aller Verkäufe berechnen
        const grandTotal = sales.reduce((sum, s) => sum + parseFloat(s.totalAmount), 0);

        res.render('admin/sales', { 
            sales, 
            grandTotal
        });
    } catch (err) {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('admin/sales', { error: "Ungültige Eingaben", err });
        }

        res.status(500).render('admin/sales', { 
            sales: null, 
            grandTotal: null,
            error: "Server-Fehler", 
            err 
        });
    }
});

// um Fehler zu triggern
router.get('/test/error', (req, res) => {
    console.log(`Triggert einen Error 500`);
    throw new Error("Das ist ein Test-Fehler!");
    return;
});

export default router;