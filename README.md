# Schälsick Dads – Startseite

Liegt unter https://schaelsickdads.github.io/ und verlinkt auf die anderen Repos.

- `tools.json`: Kacheln (name, pfad, icon, text). Neues Tool = ein Block mehr.
- `termine.json`: Termine. Alte verschwinden automatisch. Beispiel:
  `{"titel": "Stammtisch", "start": "2026-11-20T19:30", "ende": "2026-11-20T22:00", "ort": "Brauhaus", "text": "Kurzinfo", "link": "https://..."}`
  `ende`, `ort`, `karte` (Google-Maps-Link), `text`, `link`, `papas` und `kinder` (je `"0-1"`, `"2-3"` oder `"4+"`) sind optional. Ohne Uhrzeit (`"2026-11-20"`) wird es ein Ganztagstermin.
- `sw.js`: Service Worker. Fasst nur die Startseite an, alle Unterpfade (/walking-dads/ usw.) laufen ungefiltert durch.

## Termine eintragen (nur für Admins)
`/termin/` ist die Eintragsseite (nicht auf der Startseite verlinkt, `noindex`). Beim ersten Mal auf dem Handy einen GitHub-Schlüssel
(Fine-grained token, nur dieses Repo, Contents: Read and write) einfügen. Danach Formular ausfüllen, Speichern: die Seite schreibt
`termine.json` direkt per GitHub-API ins Repo. Ändern, Löschen und „Vergangene entfernen" gehen dort ebenfalls.

## Zusagen
Dads tippen auf der Startseite „Bin dabei" oder „Kann nicht". Es öffnet sich WhatsApp mit fertiger Nachricht, den Namen merkt sich das Handy.
Gezählt wird im WhatsApp-Chat. Wer möchte, trägt die Zahl auf `/termin/` mit + und − nach, sie erscheint dann als „N dabei".

## Termin vorschlagen
Auf der Startseite gibt es das Feld „Termin fehlt? Schlag ihn vor". Es erzeugt eine fertige WhatsApp-Nachricht mit Titel, Datum, Uhrzeit und Ort.
In `index.html` kann bei `FABIAN_WA` optional eine WhatsApp-Nummer (z. B. `49151...`) eingetragen werden. Achtung: Sie steht dann öffentlich im Code.
Leer gelassen wählt der Absender den Chat selbst (Fabian oder Gruppe).
