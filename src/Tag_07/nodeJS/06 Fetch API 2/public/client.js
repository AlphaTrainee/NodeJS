"use strict";

const form = document.querySelector("form");
const input = document.querySelector("input");
const list = document.querySelector("ul#heroes");

// daten abrufen
fetch("heroes", {
        headers: {
            "Cache-Control": "no Cache"
        }
    })
    .then(response => response.json())
    .then(heroesArr => showHeroes(heroesArr))
    .catch(err => console.log(err));

const showHeroes = heroesArr => {
    list.textContent = "";
    heroesArr.forEach(hero => {
        const li = document.createElement("li");
        li.textContent = hero;
        list.append(li);
    });
    input.value = "";
    input.focus();
};

// Daten an Server übermitteln
form.addEventListener("submit", e => {
    e.preventDefault();
    fetch("/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ hero: input.value.trim() })
    })
        .then(response => response.json())
        .then(heroesArr => showHeroes(heroesArr))
        .catch(err => console.log(err));
});
