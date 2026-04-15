"use strict";

// Reguläre Ausdrücke
{

    // regex ist ein Objekt

    let regExp = new RegExp("Hallo");
    console.log(regExp);

    // Literal Schreibweise, ist perfomanter
    regExp = /Hallo/;
    console.log(regExp);

    // Methoden des RegExp Objekts
    // test("string") prüft auf Übereinstimmung -> Boolean
    // exec("string") sucht nach Übereinstimmung Rückgabe erstes gefundenes Muster oder null

    let str = "Jessica und Luke sind Helden des MArvel Universums";
    regExp = /Helden/;
    console.log(regExp.test(str));
    regExp = /Elektra/;
    console.log(regExp.test(str));

    console.log(regExp.toString());
    console.log(regExp.toString().slice(1, -1));


    // Methoden des Datentyps String
    // .replace(search, replace)
    // .match()
    // .search() -> indexOf kann nicht mit RegExp arbeiten!!

    let desc = "Entdecken Sie bei Eduscho neben Kaffee und Reisen auch Mehl, Öl und Toilettenpapier. Eduscho, den lob ich mir!";

    let oldBrand = /Eduscho/g; // -> mit global Flag werden ALLE Vorkommen ersetzt
    let newBrand = "Tchibo";

    console.log(desc.replace(/Eduscho/, newBrand)); // nur das ERSTE Vorkommen wird ersetzt

    console.log(desc.replace(/Eduscho/g, newBrand));

    // console.log(desc.replaceAll(/Eduscho/, newBrand));   // das global Flag MUSS gesetzt sein -> dies ergibt Fehler
    console.log(desc.replaceAll(/Eduscho/g, newBrand));

    // ODER als String
    console.log(desc.replaceAll("Eduscho", newBrand));



    // search -> rückgabe Index der ersten Übereinstimmung
    // indexOf ist performanter
    console.log(desc.search(oldBrand));
    console.log(desc.search(/Tchibo/));
    console.log(desc.search("Tchibo"));
    console.log(desc.search("Eduscho"));

    // match
    console.log(desc.match(oldBrand));
    console.log(desc.match(/Eduscho/));
    console.log(desc.match(/Tchibo/));

}

