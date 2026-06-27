import type { ImageSourcePropType } from "react-native";
import type { SkillArea } from "../../domain/models/exam";

export type ChoiceOption = {
  id: string;
  label: string;
  text: string;
};

export type ListeningChoiceTask = {
  id: string;
  part: string;
  title: string;
  topic: string;
  transcript: string;
  durationLabel: string;
  question: string;
  options: ChoiceOption[];
  correctOptionId: string;
  solution: string;
  explanation: string;
};

export type ListeningTrueFalseStatement = {
  id: string;
  text: string;
  isTrue: boolean;
  explanation: string;
};

export type ListeningTrueFalseTask = {
  id: string;
  part: string;
  title: string;
  topic: string;
  transcript: string;
  durationLabel: string;
  instruction: string;
  statements: ListeningTrueFalseStatement[];
};

export type ReadingAd = {
  id: string;
  title: string;
  body: string;
  contact: string;
};

export type ReadingSituation = {
  id: string;
  text: string;
  correctId: string;
  explanation: string;
};

export type ReadingMatchingTask = {
  id: string;
  title: string;
  instruction: string;
  ads: ReadingAd[];
  situations: ReadingSituation[];
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
  situations: ReadingSituation[];
};

export type ReadingChoiceTask = {
  id: string;
  title: string;
  format: string;
  sourceTitle: string;
  text: string;
  question: string;
  options: ChoiceOption[];
  correctOptionId: string;
  explanation: string;
};

export type WritingScenario = {
  id: string;
  title: string;
  category: string;
  recipient: string;
  situation: string;
  points: string[];
  tips: string[];
  sampleSubject?: string;
  sampleText: string;
  isExamTask?: boolean;
};

export type SpeakingPhotoPrompt = {
  id: string;
  title: string;
  sceneLabel: string;
  image: ImageSourcePropType;
  guidingQuestions: string[];
  phraseBank: string[];
  sampleAnswer: string;
  isExamTask?: boolean;
};

export type SpeakingPlanningTask = {
  id: string;
  title: string;
  setting: string;
  roleA: string[];
  roleB: string[];
  usefulPhrases: string[];
  sampleDirection: string;
  isExamTask?: boolean;
};

export type SpeakingIntroPrompt = {
  prompts: string[];
  phraseBank: string[];
  sampleAnswer: string;
};

export const phaseOneSkillSummaries: Record<
  SkillArea,
  { title: string; subtitle: string; focus: string }
> = {
  listening: {
    title: "Hören",
    subtitle: "Ansagen, Dialoge und Mitteilungen",
    focus: "Informationen genau hören und Details sicher unterscheiden."
  },
  reading: {
    title: "Lesen",
    subtitle: "Anzeigen, Pläne, E-Mails und Fahrpläne",
    focus: "Die passende Information schnell finden und richtig zuordnen."
  },
  writing: {
    title: "Schreiben",
    subtitle: "E-Mails und Briefe aus dem Alltag",
    focus: "Vier Inhaltspunkte klar, höflich und vollständig bearbeiten."
  },
  speaking: {
    title: "Sprechen",
    subtitle: "Vorstellung, Bildbeschreibung und Planung",
    focus: "Einfach, klar und zusammenhängend sprechen."
  }
};

