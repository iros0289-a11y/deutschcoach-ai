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
    title: "HÃ¶ren",
    subtitle: "Ansagen, Dialoge und Mitteilungen",
    focus: "Informationen genau hÃ¶ren und Details sicher unterscheiden."
  },
  reading: {
    title: "Lesen",
    subtitle: "Anzeigen, PlÃ¤ne, E-Mails und FahrplÃ¤ne",
    focus: "Die passende Information schnell finden und richtig zuordnen."
  },
  writing: {
    title: "Schreiben",
    subtitle: "E-Mails und Briefe aus dem Alltag",
    focus: "Vier Inhaltspunkte klar, hÃ¶flich und vollstÃ¤ndig bearbeiten."
  },
  speaking: {
    title: "Sprechen",
    subtitle: "Vorstellung, Bildbeschreibung und Planung",
    focus: "Einfach, klar und zusammenhÃ¤ngend sprechen."
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
    title: "GesprÃ¤ch beim Arzt",
    sceneLabel: "Beim Arzt",
    image: require("../../../assets/images/speaking/scene-02.png"),
    guidingQuestions: ["Wer spricht miteinander?", "Warum ist der Mann dort?", "Was kÃ¶nnte als NÃ¤chstes passieren?"],
    phraseBank: ["Der Arzt erklÃ¤rt ...", "Der Patient hat wahrscheinlich ...", "Danach bekommt er ..."],
    sampleAnswer:
      "Ich sehe einen Arzt und einen Patienten. Der Arzt erklÃ¤rt etwas und hÃ¤lt vielleicht ein Medikament oder eine Spritze in der Hand. Der Mann ist wahrscheinlich krank oder braucht eine Untersuchung. Danach bekommt er vielleicht ein Rezept oder einen neuen Termin.",
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
      "Auf dem Bild ist eine Frau im Supermarkt. Sie steht vor einem Regal mit GemÃ¼se und Obst. Vielleicht sucht sie frische Lebensmittel fÃ¼r das Abendessen. Ich kaufe meistens im Supermarkt ein, weil es schnell und praktisch ist."
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
    guidingQuestions: ["Wer ist im Klassenraum?", "Was passiert im Unterricht?", "Welches Schulfach mochten Sie frÃ¼her?"],
    phraseBank: ["Die Lehrerin zeigt ...", "Die Kinder hÃ¶ren zu ...", "FrÃ¼her mochte ich ..."],
    sampleAnswer:
      "Auf dem Bild sehe ich einen Klassenraum mit einer Lehrerin und mehreren Kindern. Die Lehrerin erklÃ¤rt etwas an der Tafel und die Kinder hÃ¶ren zu. Die Stimmung wirkt konzentriert. FrÃ¼her mochte ich besonders Sprachen und Geschichte."
  },
  {
    id: "photo-06",
    title: "Kochen zu Hause",
    sceneLabel: "Zu Hause",
    image: require("../../../assets/images/speaking/scene-06.png"),
    guidingQuestions: ["Was macht die Frau in der KÃ¼che?", "Kocht sie allein oder fÃ¼r andere?", "Kochen Sie gern?"],
    phraseBank: ["Sie bereitet gerade ... vor", "Auf dem Tisch liegen ...", "Bei mir zu Hause ..."],
    sampleAnswer:
      "Ich sehe eine Frau in der KÃ¼che. Sie schneidet oder mischt etwas und bereitet wahrscheinlich eine Mahlzeit vor. Vielleicht kocht sie fÃ¼r ihre Familie. Ich koche auch gern, besonders am Wochenende, wenn ich mehr Zeit habe."
  },
  {
    id: "photo-07",
    title: "Treffen im Restaurant",
    sceneLabel: "Im Restaurant",
    image: require("../../../assets/images/speaking/scene-07.png"),
    guidingQuestions: ["Wie viele Personen sitzen am Tisch?", "Warum treffen sie sich?", "Gehen Sie gern essen?"],
    phraseBank: ["Am Tisch sitzen ...", "MÃ¶glicherweise feiern sie ...", "Ich gehe gern / nicht so gern ..."],
    sampleAnswer:
      "Auf dem Bild sitzen mehrere Personen in einem Restaurant. Vielleicht essen sie zusammen zu Mittag oder besprechen etwas Wichtiges. Die AtmosphÃ¤re ist freundlich und ruhig. Ich gehe gern mit Freunden essen, weil man dabei gut reden kann."
  },
  {
    id: "photo-08",
    title: "Arbeiten im BÃ¼ro",
    sceneLabel: "Am Arbeitsplatz",
    image: require("../../../assets/images/speaking/scene-08.png"),
    guidingQuestions: ["Was macht der Mann im BÃ¼ro?", "Wie sieht der Arbeitsplatz aus?", "Arbeiten Sie lieber allein oder im Team?"],
    phraseBank: ["Er konzentriert sich auf ...", "Auf dem Schreibtisch steht ...", "Ich arbeite lieber ..."],
    sampleAnswer:
      "Ich sehe einen Mann an seinem Schreibtisch. Er arbeitet am Computer und scheint sehr konzentriert zu sein. Der Arbeitsplatz sieht modern und ordentlich aus. Ich arbeite am liebsten im Team, aber fÃ¼r manche Aufgaben arbeite ich auch gern allein."
  },
  {
    id: "photo-09",
    title: "Kinder auf dem Spielplatz",
    sceneLabel: "Auf dem Spielplatz",
    image: require("../../../assets/images/speaking/scene-09.png"),
    guidingQuestions: ["Was machen die Kinder?", "Ist ein Erwachsener in der NÃ¤he?", "Gab es in Ihrer Kindheit auch einen Spielplatz?"],
    phraseBank: ["Die Kinder klettern ...", "Im Vordergrund sieht man ...", "Als ich klein war ..."],
    sampleAnswer:
      "Auf dem Bild sind Kinder auf einem Spielplatz. Sie klettern und spielen zusammen. Wahrscheinlich ist auch ein Erwachsener in der NÃ¤he, obwohl man ihn hier nicht deutlich sieht. Als ich klein war, habe ich auch oft auf dem Spielplatz gespielt."
  },
  {
    id: "photo-10",
    title: "Einkauf beim BÃ¤cker",
    sceneLabel: "Beim BÃ¤cker",
    image: require("../../../assets/images/speaking/scene-10.png"),
    guidingQuestions: ["Was kauft die Frau vielleicht?", "Wie sieht das GeschÃ¤ft aus?", "Was essen Sie morgens gern?"],
    phraseBank: ["In der Auslage liegen ...", "Die Kundin entscheidet sich vielleicht fÃ¼r ...", "Zum FrÃ¼hstÃ¼ck esse ich ..."],
    sampleAnswer:
      "Hier ist eine Frau in einer BÃ¤ckerei. In der Auslage liegen viele Brote und BrÃ¶tchen. Vielleicht kauft sie etwas fÃ¼r das FrÃ¼hstÃ¼ck oder fÃ¼r die Arbeit. Ich esse morgens gern Brot mit KÃ¤se und trinke dazu Tee."
  },
  {
    id: "photo-11",
    title: "Pause am See",
    sceneLabel: "Am See",
    image: require("../../../assets/images/speaking/scene-11.png"),
    guidingQuestions: ["Wo sitzen die Personen?", "WorÃ¼ber sprechen sie vielleicht?", "Was machen Sie gern in der Natur?"],
    phraseBank: ["Sie sitzen am Ufer ...", "Vielleicht unterhalten sie sich Ã¼ber ...", "In der Natur mache ich gern ..."],
    sampleAnswer:
      "Auf dem Bild sitzen zwei Personen an einem See. Sie sprechen vielleicht Ã¼ber ihren Tag oder genieÃŸen einfach die Ruhe. Die Landschaft sieht sehr schÃ¶n aus. Ich gehe auch gern an einen See oder in einen Park, um mich zu entspannen."
  },
  {
    id: "photo-12",
    title: "Training im Fitnessstudio",
    sceneLabel: "Im Fitnessstudio",
    image: require("../../../assets/images/speaking/scene-12.png"),
    guidingQuestions: ["Was passiert in diesem Raum?", "Warum sind die Personen dort?", "Machen Sie Sport?"],
    phraseBank: ["Die Gruppe hÃ¶rt zu ...", "Vielleicht bekommen sie Anweisungen ...", "Ich mache gern ..."],
    sampleAnswer:
      "Ich sehe mehrere Personen in einem Fitnessstudio oder Kursraum. Vielleicht bekommen sie ErklÃ¤rungen von einer Trainerin. Sie mÃ¶chten wahrscheinlich fit bleiben oder gesÃ¼nder leben. Ich mache auch gern Sport, vor allem Spazierengehen und leichte Ãœbungen."
  },
  {
    id: "photo-13",
    title: "Fahrt mit dem Bus",
    sceneLabel: "Im Bus",
    image: require("../../../assets/images/speaking/scene-13.png"),
    guidingQuestions: ["Wo sitzen die Leute?", "Wie ist die Stimmung?", "Fahren Sie oft mit dem Bus?"],
    phraseBank: ["Die FahrgÃ¤ste sitzen ...", "Es wirkt ...", "Mit dem Bus fahre ich ..."],
    sampleAnswer:
      "Auf dem Bild sitzen viele Menschen in einem Bus. Einige schauen nach vorne, andere sehen aus dem Fenster. Die Stimmung ist eher ruhig. Ich fahre manchmal mit dem Bus, besonders wenn ich in die Stadt oder zum Bahnhof muss."
  },
  {
    id: "photo-14",
    title: "GesprÃ¤ch bei Freunden",
    sceneLabel: "Bei Freunden",
    image: require("../../../assets/images/speaking/scene-14.png"),
    guidingQuestions: ["Wer sitzt zusammen?", "Was besprechen sie vielleicht?", "Treffen Sie Freunde oft zu Hause?"],
    phraseBank: ["Die Personen unterhalten sich Ã¼ber ...", "Vielleicht planen sie ...", "Bei mir zu Hause ..."],
    sampleAnswer:
      "Hier sehe ich vier Personen, die zusammen sitzen und sprechen. Vielleicht sind sie Freunde oder Nachbarn und planen etwas gemeinsam. Die AtmosphÃ¤re wirkt angenehm. Ich treffe Freunde gern zu Hause, weil es dort gemÃ¼tlich ist."
  },
  {
    id: "photo-15",
    title: "Lernen in der Bibliothek",
    sceneLabel: "In der Bibliothek",
    image: require("../../../assets/images/speaking/scene-15.png"),
    guidingQuestions: ["Was macht die Frau?", "Warum lernt sie dort?", "Lernen Sie lieber allein oder mit anderen?"],
    phraseBank: ["Sie liest oder schreibt ...", "Die Bibliothek ist gut, weil ...", "Ich lerne am besten ..."],
    sampleAnswer:
      "Ich sehe eine Frau in einer Bibliothek. Sie liest oder schreibt und arbeitet wahrscheinlich fÃ¼r einen Kurs oder eine PrÃ¼fung. In der Bibliothek ist es ruhig, deshalb kann man sich gut konzentrieren. Ich lerne meistens lieber allein."
  },
  {
    id: "photo-16",
    title: "Warten am Flughafen",
    sceneLabel: "Am Flughafen",
    image: require("../../../assets/images/speaking/scene-16.png"),
    guidingQuestions: ["Wo befinden sich die Menschen?", "Was machen sie dort?", "Sind Sie schon einmal geflogen?"],
    phraseBank: ["Im Hintergrund sieht man ...", "Die Reisenden warten auf ...", "Ich bin schon ..."],
    sampleAnswer:
      "Auf dem Bild sind mehrere Personen an einem Flughafen. Im Hintergrund sieht man eine groÃŸe Anzeigetafel. Die Menschen warten wahrscheinlich auf ihren Flug oder auf andere Reisende. Ich bin schon einmal geflogen und fand es spannend, aber auch ein bisschen stressig."
  },
  {
    id: "photo-17",
    title: "Hilfe beim Umzug",
    sceneLabel: "Beim Umzug",
    image: require("../../../assets/images/speaking/scene-17.png"),
    guidingQuestions: ["Was tragen die Personen?", "Warum arbeiten sie zusammen?", "Sind Sie schon einmal umgezogen?"],
    phraseBank: ["Sie tragen Kisten ...", "Wahrscheinlich helfen sie ...", "Beim Umzug muss man ..."],
    sampleAnswer:
      "Ich sehe drei Personen, die Kisten tragen und zusammen arbeiten. Sie helfen wahrscheinlich bei einem Umzug. Ein Umzug ist oft anstrengend, weil man viel organisieren muss. Ich bin schon umgezogen und weiÃŸ, dass Hilfe von Freunden sehr wichtig ist."
  },
  {
    id: "photo-18",
    title: "Einkauf auf dem Markt",
    sceneLabel: "Auf dem Markt",
    image: require("../../../assets/images/speaking/scene-18.png"),
    guidingQuestions: ["Was sieht man auf dem Markt?", "Warum kaufen viele Menschen dort ein?", "Gehen Sie gern auf den Markt?"],
    phraseBank: ["Dort gibt es ...", "Viele Menschen kaufen dort ein, weil ...", "Ich gehe gern ..."],
    sampleAnswer:
      "Auf dem Bild sieht man einen Markt mit Obst und GemÃ¼se. Mehrere Menschen kaufen dort ein und sprechen vielleicht mit den VerkÃ¤ufern. Auf dem Markt sind die Produkte oft frisch. Ich gehe gern auf den Markt, wenn ich Zeit habe."
  },
  {
    id: "photo-19",
    title: "Termin beim Friseur",
    sceneLabel: "Beim Friseur",
    image: require("../../../assets/images/speaking/scene-19.png"),
    guidingQuestions: ["Was macht die Friseurin?", "Wie fÃ¼hlt sich die Kundin vielleicht?", "Wie oft gehen Sie zum Friseur?"],
    phraseBank: ["Die Friseurin schneidet ...", "Die Kundin wirkt ...", "Normalerweise gehe ich ..."],
    sampleAnswer:
      "Ich sehe eine Friseurin und eine Kundin. Die Friseurin arbeitet gerade an den Haaren der Kundin. Vielleicht bereitet sie einen Haarschnitt oder eine Frisur fÃ¼r einen besonderen Tag vor. Ich gehe ungefÃ¤hr alle zwei Monate zum Friseur."
  },
  {
    id: "photo-20",
    title: "Treffen im CafÃ©",
    sceneLabel: "Im CafÃ©",
    image: require("../../../assets/images/speaking/scene-20.png"),
    guidingQuestions: ["Wer sitzt im CafÃ©?", "WorÃ¼ber sprechen sie vielleicht?", "Treffen Sie sich gern im CafÃ©?"],
    phraseBank: ["Die beiden unterhalten sich Ã¼ber ...", "Vielleicht besprechen sie ...", "Ich treffe mich gern ..."],
    sampleAnswer:
      "Auf dem Bild sitzen zwei Frauen in einem CafÃ© und sprechen miteinander. Vielleicht reden sie Ã¼ber die Arbeit, Ã¼ber die Familie oder planen ein Treffen. Ein CafÃ© ist ein guter Ort fÃ¼r GesprÃ¤che. Ich treffe mich auch gern im CafÃ© mit Freunden."
  }
];

