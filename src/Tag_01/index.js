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

    console.log(location);

    console.log(location.href);

    console.log(location.pathname);

    console.log(location.host);     // incl Port
    console.log(location.hostname);

    console.log(location.protocol);

    console.log(location.origin);
}