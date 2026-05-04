import express from 'express';
const router = express.Router();
import Ticket from './../models/Ticket.js';
import Category from '../models/Category.js';

Ticket.belongsTo(Category, { foreignKey: 'category' });
Category.hasMany(Ticket, { foreignKey: 'category' });

// GET: Alle verfügbaren Tickets abrufen
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      include: [{
        model: Category,
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