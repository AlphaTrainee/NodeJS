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
        res.render('admin/login', { error: "Login fehlgeschlagen" });
    } catch (err) {
        res.render('admin/login', { error: "Ein interner Fehler ist aufgetreten." });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});

router.get('/', auth, async (req, res) => {
    try {
        res.render('admin/index');
    } catch (err) {
        res.status(500).send("Fehler beim Laden der Übersicht");
    }
});

router.get('/ticket', auth, async (req, res) => {
    try {
        const tickets = await Ticket.findAll({
            include: [Kategorie] // Lädt die Daten aus der Kategorie-Tabelle mit
        });
        res.render('admin/tickets', { tickets });
    } catch (err) {
        res.status(500).send("Fehler beim Laden der Übersicht");
    }
});

// --- TICKET FORMULARE (JETZT MIT KATEGORIEN) ---
router.get('/ticket/add', auth, async (req, res) => {
    const categories = await Kategorie.findAll();
    res.render('admin/ticket-form', { ticket: null, categories });
});

router.get('/ticket/edit/:id', auth, async (req, res) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);
        const categories = await Kategorie.findAll();
        if (!ticket) return res.status(404).send("Ticket nicht gefunden");
        res.render('admin/ticket-form', { ticket, categories });
    } catch (err) {
        res.status(500).send("Fehler beim Laden");
    }
});

// --- TICKET POST AKTIONEN ---
router.post('/ticket/add', auth, async (req, res) => {
    try {
        await Ticket.create(req.body);
        res.redirect('/admin/ticket');
    } catch (err) {
        res.status(500).send("Fehler beim Erstellen");
    }
});

router.post('/ticket/edit/:id', auth, async (req, res) => {
    try {
        await Ticket.update(req.body, { where: { id: req.params.id } });
        res.redirect('/admin/ticket');
    } catch (err) {
        res.status(500).send("Fehler beim Aktualisieren");
    }
});

router.post('/ticket/delete/:id', auth, async (req, res) => {
    try {
        await Ticket.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/ticket');
    } catch (err) {
        res.status(500).send("Fehler beim Löschen");
    }
});

// Alle Kategorien anzeigen
router.get('/kategorie', auth, async (req, res) => {
    const kategorien = await Kategorie.findAll();
    res.render('admin/kategorien', { kategorien });
});

router.get('/kategorie/add', auth, async (req, res) => {
    res.render('admin/kategorie-form', { kategorie: null });
});

router.get('/kategorie/edit/:id', auth, async (req, res) => {
    try {
        const kategorie = await Kategorie.findByPk(req.params.id);
        if (!kategorie) return res.status(404).send("kategorie nicht gefunden");
        res.render('admin/kategorie-form', { kategorie });
    } catch (err) {
        res.status(500).send("Fehler beim Laden");
    }
});

// Neue Kategorie speichern
router.post('/kategorie/add', auth, async (req, res) => {
    try {
        await Kategorie.create(req.body);
        res.redirect('/admin/kategorie');
    } catch (err) {
        res.render('admin/kategorie-form', { error: "Fehler beim Erstellen." });
    }
});

router.post('/kategorie/edit/:id', auth, async (req, res) => {
    try {
        await Kategorie.update(req.body, { where: { id: req.params.id } });
        res.redirect('/admin/kategorie');
    } catch (err) {
        res.status(500).send("Fehler beim Aktualisieren");
    }
});

// Kategorie löschen
router.post('/kategorie/delete/:id', auth, async (req, res) => {
    try {
        // Prüfen, ob noch Tickets diese Kategorie nutzen
        const ticketCount = await Ticket.count({ where: { kategorie: req.params.id } });

        if (ticketCount > 0) {
            // Falls ja: Nicht löschen und Fehler zurückgeben (oder zur Liste zurück)
            return res.status(400).send("Kategorie kann nicht gelöscht werden, da sie noch Tickets zugeordnet ist.");
        }

        // Falls nein: Löschen
        await Kategorie.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/kategorie');
    } catch (err) {
        res.status(500).send("Fehler beim Löschen der Kategorie");
    }
});

export default router;