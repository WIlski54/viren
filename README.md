# Viren – Winzlinge, die krank machen können – Interaktives Arbeitsblatt

Digitale Fassung der Schulbuch-Doppelseite „Viren – Winzlinge, die krank machen können“ (Aufgaben 1–6,
Masern, Größenvergleich) für **Biologie, E-Kurs Jahrgang 10**, Gesamtschule Meiderich. Umgesetzt nach dem
GSM-Produktionsstandard (Flask + Socket.IO, SQLite-WAL, Autosave in 4 Ebenen, IServ-Archiv, iPad-first).
Referenz-Implementierung: `WIlski54/Einstieg_WKI`.

## Aufbau (37 Stationen in 6 Reitern)

| Reiter | Inhalt | Buchbezug |
|---|---|---|
| 🦠 Aufbau | Lesestrecke M1 (5 Abschnitte), Strukturen, Fachbegriffe, Größen ordnen, Größen-Diagramm, Zuordnung, Virus zeichnen | Aufg. 1, 3 |
| 🎬 Film | Modellwelt „Die gekaperte Zelle“ ansehen, *Finde den Moment*, Schlüssel-Schloss (modellgebunden), Erklären, Vermehrung ordnen, Wörter der Sprecherin | Aufg. 6 |
| 🧊 Perspektiven | erst nach vollständigem Film: Live „Am Rezeptor“, „Im Zellkern“, Modellkritik | Aufg. 4 (Vorbereitung) |
| 📈 Vermehrung | Lesestrecke M2, Bildfolge des Buchs als Diagramm, hochrechnen, Buch-Uhr prüfen, Kreislauf zeichnen, Medikamente/Impfung | Bildfolge S. 1 |
| 🌡️ Masern | Lesestrecke M3 (6 Abschnitte), Fieberkurve, Verlauf ordnen, Stadien zuordnen, **Quellenkritik der Buchzahlen**, Bewerten, Fieberkurve zeichnen | Aufg. 2, Abb. 1B |
| 📚 Abschluss | Viruskrankheiten, Gruppenpuzzle-Notizen, Blitzrunde, Domino, Quellen, Transfer „Sind Viren Lebewesen?“ | Aufg. 4, 5 |

Alle Aufgaben mit A/B/C; Niveau A der Schreib- und Bewertungsaufgaben arbeitet mit Textbausteinen (ohne freies Schreiben).

**Film:** `static/film/Modellwelt_Viren_Die_gekaperte_Zelle.html` (Modellwelt, 2:15, Entwurfsstimme). Grundlage der
Film-Aufgaben: `docs/film_uebergabe.md`. Endfassung mit Seraphina wird im Filmprojekt gebaut und hierher kopiert –
danach `docs/film_uebergabe.md` erneuern und das Zeitfenster von Aufgabe 8 prüfen.

**Digitale Tafel (Pilot):** Paket `tafel/` (nie ändern, nur ersetzen), Anbindung `tafel_anbindung.py`, Lehrer-Seiten
`/lehrer/tafel`, `/lehrer/tafel/beamer`, `/lehrer/tafel/rueckblick`, Karte im Dashboard. Aufgaben kommen über den
Browser-Adapter `static/js/tafel_adapter.js` aus `inhalte.js`. Dieses AB hat keinen Präsentationsmodus.

**Fachliche Hinweise:** Die Zahlen „weltweit 400 000 → unter 40 000 Masern-Tote (2000–2006)“ im Buch entsprechen laut
WHO den Werten für **Afrika** (396 000 → 36 000); weltweit waren es 757 000 → 242 000. Aufgabe 25 macht das zum
Quellenkritik-Thema. Die Uhrzeiten der Bildfolge (9.00–10.20) sind ein Schema; eine Vermehrungsrunde dauert beim
Grippevirus etwa 6–8 Stunden (Aufgabe 18).

**Schaubilder:** `werkzeuge/lese_grafiken.py` erzeugt die SVGs; die `.jpg` in `static/img/lese/` sind Renderbilder aus der Modellwelt.

## Lokal starten

```bash
python -m venv .venv
.\.venv\Scripts\Activate.ps1          # macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
Copy-Item .env.example .env           # macOS/Linux: cp .env.example .env
python app.py
```

Dann `http://127.0.0.1:5000` öffnen. In der `.env` müssen mindestens `SECRET_KEY` und
`LEHRER_PASSWORD` gesetzt sein; ohne Lehrerpasswort bleibt der Lehrerbereich gesperrt.
Ohne `GEMINI_API_KEY` bleiben alle Aufgaben nutzbar, die KI-Flächen zeigen einen Hinweis.

Tests:

```bash
pip install pytest
pytest tests
```

## Umgebungsvariablen

Siehe `.env.example`. Alle Secrets sind ausschließlich Runtime-Variablen.

