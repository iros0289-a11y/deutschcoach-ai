import {
  getSpeakingPhotoLargeImage,
  speakingIntroPrompt as baseIntro,
  speakingPhotoPrompts as basePhotos,
  speakingPlanningTasks as basePlanning,
  type SpeakingIntroPrompt,
  type SpeakingPhotoPrompt
} from "./phaseOneExamContent";

export type SpeakingIntroPractice = SpeakingIntroPrompt & {
  expandedSampleAnswer: string;
  expectedKeywords: string[][];
};

export type SpeakingPhotoPractice = SpeakingPhotoPrompt & {
  largeImage: ReturnType<typeof getSpeakingPhotoLargeImage>;
  responsePrompts: string[];
  expandedSampleAnswer: string;
  expectedKeywords: string[][];
};

export type SpeakingDialogueStep = {
  id: string;
  speaker: "partner" | "user";
  text: string;
  goalKeywords?: string[];
};

export type SpeakingPlanningPractice = {
  id: string;
  title: string;
  setting: string;
  roleA: string[];
  roleB: string[];
  usefulPhrases: string[];
  isExamTask?: boolean;
  dialogueSteps: SpeakingDialogueStep[];
  sampleDialogue: string;
  expectedKeywords: string[][];
};

function getMeetingSuggestion(setting: string) {
  const normalized = setting.toLowerCase();

  if (normalized.includes("park")) {
    return "direkt am Eingang vom Park treffen";
  }

  if (normalized.includes("deutschkurs") || normalized.includes("lerngruppe")) {
    return "uns am Bahnhof treffen und dann gemeinsam weiterfahren";
  }

  if (normalized.includes("dtz-pruefung") || normalized.includes("bibliothek")) {
    return "uns direkt vor der Bibliothek treffen";
  }

  if (normalized.includes("kind")) {
    return "uns morgens am Bahnhof treffen und zusammen losfahren";
  }

  return "uns am Bahnhof treffen und dann gemeinsam hingehen";
}

function buildPlanningSampleDialogue(title: string, setting: string) {
  const meetingSuggestion = getMeetingSuggestion(setting);

  return [
    `Partner: Hallo, wir muessen noch genauer ueber ${title.toLowerCase()} sprechen. Wann passt es dir am besten?`,
    "Ich: Am besten am Samstagnachmittag gegen 15 Uhr, dann haben die meisten Zeit und ich bin schon mit der Arbeit fertig.",
    "Partner: Gut, das passt. Und wo wollen wir uns treffen?",
    `Ich: Wir koennen ${meetingSuggestion}. Das ist fuer alle einfach zu finden und niemand muss lange suchen.`,
    "Partner: Einverstanden. Wer uebernimmt denn die wichtigsten Aufgaben?",
    "Ich: Ich bringe Essen und Getraenke mit. Du kannst bitte die anderen informieren und noch an die wichtigsten Sachen denken.",
    "Partner: Und was machen wir, wenn etwas schiefgeht, zum Beispiel Regen oder Verspaetung?",
    "Ich: Dann brauchen wir eine Alternative. Wenn es regnet, koennen wir den Plan aendern oder spaeter anfangen. Hauptsache, wir sprechen uns vorher gut ab."
  ].join("\n");
}

export const speakingIntroPractice: SpeakingIntroPractice = {
  ...baseIntro,
  expandedSampleAnswer:
    "Guten Tag. Ich heisse Merve Kaya und komme aus der Tuerkei. Seit zwei Jahren lebe ich mit meinem Mann und meinen beiden Kindern in Bonn. Vormittags arbeite ich in einer Baeckerei, und am Abend lerne ich Deutsch. In meiner Freizeit lese ich gern, koche fuer meine Familie und treffe Freunde aus meinem Sprachkurs. Ich lerne Deutsch, weil ich im Alltag und im Beruf sicherer sprechen moechte und spaeter eine Ausbildung im kaufmaennischen Bereich machen will.",
  expectedKeywords: [
    ["heisse", "name", "ich bin"],
    ["komme", "aus", "herkunft"],
    ["arbeite", "beruf", "freizeit"],
    ["wohne", "familie", "zusammen"],
    ["lerne deutsch", "weil", "ziel"]
  ]
};

