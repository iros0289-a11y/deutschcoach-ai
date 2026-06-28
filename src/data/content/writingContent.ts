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
    pointChecks: [["einladung", "samstag", "party"], ["leider", "kann", "nicht"], ["arbeit", "termin", "familie"], ["nächstes mal", "treffen", "glückwünsche"]],
    extras: [
      "Ich hätte Sie wirklich gern persönlich gesehen, weil ich mich immer freue, Zeit mit Ihnen und den anderen Gästen zu verbringen.",
      "Bitte grüßen Sie auch die anderen von mir und sagen Sie ihnen, dass ich beim nächsten Treffen gern wieder dabei bin."
    ]
  },
  "write-02": {
    pointChecks: [["lärm", "musik", "nacht"], ["seit", "mehreren", "gestern"], ["bitte", "leiser", "ruhe"], ["verständnis", "nachbarn", "danke"]],
    extras: [
      "Besonders für meine Kinder ist das schwierig, weil sie morgens früh zur Schule müssen und nachts nicht gut schlafen können.",
      "Ich möchte das Problem gern freundlich mit Ihnen lösen und hoffe deshalb auf Ihre Rücksicht."
    ]
  },
  "write-03": {
    pointChecks: [["deutschkurs", "interessiere"], ["niveau", "b1", "anfang"], ["uhrzeit", "kurszeiten", "abend"], ["information", "preis", "antwort"]],
    extras: [
      "Ich suche einen Kurs, der gut zu meinem Arbeitsalltag passt und mir besonders beim Schreiben und Sprechen weiterhilft.",
      "Falls es verschiedene Gruppen gibt, wäre ich Ihnen dankbar, wenn Sie mir auch kurz den Unterschied erklären könnten."
    ]
  },
  "write-04": {
    pointChecks: [["termin", "donnerstag", "10"], ["leider", "kann", "nicht"], ["neuen termin", "bitte"], ["telefonisch", "erreichen", "rückmeldung"]],
    extras: [
      "Da mir der Termin wichtig ist, möchte ich ihn nicht einfach absagen, sondern möglichst bald einen neuen Termin vereinbaren.",
      "Wenn es einfacher ist, können Sie mir auch zwei oder drei Vorschläge schicken, dann bestätige ich Ihnen sofort einen passenden Termin."
    ]
  },
  "write-05": {
    pointChecks: [["krank", "fieber", "erk", "schule"], ["montag", "dienstag", "zwei tage"], ["hausaufgaben", "nachholen"], ["verständnis", "danke"]],
    extras: [
      "Wir achten darauf, dass er den versäumten Stoff in den nächsten Tagen Schritt für Schritt nacharbeitet.",
      "Es wäre für uns sehr hilfreich, wenn Sie uns auch mitteilen könnten, ob es wichtige Informationen aus dem Unterricht gab."
    ]
  },
  "write-06": {
    pointChecks: [["heizung", "kalt", "funktioniert"], ["seit", "gestern", "heute"], ["reparatur", "bitte"], ["zu hause", "uhr", "vormittag"]],
    extras: [
      "Im Moment ist die Wohnung besonders am Abend sehr kalt, deshalb hoffe ich auf eine schnelle Lösung.",
      "Wenn Sie möchten, kann ich Ihnen auch kurz telefonisch erklären, was ich bereits selbst ausprobiert habe."
    ]
  },
  "write-07": {
    pointChecks: [["tochter", "kind", "drei jahre"], ["august", "ab"], ["öffnungszeiten"], ["rückmeldung", "antwort"]],
    extras: [
      "Da ich ab August wieder stärker arbeiten möchte, wäre eine rechtzeitige Planung für unsere Familie sehr wichtig.",
      "Falls aktuell kein Platz frei ist, würde ich mich auch über Informationen zu Ihrer Warteliste freuen."
    ]
  },
  "write-08": {
    pointChecks: [["mathematik", "hilfe"], ["7. klasse", "klasse"], ["preis", "kostet"], ["freie zeiten", "nachmittag"]],
    extras: [
      "Mein Sohn bemüht sich sehr, aber er braucht vor allem bei Textaufgaben und Brüchen noch zusätzliche Unterstützung.",
      "Uns wäre wichtig, dass der Unterricht regelmäßig stattfindet, damit er sich bis zum nächsten Zeugnis verbessern kann."
    ]
  },
  "write-09": {
    pointChecks: [["montag", "8 uhr", "termin"], ["arbeiten", "arbeit"], ["neuen termin", "bitte"], ["nachmittag", "15 uhr"]],
    extras: [
      "Leider habe ich für diesen Morgen kurzfristig einen wichtigen Termin bei der Arbeit bekommen und kann ihn nicht verschieben.",
      "Ich wäre Ihnen dankbar, wenn Sie mir einen Termin in den nächsten Tagen am Nachmittag anbieten könnten."
    ]
  },
  "write-10": {
    pointChecks: [["zug", "ausfall", "verspätung"], ["9.30", "ankunft", "später"], ["entschuldigen", "tut mir leid"], ["unterlagen", "besprechung"]],
    extras: [
      "Ich habe sofort nach einer anderen Verbindung gesucht, damit ich so schnell wie möglich im Büro sein kann.",
      "Falls vor meiner Ankunft schon etwas vorbereitet werden muss, bin ich bis dahin auch telefonisch erreichbar."
    ]
  },
  "write-11": {
    pointChecks: [["interessiere", "schwimmkurs"], ["beginn", "nächste kurs"], ["preis", "kosten"], ["ausrüstung", "mitbringen"]],
    extras: [
      "Ich möchte nach längerer Zeit wieder mit dem Schwimmen anfangen und suche deshalb einen Kurs für Erwachsene ohne große Vorkenntnisse.",
      "Wenn möglich, schreiben Sie mir bitte auch, ob es noch freie Plätze gibt und wie groß die Gruppe ist."
    ]
  },
  "write-12": {
    pointChecks: [["freitag", "sonntag", "reise"], ["hilfe", "bitte"], ["pflanzen", "gießen"], ["danke", "dankbar"]],
    extras: [
      "Ich stelle die Gießkanne vorher auf den Balkon, damit Sie nichts suchen müssen und es für Sie nicht zu umständlich ist.",
      "Wenn Sie selbst einmal Hilfe brauchen, können Sie natürlich auch jederzeit auf mich zukommen."
    ]
  },
  "write-13": {
    pointChecks: [["danke", "einladung"], ["spätschicht", "grund"], ["informationen", "bitte"], ["anrufen", "kontakt"]],
    extras: [
      "Es tut mir leid, dass ich an diesem wichtigen Termin nicht teilnehmen kann, denn ich spreche sonst gern persönlich mit den Lehrkräften.",
      "Vielleicht können wir bei Bedarf auch zu einem anderen Zeitpunkt kurz telefonieren."
    ]
  },
  "write-14": {
    pointChecks: [["bestellt", "sportschuhe", "39"], ["falsche größe", "37"], ["umtausch", "richtige größe"], ["antwort", "zurückschicken"]],
    extras: [
      "Da ich die Schuhe für den Sportunterricht meiner Tochter bald brauche, wäre eine schnelle Bearbeitung für mich besonders wichtig.",
      "Bitte teilen Sie mir auch mit, ob ich ein Rücksendelabel von Ihnen bekomme."
    ]
  },
  "write-15": {
    pointChecks: [["interessiere", "elternkurs"], ["freie plätze"], ["kinderbetreuung"], ["kontaktdaten", "telefonisch", "e-mail"]],
    extras: [
      "Ich möchte gern teilnehmen, weil ich mich über Erziehung und den Familienalltag mit anderen Eltern austauschen möchte.",
      "Falls der Juni-Kurs schon voll ist, können Sie mich gern auch für den nächsten Termin vormerken."
    ]
  },
  "write-16": {
    pointChecks: [["14 uhr", "termin"], ["stau", "verspätung"], ["14.20", "später"], ["trotzdem", "möglich"]],
    extras: [
      "Ich habe mich sofort gemeldet, weil ich weiß, dass Verspätungen für Ihre Terminplanung schwierig sind.",
      "Wenn die Zeit heute nicht mehr reicht, vereinbare ich natürlich auch gern direkt einen neuen Termin."
    ]
  },
  "write-17": {
    pointChecks: [["hausaufgabe", "nicht verstanden"], ["erklärung", "bitte"], ["lernen", "besser"], ["nach dem unterricht", "gespräch"]],
    extras: [
      "Ich möchte die Aufgabe nicht einfach weglassen, sondern wirklich verstehen, wie ich die Sätze richtig bilden muss.",
      "Wenn Sie ein kurzes Beispiel für mich haben, kann ich zu Hause gezielt weiter üben."
    ]
  },
  "write-18": {
    pointChecks: [["rechnung", "april"], ["höher", "46", "25"], ["prüfen", "bitte"], ["schriftlich", "e-mail"]],
    extras: [
      "Da ich meinen Vertrag normalerweise kaum anders nutze als in den Monaten davor, wundert mich diese hohe Summe sehr.",
      "Ich wäre Ihnen dankbar, wenn Sie mir die einzelnen Kostenpunkte kurz erklären könnten."
    ]
  },
  "write-19": {
    pointChecks: [["name", "kurs", "vorstellen"], ["praktikum", "interessiere"], ["august", "zeitraum"], ["rückmeldung", "antwort"]],
    extras: [
      "Ein Praktikum in Ihrem Unternehmen wäre für mich besonders interessant, weil ich dort erste praktische Erfahrungen sammeln und mein Deutsch im Arbeitsalltag verbessern könnte.",
      "Wenn Sie weitere Unterlagen benötigen, sende ich Ihnen diese gern zu."
    ]
  },
  "write-20": {
    pointChecks: [["veranstaltung", "freitag"], ["beginn", "wann"], ["eintritt", "preis"], ["reservierung", "plätze"]],
    extras: [
      "Wir interessieren uns sehr für das Programm und möchten den Abend gut planen, deshalb würde ich mich über eine kurze Rückmeldung freuen.",
      "Falls es besondere Hinweise für Gruppen gibt, teilen Sie mir diese bitte ebenfalls mit."
    ]
  },
  "write-21": {
    pointChecks: [["beratungstermin", "mittwoch", "14 uhr"], ["arzttermin", "grund"], ["neuen termin", "bitten"], ["telefonisch", "e mail", "erreichen"]],
    extras: [
      "Der Termin ist für mich wichtig, weil ich über meine weitere Ausbildung sprechen möchte und den Besuch deshalb nicht einfach ausfallen lassen will.",
      "Wenn es in der kommenden Woche mehrere freie Zeiten gibt, können Sie mir gern zwei oder drei Vorschläge schicken."
    ]
  },
  "write-22": {
    pointChecks: [["geräte", "nicht", "tage"], ["seit", "einigen tagen"], ["reparieren", "bitte"], ["bescheid", "rückmeldung"]],
    extras: [
      "Viele Mitglieder kommen genau wegen dieser Geräte in den Trainingsraum und müssen ihr Training im Moment immer wieder unterbrechen oder ganz ändern.",
      "Ich hoffe sehr, dass das Problem bald gelöst wird, damit alle wieder normal trainieren können."
    ]
  },
  "write-23": {
    pointChecks: [["bürgeramt", "termin"], ["10 uhr", "ankommen"], ["entschuldigen"], ["teammeeting", "aufgaben", "weiter"]],
    extras: [
      "Ich informiere Sie vorsichtshalber schon heute Abend, damit Sie morgen früh besser planen können und mein späteres Kommen nicht überraschend ist.",
      "Sollte sich beim Amt noch etwas ändern, melde ich mich sofort noch einmal bei Ihnen."
    ]
  },
  "write-24": {
    pointChecks: [["busreise", "hamburg"], ["datum", "nächste reise"], ["preis", "kostet"], ["leistungen", "frühstueck", "hotel"]],
    extras: [
      "Ich reise zum ersten Mal auf diese Weise und möchte deshalb vorher genau wissen, welche Leistungen bereits im Angebot enthalten sind.",
      "Außerdem wäre es für mich hilfreich zu erfahren, ob noch Plätze frei sind und wie die Bezahlung funktioniert."
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
