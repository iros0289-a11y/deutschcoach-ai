import type { SkillArea, StudyMode } from "./exam";

export type AnswerResult = "correct" | "incorrect" | "partial" | "unscored";

export interface AnswerRecord {
  id: string;
  attemptId: string;
  taskId: string;
  skill: SkillArea;
  mode: StudyMode;
  result: AnswerResult;
  selectedOptionIds?: string[];
  freeText?: string;
  score?: number;
  maxScore?: number;
  timeSpentSeconds: number;
  answeredAt: string;
}

export interface AttemptRecord {
  id: string;
  examSetId?: string;
  mode: StudyMode;
  startedAt: string;
  finishedAt?: string;
  elapsedSeconds: number;
}

