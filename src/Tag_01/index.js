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

    
}