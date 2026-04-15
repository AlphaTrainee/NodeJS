"use strict";

const inputEl = document.querySelector("#input");
const resultEl = document.querySelector("#result");
const result2El = document.querySelector("#result2");
const btn = document.querySelector("#checkButton");

btn.onclick = function () {
    let status;

    // einfache Prüfung, ob das Format stimmt
    // let pattern = /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/; 

    // erweiterte Prüfung auf Tag 1-31, auf Monat 1-12
    // ?: Gruppierung wird nicht zur Verarbeitung benötigt
    let pattern = /^(?:0[1-9]|[12][0-9]|3[01])\.(?:0[1-9]|1[0-2])\.[0-9]{4}$/;

    let inputVal = String(inputEl.value).trim();
    if (inputVal !== String(inputEl.value)) inputEl.value = inputVal;
    
    if (pattern.test(inputVal)) {

        status = "Eingabe ist ein Datum";
        resultEl.textContent = status;
        console.log(status);

        // Übung 3
        let dateArr = inputVal.split(".");
        let dateObj = new Date(Number(dateArr[2]), Number(dateArr[1]) - 1, Number(dateArr[0]));

        // let weekDay = dateObj.getDay();
        // status = (weekDay === 0 || weekDay === 6) ? "Wochenende" : "Wochentag";

        status = (dateObj.getDay() % 6 === 0) ? "Wochenende" : "Wochentag";
        result2El.textContent = status;
        console.log(status);

    } else {

        status = "Eingabe ist KEIN Datum";
        resultEl.textContent = status;
        result2El.textContent = "";
        console.log(status);

    }

}
