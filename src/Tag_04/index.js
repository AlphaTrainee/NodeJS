"use strict";

// Datenstrukturen Map und Set
{
    /*     // Map geordnete Sammlung von Keys
        // Set Sammlung von Unique Werten
    
        const map = new Map();
        console.log(map);
    
        // Hinzufügen
        map.set("name", "Snoopy");
        map.set("age", 3);
        map.set("status", "active");
        console.log(map);
        console.log(map.size);
    
    
        // map mit werten erzeugen
        let heroStrongness = new Map([
            ["Jessica", 42],
            ["Luke", 65],
            ["Daredevil", 36],
            ["Odin", 1],
        ]);
        console.log(heroStrongness);
        
        // Object to Map
        let heroes = {
            "Jessica": 42,
            "Luke": 65,
            "Daredevil": 36,
            "Thor": 100,
            "Odin": 1,
        };
        console.log(heroes);
    
        let heroMap = new Map(Object.entries(heroes));
        console.log(heroMap);
    
        let heroObj = Object.fromEntries(heroMap);
        console.log(heroObj);
    
        let heroArray = [...heroMap];
        console.log(heroArray);
    
        heroArray = Array.from(heroMap);
        console.log(heroArray);
    
        let user = {name: "Jessica", age: 3};
    
        let keyMap = new Map();
        keyMap.set("1", "string-key");
        keyMap.set(1, "number-key");
        keyMap.set(true, "boolean-key");
        keyMap.set(null, "null-key");
        keyMap.set(undefined, "undefined-key");
        keyMap.set(1, "überschreiben number-key");
        keyMap.set(user, "object-key");
        keyMap.set(heroMap, "map-key");
        keyMap.set(function() {}, "function-key");
    
        console.log(keyMap);
    
        // verketten
        heroStrongness = new Map()
            .set("Jessica", 42)
            .set("Luke", 65)
            .set("Daredevil", 36)
            .set("Odin", 1);
        console.log(heroStrongness);
    
    
        // Methoden
        let creatures = new Map([
            ["Hero", "Jessica"],
            ["Human", "Lutz Meyer"],
            ["Animal", "Lucy, the Cat"],
            ["Human", "Michael Jackson"],
        ]);
        console.log(creatures);
    
        console.log(creatures.get("Hero"));
    
        console.log(creatures.has("Ghost"));
        console.log(creatures.has("Inhuman"));
    
        console.log(creatures.delete("Human"));
        console.log(creatures.delete("Inhuman"));
    
        console.log(creatures);
         
        // creatures.clear();
        // console.log(creatures);
    
    
        // Iteratoren -> Map-Iteratoren
        // Loop durch Map ist performanter als durch Objekt
        // entries() - default
        // keys()
        // values()
    
        for(let [key, value] of creatures) {
            console.log(key, value);
        }
    
        console.log(creatures.keys());
        console.log([...creatures.keys()]);
        for(let key of creatures.keys()) console.log(key);
    
        console.log(creatures.values());
        console.log([...creatures.values()]);
        for(let value of creatures.values()) console.log(value);
    
        creatures.forEach((value, key, map) => console.log(key, value, map));
    
    
        // console.log(creatures);
     */
}

// Set
{
    /* 
        let set = new Set();
    
        console.log(set);
        console.log(set.size);
    
        set.add("Jessica");
        set.add("Luke");
        set.add("Thor");
        set.add("Daredevil");
        set.add("Odin");
        set.add("Thor");
    
    
        console.log(set);
    
        let heroSet = new Set(["Jessica", "Luke", "Thor", "Daredevil", "Odin", "Thor"]);
        console.log(heroSet);
        console.log(heroSet[2]);    // undefined
    
        let heroArray = ["Jessica", "Luke", "Thor", "Daredevil", "Odin", "Thor"];
        console.log(heroArray);
        let heroSet2 = new Set(heroArray);
        console.log(heroSet2);
    
        console.log([...heroSet2]);
    
    
        console.log(heroSet.has("Thor"));
        console.log(heroSet.has("Inhuman"));
    
        console.log(heroSet.delete("Daredevil"));
        console.log(heroSet.delete("Inhuman"));
    
        // heroSet.clear();
        console.log(heroSet);
    
    
        for (let value of heroSet) {
            console.log(value);
        }
        for (let key of heroSet.keys()) {
            console.log(key);
        }
        // for (let value of heroSet) {
        //     console.log(value);
        // }
    
        heroSet.forEach((value, key, set) => {
            console.log(value, key, set);
        });
    
        heroSet.forEach(value => console.log(value));
        
    
        let heroSet3 = new Set()
            .add("Jessica")
            .add("Luke")
            .add("Thor")
            .add("Daredevil")
            .add("Odin")
            .add("Thor");
    
        console.log(heroSet3);
    
        let heroArray2 = ["Jessica", "Luke", "Thor", "Daredevil", "Odin", "Thor"];
        console.log(heroArray2);
        let heroSet4 = new Set(heroArray2);
        console.log(heroSet4);
        console.log([...heroSet4]);
    
        let uniqueHeros = [...new Set(heroArray2)]
        console.log("array", uniqueHeros);
        console.log("array heroes array2", heroArray2);
     */
}

