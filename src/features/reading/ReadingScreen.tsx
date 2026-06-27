import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../../core/theme";
import {
  readingBuildingTask,
  readingDualQuestionTasks,
  readingGapTextTasks,
  readingMatchingTask,
  type ChoiceOption,
  type ReadingDualQuestionTask,
  type ReadingFeedback,
  type ReadingGapTextTask,
  type ReadingMatchingSituation
} from "../../data/content/readingContent";
import { InfoCard } from "../../ui/components/InfoCard";
import { Screen } from "../../ui/components/Screen";
import { useAppState } from "../app-state/AppStateProvider";

type BinaryAnswer = "richtig" | "falsch";

function FeedbackPanel({
  heading,
  accentColor = colors.reading,
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
            <Text style={[styles.choiceChipLabel, active && styles.choiceChipTextSelected]}>
              {option.label}
            </Text>
            <Text style={[styles.choiceChipText, active && styles.choiceChipTextSelected]}>
              {option.text}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function MatchingFeedback({
  selectedId,
  situation,
  optionTitleLookup
}: {
  selectedId: string | undefined;
  situation: ReadingMatchingSituation;
  optionTitleLookup: Record<string, string>;
}) {
  const isCorrect = selectedId === situation.correctId;

  if (isCorrect) {
    return (
      <FeedbackPanel
        heading="Richtig"
        accentColor={colors.success}
        lines={[situation.correctReason, `Lerntipp: ${situation.learningTip}`, situation.examFocus]}
      />
    );
  }

  const wrongReason = selectedId
    ? situation.incorrectReasonByOption[selectedId] ?? "Diese Zuordnung passt nicht genau zur Situation."
    : "Sie haben noch keine Auswahl getroffen. Lesen Sie zuerst, welche Person etwas sucht und welche Anzeige oder Etage genau dazu passt."

  return (
    <FeedbackPanel
      heading={`Richtige Lösung: ${optionTitleLookup[situation.correctId]}`}
      accentColor={colors.danger}
      lines={[situation.correctReason, `Warum Ihre Wahl nicht passt: ${wrongReason}`, situation.examFocus, `Lerntipp: ${situation.learningTip}`]}
    />
  );
}

function ReadingChoiceFeedback({
  selectedOptionId,
  correctOptionId,
  feedback
}: {
  selectedOptionId: string | undefined;
  correctOptionId: string;
  feedback: ReadingFeedback;
}) {
  const isCorrect = selectedOptionId === correctOptionId;

  if (isCorrect) {
    return (
      <FeedbackPanel
        heading="Richtig"
        accentColor={colors.success}
        lines={[feedback.correctReason, `Lerntipp: ${feedback.learningTip}`, feedback.examFocus]}
      />
    );
  }

  const wrongReason = selectedOptionId
    ? feedback.incorrectReasonByOption[selectedOptionId] ?? "Diese Antwort passt nicht genau zum Text."
    : "Sie haben noch keine Auswahl getroffen. In der Prüfung lohnt es sich trotzdem, die passende Textstelle zu markieren."

  return (
    <FeedbackPanel
      heading={`Richtige Lösung: ${correctOptionId.toUpperCase()}`}
      accentColor={colors.danger}
      lines={[feedback.correctReason, `Warum Ihre Wahl nicht passt: ${wrongReason}`, feedback.examFocus, `Lerntipp: ${feedback.learningTip}`]}
    />
  );
}

function DualQuestionCard({
  task,
  selectedBinary,
  selectedChoice,
  revealed,
  onSelectBinary,
  onSelectChoice,
  onSubmit
}: {
  task: ReadingDualQuestionTask;
  selectedBinary: BinaryAnswer | undefined;
  selectedChoice: string | undefined;
  revealed: boolean;
  onSelectBinary: (value: BinaryAnswer) => void;
  onSelectChoice: (optionId: string) => void;
  onSubmit: () => void;
}) {
  const statementCorrect =
    (task.statement.correctAnswer && selectedBinary === "richtig") ||
    (!task.statement.correctAnswer && selectedBinary === "falsch");

  return (
    <InfoCard>
      <Text style={styles.partLabel}>{task.format}</Text>
      <Text style={styles.sectionTitle}>{task.title}</Text>
      <Text style={styles.referenceTitle}>{task.sourceTitle}</Text>
      <Text style={styles.longText}>{task.text}</Text>

      <Text style={styles.subtaskTitle}>1. Aussage bewerten</Text>
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
                pressed && styles.choiceChipPressed
              ]}
            >
              <Text style={[styles.binaryText, active && styles.choiceChipTextSelected]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.subtaskTitle}>2. Passende Antwort waehlen</Text>
      <Text style={styles.question}>{task.question}</Text>
      <ChoiceChips options={task.options} selectedOptionId={selectedChoice} onSelect={onSelectChoice} />

      <Pressable onPress={onSubmit} style={({ pressed }) => [styles.primaryAction, pressed && styles.choiceChipPressed]}>
        <Text style={styles.primaryActionText}>Antwort prüfen</Text>
      </Pressable>

      {revealed ? (
        <View style={styles.feedbackStack}>
          {statementCorrect ? (
            <FeedbackPanel
              heading="Aussage richtig bewertet"
              accentColor={colors.success}
              lines={[
                task.statement.correctReason,
                "Lerntipp: Vergleichen Sie Aussagen immer direkt mit einer konkreten Textstelle."
              ]}
            />
          ) : (
            <FeedbackPanel
              heading={`Aussage: ${task.statement.correctAnswer ? "Richtig" : "Falsch"}`}
              accentColor={colors.danger}
              lines={[
                task.statement.correctReason,
                `Warum Ihre Wahl nicht passt: ${task.statement.incorrectReason}`,
                "Darauf sollten Sie in der DTZ-Pruefung achten: Aussagen werden oft durch kleine Woerter wie nur, nicht oder weiterhin entschieden."
              ]}
            />
          )}
          <ReadingChoiceFeedback selectedOptionId={selectedChoice} correctOptionId={task.correctOptionId} feedback={task.feedback} />
        </View>
      ) : null}
    </InfoCard>
  );
}

