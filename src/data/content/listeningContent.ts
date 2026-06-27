export type ChoiceOption = {
  id: string;
  label: string;
  text: string;
};

export type ListeningFeedback = {
  correctTitle: string;
  correctReason: string;
  learningTip: string;
  incorrectReasonByOption: Record<string, string>;
  examFocus: string;
};

export type ListeningPartOneTask = {
  id: string;
  part: "Teil 1";
  title: string;
  topic: string;
  transcript: string;
  durationLabel: string;
  question: string;
  options: ChoiceOption[];
  correctOptionId: string;
  feedback: ListeningFeedback;
  statement: {
    id: string;
    text: string;
    correctAnswer: boolean;
    correctReason: string;
    incorrectReason: string;
    learningTip: string;
    examFocus: string;
  };
};

export type ListeningPartTwoTask = {
  id: string;
  personLabel: string;
  transcript: string;
  durationLabel: string;
  prompt: string;
  correctOptionId: string;
  correctReason: string;
  incorrectReasonByOption: Record<string, string>;
  learningTip: string;
  examFocus: string;
};

export type ListeningPartTwoSet = {
  id: string;
  part: "Teil 2";
  title: string;
  topic: string;
  instruction: string;
  options: ChoiceOption[];
  tasks: ListeningPartTwoTask[];
};

export type ListeningPartThreeTask = {
  id: string;
  part: "Teil 3";
  title: string;
  topic: string;
  transcript: string;
  durationLabel: string;
  question: string;
  options: ChoiceOption[];
  correctOptionId: string;
  feedback: ListeningFeedback;
};

