import type { AnswerRecord } from "../../domain/models/answer";
import type { ErrorItem } from "../../domain/models/errorTrainer";
import type { ExamSet, SkillArea } from "../../domain/models/exam";
import type { LearnerProgress } from "../../domain/models/progress";
import type { Task } from "../../domain/models/task";

type SkillSummary = {
  skill: SkillArea;
  title: string;
  subtitle: string;
  focus: string;
  immediateFeedbackLabel: string;
  examTips: string[];
};

export const skillSummaries: Record<SkillArea, SkillSummary> = {
  listening: {
    skill: "listening",
    title: "Hören",
    subtitle: "Ansagen, Dialoge und kurze Meldungen",
    focus: "Achte auf Uhrzeiten, Orte, Absichten und wichtige Details.",
    immediateFeedbackLabel: "Direktes Feedback",
    examTips: [
      "Frage zuerst lesen und Schlüsselwörter merken.",
      "Beim zweiten Hören auf Details achten.",
      "Nicht an unbekannten Wörtern hängen bleiben."
    ]
  },
  reading: {
    skill: "reading",
    title: "Lesen",
    subtitle: "Anzeigen, E-Mails und Informationsblätter",
    focus: "Suche gezielt nach passenden Informationen statt alles Wort für Wort zu lesen.",
    immediateFeedbackLabel: "Lösung sofort sehen",
    examTips: [
      "Überschriften und Signalwörter zuerst scannen.",
      "Person, Ort und Zweck klar zuordnen.",
      "Antworten immer mit dem Text prüfen."
    ]
  },
  writing: {
    skill: "writing",
    title: "Schreiben",
    subtitle: "Alltags-E-Mails und kurze Briefe",
    focus: "Beantworte alle Punkte klar und in einer logischen Reihenfolge.",
    immediateFeedbackLabel: "Schreibhinweise nutzen",
    examTips: [
      "Mit Anrede und Einleitung starten.",
      "Alle Aufgabenpunkte einzeln abhaken.",
      "Mit Grußformel sauber abschließen."
    ]
  },
  speaking: {
    skill: "speaking",
    title: "Sprechen",
    subtitle: "Vorstellung, Foto und gemeinsames Planen",
    focus: "Sprich einfach, klar und vollständig. Kleine Fehler sind erlaubt.",
    immediateFeedbackLabel: "Selbstcheck direkt",
    examTips: [
      "Kurze, klare Sätze sind besser als lange unsichere Sätze.",
      "Beim Foto erst beschreiben, dann vermuten, dann persönlich antworten.",
      "Beim Planen immer Vorschlag, Reaktion und Einigung geben."
    ]
  }
};

