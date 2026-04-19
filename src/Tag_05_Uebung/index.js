"use strict";

// https://github.com/pietow/alphatraining_js-live/blob/main/1-objekte/13-%C3%9Cbung.md
{
    console.log("================= Stufe 1 – Factory-Funktion =================");

    const createFahrzeugProto = {
        beschreiben(x) { return console.log(`${this.marke} (${this.typ}) - ${this.ps} PS`) },
        istSchnell() { return console.log(this.ps > 150) },
    }

    function createFahrzeug(marke, ps, typ) {
        const p = Object.create(createFahrzeugProto);
        p.marke = marke;
        p.ps = ps;
        p.typ = typ;

        return p;
    }

    // Erwartetes Verhalten:
    const f = createFahrzeug("BMW", 200, "PKW");
    f.beschreiben() // => "BMW (PKW) – 200 PS"
    f.istSchnell()  // => true

}

{
    console.log("================= Stufe 2 – Konstruktorfunktion =================");

    function Fahrzeug(marke, ps, typ) {
        this.marke = marke;
        this.ps = ps;
        this.typ = typ;
    }

    Fahrzeug.prototype = {
        beschreiben() { return console.log(`${this.marke} (${this.typ}) - ${this.ps} PS`) },
        istSchnell() { return console.log(this.ps > 150) },
    }

    // Erwartetes Verhalten:
    const f = new Fahrzeug("BMW", 200, "PKW");
    console.log(f instanceof Fahrzeug);              // => true
    console.log(f.hasOwnProperty("marke"));          // => true
    console.log(f.hasOwnProperty("beschreiben"));    // => false – geerbt!

}

{
    console.log("================= Stufe 3 – class-Syntax =================");

    class Fahrzeug {
        static Anzahl = 0;

        constructor(marke, leistung, typ) {
            this.marke = marke
            this.leistung = leistung
            this.typ = typ

            Fahrzeug.Anzahl++;
        }

        static vergleiche(a, b) { return (a.leistung > b.leistung) ? a : b }
    }

    // Erwartetes Verhalten:
    const a = new Fahrzeug("BMW", 200, "PKW");
    const b = new Fahrzeug("VW", 120, "PKW");

    console.log(a.leistung);           // => 200

    console.log(Fahrzeug.vergleiche(a, b)) // => a

    console.log("================= Stufe 4 – Subklasse =================");

    class Elektroauto extends Fahrzeug {
        constructor(marke, leistung, typ, reichweite) {
            // super() ruft den constructor der Elternklasse (Fahrzeug) auf
            // Erledigt marke, leistung und typ für uns
            super(marke, leistung, typ);

            // Die neue Eigenschaft, die nur Elektroautos haben
            this.reichweite = reichweite;
        }

        // Methode überschreiben
        beschreiben() {
            return `${this.marke} (Elektro) – ${this.leistung} PS – ${this.reichweite}km Reichweite`;
        }

        // Neue Methode mit deiner Formel
        ladezeit(km) {
            return `${(km / this.reichweite) * 2} Stunde`;
        }
    }

    const e = new Elektroauto("Tesla", 300, "PKW", 500);
    console.log(e instanceof Elektroauto);  // => true
    console.log(e instanceof Fahrzeug);     // => true – Prototypenkette!
    console.log(e.beschreiben());           // => "Tesla (Elektro) – 300 PS – 500km Reichweite"
    console.log(e.ladezeit(250));           // => 1 Stunde
    console.log(Fahrzeug.Anzahl);           // => 3 – Elektroauto zählt mit!
    console.log(Fahrzeug.length);           // ... woher die Anzahl kommen soll wurde nicht definiert ..

    console.log("================= Stufe 5 – Prototypenkette direkt erkunden =================");
    console.log(Object.getPrototypeOf(e));
    console.log(Object.getPrototypeOf(Object.getPrototypeOf(e)));
    console.log(e.hasOwnProperty('beschreiben'));
    console.log(e.hasOwnProperty('ladezeit'));
    console.log(Object.getPrototypeOf(Elektroauto));
}

