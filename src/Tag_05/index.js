"use strict";

/* 
    Ein Objekt ist eine Sammlung von zusammengehörigen Daten und Funktionen. 
    Man kann es sich wie einen Container vorstellen, der verschiedene Werte unter einem Namen speichert.
*/

{
    /* 
        const name = "Anna";
    
        const person = {
            name: "Anna",
            age: 28
        }
    
        console.log(person.name);
        console.log(person["name"]);
    
        const key = "age";
        console.log(person[key]);
    
        person.name = "Elly";
        console.log(person["name"]);
    
        person.city = "Wien";
    
        console.log(person);
    
        console.log(person.job);    // umdefined
        // console.log(person.job.title);  // error
    
        person.job = {title: "Dev"};
    
        if (person.job) {
            console.log(person.job.title);
        }
    
        // Modern (ES2020) mit optional Chaining
        const job_title = person && person.job && person.job.title;
    
        console.log(job_title);
     */

}

{
    /*     
         // Alte Schreibweise
        const person = {
            name: "Anna",
            greet: function() {
                console.log(`Moin, ich bin ${this.name}`);
            },
        }
        console.log(person.greet());    // undefined -> Function hat keine Rückgabe
        person.greet();
    
        // Neue - kurze Schreibweise
        const person2 = {
            name: "Anna",
            greet() {
                console.log(`Moin, ich bin ${this.name}`); 
            },
        }
        person2.greet();
         */
}

{
    /* 
        // Übung
        // Erstelle ein Objekt "book" mit folgenden Properties:
        // title → Titel deines Lieblingsbuches (oder erfinde einen)
        // author → Autorenname
        // pages → Seitenzahl
        // isRead → true oder false
    
        // Dann:
        // 1. Gib den Titel mit Dot Notation aus
        // 2. Gib den Autor mit Bracket Notation aus
        // 3. Füge eine neue Property "rating" mit dem Wert 5 hinzu
        // 4. Schreibe eine Methode describe(), die ausgibt:
        // "[title] von [author] – [pages] Seiten"
    
        // Bonusfrage:
        // Was gibt book.publisher aus?
        // Was gibt book.publisher.name aus?
        // Erkläre den Unterschied.
    
        const book = {
            title: "Die Mondfeuchte",
            author: "Max Sternengucker",
            pages: 234,
            isRead: false,
            describe() {
                console.log(`${this.title} von ${this.author} - ${this.pages} Seiten`);
            },
        }
    
        console.log(book.title);
        console.log(book["author"]);
    
        book.rating = 5;
    
        console.log(book);
        
        book.describe();
    
        console.log(book.publisher);    // undefined
        console.log(book.publisher.name);   // error -> zugrif auf objekt, welches nicht definiert ist
         */
}

{
    /* 
        const personProto = {
            greet() {
                console.log(`Hi, ich bin ${this.name}`);
            },
            birthday() {
                this.age++;
                console.log(`${this.name} ist jetzt ${this.age}`);
            }
        }
    
        const anna = Object.create(personProto);
        anna.name = "Anna";
        anna.age = 32;
    
        const ben = Object.create(personProto);
        ben.name = "Ben";
        ben.age = 34;
    
        anna.greet();
        anna.birthday();
    
        ben.greet();
    
        console.log(anna);
    
        console.log(anna.hasOwnProperty("Name"));
        console.log(anna.hasOwnProperty("greet"));
    
        console.log(Object.getPrototypeOf(anna));
        console.log(anna.__proto__);    // ältere Schreibweise
    
        // überschreiben prototype
        anna.greet = function() {
            console.log(`Ich bin ${this.name} und überschreibe den Prototype!`);
        };
    
        anna.greet();
        console.log(anna);
     */
}