export const listeningPartOneTasks: ListeningPartOneTask[] = [
  {
    id: "listen-p1-01",
    part: "Teil 1",
    title: "Termin in der Arztpraxis",
    topic: "Arzt",
    transcript:
      "Praxis Dr. Wegner, guten Morgen. Guten Morgen, hier ist Frau Celik. Ich hatte fuer morgen um neun Uhr einen Termin, aber mein Sohn hat heute Nacht hohes Fieber bekommen. Kann ich bitte schon heute kommen? Heute ist um sechzehn Uhr noch etwas frei. Ja, das passt. Vielen Dank.",
    durationLabel: "00:33",
    question: "Warum ruft Frau Celik in der Praxis an?",
    options: [
      { id: "a", label: "A", text: "Sie moechte ein Rezept bestellen." },
      { id: "b", label: "B", text: "Sie moechte einen frueheren Termin bekommen." },
      { id: "c", label: "C", text: "Sie moechte die Rechnung bezahlen." }
    ],
    correctOptionId: "b",
    feedback: {
      correctTitle: "Richtig",
      correctReason:
        "Frau Celik sagt, dass ihr Sohn hohes Fieber hat und sie statt morgen schon heute kommen moechte. Es geht also um einen frueheren Termin.",
      learningTip:
        "Achten Sie im Hoeren auf Verben wie absagen, verschieben, frueher kommen oder spaeter kommen. Sie zeigen oft direkt die richtige Funktion des Gespraechs.",
      incorrectReasonByOption: {
        a: "Von einem Rezept ist im Gespraech keine Rede. Das Thema ist nur der Termin wegen des kranken Kindes.",
        c: "Niemand spricht ueber Geld oder eine Rechnung. Diese Antwort passt inhaltlich nicht zum Anruf."
      },
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Die richtige Antwort steht oft im Anlass des Anrufs, nicht nur in einzelnen Woertern."
    },
    statement: {
      id: "listen-p1-01-statement",
      text: "Der urspruengliche Termin war morgen frueh.",
      correctAnswer: true,
      correctReason: "Frau Celik sagt deutlich: Ich hatte fuer morgen um neun Uhr einen Termin.",
      incorrectReason: "Die Aussage ist richtig, weil der urspruengliche Termin explizit fuer morgen um neun Uhr genannt wird.",
      learningTip:
        "Merken Sie sich bei Terminaufgaben immer Tag und Uhrzeit. Diese Details werden in richtig/falsch-Aussagen haeufig abgefragt.",
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Zeitangaben wie morgen, heute, um neun oder um sechzehn sind typische Schluesselinformationen."
    }
  },
  {
    id: "listen-p1-02",
    part: "Teil 1",
    title: "Anruf aus der Kita",
    topic: "Familie",
    transcript:
      "Hallo, hier ist die Kita Sonnenweg. Spreche ich mit Herrn Yildiz? Ja. Ihre Tochter Elif fuehlt sich nicht gut und hat Bauchschmerzen. Koennen Sie sie frueher abholen? Ich bin noch bei der Arbeit. Meine Schwester ist in zwanzig Minuten dort. Gut, dann warten wir mit Elif im Buero.",
    durationLabel: "00:32",
    question: "Wer holt Elif aus der Kita ab?",
    options: [
      { id: "a", label: "A", text: "Ihr Vater kommt sofort selbst." },
      { id: "b", label: "B", text: "Eine Erzieherin bringt sie nach Hause." },
      { id: "c", label: "C", text: "Die Schwester des Vaters kommt." }
    ],
    correctOptionId: "c",
    feedback: {
      correctTitle: "Richtig",
      correctReason:
        "Der Vater sagt, dass seine Schwester in zwanzig Minuten dort ist. Sie wird Elif also abholen.",
      learningTip:
        "Bei Familiengespraechen lohnt es sich, auf Pronomen und Besitzformen zu achten: meine Schwester, sein Bruder, ihre Mutter.",
      incorrectReasonByOption: {
        a: "Der Vater sagt gerade, dass er noch bei der Arbeit ist. Deshalb kann er nicht selbst kommen.",
        b: "Die Kita bietet nur an zu warten. Niemand sagt, dass eine Erzieherin das Kind nach Hause bringt."
      },
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Wer etwas macht, erkennt man oft erst im zweiten Teil des Dialogs."
    },
    statement: {
      id: "listen-p1-02-statement",
      text: "Elif bleibt noch kurz in der Kita.",
      correctAnswer: true,
      correctReason: "Die Erzieherin sagt: Dann warten wir mit Elif im Buero.",
      incorrectReason: "Die Aussage ist richtig, weil Elif nicht sofort abgeholt wird, sondern noch dort wartet.",
      learningTip:
        "Wenn Sie richtig/falsch entscheiden, vergleichen Sie die Aussage sehr genau mit dem letzten Satz des Hoertexts.",
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Der Schluss eines Dialogs enthaelt oft die Entscheidung oder das Ergebnis."
    }
  },
  {
    id: "listen-p1-03",
    part: "Teil 1",
    title: "Schicht auf der Arbeit",
    topic: "Arbeit",
    transcript:
      "Guten Abend, Frau Aksoy. Morgen beginnt Ihre Schicht ausnahmsweise erst um zehn Uhr, nicht wie sonst um sieben. Am Vormittag wird zuerst die neue Maschine erklaert. Alles klar, dann bin ich kurz vor zehn da. Bitte denken Sie an Sicherheitsschuhe. Danke fuer die Info.",
    durationLabel: "00:30",
    question: "Warum kommt Frau Aksoy morgen spaeter zur Arbeit?",
    options: [
      { id: "a", label: "A", text: "Weil sie Urlaub genommen hat." },
      { id: "b", label: "B", text: "Weil zuerst eine Einweisung stattfindet." },
      { id: "c", label: "C", text: "Weil die Firma geschlossen bleibt." }
    ],
    correctOptionId: "b",
    feedback: {
      correctTitle: "Richtig",
      correctReason:
        "Im Hoertext wird erklaert, dass am Vormittag zuerst die neue Maschine erklaert wird. Deshalb beginnt die Schicht spaeter.",
      learningTip:
        "Achten Sie auf Signale wie weil, deshalb, zuerst oder ausnahmsweise. Sie erklaeren oft den Grund.",
      incorrectReasonByOption: {
        a: "Urlaub wird nicht erwaehnt. Frau Aksoy soll ja gerade kommen, nur spaeter als sonst.",
        c: "Die Firma ist nicht geschlossen. Es findet sogar eine Einweisung fuer eine neue Maschine statt."
      },
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Gruende werden haeufig mit weil oder deshalb markiert."
    },
    statement: {
      id: "listen-p1-03-statement",
      text: "Frau Aksoy soll ihre Arbeit morgen wie immer um sieben Uhr beginnen.",
      correctAnswer: false,
      correctReason: "Diese Aussage ist falsch. Im Text heisst es ausdruecklich: erst um zehn Uhr, nicht wie sonst um sieben.",
      incorrectReason: "Wenn Sie falsch angekreuzt haben, haben Sie die Gegenueberstellung von zehn Uhr und sieben Uhr richtig erkannt.",
      learningTip:
        "Vergleichen Sie bei Zeitangaben immer die neue Information mit der gewohnten Situation. Genau dort steckt oft die Falle.",
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Woerter wie nicht, erst oder statt zeigen oft, dass eine Aussage falsch ist."
    }
  },
  {
    id: "listen-p1-04",
    part: "Teil 1",
    title: "Durchsage am Bahnhof",
    topic: "Bahnhof",
    transcript:
      "Achtung am Gleis vier. Der Regionalexpress nach Koeln faehrt heute zehn Minuten spaeter ab. Der Zug nach Koblenz auf Gleis sechs ist puenktlich. Reisende nach Koeln nutzen bitte weiterhin Gleis vier.",
    durationLabel: "00:22",
    question: "Was erfahren die Reisenden nach Koeln?",
    options: [
      { id: "a", label: "A", text: "Ihr Zug faehrt von einem anderen Gleis." },
      { id: "b", label: "B", text: "Ihr Zug hat eine kurze Verspaetung." },
      { id: "c", label: "C", text: "Ihr Zug faellt heute aus." }
    ],
    correctOptionId: "b",
    feedback: {
      correctTitle: "Richtig",
      correctReason:
        "Die Durchsage sagt klar: Der Regionalexpress nach Koeln faehrt heute zehn Minuten spaeter ab. Es geht also um eine Verspaetung.",
      learningTip:
        "Bei Bahnhofsdurchsagen sind Zielort, Gleis und Zeit die drei wichtigsten Informationen. Halten Sie diese mental getrennt.",
      incorrectReasonByOption: {
        a: "Gerade das wird verneint. Reisende nach Koeln sollen weiterhin Gleis vier benutzen.",
        c: "Von einem Ausfall ist keine Rede. Es gibt nur eine Verspaetung von zehn Minuten."
      },
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Lassen Sie sich nicht von einem zweiten Zug oder einem anderen Zielort verwirren."
    },
    statement: {
      id: "listen-p1-04-statement",
      text: "Der Zug nach Koblenz ist puenktlich.",
      correctAnswer: true,
      correctReason: "Im zweiten Satz sagt die Durchsage genau das: Der Zug nach Koblenz auf Gleis sechs ist puenktlich.",
      incorrectReason: "Die Aussage ist richtig, weil die Durchsage die Puenktlichkeit des Zuges nach Koblenz direkt bestaetigt.",
      learningTip:
        "Wenn mehrere Orte oder Zuege genannt werden, ordnen Sie jede Information sofort dem richtigen Ziel zu.",
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: In Bahnhofstexten stehen oft zwei aehnliche Informationen nebeneinander. Nur eine passt zur Aussage."
    }
  },
  {
    id: "listen-p1-05",
    part: "Teil 1",
    title: "Paket beim Nachbarn",
    topic: "Nachbarn",
    transcript:
      "Hallo Frau Santos, hier ist Ihr Nachbar Herr Baum. Ein Paket fuer Sie wurde heute bei mir abgegeben. Ich bin jetzt noch zu Hause und spaeter noch einmal zwischen achtzehn und zwanzig Uhr erreichbar. Super, dann komme ich nach der Arbeit vorbei.",
    durationLabel: "00:23",
    question: "Wann kann Frau Santos ihr Paket abholen?",
    options: [
      { id: "a", label: "A", text: "Nur am Vormittag." },
      { id: "b", label: "B", text: "Nur vor achtzehn Uhr." },
      { id: "c", label: "C", text: "Auch am Abend zwischen achtzehn und zwanzig Uhr." }
    ],
    correctOptionId: "c",
    feedback: {
      correctTitle: "Richtig",
      correctReason:
        "Herr Baum sagt, dass er spaeter noch einmal zwischen achtzehn und zwanzig Uhr erreichbar ist. Dieses Zeitfenster passt.",
      learningTip:
        "Bei Abholzeiten hilft es, auf Woerter wie noch einmal, spaeter oder zwischen zu achten.",
      incorrectReasonByOption: {
        a: "Der Nachbar nennt extra noch einen zweiten Zeitraum am Abend. Die Abholung ist also nicht nur vormittags moeglich.",
        b: "Gerade das Gegenteil steht im Text: Auch nach der Arbeit, also am Abend, ist eine Abholung moeglich."
      },
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Zeitfenster werden oft indirekt beschrieben, zum Beispiel nach der Arbeit oder spaeter noch einmal."
    },
    statement: {
      id: "listen-p1-05-statement",
      text: "Frau Santos will das Paket nach der Arbeit holen.",
      correctAnswer: true,
      correctReason: "Sie sagt am Ende selbst: Dann komme ich nach der Arbeit vorbei.",
      incorrectReason: "Die Aussage ist richtig, weil Frau Santos ausdruecklich eine Abholung nach der Arbeit ankundigt.",
      learningTip:
        "Auch die Antwort der zweiten Person kann entscheidend sein. Hoeren Sie bis ganz zum Schluss aufmerksam zu.",
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Oft bestaetigt die zweite Person die korrekte Loesung mit einem kurzen Schlusssatz."
    }
  },
  {
    id: "listen-p1-06",
    part: "Teil 1",
    title: "Elternabend in der Schule",
    topic: "Schule",
    transcript:
      "Liebe Eltern der Klasse 6b, der Elternabend am Donnerstag findet nicht im Musikraum statt, sondern online. Beginn ist wie geplant um neunzehn Uhr. Den Link schicken wir Ihnen morgen per E Mail. Bei technischen Problemen melden Sie sich bitte im Sekretariat.",
    durationLabel: "00:28",
    question: "Was hat sich beim Elternabend geaendert?",
    options: [
      { id: "a", label: "A", text: "Der Termin wurde abgesagt." },
      { id: "b", label: "B", text: "Der Beginn wurde auf morgen verschoben." },
      { id: "c", label: "C", text: "Die Veranstaltung findet nicht mehr vor Ort statt." }
    ],
    correctOptionId: "c",
    feedback: {
      correctTitle: "Richtig",
      correctReason:
        "Die Nachricht erklaert, dass der Elternabend nicht im Musikraum, sondern online stattfindet. Geaendert hat sich also der Ort beziehungsweise die Form.",
      learningTip:
        "Wenn Sie nicht ... sondern ... hoeren, steckt die richtige Antwort oft genau in diesem Gegensatz.",
      incorrectReasonByOption: {
        a: "Der Elternabend wird nicht abgesagt. Er findet statt, nur in anderer Form.",
        b: "Die Uhrzeit bleibt gleich. Es wird nur gesagt, dass der Link morgen per E Mail geschickt wird."
      },
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Trennen Sie Termin, Uhrzeit und Ort klar voneinander."
    },
    statement: {
      id: "listen-p1-06-statement",
      text: "Der Link zum Elternabend kommt noch am selben Tag.",
      correctAnswer: false,
      correctReason: "Die Aussage ist falsch. Im Text steht, dass der Link erst morgen per E Mail geschickt wird.",
      incorrectReason: "Wenn Sie falsch markiert haben, haben Sie den Zeitunterschied zwischen heute und morgen richtig verstanden.",
      learningTip:
        "Achten Sie bei digitalen Terminen besonders auf kleine Zeitwoerter wie heute, morgen oder spaeter.",
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Kleine Zeitangaben entscheiden oft ueber richtig oder falsch."
    }
  }
];

