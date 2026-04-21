
/* 

// Defaults für init:
npm config set init-license "MIT"
npm config set init-type "module"

npm init -y
npm i https://github.com/AlphaTrainee/NodeJS/raw/refs/heads/main/modules/01_random_numbers/01_random_numbers-1.0.0.tgz

*/

// Wir importieren die Funktion unter dem Namen, den du in der 
// package.json als Key für die Dependency vergeben hast (lotto-tool)
import { generateRandomNumbers } from '01_random_numbers';

console.log("--- MEIN LOTTO-GENERATOR ---");

try {
    const luckyNumbers = generateRandomNumbers();
    
    console.log("Die heutigen Gewinnzahlen sind:");
    console.log(luckyNumbers.join(' - '));
    console.log(" Viel Glück! 🍀");
} catch (error) {
    console.error("Fehler beim Generieren der Zahlen:", error.message);
}