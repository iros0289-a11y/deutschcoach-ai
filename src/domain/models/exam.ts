export type SkillArea = "listening" | "reading" | "writing" | "speaking";

export type StudyMode = "learning" | "simulation" | "review";

export interface ExamSet {
  id: string;
  title: string;
  modelNumber: number;
  version: string;
  sections: ExamSection[];
}

export interface ExamSection {
  id: string;
  skill: SkillArea;
  title: string;
  durationMinutes?: number;
  parts: ExamPart[];
}

export interface ExamPart {
  id: string;
  title: string;
  order: number;
  taskIds: string[];
}

