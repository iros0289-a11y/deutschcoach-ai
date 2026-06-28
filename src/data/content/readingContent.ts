export type ChoiceOption = {
  id: string;
  label: string;
  text: string;
};

export type ReadingFeedback = {
  correctReason: string;
  incorrectReasonByOption: Record<string, string>;
  learningTip: string;
  examFocus: string;
};

export type ReadingAd = {
  id: string;
  title: string;
  body: string;
  contact: string;
};

export type ReadingMatchingSituation = {
  id: string;
  text: string;
  correctId: string;
  correctReason: string;
  incorrectReasonByOption: Record<string, string>;
  learningTip: string;
  examFocus: string;
};

export type ReadingMatchingTask = {
  id: string;
  title: string;
  instruction: string;
  ads: ReadingAd[];
  situations: ReadingMatchingSituation[];
};

export type ReadingBuildingLevel = {
  id: string;
  name: string;
  places: string[];
};

export type ReadingBuildingTask = {
  id: string;
  title: string;
  buildingName: string;
  instruction: string;
  levels: ReadingBuildingLevel[];
  situations: ReadingMatchingSituation[];
};

export type ReadingDualQuestionTask = {
  id: string;
  format: string;
  title: string;
  sourceTitle: string;
  text: string;
  statement: {
    text: string;
    correctAnswer: boolean;
    correctReason: string;
    incorrectReason: string;
  };
  question: string;
  options: ChoiceOption[];
  correctOptionId: string;
  feedback: ReadingFeedback;
};

export type ReadingGapTextTask = {
  id: string;
  title: string;
  topic: string;
  instruction: string;
  segments: string[];
  gaps: Array<{
    id: string;
    label: string;
    options: ChoiceOption[];
    correctOptionId: string;
    clue: string;
    wrongChoiceGuidance: string;
  }>;
  learningTip: string;
  examFocus: string;
};

export const readingMatchingTask: ReadingMatchingTask = {
  id: "reading-match-01",
  title: "Anzeigen zuordnen",
  instruction: "Welche Anzeige passt zu welcher Situation? Ordnen Sie die beste Anzeige zu.",
  ads: [
    {
      id: "ad-a",
      title: "Deutsch am Abend",
      body: "Berufssprachkurs fuer Erwachsene. Dienstag und Donnerstag von 18 bis 20 Uhr. Schwerpunkt: Telefonieren, E Mails und Gespraeche im Beruf.",
      contact: "sprachhaus-bonn.de"
    },
    {
      id: "ad-b",
      title: "WG-Zimmer mit Busanbindung",
      body: "16 Quadratmeter, moebliert, ab sofort frei. Supermarkt und Bushaltestelle direkt vor dem Haus. Nur fuer Nichtraucher.",
      contact: "0176 344 1022"
    },
    {
      id: "ad-c",
      title: "Kinderfahrrad gesucht",
      body: "Familie sucht ein gut erhaltenes Fahrrad fuer ein achtjaehriges Kind. Bitte nur Angebote aus dem Raum Koeln.",
      contact: "familie-kaya@mail.de"
    },
    {
      id: "ad-d",
      title: "Nachhilfe Mathematik",
      body: "Erfahrene Lehrerin bietet Nachhilfe fuer Klasse 5 bis 10. Unterricht am Nachmittag oder online am Abend.",
      contact: "0221 882214"
    },
    {
      id: "ad-e",
      title: "Flohmarkt im Innenhof",
      body: "Samstag von 10 bis 15 Uhr. Kleidung, Geschirr, Spielzeug und kleine Moebel. Kaffee und Kuchen gibt es auch.",
      contact: "Innenhof der Lindenstrasse 12"
    },
    {
      id: "ad-f",
      title: "Teilzeitkraft im Cafe",
      body: "Cafe am Markt sucht freundliche Servicekraft fuer drei Vormittage pro Woche. Gute Deutschkenntnisse sind wichtig.",
      contact: "bewerbung@cafe-am-markt.de"
    }
  ],
  situations: [
    {
      id: "reading-match-s1",
      text: "Sie arbeiten tagsueber und moechten Ihr Deutsch fuer den Beruf verbessern.",
      correctId: "ad-a",
      correctReason: "Nur Anzeige A verbindet Berufsdeutsch mit Abendzeiten fuer Erwachsene.",
      incorrectReasonByOption: {
        "ad-b": "Ein Zimmer passt nicht zu einem Sprachkurswunsch.",
        "ad-c": "Hier wird ein Fahrrad gesucht, kein Kurs angeboten.",
        "ad-d": "Nachhilfe in Mathematik hilft nicht beim Deutsch fuer den Beruf.",
        "ad-e": "Ein Flohmarkt ist keine Lernmoeglichkeit.",
        "ad-f": "Das ist ein Jobangebot und kein Sprachkurs."
      },
      learningTip: "Pruefen Sie bei Anzeigen immer Thema, Zielgruppe und Uhrzeit zusammen.",
      examFocus: "Darauf sollten Sie in der DTZ-Pruefung achten: Die beste Anzeige passt inhaltlich und organisatorisch."
    },
    {
      id: "reading-match-s2",
      text: "Sie suchen eine kleine Wohnung oder ein Zimmer und moechten ohne Auto gut in die Stadt kommen.",
      correctId: "ad-b",
      correctReason: "Anzeige B bietet ein WG Zimmer und nennt direkt die gute Busanbindung.",
      incorrectReasonByOption: {
        "ad-a": "Ein Kurs ersetzt keine Wohnmoeglichkeit.",
        "ad-c": "Diese Anzeige sucht selbst etwas und bietet kein Zimmer an.",
        "ad-d": "Nachhilfe ist kein Wohnangebot.",
        "ad-e": "Ein Flohmarkt ist nur eine Veranstaltung.",
        "ad-f": "Ein Jobangebot loest nicht die Wohnungsfrage."
      },
      learningTip: "Suchen Sie nach Schluesselwoertern wie Zimmer, moebliert, frei oder Bushaltestelle.",
      examFocus: "Darauf sollten Sie in der DTZ-Pruefung achten: Oft reicht ein einzelnes Schlagwort nicht; mehrere Details muessen passen."
    },
    {
      id: "reading-match-s3",
      text: "Ihr Sohn braucht Hilfe in Mathematik, und der Unterricht soll nach der Schule stattfinden.",
      correctId: "ad-d",
      correctReason: "Nur Anzeige D nennt Nachhilfe in Mathematik und Zeiten am Nachmittag.",
      incorrectReasonByOption: {
        "ad-a": "Es geht dort um Deutsch im Beruf, nicht um Mathe fuer Schueler.",
        "ad-b": "Ein WG Zimmer hilft dem Kind nicht bei Mathe.",
        "ad-c": "Hier wird ein Fahrrad gesucht.",
        "ad-e": "Ein Flohmarkt bietet keinen Unterricht.",
        "ad-f": "Das ist eine Stelle im Service und keine Nachhilfe."
      },
      learningTip: "Bei Schulthemen sind Fach, Klasse und Uhrzeit oft die wichtigsten Informationen.",
      examFocus: "Darauf sollten Sie in der DTZ-Pruefung achten: Angebote fuer Erwachsene und fuer Kinder muessen sauber getrennt werden."
    },
    {
      id: "reading-match-s4",
      text: "Sie suchen eine kleine Arbeit fuer einige Vormittage in der Woche und sprechen gern mit Menschen.",
      correctId: "ad-f",
      correctReason: "Anzeige F beschreibt genau eine Teilzeitstelle an drei Vormittagen mit Kontakt zu Gaesten.",
      incorrectReasonByOption: {
        "ad-a": "Der Sprachkurs ist keine bezahlte Arbeit.",
        "ad-b": "Ein Zimmer ist kein Job.",
        "ad-c": "Die Anzeige ist eine Suchanzeige fuer ein Fahrrad.",
        "ad-d": "Hier wird Unterricht angeboten, keine Servicearbeit.",
        "ad-e": "Der Flohmarkt ist eine einzelne Veranstaltung und keine regelmaessige Stelle."
      },
      learningTip: "Achten Sie bei Jobanzeigen auf Umfang, Arbeitszeit und geforderte Faehigkeiten.",
      examFocus: "Darauf sollten Sie in der DTZ-Pruefung achten: Verwechseln Sie kein einmaliges Ereignis mit einem festen Job."
    }
  ]
};

