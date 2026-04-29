import express from 'express';
const router = express.Router();
import Ticket from './../models/Ticket.js';
import Kategorie from '../models/Kategorie.js';

Ticket.belongsTo(Kategorie, { foreignKey: 'kategorie' });
Kategorie.hasMany(Ticket, { foreignKey: 'kategorie' });

// GET: Alle verfügbaren Tickets abrufen
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      include: [{
        model: Kategorie,
        attributes: ['name'] // Lädt nur den Namen, falls du die restlichen Meta-Daten der Kat nicht in der API brauchst
      }]
    });
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Tickets konnten nicht geladen werden.' });
  }
});

export default router;