{
    /* 
        // Übung
        // TEIL 1: Was gibt dieser Code aus?
        // Beantworte OHNE ausprobieren – erkläre deine Antwort.
    
        const base = {
            type: "base",
            describe() {
                return `Ich bin: ${this.type}`;
            }
        };
    
        const child = Object.create(base);
        child.type = "child";
    
        const grandchild = Object.create(child);
    
        console.log(grandchild.type); // ? -> child
        console.log(grandchild.describe()); // ? -> Ich bin: child
        
        console.log("------------------------------");
        console.log("child object:", child);
        console.log("prototype object:", Object.getPrototypeOf(child));
        delete child.type;
        console.log("------------------------------");
        console.log("child object:", child);
        console.log("prototype object:", Object.getPrototypeOf(child));
        console.log("------------------------------");
    
        console.log(grandchild.type); // ? -> base
        console.log(grandchild.describe()); // ? -> Ich bin: base
    
    
        // TEIL 2: Baue selbst
        // https://github.com/pietow/alphatraining_js-live/tree/main/1-objekte
    
        // Erstelle ein Objekt "vehicleProto" mit:
        // - einer Methode describe() die ausgibt:
        // "[brand] fährt mit [speed] km/h"
        // - einer Methode accelerate(n) die speed um n erhöht
    
        // Erstelle damit zwei Fahrzeuge:
        // - bike → brand: "Trek", speed: 0
        // - car → brand: "BMW", speed: 0
    
        // Teste:
        // bike.accelerate(25)
        // car.accelerate(120)
        // bike.describe()
        // car.describe()
    
        // Überprüfe:
        // Liegt describe() auf bike oder auf vehicleProto?
        // Beweis mit hasOwnProperty()
    
        const vehicleProto = {
            describe() {
                console.log(`${this.brand} fährt mit ${this.speed} km/h`);
            },
            accelerate(n) {
                this.speed += n;
            },
        }
    
        const bike = Object.create(vehicleProto);
        bike.brand = "Trek";
        bike.speed = 0;
    
        const car = Object.create(vehicleProto);
        car.brand = "BMW";
        car.speed = 0;
    
        bike.accelerate(25);
        car.accelerate(120);
        bike.describe();
        car.describe();
    
        console.log(vehicleProto.hasOwnProperty("describe"));   // True
        console.log(bike.hasOwnProperty("describe"));           // False
     */
}

{
    /* 
        const person = {
            name: "Anna",
            age: 28,
        };
    
        console.log(Object.keys(person));
        console.log(Object.values(person));
        console.log(Object.entries(person));
    
        for (const key in person) {
            console.log(key);
        }
    
        const anna = Object.create(person);
        anna.username = "ann";
        
        for (const key of Object.keys(anna)) {
            console.log(key);
        };
    
        console.log(Object.keys(anna));
    
        // Objekte erweitern und zusammenführen
        const base = {name: "Anna", age: 28};
        const extra = {city: "Wien", job: "Dev"};
    
        const combined = Object.assign({}, base, extra);
        console.log(combined);
    
        const combined2 = {...base, ...extra};
        console.log(combined2);
     */
}

{
    /*     
        const person = {
            name: "Anna",
            age: 28,
            greet() {console.log("Hi!");}
        };
    
        const json = JSON.stringify(person);
        console.log(json);
        console.log(typeof(json));
    
        const parsed = JSON.parse(json);
        console.log(parsed);
        console.log(typeof(parsed));
     */
}

{
/*     
    // Übung
    // Gegeben:
    // const user = {
    // username: "anna_w",
    // email: "anna@example.com",
    // role: "admin",
    // password: "secret123"
    // };
    // 
    const settings = {
        theme: "dark",
        language: "de"
    };

    // 1. Gib alle Keys von user aus
    // 2. Gib alle Values von user aus
    // 3. Erstelle ein neues Objekt "profile" das
    // user und settings zusammenführt –
    // OHNE password (das soll nicht im Profil landen)
    // 4. Serialisiere profile als JSON-String
    // 5. Parse den JSON-String zurück zu einem Objekt
    // und überprüfe ob theme noch vorhanden ist// Bonusfrage:
    // Was passiert wenn du user direkt serialisierst?
    // Ist password im JSON-String?
    // Was sagt uns das über JSON-Serialisierung und Sicherheit?

    const user = {
        username: "anna_w",
        email: "anna@example.com",
        role: "admin",
        password: "secret123"
    };

    console.log(Object.keys(user));
    console.log(Object.values(user));
    console.log(Object.entries(user));

    const { password, ...safeUser} = user;
    console.log("------- Create Safe User -------");
    console.log(password);
    console.log(safeUser);
    console.log();

    const profile = Object.assign({}, user, settings);
    console.log("--------- mit Passwort ---------");
    console.log(profile);
    let json = JSON.stringify(profile);
    console.log(json);
    let parsed = JSON.parse(json);
    console.log(parsed);

    console.log("--------- ohne Passwort ---------");
    delete profile.password;
    console.log(profile);

    json = JSON.stringify(profile);
    console.log(json);
    parsed = JSON.parse(json);
    console.log(parsed);
 */
}

