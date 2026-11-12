"""Erzeugt die gezeichneten Schaubilder für Lesestrecken und Glossar (Viren / Masern).

Aufruf:  python werkzeuge/lese_grafiken.py
Ausgabe: static/img/lese/*.svg  (480 × 288, GSM-Farben, Verläufe und Schatten, ohne externe Dateien)

Modellbilder (aufbau-2/3, vermehrung-1/2/3, rezeptor) sind .jpg aus der Modellwelt „Die gekaperte Zelle“
(Filmprojekt: build/ab_bilder.py) und werden hier nicht erzeugt.
Beschriftungen stehen nie auf Linien und haben einen weißen Halo (paint-order: stroke).
"""

import math
import os
from html import escape

ZIEL = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "static", "img", "lese")
W, H = 480, 288
BLAU, DUNKEL, ORANGE, MAGENTA, ROT, GRUEN, GRAU, TEXT = "#006AB3", "#004b80", "#F7B800", "#AD007C", "#dc2626", "#16a34a", "#6b7280", "#1e293b"
FONT = "font-family='Lato, Arial, sans-serif'"

DEFS = """<defs>
<linearGradient id='gHimmel' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#eaf4fb'/><stop offset='1' stop-color='#f8fbfd'/></linearGradient>
<linearGradient id='gBoden' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#e8dcc4'/><stop offset='1' stop-color='#d6c6a6'/></linearGradient>
<radialGradient id='gVirus' cx='.35' cy='.35' r='.75'><stop offset='0' stop-color='#a7e08f'/><stop offset='.6' stop-color='#5fa85a'/><stop offset='1' stop-color='#2f6b34'/></radialGradient>
<radialGradient id='gVirusGrau' cx='.35' cy='.35' r='.75'><stop offset='0' stop-color='#d9dde2'/><stop offset='1' stop-color='#6b7280'/></radialGradient>
<radialGradient id='gZelle' cx='.3' cy='.3' r='.9'><stop offset='0' stop-color='#fdf3d6'/><stop offset='.7' stop-color='#f7d7a6'/><stop offset='1' stop-color='#e6a77f'/></radialGradient>
<radialGradient id='gKern' cx='.35' cy='.35' r='.8'><stop offset='0' stop-color='#e7c9ef'/><stop offset='1' stop-color='#9c6bb8'/></radialGradient>
<linearGradient id='gBakt' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#f3e6c4'/><stop offset='.5' stop-color='#e8cf95'/><stop offset='1' stop-color='#c99c55'/></linearGradient>
<radialGradient id='gHaut' cx='.4' cy='.35' r='.8'><stop offset='0' stop-color='#ffe2c8'/><stop offset='1' stop-color='#e9b48f'/></radialGradient>
<linearGradient id='gGlas' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='#dfe8f0'/><stop offset='.5' stop-color='#ffffff'/><stop offset='1' stop-color='#cfdbe6'/></linearGradient>
<linearGradient id='gBett' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#b9d4ec'/><stop offset='1' stop-color='#7fa9cf'/></linearGradient>
<linearGradient id='gSchild' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#4da3e0'/><stop offset='1' stop-color='#004b80'/></linearGradient>
<linearGradient id='gBlatt' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#9fd37c'/><stop offset='1' stop-color='#3f8a3a'/></linearGradient>
<filter id='fSchatten' x='-20%' y='-20%' width='140%' height='140%'><feDropShadow dx='1.5' dy='2.5' stdDeviation='2' flood-color='#1e293b' flood-opacity='.25'/></filter>
<marker id='mPfeil' markerWidth='9' markerHeight='9' refX='7' refY='4.5' orient='auto'><path d='M0,0 L9,4.5 L0,9 z' fill='#004b80'/></marker>
<marker id='mPfeilRot' markerWidth='9' markerHeight='9' refX='7' refY='4.5' orient='auto'><path d='M0,0 L9,4.5 L0,9 z' fill='#dc2626'/></marker>
</defs>"""


def svg(titel, *teile, hintergrund="url(#gHimmel)"):
    return (f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 {W} {H}' role='img' aria-label='{escape(titel)}' {FONT}>\n"
            f"<title>{escape(titel)}</title>\n{DEFS}\n<rect width='{W}' height='{H}' rx='14' fill='{hintergrund}'/>\n"
            + "\n".join(teile) + "\n</svg>\n")


def t(x, y, text, size=12, weight=700, fill=TEXT, anchor="middle", halo=True):
    h = " stroke='#ffffff' stroke-width='3.5' stroke-linejoin='round' paint-order='stroke'" if halo else ""
    return f"<text x='{x}' y='{y}' font-size='{size}' font-weight='{weight}' fill='{fill}' text-anchor='{anchor}'{h}>{escape(text)}</text>"


def titel(text, farbe=DUNKEL):
    return t(18, 26, text, 15, 900, farbe, "start")


def pfeil(x1, y1, x2, y2, farbe="#004b80", w=2.5, dash=""):
    m = "mPfeilRot" if farbe == ROT else "mPfeil"
    d = f" stroke-dasharray='{dash}'" if dash else ""
    return f"<line x1='{x1}' y1='{y1}' x2='{x2}' y2='{y2}' stroke='{farbe}' stroke-width='{w}' marker-end='url(#{m})'{d}/>"


