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
app.use(express.json());

let heroes = new Set(["Jessica Jones", "Luke Cage", "Daredevel"]);

app.get("/heroes", (req, res) => res.send([...heroes]));

app.post("/new", (req, res) => {
    heroes.add(req.body.hero);
    res.send([...heroes]);
});

// Server atarten
app.listen(PORT, IP, () => console.log(`http://${IP}:${PORT}`)); // gibt die URL im Terminal aus, einfacher um direkt anzuklicken
