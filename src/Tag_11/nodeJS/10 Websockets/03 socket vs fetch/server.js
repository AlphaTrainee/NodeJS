import express from "express";

const app = express();
const PORT = 3000;
const IP = "127.0.0.1";

app.use(express.static("public"));

import { createServer } from "http";
const webServer = createServer(app);

import { Server } from "socket.io";
const io = new Server(webServer, { transports: ["websocket","polling"] });

io.on("connection", (socket) => { console.log("New client connected"); });

(function kursDaten() {
    const dataObj = {
        volume: (1800 + 1956 * Math.random() ).toFixed(2),
        price: (10.25 + 0.75 * Math.random()).toFixed(2),
        time: new Date().toLocaleString()
    };

    io.emit("kursDaten", dataObj);

    const restart = Math.floor(Math.random() * 10) + 1;
    setTimeout(kursDaten, restart * 1000);
})();

webServer.listen(PORT, IP, () => { console.log(`Server is running on ${IP}:${PORT}`); });