export const speakingPhotoPractice: SpeakingPhotoPractice[] = basePhotos.map((photo) => ({
  ...photo,
  largeImage: getSpeakingPhotoLargeImage(photo.id) ?? photo.image,
  responsePrompts: [
    "Was sehen Sie auf dem Bild?",
    "Welche Situation zeigt das Bild?",
    "Welche Erfahrungen haben Sie damit?"
  ],
  expandedSampleAnswer: `${photo.sampleAnswer} Ausserdem kann ich mir gut vorstellen, wie die Personen sich fuehlen oder warum sie genau in dieser Situation sind. Ich versuche in so einer Aufgabe immer zuerst die Personen, dann die Handlung und zum Schluss meine eigene Erfahrung klar zu beschreiben.`,
  expectedKeywords: [
    ["bild", "sehe", "personen", "frau", "mann", "kinder"],
    ["situation", "vielleicht", "wahrscheinlich", "zeigt"],
    ["ich", "erfahrung", "mache", "gehe", "arbeite", "kaufe"]
  ]
}));

export const speakingPlanningPractice: SpeakingPlanningPractice[] = basePlanning.map((task) => ({
  id: task.id,
  title: task.title,
  setting: task.setting,
  roleA: task.roleA,
  roleB: task.roleB,
  usefulPhrases: task.usefulPhrases,
  ...(task.isExamTask !== undefined ? { isExamTask: task.isExamTask } : {}),
  dialogueSteps: [
    {
      id: `${task.id}-partner-1`,
      speaker: "partner",
      text: `Hallo, wir muessen noch genauer ueber ${task.title.toLowerCase()} sprechen. Wann passt es dir am besten?`
    },
    {
      id: `${task.id}-user-1`,
      speaker: "user",
      text: "Antwort der Nutzerin oder des Nutzers",
      goalKeywords: ["zeit", "uhr", "samstag", "sonntag", "nachmittag", "morgen"]
    },
    {
      id: `${task.id}-partner-2`,
      speaker: "partner",
      text: "Gut. Und wo sollen wir uns treffen oder was ist der beste Ort dafuer?"
    },
    {
      id: `${task.id}-user-2`,
      speaker: "user",
      text: "Antwort der Nutzerin oder des Nutzers",
      goalKeywords: ["ort", "park", "haus", "bahnhof", "schule", "bibliothek"]
    },
    {
      id: `${task.id}-partner-3`,
      speaker: "partner",
      text: "Dann brauchen wir noch Aufgaben. Wer bringt was mit oder was uebernimmst du?"
    },
    {
      id: `${task.id}-user-3`,
      speaker: "user",
      text: "Antwort der Nutzerin oder des Nutzers",
      goalKeywords: ["ich bringe", "du bringst", "essen", "getraenke", "tickets", "einladung", "planen"]
    },
    {
      id: `${task.id}-partner-4`,
      speaker: "partner",
      text: "Super. Lass uns noch kurz besprechen, was wir machen, wenn etwas schiefgeht, zum Beispiel Regen oder Verspaetung."
    },
    {
      id: `${task.id}-user-4`,
      speaker: "user",
      text: "Antwort der Nutzerin oder des Nutzers",
      goalKeywords: ["wenn", "regen", "alternative", "spaeter", "notfalls", "dann"]
    }
  ],
  sampleDialogue: buildPlanningSampleDialogue(task.title, task.setting),
  expectedKeywords: [
    ["zeit", "uhr", "samstag", "sonntag", "morgen", "nachmittag"],
    ["ort", "treffen", "park", "haus", "schule", "bahnhof"],
    ["ich bringe", "du bringst", "essen", "getraenke", "tickets", "planen"],
    ["wenn", "alternative", "regen", "spaeter", "problem", "notfalls"]
  ]
}));

export function getSpeakingTaskSummary(taskId: string) {
  if (taskId === "speaking-intro") {
    return {
      title: "Sprechen - Sich vorstellen",
      prompt: "Stellen Sie sich vor und beantworten Sie die typischen DTZ-Fragen."
    };
  }

  const photo = speakingPhotoPractice.find((item) => item.id === taskId);
  if (photo) {
    return {
      title: photo.title,
      prompt: photo.sceneLabel
    };
  }

  const planning = speakingPlanningPractice.find((item) => item.id === taskId);
  if (planning) {
    return {
      title: planning.title,
      prompt: planning.setting
    };
  }

  return null;
}
