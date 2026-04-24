/* 
    https://sequelize.org/
    
    npm init -y && npm i --save express socket.io
    npm install dotenv

*/

import express from "express";
import 'dotenv/config';

const app = express();
// const HOST = process.env.SERVER_HOST;
// const PORT = process.env.SERVER_PORT;
const HOST = "localhost";
const PORT = 3000;

app.use(express.static("public"));

import { createServer } from "http";
const webServer = createServer(app);

import { Server } from "socket.io";
const io = new Server( webServer, {transports: ["websocket", "polling"]});

io.on("connection", socket => {
    console.log("Client connected", socket.id);
    
    // initialser zustand lampe
    let lightState = false;

    socket.on("getLightState", () => socket.emit("setLightState", lightState));

    socket.on("toggleLight",() => {
        lightState = ! lightState;
        // socket.emit("setLightState", lightState);
        // alle cliebts
        io.emit("setLightState", lightState);

        // io.brodcast.emit("setLightState", lightState);
    })
    

});


webServer.listen(PORT, HOST, () => console.log(`Server is running on http://${HOST}:${PORT}`));
