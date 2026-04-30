import express from 'express';
import Ticket from '../models/Ticket.js';
import Kategorie from '../models/Kategorie.js';
import AdminUser from '../models/AdminUser.js';
import bcrypt from 'bcrypt';

Ticket.belongsTo(Kategorie, { foreignKey: 'kategorie' });
Kategorie.hasMany(Ticket, { foreignKey: 'kategorie' });

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
            include: [Kategorie] // Lädt die Daten aus der Kategorie-Tabelle mit
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
        const categories = await Kategorie.findAll();
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
        const categories = await Kategorie.findAll();
        if (!ticket) return res.status(404).render('admin/ticket-form', { ticket, categories, error: "Ticket nicht gefunden" });
        res.render('admin/ticket-form', { ticket, categories, error: null });
    } catch (err) {
        const categories = await Kategorie.findAll();

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
        await Ticket.create(req.body);
        res.redirect('/admin/tickets');
    } catch (err) {
        const categories = await Kategorie.findAll();

        const dataFromForm = {
            ...req.body
        };

        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('admin/ticket-form', { ticket: dataFromForm, categories, error: "Ungültige Eingabe", err });
        }

        res.status(500).render('admin/ticket-form', { ticket: dataFromForm, categories, error: "Server-Fehler", err });
    }
});

router.post('/tickets/edit/:id', auth, async (req, res) => {
    try {
        await Ticket.update(req.body, { where: { id: req.params.id } });
        res.redirect('/admin/tickets');
    } catch (err) {
        const categories = await Kategorie.findAll();

        const dataFromForm = {
            ...req.body,
            id: req.params.id
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
            include: [Kategorie] // Lädt die Daten aus der Kategorie-Tabelle mit
        });
        const categories = await Kategorie.findAll();

        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('admin/ticket', { tickets, categories, error: "Fehler beim Löschen", err });
        }
        res.status(500).render('admin/ticket', { tickets, categories, error: "Server-Fehler", err });
    }
});

// Alle Kategorien anzeigen
router.get('/kategorien', auth, async (req, res) => {
    try {
        const kategorien = await Kategorie.findAll();
        res.render('admin/kategorien', { kategorien, error: null });
    } catch (err) {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('admin/kategorien', { kategorien: null, error: "DB Fehler", err });
        }
        res.status(500).render('admin/kategorien', { kategorien: null, error: "Server-Fehler", err });
    }
});

router.get('/kategorien/add', auth, async (req, res) => {
    res.render('admin/kategorie-form', { kategorie: null, error: null });
});

// Neue Kategorie speichern
router.post('/kategorien/add', auth, async (req, res) => {
    try {
        await Kategorie.create(req.body);
        res.redirect('/admin/kategorien');
    } catch (err) {
        const dataFromForm = {
            ...req.body
        };

        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('admin/kategorie-form', { kategorie: dataFromForm, error: "Ungültige Eingaben", err });
        }

        res.status(500).render('admin/kategorie-form', { kategorie: null, error: "Fehler beim Erstellen.", err });
    }
});

router.get('/kategorien/edit/:id', auth, async (req, res) => {
    try {
        const kategorie = await Kategorie.findByPk(req.params.id);
        if (!kategorie) return res.render('admin/kategorie-form', { kategorie, error: "Kategorie nicht gefunden" });
        res.render('admin/kategorie-form', { kategorie, error: null });
    } catch (err) {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('admin/kategorie-form', { kategorie: null, error: "Ungültige Eingaben", err });
        }

        res.status(500).render('admin/kategorie-form', { kategorie: null, error: "Fehler beim Laden", err });
    }
});

router.post('/kategorien/edit/:id', auth, async (req, res) => {
    try {
        await Kategorie.update(req.body, { where: { id: req.params.id } });
        res.redirect('/admin/kategorien');
    } catch (err) {
        const dataFromForm = {
            ...req.body,
            id: req.params.id
        };

        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('admin/kategorie-form', { kategorie: dataFromForm, error: "Ungültige Eingaben", err });
        }

        res.status(500).render('admin/kategorie-form', { kategorie: dataFromForm, error: "Server-Fehler", err });
    }
});

const handleDeleteKategorie = async (req, res) => {
    try {
        // Prüfen, ob noch Tickets diese Kategorie nutzen
        const ticketCount = await Ticket.count({ where: { kategorie: req.params.id } });

        if (ticketCount > 0) {
            // Falls ja: Nicht löschen und Fehler zurückgeben (oder zur Liste zurück)
            const kategorien = await Kategorie.findAll();
            res.render('admin/kategorien', { kategorien, error: "Kategorie kann nicht gelöscht werden, es sind noch Tickets zugeordnet." });
            return;
        }

        const kat = await Kategorie.findByPk(req.params.id);
        if (!kat) {
            const kategorien = await Kategorie.findAll();
            return res.status(404).render('admin/kategorien', { kategorien, error: "Kategorie nicht gefunden" });
        }

        // Falls nein: Löschen
        await Kategorie.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/kategorien');
    } catch (err) {
        const kategorien = await Kategorie.findAll();

        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('admin/kategorien', { kategorien, error: "Ungültige Eingaben", err });
        }

        res.status(500).render('admin/kategorien', { kategorien, error: "Server-Fehler", err });
    }
};

// Kategorie löschen
router.get('/kategorien/delete/:id', auth, handleDeleteKategorie);
router.post('/kategorien/delete/:id', auth, handleDeleteKategorie);

export default router;