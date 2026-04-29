"use strict";
// function add (a,b) { return a + b };
// console.log(add("1",2)); // "12" => unerwartetes Ergebnis
// function ist nicht typisiert - Parameter kann bsw. auch string entgegennnehmen
function add(a, b) {
    return a + b;
}
;
console.log(add(1, 2)); // 3
// console.log(add("1",2)); // Compile-Fehler: Argument vom Typ '"1"' ist nicht zuweisbar an Parameter vom Typ 'number'.
// explizite Typen
// number
let alter = 30; // Ganzzahl
let pi = 3.14159; // Dezimalzahl
let hex = 0xf00d; // Hexadezimalzahl
// garantiert typsichere Funktion mit garantiert numerischer Rückgabe
function multiply(x) {
    return x * 2;
}
;
console.log(multiply(3)); // 6
// console.log(multiply("3")); // Compile-Fehler: Argument vom Typ '"3"' ist nicht zuweisbar an Parameter vom Typ 'number'.
// string
let firstName = "Alice"; // doppelte || einfache Anführungszeichen
let greeting = `Hello, ${firstName}!`; // Template-String
let email = "FAD@gAdgET.oRg";
let normailzeMail = email.toLowerCase();
// booleans
let isAdmin = true;
// let isActive : boolean = "false";    // Compile-Fehler: Argument vom Typ '"false"' ist nicht zuweisbar an Parameter vom Typ 'boolean'.
// Arrays (Listen)
// Variante 1 (Typ[]):
let numbers = [1, 2, 3, 4, 5]; // reines Zahlen-Array
let words = ["Hello", "World"]; // reines String-Array
let mixed = [1, "Hello"]; // gemischtes Array mit Zahlen und Strings
// Variante 2 (Array<Typ>):
let colors = ["red", "green", "blue"];
let mixed2 = [1, "Hello"];
numbers.push(6);
// numbers.push("7"); // Compile-Fehler: Argument vom Typ '"7"' ist nicht zuweisbar an Parameter vom Typ 'number'.
// higher orders sind verfügbar (z.B. forEach)
numbers.forEach(function (num) {
    console.log(num);
});
// numbers-Array kann wachsen - es ist nut festgelegt, dass es Elemente des gleichen Typs enthält
// Tupel - Anzahl und Typ der Elemnente sind unveränderlich
let x = ["Hello", 10];
x[0] = "Goodbye";
x[1] = 20;
// x[1] = "20"; // Compile-Error: Type 'string' is not assignable to type 'number'.
// x[2] = 1;    // Compile-Error: Index signature in type '[string, number]' only permits reading.
let coords = [10, 20];
let rgba = [255, 0, 0, 0.5];
// Destructuring
let [lat, lon] = coords;
// Enums
// schlechtes Beispiel
function checkStatus(status) {
    if (status === 0)
        return "Held wartent";
    if (status === 1)
        return "Held ist aktiv";
    if (status === 2)
        return "Held ist inaktiv";
    return "Heldenstatus Unbekannt";
}
console.log(checkStatus(1)); // Werte sind unklar (Magic Numbers)
// besser lesbar mit Enums
var Status;
(function (Status) {
    Status[Status["Wartend"] = 0] = "Wartend";
    Status[Status["Aktiv"] = 1] = "Aktiv";
    Status[Status["Inaktiv"] = 2] = "Inaktiv"; // automatisch 2
})(Status || (Status = {}));
;
let heroStatus = Status.Aktiv;
console.log(heroStatus);
// enums mit eigenen Werten
// einige explizit festgelegt, andere automatisch
var Direction;
(function (Direction) {
    Direction[Direction["North"] = 1] = "North";
    Direction[Direction["South"] = 2] = "South";
    Direction[Direction["East"] = 10] = "East";
    Direction[Direction["West"] = 11] = "West"; // automatisch 11
})(Direction || (Direction = {}));
;
let direction = Direction.East;
console.log(direction);
// nur explizite Festlegung
var Color;
(function (Color) {
    Color["Red"] = "ff0000";
    Color["Green"] = "00ff00";
    Color["Blue"] = "0000ff";
})(Color || (Color = {}));
;
let color = Color.Green;
console.log(color);
// String-enums für APIs
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["DELETE"] = "DELETE";
})(HttpMethod || (HttpMethod = {}));
;
let request = HttpMethod.GET;
console.log(request);
/*
    Vorteile:
    - verbessertes Debugging
    - logs lesbarer
    - sehr nützlich für API-Kommunikation
    - sind selbsterklärend

    Nutzung:
    - log-Outputs
    - Speicherung in DB
    - API-Kommunikation
*/
// Union Types (Oder-Typen)
let id;
id = 1;
id = "1";
function handleResponse(response) {
    if (response.success) {
        // TS weiß, dass es Property data gibtund irgendwelche Daten verarbeitet werden
        console.log(response.data);
    }
    else {
        // TS weiß, dass es Property error gibt und irgendwelche Fehlermeldung ausgegeben werden soll
        console.error(response.error);
    }
}
handleResponse({ success: true, data: "Hello" });
handleResponse({ success: false, error: "Error" });
// Funktionen mit flexiblen Parametern
function formatId(id) {
    if (typeof id === "number") {
        return id.toString();
    }
    else {
        return id;
    }
}
console.log(formatId(123)); // "123"
console.log(formatId("123")); // "abc"
// console.log(formatId(true)); // Compile-Fehler: Argument vom Typ 'boolean' ist nicht zuweisbar an Parameter vom Typ 'string | number'.
// rest-Parameter (Variablen-Argumente)
function printAll(...args) {
    args.forEach(arg => console.log(arg));
}
printAll(1, 2, 3, 4, 5);
function handleUserEvent(event) {
    if (event.type === "click") {
        console.log("User clicked on", event.target);
    }
    else if (event.type === "keydown") {
        console.log("User pressed key", event.keyCode);
    }
}
// Union-Types mit Arrays
// Array, das strings und numbers enthalten kann
let numOrString = [1, "Hello", 3];
// Array, dass nur strings oder nur numbers enthalten kann
let stringOrNumber;
stringOrNumber = ["Hello", "Hi", "Huhu"];
stringOrNumber = [1, 2, 3];
// stringOrNumber = ["1",2];   // Compile-Fehler: Type '(string | number)[]' is not assignable to type 'string[] | number[]'.
// spezielle Typen
// any = beliebig => sehr unsicher, sollte möglichst nicht verwendet werden
let notSure = 4;
notSure = "maybe a string instead";
notSure = false;
notSure = { some: "object", value: 5 };
notSure = [1, 2, 3];
notSure = function () { return 42; };
notSure = null;
notSure = undefined;
// unknown = sicherer Alternative => Typ, aber nicht typisiert
let maybe = 4;
maybe = "maybe a string instead";
maybe = false;
maybe = { some: "object", value: 5 };
maybe = [1, 2, 3];
maybe = function () { return 42; };
maybe = null;
maybe = undefined;
// void = keine Rückgabe
function logMessage(message) {
    console.log(message);
}
logMessage("Hello");
// never - soll nie eintreten
function error(message) {
    throw new Error(message);
}
// null und undefined
let u = undefined;
let n = null;
let myShape = { color: "red", shape: "square" };
;
let user = {
    name: "Alice",
    age: 30,
    id: 123,
    address: "123 Main St" // kann weggelassen werden
};
function showUserInfos(user) {
    console.log(user.name, user.age, user.id); // Werte sind sicher verfügbar
}
showUserInfos(user);
;
let employee = {
    name: "Bob",
    age: 40,
    id: 456,
    salary: 50000,
    address: "456 Main St"
};
;
;
// Car bekommt KFZ-Properties + eigene Properties
let myCar = {
    brand: "BMW",
    model: "X5",
    color: "red",
    year: 2020,
    doors: 4
};
;
;
;
const vehicle = {
    // con Car geerbt
    brand: "Tesla",
    model: "Model S",
    color: "black",
    price: 100000,
    year: 2022,
    doors: 4,
    // von ElectricCar geerbt
    battery: 100,
    reichweite: 600,
    ladezeit: 1,
    // von Autonom geerbt
    autopilot: true,
    autonomieLevel: 5,
    // eigene Eigenschaft
    softwareVersion: "v10.0"
};
;
let rechner = {
    add: function (a, b) { return a + b; },
    multiply: (x, b) => x * b,
    divide: function (x, b) { return x / b; }
};
console.log(rechner.add(2, 3)); // 5
console.log(rechner.multiply(4, 5)); // 20
;
let person = {
    name: "Alice",
    age: 30,
    address: "123 Main St"
};
// beliebig viele Properties möglich
// Interfaces für Objekte und Funktionen
// Types für Union Types, Rrimitives, Computed Types
// Klassen
class Person2 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    setAge(age) {
        if (age < 0) {
            throw new Error("Age must be positive");
        }
        this.age = age;
    }
    getAge() {
        return this.age;
    }
}
;
let alice = new Person2("Alice", 30);
// console.log(alice.name, alice.age);  // Compiler-Error: Properties "age" and 'name' is private and only accessible within class 'Person2'.
alice.setAge(25);
console.log(alice.getAge());
// Getter und Setter
class Person3 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    get userAge() {
        return this.age;
    }
    set userAge(age) {
        if (age < 0) {
            throw new Error("Age must be positive");
        }
        this.age = age;
    }
}
Person3.MAX_AGE = 120;
const myUser = new Person3("Alice", 30);
;
;
class Ente {
    constructor(name) {
        this.name = name;
        this.maxHeight = 100;
        this.maxTiefe = 100;
    }
    fliegen() { return `${this.name} kann bis zu einer Höhe von ${this.maxHeight} Meter fliegen!`; }
    landen() { return `${this.name} landet relativ unsanft!`; }
    schwimmen() { return `${this.name} kann den ganzen Tag schwimmen!`; }
    tauchen() { return `${this.name} kann bis zu ${this.maxTiefe} Meter tauchen!`; }
}
const ente = new Ente("Ducky");
console.log(ente.fliegen());
