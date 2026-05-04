# Projekt Kassenautomat

Das Projekt stellt einen einfachen Kassenautomaten vor.
Der Kunde kommt an einen (Touch) Monitor um sich Tickets für Veranstaltungen zu kaufen.

## Technik

Bei dem vorliegenden Projekt handelt es sich um eine serverseitige Webanwendung auf Basis von Node.js und dem Express-Framework. Die Architektur folgt dem REST-Prinzip und nutzt Sequelize als Object-Relational Mapper (ORM). Dies ermöglicht eine datenbankagnostische Entwicklung, wobei das System flexibel sowohl mit SQLite (für die lokale Entwicklung) als auch mit MySQL (für den Produktivbetrieb) interagieren kann. Zur Absicherung der Benutzersitzungen wird ein Session-Management integriert, während CORS eine sichere Kommunikation mit Frontend-Clients gewährleistet.

## Funktionen Frontend

### [Link: Frontend{external}](/)

- die Oberfläche zeigt nur Willkommen .. berühren sie den Bildschirm um zu starten
    - dies signalisiert, es ist kein Vorgang aktiv, es wird ein neuer Vorgang gestartet
- danach werden die verfügbaren Kategorien und Tickets angezeigt
    - es gibt oben eine Bestseller Auswahl mit den am meisten verkauften Tickets, diese werden direkt in den Warenkorb gelegt
    - Kategorien, die entweder keine Tickets, nur nicht sichtbare Tickets oder die selber nicht sichtbar eingestellt sind, werden nicht angezeigt
- im Warenkorb kann man die Anzahl der Tickets verändern + / - / komplett löschen
- der Zahlvorgang ist eine Simulation, es gibt keinen "richtigen" Bezahlvorgang
- wenn zu lange (im Beispiel 30 Sekunden, im realen Betrieb ca 2 Minuten) keine Interaktion das Kunden stattfindet, wird gefragt ob noch jemand da ist
falls nicht, wird nach einer Wartezeit der Vorgang beendet und der Startbildschirm angezeigt

## Funktionen Backend

### [Link: Backend{external}](/admin)

Login: ```developer:service```

- der Admin User muss sich einloggen
- es gibt die Möglichkeit
    - Tickets zu verwalten (erzeugen/bearbeiten/löschen)
    - Kategorien zu verwalten (erzeugen/bearbeiten/löschen)
    - eine einfache Verkaufsübersicht anzusehen (es können dann zB daraus Reports erzeugt werden)

## API Endpunkte
Dies ist als Beispiel gedacht, wie von einem externen Zutrittssystem die Tickets abgerufen  werden können.

- [REST API Tickets{external}](/api/tickets)

## Apache Reverse Proxy - VHOST

Dies läuft mit meiner lokalen Apache Installation.   
Es sind lokale Zertifikate erzeugt und funktionsfähig, das soll aber hier jetzt nicht das Thema sein.   

```
<VirtualHost *:80>
	ServerName projektarbeit.local
	ServerAlias www.projektarbeit.local

	<Directory "C:/WebSites/ERROR">
		Options Indexes FollowSymLinks
		AllowOverride None
		Require all granted
	</Directory>

	ProxyPreserveHost On
	ProxyRequests Off
	ProxyVia Off

	<Proxy *>
		Require all granted
	</Proxy>

	ProxyTimeout 10

	ErrorDocument 502 /offline/502.php
	ErrorDocument 503 /offline/503.php
	Alias /offline C:/WebSites/ERROR
	Alias /offline_error.jpg C:/WebSites/ERROR/offline_error.jpg
	ProxyPass /offline/ !
	ProxyPass /offline !
	ProxyPass /offline_error.jpg !

	# Setze X-Forwarded-Proto auf angefordertes Schema für das Backend
	RequestHeader set "X-Forwarded-Proto" expr=%{REQUEST_SCHEME}

	ProxyPass / http://localhost:3000/
	ProxyPassReverse / http://localhost:3000/
</VirtualHost>

<VirtualHost *:443>
	ServerName projektarbeit.local
	ServerAlias www.projektarbeit.local

	SSLEngine On

	<Directory "C:/WebSites/ERROR">
		Options Indexes FollowSymLinks
		AllowOverride None
		Require all granted
	</Directory>

	ProxyPreserveHost On
	ProxyRequests Off
	ProxyVia Off

	<Proxy *>
		Require all granted
	</Proxy>

	ProxyTimeout 10

	ErrorDocument 502 /offline/502.php
	ErrorDocument 503 /offline/503.php
	Alias /offline C:/WebSites/ERROR
	Alias /offline_error.jpg C:/WebSites/ERROR/offline_error.jpg
	ProxyPass /offline/ !
	ProxyPass /offline !
	ProxyPass /offline_error.jpg !

	# Setze X-Forwarded-Proto auf angefordertes Schema für das Backend
	RequestHeader set "X-Forwarded-Proto" expr=%{REQUEST_SCHEME}
	
	ProxyPass / http://localhost:3000/
	ProxyPassReverse / http://localhost:3000/

	SSLCertificateFile "conf/ssl.crt/localhost.crt"
	SSLCertificateKeyFile "conf/ssl.key/localhost.key"
</VirtualHost>
```