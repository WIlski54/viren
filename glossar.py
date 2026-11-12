"""Glossar: antippbare Fachbegriffe mit kurzer Erklärung und Schaubild.

Die fett markierten Begriffe der Lesestrecken werden im Browser zu Links. Ein Tipp öffnet
die Erklärung als Einblendung – ohne die App zu verlassen. Sprache: Sek I, kurze Sätze.
"""

import re

from config import ASSET_VERSION

def BILD_URL(name):
    datei = name if "." in name else f"{name}.svg"
    return f"/static/img/lese/{datei}?v={ASSET_VERSION}"


def normalisieren(text: str) -> str:
    text = re.sub(r"[„“\"'’‚‘]", "", str(text or "")).lower().strip()
    text = re.sub(r"[.,;:!?]+$", "", text).strip()
    return re.sub(r"\s+", " ", text)


GLOSSAR = {
    "lichtmikroskop": {
        "titel": "Lichtmikroskop", "bild": "aufbau-1",
        "text": "Das Mikroskop aus dem Biologieraum. Es vergrößert mit Licht und Linsen, etwa 1 000-fach. Zellen und Bakterien kann man damit sehen. Den Aufbau von Viren erkennt man nicht – sie sind zu klein.",
        "aliase": ["Lichtmikroskop", "Lichtmikroskops"],
    },
    "elektronenmikroskop": {
        "titel": "Elektronenmikroskop", "bild": "aufbau-1",
        "text": "Ein Mikroskop, das mit Elektronen statt mit Licht arbeitet. Es vergrößert viel stärker als ein Lichtmikroskop. Erst damit wurde der Aufbau von Viren sichtbar. Die Bilder sind eigentlich schwarz-weiß, Farben werden oft nachträglich eingefärbt.",
        "aliase": ["Elektronenmikroskop", "Elektronenmikroskops", "Elektronenmikroskopes"],
    },
    "huelle": {
        "titel": "Hülle", "bild": "aufbau-2.jpg",
        "text": "Die äußere Schicht eines Virus. Sie ist aus Eiweiß aufgebaut und schützt das Erbmaterial im Inneren. Beim Grippevirus sitzen viele Stacheln auf der Hülle.",
        "aliase": ["Hülle", "Eiweißhülle", "Virushülle"],
    },
    "stacheln": {
        "titel": "Stacheln", "bild": "aufbau-2.jpg",
        "text": "Eiweiße, die aus der Hülle des Grippevirus ragen. Mit ihnen erkennt das Virus passende Zellen. Ihre Spitzen passen in die Rezeptoren der Zelle wie ein Schlüssel ins Schloss.",
        "aliase": ["Stacheln", "Stachel", "stachelförmige Fortsätze"],
    },
    "rezeptor": {
        "titel": "Rezeptor", "bild": "rezeptor.jpg",
        "text": "Ein Empfänger auf der Oberfläche einer Zelle. Rezeptoren haben eigentlich andere Aufgaben für die Zelle. Passen die Stacheln eines Virus genau hinein, kann das Virus andocken. Im Film sind die Rezeptoren gelb.",
        "aliase": ["Rezeptoren", "Rezeptor"],
    },
    "erbmaterial": {
        "titel": "Erbmaterial", "bild": "aufbau-3.jpg",
        "text": "Die Baupläne eines Lebewesens oder Virus. Beim Grippevirus besteht das Erbmaterial aus 8 Stücken. In der Wirtszelle werden nach diesen Bauplänen neue Viren gebaut.",
        "aliase": ["Erbmaterial", "Erbgut"],
    },
    "stoffwechsel": {
        "titel": "Stoffwechsel", "bild": "aufbau-4",
        "text": "Alle Vorgänge, mit denen ein Lebewesen Stoffe aufnimmt, umbaut und Energie gewinnt. Zellen haben einen Stoffwechsel. Viren haben keinen eigenen – sie nutzen den Stoffwechsel der Wirtszelle.",
        "aliase": ["Stoffwechsel"],
    },
    "bakterium": {
        "titel": "Bakterium", "bild": "aufbau-4",
        "text": "Ein Lebewesen, das nur aus einer Zelle besteht. Bakterien haben einen eigenen Stoffwechsel und vermehren sich durch Teilung. Sie sind etwa 1 000 bis 2 000 Nanometer groß, also viel größer als Viren.",
        "aliase": ["Bakterium", "Bakterien"],
    },
    "wirtszelle": {
        "titel": "Wirtszelle", "bild": "aufbau-5",
        "text": "Die Zelle, in der sich ein Virus vermehrt. Das Virus bringt nur seine Baupläne mit. Die Wirtszelle baut damit neue Viren – und stirbt am Ende oft ab.",
        "aliase": ["Wirtszelle", "Wirtszellen"],
    },
    "bauplaene": {
        "titel": "Baupläne", "bild": "vermehrung-1.jpg",
        "text": "So nennt die Sprecherin im Film das Erbmaterial des Virus. Darin steht, wie Hüllen, Stacheln und neues Erbmaterial gebaut werden. Die Zelle liest die Baupläne, als wären es ihre eigenen.",
        "aliase": ["Baupläne", "Bauplan"],
    },
    "ribosomen": {
        "titel": "Ribosomen", "bild": "vermehrung-1.jpg",
        "text": "Winzige Teile in jeder Zelle. Hier werden Eiweiße gebaut. In einer befallenen Zelle bauen die Ribosomen nach dem Bauplan des Virus Stacheln und Hüllen. Im Film sind sie blau.",
        "aliase": ["Ribosomen", "Ribosom"],
    },
    "exponentiell": {
        "titel": "Exponentielles Wachstum", "bild": "vermehrung-3.jpg",
        "text": "Wachstum, bei dem pro Runde malgenommen wird statt dazugezählt. Aus 1 werden 1 000, dann 1 000 000. Deshalb steigt die Zahl der Viren so schnell an.",
        "aliase": ["exponentielles Wachstum", "exponentiell"],
    },
    "antibiotika": {
        "titel": "Antibiotika", "bild": "vermehrung-5",
        "text": "Medikamente gegen Bakterien. Sie stören Teile oder den Stoffwechsel von Bakterien. Viren haben keinen eigenen Stoffwechsel – deshalb wirken Antibiotika nicht gegen Viren.",
        "aliase": ["Antibiotika", "Antibiotikum"],
    },
    "virenhemmend": {
        "titel": "Virenhemmende Mittel", "bild": "vermehrung-5",
        "text": "Medikamente, die die Vermehrung bestimmter Viren bremsen. Sie wirken nur gegen einzelne Viren. Sie können die Dauer einer Krankheit verkürzen, beseitigen die Viren aber nicht sicher.",
        "aliase": ["virenhemmende Mittel", "virenhemmenden Mitteln", "Virostatika"],
    },
    "impfung": {
        "titel": "Impfung", "bild": "masern-6",
        "text": "Bei einer Impfung lernt das Immunsystem einen Erreger kennen, ohne dass man krank wird. Kommt später das echte Virus, wird es schnell erkannt und bekämpft. Gegen Masern schützen zwei Impfungen fast sicher.",
        "aliase": ["Impfung", "Impfungen", "Masernimpfung"],
    },
    "virus": {
        "titel": "Virus", "bild": "aufbau-2.jpg",
        "text": "Ein winziger Krankheitserreger aus Erbmaterial und einer Hülle aus Eiweiß. Viren haben keinen eigenen Stoffwechsel. Sie vermehren sich nur in Wirtszellen. Mehrzahl: die Viren.",
        "aliase": ["Virus", "Viren"],
    },
    "troepfcheninfektion": {
        "titel": "Tröpfcheninfektion", "bild": "masern-1",
        "text": "Ansteckung über winzige Tröpfchen aus Mund und Nase. Sie entstehen beim Husten, Niesen und Sprechen. Andere atmen die Tröpfchen ein und stecken sich an.",
        "aliase": ["Tröpfcheninfektion", "Tröpfchen"],
    },
    "inkubationszeit": {
        "titel": "Inkubationszeit", "bild": "masern-2",
        "text": "Die Zeit zwischen der Ansteckung und den ersten Beschwerden. In dieser Zeit vermehren sich die Viren schon im Körper. Bei Masern dauert sie etwa 10 Tage.",
        "aliase": ["Inkubationszeit"],
    },
    "wangenschleimhaut": {
        "titel": "Wangenschleimhaut", "bild": "masern-3",
        "text": "Die feuchte Haut innen in der Wange. Bei Masern zeigen sich dort im 1. Stadium kleine weißliche Flecken. Ärztinnen und Ärzte erkennen Masern oft daran.",
        "aliase": ["Wangenschleimhaut"],
    },
    "hautausschlag": {
        "titel": "Hautausschlag", "bild": "masern-4",
        "text": "Rote Flecken auf der Haut. Bei Masern beginnt der Ausschlag meist im Gesicht und hinter den Ohren. Dann breitet er sich über den ganzen Körper aus.",
        "aliase": ["Hautausschlag", "Ausschlag"],
    },
    "immunsystem": {
        "titel": "Immunsystem", "bild": "masern-6",
        "text": "Die Abwehr des Körpers gegen Krankheitserreger. Weiße Blutkörperchen erkennen und bekämpfen Viren. Nach einer überstandenen Krankheit oder einer Impfung erinnert sich das Immunsystem an den Erreger.",
        "aliase": ["Immunsystem", "Abwehr"],
    },
    "folgeerkrankung": {
        "titel": "Folgeerkrankungen", "bild": "masern-5",
        "text": "Krankheiten, die als Folge einer anderen Krankheit entstehen. Bei Masern sind das zum Beispiel Mittelohrentzündung, Lungenentzündung oder eine Entzündung des Gehirns. Sie machen Masern gefährlich.",
        "aliase": ["Folgeerkrankungen", "Folgeerkrankung"],
    },
}

ALIASE = {normalisieren(alias): key for key, eintrag in GLOSSAR.items() for alias in eintrag["aliase"] + [eintrag["titel"]]}


def glossar_fuer_client() -> dict:
    return {
        "eintraege": {
            key: {"titel": e["titel"], "text": e["text"], "bild": BILD_URL(e["bild"]) if e.get("bild") else None}
            for key, e in GLOSSAR.items()
        },
        "aliase": ALIASE,
    }


def eintrag_fuer(begriff: str):
    key = ALIASE.get(normalisieren(begriff))
    return GLOSSAR.get(key) if key else None
