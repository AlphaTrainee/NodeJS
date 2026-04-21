"use strict";

/* 
    Promise
*/

{
/*     
    function asyncFunc(params) {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                let random = Math.floor(Math.random() * 100) + 1;
                if (random > 50) resolve(`${random} Eur stehen zur Verfügung`);
                else reject(`Es sind leider nicht genug Eur vorhanden: ${random} Eur`);
            })
        }, 2000);
        return promise;
    }

    asyncFunc()
        .then(
            value => console.log(`Success ${value}`),
            reason => console.log(`Reason ${reason}`)
        );

    asyncFunc()
        .then(
            value => console.log(`Success ${value}`),
            reason => console.log(`Reason ${reason}`)
        )
        .catch(reason => console.log(`Reason ${reason}`))
        .finally()

    asyncFunc()
        .then(value => parseInt(value) * 200)
        .catch(reason => console.log(`Reason ${reason}`))

    let myPromise = new Promise((resolve, reject) => { // 1. Tippfehler korrigiert
        setTimeout(() => {
            resolve("abgeschlossen");
        }, 2000); // 2. Die 2000 gehört zum setTimeout, nicht zum Promise
    });

    const promiseFunc = () => {
        myPromise.then(value => {
            console.log(value);
            console.log(myPromise);
        });
    };

    promiseFunc();
 */
}

{

    const output = document.querySelector("#count_output");
/* 
    const pause = sec => {
        setTimeout(() => {
            console.log(`Wartete ${sec} Sekunden...`);
        }, sec * 1000) ;
    };

    const countFunc = () => {
        console.log(0, "Sekunden");
        output.textContent = 0;
        pause(5);
        console.log(5, "Sekunden");
        output.textContent = 5;
        pause(13);
        console.log(13, "Sekunden");
        output.textContent = 13;
    };

    countFunc();
*/
    const pause = sec => new Promise(resolve => setTimeout(resolve, sec * 1000));

    const countFunc = async () => {
        console.log(0, "Sekunden");
        output.textContent = 0;
        await pause(5);
        console.log(5, "Sekunden");
        output.textContent = 5;
        await pause(13);
        console.log(13, "Sekunden");
        output.textContent = 13;
    };

    countFunc();

}