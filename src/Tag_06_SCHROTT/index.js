"use strict";

// Klassensyntax Getter / Setter
{
    /*     
        class Product {
            constructor(name, price, cat, qty) {
                this._name = name;
                this._price = price;
                this._cat = cat;
                this._qty = qty;
            }
    
            get shortPrint() {
                return `${this._cat}: ${this._name} für ${this._price} € (${this._qty} auf Lager)`
            }
    
            set addItem(qty) {
                (qty > 0) ? this._qty += qty : console.log("Fehlerhafte Eingabe");;
            }
    
            set subItem(qty) {
                (this._qty - qty > 0) ? this._qty -= qty : console.log("Fehlerhafte EIngabe");
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
                (newPrice > 0) ? this._price = newPrice : console.log("Fehlerhafte EIngabe");
            }
    
            get name () {
                return this._name;
            }
    
            set name (newName) {
                this._name = newName;
            }
        }
    
        const product1 = new Product("Kaffee", 1.50, "Kaffee", 10);
        const product2 = new Product("Brot", 2.00, "Brot", 20);
        const product3 = new Product("Bier", 3.00, "Bier", 30);
    
        console.log(product1.shortPrint);
        product1.price = 17.50
        console.log(product1.price);
        product1.addItem = 10;
        console.log(product1.shortPrint);
        product1.subItem = 5;
        console.log(product1._price = -20);
        console.log(product1.shortPrint);
    
    
        // Attribute setzen
        // vorhandene Property
        Object.defineProperty(product1, "_price", {enumerable: false, configurable: false});
        // delete product1.price;
    
        Object.defineProperty(product1, "_desc", {value: "Best Quality...", enumerable: true, writable: true});
        // delete product1._desc;
    
    / *     for (property in product1) {
            console.log(property);
        }
    
        let descVal = "Best Quality since 1765"; * /
     */
}

{
/* 
    class Product {
        constructor(name, price, cat, qty) {
            this._name = name;
            this._price = price;
            this._cat = cat;
            this._qty = qty;
        }

        shortPrint() {
            return `${this._cat}: ${this._name} für ${this._price} € (${this._qty} auf Lager)`
        }

        set addItem(qty) {
            (qty > 0) ? this._qty += qty : console.log("Fehlerhafte Eingabe: negativer Wert");;
        }

        set subItem(qty) {
            (this._qty - qty > 0) ? this._qty -= qty : console.log("Fehlerhafte EIngabe");
        }

        get cat() {
            return this._cat;
        }

        set cat(newCat) {
            this._cat = newCat;
        }

        get price() {
            return this._price;
        }

        set price(newPrice) {
            (newPrice > 0) ? this._price = newPrice : console.log("Fehlerhafte EIngabe");
        }

        get name() {
            return this._name;
        }

        set name(newName) {
            this._name = newName;
        }
    }

    class ltdProduct extends Product {
        constructor(name, price, cat, qty, limit) {
            // immer zuerst aufrufen
            super(name, price, cat, qty);
            // danach ..
            this._limit = limit;
        }

        // Methoden werden vererbt, können überschrieben werden
        set addItem(qty) {
            (qty > 0 && qty <= this._limit) ? super.addItem = qty : console.log("Fehlerhafte Eingabe:Limit Überschritten");
        }
    }

    const product1 = new ltdProduct("Kaffee", 1.50, "Kaffee", 10, 10);
    product1.addItem = 15;
    console.log(product1.shortPrint());
    product1.addItem = 10;
    console.log(product1.shortPrint());
    product1.addItem = -10;
    console.log(product1.shortPrint());
 */    
}

{
/*     
    // statische Eigenschaften
    class Whisky {
        constructor(name, price, cat, qty, art) {
            this._name = name;
            this._price = price;
            this._cat = cat;
            this._qty = qty;
            this._art = art;
        }

        shortPrint() {
            return `${this._cat}: ${this._name} für ${this._price} € (${this._qty} auf Lager)`
        }

        set addItem(qty) {
            (qty > 0) ? this._qty += qty : console.log("Fehlerhafte Eingabe: negativer Wert");;
        }

        set subItem(qty) {
            (this._qty - qty > 0) ? this._qty -= qty : console.log("Fehlerhafte EIngabe");
        }

        get cat() {
            return this._cat;
        }

        set cat(newCat) {
            this._cat = newCat;
        }

        get price() {
            return this._price;
        }

        set price(newPrice) {
            (newPrice > 0) ? this._price = newPrice : console.log("Fehlerhafte EIngabe");
        }

        get name() {
            return this._name;
        }

        set name(newName) {
            this._name = newName;
        }

        // statische Methode
        static setArt() {
            return {
                IRE: "Irish Whisky",
                SC:  "Scotch Whisky",
                BB:  "Bourbon Whisky",
            }
        }

        // statische Eigenschaft
        static WhiskyArt = {
            IRE: "Irish Whisky",
            SC:  "Scotch Whisky",
            BB:  "Bourbon Whisky",
        }
    }

    const whisky1 = new Whisky("Irish Whisky", 1.50, "Whisky", 10, Whisky.setArt().IRE);
    console.log(whisky1);

    const whisky2 = new Whisky("Irish Whisky", 2.00, "Whisky", 20, Whisky.setArt().IRE);
    console.log(whisky2);
 */
}

// Symbole in Klassen
{
/* 
    const DOG_NAME = Symbol("DogName");

    class MyDog {
        constructor(name) {
            this[DOG_NAME] = name;
        }

        get name() {
            return this[DOG_NAME];
        }

        set name(newName) {
            this[DOG_NAME] = newName;
        }
    }

    let dog = new MyDog("Bello");
    console.log(dog.name);
    dog.name = "Wau";
    console.log(dog.name);
    // console.log(dog[DOG_NAME]);



    console.log(Object.getOwnPropertySymbols(dog));
    Object.getOwnPropertySymbols(dog)[0] = "Hasso";
    console.log(dog[Object.getOwnPropertySymbols(dog)[0]]);
 */
}

// private Eigenschaften
{
    // seit ES10

    class HomeAnimals {
        #anzahl;
        #initialCount;

        constructor(count = 0) {
            this.#initialCount = count;
            this.reset(count);
        }

        reset(count = this.#initialCount) {
            this.#anzahl = count;
        }

        add(count = 1) {
            this.#anzahl += count;
        }

        sub (count = 1) {
            this.#anzahl -= count;
        }

        get count() {
            return this.#anzahl;
        }
    }    

    const animals = new HomeAnimals(10);
    console.log(animals);
    console.log(animals.count);

    animals.add(5);
    console.log(animals.count);
    animals.sub(3)
    console.log(animals.count);
    animals.sub();
    console.log(animals.count);
    animals.reset();
    console.log(animals.count);

    // console.log(animals.#anzahl);

    console.log(animals["#anzahl"]);
    
}