export const speakingPhotoPrompts: SpeakingPhotoPrompt[] = [
  {
    id: "photo-01",
    title: "Picknick im Park",
    sceneLabel: "Im Park",
    image: require("../../../assets/images/speaking/scene-01.png"),
    guidingQuestions: ["Wo sind die Personen?", "Was machen sie?", "Wie ist die Stimmung?"],
    phraseBank: ["Auf dem Bild sehe ich ...", "Vielleicht feiern sie ...", "Ich denke, dass ..."],
    sampleAnswer:
      "Auf dem Bild sehe ich vier Personen im Park. Zwei Menschen sitzen auf einer Bank und zwei sitzen auf einer Decke. Vielleicht machen sie ein Picknick. Die Stimmung wirkt ruhig und freundlich. Ich verbringe im Sommer auch gern Zeit im Park.",
    isExamTask: true
  },
  {
    id: "photo-02",
    title: "Gespräch beim Arzt",
    sceneLabel: "Beim Arzt",
    image: require("../../../assets/images/speaking/scene-02.png"),
    guidingQuestions: ["Wer spricht miteinander?", "Warum ist der Mann dort?", "Was könnte als Nächstes passieren?"],
    phraseBank: ["Der Arzt erklärt ...", "Der Patient hat wahrscheinlich ...", "Danach bekommt er ..."],
    sampleAnswer:
      "Ich sehe einen Arzt und einen Patienten. Der Arzt erklärt etwas und hält vielleicht ein Medikament oder eine Spritze in der Hand. Der Mann ist wahrscheinlich krank oder braucht eine Untersuchung. Danach bekommt er vielleicht ein Rezept oder einen neuen Termin.",
    isExamTask: true
  },
  {
    id: "photo-03",
    title: "Einkauf im Supermarkt",
    sceneLabel: "Im Supermarkt",
    image: require("../../../assets/images/speaking/scene-03.png"),
    guidingQuestions: ["Wo ist die Frau?", "Was kauft sie vielleicht?", "Kaufen Sie lieber auf dem Markt oder im Supermarkt ein?"],
    phraseBank: ["Sie sucht gerade ...", "Im Regal liegen ...", "Ich kaufe normalerweise ..."],
    sampleAnswer:
      "Auf dem Bild ist eine Frau im Supermarkt. Sie steht vor einem Regal mit Gemüse und Obst. Vielleicht sucht sie frische Lebensmittel für das Abendessen. Ich kaufe meistens im Supermarkt ein, weil es schnell und praktisch ist."
  },
  {
    id: "photo-04",
    title: "Warten am Bahnhof",
    sceneLabel: "Am Bahnhof",
    image: require("../../../assets/images/speaking/scene-04.png"),
    guidingQuestions: ["Was sieht man am Gleis?", "Wohin fahren die Leute vielleicht?", "Fahren Sie gern mit dem Zug?"],
    phraseBank: ["Im Hintergrund steht ...", "Die Menschen warten auf ...", "Mit dem Zug kann man ..."],
    sampleAnswer:
      "Hier sehe ich einen Bahnhof. Ein roter Zug steht am Gleis und einige Menschen warten oder steigen ein. Vielleicht fahren sie zur Arbeit oder zu ihrer Familie. Ich fahre gern mit dem Zug, weil ich unterwegs lesen oder aus dem Fenster schauen kann."
  },
  {
    id: "photo-05",
    title: "Unterricht in der Schule",
    sceneLabel: "In der Schule",
    image: require("../../../assets/images/speaking/scene-05.png"),
    guidingQuestions: ["Wer ist im Klassenraum?", "Was passiert im Unterricht?", "Welches Schulfach mochten Sie früher?"],
    phraseBank: ["Die Lehrerin zeigt ...", "Die Kinder hören zu ...", "Früher mochte ich ..."],
    sampleAnswer:
      "Auf dem Bild sehe ich einen Klassenraum mit einer Lehrerin und mehreren Kindern. Die Lehrerin erklärt etwas an der Tafel und die Kinder hören zu. Die Stimmung wirkt konzentriert. Früher mochte ich besonders Sprachen und Geschichte."
  },
  {
    id: "photo-06",
    title: "Kochen zu Hause",
    sceneLabel: "Zu Hause",
    image: require("../../../assets/images/speaking/scene-06.png"),
    guidingQuestions: ["Was macht die Frau in der Küche?", "Kocht sie allein oder für andere?", "Kochen Sie gern?"],
    phraseBank: ["Sie bereitet gerade ... vor", "Auf dem Tisch liegen ...", "Bei mir zu Hause ..."],
    sampleAnswer:
      "Ich sehe eine Frau in der Küche. Sie schneidet oder mischt etwas und bereitet wahrscheinlich eine Mahlzeit vor. Vielleicht kocht sie für ihre Familie. Ich koche auch gern, besonders am Wochenende, wenn ich mehr Zeit habe."
  },
  {
    id: "photo-07",
    title: "Treffen im Restaurant",
    sceneLabel: "Im Restaurant",
    image: require("../../../assets/images/speaking/scene-07.png"),
    guidingQuestions: ["Wie viele Personen sitzen am Tisch?", "Warum treffen sie sich?", "Gehen Sie gern essen?"],
    phraseBank: ["Am Tisch sitzen ...", "Möglicherweise feiern sie ...", "Ich gehe gern / nicht so gern ..."],
    sampleAnswer:
      "Auf dem Bild sitzen mehrere Personen in einem Restaurant. Vielleicht essen sie zusammen zu Mittag oder besprechen etwas Wichtiges. Die Atmosphäre ist freundlich und ruhig. Ich gehe gern mit Freunden essen, weil man dabei gut reden kann."
  },
  {
    id: "photo-08",
    title: "Arbeiten im Büro",
    sceneLabel: "Am Arbeitsplatz",
    image: require("../../../assets/images/speaking/scene-08.png"),
    guidingQuestions: ["Was macht der Mann im Büro?", "Wie sieht der Arbeitsplatz aus?", "Arbeiten Sie lieber allein oder im Team?"],
    phraseBank: ["Er konzentriert sich auf ...", "Auf dem Schreibtisch steht ...", "Ich arbeite lieber ..."],
    sampleAnswer:
      "Ich sehe einen Mann an seinem Schreibtisch. Er arbeitet am Computer und scheint sehr konzentriert zu sein. Der Arbeitsplatz sieht modern und ordentlich aus. Ich arbeite am liebsten im Team, aber für manche Aufgaben arbeite ich auch gern allein."
  },
  {
    id: "photo-09",
    title: "Kinder auf dem Spielplatz",
    sceneLabel: "Auf dem Spielplatz",
    image: require("../../../assets/images/speaking/scene-09.png"),
    guidingQuestions: ["Was machen die Kinder?", "Ist ein Erwachsener in der Nähe?", "Gab es in Ihrer Kindheit auch einen Spielplatz?"],
    phraseBank: ["Die Kinder klettern ...", "Im Vordergrund sieht man ...", "Als ich klein war ..."],
    sampleAnswer:
      "Auf dem Bild sind Kinder auf einem Spielplatz. Sie klettern und spielen zusammen. Wahrscheinlich ist auch ein Erwachsener in der Nähe, obwohl man ihn hier nicht deutlich sieht. Als ich klein war, habe ich auch oft auf dem Spielplatz gespielt."
  },
  {
    id: "photo-10",
    title: "Einkauf beim Bäcker",
    sceneLabel: "Beim Bäcker",
    image: require("../../../assets/images/speaking/scene-10.png"),
    guidingQuestions: ["Was kauft die Frau vielleicht?", "Wie sieht das Geschäft aus?", "Was essen Sie morgens gern?"],
    phraseBank: ["In der Auslage liegen ...", "Die Kundin entscheidet sich vielleicht für ...", "Zum Frühstück esse ich ..."],
    sampleAnswer:
      "Hier ist eine Frau in einer Bäckerei. In der Auslage liegen viele Brote und Brötchen. Vielleicht kauft sie etwas für das Frühstück oder für die Arbeit. Ich esse morgens gern Brot mit Käse und trinke dazu Tee."
  },
  {
    id: "photo-11",
    title: "Pause am See",
    sceneLabel: "Am See",
    image: require("../../../assets/images/speaking/scene-11.png"),
    guidingQuestions: ["Wo sitzen die Personen?", "Worüber sprechen sie vielleicht?", "Was machen Sie gern in der Natur?"],
    phraseBank: ["Sie sitzen am Ufer ...", "Vielleicht unterhalten sie sich über ...", "In der Natur mache ich gern ..."],
    sampleAnswer:
      "Auf dem Bild sitzen zwei Personen an einem See. Sie sprechen vielleicht über ihren Tag oder genießen einfach die Ruhe. Die Landschaft sieht sehr schön aus. Ich gehe auch gern an einen See oder in einen Park, um mich zu entspannen."
  },
  {
    id: "photo-12",
    title: "Training im Fitnessstudio",
    sceneLabel: "Im Fitnessstudio",
    image: require("../../../assets/images/speaking/scene-12.png"),
    guidingQuestions: ["Was passiert in diesem Raum?", "Warum sind die Personen dort?", "Machen Sie Sport?"],
    phraseBank: ["Die Gruppe hört zu ...", "Vielleicht bekommen sie Anweisungen ...", "Ich mache gern ..."],
    sampleAnswer:
      "Ich sehe mehrere Personen in einem Fitnessstudio oder Kursraum. Vielleicht bekommen sie Erklärungen von einer Trainerin. Sie möchten wahrscheinlich fit bleiben oder gesünder leben. Ich mache auch gern Sport, vor allem Spazierengehen und leichte Übungen."
  },
  {
    id: "photo-13",
    title: "Fahrt mit dem Bus",
    sceneLabel: "Im Bus",
    image: require("../../../assets/images/speaking/scene-13.png"),
    guidingQuestions: ["Wo sitzen die Leute?", "Wie ist die Stimmung?", "Fahren Sie oft mit dem Bus?"],
    phraseBank: ["Die Fahrgäste sitzen ...", "Es wirkt ...", "Mit dem Bus fahre ich ..."],
    sampleAnswer:
      "Auf dem Bild sitzen viele Menschen in einem Bus. Einige schauen nach vorne, andere sehen aus dem Fenster. Die Stimmung ist eher ruhig. Ich fahre manchmal mit dem Bus, besonders wenn ich in die Stadt oder zum Bahnhof muss."
  },
  {
    id: "photo-14",
    title: "Gespräch bei Freunden",
    sceneLabel: "Bei Freunden",
    image: require("../../../assets/images/speaking/scene-14.png"),
    guidingQuestions: ["Wer sitzt zusammen?", "Was besprechen sie vielleicht?", "Treffen Sie Freunde oft zu Hause?"],
    phraseBank: ["Die Personen unterhalten sich über ...", "Vielleicht planen sie ...", "Bei mir zu Hause ..."],
    sampleAnswer:
      "Hier sehe ich vier Personen, die zusammen sitzen und sprechen. Vielleicht sind sie Freunde oder Nachbarn und planen etwas gemeinsam. Die Atmosphäre wirkt angenehm. Ich treffe Freunde gern zu Hause, weil es dort gemütlich ist."
  },
  {
    id: "photo-15",
    title: "Lernen in der Bibliothek",
    sceneLabel: "In der Bibliothek",
    image: require("../../../assets/images/speaking/scene-15.png"),
    guidingQuestions: ["Was macht die Frau?", "Warum lernt sie dort?", "Lernen Sie lieber allein oder mit anderen?"],
    phraseBank: ["Sie liest oder schreibt ...", "Die Bibliothek ist gut, weil ...", "Ich lerne am besten ..."],
    sampleAnswer:
      "Ich sehe eine Frau in einer Bibliothek. Sie liest oder schreibt und arbeitet wahrscheinlich für einen Kurs oder eine Prüfung. In der Bibliothek ist es ruhig, deshalb kann man sich gut konzentrieren. Ich lerne meistens lieber allein."
  },
  {
    id: "photo-16",
    title: "Warten am Flughafen",
    sceneLabel: "Am Flughafen",
    image: require("../../../assets/images/speaking/scene-16.png"),
    guidingQuestions: ["Wo befinden sich die Menschen?", "Was machen sie dort?", "Sind Sie schon einmal geflogen?"],
    phraseBank: ["Im Hintergrund sieht man ...", "Die Reisenden warten auf ...", "Ich bin schon ..."],
    sampleAnswer:
      "Auf dem Bild sind mehrere Personen an einem Flughafen. Im Hintergrund sieht man eine große Anzeigetafel. Die Menschen warten wahrscheinlich auf ihren Flug oder auf andere Reisende. Ich bin schon einmal geflogen und fand es spannend, aber auch ein bisschen stressig."
  },
  {
    id: "photo-17",
    title: "Hilfe beim Umzug",
    sceneLabel: "Beim Umzug",
    image: require("../../../assets/images/speaking/scene-17.png"),
    guidingQuestions: ["Was tragen die Personen?", "Warum arbeiten sie zusammen?", "Sind Sie schon einmal umgezogen?"],
    phraseBank: ["Sie tragen Kisten ...", "Wahrscheinlich helfen sie ...", "Beim Umzug muss man ..."],
    sampleAnswer:
      "Ich sehe drei Personen, die Kisten tragen und zusammen arbeiten. Sie helfen wahrscheinlich bei einem Umzug. Ein Umzug ist oft anstrengend, weil man viel organisieren muss. Ich bin schon umgezogen und weiß, dass Hilfe von Freunden sehr wichtig ist."
  },
  {
    id: "photo-18",
    title: "Einkauf auf dem Markt",
    sceneLabel: "Auf dem Markt",
    image: require("../../../assets/images/speaking/scene-18.png"),
    guidingQuestions: ["Was sieht man auf dem Markt?", "Warum kaufen viele Menschen dort ein?", "Gehen Sie gern auf den Markt?"],
    phraseBank: ["Dort gibt es ...", "Viele Menschen kaufen dort ein, weil ...", "Ich gehe gern ..."],
    sampleAnswer:
      "Auf dem Bild sieht man einen Markt mit Obst und Gemüse. Mehrere Menschen kaufen dort ein und sprechen vielleicht mit den Verkäufern. Auf dem Markt sind die Produkte oft frisch. Ich gehe gern auf den Markt, wenn ich Zeit habe."
  },
  {
    id: "photo-19",
    title: "Termin beim Friseur",
    sceneLabel: "Beim Friseur",
    image: require("../../../assets/images/speaking/scene-19.png"),
    guidingQuestions: ["Was macht die Friseurin?", "Wie fühlt sich die Kundin vielleicht?", "Wie oft gehen Sie zum Friseur?"],
    phraseBank: ["Die Friseurin schneidet ...", "Die Kundin wirkt ...", "Normalerweise gehe ich ..."],
    sampleAnswer:
      "Ich sehe eine Friseurin und eine Kundin. Die Friseurin arbeitet gerade an den Haaren der Kundin. Vielleicht bereitet sie einen Haarschnitt oder eine Frisur für einen besonderen Tag vor. Ich gehe ungefähr alle zwei Monate zum Friseur."
  },
  {
    id: "photo-20",
    title: "Treffen im Café",
    sceneLabel: "Im Café",
    image: require("../../../assets/images/speaking/scene-20.png"),
    guidingQuestions: ["Wer sitzt im Café?", "Worüber sprechen sie vielleicht?", "Treffen Sie sich gern im Café?"],
    phraseBank: ["Die beiden unterhalten sich über ...", "Vielleicht besprechen sie ...", "Ich treffe mich gern ..."],
    sampleAnswer:
      "Auf dem Bild sitzen zwei Frauen in einem Café und sprechen miteinander. Vielleicht reden sie über die Arbeit, über die Familie oder planen ein Treffen. Ein Café ist ein guter Ort für Gespräche. Ich treffe mich auch gern im Café mit Freunden."
  }
];

