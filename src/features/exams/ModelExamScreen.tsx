import { useMemo, useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { colors, radius, spacing, typography } from "../../core/theme";
import {
  listeningPartOneTasks,
  listeningPartThreeTasks,
  listeningPartTwoSet,
  type ChoiceOption
} from "../../data/content/listeningContent";
import {
  readingBuildingTask,
  readingDualQuestionTasks,
  readingGapTextTasks,
  readingMatchingTask,
  type ReadingMatchingSituation
} from "../../data/content/readingContent";
import { speakingIntroPractice, speakingPhotoPractice, speakingPlanningPractice } from "../../data/content/speakingContent";
import { writingPracticeScenarios } from "../../data/content/writingContent";
import { assessSpeakingResponse, type SpeakingAssessment } from "../../domain/scoring/speakingAssessment";
import { assessWritingDraft, type WritingAssessment } from "../../domain/scoring/writingAssessment";
import { createSpeechCaptureSession, isSpeechRecognitionSupported } from "../../services/speech/speechService";
import { InfoCard } from "../../ui/components/InfoCard";
import { PrimaryButton } from "../../ui/components/PrimaryButton";
import { Screen } from "../../ui/components/Screen";
import { SimpleAudioPlayer } from "../../ui/components/SimpleAudioPlayer";
import { useAppState } from "../app-state/AppStateProvider";

type BinaryAnswer = "richtig" | "falsch";

type ReviewItem = {
  id: string;
  skill: "listening" | "reading" | "writing" | "speaking";
  title: string;
  prompt: string;
  ownAnswer: string;
  correctAnswer: string;
  explanation: string;
  learningTip: string;
  examFocus: string;
  isCorrect: boolean;
};

type SectionSummary = {
  id: "listening" | "reading" | "writing" | "speaking";
  title: string;
  points: number;
  maxPoints: number;
  correctCount: number;
  incorrectCount: number;
};

type ExamEvaluation = {
  reviewItems: ReviewItem[];
  sectionSummaries: SectionSummary[];
  totalPoints: number;
  maxPoints: number;
  percent: number;
  passed: boolean;
  estimatedLevel: "A2" | "A2/B1" | "B1";
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  writingAssessment: WritingAssessment;
  speakingAssessments: {
    intro: SpeakingAssessment;
    photo: SpeakingAssessment;
    planning: SpeakingAssessment;
  };
};

function FeedbackPanel({
  heading,
  accentColor,
  lines
}: {
  heading: string;
  accentColor: string;
  lines: string[];
}) {
  return (
    <View style={styles.feedbackCard}>
      <Text style={[styles.feedbackTitle, { color: accentColor }]}>{heading}</Text>
      {lines.map((line) => (
        <Text key={line} style={styles.feedbackBody}>
          {line}
        </Text>
      ))}
    </View>
  );
}

function ChoiceChips({
  options,
  selectedOptionId,
  onSelect
}: {
  options: ChoiceOption[];
  selectedOptionId: string | undefined;
  onSelect: (optionId: string) => void;
}) {
  return (
    <View style={styles.choiceWrap}>
      {options.map((option) => {
        const active = selectedOptionId === option.id;
        return (
          <Pressable
            key={option.id}
            onPress={() => onSelect(option.id)}
            style={({ pressed }) => [
              styles.choiceChip,
              active && styles.choiceChipSelected,
              pressed && styles.choiceChipPressed
            ]}
          >
            <Text style={[styles.choiceLabel, active && styles.choiceLabelSelected]}>{option.label}</Text>
            <Text style={[styles.choiceText, active && styles.choiceLabelSelected]}>{option.text}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function BinaryChips({
  selected,
  onSelect
}: {
  selected: BinaryAnswer | undefined;
  onSelect: (value: BinaryAnswer) => void;
}) {
  return (
    <View style={styles.binaryWrap}>
      {(["richtig", "falsch"] as BinaryAnswer[]).map((value) => {
        const active = selected === value;
        return (
          <Pressable
            key={value}
            onPress={() => onSelect(value)}
            style={({ pressed }) => [
              styles.binaryChip,
              active && styles.choiceChipSelected,
              pressed && styles.choiceChipPressed
            ]}
          >
            <Text style={[styles.choiceLabel, active && styles.choiceLabelSelected]}>{value}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function RecorderPanel({
  title,
  transcript,
  recording,
  supported,
  durationLabel,
  onStart,
  onStop
}: {
  title: string;
  transcript: string;
  recording: boolean;
  supported: boolean;
  durationLabel: string | undefined;
  onStart: () => void;
  onStop: () => void;
}) {
  return (
    <View style={styles.recorderCard}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.recorderRow}>
        <Pressable
          disabled={!supported || recording}
          onPress={onStart}
          style={({ pressed }) => [
            styles.primaryMiniButton,
            (!supported || recording) && styles.disabledButton,
            pressed && supported && !recording && styles.buttonPressed
          ]}
        >
          <Text style={styles.primaryMiniText}>Aufnahme starten</Text>
        </Pressable>
        <Pressable
          disabled={!supported || !recording}
          onPress={onStop}
          style={({ pressed }) => [
            styles.stopMiniButton,
            (!supported || !recording) && styles.disabledButton,
            pressed && supported && recording && styles.buttonPressed
          ]}
        >
          <Text style={styles.primaryMiniText}>Aufnahme stoppen</Text>
        </Pressable>
      </View>
      <Text style={styles.metaText}>
        {supported
          ? recording
            ? "Aufnahme laeuft. Sprechen Sie moeglichst frei und zusammenhaengend."
            : durationLabel
              ? `Letzte Aufnahme: ${durationLabel}`
              : "Bereit fuer die Aufnahme."
          : "Sprachaufnahme wird in diesem Browser nicht unterstuetzt."}
      </Text>
      <Text style={styles.transcriptBox}>{transcript || "Hier erscheint Ihr erkannter Text nach der Aufnahme."}</Text>
    </View>
  );
}

function formatOption(options: ChoiceOption[], optionId?: string) {
  const option = options.find((item) => item.id === optionId);
  return option ? `${option.label} - ${option.text}` : "Keine Antwort";
}

function formatBinaryAnswer(answer?: BinaryAnswer) {
  return answer ? answer : "Keine Antwort";
}

function getResultFromScore(score: number, maxScore: number) {
  if (score === maxScore) {
    return "correct" as const;
  }

  if (score > 0) {
    return "partial" as const;
  }

  return "incorrect" as const;
}

function getLabelById(options: ChoiceOption[], optionId: string) {
  return options.find((item) => item.id === optionId)?.label ?? optionId.toUpperCase();
}

export function ModelExamScreen() {
  const { submitAnswer } = useAppState();
  const supported = useMemo(() => isSpeechRecognitionSupported(), []);
  const sessionRef = useRef<ReturnType<typeof createSpeechCaptureSession> | null>(null);

  const writingScenario = useMemo(
    () => writingPracticeScenarios.find((item) => item.isExamTask) ?? writingPracticeScenarios[0],
    []
  );
  const speakingPhoto = useMemo(
    () => speakingPhotoPractice.find((item) => item.isExamTask) ?? speakingPhotoPractice[0],
    []
  );
  const speakingPlan = useMemo(
    () => speakingPlanningPractice.find((item) => item.isExamTask) ?? speakingPlanningPractice[0],
    []
  );

  const [listeningChoiceAnswers, setListeningChoiceAnswers] = useState<Record<string, string>>({});
  const [listeningStatementAnswers, setListeningStatementAnswers] = useState<Record<string, BinaryAnswer>>({});
  const [readingMatchingAnswers, setReadingMatchingAnswers] = useState<Record<string, string>>({});
  const [readingBuildingAnswers, setReadingBuildingAnswers] = useState<Record<string, string>>({});
  const [readingChoiceAnswers, setReadingChoiceAnswers] = useState<Record<string, string>>({});
  const [readingStatementAnswers, setReadingStatementAnswers] = useState<Record<string, BinaryAnswer>>({});
  const [readingGapAnswers, setReadingGapAnswers] = useState<Record<string, string>>({});
  const [writingDraft, setWritingDraft] = useState("");
  const [speakingTranscripts, setSpeakingTranscripts] = useState<Record<string, string>>({});
  const [speakingDurations, setSpeakingDurations] = useState<Record<string, number>>({});
  const [recordingTarget, setRecordingTarget] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<ExamEvaluation | null>(null);

  if (!writingScenario || !speakingPhoto || !speakingPlan) {
    return null;
  }

  const startRecording = (targetId: string) => {
    if (!supported || recordingTarget) {
      return;
    }

    sessionRef.current = createSpeechCaptureSession((transcript) => {
      setSpeakingTranscripts((current) => ({ ...current, [targetId]: transcript }));
    });
    setRecordingTarget(targetId);
    sessionRef.current.start();
  };

  const stopRecording = async (targetId: string) => {
    if (!sessionRef.current) {
      return;
    }

    const result = await sessionRef.current.stop();
    sessionRef.current = null;
    setRecordingTarget(null);
    setSpeakingDurations((current) => ({ ...current, [targetId]: result.durationSeconds }));
  };

  const evaluateExam = () => {
    if (evaluation) {
      return;
    }

    const reviewItems: ReviewItem[] = [];

    let listeningPoints = 0;
    let listeningMaxPoints = 0;
    let readingPoints = 0;
    let readingMaxPoints = 0;

    listeningPartOneTasks.forEach((task) => {
      listeningMaxPoints += 2;

      const selectedOptionId = listeningChoiceAnswers[task.id];
      const optionCorrect = selectedOptionId === task.correctOptionId;
      if (optionCorrect) {
        listeningPoints += 1;
      }

      reviewItems.push({
        id: task.id,
        skill: "listening",
        title: task.title,
        prompt: task.question,
        ownAnswer: formatOption(task.options, selectedOptionId),
        correctAnswer: formatOption(task.options, task.correctOptionId),
        explanation: optionCorrect
          ? task.feedback.correctReason
          : task.feedback.incorrectReasonByOption[selectedOptionId ?? ""] ?? task.feedback.correctReason,
        learningTip: task.feedback.learningTip,
        examFocus: task.feedback.examFocus,
        isCorrect: optionCorrect
      });

      submitAnswer({
        taskId: task.id,
        skill: "listening",
        mode: "simulation",
        result: optionCorrect ? "correct" : "incorrect",
        selectedOptionIds: selectedOptionId ? [selectedOptionId] : [],
        score: optionCorrect ? 1 : 0,
        maxScore: 1,
        reason: optionCorrect ? "self-assessment" : "wrong-option"
      });

      const statementAnswer = listeningStatementAnswers[task.statement.id];
      const statementCorrect =
        (statementAnswer === "richtig" && task.statement.correctAnswer) ||
        (statementAnswer === "falsch" && !task.statement.correctAnswer);
      if (statementCorrect) {
        listeningPoints += 1;
      }

      reviewItems.push({
        id: task.statement.id,
        skill: "listening",
        title: `${task.title} - Aussage`,
        prompt: task.statement.text,
        ownAnswer: formatBinaryAnswer(statementAnswer),
        correctAnswer: task.statement.correctAnswer ? "richtig" : "falsch",
        explanation: statementCorrect ? task.statement.correctReason : task.statement.incorrectReason,
        learningTip: task.statement.learningTip,
        examFocus: task.statement.examFocus,
        isCorrect: statementCorrect
      });

      submitAnswer({
        taskId: task.statement.id,
        skill: "listening",
        mode: "simulation",
        result: statementCorrect ? "correct" : "incorrect",
        selectedOptionIds: statementAnswer ? [statementAnswer] : [],
        score: statementCorrect ? 1 : 0,
        maxScore: 1,
        reason: statementCorrect ? "self-assessment" : "missed-detail"
      });
    });

    listeningPartTwoSet.tasks.forEach((task) => {
      listeningMaxPoints += 1;

      const selectedOptionId = listeningChoiceAnswers[task.id];
      const correct = selectedOptionId === task.correctOptionId;
      if (correct) {
        listeningPoints += 1;
      }

      reviewItems.push({
        id: task.id,
        skill: "listening",
        title: `${listeningPartTwoSet.title} - ${task.personLabel}`,
        prompt: task.prompt,
        ownAnswer: formatOption(listeningPartTwoSet.options, selectedOptionId),
        correctAnswer: formatOption(listeningPartTwoSet.options, task.correctOptionId),
        explanation: correct
          ? task.correctReason
          : task.incorrectReasonByOption[selectedOptionId ?? ""] ?? task.correctReason,
        learningTip: task.learningTip,
        examFocus: task.examFocus,
        isCorrect: correct
      });

      submitAnswer({
        taskId: task.id,
        skill: "listening",
        mode: "simulation",
        result: correct ? "correct" : "incorrect",
        selectedOptionIds: selectedOptionId ? [selectedOptionId] : [],
        score: correct ? 1 : 0,
        maxScore: 1,
        reason: correct ? "self-assessment" : "wrong-option"
      });
    });

    listeningPartThreeTasks.forEach((task) => {
      listeningMaxPoints += 1;

      const selectedOptionId = listeningChoiceAnswers[task.id];
      const correct = selectedOptionId === task.correctOptionId;
      if (correct) {
        listeningPoints += 1;
      }

      reviewItems.push({
        id: task.id,
        skill: "listening",
        title: task.title,
        prompt: task.question,
        ownAnswer: formatOption(task.options, selectedOptionId),
        correctAnswer: formatOption(task.options, task.correctOptionId),
        explanation: correct
          ? task.feedback.correctReason
          : task.feedback.incorrectReasonByOption[selectedOptionId ?? ""] ?? task.feedback.correctReason,
        learningTip: task.feedback.learningTip,
        examFocus: task.feedback.examFocus,
        isCorrect: correct
      });

      submitAnswer({
        taskId: task.id,
        skill: "listening",
        mode: "simulation",
        result: correct ? "correct" : "incorrect",
        selectedOptionIds: selectedOptionId ? [selectedOptionId] : [],
        score: correct ? 1 : 0,
        maxScore: 1,
        reason: correct ? "self-assessment" : "wrong-option"
      });
    });

    const handleReadingMatching = (
      title: string,
      situations: ReadingMatchingSituation[],
      sourceOptions: Array<{ id: string; title: string }>
    ) => {
      situations.forEach((situation) => {
        readingMaxPoints += 1;

        const selectedOptionId =
          title === readingMatchingTask.title
            ? readingMatchingAnswers[situation.id]
            : readingBuildingAnswers[situation.id];
        const correct = selectedOptionId === situation.correctId;
        if (correct) {
          readingPoints += 1;
        }

        reviewItems.push({
          id: situation.id,
          skill: "reading",
          title,
          prompt: situation.text,
          ownAnswer: sourceOptions.find((item) => item.id === selectedOptionId)?.title ?? "Keine Antwort",
          correctAnswer: sourceOptions.find((item) => item.id === situation.correctId)?.title ?? situation.correctId,
          explanation: correct
            ? situation.correctReason
            : situation.incorrectReasonByOption[selectedOptionId ?? ""] ?? situation.correctReason,
          learningTip: situation.learningTip,
          examFocus: situation.examFocus,
          isCorrect: correct
        });

        submitAnswer({
          taskId: situation.id,
          skill: "reading",
          mode: "simulation",
          result: correct ? "correct" : "incorrect",
          selectedOptionIds: selectedOptionId ? [selectedOptionId] : [],
          score: correct ? 1 : 0,
          maxScore: 1,
          reason: correct ? "self-assessment" : "wrong-option"
        });
      });
    };

    handleReadingMatching(
      readingMatchingTask.title,
      readingMatchingTask.situations,
      readingMatchingTask.ads.map((ad) => ({ id: ad.id, title: ad.title }))
    );
    handleReadingMatching(
      readingBuildingTask.title,
      readingBuildingTask.situations,
      readingBuildingTask.levels.map((level) => ({ id: level.id, title: level.name }))
    );

    readingDualQuestionTasks.forEach((task) => {
      readingMaxPoints += 2;

      const statementAnswer = readingStatementAnswers[task.id];
      const statementCorrect =
        (statementAnswer === "richtig" && task.statement.correctAnswer) ||
        (statementAnswer === "falsch" && !task.statement.correctAnswer);
      if (statementCorrect) {
        readingPoints += 1;
      }

      reviewItems.push({
        id: `${task.id}-statement`,
        skill: "reading",
        title: `${task.title} - Aussage`,
        prompt: task.statement.text,
        ownAnswer: formatBinaryAnswer(statementAnswer),
        correctAnswer: task.statement.correctAnswer ? "richtig" : "falsch",
        explanation: statementCorrect ? task.statement.correctReason : task.statement.incorrectReason,
        learningTip: task.feedback.learningTip,
        examFocus: task.feedback.examFocus,
        isCorrect: statementCorrect
      });

      submitAnswer({
        taskId: `${task.id}-statement`,
        skill: "reading",
        mode: "simulation",
        result: statementCorrect ? "correct" : "incorrect",
        selectedOptionIds: statementAnswer ? [statementAnswer] : [],
        score: statementCorrect ? 1 : 0,
        maxScore: 1,
        reason: statementCorrect ? "self-assessment" : "missed-detail"
      });

      const selectedOptionId = readingChoiceAnswers[task.id];
      const choiceCorrect = selectedOptionId === task.correctOptionId;
      if (choiceCorrect) {
        readingPoints += 1;
      }

      reviewItems.push({
        id: task.id,
        skill: "reading",
        title: task.title,
        prompt: task.question,
        ownAnswer: formatOption(task.options, selectedOptionId),
        correctAnswer: formatOption(task.options, task.correctOptionId),
        explanation: choiceCorrect
          ? task.feedback.correctReason
          : task.feedback.incorrectReasonByOption[selectedOptionId ?? ""] ?? task.feedback.correctReason,
        learningTip: task.feedback.learningTip,
        examFocus: task.feedback.examFocus,
        isCorrect: choiceCorrect
      });

      submitAnswer({
        taskId: task.id,
        skill: "reading",
        mode: "simulation",
        result: choiceCorrect ? "correct" : "incorrect",
        selectedOptionIds: selectedOptionId ? [selectedOptionId] : [],
        score: choiceCorrect ? 1 : 0,
        maxScore: 1,
        reason: choiceCorrect ? "self-assessment" : "wrong-option"
      });
    });

    readingGapTextTasks.forEach((task) => {
      readingMaxPoints += task.gaps.length;

      const ownAnswerLines = task.gaps.map((gap) => {
        const key = `${task.id}:${gap.id}`;
        const selectedOptionId = readingGapAnswers[key];
        return `${gap.label}: ${formatOption(task.options, selectedOptionId)}`;
      });
      const correctAnswerLines = task.gaps.map(
        (gap) => `${gap.label}: ${formatOption(task.options, gap.correctOptionId)}`
      );
      const explanationLines = task.gaps.map((gap) => {
        const key = `${task.id}:${gap.id}`;
        const selectedOptionId = readingGapAnswers[key];
        return selectedOptionId === gap.correctOptionId
          ? `Luecke ${gap.label}: ${gap.clue}`
          : `Luecke ${gap.label}: ${gap.wrongChoiceGuidance} Richtiger Hinweis: ${gap.clue}`;
      });
      const gapScore = task.gaps.filter((gap) => readingGapAnswers[`${task.id}:${gap.id}`] === gap.correctOptionId).length;
      readingPoints += gapScore;

      reviewItems.push({
        id: task.id,
        skill: "reading",
        title: task.title,
        prompt: task.instruction,
        ownAnswer: ownAnswerLines.join("\n"),
        correctAnswer: correctAnswerLines.join("\n"),
        explanation: explanationLines.join("\n"),
        learningTip: task.learningTip,
        examFocus: task.examFocus,
        isCorrect: gapScore === task.gaps.length
      });

      submitAnswer({
        taskId: task.id,
        skill: "reading",
        mode: "simulation",
        result: getResultFromScore(gapScore, task.gaps.length),
        selectedOptionIds: task.gaps
          .map((gap) => readingGapAnswers[`${task.id}:${gap.id}`])
          .filter((value): value is string => Boolean(value)),
        score: gapScore,
        maxScore: task.gaps.length,
        reason: gapScore === task.gaps.length ? "self-assessment" : "missed-detail"
      });
    });

    const writingAssessment = assessWritingDraft(writingScenario, writingDraft);
    const writingCorrect = writingAssessment.estimatedPoints >= 14;

    reviewItems.push({
      id: writingScenario.id,
      skill: "writing",
      title: writingScenario.title,
      prompt: writingScenario.situation,
      ownAnswer: writingDraft.trim() || "Keine Antwort",
      correctAnswer: writingScenario.expandedSampleText,
      explanation: `Aufgabe erfuellt: ${writingAssessment.criteria.find((item) => item.id === "taskCompletion")?.comment ?? ""}\nB1-Niveau: ${writingAssessment.criteria.find((item) => item.id === "b1Level")?.comment ?? ""}`,
      learningTip: writingAssessment.improvements[0] ?? "Bearbeiten Sie alle vier Inhaltspunkte in einer klaren Reihenfolge.",
      examFocus: "Darauf sollten Sie in der DTZ-Pruefung achten: Schreiben Sie vollstaendige Saetze, bearbeiten Sie alle vier Punkte und bleiben Sie freundlich.",
      isCorrect: writingCorrect
    });

    submitAnswer({
      taskId: writingScenario.id,
      skill: "writing",
      mode: "simulation",
      result: getResultFromScore(writingAssessment.estimatedPoints, writingAssessment.maxPoints),
      freeText: writingDraft,
      score: writingAssessment.estimatedPoints,
      maxScore: writingAssessment.maxPoints,
      reason: "self-assessment"
    });

    const introAssessment = assessSpeakingResponse({
      transcript: speakingTranscripts["speaking-intro"] ?? "",
      durationSeconds: speakingDurations["speaking-intro"] ?? 0,
      expectedKeywords: speakingIntroPractice.expectedKeywords
    });
    const photoAssessment = assessSpeakingResponse({
      transcript: speakingTranscripts[speakingPhoto.id] ?? "",
      durationSeconds: speakingDurations[speakingPhoto.id] ?? 0,
      expectedKeywords: speakingPhoto.expectedKeywords
    });
    const planningTranscript = speakingPlan.dialogueSteps
      .filter((step) => step.speaker === "user")
      .map((step) => speakingTranscripts[step.id] ?? "")
      .join(" ")
      .trim();
    const planningDuration = speakingPlan.dialogueSteps
      .filter((step) => step.speaker === "user")
      .reduce((sum, step) => sum + (speakingDurations[step.id] ?? 0), 0);
    const planningAssessment = assessSpeakingResponse({
      transcript: planningTranscript,
      durationSeconds: planningDuration,
      expectedKeywords: speakingPlan.expectedKeywords
    });

    [
      {
        taskId: "speaking-intro",
        title: "Sprechen - Sich vorstellen",
        prompt: speakingIntroPractice.prompts.join(" / "),
        ownAnswer: speakingTranscripts["speaking-intro"] ?? "Keine Antwort",
        correctAnswer: speakingIntroPractice.expandedSampleAnswer,
        assessment: introAssessment,
        learningTipFallback: "Sprechen Sie in ganzen Saetzen ueber Name, Herkunft, Alltag und Ziel."
      },
      {
        taskId: speakingPhoto.id,
        title: speakingPhoto.title,
        prompt: speakingPhoto.responsePrompts.join(" / "),
        ownAnswer: speakingTranscripts[speakingPhoto.id] ?? "Keine Antwort",
        correctAnswer: speakingPhoto.expandedSampleAnswer,
        assessment: photoAssessment,
        learningTipFallback: "Beschreiben Sie erst das Bild, dann die Situation und zum Schluss Ihre Erfahrung."
      },
      {
        taskId: speakingPlan.id,
        title: speakingPlan.title,
        prompt: speakingPlan.setting,
        ownAnswer: planningTranscript || "Keine Antwort",
        correctAnswer: speakingPlan.sampleDialogue,
        assessment: planningAssessment,
        learningTipFallback: "Gehen Sie bei der Planung auf Zeit, Ort, Aufgaben und eine Alternative ein."
      }
    ].forEach((item) => {
      reviewItems.push({
        id: item.taskId,
        skill: "speaking",
        title: item.title,
        prompt: item.prompt,
        ownAnswer: item.ownAnswer,
        correctAnswer: item.correctAnswer,
        explanation: item.assessment.criteria.map((criterion) => `${criterion.label}: ${criterion.comment}`).join("\n"),
        learningTip: item.assessment.improvements[0] ?? item.learningTipFallback,
        examFocus: "Darauf sollten Sie in der DTZ-Pruefung achten: Antworten Sie zusammenhaengend, nutzen Sie Redemittel und geben Sie konkrete Details.",
        isCorrect: item.assessment.estimatedPoints >= 14
      });

      submitAnswer({
        taskId: item.taskId,
        skill: "speaking",
        mode: "simulation",
        result: getResultFromScore(item.assessment.estimatedPoints, item.assessment.maxPoints),
        freeText: item.ownAnswer,
        score: item.assessment.estimatedPoints,
        maxScore: item.assessment.maxPoints,
        reason: "self-assessment"
      });
    });

    const speakingPoints = Math.round(
      (introAssessment.estimatedPoints + photoAssessment.estimatedPoints + planningAssessment.estimatedPoints) / 3
    );
    const speakingCorrectCount = [introAssessment, photoAssessment, planningAssessment].filter(
      (item) => item.estimatedPoints >= 14
    ).length;
    const sectionSummaries: SectionSummary[] = [
      {
        id: "listening",
        title: "Hoeren",
        points: listeningPoints,
        maxPoints: listeningMaxPoints,
        correctCount: listeningPoints,
        incorrectCount: listeningMaxPoints - listeningPoints
      },
      {
        id: "reading",
        title: "Lesen",
        points: readingPoints,
        maxPoints: readingMaxPoints,
        correctCount: readingPoints,
        incorrectCount: readingMaxPoints - readingPoints
      },
      {
        id: "writing",
        title: "Schreiben",
        points: writingAssessment.estimatedPoints,
        maxPoints: writingAssessment.maxPoints,
        correctCount: writingCorrect ? 1 : 0,
        incorrectCount: writingCorrect ? 0 : 1
      },
      {
        id: "speaking",
        title: "Sprechen",
        points: speakingPoints,
        maxPoints: 20,
        correctCount: speakingCorrectCount,
        incorrectCount: 3 - speakingCorrectCount
      }
    ];

    const totalPoints = sectionSummaries.reduce((sum, item) => sum + item.points, 0);
    const maxPoints = sectionSummaries.reduce((sum, item) => sum + item.maxPoints, 0);
    const percent = Math.round((totalPoints / Math.max(1, maxPoints)) * 100);
    const passed = percent >= 60 && writingAssessment.estimatedPoints >= 10 && speakingPoints >= 10;
    const estimatedLevel =
      percent >= 72 && writingAssessment.estimatedPoints >= 14 && speakingPoints >= 14
        ? "B1"
        : percent >= 55
          ? "A2/B1"
          : "A2";

    const rankedSections = [...sectionSummaries].sort(
      (left, right) => right.points / right.maxPoints - left.points / left.maxPoints
    );
    const strengths = rankedSections
      .slice(0, 2)
      .map((item) => `${item.title}: ${item.points} von ${item.maxPoints} Punkten erreicht.`);
    const weaknesses = rankedSections
      .slice(-2)
      .map((item) => `${item.title}: Hier liegt im Moment der groesste Nacharbeitsbedarf.`);

    const recommendations = [
      sectionSummaries.find((item) => item.id === "listening")?.points === listeningMaxPoints
        ? ""
        : "Hoeren: Achten Sie noch genauer auf Anlass, Zeitangaben und kleine Unterschiede in den Aussagen.",
      sectionSummaries.find((item) => item.id === "reading")?.points === readingMaxPoints
        ? ""
        : "Lesen: Markieren Sie bei Texten zuerst Schluesselwoerter zu Ort, Zeit, Grund und Ziel.",
      writingAssessment.improvements[0] ?? "",
      introAssessment.improvements[0] ?? "",
      photoAssessment.improvements[0] ?? "",
      planningAssessment.improvements[0] ?? ""
    ].filter(Boolean).slice(0, 4);

    setEvaluation({
      reviewItems,
      sectionSummaries,
      totalPoints,
      maxPoints,
      percent,
      passed,
      estimatedLevel,
      strengths,
      weaknesses,
      recommendations,
      writingAssessment,
      speakingAssessments: {
        intro: introAssessment,
        photo: photoAssessment,
        planning: planningAssessment
      }
    });
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <InfoCard>
        <Text style={styles.eyebrow}>DTZ B1</Text>
        <Text style={styles.title}>Modellpruefung 1</Text>
        <Text style={styles.body}>
          Pruefungsmodus ohne Sofortloesungen. Arbeiten Sie alle Teile durch und werten Sie die Pruefung erst am Ende aus.
        </Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryPill}>Hoeren: 3 Teile</Text>
          <Text style={styles.summaryPill}>Lesen: 5 Formate</Text>
          <Text style={styles.summaryPill}>Schreiben: 1 Aufgabe</Text>
          <Text style={styles.summaryPill}>Sprechen: 3 Teile</Text>
        </View>
      </InfoCard>

      <InfoCard>
        <Text style={styles.sectionTitle}>1. Hoeren</Text>
        <Text style={styles.partLabel}>Teil 1</Text>
        {listeningPartOneTasks.map((task) => (
          <View key={task.id} style={styles.taskCard}>
            <Text style={styles.cardTitle}>{task.title}</Text>
            <SimpleAudioPlayer durationLabel={task.durationLabel} text={task.transcript} title="Hoertext abspielen" />
            <Text style={styles.prompt}>{task.question}</Text>
            <ChoiceChips
              options={task.options}
              selectedOptionId={listeningChoiceAnswers[task.id]}
              onSelect={(optionId) =>
                setListeningChoiceAnswers((current) => ({ ...current, [task.id]: optionId }))
              }
            />
            <Text style={styles.prompt}>{task.statement.text}</Text>
            <BinaryChips
              selected={listeningStatementAnswers[task.statement.id]}
              onSelect={(value) =>
                setListeningStatementAnswers((current) => ({ ...current, [task.statement.id]: value }))
              }
            />
          </View>
        ))}

        <Text style={styles.partLabel}>Teil 2</Text>
        <View style={styles.referenceCard}>
          <Text style={styles.bodyStrong}>{listeningPartTwoSet.instruction}</Text>
          {listeningPartTwoSet.options.map((option) => (
            <Text key={option.id} style={styles.referenceText}>
              {option.label}: {option.text}
            </Text>
          ))}
        </View>
        {listeningPartTwoSet.tasks.map((task) => (
          <View key={task.id} style={styles.taskCard}>
            <Text style={styles.cardTitle}>{task.personLabel}</Text>
            <SimpleAudioPlayer durationLabel={task.durationLabel} text={task.transcript} title="Aussage abspielen" />
            <Text style={styles.prompt}>{task.prompt}</Text>
            <ChoiceChips
              options={listeningPartTwoSet.options}
              selectedOptionId={listeningChoiceAnswers[task.id]}
              onSelect={(optionId) =>
                setListeningChoiceAnswers((current) => ({ ...current, [task.id]: optionId }))
              }
            />
          </View>
        ))}

        <Text style={styles.partLabel}>Teil 3</Text>
        {listeningPartThreeTasks.map((task) => (
          <View key={task.id} style={styles.taskCard}>
            <Text style={styles.cardTitle}>{task.title}</Text>
            <SimpleAudioPlayer durationLabel={task.durationLabel} text={task.transcript} title="Ansage abspielen" />
            <Text style={styles.prompt}>{task.question}</Text>
            <ChoiceChips
              options={task.options}
              selectedOptionId={listeningChoiceAnswers[task.id]}
              onSelect={(optionId) =>
                setListeningChoiceAnswers((current) => ({ ...current, [task.id]: optionId }))
              }
            />
          </View>
        ))}
      </InfoCard>

      <InfoCard>
        <Text style={styles.sectionTitle}>2. Lesen</Text>
        <Text style={styles.partLabel}>Anzeigen zuordnen</Text>
        <View style={styles.choiceWrap}>
          {readingMatchingTask.ads.map((ad) => (
            <View key={ad.id} style={styles.referenceCard}>
              <Text style={styles.bodyStrong}>{ad.title}</Text>
              <Text style={styles.referenceText}>{ad.body}</Text>
              <Text style={styles.metaText}>{ad.contact}</Text>
            </View>
          ))}
        </View>
        {readingMatchingTask.situations.map((situation) => (
          <View key={situation.id} style={styles.taskCard}>
            <Text style={styles.prompt}>{situation.text}</Text>
            <ChoiceChips
              options={readingMatchingTask.ads.map((ad) => ({ id: ad.id, label: ad.title, text: ad.contact }))}
              selectedOptionId={readingMatchingAnswers[situation.id]}
              onSelect={(optionId) =>
                setReadingMatchingAnswers((current) => ({ ...current, [situation.id]: optionId }))
              }
            />
          </View>
        ))}

        <Text style={styles.partLabel}>Gebaeudeplan</Text>
        <View style={styles.referenceCard}>
          <Text style={styles.bodyStrong}>{readingBuildingTask.buildingName}</Text>
          {readingBuildingTask.levels.map((level) => (
            <Text key={level.id} style={styles.referenceText}>
              {level.name}: {level.places.join(", ")}
            </Text>
          ))}
        </View>
        {readingBuildingTask.situations.map((situation) => (
          <View key={situation.id} style={styles.taskCard}>
            <Text style={styles.prompt}>{situation.text}</Text>
            <ChoiceChips
              options={readingBuildingTask.levels.map((level) => ({
                id: level.id,
                label: level.name,
                text: level.places.join(", ")
              }))}
              selectedOptionId={readingBuildingAnswers[situation.id]}
              onSelect={(optionId) =>
                setReadingBuildingAnswers((current) => ({ ...current, [situation.id]: optionId }))
              }
            />
          </View>
        ))}

        <Text style={styles.partLabel}>E-Mail, Aushang, Fahrplan</Text>
        {readingDualQuestionTasks.map((task) => (
          <View key={task.id} style={styles.taskCard}>
            <Text style={styles.cardTitle}>{task.title}</Text>
            <Text style={styles.metaText}>
              {task.format} - {task.sourceTitle}
            </Text>
            <Text style={styles.longText}>{task.text}</Text>
            <Text style={styles.prompt}>{task.statement.text}</Text>
            <BinaryChips
              selected={readingStatementAnswers[task.id]}
              onSelect={(value) =>
                setReadingStatementAnswers((current) => ({ ...current, [task.id]: value }))
              }
            />
            <Text style={styles.prompt}>{task.question}</Text>
            <ChoiceChips
              options={task.options}
              selectedOptionId={readingChoiceAnswers[task.id]}
              onSelect={(optionId) =>
                setReadingChoiceAnswers((current) => ({ ...current, [task.id]: optionId }))
              }
            />
          </View>
        ))}

        <Text style={styles.partLabel}>Lueckentext</Text>
        {readingGapTextTasks.map((task) => (
          <View key={task.id} style={styles.taskCard}>
            <Text style={styles.cardTitle}>{task.title}</Text>
            <Text style={styles.metaText}>{task.topic}</Text>
            <Text style={styles.prompt}>{task.instruction}</Text>
            <Text style={styles.longText}>
              {task.segments.map((segment, index) =>
                `${segment}${index < task.gaps.length ? `[${task.gaps[index]?.label}]` : ""}`
              ).join("")}
            </Text>
            <View style={styles.referenceCard}>
              {task.options.map((option) => (
                <Text key={option.id} style={styles.referenceText}>
                  {option.label}: {option.text}
                </Text>
              ))}
            </View>
            {task.gaps.map((gap) => (
              <View key={gap.id} style={styles.gapCard}>
                <Text style={styles.bodyStrong}>Luecke {gap.label}</Text>
                <ChoiceChips
                  options={task.options}
                  selectedOptionId={readingGapAnswers[`${task.id}:${gap.id}`]}
                  onSelect={(optionId) =>
                    setReadingGapAnswers((current) => ({
                      ...current,
                      [`${task.id}:${gap.id}`]: optionId
                    }))
                  }
                />
              </View>
            ))}
          </View>
        ))}
      </InfoCard>

      <InfoCard>
        <Text style={styles.sectionTitle}>3. Schreiben</Text>
        <Text style={styles.cardTitle}>{writingScenario.title}</Text>
        <Text style={styles.metaText}>Empfaenger: {writingScenario.recipient}</Text>
        <Text style={styles.longText}>{writingScenario.situation}</Text>
        <View style={styles.referenceCard}>
          <Text style={styles.bodyStrong}>Diese vier Punkte muessen vorkommen:</Text>
          {writingScenario.points.map((point) => (
            <Text key={point} style={styles.referenceText}>
              - {point}
            </Text>
          ))}
        </View>
        <TextInput
          multiline
          onChangeText={setWritingDraft}
          placeholder="Schreiben Sie hier Ihre E-Mail oder Ihren Brief."
          placeholderTextColor={colors.textMuted}
          style={styles.textArea}
          textAlignVertical="top"
          value={writingDraft}
        />
      </InfoCard>

      <InfoCard>
        <Text style={styles.sectionTitle}>4. Sprechen</Text>
        <Text style={styles.partLabel}>Teil 1 - Sich vorstellen</Text>
        <View style={styles.referenceCard}>
          {speakingIntroPractice.prompts.map((prompt) => (
            <Text key={prompt} style={styles.referenceText}>
              - {prompt}
            </Text>
          ))}
        </View>
        <RecorderPanel
          title="Ihre Aufnahme"
          transcript={speakingTranscripts["speaking-intro"] ?? ""}
          recording={recordingTarget === "speaking-intro"}
          supported={supported}
          durationLabel={
            speakingDurations["speaking-intro"] ? `${speakingDurations["speaking-intro"]} Sek.` : undefined
          }
          onStart={() => startRecording("speaking-intro")}
          onStop={() => void stopRecording("speaking-intro")}
        />

        <Text style={styles.partLabel}>Teil 2 - Bildbeschreibung</Text>
        <Image source={speakingPhoto.image} resizeMode="contain" style={styles.photoLarge} />
        <View style={styles.referenceCard}>
          {speakingPhoto.responsePrompts.map((prompt) => (
            <Text key={prompt} style={styles.referenceText}>
              - {prompt}
            </Text>
          ))}
        </View>
        <RecorderPanel
          title="Ihre Aufnahme zur Bildbeschreibung"
          transcript={speakingTranscripts[speakingPhoto.id] ?? ""}
          recording={recordingTarget === speakingPhoto.id}
          supported={supported}
          durationLabel={speakingDurations[speakingPhoto.id] ? `${speakingDurations[speakingPhoto.id]} Sek.` : undefined}
          onStart={() => startRecording(speakingPhoto.id)}
          onStop={() => void stopRecording(speakingPhoto.id)}
        />

        <Text style={styles.partLabel}>Teil 3 - Gemeinsam planen</Text>
        <Text style={styles.longText}>{speakingPlan.setting}</Text>
        <View style={styles.roleGrid}>
          <View style={styles.referenceCard}>
            <Text style={styles.bodyStrong}>Ihre Rolle</Text>
            {speakingPlan.roleA.map((item) => (
              <Text key={item} style={styles.referenceText}>
                - {item}
              </Text>
            ))}
          </View>
          <View style={styles.referenceCard}>
            <Text style={styles.bodyStrong}>Rolle des Partners</Text>
            {speakingPlan.roleB.map((item) => (
              <Text key={item} style={styles.referenceText}>
                - {item}
              </Text>
            ))}
          </View>
        </View>
        {speakingPlan.dialogueSteps.map((step) =>
          step.speaker === "partner" ? (
            <View key={step.id} style={styles.partnerBubble}>
              <Text style={styles.partnerLabel}>Virtueller Partner</Text>
              <Text style={styles.referenceText}>{step.text}</Text>
            </View>
          ) : (
            <RecorderPanel
              key={step.id}
              title="Ihre muendliche Antwort"
              transcript={speakingTranscripts[step.id] ?? ""}
              recording={recordingTarget === step.id}
              supported={supported}
              durationLabel={speakingDurations[step.id] ? `${speakingDurations[step.id]} Sek.` : undefined}
              onStart={() => startRecording(step.id)}
              onStop={() => void stopRecording(step.id)}
            />
          )
        )}
      </InfoCard>

      <InfoCard>
        <Text style={styles.sectionTitle}>Pruefung abschliessen</Text>
        <Text style={styles.body}>
          Waehrend der Pruefung werden keine Loesungen, Tipps oder Mustertexte angezeigt. Erst jetzt erfolgt die komplette Auswertung.
        </Text>
        <PrimaryButton icon="clipboard-check-outline" label="Pruefung auswerten" onPress={evaluateExam} />
      </InfoCard>

      {evaluation ? (
        <InfoCard>
          <Text style={styles.sectionTitle}>Gesamtuebersicht</Text>
          <Text style={styles.resultLine}>
            Gesamtpunktzahl: {evaluation.totalPoints} / {evaluation.maxPoints}
          </Text>
          <Text style={styles.resultLine}>Prozent: {evaluation.percent}%</Text>
          <Text style={styles.resultLine}>Ergebnis: {evaluation.passed ? "Bestanden" : "Nicht bestanden"}</Text>
          <Text style={styles.resultLine}>Geschaetztes DTZ-Niveau: {evaluation.estimatedLevel}</Text>

          <View style={styles.summaryGrid}>
            {evaluation.sectionSummaries.map((section) => (
              <View key={section.id} style={styles.summaryCard}>
                <Text style={styles.cardTitle}>{section.title}</Text>
                <Text style={styles.referenceText}>
                  Punkte: {section.points} / {section.maxPoints}
                </Text>
                <Text style={styles.referenceText}>Richtige Aufgaben: {section.correctCount}</Text>
                <Text style={styles.referenceText}>Falsche Aufgaben: {section.incorrectCount}</Text>
              </View>
            ))}
          </View>

          <FeedbackPanel heading="Staerken" accentColor={colors.success} lines={evaluation.strengths} />
          <FeedbackPanel heading="Schwaechen" accentColor={colors.warning} lines={evaluation.weaknesses} />
          <FeedbackPanel
            heading="Empfehlungen"
            accentColor={colors.primary}
            lines={evaluation.recommendations}
          />
        </InfoCard>
      ) : null}

      {evaluation ? (
        <InfoCard>
          <Text style={styles.sectionTitle}>Schreiben bewerten</Text>
          <Text style={styles.resultLine}>
            Geschaetzte Punktzahl: {evaluation.writingAssessment.estimatedPoints} / {evaluation.writingAssessment.maxPoints}
          </Text>
          <Text style={styles.resultLine}>Geschaetztes Niveau: {evaluation.writingAssessment.estimatedLevel}</Text>
          <View style={styles.summaryGrid}>
            {evaluation.writingAssessment.criteria.map((criterion) => (
              <View key={criterion.id} style={styles.summaryCard}>
                <Text style={styles.cardTitle}>{criterion.label}</Text>
                <Text style={styles.referenceText}>
                  {criterion.score} / {criterion.maxScore}
                </Text>
                <Text style={styles.referenceText}>{criterion.comment}</Text>
              </View>
            ))}
          </View>
        </InfoCard>
      ) : null}

      {evaluation ? (
        <InfoCard>
          <Text style={styles.sectionTitle}>Sprechen bewerten</Text>
          <View style={styles.summaryGrid}>
            {[
              { label: "Teil 1", assessment: evaluation.speakingAssessments.intro },
              { label: "Teil 2", assessment: evaluation.speakingAssessments.photo },
              { label: "Teil 3", assessment: evaluation.speakingAssessments.planning }
            ].map((item) => (
              <View key={item.label} style={styles.summaryCard}>
                <Text style={styles.cardTitle}>{item.label}</Text>
                <Text style={styles.referenceText}>
                  Punkte: {item.assessment.estimatedPoints} / {item.assessment.maxPoints}
                </Text>
                <Text style={styles.referenceText}>Niveau: {item.assessment.estimatedLevel}</Text>
                <Text style={styles.referenceText}>{item.assessment.improvements[0] ?? "Stabil beantwortet."}</Text>
              </View>
            ))}
          </View>
        </InfoCard>
      ) : null}

      {evaluation ? (
        <InfoCard>
          <Text style={styles.sectionTitle}>Fehleranalyse und Loesungen</Text>
          {evaluation.reviewItems.map((item) => (
            <View key={item.id} style={styles.reviewCard}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.metaText}>{item.skill.toUpperCase()}</Text>
              <Text style={styles.prompt}>{item.prompt}</Text>
              <Text style={[styles.reviewBadge, { color: item.isCorrect ? colors.success : colors.danger }]}>
                {item.isCorrect ? "Richtig" : "Falsch"}
              </Text>
              <View style={styles.referenceCard}>
                <Text style={styles.bodyStrong}>Eigene Antwort</Text>
                <Text style={styles.referenceText}>{item.ownAnswer}</Text>
              </View>
              <View style={styles.referenceCard}>
                <Text style={styles.bodyStrong}>Richtige Loesung</Text>
                <Text style={styles.referenceText}>{item.correctAnswer}</Text>
              </View>
              <View style={styles.referenceCard}>
                <Text style={styles.bodyStrong}>Begruendung</Text>
                <Text style={styles.referenceText}>{item.explanation}</Text>
              </View>
              <View style={styles.referenceCard}>
                <Text style={styles.bodyStrong}>Lerntipp</Text>
                <Text style={styles.referenceText}>{item.learningTip}</Text>
              </View>
              <View style={styles.referenceCard}>
                <Text style={styles.bodyStrong}>Darauf sollten Sie in der DTZ-Pruefung achten</Text>
                <Text style={styles.referenceText}>{item.examFocus}</Text>
              </View>
              {item.id === writingScenario.id ? (
                <View style={styles.referenceCard}>
                  <Text style={styles.bodyStrong}>Musterloesung Schreiben</Text>
                  <Text style={styles.referenceText}>{writingScenario.expandedSampleText}</Text>
                </View>
              ) : null}
              {item.id === "speaking-intro" ? (
                <>
                  <View style={styles.referenceCard}>
                    <Text style={styles.bodyStrong}>Musterloesung Teil 1</Text>
                    <Text style={styles.referenceText}>{speakingIntroPractice.expandedSampleAnswer}</Text>
                  </View>
                  <SimpleAudioPlayer
                    durationLabel="00:38"
                    text={speakingIntroPractice.expandedSampleAnswer}
                    title="Musterloesung Teil 1 anhoeren"
                  />
                </>
              ) : null}
              {item.id === speakingPhoto.id ? (
                <>
                  <View style={styles.referenceCard}>
                    <Text style={styles.bodyStrong}>Musterloesung Bildbeschreibung</Text>
                    <Text style={styles.referenceText}>{speakingPhoto.expandedSampleAnswer}</Text>
                  </View>
                  <SimpleAudioPlayer
                    durationLabel="00:34"
                    text={speakingPhoto.expandedSampleAnswer}
                    title="Musterloesung Teil 2 anhoeren"
                  />
                </>
              ) : null}
              {item.id === speakingPlan.id ? (
                <>
                  <View style={styles.referenceCard}>
                    <Text style={styles.bodyStrong}>Musterdialog Teil 3</Text>
                    <Text style={styles.referenceText}>{speakingPlan.sampleDialogue}</Text>
                  </View>
                  <SimpleAudioPlayer
                    durationLabel="00:42"
                    text={speakingPlan.sampleDialogue}
                    title="Musterdialog Teil 3 anhoeren"
                  />
                </>
              ) : null}
            </View>
          ))}
        </InfoCard>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg
  },
  eyebrow: {
    ...typography.caption,
    color: colors.exam,
    textTransform: "uppercase"
  },
  title: {
    ...typography.screenTitle,
    color: colors.textPrimary
  },
  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.textPrimary
  },
  partLabel: {
    ...typography.caption,
    color: colors.exam,
    textTransform: "uppercase"
  },
  body: {
    ...typography.body,
    color: colors.textSecondary
  },
  bodyStrong: {
    ...typography.bodyStrong,
    color: colors.textPrimary
  },
  summaryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  summaryPill: {
    ...typography.caption,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    color: colors.textPrimary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  taskCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.md,
    padding: spacing.md
  },
  cardTitle: {
    ...typography.bodyStrong,
    color: colors.textPrimary
  },
  prompt: {
    ...typography.bodyStrong,
    color: colors.textPrimary
  },
  choiceWrap: {
    gap: spacing.sm
  },
  choiceChip: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md
  },
  choiceChipSelected: {
    backgroundColor: "#DBEAFE",
    borderColor: colors.primary
  },
  choiceChipPressed: {
    opacity: 0.85
  },
  choiceLabel: {
    ...typography.caption,
    color: colors.textPrimary
  },
  choiceText: {
    ...typography.body,
    color: colors.textSecondary
  },
  choiceLabelSelected: {
    color: colors.primary
  },
  binaryWrap: {
    flexDirection: "row",
    gap: spacing.sm
  },
  binaryChip: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    minWidth: 120,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md
  },
  referenceCard: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    gap: spacing.xs,
    padding: spacing.md
  },
  referenceText: {
    ...typography.body,
    color: colors.textSecondary
  },
  metaText: {
    ...typography.caption,
    color: colors.textMuted
  },
  gapCard: {
    gap: spacing.sm
  },
  textArea: {
    ...typography.body,
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.textPrimary,
    minHeight: 220,
    padding: spacing.md
  },
  recorderCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.sm,
    padding: spacing.md
  },
  recorderRow: {
    flexDirection: "row",
    gap: spacing.sm
  },
  primaryMiniButton: {
    alignItems: "center",
    backgroundColor: colors.speaking,
    borderRadius: radius.md,
    flex: 1,
    justifyContent: "center",
    minHeight: 46,
    paddingHorizontal: spacing.md
  },
  stopMiniButton: {
    alignItems: "center",
    backgroundColor: colors.danger,
    borderRadius: radius.md,
    flex: 1,
    justifyContent: "center",
    minHeight: 46,
    paddingHorizontal: spacing.md
  },
  primaryMiniText: {
    ...typography.caption,
    color: colors.surface
  },
  disabledButton: {
    opacity: 0.45
  },
  buttonPressed: {
    opacity: 0.9
  },
  transcriptBox: {
    ...typography.body,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    color: colors.textPrimary,
    minHeight: 100,
    padding: spacing.md
  },
  photoLarge: {
    alignSelf: "center",
    backgroundColor: colors.background,
    borderRadius: radius.md,
    height: 320,
    width: "100%"
  },
  roleGrid: {
    gap: spacing.md
  },
  partnerBubble: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md
  },
  partnerLabel: {
    ...typography.caption,
    color: colors.speaking,
    textTransform: "uppercase"
  },
  resultLine: {
    ...typography.bodyStrong,
    color: colors.textPrimary
  },
  summaryGrid: {
    gap: spacing.md
  },
  summaryCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.xs,
    padding: spacing.md
  },
  feedbackCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.xs,
    padding: spacing.md
  },
  feedbackTitle: {
    ...typography.bodyStrong
  },
  feedbackBody: {
    ...typography.body,
    color: colors.textPrimary
  },
  reviewCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.md,
    padding: spacing.md
  },
  reviewBadge: {
    ...typography.caption
  },
  longText: {
    ...typography.body,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    color: colors.textPrimary,
    padding: spacing.md
  }
});
