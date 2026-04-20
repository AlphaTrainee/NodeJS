"use strict";

// Klassensyntax Getter und Setter
{
    // wenn Property mit _ gepräfixt, dann nicht direkt zugreifen (Konvention)
    // hier gibt es dann Zugriffsmethoden bzw. Getter und Setter, um mit der Eigenschaft  zu arbeiten oder Property ist nur für internen Gebrauch gedacht

    class Product {

        constructor(name, price, cat, qty) {
            this._name = name;
            this._price = price;
            this._cat = cat;
            this._qty = qty;
        }

        // Namen von Settern und Gettern sollten sich von Eigenschaften unterscheiden, damit es nicht zu Endlos-Rekursionen kommt und letztlich zum Stack-Überlauf und Programm-Absturz

        get shortPrint () {
            return `${this._cat}: ${this._name} für ${this._price} Euro (${this._qty} auf Lager)`;
        }

        set addItem (qty) {
            (qty > 0)  ? this._qty += qty : console.log("Fehlerhafte Eingabe");
        }

        set subItem (qty) {
            (this._qty - qty > 0)  ? this._qty -= qty : console.log("Fehlerhafte Eingabe");
        }

        get cat () {
            return this._cat;
        }
        set cat (newCat) {
            this._cat = newCat;
        }

        get price () {
            return this._price;
        }
        set price (newPrice) {
            (newPrice > 0) ? this._price = newPrice : console.log("Fehlerhafte Eingabe");
        }

        get name () {
            return this._name
        }
        set name (newName) {
            this._name = newName;
        }
    }

    // initialisieren
    const product1 = new Product("Kaffee", 1.50, "Kaffee", 10);
    const product2 = new Product("Brot", 2.00, "Brot", 20);
    const product3 = new Product("Bier", 3.00, "Bier", 30);

    console.log(product1.shortPrint);
    product1.price = 17.50;
    console.log(product1.price)
    product1.addItem = 10;
    console.log(product1.shortPrint);
    product1.subItem = 5;
    console.log(product1._price = -20); // Zugriff möglich -> _-präfix ist Konvention
    console.log(product1.shortPrint);

    // Eigenschaftsattribute setzen

    // vorhandene Property
    // Object.defineProperty(object, property, descriptor)
    // bei vorhandenen Properties: configurable, enumerable, writable stehen Attribute auf true, müssen explizit auf false gesetzt werden
    Object.defineProperty(product1, "_price", {enumerable: false, configurable: false})
    // delete product1._price; // Löschen nicht möglich, da configurable: false

    // neue Property
    // Object.defineProperty(object, property, descriptor)
    // bei neuen Properties: configurable, enumerable, writable werden Attribute auf false gesetzt, müssen explizit auf true gesetzt werden
    Object.defineProperty(product1, "_desc", {value: "Best Quality...", writable: true});
    // delete product1._desc;

    for (const property in product1 ) {
        console.log(property);
    }

    // Arbeit mit Eigenschaftsattributen set und get
    // bieten besseren Zugriffsschutz
    let descVal = "Best Quality since 1765";
    Object.defineProperty(product1, "desc", {
        get: () => descVal,
        set: (newDesc) => descVal = newDesc
    });
    console.log(product1);
    product1.desc = "Best Quality since 1999";
    console.log(product1.desc);
}

// Klassen erweitern
{
    class Product {
        constructor(name, price, cat, qty) {
            this._name = name;
            this._price = price;
            this._cat = cat;
            this._qty = qty;
        }
        shortPrint() {
            return `${this._cat}: ${this._name} für ${this._price} Euro (${this._qty} auf Lager)`;
        }
        set addItem (qty) {
            (qty > 0)  ? this._qty += qty : console.log("Fehlerhafte Eingabe: Negativer Wert");
        }

        set subItem (qty) {
            (this._qty - qty > 0)  ? this._qty -= qty : console.log("Fehlerhafte Eingabe");
        }

        get cat () {
            return this._cat;
        }
        set cat (newCat) {
            this._cat = newCat;
        }

        get price () {
            return this._price;
        }
        set price (newPrice) {
            (newPrice > 0) ? this._price = newPrice : console.log("Fehlerhafte Eingabe");
        }

        get name () {
            return this._name
        }
        set name (newName) {
            this._name = newName;
        }
    }

    class LtdProduct extends Product {
        constructor(name, price, cat, qty, limit) {
            super(name, price, cat, qty);
            this._limit = limit;
        }

        // immer zuerst mit super() Eltern-Constructor aufrufen
        // erst danach eigene Felder definieren
        // sonst Error

        // Methoden der Elternklasse stehen zur Verfügung, können in Kindklasse genutzt oder überschreiben werden

        // mit super Zugriff auf Elternklassen-Methoden möglich
        set addItem (qty) {
            (qty <= this._limit)  ? super.addItem = qty : console.log("Fehlerhafte Eingabe: Limit überschritten!");
        }
    }

    const product1 = new LtdProduct("Kaffee", 1.50, "Kaffee", 10, 10);
    product1.addItem = 15;
    console.log(product1.shortPrint());
    product1.addItem = 25;
    console.log(product1.shortPrint());
    product1.addItem = -15;
    console.log(product1.shortPrint());
}

