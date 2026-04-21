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

// vorgefertigte Middleware
// liefert statische Files im angegebenen Verzeichnis aus
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

const heroArr = ["Jessica Jones", "Luke Cage", "Daredevil", "Mäh das Schaf"];

// Routing
app.get("/heroes", (req, res) => {
    res.send(heroArr);
})

app.post("/new", (req, res) => {
    // console.log(req.body.herofield);
    heroArr.push(req.body.herofield);   // übermittelte daten auslesen
    // res.send(req.body);
    res.redirect("/");
});

// Server atarten
app.listen(PORT, IP, () => console.log(`http://${IP}:${PORT}`)); // gibt die URL im Terminal aus, einfacher um direkt anzuklicken
