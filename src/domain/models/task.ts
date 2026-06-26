import type { SkillArea } from "./exam";

export type TaskType =
  | "single-choice"
  | "multiple-choice"
  | "matching"
  | "free-text"
  | "self-introduction"
  | "photo-description"
  | "planning-dialogue";

export type Difficulty = "a2" | "a2-b1" | "b1";

export interface TaskOption {
  id: string;
  label: string;
  text: string;
}

export interface MediaAssetReference {
  id: string;
  type: "audio" | "image";
  uri: string;
  transcript?: string;
  durationSeconds?: number;
}

export interface Task {
  id: string;
  skill: SkillArea;
  type: TaskType;
  title: string;
  prompt: string;
  explanation?: string;
  difficulty: Difficulty;
  tags: string[];
  options?: TaskOption[];
  correctOptionIds?: string[];
  media?: MediaAssetReference[];
  maxScore?: number;
}