export const listeningChoiceTasks: ListeningChoiceTask[] = [
  {
    id: "listen-a-1",
    part: "Teil 1",
    title: "Termin in der Arztpraxis",
    topic: "Arzt",
    transcript:
      "Praxis Dr. Schubert, guten Morgen. Frau Yilmaz hätte gern einen Termin, weil ihr Kind seit gestern Fieber hat. Der nächste freie Termin ist heute um halb vier.",
    durationLabel: "00:27",
    question: "Warum ruft Frau Yilmaz in der Praxis an?",
    options: [
      { id: "a", label: "A", text: "Sie möchte ein Rezept abholen." },
      { id: "b", label: "B", text: "Sie möchte einen Termin vereinbaren." },
      { id: "c", label: "C", text: "Sie möchte die Rechnung bezahlen." }
    ],
    correctOptionId: "b",
    solution: "Richtige Antwort: B",
    explanation: "Im Text sagt die Frau, dass ihr Kind Fieber hat und sie einen Termin braucht."
  },
  {
    id: "listen-a-2",
    part: "Teil 1",
    title: "Ansage im Bus",
    topic: "Bus",
    transcript:
      "Wegen einer Baustelle fährt der Bus 18 heute nicht über den Marktplatz. Bitte steigen Sie an der Haltestelle Rathaus aus und gehen Sie fünf Minuten zu Fuß.",
    durationLabel: "00:18",
    question: "Was sollen die Fahrgäste machen?",
    options: [
      { id: "a", label: "A", text: "Sie sollen am Rathaus aussteigen." },
      { id: "b", label: "B", text: "Sie sollen im Bus sitzen bleiben." },
      { id: "c", label: "C", text: "Sie sollen auf die Straßenbahn umsteigen." }
    ],
    correctOptionId: "a",
    solution: "Richtige Antwort: A",
    explanation: "Die Durchsage nennt die Haltestelle Rathaus als Ersatz."
  },
  {
    id: "listen-a-3",
    part: "Teil 2",
    title: "Nachricht vom Arbeitgeber",
    topic: "Arbeit",
    transcript:
      "Herr Demir, bitte kommen Sie morgen nicht um sieben, sondern erst um neun Uhr. Zuerst findet eine kurze Schulung im Besprechungsraum statt.",
    durationLabel: "00:16",
    question: "Wann soll Herr Demir morgen anfangen?",
    options: [
      { id: "a", label: "A", text: "Um sieben Uhr" },
      { id: "b", label: "B", text: "Um acht Uhr" },
      { id: "c", label: "C", text: "Um neun Uhr" }
    ],
    correctOptionId: "c",
    solution: "Richtige Antwort: C",
    explanation: "Der Arbeitgeber sagt deutlich: nicht um sieben, sondern erst um neun."
  },
  {
    id: "listen-a-4",
    part: "Teil 2",
    title: "Telefonat mit der Nachbarin",
    topic: "Nachbarn",
    transcript:
      "Hallo Frau Costa, ich habe Ihr Paket angenommen. Ich bin heute bis 19 Uhr zu Hause. Danach bin ich bei meiner Schwester.",
    durationLabel: "00:14",
    question: "Bis wann kann Frau Costa ihr Paket heute abholen?",
    options: [
      { id: "a", label: "A", text: "Bis 17 Uhr" },
      { id: "b", label: "B", text: "Bis 19 Uhr" },
      { id: "c", label: "C", text: "Bis 21 Uhr" }
    ],
    correctOptionId: "b",
    solution: "Richtige Antwort: B",
    explanation: "Die Nachbarin sagt, dass sie bis 19 Uhr zu Hause ist."
  }
];