| Variable | Bedeutung |
|---|---|
| `SECRET_KEY` | Flask-Session-Schlüssel (Pflicht im Betrieb) |
| `LEHRER_PASSWORD` | Passwort des Lehrerbereichs (Pflicht) |
| `SESSION_COOKIE_SECURE` | `1` hinter HTTPS |
| `GEMINI_API_KEY`, `GEMINI_MODEL`, `DAILY_TOKEN_LIMIT` | KI, optional |
| `ISERV_WEBDAV_URL`, `ISERV_WEBDAV_USERNAME`, `ISERV_WEBDAV_PASSWORD` | WebDAV-Zugang, nur HTTPS |
| `ISERV_BACKUP_PATH` | Zielordner (POSIX-Pfad, wird nicht angelegt) |
| `ISERV_BACKUP_ENCRYPTION_KEY` | 32 Byte URL-safe Base64 |
| `ISERV_TIMEOUT_SECONDS` | 2–60 |
| `ISERV_CA_BUNDLE` | optionale schulische CA (PEM) |

## Ablauf einer Stunde

1. Lernende melden sich mit Pseudonym und Klasse an; das Gerät merkt sich den Lernplatz.
2. Alles wird automatisch gesichert. „Antwort abgeben“, „Stichpunkte abgeben“ und
   „Zeichnung abgeben“ schreiben bewertbare Versuche ins Protokoll.
3. Am Stundenende: **Stunde abschließen & archivieren**. Die App fordert verbundene Geräte zum
   letzten Autosave auf, verschlüsselt den Snapshot, lädt ihn hoch, liest ihn zurück, entschlüsselt
   und vergleicht den Digest. Erst dann werden die Daten auf dem App-Server gelöscht.
4. Fortsetzung: Archiv im Modus „Fortsetzungsstunde“ laden. Geräte mit gespeichertem Lernplatz
   verbinden sich automatisch. Wer sich mit demselben Pseudonym neu anmeldet, landet sofort auf
   seinem alten Lernplatz; die Klasse entscheidet nur bei gleichem Pseudonym. Mehrdeutige oder
   unbekannte Anmeldungen ordnet die Lehrkraft im Dashboard zu.

## Deployment (Coolify)

- Build Pack **Dockerfile**, interner Port **5000**, Healthcheck `/health`
- persistentes Volume nach **`/app/data`** (SQLite mit WAL)
- Environment Variables aus `.env.example` setzen, `SESSION_COOKIE_SECURE=1`
- Secrets nur zur Runtime („Available at Buildtime“ aus)
- genau ein Gunicorn-Worker (`gunicorn.conf.py`, gthread + simple-websocket)

**Live-Verbindung hinter dem Proxy:** Traefik meldet bei WebSocket-Upgrades `X-Forwarded-Proto: wss`.
Die Standard-Origin-Prüfung von Engine.IO lehnt den Browser (`https://…`) dann ab – das Dashboard
bekommt keine Live-Meldungen mehr. `socket_origin_erlaubt()` in `app.py` vergleicht deshalb nur den
Host. Die Clients verbinden sich erst per Polling und steigen dann auf WebSocket um. Scheitert
der Umstieg, bleibt die Verbindung trotzdem bestehen. Prüfen nach dem Deployment (muss `101` liefern,
`400` heißt: Origin abgelehnt):

```bash
curl -s -o /dev/null -w "%{http_code}\n" --http1.1 -H "Origin: https://<domain>" -H "Connection: Upgrade" -H "Upgrade: websocket" -H "Sec-WebSocket-Version: 13" -H "Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==" "https://<domain>/socket.io/?EIO=4&transport=websocket"
```

Vor dem ersten Push in ein öffentliches Repo:

```bash
git grep -I --cached -n "AIzaSy"
git check-ignore -v .env
```

## Datenschutz

- Nur Pseudonym und Klasse; Datenschutz- und KI-Hinweis vor dem Login, Pflichtcheckbox.
- Gespeichert: Fortschritt, Antwortversuche, Stichpunkte, Quellen, Zeichnungen (Objekt-JSON +
  Vorschau), automatischer Arbeitsstand, KI-Anfragen und KI-Chats der Sitzung.
- Nach erfolgreichem IServ-Archiv werden die Sitzungsdaten auf dem App-Server gelöscht
  (`secure_delete`, WAL-Truncate, VACUUM). Provider-Snapshots, Volume-Backups und Proxy-Logs
  sind davon nicht erfasst und müssen separat geregelt werden.

## Bewusste Abweichungen

- MathJax nur in der Tafel (lädt erst bei Bedarf); im AB nicht nötig.
- Kein Präsentationsmodus – der Test „Tafel ↔ Präsentation“ aus der Tafel-Vorlage entfällt.
- Datenschutztext ergänzt: Die Klasse sieht Tafelbeiträge mit Pseudonym.
