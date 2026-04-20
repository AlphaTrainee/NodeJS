"use strict";

/* 
Prototype ist ein Objekt, in dem Methoden gespeichert werden, damit sie nicht für jedes einzelne Element neu kopiert werden müssen.
*/

/* 
Prototype für das Node-Objekt eine Methode html(), welche bei Übergabe eines Argumentes einen
DOM-String schreibt und ohne Argumente den Content eines Elementes liest. Also kurz gesagt, die
die Eigenschaft innerHTML ersetzt.
*/

Node.prototype.html = function(neuerInhalt) {

    // PRÜFUNG: Wurde uns beim Aufruf etwas in die Klammern gegeben?
    if (neuerInhalt !== undefined) {
        
        // FALL SCHREIBER: 
        // Wir nehmen das, was wir bekommen haben, und schieben es in das echte innerHTML.
        this.innerHTML = neuerInhalt;
        
        // (Optional: Wir geben 'this' zurück, damit man Befehle aneinanderreihen kann)
        return this;
    } 
    else {
        // FALL LESER:
        // Die Klammern waren leer, also wollen wir wissen, was drinsteht.
        return this.innerHTML;
    }
};

const myDiv = document.querySelector("#test");

console.log(myDiv.html());
myDiv.html("mäh");
console.log(myDiv.html());