export const readingBuildingTask: ReadingBuildingTask = {
  id: "reading-building-01",
  title: "Gebaeudeplan zuordnen",
  buildingName: "Buergerzentrum Nord",
  instruction: "Lesen Sie die Informationen und ordnen Sie die richtige Etage zu.",
  levels: [
    {
      id: "level-0",
      name: "Erdgeschoss",
      places: ["Information", "Wartebereich", "Kasse"]
    },
    {
      id: "level-1",
      name: "1. Stock",
      places: ["Meldeamt", "Passstelle", "Familienservice"]
    },
    {
      id: "level-2",
      name: "2. Stock",
      places: ["Jobberatung", "Bewerbungsservice", "Sprachfoerderung"]
    },
    {
      id: "level-3",
      name: "3. Stock",
      places: ["Schuldnerberatung", "Sozialdienst", "Seniorenbuero"]
    },
    {
      id: "level-4",
      name: "4. Stock",
      places: ["Veranstaltungssaal", "Seminarraeume", "Elterncafe"]
    }
  ],
  situations: [
    {
      id: "reading-building-s1",
      text: "Herr Arslan muss einen neuen Personalausweis beantragen.",
      correctId: "level-1",
      correctReason: "Die Passstelle liegt im 1. Stock, dort werden neue Ausweisdokumente bearbeitet.",
      incorrectReasonByOption: {
        "level-0": "Im Erdgeschoss gibt es nur Information, Wartebereich und Kasse.",
        "level-2": "Dort geht es um Arbeit und Sprache, nicht um Ausweise.",
        "level-3": "Beratungsstellen helfen hier bei sozialen Fragen, nicht bei Dokumenten.",
        "level-4": "Im 4. Stock finden Veranstaltungen statt."
      },
      learningTip: "Bei Gebaeudeplaenen hilft es, das gesuchte Anliegen in ein Schluesselwort zu uebersetzen, hier: Ausweis.",
      examFocus: "Darauf sollten Sie in der DTZ-Pruefung achten: Die richtige Etage erkennt man oft an einem Fachbegriff wie Passstelle oder Meldeamt."
    },
    {
      id: "reading-building-s2",
      text: "Frau Demir sucht Hilfe fuer eine Bewerbung und moechte ihren Lebenslauf verbessern.",
      correctId: "level-2",
      correctReason: "Im 2. Stock befinden sich Jobberatung und Bewerbungsservice.",
      incorrectReasonByOption: {
        "level-0": "Unten gibt es keine Arbeitsberatung.",
        "level-1": "Dort werden Dokumente und Familienfragen bearbeitet.",
        "level-3": "Der 3. Stock ist fuer Sozial- und Schuldnerberatung.",
        "level-4": "Seminarraeume und Elterncafe helfen nicht direkt beim Lebenslauf."
      },
      learningTip: "Achten Sie auf Woerter wie Bewerbung, Arbeit oder Lebenslauf. Sie fuehren oft direkt zur passenden Stelle.",
      examFocus: "Darauf sollten Sie in der DTZ-Pruefung achten: Ein Gesuch nach Arbeit gehoert nicht automatisch ins Erdgeschoss oder zur Information."
    },
    {
      id: "reading-building-s3",
      text: "Ein Senior moechte sich ueber Freizeitangebote fuer aeltere Menschen informieren.",
      correctId: "level-3",
      correctReason: "Im 3. Stock liegt das Seniorenbuero. Dort gibt es Angebote und Beratung fuer aeltere Menschen.",
      incorrectReasonByOption: {
        "level-0": "Die Information kann nur weiterleiten, ist aber nicht die eigentliche Fachstelle.",
        "level-1": "Der 1. Stock ist fuer Meldeamt, Passstelle und Familienservice.",
        "level-2": "Im 2. Stock stehen Beruf und Sprache im Mittelpunkt.",
        "level-4": "Veranstaltungsraeume sind nicht automatisch das Seniorenbuero."
      },
      learningTip: "Pruefen Sie, ob die Person Informationen, ein Formular oder eine Veranstaltung sucht. Das ist nicht dasselbe.",
      examFocus: "Darauf sollten Sie in der DTZ-Pruefung achten: Fachstellen sind oft besser als allgemeine Infopunkte."
    }
  ]
};

