"use strict";

const countEl = document.querySelector("#counter");
let count = parseInt(countEl.textContent) || 10;
console.log(count);

const intervalId = setInterval(() => {
    countEl.textContent = --count;
    console.log(count);
    if (count < 1) {
        clearInterval(intervalId);
        console.log("Ende");
    }
}, 1000);