function GapTextCard({
  task,
  selections,
  revealed,
  onSelect,
  onSubmit
}: {
  task: ReadingGapTextTask;
  selections: Record<string, string> | undefined;
  revealed: boolean;
  onSelect: (gapId: string, optionId: string) => void;
  onSubmit: () => void;
}) {
  const selectedValues = selections ?? {};
  const correctCount = task.gaps.filter((gap) => selectedValues[gap.id] === gap.correctOptionId).length;

  return (
    <InfoCard>
      <Text style={styles.partLabel}>Lückentext</Text>
      <Text style={styles.sectionTitle}>{task.title}</Text>
      <Text style={styles.body}>{task.instruction}</Text>

      <View style={styles.gapTextCard}>
        {task.segments.map((segment, index) => {
          const gap = task.gaps[index];
          const selectedLabel = gap
            ? task.options.find((option) => option.id === selectedValues[gap.id])?.label
            : undefined;

          return (
            <View key={`${task.id}-segment-${index}`} style={styles.inlineTextBlock}>
              <Text style={styles.longTextInline}>{segment}</Text>
              {gap ? (
                <Text style={styles.gapMarker}>
                  ({gap.label}) {selectedLabel ?? "____"}
                </Text>
              ) : null}
            </View>
          );
        })}
      </View>

      {task.gaps.map((gap) => (
        <View key={gap.id} style={styles.gapSelectorCard}>
          <Text style={styles.question}>Lücke {gap.label}</Text>
          <ChoiceChips
            options={task.options}
            selectedOptionId={selectedValues[gap.id]}
            onSelect={(optionId) => onSelect(gap.id, optionId)}
          />
        </View>
      ))}

      <Pressable onPress={onSubmit} style={({ pressed }) => [styles.primaryAction, pressed && styles.choiceChipPressed]}>
        <Text style={styles.primaryActionText}>Antwort prüfen</Text>
      </Pressable>

      {revealed ? (
        <View style={styles.feedbackStack}>
          <FeedbackPanel
            heading={correctCount === task.gaps.length ? "Richtig" : `Lösung: ${correctCount} von ${task.gaps.length} Lücken korrekt`}
            accentColor={correctCount === task.gaps.length ? colors.success : colors.danger}
            lines={[
              `Lerntipp: ${task.learningTip}`,
              task.examFocus
            ]}
          />
          {task.gaps.map((gap) => {
            const selectedOptionId = selectedValues[gap.id];
            const selectedLabel = selectedOptionId
              ? task.options.find((option) => option.id === selectedOptionId)?.label ?? "-"
              : "-";
            const correctLabel = task.options.find((option) => option.id === gap.correctOptionId)?.label ?? "-";
            const gapCorrect = selectedOptionId === gap.correctOptionId;

            return (
              <FeedbackPanel
                key={`${task.id}-${gap.id}`}
                heading={`Lücke ${gap.label}: ${gapCorrect ? "Richtig" : `Richtige Lösung ${correctLabel}`}`}
                accentColor={gapCorrect ? colors.success : colors.danger}
                lines={[
                  `Ihre Antwort: ${selectedLabel}`,
                  `Begründung: ${gap.clue}`,
                  `Warum andere Antworten nicht passen: ${gap.wrongChoiceGuidance}`
                ]}
              />
            );
          })}
        </View>
      ) : null}
    </InfoCard>
  );
}