export const listeningPartTwoSet: ListeningPartTwoSet = {
  id: "listen-p2-set-01",
  part: "Teil 2",
  title: "Welcher Kurs passt?",
  topic: "Freizeit und Alltag",
  instruction:
    "Sie hoeren sechs Personen. Welche Aussage A bis F passt am besten zu der Person? Jede Aussage passt nur einmal.",
  options: [
    { id: "a", label: "A", text: "Ein Abendkurs fuer Berufstaetige, die ihr Deutsch im Beruf verbessern wollen." },
    { id: "b", label: "B", text: "Ein Eltern-Kind-Schwimmkurs am Samstagvormittag." },
    { id: "c", label: "C", text: "Ein Computerkurs fuer Anfaenger mit einfacher Bedienung." },
    { id: "d", label: "D", text: "Ein Kochkurs mit guenstigen Gerichten fuer Familien." },
    { id: "e", label: "E", text: "Ein Fahrradtraining fuer Erwachsene, die unsicher im Strassenverkehr sind." },
    { id: "f", label: "F", text: "Ein Bewegungskurs fuer Seniorinnen und Senioren am Nachmittag." }
  ],
  tasks: [
    {
      id: "listen-p2-01",
      personLabel: "Person 1",
      transcript:
        "Ich arbeite bis siebzehn Uhr in einer Baeckerei und spreche im Laden oft mit Kunden. Ich verstehe schon viel, aber am Telefon bin ich noch unsicher. Einen Kurs am Vormittag kann ich nicht besuchen.",
      durationLabel: "00:24",
      prompt: "Welche Aussage passt zu Person 1?",
      correctOptionId: "a",
      correctReason:
        "Die Person arbeitet und braucht besonders sprachliche Sicherheit im Beruf. Ausserdem ist nur ein Abendkurs moeglich.",
      incorrectReasonByOption: {
        b: "Die Person sucht keinen Kurs fuer Kinder oder Schwimmen.",
        c: "Es geht nicht um Computer, sondern um Deutsch im Berufsalltag.",
        d: "Kochen spielt in der Aussage keine Rolle.",
        e: "Die Person erwaehnt keine Unsicherheit beim Fahrradfahren.",
        f: "Die Person ist berufstaetig und sucht keinen Seniorenkurs am Nachmittag."
      },
      learningTip:
        "Hoeren Sie bei Zuordnungsaufgaben immer auf zwei Ebenen: Thema und Uhrzeit. Beides muss passen.",
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Die beste Loesung passt inhaltlich und organisatorisch zugleich."
    },
    {
      id: "listen-p2-02",
      personLabel: "Person 2",
      transcript:
        "Meine Tochter ist fuenf Jahre alt und liebt Wasser. Ich moechte gern am Wochenende etwas mit ihr zusammen machen. Unter der Woche schaffen wir das nicht, weil ich bis spaet arbeite.",
      durationLabel: "00:22",
      prompt: "Welche Aussage passt zu Person 2?",
      correctOptionId: "b",
      correctReason:
        "Hier werden ein Kind, gemeinsames Lernen und ein Termin am Wochenende genannt. Das passt genau zum Eltern-Kind-Schwimmkurs.",
      incorrectReasonByOption: {
        a: "Es geht nicht um einen Berufssprachkurs.",
        c: "Computer werden nicht erwaehnt.",
        d: "Gemeinsames Kochen ist nicht das Ziel; wichtig sind Kind, Wochenende und Wasser.",
        e: "Die Person spricht nicht ueber Strassenverkehr oder Fahrradfahren.",
        f: "Ein Seniorenkurs passt weder zum Alter des Kindes noch zum Wunsch nach gemeinsamer Aktivitaet."
      },
      learningTip:
        "Markieren Sie gedanklich Hinweise auf Familie, Alter und Tageszeit. Diese Kombination fuehrt oft direkt zur passenden Aussage.",
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Einzelne Schluesselwoerter reichen nicht. Die ganze Situation muss zusammenpassen."
    },
    {
      id: "listen-p2-03",
      personLabel: "Person 3",
      transcript:
        "Seit kurzem habe ich einen Laptop, aber ich weiss nicht einmal, wie ich E Mails schreibe oder Dokumente speichere. Alles soll langsam erklaert werden. Ich habe bisher noch nie mit solchen Programmen gearbeitet.",
      durationLabel: "00:22",
      prompt: "Welche Aussage passt zu Person 3?",
      correctOptionId: "c",
      correctReason:
        "Die Person ist absolute Anfaengerin oder absoluter Anfaenger am Computer und braucht einfache Erklaerungen.",
      incorrectReasonByOption: {
        a: "Das Problem ist technisch, nicht sprachlich.",
        b: "Es geht weder um Kinder noch um Schwimmen.",
        d: "Kochen wird nicht angesprochen.",
        e: "Fahrradfahren und Verkehr sind kein Thema.",
        f: "Das Alter wird nicht genannt; wichtig ist die fehlende Computererfahrung."
      },
      learningTip:
        "Bei Zuordnungsaufgaben helfen Verben wie speichern, schreiben, erklaeren oder lernen, um das Thema genauer zu erkennen.",
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Eine Aussage ist oft durch sehr typische Fachwoerter eindeutig."
    },
    {
      id: "listen-p2-04",
      personLabel: "Person 4",
      transcript:
        "Wir sind zu Hause zu viert und ich suche Ideen fuer leckeres Essen, das nicht teuer ist. Besonders wichtig ist mir, dass die Rezepte auch im Alltag schnell funktionieren.",
      durationLabel: "00:18",
      prompt: "Welche Aussage passt zu Person 4?",
      correctOptionId: "d",
      correctReason:
        "Die Person sucht guenstige Rezepte fuer eine Familie und moechte alltagstauglich kochen. Das passt direkt zu Aussage D.",
      incorrectReasonByOption: {
        a: "Es geht nicht um Deutsch im Beruf.",
        b: "Kinder werden zwar indirekt erwaehnt, aber das Thema ist Essen, nicht Schwimmen.",
        c: "Computerkenntnisse spielen hier keine Rolle.",
        e: "Von Fahrradtraining ist nicht die Rede.",
        f: "Ein Bewegungskurs fuer Senioren passt inhaltlich gar nicht."
      },
      learningTip:
        "Achten Sie auf Woerter wie guenstig, Familie, Alltag oder schnell. Sie zeigen oft sehr praezise, welche Aussage gemeint ist.",
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Wenn mehrere Aussagen irgendwie passen koennten, gewinnt die spezifischere."
    },
    {
      id: "listen-p2-05",
      personLabel: "Person 5",
      transcript:
        "Ich habe als Kind nie richtig Radfahren gelernt. Jetzt wohne ich in der Stadt und moechte sicherer werden, besonders an Kreuzungen und auf grossen Strassen.",
      durationLabel: "00:18",
      prompt: "Welche Aussage passt zu Person 5?",
      correctOptionId: "e",
      correctReason:
        "Unsicherheit im Stadtverkehr und der Wunsch nach mehr Sicherheit auf dem Fahrrad passen genau zu Aussage E.",
      incorrectReasonByOption: {
        a: "Die Person spricht nicht ueber Sprache oder Arbeit.",
        b: "Es geht nicht um Kinder oder Schwimmen.",
        c: "Computer sind kein Thema.",
        d: "Kochen passt hier inhaltlich nicht.",
        f: "Die Person sucht Verkehrssicherheit, nicht Gymnastik oder Bewegung fuer Senioren."
      },
      learningTip:
        "Wenn Orte wie Kreuzung, Strasse oder Verkehr fallen, pruefen Sie sofort Aussagen zum Mobilitaetsbereich.",
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Manche Loesungen werden durch zwei bis drei sehr konkrete Woerter fast eindeutig."
    },
    {
      id: "listen-p2-06",
      personLabel: "Person 6",
      transcript:
        "Meine Mutter ist vor Kurzem siebzig geworden. Sie moechte sich mehr bewegen, aber keinen anstrengenden Sport machen. Vormittags passt es ihr nicht, weil sie dann oft Arzttermine hat.",
      durationLabel: "00:21",
      prompt: "Welche Aussage passt zu Person 6?",
      correctOptionId: "f",
      correctReason:
        "Hier geht es um eine aeltere Person, leichte Bewegung und einen Termin am Nachmittag. Das passt eindeutig zu Aussage F.",
      incorrectReasonByOption: {
        a: "Deutsch im Beruf ist kein Thema.",
        b: "Der Kurs ist weder fuer Kinder noch fuer Samstag geplant.",
        c: "Computerkenntnisse werden nicht benoetigt.",
        d: "Es geht nicht um Essen oder Kochen.",
        e: "Radfahren im Strassenverkehr wird nicht angesprochen."
      },
      learningTip:
        "Neben dem Inhalt spielt die passende Zielgruppe eine wichtige Rolle. Seniorin, Kind oder Berufstaetige sind oft entscheidend.",
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Zielgruppe und Uhrzeit zusammen sichern die richtige Zuordnung ab."
    }
  ]
};