// statische Eigenschaften und Methoden
{

    /*
        Statische Methoden = Methoden, die direkt auf Klasse aufgerufen werden / nicht auf Objektinstanz

        geeignet, um Funktionalität bereitstellen, die thematisch zur  Klasse gehört, aber nicht zwangsweise Objektinstanz voraussetzt

        in JavaScript Methode als statisch definieren, indem Schlüsselwort static vorangestellt wird

        Methode kann nun direkt über Klasse aufgerufen werden

        statische Methoden und Eigenschaften:
            - werden direkt auf Klasse aufgerufen
            - werden nicht vererbt
            - sind auf Instanzebene also nicht verfügbar
    */

    class Whisky {
        constructor(name, price, cat, qty, art) {
            this._name = name;
            this._price = price;
            this._cat = cat;
            this._qty = qty;
            this._art = art;
        }
        shortPrint() {
            return `${this._cat}: ${this._name} für ${this._price} Euro (${this._qty} auf Lager)`;
        }
        set addItem (qty) {
            (qty > 0)  ? this._qty += qty : console.log("Fehlerhafte Eingabe: Negativer Wert");
        }

        set subItem (qty) {
            (this._qty - qty > 0)  ? this._qty -= qty : console.log("Fehlerhafte Eingabe");
        }

        get cat () {
            return this._cat;
        }
        set cat (newCat) {
            this._cat = newCat;
        }

        get price () {
            return this._price;
        }
        set price (newPrice) {
            (newPrice > 0) ? this._price = newPrice : console.log("Fehlerhafte Eingabe");
        }

        get name () {
            return this._name
        }
        set name (newName) {
            this._name = newName;
        }

        // statische Methode
        static setArt() {
            return {
                IRE:  "Irish Whiskey",
                SC:   "Scotch Whisky",
                BB:   "Bourbon Whisky",
            };
        }

        // statische Eigenschaft
        static whiskyArt = {
            IRE: "Irish Whisky",
            SC:  "Scotch Whisky",
            BB:  "Bourbon Whisky",
        }
    }
    // veraltet
    // Whisky.WHISKY_ART = {
    //     IRE: "Irish Whisky",
    //     BB: "Bourbon",
    //     SC: "Scotch Whisky"
    // }

    console.log(Whisky.setArt());
    console.log(Whisky.whiskyArt);

    const whisky1 = new Whisky("Irish Whisky", 1.50, "Whisky", 10, Whisky.setArt().IRE);
    console.log(whisky1);
    const whisky2 = new Whisky("Scotch Whisky", 2.00, "Whisky", 20, Whisky.whiskyArt.SC);
    console.log(whisky2);

    // console.log(whisky2.setArt());  // not a function - wird nicht vererbt
    console.log(whisky2.whiskyArt);    // undefined - wird nicht vererbt

    /*
        statische Methoden = Methoden am Funktionsobjekt (Methoden, die am Funktionsobjekt definiert werden)

        Klassensyntax und Schlüsselwort static sind nur Verfeinerungen der pseudoklassischen Objektorientierung

        statische Eigenschaften = Eigenschaften des Funktionsobjektes

        statische Eigenschaften und Methoden werden also nicht vererbt
    */
}

// Verwendung von Symbolen in Klassen
{
    const DOG_NAME = Symbol("DogName");

    class MyDog {
        constructor (name) {
            this[DOG_NAME] = name;
        }
        get name () {
            return this[DOG_NAME];
        }
        set name (newName) {
            this[DOG_NAME] = newName;
        }
    }
    let dog = new MyDog("Bello");
    console.log(dog.name);
    dog.name = "Wau";
    console.log(dog.name);
    console.log(dog[DOG_NAME]);

    /*
        Property lässt sich mit Symbol nicht direkt über Objektinstanz ansprechen, sondern nur über Symbol-Referenz - bietet relativen Schutz vor versehentlichem überschreiben

        wenn Symbol nicht gegeben, kann es über Object-Methode: getOwnPropertySymbols() ermittelt
        und für direkten Zugriff verwenden
    */

    console.log(Object.getOwnPropertySymbols(dog));
    dog[Object.getOwnPropertySymbols(dog)[0]] = "Hasso";
    console.log(dog[Object.getOwnPropertySymbols(dog)[0]]);
}

// native private Eigenschaften
{
    /*
        seit ES10 (ECMA Script 2019) in Erprobung
        seit ES13 (ECMA Script 2022) in Spezifikation integriert

        private Eigenschaften und Methoden mit # gekennzeichnet

        private Eigenschaften und Methoden sind nur innerhalb der Klasse zugänglich, nicht von außen

        private Eigenschaften und Methoden werden nicht vererbt

        private Eigenschaften und Methoden können nicht über Objektinstanz angesprochen werden, sondern nur innerhalb der Klasse

        private Eigenschaften und Methoden bieten besseren Schutz vor versehentlichem überschreiben als Symbol-Properties
     */

    class HomeAnimals {
        #anzahl;
        #initialCount;

        constructor (count = 0) {
            this.#initialCount = count;
            this.reset(count);
        }

        reset (count = this.#initialCount) {
            this.#anzahl = count;
        }

        add (count = 1) {
            this.#anzahl += count;
        }

        sub (count = 1) {
            this.#anzahl -= count;
        }

        get count () {
            return this.#anzahl;
        }
    }

    const animals = new HomeAnimals(10);
    console.log(animals);
    console.log(animals.count);
    animals.add(5);
    console.log(animals.count);
    animals.sub(3);
    animals.sub();
    animals.reset();
    console.log(animals.count);

    // console.log(animals.#anzahl); // SyntaxError: Private field '#anzahl' must be declared in an enclosing class
    console.log(animals["#anzahl"]);    // undefined

    // kein direkter Zugriff auf als privat gekennzeichnete Felder möglich
    // Felder sind vor Zugriff von außen geschützt
    // Felder sind im Objekt gekapselt => weniger Name-Konflikte und Zugriffsprobleme
}