def virus(x, y, r=10, grau=False, stacheln=14):
    teile = []
    for i in range(stacheln):
        a = i / stacheln * math.tau
        x1, y1 = x + math.cos(a) * r, y + math.sin(a) * r
        x2, y2 = x + math.cos(a) * r * 1.45, y + math.sin(a) * r * 1.45
        farbe = "#9aa0a6" if grau else "#7fbf6a"
        teile.append(f"<line x1='{x1:.1f}' y1='{y1:.1f}' x2='{x2:.1f}' y2='{y2:.1f}' stroke='{farbe}' stroke-width='{max(1.2, r * .16):.1f}' stroke-linecap='round'/>")
        teile.append(f"<circle cx='{x2:.1f}' cy='{y2:.1f}' r='{max(1.1, r * .14):.1f}' fill='{farbe}'/>")
    teile.append(f"<circle cx='{x}' cy='{y}' r='{r}' fill='url(#{'gVirusGrau' if grau else 'gVirus'})'/>")
    return "<g filter='url(#fSchatten)'>" + "".join(teile) + "</g>"


def mini_virus(x, y, r=3.2, farbe="#5fa85a"):
    return (f"<circle cx='{x}' cy='{y}' r='{r}' fill='{farbe}' stroke='#2f6b34' stroke-width='.8'/>"
            + "".join(f"<circle cx='{x + math.cos(a) * r * 1.5:.1f}' cy='{y + math.sin(a) * r * 1.5:.1f}' r='{r * .28:.1f}' fill='{farbe}'/>" for a in [i * math.tau / 8 for i in range(8)]))


def bakterium(x, y, w=110, h=44, inhalt=True, geissel=True):
    out = [f"<g filter='url(#fSchatten)'>"]
    if geissel:
        out.append(f"<path d='M{x + w - 4},{y + h / 2} c 20,-14 30,14 50,0 s 26,-10 34,4' fill='none' stroke='#b38a4a' stroke-width='2.2' stroke-linecap='round'/>")
    out.append(f"<rect x='{x}' y='{y}' width='{w}' height='{h}' rx='{h / 2}' fill='url(#gBakt)' stroke='#9c7535' stroke-width='3'/>")
    if inhalt:
        out.append(f"<path d='M{x + 22},{y + h / 2} c 8,-12 16,12 24,0 s 16,-12 24,0 s 12,10 18,0' fill='none' stroke='{MAGENTA}' stroke-width='2.2'/>")
        for i in range(9):
            out.append(f"<circle cx='{x + 14 + (i * 37) % (w - 26)}' cy='{y + 9 + (i * 13) % (h - 16)}' r='1.8' fill='#6b7fc4'/>")
    out.append("</g>")
    return "".join(out)


def kind(x, y, s=1.0, shirt="#006AB3", haar="#5b3a1e", gesicht="froh", flecken=False, rot_augen=False):
    """Kind (stehend), Fußpunkt x/y. gesicht: froh | krank | niesen."""
    k = []
    sc = lambda v: v * s
    k.append(f"<g filter='url(#fSchatten)'>")
    # Beine
    k.append(f"<rect x='{x - sc(9)}' y='{y - sc(34)}' width='{sc(7)}' height='{sc(34)}' rx='{sc(3)}' fill='#334155'/>")
    k.append(f"<rect x='{x + sc(2)}' y='{y - sc(34)}' width='{sc(7)}' height='{sc(34)}' rx='{sc(3)}' fill='#334155'/>")
    # Körper
    k.append(f"<path d='M{x - sc(16)},{y - sc(30)} q0,-{sc(30)} {sc(16)},-{sc(34)} q{sc(16)},{sc(4)} {sc(16)},{sc(34)} z' fill='{shirt}'/>")
    # Arme
    k.append(f"<path d='M{x - sc(14)},{y - sc(58)} q-{sc(10)},{sc(12)} -{sc(8)},{sc(26)}' stroke='{shirt}' stroke-width='{sc(7)}' fill='none' stroke-linecap='round'/>")
    k.append(f"<path d='M{x + sc(14)},{y - sc(58)} q{sc(10)},{sc(12)} {sc(8)},{sc(26)}' stroke='{shirt}' stroke-width='{sc(7)}' fill='none' stroke-linecap='round'/>")
    # Kopf
    kx, ky, kr = x, y - sc(78), sc(15)
    k.append(f"<circle cx='{kx}' cy='{ky}' r='{kr}' fill='url(#gHaut)'/>")
    k.append(f"<path d='M{kx - kr},{ky - sc(2)} q{sc(2)},-{sc(18)} {kr},-{sc(15)} q{kr - sc(2)},-{sc(3)} {kr},{sc(15)} q-{sc(8)},-{sc(8)} -{kr},-{sc(6)} z' fill='{haar}'/>")
    if flecken:
        for i in range(10):
            fx = kx - kr * .7 + (i * 7.3 % (kr * 1.4)); fy = ky - kr * .2 + (i * 5.1 % (kr * 1.0))
            k.append(f"<circle cx='{fx:.1f}' cy='{fy:.1f}' r='{sc(1.6):.1f}' fill='#e0464a' opacity='.85'/>")
        for i in range(14):
            fx = x - sc(13) + (i * 9.7 % sc(26)); fy = y - sc(60) + (i * 6.3 % sc(26))
            k.append(f"<circle cx='{fx:.1f}' cy='{fy:.1f}' r='{sc(1.7):.1f}' fill='#ff8a8a' opacity='.9'/>")
    aug = "#c0392b" if rot_augen else TEXT
    if gesicht == "niesen":
        k.append(f"<path d='M{kx - sc(7)},{ky - sc(1)} l{sc(4)},{sc(2)} M{kx + sc(7)},{ky - sc(1)} l-{sc(4)},{sc(2)}' stroke='{TEXT}' stroke-width='{sc(1.6)}'/>")
        k.append(f"<ellipse cx='{kx + sc(4)}' cy='{ky + sc(7)}' rx='{sc(4)}' ry='{sc(3)}' fill='#7a2e2e'/>")
    else:
        k.append(f"<circle cx='{kx - sc(5)}' cy='{ky - sc(1)}' r='{sc(1.8)}' fill='{aug}'/><circle cx='{kx + sc(5)}' cy='{ky - sc(1)}' r='{sc(1.8)}' fill='{aug}'/>")
        if gesicht == "froh":
            k.append(f"<path d='M{kx - sc(5)},{ky + sc(6)} q{sc(5)},{sc(5)} {sc(10)},0' stroke='{TEXT}' stroke-width='{sc(1.6)}' fill='none'/>")
        else:
            k.append(f"<path d='M{kx - sc(5)},{ky + sc(8)} q{sc(5)},-{sc(4)} {sc(10)},0' stroke='{TEXT}' stroke-width='{sc(1.6)}' fill='none'/>")
    k.append("</g>")
    return "".join(k)


