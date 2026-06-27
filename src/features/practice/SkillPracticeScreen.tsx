import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { colors, radius, spacing, typography } from "../../core/theme";
import { getTasksBySkill, skillSummaries } from "../../data/mock/dtzMockData";
import type { ErrorReason } from "../../domain/models/errorTrainer";
import type { SkillArea } from "../../domain/models/exam";
import type { Task } from "../../domain/models/task";
import { InfoCard } from "../../ui/components/InfoCard";
import { PrimaryButton } from "../../ui/components/PrimaryButton";
import { Screen } from "../../ui/components/Screen";
import { useAppState } from "../app-state/AppStateProvider";

type SkillPracticeScreenProps = {
  skill: SkillArea;
};

function getResultForSelection(task: Task, selectedOptionIds: string[]) {
  const correctIds = task.correctOptionIds ?? [];
  const allCorrectSelected = correctIds.every((id) => selectedOptionIds.includes(id));
  const noExtraSelected = selectedOptionIds.every((id) => correctIds.includes(id));

  if (allCorrectSelected && noExtraSelected) {
    return "correct" as const;
  }

  if (selectedOptionIds.some((id) => correctIds.includes(id))) {
    return "partial" as const;
  }

  return "incorrect" as const;
}

export function SkillPracticeScreen({ skill }: SkillPracticeScreenProps) {
  const { submitAnswer } = useAppState();
  const summary = skillSummaries[skill];
  const tasks = getTasksBySkill(skill);
  const [selectedByTask, setSelectedByTask] = useState<Record<string, string[]>>({});
  const [textByTask, setTextByTask] = useState<Record<string, string>>({});
  const [feedbackByTask, setFeedbackByTask] = useState<Record<string, string>>({});

  const handleChoicePress = (task: Task, optionId: string) => {
    const current = selectedByTask[task.id] ?? [];
    const next =
      task.type === "multiple-choice"
        ? current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId]
        : [optionId];

    setSelectedByTask((state) => ({ ...state, [task.id]: next }));
  };

  const handleCheckAnswer = (task: Task) => {
    const selected = selectedByTask[task.id] ?? [];
    const result = getResultForSelection(task, selected);
    submitAnswer({
      taskId: task.id,
      skill,
      mode: "learning",
      result,
      selectedOptionIds: selected,
      score: result === "correct" ? task.maxScore ?? 1 : result === "partial" ? 0.5 : 0,
      maxScore: task.maxScore ?? 1,
      reason: "wrong-option"
    });
    setFeedbackByTask((state) => ({
      ...state,
      [task.id]:
        result === "correct"
          ? "Richtig. Gut erkannt."
          : result === "partial"
            ? "Teilweise richtig. Prüfe die Details noch einmal."
            : "Noch nicht richtig. Die Aufgabe ist jetzt im Fehlertrainer."
    }));
  };

  const handleSelfAssessment = (
    task: Task,
    result: "correct" | "partial" | "incorrect",
    reason: ErrorReason
  ) => {
    submitAnswer({
      taskId: task.id,
      skill,
      mode: "learning",
      result,
      score: result === "correct" ? task.maxScore ?? 3 : result === "partial" ? 1 : 0,
      maxScore: task.maxScore ?? 3,
      reason,
      ...(textByTask[task.id] ? { freeText: textByTask[task.id] } : {})
    });
    setFeedbackByTask((state) => ({
      ...state,
      [task.id]:
        result === "correct"
          ? "Gespeichert. Diese Aufgabe erscheint künftig seltener."
          : "Gespeichert. Diese Aufgabe landet im Fehlertrainer zur Wiederholung."
    }));
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <InfoCard>
        <Text style={styles.eyebrow}>DTZ</Text>
        <Text style={styles.title}>{summary.title}</Text>
        <Text style={styles.subtitle}>{summary.subtitle}</Text>
        <Text style={styles.body}>{summary.focus}</Text>
      </InfoCard>

      <InfoCard>
        <Text style={styles.sectionTitle}>Prüfungstipps</Text>
        {summary.examTips.map((tip) => (
          <Text key={tip} style={styles.listItem}>
            • {tip}
          </Text>
        ))}
      </InfoCard>

      {tasks.map((task) => {
        const transcript = task.media?.[0]?.transcript;
        const selectedOptions = selectedByTask[task.id] ?? [];
        const feedback = feedbackByTask[task.id];

        return (
          <InfoCard key={task.id}>
            <View style={styles.taskHeader}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.badge}>{task.difficulty.toUpperCase()}</Text>
            </View>
            <Text style={styles.body}>{task.prompt}</Text>
            {transcript ? <Text style={styles.transcript}>{transcript}</Text> : null}
            {task.explanation ? <Text style={styles.hint}>{task.explanation}</Text> : null}

            {task.options?.length ? (
              <View style={styles.optionGroup}>
                {task.options.map((option) => {
                  const selected = selectedOptions.includes(option.id);
                  return (
                    <Pressable
                      key={option.id}
                      onPress={() => handleChoicePress(task, option.id)}
                      style={({ pressed }) => [
                        styles.optionButton,
                        selected && styles.optionButtonSelected,
                        pressed && styles.optionButtonPressed
                      ]}
                    >
                      <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
                        {option.label}
                      </Text>
                      <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                        {option.text}
                      </Text>
                    </Pressable>
                  );
                })}
                <PrimaryButton
                  label={summary.immediateFeedbackLabel}
                  onPress={() => handleCheckAnswer(task)}
                />
              </View>
            ) : (
              <View style={styles.textAnswerGroup}>
                <TextInput
                  multiline
                  onChangeText={(value) => setTextByTask((state) => ({ ...state, [task.id]: value }))}
                  placeholder="Hier üben oder Stichpunkte notieren"
                  style={styles.textInput}
                  value={textByTask[task.id] ?? ""}
                />
                <View style={styles.actionRow}>
                  <PrimaryButton
                    label="Gut geschafft"
                    onPress={() => handleSelfAssessment(task, "correct", "self-assessment")}
                  />
                  <PrimaryButton
                    label="Noch üben"
                    onPress={() => handleSelfAssessment(task, "incorrect", "self-assessment")}
                  />
                </View>
              </View>
            )}

            {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
          </InfoCard>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg
  },
  eyebrow: {
    ...typography.caption,
    color: colors.secondary,
    textTransform: "uppercase"
  },
  title: {
    ...typography.screenTitle,
    color: colors.textPrimary
  },
  subtitle: {
    ...typography.bodyStrong,
    color: colors.textSecondary
  },
  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.textPrimary
  },
  body: {
    ...typography.body,
    color: colors.textPrimary
  },
  listItem: {
    ...typography.body,
    color: colors.textSecondary
  },
  taskHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  taskTitle: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.md
  },
  badge: {
    ...typography.caption,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.sm,
    color: colors.primary,
    overflow: "hidden",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  transcript: {
    ...typography.body,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.sm,
    color: colors.textSecondary,
    padding: spacing.md
  },
  hint: {
    ...typography.caption,
    color: colors.textMuted
  },
  optionGroup: {
    gap: spacing.sm
  },
  optionButton: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md
  },
  optionButtonSelected: {
    backgroundColor: "#DBEAFE",
    borderColor: colors.primary
  },
  optionButtonPressed: {
    opacity: 0.84
  },
  optionLabel: {
    ...typography.caption,
    color: colors.textMuted
  },
  optionLabelSelected: {
    color: colors.primary
  },
  optionText: {
    ...typography.body,
    color: colors.textPrimary
  },
  optionTextSelected: {
    color: colors.primary
  },
  textAnswerGroup: {
    gap: spacing.md
  },
  textInput: {
    ...typography.body,
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.textPrimary,
    minHeight: 140,
    padding: spacing.md,
    textAlignVertical: "top"
  },
  actionRow: {
    gap: spacing.sm
  },
  feedback: {
    ...typography.bodyStrong,
    color: colors.secondary
  }
});
