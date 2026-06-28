import {
  writingScenarios as baseWritingScenarios,
  type WritingScenario
} from "./phaseOneExamContent";

export type WritingPracticeScenario = WritingScenario & {
  pointChecks: string[][];
  expandedSampleText: string;
};

function insertExtras(baseText: string, extras: string[]) {
  const parts = baseText.split("\n\n");
  if (parts.length < 2) {
    return `${baseText}\n\n${extras.join(" ")}`;
  }

  const closing = parts.pop() ?? "";
  return [...parts, extras.join(" "), closing].join("\n\n");
}

const scenarioEnhancements: Record<
  string,
  { pointChecks: string[][]; extras: string[] }
> = {
  "write-01": {
    pointChecks: [["einladung", "samstag", "party"], ["leider", "kann", "nicht"], ["arbeit", "termin", "familie"], ["naechstes mal", "treffen", "glueckwuensche"]],
    extras: [
      "Ich haette Sie wirklich gern persoenlich gesehen, weil ich mich immer freue, Zeit mit Ihnen und den anderen Gaesten zu verbringen.",
      "Bitte gruessen Sie auch die anderen von mir und sagen Sie ihnen, dass ich beim naechsten Treffen gern wieder dabei bin."
    ]
  },
  "write-02": {
    pointChecks: [["laerm", "musik", "nacht"], ["seit", "mehreren", "gestern"], ["bitte", "leiser", "ruhe"], ["verstaendnis", "nachbarn", "danke"]],
    extras: [
      "Besonders fuer meine Kinder ist das schwierig, weil sie morgens frueh zur Schule muessen und nachts nicht gut schlafen koennen.",
      "Ich moechte das Problem gern freundlich mit Ihnen loesen und hoffe deshalb auf Ihre Ruecksicht."
    ]
  },
  "write-03": {
    pointChecks: [["deutschkurs", "interessiere"], ["niveau", "b1", "anfang"], ["uhrzeit", "kurszeiten", "abend"], ["information", "preis", "antwort"]],
    extras: [
      "Ich suche einen Kurs, der gut zu meinem Arbeitsalltag passt und mir besonders beim Schreiben und Sprechen weiterhilft.",
      "Falls es verschiedene Gruppen gibt, waere ich Ihnen dankbar, wenn Sie mir auch kurz den Unterschied erklaeren koennten."
    ]
  },
  "write-04": {
    pointChecks: [["termin", "donnerstag", "10"], ["leider", "kann", "nicht"], ["neuen termin", "bitte"], ["telefonisch", "erreichen", "rueckmeldung"]],
    extras: [
      "Da mir der Termin wichtig ist, moechte ich ihn nicht einfach absagen, sondern moeglichst bald einen neuen Termin vereinbaren.",
      "Wenn es einfacher ist, koennen Sie mir auch zwei oder drei Vorschlaege schicken, dann bestaetige ich Ihnen sofort einen passenden Termin."
    ]
  },
  "write-05": {
    pointChecks: [["krank", "fieber", "erk", "schule"], ["montag", "dienstag", "zwei tage"], ["hausaufgaben", "nachholen"], ["verstaendnis", "danke"]],
    extras: [
      "Wir achten darauf, dass er den versaeumten Stoff in den naechsten Tagen Schritt fuer Schritt nacharbeitet.",
      "Es waere fuer uns sehr hilfreich, wenn Sie uns auch mitteilen koennten, ob es wichtige Informationen aus dem Unterricht gab."
    ]
  },
  "write-06": {
    pointChecks: [["heizung", "kalt", "funktioniert"], ["seit", "gestern", "heute"], ["reparatur", "bitte"], ["zu hause", "uhr", "vormittag"]],
    extras: [
      "Im Moment ist die Wohnung besonders am Abend sehr kalt, deshalb hoffe ich auf eine schnelle Loesung.",
      "Wenn Sie moechten, kann ich Ihnen auch kurz telefonisch erklaeren, was ich bereits selbst ausprobiert habe."
    ]
  },
  "write-07": {
    pointChecks: [["tochter", "kind", "drei jahre"], ["august", "ab"], ["oeffnungszeiten"], ["rueckmeldung", "antwort"]],
    extras: [
      "Da ich ab August wieder staerker arbeiten moechte, waere eine rechtzeitige Planung fuer unsere Familie sehr wichtig.",
      "Falls aktuell kein Platz frei ist, wuerde ich mich auch ueber Informationen zu Ihrer Warteliste freuen."
    ]
  },
  "write-08": {
    pointChecks: [["mathematik", "hilfe"], ["7. klasse", "klasse"], ["preis", "kostet"], ["freie zeiten", "nachmittag"]],
    extras: [
      "Mein Sohn bemueht sich sehr, aber er braucht vor allem bei Textaufgaben und Bruechen noch zusaetzliche Unterstuetzung.",
      "Uns waere wichtig, dass der Unterricht regelmaessig stattfindet, damit er sich bis zum naechsten Zeugnis verbessern kann."
    ]
  },
  "write-09": {
    pointChecks: [["montag", "8 uhr", "termin"], ["arbeiten", "arbeit"], ["neuen termin", "bitte"], ["nachmittag", "15 uhr"]],
    extras: [
      "Leider habe ich fuer diesen Morgen kurzfristig einen wichtigen Termin bei der Arbeit bekommen und kann ihn nicht verschieben.",
      "Ich waere Ihnen dankbar, wenn Sie mir einen Termin in den naechsten Tagen am Nachmittag anbieten koennten."
    ]
  },
  "write-10": {
    pointChecks: [["zug", "ausfall", "verspaetung"], ["9.30", "ankunft", "spaeter"], ["entschuldigen", "tut mir leid"], ["unterlagen", "besprechung"]],
    extras: [
      "Ich habe sofort nach einer anderen Verbindung gesucht, damit ich so schnell wie moeglich im Buero sein kann.",
      "Falls vor meiner Ankunft schon etwas vorbereitet werden muss, bin ich bis dahin auch telefonisch erreichbar."
    ]
  },
  "write-11": {
    pointChecks: [["interessiere", "schwimmkurs"], ["beginn", "naechste kurs"], ["preis", "kosten"], ["ausruestung", "mitbringen"]],
    extras: [
      "Ich moechte nach laengerer Zeit wieder mit dem Schwimmen anfangen und suche deshalb einen Kurs fuer Erwachsene ohne grosse Vorkenntnisse.",
      "Wenn moeglich, schreiben Sie mir bitte auch, ob es noch freie Plaetze gibt und wie gross die Gruppe ist."
    ]
  },
  "write-12": {
    pointChecks: [["freitag", "sonntag", "reise"], ["hilfe", "bitte"], ["pflanzen", "giessen"], ["danke", "dankbar"]],
    extras: [
      "Ich stelle die Giesskanne vorher auf den Balkon, damit Sie nichts suchen muessen und es fuer Sie nicht zu umstaendlich ist.",
      "Wenn Sie selbst einmal Hilfe brauchen, koennen Sie natuerlich auch jederzeit auf mich zukommen."
    ]
  },
  "write-13": {
    pointChecks: [["danke", "einladung"], ["spaetschicht", "grund"], ["informationen", "bitte"], ["anrufen", "kontakt"]],
    extras: [
      "Es tut mir leid, dass ich an diesem wichtigen Termin nicht teilnehmen kann, denn ich spreche sonst gern persoenlich mit den Lehrkraeften.",
      "Vielleicht koennen wir bei Bedarf auch zu einem anderen Zeitpunkt kurz telefonieren."
    ]
  },
  "write-14": {
    pointChecks: [["bestellt", "sportschuhe", "39"], ["falsche groesse", "37"], ["umtausch", "richtige groesse"], ["antwort", "zurueckschicken"]],
    extras: [
      "Da ich die Schuhe fuer den Sportunterricht meiner Tochter bald brauche, waere eine schnelle Bearbeitung fuer mich besonders wichtig.",
      "Bitte teilen Sie mir auch mit, ob ich ein Ruecksendelabel von Ihnen bekomme."
    ]
  },
  "write-15": {
    pointChecks: [["interessiere", "elternkurs"], ["freie plaetze"], ["kinderbetreuung"], ["kontaktdaten", "telefonisch", "e-mail"]],
    extras: [
      "Ich moechte gern teilnehmen, weil ich mich ueber Erziehung und den Familienalltag mit anderen Eltern austauschen moechte.",
      "Falls der Juni-Kurs schon voll ist, koennen Sie mich gern auch fuer den naechsten Termin vormerken."
    ]
  },
  "write-16": {
    pointChecks: [["14 uhr", "termin"], ["stau", "verspaetung"], ["14.20", "spaeter"], ["trotzdem", "moeglich"]],
    extras: [
      "Ich habe mich sofort gemeldet, weil ich weiss, dass Verspaetungen fuer Ihre Terminplanung schwierig sind.",
      "Wenn die Zeit heute nicht mehr reicht, vereinbare ich natuerlich auch gern direkt einen neuen Termin."
    ]
  },
  "write-17": {
    pointChecks: [["hausaufgabe", "nicht verstanden"], ["erklaerung", "bitte"], ["lernen", "besser"], ["nach dem unterricht", "gespraech"]],
    extras: [
      "Ich moechte die Aufgabe nicht einfach weglassen, sondern wirklich verstehen, wie ich die Saetze richtig bilden muss.",
      "Wenn Sie ein kurzes Beispiel fuer mich haben, kann ich zu Hause gezielt weiter ueben."
    ]
  },
  "write-18": {
    pointChecks: [["rechnung", "april"], ["hoeher", "46", "25"], ["pruefen", "bitte"], ["schriftlich", "e-mail"]],
    extras: [
      "Da ich meinen Vertrag normalerweise kaum anders nutze als in den Monaten davor, wundert mich diese hohe Summe sehr.",
      "Ich waere Ihnen dankbar, wenn Sie mir die einzelnen Kostenpunkte kurz erklaeren koennten."
    ]
  },
  "write-19": {
    pointChecks: [["name", "kurs", "vorstellen"], ["praktikum", "interessiere"], ["august", "zeitraum"], ["rueckmeldung", "antwort"]],
    extras: [
      "Ein Praktikum in Ihrem Unternehmen waere fuer mich besonders interessant, weil ich dort erste praktische Erfahrungen sammeln und mein Deutsch im Arbeitsalltag verbessern koennte.",
      "Wenn Sie weitere Unterlagen benoetigen, sende ich Ihnen diese gern zu."
    ]
  },
  "write-20": {
    pointChecks: [["veranstaltung", "freitag"], ["beginn", "wann"], ["eintritt", "preis"], ["reservierung", "plaetze"]],
    extras: [
      "Wir interessieren uns sehr fuer das Programm und moechten den Abend gut planen, deshalb wuerde ich mich ueber eine kurze Rueckmeldung freuen.",
      "Falls es besondere Hinweise fuer Gruppen gibt, teilen Sie mir diese bitte ebenfalls mit."
    ]
  },
  "write-21": {
    pointChecks: [["beratungstermin", "mittwoch", "14 uhr"], ["arzttermin", "grund"], ["neuen termin", "bitten"], ["telefonisch", "e mail", "erreichen"]],
    extras: [
      "Der Termin ist fuer mich wichtig, weil ich ueber meine weitere Ausbildung sprechen moechte und den Besuch deshalb nicht einfach ausfallen lassen will.",
      "Wenn es in der kommenden Woche mehrere freie Zeiten gibt, koennen Sie mir gern zwei oder drei Vorschlaege schicken."
    ]
  },
  "write-22": {
    pointChecks: [["geraete", "nicht", "tage"], ["seit", "einigen tagen"], ["reparieren", "bitte"], ["bescheid", "rueckmeldung"]],
    extras: [
      "Viele Mitglieder kommen genau wegen dieser Geraete in den Trainingsraum und muessen ihr Training im Moment immer wieder unterbrechen oder ganz aendern.",
      "Ich hoffe sehr, dass das Problem bald geloest wird, damit alle wieder normal trainieren koennen."
    ]
  },
  "write-23": {
    pointChecks: [["buergeramt", "termin"], ["10 uhr", "ankommen"], ["entschuldigen"], ["teammeeting", "aufgaben", "weiter"]],
    extras: [
      "Ich informiere Sie vorsichtshalber schon heute Abend, damit Sie morgen frueh besser planen koennen und mein spaeteres Kommen nicht ueberraschend ist.",
      "Sollte sich beim Amt noch etwas aendern, melde ich mich sofort noch einmal bei Ihnen."
    ]
  },
  "write-24": {
    pointChecks: [["busreise", "hamburg"], ["datum", "naechste reise"], ["preis", "kostet"], ["leistungen", "fruehstueck", "hotel"]],
    extras: [
      "Ich reise zum ersten Mal auf diese Weise und moechte deshalb vorher genau wissen, welche Leistungen bereits im Angebot enthalten sind.",
      "Ausserdem waere es fuer mich hilfreich zu erfahren, ob noch Plaetze frei sind und wie die Bezahlung funktioniert."
    ]
  }
};

export const writingPracticeScenarios: WritingPracticeScenario[] = baseWritingScenarios.map((scenario) => {
  const enhancement = scenarioEnhancements[scenario.id];
  if (!enhancement) {
    return {
      ...scenario,
      pointChecks: scenario.points.map((point) => point.toLowerCase().split(" ")),
      expandedSampleText: scenario.sampleText
    };
  }

  return {
    ...scenario,
    pointChecks: enhancement.pointChecks,
    expandedSampleText: insertExtras(scenario.sampleText, enhancement.extras)
  };
});

export function getWritingTaskSummary(taskId: string) {
  const scenario = writingPracticeScenarios.find((item) => item.id === taskId);
  if (!scenario) {
    return null;
  }

  return {
    title: scenario.title,
    prompt: scenario.situation
  };
}
