# iHauke
Ein semiprofessionelles Finanzverwaltungssystem für Zweier WGs

Live Demo auf https://jabens.tools/ihauke/

## Was ist das?
iHauke ist das aufgehübschte Remake einer Web-App, die ich vor einigen Jahren mal an einem öden Wochenende für unsere Studenten WG geschrieben habe.  
**Lange Rede, kurzer Sinn:** Ihr schuldet euch ständig Geld für irgendwelche Anschaffungen? Einfach schnell auf iHauke eintragen und nie wieder sinnlos Geld hin und her-überweisen 🎉

## Cool, wie kann ich es nutzen?
Also erstmal wäre da die eingangs erwähnte [Live Demo](https://jabens.tools/ihauke/). Wer mir Datenschutztechnisch nicht traut (und etwas versierter im Umgang mit Computern ist), kann es aber auch einfach bei sich auf dem Webserver oder auf einem Raspberry Pi deployen.  
### Es ist ziemlich simpel:
0. Stelle sicher, dass du [node.js](https://nodejs.org/) installiert hast.
1. Klone das Repository oder lade die Zip runter, und deponiere den Code an einem Ort deiner Wahl.
2. Öffne das Hauptverzeichnis im Terminal, und dann: `$ bash install.sh && bash ihauke.sh`

Jetzt kommt der etwas schwierige Teil. iHauke ist nun zwar erreichbar unter `http://localhost:8080/`, aber es wird noch nicht funktionieren.
Die Standartkonfiguration sieht vor, dass iHauke unter `www.deineseite.de/ihauke/` erreichbar sein wird. Du hast jetzt zwei Möglichkeiten:
#### #1 Du hast noch andere Webdienste, und willst es bei `.../ihauke/` belassen.
Dann musst du einen Webserver deiner Wahl installiert haben und so konfigurieren, dass Anfragen an `/ihauke/` an `localhost:8080` weitergeleitet werden, wobei der Teil mit `/ihauke` aus dem Pfad entfernt wird.
Die entsprechende [nginx](https://nginx.org/) Konfiguration könnte so aussehen:
```
        location /ihauke {
                rewrite ^/ihauke/?(.*) /$1 break;
                proxy_pass http://127.0.0.1:8080;
        }
```

#### Webserver sind dir zu kompliziert. `www.deineseite.de:8080` und gut iss.
Dann musst du das Frontend etwas umkonfigurieren...
1. In `/frontend/config/index.js`, `assetsPublicPath` zu `'/'` ändern.
2. In `/frontend/src/config.js`, in `const location` das `'/ihauke/'` ebenfalls durch `'/'` ersetzen.
3. Terminal im `/frontend` Verzeichnis öffnen, und `$ npm install && npm run build` ausführen.
4. Glückwunsch, du bist ein Hacker.
5. Kehre zurück ins Hauptverzeichnis und starte `$ bash ihauke.sh`
