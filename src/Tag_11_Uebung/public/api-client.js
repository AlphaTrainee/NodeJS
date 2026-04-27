"use strict";

const BASE_ROUTE = "/api/products";

// Universelle Request-Funktion
async function makeRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: { "Content-Type": "application/json", ...options.headers },
            ...options
        });
        const data = await response.json();
        return { data, status: response.status, ok: response.ok };
    } catch (error) {
        console.error("API Error:", error);
        return { data: { success: false, message: error.message }, status: 0, ok: false };
    }
}

function displayResponse(elementId, response) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = "block";
        element.textContent = JSON.stringify(response.data, null, 2);
        element.className = `response ${response.ok ? "success" : "error"}`;
    }
}

// GET: Alle Produkte
async function getAllProducts() {
    const nameFilter = document.getElementById("nameFilter").value;
    let url = BASE_ROUTE;
    if (nameFilter) url += `?name=${encodeURIComponent(nameFilter)}`;

    const response = await makeRequest(url);
    displayResponse("getAllResponse", response);
}

// GET: Einzelnes Produkt
async function getProduct() {
    const idInput = document.getElementById("getProductId");
    const id = idInput ? idInput.value : null;

    // Wenn keine ID eingegeben wurde, gar nicht erst fragen!
    if (!id || id === "") {
        console.log("Keine ID eingegeben, Abruf übersprungen.");
        return; 
    }

    const response = await makeRequest(`${BASE_ROUTE}/${id}`);
    displayResponse("getProductResponse", response);
}

// POST: Neues Produkt
async function createProduct() {
    const productData = {
        number: document.getElementById("postNumber").value,
        name: document.getElementById("postName").value,
        description: document.getElementById("postDescription").value,
        price: parseFloat(document.getElementById("postPrice").value)
    };

    if (!productData.name || !productData.number) return alert("Name und Nummer sind Pflicht!");

    const response = await makeRequest(BASE_ROUTE, {
        method: "POST",
        body: JSON.stringify(productData)
    });
    displayResponse("createResponse", response);
    getAllProducts();
}

// PUT: Update
async function updateProduct() {
    const id = document.getElementById("putProductId").value;
    const productData = {};
    
    const name = document.getElementById("putName").value;
    const description = document.getElementById("putDescription").value;
    const price = document.getElementById("putPrice").value;

    if (name) productData.name = name;
    if (description) productData.description = description;
    if (price) productData.price = parseFloat(price);

    if (!id) return alert("ID fehlt!");

    if (Object.keys(productData).length === 0) {
        alert("Bitte mindestens ein Feld zum Aktualisieren ausfüllen.");
        return;
    }
    
    const response = await makeRequest(`${BASE_ROUTE}/${id}`, {
        method: "PUT",
        body: JSON.stringify(productData)
    });
    displayResponse("updateResponse", response);
    getAllProducts();
}

// DELETE
async function deleteProduct() {
    const id = document.getElementById("deleteProductId").value;
    if (!id) return alert("ID fehlt!");

    if (!confirm(`Produkt mit ID ${id} wirklich löschen?`)) return;

    const response = await makeRequest(`${BASE_ROUTE}/${id}`, { method: "DELETE" });
    displayResponse("deleteResponse", response);
    getAllProducts();
}

// Init
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("getAllProductsBtn").addEventListener("click", getAllProducts);
    document.getElementById("getProductBtn").addEventListener("click", getProduct);
    document.getElementById("createProductBtn").addEventListener("click", createProduct);
    document.getElementById("updateProductBtn").addEventListener("click", updateProduct);
    document.getElementById("deleteProductBtn").addEventListener("click", deleteProduct);
    
    getAllProducts(); // Beim Start einmal laden
});