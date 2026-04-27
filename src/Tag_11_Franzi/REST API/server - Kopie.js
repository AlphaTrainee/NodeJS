/* 
    https://sequelize.org/
    
    npm init -y && npm i --save express ejs
    npm install dotenv


*/

import express from "express";
import 'dotenv/config';
import { createServer } from "node:http"; // Native HTTP Modul
import { Server } from "socket.io";      // Socket.io Modul

// 1. Initialisierung
const app = express();
const webServer = createServer(app); // Den Express-Server in einen HTTP-Server "einpacken"
const io = new Server(webServer, {
  transports: ["websocket", "polling"]
});

// 2. Konfiguration & Middleware
const HOST = process.env.SERVER_HOST || 'localhost';
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.static("public"));

// 3. Socket.io Logik (Beispiel)
io.on("connection", (socket) => {
  console.log("Ein User ist verbunden:", socket.id);
});

// 4. Server starten

(function kursDaten() {
    const dataObj = {
        volume: (1800 + 1956 * Math.random()).toFixed(2),
        price: (10.25 + 0.75 * Math.random()).toFixed(2),
        time: new Date().toDateString()
    };
    
    io.emit("kursDaten", dataObj);

    const restart = Math.floor(Math.random() * 10) +1;

    setTimeout(kursDaten, restart * 1000);
})();

webServer.listen(PORT, HOST, () => {
  console.log(`Server läuft auf http://${HOST}:${PORT}`);
});
