"use strict";

{
/* 
    document.querySelector("#alert-on").addEventListener("click", alertOn);
    document.querySelector("#alert-off").addEventListener("click", alertOff);

    let timeoutID;

    function alertOn() {
        timeoutID = window.setTimeout(function() {
            console.log(timeoutID);
            alert("Hallo, ich bin ein Alert!");
        }, 2000)
    }

    function alertOff() {
        timeoutID = window.setTimeout(function() {
            console.log(timeoutID);
            window.clearTimeout(timeoutID);
            alert("Hallo, ich bin ein Alert!");
        }, 2000)
    }

    console.log("Hallo 1");
    setTimeout(() => console.log("Hallo 2"), 2000);
    console.log("Hallo 3");
 */    
}

// Interval
{
/* 
    const output = document.querySelector("#zeit");
    const intervalId = setInterval(() => {
        output.textContent = new Date().toLocaleTimeString(),1000;
    });

    document.querySelector("#interval-off").addEventListener("click", () => clearInterval(intervalId));
 */
}

// requestAnimationFrame
{

    /* 
        Animation starten


    */
/* 
    const cat = document.querySelector("#cat");
    let counter = 0;
    let animationId;

    (function animate() {
        const pos = counter * counter / 8;
        cat.style.left = pos + "px";
        counter++;
        if (counter < 110) animationId = requestAnimationFrame(animate);
    })();

    const stopper = document.querySelector("#maus");
    stopper.addEventListener("click", () => cancelAnimationFrame(animationId));
 */
}

// location object
{
/* 
    console.log(location);

    console.log(location.href);

    console.log(location.pathname);

    console.log(location.host);     // incl Port
    console.log(location.hostname);

    console.log(location.protocol);

    console.log(location.origin);

    // immer mit führendem ?
    console.log(location.search);
    console.log(location.search.slice(1));

    // hashtag
    console.log(location.hash);
    console.log(location.hash.slice(1));


    // Reload
    // übergabe von true leert den cache
    document.querySelector("#interval-off").addEventListener("click", () => location.reload());

    // Weiterleitung
    const myBtn = document.querySelector("#alert-on");

    myBtn.onclick = function() {
        location.assign("https://www.google.com");  // neuer History Eintrag
    }

    myBtn.onclick = function() {
        location.replace("https://www.google.com");  // History Eintrag wird ersetzt
    }

    myBtn.onclick = function() {
        location.href += "#test";
    }

    // console.clear();
 */    
}

{
/* 
    const user = {
        name: "Jessica",
        age: 36,
        address: "Messeallee 12, Karlstadt",
        test: ["One", "Two", "Three"],
    };

    // Keys des Objekts - gibt Array mit den Keys
    console.log(Object.keys(user));

    // Values des Objekts - gibt Array mit den Values
    console.log(Object.values(user));

    // entries des Objekts - gibt Array mit den entries
    console.log(Object.entries(user));


    // for-in Schleife (Arrays und Objekte)
    for (let key in user) {
        console.log(`${key}: ${user[key]}`);

        // gibt undefined
        // in dem fall wird als Property der  NAME KEY benutzt -> nicht der Inhalt
        // console.log(typeof(key)); // -> String ... kein objekt
    }

    const heroes = ["Batman", "Superman", "Flash", "Aquaman"];
    for (let index in heroes) {
        console.log(`${index}: ${heroes[index]}`);
    }

    for (let value of heroes) {
        console.log(value, heroes.indexOf(value));
    }


    // for (let entry of user) {} // TypeError

    for (let key of Object.keys(user)) {console.log(key)};
    for (let value of Object.values(user)) {console.log(value)};
    for (let entry of Object.entries(user)) {console.log(entry)};

    // Object.freeze - friert Obkekte ein
    // -> workaround um Enums zu erstellen
    // im Objekt referenzierte Array werden nicht eingefroren
    const frozenUser = Object.freeze(user);
    // frozenUser.name = "Max";    // Error -> readonly -> !! der fehler wird nur im strict mode geworfen !!

    // Achtung! DAS lässt sich ändern
    console.log(frozenUser.test[1]);
    frozenUser.test[1] = "Muh";
    console.log(frozenUser.test[1]);
    
    console.log(frozenUser);

    // Objekte duplizieren
    // keine Funktionen ....

    const clonedUser = structuredClone(user);
    clonedUser.name = "Wehrwolf";
    console.log(clonedUser);

    // weitere Möglichkeit JSON.stringify und JSON.parse
    // spread syntax
 */
}


// Objekt Aufbau auf Grundlage gegebener Variablen
{
/*     
    let cat = "Lucy";
    let dog = "Snoopy";
    let hero = "Jessica";

    // bis ES6
    let myObj = {
        cat: cat,
        dog: dog,
        hero: hero,
    }
    console.log(myObj);

    const output = function(who) {
        return `Hallo, ich bin ${this[who]}!`;
    }
    let myObj2 = {
        katze: cat,
        cat,
        dog,
        hero,
        output,
    }
    
    console.log(myObj2);
    console.log(myObj2.output("cat"));
 */
}

