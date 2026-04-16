"use strict";

/* 
let userPunkte = new Map();

let userMax = { name: "Max" };
let userSusi = { name: "Susi" };

userPunkte.set(userMax, 500);
userPunkte.set(userSusi, 750);

console.log(userPunkte.get(userMax)); // 500
 */

const klickZaehler = new Map();

const buttons = document.querySelectorAll("button");

buttons.forEach(btn => {
    // Der KEY ist das echte HTML-Element (ein Objekt!)
    klickZaehler.set(btn, 0); 

    btn.addEventListener("click", () => {
        let aktuellerStand = klickZaehler.get(btn);
        klickZaehler.set(btn, aktuellerStand + 1);
        console.log(`${btn.textContent} wurde ${klickZaehler.get(btn)} mal geklickt.`);
    });
});