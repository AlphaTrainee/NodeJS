
export class Book {
    constructor(title, author, price, stock) {
        this._title = title;
        this._author = author;
        this._price = price;
        this._stock = stock;
    }

    shortPrint() {
        return `${this._title} von ${this._author} für ${this._price} Euro (${this._stock} auf Lager)`;
    }

    sell(qty) {
        (this._stock - qty >= 0) ? this._stock -= qty : console.log(`Fehlerhafte Eingabe: Bestand ${this._stock} nicht ausreichend!`);
    }

    get price() {
        return this._price;
    }
    set price(newprice) {
        (newprice > 0) ? this._price = newprice : console.log("Fehlerhafte Eingabe: Preis zu niedrig");
    }

    get stock() {
        return this._stock;
    }

    set stock(newStock) {
        (newStock >= 0) ? this._stock = newStock : console.log(`Fehlerhafte Eingabe: Bestand (${newStock}) zu niedrig`);
    }

    static createSample() {
        return new this("Clean Code", "Robert C. Martin", 34.95, 15);
    }
}

export class LimitedBook extends Book {
    constructor(title, author, price, stock, limit) {
        super(title, author, price, stock);
        this._limit = limit;
    }

    sell(qty) {
        (this.stock - qty >= this._limit) ? this.stock -= qty : console.log("Fehlerhafte Eingabe: Limit überschritten!");
    }
}