def thermometer(x, y, wert, hoehe=110, beschriftung=True):
    """Thermometer, Fußpunkt (Kugel) bei x/y; wert in °C (36–41)."""
    anteil = max(0, min(1, (wert - 35.5) / 5.5))
    oben = y - hoehe
    fuell = y - 10 - (hoehe - 16) * anteil
    out = [f"<g filter='url(#fSchatten)'><rect x='{x - 8}' y='{oben}' width='16' height='{hoehe}' rx='8' fill='url(#gGlas)' stroke='#94a3b8' stroke-width='1.5'/>",
           f"<rect x='{x - 3.5}' y='{fuell:.1f}' width='7' height='{y - fuell:.1f}' fill='{ROT}'/>",
           f"<circle cx='{x}' cy='{y}' r='12' fill='{ROT}' stroke='#94a3b8' stroke-width='1.5'/></g>"]
    for c in (37, 38, 39, 40):
        yy = y - 10 - (hoehe - 16) * ((c - 35.5) / 5.5)
        out.append(f"<line x1='{x + 8}' y1='{yy:.1f}' x2='{x + 14}' y2='{yy:.1f}' stroke='#64748b' stroke-width='1.2'/>")
        out.append(t(x + 30, yy + 4, f"{c} °C", 9, 700, GRAU))
    if beschriftung:
        out.append(t(x, oben - 8, f"{str(wert).replace('.', ',')} °C", 14, 900, ROT))
    return "".join(out)


def uhr(x, y, r, zeiger_h, zeiger_m, bogen=None, farbe=MAGENTA):
    out = [f"<g filter='url(#fSchatten)'><circle cx='{x}' cy='{y}' r='{r + 6}' fill='#334155'/><circle cx='{x}' cy='{y}' r='{r}' fill='#ffffff'/>"]
    if bogen:
        a0, a1 = [(h / 12) * math.tau - math.pi / 2 for h in bogen]
        x0, y0 = x + math.cos(a0) * r * .82, y + math.sin(a0) * r * .82
        x1, y1 = x + math.cos(a1) * r * .82, y + math.sin(a1) * r * .82
        gross = 1 if (a1 - a0) % math.tau > math.pi else 0
        out.append(f"<path d='M{x},{y} L{x0:.1f},{y0:.1f} A{r * .82:.1f},{r * .82:.1f} 0 {gross} 1 {x1:.1f},{y1:.1f} z' fill='{farbe}' opacity='.28'/>")
    for i in range(12):
        a = i / 12 * math.tau
        out.append(f"<line x1='{x + math.cos(a) * r * .86:.1f}' y1='{y + math.sin(a) * r * .86:.1f}' x2='{x + math.cos(a) * r * .97:.1f}' y2='{y + math.sin(a) * r * .97:.1f}' stroke='#334155' stroke-width='2'/>")
    ah = (zeiger_h % 12 + zeiger_m / 60) / 12 * math.tau - math.pi / 2
    am = zeiger_m / 60 * math.tau - math.pi / 2
    out.append(f"<line x1='{x}' y1='{y}' x2='{x + math.cos(ah) * r * .5:.1f}' y2='{y + math.sin(ah) * r * .5:.1f}' stroke='#1e293b' stroke-width='4' stroke-linecap='round'/>")
    out.append(f"<line x1='{x}' y1='{y}' x2='{x + math.cos(am) * r * .78:.1f}' y2='{y + math.sin(am) * r * .78:.1f}' stroke='#1e293b' stroke-width='2.5' stroke-linecap='round'/>")
    out.append(f"<circle cx='{x}' cy='{y}' r='3.5' fill='{farbe}'/></g>")
    return "".join(out)


