// Import aus dem Unterordner
import { generateRandomNumbers } from "./modules/random.js";

// Funktion aufrufen
const meineLottoZahlen = generateRandomNumbers();

// Ergebnis ausgeben
console.log("Deine Lottozahlen für heute sind:");
console.log(meineLottoZahlen);