export const listeningTrueFalseTasks: ListeningTrueFalseTask[] = [
  {
    id: "listen-b-1",
    part: "Teil 3",
    title: "Info aus der Schule",
    topic: "Schule",
    transcript:
      "Liebe Eltern, am Freitag endet der Unterricht schon um zwölf Uhr. Das Schulfest beginnt erst um 15 Uhr. Bitte bringen Sie Kuchen oder Getränke nur am Nachmittag in die Aula.",
    durationLabel: "00:28",
    instruction: "Hören Sie die Nachricht und entscheiden Sie: richtig oder falsch?",
    statements: [
      {
        id: "s1",
        text: "Am Freitag ist um zwölf Uhr Schulschluss.",
        isTrue: true,
        explanation: "Die Nachricht sagt: Der Unterricht endet schon um zwölf Uhr."
      },
      {
        id: "s2",
        text: "Das Schulfest beginnt direkt nach dem Unterricht.",
        isTrue: false,
        explanation: "Das Fest beginnt erst um 15 Uhr."
      },
      {
        id: "s3",
        text: "Die Eltern sollen Essen und Getränke in die Aula bringen.",
        isTrue: true,
        explanation: "Genau das wird am Ende der Nachricht gesagt."
      },
      {
        id: "s4",
        text: "Die Eltern sollen alles schon am Morgen mitbringen.",
        isTrue: false,
        explanation: "Die Sachen sollen nur am Nachmittag gebracht werden."
      }
    ]
  },
  {
    id: "listen-b-2",
    part: "Teil 4",
    title: "Hinweis von der Wohnungsverwaltung",
    topic: "Wohnung",
    transcript:
      "Im Haus wird am Mittwoch das Wasser von 9 bis 13 Uhr abgestellt. Bitte füllen Sie vorher etwas Trinkwasser ab. Die Handwerker arbeiten im Keller und nicht in den Wohnungen.",
    durationLabel: "00:23",
    instruction: "Hören Sie die Durchsage und markieren Sie richtig oder falsch.",
    statements: [
      {
        id: "s1",
        text: "Am Mittwoch gibt es einige Stunden kein Wasser.",
        isTrue: true,
        explanation: "Das Wasser wird von 9 bis 13 Uhr abgestellt."
      },
      {
        id: "s2",
        text: "Die Bewohner sollen vorher Wasser bereitstellen.",
        isTrue: true,
        explanation: "Die Verwaltung bittet darum, Trinkwasser abzufüllen."
      },
      {
        id: "s3",
        text: "Die Handwerker kommen in jede Wohnung.",
        isTrue: false,
        explanation: "Im Text steht ausdrücklich, dass sie im Keller arbeiten."
      },
      {
        id: "s4",
        text: "Das Wasser ist erst am Abend wieder da.",
        isTrue: false,
        explanation: "Laut Nachricht endet die Arbeit schon um 13 Uhr."
      }
    ]
  }
];

export const readingMatchingTask: ReadingMatchingTask = {
  id: "read-match-ads",
  title: "Anzeigen zuordnen",
  instruction: "Welche Anzeige passt zu welcher Situation? Ordnen Sie zu.",
  ads: [
    {
      id: "ad-a",
      title: "WG-Zimmer in Bonn",
      body: "Helles Zimmer, 16 qm, ab sofort frei. Bushaltestelle direkt vor der Tür.",
      contact: "Tel. 0176 441102"
    },
    {
      id: "ad-b",
      title: "Deutschkurs am Abend",
      body: "Montag und Donnerstag, 18 bis 20 Uhr. Für Berufstätige.",
      contact: "info@sprachpunkt.de"
    },
    {
      id: "ad-c",
      title: "Suche Babysitter",
      body: "Für zwei Kinder, mittwochs und freitags von 16 bis 19 Uhr.",
      contact: "Tel. 0228 553128"
    },
    {
      id: "ad-d",
      title: "Flohmarkt am Samstag",
      body: "Verkaufen erlaubt mit Anmeldung. Standgebühr 8 Euro.",
      contact: "markt@stadtverein.de"
    },
    {
      id: "ad-e",
      title: "Hausarztpraxis West",
      body: "Neue Patienten willkommen. Termine online oder telefonisch.",
      contact: "www.praxis-west.de"
    },
    {
      id: "ad-f",
      title: "Bewerbungstraining",
      body: "Kostenloser Workshop für Arbeitssuchende mit Lebenslauf-Beratung.",
      contact: "Tel. 0151 765009"
    }
  ],
  situations: [
    {
      id: "sit-1",
      text: "Herr Kaya sucht ein Zimmer und möchte ohne Auto gut zur Arbeit kommen.",
      correctId: "ad-a",
      explanation: "Das Zimmer liegt direkt an der Bushaltestelle."
    },
    {
      id: "sit-2",
      text: "Frau Mendes arbeitet tagsüber und möchte nach Feierabend Deutsch lernen.",
      correctId: "ad-b",
      explanation: "Der Kurs findet am Abend statt und passt zu Berufstätigen."
    },
    {
      id: "sit-3",
      text: "Ein Ehepaar möchte alte Kleidung und Spielsachen verkaufen.",
      correctId: "ad-d",
      explanation: "Auf dem Flohmarkt kann man Dinge verkaufen."
    },
    {
      id: "sit-4",
      text: "Herr Arslan braucht Hilfe beim Schreiben seines Lebenslaufs.",
      correctId: "ad-f",
      explanation: "Im Bewerbungstraining gibt es Beratung zum Lebenslauf."
    },
    {
      id: "sit-5",
      text: "Frau Romano braucht einen neuen Hausarzt für ihre Familie.",
      correctId: "ad-e",
      explanation: "Die Hausarztpraxis nimmt neue Patienten auf."
    }
  ]
};

export const readingBuildingTask: ReadingBuildingTask = {
  id: "read-building-1",
  title: "Gebäudeplan zuordnen",
  buildingName: "Bürgerzentrum Nord",
  instruction: "Lesen Sie den Plan und ordnen Sie die Situationen der richtigen Etage zu.",
  levels: [
    { id: "floor-0", name: "Erdgeschoss", places: ["Information", "Kasse", "Wartebereich"] },
    { id: "floor-1", name: "1. Obergeschoss", places: ["Bürgeramt", "Anmeldung", "Ausweise"] },
    { id: "floor-2", name: "2. Obergeschoss", places: ["Jugendamt", "Familienberatung"] },
    { id: "floor-3", name: "3. Obergeschoss", places: ["Wohnungsstelle", "Sozialberatung"] },
    { id: "floor-4", name: "4. Obergeschoss", places: ["Sprachkurse", "Seminarräume"] }
  ],
  situations: [
    {
      id: "floor-sit-1",
      text: "Herr Özkan möchte seinen neuen Personalausweis beantragen.",
      correctId: "floor-1",
      explanation: "Ausweise und Anmeldung sind im 1. Obergeschoss."
    },
    {
      id: "floor-sit-2",
      text: "Frau Becker sucht Beratung für ihre Wohnungssituation.",
      correctId: "floor-3",
      explanation: "Wohnungsstelle und Sozialberatung liegen im 3. Obergeschoss."
    },
    {
      id: "floor-sit-3",
      text: "Ein Vater braucht Unterstützung bei Fragen zur Familie.",
      correctId: "floor-2",
      explanation: "Familienberatung findet im 2. Obergeschoss statt."
    },
    {
      id: "floor-sit-4",
      text: "Frau Aydin möchte sich für einen Integrationskurs anmelden.",
      correctId: "floor-4",
      explanation: "Die Sprachkurse sind im 4. Obergeschoss."
    },
    {
      id: "floor-sit-5",
      text: "Ein Besucher braucht zuerst allgemeine Auskunft.",
      correctId: "floor-0",
      explanation: "Information und Kasse befinden sich im Erdgeschoss."
    }
  ]
};