def mensch_icon(x, y, farbe, s=1.0, schild=False):
    out = f"<circle cx='{x}' cy='{y - 22 * s}' r='{6 * s}' fill='{farbe}'/><path d='M{x - 9 * s},{y} v-{10 * s} a{9 * s},{9 * s} 0 0 1 {18 * s},0 v{10 * s} z' fill='{farbe}'/>"
    if schild:
        out += (f"<path d='M{x + 7 * s},{y - 14 * s} l{6 * s},-{2 * s} l{6 * s},{2 * s} v{5 * s} q0,{6 * s} -{6 * s},{9 * s} q-{6 * s},-{3 * s} -{6 * s},-{9 * s} z' "
                f"fill='url(#gSchild)' stroke='#fff' stroke-width='1'/>")
    return out


# ───────────────────────────────────────────────────────── Lesestrecke M1 Aufbau
def aufbau_1():
    teile = [titel("Größenvergleich: Zelle – Bakterium – Viren")]
    # Ausschnitt einer Körperzelle (großer Bogen links unten)
    teile.append("<g filter='url(#fSchatten)'><path d='M0,288 L0,70 A250,250 0 0 1 250,288 Z' fill='url(#gZelle)' stroke='#d08a6a' stroke-width='3'/></g>")
    teile.append("<circle cx='70' cy='230' r='44' fill='url(#gKern)' stroke='#8e5bb5' stroke-width='2'/>")
    teile.append(t(70, 234, "Zellkern", 11, 800))
    teile.append(t(118, 120, "Körperzelle (Ausschnitt)", 12, 900, "#8a4b2f"))
    teile.append(t(118, 136, "etwa 10 000 nm", 10, 700, GRAU))
    # Bakterium
    teile.append(bakterium(250, 150, 120, 48))
    teile.append(t(310, 218, "Bakterium", 12, 900, "#8a5a1a"))
    teile.append(t(310, 233, "etwa 2 000 nm", 10, 700, GRAU))
    # Viren-Reihe
    viren = [("Polio", 330, 72, 3.0), ("Warzen", 368, 72, 4.2), ("Grippe", 406, 72, 6.0), ("Masern", 446, 72, 8.0)]
    for name, x, y, r in viren:
        teile.append(virus(x, y, r, stacheln=10))
        teile.append(t(x, y + 26, name, 10, 800))
    teile.append(t(390, 46, "Viren: 30 bis 300 nm", 11, 900, GRUEN))
    teile.append(virus(280, 90, 12, stacheln=14))
    teile.append(t(280, 124, "Pocken", 10, 800))
    # Maßstab
    teile.append("<line x1='300' y1='262' x2='460' y2='262' stroke='#1e293b' stroke-width='3'/><line x1='300' y1='256' x2='300' y2='268' stroke='#1e293b' stroke-width='3'/><line x1='460' y1='256' x2='460' y2='268' stroke='#1e293b' stroke-width='3'/>")
    teile.append(t(380, 252, "1/1000 mm = 1 000 nm", 11, 800))
    teile.append(t(380, 282, "Viren nicht genau maßstäblich", 9, 700, GRAU))
    return svg("Größenvergleich von Körperzelle, Bakterium und Viren", *teile)


def aufbau_4():
    teile = [titel("Bakterium und Virus im Vergleich")]
    teile.append(bakterium(26, 92, 190, 80))
    teile.append(pfeil(40, 210, 70, 184, GRUEN))
    teile.append(t(46, 228, "Nahrung rein", 10, 800, GRUEN))
    teile.append(pfeil(180, 184, 208, 210, ORANGE))
    teile.append(t(210, 228, "Energie", 10, 800, "#b7791f"))
    teile.append(t(120, 70, "Bakterium = eine Zelle", 13, 900, "#8a5a1a"))
    teile.append(t(120, 252, "mit Stoffwechsel", 12, 900, GRUEN))
    teile.append(t(120, 268, "teilt sich allein", 11, 700, GRAU))
    teile.append("<line x1='258' y1='60' x2='258' y2='270' stroke='#cbd5e1' stroke-width='2' stroke-dasharray='5 5'/>")
    teile.append(virus(368, 142, 20))
    teile.append("<path d='M360,138 c4,-6 8,6 12,0 s6,-6 8,2' fill='none' stroke='#9B5FC0' stroke-width='2'/>")
    teile.append(t(368, 70, "Virus = keine Zelle", 13, 900, "#2f6b34"))
    teile.append(t(368, 252, "kein Stoffwechsel", 12, 900, ROT))
    teile.append(t(368, 268, "vermehrt sich nur in Wirtszellen", 11, 700, GRAU))
    teile.append(t(368, 200, "viel kleiner", 10, 700, GRAU))
    return svg("Bakterium als Zelle mit Stoffwechsel neben einem kleineren Virus ohne Stoffwechsel", *teile)


