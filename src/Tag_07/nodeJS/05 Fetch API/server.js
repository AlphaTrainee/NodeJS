import express from "express";

// https://expressjs.com/
// npm i express

const app = express();
const IP = "127.0.0.1";
const PORT = 3000;

// die zuerst gefundene Route wird ausgeliefert!!

// Access Log ...
app.use(function(req, res, next) {
    console.log(`Time: ${Date.now()}`);
    console.log(`Request ${req.method} ${req.url}`);
    next();
});

app.use(express.static("public"));

app.get("/data", (req, res) => {
    let kursDaten = {
        volume: (1234 + 400 * Math.random()).toFixed(2),
        price: (1000 + 100 * Math.random()).toFixed(2),
        time: new Date().toLocaleTimeString()
    };
    res.send(kursDaten);
});

// Server atarten
app.listen(PORT, IP, () => console.log(`http://${IP}:${PORT}`)); // gibt die URL im Terminal aus, einfacher um direkt anzuklicken