{

    // 1. Was macht Object.create()?
    // Object.create(proto) erstellt ein neues Objekt und setzt dessen internen Prototyp

    // 2. Wo landen Methoden wenn ich sie auf einem Prototyp definiere –
    // auf dem Objekt oder auf dem Prototyp?
    // Methoden landen ausschließlich auf dem Prototyp-Objekt, nicht auf der Instanz (dem eigentlichen Objekt).


    // 3. Was gibt hasOwnProperty() zurück und warum ist das wichtig?
    // hasOwnProperty(key) gibt einen Boolean (true oder false) zurück.

    // 4. Was ist [[Prototype]]?
    // [[Prototype]] ist ein interner Verweis (Link), den fast jedes Objekt in JavaScript besitzt. Er zeigt auf ein anderes Objekt.


}

{
/* 
    // bisheriges erzeugen von objekten
    const personProto = {
        greet() {
            console.log(`Hi, ich bin ${this.name}`);
        }
    };

    // Factory Function
    function createPerson(name, age) {
        const p = Object.create(personProto);
        p.name = name;
        p.age = age;
        return p;
    }

    const anna = createPerson("Anna", 28);
    console.log(anna);

    // NEU Syntax class

    // Stufe 1 - Factory Function
    function range(from, to) {
        let r = Object.create(range.methods);
        r.from = from;
        r.to = to;
        return r;
    }

    range.methods = {
        includes(x) {return this.from <= x && x <= this.to},
        toString() { return `(${this.from}...${this.to})`},
    }

    let r = range(1, 3);
    console.log(r.includes(2));
    console.log(r.toString());

    let r2 = range(1, 10);
    console.log(r2.includes(2));
    console.log(r2.toString());

    console.log(r.hasOwnProperty("from"));      // true
    console.log(r.hasOwnProperty("includes"));  // false

    console.log(Object.getPrototypeOf(r));      // range.methods object


    // Stufe 2 - prototype
    function Range(from, to) {
        r.from = from;
        r.to = to;
        return r;
    }

    Range.prototype = {
        includes(x) {return this.from <= x && x <= this.to},
        toString() { return `(${this.from}...${this.to})`},
    }

    let R = new Range(1, 3);
    console.log(R.includes(2));
    console.log(R.toString());


    // 3. Stufe: class
    class clsRange {
        constructor(from, to) {
            this.from = from
            this.to = to
        }

        includes(x) {return this.from <= x && x <= this.to}
        toString() { return `(${this.from}...${this.to})`}
    }
    let r1 = new clsRange(1, 5);
    console.log(r1.includes(2));
    console.log(r1.toString());

    console.log(typeof clsRange);
    console.log(Object.getPrototypeOf(r1), clsRange.prototype);

    // https://www.youtube.com/watch?v=PSGEjv3Tqo0
 */    
}

{

    const createFahrzeugProto = {
        beschreiben(x) {return console.log(`${this.marke} (${this.typ}) - ${this.ps} PS`)},
        istSchnell() { return console.log(this.ps > 150)},
    }

    function createFahrzeug(marke, ps, typ) {
        const p = Object.create(createFahrzeugProto);
        p.marke = marke;
        p.ps = ps;
        p.typ = typ;

        return p;
    }

    // Erwartetes Verhalten:
    const f = createFahrzeug("BMW", 200, "PKW");
    f.beschreiben() // => "BMW (PKW) – 200 PS"
    f.istSchnell()  // => true

}

{

    function createFahrzeug(marke, ps, typ) {
        this.marke = marke;
        this.ps = ps;
        this.typ = typ;
    }

    createFahrzeug.prototype = {
        beschreiben(x) {return console.log(`${this.marke} (${this.typ}) - ${this.ps} PS`)},
        istSchnell() { return console.log(this.ps > 150)},
    }

    const f = new createFahrzeug("BMW", 200, "PKW");
    f.beschreiben() // => "BMW (PKW) – 200 PS"
    f.istSchnell()  // => true
    
}