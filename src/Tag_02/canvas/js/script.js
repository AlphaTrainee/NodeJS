"use strict";

{

    let canvas = document.querySelector("#canvas_1");

    // prüfen, ob Canvas API verfügbar ist

    if (canvas.getContext) {
        let context = canvas.getContext("2d");
        // console.log(context);

        // Füllfarbe festlegen - default schwarz
        context.fillStyle = "orange";
        context.fillRect(10, 10, 100, 100);

        context.fillStyle = "rgba(0,0,150,.5)";
        context.fillRect(30, 30, 100, 100);

        // Konturfarbe - default schwarz
        context.strokeStyle = "#ff0000";
        
        // Konturrechteck zeichnen
        context.strokeRect(150, 10, 100, 100);

        // Inhalte löschen
        context.clearRect(170, 5, 200, 200);
        context.clearRect(50, 50, 50, 50);

        // gerade Linie

        // neuen Pfad beginnen
        context.beginPath();

        // Startpunkt
        context.moveTo(100, 100);

        // Linie zeichnen Endpunkt festlegen
        context.lineTo(200, 200);
        context.lineTo(300, 100);

        // Linie einfärben
        context.strokeStyle = "green";
        // wird erst sichtbar mit stroke
        context.stroke();

        // geschlossenen Pfad (Form) zeichnen
        context.beginPath();
        context.moveTo(300, 300);
        context.lineTo(400, 400);
        context.lineTo(300, 400);
        context.closePath();
        context.strokeStyle = "blue";
        context.stroke();
        // umschlossene Fläche einfärben
        context.fillStyle = "red";
        context.fill();

        // Path-Object
        let path = new Path2D();

        // Linienbreite festlegen - Default 1
        context.lineWidth = 10;
        context.lineWidth = 1;          // default

        // Art der Linie
        context.setLineDash([5, 10]);
        context.setLineDash([5, 10, 20, 10]);
        context.setLineDash([5, 10, 20]);
        context.setLineDash([]);        // default Wert

        context.lineCap = "round";

        path.moveTo(250, 250);
        path.lineTo(350, 350);

        path.lineTo(450, 250);
        path.closePath();

        // Pfade einfärben
        context.stroke(path);
        context.fill(path);


        // Bogen zeichnen
        context.beginPath();

        context.moveTo(150, 300);

        context.arc(
            150,                    // x
            300,                    // y
            100,                    // radius
            0,                      // start Angle: Angabe in rad
           /*  Math.PI * 2, */      // end Angle; Angabe in rad
            2,
            true            // optional true Uhrzeigersinn
        );

        // weiterzeichnen
        context.lineTo(10, 400);

        context.fillStyle = "yellow";
        // context.fill();
        context.stroke();

        // Grad => rad
        /* 
             90° => Math.PI / 2 rad
            180° =>  Math.PI rad
            270° =>  3 * Math.PI rad / 2 rad
        */

        // halbkreis
        context.beginPath();
        context.arc(200, 400, 50, 0, Math.PI);
        context.arc(200, 400, 50, 0, Math.PI, true);
        context.stroke();


    }

}

{
    let canvas = document.querySelector("#canvas_2");

    // prüfen, ob Canvas API verfügbar ist

    if (canvas.getContext) {
        let context = canvas.getContext("2d");
        // console.log(context);

        let path = new Path2D();

        context.strokeStyle = "green";

        context.beginPath();

        // Startpunkt festlegen
        path.moveTo(25, 200);

        // quadratische Kurve
        path.quadraticCurveTo(
            200,        // x Start
            200,        // y Start
            200,        // x End
            25          // y End
        );
        context.stroke(path);

        context.fillStyle = "red";
        context.arc(200, 200, 5, 0, Math.PI * 2);
        context.fill();

        path.moveTo(300, 300);
        path.bezierCurveTo(
            200,
            200,
            300,
            400,
            100,
            400
        );

        context.fillStyle = "red";
        context.arc(300, 400, 5, 0, Math.PI * 2);
        context.fill();

        context.stroke(path);

    }
}

{

    let canvas = document.querySelector("#canvas_3");

    // prüfen, ob Canvas API verfügbar ist

    if (canvas.getContext) {
        let context = canvas.getContext("2d");
        // console.log(context);

        let path = new Path2D();

        context.strokeStyle = "green";

        context.font = "italic bold 30px Arial, sans-serif";

        // gefüllter Text
        // context.fillText("Hallo Jessica!", 10, 50);
        context.fillText("Hallo Jessica!", 10, 50, 100);

        // Konturtext
        context.strokeText("Hallo Jessica!", 10, 100);

        context.font = "24px Verdana";
        context.fillStyle = "red";

        context.textAlign = "right";
        context.fillText("Hallo Jessica!", 440, 200);

        context.textAlign = "center";
        context.fillText("Hallo Jessica!", 230, 250);

        context.textAlign = "left";
        context.fillText("Hallo Jessica!", 10, 300);
    }

}

