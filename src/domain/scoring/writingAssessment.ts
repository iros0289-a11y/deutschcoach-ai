import type { WritingPracticeScenario } from "../../data/content/writingContent";

export type WritingCriterionId =
  | "grammar"
  | "vocabulary"
  | "sentenceStructure"
  | "taskCompletion"
  | "politeness"
  | "b1Level";

export type WritingCriterion = {
  id: WritingCriterionId;
  label: string;
  score: number;
  maxScore: number;
  comment: string;
};

export type WritingAssessment = {
  criteria: WritingCriterion[];
  estimatedPoints: number;
  maxPoints: number;
  estimatedLevel: "A2" | "A2/B1" | "B1";
  strengths: string[];
  improvements: string[];
  coveredPoints: string[];
  missingPoints: string[];
};

const connectors = [
  "weil",
  "deshalb",
  "darum",
  "ausserdem",
  "zusaetzlich",
  "leider",
  "deshalb",
  "trotzdem",
  "wenn",
  "falls"
];

function normalize(text: string) {
  return text.toLowerCase();
}

function countMatches(text: string, terms: string[]) {
  const normalized = normalize(text);
  return terms.some((term) => normalized.includes(term)) ? 1 : 0;
}

export function assessWritingDraft(
  scenario: WritingPracticeScenario,
  draft: string
): WritingAssessment {
  const trimmed = draft.trim();
  const words = trimmed.length > 0 ? trimmed.split(/\s+/).filter(Boolean) : [];
  const sentences = trimmed
    .split(/[.!?]+/)
    .map((item) => item.trim())
    .filter(Boolean);
  const uniqueWords = new Set(words.map((word) => normalize(word)));
  const connectorCount = connectors.filter((term) => normalize(trimmed).includes(term)).length;
  const hasGreeting = /^(sehr geehrte|liebe|guten tag|hallo)/i.test(trimmed);
  const hasClosing = /(mit freundlichen gruessen|freundliche gruesse|viele gruesse|herzliche gruesse)/i.test(
    trimmed
  );
  const coveredPointIndexes = scenario.pointChecks
    .map((terms, index) => (countMatches(trimmed, terms) ? index : -1))
    .filter((index) => index >= 0);
  const coveredPoints = coveredPointIndexes
    .map((index) => scenario.points[index])
    .filter((point): point is string => Boolean(point));
  const missingPoints = scenario.points.filter((_, index) => !coveredPointIndexes.includes(index));

  const taskCompletionScore = Math.min(5, Math.max(1, coveredPoints.length + (words.length >= 90 ? 1 : 0)));
  const politenessScore =
    (hasGreeting ? 2 : 0) + (hasClosing ? 2 : 0) + (/bitte|danke|ich waere ihnen dankbar/i.test(trimmed) ? 1 : 0);
  const grammarScore =
    (sentences.length >= 5 ? 2 : 1) +
    (/[.!?]/.test(trimmed) ? 1 : 0) +
    (words.length >= 80 ? 1 : 0) +
    (/ich|sie|wir/i.test(trimmed) ? 1 : 0);
  const vocabularyScore =
    (uniqueWords.size >= 45 ? 2 : 1) +
    (uniqueWords.size >= 70 ? 1 : 0) +
    (connectorCount >= 2 ? 1 : 0) +
    (/termin|anfrage|bitte|leider|danke|rueckmeldung|moeglich/i.test(trimmed) ? 1 : 0);
  const sentenceStructureScore =
    (sentences.length >= 5 ? 2 : 1) +
    (connectorCount >= 2 ? 2 : connectorCount >= 1 ? 1 : 0) +
    (words.length / Math.max(1, sentences.length) >= 9 ? 1 : 0);
  const b1LevelScore =
    (words.length >= 100 ? 2 : words.length >= 70 ? 1 : 0) +
    (coveredPoints.length >= 4 ? 2 : coveredPoints.length >= 3 ? 1 : 0) +
    (connectorCount >= 2 ? 1 : 0);

  const criteria: WritingCriterion[] = [
    {
      id: "grammar",
      label: "Grammatik",
      score: Math.min(5, grammarScore),
      maxScore: 5,
      comment:
        grammarScore >= 4
          ? "Die Antwort wirkt ueberwiegend sicher und gut lesbar."
          : "Achten Sie auf vollstaendige Saetze und klare Satzenden."
    },
    {
      id: "vocabulary",
      label: "Wortschatz",
      score: Math.min(5, vocabularyScore),
      maxScore: 5,
      comment:
        vocabularyScore >= 4
          ? "Sie verwenden schon passenden Alltagswortschatz."
          : "Nutzen Sie mehr thematische Woerter aus der Situation."
    },
    {
      id: "sentenceStructure",
      label: "Satzbau",
      score: Math.min(5, sentenceStructureScore),
      maxScore: 5,
      comment:
        sentenceStructureScore >= 4
          ? "Die Saetze sind verbunden und wirken zusammenhaengend."
          : "Verbinden Sie Ihre Saetze oefter mit Woertern wie weil, deshalb oder ausserdem."
    },
    {
      id: "taskCompletion",
      label: "Aufgabe erfuellt",
      score: Math.min(5, taskCompletionScore),
      maxScore: 5,
      comment:
        coveredPoints.length === scenario.points.length
          ? "Alle vier Inhaltspunkte sind erkennbar angesprochen."
          : `Es fehlen noch ${missingPoints.length} Inhaltspunkt(e).`
    },
    {
      id: "politeness",
      label: "Hoeflichkeit",
      score: Math.min(5, politenessScore),
      maxScore: 5,
      comment:
        politenessScore >= 4
          ? "Anrede und Abschluss passen gut zur Situation."
          : "Nutzen Sie eine klare Anrede, freundliche Bitten und einen passenden Schluss."
    },
    {
      id: "b1Level",
      label: "B1-Niveau",
      score: Math.min(5, b1LevelScore),
      maxScore: 5,
      comment:
        b1LevelScore >= 4
          ? "Die Antwort geht schon in Richtung einer guten DTZ-B1-Leistung."
          : "Fuer B1 helfen mehr Details, bessere Verknuepfungen und vollstaendige Inhaltspunkte."
    }
  ];

  const total = criteria.reduce((sum, item) => sum + item.score, 0);
  const estimatedPoints = Math.max(4, Math.round((total / 30) * 20));
  const estimatedLevel =
    estimatedPoints >= 14 ? "B1" : estimatedPoints >= 10 ? "A2/B1" : "A2";

  const strengths = [
    coveredPoints.length >= 3 ? "Die Hauptpunkte der Aufgabe sind schon gut erkennbar." : "",
    hasGreeting && hasClosing ? "Die Nachricht hat eine passende Anrede und einen sinnvollen Abschluss." : "",
    connectorCount >= 2 ? "Ihre Saetze sind schon recht gut miteinander verbunden." : ""
  ].filter(Boolean);

  const improvements = [
    missingPoints.length > 0 ? `Ergaenzen Sie noch: ${missingPoints.join(", ")}.` : "",
    words.length < 90 ? "Schreiben Sie etwas ausfuehrlicher, damit Ihre Antwort sicherer auf B1-Niveau wirkt." : "",
    connectorCount < 2 ? "Verwenden Sie mehr Verbindungswoerter wie weil, deshalb oder ausserdem." : "",
    !hasGreeting || !hasClosing ? "Achten Sie auf eine vollstaendige Anrede und einen hoeflichen Schluss." : ""
  ].filter(Boolean);

  return {
    criteria,
    estimatedPoints,
    maxPoints: 20,
    estimatedLevel,
    strengths,
    improvements,
    coveredPoints,
    missingPoints
  };
}
