// function add (a,b) { return a + b };
// console.log(add("1",2)); // "12" => unerwartetes Ergebnis
// function ist nicht typisiert - Parameter kann bsw. auch string entgegennnehmen

function add (a: number, b: number) : number {
    return a + b
};
console.log(add(1,2)); // 3
// console.log(add("1",2)); // Compile-Fehler: Argument vom Typ '"1"' ist nicht zuweisbar an Parameter vom Typ 'number'.

// explizite Typen

// number
let alter : number = 30;    // Ganzzahl
let pi : number = 3.14159;  // Dezimalzahl
let hex : number = 0xf00d;  // Hexadezimalzahl

// garantiert typsichere Funktion mit garantiert numerischer Rückgabe
function multiply (x : number) : number {
    return x * 2
};
console.log(multiply(3)); // 6
// console.log(multiply("3")); // Compile-Fehler: Argument vom Typ '"3"' ist nicht zuweisbar an Parameter vom Typ 'number'.

// string
let firstName : string = "Alice";   // doppelte || einfache Anführungszeichen
let greeting : string = `Hello, ${firstName}!`; // Template-String
let email : string = "FAD@gAdgET.oRg";
let normailzeMail : string = email.toLowerCase();

// booleans
let isAdmin : boolean = true;
// let isActive : boolean = "false";    // Compile-Fehler: Argument vom Typ '"false"' ist nicht zuweisbar an Parameter vom Typ 'boolean'.

// Arrays (Listen)
// Variante 1 (Typ[]):
let numbers : number[] = [1,2,3,4,5];           // reines Zahlen-Array
let words : string[] = ["Hello", "World"];      // reines String-Array
let mixed : (number | string)[] = [1,"Hello"];  // gemischtes Array mit Zahlen und Strings
// Variante 2 (Array<Typ>):
let colors : Array<string> = ["red", "green", "blue"];
let mixed2 : Array<number | string> = [1,"Hello"];

numbers.push(6);
// numbers.push("7"); // Compile-Fehler: Argument vom Typ '"7"' ist nicht zuweisbar an Parameter vom Typ 'number'.

// higher orders sind verfügbar (z.B. forEach)
numbers.forEach(function(num : number) {
    console.log(num);
});

// numbers-Array kann wachsen - es ist nut festgelegt, dass es Elemente des gleichen Typs enthält

// Tupel - Anzahl und Typ der Elemnente sind unveränderlich
let x : [string, number] = ["Hello", 10];
x[0] = "Goodbye";
x[1] = 20;
// x[1] = "20"; // Compile-Error: Type 'string' is not assignable to type 'number'.
// x[2] = 1;    // Compile-Error: Index signature in type '[string, number]' only permits reading.
let coords : [number, number] = [10, 20];
let rgba : [number, number, number, number] = [255, 0, 0, 0.5];

// Destructuring
let [lat, lon] = coords;

// Enums

// schlechtes Beispiel
function checkStatus (status : number) : string {
    if (status === 0) return "Held wartent";
    if (status === 1) return "Held ist aktiv";
    if (status === 2) return "Held ist inaktiv";
    return "Heldenstatus Unbekannt";
}
console.log(checkStatus(1));    // Werte sind unklar (Magic Numbers)

// besser lesbar mit Enums
enum Status {
    Wartend,    // automatisch 0,
    Aktiv,      // automatisch 1,
    Inaktiv     // automatisch 2
};
let heroStatus : Status = Status.Aktiv;
console.log(heroStatus);

// enums mit eigenen Werten
// einige explizit festgelegt, andere automatisch
enum Direction {
    North = 1,  // explizit 1
    South,  // automatisch 2
    East = 10,  // explizit 10
    West    // automatisch 11
};
let direction : Direction = Direction.East;
console.log(direction);

// nur explizite Festlegung
enum Color {
    Red = "ff0000",
    Green = "00ff00",
    Blue = "0000ff"
};
let color : Color = Color.Green;
console.log(color);

