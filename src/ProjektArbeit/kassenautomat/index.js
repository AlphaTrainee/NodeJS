
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import sequelize from './database/db.js';

import path from 'path';
import { fileURLToPath } from 'url';

// Routen importieren
import ticketRoutes from './routes/ticketRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Wichtig für dein lokales HTTP ohne SSL
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 24 Stunden
    }
}));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routen registrieren
app.use('/api/tickets', ticketRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_HOST || 'localhost';

// DB-Verbindung und Serverstart
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server läuft auf http://${HOST}:${PORT}`);
    console.log(`Rest-API: http://${HOST}:${PORT}/api/tickets`);
    console.log(`Backend: http://${HOST}:${PORT}/admin`);
  });
}).catch(err => {
  console.error('Datenbankverbindung fehlgeschlagen:', err);
});