def aufbau_5():
    teile = [titel("Viren befallen viele Lebewesen")]
    teile.append("<rect x='0' y='226' width='480' height='62' rx='0' fill='url(#gBoden)'/>")
    # Mensch
    teile.append(kind(66, 236, 1.05, shirt="#AD007C"))
    # Vogel (Tier)
    teile.append("<g filter='url(#fSchatten)'><ellipse cx='182' cy='196' rx='30' ry='20' fill='#c8a26b'/><circle cx='206' cy='176' r='13' fill='#c8a26b'/>"
                 "<path d='M217,176 l12,4 l-12,4 z' fill='#F7B800'/><circle cx='209' cy='173' r='2.2' fill='#1e293b'/>"
                 "<path d='M160,190 q-22,-8 -26,8 q14,4 30,2 z' fill='#a8834f'/><line x1='176' y1='214' x2='172' y2='236' stroke='#b7791f' stroke-width='3'/><line x1='190' y1='214' x2='194' y2='236' stroke='#b7791f' stroke-width='3'/></g>")
    # Pflanze mit Mosaikflecken
    teile.append("<g filter='url(#fSchatten)'><path d='M300,236 q-2,-60 2,-110' stroke='#3f8a3a' stroke-width='4' fill='none'/>"
                 "<path d='M302,170 q-46,-18 -44,-56 q38,4 44,56 z' fill='url(#gBlatt)'/><path d='M302,150 q46,-24 52,-60 q-40,2 -52,60 z' fill='url(#gBlatt)'/>"
                 "<path d='M300,206 q-40,4 -52,-24 q34,-6 52,24 z' fill='url(#gBlatt)'/>"
                 "<circle cx='278' cy='134' r='5' fill='#dfe89a' opacity='.9'/><circle cx='330' cy='108' r='6' fill='#dfe89a' opacity='.9'/><circle cx='270' cy='192' r='4' fill='#dfe89a' opacity='.9'/></g>")
    # Bakterium mit Phagen
    teile.append(bakterium(368, 186, 92, 38, geissel=False))
    for px in (384, 414, 440):
        teile.append(f"<g><line x1='{px}' y1='186' x2='{px}' y2='170' stroke='#64748b' stroke-width='2.5'/><polygon points='{px},{150} {px + 8},{156} {px + 8},{166} {px},{171} {px - 8},{166} {px - 8},{156}' fill='#7fbf6a' stroke='#2f6b34' stroke-width='1.2'/>"
                     f"<path d='M{px - 6},186 l-5,8 M{px + 6},186 l5,8' stroke='#64748b' stroke-width='1.6'/></g>")
    for vx, vy in ((104, 120), (226, 150), (348, 92), (120, 96)):
        teile.append(mini_virus(vx, vy))
    teile.append(t(66, 262, "Mensch", 12, 900))
    teile.append(t(66, 277, "z. B. Grippe, Masern", 10, 700, GRAU))
    teile.append(t(186, 262, "Tier", 12, 900))
    teile.append(t(186, 277, "z. B. Vogelgrippe", 10, 700, GRAU))
    teile.append(t(306, 262, "Pflanze", 12, 900))
    teile.append(t(306, 277, "z. B. Tabakmosaikvirus", 10, 700, GRAU))
    teile.append(t(414, 262, "Bakterium", 12, 900))
    teile.append(t(414, 277, "Bakteriophagen", 10, 700, GRAU))
    return svg("Mensch, Tier, Pflanze und Bakterium können von Viren befallen werden", *teile)


# ───────────────────────────────────────────────────────── Lesestrecke M2 Vermehrung
def vermehrung_4():
    teile = [titel("Wie lange dauert eine Runde?")]
    teile.append(uhr(120, 150, 68, 9, 20, bogen=(9, 9 + 20 / 60), farbe=ORANGE))
    teile.append(t(120, 52, "Schema im Schulbuch", 13, 900, "#b7791f"))
    teile.append(t(120, 252, "9.00 → 9.20 Uhr", 13, 900))
    teile.append(t(120, 270, "nur 20 Minuten je Runde", 11, 700, GRAU))
    teile.append(uhr(360, 150, 68, 4, 0, bogen=(9, 16), farbe=MAGENTA))
    teile.append(t(360, 52, "Grippevirus in echt", 13, 900, MAGENTA))
    teile.append(t(360, 252, "etwa 6 bis 8 Stunden", 13, 900))
    teile.append(t(360, 270, "je Runde", 11, 700, GRAU))
    teile.append(t(240, 156, "≠", 34, 900, ROT))
    return svg("Uhr aus dem Schulbuch mit 20 Minuten neben einer echten Runde von 6 bis 8 Stunden", *teile)