// String-enums für APIs
enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
};
let request : HttpMethod = HttpMethod.GET;
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
let id : string | number ;
id = 1;
id = "1";
// id = true;  // compiler-Fehler: Type 'boolean' is not assignable to type 'string | number'.

type Apartment =
    | { success: true, data: any }
    | { success: false, error: string };

function handleResponse (response : Apartment) : void {
    if (response.success) {
        // TS weiß, dass es Property data gibtund irgendwelche Daten verarbeitet werden
        console.log(response.data);
    } else {
        // TS weiß, dass es Property error gibt und irgendwelche Fehlermeldung ausgegeben werden soll
        console.error(response.error);
    }
}
handleResponse({ success: true, data: "Hello" });
handleResponse({ success: false, error: "Error" });

// Funktionen mit flexiblen Parametern
function formatId ( id : number | string ) : string {
    if (typeof id === "number") {
        return id.toString();
    } else {
        return id;
    }
}
console.log(formatId(123)); // "123"
console.log(formatId("123")); // "abc"
// console.log(formatId(true)); // Compile-Fehler: Argument vom Typ 'boolean' ist nicht zuweisbar an Parameter vom Typ 'string | number'.

// rest-Parameter (Variablen-Argumente)
function printAll (...args : any[]) : void {
    args.forEach(arg => console.log(arg));
}
printAll(1,2,3,4,5);

// Event-Handling mit Event-Typen
type UserEvent =
    | { type: "click", target: HTMLElement }
    | { type: "keydown", keyCode: number };
function handleUserEvent (event : UserEvent) : void {
    if (event.type === "click") {
        console.log("User clicked on", event.target);
    } else if (event.type === "keydown") {
        console.log("User pressed key", event.keyCode);
    }
}

// Union-Types mit Arrays
// Array, das strings und numbers enthalten kann
let numOrString : (number | string)[] = [1, "Hello", 3];

// Array, dass nur strings oder nur numbers enthalten kann
let stringOrNumber : string[] | number[];
stringOrNumber = ["Hello", "Hi","Huhu"];
stringOrNumber = [1,2,3];
// stringOrNumber = ["1",2];   // Compile-Fehler: Type '(string | number)[]' is not assignable to type 'string[] | number[]'.

// spezielle Typen
// any = beliebig => sehr unsicher, sollte möglichst nicht verwendet werden
let notSure : any = 4;
notSure = "maybe a string instead";
notSure = false;
notSure = { some: "object", value: 5 };
notSure = [1,2,3];
notSure = function() { return 42; };
notSure = null;
notSure = undefined;

// unknown = sicherer Alternative => Typ, aber nicht typisiert
let maybe : unknown = 4;
maybe = "maybe a string instead";
maybe = false;
maybe = { some: "object", value: 5 };
maybe = [1,2,3];
maybe = function() { return 42; };
maybe = null;
maybe = undefined;

// void = keine Rückgabe
function logMessage (message : string) : void {
    console.log(message);
}
logMessage("Hello");

// never - soll nie eintreten
function error (message : string) : never {
    throw new Error(message);
}

// null und undefined
let u : string | undefined = undefined;
let n : null = null;

// type mit festen Werten
type ColorNames = "red" | "green" | "blue";
type Shape = "circle" | "square";
type ShapeWithColor = { color: ColorNames, shape: Shape };
let myShape : ShapeWithColor = { color: "red", shape: "square" };
// let myShape : ShapeWithColor = { color: "yellow", shape: "square" }; // Compile-Fehler: Type '"yellow"' is not assignable to type '"red" | "green" | "blue"'.


// Interfaces (nur für Objekte)
interface User {
    name: string;   // Pflichtfeld
    age: number;    // Pflichtfeld
    address?: string;  // optionale Eigenschaft (kann weggelassen werden)
    email?: string; // optionale Eigenschaft
    readonly id: number;    // readonly - nur lesbar
};
let user : User = {
    name: "Alice",
    age: 30,
    id: 123,
    address: "123 Main St"  // kann weggelassen werden
};
function showUserInfos (user : User) : void {
    console.log(user.name, user.age, user.id);  // Werte sind sicher verfügbar
}
showUserInfos(user);
// user.id = 5; // Compile-Fehler: Property 'id' is readonly.