// Form Data object
{
/* 
    const myFormDataObject = new FormData();
    myFormDataObject.append("name", "Jessica");
    myFormDataObject.append("age", 36);

    const myForm = document.querySelector("#myForm");
    myForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const myFormData = new FormData(this);
        console.log(myFormData);

        // erweitern / ergänzen / oder hinzufügen
        myFormData.append("username", "Jessica Jones");
        myFormData.append("firstName", "Jessica");
        myFormData.append("lastName", "Jones");
        console.log(myFormData);

        // ändern oder hinzufügen
        myFormData.set("password", "34567");
        myFormData.set("age", 36);
        console.log(myFormData);

        // auf Vorhandensein prüfen
        if (myFormData.has("unsinn")) {
            console.log("Eintrag vorhanden");
            myFormData.delete("unsinn");
        }

        // auch ohne prüfung
        // es kommt kein Fehler
        myFormData.delete("unsinn");

        // alle Einträge durchlaufen
        console.log(myFormData.keys());

        // durch Keys iterieren
        for (let key of myFormData.keys()) {
            console.log(key);
        }

        // durch Values iterieren
        for (let value of myFormData.values()) {
            console.log(value);
        }

        // entries ist default
       for (let entry of myFormData) {
            console.log(entry);
        }

        // Eintrag auslesen -> get erster Eintrag
        console.log(myFormData.get("username"));
        // getAll -> alle Einträge

        console.log(myFormData.getAll("username"));
    })
 */
}

// Datentyp Symbol
{
/* 
    // seit ES6
    // einzigartige Daten
    // es kann eine Description zugefügt werden -> dient nur der Beschreibung

    console.log(Symbol() === Symbol());             // false
    console.log(Symbol("test") === Symbol("test")); // false

    console.log(Symbol.for("test") === Symbol.for("test")); // true

    const symbol1 = Symbol.for("franzi.test");
    const symbol2 = Symbol.for("franzi.test");

    console.log(Symbol.keyFor(symbol1));
    // console.log(Symbol.keyFor("test"));

    let myObj = {id: 66};
    let symbolId = Symbol("id");
    myObj.symbolId = 111;
    myObj[symbolId] = 42;
    
    console.log(myObj);                 // Object { id: 66, symbolId: 111, Symbol("id"): 42 }
    console.log(myObj.id);              // 66
    console.log(myObj.symbolId);        // 111
    console.log(myObj["symbolId"]);     // 111
    console.log(myObj[symbolId]);       // 42

    for (let key in myObj) console.log(key);    // id, symbolId
 */
}

// Geolocation Object
{

    // im navigator Object

    console.log(navigator.geolocation);

    // prüfen ob API nutzbar ist
    if(navigator.geolocation) console.log("Geolocation API verfügbar");

    if ("geolocation" in navigator) console.log("Geolocation API wirklich verfügbar");


    // user muss Zugriff genehmigen
    navigator.geolocation.getCurrentPosition(
        position => console.log(position),
        /* error => console.log(error) */
    );

    const options =  {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    }

    const container = document.createElement("div");
    container.id = "map";
    const coordsLink = document.createElement("a");
    container.append(coordsLink);

/* 
    document.body.append(container)
    function outputFunc(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // map zoom faktor
        coordsLink.href = "https://www.openstreetmap.org/?mlat=";
        coordsLink.textContent = `${lat}, ${lon}`;
    }

    function errFunc(error) {
        console.log(`Fehler: ${error}`);
    }

    navigator.geolocation.watchPosition(outputFunc, errFunc, options);


    navigation.geolocation.clearWatch(watchID)
 */
}

// spread syntax
{
/* 
    let add = function (a = 0, b = 0, c = 0, d = 0) {
        return a + b + c + d;
    }
    
    let numbers = [1, 2, 3, 4];
    // let result = add(numbers[0], numbers[1], numbers[2], numbers[3]);
    
    let result = add(...numbers);
    console.log(result);

    console.log(Math.max(...numbers));
    console.log(Math.min(...numbers));

    let obst = ["Apfel", "Birne", "Kirsche", "Banane"];
    let newObst = ["Pfefferkuchen", ...obst, "Tomaten"];
    console.log(newObst);


    let user = {
        name: "Jessica",
        age: 36,
    }
    let newUser = {
        ...user,
        city: "Muh",
        country: "None"
    }
    console.log(newUser);

    let dateArr = [2023, 1, 1];
    let dateObj = new Date(...dateArr);
    console.log(dateObj);
 */
}

{
 /*    
    let user = {
        name: "Jessica",
        age: 36,
        address: {
            street: "Nowhere",
            city: "Muh",
            country: "None",
            number: 66,
        }
    }
    console.log("user", user);

    // zuweisung
    let user2 = {...user};
    console.log("user2", user2);

    let user3 = JSON.parse(JSON.stringify(user));
    console.log("user3", user3);

    let user4 = structuredClone(user);
    console.log("user4", user4);

    user.name = "Elektra";
    user.address.number = 111;
    console.log("user", user);
    console.log("user2", user2);
    console.log("user3", user3);
    console.log("user4", user4);
 */
}

{
/* 
    function myFunc (a, b, c) {
        console.log(arguments);
        console.log(arguments.length);
        console.log(arguments[3]);

        for (let arg of arguments) console.log(arg);
    }

    myFunc(1, 2, 3, 4, 5, 6);
 */
}

// Rest Parameter seit ES6
// nimmt nur überzählige Parameter auf und speichert sie in einem Array
// kann beliebig viele Argumente aufnehmen
// Vorteil: higher Orders
{
/* 
    function myFunc (a, b, ...rest) {
        console.log(a, b, rest, "Anzahl:", rest.length);
        rest.forEach(arg => console.log(arg));
    }

    myFunc(1, 2, 3, 4, 5, 6);

    let add = (...args) => args.reduce((a,b) => a + b, 0);

    console.log(add(1,2,3,4,5,6,7,8,9,10));
    console.log(add(1,2,3));

    let greeting = (floskel, ...heroes) => heroes.forEach(hero => console.log(floskel, hero));
    greeting("Hallo", "Batman", "Superman", "Flash", "Aquaman");
*/
}