export const speakingPhotoLargeImages: Record<string, ImageSourcePropType> = {
  "photo-01": require("../../../assets/images/speaking/large/scene-01-large.png"),
  "photo-02": require("../../../assets/images/speaking/large/scene-02-large.png"),
  "photo-03": require("../../../assets/images/speaking/large/scene-03-large.png"),
  "photo-04": require("../../../assets/images/speaking/large/scene-04-large.png"),
  "photo-05": require("../../../assets/images/speaking/large/scene-05-large.png"),
  "photo-06": require("../../../assets/images/speaking/large/scene-06-large.png"),
  "photo-07": require("../../../assets/images/speaking/large/scene-07-large.png"),
  "photo-08": require("../../../assets/images/speaking/large/scene-08-large.png"),
  "photo-09": require("../../../assets/images/speaking/large/scene-09-large.png"),
  "photo-10": require("../../../assets/images/speaking/large/scene-10-large.png"),
  "photo-11": require("../../../assets/images/speaking/large/scene-11-large.png"),
  "photo-12": require("../../../assets/images/speaking/large/scene-12-large.png"),
  "photo-13": require("../../../assets/images/speaking/large/scene-13-large.png"),
  "photo-14": require("../../../assets/images/speaking/large/scene-14-large.png"),
  "photo-15": require("../../../assets/images/speaking/large/scene-15-large.png"),
  "photo-16": require("../../../assets/images/speaking/large/scene-16-large.png"),
  "photo-17": require("../../../assets/images/speaking/large/scene-17-large.png"),
  "photo-18": require("../../../assets/images/speaking/large/scene-18-large.png"),
  "photo-19": require("../../../assets/images/speaking/large/scene-19-large.png"),
  "photo-20": require("../../../assets/images/speaking/large/scene-20-large.png")
};

