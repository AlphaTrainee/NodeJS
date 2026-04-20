import validator from "validator";

console.log(validator.isISBN("978-3453146976"));    // true
console.log(validator.isISBN("975-3453146976"));    // false


/*
in REPL können wir checken, ob Modul installiert ist und wo
require.resolve("validator")
Rückgabe = Pfad zum Modul oder "cannot find module..."
.exit

npm install Modul@Version       - Modul wird in Version installiert
npm uninstall Modul@Version     - Modul wird in Version deinstalliert
npm update Modul                - Modul auf neueste Version updaten

Option --global ( -g)           - Flag, um Modul global installieren, deinstallieren oder updaten - im NodeJS Modulverzeichnis - im Moment nicht zu empfehlen

npm list                        - listet alle installierten Module auf
npm search suchbegriff          - sucht Module, deren Name Suchbegriff enthält

npm init                        - erstellt package.json mit Abfrage der Eigenschaften

npm init --yes ( -y)            - erstellt package.json mit default-Werten


Semantic Versioning

Initiative http://semver.org/ definiert, wie Programmierer Software-Versionsnummern vergeben sollten
vorgesehen sind drei Zahlen in der Form X.Y.Z:
- Hauptversionsnummer (engl. major version) X wird erhöht, wenn Programmierer Software grundlegend und auf inkompatible Weise verändern
- Nebenversionsnummer (engl. minor version) Y wird erhöht, wenn neue Funktionen dazukommen, aber keine Inkompatibilitäten zu erwarten sind
- Revisionsnummer (engl. patch version) Z wird erhöht, wenn nur Bug-Fixes

erste Version:
0.0.1 wird für den Anfang von Entwicklungs- oder Beta-Versionen verwendet
1.0.0 markiert die erste stabile Version

npm install erlaubt Angabe der gewünschten Versionsnummer:
install <modul> — neueste Version
install <modul>@X — neueste Version mit Hauptversion X
install <modul>@X.Y — neueste Version mit Hauptversion X und Nebenversion Y
install <modul>@X.Y.Z — genau diese Version

auch komplexe Angaben möglich:
- install <modul>@"<= 5.5" — neueste Version kleiner oder gleich 5.5

*/