declare function add(a: number, b: number): number;
declare let alter: number;
declare let pi: number;
declare let hex: number;
declare function multiply(x: number): number;
declare let firstName: string;
declare let greeting: string;
declare let email: string;
declare let normailzeMail: string;
declare let isAdmin: boolean;
declare let numbers: number[];
declare let words: string[];
declare let mixed: (number | string)[];
declare let colors: Array<string>;
declare let mixed2: Array<number | string>;
declare let x: [string, number];
declare let coords: [number, number];
declare let rgba: [number, number, number, number];
declare let lat: number, lon: number;
declare function checkStatus(status: number): string;
declare enum Status {
    Wartend = 0,// automatisch 0,
    Aktiv = 1,// automatisch 1,
    Inaktiv = 2
}
declare let heroStatus: Status;
declare enum Direction {
    North = 1,// explizit 1
    South = 2,// automatisch 2
    East = 10,// explizit 10
    West = 11
}
declare let direction: Direction;
declare enum Color {
    Red = "ff0000",
    Green = "00ff00",
    Blue = "0000ff"
}
declare let color: Color;
declare enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}
declare let request: HttpMethod;
declare let id: string | number;
type Apartment = {
    success: true;
    data: any;
} | {
    success: false;
    error: string;
};
declare function handleResponse(response: Apartment): void;
declare function formatId(id: number | string): string;
declare function printAll(...args: any[]): void;
type UserEvent = {
    type: "click";
    target: HTMLElement;
} | {
    type: "keydown";
    keyCode: number;
};
declare function handleUserEvent(event: UserEvent): void;
declare let numOrString: (number | string)[];
declare let stringOrNumber: string[] | number[];
declare let notSure: any;
declare let maybe: unknown;
declare function logMessage(message: string): void;
declare function error(message: string): never;
declare let u: string | undefined;
declare let n: null;
type ColorNames = "red" | "green" | "blue";
type Shape = "circle" | "square";
type ShapeWithColor = {
    color: ColorNames;
    shape: Shape;
};
declare let myShape: ShapeWithColor;
interface User {
    name: string;
    age: number;
    address?: string;
    email?: string;
    readonly id: number;
}
declare let user: User;
declare function showUserInfos(user: User): void;
interface Employee extends User {
    salary: number;
    address: string;
}
declare let employee: Employee;
interface KFZ {
    brand: string;
    model: string;
    color: string;
}
interface Car extends KFZ {
    year: number;
    price?: number;
    doors: number;
}
declare let myCar: Car;
interface ElectricCar {
    battery: number;
    reichweite: number;
    ladezeit: number;
}
interface Autonom {
    autopilot: boolean;
    autonomieLevel: 1 | 2 | 3 | 4 | 5;
}
interface FutureCar extends Car, ElectricCar, Autonom {
    softwareVersion: string;
}
declare const vehicle: FutureCar;
interface Rechner {
    add(a: number, b: number): number;
    multiply(x: number, b: number): number;
    divide: (x: number, b: number) => number;
}
declare let rechner: Rechner;
interface Person {
    [key: string]: any;
}
declare let person: Person;
declare class Person2 {
    private name;
    private age;
    constructor(name: string, age: number);
    setAge(age: number): void;
    getAge(): number;
}
declare let alice: Person2;
declare class Person3 {
    private name;
    private age;
    constructor(name: string, age: number);
    get userAge(): number;
    set userAge(age: number);
    static readonly MAX_AGE = 120;
}
declare const myUser: Person3;
interface Flugfaehig {
    maxHeight: number;
    fliegen(): string;
    landen(): string;
}
interface Schwimmfaehig {
    maxTiefe: number;
    schwimmen(): string;
    tauchen(): string;
}
declare class Ente implements Flugfaehig, Schwimmfaehig {
    private name;
    maxHeight: number;
    maxTiefe: number;
    constructor(name: string);
    fliegen(): string;
    landen(): string;
    schwimmen(): string;
    tauchen(): string;
}
declare const ente: Ente;
