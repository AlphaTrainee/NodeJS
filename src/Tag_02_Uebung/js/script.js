"use strict";

{
    let canvas = document.querySelector("#canvas");
    let clockFaceEl = document.querySelector("#clockFace");
    let altlockFaceEl = document.querySelector("#alternativeClockFace");
    let smoothToggleEl = document.querySelector("#smoothToggle");
    let showTicksEl = document.querySelector("#showTicks");

    clockFaceEl.onclick = function () {
        if (clockFaceEl.checked) altlockFaceEl.checked = false;
    }
    altlockFaceEl.onclick = function () {
        if (altlockFaceEl.checked) clockFaceEl.checked = false;
    }

    if (canvas.getContext) {
        let context = canvas.getContext("2d");
        let img = new Image();
        img.src = "clock-face.png";

        // Koordinaten direkt in die Mitte legen
        context.translate(canvas.width / 2, canvas.height / 2);

        // das Ziffernblatt laden, Position muss verschoben werden, da die Koordinaten schon auf Mitte festgelegt sind
        img.onload = function () {
            context.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        };

        context.fillStyle = "black";
        context.arc(0, 0, 20, 0, Math.PI * 2);
        context.fill();

        (function myAnim() {

            const clockFace = clockFaceEl.checked;
            const altClockFace = altlockFaceEl.checked;
            const showTicks = showTicksEl.checked;
            const showSmooth = smoothToggleEl.checked;

            // Alles löschen
            // Da wir bereits ein translate(width/2, height/2) gemacht haben, 
            // liegt der Punkt (0,0) in der Mitte. Wir müssen also von -320 bis +320 löschen.
            context.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

            if (clockFace) {
                // Hintergrund (Ziffernblatt) neu zeichnen
                context.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
            }

            // Den schwarzen Punkt in der Mitte neu zeichnen
            context.fillStyle = "black";
            context.save();
            context.shadowColor = "rgba(0, 0, 0, 0.3)"; // Dezenter Schatten
            context.shadowBlur = 4;
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;

            context.beginPath(); // Wichtig: Neuen Pfad beginnen!
            context.arc(0, 0, 20, 0, Math.PI * 2);
            context.fill();
            context.restore();

            let startLine = -225;
            if (clockFace) {
                startLine = -200;
            }
            if (showTicks) {
                context.save();

                for (let i = 0; i < 60; i++) {
                    context.beginPath();

                    // Prüfen, ob es eine volle Stunde ist (alle 5 Striche)
                    if (i % 5 === 0) {
                        context.lineWidth = 4;

                        context.moveTo(0, startLine); // Langer Strich
                    } else {
                        context.lineWidth = 2;
                        context.moveTo(0, startLine - 10); // Kurzer Strich
                    }

                    context.lineTo(0, startLine - 20); // Ende des Strichs (nahe am Rand)
                    if (altClockFace) {
                        context.strokeStyle = "black";
                    } else {
                        context.strokeStyle = "grey";
                    }
                    context.stroke();

                    // Das gesamte Koordinatensystem um 6 Grad weiterdrehen
                    context.rotate(Math.PI / 30);
                }
                context.restore();
            }

            if (altClockFace) {
                // --- RÖMISCHE ZAHLEN (3, 6, 9, 12) ---
                context.save();
                context.fillStyle = "black";
                context.font = "bold 40px Arial"; // Größe und Schriftart
                context.textAlign = "center";
                context.textBaseline = "middle";

                let numerals = {
                    3: "III",
                    6: "VI",
                    9: "IX",
                    12: "XII"
                };

                for (let hour in numerals) {
                    context.save();
                    // Berechne den Winkel (30 Grad pro Stunde, aber wir brauchen nur 3, 6, 9, 12)
                    let angle = hour * (Math.PI / 6);
                    context.rotate(angle);

                    // Verschiebe den Text nach außen (nahe an die Striche)
                    context.translate(0, startLine + 30);

                    // WICHTIG: Text wieder gerade drehen, damit er nicht auf der Seite liegt
                    context.rotate(-angle);

                    context.fillText(numerals[hour], 0, 0);
                    context.restore();
                }
                context.restore();
            }

            // Jetzt die Zeiger-Animation
            context.save();
            let time = new Date();

            let ms = time.getMilliseconds();
            let seconds = time.getSeconds();
            let minutes = time.getMinutes();
            let hours = time.getHours();
            let angle;

            // Hours
            if (showSmooth) {
                angle = (hours + minutes / 60) * (Math.PI / 6); // smooth
            } else {
                angle = (hours + minutes / 60 + seconds / 3600) * (Math.PI / 6);
            }
            context.fillStyle = "#222222";
            context.shadowColor = "rgba(0, 0, 0, 0.3)"; // Dezenter Schatten
            context.shadowBlur = 4;
            context.shadowOffsetX = 1;
            context.shadowOffsetY = 1;

            context.translate(0, 0);
            context.rotate(angle);
            context.translate(0, 22);
            context.fillRect(-6, -44, 12, -180);
            context.restore();
            context.save();

            // Minutes
            if (showSmooth) {
                angle = (minutes + seconds / 60) * (Math.PI / 30); // smooth
            } else {
                angle = (minutes + seconds / 60) * (Math.PI / 30);
            }
            context.fillStyle = "#444444";
            context.shadowColor = "rgba(0, 0, 0, 0.3)"; // Dezenter Schatten
            context.shadowBlur = 4;
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;

            context.translate(0, 0);
            context.rotate(angle);
            context.translate(0, 22);
            context.fillRect(-4, -44, 8, -220);
            context.restore();
            context.save();

            // Seconds
            if (showSmooth) {
                angle = (seconds + ms / 1000) * (Math.PI / 30); // smooth
            } else {
                angle = seconds * (Math.PI / 30);
            }
            context.fillStyle = "red";
            context.shadowColor = "rgba(0, 0, 0, 0.3)"; // Dezenter Schatten
            context.shadowBlur = 4;
            context.shadowOffsetX = 3;
            context.shadowOffsetY = 3;

            context.translate(0, 0);
            context.rotate(angle);
            context.translate(0, 22);
            context.fillRect(-2, -44, 4, -220);
            context.restore();
            context.save();

            requestAnimationFrame(myAnim);

            context.restore();
        })();
    }

}