export const readingDualQuestionTasks: ReadingDualQuestionTask[] = [
  {
    id: "reading-dual-01",
    format: "E-Mail",
    title: "Nachricht von der Hausverwaltung",
    sourceTitle: "E-Mail der Hausverwaltung Morgenstern",
    text:
      "Sehr geehrte Mieterinnen und Mieter,\n\nam kommenden Mittwoch, den 14. August, werden im Haus Lindenweg 6 Wartungsarbeiten an der Heizungsanlage durchgefuehrt. Deshalb wird das warme Wasser voraussichtlich zwischen 8 Uhr und 14 Uhr abgestellt. Bitte lassen Sie in dieser Zeit die Heizkoerper ausgeschaltet und sorgen Sie dafuer, dass der Zugang zum Keller frei bleibt, damit die Handwerker ohne Verzoegerung arbeiten koennen.\n\nFalls Sie an diesem Tag Besuch von einem Pflegedienst oder anderen Dienstleistern erwarten, informieren Sie diese bitte ueber die Arbeiten. Bei Fragen erreichen Sie uns bis Dienstag um 17 Uhr telefonisch oder per E-Mail.\n\nMit freundlichen Gruessen\nIhre Hausverwaltung",
    statement: {
      text: "Am Mittwoch gibt es fuer einige Stunden kein warmes Wasser.",
      correctAnswer: true,
      correctReason: "Die E-Mail sagt deutlich, dass das warme Wasser von 8 Uhr bis 14 Uhr abgestellt wird.",
      incorrectReason: "Die Aussage ist richtig, weil die Unterbrechung des warmen Wassers im ersten Absatz direkt genannt wird."
    },
    question: "Was sollen die Mieterinnen und Mieter zusaetzlich beachten?",
    options: [
      { id: "a", label: "A", text: "Sie sollen den Keller frei zugÃ¤nglich lassen." },
      { id: "b", label: "B", text: "Sie sollen am Mittwoch zu Hause bleiben." },
      { id: "c", label: "C", text: "Sie sollen die Reparatur selbst bezahlen." }
    ],
    correctOptionId: "a",
    feedback: {
      correctReason: "Im Text steht, dass der Zugang zum Keller frei bleiben soll, damit die Handwerker arbeiten koennen.",
      incorrectReasonByOption: {
        b: "Niemand muss zu Hause bleiben. Im Text wird nur auf den freien Zugang zum Keller hingewiesen.",
        c: "Von Kosten oder eigener Bezahlung steht in der E-Mail nichts."
      },
      learningTip: "Lesen Sie bei E-Mails nicht nur das Hauptproblem, sondern auch konkrete Handlungsanweisungen.",
      examFocus: "Darauf sollten Sie in der DTZ-Pruefung achten: Nebensaetze mit damit oder bitte enthalten oft die Antwort."
    }
  },
  {
    id: "reading-dual-02",
    format: "Aushang",
    title: "Aushang im Sprachzentrum",
    sourceTitle: "Information im Foyer des Sprachzentrums",
    text:
      "Wichtige Information fuer alle Teilnehmenden des Abendkurses B1:\n\nAb Montag, dem 2. September, findet der Unterricht nicht mehr in Raum 204 statt. Wegen Umbauarbeiten zieht der Kurs fuer etwa drei Wochen in Raum 118 im Erdgeschoss um. Die Unterrichtszeiten bleiben unveraendert: Montag und Mittwoch von 18.15 Uhr bis 20.30 Uhr. Bitte kommen Sie in den ersten Tagen einige Minuten frueher, weil die neue Anwesenheitsliste vor dem Unterricht unterschrieben werden muss.\n\nLehrmaterialien, die bereits gekauft wurden, koennen weiter benutzt werden. Wer noch kein Kursbuch hat, kann am Montag vor Unterrichtsbeginn im Sekretariat ein Exemplar kaufen.",
    statement: {
      text: "Die Unterrichtszeiten des Abendkurses aendern sich im September.",
      correctAnswer: false,
      correctReason: "Die Aussage ist falsch. Im Aushang steht ausdruecklich, dass die Unterrichtszeiten unveraendert bleiben.",
      incorrectReason: "Wenn Sie falsch gewaehlt haben, haben Sie richtig erkannt, dass nur der Raum wechselt, nicht die Zeit."
    },
    question: "Warum sollen die Teilnehmenden am Anfang frueher kommen?",
    options: [
      { id: "a", label: "A", text: "Weil zuerst ein neuer Sprachtest geschrieben wird." },
      { id: "b", label: "B", text: "Weil sie vor dem Unterricht eine Liste unterschreiben muessen." },
      { id: "c", label: "C", text: "Weil das Sekretariat frueher schliesst." }
    ],
    correctOptionId: "b",
    feedback: {
      correctReason: "Im Text steht, dass in den ersten Tagen vor dem Unterricht die neue Anwesenheitsliste unterschrieben werden muss.",
      incorrectReasonByOption: {
        a: "Ein Sprachtest wird nirgends erwaehnt.",
        c: "Die Schliesszeit des Sekretariats ist fuer diesen Hinweis nicht der Grund."
      },
      learningTip: "Bei Aushaengen steckt der Grund oft direkt nach weil oder da.",
      examFocus: "Darauf sollten Sie in der DTZ-Pruefung achten: Raumwechsel, Zeit und Zusatzaufgaben muessen sauber getrennt werden."
    }
  },
  {
    id: "reading-dual-03",
    format: "Fahrplan",
    title: "Verbindung zum Flughafen",
    sourceTitle: "Auszug aus dem Fahrplan Bonn Hauptbahnhof - Flughafen",
    text:
      "Linie RE 8\nBonn Hbf ab 08:12 - Troisdorf 08:29 - Flughafen Terminal 08:41\nBonn Hbf ab 08:42 - Troisdorf 08:59 - Flughafen Terminal 09:11\nBonn Hbf ab 09:12 - Troisdorf 09:29 - Flughafen Terminal 09:41\n\nLinie S 13\nBonn Hbf ab 08:25 - Beuel 08:31 - Flughafen Terminal 08:57\nBonn Hbf ab 08:55 - Beuel 09:01 - Flughafen Terminal 09:27\n\nHinweis: Der RE 8 faehrt schneller, die S 13 haelt an mehr Stationen.",
    statement: {
      text: "Die S 13 braucht laenger bis zum Flughafen als der RE 8.",
      correctAnswer: true,
      correctReason: "Der RE 8 von 08:12 bis 08:41 braucht 29 Minuten. Die S 13 von 08:25 bis 08:57 braucht 32 Minuten und ist damit langsamer.",
      incorrectReason: "Die Aussage ist richtig. Das sieht man am direkten Zeitvergleich und am Hinweis unter dem Fahrplan."
    },
    question: "Welche Verbindung bringt Sie nach 9 Uhr zuerst zum Flughafen?",
    options: [
      { id: "a", label: "A", text: "RE 8 um 08:42" },
      { id: "b", label: "B", text: "S 13 um 08:55" },
      { id: "c", label: "C", text: "RE 8 um 09:12" }
    ],
    correctOptionId: "a",
    feedback: {
      correctReason: "Der RE 8 um 08:42 kommt um 09:11 an und ist damit die erste Verbindung nach 9 Uhr.",
      incorrectReasonByOption: {
        b: "Die S 13 um 08:55 kommt erst um 09:24 an und ist spaeter.",
        c: "Der RE 8 um 09:12 erreicht den Flughafen erst um 09:41."
      },
      learningTip: "Vergleichen Sie bei Fahrplaenen immer Abfahrts- und Ankunftszeit. Nur die Abfahrt reicht nicht.",
      examFocus: "Darauf sollten Sie in der DTZ-Pruefung achten: Bei Fahrplaenen wird oft nach der fruehesten passenden Ankunft gefragt."
    }
  },
  {
    id: "reading-dual-04",
    format: "E-Mail",
    title: "Nachricht aus dem Kindergarten",
    sourceTitle: "E-Mail der Kita Regenbogen",
    text:
      "Liebe Eltern,\n\nam Donnerstag macht unsere Gruppe einen Ausflug in den Stadtpark. Bitte bringen Sie Ihr Kind spaetestens um 8.15 Uhr in die Kita, weil der Bus schon um 8.30 Uhr abfaehrt. Denken Sie auch an wetterfeste Kleidung, eine Trinkflasche und ein kleines Fruehstueck ohne Schokolade. Das Mittagessen bekommen die Kinder wie gewohnt in der Kita, wenn wir gegen 13 Uhr zurueck sind.\n\nFalls Ihr Kind an diesem Tag Medikamente braucht, sprechen Sie bitte spaetestens bis Mittwoch mit uns. Bei starkem Regen faellt der Ausflug nicht aus; wir besuchen dann stattdessen das Kindermuseum.\n\nViele Gruesse\nIhr Kita-Team",
    statement: {
      text: "Die Kinder essen mittags im Stadtpark.",
      correctAnswer: false,
      correctReason: "Die Aussage ist falsch. Im Text steht, dass das Mittagessen wie gewohnt in der Kita stattfindet, wenn die Gruppe zurueck ist.",
      incorrectReason: "Wenn Sie falsch gewaehlt haben, haben Sie richtig erkannt, dass nur das Fruehstueck mitgenommen wird."
    },
    question: "Was sollen die Eltern zusaetzlich beachten?",
    options: [
      { id: "a", label: "A", text: "Sie sollen eine warme Mahlzeit mitgeben." },
      { id: "b", label: "B", text: "Sie sollen bei Medikamenten vorher mit der Kita sprechen." },
      { id: "c", label: "C", text: "Sie sollen ihr Kind erst um 8.30 Uhr bringen." }
    ],
    correctOptionId: "b",
    feedback: {
      correctReason: "Im letzten Absatz steht, dass Eltern bei Medikamenten spaetestens bis Mittwoch mit der Kita sprechen sollen.",
      incorrectReasonByOption: {
        a: "Eine warme Mahlzeit ist nicht noetig. Das Mittagessen gibt es spaeter in der Kita.",
        c: "8.30 Uhr ist zu spaet, weil der Bus dann schon abfaehrt."
      },
      learningTip: "Achten Sie bei E-Mails an Eltern auf Uhrzeiten, Mitbringsachen und Sonderhinweise am Ende des Textes.",
      examFocus: "Darauf sollten Sie in der DTZ-Pruefung achten: Oft steht die eigentliche Zusatzinformation nicht am Anfang, sondern im letzten Absatz."
    }
  },
  {
    id: "reading-dual-05",
    format: "Aushang",
    title: "Information im Fitnessstudio",
    sourceTitle: "Aushang am Empfang",
    text:
      "Wichtige Information fuer alle Mitglieder:\n\nVon Montag, 7. Oktober, bis Freitag, 11. Oktober, wird der grosse Kursraum im ersten Stock renoviert. Deshalb finden alle Gruppenangebote in dieser Woche in anderen Raeumen statt. Yoga am Montag und Mittwoch beginnt wie gewohnt um 18 Uhr, jetzt aber im Bewegungsraum neben dem Empfang. Der Rueckenkurs am Dienstag startet eine halbe Stunde spaeter, also erst um 19.30 Uhr, weil das Trainerteam vorher noch Geraete umstellen muss.\n\nMitglieder, die in dieser Woche nur an Kursen teilnehmen, duerfen kostenlos auch den Saunabereich benutzen. Aktuelle Raumplaene liegen am Empfang aus.",
    statement: {
      text: "Der Rueckenkurs beginnt in dieser Woche frueher als sonst.",
      correctAnswer: false,
      correctReason: "Die Aussage ist falsch. Im Aushang steht, dass der Rueckenkurs eine halbe Stunde spaeter startet.",
      incorrectReason: "Wenn Sie falsch gewaehlt haben, haben Sie die Schluesselstelle erst um 19.30 Uhr richtig gelesen."
    },
    question: "Warum beginnt der Rueckenkurs spaeter?",
    options: [
      { id: "a", label: "A", text: "Weil zuerst ein neuer Raumplan ausliegt." },
      { id: "b", label: "B", text: "Weil vorher Geraete umgestellt werden." },
      { id: "c", label: "C", text: "Weil der Trainer krank ist." }
    ],
    correctOptionId: "b",
    feedback: {
      correctReason: "Der Grund steht direkt im Text: Das Trainerteam muss vorher noch Geraete umstellen.",
      incorrectReasonByOption: {
        a: "Der Raumplan liegt nur am Empfang aus, ist aber nicht der Grund fuer die spaetere Uhrzeit.",
        c: "Von Krankheit steht im Aushang nichts."
      },
      learningTip: "Bei Aushaengen helfen Signalwoerter wie deshalb, weil und also besonders schnell zur Loesung.",
      examFocus: "Darauf sollten Sie in der DTZ-Pruefung achten: Verwechseln Sie eine Organisationsinfo nicht mit dem eigentlichen Grund."
    }
  }
];