def vermehrung_5():
    teile = [titel("Was hilft gegen Viren?")]
    # Antibiotika-Kapsel
    teile.append("<g filter='url(#fSchatten)' transform='rotate(-25 72 122)'><rect x='42' y='108' width='60' height='28' rx='14' fill='#ffffff' stroke='#94a3b8' stroke-width='1.5'/><path d='M72,108 h16 a14,14 0 0 1 0,28 h-16 z' fill='#dc2626'/></g>")
    teile.append(t(72, 82, "Antibiotikum", 12, 900, ROT))
    teile.append(bakterium(116, 150, 92, 38, geissel=False))
    teile.append(pfeil(96, 136, 130, 156, ROT))
    teile.append(t(162, 214, "wirkt gegen Bakterien ✓", 11, 900, GRUEN))
    teile.append(virus(70, 222, 13))
    teile.append("<path d='M84,180 q12,10 2,26' fill='none' stroke='#dc2626' stroke-width='2.5' stroke-dasharray='4 4'/>")
    teile.append(t(70, 262, "nicht gegen Viren ✗", 11, 900, ROT))
    teile.append("<line x1='250' y1='60' x2='250' y2='270' stroke='#cbd5e1' stroke-width='2' stroke-dasharray='5 5'/>")
    # Impfung: Spritze + Schild
    teile.append("<g filter='url(#fSchatten)'><path d='M360,96 l40,0 l0,8 q0,52 -40,72 q-40,-20 -40,-72 l0,-8 z' fill='url(#gSchild)' stroke='#ffffff' stroke-width='2'/>"
                 "<path d='M342,128 l12,12 l24,-26' stroke='#ffffff' stroke-width='6' fill='none' stroke-linecap='round'/></g>")
    teile.append("<g filter='url(#fSchatten)' transform='rotate(35 300 214)'><rect x='270' y='206' width='56' height='16' rx='3' fill='url(#gGlas)' stroke='#64748b' stroke-width='1.5'/>"
                 "<rect x='274' y='209' width='30' height='10' fill='#9fd0f5'/><rect x='326' y='211' width='14' height='6' fill='#64748b'/><line x1='340' y1='214' x2='360' y2='214' stroke='#64748b' stroke-width='1.5'/>"
                 "<rect x='258' y='210' width='12' height='8' fill='#64748b'/></g>")
    teile.append(virus(440, 150, 10, grau=False))
    teile.append("<path d='M428,150 q-12,0 -20,-6' fill='none' stroke='#dc2626' stroke-width='2.5' stroke-dasharray='4 4'/>")
    teile.append(t(360, 82, "Impfung", 13, 900, BLAU))
    teile.append(t(360, 250, "sicherer Schutz", 12, 900, BLAU))
    teile.append(t(360, 266, "virenhemmende Mittel verkürzen nur", 10, 700, GRAU))
    return svg("Antibiotika wirken gegen Bakterien, nicht gegen Viren; eine Impfung schützt", *teile)


# ───────────────────────────────────────────────────────── Lesestrecke M3 Masern
def masern_1():
    teile = [titel("Ansteckung durch Tröpfchen")]
    teile.append("<rect x='0' y='240' width='480' height='48' fill='url(#gBoden)'/>")
    teile.append(kind(100, 250, 1.25, shirt="#AD007C", gesicht="niesen", rot_augen=True))
    teile.append(kind(380, 250, 1.25, shirt="#006AB3", haar="#2b2b2b"))
    # Tröpfchenwolke
    import random
    r = random.Random(4)
    for i in range(46):
        u = i / 46
        x = 128 + u * 190 + r.uniform(-8, 8)
        y = 150 + math.sin(u * 3) * 8 + r.uniform(-26, 26) * (0.4 + u)
        teile.append(f"<circle cx='{x:.1f}' cy='{y:.1f}' r='{r.uniform(1.6, 3.6):.1f}' fill='#7ab8e8' opacity='{0.85 - u * 0.4:.2f}'/>")
    for x, y in ((180, 140), (236, 168), (290, 134), (316, 176)):
        teile.append(mini_virus(x, y, 3.6))
    teile.append(t(232, 104, "Tröpfchen mit Viren", 13, 900, BLAU))
    teile.append(t(232, 210, "Husten, Niesen, Sprechen", 11, 700, GRAU))
    teile.append(t(100, 278, "krank", 12, 900, MAGENTA))
    teile.append(t(380, 278, "steckt sich an", 12, 900, BLAU))
    return svg("Ein Kind niest, Tröpfchen mit Masernviren fliegen zu einem anderen Kind", *teile)


def masern_2():
    teile = [titel("Inkubationszeit: etwa 10 Tage")]
    # Kalenderleiste
    for i in range(10):
        x = 30 + i * 42
        teile.append(f"<g filter='url(#fSchatten)'><rect x='{x}' y='44' width='36' height='40' rx='5' fill='#ffffff' stroke='#cbd5e1'/><rect x='{x}' y='44' width='36' height='11' rx='4' fill='{ROT}'/></g>")
        teile.append(t(x + 18, 76, str(i + 1), 13, 900, TEXT, halo=False))
    teile.append(t(240, 100, "Tag 1 bis 10: man merkt nichts", 12, 800, GRAU))
    teile.append("<rect x='0' y='240' width='480' height='48' fill='url(#gBoden)'/>")
    teile.append(kind(92, 252, 1.1, shirt="#16a34a"))
    teile.append("<g filter='url(#fSchatten)'><circle cx='150' cy='236' r='14' fill='#F7B800'/><path d='M138,232 q12,6 24,0' stroke='#ffffff' stroke-width='2' fill='none'/></g>")
    teile.append(t(110, 278, "spielt, fühlt sich gesund", 11, 800))
    # Lupe: im Körper
    for i, (cx, n) in enumerate(((268, 1), (340, 4), (416, 14))):
        teile.append(f"<g filter='url(#fSchatten)'><circle cx='{cx}' cy='178' r='34' fill='#fdeef0' stroke='#64748b' stroke-width='4'/></g>")
        import random
        r = random.Random(i + 7)
        for k in range(n):
            a = r.uniform(0, math.tau); rr = r.uniform(0, 22) if n > 1 else 0
            teile.append(mini_virus(cx + math.cos(a) * rr, 178 + math.sin(a) * rr, 3.2))
        teile.append(t(cx, 232, ["Tag 1", "Tag 5", "Tag 10"][i], 11, 900))
    teile.append(t(342, 130, "im Körper: Viren vermehren sich", 11, 900, MAGENTA))
    return svg("Kalender mit 10 Tagen; das Kind fühlt sich gesund, aber im Körper vermehren sich die Viren", *teile)


