"""Film-Baustein: Antworttypen, Filmdatei, Zeitfenster passend zur Modellwelt."""
import json
import os
import re
import subprocess

from conftest import session_werte

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def _inhalte():
    js = "global.window={};require(process.argv[1]);console.log(JSON.stringify(window.INHALTE))"
    out = subprocess.run(["node", "-e", js, os.path.join(ROOT, "static", "js", "inhalte.js")], capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


def test_film_antworten_werden_angenommen(student):
    sid = session_werte(student)["schueler_id"]
    for nr, typ, text in (("7", "film", "Film vollständig angesehen"), ("8", "filmmoment", "angehalten bei 34,2 s")):
        r = student.post("/api/antwort", json={"aufgabe": nr, "typ": typ, "antwort": text, "korrekt": True, "niveau": "B"})
        assert r.status_code == 200, (typ, r.get_data(as_text=True))
    assert sid


def test_filmdatei_und_eintrag():
    I = _inhalte()
    film = I["filme"]["zelle"]
    assert film["art"] == "modellwelt"
    assert os.path.exists(os.path.join(ROOT, film["datei"].lstrip("/")))
    tabs = {t["key"]: t for t in I["tabs"]}
    assert tabs["film"]["film"] == "zelle" and tabs["perspektiven"]["filmFrei"] == "zelle"


def test_film_aufgaben_passen_zum_film():
    """Zeitfenster und Befehle nur mit Stellen, die es im Film gibt (Übergabe docs/ab_uebergabe.md)."""
    I = _inhalte()
    blicke = {"uebersicht", "andock", "innen", "nah"}
    ansichten = {"virus", "rezeptor", "kern", "oben"}
    alle = [a for t in I["tabs"] for a in t["aufgaben"]]
    moment = next(a for a in alle if a["typ"] == "filmmoment")
    for n, c in moment["niveaus"].items():
        a, e = c["fenster"]
        assert 32.0 <= a < e <= 38.6, n          # graues Virus: ZEIT.fremdAn/fremdWeg 32,6–37,6 s
    assert moment["niveaus"]["C"]["fenster"][1] - moment["niveaus"]["C"]["fenster"][0] < moment["niveaus"]["A"]["fenster"][1] - moment["niveaus"]["A"]["fenster"][0]
    for a in alle:
        knoepfe = a.get("modell") or []
        knoepfe = knoepfe if isinstance(knoepfe, list) else [knoepfe]
        for k in knoepfe:
            assert k["film"] == "zelle"
            for b in k["befehle"]:
                if b["mw"] == "blick":
                    assert b["name"] in blicke, (a["nr"], b)
                if b["mw"] == "ansicht":
                    assert b["name"] in ansichten, (a["nr"], b)
                if b["mw"] == "springe":
                    assert 0 <= b["t"] <= 135
                if b["mw"] == "kapitel":
                    assert 1 <= b["n"] <= 5
