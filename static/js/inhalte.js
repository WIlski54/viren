// Inhalte des interaktiven Arbeitsblatts „Viren – Winzlinge, die krank machen können“
// Biologie · E-Kurs Jahrgang 10 · Gesamtschule Meiderich
// Grundlage: Schulbuch-Doppelseite (Aufgaben 1–6, Masern, Größenvergleich) + Modellwelt „Die gekaperte Zelle“.
// Sprache: kurze Sätze, einfache Wörter, Fakten unverändert. Film-Aufgaben nutzen die Wörter der Sprecherin.
// Aufgabennummern müssen zu ABSCHNITTE in config.py passen.

window.INHALTE = {
  titel: "Viren – Winzlinge, die krank machen können",

  // ─── Film (Modellwelt) ────────────────────────────────────────────────
  filme: {
    zelle: { art: "modellwelt", datei: "/static/film/Modellwelt_Viren_Die_gekaperte_Zelle.html", titel: "Die gekaperte Zelle – wie sich Viren vermehren" },
  },

  // ─── Reiter mit Aufgaben ──────────────────────────────────────────────
  tabs: [
    // ════════════════════════════════ AUFBAU ═══════════════════════════
    {
      key: "aufbau", lese: "L1", label: "Aufbau", icon: "🦠", kurz: "A",
      intro: {
        eyebrow: "Lesestrecke M1", titel: "Was ist ein Virus?",
        begriffe: ["Elektronenmikroskop", "Hülle", "Stacheln", "Rezeptor", "Erbmaterial", "Stoffwechsel", "Bakterium", "Wirtszelle"],
      },
      aufgaben: [
        {
          nr: 1, typ: "mc", eyebrow: "Buch Aufgabe 1", titel: "Strukturen eines Virus",
          modell: { film: "zelle", text: "Virus im Modell öffnen (Film bei 0:15)", befehle: [{ mw: "springe", t: 15 }, { mw: "blick", name: "nah" }] },
          niveaus: {
            A: { frage: "Woraus besteht ein Grippevirus?", optionen: [
              { t: "Aus einer Hülle mit Stacheln und Erbmaterial innen", ok: true },
              { t: "Aus vielen Zellen mit Zellkern", ok: false },
              { t: "Aus Muskeln und Knochen", ok: false },
            ] },
            B: { frage: "Was liegt im Inneren des Virus?", optionen: [
              { t: "Ein Zellkern mit Ribosomen", ok: false },
              { t: "Das Erbmaterial mit den Bauplänen für neue Viren", ok: true },
              { t: "Nährstoffe als Vorrat", ok: false },
              { t: "Nichts – das Virus ist hohl", ok: false },
            ] },
            C: { multi: 2, frage: "Vergleiche Foto und Schemazeichnung im Buch. Welche ZWEI Aussagen stimmen?", optionen: [
              { t: "Auf dem Foto erkennt man Hülle und Stacheln am Rand", ok: true },
              { t: "Das Erbmaterial sieht man nur in der Schemazeichnung", ok: true },
              { t: "Auf dem Foto sieht man einen Zellkern im Virus", ok: false },
              { t: "Die Stacheln sind nur in der Zeichnung erfunden", ok: false },
            ] },
          },
        },
        {
          nr: 2, typ: "luecke", eyebrow: "Fachbegriffe", titel: "Ein Virus beschreiben",
          niveaus: {
            A: { modus: "chips", ablenker: ["Zellkern", "Muskel"], text: "Außen hat das Grippevirus eine [Hülle]. Aus ihr ragen viele [Stacheln]. Innen liegt das [Erbmaterial]. Sichtbar wird der Aufbau erst im [Elektronenmikroskop]." },
            B: { modus: "input", text: "Viren sind nur etwa ein [zehntausendstel|Zehntausendstel] Millimeter groß. Sie bestehen nicht aus [Zellen]. Sie haben keinen eigenen [Stoffwechsel]. Zur Vermehrung brauchen sie eine [Wirtszelle|Wirtszellen]." },
            C: { modus: "input", text: "Eine Hülle aus [Eiweiß|Eiweiss|Proteinen] schützt das [Erbmaterial|Erbgut]. Mit den Stacheln dockt das Virus an [Rezeptoren|Rezeptor] der Zelle an. Weil Viren keinen eigenen Stoffwechsel haben, können sie sich nur in einer [Wirtszelle] vermehren. Ein [Bakterium] dagegen ist eine Zelle und vermehrt sich allein." },
          },
        },
        {
          nr: 3, typ: "sortierung", eyebrow: "Buch Aufgabe 3", titel: "Von groß nach klein",
          niveaus: {
            A: { hinweis: "Ordne von groß nach klein. Abbildung 2 im Buch hilft dir.", items: [
              "Körperzelle",
              "Bakterium",
              "Virus",
            ] },
            B: { hinweis: "Ordne von groß nach klein.", items: [
              "Körperzelle",
              "Bakterium",
              "Pockenvirus",
              "Masernvirus",
              "Poliovirus",
            ] },
            C: { hinweis: "Ordne von groß nach klein. Achte auf die Viren untereinander.", items: [
              "Körperzelle",
              "Bakterium",
              "Pockenvirus",
              "Masernvirus",
              "Warzenvirus",
              "Poliovirus",
            ] },
          },
        },
        {
          nr: 4, typ: "diagramm", eyebrow: "Diagramm lesen", titel: "Wie groß sind Viren?",
          chart: {
            typ: "bar", einheit: "nm", yTitel: "ungefähre Größe in Nanometer (1 000 nm = 1/1000 mm)",
            quelle: "Ungefähre Durchmesser. 1 Nanometer ist ein Millionstel Millimeter. Tippe auf einen Balken.",
            labels: ["Poliovirus", "Warzenvirus", "Grippevirus", "Masernvirus", "Pockenvirus", "Bakterium"],
            datasets: [
              { label: "Größe in nm", data: [30, 55, 100, 150, 300, 2000], farbe: "#4d8fc2" },
            ],
          },
          niveaus: {
            A: { frage: "Welches Teilchen ist am kleinsten?", optionen: [
              { t: "Das Poliovirus", ok: true }, { t: "Das Bakterium", ok: false }, { t: "Das Pockenvirus", ok: false },
            ] },
            B: { frage: "Wie viele Polioviren passen ungefähr nebeneinander auf die Länge eines Bakteriums?", optionen: [
              { t: "etwa 6", ok: false }, { t: "etwa 65", ok: true }, { t: "etwa 650", ok: false }, { t: "etwa 6 500", ok: false },
            ] },
            C: { multi: 2, frage: "Welche ZWEI vergleichenden Aussagen stimmen?", optionen: [
              { t: "Ein Bakterium ist etwa 20-mal so groß wie ein Grippevirus", ok: true },
              { t: "Das Pockenvirus ist etwa 10-mal so groß wie das Poliovirus", ok: true },
              { t: "Alle Viren sind gleich groß", ok: false },
              { t: "Das Masernvirus ist größer als ein Bakterium", ok: false },
            ] },
          },
        },
        {
          nr: 5, typ: "zuordnung", eyebrow: "Begriff und Aufgabe", titel: "Wer macht was?",
          niveaus: {
            A: { links: "Teil", rechts: "Aufgabe", paare: [
              ["Hülle", "schützt das Innere"],
              ["Stacheln", "docken an der Zelle an"],
              ["Erbmaterial", "enthält die Baupläne"],
            ] },
            B: { links: "Begriff", rechts: "Erklärung", paare: [
              ["Hülle", "schützt das Erbmaterial"],
              ["Stacheln", "passen in die Rezeptoren der Zelle"],
              ["Erbmaterial", "enthält die Baupläne für neue Viren"],
              ["Wirtszelle", "Zelle, in der sich das Virus vermehrt"],
            ] },
            C: { links: "Begriff", rechts: "Erklärung", paare: [
              ["Hülle", "Eiweißschicht, die das Erbmaterial schützt"],
              ["Stacheln", "erkennen passende Zellen wie ein Schlüssel"],
              ["Rezeptor", "Empfänger auf der Zelle, das „Schloss“"],
              ["Wirtszelle", "Zelle, deren Stoffwechsel neue Viren baut"],
              ["Elektronenmikroskop", "macht den Aufbau von Viren sichtbar"],
            ] },
          },
        },
        {
          nr: 6, typ: "zeichnen", eyebrow: "Zeichnen", titel: "Ein Virus im Schnitt", geraet: "virus",
          niveaus: {
            A: { aufgabe: "Zeichne ein Grippevirus im Schnitt: einen großen Kreis als Hülle, Stacheln rundherum und einen Knäuel innen. Beschrifte Hülle, Stacheln und Erbmaterial (Textwerkzeug).", elemente: ["Kreis als Hülle", "Stacheln rundherum", "Knäuel innen als Erbmaterial", "Beschriftungen Hülle, Stacheln, Erbmaterial"], hinweis: "Tipp: Erst der Kreis, dann die Stacheln, dann der Knäuel." },
            B: { aufgabe: "Zeichne ein Grippevirus im Schnitt wie die Schemazeichnung im Buch. Beschrifte Hülle, Stacheln und Erbmaterial. Schreibe zu den Stacheln ihre Aufgabe.", elemente: ["Hülle als Kreis oder doppelte Linie", "viele Stacheln außen", "Erbmaterial innen", "Beschriftungen", "Aufgabe der Stacheln: andocken an Rezeptoren"], hinweis: "Nutze zwei Farben: Grün für Hülle und Stacheln, Violett für das Erbmaterial." },
            C: { aufgabe: "Zeichne ein Grippevirus und daneben ein Stück Zellmembran mit Rezeptoren. Zeige, wie ein Stachel in einen Rezeptor passt. Beschrifte alles und ergänze einen Maßstab (100 nm).", elemente: ["Virus mit Hülle, Stacheln, Erbmaterial", "Membran mit Rezeptoren", "Stachel passt in Rezeptor (Schlüssel-Schloss)", "Beschriftungen", "Maßstab 100 nm"], hinweis: "Die Form von Stachel und Rezeptor muss zusammenpassen." },
          },
        },
      ],
    },

    // ════════════════════════════════ FILM ═════════════════════════════
    {
      key: "film", label: "Film", icon: "🎬", kurz: "F", film: "zelle",
      intro: {
        eyebrow: "Modellwelt", titel: "Die gekaperte Zelle",
        begriffe: ["Rezeptoren", "Schlüssel und Schloss", "andocken", "Zellkern", "Baupläne", "Stoffwechsel"],
      },
      aufgaben: [
        {
          nr: 7, typ: "film", film: "zelle", eyebrow: "Film", titel: "Den Film ansehen",
          auftrag: "Sieh dir den Film ganz an (2 Minuten). Du kannst jederzeit anhalten und das Modell drehen. Achte auf diese Fragen:",
          beobachtung: [
            "Was passiert mit dem grauen Virus?",
            "Wo werden die Teile der neuen Viren gebaut?",
            "Wie viele Zellen werden in Runde 2 und 3 neu befallen?",
          ],
        },
        {
          nr: 8, typ: "filmmoment", film: "zelle", eyebrow: "Finde den Moment", titel: "Ein Virus passt nicht", start: 25,
          zu_frueh: "Noch zu früh – das graue Virus ist noch nicht da.",
          zu_spaet: "Das war schon danach – das Grippevirus kommt schon.",
          erklaerung: "Genau hier stößt das graue Virus an die Rezeptoren. Seine Stacheln sind dick und stumpf. Sie passen nicht ins Schloss. Das rote „!“ zeigt: Hier klappt nichts.",
          niveaus: {
            A: { frage: "Halte den Film an, wenn ein Virus nicht passt und weitertreibt.", fenster: [32.2, 38.4], tipp: "Achte auf das graue Virus und das rote Ausrufezeichen." },
            B: { frage: "Halte den Film genau an, wenn das graue Virus die Rezeptoren berührt oder abprallt.", fenster: [33.2, 37.8], tipp: "Die Sprecherin sagt: „Ein Virus mit anderen Stacheln passt nicht.“" },
            C: { frage: "Halte den Film in dem Moment an, in dem das graue Virus auf die Rezeptoren trifft.", fenster: [34.0, 36.8], tipp: "Das rote „!“ erscheint genau beim Anstoßen." },
          },
        },
        {
          nr: 9, typ: "mc", eyebrow: "Genau hinsehen", titel: "Schlüssel und Schloss",
          modell: { film: "zelle", text: "Andockpunkt ansehen (Film bei 0:44)", befehle: [{ mw: "springe", t: 44.2 }, { mw: "blick", name: "andock" }], pflicht: true },
          niveaus: {
            A: { frage: "Was zeigt das Modell am Andockpunkt?", optionen: [
              { t: "Die Spitzen der Stacheln sitzen in den gelben Rezeptoren", ok: true },
              { t: "Das Virus frisst die Zelle auf", ok: false },
              { t: "Das Virus bohrt ein Loch in die Zelle", ok: false },
            ] },
            B: { frage: "Warum kann das Grippevirus andocken, das graue Virus aber nicht?", optionen: [
              { t: "Das Grippevirus ist schneller", ok: false },
              { t: "Nur die Stacheln des Grippevirus passen in die Rezeptoren", ok: true },
              { t: "Das graue Virus hat keine Stacheln", ok: false },
              { t: "Das graue Virus ist zu klein", ok: false },
            ] },
            C: { multi: 2, frage: "Welche ZWEI Schlüsse kannst du aus dem Kernmoment ziehen?", optionen: [
              { t: "Ein Virus kann nur Zellen mit passenden Rezeptoren befallen", ok: true },
              { t: "Deshalb befällt das Grippevirus vor allem Zellen der Atemwege", ok: true },
              { t: "Jedes Virus kann jede Zelle befallen", ok: false },
              { t: "Die Rezeptoren sind dazu da, Viren einzulassen", ok: false },
            ] },
          },
        },
        {
          nr: 10, typ: "freitext", eyebrow: "Erklären", titel: "Warum passt nicht jedes Virus?",
          modell: { film: "zelle", text: "Graues Virus an den Rezeptoren (0:35)", befehle: [{ mw: "springe", t: 35.2 }] },
          kontext: "Biologie E-Kurs 10, Film „Die gekaperte Zelle“, Kapitel 2. Begriffe: Stacheln, Rezeptoren, Schlüssel-Schloss-Prinzip, andocken, Wirtszelle. Das graue Virus hat dicke, stumpfe Stacheln und prallt ab.",
          niveaus: {
            A: {
              modus: "bausteine",
              aufgabe: "Baue die Erklärung: Tippe die Bausteine in der richtigen Reihenfolge an. Danach wählst du, wie man das Prinzip nennt.",
              bausteine: [
                "Auf der Zelle sitzen Empfänger, die Rezeptoren.",
                "Das Grippevirus hat Stacheln mit einer passenden Form.",
                "Seine Stacheln passen genau in die Rezeptoren.",
                "Das Virus dockt an und wird aufgenommen.",
                "Das graue Virus dagegen hat andere Stacheln. Sie passen nicht.",
              ],
              schluss: "Darum kann das graue Virus diese Zelle nicht befallen.",
              urteil: { frage: "Wie nennt man dieses Prinzip? Tippe eine Antwort an.", optionen: ["Schlüssel-Schloss-Prinzip: Nur die passende Form passt.", "Schlüssel-Schloss-Prinzip: Der Rezeptor ist das Schloss, der Stachel der Schlüssel."] },
            },
            B: { aufgabe: "Erkläre mit dem Film: Warum kann das Grippevirus andocken, das graue Virus aber nicht?", starter: ["Auf der Zelle sitzen …", "Die Stacheln des Grippevirus …", "Das graue Virus …", "Das nennt man …"], begriffe: ["Rezeptoren", "Stacheln", "Schlüssel-Schloss-Prinzip", "andocken"], min: 120 },
            C: { aufgabe: "Erkläre das Schlüssel-Schloss-Prinzip am Beispiel aus dem Film. Leite daraus ab, warum ein Grippevirus keine Pflanzenzellen befällt.", begriffe: ["Rezeptoren", "Stacheln", "Schlüssel-Schloss-Prinzip", "Wirtszelle", "Atemwege"], min: 180 },
          },
        },
        {
          nr: 11, typ: "sortierung", eyebrow: "Buch Aufgabe 6", titel: "Die Vermehrung Schritt für Schritt",
          modell: [
            { film: "zelle", text: "Kapitel 3: Fremde Baupläne", befehle: [{ mw: "kapitel", n: 3 }] },
            { film: "zelle", text: "Kapitel 4: Die Zelle baut Viren", befehle: [{ mw: "kapitel", n: 4 }] },
          ],
          niveaus: {
            A: { hinweis: "Vier Schritte – so wie im Film.", items: [
              "Das Virus dockt an der Zelle an.",
              "Das Erbmaterial wandert in den Zellkern.",
              "Die Zelle baut neue Viren.",
              "Die neuen Viren verlassen die Zelle.",
            ] },
            B: { hinweis: "Fünf Schritte – nutze die Wörter der Sprecherin.", items: [
              "Die Stacheln docken an die Rezeptoren an.",
              "Die Zelle stülpt sich ein und nimmt das Virus auf.",
              "Die Hülle öffnet sich, das Erbmaterial wandert in den Zellkern.",
              "Die Zelle liest die Baupläne und baut Hüllen, Stacheln und Erbmaterial.",
              "Neue Viren verlassen die Zelle, die Zelle stirbt ab.",
            ] },
            C: { hinweis: "Sechs Schritte – vom Andocken bis zur nächsten Runde.", items: [
              "Die Stacheln docken an die Rezeptoren an.",
              "Die Zelle stülpt sich ein und nimmt das Virus auf.",
              "Die Hülle öffnet sich, das Erbmaterial wandert in den Zellkern.",
              "Die Zelle liest die Baupläne, ihr Stoffwechsel arbeitet für das Virus.",
              "An der Oberfläche setzen sich neue Viren zusammen und verlassen die Zelle.",
              "Die neuen Viren befallen gesunde Nachbarzellen.",
            ] },
          },
        },
        {
          nr: 12, typ: "luecke", eyebrow: "Wörter aus dem Film", titel: "Was die Sprecherin sagt",
          modell: { film: "zelle", text: "Kapitel 3 noch einmal", befehle: [{ mw: "kapitel", n: 3 }] },
          niveaus: {
            A: { modus: "chips", ablenker: ["Magen", "Muskel"], text: "In der Zelle öffnet sich die [Hülle]. Das Erbmaterial wandert in den [Zellkern]. Dort enthält es [Baupläne] für neue Viren. Der [Stoffwechsel] der Zelle arbeitet jetzt für das Virus." },
            B: { modus: "input", text: "Auf der Zelle sitzen Empfänger, die [Rezeptoren]. Die Stacheln passen wie ein [Schlüssel] ins Schloss. Das Erbmaterial wandert in den [Zellkern]. Die Zelle liest die [Baupläne], als wären es ihre eigenen." },
            C: { modus: "input", text: "Die Zelle stellt [Erbmaterial|Erbgut], Hüllen und Stacheln her. An der [Oberfläche|Zelloberfläche] setzen sie sich zu neuen Viren zusammen. Hunderte bis [tausende|Tausende] entstehen in einer einzigen Zelle. Am Ende ist die Zelle [erschöpft] und stirbt ab." },
          },
        },
      ],
    },

    // ════════════════════════════════ PERSPEKTIVEN ═════════════════════
    {
      key: "perspektiven", label: "Perspektiven", icon: "🧊", kurz: "P", filmFrei: "zelle",
      intro: {
        eyebrow: "Live im Modell", titel: "Mit fremden Augen",
        begriffe: ["Live-Perspektive", "Rezeptor", "Zellkern", "Modell"],
      },
      aufgaben: [
        {
          nr: 13, typ: "mc", eyebrow: "Mit fremden Augen", titel: "Am Rezeptor",
          modell: { film: "zelle", text: "Live: Am Rezeptor (ab 0:33 kommt das graue Virus)", befehle: [{ mw: "live" }, { mw: "ansicht", name: "rezeptor" }], pflicht: true },
          niveaus: {
            A: { frage: "Was siehst du vom Rezeptor aus?", optionen: [
              { t: "Das graue Virus stößt an und treibt weg", ok: true },
              { t: "Das graue Virus dockt fest an", ok: false },
              { t: "Es kommt gar kein Virus", ok: false },
            ] },
            B: { frage: "Was ändert sich, wenn danach das Grippevirus kommt?", optionen: [
              { t: "Es prallt ebenfalls ab", ok: false },
              { t: "Seine Stachelspitzen rasten in die Rezeptoren ein, diese leuchten", ok: true },
              { t: "Der Rezeptor löst sich von der Zelle", ok: false },
              { t: "Das Virus zerfällt sofort", ok: false },
            ] },
            C: { multi: 2, frage: "Was kann man vom Rezeptor aus besser erkennen als in der Filmkamera?", optionen: [
              { t: "Die Form der Stachelspitze und der Kerbe im Rezeptor", ok: true },
              { t: "Dass mehrere Stacheln nacheinander binden", ok: true },
              { t: "Wie lange eine Vermehrungsrunde dauert", ok: false },
              { t: "Wie viele Zellen im Gewebe befallen sind", ok: false },
            ] },
          },
        },
        {
          nr: 14, typ: "mc", eyebrow: "Mit fremden Augen", titel: "Im Zellkern",
          modell: { film: "zelle", text: "Live: Im Zellkern (ab ca. 0:55)", befehle: [{ mw: "live" }, { mw: "ansicht", name: "kern" }], pflicht: true },
          niveaus: {
            A: { frage: "Wer baut im Film die Teile der neuen Viren?", optionen: [
              { t: "Das Virus selbst", ok: false },
              { t: "Die Zelle", ok: true },
              { t: "Das Blut", ok: false },
            ] },
            B: { frage: "Was geht aus dem Zellkern zu den Ribosomen?", optionen: [
              { t: "Violette Fäden: Abschriften der Baupläne", ok: true },
              { t: "Fertige Viren", ok: false },
              { t: "Die Hülle des Virus", ok: false },
              { t: "Rezeptoren", ok: false },
            ] },
            C: { multi: 2, frage: "Welche ZWEI Beobachtungen sprechen dafür, dass Viren keinen eigenen Stoffwechsel haben?", optionen: [
              { t: "Das Virus bringt nur Baupläne mit, gebaut wird von der Zelle", ok: true },
              { t: "Die Ribosomen der Zelle stellen die Bauteile her", ok: true },
              { t: "Das Virus wächst in der Zelle zu voller Größe heran", ok: false },
              { t: "Das Virus teilt sich im Zellkern in zwei Viren", ok: false },
            ] },
          },
        },
        {
          nr: 15, typ: "mc", eyebrow: "Modellkritik", titel: "Was ist echt – was nur Modell?",
          modell: { film: "zelle", text: "Kapitel 1 ansehen", befehle: [{ mw: "kapitel", n: 1 }] },
          niveaus: {
            A: { frage: "Was zeigt das Modell NICHT so wie in echt?", optionen: [
              { t: "Die Farben: Viren sind in echt nicht grün", ok: true },
              { t: "Dass Viren Stacheln haben", ok: false },
              { t: "Dass das Erbmaterial innen liegt", ok: false },
            ] },
            B: { multi: 2, frage: "Welche ZWEI Dinge sind im Modell nur vereinfacht?", optionen: [
              { t: "Der Zellkern ist viel zu klein und zu nah an der Oberfläche", ok: true },
              { t: "Eine Runde dauert im Film Sekunden, in echt Stunden", ok: true },
              { t: "Die Stacheln passen in die Rezeptoren", ok: false },
              { t: "Viren bestehen aus Hülle und Erbmaterial", ok: false },
            ] },
            C: { multi: 3, frage: "Welche DREI Aussagen zum Modell stimmen?", optionen: [
              { t: "Das Grippevirus ist im Modell im richtigen Maßstab (etwa 100 nm)", ok: true },
              { t: "Echte Grippeviren haben zwei Sorten Stacheln, das Modell zeigt nur eine", ok: true },
              { t: "Im Gewebe sind die Viren als Lichtpunkte viel zu groß gezeichnet", ok: true },
              { t: "Das Modell zeigt alles genau wie in echt", ok: false },
              { t: "Viren sind in Wirklichkeit grün und violett", ok: false },
            ] },
          },
        },
      ],
    },

    // ════════════════════════════════ VERMEHRUNG ═══════════════════════
    {
      key: "vermehrung", lese: "L2", label: "Vermehrung", icon: "📈", kurz: "V",
      intro: {
        eyebrow: "Lesestrecke M2", titel: "Viele Viren in kurzer Zeit",
        begriffe: ["Baupläne", "Ribosomen", "Wirtszelle", "exponentielles Wachstum", "Antibiotika", "virenhemmende Mittel", "Impfung"],
      },
      aufgaben: [
        {
          nr: 16, typ: "diagramm", eyebrow: "Diagramm lesen", titel: "Die Bildfolge im Buch",
          chart: {
            typ: "bar", einheit: "Zellen", yTitel: "neu befallene Zellen (Schema im Buch)",
            quelle: "Zahlen aus der Bildfolge im Schulbuch (9.00 bis 10.20 Uhr). Die Uhrzeiten sind ein Schema.",
            labels: ["9.00", "9.20", "9.30", "9.40", "10.00", "10.10", "10.20"],
            datasets: [
              { label: "neu befallene Zellen", data: [1, 1, 0, 3, 3, 0, 6], farbe: "#AD007C" },
            ],
          },
          niveaus: {
            A: { frage: "Wie viele Zellen werden um 10.20 Uhr neu befallen?", optionen: [
              { t: "6", ok: true }, { t: "3", ok: false }, { t: "1", ok: false },
            ] },
            B: { frage: "Wie verändert sich die Zahl der neu befallenen Zellen von Runde zu Runde?", optionen: [
              { t: "Sie bleibt gleich", ok: false },
              { t: "Sie wird immer größer: 1, 3, 6", ok: true },
              { t: "Sie wird kleiner", ok: false },
              { t: "Sie schwankt zufällig", ok: false },
            ] },
            C: { multi: 2, frage: "Welche ZWEI Aussagen zur Bildfolge stimmen?", optionen: [
              { t: "Die Bildfolge zeigt nur wenige Viren je Zelle, damit man zählen kann", ok: true },
              { t: "Eine echte Runde dauert viel länger als 20 bis 40 Minuten", ok: true },
              { t: "In echt setzt jede Zelle genau zwei Viren frei", ok: false },
              { t: "Die Uhrzeiten zeigen die echte Dauer beim Grippevirus", ok: false },
            ] },
          },
        },
        {
          nr: 17, typ: "luecke", eyebrow: "Forschen: hochrechnen", titel: "Von 1 zu Millionen",
          modell: { film: "zelle", text: "Zählwerk im Film ansehen (2:03)", befehle: [{ mw: "springe", t: 123 }, { mw: "blick", name: "uebersicht" }] },
          niveaus: {
            A: { modus: "chips", ablenker: ["2 000", "100"], text: "Eine Zelle setzt etwa 1 000 Viren frei. Jedes Virus befällt eine neue Zelle. Dann sind [1 000] Zellen befallen. Jede setzt wieder 1 000 Viren frei. Das sind [1 000 000] Viren – eine [Million]." },
            B: { modus: "input", text: "Runde 1: Eine Zelle setzt 1 000 Viren frei. Runde 2: 1 000 Zellen setzen zusammen [1000000|1 000 000|1.000.000|eine Million] Viren frei. Runde 3: Es wären schon [1000000000|1 000 000 000|1.000.000.000|eine Milliarde] Viren. Dauert eine Runde 8 Stunden, sind drei Runden nach [24|vierundzwanzig] Stunden vorbei." },
            C: { modus: "input", text: "Pro Runde wird die Zahl der Viren mit [1000|1 000|tausend] malgenommen. So ein Wachstum heißt [exponentielles|exponentiell] Wachstum. Bei 6 bis 8 Stunden je Runde dauern drei Runden höchstens [24|vierundzwanzig] Stunden. In Wirklichkeit befällt nicht jedes Virus eine Zelle. Denn das [Immunsystem] wehrt viele Viren ab." },
          },
        },
        {
          nr: 18, typ: "mc", eyebrow: "Modellkritik", titel: "Stimmt die Uhr im Buch?",
          modell: { film: "zelle", text: "Kapitel 5 im Film ansehen", befehle: [{ mw: "kapitel", n: 5 }] },
          niveaus: {
            A: { frage: "Wie lange dauert eine Vermehrungsrunde beim Grippevirus wirklich?", optionen: [
              { t: "20 Minuten wie im Buch", ok: false },
              { t: "Etwa 6 bis 8 Stunden", ok: true },
              { t: "Etwa 3 Wochen", ok: false },
            ] },
            B: { frage: "Warum zeigt der Film ein Zählwerk statt einer Uhr?", optionen: [
              { t: "Weil Uhren im Modell zu schwer zu bauen sind", ok: false },
              { t: "Weil die Uhrzeiten im Buch nur ein Schema sind und eine echte Runde Stunden dauert", ok: true },
              { t: "Weil Viren keine Zeit brauchen", ok: false },
              { t: "Weil die Vermehrung in Sekunden passiert", ok: false },
            ] },
            C: { multi: 2, frage: "Beurteile die Bildfolge im Buch. Welche ZWEI Aussagen sind richtig?", optionen: [
              { t: "Die Reihenfolge der Schritte stimmt", ok: true },
              { t: "Die Zeitangaben und die Virenzahl je Zelle sind stark vereinfacht", ok: true },
              { t: "Die Bildfolge ist falsch und unbrauchbar", ok: false },
              { t: "Die Bildfolge zeigt echte Messwerte aus dem Labor", ok: false },
            ] },
          },
        },
        {
          nr: 19, typ: "zeichnen", eyebrow: "Zeichnen", titel: "Der Vermehrungskreislauf", geraet: "kreislauf",
          niveaus: {
            A: { aufgabe: "Zeichne vier Kreise im Kreis. Schreibe hinein: 1 Andocken, 2 Erbmaterial in den Zellkern, 3 Zelle baut Viren, 4 Viren verlassen die Zelle. Verbinde die Kreise mit Pfeilen.", elemente: ["vier Stationen", "Beschriftungen 1–4", "Pfeile im Kreis"], hinweis: "Der letzte Pfeil zeigt wieder zum Anfang: Die neuen Viren befallen neue Zellen." },
            B: { aufgabe: "Zeichne den Vermehrungskreislauf mit fünf Stationen. Zeichne in jede Station ein kleines Bild (Virus, Zelle, Zellkern). Verbinde mit Pfeilen.", elemente: ["fünf Stationen mit Bild", "Andocken, Aufnahme, Zellkern, Bau, Freisetzen", "Pfeile in der richtigen Reihenfolge", "Pfeil zurück zum Anfang"], hinweis: "Nutze die Bilder aus dem Film als Vorlage." },
            C: { aufgabe: "Zeichne den Kreislauf und ergänze an jedem Pfeil, was die Zelle dabei tut. Markiere den Schritt, an dem ein virenhemmendes Mittel ansetzen könnte.", elemente: ["vollständiger Kreislauf", "Beschriftung an den Pfeilen", "Rolle der Zelle (Stoffwechsel, Ribosomen)", "markierter Angriffspunkt für ein Medikament"], hinweis: "Denk an das Andocken: Was wäre, wenn der Schlüssel nicht mehr passt?" },
          },
        },
        {
          nr: 20, typ: "mc", eyebrow: "Grundwissen", titel: "Was hilft gegen Viren?",
          niveaus: {
            A: { frage: "Was bietet den sichersten Schutz vor einer Viruskrankheit?", optionen: [
              { t: "Antibiotika", ok: false },
              { t: "Viel Schokolade", ok: false },
              { t: "Eine Impfung", ok: true },
            ] },
            B: { frage: "Warum helfen Antibiotika nicht gegen Viren?", optionen: [
              { t: "Antibiotika greifen den Stoffwechsel von Bakterien an – Viren haben keinen eigenen", ok: true },
              { t: "Viren sind zu groß für Antibiotika", ok: false },
              { t: "Antibiotika gibt es nur für Tiere", ok: false },
              { t: "Antibiotika machen Viren stärker", ok: false },
            ] },
            C: { multi: 2, frage: "Welche ZWEI Aussagen stimmen?", optionen: [
              { t: "Virenhemmende Mittel können die Krankheit verkürzen", ok: true },
              { t: "Bei einer Impfung lernt das Immunsystem das Virus kennen, bevor man krank wird", ok: true },
              { t: "Es gibt viele Medikamente, die alle Viren sicher beseitigen", ok: false },
              { t: "Antibiotika sind das beste Mittel gegen Grippe", ok: false },
            ] },
          },
        },
        {
          nr: 21, typ: "freitext", eyebrow: "Erklären", titel: "Warum werden es so schnell so viele?",
          kontext: "Biologie E-Kurs 10, Vermehrung von Viren. Begriffe: Wirtszelle, Stoffwechsel, Baupläne, Runde, tausende Viren je Zelle, exponentielles Wachstum. Grippe: Runde ca. 6–8 Stunden.",
          niveaus: {
            A: {
              modus: "bausteine",
              aufgabe: "Baue die Erklärung: Tippe die Bausteine in der richtigen Reihenfolge an. Danach wählst du ein passendes Ende.",
              bausteine: [
                "Ein Virus dringt in eine Zelle ein.",
                "Die Zelle baut nach seinen Bauplänen neue Viren.",
                "Aus einer Zelle kommen so tausende neue Viren.",
                "Jedes neue Virus kann wieder eine Zelle befallen.",
              ],
              schluss: "So steigt die Zahl der Viren von Runde zu Runde sehr schnell.",
              urteil: { frage: "Welches Ende passt? Tippe eine Antwort an.", optionen: ["Nach wenigen Runden sind es Millionen Viren.", "Darum fühlt man sich schon nach kurzer Zeit krank."] },
            },
            B: { aufgabe: "Erkläre, warum aus einem Virus in kurzer Zeit Millionen werden. Nutze Zahlen aus dem Film.", starter: ["Ein Virus braucht …", "In der Zelle …", "Aus einer Zelle …", "Nach zwei Runden …"], begriffe: ["Wirtszelle", "Baupläne", "tausende", "Runde"], min: 120 },
            C: { aufgabe: "Erkläre das schnelle Wachstum mit einer Rechnung. Beurteile dann, was in echt das Wachstum bremst.", begriffe: ["Wirtszelle", "Stoffwechsel", "exponentielles Wachstum", "Immunsystem"], min: 180 },
          },
        },
      ],
    },

    // ════════════════════════════════ MASERN ═══════════════════════════
    {
      key: "masern", lese: "L3", label: "Masern", icon: "🌡️", kurz: "M",
      intro: {
        eyebrow: "Lesestrecke M3", titel: "Masern – eine harmlose Kinderkrankheit?",
        begriffe: ["Tröpfcheninfektion", "Inkubationszeit", "Stadium", "Hautausschlag", "Immunsystem", "Folgeerkrankung", "Impfung"],
      },
      aufgaben: [
        {
          nr: 22, typ: "diagramm", eyebrow: "Buch Abbildung 1B", titel: "Die Fieberkurve",
          chart: {
            typ: "line", einheit: "°C", yTitel: "Körpertemperatur in °C", yMin: 36, yMax: 41, tension: 0.35,
            quelle: "Werte abgelesen aus der Fieberkurve im Schulbuch (Abb. 1B), gerundet.",
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"],
            datasets: [
              { label: "Körpertemperatur (Tag)", data: [37.0, 37.1, 37.0, 37.1, 37.4, 37.1, 37.2, 37.2, 37.4, 38.2, 39.6, 39.4, 38.0, 39.6, 40.3, 39.4, 38.6, 37.9, 37.3, 37.1, 37.1, 37.0], farbe: "#dc2626" },
            ],
          },
          niveaus: {
            A: { frage: "Wann ist das Fieber am höchsten?", optionen: [
              { t: "Um Tag 15, im 2. Stadium", ok: true }, { t: "An Tag 2, gleich nach der Ansteckung", ok: false }, { t: "An Tag 22", ok: false },
            ] },
            B: { frage: "Wie lange dauert die Inkubationszeit laut Kurve ungefähr?", optionen: [
              { t: "Etwa 2 Tage", ok: false }, { t: "Etwa 10 Tage", ok: true }, { t: "Etwa 20 Tage", ok: false }, { t: "Es gibt keine", ok: false },
            ] },
            C: { multi: 2, frage: "Welche ZWEI Aussagen zur Fieberkurve stimmen?", optionen: [
              { t: "Die Kurve hat zwei Gipfel: einen im 1. und einen höheren im 2. Stadium", ok: true },
              { t: "In der Inkubationszeit ist die Temperatur fast normal, obwohl sich die Viren vermehren", ok: true },
              { t: "Das Fieber steigt ab der Ansteckung gleichmäßig an", ok: false },
              { t: "Nach der Genesung bleibt das Fieber bei 39 °C", ok: false },
            ] },
          },
        },
        {
          nr: 23, typ: "sortierung", eyebrow: "Buch Aufgabe 2", titel: "Der Verlauf einer Masernerkrankung",
          niveaus: {
            A: { hinweis: "Vier Schritte – die Fieberkurve hilft dir.", items: [
              "Ansteckung durch Tröpfchen",
              "Inkubationszeit: man merkt noch nichts",
              "Schnupfen, Husten, Fieber, weiße Flecken im Mund",
              "Roter Ausschlag und Fieber bis 40 °C",
            ] },
            B: { hinweis: "Fünf Schritte vom Anstecken bis zur Genesung.", items: [
              "Ansteckung durch Tröpfchen",
              "Inkubationszeit von etwa 10 Tagen",
              "1. Stadium: Schnupfen, Husten, weißliche Flecken",
              "2. Stadium: roter Hautausschlag, Fieber bis 40 °C",
              "Genesung nach 1 bis 2 Wochen",
            ] },
            C: { hinweis: "Sechs Schritte – auch was im Körper passiert.", items: [
              "Ansteckung durch Tröpfchen",
              "Viren vermehren sich unbemerkt (Inkubationszeit)",
              "1. Stadium: erste Beschwerden und weißliche Flecken",
              "Die Viren haben sich stark vermehrt",
              "2. Stadium: Hautausschlag und hohes Fieber",
              "Das Immunsystem besiegt die Viren, die Beschwerden verschwinden",
            ] },
          },
        },
        {
          nr: 24, typ: "zuordnung", eyebrow: "Abschnitt und Zeichen", titel: "Woran erkennt man das Stadium?",
          niveaus: {
            A: { links: "Abschnitt", rechts: "Zeichen", paare: [
              ["Inkubationszeit", "keine Beschwerden"],
              ["1. Stadium", "Schnupfen, Husten, weiße Flecken im Mund"],
              ["2. Stadium", "roter Ausschlag, Fieber bis 40 °C"],
            ] },
            B: { links: "Abschnitt", rechts: "Zeichen", paare: [
              ["Inkubationszeit", "keine Beschwerden, die Viren vermehren sich"],
              ["1. Stadium", "Schnupfen, Husten, weißliche Flecken"],
              ["2. Stadium", "roter Hautausschlag, hohes Fieber"],
              ["Genesung", "die Beschwerden verschwinden"],
            ] },
            C: { links: "Abschnitt", rechts: "Zeichen", paare: [
              ["Inkubationszeit", "etwa 10 Tage ohne Beschwerden"],
              ["1. Stadium", "erster Fiebergipfel, weißliche Flecken"],
              ["2. Stadium", "höchster Fiebergipfel, Hautausschlag"],
              ["Genesung", "Temperatur wieder normal"],
              ["Folgeerkrankung", "Lungen- oder Hirnhautentzündung"],
            ] },
          },
        },
        {
          nr: 25, typ: "diagramm", eyebrow: "Quellenkritik", titel: "Stimmen die Zahlen im Buch?",
          chart: {
            typ: "bar", einheit: "Tsd.", yTitel: "Todesfälle durch Masern (in Tausend)",
            quelle: "Schätzungen der WHO (2007): Afrika 396 000 → 36 000, weltweit 757 000 → 242 000. Das Buch nennt: weltweit 400 000 → unter 40 000.",
            labels: ["Afrika", "weltweit"],
            datasets: [
              { label: "2000", data: [396, 757], farbe: "#9fb8cc" },
              { label: "2006", data: [36, 242], farbe: "#AD007C" },
            ],
          },
          niveaus: {
            A: { frage: "Was zeigt das Diagramm für Afrika?", optionen: [
              { t: "Die Todesfälle sind stark gesunken", ok: true },
              { t: "Die Todesfälle sind gestiegen", ok: false },
              { t: "Die Todesfälle sind gleich geblieben", ok: false },
            ] },
            B: { frage: "Das Buch schreibt: „Weltweit sank die Zahl von rund 400 000 auf unter 40 000.“ Was zeigt der Vergleich mit der WHO?", optionen: [
              { t: "Die Zahlen im Buch stimmen genau für die ganze Welt", ok: false },
              { t: "Die Zahlen im Buch passen zu Afrika, nicht zur ganzen Welt", ok: true },
              { t: "Die WHO hat keine Zahlen", ok: false },
              { t: "Weltweit sind die Todesfälle gestiegen", ok: false },
            ] },
            C: { multi: 2, frage: "Welche ZWEI Schlüsse sind richtig?", optionen: [
              { t: "Weltweit sanken die Todesfälle um etwa zwei Drittel – das ist auch ein großer Erfolg", ok: true },
              { t: "Auch Schulbücher können Fehler haben – Zahlen prüft man an der Originalquelle", ok: true },
              { t: "Weil das Buch einen Fehler hat, wirkt die Impfung nicht", ok: false },
              { t: "In Afrika sanken die Todesfälle um etwa 10 Prozent", ok: false },
            ] },
          },
        },
        {
          nr: 26, typ: "luecke", eyebrow: "Fachbegriffe", titel: "Masern in Worten",
          niveaus: {
            A: { modus: "chips", ablenker: ["Bakterium", "Sonnenbrand"], text: "Masern werden durch ein [Virus] ausgelöst. Man steckt sich durch [Tröpfchen] beim Husten und Niesen an. Die Zeit ohne Beschwerden heißt [Inkubationszeit]. Vor Masern schützt eine [Impfung]." },
            B: { modus: "input", text: "Masern verbreiten sich durch [Tröpfcheninfektion|Tröpfchen]. Die Inkubationszeit dauert etwa [10|zehn] Tage. Im 2. Stadium steigt das Fieber oft bis [40] °C. Gefährlich sind [Folgeerkrankungen|Folgeerkrankung|Komplikationen] wie eine Lungenentzündung." },
            C: { modus: "input", text: "Nach der Ansteckung vermehren sich die Viren in der [Inkubationszeit] unbemerkt. Typisch für das 1. Stadium sind weißliche Flecken auf der [Wangenschleimhaut]. Besiegt das [Immunsystem] die Viren, heilt die Krankheit. Sind etwa [95] von 100 Menschen geimpft, kann sich das Virus kaum ausbreiten." },
          },
        },
        {
          nr: 27, typ: "freitext", eyebrow: "Beurteilen", titel: "Eine harmlose Kinderkrankheit?",
          kontext: "Biologie E-Kurs 10, Masern. Begriffe: Tröpfcheninfektion, Inkubationszeit, Stadien, Folgeerkrankungen (Mittelohr-, Lungen-, Hirnhautentzündung), Impfung, 95 % Impfquote, Todesfälle (WHO: weltweit 757 000 im Jahr 2000, 242 000 im Jahr 2006, etwa 107 500 im Jahr 2023).",
          niveaus: {
            A: {
              modus: "bausteine",
              aufgabe: "Viele sagen: „Masern sind eine harmlose Kinderkrankheit.“ Baue eine Antwort darauf: Tippe die Bausteine in der richtigen Reihenfolge an. Danach wählst du dein Urteil.",
              bausteine: [
                "Masern werden von einem Virus ausgelöst und sind sehr ansteckend.",
                "Meist heilt die Krankheit nach ein bis zwei Wochen.",
                "Es kann aber Folgeerkrankungen geben, zum Beispiel eine Lungenentzündung.",
                "Daran sterben weltweit jedes Jahr noch viele Menschen.",
                "Dagegen schützt eine Impfung fast sicher.",
              ],
              schluss: "Darum sind Masern nicht harmlos.",
              urteil: { frage: "Wie lautet dein Urteil? Tippe eine Antwort an.", optionen: ["Masern sind gefährlich. Man sollte sich impfen lassen.", "Masern verlaufen oft mild, können aber gefährlich werden. Impfen schützt auch andere."] },
            },
            B: { aufgabe: "Nimm Stellung: „Masern sind eine harmlose Kinderkrankheit.“ Nutze Verlauf, Folgen und Zahlen.", starter: ["Zuerst …", "Gefährlich sind …", "Die Zahlen zeigen …", "Ich finde deshalb …"], begriffe: ["Tröpfcheninfektion", "Folgeerkrankungen", "Impfung", "Todesfälle"], min: 140 },
            C: { aufgabe: "Beurteile die Aussage „Masern sind eine harmlose Kinderkrankheit“. Wäge ab und begründe auch, warum eine hohe Impfquote Menschen schützt, die selbst nicht geimpft werden können.", begriffe: ["Folgeerkrankungen", "Immunsystem", "Impfquote 95 %", "Gemeinschaftsschutz", "WHO-Zahlen"], min: 220 },
          },
        },
        {
          nr: 28, typ: "zeichnen", eyebrow: "Zeichnen", titel: "Fieberkurve mit Stadien", geraet: "fieberkurve",
          niveaus: {
            A: { aufgabe: "Zeichne eine Fieberkurve: unten eine Achse „Tage“, links eine Achse „°C“. Zeichne die Kurve mit zwei Bergen. Schreibe über die Berge „1. Stadium“ und „2. Stadium“.", elemente: ["Achse Tage", "Achse Temperatur", "Kurve mit zwei Gipfeln", "Beschriftung 1. und 2. Stadium"], hinweis: "Der zweite Berg ist höher." },
            B: { aufgabe: "Zeichne die Fieberkurve der Masern mit Achsen. Trenne mit senkrechten Linien: Inkubationszeit, 1. Stadium, 2. Stadium, Genesung.", elemente: ["beschriftete Achsen", "flacher Anfang, zwei Gipfel", "vier Abschnitte mit Linien getrennt", "Beschriftungen"], hinweis: "Inkubationszeit etwa 10 Tage, höchster Gipfel bei etwa 40 °C." },
            C: { aufgabe: "Zeichne die Fieberkurve und darunter eine zweite Kurve: die Menge der Viren im Körper. Beschrifte die Abschnitte.", elemente: ["Fieberkurve mit Abschnitten", "Kurve der Virenmenge", "Viren steigen schon in der Inkubationszeit", "Virenmenge sinkt vor der Genesung"], hinweis: "Die Viren vermehren sich schon, bevor man Fieber bekommt." },
          },
        },
      ],
    },

    // ════════════════════════════════ ABSCHLUSS ════════════════════════
    {
      key: "abschluss", label: "Abschluss", icon: "📚", kurz: "Z",
      intro: {
        eyebrow: "Abschluss", titel: "Viruskrankheiten, Wiederholen und Beurteilen",
        begriffe: ["Infektionskrankheit", "Gruppenpuzzle", "Kennzeichen des Lebens", "Quelle"],
      },
      aufgaben: [
        {
          nr: 29, typ: "mc", eyebrow: "Buch Aufgabe 5a", titel: "Krankheiten durch Viren",
          niveaus: {
            A: { multi: 3, frage: "Welche DREI Krankheiten werden durch Viren ausgelöst?", optionen: [
              { t: "Grippe", ok: true }, { t: "Masern", ok: true }, { t: "Windpocken", ok: true },
              { t: "Beinbruch", ok: false }, { t: "Sonnenbrand", ok: false },
            ] },
            B: { multi: 3, frage: "Welche DREI Krankheiten werden durch Viren ausgelöst?", optionen: [
              { t: "Mumps", ok: true }, { t: "Röteln", ok: true }, { t: "Tollwut", ok: true },
              { t: "Tuberkulose (Bakterium)", ok: false }, { t: "Karies", ok: false },
            ] },
            C: { multi: 4, frage: "Welche VIER Krankheiten nennt der Buchtext als Viruskrankheiten?", optionen: [
              { t: "Kinderlähmung (Polio)", ok: true }, { t: "Herpes", ok: true }, { t: "Hepatitis", ok: true }, { t: "AIDS", ok: true },
              { t: "Scharlach", ok: false }, { t: "Wundstarrkrampf", ok: false },
            ] },
          },
        },
        {
          nr: 30, typ: "notizen", eyebrow: "Buch Aufgabe 5b · Gruppenpuzzle", titel: "Meine Expertenkrankheit", abschnitt: "abschluss",
          hinweis: "Wählt drei Viruskrankheiten für das Gruppenpuzzle. Notiere für DEINE Krankheit Stichpunkte: Erreger, Übertragung, Beschwerden, Gefahren, Schutz. Notiere die Quelle.",
          kiFrage: "Prüfe diese Stichpunkte zu einer Viruskrankheit für ein Gruppenpuzzle (Biologie Klasse 10): Stimmen Erreger, Übertragung, Beschwerden, Gefahren und Schutz? Fehlt etwas Wichtiges?",
        },
        {
          nr: 31, typ: "blitz", eyebrow: "Blitzfragen", titel: "Blitzrunde",
          hinweis: "Jede Frage kommt nur einmal. Die Antworten werden jedes Mal neu gemischt.",
          niveaus: {
            A: { ziel: 6, stufen: [1], hinweis: "Sechs leichte Fragen richtig beantworten." },
            B: { ziel: 8, stufen: [1, 2], hinweis: "Acht Fragen, leicht und mittel." },
            C: { ziel: 10, stufen: [1, 2, 3], hinweis: "Zehn Fragen – auch die schweren." },
          },
          pool: [
            { id: "b01", stufe: 1, frage: "Wie groß ist ein Grippevirus etwa?", optionen: ["ein zehntausendstel Millimeter", "ein Millimeter", "ein Zentimeter"], ok: 0 },
            { id: "b02", stufe: 1, frage: "Womit kann man Viren sichtbar machen?", optionen: ["Elektronenmikroskop", "Lupe", "Fernglas"], ok: 0 },
            { id: "b03", stufe: 1, frage: "Was liegt im Inneren eines Virus?", optionen: ["Erbmaterial", "Zellkern", "Ribosomen"], ok: 0 },
            { id: "b04", stufe: 1, frage: "Womit docken Grippeviren an Zellen an?", optionen: ["Mit den Stacheln", "Mit dem Erbmaterial", "Mit dem Zellkern"], ok: 0 },
            { id: "b05", stufe: 1, frage: "Wie heißen die Empfänger auf der Zelle?", optionen: ["Rezeptoren", "Ribosomen", "Bakterien"], ok: 0 },
            { id: "b06", stufe: 1, frage: "Wie wird das Masernvirus übertragen?", optionen: ["Durch Tröpfchen", "Durch Mückenstiche", "Durch Essen"], ok: 0 },
            { id: "b07", stufe: 1, frage: "Was schützt sicher vor Masern?", optionen: ["Eine Impfung", "Antibiotika", "Vitamine"], ok: 0 },
            { id: "b08", stufe: 1, frage: "Was ist typisch für das 2. Stadium der Masern?", optionen: ["Roter Hautausschlag", "Keine Beschwerden", "Haarausfall"], ok: 0 },
            { id: "b09", stufe: 1, frage: "Was ist größer?", optionen: ["Ein Bakterium", "Ein Grippevirus", "Ein Poliovirus"], ok: 0 },
            { id: "b10", stufe: 1, frage: "Wer baut die neuen Viren?", optionen: ["Die Wirtszelle", "Das Virus selbst", "Das Blut"], ok: 0 },
            { id: "b11", stufe: 2, frage: "Wie lange dauert die Inkubationszeit bei Masern etwa?", optionen: ["10 Tage", "10 Stunden", "10 Wochen"], ok: 0 },
            { id: "b12", stufe: 2, frage: "Wohin wandert das Erbmaterial des Grippevirus in der Zelle?", optionen: ["In den Zellkern", "Ins Blut", "Zurück nach draußen"], ok: 0 },
            { id: "b13", stufe: 2, frage: "Warum helfen Antibiotika nicht gegen Viren?", optionen: ["Viren haben keinen eigenen Stoffwechsel", "Viren sind zu groß", "Antibiotika wirken nur bei Kindern"], ok: 0 },
            { id: "b14", stufe: 2, frage: "Wie viele Viren setzt eine befallene Zelle etwa frei?", optionen: ["Hunderte bis tausende", "Genau zwei", "Eins"], ok: 0 },
            { id: "b15", stufe: 2, frage: "Was zeigt das Schlüssel-Schloss-Prinzip?", optionen: ["Nur passende Stacheln docken an", "Viren öffnen jede Zelle", "Zellen schließen sich ab"], ok: 0 },
            { id: "b16", stufe: 2, frage: "Was sind weißliche Flecken auf der Wangenschleimhaut?", optionen: ["Ein Zeichen für Masern im 1. Stadium", "Ein Zeichen für Karies", "Eine Folge der Impfung"], ok: 0 },
            { id: "b17", stufe: 2, frage: "Welche Folgeerkrankung kann bei Masern auftreten?", optionen: ["Lungenentzündung", "Beinbruch", "Sonnenbrand"], ok: 0 },
            { id: "b18", stufe: 2, frage: "Wie viele Masern-Impfungen schützen fast sicher?", optionen: ["Zwei", "Eine halbe", "Zehn"], ok: 0 },
            { id: "b19", stufe: 3, frage: "Wie lange dauert eine Vermehrungsrunde beim Grippevirus etwa?", optionen: ["6 bis 8 Stunden", "20 Minuten", "3 Tage"], ok: 0 },
            { id: "b20", stufe: 3, frage: "Wie heißt Wachstum, bei dem pro Runde malgenommen wird?", optionen: ["Exponentielles Wachstum", "Gleichmäßiges Wachstum", "Kein Wachstum"], ok: 0 },
            { id: "b21", stufe: 3, frage: "Ab welcher Impfquote kann sich Masern kaum noch ausbreiten?", optionen: ["Etwa 95 %", "Etwa 50 %", "Etwa 10 %"], ok: 0 },
            { id: "b22", stufe: 3, frage: "Welche Zahlen nennt das Buch eigentlich, laut WHO?", optionen: ["Die Todesfälle in Afrika", "Die Fälle in Deutschland", "Die Impfungen weltweit"], ok: 0 },
            { id: "b23", stufe: 3, frage: "Warum befällt ein Grippevirus keine Pflanzenzellen?", optionen: ["Es findet keine passenden Rezeptoren", "Pflanzen haben keine Zellen", "Pflanzen sind zu kalt"], ok: 0 },
            { id: "b24", stufe: 3, frage: "Welches Kennzeichen des Lebens fehlt Viren?", optionen: ["Ein eigener Stoffwechsel", "Erbmaterial", "Eine Hülle"], ok: 0 },
          ],
        },
        {
          nr: 32, typ: "domino", eyebrow: "Spiel", titel: "Begriffs-Domino",
          hinweis: "Jeder Stein hat links eine Erklärung und rechts einen Begriff. Lege den Stein an, dessen Erklärung zum offenen Begriff passt.",
          niveaus: {
            A: { steine: 6, hinweis: "Sechs Steine – die Grundbegriffe." },
            B: { steine: 9, hinweis: "Neun Steine." },
            C: { steine: 12, hinweis: "Alle zwölf Steine – die Kette schließt sich." },
          },
          paare: [
            { id: "d01", begriff: "Virus", definition: "Winziger Krankheitserreger ohne eigenen Stoffwechsel" },
            { id: "d02", begriff: "Hülle", definition: "Schützt das Erbmaterial eines Virus" },
            { id: "d03", begriff: "Erbmaterial", definition: "Enthält die Baupläne für neue Viren" },
            { id: "d04", begriff: "Wirtszelle", definition: "Zelle, in der sich ein Virus vermehrt" },
            { id: "d05", begriff: "Rezeptor", definition: "Empfänger auf der Zelle, das „Schloss“" },
            { id: "d06", begriff: "Impfung", definition: "Sicherer Schutz vor einer Viruskrankheit" },
            { id: "d07", begriff: "Inkubationszeit", definition: "Zeit zwischen Ansteckung und ersten Beschwerden" },
            { id: "d08", begriff: "Tröpfcheninfektion", definition: "Ansteckung beim Husten, Niesen und Sprechen" },
            { id: "d09", begriff: "Elektronenmikroskop", definition: "Macht den Aufbau von Viren sichtbar" },
            { id: "d10", begriff: "Bakterium", definition: "Einzelliges Lebewesen mit eigenem Stoffwechsel" },
            { id: "d11", begriff: "Antibiotikum", definition: "Mittel gegen Bakterien – wirkt nicht gegen Viren" },
            { id: "d12", begriff: "Folgeerkrankung", definition: "Neue Krankheit als Folge, z. B. Lungenentzündung" },
          ],
        },
        {
          nr: 33, typ: "quellen", eyebrow: "Quellenverzeichnis", titel: "Quellen für das Gruppenpuzzle",
          hinweis: "Trage mindestens zwei verlässliche Quellen ein, die du für deine Expertenkrankheit benutzt hast. Schreibe kurz, warum du sie für verlässlich hältst.",
          min: 2,
        },
        {
          nr: "T", typ: "transfer", eyebrow: "Buch Aufgabe 4 · Beurteilen", titel: "Sind Viren Lebewesen?",
          kontext: "Biologie E-Kurs 10, Transfer zum ganzen Arbeitsblatt. Kennzeichen des Lebens: Aufbau aus Zellen, Stoffwechsel, Wachstum, Fortpflanzung/Vermehrung, Reizbarkeit, Bewegung. Viren: keine Zellen, kein eigener Stoffwechsel, vermehren sich nur in Wirtszellen, haben Erbmaterial und können sich verändern. Beide Urteile sind vertretbar, wenn sie begründet sind.",
          niveaus: {
            A: {
              modus: "bausteine",
              aufgabe: "Sind Viren Lebewesen? Baue eine Begründung: Tippe die Bausteine in der richtigen Reihenfolge an. Danach wählst du dein Urteil.",
              bausteine: [
                "Lebewesen bestehen aus Zellen und haben einen Stoffwechsel.",
                "Viren bestehen dagegen nicht aus Zellen.",
                "Deshalb haben sie auch keinen eigenen Stoffwechsel.",
                "Darum können sie sich nur in einer Wirtszelle vermehren.",
                "Aber Viren haben Erbmaterial wie Lebewesen.",
              ],
              schluss: "Viren stehen an der Grenze zwischen Leben und Nicht-Leben.",
              urteil: {
                frage: "Was ist dein Urteil? Tippe eine Antwort an.",
                optionen: [
                  "Viren sind keine Lebewesen, weil sie allein nichts können.",
                  "Viren sind eine Grenzform: Mit einer Wirtszelle zeigen sie Merkmale des Lebens.",
                ],
              },
            },
            B: {
              aufgabe: "Überlege mit deinem Partner: Sind Viren Lebewesen? Prüfe die Kennzeichen des Lebens einzeln. Schreibe am Ende dein Urteil.",
              starter: ["Lebewesen haben …", "Viren haben kein…", "Viren vermehren sich nur …", "Dafür spricht …", "Ich meine deshalb …"],
              begriffe: ["Zellen", "Stoffwechsel", "Vermehrung", "Wirtszelle", "Erbmaterial"],
              min: 150,
            },
            C: {
              aufgabe: "Beurteile, ob Viren Lebewesen sind. Prüfe alle Kennzeichen des Lebens, nutze Beobachtungen aus dem Film (Zellkern, Ribosomen) und wäge ab. Begründe dein Urteil.",
              begriffe: ["Kennzeichen des Lebens", "Stoffwechsel", "Wirtszelle", "Erbmaterial", "Grenzform"],
              min: 250,
            },
          },
        },
      ],
    },
  ],
};
