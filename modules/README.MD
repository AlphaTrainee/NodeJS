# Erzeuge ein eigenes NodeJS Modul

### Defaults für npm init ändern
- Standard-Lizenz ändern  
    ```npm config set init-license "MIT"```
- Standard-Modultyp ändern   
    ```npm config set init-type "module"```
- Weitere hilfreiche Defaults (Optional)   
    ```
    npm config set init-author-name "Franziska Walter"
    npm config set init-author-email "job@f-walter.de"
    npm config set init-author-url "https://alpha.franzi.hamburg"
    ```
- Eintrag löschen   
    ```npm config delete [Eintrag]```

### Das Vorgehen
- erstelle einen neuen Ordner
- führe in diesem Ordner aus   
    ```npm init -y```
- erstelle eine 'index.js'


### benötigte Packages installieren
- Express - Server (https://expressjs.com/) installieren   
    ```npm install express```

### Package erzeugen

#### Die package.json prüfen
Bevor man packt, muss die "Inhaltsliste" stimmen. Öffne deine package.json. Ein wichtiges Feld für Module ist files. Damit bestimmst du, welche Dateien im Paket landen sollen (wir wollen ja nicht unseren Test-Müll oder die .gitignore mitverschicken).

#### Packen
- im Hauptordner des Modules   
    ```npm pack```

### lokal Testen
- im Modul Ordner   
    ```npm link```
- in einem beliebigen anderen Projekt   
    ```npm link 01_random_numbers```
- Verbindung trennen   
    ```npm unlink 01_random_numbers```
- Im Modul-Ordner (Die globale Registrierung löschen)   
    ```npm uninstall -g 01_random_numbers```

### Woher weiß ich, was gerade "verlinkt" ist?
- ```npm ls -g --depth=0```
