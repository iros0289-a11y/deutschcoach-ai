import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../../core/theme";
import {
  listeningPartOneTasks,
  listeningPartThreeTasks,
  listeningPartTwoSet,
  type ChoiceOption,
  type ListeningFeedback,
  type ListeningPartOneTask,
  type ListeningPartThreeTask,
  type ListeningPartTwoTask
} from "../../data/content/listeningContent";
import { InfoCard } from "../../ui/components/InfoCard";
import { Screen } from "../../ui/components/Screen";
import { SimpleAudioPlayer } from "../../ui/components/SimpleAudioPlayer";
import { useAppState } from "../app-state/AppStateProvider";

type BinaryAnswer = "richtig" | "falsch";

function getResultFromScore(score: number, maxScore: number) {
  if (score === maxScore) {
    return "correct" as const;
  }

  if (score > 0) {
    return "partial" as const;
  }

  return "incorrect" as const;
}

function FeedbackPanel({
  heading,
  accentColor = colors.secondary,
  lines
}: {
  heading: string;
  accentColor?: string;
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
    <View style={styles.optionGroup}>
      {options.map((option) => {
        const active = selectedOptionId === option.id;
        return (
          <Pressable
            key={option.id}
            onPress={() => onSelect(option.id)}
            style={({ pressed }) => [
              styles.optionButton,
              active && styles.optionButtonSelected,
              pressed && styles.optionButtonPressed
            ]}
          >
            <Text style={[styles.optionLabel, active && styles.optionLabelSelected]}>{option.label}</Text>
            <Text style={[styles.optionText, active && styles.optionTextSelected]}>{option.text}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function ListeningChoiceFeedback({
  selectedOptionId,
  correctOptionId,
  feedback
}: {
  selectedOptionId: string | undefined;
  correctOptionId: string;
  feedback: ListeningFeedback;
}) {
  const isCorrect = selectedOptionId === correctOptionId;

  if (isCorrect) {
    return (
      <FeedbackPanel
        heading={feedback.correctTitle}
        accentColor={colors.success}
        lines={[feedback.correctReason, `Lerntipp: ${feedback.learningTip}`, feedback.examFocus]}
      />
    );
  }

  const chosenReason = selectedOptionId
    ? feedback.incorrectReasonByOption[selectedOptionId] ?? "Diese Antwort passt nicht genau zur Aussage im Hörtext."
    : "Sie haben noch keine Antwort ausgewählt. In der Prüfung lohnt es sich, trotzdem die Schlüsselinformationen zu markieren."

  return (
    <FeedbackPanel
      heading={`Richtige Lösung: ${correctOptionId.toUpperCase()}`}
      accentColor={colors.danger}
      lines={[feedback.correctReason, `Warum Ihre Wahl nicht passt: ${chosenReason}`, feedback.examFocus, `Lerntipp: ${feedback.learningTip}`]}
    />
  );
}

function PartOneTaskCard({
  task,
  selectedChoice,
  selectedBinary,
  revealed,
  onSelectChoice,
  onSelectBinary,
  onSubmit
}: {
  task: ListeningPartOneTask;
  selectedChoice: string | undefined;
  selectedBinary: BinaryAnswer | undefined;
  revealed: boolean;
  onSelectChoice: (optionId: string) => void;
  onSelectBinary: (value: BinaryAnswer) => void;
  onSubmit: () => void;
}) {
  const statementCorrect =
    (task.statement.correctAnswer && selectedBinary === "richtig") ||
    (!task.statement.correctAnswer && selectedBinary === "falsch");

  return (
    <InfoCard>
      <Text style={styles.partLabel}>
        {task.part} • {task.topic}
      </Text>
      <Text style={styles.cardTitle}>{task.title}</Text>
      <SimpleAudioPlayer
        durationLabel={task.durationLabel}
        text={task.transcript}
        title="Hörtext abspielen"
        playbackMode="dialogue"
      />

      <Text style={styles.subtaskTitle}>1. Frage beantworten</Text>
      <Text style={styles.question}>{task.question}</Text>
      <ChoiceChips options={task.options} selectedOptionId={selectedChoice} onSelect={onSelectChoice} />

      <Text style={styles.subtaskTitle}>2. Aussage bewerten</Text>
      <Text style={styles.question}>{task.statement.text}</Text>
      <View style={styles.binaryRow}>
        {[
          { label: "Richtig", value: "richtig" as const },
          { label: "Falsch", value: "falsch" as const }
        ].map((item) => {
          const active = selectedBinary === item.value;
          return (
            <Pressable
              key={item.value}
              onPress={() => onSelectBinary(item.value)}
              style={({ pressed }) => [
                styles.binaryButton,
                active && styles.binaryButtonSelected,
                pressed && styles.optionButtonPressed
              ]}
            >
              <Text style={[styles.binaryText, active && styles.optionLabelSelected]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable onPress={onSubmit} style={({ pressed }) => [styles.primaryAction, pressed && styles.primaryActionPressed]}>
        <Text style={styles.primaryActionText}>Antwort prüfen</Text>
      </Pressable>

      {revealed ? (
        <View style={styles.feedbackStack}>
          <ListeningChoiceFeedback selectedOptionId={selectedChoice} correctOptionId={task.correctOptionId} feedback={task.feedback} />
          {statementCorrect ? (
            <FeedbackPanel
              heading="Aussage richtig bewertet"
              accentColor={colors.success}
              lines={[
                task.statement.correctReason,
                `Lerntipp: ${task.statement.learningTip}`,
                task.statement.examFocus
              ]}
            />
          ) : (
            <FeedbackPanel
              heading={`Aussage: ${task.statement.correctAnswer ? "Richtig" : "Falsch"}`}
              accentColor={colors.danger}
              lines={[
                task.statement.correctReason,
                `Warum Ihre Wahl nicht passt: ${task.statement.incorrectReason}`,
                task.statement.examFocus,
                `Lerntipp: ${task.statement.learningTip}`
              ]}
            />
          )}
        </View>
      ) : null}
    </InfoCard>
  );
}

function PartTwoTaskCard({
  task,
  selectedOptionId,
  revealed,
  onSelect,
  onSubmit
}: {
  task: ListeningPartTwoTask;
  selectedOptionId: string | undefined;
  revealed: boolean;
  onSelect: (optionId: string) => void;
  onSubmit: () => void;
}) {
  const isCorrect = selectedOptionId === task.correctOptionId;
  const incorrectReason = selectedOptionId
    ? task.incorrectReasonByOption[selectedOptionId] ?? "Diese Aussage passt inhaltlich nicht genau."
    : "Sie haben noch nichts ausgewählt. Achten Sie bei solchen Aufgaben zuerst auf Thema, Zielgruppe und Uhrzeit."

  return (
    <InfoCard>
      <Text style={styles.partLabel}>
        {listeningPartTwoSet.part} • {task.personLabel}
      </Text>
      <Text style={styles.cardTitle}>{task.prompt}</Text>
      <SimpleAudioPlayer
        durationLabel={task.durationLabel}
        text={task.transcript}
        title="Aussage abspielen"
        playbackMode="narration"
      />
      <ChoiceChips options={listeningPartTwoSet.options} selectedOptionId={selectedOptionId} onSelect={onSelect} />
      <Pressable onPress={onSubmit} style={({ pressed }) => [styles.primaryAction, pressed && styles.primaryActionPressed]}>
        <Text style={styles.primaryActionText}>Antwort prüfen</Text>
      </Pressable>

      {revealed ? (
        isCorrect ? (
          <FeedbackPanel
            heading="Richtig"
            accentColor={colors.success}
            lines={[task.correctReason, `Lerntipp: ${task.learningTip}`, task.examFocus]}
          />
        ) : (
          <FeedbackPanel
            heading={`Richtige Lösung: ${task.correctOptionId.toUpperCase()}`}
            accentColor={colors.danger}
            lines={[task.correctReason, `Warum Ihre Wahl nicht passt: ${incorrectReason}`, task.examFocus, `Lerntipp: ${task.learningTip}`]}
          />
        )
      ) : null}
    </InfoCard>
  );
}

function PartThreeTaskCard({
  task,
  selectedOptionId,
  revealed,
  onSelect,
  onSubmit
}: {
  task: ListeningPartThreeTask;
  selectedOptionId: string | undefined;
  revealed: boolean;
  onSelect: (optionId: string) => void;
  onSubmit: () => void;
}) {
  return (
    <InfoCard>
      <Text style={styles.partLabel}>
        {task.part} • {task.topic}
      </Text>
      <Text style={styles.cardTitle}>{task.title}</Text>
      <SimpleAudioPlayer
        durationLabel={task.durationLabel}
        text={task.transcript}
        title="Ansage abspielen"
        playbackMode="announcement"
      />
      <Text style={styles.question}>{task.question}</Text>
      <ChoiceChips options={task.options} selectedOptionId={selectedOptionId} onSelect={onSelect} />
      <Pressable onPress={onSubmit} style={({ pressed }) => [styles.primaryAction, pressed && styles.primaryActionPressed]}>
        <Text style={styles.primaryActionText}>Antwort prüfen</Text>
      </Pressable>

      {revealed ? (
        <ListeningChoiceFeedback selectedOptionId={selectedOptionId} correctOptionId={task.correctOptionId} feedback={task.feedback} />
      ) : null}
    </InfoCard>
  );
}

export function ListeningScreen() {
  const { submitAnswer } = useAppState();
  const [partOneChoices, setPartOneChoices] = useState<Record<string, string>>({});
  const [partOneStatements, setPartOneStatements] = useState<Record<string, BinaryAnswer>>({});
  const [partOneRevealed, setPartOneRevealed] = useState<Record<string, boolean>>({});
  const [partTwoAnswers, setPartTwoAnswers] = useState<Record<string, string>>({});
  const [partTwoRevealed, setPartTwoRevealed] = useState<Record<string, boolean>>({});
  const [partThreeAnswers, setPartThreeAnswers] = useState<Record<string, string>>({});
  const [partThreeRevealed, setPartThreeRevealed] = useState<Record<string, boolean>>({});

  const totals = useMemo(
    () => ({
      partOne: listeningPartOneTasks.length,
      partTwo: listeningPartTwoSet.tasks.length,
      partThree: listeningPartThreeTasks.length
    }),
    []
  );

  return (
    <Screen contentContainerStyle={styles.container}>
      <InfoCard>
        <Text style={styles.eyebrow}>DTZ</Text>
        <Text style={styles.title}>Hören</Text>
        <Text style={styles.body}>
          Sie trainieren jetzt drei realistische DTZ-Hörteile: Dialoge mit zwei Teilaufgaben, Zuordnungen A bis F und kurze Ansagen mit Multiple Choice.
        </Text>
        <Text style={styles.summary}>
          Umfang: {totals.partOne} Aufgaben in Teil 1, {totals.partTwo} Aufgaben in Teil 2, {totals.partThree} Aufgaben in Teil 3.
        </Text>
      </InfoCard>

      <InfoCard>
        <Text style={styles.sectionHeading}>Teil 1</Text>
        <Text style={styles.body}>
          Zu jeder Hörprobe beantworten Sie zuerst eine Frage mit A, B oder C. Danach entscheiden Sie bei einer Aussage: richtig oder falsch.
        </Text>
      </InfoCard>

      {listeningPartOneTasks.map((task) => (
        <PartOneTaskCard
          key={task.id}
          task={task}
          selectedChoice={partOneChoices[task.id]}
          selectedBinary={partOneStatements[task.id]}
          revealed={Boolean(partOneRevealed[task.id])}
          onSelectChoice={(optionId) =>
            setPartOneChoices((current) => ({
              ...current,
              [task.id]: optionId
            }))
          }
          onSelectBinary={(value) =>
            setPartOneStatements((current) => ({
              ...current,
              [task.id]: value
            }))
          }
          onSubmit={() => {
            const choiceCorrect = partOneChoices[task.id] === task.correctOptionId;
            const statementCorrect =
              (task.statement.correctAnswer && partOneStatements[task.id] === "richtig") ||
              (!task.statement.correctAnswer && partOneStatements[task.id] === "falsch");
            const score = Number(choiceCorrect) + Number(statementCorrect);

            setPartOneRevealed((current) => ({ ...current, [task.id]: true }));
            submitAnswer({
              taskId: task.id,
              skill: "listening",
              mode: "learning",
              result: getResultFromScore(score, 2),
              selectedOptionIds: [partOneChoices[task.id], partOneStatements[task.id]].filter(
                (value): value is string => Boolean(value)
              ),
              score,
              maxScore: 2,
              reason: score === 0 ? "missed-detail" : "wrong-option"
            });
          }}
        />
      ))}

      <InfoCard>
        <Text style={styles.sectionHeading}>Teil 2</Text>
        <Text style={styles.body}>{listeningPartTwoSet.instruction}</Text>
        <View style={styles.optionGroup}>
          {listeningPartTwoSet.options.map((option) => (
            <View key={option.id} style={styles.referenceCard}>
              <Text style={styles.referenceLabel}>{option.label}</Text>
              <Text style={styles.referenceText}>{option.text}</Text>
            </View>
          ))}
        </View>
      </InfoCard>

      {listeningPartTwoSet.tasks.map((task) => (
        <PartTwoTaskCard
          key={task.id}
          task={task}
          selectedOptionId={partTwoAnswers[task.id]}
          revealed={Boolean(partTwoRevealed[task.id])}
          onSelect={(optionId) =>
            setPartTwoAnswers((current) => ({
              ...current,
              [task.id]: optionId
            }))
          }
          onSubmit={() => {
            const score = partTwoAnswers[task.id] === task.correctOptionId ? 1 : 0;
            setPartTwoRevealed((current) => ({ ...current, [task.id]: true }));
            submitAnswer({
              taskId: task.id,
              skill: "listening",
              mode: "learning",
              result: score === 1 ? "correct" : "incorrect",
              selectedOptionIds: partTwoAnswers[task.id]
                ? [partTwoAnswers[task.id] as string]
                : [],
              score,
              maxScore: 1,
              reason: "wrong-option"
            });
          }}
        />
      ))}

      <InfoCard>
        <Text style={styles.sectionHeading}>Teil 3</Text>
        <Text style={styles.body}>
          Sie hören kurze Ansagen aus dem Alltag. Wählen Sie jeweils die passende Antwort A, B oder C.
        </Text>
      </InfoCard>

      {listeningPartThreeTasks.map((task) => (
        <PartThreeTaskCard
          key={task.id}
          task={task}
          selectedOptionId={partThreeAnswers[task.id]}
          revealed={Boolean(partThreeRevealed[task.id])}
          onSelect={(optionId) =>
            setPartThreeAnswers((current) => ({
              ...current,
              [task.id]: optionId
            }))
          }
          onSubmit={() => {
            const score = partThreeAnswers[task.id] === task.correctOptionId ? 1 : 0;
            setPartThreeRevealed((current) => ({ ...current, [task.id]: true }));
            submitAnswer({
              taskId: task.id,
              skill: "listening",
              mode: "learning",
              result: score === 1 ? "correct" : "incorrect",
              selectedOptionIds: partThreeAnswers[task.id]
                ? [partThreeAnswers[task.id] as string]
                : [],
              score,
              maxScore: 1,
              reason: "wrong-option"
            });
          }}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.lg },
  eyebrow: { ...typography.caption, color: colors.secondary, textTransform: "uppercase" },
  title: { ...typography.screenTitle, color: colors.textPrimary },
  body: { ...typography.body, color: colors.textSecondary },
  summary: { ...typography.bodyStrong, color: colors.primary },
  sectionHeading: { ...typography.sectionTitle, color: colors.textPrimary },
  partLabel: { ...typography.caption, color: colors.listening, textTransform: "uppercase" },
  cardTitle: { ...typography.sectionTitle, color: colors.textPrimary },
  subtaskTitle: { ...typography.bodyStrong, color: colors.textPrimary },
  question: { ...typography.bodyStrong, color: colors.textPrimary },
  optionGroup: { gap: spacing.sm },
  optionButton: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md
  },
  optionButtonSelected: {
    backgroundColor: "#E0F2FE",
    borderColor: colors.listening
  },
  optionButtonPressed: { opacity: 0.82 },
  optionLabel: { ...typography.caption, color: colors.textMuted },
  optionLabelSelected: { color: colors.listening },
  optionText: { ...typography.body, color: colors.textPrimary },
  optionTextSelected: { color: colors.textPrimary },
  binaryRow: { flexDirection: "row", gap: spacing.sm },
  binaryButton: {
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  binaryButtonSelected: {
    backgroundColor: "#E0F2FE",
    borderColor: colors.listening
  },
  binaryText: { ...typography.caption, color: colors.textPrimary },
  primaryAction: {
    alignItems: "center",
    backgroundColor: colors.listening,
    borderRadius: radius.md,
    justifyContent: "center",
    minHeight: 50,
    paddingHorizontal: spacing.lg
  },
  primaryActionPressed: { opacity: 0.9 },
  primaryActionText: { ...typography.bodyStrong, color: colors.surface },
  feedbackStack: { gap: spacing.sm },
  feedbackCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.xs,
    padding: spacing.md
  },
  feedbackTitle: { ...typography.bodyStrong },
  feedbackBody: { ...typography.body, color: colors.textPrimary },
  referenceCard: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md
  },
  referenceLabel: { ...typography.caption, color: colors.listening },
  referenceText: { ...typography.body, color: colors.textPrimary }
});
