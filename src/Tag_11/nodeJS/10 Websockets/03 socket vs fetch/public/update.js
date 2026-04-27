"use strict";

const socket = io.connect("//127.0.0.1:3000", {
    transports: ["websocket","polling"]
});

const volumeField = document.getElementById("volume");
const priceField = document.getElementById("price");
const timeField = document.getElementById("time");

const outputFunc = (colume = "n/a", price = "n/a", time = "n/a") => {
    volumeField.textContent = colume;
    priceField.textContent = price;
    timeField.textContent = time;
};
outputFunc();

socket.on("kursDaten", ({ volume, price, time }) => outputFunc(volume, price, time));