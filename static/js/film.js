/* Film-Baustein: eine Modellwelt (Skill modellwelt-bauen), ein Papiertheater (papiertheater-bauen) oder eine Archiv-Doku
   (archiv-doku-bauen) im Arbeitsblatt.

   Einbindung und Datenformat: references/film.md. Beim Übernehmen VIR durch das Kürzel des Projekts ersetzen (z. B. OEK).

   Was der Baustein macht
     • Filmbühne: eine iframe-Bühne neben den Aufgaben (breit) bzw. darüber, klebend (iPad/Handy). Sie erscheint in jedem Reiter,
       der einen Film nutzt (tab.film, Aufgabe typ "film"/"filmmoment" oder ein Modell-Knopf). Ein iframe je Film, das nie
       umgehängt wird – so bleibt der Filmstand beim Reiterwechsel erhalten.
     • Status: Die Filme melden per postMessage, was läuft und wie viel vollständig angesehen wurde (Springen zählt nicht).
       Gespeichert wird: gesehen (%), frei (vollständig gesehen → Live-Perspektiven), besucht (Live-Perspektiven), gedrückte Knöpfe.
     • Aufgabentypen: "film" (Film ansehen, Station hakt sich bei ≥ 95 % ab) und "filmmoment" (Finde den Moment: selbst anhalten).
     • Modell-Knöpfe an JEDER Aufgabe (Feld modell): springen zu Zeitpunkt + Blickwinkel/Perspektive; mit pflicht: true bleibt die
       Aufgabe gesperrt, bis die Stelle im Film angesehen wurde (modellgebundene Aufgabe).
   Autoplay: Browser (v. a. iPad) erlauben das Starten mit Ton oft nur durch einen Tipp IM Film. Der Baustein versucht es und
   zeigt sonst „Tippe im Filmfenster auf ▶“. Springen und Anhalten klappen immer. */
