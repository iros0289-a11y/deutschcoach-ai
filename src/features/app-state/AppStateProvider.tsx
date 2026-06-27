import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Platform } from "react-native";

import { seedAnswers, seedErrorItems, seedProgress } from "../../data/mock/dtzMockData";
import type { AnswerRecord, AnswerResult } from "../../domain/models/answer";
import type { ErrorItem } from "../../domain/models/errorTrainer";
import type { SkillArea } from "../../domain/models/exam";
import type { LearnerProgress } from "../../domain/models/progress";

type AppStateValue = {
  answers: AnswerRecord[];
  errorItems: ErrorItem[];
  progress: LearnerProgress;
  submitAnswer: (params: {
    taskId: string;
    skill: SkillArea;
    mode: "learning" | "review" | "simulation";
    result: AnswerResult;
    selectedOptionIds?: string[];
    freeText?: string;
    score?: number;
    maxScore?: number;
    reason?: ErrorItem["reason"];
  }) => void;
  resetDemoProgress: () => void;
};

const STORAGE_KEY = "deutschcoach-ai-demo-state-v1";
const AppStateContext = createContext<AppStateValue | null>(null);

type PersistedState = {
  answers: AnswerRecord[];
  errorItems: ErrorItem[];
};

function cloneSeedProgress(): LearnerProgress {
  return {
    ...seedProgress,
    skillProgress: {
      listening: { ...seedProgress.skillProgress.listening },
      reading: { ...seedProgress.skillProgress.reading },
      writing: { ...seedProgress.skillProgress.writing },
      speaking: { ...seedProgress.skillProgress.speaking }
    }
  };
}

function withOptionalString(value?: string) {
  return value ? { lastPracticedAt: value } : {};
}

function withOptionalArray(value?: string[]) {
  return value ? { selectedOptionIds: value } : {};
}

function withOptionalText(value?: string) {
  return value ? { freeText: value } : {};
}

function deriveProgress(answers: AnswerRecord[], errorItems: ErrorItem[]): LearnerProgress {
  const progress = cloneSeedProgress();
  const grouped = new Map<SkillArea, AnswerRecord[]>();

  answers.forEach((answer) => {
    const skillAnswers = grouped.get(answer.skill) ?? [];
    skillAnswers.push(answer);
    grouped.set(answer.skill, skillAnswers);
  });

  (Object.keys(progress.skillProgress) as SkillArea[]).forEach((skill) => {
    const records = grouped.get(skill) ?? [];
    if (records.length === 0) {
      return;
    }

    const correctCount = records.filter((item) => item.result === "correct" || item.result === "partial").length;
    progress.skillProgress[skill] = {
      skill,
      answeredCount: records.length,
      correctCount,
      accuracy: correctCount / records.length,
      ...withOptionalString(records[records.length - 1]?.answeredAt)
    };
  });

  const answeredCount = answers.length;
  const correctCount = answers.filter((item) => item.result === "correct" || item.result === "partial").length;
  progress.overallCompletion = Math.min(0.95, Math.max(seedProgress.overallCompletion, answeredCount / 20));
  progress.dueErrorItems = errorItems.length;
  progress.levelEstimate =
    correctCount / Math.max(1, answeredCount) >= 0.75 ? "b1-ready" : "between-a2-b1";
  progress.updatedAt = new Date().toISOString();

  return progress;
}

function readPersistedState(): PersistedState | null {
  if (Platform.OS !== "web" || typeof localStorage === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PersistedState) : null;
  } catch {
    return null;
  }
}

function writePersistedState(state: PersistedState) {
  if (Platform.OS !== "web" || typeof localStorage === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore browser storage issues in the MVP.
  }
}

export function AppStateProvider({ children }: PropsWithChildren) {
  const persisted = readPersistedState();
  const [answers, setAnswers] = useState<AnswerRecord[]>(persisted?.answers ?? seedAnswers);
  const [errorItems, setErrorItems] = useState<ErrorItem[]>(persisted?.errorItems ?? seedErrorItems);

  useEffect(() => {
    writePersistedState({ answers, errorItems });
  }, [answers, errorItems]);

  const progress = useMemo(() => deriveProgress(answers, errorItems), [answers, errorItems]);

  const value = useMemo<AppStateValue>(
    () => ({
      answers,
      errorItems,
      progress,
      submitAnswer: ({
        freeText,
        maxScore,
        mode,
        reason = "self-assessment",
        result,
        score,
        selectedOptionIds,
        skill,
        taskId
      }) => {
        const answeredAt = new Date().toISOString();
        const answer: AnswerRecord = {
          id: `answer-${taskId}-${Date.now()}`,
          attemptId: `attempt-${mode}-${Date.now()}`,
          taskId,
          skill,
          mode,
          result,
          timeSpentSeconds: 30,
          answeredAt,
          ...(score !== undefined ? { score } : {}),
          ...(maxScore !== undefined ? { maxScore } : {}),
          ...withOptionalArray(selectedOptionIds),
          ...withOptionalText(freeText)
        };

        setAnswers((current) => [...current, answer]);
        setErrorItems((current) => {
          if (result === "correct") {
            return current.filter((item) => item.taskId !== taskId);
          }

          const existing = current.find((item) => item.taskId === taskId);
          if (existing) {
            return current.map((item) =>
              item.taskId === taskId
                ? {
                    ...item,
                    incorrectCount: item.incorrectCount + 1,
                    priority: Math.min(5, item.priority + 1),
                    lastAnsweredAt: answeredAt,
                    nextReviewAt: answeredAt
                  }
                : item
            );
          }

          return [
            ...current,
            {
              id: `error-${taskId}`,
              taskId,
              skill,
              reason,
              incorrectCount: 1,
              correctReviewCount: 0,
              priority: 3,
              nextReviewAt: answeredAt,
              lastAnsweredAt: answeredAt
            }
          ];
        });
      },
      resetDemoProgress: () => {
        setAnswers(seedAnswers);
        setErrorItems(seedErrorItems);
      }
    }),
    [answers, errorItems, progress]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const value = useContext(AppStateContext);
  if (!value) {
    throw new Error("useAppState must be used within AppStateProvider");
  }

  return value;
}