// interface-Vererbunf (extends)
interface Employee extends User {
    salary: number;    // zusätzliches Pflichtfeld
    address: string;   // email: string;    // Pflichtfeld, da in User optional, aber hier nicht mehr optional
};
let employee : Employee = {
    name: "Bob",
    age: 40,
    id: 456,
    salary: 50000,
    address: "456 Main St"
};

interface KFZ {
    brand: string;
    model: string;
    color: string;
};
interface Car extends KFZ {
    year: number;
    price?: number;
    doors: number;
};

// Car bekommt KFZ-Properties + eigene Properties

let myCar : Car = {
    brand: "BMW",
    model: "X5",
    color: "red",
    year: 2020,
    doors: 4
};

interface ElectricCar {
    battery: number;
    reichweite: number;
    ladezeit: number;
};

interface Autonom {
    autopilot: boolean;
    autonomieLevel: 1 | 2 | 3 | 4 | 5;
};

interface FutureCar extends Car, ElectricCar, Autonom {
    // erbt alle Eigenschaften von Car, ElectricCar und Autonom
    softwareVersion: string;
};

const vehicle : FutureCar = {
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
}

// Funktionen im Interface
interface Rechner {
    add(a: number, b: number): number;          // method-syntax
    multiply(x: number, b: number): number;
    divide: (x: number, b: number) => number;   // arrow-syntax
};
let rechner : Rechner = {
    add: function(a, b) { return a + b },
    multiply: (x, b) =>  x * b ,
    divide: function(x, b) { return x / b }
};
console.log(rechner.add(2,3)); // 5
console.log(rechner.multiply(4,5)); // 20
// console.log(rechner.divide("10",2)); // Compile-Error: Argument of type '"10"' is not assignable to parameter of type 'number'.

// index-Signaturen (optional) => alle anderen Properties werden als string behandelt
interface Person {
    [key: string]: any;
};
let person : Person = {
    name: "Alice",
    age: 30,
    address: "123 Main St"
};
// beliebig viele Properties möglich

// Interfaces für Objekte und Funktionen
// Types für Union Types, Rrimitives, Computed Types

// Klassen
class Person2 {
    private name: string;
    private age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    public setAge(age: number) {
        if (age < 0) { throw new Error("Age must be positive");}
        this.age = age;
    }
    public getAge() : number {
        return this.age;
    }
};
let alice = new Person2("Alice", 30);
// console.log(alice.name, alice.age);  // Compiler-Error: Properties "age" and 'name' is private and only accessible within class 'Person2'.
alice.setAge(25);
console.log(alice.getAge());

// Getter und Setter
class Person3 {
    private name: string;
    private age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    get userAge() : number {
        return this.age;
    }
    set userAge(age : number) {
        if (age < 0) { throw new Error("Age must be positive");}
        this.age = age;
    }
    static readonly MAX_AGE = 120;
}
const myUser = new Person3("Alice", 30);

// Klassen implementieren Interfaces
// Interface definiert, was implementiert werden soll
// Klasse definiert, wie es implementiert werden soll
interface Flugfaehig {
   maxHeight: number;
   fliegen(): string;
   landen(): string;
};
interface Schwimmfaehig {
    maxTiefe: number;
    schwimmen(): string;
    tauchen(): string;
};

class Ente implements Flugfaehig, Schwimmfaehig {
    maxHeight: number = 100;
    maxTiefe: number = 100;
    constructor(private name: string) { }
    fliegen() : string { return `${this.name} kann bis zu einer Höhe von ${this.maxHeight} Meter fliegen!`; }
    landen() : string { return `${this.name} landet relativ unsanft!`; }
    schwimmen() : string { return `${this.name} kann den ganzen Tag schwimmen!`; }
    tauchen() : string { return `${this.name} kann bis zu ${this.maxTiefe} Meter tauchen!`; }
}

const ente = new Ente("Ducky");
console.log(ente.fliegen());

