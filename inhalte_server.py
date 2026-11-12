"""Serverseitige Inhalte: gegatete Lesestrecken mit Verständnisfragen.

Die Lösungen liegen ausschließlich hier. Der Client erhält Text, Frage und Optionen,
aber nie die richtige Position. Jede Frage lässt sich aus ihrem Abschnitt allein beantworten.
Sprache: Sek I, kurze Sätze, Fakten unverändert.
"""

from config import ASSET_VERSION
import random

def bild_url(name):
    """Schaubild der Lesestrecke: SVG (Name ohne Endung) oder Modellbild aus der Modellwelt (.jpg)."""
    if not name:
        return None
    datei = name if "." in name else f"{name}.svg"
    return f"/static/img/lese/{datei}?v={ASSET_VERSION}"


LESESTRECKEN = {
    "aufbau": {
        "station": "L1", "eyebrow": "Lesestrecke M1",
        "titel": "Was ist ein Virus?",
        "abschnitte": [
            {
                "ueberschrift": "Winzig klein",
                "bild": "aufbau-1", "bild_alt": "Schaubild: Größenvergleich von Körperzelle, Bakterium und Viren",
                "text": "Viren sind winzig. Ein Grippevirus ist nur etwa ein zehntausendstel Millimeter groß. Das sind 100 Nanometer. Im <strong>Lichtmikroskop</strong> erkennt man ihren Aufbau nicht. Erst das <strong>Elektronenmikroskop</strong> machte den Aufbau von Viren sichtbar.",
                "frage": "Womit kann man den Aufbau von Viren sichtbar machen?",
                "optionen": ["Mit einer Lupe", "Mit einem Lichtmikroskop", "Mit einem Elektronenmikroskop"],
                "loesung": 2,
                "erklaerung": "Richtig: Erst das Elektronenmikroskop vergrößert so stark, dass man den Aufbau von Viren sieht.",
            },
            {
                "ueberschrift": "Hülle und Stacheln",
                "bild": "aufbau-2.jpg", "bild_alt": "Modellbild: Grippevirus mit grüner Hülle und vielen Stacheln",
                "text": "Außen hat das Grippevirus eine <strong>Hülle</strong>. Aus der Hülle ragen viele <strong>Stacheln</strong> aus Eiweiß. Mit den Stacheln erkennt das Virus passende Zellen. Die Stacheln passen in <strong>Rezeptoren</strong> auf der Zelle. Das ist wie bei einem Schlüssel und einem Schloss.",
                "frage": "Wozu dienen die Stacheln des Grippevirus?",
                "optionen": ["Zum Schwimmen im Blut", "Zum Andocken an passende Zellen", "Zum Aufnehmen von Nahrung"],
                "loesung": 1,
                "erklaerung": "Genau: Mit den Stacheln dockt das Virus an die Rezeptoren passender Zellen an.",
            },
            {
                "ueberschrift": "Das Erbmaterial",
                "bild": "aufbau-3.jpg", "bild_alt": "Modellbild: aufgeklapptes Virus mit violettem Erbmaterial im Inneren",
                "text": "Innen liegt das <strong>Erbmaterial</strong>. Es enthält die Baupläne für neue Viren. Die Eiweißhülle schützt das Erbmaterial. Bei allen Viren ist der Aufbau im Wesentlichen gleich: Erbmaterial und eine Hülle aus Eiweiß. Mehr hat ein Virus nicht.",
                "frage": "Was enthält das Erbmaterial eines Virus?",
                "optionen": ["Die Baupläne für neue Viren", "Nährstoffe als Vorrat", "Luft zum Atmen"],
                "loesung": 0,
                "erklaerung": "Richtig: Das Erbmaterial enthält die Baupläne. Daraus entstehen später neue Viren.",
            },
            {
                "ueberschrift": "Keine Zellen, kein Stoffwechsel",
                "bild": "aufbau-4", "bild_alt": "Schaubild: Bakterium als Zelle mit Stoffwechsel neben einem viel kleineren Virus",
                "text": "Viren bestehen nicht aus Zellen. Sie haben keinen eigenen <strong>Stoffwechsel</strong>. Sie nehmen keine Nahrung auf und wachsen nicht. Ein <strong>Bakterium</strong> dagegen ist eine Zelle. Es hat einen Stoffwechsel und vermehrt sich allein.",
                "frage": "Was unterscheidet ein Virus von einem Bakterium?",
                "optionen": ["Das Virus ist größer", "Das Virus hat keinen eigenen Stoffwechsel", "Das Virus ist eine Zelle"],
                "loesung": 1,
                "erklaerung": "Genau: Ein Bakterium ist eine Zelle mit Stoffwechsel. Ein Virus hat keinen eigenen Stoffwechsel.",
            },
            {
                "ueberschrift": "Viren brauchen Wirtszellen",
                "bild": "aufbau-5", "bild_alt": "Schaubild: Mensch, Tier, Pflanze und Bakterium – alle können von Viren befallen werden",
                "text": "Zur Vermehrung brauchen Viren eine <strong>Wirtszelle</strong>. Das können Zellen von Menschen, Tieren oder Pflanzen sein. Sogar Bakterien werden von Viren befallen. Jedes Virus passt aber nur zu bestimmten Zellen. Das Grippevirus befällt zum Beispiel Zellen der Atemwege.",
                "frage": "Was brauchen Viren, um sich zu vermehren?",
                "optionen": ["Viel Sonnenlicht", "Viel Wasser", "Eine passende Wirtszelle"],
                "loesung": 2,
                "erklaerung": "Richtig: Ohne Wirtszelle kann sich ein Virus nicht vermehren.",
            },
        ],
    },
    "vermehrung": {
        "station": "L2", "eyebrow": "Lesestrecke M2",
        "titel": "Viele Viren in kurzer Zeit",
        "abschnitte": [
            {
                "ueberschrift": "Die Zelle als Fabrik",
                "bild": "vermehrung-1.jpg", "bild_alt": "Modellbild: Im Zellinneren entstehen grüne Bauteile an den Ribosomen",
                "text": "Das Virus selbst baut nichts. Sein Erbmaterial gelangt in die Wirtszelle. Die Zelle liest die fremden <strong>Baupläne</strong>. Ihre <strong>Ribosomen</strong> bauen nun Stacheln und Hüllen für neue Viren. Der Stoffwechsel der Zelle arbeitet für das Virus.",
                "frage": "Wer baut die Teile der neuen Viren?",
                "optionen": ["Das Virus selbst", "Die Wirtszelle", "Das Blut"],
                "loesung": 1,
                "erklaerung": "Genau: Die Wirtszelle baut mit ihren Ribosomen die Teile der neuen Viren.",
            },
            {
                "ueberschrift": "Tausende aus einer Zelle",
                "bild": "vermehrung-2.jpg", "bild_alt": "Modellbild: Neue Viren schnüren sich von der Zelloberfläche ab",
                "text": "An der Zelloberfläche setzen sich die Teile zusammen. So entstehen Hunderte bis Tausende neue Viren. Sie verlassen die Zelle. Am Ende stirbt die <strong>Wirtszelle</strong> ab. Das Schulbuch sagt dazu vereinfacht: Die Zelle platzt.",
                "frage": "Was passiert am Ende mit der Wirtszelle?",
                "optionen": ["Sie stirbt ab", "Sie wird selbst zum Virus", "Sie teilt sich zweimal"],
                "loesung": 0,
                "erklaerung": "Richtig: Die erschöpfte Wirtszelle stirbt ab.",
            },
            {
                "ueberschrift": "Runde für Runde",
                "bild": "vermehrung-3.jpg", "bild_alt": "Modellbild: Gewebe mit vielen befallenen Zellen und einem Zählwerk",
                "text": "Die neuen Viren befallen Nachbarzellen. Dort beginnt alles von vorn. Nehmen wir an: Jede Zelle setzt 1 000 Viren frei, und jedes Virus befällt eine neue Zelle. Dann sind es nach zwei Runden schon eine Million Viren. Diese Zunahme heißt <strong>exponentielles Wachstum</strong>.",
                "frage": "Wie viele Viren sind es nach zwei Runden, wenn jede Zelle 1 000 freisetzt?",
                "optionen": ["2 000", "1 000 000", "10 000"],
                "loesung": 1,
                "erklaerung": "Genau: 1 000 mal 1 000 ergibt eine Million.",
            },
            {
                "ueberschrift": "Wie lange dauert eine Runde?",
                "bild": "vermehrung-4", "bild_alt": "Schaubild: Uhr aus dem Schulbuch (20 Minuten) neben einer echten Runde (6 bis 8 Stunden)",
                "text": "Im Schulbuch dauert eine Runde nur 20 bis 40 Minuten. Diese Uhrzeiten sind ein vereinfachtes Schema. Beim Grippevirus dauert eine Runde etwa 6 bis 8 Stunden. Trotzdem fühlt man sich oft schon nach 1 bis 2 Tagen krank.",
                "frage": "Wie lange dauert eine Vermehrungsrunde beim Grippevirus etwa?",
                "optionen": ["Etwa 6 bis 8 Stunden", "Etwa 20 Minuten", "Etwa 3 Wochen"],
                "loesung": 0,
                "erklaerung": "Richtig: Eine Runde dauert beim Grippevirus etwa 6 bis 8 Stunden.",
            },
            {
                "ueberschrift": "Was hilft gegen Viren?",
                "bild": "vermehrung-5", "bild_alt": "Schaubild: Antibiotika treffen Bakterien, aber keine Viren; Impfung als Schutzschild",
                "text": "<strong>Antibiotika</strong> wirken nur gegen Bakterien. Gegen Viren helfen sie nicht. Es gibt <strong>virenhemmende Mittel</strong>. Sie können die Dauer der Krankheit verkürzen. Einen sicheren Schutz bietet nur die <strong>Impfung</strong>.",
                "frage": "Was hilft NICHT gegen Viren?",
                "optionen": ["Eine Impfung", "Virenhemmende Mittel", "Antibiotika"],
                "loesung": 2,
                "erklaerung": "Genau: Antibiotika wirken nur gegen Bakterien, nicht gegen Viren.",
            },
        ],
    },
    "masern": {
        "station": "L3", "eyebrow": "Lesestrecke M3",
        "titel": "Masern – eine harmlose Kinderkrankheit?",
        "abschnitte": [
            {
                "ueberschrift": "Ansteckung",
                "bild": "masern-1", "bild_alt": "Schaubild: Ein Kind niest, Tröpfchen mit Viren fliegen zu einem anderen Kind",
                "text": "Masern werden durch ein <strong>Virus</strong> ausgelöst. Es verbreitet sich durch <strong>Tröpfcheninfektion</strong>: beim Husten, Niesen und Sprechen. Masern sind sehr ansteckend. Fast jeder ungeschützte Mensch steckt sich bei Kontakt an.",
                "frage": "Wie wird das Masernvirus übertragen?",
                "optionen": ["Durch Mückenstiche", "Durch Tröpfchen beim Husten und Niesen", "Durch verdorbenes Essen"],
                "loesung": 1,
                "erklaerung": "Richtig: Masern werden durch Tröpfchen übertragen – beim Husten, Niesen und Sprechen.",
            },
            {
                "ueberschrift": "Die Inkubationszeit",
                "bild": "masern-2", "bild_alt": "Schaubild: Kalender mit 10 Tagen, das Kind spielt, im Körper vermehren sich Viren",
                "text": "Nach der Ansteckung merkt man zuerst nichts. Das Virus vermehrt sich aber schon im Körper. Diese Zeit heißt <strong>Inkubationszeit</strong>. Bei Masern dauert sie etwa 10 Tage.",
                "frage": "Wie lange dauert die Inkubationszeit bei Masern etwa?",
                "optionen": ["Etwa 10 Tage", "Etwa 2 Stunden", "Etwa 6 Monate"],
                "loesung": 0,
                "erklaerung": "Genau: Etwa 10 Tage lang merkt man nichts, obwohl sich die Viren vermehren.",
            },
            {
                "ueberschrift": "Das 1. Stadium",
                "bild": "masern-3", "bild_alt": "Schaubild: Krankes Kind mit Schnupfen und Fieber, Lupe auf weißliche Flecken im Mund",
                "text": "Dann zeigen sich erste Beschwerden: Schnupfen, Husten und Fieber. Oft sind die Augen entzündet. Typisch sind weißliche Flecken auf der <strong>Wangenschleimhaut</strong>. Das ist das 1. Stadium.",
                "frage": "Welches Zeichen ist typisch für das 1. Stadium?",
                "optionen": ["Roter Ausschlag am ganzen Körper", "Gebrochene Knochen", "Weißliche Flecken im Mund"],
                "loesung": 2,
                "erklaerung": "Richtig: Weißliche Flecken auf der Wangenschleimhaut sind typisch für das 1. Stadium.",
            },
            {
                "ueberschrift": "Das 2. Stadium",
                "bild": "masern-4", "bild_alt": "Schaubild: Kind im Bett mit rotem Ausschlag, Thermometer zeigt 40 °C",
                "text": "Nach 3 bis 5 Tagen beginnt das 2. Stadium. Die Viren haben sich stark vermehrt. Das Fieber steigt oft bis 40 °C. Ein roter <strong>Hautausschlag</strong> breitet sich aus. Kann das <strong>Immunsystem</strong> die Viren besiegen, verschwinden die Beschwerden nach 1 bis 2 Wochen.",
                "frage": "Was ist typisch für das 2. Stadium?",
                "optionen": ["Nur leichter Schnupfen", "Hohes Fieber und roter Ausschlag", "Keine Beschwerden"],
                "loesung": 1,
                "erklaerung": "Genau: Im 2. Stadium kommen hohes Fieber und der rote Hautausschlag.",
            },
            {
                "ueberschrift": "Gefährliche Folgen",
                "bild": "masern-5", "bild_alt": "Schaubild: Körperumriss mit Ohr, Lunge und Gehirn als Orte von Folgeerkrankungen",
                "text": "Masern sind keine harmlose Krankheit. Es kann zu <strong>Folgeerkrankungen</strong> kommen: Mittelohrentzündung, Lungenentzündung oder eine Entzündung des Gehirns. Sie können bleibende Schäden hinterlassen oder tödlich sein. Besonders gefährdet sind kleine und geschwächte Kinder.",
                "frage": "Welche Folgeerkrankung kann bei Masern auftreten?",
                "optionen": ["Karies", "Sonnenbrand", "Lungenentzündung"],
                "loesung": 2,
                "erklaerung": "Richtig: Eine Lungenentzündung ist eine der gefährlichen Folgeerkrankungen.",
            },
            {
                "ueberschrift": "Schutz durch Impfung",
                "bild": "masern-6", "bild_alt": "Schaubild: Gruppe von Menschen, die meisten geimpft, ein Baby in der Mitte ist geschützt",
                "text": "Vor Masern schützt eine <strong>Impfung</strong>. Zwei Impfungen schützen fast sicher. Sind etwa 95 von 100 Menschen geimpft, kann sich das Virus kaum noch ausbreiten. So sind auch Babys geschützt, die noch zu klein für die Impfung sind. In Deutschland muss man seit 2020 für Kita und Schule den Masernschutz nachweisen.",
                "frage": "Wie viele Masern-Impfungen schützen fast sicher?",
                "optionen": ["Eine halbe", "Zwei", "Zehn"],
                "loesung": 1,
                "erklaerung": "Genau: Zwei Impfungen schützen fast sicher vor Masern.",
            },
        ],
    },
}