// Farbverlauf
{

    let canvas = document.querySelector("#canvas_4");

    // prüfen, ob Canvas API verfügbar ist

    if (canvas.getContext) {
        let context = canvas.getContext("2d");

        let gradient = context.createLinearGradient(
            0,
            0,
            450,
            0
        );

        gradient.addColorStop(0, "red");
        gradient.addColorStop(0.5, "yellow");
        gradient.addColorStop(1, "green");

        context.fillStyle = gradient;
        context.fillRect(0, 0, 460, 100);

        let gradient2 = context.createLinearGradient(
            150,
            150,
            20,
            200,
            200,
            400
        );

        gradient2.addColorStop(0, "red");
        gradient2.addColorStop(0.5, "yellow");
        gradient2.addColorStop(1, "green");

        context.fillStyle = gradient2;
        context.fillRect(120, 120, 300, 300);

    }

}

// Zustände speichern
{

    let canvas = document.querySelector("#canvas_5");

    // prüfen, ob Canvas API verfügbar ist

    if (canvas.getContext) {
        let context = canvas.getContext("2d");

        context.fillRect(0, 0, 150, 150);

        context.save();

        context.fillStyle = "red";
        context.fillRect(50, 50, 150, 150);

        context.save();

        context.fillStyle = "green";
        context.fillRect(100, 100, 150, 150);

        context.restore();
        context.fillRect(200, 200, 150, 150);

        context.restore();
        context.fillRect(250, 250, 150, 150);

    }

}

// Transformation Skalieren
{

    let canvas = document.querySelector("#canvas_6");

    // prüfen, ob Canvas API verfügbar ist
    if (canvas.getContext) {

        let context = canvas.getContext("2d");

        // Zustand speichern
        context.save();

        context.fillStyle = "red";

        context.scale(
            8,      // scale faktor X
            3       // scale faktor Y
        );

        context.fillRect(10, 10, 40, 40);

        context.restore();
        context.save();

        context.fillStyle = "green";
        context.scale(3, 3);
        context.fillRect(10, 20, 40, 40);

        
        context.restore();
        // context.save();

        context.fillStyle = "blue";
        context.scale(5, 5);
        context.fillRect(10, 10, 40, 40);

    }

}

// Rotation
{

    let canvas = document.querySelector("#canvas_7");

    // prüfen, ob Canvas API verfügbar ist
    if (canvas.getContext) {

        let context = canvas.getContext("2d");

        context.save();

        context.fillStyle = "red";

        context.rotate(
            Math.PI / 4  
        );
        context.fillRect(200, 0 ,120, 10);

        context.restore();
        context.save();

        context.fillStyle = "green";
        context.rotate(Math.PI / 3);
        context.fillRect(200, 0 ,120, 10);

        context.restore();
        context.save();

        context.fillStyle = "blue";
        context.rotate(15 * Math.PI / 180);
        context.fillRect(200, 0 ,120, 10);

    }

}

// Move
{

    let canvas = document.querySelector("#canvas_8");

    // prüfen, ob Canvas API verfügbar ist
    if (canvas.getContext) {

        let context = canvas.getContext("2d");

        context.save();

        context.fillStyle = "red";

        context.translate(
            100,
            100
        );
        context.fillRect(0, 0, 100, 100);

        context.restore();
        context.save();

        context.fillStyle = "green";
        context.translate(100, 0);
        context.fillRect(0, 0, 120, 10);

        context.restore();
        context.save();

        context.fillStyle = "blue";
        context.translate(0, 100);
        context.fillRect(0, 0, 120, 10);
    }

}

// Animation
{

    let canvas = document.querySelector("#canvas_9");

    // prüfen, ob Canvas API verfügbar ist
    if (canvas.getContext) {

        let context = canvas.getContext("2d");

        

        context.fillStyle = "red";

        // funktion, die rekursiv aufgerufen wird

        (function myAnim() {
            context.save();
            context.clearRect(0, 0, 460, 450);

            let time = new Date();

            let angle = time.getSeconds() * Math.PI / 3 + time.getMilliseconds() * Math.PI / 3000;

            // Math.PI = 180

            context.fillStyle = "red";
            context.translate(230, 225);
            context.rotate(angle);
            context.translate(0, 30);

            context.fillRect(0, 0, 25, 25);

            context.restore();
            context.save();

            angle = time.getSeconds() * Math.PI / 6 + time.getMilliseconds() * Math.PI / 6000;

            context.fillStyle = "green";
            context.translate(230, 225);
            context.rotate(angle);
            context.translate(0, 30);

            context.fillRect(0, 0, 25, 25);

            requestAnimationFrame(myAnim);

            context.restore();
        })();


    }

}

// Pixelbilder
{

    let canvas = document.querySelector("#canvas_10");

    // prüfen, ob Canvas API verfügbar ist
    if (canvas.getContext) {

        let context = canvas.getContext("2d");

        // let image = new Image();

        let image = document.createElement("img");
        image.src = "./sleep-sheep.jpg";

        window.onload = function() {
            // context.drawImage(image, 0, 0);

            // context.drawImage(image, 0, 0, 460, 450);

            // Ausschnitt
            context.drawImage(image, 
                150,  //Auschnitt x
                100,  //Auschnitt y
                255,  //Auschnitt breit
                250,  //Auschnitt hoch
                0, 0, 460, 450);
        };

        // Inhalt auslesen und Save as ...
        let sourceTag = document.createElement("img");
        let btn = document.createElement("button");
        btn.textContent = "Canvas speichern";
        btn.onclick = function() {
            let dataURL = canvas.toDataURL("iamge/png");
            console.log(dataURL);
            sourceTag.src = dataURL;
        }
        document.body.append(sourceTag, btn);

        // dataURL kann ans Backend übertragen werden

    }

}