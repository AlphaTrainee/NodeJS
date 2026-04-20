import fs from "fs";

// asynchrone Variante für einlesen einer Datei
fs.readFile(
    "./products.csv",                       // einzulesende Datei
    "utf8",                                 // Codierung
    (err, data) => {          // callback
        if (err) return console.log(err);
        console.log(data);
    }
);

console.log("start for");
for (let i = 0; i < 10000000000; i++) {}
console.log("end for");

console.log("ready");