export const readingChoiceTasks: ReadingChoiceTask[] = [
  {
    id: "read-choice-1",
    title: "E-Mail vom Kindergarten",
    format: "E-Mail",
    sourceTitle: "Nachricht an die Eltern",
    text:
      "Liebe Eltern, am Dienstag machen wir mit den Kindern einen Ausflug in den Tierpark. Bitte geben Sie Ihrem Kind wetterfeste Kleidung, eine Trinkflasche und bis Montag die unterschriebene Erlaubnis mit.",
    question: "Was müssen die Eltern bis Montag machen?",
    options: [
      { id: "a", label: "A", text: "Sie müssen eine Trinkflasche kaufen." },
      { id: "b", label: "B", text: "Sie müssen die Erlaubnis unterschreiben." },
      { id: "c", label: "C", text: "Sie müssen im Tierpark anrufen." }
    ],
    correctOptionId: "b",
    explanation: "Im Text steht ausdrücklich, dass die unterschriebene Erlaubnis bis Montag mitgegeben werden muss."
  },
  {
    id: "read-choice-2",
    title: "Aushang im Treppenhaus",
    format: "Aushang",
    sourceTitle: "Reinigung der Fenster",
    text:
      "Am Donnerstag werden zwischen 8 und 12 Uhr die Fenster im Treppenhaus gereinigt. Bitte stellen Sie keine Fahrräder oder Kinderwagen im Eingangsbereich ab.",
    question: "Was dürfen die Bewohner am Donnerstagmorgen nicht machen?",
    options: [
      { id: "a", label: "A", text: "Sie dürfen keine Fahrräder im Eingangsbereich stehen lassen." },
      { id: "b", label: "B", text: "Sie dürfen das Haus nicht verlassen." },
      { id: "c", label: "C", text: "Sie dürfen die Fenster nicht öffnen." }
    ],
    correctOptionId: "a",
    explanation: "Der Aushang verbietet Fahrräder und Kinderwagen im Eingangsbereich."
  },
  {
    id: "read-choice-3",
    title: "Fahrplan am Bahnhof",
    format: "Fahrplan",
    sourceTitle: "Regionalzug RE 7",
    text:
      "Abfahrt Bonn Hbf 08:12, Köln Süd 08:34, Köln Hbf 08:41. Am Samstag fährt der Zug zehn Minuten später.",
    question: "Wann fährt der Zug am Samstag in Bonn ab?",
    options: [
      { id: "a", label: "A", text: "Um 08:12 Uhr" },
      { id: "b", label: "B", text: "Um 08:22 Uhr" },
      { id: "c", label: "C", text: "Um 08:41 Uhr" }
    ],
    correctOptionId: "b",
    explanation: "Am Samstag fährt der Zug zehn Minuten später als normal."
  }
];