export const readingGapTextTasks: ReadingGapTextTask[] = [
  {
    id: "reading-gap-01",
    title: "Information vor dem Elternabend",
    topic: "Schule",
    instruction: "Lesen Sie den Text. Waehlen Sie fuer jede Luecke die passende Antwort A, B oder C.",
    segments: [
      "Naechste Woche findet an der Grundschule Sonnenblick ein Elternabend fuer die neuen ersten Klassen statt. Der Abend beginnt ",
      " in der Aula. Dort erhalten die Eltern Informationen ueber Unterrichtszeiten, Materiallisten und die ersten Projekttage. ",
      " werden auch Fragen zum Schulweg und zur Mittagsbetreuung besprochen. Deshalb bittet die Schule alle Familien, schon einige Minuten frueher zu kommen, ",
      " sie sich vor dem offiziellen Beginn in eine Liste eintragen muessen. Fuer juengere Geschwister gibt es in dieser Zeit eine Spielecke im Nebenraum; die Betreuung ist ",
      ". Wer eine Uebersetzung in Arabisch oder Tuerkisch benoetigt, kann das bis Dienstag im Sekretariat melden, ",
      " die Schule die passenden Unterlagen vorbereiten kann."
    ],
    gaps: [
      {
        id: "gap-1",
        label: "1",
        options: [
          { id: "a", label: "A", text: "um 18 Uhr" },
          { id: "b", label: "B", text: "am 18 Uhr" },
          { id: "c", label: "C", text: "im 18 Uhr" }
        ],
        correctOptionId: "a",
        clue: "Nach beginnt braucht man eine Zeitangabe mit um. Deshalb ist um 18 Uhr grammatisch und inhaltlich richtig.",
        wrongChoiceGuidance: "Die anderen Antworten benutzen die falsche Praeposition. Bei Uhrzeiten steht im Deutschen hier um."
      },
      {
        id: "gap-2",
        label: "2",
        options: [
          { id: "a", label: "A", text: "Ausserdem" },
          { id: "b", label: "B", text: "Trotzdem" },
          { id: "c", label: "C", text: "Danach" }
        ],
        correctOptionId: "a",
        clue: "Hier wird ein weiterer Inhalt des Elternabends ergaenzt. Ausserdem passt als verbindendes Signalwort.",
        wrongChoiceGuidance: "Trotzdem wuerde einen Gegensatz ausdruecken, den es hier nicht gibt. Danach passt nicht, weil keine Reihenfolge beschrieben wird."
      },
      {
        id: "gap-3",
        label: "3",
        options: [
          { id: "a", label: "A", text: "obwohl" },
          { id: "b", label: "B", text: "damit" },
          { id: "c", label: "C", text: "weil" }
        ],
        correctOptionId: "c",
        clue: "Nach deshalb wird der Grund fuer das fruehe Kommen genannt. Mit weil wird dieser Grund korrekt eingeleitet.",
        wrongChoiceGuidance: "Obwohl drueckt einen Gegensatz aus. Damit beschreibt eher ein Ziel und passt hier nicht direkt zur Begruendung."
      },
      {
        id: "gap-4",
        label: "4",
        options: [
          { id: "a", label: "A", text: "kostenlos" },
          { id: "b", label: "B", text: "kostenlose" },
          { id: "c", label: "C", text: "Kosten" }
        ],
        correctOptionId: "a",
        clue: "Nach ist steht ein Adjektiv als Praedikativ: Die Betreuung ist kostenlos.",
        wrongChoiceGuidance: "Kostenlose braucht noch ein Nomen. Kosten ist ein Nomen und passt nicht hinter ist."
      },
      {
        id: "gap-5",
        label: "5",
        options: [
          { id: "a", label: "A", text: "falls" },
          { id: "b", label: "B", text: "damit" },
          { id: "c", label: "C", text: "ob" }
        ],
        correctOptionId: "b",
        clue: "Hier wird das Ziel der Rueckmeldung beschrieben: damit die Schule Unterlagen vorbereiten kann.",
        wrongChoiceGuidance: "Falls wuerde eine Bedingung ausdruecken. Ob passt nicht, weil hier kein indirekter Fragesatz folgt."
      }
    ],
    learningTip: "Pruefen Sie bei jeder Luecke zuerst die Grammatik: Praeposition, Verbform, Konnektor oder Adjektiv.",
    examFocus: "Darauf sollten Sie in der DTZ-Pruefung achten: Schauen Sie immer links und rechts von der Luecke. Dort sehen Sie oft, welche Wortart fehlt."
  },
  {
    id: "reading-gap-02",
    title: "Ankommen im neuen Job",
    topic: "Arbeit",
    instruction: "Lesen Sie den Text. Waehlen Sie fuer jede Luecke die passende Antwort A, B oder C.",
    segments: [
      "Viele Menschen freuen sich auf ihre erste Arbeitswoche, sind aber gleichzeitig unsicher. Ein guter Start gelingt leichter, wenn man sich frueh informiert und Fragen stellt. Viele Betriebe planen ",
      " am ersten Tag ein Einfuehrungsgespraech. So wissen neue Mitarbeitende sofort, wer fuer welche Themen zustaendig ist. ",
      " ist es sinnvoll, Arbeitszeiten, Pausenregeln und wichtige Telefonnummern gleich am Anfang zu notieren, ",
      " man spaeter alles leichter nachlesen kann. Wer etwas nicht verstanden hat, sollte lieber noch einmal nachfragen, ",
      " Fehler zu wiederholen. Das zeigt Interesse und hilft, Missverstaendnisse zu vermeiden. Dann fuehlen sich neue Kolleginnen und Kollegen ",
      " sicherer."
    ],
    gaps: [
      {
        id: "gap-1",
        label: "1",
        options: [
          { id: "a", label: "A", text: "deshalb" },
          { id: "b", label: "B", text: "obwohl" },
          { id: "c", label: "C", text: "trotzdem" }
        ],
        correctOptionId: "a",
        clue: "Der zweite Satz nennt den Grund, daraus folgt deshalb eine passende Konsequenz.",
        wrongChoiceGuidance: "Obwohl und trotzdem markieren einen Gegensatz. Im Text geht es hier aber um eine logische Folge."
      },
      {
        id: "gap-2",
        label: "2",
        options: [
          { id: "a", label: "A", text: "Trotzdem" },
          { id: "b", label: "B", text: "Ausserdem" },
          { id: "c", label: "C", text: "Zuerst" }
        ],
        correctOptionId: "b",
        clue: "Nach einem ersten Tipp folgt ein weiterer. Ausserdem verbindet diese beiden Hinweise logisch.",
        wrongChoiceGuidance: "Trotzdem passt nicht, weil kein Gegensatz vorliegt. Zuerst wuerde eine Reihenfolge anfangen, die der Text hier nicht nutzt."
      },
      {
        id: "gap-3",
        label: "3",
        options: [
          { id: "a", label: "A", text: "weil" },
          { id: "b", label: "B", text: "damit" },
          { id: "c", label: "C", text: "ob" }
        ],
        correctOptionId: "b",
        clue: "Hier wird das Ziel des Notierens genannt. Damit leitet eine Zielangabe korrekt ein.",
        wrongChoiceGuidance: "Weil erklaert einen Grund, nicht ein Ziel. Ob passt nur zu indirekten Fragen."
      },
      {
        id: "gap-4",
        label: "4",
        options: [
          { id: "a", label: "A", text: "statt" },
          { id: "b", label: "B", text: "ohne" },
          { id: "c", label: "C", text: "waehrend" }
        ],
        correctOptionId: "a",
        clue: "Die feste Verbindung lautet: statt Fehler zu wiederholen. Sie beschreibt die bessere Alternative.",
        wrongChoiceGuidance: "Ohne und waehrend passen semantisch nicht zu der Vergleichaussage im Satz."
      },
      {
        id: "gap-5",
        label: "5",
        options: [
          { id: "a", label: "A", text: "schnell" },
          { id: "b", label: "B", text: "schneller" },
          { id: "c", label: "C", text: "am schnellsten" }
        ],
        correctOptionId: "b",
        clue: "Mit fuehlen sich ... sicherer braucht der Satz den Komparativ schneller.",
        wrongChoiceGuidance: "Schnell ist kein Vergleich. Am schnellsten wuerde hier grammatisch und inhaltlich zu stark wirken."
      }
    ],
    learningTip: "Achten Sie bei Lueckentexten auch auf feste Verbindungen wie statt zu, um zu oder damit.",
    examFocus: "Darauf sollten Sie in der DTZ-Pruefung achten: Oft prueft der Lueckentext nicht nur den Inhalt, sondern auch kleine Grammatiksignale."
  },
  {
    id: "reading-gap-03",
    title: "Termin in der Arztpraxis",
    topic: "Arzt",
    instruction: "Lesen Sie den Text. Waehlen Sie fuer jede Luecke die passende Antwort A, B oder C.",
    segments: [
      "Ich brauchte letzte Woche dringend einen Termin beim Hausarzt, ",
      " ich seit zwei Tagen starke Rueckenschmerzen hatte. Am Telefon sagte die Sprechstundenhilfe, dass am Mittwoch um 11 Uhr noch ein Termin ",
      ". Sie bat mich, meine Versicherungskarte mitzubringen und ",
      " zehn Minuten frueher da zu sein. Im Wartezimmer musste ich zuerst ein kurzes Formular ausfuellen, ",
      " ich in diesem Quartal noch nicht in der Praxis gewesen war. Nach der Untersuchung bekam ich ein Rezept und den Rat, mich in den naechsten Tagen viel zu ",
      "."
    ],
    gaps: [
      {
        id: "gap-1",
        label: "1",
        options: [
          { id: "a", label: "A", text: "weil" },
          { id: "b", label: "B", text: "obwohl" },
          { id: "c", label: "C", text: "damit" }
        ],
        correctOptionId: "a",
        clue: "Die Rueckenschmerzen sind der Grund fuer den Termin. Deshalb passt weil.",
        wrongChoiceGuidance: "Obwohl wuerde einen Gegensatz ausdruecken. Damit beschreibt ein Ziel und passt hier nicht."
      },
      {
        id: "gap-2",
        label: "2",
        options: [
          { id: "a", label: "A", text: "frei war" },
          { id: "b", label: "B", text: "frei ist" },
          { id: "c", label: "C", text: "frei gewesen" }
        ],
        correctOptionId: "a",
        clue: "Der Telefonanruf liegt in der Vergangenheit. Darum passt die Vergangenheitsform frei war.",
        wrongChoiceGuidance: "Frei ist passt zeitlich nicht. Frei gewesen ist hier unvollstaendig und klingt grammatisch falsch."
      },
      {
        id: "gap-3",
        label: "3",
        options: [
          { id: "a", label: "A", text: "am" },
          { id: "b", label: "B", text: "etwa" },
          { id: "c", label: "C", text: "seit" }
        ],
        correctOptionId: "b",
        clue: "Die feste Formulierung lautet etwa zehn Minuten frueher.",
        wrongChoiceGuidance: "Am und seit passen grammatisch nicht vor eine Zeitspanne dieser Art."
      },
      {
        id: "gap-4",
        label: "4",
        options: [
          { id: "a", label: "A", text: "deshalb" },
          { id: "b", label: "B", text: "weil" },
          { id: "c", label: "C", text: "wenn" }
        ],
        correctOptionId: "b",
        clue: "Hier wird der Grund fuer das Formular genannt. Diesen Grund leitet weil ein.",
        wrongChoiceGuidance: "Deshalb braucht einen neuen Hauptsatz. Wenn drueckt eine Bedingung aus und passt nicht."
      },
      {
        id: "gap-5",
        label: "5",
        options: [
          { id: "a", label: "A", text: "ruhen" },
          { id: "b", label: "B", text: "Ruhe" },
          { id: "c", label: "C", text: "geruht" }
        ],
        correctOptionId: "a",
        clue: "Nach sich viel zu ... folgt der Infinitiv. Daher ist ruhen richtig.",
        wrongChoiceGuidance: "Ruhe ist ein Nomen. Geruht ist eine Partizipform und passt hier nicht."
      }
    ],
    learningTip: "Achten Sie auf Zeitformen und feste Wendungen wie etwa zehn Minuten oder sich ausruhen.",
    examFocus: "Darauf sollten Sie in der DTZ-Pruefung achten: Bei kurzen Woertern entscheidet oft die Grammatik ueber die richtige Antwort."
  },
  {
    id: "reading-gap-04",
    title: "Meldung an die Hausverwaltung",
    topic: "Wohnung",
    instruction: "Lesen Sie den Text. Waehlen Sie fuer jede Luecke die passende Antwort A, B oder C.",
    segments: [
      "Seit dem starken Regen am Wochenende tropft in unserer Wohnung Wasser von der Decke, ",
      " besonders im Flur und im Schlafzimmer. Ich habe das Problem sofort der Hausverwaltung gemeldet und auch Fotos geschickt, ",
      " der Schaden gut dokumentiert ist. Die Mitarbeiterin am Telefon sagte, dass ein Handwerker am naechsten Morgen vorbeikommen ",
      ". Bis dahin sollten wir die betroffenen Moebel von der Wand wegstellen und ",
      " Teppich im Schlafzimmer hochrollen. Zum Glueck kam der Handwerker puenktlich und konnte das Loch im Dach schnell ",
      "."
    ],
    gaps: [
      {
        id: "gap-1",
        label: "1",
        options: [
          { id: "a", label: "A", text: "und" },
          { id: "b", label: "B", text: "oder" },
          { id: "c", label: "C", text: "denn" }
        ],
        correctOptionId: "a",
        clue: "Hier werden zwei betroffene Orte einfach verbunden. Das leistet und.",
        wrongChoiceGuidance: "Oder wuerde eine Alternative ausdruecken. Denn erklaert einen Grund, der hier nicht gemeint ist."
      },
      {
        id: "gap-2",
        label: "2",
        options: [
          { id: "a", label: "A", text: "dass" },
          { id: "b", label: "B", text: "damit" },
          { id: "c", label: "C", text: "ob" }
        ],
        correctOptionId: "b",
        clue: "Die Fotos wurden geschickt, damit der Schaden dokumentiert ist. Es geht um den Zweck.",
        wrongChoiceGuidance: "Dass wuerde hier keinen sinnvollen Nebensatz bilden. Ob gehoert zu indirekten Fragen."
      },
      {
        id: "gap-3",
        label: "3",
        options: [
          { id: "a", label: "A", text: "kommt" },
          { id: "b", label: "B", text: "komme" },
          { id: "c", label: "C", text: "koenne" }
        ],
        correctOptionId: "c",
        clue: "Nach sagte, dass ... folgt hier die indirekte Wiedergabe mit koenne.",
        wrongChoiceGuidance: "Kommt und komme passen nicht zur indirekten Aussage nach sagte, dass."
      },
      {
        id: "gap-4",
        label: "4",
        options: [
          { id: "a", label: "A", text: "den" },
          { id: "b", label: "B", text: "dem" },
          { id: "c", label: "C", text: "der" }
        ],
        correctOptionId: "a",
        clue: "Teppich ist maskulin und steht als Akkusativobjekt. Deshalb braucht man den.",
        wrongChoiceGuidance: "Dem ist Dativ, der ist Nominativ oder feminin. Beides passt hier nicht."
      },
      {
        id: "gap-5",
        label: "5",
        options: [
          { id: "a", label: "A", text: "reparieren" },
          { id: "b", label: "B", text: "Reparatur" },
          { id: "c", label: "C", text: "repariert" }
        ],
        correctOptionId: "a",
        clue: "Nach konnte ... schnell steht der Infinitiv reparieren.",
        wrongChoiceGuidance: "Reparatur ist ein Nomen. Repariert ist hier keine passende Verbform."
      }
    ],
    learningTip: "Bei Artikeln, Nebensaetzen und Infinitiven lohnt sich ein genauer Blick auf das Wort direkt davor.",
    examFocus: "Darauf sollten Sie in der DTZ-Pruefung achten: Viele Luecken lassen sich loesen, wenn Sie Satzbau und Kasus pruefen."
  }
];

export function getReadingTaskSummary(taskId: string) {
  const matching = readingMatchingTask.situations.find((item) => item.id === taskId);
  if (matching) {
    return { title: "Lesen - Anzeigen zuordnen", prompt: matching.text };
  }

  const building = readingBuildingTask.situations.find((item) => item.id === taskId);
  if (building) {
    return { title: "Lesen - Gebaeudeplan", prompt: building.text };
  }

  const dual = readingDualQuestionTasks.find((item) => item.id === taskId);
  if (dual) {
    return { title: dual.title, prompt: dual.question };
  }

  const dualStatement = readingDualQuestionTasks.find((item) => `${item.id}-statement` === taskId);
  if (dualStatement) {
    return { title: `${dualStatement.title} - Aussage`, prompt: dualStatement.statement.text };
  }

  const gap = readingGapTextTasks.find((item) => item.id === taskId);
  if (gap) {
    return { title: gap.title, prompt: gap.instruction };
  }

  return null;
}

