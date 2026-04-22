"use strict";

const btns = document.querySelectorAll("ul li");
const output = document.querySelector("main");

const hash = window.location.hash.substring(1); // Holt die ID nach dem #
const targetBtn = document.getElementById(hash);

const docTitle = document.title;

if (targetBtn) {
    loadData(targetBtn, false);
} else {
    loadData(btns[0], false);
}

NodeList.prototype.addEventListener = function (event, callback) {
    this.forEach(node => {
        node.addEventListener(event, callback);
    });
};

btns.addEventListener('click', (e) => {
    // console.log('Klick auf:', e.target.id);
    loadData(e.target);
});

window.addEventListener("popstate", (e) => {
    // console.log(e.state);
    if (e.state && e.state.id) {
        const targetBtn = document.getElementById(e.state.id);
        if (targetBtn) {
            // Zurück-Button = Laden, aber NICHT erneut pushen!
            loadData(targetBtn, false);
        }
    }
});

function loadData(data, shouldPush = true) {
    // Style setzen
    btns.forEach(btn => btn.classList.remove("active"));
    data.classList.add("active");

    const targetTitle = data.textContent.trim();
    document.title = `${docTitle} - ${targetTitle}`;

    // History setzen
    if (shouldPush) {
        history.pushState(
            { id: data.id },          // State: Das Objekt, das du beim Zurückblättern wiederbekommst
            targetTitle,              // Title: Wird von den meisten Browsern ignoriert (Leerstring lassen)
            `#${data.id}`             // URL: Was oben in der Adresszeile stehen soll
        );
    }

    fetch(`./tabs/${data.id}.part`)
        .then(response => {
            // response.ok ist true bei Status 200-299
            if (!response.ok) {
                // Wir werfen manuell einen Fehler, damit er im .catch landet
                throw new Error(`Inhalt nicht gefunden (Status: ${response.status})`);
            }
            return response.text();
        })
        .then(tab => {
            // console.log(tab);
            document.querySelector("main").innerHTML = tab;
        })

        // .catch(err => console.log(err));
        .catch(err => {
            document.querySelector("main").innerHTML = `<article><h3>Not Found!</h3><p>Der angeforderte Inhalt "${data.id}.part" wurde nicht gefunden</p></article>`;
        });
};
