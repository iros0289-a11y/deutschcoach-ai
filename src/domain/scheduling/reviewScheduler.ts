import type { AnswerRecord } from "../models/answer";
import type { ErrorItem } from "../models/errorTrainer";

export interface ReviewScheduler {
  planNextReview(answer: AnswerRecord, previousErrorItem?: ErrorItem): ErrorItem | null;
}

