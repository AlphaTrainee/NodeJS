"use strict";

// indexedDB
{
    /*
        IndexedDB = JavaScript-basierte objektorientierte Datenbank
        Low-Level-API für clientseitige Speicherung großer Mengen strukturierter Daten incl. Dateien als Blobs
        API verwendet Indizes, um Hochleistungssuchen dieser Daten zu ermöglichen (speichert fast jede Art von Werten nach Schlüsseln, mehrere Schlüsseltypen möglich)
        WebStorage nützlich für Speicherung kleinerer Datenmengen -> weniger geeignet für  Speicherung größerer Mengen strukturierter Daten

        Vorgehen:
        Datenbankschema angeben
        Verbindung zu Datenbank öffnen
        Daten abrufen und aktualisieren (Transaktionen)

        Vorteile:
        asynchrone Funktionsweise,
        key-value Struktur,
        Daten sind Offline verfügbar,
        mehr Platz als im WebStorage
        mehrere Datenbanken pro Protokoll/Domain:Port möglich
        Zugriff nur von Protokoll/Domain:Port aus möglich
    */

    // Initialisierung
    const DB_NAME = "Einkaufsliste";
    const DB_VERSION = 1;
    let db;

    // Request, um DB-Verbindung zu erstellen / Öffnen der Datenbank
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    // initiale Tabelle anlegen
    // event upgardeneeded feuert, wenn DB noch nicht vorhanden ist oder die Version höher ist als die vorhandene
    request.onupgradeneeded = function (event) {
        db = event.target.result;

        // ObjectStore erstellen, wenn noch nicht vorhanden
        if (!db.objectStoreNames.contains("items")) {
            let store = db.createObjectStore("items", {keyPath: "id", autoIncrement: true});
            store.createIndex("name", "name", {unique: true});
        }

        console.log("DB initialisiert und ObjectStore erstellt")
    };

    // Fehlerbehandlung beim öffnen der DB
    request.onerror = (event) => {
        console.log("Fehler beim Öffnen der DB: ", event.target.errorCode);
    };

    // Transaktionen (Zugriffe auf DB)
    request.onsuccess = (event) => {
        db = event.target.result;
        console.log("DB-Verbindung erfolgreich hergestellt");

        // Transaktionen starten
        saveItem("Milch", 1);
        saveItem("Brot", 2);
        saveItem("Butter", 3);
        saveItem("Eier", 4);
        saveItem("Milch", 5);
        saveItem("Brot", 6);
        saveItem("Butter", 7);

        getAllItems();
        getItemById(1);
        getItemById(2);
        getItemById(3);
        getItemById(4);
        getItemById(5);

        getItemByName("Milch");
        getItemByName("Brot");
        getItemByName("Butter");
        getItemByName("Eier");
        getItemByName("Äpfel");

        updateItemById(1, 10);
        updateItemById(2, 20);
        updateItemById(3, 30);
        updateItemById(4, 40);
        updateItemById(5, 50);

        updateItemByName("Milch", 100);
        updateItemByName("Brot", 200);
        updateItemByName("Butter", 300);
        updateItemByName("Äpfel", 300);

        deleteItemById(1);
        deleteItemById(2);
        deleteItemById(20);

        deleteItemByName("Milch");
        deleteItemByName("Brot");
        deleteItemByName("Äpfel");
    };


    // Funktionen für Transaktionen

    // Funktion zum Speichern von Daten
    function saveItem(name, value) {
        let transaction = db.transaction(["items"], "readwrite");
        let store = transaction.objectStore("items");
        const request = store.add({name, value});

        // Erfolgsmeldung ausgeben
        request.onsuccess = () => console.log("Daten erfolgreich gespeichert", request.result);

        // Fehlerbehandlung
        request.onerror = (event) => {
            if (event.target.error.name === "ConstraintError") {
                console.log("Datensatz konnte nicht gespeichert werden, da bereits vorhanden:", {name, value});
            } else {
                console.log("Fehler beim Speichern der Daten:", event.target.error.name, event.target.error.message);
            }
        };

        transaction.oncomplete = () => console.log("Daten erfolgreich gespeichert");
    }

    // alle Datensätze abrufen
    function getAllItems() {
        let transaction = db.transaction(["items"], "readonly");
        let store = transaction.objectStore("items");
        const request = store.getAll();

        request.onsuccess = (event) => {
            console.log("Alle Daten erfolgreich abgerufen", event.target.result);
        };

        request.onerror = (event) => console.log("Fehler beim Abrufen der Daten:", event.target.error.name, event.target.error.message);

        transaction.oncomplete = () => console.log("Daten erfolgreich abgerufen");
    }

    // Datensatz über id abrufen
    function getItemById(id) {
        let transaction = db.transaction(["items"], "readonly");
        let store = transaction.objectStore("items");
        const request = store.get(id);

        request.onsuccess = () => {
            let data = request.result;
            if (data) {
                console.log("Datensatz erfolgreich abgerufen:", data);
            } else {
                console.log("Kein Datensatz mit id", id, "gefunden");
            }
        };

        request.onerror = (event) => console.log("Fehler beim Abrufen der Daten:", event.target.error.name, event.target.error.message);
    }

    // Datensatz über Artikelnamen abrufen
    function getItemByName(name) {
        let transaction = db.transaction(["items"], "readonly");
        let store = transaction.objectStore("items");
        const index = store.index("name");
        const request = index.get(name);

        request.onsuccess = () => {
            let data = request.result;
            if (data) {
                console.log("Datensatz erfolgreich abgerufen:", data);
            } else {
                console.log("Kein Datensatz mit Artikelnamen", name, "gefunden");
            }
        };

        request.onerror = () => console.log("Fehler beim Abrufen der Daten:", request.error.name, request.error.message);
    }

    // Datensatz aktualisieren über id
    function updateItemById(id, newVal) {
        let transaction = db.transaction(["items"], "readwrite");
        let store = transaction.objectStore("items");
        const request = store.get(id);

        request.onsuccess = () => {
            let data = request.result;
            if (data) {
                data.value = newVal;
                store.put(data);
                console.log("Datensatz erfolgreich aktualisiert:", data);
            } else {
                console.log("Kein Datensatz mit id", id, "gefunden");
            }
        };

        request.onerror = () => console.log("Fehler beim Aktualisieren der Daten:", request.error.name, request.error.message);
    }

    // Datensatz über Artikelnamen aktualisieren
    function updateItemByName(name, newVal) {
        let transaction = db.transaction(["items"], "readwrite");
        let store = transaction.objectStore("items");
        const index = store.index("name");
        const request = index.get(name);

        request.onsuccess = () => {
            let data = request.result;
            if (data) {
                data.value = newVal;
                store.put(data);
                console.log("Datensatz für Artikel", name, "erfolgreich aktualisiert:", data);
            } else {
                console.log("Kein Datensatz mit Artikelnamen", name, "gefunden");
            }
        };
        request.onerror = () => console.log("Fehler beim Aktualisieren der Daten:", request.error.name, request.error.message);
    }

    // Datensatz über id löschen
    function deleteItemById(id) {
        let transaction = db.transaction(["items"], "readwrite");
        let store = transaction.objectStore("items");
        const request = store.get(id);

        request.onsuccess = () => {
            let data = request.result;
            if (data) {
                let delRequest = store.delete(id);
                delRequest.onsuccess = () => console.log("Datensatz mit id", id, "erfolgreich gelöscht");
                delRequest.onerror = () => console.log("Fehler beim Löschen des Datensatzes mit id", id, ":" , delRequest.error.name, delRequest.error.message);
            } else console.log("Kein Datensatz mit id", id, "gefunden");
        };

        request.onerror = () => console.log("Fehler beim Löschen der Daten:", request.error.name, request.error.message);
    }

    // Datensatz über Artkelnamen löschen
    function deleteItemByName(name) {
        let transaction = db.transaction(["items"], "readwrite");
        let store = transaction.objectStore("items");
        const index = store.index("name");
        const request = index.get(name);

        request.onsuccess = () => {
            let data = request.result;
            if (data) {
                let delRequest = store.delete(data.id);
                delRequest.onsuccess = () => console.log("Datensatz mit Artikelnamen", name, "erfolgreich gelöscht");
                delRequest.onerror = () => console.log("Fehler beim Löschen des Datensatzes mit Artikelnamen", name, ":", delRequest.error.name, delRequest.error.message);
            } else console.log("Kein Datensatz mit Artikelnamen", name, "gefunden");
        };

        request.onerror = () => console.log("Fehler beim Löschen der Daten:", request.error.name, request.error.message);
    }
}