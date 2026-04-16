"use strict";

function* quizGenerator() {
    // 1. Schritt: Frage stellen und auf Antwort warten
    const antwort1 = yield "Was ist die Hauptstadt von Deutschland?";
    
    console.log("Deine Antwort war: " + antwort1);
    if (antwort1 && antwort1.toLowerCase() === "berlin") {
        console.log("Richtig!");
    } else {
        console.log("Falsch, es wäre Berlin gewesen.");
    }

    // 2. Schritt: Nächste Frage
    const antwort2 = yield "Ist JavaScript eine Programmiersprache? (ja/nein)";
    
    console.log("Deine Antwort war: " + antwort2);
    if (antwort2 && antwort2.toLowerCase() === "ja") {
        console.log("Stimmt genau!");
    } else {
        console.log("Doch, ist es!");
    }

    return "Quiz beendet";
}

const bot = quizGenerator();

let frage;
frage = bot.next();
console.log("Bot fragt: " + frage.value);
console.log(frage.done);

frage = bot.next("Berlin");
console.log("Bot fragt: " + frage.value);
console.log(frage.done);

frage = bot.next("ja"); // Das "ja" landet oben in 'antwort2'
console.log("Bot fragt: " + frage.value);
console.log(frage.done);