export const listeningPartThreeTasks: ListeningPartThreeTask[] = [
  {
    id: "listen-p3-01",
    part: "Teil 3",
    title: "Ansage im Supermarkt",
    topic: "Einkaufen",
    transcript:
      "Liebe Kundinnen und Kunden, wegen eines technischen Problems schliessen wir heute schon um neunzehn Uhr. Frische Backwaren erhalten Sie noch bis achtzehn Uhr an der Theke.",
    durationLabel: "00:17",
    question: "Was ist heute anders als sonst?",
    options: [
      { id: "a", label: "A", text: "Der Supermarkt oeffnet spaeter." },
      { id: "b", label: "B", text: "Der Supermarkt schliesst frueher." },
      { id: "c", label: "C", text: "Backwaren gibt es heute nicht." }
    ],
    correctOptionId: "b",
    feedback: {
      correctTitle: "Richtig",
      correctReason:
        "In der Ansage heisst es klar, dass der Markt heute schon um neunzehn Uhr schliesst. Das ist die Veraenderung.",
      learningTip:
        "Bei Durchsagen in Geschaeften wird die eigentliche Information oft direkt nach wegen oder heute genannt.",
      incorrectReasonByOption: {
        a: "Die Oeffnungszeit wird nicht angesprochen. Es geht nur um das fruehere Schliessen.",
        c: "Backwaren gibt es noch bis achtzehn Uhr. Sie fallen also nicht komplett aus."
      },
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Verwechseln Sie Teilschlusszeiten einzelner Bereiche nicht mit der Hauptinformation."
    }
  },
  {
    id: "listen-p3-02",
    part: "Teil 3",
    title: "Nachricht aus der Bibliothek",
    topic: "Freizeit",
    transcript:
      "Die Stadtbibliothek erinnert daran, dass ausgeliehene Medien bis spaetestens Montag zurueckgegeben werden muessen. Am Samstag bleibt die Bibliothek wegen einer Veranstaltung geschlossen.",
    durationLabel: "00:16",
    question: "Wann ist die Bibliothek nicht geoeffnet?",
    options: [
      { id: "a", label: "A", text: "Am Montag." },
      { id: "b", label: "B", text: "Am Samstag." },
      { id: "c", label: "C", text: "Nur am Vormittag." }
    ],
    correctOptionId: "b",
    feedback: {
      correctTitle: "Richtig",
      correctReason:
        "Die Ansage nennt den Samstag ausdruecklich als Schliessungstag wegen einer Veranstaltung.",
      learningTip:
        "Bei oeffentlichen Einrichtungen sollten Sie besonders auf Wochentage achten. Sie sind oft die Loesung.",
      incorrectReasonByOption: {
        a: "Montag ist nur der Rueckgabetermin, nicht der Schliessungstag.",
        c: "Von einer eingeschraenkten Oeffnungszeit ist keine Rede. Die Bibliothek bleibt ganz geschlossen."
      },
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Ein genannter Abgabetermin ist nicht automatisch die Antwort auf die eigentliche Frage."
    }
  },
  {
    id: "listen-p3-03",
    part: "Teil 3",
    title: "Busverkehr in der Stadt",
    topic: "Bus",
    transcript:
      "Wegen einer Baustelle kann die Linie 12 die Haltestelle Zentrum diese Woche nicht anfahren. Bitte benutzen Sie stattdessen die Ersatzhaltestelle am Museum.",
    durationLabel: "00:15",
    question: "Was sollen die Fahrgaeste tun?",
    options: [
      { id: "a", label: "A", text: "Am Museum einsteigen oder aussteigen." },
      { id: "b", label: "B", text: "Eine andere Buslinie suchen." },
      { id: "c", label: "C", text: "Zur Haltestelle Zentrum zurueckgehen." }
    ],
    correctOptionId: "a",
    feedback: {
      correctTitle: "Richtig",
      correctReason:
        "Die Ansage gibt direkt die Ersatzhaltestelle am Museum an. Diese sollen die Fahrgaeste benutzen.",
      learningTip:
        "Wenn Sie bitte benutzen Sie stattdessen hoeren, folgt meist sofort die korrekte Handlung.",
      incorrectReasonByOption: {
        b: "Es wird keine andere Linie verlangt. Nur die Haltestelle aendert sich.",
        c: "Gerade diese Haltestelle kann nicht angefahren werden. Die Fahrgaeste sollen also nicht dorthin."
      },
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Ersatzorte oder Ersatzwege werden oft mit stattdessen signalisiert."
    }
  },
  {
    id: "listen-p3-04",
    part: "Teil 3",
    title: "Schwimmbad",
    topic: "Freizeit",
    transcript:
      "Bitte beachten Sie: Das Kinderbecken ist heute wegen einer Reparatur nicht benutzbar. Das Sportbecken und die Sauna bleiben wie gewohnt geoeffnet.",
    durationLabel: "00:14",
    question: "Was ist heute nicht moeglich?",
    options: [
      { id: "a", label: "A", text: "Die Sauna besuchen." },
      { id: "b", label: "B", text: "Das Kinderbecken benutzen." },
      { id: "c", label: "C", text: "Im Sportbecken schwimmen." }
    ],
    correctOptionId: "b",
    feedback: {
      correctTitle: "Richtig",
      correctReason:
        "Nur das Kinderbecken ist wegen einer Reparatur gesperrt. Die anderen Bereiche bleiben offen.",
      learningTip:
        "Achten Sie auf Aufzaehlungen mit nur, aber oder wie gewohnt. Sie grenzen die richtige Antwort ein.",
      incorrectReasonByOption: {
        a: "Die Sauna bleibt geoeffnet. Diese Option widerspricht dem letzten Satz.",
        c: "Auch das Sportbecken bleibt wie gewohnt geoeffnet."
      },
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Bei mehreren Bereichen muessen Sie genau unterscheiden, was geschlossen und was offen bleibt."
    }
  },
  {
    id: "listen-p3-05",
    part: "Teil 3",
    title: "Buergerbuero",
    topic: "Behoerde",
    transcript:
      "Nummer achtundvierzig bitte zum Schalter drei. Fuer neue Ausweisdokumente benoetigen wir heute zusaetzlich ein aktuelles Passfoto.",
    durationLabel: "00:13",
    question: "Was muessen Personen heute mitbringen?",
    options: [
      { id: "a", label: "A", text: "Ein aktuelles Passfoto." },
      { id: "b", label: "B", text: "Eine Geburtsurkunde." },
      { id: "c", label: "C", text: "Nur Bargeld." }
    ],
    correctOptionId: "a",
    feedback: {
      correctTitle: "Richtig",
      correctReason:
        "Die Ansage nennt ausdruecklich ein aktuelles Passfoto als zusaetzlich noetiges Dokument.",
      learningTip:
        "Bei Behoerdenaufgaben helfen Woerter wie benoetigen, mitbringen oder zusaetzlich. Danach kommt oft die Loesung.",
      incorrectReasonByOption: {
        b: "Eine Geburtsurkunde wird ueberhaupt nicht genannt.",
        c: "Von Geld ist keine Rede. Gefragt wird nach einem Dokument."
      },
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: Lassen Sie sich nicht von typischen Alltagserwartungen leiten. Entscheidend ist nur, was wirklich gesagt wird."
    }
  },
  {
    id: "listen-p3-06",
    part: "Teil 3",
    title: "Nachricht vom Zahnarzt",
    topic: "Arzt",
    transcript:
      "Hier spricht die Zahnarztpraxis Hartmann. Ihr Termin am Dienstag muss leider auf Donnerstag um elf Uhr verschoben werden. Wenn Sie diesen Termin nicht wahrnehmen koennen, rufen Sie uns bitte bis morgen Mittag an.",
    durationLabel: "00:20",
    question: "Wann ist der neue Termin?",
    options: [
      { id: "a", label: "A", text: "Am Dienstag um elf Uhr." },
      { id: "b", label: "B", text: "Am Donnerstag um elf Uhr." },
      { id: "c", label: "C", text: "Morgen Mittag." }
    ],
    correctOptionId: "b",
    feedback: {
      correctTitle: "Richtig",
      correctReason:
        "Die Praxis sagt klar, dass der Termin auf Donnerstag um elf Uhr verschoben wird.",
      learningTip:
        "Unterscheiden Sie bei Terminen zwischen altem Termin, neuem Termin und Rueckmeldefrist. Das sind drei verschiedene Informationen.",
      incorrectReasonByOption: {
        a: "Dienstag ist der urspruengliche Termin, nicht der neue.",
        c: "Morgen Mittag ist nur die Frist fuer den Rueckruf, nicht die neue Behandlung."
      },
      examFocus:
        "Darauf sollten Sie in der DTZ-Pruefung achten: In Terminnachrichten kommen oft mehrere Uhrzeiten vor. Die Frage entscheidet, welche davon wichtig ist."
    }
  }
];

export function getListeningTaskSummary(taskId: string) {
  const partOne = listeningPartOneTasks.find((task) => task.id === taskId);
  if (partOne) {
    return { title: partOne.title, prompt: partOne.question };
  }

  const partOneStatement = listeningPartOneTasks.find((task) => task.statement.id === taskId);
  if (partOneStatement) {
    return { title: `${partOneStatement.title} - Aussage`, prompt: partOneStatement.statement.text };
  }

  const partTwo = listeningPartTwoSet.tasks.find((task) => task.id === taskId);
  if (partTwo) {
    return { title: `${listeningPartTwoSet.title} - ${partTwo.personLabel}`, prompt: partTwo.prompt };
  }

  const partThree = listeningPartThreeTasks.find((task) => task.id === taskId);
  if (partThree) {
    return { title: partThree.title, prompt: partThree.question };
  }

  return null;
}
