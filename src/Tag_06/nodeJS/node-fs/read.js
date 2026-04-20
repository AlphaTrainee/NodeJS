"use strict";

const fs = require("fs");
// import fs-Modul aus NodeJS Standartbibliothek
// fs-modul stellt Methoden für Arbeit mit FileSystem zur Verfügung

const data = fs.readFileSync("./products.csv", "utf8");
// liest File synchron ein (blockierend)
// rückgabe = eingelesener inhalt der Datei
console.log(data);



/*
   Node-Standardbibliothek

   Bibliothek definiert gut dokumentierte Schnittstelle (engl. interface) mit Angaben zu Funktionsaufrufen
   so eine Schnittstelle wird häufig API (engl. application programming interface) genannt

   beispielhaft hier einige zur Verfügung stehende Module:

   Modul       Zweck

   buffer      Buffer
   console     Ausgabe/Debugging in die Eingabeaufforderung (z.B.console.log(…))
   crypto      Kryptographie
   fs          Dateisystemzugriff
   os          Interaktion mit dem Betriebssystem
   stream      Datenströme
   zlib        Datenkomprimierung
    ...

   jedes Modul hat Stabilitätswert:
   beschreibt Stabilität der Schnittstelle
   Bereich geht von 0 (sehr instabil) zu 3 (sehr stabil)

   0	- deprecated
   1	- experimentell
   2	- stabil
   3	- wird nicht mehr gepflegt, gibt Alternativen, jedoch unwahrscheinlich, dass es entfernt wird
   https://nodejs.org/dist/latest-v16.x/docs/api/documentation.html#stability-index


   können Module mit Werten 2-3 ruhig verwenden ohne Angst zu haben, dass zukünftige Version der Standardbibliothek die Schnittstelle so ändert, dass Code nicht mehr funktioniert

   bei Werten 0-1 überlegen, ob Gebrauch sinnvoll, wenn wir Code längerfristig warten müssen



    Dateisystem-API

    kurze Referenz zu einigen der fast 100 Funktionen,
    die Schnittstelle im fs-Modul bietet:

    fs.readFileSync(…)
    liest eine Datei ein (blockierende Variante)
    Beispiel
    const data = fs.readFileSync("products.csv", "UTF8");

    fs.readFile(…)
    liest eine Datei ein (asynchrone Variante)
    Beispiel
    const data = fs.readFile( "products.csv", "UTF8",
    (error, data) => console.log(data) );

    fs.writeFileSync(…)
    schreibt Daten in eine Datei;
    bereits vorhandene Daten werden überschrieben
    (blockierende Variante)
    Beispiel
    const data = "Hello World";
    fs.writeFileSync("hello.txt", data, "UTF8");

    fs.writeFile(…)
    schreibt Daten in eine Datei;
    bereits vorhandene Daten werden überschrieben
    (asynchrone Variante)
    Beispiel
    const data = "Hello World";
    fs.writeFile("hello.txt", data, "UTF8",
        error => {
            if (error) console.log("Error: " + error);
        }
    );

    fs.statSync(…)
    ermittelt Infos zur Datei (blockierende Variante)
    Beispiel
    const stats = fs.statSync("hello.txt");
    console.log(stats.size);  // => size in bytes

    fs.stat(…)
    ermittelt Infos zur Datei (asynchrone Variante)
    Beispiel
    fs.stat("hello.txt",
        (error, stats) => console.log(stats.size)
    ); // => size in bytes

    fs.unlinkSync(…)
    löscht eine Datei (blockierende Variante)
    Beispiel
    fs.unlinkSync("hello.txt");

    fs.unlink(…)
    löscht eine Datei (asynchrone Variante)
    Beispiel
    fs.unlink("hello.txt",
        error => {
            if (error) console.log("Error: " + error);
        }
    );
 */