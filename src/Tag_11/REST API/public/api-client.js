"use strict";

// REST-API Frontend Script
// JavaScript-Funktionen für API-Abrufe auf Client-Seite

const BASE_ROUTE = "/api";

// Hilfsfunktionen für API-Requests
async function makeRequest(url, options = {}) {
    try {
        console.log(`${ options.method || "GET" } ${ url }`);
        if (options.body) console.log("Request Body:", JSON.parse(options.body));

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            },
            ...options
        });

        const data = await response.json();
        console.log(`Response (${ response.status }):  ${ data }`);
        return {data, status: response.status, ok: response.ok};
    } catch (error) {
        console.error("Error:", error);
        return {
            data: {success: false, message: error.message},
            status: 0,
            ok: false
        };
    }
}

// Response anzeigen
function displayResponse (elementId, response) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = "block";
        element.textContent = JSON.stringify(response.data, null, 2);
        element.className = `response ${ response.ok ? "success" : "error" }`;
    }
}

// GET für Abruf aller User
async function getAllUsers() {
    const nameFilter = document.getElementById("nameFilter").value;
    const minAge = document.getElementById("minAge").value;
    const maxAge = document.getElementById("maxAge").value;

    let url = `${ BASE_ROUTE }/users`;
    const params = new URLSearchParams();
    if (nameFilter) params.append("name", nameFilter);
    if (minAge) params.append("minAge", minAge);
    if (maxAge) params.append("maxAge", maxAge);

    // Suchparameter als queryString übergeben
    if (params.toString()) url += `?${ params }`;

    const response = await makeRequest(url);
    displayResponse("getAllResponse", response);

    document.getElementById("nameFilter").value = "";
    document.getElementById("minAge").value = "";
    document.getElementById("maxAge").value = "";
}

// GET für einzelnen User
async function getUser() {
    const userId = document.getElementById("getUserId").value;
    if (!userId) {
        alert("Bitte geben Sie eine User-ID ein.");
        return;
    }

    const response = await makeRequest(`${ BASE_ROUTE }/users/${ userId }`);
    displayResponse("getUserResponse", response);
}

// POST für neuen User
async function createUser() {
    const name = document.getElementById("postName").value;
    const email = document.getElementById("postEmail").value;
    const age = document.getElementById("postAge").value;
    if (!name || !email) {
        alert("Bitte geben Sie einen Namen und eine E-Mail ein.");
        return;
    }
    const userData = {name, email};
    if (age) userData.age = parseInt(age);

    const response = await makeRequest(`${ BASE_ROUTE }/users`, {
        method: "POST",
        body: JSON.stringify(userData)
    });
    displayResponse("createResponse", response);

    // Felder leeren
    document.getElementById("postName").value = "";
    document.getElementById("postEmail").value = "";
    document.getElementById("postAge").value = "";
}

// PUT User aktualisieren
async function updateUser() {
    const userId = document.getElementById("putUserId").value;
    const name = document.getElementById("putName").value;
    const email = document.getElementById("putEmail").value;
    const age = document.getElementById("putAge").value;
    if (!userId) {
        alert("Bitte geben Sie eine User-ID ein.");
        return;
    }
    const userData = {};
    if (name) userData.name = name;
    if (email) userData.email = email;
    if (age) userData.age = parseInt(age);

    if (Object.keys(userData).length === 0) {
        alert("Bitte mindestens ein Feld zum Aktualisieren ausfüllen.");
        return;
    }

    const response = await makeRequest(`${ BASE_ROUTE }/users/${ userId }`, {
        method: "PUT",
        body: JSON.stringify(userData)
    });
    displayResponse("updateResponse", response);

    document.getElementById("putUserId").value = "";
    document.getElementById("putName").value = "";
    document.getElementById("putEmail").value = "";
    document.getElementById("putAge").value = "";
}

// DELETE um User zu löschen
async function deleteUser() {
    const userId = document.getElementById("deleteUserId").value;
    if (!userId) {
        alert("Bitte geben Sie eine User-ID ein.");
        return;
    }
    if (!confirm(`Ùser mit ID %{userId} wirklich löschen?`)) {
        return;
    }
    const response = await makeRequest(`${ BASE_ROUTE }/users/${ userId }`, {
        method: "DELETE"
    });
    displayResponse("deleteResponse", response);

    // ID-Feld leeren, wenn Löschen erfolgreich
    if (response.ok) document.getElementById("deleteUserId").value = "";
}

// Init-Function beim Laden der seite
function init() {
    console.log("REST_API verfügbar");

    // EventListener für API-Test-Button
    document.getElementById("getAllUsersBtn").addEventListener("click", getAllUsers);
    document.getElementById("getUserBtn").addEventListener("click", getUser);
    document.getElementById("createUserBtn").addEventListener("click", createUser);
    document.getElementById("updateUserBtn").addEventListener("click", updateUser);
    document.getElementById("deleteUserBtn").addEventListener("click", deleteUser);

    // initial alle User laden
    getAllUsers();
}


// DOM-Event-Handler
document.addEventListener("DOMContentLoaded", init);