// Iteratoren
{

    let heros = ["Jessica", "Luke", "Thor", "Daredevil", "Odin"];
    let iterator = heros.values();
    console.log(iterator);
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());

    // iterator erstellen
    // eigenes Verhalten erzeugen
    // Array in umgekehrter reihenfolge durchlaufen
    function createArrIterator(arr) {
        let counter = arr.length - 1;

        return {
            next: () => {
                return {
                    value: arr[counter],
                    done: counter-- < 0
                }
            }
        }
    }

    let reverseArrIterator = createArrIterator(heros);
    console.log(reverseArrIterator.next());
    console.log(reverseArrIterator.next());
    console.log(reverseArrIterator.next());
    console.log(reverseArrIterator.next());
    console.log(reverseArrIterator.next());
    console.log(reverseArrIterator.next());

    for (let hero of heros) console.log(hero);

    heros[Symbol.iterator] = function() {
        let counter = this.length - 1;
        return {
            next: () => {
                return {
                    value: this[counter],
                    done: counter-- < 0
                }
            }
        }
    }
    for (let hero of heros) console.log(hero);

}


// Generatoren
{

    // Generator Function
    function* createSteps() {
        console.log("Step 1");
        yield 1;
        console.log("Step 2");
        yield 2;
        console.log("Step 3");
    }

    // Erzeugung Generator Object
    let myGenerator = createSteps();
    console.log(myGenerator);
    console.log(myGenerator.next());
    console.log(myGenerator.next());
    console.log(myGenerator.next());
    // wenn done == true next nicht weiter aufrufen ...
    // es kann ein Type Error kommen

    let myGenerator2 = createSteps();
    console.log(myGenerator2);
    console.log(myGenerator2.next());
    console.log(myGenerator2.next());
    console.log(myGenerator2.next());

    // generator kann als iterator genutzt werden
    for (let step of createSteps()) console.log(step);

    // unendlichen Generator
    function* createInfiniteSteps() {
        let counter = 0;
        while(true) {
            counter++;
            yield counter;
            let restart = yield counter;
            if (restart) counter = 0;
        }
    }

/*     let infiniteGenerator = createInfiniteSteps();
    console.log(infiniteGenerator);
    console.log(infiniteGenerator.next());
    console.log(infiniteGenerator.next());
    console.log(infiniteGenerator.next());
    console.log(infiniteGenerator.next());
    console.log(infiniteGenerator.next());
    console.log(infiniteGenerator.next(true));
    console.log(infiniteGenerator.next());
    console.log(infiniteGenerator.next());
    console.log(infiniteGenerator.next());
    console.log(infiniteGenerator.next());
    console.log(infiniteGenerator.next());
    console.log(infiniteGenerator.next());
    console.log(infiniteGenerator.next(true));
    console.log(infiniteGenerator.next());
    console.log(infiniteGenerator.next());
    console.log(infiniteGenerator.next());
    console.log(infiniteGenerator.next());
    console.log(infiniteGenerator.next());
    console.log(infiniteGenerator.next());
    console.log(infiniteGenerator.next(true));
    console.log(infiniteGenerator.next());
    console.log(infiniteGenerator.next());
    console.log(infiniteGenerator.next()); */

    const counting = (start, end) => ({
        *[Symbol.iterator]() {
            while(start % (end + 1)) yield start++;
        }
    });

    for(let i of counting(20, 30)) console.log(i);
    for(let i of counting(5, 10)) console.log(i);



}

