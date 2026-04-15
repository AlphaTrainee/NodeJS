"use strict";

const inputEl = document.querySelector("#input");
const resultEl = document.querySelector("#result");
const btn = document.querySelector("#checkButton");
let faktor = 100;

btn.onclick = function () {
    let pattern = /^[0-9]+([.,][0-9]+)?$/;
    let inputVal = inputEl.value;

    if (pattern.test(inputVal)) {
        // Komma durch Punkt ersetzen
        let formattedVal = inputVal.replace(',', '.');

        // In eine Zahl umwandeln
        let result = Number(formattedVal);

        resultEl.textContent = (Math.round(result * faktor) ** 2) / (faktor ** 2)
    } else {
        resultEl.textContent = "Keine gültige Zahl";
    }

}
