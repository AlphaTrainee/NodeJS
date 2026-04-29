
/* 
function add (a, b) { return a + b };
console.log(add("1", 2));
*/

function add(a: number, b: number): number {
    return a + b
};
console.log(add(1, 2));
// console.log(add("1", 2)); // compiler Fehler


// explizite Datentypen

// number
let age: number = 30;
let pi: number = 3.14159;
let hex: number = 0xf00d;

// garantiert TypSichere Funktion
function multiply(x: number): number {
    return x * 2;
};
console.log(multiply(3));


let firstName: string = "Alice";
let greeting: string = `Hello, ${firstName}!`;

let email: string = "ICH@mail.de";
let normalizeMail: string = email.toLowerCase();

let isAdmin: boolean = true;
// let isActive: boolean = "false";

let numbers: number[] = [1, 2, 3, 4, 5];
let words: string[] = ["Hello", "World"];
let mixed: (number | string)[] = [1, "Hello"];

let colors: Array<string> = ["red", "green", "red"];
let mixed2: Array<number | string> = [1, "Hello"];

numbers.push(6);

numbers.forEach(function (num: number) {
    console.log(num);
});

let x: [string, number] = ["Hello", 10];
x[0] = "Goodbye";
x[1] = 20;
// x[1] = "20";
// x[2] = "muh";

let coords: [number, number] = [10, 20];
let rgba: [number, number, number, number] = [255, 0, 0, 0.5];

let [lat, lon] = coords;


enum Status {
    Wartend = 99,
    Aktiv = 98,
    Inaktiv = 97
}
console.log(Status.Wartend);

enum Status_New {
    Wartend,
    Aktiv,
    Inaktiv
}

let myStatus: Status = Status.Aktiv;
console.log(myStatus);

// Union Type
let id: string | number;
id = 1;
id = "1";
// id = false; // ERROR

type Apartment =
    | { success: true, data: any }
    | { success: false, error: string };

function handleResponse(response: Apartment): void {
    if (response.success) {
        console.log(response.data);
    } else {
        console.log(response.error);
    }
}

handleResponse({ success: true, data: 523.6678 });
handleResponse({ success: false, error: "MUH Error" });



function printAll(...args: any[]): void {
    args.forEach(arg => console.log(arg));
}

printAll(1, 2, "3", "muh", false, 45);



type UserEvent =
    | { type: "click", target: HTMLElement }
    | { type: "keydown", keycode: number };

function handleUserEvent(event: UserEvent): void {
    if (event.type === "click") {
        console.log(`User clicked on ${event.target}`);
    } else if (event.type === "keydown") {
        console.log(`User pressed Key ${event.keycode}`);
    }
}

interface User {
    name: string;           // Pflichtfeld
    age: number;            // Pflichtfeld
    address?: string;       // optional
    email?: string;         // optional
    readonly id: number;    // readonly
};
let user: User = {
    name: "Mafalda",
    age: 30,
    address: "Messeallee 30",
    id: 123
    // status: "active" // -> ERROR
}


function showUserInfos(user: User): void {
    console.log(user.name, user.age, user.id);
}
showUserInfos(user);
// user.id = 12; // -> readonly ...


interface Employee extends User {
    salary: number;     // neues Pflichtfeld
    address: string;    // umdeklaration zum Pflichtfeld
};
let employee: Employee = {
    name: "Buh",
    age: 40,
    id: 345,
    salary: 50000,
    address: "Dorfstrasse 12"
};