STATION_ZU_ABSCHNITT = {v["station"]: k for k, v in LESESTRECKEN.items()}


def lesestrecke_fuer_client(key: str, status: dict) -> dict:
    """Text, Fragen und Optionen ohne Lösungen. Erklärungen nur für bereits bestandene Abschnitte."""
    strecke = LESESTRECKEN[key]
    phase = int(status.get("phase", 0))
    abschnitte = []
    for i, a in enumerate(strecke["abschnitte"]):
        eintrag = {"ueberschrift": a["ueberschrift"], "text": a["text"], "frage": a["frage"], "optionen": list(a["optionen"]),
                   "bild": bild_url(a.get("bild")), "bild_alt": a.get("bild_alt", "")}
        if i < phase:
            eintrag["erklaerung"] = a["erklaerung"]
        abschnitte.append(eintrag)
    return {
        "key": key, "station": strecke["station"], "eyebrow": strecke["eyebrow"], "titel": strecke["titel"],
        "abschnitte": abschnitte, "anzahl": len(abschnitte),
        "status": {"phase": phase, "fertig": bool(status.get("fertig")), "retry_until": float(status.get("retry_until", 0) or 0), "versuche": int(status.get("versuche", 0))},
    }


def lesestrecke_vollstaendig(key: str) -> dict:
    """Für den Prüfmodus der Lehrkraft: alle Abschnitte mit Lösung und Erklärung."""
    strecke = LESESTRECKEN[key]
    abschnitte = [{
        "ueberschrift": a["ueberschrift"], "text": a["text"], "frage": a["frage"], "optionen": list(a["optionen"]),
        "loesung": int(a["loesung"]), "erklaerung": a["erklaerung"],
        "bild": bild_url(a.get("bild")), "bild_alt": a.get("bild_alt", ""),
    } for a in strecke["abschnitte"]]
    return {"key": key, "station": strecke["station"], "eyebrow": strecke["eyebrow"], "titel": strecke["titel"],
            "abschnitte": abschnitte, "anzahl": len(abschnitte)}


def pruefen(key: str, phase: int, wahl: int) -> tuple[bool, str]:
    abschnitt = LESESTRECKEN[key]["abschnitte"][phase]
    korrekt = int(wahl) == abschnitt["loesung"]
    return korrekt, abschnitt["erklaerung"] if korrekt else ""


def gemischte_reihenfolge(anzahl: int) -> list[int]:
    reihenfolge = list(range(anzahl))
    random.shuffle(reihenfolge)
    return reihenfolge
