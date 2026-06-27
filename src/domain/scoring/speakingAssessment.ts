export type SpeakingCriterionId =
  | "pronunciation"
  | "grammar"
  | "vocabulary"
  | "fluency"
  | "sentenceStructure"
  | "b1Level";

export type SpeakingCriterion = {
  id: SpeakingCriterionId;
  label: string;
  score: number;
  maxScore: number;
  comment: string;
};

export type SpeakingAssessment = {
  criteria: SpeakingCriterion[];
  estimatedLevel: "A2" | "A2/B1" | "B1";
  estimatedPoints: number;
  maxPoints: number;
  strengths: string[];
  improvements: string[];
};

type SpeakingAssessmentInput = {
  transcript: string;
  durationSeconds: number;
  expectedKeywords: string[][];
};

const connectors = [
  "weil",
  "deshalb",
  "ausserdem",
  "danach",
  "vielleicht",
  "zuerst",
  "dann",
  "am ende",
  "wenn",
  "ich denke"
];

function normalize(text: string) {
  return text.toLowerCase();
}

export function assessSpeakingResponse({
  transcript,
  durationSeconds,
  expectedKeywords
}: SpeakingAssessmentInput): SpeakingAssessment {
  const normalized = normalize(transcript.trim());
  const words = normalized.length > 0 ? normalized.split(/\s+/).filter(Boolean) : [];
  const sentences = normalized
    .split(/[.!?]+/)
    .map((item) => item.trim())
    .filter(Boolean);
  const uniqueWords = new Set(words);
  const keywordHits = expectedKeywords.filter((keywordSet) =>
    keywordSet.some((keyword) => normalized.includes(keyword))
  ).length;
  const connectorHits = connectors.filter((item) => normalized.includes(item)).length;

  const pronunciationScore =
    words.length >= 35 ? 5 : words.length >= 24 ? 4 : words.length >= 14 ? 3 : words.length > 0 ? 2 : 1;
  const grammarScore =
    sentences.length >= 4 ? 5 : sentences.length >= 3 ? 4 : sentences.length >= 2 ? 3 : words.length > 0 ? 2 : 1;
  const vocabularyScore =
    uniqueWords.size >= 40 ? 5 : uniqueWords.size >= 28 ? 4 : uniqueWords.size >= 18 ? 3 : uniqueWords.size > 0 ? 2 : 1;
  const fluencyScore =
    durationSeconds >= 35 ? 5 : durationSeconds >= 24 ? 4 : durationSeconds >= 14 ? 3 : durationSeconds > 0 ? 2 : 1;
  const sentenceStructureScore =
    connectorHits >= 3 ? 5 : connectorHits >= 2 ? 4 : connectorHits >= 1 ? 3 : words.length > 0 ? 2 : 1;
  const b1Score =
    keywordHits >= Math.max(2, expectedKeywords.length - 1) && words.length >= 45
      ? 5
      : keywordHits >= Math.max(2, expectedKeywords.length - 2) && words.length >= 28
        ? 4
        : keywordHits >= 2 && words.length >= 18
          ? 3
          : words.length > 0
            ? 2
            : 1;

  const criteria: SpeakingCriterion[] = [
    {
      id: "pronunciation",
      label: "Aussprache",
      score: pronunciationScore,
      maxScore: 5,
      comment:
        pronunciationScore >= 4
          ? "Sie sprechen schon lang genug, um klar und nachvollziehbar zu wirken."
          : "Sprechen Sie etwas laenger und vollstaendiger, damit Ihre Antwort sicherer klingt."
    },
    {
      id: "grammar",
      label: "Grammatik",
      score: grammarScore,
      maxScore: 5,
      comment:
        grammarScore >= 4
          ? "Ihre Antwort wirkt grammatisch ueberwiegend stabil."
          : "Bilden Sie mehr vollstaendige Saetze statt einzelner Wortgruppen."
    },
    {
      id: "vocabulary",
      label: "Wortschatz",
      score: vocabularyScore,
      maxScore: 5,
      comment:
        vocabularyScore >= 4
          ? "Sie verwenden schon einen recht passenden Wortschatz."
          : "Nutzen Sie mehr konkrete Woerter zur Situation."
    },
    {
      id: "fluency",
      label: "Sprachfluss",
      score: fluencyScore,
      maxScore: 5,
      comment:
        fluencyScore >= 4
          ? "Die Antwort hat eine gute Laenge fuer die Aufgabe."
          : "Versuchen Sie, Ihre Gedanken etwas laenger am Stueck auszusprechen."
    },
    {
      id: "sentenceStructure",
      label: "Satzbau",
      score: sentenceStructureScore,
      maxScore: 5,
      comment:
        sentenceStructureScore >= 4
          ? "Sie verbinden Ihre Gedanken schon gut miteinander."
          : "Nutzen Sie mehr Verknuepfungen wie weil, dann, deshalb oder ausserdem."
    },
    {
      id: "b1Level",
      label: "B1-Niveau",
      score: b1Score,
      maxScore: 5,
      comment:
        b1Score >= 4
          ? "Die Antwort erreicht schon eine gute B1-Naehe."
          : "Fuer B1 helfen mehr Details, Beispiele und klar verbundene Aussagen."
    }
  ];

  const total = criteria.reduce((sum, item) => sum + item.score, 0);
  const estimatedPoints = Math.round((total / 30) * 20);
  const estimatedLevel =
    estimatedPoints >= 14 ? "B1" : estimatedPoints >= 10 ? "A2/B1" : "A2";

  const strengths = [
    words.length >= 35 ? "Sie geben schon eine ausreichend lange Antwort." : "",
    connectorHits >= 2 ? "Sie verbinden Ihre Aussagen schon recht gut." : "",
    keywordHits >= Math.max(2, expectedKeywords.length - 1) ? "Sie decken die wichtigen Inhalte der Aufgabe ab." : ""
  ].filter(Boolean);

  const improvements = [
    words.length < 30 ? "Sprechen Sie etwas laenger und geben Sie mehr konkrete Details." : "",
    connectorHits < 2 ? "Verwenden Sie mehr Redemittel wie weil, dann, ausserdem oder ich denke." : "",
    keywordHits < Math.max(2, expectedKeywords.length - 1)
      ? "Gehen Sie noch deutlicher auf alle Teilfragen der Aufgabe ein."
      : ""
  ].filter(Boolean);

  return {
    criteria,
    estimatedLevel,
    estimatedPoints,
    maxPoints: 20,
    strengths,
    improvements
  };
}
