import express from "express";

// https://expressjs.com/

const app = express();
const IP = "127.0.0.1";
const PORT = 3000;

// die zuerst gefundene Route wird ausgeliefert!!

// Middleware
app.use(function(req, res, next) {
    console.log(`Time: ${Date.now()}`);
    console.log(`Request ${req.method} ${req.url}`);
    next();
});

app.use("/admin", (req, res, next) => {
    console.log(`Admin-Area: ${req.url}`);
    res.send("<b>Zugriff verweigert</b>")
    // console.log(`Time: ${Date.now()}`);
    // console.log(`Request ${req.method} ${req.url}`);
    next();
});

// vorgefertigte Middleware
// liefert statische Files im angegebenen Verzeichnis aus
app.use(express.static("public"));




// Server atarten
app.listen(PORT, IP, () => console.log(`http://${IP}:${PORT}`)); // gibt die URL im Terminal aus, einfacher um direkt anzuklicken