VIR.film = (() => {
  "use strict";
  const { INHALTE, state, $, $$, esc, cfgOf, niveauOf, body, card, showFb, clearFb, markComplete, sendAntwort, dirty, aufgabenByNr, tabByNr, showToast } = VIR;
  const PRUEF = !!VIR.pruefmodus;
  const FILME = INHALTE.filme || {};
  const SCHWELLE = 95;                         // % vollständig angesehen → Station erledigt

  const Z = { filme: {}, knoepfe: {} };        // gespeichert: filme[id] = {gesehen, frei, besucht}, knoepfe[nr] = true
  const lauf = {};                             // letzter Status je Film (nicht gespeichert)
  const info = {};                             // Kapitel, Blickwinkel, Perspektiven je Film (vom Film gemeldet)
  const hoerer = [];                           // fn(id, status)
  const iframes = {};
  let aktiv = null, buehne = null;
  const fz = id => Z.filme[id] || (Z.filme[id] = { gesehen: 0, frei: false, besucht: [] });
  const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const knoepfeVon = t => !t.modell ? [] : (Array.isArray(t.modell) ? t.modell : [t.modell]);
  const filmVonAufgabe = t => (t.typ === "film" || t.typ === "filmmoment") ? t.film : (knoepfeVon(t)[0] || {}).film;
  const brauchtFrei = k => (k.befehle || []).some(b => b.mw === "live" || b.mw === "ansicht");
  const SYMBOL = { modellwelt: "🧊", papiertheater: "🎭", archivdoku: "📜" };
  const symbol = id => SYMBOL[(FILME[id] || {}).art] || "🎬";

  // ─── Bühne ─────────────────────────────────────────────────────────────
  function buehneAufbauen() {
    if (buehne) return buehne;
    const panels = document.getElementById("panels");
    const wrap = document.createElement("div");
    wrap.className = "film-layout";
    panels.parentNode.insertBefore(wrap, panels);
    buehne = document.createElement("aside");
    buehne.className = "filmbuehne"; buehne.id = "filmbuehne"; buehne.hidden = true;
    buehne.setAttribute("aria-label", "Film");
    buehne.innerHTML = `
      <div class="film-kopf">
        <span class="film-titel" id="film-titel"></span>
        <span class="film-stand" id="film-stand" aria-live="polite"></span>
        <button class="btn btn-quiet btn-sm film-anordnung" type="button" data-action="film-anordnung" title="Film über den Aufgaben oder daneben zeigen"></button>
        <button class="btn btn-quiet btn-sm film-klein" type="button" data-action="film-klein" aria-expanded="true" title="Film verkleinern">▾</button>
      </div>
      <div class="film-rahmen" id="film-rahmen"></div>`;
    wrap.append(panels, buehne);
    anordnungSetzen(gespeicherteAnordnung());
    return buehne;
  }
  // Anordnung „daneben“ (Standard) oder „oben“; pro Gerät gemerkt
  function gespeicherteAnordnung() { try { return localStorage.getItem("vir-film-anordnung") || "daneben"; } catch (e) { return "daneben"; } }
  function anordnungSetzen(a) {
    document.body.classList.toggle("film-oben", a === "oben");
    const k = buehne && buehne.querySelector(".film-anordnung");
    if (k) k.textContent = a === "oben" ? "◫ Film daneben" : "⬒ Film groß oben";
    try { localStorage.setItem("vir-film-anordnung", a); } catch (e) { /* nur Komfort */ }
  }
  VIR.actions["film-anordnung"] = () => {
    anordnungSetzen(document.body.classList.contains("film-oben") ? "daneben" : "oben");
    if (!document.body.classList.contains("film-oben")) return;
    buehne.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  VIR.actions["film-klein"] = el => {
    const klein = buehne.classList.toggle("klein");
    el.textContent = klein ? "▸ Film zeigen" : "▾"; el.setAttribute("aria-expanded", String(!klein));
  };

  function iframeFuer(id) {
    if (iframes[id]) return iframes[id];
    const f = FILME[id];
    if (!f) { console.error("Film fehlt in INHALTE.filme:", id); return null; }
    const fr = document.createElement("iframe");
    fr.title = f.titel || "Film"; fr.allow = "fullscreen; autoplay"; fr.hidden = true;
    fr.src = f.datei + (VIR.APP.assetVersion ? (f.datei.includes("?") ? "&" : "?") + "v=" + VIR.APP.assetVersion : "");
    fr.addEventListener("load", () => {
      if (fz(id).frei || PRUEF) senden(id, { mw: "freischalten" });
      senden(id, { mw: "info" });
    });
    $("#film-rahmen").appendChild(fr);
    iframes[id] = fr;
    return fr;
  }

  function zeige(id) {
    buehneAufbauen();
    if (!id || !FILME[id]) { buehne.hidden = true; document.body.classList.remove("mit-film"); return; }
    if (aktiv && aktiv !== id) senden(aktiv, { mw: "anhalten" });
    iframeFuer(id);
    Object.entries(iframes).forEach(([k, fr]) => { fr.hidden = k !== id; });
    aktiv = id;
    buehne.hidden = false;
    document.body.classList.add("mit-film");
    $("#film-titel").textContent = symbol(id) + " " + (FILME[id].titel || "Film");
    standAnzeigen();
  }

  function filmFuerTab(key) {
    const tab = INHALTE.tabs.find(t => t.key === key);
    if (!tab) return null;
    if (tab.film) return tab.film;
    for (const a of tab.aufgaben) { const f = filmVonAufgabe(a); if (f) return f; }
    return null;
  }
  VIR.beimOeffnen["*"] = (function (vorher) {
    return key => { if (vorher) vorher(key); zeige(filmFuerTab(key)); };
  })(VIR.beimOeffnen["*"]);

  // ─── Nachrichten ───────────────────────────────────────────────────────
  function senden(id, befehl) { const fr = iframes[id]; if (fr && fr.contentWindow) fr.contentWindow.postMessage(befehl, "*"); }
  function befehle(id, liste) {
    zeige(id);
    if (buehne.classList.contains("klein")) VIR.actions["film-klein"]($(".film-klein", buehne));
    (liste || []).forEach((b, i) => setTimeout(() => senden(id, b), 120 + i * 160));
    if (window.innerWidth < 1100) buehne.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  window.addEventListener("message", e => {
    const d = e.data;
    if (!d || (d.mw !== "status" && d.mw !== "info")) return;
    const id = Object.keys(iframes).find(k => iframes[k].contentWindow === e.source);
    if (!id) return;
    if (d.mw === "info") { info[id] = d; return; }
    lauf[id] = d;
    const z = fz(id), vorher = JSON.stringify(z);
    z.gesehen = Math.max(z.gesehen, d.gesehen || 0);
    if (d.freigeschaltet || z.gesehen >= SCHWELLE) z.frei = true;
    (d.besucht || []).forEach(b => { if (!z.besucht.includes(b)) z.besucht.push(b); });
    if (JSON.stringify(z) !== vorher) {
      dirty();
      if (!JSON.parse(vorher).frei && z.frei) { freiGeworden(id); }
    }
    if (id === aktiv) standAnzeigen();
    hoerer.forEach(fn => { try { fn(id, d); } catch (err) { console.error(err); } });
  });

  function standAnzeigen() {
    const el = $("#film-stand"); if (!el || !aktiv) return;
    const d = lauf[aktiv], z = fz(aktiv);
    if (!d) { el.textContent = ""; return; }
    const was = d.live ? `Live · ${d.ansichtLabel || d.ansicht}` : d.stopp ? "Quellen-Stopp" : d.laeuft ? "läuft" : "Pause";
    el.textContent = `${was} · ${fmt(d.t)} · gesehen ${z.gesehen} %`;
  }

  function freiGeworden(id) {
    if (FILME[id].art === "modellwelt") showToast("🎬 Film vollständig gesehen – die Live-Perspektiven sind jetzt frei!", "#006AB3");
    INHALTE.tabs.forEach(tab => tab.aufgaben.forEach(t => {
      if (filmVonAufgabe(t) === id && body(t.nr)) { if (t.typ === "film") filmAufgabeAktualisieren(t); else if (knoepfeVon(t).some(brauchtFrei)) knoepfeZeichnen(t); }
    }));
    if (VIR.schritte && VIR.schritte.alleAktualisieren) VIR.schritte.alleAktualisieren();
  }

  // ─── Aufgabentyp „film“: Film ansehen ──────────────────────────────────
  function renderFilm(t) {
    const cfg = cfgOf(t) || t;
    state.runtime[t.nr] = {};
    return `
      ${cfg.auftrag ? `<p class="task-question">${esc(cfg.auftrag)}</p>` : ""}
      ${cfg.beobachtung && cfg.beobachtung.length ? `<div class="film-beobachtung"><p class="eyebrow">👀 Achte beim Ansehen auf …</p>
        <ol>${cfg.beobachtung.map(b => `<li>${esc(b)}</li>`).join("")}</ol></div>` : ""}
      <div class="film-fortschritt"><div class="film-balken"><i id="filmbalken-${t.nr}"></i></div><span id="filmproz-${t.nr}">0 %</span></div>
      <div class="btn-row">
        <button class="btn btn-primary" type="button" data-action="film-spielen" data-nr="${t.nr}">▶ Film abspielen</button>
      </div>
      <p class="hint">💡 Die Station ist erledigt, wenn du den ganzen Film gesehen hast. Springen zählt nicht.</p>`;
  }
  function filmAufgabeAktualisieren(t) {
    const z = fz(t.film), p = Math.min(100, z.gesehen);
    const b = document.getElementById("filmbalken-" + t.nr), s = document.getElementById("filmproz-" + t.nr);
    if (b) b.style.width = p + "%";
    if (s) s.textContent = z.frei ? "✅ ganz gesehen" : p + " %";
    if (z.frei && !state.completed.has(String(t.nr))) {
      if (!state.restoring) sendAntwort(t.nr, "film", `Film vollständig angesehen (${p} %)`, true, t.titel);
      showFb(t.nr, "ok", "✅ Film vollständig angesehen.");
      markComplete(t.nr);
    }
  }
  VIR.actions["film-spielen"] = el => {
    const t = aufgabenByNr[el.dataset.nr], id = filmVonAufgabe(t);
    befehle(id, [{ mw: "spielen" }]);
    setTimeout(() => {
      const d = lauf[id];
      if (!d || !d.laeuft) showFb(t.nr, "info", "👆 Tippe im Filmfenster auf ▶, um den Film zu starten.");
    }, 900);
  };

  // ─── Aufgabentyp „filmmoment“: Finde den Moment ────────────────────────
  // Daten: frage, start (Sekunde, ab der abgespielt wird), niveaus: {A: {fenster: [a, b], tipp}, …}, zu_frueh, zu_spaet, erklaerung
  function renderMoment(t) {
    const cfg = cfgOf(t) || {};
    state.runtime[t.nr] = { versuche: 0, fertig: false, t: null };
    const tippSofort = niveauOf(t.nr) === "A" && cfg.tipp;
    return `
      <p class="task-question">${esc(cfg.frage || t.frage || "")}</p>
      ${tippSofort ? `<p class="hint">💡 ${esc(cfg.tipp)}</p>` : ""}
      <div class="btn-row">
        <button class="btn btn-quiet" type="button" data-action="moment-start" data-nr="${t.nr}">▶ Film ab ${fmt(t.start || 0)} abspielen</button>
        <button class="btn btn-primary" type="button" data-action="moment-pruefen" data-nr="${t.nr}">⏸ Hier habe ich angehalten – prüfen</button>
      </div>
      ${PRUEF ? `<p class="hint pruef-loesung">🔍 Lösung: anhalten zwischen ${fmt(cfg.fenster[0])} und ${fmt(cfg.fenster[1])} (${cfg.fenster[0]}–${cfg.fenster[1]} s).
        <button class="btn btn-quiet btn-sm" type="button" data-action="moment-loesung" data-nr="${t.nr}">Zum Moment springen</button></p>` : ""}`;
  }
  VIR.actions["moment-start"] = el => {
    const t = aufgabenByNr[el.dataset.nr];
    befehle(t.film, [{ mw: "springe", t: t.start || 0 }, { mw: "spielen" }]);
    setTimeout(() => { const d = lauf[t.film]; if (!d || !d.laeuft) showFb(t.nr, "info", "👆 Tippe im Filmfenster auf ▶. Halte dann genau im richtigen Moment an."); }, 1100);
  };
  VIR.actions["moment-loesung"] = el => { const t = aufgabenByNr[el.dataset.nr], c = cfgOf(t); befehle(t.film, [{ mw: "springe", t: (c.fenster[0] + c.fenster[1]) / 2 }]); };
  VIR.actions["moment-pruefen"] = el => momentPruefen(aufgabenByNr[el.dataset.nr]);
  function momentPruefen(t, gespeichert) {
    const cfg = cfgOf(t) || {}, rt = state.runtime[t.nr];
    if (!rt || rt.fertig) return;
    const d = lauf[t.film];
    const zeit = gespeichert !== undefined ? gespeichert : (d && !d.laeuft ? d.t : null);
    if (gespeichert === undefined && d && d.modus === "flug") { showFb(t.nr, "info", "⏳ Der Film startet gerade – halte ihn dann im richtigen Moment an."); return; }
    if (zeit === null || (gespeichert === undefined && Math.abs(zeit - (t.start || 0)) < 0.25)) {
      showFb(t.nr, "info", d && d.laeuft ? "⏸ Halte den Film zuerst an – genau in dem Moment." : "▶ Spiel zuerst den Film ab und halte ihn im richtigen Moment an."); return;
    }
    const [a, b] = cfg.fenster;
    rt.t = zeit;
    if (zeit >= a && zeit <= b) {
      rt.fertig = true;
      if (gespeichert === undefined) sendAntwort(t.nr, "filmmoment", `angehalten bei ${zeit.toFixed(1)} s`, true, cfg.frage || t.titel);
      showFb(t.nr, "ok", `✅ Genau erwischt (${fmt(zeit)})!${t.erklaerung ? " " + esc(t.erklaerung) : ""}`);
      markComplete(t.nr);
    } else {
      rt.versuche++;
      sendAntwort(t.nr, "filmmoment", `angehalten bei ${zeit.toFixed(1)} s`, false, cfg.frage || t.titel);
      const text = zeit < a ? (t.zu_frueh || "Noch zu früh. Spiel ein Stück weiter.") : (t.zu_spaet || "Das war schon danach. Spul ein Stück zurück.");
      const tipp = cfg.tipp && (niveauOf(t.nr) !== "C" || rt.versuche >= 2) ? `<br>💡 ${esc(cfg.tipp)}` : "";
      showFb(t.nr, "err", `❌ ${esc(text)} (du hast bei ${fmt(zeit)} angehalten)${tipp}`);
    }
    dirty();
  }

  // ─── Modell-Knöpfe an jeder Aufgabe ─────────────────────────────────────
  // modell: {film, text, befehle: [{mw:'springe', t}, {mw:'blick', name} | {mw:'live'} | {mw:'ansicht', name} | {mw:'kapitel', n}], pflicht}
  function knoepfeZeichnen(t) {
    const host = body(t.nr); if (!host) return;
    const liste = knoepfeVon(t); if (!liste.length) return;
    let leiste = host.querySelector(".film-knoepfe");
    if (!leiste) { leiste = document.createElement("div"); leiste.className = "film-knoepfe"; host.prepend(leiste); }
    leiste.innerHTML = liste.map((k, i) => {
      const gesperrt = brauchtFrei(k) && !fz(k.film).frei && !PRUEF;
      return `<button class="btn film-knopf" type="button" data-action="film-knopf" data-nr="${t.nr}" data-i="${i}"${gesperrt ? " disabled" : ""}>
          ${symbol(k.film)} ${esc(k.text || "Im Film ansehen")}</button>
        ${gesperrt ? `<span class="hint">🔒 Wird frei, wenn du den ganzen Film gesehen hast.</span>` : ""}`;
    }).join("");
    const pflicht = liste.some(k => k.pflicht) && !Z.knoepfe[t.nr] && !PRUEF;
    host.classList.toggle("film-gesperrt", pflicht);
    let schild = host.querySelector(".film-sperre");
    if (pflicht && !schild) { schild = document.createElement("p"); schild.className = "film-sperre"; schild.textContent = "👆 Sieh dir zuerst die Stelle im Film an – dann geht es hier los."; leiste.after(schild); }
    if (!pflicht && schild) schild.remove();
  }
  VIR.actions["film-knopf"] = el => {
    const t = aufgabenByNr[el.dataset.nr], k = knoepfeVon(t)[+el.dataset.i];
    befehle(k.film, k.befehle);
    if (!Z.knoepfe[t.nr]) { Z.knoepfe[t.nr] = true; knoepfeZeichnen(t); dirty(); }
  };

  // Aufruf aus aufgaben.js am Ende von renderBody(t)
  function nachRender(t) {
    if (t.typ === "film") filmAufgabeAktualisieren(t);
    knoepfeZeichnen(t);
  }
  const render = t => t.typ === "filmmoment" ? renderMoment(t) : renderFilm(t);

  // Aufgabenzustand für den Autosave von aufgaben.js (nur filmmoment hat eigenen Zustand)
  function collect(nr) {
    const rt = state.runtime[nr], t = aufgabenByNr[nr];
    if (!t || t.typ !== "filmmoment" || !rt || (rt.t === null && !rt.versuche)) return undefined;
    return { typ: "filmmoment", t: rt.t, versuche: rt.versuche, fertig: rt.fertig };
  }
  function restore(nr, d) {
    const rt = state.runtime[nr], t = aufgabenByNr[nr];
    if (!rt || !d || !t || t.typ !== "filmmoment") return;
    rt.versuche = d.versuche || 0;
    if (d.fertig && typeof d.t === "number") momentPruefen(t, d.t);
  }

  // Filmstand für den Autosave (eigener Eintrag)
  if (VIR.autosave) VIR.autosave.register("filme", () => (Object.keys(Z.filme).length || Object.keys(Z.knoepfe).length ? JSON.parse(JSON.stringify(Z)) : undefined), data => {
    if (!data) return;
    Object.assign(Z.filme, data.filme || {});
    Object.assign(Z.knoepfe, data.knoepfe || {});
    Object.keys(Z.filme).forEach(id => { if (Z.filme[id].frei) senden(id, { mw: "freischalten" }); });
    INHALTE.tabs.forEach(tab => tab.aufgaben.forEach(t => { if (body(t.nr)) nachRender(t); }));
  }, 30);

  // Für schritte.js: Reiter mit tab.filmFrei = "<film-id>" bleibt gesperrt, bis der Film vollständig gesehen wurde
  function tabGesperrt(key) {
    const tab = INHALTE.tabs.find(t => t.key === key);
    return !!(tab && tab.filmFrei && !PRUEF && !fz(tab.filmFrei).frei);
  }

  function init() { buehneAufbauen(); zeige(filmFuerTab(state.activeTab)); }

  return {
    init, render, nachRender, collect, restore, tabGesperrt, befehle, zeige,
    frei: id => fz(id).frei, gesehen: id => fz(id).gesehen, besucht: id => fz(id).besucht.slice(), status: id => lauf[id], info: id => info[id],
    beobachten: fn => hoerer.push(fn),
  };
})();
