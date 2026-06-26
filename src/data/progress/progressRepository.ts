import type { AnswerRecord } from "../../domain/models/answer";
import type { ErrorItem } from "../../domain/models/errorTrainer";
import type { LearnerProgress } from "../../domain/models/progress";

export interface ProgressRepository {
  getProgress(): Promise<LearnerProgress>;
  saveAnswer(answer: AnswerRecord): Promise<void>;
  listErrorItems(): Promise<ErrorItem[]>;
  upsertErrorItem(errorItem: ErrorItem): Promise<void>;
}