export const writingScenarios: WritingScenario[] = [
  {
    id: "write-01",
    title: "Einladung absagen",
    category: "Freunde",
    recipient: "Frau Huber",
    situation: "Sie sind zu einer Geburtstagsfeier eingeladen, können aber nicht kommen.",
    points: ["für die Einladung danken", "Grund nennen", "einen anderen Termin vorschlagen", "Glückwünsche schicken"],
    tips: ["freundlich beginnen", "alle vier Punkte ansprechen", "am Ende einen guten Wunsch formulieren"],
    sampleSubject: "Ihre Einladung am Samstag",
    sampleText:
      "Liebe Frau Huber,\n\nvielen Dank für Ihre Einladung zu Ihrer Geburtstagsfeier. Leider kann ich am Samstag nicht kommen, weil ich an diesem Tag arbeiten muss. Ich würde Sie aber gern nächste Woche besuchen. Haben Sie am Mittwochabend Zeit? Ich wünsche Ihnen schon jetzt alles Gute und eine schöne Feier.\n\nViele Grüße\nSara Yildiz",
    isExamTask: true
  },
  {
    id: "write-02",
    title: "Beschwerde über Lärm",
    category: "Wohnung",
    recipient: "die Hausverwaltung",
    situation: "Seit einigen Wochen ist es abends im Haus sehr laut.",
    points: ["Problem beschreiben", "Zeit nennen", "um Hilfe bitten", "eine Lösung vorschlagen"],
    tips: ["sachlich schreiben", "nicht zu emotional formulieren", "klare Bitte nennen"],
    sampleSubject: "Lärm im Haus",
    sampleText:
      "Sehr geehrte Damen und Herren,\n\nich wohne seit zwei Jahren in der Gartenstraße 14. Seit einigen Wochen ist es abends oft sehr laut im Haus. Besonders zwischen 22 und 24 Uhr höre ich laute Musik und Gespräche im Treppenhaus. Ich muss morgens früh zur Arbeit und kann deshalb schlecht schlafen. Könnten Sie bitte mit den Bewohnern sprechen? Vielleicht kann auch ein Hinweis im Hausflur helfen.\n\nMit freundlichen Grüßen\nAli Demir",
    isExamTask: true
  },
  {
    id: "write-03",
    title: "Deutschkurs erfragen",
    category: "Kurs",
    recipient: "das Sprachzentrum Nord",
    situation: "Sie möchten sich für einen Abendkurs anmelden und brauchen Informationen.",
    points: ["nach Uhrzeit fragen", "nach Preis fragen", "nach Dauer fragen", "nach freiem Platz fragen"],
    tips: ["Fragen deutlich formulieren", "Betreff passend wählen", "höflich schließen"],
    sampleSubject: "Fragen zu Ihrem Abendkurs",
    sampleText:
      "Sehr geehrte Damen und Herren,\n\nich interessiere mich für Ihren Deutsch-Abendkurs. Ich arbeite tagsüber und suche deshalb einen Kurs am Abend. Ich möchte gern wissen, wann der Unterricht beginnt, wie viel der Kurs kostet und wie lange er dauert. Bitte schreiben Sie mir auch, ob noch freie Plätze vorhanden sind.\n\nVielen Dank im Voraus.\nMit freundlichen Grüßen\nLeyla Kara"
  },
  {
    id: "write-04",
    title: "Termin beim Amt verschieben",
    category: "Behörde",
    recipient: "das Bürgeramt",
    situation: "Sie haben für Donnerstag einen Termin, können aber nicht kommen.",
    points: ["Termin nennen", "Grund angeben", "um neuen Termin bitten", "telefonische Rückmeldung anbieten"],
    tips: ["Datum nennen", "kurz und klar schreiben", "Kontaktmöglichkeit angeben"],
    sampleSubject: "Bitte um neuen Termin",
    sampleText:
      "Sehr geehrte Damen und Herren,\n\nich habe am Donnerstag, den 14. Juli, um 10 Uhr einen Termin bei Ihnen. Leider kann ich an diesem Tag nicht kommen, weil ich kurzfristig arbeiten muss. Ich bitte Sie deshalb um einen neuen Termin in der nächsten Woche. Sie können mich gern telefonisch unter 0176 22334455 erreichen.\n\nMit freundlichen Grüßen\nMurat Akin"
  },
  {
    id: "write-05",
    title: "Entschuldigung für das Kind",
    category: "Schule",
    recipient: "die Klassenlehrerin",
    situation: "Ihr Kind war zwei Tage krank und konnte nicht in die Schule kommen.",
    points: ["Grund nennen", "Zeitraum nennen", "um Hausaufgaben bitten", "für Verständnis danken"],
    tips: ["einfach formulieren", "alle Daten korrekt nennen", "am Ende höflich danken"],
    sampleSubject: "Entschuldigung für Emre Kaya",
    sampleText:
      "Liebe Frau Schmitt,\n\nmein Sohn Emre Kaya konnte am Montag und Dienstag nicht in die Schule kommen, weil er krank war. Heute geht es ihm besser und er kommt morgen wieder in den Unterricht. Bitte teilen Sie uns mit, welche Hausaufgaben er nachholen soll. Vielen Dank für Ihr Verständnis.\n\nFreundliche Grüße\nSelin Kaya"
  },
  {
    id: "write-06",
    title: "Bitte an den Vermieter",
    category: "Wohnung",
    recipient: "Herrn Lorenz",
    situation: "Die Heizung in Ihrer Wohnung funktioniert nicht richtig.",
    points: ["Problem beschreiben", "seit wann", "um Reparatur bitten", "wann Sie zu Hause sind"],
    tips: ["genaue Information geben", "freundlich bleiben", "Terminfenster nennen"],
    sampleSubject: "Heizung in der Wohnung defekt",
    sampleText:
      "Sehr geehrter Herr Lorenz,\n\nin meiner Wohnung in der Lindenstraße 8 funktioniert die Heizung seit gestern nicht mehr richtig. Die Heizkörper bleiben kalt, obwohl ich sie eingeschaltet habe. Da es in der Wohnung schon sehr kühl ist, bitte ich Sie um eine schnelle Reparatur. Ich bin heute ab 17 Uhr und morgen den ganzen Vormittag zu Hause.\n\nMit freundlichen Grüßen\nEsra Yilmaz"
  },
  {
    id: "write-07",
    title: "Anfrage im Kindergarten",
    category: "Kindergarten",
    recipient: "die Leiterin",
    situation: "Sie möchten wissen, ob Ihr Kind ab August einen Platz bekommen kann.",
    points: ["Kind vorstellen", "gewünschten Starttermin nennen", "nach Öffnungszeiten fragen", "um Antwort bitten"],
    tips: ["Höflich und kurz", "Fragen bündeln", "Kontaktdaten nicht vergessen"],
    sampleSubject: "Anfrage für einen Kindergartenplatz",
    sampleText:
      "Sehr geehrte Frau Neumann,\n\nich suche ab August einen Kindergartenplatz für meine Tochter Elif. Sie wird im Juli drei Jahre alt. Ich möchte gern wissen, ob in Ihrer Einrichtung noch ein Platz frei ist. Bitte teilen Sie mir auch mit, wie Ihre Öffnungszeiten sind. Ich freue mich über eine Rückmeldung.\n\nMit freundlichen Grüßen\nAylin Öztürk"
  },
  {
    id: "write-08",
    title: "Nachhilfe anfragen",
    category: "Schule",
    recipient: "eine Nachhilfelehrerin",
    situation: "Ihr Sohn braucht Hilfe in Mathematik.",
    points: ["Problem nennen", "Klasse nennen", "nach Preis fragen", "nach freien Zeiten fragen"],
    tips: ["konkrete Angaben machen", "Fragen nummerieren ist nicht nötig", "zum Schluss freundlich bleiben"],
    sampleSubject: "Nachhilfe für meinen Sohn",
    sampleText:
      "Guten Tag,\n\nmein Sohn besucht die 7. Klasse und braucht Unterstützung in Mathematik. Deshalb suche ich eine Nachhilfelehrerin oder einen Nachhilfelehrer. Können Sie mir bitte schreiben, wie viel eine Stunde kostet und an welchen Tagen Sie Zeit haben? Unterricht am Nachmittag wäre für uns am besten.\n\nViele Grüße\nKemal Duran"
  },
  {
    id: "write-09",
    title: "Termin beim Arzt verschieben",
    category: "Arzt",
    recipient: "die Zahnarztpraxis",
    situation: "Sie haben einen Termin am Montagmorgen, müssen aber arbeiten.",
    points: ["Termin nennen", "Grund nennen", "neuen Termin wünschen", "mögliche Zeit nennen"],
    tips: ["Datum und Uhrzeit nennen", "kurz schreiben", "eine Alternative anbieten"],
    sampleSubject: "Neuer Termin bitte",
    sampleText:
      "Guten Tag,\n\nich habe am Montag um 8 Uhr einen Termin in Ihrer Praxis. Leider muss ich an diesem Morgen arbeiten und kann nicht kommen. Ich möchte Sie deshalb um einen neuen Termin bitten. Am besten passen mir Termine am Nachmittag ab 15 Uhr.\n\nMit freundlichen Grüßen\nNihat Polat"
  },
  {
    id: "write-10",
    title: "Info für den Arbeitgeber",
    category: "Arbeit",
    recipient: "Frau Berger",
    situation: "Sie kommen wegen eines Zugausfalls zu spät zur Arbeit.",
    points: ["Problem nennen", "voraussichtliche Ankunft nennen", "sich entschuldigen", "wichtige Unterlagen erwähnen"],
    tips: ["direkt zum Punkt kommen", "kurze Entschuldigung reicht", "realistische Uhrzeit nennen"],
    sampleSubject: "Ich komme heute später",
    sampleText:
      "Liebe Frau Berger,\n\nmein Zug fällt heute Morgen leider aus. Deshalb komme ich nicht pünktlich zur Arbeit. Ich werde voraussichtlich gegen 9.30 Uhr im Büro sein. Es tut mir leid. Die Unterlagen für die Besprechung bringe ich natürlich trotzdem mit.\n\nViele Grüße\nAhmet Sahin"
  },
  {
    id: "write-11",
    title: "Frage zum Sportkurs",
    category: "Freizeit",
    recipient: "das Sportzentrum",
    situation: "Sie möchten einen Schwimmkurs besuchen.",
    points: ["Interesse zeigen", "nach dem Beginn fragen", "nach dem Preis fragen", "nach Ausrüstung fragen"],
    tips: ["vier Punkte klar ansprechen", "knapp bleiben", "mit Dank enden"],
    sampleSubject: "Schwimmkurs für Erwachsene",
    sampleText:
      "Sehr geehrte Damen und Herren,\n\nich interessiere mich für Ihren Schwimmkurs für Erwachsene. Bitte teilen Sie mir mit, wann der nächste Kurs beginnt und wie viel er kostet. Ich möchte auch wissen, ob ich besondere Ausrüstung mitbringen muss oder ob Badekleidung ausreicht.\n\nVielen Dank im Voraus.\nMit freundlichen Grüßen\nFatma Celik"
  },
  {
    id: "write-12",
    title: "Bitte an die Nachbarn",
    category: "Nachbarn",
    recipient: "Familie Rossi",
    situation: "Sie fahren drei Tage weg und brauchen Hilfe mit den Pflanzen.",
    points: ["Reise nennen", "um Hilfe bitten", "kurz erklären, was zu tun ist", "sich bedanken"],
    tips: ["freundlicher Ton", "Aufgabe klar erklären", "Dank nicht vergessen"],
    sampleSubject: "Kleine Bitte",
    sampleText:
      "Liebe Familie Rossi,\n\nich fahre von Freitag bis Sonntag zu meiner Schwester. Deshalb möchte ich Sie um eine kleine Hilfe bitten. Könnten Sie in dieser Zeit bitte meine Pflanzen auf dem Balkon einmal gießen? Ich wäre Ihnen sehr dankbar. Vielen Dank schon im Voraus.\n\nHerzliche Grüße\nDerya Acar"
  },
  {
    id: "write-13",
    title: "Absage für Elternabend",
    category: "Schule",
    recipient: "die Klassenlehrerin",
    situation: "Sie können nicht zum Elternabend kommen.",
    points: ["für Einladung danken", "Grund nennen", "um Informationen bitten", "Kontakt anbieten"],
    tips: ["höflich einsteigen", "Informationen erbitten", "kurz bleiben"],
    sampleSubject: "Elternabend am 5. Mai",
    sampleText:
      "Liebe Frau Weber,\n\nvielen Dank für die Einladung zum Elternabend am 5. Mai. Leider kann ich an diesem Abend nicht teilnehmen, weil ich Spätschicht habe. Ich möchte Sie bitten, mir die wichtigsten Informationen später kurz mitzuteilen. Wenn nötig, können Sie mich gern anrufen.\n\nFreundliche Grüße\nMina Aslan"
  },
  {
    id: "write-14",
    title: "Reklamation im Online-Shop",
    category: "Einkauf",
    recipient: "den Kundenservice",
    situation: "Sie haben Schuhe bestellt, aber die falsche Größe bekommen.",
    points: ["Bestellung nennen", "Problem beschreiben", "Lösung wünschen", "um Antwort bitten"],
    tips: ["Bestellnummer nennen", "konkret bleiben", "freundlich formulieren"],
    sampleSubject: "Falsche Größe geliefert",
    sampleText:
      "Sehr geehrte Damen und Herren,\n\nich habe letzte Woche Sportschuhe in Größe 39 bei Ihnen bestellt. Heute habe ich das Paket erhalten, aber leider ist Größe 37 geliefert worden. Ich bitte Sie um einen Umtausch in die richtige Größe. Bitte schreiben Sie mir, wie ich die falschen Schuhe zurückschicken soll.\n\nMit freundlichen Grüßen\nZehra Kaplan"
  },
  {
    id: "write-15",
    title: "Anmeldung zum Elternkurs",
    category: "Familie",
    recipient: "das Familienzentrum",
    situation: "Sie möchten an einem Elternkurs teilnehmen.",
    points: ["Interesse nennen", "nach freien Plätzen fragen", "nach Kinderbetreuung fragen", "Kontaktdaten angeben"],
    tips: ["klare Bitte", "alle Fragen einbauen", "freundlicher Abschluss"],
    sampleSubject: "Elternkurs im Juni",
    sampleText:
      "Guten Tag,\n\nich interessiere mich für Ihren Elternkurs im Juni. Bitte teilen Sie mir mit, ob noch freie Plätze vorhanden sind. Ich möchte außerdem wissen, ob während des Kurses eine Kinderbetreuung angeboten wird. Sie erreichen mich per E-Mail oder telefonisch unter 0160 1122334.\n\nViele Grüße\nGül Ates"
  },
  {
    id: "write-16",
    title: "Information an den Friseur",
    category: "Freizeit",
    recipient: "den Friseursalon Rubin",
    situation: "Sie kommen zu spät zu Ihrem Termin.",
    points: ["Termin nennen", "Verspätung erklären", "neue Ankunftszeit nennen", "fragen, ob Termin noch möglich ist"],
    tips: ["kurz halten", "neue Uhrzeit sagen", "mit Frage enden"],
    sampleSubject: "Verspätung heute",
    sampleText:
      "Guten Tag,\n\nich habe heute um 14 Uhr einen Termin in Ihrem Salon. Wegen eines Staus komme ich leider später und bin wahrscheinlich erst gegen 14.20 Uhr da. Ich möchte Sie fragen, ob der Termin trotzdem noch möglich ist. Vielen Dank für Ihre Rückmeldung.\n\nMit freundlichen Grüßen\nSeda Ekin"
  },
  {
    id: "write-17",
    title: "Bitte an den Deutschlehrer",
    category: "Kurs",
    recipient: "Herrn Stein",
    situation: "Sie haben die Hausaufgabe nicht verstanden.",
    points: ["Problem nennen", "um Erklärung bitten", "Lernwunsch zeigen", "Vorschlag für Gespräch machen"],
    tips: ["respektvoll schreiben", "Lernmotivation zeigen", "konkrete Bitte formulieren"],
    sampleSubject: "Frage zur Hausaufgabe",
    sampleText:
      "Lieber Herr Stein,\n\nich habe die Hausaufgabe von gestern leider nicht ganz verstanden. Besonders die Aufgabe mit den Nebensätzen ist für mich noch schwierig. Ich möchte das Thema aber gern besser lernen. Können Sie mir bitte morgen kurz erklären, was ich machen soll? Wenn nötig, bleibe ich nach dem Unterricht noch fünf Minuten da.\n\nViele Grüße\nHassan Noor"
  },
  {
    id: "write-18",
    title: "Rückfrage zur Rechnung",
    category: "Finanzen",
    recipient: "den Handy-Anbieter",
    situation: "Ihre letzte Rechnung ist höher als sonst.",
    points: ["Rechnung nennen", "Unterschied beschreiben", "um Prüfung bitten", "um schriftliche Antwort bitten"],
    tips: ["sachlich bleiben", "Monat nennen", "klare Bitte formulieren"],
    sampleSubject: "Bitte um Prüfung meiner Rechnung",
    sampleText:
      "Sehr geehrte Damen und Herren,\n\nmeine Handy-Rechnung für den Monat April ist deutlich höher als sonst. Normalerweise zahle ich ungefähr 25 Euro, diesmal sind es 46 Euro. Ich bitte Sie, die Rechnung zu prüfen und mir den Grund dafür mitzuteilen. Bitte antworten Sie mir schriftlich per E-Mail.\n\nMit freundlichen Grüßen\nBurak Sönmez"
  },
  {
    id: "write-19",
    title: "Frage zum Praktikum",
    category: "Arbeit",
    recipient: "eine Firma",
    situation: "Sie möchten ein zweiwöchiges Praktikum machen.",
    points: ["sich kurz vorstellen", "Interesse nennen", "nach Zeitraum fragen", "um Rückmeldung bitten"],
    tips: ["kurze Vorstellung reicht", "klarer Wunsch", "freundlicher Schluss"],
    sampleSubject: "Anfrage für ein Praktikum",
    sampleText:
      "Sehr geehrte Damen und Herren,\n\nmein Name ist Elif Korkmaz und ich besuche zurzeit einen Berufssprachkurs. Ich interessiere mich sehr für ein zweiwöchiges Praktikum in Ihrem Büro, weil ich Erfahrung im Verwaltungsbereich sammeln möchte. Bitte teilen Sie mir mit, ob ein Praktikum im August möglich ist. Ich freue mich auf Ihre Rückmeldung.\n\nMit freundlichen Grüßen\nElif Korkmaz"
  },
  {
    id: "write-20",
    title: "Nachfrage zur Veranstaltung",
    category: "Freizeit",
    recipient: "das Kulturhaus",
    situation: "Sie möchten mit Freunden an einer Veranstaltung teilnehmen.",
    points: ["Veranstaltung nennen", "nach Beginn fragen", "nach Eintrittspreis fragen", "nach Reservierung fragen"],
    tips: ["alle Fragen sammeln", "klar strukturieren", "mit Dank enden"],
    sampleSubject: "Fragen zur Veranstaltung am Freitag",
    sampleText:
      "Guten Tag,\n\nich interessiere mich für die Veranstaltung am Freitag in Ihrem Kulturhaus. Ich möchte mit drei Freunden kommen und habe noch einige Fragen. Bitte teilen Sie mir mit, wann die Veranstaltung beginnt, wie viel der Eintritt kostet und ob man Plätze reservieren muss. Vielen Dank für Ihre Antwort.\n\nFreundliche Grüße\nRana Tunc"
  }
];

