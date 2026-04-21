"use strict";

/*
    Promise

    mit ES6 eingeführt
    lässt Syntax asynchroner Funktionen wie Syntax synchroner Funktionen aussehen
    ist Objekt vom Typ Promise
    dient als Platzhalter für Ergebnis asynchroner Funktionen
    ersetzt somit eine callback
    hat Zugriff auf 2 gekapselte callback-Funktionen
        - resolve() => informiert über Ergebniswert
        - reject()  => informiert über Fehler

    3 Zustände vom promise:

    pending (wartend)       => asynchrone Funktion ist noch nicht abgeschlossen

    fulfilled (erfüllt)     => resolve() wurde aufgerufen
                               Promise enthält Ergeniswert

    rejected (abgelehnt)    => reject() wurde aufgerufen
                               Promise enthält Infos zum Fehler
*/

{
    function asyncFunc () {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                let random = Math.floor(Math.random() * 100) + 1;
                if (random > 50) resolve(random + " Euro stehen zur Verfügung");
                else reject("Es ist leider nicht genug Euro vorhanden (" + random + ") Euro");
            }, 2000);
        });
        return promise;
    }

    // mit then() auf Promise zugreifen
    asyncFunc()
        .then(
            value => console.log("Success:", value),
            reason => console.log("Error:", reason)
        );

    // error mit catch auffangen (finally = optional)
    asyncFunc()
    .then(value => console.log("Success:", value))
    .catch(reason => console.log("Error:", reason))
    .finally(() => console.log("Done"));

    // then() gibt auch Promise zurück - können then-Aufrufe dadurch verketten
    asyncFunc()
    .then(value => parseInt(value) * 200)
    .then(value => console.log("Success:", value))
    .catch(error => console.log("Error:", error));

    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise wurde erfolgreich abgeschlossen");
        }, 2000);
    });
    // console.log(myPromise);

    const promiseFunc = () => {
        myPromise.then(value => {
            console.log(value);
            console.log(myPromise);
        });
    };
    promiseFunc();
}

// async / await
{
    const output = document.querySelector("#count_output");

    // const pause = sec => {
    //     setTimeout(() => {
    //         console.log(`Ich wartete ${sec} Sekunden...`);
    //     }, sec * 1000);
    // };
    //
    // const countFunc = () => {
    //     console.log(0, "Sekunden");
    //     output.textContent = 0;
    //     pause(5);
    //     console.log(5, "Sekunden");
    //     output.textContent = 5;
    //     pause(8);
    //     console.log(13, "Sekunden");
    //     output.textContent = 13;
    //     pause(10);
    //     console.log(23, "Sekunden");
    //     output.textContent = 23;
    // };
    // countFunc();

    const pause = sec => new Promise(resolve => setTimeout(resolve, sec * 1000));

    const countFunc = async () => {
        console.log(0, "Sekunden");
        output.textContent = 0;
        await pause(5);
        console.log(5, "Sekunden");
        output.textContent = 5;
        await pause(8);
        console.log(13, "Sekunden");
        output.textContent = 13;
        await pause(10);
        console.log(23, "Sekunden");
        output.textContent = 23;
    };
    countFunc();

    // await kann nur in async-Funktionen verwendet werden
    // await wartet auf Auflösung des Promise
    // erst danach wird async-function weiter abgearbeitet
}