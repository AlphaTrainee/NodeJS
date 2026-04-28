import express from 'express';
const router = express.Router();
import Ticket from './../models/Ticket.js';

// GET: Alle verfügbaren Tickets abrufen
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Tickets konnten nicht geladen werden.' });
  }
});

export default router;