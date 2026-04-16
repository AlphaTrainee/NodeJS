"use strict";

let besuchteKategorien = new Set();

besuchteKategorien.add("Schuhe");
besuchteKategorien.add("Hosen");
besuchteKategorien.add("Schuhe"); // Wird ignoriert!

console.log(besuchteKategorien.size); // 2

