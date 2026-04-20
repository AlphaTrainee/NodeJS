import { Book, LimitedBook } from './Book.js';

/* 
Erstelle eine Klasse Book mit den Feldern title, author, price, stock und den Methoden shortPrint()
(gibt eine kurze Beschreibung zurück) und sell(qty) (reduziert den Bestand, keine negativen Werte
zulassen).
Baue Getter/Setter für price (nur > 0 erlaubt) und stock (nur >= 0).
Leite eine Klasse LimitedBook von Book ab, mit zusätzlichem Feld limit. Überschreibe sell(qty), sodass
der Bestand nie unter limit fällt.
Ergänze eine statische Methode createSample() in Book, die ein Beispiel-Objekt zurückgibt.
Erzeuge mindestens zwei Instanzen und gib die Ergebnisse der Methoden in der Konsole aus.
Arbeite mit ES6 Modulen
*/

const book1 = new Book("Der Alchimist", "Paulo Coelho", 12.90, 15);
book1.sell(20);
console.log(book1.stock);
// book1.price = 0;
// book1.stock = -1;
console.log(book1);

const book2 = new Book("1984", "George Orwell", 10.00, 12);
console.log(book2);

const book3 = new Book("Der Herr der Ringe", "J.R.R. Tolkien", 35.00, 8);
console.log(book3);

const book4 = Book.createSample();
console.log(book4);

const bookLtd1 = new LimitedBook("Der Alchimist", "Paulo Coelho", 12.90, 15, 10);
bookLtd1.sell(5);
console.log(bookLtd1.stock);
console.log(bookLtd1);

const bookLtd2 = new LimitedBook("1984", "George Orwell", 10.00, 12, 20);
console.log(bookLtd2);

const bookLtd3 = new LimitedBook("Der Herr der Ringe", "J.R.R. Tolkien", 35.00, 8, 30);
console.log(bookLtd3);