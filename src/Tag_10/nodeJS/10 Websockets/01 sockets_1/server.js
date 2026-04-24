/* 
    https://sequelize.org/
    
    npm init -y && npm i --save express socket.io
    npm install dotenv

*/


import express from "express";
import 'dotenv/config';

const app = express();
const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT;

app.use(express.static("public"));

import { createServer } from "http";
const webServer = createServer(app);

import { Server } from "socket.io";
const io = new Server( webServer, {transports: ["websocket", "polling"]});

io.on("connection", socket => {
    console.log("Client connected", socket.id);
    // console.log("Socket Object:", socket);
});

let terminalStream = process.stdin;
terminalStream.on("data", dataStream => {
    io.emit("news", dataStream.toString().trim());
});

webServer.listen(PORT, HOST, () => console.log(`Server is running on http://${HOST}:${PORT}`));
