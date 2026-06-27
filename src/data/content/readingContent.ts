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
  options: ChoiceOption[];
  gaps: Array<{
    id: string;
    label: string;
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
      { id: "a", label: "A", text: "Sie sollen den Keller frei zugänglich lassen." },
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
  }
];

export const readingGapTextTasks: ReadingGapTextTask[] = [
  {
    id: "reading-gap-01",
    title: "Information vor dem Elternabend",
    topic: "Schule",
    instruction: "Lesen Sie den Text. Ordnen Sie die Antworten A bis E den Luecken 1 bis 5 zu.",
    segments: [
      "Naechste Woche findet an der Grundschule Sonnenblick ein Elternabend fuer die neuen ersten Klassen statt. Die Schulleitung moechte den Familien erklaeren, wie der Schulstart organisiert wird. ",
      " Dort erhalten die Eltern Informationen ueber Unterrichtszeiten, Materiallisten und die ersten Projekttage. ",
      " Deshalb bittet die Schule alle Familien, schon einige Minuten frueher zu kommen. ",
      " Fuer juengere Geschwister gibt es in dieser Zeit eine Spielecke im Nebenraum. ",
      " Wer eine Uebersetzung in Arabisch oder Tuerkisch benoetigt, kann das bis Dienstag im Sekretariat melden. ",
      " So kann das Team die passenden Unterlagen vorbereiten."
    ],
    options: [
      { id: "a", label: "A", text: "Der Abend beginnt um 18 Uhr in der Aula." },
      { id: "b", label: "B", text: "Vor dem offiziellen Beginn muessen sich alle in eine Liste eintragen." },
      { id: "c", label: "C", text: "Auch Fragen zum Schulweg und zur Mittagsbetreuung werden besprochen." },
      { id: "d", label: "D", text: "Die Eltern muessen fuer die Kinderbetreuung nichts bezahlen." },
      { id: "e", label: "E", text: "Die Schule muss wissen, fuer wie viele Familien Sprachhilfe vorbereitet werden soll." }
    ],
    gaps: [
      {
        id: "gap-1",
        label: "1",
        correctOptionId: "a",
        clue: "Nach der Einleitung fehlt eine konkrete Information zu Zeit und Ort.",
        wrongChoiceGuidance: "Wenn Sie hier etwas zu Betreuung oder Inhalten einsetzen, fehlt der logische Anschluss zur Einladung."
      },
      {
        id: "gap-2",
        label: "2",
        correctOptionId: "c",
        clue: "Hier passt eine inhaltliche Ergaenzung zu den Themen des Abends.",
        wrongChoiceGuidance: "Zeit- oder Organisationssaetze passen hier weniger gut, weil schon von Informationen gesprochen wird."
      },
      {
        id: "gap-3",
        label: "3",
        correctOptionId: "b",
        clue: "Das Wort deshalb signalisiert einen Grund fuer das fruehere Kommen.",
        wrongChoiceGuidance: "Nur eine Antwort erklaert direkt, warum man frueher da sein soll."
      },
      {
        id: "gap-4",
        label: "4",
        correctOptionId: "d",
        clue: "Nach der Spielecke passt eine Zusatzinformation zur Betreuung.",
        wrongChoiceGuidance: "Hier muss der Satz thematisch noch bei den Geschwistern bleiben."
      },
      {
        id: "gap-5",
        label: "5",
        correctOptionId: "e",
        clue: "Nach dem Hinweis auf Uebersetzung passt eine Erklaerung, warum die Rueckmeldung wichtig ist.",
        wrongChoiceGuidance: "Hier muss ein Satz stehen, der logisch an Sprachhilfe und Vorbereitung anschliesst."
      }
    ],
    learningTip: "Bei Lueckentexten pruefen Sie immer zuerst, welche Art Satz fehlt: Ort, Grund, Zusatzinformation oder Gegensatz.",
    examFocus: "Darauf sollten Sie in der DTZ-Pruefung achten: Lesen Sie auch den Satz vor und nach der Luecke. Dort liegt meist der entscheidende Hinweis."
  },
  {
    id: "reading-gap-02",
    title: "Ankommen im neuen Job",
    topic: "Arbeit",
    instruction: "Lesen Sie den Text. Ordnen Sie die Antworten A bis E den Luecken 1 bis 5 zu.",
    segments: [
      "Viele Menschen freuen sich auf ihre erste Arbeitswoche, sind aber gleichzeitig unsicher. Ein guter Start gelingt leichter, wenn man sich frueh informiert und Fragen stellt. ",
      " So wissen neue Mitarbeitende sofort, wer fuer welche Themen zustaendig ist. ",
      " Ausserdem ist es sinnvoll, Arbeitszeiten, Pausenregeln und wichtige Telefonnummern gleich am Anfang zu notieren. ",
      " Wer etwas nicht verstanden hat, sollte lieber noch einmal nachfragen, statt Fehler zu wiederholen. ",
      " Das zeigt Interesse und hilft, Missverstaendnisse zu vermeiden. ",
      " Dann fuehlen sich neue Kolleginnen und Kollegen schneller sicherer."
    ],
    options: [
      { id: "a", label: "A", text: "Dazu gehoert zum Beispiel auch ein kurzer Rundgang durch die Abteilung." },
      { id: "b", label: "B", text: "Viele Betriebe planen deshalb am ersten Tag ein Einfuehrungsgespraech." },
      { id: "c", label: "C", text: "Manche glauben, dass Fragen ein Zeichen von Schwäche sind." },
      { id: "d", label: "D", text: "Ebenso wichtig ist ein freundlicher Umgang mit dem Team." },
      { id: "e", label: "E", text: "Hilfreich ist auch, sich wichtige Arbeitsschritte kurz aufzuschreiben." }
    ],
    gaps: [
      {
        id: "gap-1",
        label: "1",
        correctOptionId: "b",
        clue: "Nach der allgemeinen Aussage ueber einen guten Start passt ein typischer erster Schritt im Betrieb.",
        wrongChoiceGuidance: "Ein Satz ueber die Probezeit oder Schwaeche passt hier noch nicht logisch."
      },
      {
        id: "gap-2",
        label: "2",
        correctOptionId: "a",
        clue: "Das Wort so braucht einen Bezug auf etwas Konkretes, das direkt davor genannt wird.",
        wrongChoiceGuidance: "Hier muss eine Massnahme stehen, durch die man Kolleginnen und Kollegen und Ablaeufe kennenlernt."
      },
      {
        id: "gap-3",
        label: "3",
        correctOptionId: "e",
        clue: "Nach Arbeitszeiten und Telefonnummern passt ein weiterer praktischer Tipp fuer den Start.",
        wrongChoiceGuidance: "Hier wird noch kein Kontrast gesucht, sondern eine alltagstaugliche Empfehlung."
      },
      {
        id: "gap-4",
        label: "4",
        correctOptionId: "c",
        clue: "Vor dem Rat zum Nachfragen passt ein verbreiteter Irrtum.",
        wrongChoiceGuidance: "Wenn Sie hier schon die Wirkung des Nachfragens einsetzen, fehlt der gedankliche Kontrast."
      },
      {
        id: "gap-5",
        label: "5",
        correctOptionId: "d",
        clue: "Zum Schluss passt eine weitere soziale Empfehlung fuer die Zusammenarbeit im Team.",
        wrongChoiceGuidance: "Hier rundet ein Satz zum Verhalten im Team den Text logisch ab."
      }
    ],
    learningTip: "Nutzen Sie bei Lueckentexten neben dem Inhalt auch Signalwoerter wie deshalb, ausserdem, ebenso oder so.",
    examFocus: "Darauf sollten Sie in der DTZ-Pruefung achten: Manche Aufgaben pruefen auch, ob Sie eine unlogische Aussage sicher ausschliessen koennen."
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