export const mockTasks: Task[] = [
  {
    id: "listen-1",
    skill: "listening",
    type: "single-choice",
    title: "Bahnhofsdurchsage",
    prompt: "Sie hören eine Durchsage. Wann fährt der Zug nach München ab?",
    explanation: "Im DTZ geht es oft um Uhrzeiten und Gleise.",
    difficulty: "a2-b1",
    tags: ["bahnhof", "uhrzeit"],
    options: [
      { id: "a", label: "A", text: "Um 14:15 Uhr" },
      { id: "b", label: "B", text: "Um 14:30 Uhr" },
      { id: "c", label: "C", text: "Um 15:00 Uhr" }
    ],
    correctOptionIds: ["b"],
    media: [
      {
        id: "listen-1-audio",
        type: "audio",
        uri: "mock://audio/bahnhofsdurchsage",
        transcript:
          "Achtung am Gleis 7. Der Regionalzug nach München fährt heute um 14 Uhr 30 ab.",
        durationSeconds: 18
      }
    ],
    maxScore: 1
  },
  {
    id: "listen-2",
    skill: "listening",
    type: "multiple-choice",
    title: "Telefonische Absage",
    prompt: "Welche zwei Informationen hören Sie?",
    explanation: "Wählen Sie alle richtigen Informationen aus.",
    difficulty: "b1",
    tags: ["telefon", "termin"],
    options: [
      { id: "a", label: "A", text: "Der Termin ist morgen." },
      { id: "b", label: "B", text: "Die Person ist krank." },
      { id: "c", label: "C", text: "Ein neuer Termin wird nächste Woche vorgeschlagen." }
    ],
    correctOptionIds: ["b", "c"],
    media: [
      {
        id: "listen-2-audio",
        type: "audio",
        uri: "mock://audio/telefonabsage",
        transcript:
          "Guten Tag, ich bin krank und kann morgen nicht kommen. Können wir bitte nächste Woche einen neuen Termin machen?",
        durationSeconds: 22
      }
    ],
    maxScore: 2
  },
  {
    id: "read-1",
    skill: "reading",
    type: "single-choice",
    title: "Anzeige im Supermarkt",
    prompt: "Wo bekommt man heute günstiges Obst?",
    explanation: "Lesen Sie die kurze Anzeige und wählen Sie die passende Antwort.",
    difficulty: "a2",
    tags: ["einkauf", "anzeige"],
    options: [
      { id: "a", label: "A", text: "Im Supermarkt am Bahnhof" },
      { id: "b", label: "B", text: "Auf dem Wochenmarkt am Rathaus" },
      { id: "c", label: "C", text: "In der Apotheke nebenan" }
    ],
    correctOptionIds: ["b"],
    media: [
      {
        id: "read-1-image",
        type: "image",
        uri: "mock://image/wochenmarkt",
        transcript:
          "Frisches Obst und Gemüse heute von 8 bis 14 Uhr auf dem Wochenmarkt am Rathaus."
      }
    ],
    maxScore: 1
  },
  {
    id: "read-2",
    skill: "reading",
    type: "matching",
    title: "E-Mail vom Sprachkurs",
    prompt: "Was soll die Teilnehmerin machen?",
    explanation: "Ordnen Sie die richtige Aussage zur E-Mail zu.",
    difficulty: "a2-b1",
    tags: ["kurs", "e-mail"],
    options: [
      { id: "a", label: "A", text: "Sie soll das Buch zum nächsten Mal mitbringen." },
      { id: "b", label: "B", text: "Sie soll die Prüfung morgen schreiben." },
      { id: "c", label: "C", text: "Sie soll ihre Adresse ändern." }
    ],
    correctOptionIds: ["a"],
    media: [
      {
        id: "read-2-text",
        type: "image",
        uri: "mock://image/kursmail",
        transcript:
          "Liebe Teilnehmerinnen und Teilnehmer, bitte bringen Sie am Donnerstag das neue Kursbuch mit."
      }
    ],
    maxScore: 1
  },
  {
    id: "write-1",
    skill: "writing",
    type: "free-text",
    title: "Termin absagen",
    prompt:
      "Schreiben Sie eine kurze E-Mail an Ihre Lehrerin. Sie können morgen nicht kommen und möchten einen neuen Termin vereinbaren.",
    explanation: "Denken Sie an Anrede, Grund und neuen Vorschlag.",
    difficulty: "a2-b1",
    tags: ["termin", "e-mail"],
    maxScore: 3
  },
  {
    id: "write-2",
    skill: "writing",
    type: "free-text",
    title: "Information erfragen",
    prompt:
      "Sie möchten einen Deutschkurs besuchen. Schreiben Sie an die Schule und fragen Sie nach Preis, Uhrzeit und Dauer.",
    explanation: "Formulieren Sie mindestens drei Fragen.",
    difficulty: "b1",
    tags: ["kurs", "frage"],
    maxScore: 3
  },
  {
    id: "speak-1",
    skill: "speaking",
    type: "self-introduction",
    title: "Sich vorstellen",
    prompt:
      "Stellen Sie sich kurz vor: Name, Herkunft, Beruf oder Arbeit, Familie und warum Sie Deutsch lernen.",
    explanation: "Sprechen Sie 30 bis 45 Sekunden.",
    difficulty: "a2",
    tags: ["vorstellung"],
    maxScore: 3
  },
  {
    id: "speak-2",
    skill: "speaking",
    type: "photo-description",
    title: "Foto beschreiben",
    prompt:
      "Beschreiben Sie das Foto: Eine Familie sitzt im Park und macht ein Picknick. Was sehen Sie? Was machen die Personen?",
    explanation: "Sagen Sie danach, ob Sie selbst gern im Park Zeit verbringen.",
    difficulty: "a2-b1",
    tags: ["foto", "alltag"],
    maxScore: 3
  },
  {
    id: "speak-3",
    skill: "speaking",
    type: "planning-dialogue",
    title: "Gemeinsam planen",
    prompt:
      "Planen Sie mit Ihrer Partnerin einen Ausflug am Samstag. Sprechen Sie über Ort, Uhrzeit, Essen und Kosten.",
    explanation: "Machen Sie Vorschläge und reagieren Sie auf Ideen.",
    difficulty: "b1",
    tags: ["planung"],
    maxScore: 3
  }
];