export function getSpeakingPhotoLargeImage(photoId: string) {
  return speakingPhotoLargeImages[photoId];
}

export const listeningChoiceTasks: ListeningChoiceTask[] = [
  {
    id: "listen-a-1",
    part: "Teil 1",
    title: "Termin in der Arztpraxis",
    topic: "Arzt",
    transcript:
      "Praxis Dr. Schubert, guten Morgen. Frau Yilmaz hÃ¤tte gern einen Termin, weil ihr Kind seit gestern Fieber hat. Der nÃ¤chste freie Termin ist heute um halb vier.",
    durationLabel: "00:27",
    question: "Warum ruft Frau Yilmaz in der Praxis an?",
    options: [
      { id: "a", label: "A", text: "Sie mÃ¶chte ein Rezept abholen." },
      { id: "b", label: "B", text: "Sie mÃ¶chte einen Termin vereinbaren." },
      { id: "c", label: "C", text: "Sie mÃ¶chte die Rechnung bezahlen." }
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
      "Wegen einer Baustelle fÃ¤hrt der Bus 18 heute nicht Ã¼ber den Marktplatz. Bitte steigen Sie an der Haltestelle Rathaus aus und gehen Sie fÃ¼nf Minuten zu FuÃŸ.",
    durationLabel: "00:18",
    question: "Was sollen die FahrgÃ¤ste machen?",
    options: [
      { id: "a", label: "A", text: "Sie sollen am Rathaus aussteigen." },
      { id: "b", label: "B", text: "Sie sollen im Bus sitzen bleiben." },
      { id: "c", label: "C", text: "Sie sollen auf die StraÃŸenbahn umsteigen." }
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
      "Liebe Eltern, am Freitag endet der Unterricht schon um zwÃ¶lf Uhr. Das Schulfest beginnt erst um 15 Uhr. Bitte bringen Sie Kuchen oder GetrÃ¤nke nur am Nachmittag in die Aula.",
    durationLabel: "00:28",
    instruction: "HÃ¶ren Sie die Nachricht und entscheiden Sie: richtig oder falsch?",
    statements: [
      {
        id: "s1",
        text: "Am Freitag ist um zwÃ¶lf Uhr Schulschluss.",
        isTrue: true,
        explanation: "Die Nachricht sagt: Der Unterricht endet schon um zwÃ¶lf Uhr."
      },
      {
        id: "s2",
        text: "Das Schulfest beginnt direkt nach dem Unterricht.",
        isTrue: false,
        explanation: "Das Fest beginnt erst um 15 Uhr."
      },
      {
        id: "s3",
        text: "Die Eltern sollen Essen und GetrÃ¤nke in die Aula bringen.",
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
      "Im Haus wird am Mittwoch das Wasser von 9 bis 13 Uhr abgestellt. Bitte fÃ¼llen Sie vorher etwas Trinkwasser ab. Die Handwerker arbeiten im Keller und nicht in den Wohnungen.",
    durationLabel: "00:23",
    instruction: "HÃ¶ren Sie die Durchsage und markieren Sie richtig oder falsch.",
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
        explanation: "Die Verwaltung bittet darum, Trinkwasser abzufÃ¼llen."
      },
      {
        id: "s3",
        text: "Die Handwerker kommen in jede Wohnung.",
        isTrue: false,
        explanation: "Im Text steht ausdrÃ¼cklich, dass sie im Keller arbeiten."
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
      body: "Helles Zimmer, 16 qm, ab sofort frei. Bushaltestelle direkt vor der TÃ¼r.",
      contact: "Tel. 0176 441102"
    },
    {
      id: "ad-b",
      title: "Deutschkurs am Abend",
      body: "Montag und Donnerstag, 18 bis 20 Uhr. FÃ¼r BerufstÃ¤tige.",
      contact: "info@sprachpunkt.de"
    },
    {
      id: "ad-c",
      title: "Suche Babysitter",
      body: "FÃ¼r zwei Kinder, mittwochs und freitags von 16 bis 19 Uhr.",
      contact: "Tel. 0228 553128"
    },
    {
      id: "ad-d",
      title: "Flohmarkt am Samstag",
      body: "Verkaufen erlaubt mit Anmeldung. StandgebÃ¼hr 8 Euro.",
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
      body: "Kostenloser Workshop fÃ¼r Arbeitssuchende mit Lebenslauf-Beratung.",
      contact: "Tel. 0151 765009"
    }
  ],
  situations: [
    {
      id: "sit-1",
      text: "Herr Kaya sucht ein Zimmer und mÃ¶chte ohne Auto gut zur Arbeit kommen.",
      correctId: "ad-a",
      explanation: "Das Zimmer liegt direkt an der Bushaltestelle."
    },
    {
      id: "sit-2",
      text: "Frau Mendes arbeitet tagsÃ¼ber und mÃ¶chte nach Feierabend Deutsch lernen.",
      correctId: "ad-b",
      explanation: "Der Kurs findet am Abend statt und passt zu BerufstÃ¤tigen."
    },
    {
      id: "sit-3",
      text: "Ein Ehepaar mÃ¶chte alte Kleidung und Spielsachen verkaufen.",
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
      text: "Frau Romano braucht einen neuen Hausarzt fÃ¼r ihre Familie.",
      correctId: "ad-e",
      explanation: "Die Hausarztpraxis nimmt neue Patienten auf."
    }
  ]
};

export const readingBuildingTask: ReadingBuildingTask = {
  id: "read-building-1",
  title: "GebÃ¤udeplan zuordnen",
  buildingName: "BÃ¼rgerzentrum Nord",
  instruction: "Lesen Sie den Plan und ordnen Sie die Situationen der richtigen Etage zu.",
  levels: [
    { id: "floor-0", name: "Erdgeschoss", places: ["Information", "Kasse", "Wartebereich"] },
    { id: "floor-1", name: "1. Obergeschoss", places: ["BÃ¼rgeramt", "Anmeldung", "Ausweise"] },
    { id: "floor-2", name: "2. Obergeschoss", places: ["Jugendamt", "Familienberatung"] },
    { id: "floor-3", name: "3. Obergeschoss", places: ["Wohnungsstelle", "Sozialberatung"] },
    { id: "floor-4", name: "4. Obergeschoss", places: ["Sprachkurse", "SeminarrÃ¤ume"] }
  ],
  situations: [
    {
      id: "floor-sit-1",
      text: "Herr Ã–zkan mÃ¶chte seinen neuen Personalausweis beantragen.",
      correctId: "floor-1",
      explanation: "Ausweise und Anmeldung sind im 1. Obergeschoss."
    },
    {
      id: "floor-sit-2",
      text: "Frau Becker sucht Beratung fÃ¼r ihre Wohnungssituation.",
      correctId: "floor-3",
      explanation: "Wohnungsstelle und Sozialberatung liegen im 3. Obergeschoss."
    },
    {
      id: "floor-sit-3",
      text: "Ein Vater braucht UnterstÃ¼tzung bei Fragen zur Familie.",
      correctId: "floor-2",
      explanation: "Familienberatung findet im 2. Obergeschoss statt."
    },
    {
      id: "floor-sit-4",
      text: "Frau Aydin mÃ¶chte sich fÃ¼r einen Integrationskurs anmelden.",
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
    question: "Was mÃ¼ssen die Eltern bis Montag machen?",
    options: [
      { id: "a", label: "A", text: "Sie mÃ¼ssen eine Trinkflasche kaufen." },
      { id: "b", label: "B", text: "Sie mÃ¼ssen die Erlaubnis unterschreiben." },
      { id: "c", label: "C", text: "Sie mÃ¼ssen im Tierpark anrufen." }
    ],
    correctOptionId: "b",
    explanation: "Im Text steht ausdrÃ¼cklich, dass die unterschriebene Erlaubnis bis Montag mitgegeben werden muss."
  },
  {
    id: "read-choice-2",
    title: "Aushang im Treppenhaus",
    format: "Aushang",
    sourceTitle: "Reinigung der Fenster",
    text:
      "Am Donnerstag werden zwischen 8 und 12 Uhr die Fenster im Treppenhaus gereinigt. Bitte stellen Sie keine FahrrÃ¤der oder Kinderwagen im Eingangsbereich ab.",
    question: "Was dÃ¼rfen die Bewohner am Donnerstagmorgen nicht machen?",
    options: [
      { id: "a", label: "A", text: "Sie dÃ¼rfen keine FahrrÃ¤der im Eingangsbereich stehen lassen." },
      { id: "b", label: "B", text: "Sie dÃ¼rfen das Haus nicht verlassen." },
      { id: "c", label: "C", text: "Sie dÃ¼rfen die Fenster nicht Ã¶ffnen." }
    ],
    correctOptionId: "a",
    explanation: "Der Aushang verbietet FahrrÃ¤der und Kinderwagen im Eingangsbereich."
  },
  {
    id: "read-choice-3",
    title: "Fahrplan am Bahnhof",
    format: "Fahrplan",
    sourceTitle: "Regionalzug RE 7",
    text:
      "Abfahrt Bonn Hbf 08:12, KÃ¶ln SÃ¼d 08:34, KÃ¶ln Hbf 08:41. Am Samstag fÃ¤hrt der Zug zehn Minuten spÃ¤ter.",
    question: "Wann fÃ¤hrt der Zug am Samstag in Bonn ab?",
    options: [
      { id: "a", label: "A", text: "Um 08:12 Uhr" },
      { id: "b", label: "B", text: "Um 08:22 Uhr" },
      { id: "c", label: "C", text: "Um 08:41 Uhr" }
    ],
    correctOptionId: "b",
    explanation: "Am Samstag fÃ¤hrt der Zug zehn Minuten spÃ¤ter als normal."
  }
];

export const writingScenarios: WritingScenario[] = [
  {
    id: "write-01",
    title: "Einladung absagen",
    category: "Freunde",
    recipient: "Frau Huber",
    situation: "Sie sind zu einer Geburtstagsfeier eingeladen, kÃ¶nnen aber nicht kommen.",
    points: ["fÃ¼r die Einladung danken", "Grund nennen", "einen anderen Termin vorschlagen", "GlÃ¼ckwÃ¼nsche schicken"],
    tips: ["freundlich beginnen", "alle vier Punkte ansprechen", "am Ende einen guten Wunsch formulieren"],
    sampleSubject: "Ihre Einladung am Samstag",
    sampleText:
      "Liebe Frau Huber,\n\nvielen Dank fÃ¼r Ihre Einladung zu Ihrer Geburtstagsfeier. Leider kann ich am Samstag nicht kommen, weil ich an diesem Tag arbeiten muss. Ich wÃ¼rde Sie aber gern nÃ¤chste Woche besuchen. Haben Sie am Mittwochabend Zeit? Ich wÃ¼nsche Ihnen schon jetzt alles Gute und eine schÃ¶ne Feier.\n\nViele GrÃ¼ÃŸe\nSara Yildiz",
    isExamTask: true
  },
  {
    id: "write-02",
    title: "Beschwerde Ã¼ber LÃ¤rm",
    category: "Wohnung",
    recipient: "die Hausverwaltung",
    situation: "Seit einigen Wochen ist es abends im Haus sehr laut.",
    points: ["Problem beschreiben", "Zeit nennen", "um Hilfe bitten", "eine LÃ¶sung vorschlagen"],
    tips: ["sachlich schreiben", "nicht zu emotional formulieren", "klare Bitte nennen"],
    sampleSubject: "LÃ¤rm im Haus",
    sampleText:
      "Sehr geehrte Damen und Herren,\n\nich wohne seit zwei Jahren in der GartenstraÃŸe 14. Seit einigen Wochen ist es abends oft sehr laut im Haus. Besonders zwischen 22 und 24 Uhr hÃ¶re ich laute Musik und GesprÃ¤che im Treppenhaus. Ich muss morgens frÃ¼h zur Arbeit und kann deshalb schlecht schlafen. KÃ¶nnten Sie bitte mit den Bewohnern sprechen? Vielleicht kann auch ein Hinweis im Hausflur helfen.\n\nMit freundlichen GrÃ¼ÃŸen\nAli Demir",
    isExamTask: true
  },
  {
    id: "write-03",
    title: "Deutschkurs erfragen",
    category: "Kurs",
    recipient: "das Sprachzentrum Nord",
    situation: "Sie mÃ¶chten sich fÃ¼r einen Abendkurs anmelden und brauchen Informationen.",
    points: ["nach Uhrzeit fragen", "nach Preis fragen", "nach Dauer fragen", "nach freiem Platz fragen"],
    tips: ["Fragen deutlich formulieren", "Betreff passend wÃ¤hlen", "hÃ¶flich schlieÃŸen"],
    sampleSubject: "Fragen zu Ihrem Abendkurs",
    sampleText:
      "Sehr geehrte Damen und Herren,\n\nich interessiere mich fÃ¼r Ihren Deutsch-Abendkurs. Ich arbeite tagsÃ¼ber und suche deshalb einen Kurs am Abend. Ich mÃ¶chte gern wissen, wann der Unterricht beginnt, wie viel der Kurs kostet und wie lange er dauert. Bitte schreiben Sie mir auch, ob noch freie PlÃ¤tze vorhanden sind.\n\nVielen Dank im Voraus.\nMit freundlichen GrÃ¼ÃŸen\nLeyla Kara"
  },
  {
    id: "write-04",
    title: "Termin beim Amt verschieben",
    category: "BehÃ¶rde",
    recipient: "das BÃ¼rgeramt",
    situation: "Sie haben fÃ¼r Donnerstag einen Termin, kÃ¶nnen aber nicht kommen.",
    points: ["Termin nennen", "Grund angeben", "um neuen Termin bitten", "telefonische RÃ¼ckmeldung anbieten"],
    tips: ["Datum nennen", "kurz und klar schreiben", "KontaktmÃ¶glichkeit angeben"],
    sampleSubject: "Bitte um neuen Termin",
    sampleText:
      "Sehr geehrte Damen und Herren,\n\nich habe am Donnerstag, den 14. Juli, um 10 Uhr einen Termin bei Ihnen. Leider kann ich an diesem Tag nicht kommen, weil ich kurzfristig arbeiten muss. Ich bitte Sie deshalb um einen neuen Termin in der nÃ¤chsten Woche. Sie kÃ¶nnen mich gern telefonisch unter 0176 22334455 erreichen.\n\nMit freundlichen GrÃ¼ÃŸen\nMurat Akin"
  },
  {
    id: "write-05",
    title: "Entschuldigung fÃ¼r das Kind",
    category: "Schule",
    recipient: "die Klassenlehrerin",
    situation: "Ihr Kind war zwei Tage krank und konnte nicht in die Schule kommen.",
    points: ["Grund nennen", "Zeitraum nennen", "um Hausaufgaben bitten", "fÃ¼r VerstÃ¤ndnis danken"],
    tips: ["einfach formulieren", "alle Daten korrekt nennen", "am Ende hÃ¶flich danken"],
    sampleSubject: "Entschuldigung fÃ¼r Emre Kaya",
    sampleText:
      "Liebe Frau Schmitt,\n\nmein Sohn Emre Kaya konnte am Montag und Dienstag nicht in die Schule kommen, weil er krank war. Heute geht es ihm besser und er kommt morgen wieder in den Unterricht. Bitte teilen Sie uns mit, welche Hausaufgaben er nachholen soll. Vielen Dank fÃ¼r Ihr VerstÃ¤ndnis.\n\nFreundliche GrÃ¼ÃŸe\nSelin Kaya"
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
      "Sehr geehrter Herr Lorenz,\n\nin meiner Wohnung in der LindenstraÃŸe 8 funktioniert die Heizung seit gestern nicht mehr richtig. Die HeizkÃ¶rper bleiben kalt, obwohl ich sie eingeschaltet habe. Da es in der Wohnung schon sehr kÃ¼hl ist, bitte ich Sie um eine schnelle Reparatur. Ich bin heute ab 17 Uhr und morgen den ganzen Vormittag zu Hause.\n\nMit freundlichen GrÃ¼ÃŸen\nEsra Yilmaz"
  },
  {
    id: "write-07",
    title: "Anfrage im Kindergarten",
    category: "Kindergarten",
    recipient: "die Leiterin",
    situation: "Sie mÃ¶chten wissen, ob Ihr Kind ab August einen Platz bekommen kann.",
    points: ["Kind vorstellen", "gewÃ¼nschten Starttermin nennen", "nach Ã–ffnungszeiten fragen", "um Antwort bitten"],
    tips: ["HÃ¶flich und kurz", "Fragen bÃ¼ndeln", "Kontaktdaten nicht vergessen"],
    sampleSubject: "Anfrage fÃ¼r einen Kindergartenplatz",
    sampleText:
      "Sehr geehrte Frau Neumann,\n\nich suche ab August einen Kindergartenplatz fÃ¼r meine Tochter Elif. Sie wird im Juli drei Jahre alt. Ich mÃ¶chte gern wissen, ob in Ihrer Einrichtung noch ein Platz frei ist. Bitte teilen Sie mir auch mit, wie Ihre Ã–ffnungszeiten sind. Ich freue mich Ã¼ber eine RÃ¼ckmeldung.\n\nMit freundlichen GrÃ¼ÃŸen\nAylin Ã–ztÃ¼rk"
  },
  {
    id: "write-08",
    title: "Nachhilfe anfragen",
    category: "Schule",
    recipient: "eine Nachhilfelehrerin",
    situation: "Ihr Sohn braucht Hilfe in Mathematik.",
    points: ["Problem nennen", "Klasse nennen", "nach Preis fragen", "nach freien Zeiten fragen"],
    tips: ["konkrete Angaben machen", "Fragen nummerieren ist nicht nÃ¶tig", "zum Schluss freundlich bleiben"],
    sampleSubject: "Nachhilfe fÃ¼r meinen Sohn",
    sampleText:
      "Guten Tag,\n\nmein Sohn besucht die 7. Klasse und braucht UnterstÃ¼tzung in Mathematik. Deshalb suche ich eine Nachhilfelehrerin oder einen Nachhilfelehrer. KÃ¶nnen Sie mir bitte schreiben, wie viel eine Stunde kostet und an welchen Tagen Sie Zeit haben? Unterricht am Nachmittag wÃ¤re fÃ¼r uns am besten.\n\nViele GrÃ¼ÃŸe\nKemal Duran"
  },
  {
    id: "write-09",
    title: "Termin beim Arzt verschieben",
    category: "Arzt",
    recipient: "die Zahnarztpraxis",
    situation: "Sie haben einen Termin am Montagmorgen, mÃ¼ssen aber arbeiten.",
    points: ["Termin nennen", "Grund nennen", "neuen Termin wÃ¼nschen", "mÃ¶gliche Zeit nennen"],
    tips: ["Datum und Uhrzeit nennen", "kurz schreiben", "eine Alternative anbieten"],
    sampleSubject: "Neuer Termin bitte",
    sampleText:
      "Guten Tag,\n\nich habe am Montag um 8 Uhr einen Termin in Ihrer Praxis. Leider muss ich an diesem Morgen arbeiten und kann nicht kommen. Ich mÃ¶chte Sie deshalb um einen neuen Termin bitten. Am besten passen mir Termine am Nachmittag ab 15 Uhr.\n\nMit freundlichen GrÃ¼ÃŸen\nNihat Polat"
  },
  {
    id: "write-10",
    title: "Info fÃ¼r den Arbeitgeber",
    category: "Arbeit",
    recipient: "Frau Berger",
    situation: "Sie kommen wegen eines Zugausfalls zu spÃ¤t zur Arbeit.",
    points: ["Problem nennen", "voraussichtliche Ankunft nennen", "sich entschuldigen", "wichtige Unterlagen erwÃ¤hnen"],
    tips: ["direkt zum Punkt kommen", "kurze Entschuldigung reicht", "realistische Uhrzeit nennen"],
    sampleSubject: "Ich komme heute spÃ¤ter",
    sampleText:
      "Liebe Frau Berger,\n\nmein Zug fÃ¤llt heute Morgen leider aus. Deshalb komme ich nicht pÃ¼nktlich zur Arbeit. Ich werde voraussichtlich gegen 9.30 Uhr im BÃ¼ro sein. Es tut mir leid. Die Unterlagen fÃ¼r die Besprechung bringe ich natÃ¼rlich trotzdem mit.\n\nViele GrÃ¼ÃŸe\nAhmet Sahin"
  },
  {
    id: "write-11",
    title: "Frage zum Sportkurs",
    category: "Freizeit",
    recipient: "das Sportzentrum",
    situation: "Sie mÃ¶chten einen Schwimmkurs besuchen.",
    points: ["Interesse zeigen", "nach dem Beginn fragen", "nach dem Preis fragen", "nach AusrÃ¼stung fragen"],
    tips: ["vier Punkte klar ansprechen", "knapp bleiben", "mit Dank enden"],
    sampleSubject: "Schwimmkurs fÃ¼r Erwachsene",
    sampleText:
      "Sehr geehrte Damen und Herren,\n\nich interessiere mich fÃ¼r Ihren Schwimmkurs fÃ¼r Erwachsene. Bitte teilen Sie mir mit, wann der nÃ¤chste Kurs beginnt und wie viel er kostet. Ich mÃ¶chte auch wissen, ob ich besondere AusrÃ¼stung mitbringen muss oder ob Badekleidung ausreicht.\n\nVielen Dank im Voraus.\nMit freundlichen GrÃ¼ÃŸen\nFatma Celik"
  },
  {
    id: "write-12",
    title: "Bitte an die Nachbarn",
    category: "Nachbarn",
    recipient: "Familie Rossi",
    situation: "Sie fahren drei Tage weg und brauchen Hilfe mit den Pflanzen.",
    points: ["Reise nennen", "um Hilfe bitten", "kurz erklÃ¤ren, was zu tun ist", "sich bedanken"],
    tips: ["freundlicher Ton", "Aufgabe klar erklÃ¤ren", "Dank nicht vergessen"],
    sampleSubject: "Kleine Bitte",
    sampleText:
      "Liebe Familie Rossi,\n\nich fahre von Freitag bis Sonntag zu meiner Schwester. Deshalb mÃ¶chte ich Sie um eine kleine Hilfe bitten. KÃ¶nnten Sie in dieser Zeit bitte meine Pflanzen auf dem Balkon einmal gieÃŸen? Ich wÃ¤re Ihnen sehr dankbar. Vielen Dank schon im Voraus.\n\nHerzliche GrÃ¼ÃŸe\nDerya Acar"
  },
  {
    id: "write-13",
    title: "Absage fÃ¼r Elternabend",
    category: "Schule",
    recipient: "die Klassenlehrerin",
    situation: "Sie kÃ¶nnen nicht zum Elternabend kommen.",
    points: ["fÃ¼r Einladung danken", "Grund nennen", "um Informationen bitten", "Kontakt anbieten"],
    tips: ["hÃ¶flich einsteigen", "Informationen erbitten", "kurz bleiben"],
    sampleSubject: "Elternabend am 5. Mai",
    sampleText:
      "Liebe Frau Weber,\n\nvielen Dank fÃ¼r die Einladung zum Elternabend am 5. Mai. Leider kann ich an diesem Abend nicht teilnehmen, weil ich SpÃ¤tschicht habe. Ich mÃ¶chte Sie bitten, mir die wichtigsten Informationen spÃ¤ter kurz mitzuteilen. Wenn nÃ¶tig, kÃ¶nnen Sie mich gern anrufen.\n\nFreundliche GrÃ¼ÃŸe\nMina Aslan"
  },
  {
    id: "write-14",
    title: "Reklamation im Online-Shop",
    category: "Einkauf",
    recipient: "den Kundenservice",
    situation: "Sie haben Schuhe bestellt, aber die falsche GrÃ¶ÃŸe bekommen.",
    points: ["Bestellung nennen", "Problem beschreiben", "LÃ¶sung wÃ¼nschen", "um Antwort bitten"],
    tips: ["Bestellnummer nennen", "konkret bleiben", "freundlich formulieren"],
    sampleSubject: "Falsche GrÃ¶ÃŸe geliefert",
    sampleText:
      "Sehr geehrte Damen und Herren,\n\nich habe letzte Woche Sportschuhe in GrÃ¶ÃŸe 39 bei Ihnen bestellt. Heute habe ich das Paket erhalten, aber leider ist GrÃ¶ÃŸe 37 geliefert worden. Ich bitte Sie um einen Umtausch in die richtige GrÃ¶ÃŸe. Bitte schreiben Sie mir, wie ich die falschen Schuhe zurÃ¼ckschicken soll.\n\nMit freundlichen GrÃ¼ÃŸen\nZehra Kaplan"
  },
  {
    id: "write-15",
    title: "Anmeldung zum Elternkurs",
    category: "Familie",
    recipient: "das Familienzentrum",
    situation: "Sie mÃ¶chten an einem Elternkurs teilnehmen.",
    points: ["Interesse nennen", "nach freien PlÃ¤tzen fragen", "nach Kinderbetreuung fragen", "Kontaktdaten angeben"],
    tips: ["klare Bitte", "alle Fragen einbauen", "freundlicher Abschluss"],
    sampleSubject: "Elternkurs im Juni",
    sampleText:
      "Guten Tag,\n\nich interessiere mich fÃ¼r Ihren Elternkurs im Juni. Bitte teilen Sie mir mit, ob noch freie PlÃ¤tze vorhanden sind. Ich mÃ¶chte auÃŸerdem wissen, ob wÃ¤hrend des Kurses eine Kinderbetreuung angeboten wird. Sie erreichen mich per E-Mail oder telefonisch unter 0160 1122334.\n\nViele GrÃ¼ÃŸe\nGÃ¼l Ates"
  },
  {
    id: "write-16",
    title: "Information an den Friseur",
    category: "Freizeit",
    recipient: "den Friseursalon Rubin",
    situation: "Sie kommen zu spÃ¤t zu Ihrem Termin.",
    points: ["Termin nennen", "VerspÃ¤tung erklÃ¤ren", "neue Ankunftszeit nennen", "fragen, ob Termin noch mÃ¶glich ist"],
    tips: ["kurz halten", "neue Uhrzeit sagen", "mit Frage enden"],
    sampleSubject: "VerspÃ¤tung heute",
    sampleText:
      "Guten Tag,\n\nich habe heute um 14 Uhr einen Termin in Ihrem Salon. Wegen eines Staus komme ich leider spÃ¤ter und bin wahrscheinlich erst gegen 14.20 Uhr da. Ich mÃ¶chte Sie fragen, ob der Termin trotzdem noch mÃ¶glich ist. Vielen Dank fÃ¼r Ihre RÃ¼ckmeldung.\n\nMit freundlichen GrÃ¼ÃŸen\nSeda Ekin"
  },
  {
    id: "write-17",
    title: "Bitte an den Deutschlehrer",
    category: "Kurs",
    recipient: "Herrn Stein",
    situation: "Sie haben die Hausaufgabe nicht verstanden.",
    points: ["Problem nennen", "um ErklÃ¤rung bitten", "Lernwunsch zeigen", "Vorschlag fÃ¼r GesprÃ¤ch machen"],
    tips: ["respektvoll schreiben", "Lernmotivation zeigen", "konkrete Bitte formulieren"],
    sampleSubject: "Frage zur Hausaufgabe",
    sampleText:
      "Lieber Herr Stein,\n\nich habe die Hausaufgabe von gestern leider nicht ganz verstanden. Besonders die Aufgabe mit den NebensÃ¤tzen ist fÃ¼r mich noch schwierig. Ich mÃ¶chte das Thema aber gern besser lernen. KÃ¶nnen Sie mir bitte morgen kurz erklÃ¤ren, was ich machen soll? Wenn nÃ¶tig, bleibe ich nach dem Unterricht noch fÃ¼nf Minuten da.\n\nViele GrÃ¼ÃŸe\nHassan Noor"
  },
  {
    id: "write-18",
    title: "RÃ¼ckfrage zur Rechnung",
    category: "Finanzen",
    recipient: "den Handy-Anbieter",
    situation: "Ihre letzte Rechnung ist hÃ¶her als sonst.",
    points: ["Rechnung nennen", "Unterschied beschreiben", "um PrÃ¼fung bitten", "um schriftliche Antwort bitten"],
    tips: ["sachlich bleiben", "Monat nennen", "klare Bitte formulieren"],
    sampleSubject: "Bitte um PrÃ¼fung meiner Rechnung",
    sampleText:
      "Sehr geehrte Damen und Herren,\n\nmeine Handy-Rechnung fÃ¼r den Monat April ist deutlich hÃ¶her als sonst. Normalerweise zahle ich ungefÃ¤hr 25 Euro, diesmal sind es 46 Euro. Ich bitte Sie, die Rechnung zu prÃ¼fen und mir den Grund dafÃ¼r mitzuteilen. Bitte antworten Sie mir schriftlich per E-Mail.\n\nMit freundlichen GrÃ¼ÃŸen\nBurak SÃ¶nmez"
  },
  {
    id: "write-19",
    title: "Frage zum Praktikum",
    category: "Arbeit",
    recipient: "eine Firma",
    situation: "Sie mÃ¶chten ein zweiwÃ¶chiges Praktikum machen.",
    points: ["sich kurz vorstellen", "Interesse nennen", "nach Zeitraum fragen", "um RÃ¼ckmeldung bitten"],
    tips: ["kurze Vorstellung reicht", "klarer Wunsch", "freundlicher Schluss"],
    sampleSubject: "Anfrage fÃ¼r ein Praktikum",
    sampleText:
      "Sehr geehrte Damen und Herren,\n\nmein Name ist Elif Korkmaz und ich besuche zurzeit einen Berufssprachkurs. Ich interessiere mich sehr fÃ¼r ein zweiwÃ¶chiges Praktikum in Ihrem BÃ¼ro, weil ich Erfahrung im Verwaltungsbereich sammeln mÃ¶chte. Bitte teilen Sie mir mit, ob ein Praktikum im August mÃ¶glich ist. Ich freue mich auf Ihre RÃ¼ckmeldung.\n\nMit freundlichen GrÃ¼ÃŸen\nElif Korkmaz"
  },
  {
    id: "write-20",
    title: "Nachfrage zur Veranstaltung",
    category: "Freizeit",
    recipient: "das Kulturhaus",
    situation: "Sie mÃ¶chten mit Freunden an einer Veranstaltung teilnehmen.",
    points: ["Veranstaltung nennen", "nach Beginn fragen", "nach Eintrittspreis fragen", "nach Reservierung fragen"],
    tips: ["alle Fragen sammeln", "klar strukturieren", "mit Dank enden"],
    sampleSubject: "Fragen zur Veranstaltung am Freitag",
    sampleText:
      "Guten Tag,\n\nich interessiere mich fÃ¼r die Veranstaltung am Freitag in Ihrem Kulturhaus. Ich mÃ¶chte mit drei Freunden kommen und habe noch einige Fragen. Bitte teilen Sie mir mit, wann die Veranstaltung beginnt, wie viel der Eintritt kostet und ob man PlÃ¤tze reservieren muss. Vielen Dank fÃ¼r Ihre Antwort.\n\nFreundliche GrÃ¼ÃŸe\nRana Tunc"
  },
  {
    id: "write-21",
    title: "Termin in der Berufsschule absagen",
    category: "Schule",
    recipient: "das Schulsekretariat",
    situation: "Sie haben einen Beratungstermin in der Berufsschule, koennen aber nicht kommen.",
    points: ["Termin nennen", "Grund erklaeren", "um neuen Termin bitten", "Erreichbarkeit nennen"],
    tips: ["den Termin genau nennen", "kurz begruenden", "freundlich um einen neuen Vorschlag bitten"],
    sampleSubject: "Bitte um neuen Beratungstermin",
    sampleText:
      "Sehr geehrte Damen und Herren,\n\nich habe am Mittwoch um 14 Uhr einen Beratungstermin in Ihrer Berufsschule. Leider kann ich an diesem Tag nicht kommen, weil ich einen wichtigen Arzttermin habe. Ich moechte Sie deshalb um einen neuen Termin in der naechsten Woche bitten. Sie koennen mich gern per E Mail oder telefonisch unter 0176 88990011 erreichen.\n\nMit freundlichen Gruessen\nNesrin Yilmaz"
  },
  {
    id: "write-22",
    title: "Beschwerde ueber das Fitnessstudio",
    category: "Freizeit",
    recipient: "die Studioleitung",
    situation: "Im Fitnessstudio funktionieren mehrere Geraete seit Tagen nicht.",
    points: ["Problem beschreiben", "seit wann nennen", "um Reparatur bitten", "eine Rueckmeldung wuenschen"],
    tips: ["sachlich formulieren", "den Zeitraum nennen", "klare Bitte schreiben"],
    sampleSubject: "Defekte Geraete im Fitnessstudio",
    sampleText:
      "Sehr geehrte Damen und Herren,\n\nich trainiere regelmaessig in Ihrem Fitnessstudio. Seit einigen Tagen funktionieren mehrere Geraete im grossen Trainingsraum nicht mehr, zum Beispiel zwei Laufbaender und ein Fahrrad. Deshalb muessen viele Mitglieder lange warten. Ich bitte Sie, die Geraete moeglichst bald reparieren zu lassen. Bitte geben Sie mir kurz Bescheid, wann die Reparatur geplant ist.\n\nMit freundlichen Gruessen\nSibel Kaya"
  },
  {
    id: "write-23",
    title: "Information an den Arbeitgeber",
    category: "Arbeit",
    recipient: "Herrn Reuter",
    situation: "Sie muessen wegen eines wichtigen Amtsbesuchs spaeter zur Arbeit kommen.",
    points: ["Grund nennen", "ungefaehre Ankunftszeit nennen", "sich entschuldigen", "Arbeit danach bestaetigen"],
    tips: ["sofort den Grund nennen", "eine realistische Uhrzeit schreiben", "kurz und klar bleiben"],
    sampleSubject: "Ich komme morgen spaeter",
    sampleText:
      "Guten Abend Herr Reuter,\n\nmorgen muss ich morgens zum Buergeramt, weil ich dort einen wichtigen Termin habe. Deshalb kann ich nicht puenktlich um 8 Uhr bei der Arbeit sein. Ich werde voraussichtlich gegen 10 Uhr im Buero ankommen. Entschuldigen Sie bitte die Unannehmlichkeiten. Danach arbeite ich wie geplant weiter und erledige auch meine Aufgaben fuer das Teammeeting.\n\nFreundliche Gruesse\nYusuf Demir"
  },
  {
    id: "write-24",
    title: "Anfrage beim Reisebuero",
    category: "Reisen",
    recipient: "das Reisebuero Sonnenklar",
    situation: "Sie moechten eine Busreise buchen und brauchen noch Informationen.",
    points: ["Interesse nennen", "nach Reisedatum fragen", "nach Preis fragen", "nach Leistungen fragen"],
    tips: ["alle Fragen in einem Text sammeln", "freundlich bleiben", "mit Dank schliessen"],
    sampleSubject: "Fragen zu Ihrer Busreise",
    sampleText:
      "Sehr geehrte Damen und Herren,\n\nich interessiere mich fuer Ihre Busreise nach Hamburg. Bevor ich buche, moechte ich noch einige Informationen bekommen. Bitte schreiben Sie mir, an welchem Datum die naechste Reise stattfindet, wie viel sie kostet und welche Leistungen im Preis enthalten sind. Ich moechte zum Beispiel wissen, ob das Fruehstueck und die Hoteluebernachtung dabei sind.\n\nVielen Dank fuer Ihre Antwort.\nMit freundlichen Gruessen\nAmina Sahin"
  }
];

export const speakingIntroPrompt: SpeakingIntroPrompt = {
  prompts: [
    "Wie heiÃŸen Sie?",
    "Woher kommen Sie?",
    "Was machen Sie beruflich oder in Ihrer Freizeit?",
    "Mit wem wohnen Sie zusammen?",
    "Warum lernen Sie Deutsch?"
  ],
  phraseBank: [
    "Ich heiÃŸe ...",
    "Ich komme aus ...",
    "Zurzeit arbeite ich als ...",
    "In meiner Freizeit ...",
    "Ich lerne Deutsch, weil ..."
  ],
  sampleAnswer:
    "Guten Tag. Ich heiÃŸe Merve Kaya und komme aus der TÃ¼rkei. Ich wohne seit zwei Jahren in Deutschland und arbeite vormittags in einer BÃ¤ckerei. In meiner Freizeit lese ich gern und treffe Freunde. Ich lerne Deutsch, weil ich im Beruf sicherer sprechen und spÃ¤ter eine Ausbildung machen mÃ¶chte."
};

export const speakingPlanningTasks: SpeakingPlanningTask[] = [
  {
    id: "plan-01",
    title: "Geburtstag im Park",
    setting: "Sie mÃ¶chten am Samstag den Geburtstag eines Freundes im Park feiern.",
    roleA: ["Ort vorschlagen", "GetrÃ¤nke mitbringen", "Uhrzeit festlegen", "an schlechtes Wetter denken"],
    roleB: ["Einladung an Freunde", "Essen organisieren", "Musik oder Spiele", "RÃ¼ckfahrt besprechen"],
    usefulPhrases: ["Wie wÃ¤re es mit ...?", "Sollen wir ...?", "Das finde ich gut.", "Dann machen wir das so."],
    sampleDirection:
      "Die Partner einigen sich auf einen Park, treffen sich um 15 Uhr und teilen Essen, GetrÃ¤nke und Einladungen auf.",
    isExamTask: true
  },
  {
    id: "plan-02",
    title: "Gemeinsam grillen",
    setting: "Sie wollen mit Nachbarn am Sonntag grillen.",
    roleA: ["Ort und Zeit festlegen", "Grill mitbringen", "Fleisch oder GemÃ¼se planen", "Kinder berÃ¼cksichtigen"],
    roleB: ["GetrÃ¤nke kaufen", "Teller und Besteck bringen", "Salate vorbereiten", "bei Regen Alternative suchen"],
    usefulPhrases: ["Ich schlage vor ...", "Kannst du ...?", "Wir brauchen auch ...", "Einverstanden."],
    sampleDirection:
      "Die beiden sprechen Ã¼ber den Innenhof, teilen die EinkÃ¤ufe auf und verabreden eine Regen-Alternative im Gemeinschaftsraum."
  },
  {
    id: "plan-03",
    title: "Ausflug mit dem Deutschkurs",
    setting: "Sie mÃ¶chten mit Ihrer Lerngruppe einen Ausflug machen.",
    roleA: ["Ziel aussuchen", "Treffpunkt nennen", "Kosten prÃ¼fen", "Tickets besorgen"],
    roleB: ["Essen mitnehmen", "RÃ¼ckfahrt planen", "weitere Teilnehmer informieren", "Fotografieren oder dokumentieren"],
    usefulPhrases: ["Was meinst du zu ...?", "Das passt gut.", "Vielleicht ist ... besser.", "Wer Ã¼bernimmt ...?"],
    sampleDirection:
      "Am Ende steht ein gemeinsamer Museumsbesuch mit Treffpunkt am Bahnhof und klar aufgeteilten Aufgaben."
  },
  {
    id: "plan-04",
    title: "Lerntag fÃ¼r die PrÃ¼fung",
    setting: "Sie mÃ¶chten sich am Wochenende mit einer Partnerin auf die DTZ-PrÃ¼fung vorbereiten.",
    roleA: ["Ort wÃ¤hlen", "Material mitbringen", "Themen festlegen", "Pausen planen"],
    roleB: ["Uhrzeit vorschlagen", "GetrÃ¤nke und Snacks", "Sprechen Ã¼ben", "am Ende Wiederholung planen"],
    usefulPhrases: ["Lass uns zuerst ...", "Danach kÃ¶nnen wir ...", "Eine Pause wÃ¤re gut.", "Zum Schluss ..."],
    sampleDirection:
      "Beide planen einen Lerntag in der Bibliothek mit festen Zeiten fÃ¼r Lesen, Schreiben und Sprechen."
  },
  {
    id: "plan-05",
    title: "Familienausflug",
    setting: "Sie mÃ¶chten mit Kindern einen Ausflug fÃ¼r Sonntag planen.",
    roleA: ["geeigneten Ort suchen", "Abfahrt besprechen", "Eintritt prÃ¼fen", "Wetter beachten"],
    roleB: ["Essen vorbereiten", "Spiele oder Kleidung Ã¼berlegen", "RÃ¼ckkehrzeit festlegen", "Kosten teilen"],
    usefulPhrases: ["Dann nehmen wir ...", "Das ist zu teuer / gÃ¼nstig.", "Wir kÃ¶nnten auch ...", "Gute Idee."],
    sampleDirection:
      "Die Partner planen einen Ausflug zum Tierpark mit Picknick und frÃ¼her RÃ¼ckfahrt."
    },
  {
    id: "plan-06",
    title: "Umzug organisieren",
    setting: "Sie planen mit einer Freundin einen Umzug am Samstag.",
    roleA: ["Uhrzeit fuer den Start festlegen", "Transporter organisieren", "Helfer fragen", "Getraenke besorgen"],
    roleB: ["Kartons mitbringen", "alte Wohnung sauber machen", "Mittagessen planen", "Rueckgabe des Schluessels bedenken"],
    usefulPhrases: ["Wir sollten zuerst ...", "Kannst du vielleicht ...?", "Das uebernehme ich.", "Dann sind wir fertig."],
    sampleDirection:
      "Beide einigen sich auf einen fruehen Start, teilen Transport, Helfer und Essen auf und denken auch an die Schluesseluebergabe."
  },
  {
    id: "plan-07",
    title: "Schulfest vorbereiten",
    setting: "Sie moechten mit einem anderen Elternteil einen Stand fuer das Schulfest planen.",
    roleA: ["welchen Stand anbieten", "Material einkaufen", "Uhrzeit fuer den Aufbau", "Preise festlegen"],
    roleB: ["Helferinnen und Helfer finden", "Kasse organisieren", "Dekoration mitbringen", "am Ende aufraeumen"],
    usefulPhrases: ["Wie findest du ...?", "Wir brauchen auf jeden Fall ...", "Das kann ich machen.", "Einverstanden, dann machen wir das so."],
    sampleDirection:
      "Die Partner entscheiden sich fuer einen Kuchenstand, planen den Aufbau am Morgen und teilen Einkauf, Kasse und Aufraeumen auf."
  },
  {
    id: "plan-08",
    title: "Gemeinsamer Einkauf",
    setting: "Sie moechten mit einer Nachbarin fuer ein Abendessen gemeinsam einkaufen gehen.",
    roleA: ["Treffpunkt nennen", "Einkaufsliste machen", "Budget beachten", "wer was bezahlt"],
    roleB: ["passendes Geschaeft vorschlagen", "Transport der Taschen", "eine vegetarische Option planen", "Uhrzeit fuer das Kochen festlegen"],
    usefulPhrases: ["Lass uns lieber ...", "Was brauchen wir noch?", "Das ist zu teuer.", "Dann treffen wir uns um ..."],
    sampleDirection:
      "Am Ende gehen beide in denselben Supermarkt, teilen die Einkaufsliste auf und verabreden sich direkt danach zum Kochen."
  }
];

export const phaseOneExamMeta = {
  id: "model-1",
  title: "ModellprÃ¼fung 1",
  subtitle: "VollstÃ¤ndige Phase-1-PrÃ¼fung fÃ¼r DTZ A2/B1 mit Fokus auf B1",
  durationLabel: "ca. 95 Minuten",
  sections: [
    { id: "listening", title: "HÃ¶ren", parts: ["Teil 1", "Teil 2", "Teil 3", "Teil 4"], taskCount: 6 },
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


