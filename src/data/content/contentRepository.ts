import type { ExamSet } from "../../domain/models/exam";

export interface ContentRepository {
  getExamSets(): Promise<ExamSet[]>;
  getExamSetById(examSetId: string): Promise<ExamSet | null>;
}

