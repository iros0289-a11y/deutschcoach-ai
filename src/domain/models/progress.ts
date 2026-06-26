import type { SkillArea } from "./exam";

export type LevelEstimate = "below-a2" | "a2" | "between-a2-b1" | "b1-ready";

export interface SkillProgress {
  skill: SkillArea;
  answeredCount: number;
  correctCount: number;
  accuracy: number;
  lastPracticedAt?: string;
}

export interface LearnerProgress {
  targetLevel: "B1";
  levelEstimate: LevelEstimate;
  overallCompletion: number;
  skillProgress: Record<SkillArea, SkillProgress>;
  dueErrorItems: number;
  updatedAt: string;
}