def masern_3():
    teile = [titel("Das 1. Stadium")]
    teile.append(kind(150, 262, 1.5, shirt="#64748b", gesicht="krank", rot_augen=True))
    teile.append("<g filter='url(#fSchatten)'><path d='M178,118 q22,-6 30,8 q-8,14 -28,10 z' fill='#ffffff' stroke='#cbd5e1'/></g>")
    teile.append(t(206, 108, "Schnupfen, Husten", 11, 800, "middle"))
    teile.append(thermometer(36, 230, 38.6, 100))
    # Lupe auf Wangenschleimhaut
    teile.append("<g filter='url(#fSchatten)'><circle cx='350' cy='150' r='78' fill='#d9737a' stroke='#475569' stroke-width='8'/>"
                 "<path d='M290,150 q60,-50 120,0 q-60,46 -120,0 z' fill='#b4474f'/><path d='M300,150 q50,-30 100,0' fill='none' stroke='#ffffff' stroke-width='10' stroke-linecap='round' opacity='.85'/>"
                 "<line x1='408' y1='206' x2='446' y2='250' stroke='#475569' stroke-width='12' stroke-linecap='round'/></g>")
    for i in range(14):
        x = 300 + (i * 23 % 100); y = 104 + (i * 17 % 30)
        teile.append(f"<circle cx='{x}' cy='{y}' r='3' fill='#ffffff' stroke='#f3d6d6' stroke-width='1'/>")
    teile.append(t(350, 60, "Lupe: Wangenschleimhaut", 12, 900, MAGENTA))
    teile.append(t(330, 262, "weißliche Flecken", 12, 900, TEXT))
    teile.append(t(150, 284, "Augen oft entzündet", 10, 700, GRAU))
    return svg("Krankes Kind mit Schnupfen und Fieber, Lupe auf weißliche Flecken an der Wangenschleimhaut", *teile)


def masern_4():
    teile = [titel("Das 2. Stadium")]
    # Bett
    teile.append("<g filter='url(#fSchatten)'><rect x='60' y='178' width='300' height='46' rx='8' fill='url(#gBett)'/><rect x='50' y='130' width='18' height='120' rx='4' fill='#8b5e3c'/>"
                 "<rect x='356' y='160' width='18' height='90' rx='4' fill='#8b5e3c'/><rect x='72' y='160' width='70' height='26' rx='12' fill='#ffffff'/></g>")
    # Kopf auf dem Kissen + Arm mit Flecken
    teile.append("<g filter='url(#fSchatten)'><circle cx='112' cy='158' r='26' fill='url(#gHaut)'/><path d='M86,152 q8,-30 28,-26 q20,-2 24,22 q-14,-12 -52,4 z' fill='#5b3a1e'/>"
                 "<path d='M100,160 q6,-3 10,0 M120,160 q6,-3 10,0' stroke='#1e293b' stroke-width='2' fill='none'/><path d='M108,172 q6,-3 12,0' stroke='#1e293b' stroke-width='2' fill='none'/>"
                 "<path d='M150,176 q60,-16 120,-4 q4,8 0,14 q-60,-6 -118,8 z' fill='url(#gHaut)'/></g>")
    for i in range(30):
        x = 92 + (i * 13 % 44); y = 140 + (i * 7 % 34)
        teile.append(f"<circle cx='{x}' cy='{y}' r='2' fill='#e0464a' opacity='.85'/>")
    for i in range(24):
        x = 158 + (i * 17 % 110); y = 168 + (i * 5 % 14)
        teile.append(f"<circle cx='{x}' cy='{y}' r='2.4' fill='#e0464a' opacity='.85'/>")
    teile.append(thermometer(420, 236, 40.0, 150))
    teile.append(t(210, 112, "roter Hautausschlag", 13, 900, ROT))
    teile.append(t(210, 254, "hohes Fieber, man fühlt sich elend", 11, 800))
    teile.append(t(210, 270, "beginnt 3 bis 5 Tage nach dem 1. Stadium", 10, 700, GRAU))
    return svg("Kind im Bett mit rotem Hautausschlag, Thermometer zeigt 40 Grad", *teile)


