import type { AnswerRecord } from "../models/answer";

export interface ScoreSummary {
  earnedPoints: number;
  maxPoints: number;
  accuracy: number;
  passedB1Threshold: boolean;
}

export interface ScoringService {
  scoreObjectiveAnswers(answers: AnswerRecord[]): ScoreSummary;
}

