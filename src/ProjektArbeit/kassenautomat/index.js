
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import sequelize from './database/db.js';

import path from 'path';
import { fileURLToPath } from 'url';

// Routen importieren
import frontendRoutes from './routes/frontendRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

const commonCookieConfig = {
    secure: false, // Da du lokal ohne HTTPS arbeitest
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 Stunden
};

app.use('/admin', session({
    name: 'admin_sid', // Das Cookie heißt im Browser anders
    secret: process.env.SESSION_SECRET + '_admin', // Optional: leicht anderes Secret
    resave: false,
    saveUninitialized: false,
    cookie: commonCookieConfig
}));

app.use('/', session({
    name: 'kiosk_sid', // Separates Cookie
    secret: process.env.SESSION_SECRET + '_kiosk',
    resave: false,
    saveUninitialized: false,
    cookie: commonCookieConfig
}));

app.use((req, res, next) => {
    // res.locals macht Variablen in ALLEN ejs-Dateien verfügbar
    res.locals.session = req.session;
    res.locals.cartCount = (req.session && req.session.cart) ? req.session.cart.length : 0;
    res.locals.currentPage = req.path.split('/')[1] || 'home';
    next(); // WICHTIG: Damit die Anfrage zur nächsten Station weitergeht!
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routen registrieren
app.use('/', frontendRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/admin', adminRoutes);

app.use((req, res) => {
    res.status(404)
        .render('error', { error: `Diese Route ${ req.originalUrl } existiert nicht`, err: null });
})

// Globales Error Handling (500-Fehler)
app.use((err, req, res, next) => {
    res.status(500)
        .render('error', { error: `Ein unerwarteter Fehler ist aufgetreten`, err });
});

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
