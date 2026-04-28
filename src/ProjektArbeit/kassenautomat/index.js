/* 
    https://sequelize.org/
    
    npm init -y && npm i --save express ejs sequelize sqlite3
    npm install mysql2
    npm install dotenv
    // import 'dotenv/config';
    // const HOST = process.env.SERVER_HOST;
    // const PORT = process.env.SERVER_PORT;
    npm install bcrypt

*/

/* 
    https://sequelize.org/
    
    npm init -y
    npm i --save express sequelize sqlite3 mysql2 dotenv nodemon cors 
    npm i -D nodemon

    npm run dev 
    -> npm error Missing script: "dev"
        -> in package.json eintragen
            "scripts": {
                "dev": "nodemon server.js",
                "start": "node server.js"
            },

*/

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './database/db.js';

// Routen importieren
import ticketRoutes from './routes/ticketRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routen registrieren
app.use('/api/tickets', ticketRoutes);
app.use('/api/payment', paymentRoutes);

const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_HOST || 'localhost';

// DB-Verbindung und Serverstart
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server läuft auf http://${HOST}:${PORT}`);
    console.log(`Tickets abrufbar unter http://${HOST}:${PORT}/api/tickets`);
  });
}).catch(err => {
  console.error('Datenbankverbindung fehlgeschlagen:', err);
});