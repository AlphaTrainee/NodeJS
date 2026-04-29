declare function add(a: number, b: number): number;
declare let age: number;
declare let pi: number;
declare let hex: number;
declare function multiply(x: number): number;
declare let firstName: string;
declare let greeting: string;
declare let email: string;
declare let normalizeMail: string;
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
declare enum Status {
    Wartend = 99,
    Aktiv = 98,
    Inaktiv = 97
}
declare enum Status_New {
    Wartend = 0,
    Aktiv = 1,
    Inaktiv = 2
}
declare let myStatus: Status;
declare let id: string | number;
type Apartment = {
    success: true;
    data: any;
} | {
    success: false;
    error: string;
};
declare function handleResponse(response: Apartment): void;
declare function printAll(...args: any[]): void;
type UserEvent = {
    type: "click";
    target: HTMLElement;
} | {
    type: "keydown";
    keycode: number;
};
declare function handleUserEvent(event: UserEvent): void;
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
