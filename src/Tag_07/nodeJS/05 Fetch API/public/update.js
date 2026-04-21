"use strict";

const refresh = () => {

    fetch("/data")
        // .then(response => console.log(response.body))
        .then(response => response.json())
        // .then(response => response.text())

        .then(data => showData(data))
        .catch(err => {
            console.log(err.name, err.message);
            clearTimeout(timeoutId);
            showData({});
        });
/*     
        (async() => {
            // ....
        });
 */        
    const timeoutId = setTimeout(refresh, 2000);
};

refresh();

const showData = ({ volume = "n/a", price = "n/a", time = "n/a" }) => {
    document.getElementById("volume").textContent = volume;
    document.getElementById("price").textContent = price;
    document.getElementById("time").textContent = time;
};
