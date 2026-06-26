import type { SkillArea } from "./exam";

export type ErrorReason =
  | "wrong-option"
  | "missed-detail"
  | "vocabulary"
  | "grammar"
  | "time-pressure"
  | "self-assessment";

export interface ErrorItem {
  id: string;
  taskId: string;
  skill: SkillArea;
  reason: ErrorReason;
  incorrectCount: number;
  correctReviewCount: number;
  priority: number;
  nextReviewAt: string;
  lastAnsweredAt: string;
}

