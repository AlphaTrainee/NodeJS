
const generateRandomNumbers = () => {
    const numbers = new Set();

    // Wir machen so lange weiter, bis wir 6 unterschiedliche Zahlen haben
    while (numbers.size < 6) {
        // Math.random() gibt 0 bis 0.999...
        // * 49 macht daraus 0 bis 48.999...
        // + 1 macht daraus 1 bis 49.999...
        // Math.floor schneidet die Kommastellen ab
        let randomNum = Math.floor(Math.random() * 49) + 1;
        
        numbers.add(randomNum);
    }

    // Wir wandeln das Set in ein Array um und sortieren es (optional, aber schöner)
    return Array.from(numbers).sort((a, b) => a - b);
};

export { generateRandomNumbers };
