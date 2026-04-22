"use strict";

// HTML Dokumente mit AJAX laden

const output = document.querySelector("#main-content");
const links = document.querySelectorAll("nav a");

history.replaceState({ href: "/index.html", id: "index" }, "Home", "/index.html");

links.forEach(link => {
    link.addEventListener("click", (e) => {
        // Standardverhalten der Links unterbinden
        e.preventDefault();

        // Merkmale der Links
        const href = e.target.href;
        const content = e.target.textContent;
        const id = e.target.id;

        // Verlauf in history eintragen
        history.pushState({ href, id }, content, href);

        // AJAX Request erstellen
        loadContent(href);
    });

    window.addEventListener("popstate", (e) => {
        console.log(e.state);
        loadContent(e.state.href);
    });

});

function loadContent(href) {
    fetch(href)
        .then(response => response.text())
        .then(docStr => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(docStr, "text/html");

            const mainContent = doc.querySelector("#main-content");
            // output.innerHTML = mainContent.innerHTML;

            // Element im DOM durch anderes Element ersetzen
            // console.log(mainContent);
            // output.replaceWith(mainContent)
            // console.log(mainContent);
            // console.log(output);

            if (!href.endsWith("index.html")) {
                const docForm = doc.querySelector("form");
                output.replaceChildren(docForm);
            } else {
                output.innerText = "Willkommen auf der Startseite!";
            }

        })

        .catch(err => console.log(err));

};

