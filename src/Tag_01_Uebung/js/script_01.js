"use strict";

const ball = document.querySelector("#ball");
ball.style.position = "relative";

const btnTimeout = document.querySelector("#btn-timeout");
const btnInterval = document.querySelector("#btn-interval");
const btnAnimation = document.querySelector("#btn-animation");
const btnReset = document.querySelector("#btn-reset");
const btnStop = document.querySelector("#btn-stop");

const ballLeftDefault = ball.style.left;
const maxPos = 160;
const counterStep = 16;
const speed = 25;       // timeOut / interval
let counter = 0;
let timeoutID;
let animationId;
let isStopped = false;

btnTimeout.addEventListener("click", timeout);
btnInterval.addEventListener("click", interval);
btnAnimation.addEventListener("click", animate);

btnReset.addEventListener("click", () => {
    ball.style.left = ballLeftDefault;
    counter = 0;
    activateButtons(true);
});

btnStop.addEventListener("click", () => {
    isStopped = true;
});

function timeout() {
    activateButtons(false);
    timeoutID = window.setTimeout(() => {
        setPos();
        if (counter < maxPos && !isStopped) {
            timeout();
        } else {
            activateButtons(true);
        }
    }, speed)
};

function interval() {
    activateButtons(false);
    const intervalId = setInterval(() => {
        setPos();
        if (counter >= maxPos || isStopped) {
            clearInterval(intervalId);
            activateButtons(true);
        }
    }, speed);
}

function animate() {
    activateButtons(false);
    setPos();
    if (counter < maxPos && !isStopped) {
        animationId = requestAnimationFrame(animate);
    } else {
        activateButtons(true);
    }
};

function activateButtons(status) {
    btnReset.disabled = !status;

    if (status) isStopped = false;
    if (!status || (status && counter < maxPos)) {
        btnTimeout.disabled = !status;
        btnInterval.disabled = !status;
        btnAnimation.disabled = !status;
    }
}

function setPos() {
    const pos = counter * counter / counterStep;
    ball.style.left = pos + "px";
    counter++;
}