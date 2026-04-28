import express from 'express';
const router = express.Router();

// POST: "Bezahlung" abwickeln
router.post('/purchase', async (req, res) => {
  try {
    const { cart, totalAmount } = req.body;

    // Hier könnte man später die Transaktion in die DB schreiben
    console.log('Kauf erhalten:', cart);
    console.log('Gesamtsumme:', totalAmount);

    // Simulation einer Verzögerung (wie bei einer echten Bankanfrage)
    setTimeout(() => {
      res.status(200).json({ 
        success: true, 
        message: 'Zahlung erfolgreich simuliert!',
        transactionId: Math.random().toString(36).substr(2, 9).toUpperCase()
      });
    }, 1500);

  } catch (err) {
    res.status(500).json({ error: 'Zahlung fehlgeschlagen.' });
  }
});

export default router;