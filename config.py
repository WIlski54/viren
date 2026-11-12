"""Konfiguration und Konstanten des interaktiven Arbeitsblatts „Viren – Winzlinge, die krank machen können“.

Alle Secrets kommen ausschließlich aus Umgebungsvariablen (Runtime). Nichts davon
darf im Repository oder in Build-Argumenten stehen.
"""

import os
import secrets
import warnings

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.environ.get("DB_PATH") or os.path.join(BASE_DIR, "data", "viren.db")

# Stabile, eindeutige Kennung dieses Arbeitsblatts. Nie mehr ändern: Sie bindet
# Resume-Token-Hashes, Autosave-Zustände und IServ-Archive an genau diese App.
APP_ID = "gsm-biologie-viren-e10"
APP_TITEL = "Viren – Winzlinge, die krank machen können"
APP_FACH = "Biologie · E-Kurs 10"
STATE_SCHEMA_VERSION = 2      # Zustandsvertrag collectBackup()/applyBackupData()
DB_SCHEMA_VERSION = 2         # additive Migrationen
ARCHIV_FORMAT = "gsm-iabackup"
STATE_MAX_BYTES = 2 * 1024 * 1024
SNAPSHOT_MAX_BYTES = 25 * 1024 * 1024
ASSET_VERSION = "20261112a"

# ── Lehrkraft und Sitzung ────────────────────────────────────────────────────
LEHRER_PASSWORD = os.environ.get("LEHRER_PASSWORD", "").strip()
SECRET_KEY = os.environ.get("SECRET_KEY", "").strip()
if not SECRET_KEY:
    # Ohne festen Schlüssel sind Sessions nach jedem Neustart ungültig. Für die
    # lokale Entwicklung tolerierbar, in Coolify muss SECRET_KEY gesetzt sein.
    SECRET_KEY = secrets.token_hex(32)
    warnings.warn("SECRET_KEY ist nicht gesetzt – es wird ein flüchtiger Schlüssel verwendet.", stacklevel=1)
SESSION_COOKIE_SECURE = os.environ.get("SESSION_COOKIE_SECURE", "0") == "1"
SOCKETIO_ASYNC_MODE = os.environ.get("SOCKETIO_ASYNC_MODE", "threading")

# ── KI ───────────────────────────────────────────────────────────────────────
AI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-3-flash-preview").strip() or "gemini-3-flash-preview"
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "").strip()
DAILY_TOKEN_LIMIT = int(os.environ.get("DAILY_TOKEN_LIMIT", "50000"))
AI_REQUEST_TYPES = ("chat", "korrektur", "zeichnung", "handschrift")

# ── IServ-WebDAV (optional) ─────────────────────────────────────────────────
ISERV_WEBDAV_URL = os.environ.get("ISERV_WEBDAV_URL", "").strip()
ISERV_WEBDAV_USERNAME = os.environ.get("ISERV_WEBDAV_USERNAME", "").strip()
ISERV_WEBDAV_PASSWORD = os.environ.get("ISERV_WEBDAV_PASSWORD", "")
ISERV_BACKUP_PATH = os.environ.get("ISERV_BACKUP_PATH", "Files/Backups_AB_KI").strip()
ISERV_BACKUP_ENCRYPTION_KEY = os.environ.get("ISERV_BACKUP_ENCRYPTION_KEY", "").strip()
ISERV_TIMEOUT_SECONDS = os.environ.get("ISERV_TIMEOUT_SECONDS", "15").strip()
ISERV_CA_BUNDLE = os.environ.get("ISERV_CA_BUNDLE", "").strip()

# ── Lesestrecke ──────────────────────────────────────────────────────────────
LESE_SPERRE_SEKUNDEN = (60, 75, 90)   # 1., 2., ab 3. Fehlversuch

# ── Struktur des Arbeitsblatts (muss zu static/js/inhalte.js passen) ────────
ABSCHNITTE = [
    {"key": "aufbau", "titel": "Aufbau", "kurz": "A", "aufgaben": ["L1", 1, 2, 3, 4, 5, 6]},
    {"key": "film", "titel": "Film", "kurz": "F", "aufgaben": [7, 8, 9, 10, 11, 12]},
    {"key": "perspektiven", "titel": "Perspektiven", "kurz": "P", "aufgaben": [13, 14, 15]},
    {"key": "vermehrung", "titel": "Vermehrung", "kurz": "V", "aufgaben": ["L2", 16, 17, 18, 19, 20, 21]},
    {"key": "masern", "titel": "Masern", "kurz": "M", "aufgaben": ["L3", 22, 23, 24, 25, 26, 27, 28]},
    {"key": "abschluss", "titel": "Abschluss", "kurz": "Z", "aufgaben": [29, 30, 31, 32, 33, "T"]},
]
ALLE_AUFGABEN = [str(nr) for a in ABSCHNITTE for nr in a["aufgaben"]]
AUFGABE_ZU_ABSCHNITT = {str(nr): a["key"] for a in ABSCHNITTE for nr in a["aufgaben"]}
LESESTRECKEN = {a["aufgaben"][0]: a["key"] for a in ABSCHNITTE if str(a["aufgaben"][0]).startswith("L")}
NOTIZ_ABSCHNITTE = {a["key"] for a in ABSCHNITTE}
NIVEAUS = {"A", "B", "C", "Transfer"}
ANTWORT_TYPEN = {
    "mc", "mc-multi", "luecke", "zuordnung", "sortierung", "diagramm", "karte",
    "freitext", "freitext-kreativ", "notizen", "quellen", "lesestrecke", "zeichnung",
    "handschrift", "blitz", "domino", "film", "filmmoment",
}
ZEICHEN_GERAETE = {"virus": 6, "kreislauf": 19, "fieberkurve": 28, "handschrift": None}
