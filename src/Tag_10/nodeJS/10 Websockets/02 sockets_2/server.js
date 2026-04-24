import express from "express";
import 'dotenv/config';

const app = express();
const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT;

app.use(express.static("public"));

import { createServer } from "http";
const webServer = createServer(app);

import { Server } from "socket.io";
const io = new Server( webServer, { transports: ["websocket", "polling"] });

io.on("connection", socket => {
    console.log("Client connected", socket.id);

    // initialen Zustand der Lampe festlegen
    let lightState = false;

    socket.on("getLightState", () => socket.emit("setLightState", lightState) );
    socket.on("toggleLight", () => {
        lightState = !lightState;
        // Event beim Sender-User auslösen
        // socket.emit("setLightState", lightState);
        // Event bei allen verbundenen Clients auslösen
        // io.emit("setLightState", lightState);
        // Event bei allen Clients - exclusive Sender-Client auslösen
        socket.broadcast.emit("setLightState", lightState);
    });
});

webServer.listen(PORT, HOST, () => console.log(`Server is running on http://${HOST}:${PORT}`));