// Definition eines Musters
{

    let regExp = /J..../;
    console.log(regExp.test("Jessica"));
    console.log(regExp.test("Luke"));
    console.log(regExp.test("Jo"));
    console.log(regExp.test("Elektra, Jo und Luke"));

    // Zeichenklassen
    // einfach Klasse
    // [abc] eines dieser Zeichen muss an der Position stehen
    // negierte Klasse
    // [^abc] alles ausser ...

    // Bereiche
    // [a-z]
    // [a-zA-Z]
    // [0-9a-z]

    regExp = /[0-9][0-9][0-9][0-9]/;
    console.log(regExp.test("jessy_1234"));
    console.log(regExp.test("jessy_12~15"));


    // vordefinierte Zeichenklassen
    // \w Wortzeichen
    // \W negation Grossbuchstabe
    // \d Ziffer
    // \D   negation
    // \s Leerzeichen
    // \S   negation
    regExp = /\w\w\w\w/;
    console.log(regExp.test("jessy_1234"));
    console.log(regExp.test("je12"));
    console.log(regExp.test("je_1"));           //
    console.log(regExp.test("jes#"));           // false
    console.log(regExp.test("jesä"));           // false -> umlate gehören nicht dazu


    regExp = /\d\d\d\d/;
    console.log(regExp.test("jessy_1234"));
    console.log(regExp.test("je12"));


    // Begrenzer
    // ^ Anfang
    // $ Ende

    // Wortgrenzen
    // \b Anfang oder Ende
    // \B es darf keine Grenze existieren

    regExp = /^J/;
    console.log(regExp.test("Jessica"));
    console.log(regExp.test("Luke"));
    console.log(regExp.test("Elektra, Jo"));


    regExp = /\.png$/; // ODER /[.]png$/
    console.log(regExp.test("jessy.png"));
    console.log(regExp.test("jessy.png,jpg"));


    regExp = /^J\w\w\w\w$/;
    console.log(regExp.test("Jessica"));
    console.log(regExp.test("Jessy"));
    console.log(regExp.test("Jenny"));
    console.log(regExp.test("Jo"));

    // Wortgrenzen
    regExp = /\bess\b/;
    console.log(regExp.test("Jessica"));
    console.log(regExp.test("Ich ess Blumen"));

    // keine Wortgrenze
    regExp = /\Bess\B/;
    console.log(regExp.test("Jessica"));
    console.log(regExp.test("Ich ess Blumen"));

    regExp = /\bEss\B/;
    console.log(regExp.test("Er Sie Es"));
    console.log(regExp.test("Essig Essenz"));
    console.log(regExp.test("essig essenz"));

    // Quantifizierer
    // ?  - 0 oder 1
    // *  - 0 oder mehrfach
    // +  - 1 oder mehrfach
    // {n}  n oder mehr
    // {n,m}

    regExp = /\.jp?g/;
    console.log(regExp.test("jessy.jpg"));
    console.log(regExp.test("jessy.jpeg"));
    console.log(regExp.test("jessy.png"));
    console.log(regExp.test("jessy.jpOg"));

    regExp = /^\d{3,5}\s*\d{3,}$/;
    console.log(regExp.test("012 345 6789"));           // false
    console.log(regExp.test("012/3456789"));            // true
    console.log(regExp.test("0123456789"));             // true
    console.log(regExp.test("012345 6789"));            // true
    console.log(regExp.test("012345      6789"));       // true

    regExp = /\s+/;
    console.log("Jessica Lena     Maria           Jones".split(regExp).join(" "));           // false

    // flags
    // g     - global
    // i     - case Insensitive
    // m     - multiline 

    regExp = /^multi/i;
    console.log(regExp.test("single-line\nMulti-line"));    // false

    regExp = /^multi/im;
    console.log(regExp.test("single-line\nMulti-line"));    // true

    regExp = /^multi/m;
    console.log(regExp.test("single-line\nMulti-line"));    // false

    // exec -> Rückgabe Array
    // 0  bei Gruppierungen Bestandteile der Gruppen
    // index: Index des Fundes
    // input: gesamter String
    // groups 

    let desc = "Entdecken Sie bei Eduscho neben Kaffee und Reisen auch Mehl, Öl und Toilettenpapier. Eduscho, den lob ich mir!";
    let oldBrand = /Eduscho/g;

    let output = oldBrand.exec(desc);
    console.log(output); 

    while (output) {
        console.log(output[0], output.index);
        output = oldBrand.exec(desc);
    }

    let newOutput;
    while (newOutput = oldBrand.exec(desc)) {
        console.log(newOutput[0], newOutput.index);
    }

    // Gruppierungen
    // () Gruppen werden in runden Klammern definiert
    // damit kann man auf Ergebnis in Gruppen zugreifen

    // benannte Gruppen groups-object

    let dateStr = "2024-06-30 11:27:05";
    let datePattern = /^(\d{4})-(\d{2})-(\d{2})/;
    let dateOutput = datePattern.exec(dateStr);
    console.log(dateOutput);
    console.log(dateOutput[0]);
    console.log(dateOutput[1]);
    console.log(dateOutput[2]);
    console.log(dateOutput[3]);
    console.log(dateOutput.index);
    console.log(dateOutput.groups);

    datePattern = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
    dateOutput = datePattern.exec(dateStr);
    console.log(dateOutput);
    console.log(dateOutput[0]);
    console.log(dateOutput[1]);
    console.log(dateOutput[2]);
    console.log(dateOutput[0]);
    console.log(dateOutput.index);
    console.log(dateOutput.groups);
    
}

