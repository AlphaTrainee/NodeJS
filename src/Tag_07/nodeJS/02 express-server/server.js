import express from "express";

const app = express();
const IP = "127.0.0.1";
const PORT = 3000;


// Routing
// root
app.get("/", (req, res) => {
    // res.end(data, [,encoding[, callback]])
    
    // Prozess beenden und Response ausliefern
    // res.end("Hallo Welt") // res.status(404).end() ;

    // res.sendFile(__dirname + "/public.index.html");
    // res.send([body-dat[, encoding]]);

    res.send("<p><b>Hallo Welt!</b></p>");

});

app.get("/about", (req, res) => {
    res.send("<p><b>Thats Me</b></p>");
});

// Server atarten
app.listen(PORT, IP, () => console.log(`http://${IP}:${PORT}`)); // gibt die URL im Terminal aus, einfacher um direkt anzuklicken
