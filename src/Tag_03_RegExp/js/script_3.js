"use strict";

const testMail1 = "#meineMail@google.com";
const testMail2 = "ich@mail.de";
const testMail3 = "du@mail..de";

console.log("------ Test Mail Adressen ------");
console.log(`Adresse 1: ${testMail1}`);
console.log(`Adresse 2: ${testMail2}`);
console.log(`Adresse 3: ${testMail3}`);

// Übung RegExp Validierung eMail
{
    console.log("------ eigenes Pattern ------");

    // let pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$;
    // let pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    
    // prüft auf doppelte Punkte
    /* 
        Die "Negative Lookahead" Methode (Profis)
        Du kannst eine Bedingung am Anfang des Patterns einfügen, die sagt: "Prüfe den String, aber wenn du irgendwo zwei Punkte hintereinander findest, brich sofort ab."
        Dafür nutzt man (?!.*\.\.).
    */
    let pattern = /^(?!.*\.\.)[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

    console.log(`Pattern: ${pattern}`);
    console.log(pattern.test(testMail1));
    console.log(pattern.test(testMail2));
    console.log(pattern.test(testMail3));

}

{

    console.log("------ MagicPEN ------");
}
{
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(`Prüft, dass es genau ein @ gibt, keine Leerzeichen, mindestens ein Punkt im Domain‑Teil. Kein genauer Syntaxcheck für Sonderfälle.`);
    console.log(`Pattern: ${pattern}`);
    console.log(pattern.test(testMail1));
    console.log(pattern.test(testMail2));
    console.log(pattern.test(testMail3));

}

{
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log(`Strenger: keine führenden/folgenden Punkte, keine doppelten Punkte im lokalen Teil, Domain-Labels dürfen nicht mit Bindestrich beginnen/enden`);
    console.log(`Pattern: ${pattern}`);
    console.log(pattern.test(testMail1));
    console.log(pattern.test(testMail2));
    console.log(pattern.test(testMail3));

}

{
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    console.log(`Erlaubt lokale Teile mit gängigen Sonderzeichen und Domain‑Labels mit Bindestrichen. Akzeptiert Subdomains.`);
    console.log(`Pattern: ${pattern}`);
    console.log(pattern.test(testMail1));
    console.log(pattern.test(testMail2));
    console.log(pattern.test(testMail3));

}

{
    const pattern = /^(?!.*\.\.)(?!\.)(?!.*\.$)[A-Za-z0-9._%+-]+@(?!-)(?:[A-Za-z0-9-]{1,63}\.)+[A-Za-z]{2,}$/;
    console.log(`Sehr strikt (annähernd RFC-konform für die meisten Fälle; aber sehr komplex)`);
    console.log(`Pattern: ${pattern}`);
    console.log(pattern.test(testMail1));
    console.log(pattern.test(testMail2));
    console.log(pattern.test(testMail3));

}

{
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    console.log(`HTML5-ähnliches Pattern (für pattern-Attribut in Formularen)`);
    console.log(`Pattern: ${pattern}`);
    console.log(pattern.test(testMail1));
    console.log(pattern.test(testMail2));
    console.log(pattern.test(testMail3));

}