export const speakingIntroPrompt: SpeakingIntroPrompt = {
  prompts: [
    "Wie heißen Sie?",
    "Woher kommen Sie?",
    "Was machen Sie beruflich oder in Ihrer Freizeit?",
    "Mit wem wohnen Sie zusammen?",
    "Warum lernen Sie Deutsch?"
  ],
  phraseBank: [
    "Ich heiße ...",
    "Ich komme aus ...",
    "Zurzeit arbeite ich als ...",
    "In meiner Freizeit ...",
    "Ich lerne Deutsch, weil ..."
  ],
  sampleAnswer:
    "Guten Tag. Ich heiße Merve Kaya und komme aus der Türkei. Ich wohne seit zwei Jahren in Deutschland und arbeite vormittags in einer Bäckerei. In meiner Freizeit lese ich gern und treffe Freunde. Ich lerne Deutsch, weil ich im Beruf sicherer sprechen und später eine Ausbildung machen möchte."
};

export const speakingPlanningTasks: SpeakingPlanningTask[] = [
  {
    id: "plan-01",
    title: "Geburtstag im Park",
    setting: "Sie möchten am Samstag den Geburtstag eines Freundes im Park feiern.",
    roleA: ["Ort vorschlagen", "Getränke mitbringen", "Uhrzeit festlegen", "an schlechtes Wetter denken"],
    roleB: ["Einladung an Freunde", "Essen organisieren", "Musik oder Spiele", "Rückfahrt besprechen"],
    usefulPhrases: ["Wie wäre es mit ...?", "Sollen wir ...?", "Das finde ich gut.", "Dann machen wir das so."],
    sampleDirection:
      "Die Partner einigen sich auf einen Park, treffen sich um 15 Uhr und teilen Essen, Getränke und Einladungen auf.",
    isExamTask: true
  },
  {
    id: "plan-02",
    title: "Gemeinsam grillen",
    setting: "Sie wollen mit Nachbarn am Sonntag grillen.",
    roleA: ["Ort und Zeit festlegen", "Grill mitbringen", "Fleisch oder Gemüse planen", "Kinder berücksichtigen"],
    roleB: ["Getränke kaufen", "Teller und Besteck bringen", "Salate vorbereiten", "bei Regen Alternative suchen"],
    usefulPhrases: ["Ich schlage vor ...", "Kannst du ...?", "Wir brauchen auch ...", "Einverstanden."],
    sampleDirection:
      "Die beiden sprechen über den Innenhof, teilen die Einkäufe auf und verabreden eine Regen-Alternative im Gemeinschaftsraum."
  },
  {
    id: "plan-03",
    title: "Ausflug mit dem Deutschkurs",
    setting: "Sie möchten mit Ihrer Lerngruppe einen Ausflug machen.",
    roleA: ["Ziel aussuchen", "Treffpunkt nennen", "Kosten prüfen", "Tickets besorgen"],
    roleB: ["Essen mitnehmen", "Rückfahrt planen", "weitere Teilnehmer informieren", "Fotografieren oder dokumentieren"],
    usefulPhrases: ["Was meinst du zu ...?", "Das passt gut.", "Vielleicht ist ... besser.", "Wer übernimmt ...?"],
    sampleDirection:
      "Am Ende steht ein gemeinsamer Museumsbesuch mit Treffpunkt am Bahnhof und klar aufgeteilten Aufgaben."
  },
  {
    id: "plan-04",
    title: "Lerntag für die Prüfung",
    setting: "Sie möchten sich am Wochenende mit einer Partnerin auf die DTZ-Prüfung vorbereiten.",
    roleA: ["Ort wählen", "Material mitbringen", "Themen festlegen", "Pausen planen"],
    roleB: ["Uhrzeit vorschlagen", "Getränke und Snacks", "Sprechen üben", "am Ende Wiederholung planen"],
    usefulPhrases: ["Lass uns zuerst ...", "Danach können wir ...", "Eine Pause wäre gut.", "Zum Schluss ..."],
    sampleDirection:
      "Beide planen einen Lerntag in der Bibliothek mit festen Zeiten für Lesen, Schreiben und Sprechen."
  },
  {
    id: "plan-05",
    title: "Familienausflug",
    setting: "Sie möchten mit Kindern einen Ausflug für Sonntag planen.",
    roleA: ["geeigneten Ort suchen", "Abfahrt besprechen", "Eintritt prüfen", "Wetter beachten"],
    roleB: ["Essen vorbereiten", "Spiele oder Kleidung überlegen", "Rückkehrzeit festlegen", "Kosten teilen"],
    usefulPhrases: ["Dann nehmen wir ...", "Das ist zu teuer / günstig.", "Wir könnten auch ...", "Gute Idee."],
    sampleDirection:
      "Die Partner planen einen Ausflug zum Tierpark mit Picknick und früher Rückfahrt."
  }
];

