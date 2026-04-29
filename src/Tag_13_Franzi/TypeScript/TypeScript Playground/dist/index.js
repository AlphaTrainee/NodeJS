"use strict";
/*
function add (a, b) { return a + b };
console.log(add("1", 2));
*/
function add(a, b) {
    return a + b;
}
;
console.log(add(1, 2));
// console.log(add("1", 2)); // compiler Fehler
// explizite Datentypen
// number
let age = 30;
let pi = 3.14159;
let hex = 0xf00d;
// garantiert TypSichere Funktion
function multiply(x) {
    return x * 2;
}
;
console.log(multiply(3));
let firstName = "Alice";
let greeting = `Hello, ${firstName}!`;
let email = "ICH@mail.de";
let normalizeMail = email.toLowerCase();
let isAdmin = true;
// let isActive: boolean = "false";
let numbers = [1, 2, 3, 4, 5];
let words = ["Hello", "World"];
let mixed = [1, "Hello"];
let colors = ["red", "green", "red"];
let mixed2 = [1, "Hello"];
numbers.push(6);
numbers.forEach(function (num) {
    console.log(num);
});
let x = ["Hello", 10];
x[0] = "Goodbye";
x[1] = 20;
// x[1] = "20";
// x[2] = "muh";
let coords = [10, 20];
let rgba = [255, 0, 0, 0.5];
let [lat, lon] = coords;
var Status;
(function (Status) {
    Status[Status["Wartend"] = 99] = "Wartend";
    Status[Status["Aktiv"] = 98] = "Aktiv";
    Status[Status["Inaktiv"] = 97] = "Inaktiv";
})(Status || (Status = {}));
console.log(Status.Wartend);
var Status_New;
(function (Status_New) {
    Status_New[Status_New["Wartend"] = 0] = "Wartend";
    Status_New[Status_New["Aktiv"] = 1] = "Aktiv";
    Status_New[Status_New["Inaktiv"] = 2] = "Inaktiv";
})(Status_New || (Status_New = {}));
let myStatus = Status.Aktiv;
console.log(myStatus);
// Union Type
let id;
id = 1;
id = "1";
function handleResponse(response) {
    if (response.success) {
        console.log(response.data);
    }
    else {
        console.log(response.error);
    }
}
handleResponse({ success: true, data: 523.6678 });
handleResponse({ success: false, error: "MUH Error" });
function printAll(...args) {
    args.forEach(arg => console.log(arg));
}
printAll(1, 2, "3", "muh", false, 45);
function handleUserEvent(event) {
    if (event.type === "click") {
        console.log(`User clicked on ${event.target}`);
    }
    else if (event.type === "keydown") {
        console.log(`User pressed Key ${event.keycode}`);
    }
}
;
let user = {
    name: "Mafalda",
    age: 30,
    address: "Messeallee 30",
    id: 123
    // status: "active" // -> ERROR
};
function showUserInfos(user) {
    console.log(user.name, user.age, user.id);
}
showUserInfos(user);
;
let employee = {
    name: "Buh",
    age: 40,
    id: 345,
    salary: 50000,
    address: "Dorfstrasse 12"
};