export const mockExamSets: ExamSet[] = [
  {
    id: "exam-01",
    title: "Modellprüfung 1",
    modelNumber: 1,
    version: "MVP",
    sections: [
      { id: "exam-01-listening", skill: "listening", title: "Hören", durationMinutes: 20, parts: [{ id: "exam-01-listening-part-1", title: "Teil 1", order: 1, taskIds: ["listen-1", "listen-2"] }] },
      { id: "exam-01-reading", skill: "reading", title: "Lesen", durationMinutes: 25, parts: [{ id: "exam-01-reading-part-1", title: "Teil 1", order: 1, taskIds: ["read-1", "read-2"] }] },
      { id: "exam-01-writing", skill: "writing", title: "Schreiben", durationMinutes: 30, parts: [{ id: "exam-01-writing-part-1", title: "Teil 1", order: 1, taskIds: ["write-1"] }] },
      { id: "exam-01-speaking", skill: "speaking", title: "Sprechen", durationMinutes: 16, parts: [{ id: "exam-01-speaking-part-1", title: "Teil 1", order: 1, taskIds: ["speak-1", "speak-2", "speak-3"] }] }
    ]
  },
  {
    id: "exam-02",
    title: "Modellprüfung 2",
    modelNumber: 2,
    version: "MVP",
    sections: [
      { id: "exam-02-listening", skill: "listening", title: "Hören", durationMinutes: 20, parts: [{ id: "exam-02-listening-part-1", title: "Teil 1", order: 1, taskIds: ["listen-2", "listen-1"] }] },
      { id: "exam-02-reading", skill: "reading", title: "Lesen", durationMinutes: 25, parts: [{ id: "exam-02-reading-part-1", title: "Teil 1", order: 1, taskIds: ["read-2", "read-1"] }] },
      { id: "exam-02-writing", skill: "writing", title: "Schreiben", durationMinutes: 30, parts: [{ id: "exam-02-writing-part-1", title: "Teil 1", order: 1, taskIds: ["write-2"] }] },
      { id: "exam-02-speaking", skill: "speaking", title: "Sprechen", durationMinutes: 16, parts: [{ id: "exam-02-speaking-part-1", title: "Teil 1", order: 1, taskIds: ["speak-1", "speak-3"] }] }
    ]
  },
  {
    id: "exam-03",
    title: "Modellprüfung 3",
    modelNumber: 3,
    version: "Preview",
    sections: [
      { id: "exam-03-listening", skill: "listening", title: "Hören", durationMinutes: 20, parts: [{ id: "exam-03-listening-part-1", title: "Teil 1", order: 1, taskIds: ["listen-1"] }] },
      { id: "exam-03-reading", skill: "reading", title: "Lesen", durationMinutes: 25, parts: [{ id: "exam-03-reading-part-1", title: "Teil 1", order: 1, taskIds: ["read-1"] }] },
      { id: "exam-03-writing", skill: "writing", title: "Schreiben", durationMinutes: 30, parts: [{ id: "exam-03-writing-part-1", title: "Teil 1", order: 1, taskIds: ["write-1"] }] },
      { id: "exam-03-speaking", skill: "speaking", title: "Sprechen", durationMinutes: 16, parts: [{ id: "exam-03-speaking-part-1", title: "Teil 1", order: 1, taskIds: ["speak-2"] }] }
    ]
  }
];

export const seedAnswers: AnswerRecord[] = [
  {
    id: "seed-answer-1",
    attemptId: "seed-attempt-1",
    taskId: "listen-1",
    skill: "listening",
    mode: "learning",
    result: "correct",
    selectedOptionIds: ["b"],
    score: 1,
    maxScore: 1,
    timeSpentSeconds: 18,
    answeredAt: "2026-06-26T08:15:00.000Z"
  },
  {
    id: "seed-answer-2",
    attemptId: "seed-attempt-2",
    taskId: "read-2",
    skill: "reading",
    mode: "learning",
    result: "incorrect",
    selectedOptionIds: ["c"],
    score: 0,
    maxScore: 1,
    timeSpentSeconds: 42,
    answeredAt: "2026-06-26T08:24:00.000Z"
  }
];

export const seedErrorItems: ErrorItem[] = [
  {
    id: "error-read-2",
    taskId: "read-2",
    skill: "reading",
    reason: "missed-detail",
    incorrectCount: 1,
    correctReviewCount: 0,
    priority: 3,
    nextReviewAt: "2026-06-27T08:00:00.000Z",
    lastAnsweredAt: "2026-06-26T08:24:00.000Z"
  }
];

export const seedProgress: LearnerProgress = {
  targetLevel: "B1",
  levelEstimate: "between-a2-b1",
  overallCompletion: 0.18,
  skillProgress: {
    listening: {
      skill: "listening",
      answeredCount: 2,
      correctCount: 1,
      accuracy: 0.5,
      lastPracticedAt: "2026-06-26T08:15:00.000Z"
    },
    reading: {
      skill: "reading",
      answeredCount: 2,
      correctCount: 1,
      accuracy: 0.5,
      lastPracticedAt: "2026-06-26T08:24:00.000Z"
    },
    writing: {
      skill: "writing",
      answeredCount: 1,
      correctCount: 1,
      accuracy: 1,
      lastPracticedAt: "2026-06-25T15:00:00.000Z"
    },
    speaking: {
      skill: "speaking",
      answeredCount: 1,
      correctCount: 1,
      accuracy: 1,
      lastPracticedAt: "2026-06-25T15:12:00.000Z"
    }
  },
  dueErrorItems: 1,
  updatedAt: "2026-06-26T08:24:00.000Z"
};

export function getTasksBySkill(skill: SkillArea) {
  return mockTasks.filter((task) => task.skill === skill);
}

export function getTaskById(taskId: string) {
  return mockTasks.find((task) => task.id === taskId) ?? null;
}
