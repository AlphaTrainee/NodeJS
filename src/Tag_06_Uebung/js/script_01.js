"use strict";

/* 
Prototype die Methode addEventListener() für das Objekt NodeList.
(Beachte, dass es sich bei einer NodeList um ein arrayartiges Gebilde handelt!)
*/

NodeList.prototype.addEventListener = function(event, callback) {
    console.log(`Hänge Listener für "${event}" an ${this.length} Elemente an...`);
    
    this.forEach(node => {
        node.addEventListener(event, callback);
    });
};

const alleButtons = document.querySelectorAll('button');

alleButtons.addEventListener('click', (e) => {
    e.target.style.backgroundColor = 'lime';
    console.log('Klick auf:', e.target.textContent);
});