export function ReadingScreen() {
  const { submitAnswer } = useAppState();
  const [selectedAds, setSelectedAds] = useState<Record<string, string>>({});
  const [selectedFloors, setSelectedFloors] = useState<Record<string, string>>({});
  const [selectedBinary, setSelectedBinary] = useState<Record<string, BinaryAnswer>>({});
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});
  const [selectedGaps, setSelectedGaps] = useState<Record<string, Record<string, string>>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const adLookup = Object.fromEntries(readingMatchingTask.ads.map((ad) => [ad.id, ad.title]));
  const floorLookup = Object.fromEntries(readingBuildingTask.levels.map((level) => [level.id, level.name]));

  return (
    <Screen contentContainerStyle={styles.container}>
      <InfoCard>
        <Text style={styles.eyebrow}>DTZ</Text>
        <Text style={styles.title}>Lesen</Text>
        <Text style={styles.body}>
          Sie trainieren Anzeigen, Gebaeudeplaene, laengere Alltagstexte und zwei Lueckentexte auf B1-Niveau.
        </Text>
      </InfoCard>

      <InfoCard>
        <Text style={styles.sectionTitle}>{readingMatchingTask.title}</Text>
        <Text style={styles.body}>{readingMatchingTask.instruction}</Text>
        <View style={styles.grid}>
          {readingMatchingTask.ads.map((ad) => (
            <View key={ad.id} style={styles.referenceCard}>
              <Text style={styles.referenceTitle}>{ad.title}</Text>
              <Text style={styles.referenceText}>{ad.body}</Text>
              <Text style={styles.referenceMeta}>{ad.contact}</Text>
            </View>
          ))}
        </View>

        {readingMatchingTask.situations.map((situation) => (
          <View key={situation.id} style={styles.matchCard}>
            <Text style={styles.question}>{situation.text}</Text>
            <View style={styles.choiceWrapCompact}>
              {readingMatchingTask.ads.map((ad) => {
                const active = selectedAds[situation.id] === ad.id;
                return (
                  <Pressable
                    key={ad.id}
                    onPress={() => setSelectedAds((current) => ({ ...current, [situation.id]: ad.id }))}
                    style={({ pressed }) => [
                      styles.choiceCompact,
                      active && styles.choiceCompactSelected,
                      pressed && styles.choiceChipPressed
                    ]}
                  >
                    <Text style={[styles.choiceCompactText, active && styles.choiceChipTextSelected]}>{ad.title}</Text>
                  </Pressable>
                );
              })}
            </View>
            <Pressable
              onPress={() => {
                const score = selectedAds[situation.id] === situation.correctId ? 1 : 0;
                setRevealed((current) => ({ ...current, [situation.id]: true }));
                submitAnswer({
                  taskId: situation.id,
                  skill: "reading",
                  mode: "learning",
                  result: score === 1 ? "correct" : "incorrect",
                  score,
                  maxScore: 1,
                  reason: "wrong-option",
                  selectedOptionIds: selectedAds[situation.id] ? [selectedAds[situation.id] as string] : []
                });
              }}
              style={({ pressed }) => [styles.primaryAction, pressed && styles.choiceChipPressed]}
            >
              <Text style={styles.primaryActionText}>Antwort prüfen</Text>
            </Pressable>
            {revealed[situation.id] ? (
              <MatchingFeedback selectedId={selectedAds[situation.id]} situation={situation} optionTitleLookup={adLookup} />
            ) : null}
          </View>
        ))}
      </InfoCard>

      <InfoCard>
        <Text style={styles.sectionTitle}>{readingBuildingTask.title}</Text>
        <Text style={styles.body}>
          {readingBuildingTask.buildingName}: {readingBuildingTask.instruction}
        </Text>
        <View style={styles.grid}>
          {readingBuildingTask.levels.map((level) => (
            <View key={level.id} style={styles.referenceCard}>
              <Text style={styles.referenceTitle}>{level.name}</Text>
              {level.places.map((place) => (
                <Text key={place} style={styles.referenceText}>
                  • {place}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {readingBuildingTask.situations.map((situation) => (
          <View key={situation.id} style={styles.matchCard}>
            <Text style={styles.question}>{situation.text}</Text>
            <View style={styles.choiceWrapCompact}>
              {readingBuildingTask.levels.map((level) => {
                const active = selectedFloors[situation.id] === level.id;
                return (
                  <Pressable
                    key={level.id}
                    onPress={() => setSelectedFloors((current) => ({ ...current, [situation.id]: level.id }))}
                    style={({ pressed }) => [
                      styles.choiceCompact,
                      active && styles.choiceCompactSelected,
                      pressed && styles.choiceChipPressed
                    ]}
                  >
                    <Text style={[styles.choiceCompactText, active && styles.choiceChipTextSelected]}>{level.name}</Text>
                  </Pressable>
                );
              })}
            </View>
            <Pressable
              onPress={() => {
                const score = selectedFloors[situation.id] === situation.correctId ? 1 : 0;
                setRevealed((current) => ({ ...current, [situation.id]: true }));
                submitAnswer({
                  taskId: situation.id,
                  skill: "reading",
                  mode: "learning",
                  result: score === 1 ? "correct" : "incorrect",
                  score,
                  maxScore: 1,
                  reason: "missed-detail",
                  selectedOptionIds: selectedFloors[situation.id] ? [selectedFloors[situation.id] as string] : []
                });
              }}
              style={({ pressed }) => [styles.primaryAction, pressed && styles.choiceChipPressed]}
            >
              <Text style={styles.primaryActionText}>Antwort prüfen</Text>
            </Pressable>
            {revealed[situation.id] ? (
              <MatchingFeedback selectedId={selectedFloors[situation.id]} situation={situation} optionTitleLookup={floorLookup} />
            ) : null}
          </View>
        ))}
      </InfoCard>

      {readingDualQuestionTasks.map((task) => (
        <DualQuestionCard
          key={task.id}
          task={task}
          selectedBinary={selectedBinary[task.id]}
          selectedChoice={selectedChoices[task.id]}
          revealed={Boolean(revealed[task.id])}
          onSelectBinary={(value) => setSelectedBinary((current) => ({ ...current, [task.id]: value }))}
          onSelectChoice={(optionId) => setSelectedChoices((current) => ({ ...current, [task.id]: optionId }))}
          onSubmit={() => {
            const statementCorrect =
              (task.statement.correctAnswer && selectedBinary[task.id] === "richtig") ||
              (!task.statement.correctAnswer && selectedBinary[task.id] === "falsch");
            const choiceCorrect = selectedChoices[task.id] === task.correctOptionId;
            const score = Number(statementCorrect) + Number(choiceCorrect);

            setRevealed((current) => ({ ...current, [task.id]: true }));
            submitAnswer({
              taskId: task.id,
              skill: "reading",
              mode: "learning",
              result: score === 2 ? "correct" : score === 1 ? "partial" : "incorrect",
              selectedOptionIds: [selectedBinary[task.id], selectedChoices[task.id]].filter(
                (value): value is string => Boolean(value)
              ),
              score,
              maxScore: 2,
              reason: score === 0 ? "missed-detail" : "wrong-option"
            });
          }}
        />
      ))}

      {readingGapTextTasks.map((task) => (
        <GapTextCard
          key={task.id}
          task={task}
          selections={selectedGaps[task.id]}
          revealed={Boolean(revealed[task.id])}
          onSelect={(gapId, optionId) =>
            setSelectedGaps((current) => ({
              ...current,
              [task.id]: {
                ...current[task.id],
                [gapId]: optionId
              }
            }))
          }
          onSubmit={() => {
            const selections = selectedGaps[task.id] ?? {};
            const score = task.gaps.filter((gap) => selections[gap.id] === gap.correctOptionId).length;

            setRevealed((current) => ({ ...current, [task.id]: true }));
            submitAnswer({
              taskId: task.id,
              skill: "reading",
              mode: "learning",
              result: score === task.gaps.length ? "correct" : score > 0 ? "partial" : "incorrect",
              selectedOptionIds: Object.values(selections),
              score,
              maxScore: task.gaps.length,
              reason: "missed-detail"
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
  sectionTitle: { ...typography.sectionTitle, color: colors.textPrimary },
  partLabel: { ...typography.caption, color: colors.reading, textTransform: "uppercase" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
  referenceCard: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexBasis: "47%",
    flexGrow: 1,
    gap: spacing.xs,
    padding: spacing.md
  },
  referenceTitle: { ...typography.bodyStrong, color: colors.textPrimary },
  referenceText: { ...typography.caption, color: colors.textSecondary },
  referenceMeta: { ...typography.caption, color: colors.reading },
  matchCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.sm,
    padding: spacing.md
  },
  question: { ...typography.bodyStrong, color: colors.textPrimary },
  subtaskTitle: { ...typography.bodyStrong, color: colors.textPrimary },
  choiceWrap: { gap: spacing.sm },
  choiceWrapCompact: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  choiceChip: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md
  },
  choiceChipSelected: {
    backgroundColor: "#DCFCE7",
    borderColor: colors.reading
  },
  choiceChipPressed: { opacity: 0.84 },
  choiceChipLabel: { ...typography.caption, color: colors.textMuted },
  choiceChipText: { ...typography.body, color: colors.textPrimary },
  choiceChipTextSelected: { color: colors.reading },
  choiceCompact: {
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  choiceCompactSelected: {
    backgroundColor: "#DCFCE7",
    borderColor: colors.reading
  },
  choiceCompactText: { ...typography.caption, color: colors.textPrimary },
  binaryRow: { flexDirection: "row", gap: spacing.sm },
  binaryButton: {
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  binaryButtonSelected: {
    backgroundColor: "#DCFCE7",
    borderColor: colors.reading
  },
  binaryText: { ...typography.caption, color: colors.textPrimary },
  primaryAction: {
    alignItems: "center",
    backgroundColor: colors.reading,
    borderRadius: radius.md,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: spacing.lg
  },
  primaryActionText: { ...typography.bodyStrong, color: colors.surface },
  longText: {
    ...typography.body,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    color: colors.textPrimary,
    padding: spacing.md
  },
  feedbackStack: { gap: spacing.sm },
  feedbackCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.xs,
    padding: spacing.md
  },
  feedbackTitle: { ...typography.bodyStrong },
  feedbackBody: { ...typography.body, color: colors.textPrimary },
  gapTextCard: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.md
  },
  inlineTextBlock: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs
  },
  longTextInline: {
    ...typography.body,
    color: colors.textPrimary
  },
  gapMarker: {
    ...typography.bodyStrong,
    color: colors.reading
  },
  gapSelectorCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.sm,
    padding: spacing.md
  }
});
