import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../../core/theme";
import {
  listeningChoiceTasks,
  listeningTrueFalseTasks
} from "../../data/content/phaseOneExamContent";
import { InfoCard } from "../../ui/components/InfoCard";
import { Screen } from "../../ui/components/Screen";
import { SimpleAudioPlayer } from "../../ui/components/SimpleAudioPlayer";
import { useAppState } from "../app-state/AppStateProvider";

export function ListeningScreen() {
  const { submitAnswer } = useAppState();
  const [selectedChoice, setSelectedChoice] = useState<Record<string, string>>({});
  const [revealedChoice, setRevealedChoice] = useState<Record<string, boolean>>({});
  const [selectedStatements, setSelectedStatements] = useState<Record<string, Record<string, boolean>>>({});
  const [revealedStatements, setRevealedStatements] = useState<Record<string, boolean>>({});

  return (
    <Screen contentContainerStyle={styles.container}>
      <InfoCard>
        <Text style={styles.eyebrow}>DTZ</Text>
        <Text style={styles.title}>Hören</Text>
        <Text style={styles.body}>
          Hier trainieren Sie beide offiziellen Aufgabentypen: Fragen mit A/B/C und Aussagen mit richtig oder falsch.
        </Text>
      </InfoCard>

      {listeningChoiceTasks.map((task) => {
        const selected = selectedChoice[task.id];
        const revealed = revealedChoice[task.id];
        const isCorrect = selected === task.correctOptionId;

        return (
          <InfoCard key={task.id}>
            <Text style={styles.partLabel}>
              {task.part} • {task.topic}
            </Text>
            <Text style={styles.cardTitle}>{task.title}</Text>
            <SimpleAudioPlayer
              durationLabel={task.durationLabel}
              text={task.transcript}
              title="Hörtext abspielen"
            />
            <Text style={styles.question}>{task.question}</Text>
            <View style={styles.optionGroup}>
              {task.options.map((option) => {
                const active = selected === option.id;
                return (
                  <Pressable
                    key={option.id}
                    onPress={() => setSelectedChoice((current) => ({ ...current, [task.id]: option.id }))}
                    style={({ pressed }) => [
                      styles.optionButton,
                      active && styles.optionButtonSelected,
                      pressed && styles.optionButtonPressed
                    ]}
                  >
                    <Text style={[styles.optionLabel, active && styles.optionLabelSelected]}>
                      {option.label}
                    </Text>
                    <Text style={[styles.optionText, active && styles.optionTextSelected]}>
                      {option.text}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <Pressable
              onPress={() => {
                setRevealedChoice((current) => ({ ...current, [task.id]: true }));
                submitAnswer({
                  taskId: task.id,
                  skill: "listening",
                  mode: "learning",
                  result: isCorrect ? "correct" : "incorrect",
                  selectedOptionIds: selected ? [selected] : [],
                  score: isCorrect ? 1 : 0,
                  maxScore: 1,
                  reason: "wrong-option"
                });
              }}
              style={({ pressed }) => [styles.primaryAction, pressed && styles.primaryActionPressed]}
            >
              <Text style={styles.primaryActionText}>Lösung prüfen</Text>
            </Pressable>
            {revealed ? (
              <View style={styles.feedbackCard}>
                <Text style={styles.feedbackTitle}>{task.solution}</Text>
                <Text style={styles.feedbackBody}>{task.explanation}</Text>
              </View>
            ) : null}
          </InfoCard>
        );
      })}

      {listeningTrueFalseTasks.map((task) => {
        const selection = selectedStatements[task.id] ?? {};
        const revealed = revealedStatements[task.id];

        return (
          <InfoCard key={task.id}>
            <Text style={styles.partLabel}>
              {task.part} • {task.topic}
            </Text>
            <Text style={styles.cardTitle}>{task.title}</Text>
            <SimpleAudioPlayer
              durationLabel={task.durationLabel}
              text={task.transcript}
              title="Hörtext abspielen"
            />
            <Text style={styles.question}>{task.instruction}</Text>
            <View style={styles.statementList}>
              {task.statements.map((statement) => {
                const selectedValue = selection[statement.id];
                return (
                  <View key={statement.id} style={styles.statementCard}>
                    <Text style={styles.statementText}>{statement.text}</Text>
                    <View style={styles.binaryRow}>
                      {[
                        { label: "Richtig", value: true },
                        { label: "Falsch", value: false }
                      ].map((item) => {
                        const active = selectedValue === item.value;
                        return (
                          <Pressable
                            key={item.label}
                            onPress={() =>
                              setSelectedStatements((current) => ({
                                ...current,
                                [task.id]: { ...current[task.id], [statement.id]: item.value }
                              }))
                            }
                            style={({ pressed }) => [
                              styles.binaryButton,
                              active && styles.binaryButtonSelected,
                              pressed && styles.optionButtonPressed
                            ]}
                          >
                            <Text style={[styles.binaryText, active && styles.optionLabelSelected]}>
                              {item.label}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                    {revealed ? (
                      <Text style={styles.statementExplanation}>
                        {statement.isTrue ? "Richtig" : "Falsch"}: {statement.explanation}
                      </Text>
                    ) : null}
                  </View>
                );
              })}
            </View>
            <Pressable
              onPress={() => {
                const allCorrect = task.statements.every(
                  (statement) => selection[statement.id] === statement.isTrue
                );
                setRevealedStatements((current) => ({ ...current, [task.id]: true }));
                submitAnswer({
                  taskId: task.id,
                  skill: "listening",
                  mode: "learning",
                  result: allCorrect ? "correct" : "incorrect",
                  score: allCorrect ? task.statements.length : 0,
                  maxScore: task.statements.length,
                  reason: "missed-detail"
                });
              }}
              style={({ pressed }) => [styles.primaryAction, pressed && styles.primaryActionPressed]}
            >
              <Text style={styles.primaryActionText}>Antworten auswerten</Text>
            </Pressable>
          </InfoCard>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.lg },
  eyebrow: { ...typography.caption, color: colors.secondary, textTransform: "uppercase" },
  title: { ...typography.screenTitle, color: colors.textPrimary },
  body: { ...typography.body, color: colors.textSecondary },
  partLabel: { ...typography.caption, color: colors.primary, textTransform: "uppercase" },
  cardTitle: { ...typography.sectionTitle, color: colors.textPrimary },
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
  optionButtonSelected: { backgroundColor: "#DBEAFE", borderColor: colors.primary },
  optionButtonPressed: { opacity: 0.82 },
  optionLabel: { ...typography.caption, color: colors.textMuted },
  optionLabelSelected: { color: colors.primary },
  optionText: { ...typography.body, color: colors.textPrimary },
  optionTextSelected: { color: colors.primary },
  primaryAction: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    minHeight: 50,
    justifyContent: "center",
    paddingHorizontal: spacing.lg
  },
  primaryActionPressed: { backgroundColor: colors.primaryPressed },
  primaryActionText: { ...typography.bodyStrong, color: colors.surface },
  feedbackCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.sm,
    padding: spacing.md
  },
  feedbackTitle: { ...typography.bodyStrong, color: colors.secondary },
  feedbackBody: { ...typography.body, color: colors.textPrimary },
  statementList: { gap: spacing.md },
  statementCard: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.md
  },
  statementText: { ...typography.body, color: colors.textPrimary },
  binaryRow: { flexDirection: "row", gap: spacing.sm },
  binaryButton: {
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  binaryButtonSelected: { borderColor: colors.primary, backgroundColor: "#DBEAFE" },
  binaryText: { ...typography.caption, color: colors.textPrimary },
  statementExplanation: { ...typography.caption, color: colors.textSecondary }
});