export const phaseOneExamMeta = {
  id: "model-1",
  title: "Modellprüfung 1",
  subtitle: "Vollständige Phase-1-Prüfung für DTZ A2/B1 mit Fokus auf B1",
  durationLabel: "ca. 95 Minuten",
  sections: [
    { id: "listening", title: "Hören", parts: ["Teil 1", "Teil 2", "Teil 3", "Teil 4"], taskCount: 6 },
    { id: "reading", title: "Lesen", parts: ["Teil 1", "Teil 2", "Teil 3", "Teil 4"], taskCount: 8 },
    { id: "writing", title: "Schreiben", parts: ["Teil 1", "Teil 2"], taskCount: 2 },
    { id: "speaking", title: "Sprechen", parts: ["Teil 1", "Teil 2", "Teil 3"], taskCount: 3 }
  ]
} as const;

export function getPhaseOneTaskSummary(taskId: string) {
  const listeningChoice = listeningChoiceTasks.find((task) => task.id === taskId);
  if (listeningChoice) {
    return { title: listeningChoice.title, prompt: listeningChoice.question };
  }

  const listeningBinary = listeningTrueFalseTasks.find((task) => task.id === taskId);
  if (listeningBinary) {
    return { title: listeningBinary.title, prompt: listeningBinary.instruction };
  }

  const readingChoice = readingChoiceTasks.find((task) => task.id === taskId);
  if (readingChoice) {
    return { title: readingChoice.title, prompt: taskId === readingChoice.id ? readingChoice.question : readingChoice.text };
  }

  const readingSituation =
    readingMatchingTask.situations.find((situation) => situation.id === taskId) ??
    readingBuildingTask.situations.find((situation) => situation.id === taskId);
  if (readingSituation) {
    return { title: "Lesen: Zuordnung", prompt: readingSituation.text };
  }

  const writingScenario = writingScenarios.find((task) => task.id === taskId);
  if (writingScenario) {
    return { title: writingScenario.title, prompt: writingScenario.situation };
  }

  const photoPrompt = speakingPhotoPrompts.find((task) => task.id === taskId);
  if (photoPrompt) {
    return { title: photoPrompt.title, prompt: photoPrompt.sceneLabel };
  }

  const planningPrompt = speakingPlanningTasks.find((task) => task.id === taskId);
  if (planningPrompt) {
    return { title: planningPrompt.title, prompt: planningPrompt.setting };
  }

  return null;
}
