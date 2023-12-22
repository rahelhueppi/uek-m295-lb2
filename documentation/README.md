# LBb ÜK-Modul 295

Name des Projektes: LBb m295
Autor: Rahel Hüppi

# Beschreibung
Das ist das Abschlussprojekt vom Ük-Modul 295. Mit Endpunkten können zum Beispiel Tasks hinzugefügt, angesehen oder gelöscht werden. Für die API-Dokumentation wurde Swagger verwendet. 

# Setup
- Node.js auf dem Computer installieren
- npm installieren
- Ein Docker-Container einrichten und den Ordner darin öffnen
- Repository erstellen und klonen
- Module (express, express-session, swagger-autogen, swagger-ui-express) installieren und importieren.

# Runtime
- Um die Anwendung zu starten muss man 
  - 1. In das richtige Verzeichnis wechseln (cd src)
  - 2. Diesen Befehl im Terminal ausführen: node server.js

# Endpunkte zu den Tasks
- GET /tasks: Gibt eine Liste aller Aufgaben zurück.
- POST /tasks: Erstellt einen neuen Task. Im Body der Anfrage soll ein JSON-Objekt mitgegeben werden. Ein Beispiel für diese Anfrage im Body: { "id": "02", "title": "read", "author": "Rahel", "creationDate": "22.12.23", "fulfillmentDate": "" }
- GET /tasks/:id: Gibt einen spezifischen Task basierend auf seiner ID zurück.
- PATCH /tasks/:id: Aktualisiert einen spezifischen Task basierend auf seiner ID. Im Body der Anfrage soll ein JSON-Objekt mit den neuen Eigenschaften sein.
- DELETE /tasks/:id: Löscht einen spezifischen Task basierend auf seiner ID.

# Endpunkte zur Authentifizierung
**POST /login**
- Bei einer Anfrage wird das E-Mail und das Passwort aus dem Body. Das Passwort muss dabei m295 sein, sonst wird der Status 401 zurückgegeben.

**GET /verify**
- Damit wird die Sitzung des Benutzers überprüft. Wenn die E-Mail des Benutzers in der Sitzung gespeichert ist, kommt der Statuscode 200 und die E-Mail des Benutzers zurück. Wenn das nicht der Fall ist, kommt der Statuscode 401 zurück.


**DELETE /logout**
- Mit diesem Endpunkt wird die Sitzung des Benutzers beendet. Bei einer Anfrage wird überprüft, ob die E-Mail des Benutzers in der Sitzung gespeichert ist. Wenn das der Fall ist, wird die Sitzung beendet. Wenn das nicht der Fall ist, wird der Statuscode 401 und eine Antwort gesendet.