def masern_5():
    teile = [titel("Gefährliche Folgeerkrankungen")]
    # Körperumriss
    teile.append("<g filter='url(#fSchatten)'><circle cx='240' cy='74' r='34' fill='url(#gHaut)'/>"
                 "<path d='M196,268 v-120 q0,-34 44,-38 q44,4 44,38 v120 z' fill='#cfe1f2' stroke='#94a3b8' stroke-width='2'/></g>")
    # Gehirn
    teile.append("<path d='M216,66 q-2,-22 24,-24 q26,2 24,24 q-4,10 -24,10 q-20,0 -24,-10 z' fill='#f2b8c6' stroke='#c0607a' stroke-width='2'/>")
    teile.append("<path d='M226,58 q6,-6 12,0 q6,-6 12,0 q4,6 0,10' fill='none' stroke='#c0607a' stroke-width='1.5'/>")
    # Ohr
    teile.append("<path d='M272,70 q14,-4 12,14 q-2,12 -12,8' fill='url(#gHaut)' stroke='#d08a6a' stroke-width='2'/><circle cx='278' cy='80' r='4' fill='#e0464a'/>")
    # Lungen
    teile.append("<path d='M234,138 q-30,0 -28,44 q2,30 26,26 z' fill='#f4a6a6' stroke='#c0392b' stroke-width='2'/><path d='M246,138 q30,0 28,44 q-2,30 -26,26 z' fill='#f4a6a6' stroke='#c0392b' stroke-width='2'/>"
                 "<line x1='240' y1='118' x2='240' y2='140' stroke='#c0392b' stroke-width='4'/>")
    for x, y in ((222, 170), (258, 180), (228, 194)):
        teile.append(f"<circle cx='{x}' cy='{y}' r='5' fill='#c0392b' opacity='.55'/>")
    # Beschriftungen mit Pfeilen (Text über dem Pfeil)
    teile.append(pfeil(160, 60, 208, 60, ROT))
    teile.append(t(86, 56, "Gehirnentzündung", 12, 900, ROT))
    teile.append(t(86, 72, "sehr gefährlich", 10, 700, GRAU))
    teile.append(pfeil(380, 74, 292, 80, ROT))
    teile.append(t(400, 64, "Mittelohr-", 12, 900, ROT))
    teile.append(t(400, 80, "entzündung", 12, 900, ROT))
    teile.append(pfeil(130, 176, 204, 176, ROT))
    teile.append(t(90, 168, "Lungen-", 12, 900, ROT))
    teile.append(t(90, 184, "entzündung", 12, 900, ROT))
    teile.append(t(380, 210, "bleibende Schäden", 11, 800))
    teile.append(t(380, 226, "oder Tod möglich", 11, 800))
    return svg("Körperumriss: Gehirn, Ohr und Lunge als Orte gefährlicher Folgeerkrankungen", *teile)


def masern_6():
    teile = [titel("Impfen schützt – auch andere")]
    import random
    r = random.Random(11)
    pos = []
    for reihe in range(4):
        for spalte in range(9):
            x = 70 + spalte * 38 + (reihe % 2) * 19
            y = 96 + reihe * 46
            pos.append((x, y))
    baby = 4 + 9 * 2  # Mitte
    ungeimpft = {3, 30}
    for i, (x, y) in enumerate(pos):
        if i == baby:
            teile.append(f"<g filter='url(#fSchatten)'><circle cx='{x}' cy='{y - 12}' r='12' fill='#fff3c4' stroke='{ORANGE}' stroke-width='2'/><circle cx='{x}' cy='{y - 14}' r='5' fill='url(#gHaut)'/><path d='M{x - 6},{y - 4} q6,-6 12,0' fill='#f9d77e'/></g>")
            continue
        farbe = "#94a3b8" if i in ungeimpft else "#006AB3"
        teile.append(mensch_icon(x, y, farbe, 0.9, schild=i not in ungeimpft))
    teile.append(virus(34, 140, 11))
    teile.append("<path d='M42,140 q10,-2 14,-12' fill='none' stroke='#dc2626' stroke-width='2.5' stroke-dasharray='4 4'/>")
    teile.append(t(34, 172, "kommt", 10, 800, ROT))
    teile.append(t(34, 186, "nicht durch", 10, 800, ROT))
    bx, by = pos[baby]
    teile.append(t(bx, by + 14, "Baby", 10, 900, "#b7791f"))
    teile.append(t(250, 274, "95 von 100 geimpft: Das Virus kann sich kaum ausbreiten", 12, 900, BLAU))
    teile.append(t(408, 50, "blau mit Schild = geimpft", 10, 900, BLAU))
    teile.append(t(408, 64, "grau = ungeimpft", 10, 700, GRAU))
    return svg("Gruppe von Menschen, die meisten geimpft; ein Baby in der Mitte ist mitgeschützt", *teile)


BILDER = {
    "aufbau-1": aufbau_1, "aufbau-4": aufbau_4, "aufbau-5": aufbau_5,
    "vermehrung-4": vermehrung_4, "vermehrung-5": vermehrung_5,
    "masern-1": masern_1, "masern-2": masern_2, "masern-3": masern_3, "masern-4": masern_4, "masern-5": masern_5, "masern-6": masern_6,
}

if __name__ == "__main__":
    os.makedirs(ZIEL, exist_ok=True)
    for name, fn in BILDER.items():
        with open(os.path.join(ZIEL, name + ".svg"), "w", encoding="utf-8") as f:
            f.write(fn())
        print("SVG", name)
