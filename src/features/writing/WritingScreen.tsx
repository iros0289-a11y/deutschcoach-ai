import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { colors, radius, spacing, typography } from "../../core/theme";
import { writingScenarios } from "../../data/content/phaseOneExamContent";
import { InfoCard } from "../../ui/components/InfoCard";
import { Screen } from "../../ui/components/Screen";
import { useAppState } from "../app-state/AppStateProvider";

export function WritingScreen() {
  const { submitAnswer } = useAppState();
  const initialScenario = useMemo(
    () => writingScenarios.find((scenario) => scenario.isExamTask)?.id ?? writingScenarios[0]?.id,
    []
  );
  const [selectedId, setSelectedId] = useState(initialScenario);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [showSample, setShowSample] = useState<Record<string, boolean>>({});

  const scenario = writingScenarios.find((entry) => entry.id === selectedId) ?? writingScenarios[0];
  if (!scenario) {
    return null;
  }

  return (
    <Screen contentContainerStyle={styles.container}>
      <InfoCard>
        <Text style={styles.eyebrow}>DTZ</Text>
        <Text style={styles.title}>Schreiben</Text>
        <Text style={styles.body}>
          Sie finden hier 20 unterschiedliche Schreibsituationen mit vier Inhaltspunkten, Tipps und Musterlösung.
        </Text>
      </InfoCard>

      <InfoCard>
        <Text style={styles.sectionTitle}>Aufgaben auswählen</Text>
        <View style={styles.choiceWrap}>
          {writingScenarios.map((entry) => {
            const active = entry.id === scenario.id;
            return (
              <Pressable
                key={entry.id}
                onPress={() => setSelectedId(entry.id)}
                style={({ pressed }) => [
                  styles.choiceChip,
                  active && styles.choiceChipSelected,
                  pressed && styles.choiceChipPressed
                ]}
              >
                <Text style={[styles.choiceChipText, active && styles.choiceChipTextSelected]}>
                  {entry.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </InfoCard>

      <InfoCard>
        <Text style={styles.partLabel}>{scenario.category}</Text>
        <Text style={styles.sectionTitle}>{scenario.title}</Text>
        <Text style={styles.body}>Empfänger: {scenario.recipient}</Text>
        <Text style={styles.longText}>{scenario.situation}</Text>
        <View style={styles.pointsCard}>
          <Text style={styles.referenceTitle}>Diese vier Punkte sollen vorkommen:</Text>
          {scenario.points.map((point) => (
            <Text key={point} style={styles.referenceText}>
              • {point}
            </Text>
          ))}
        </View>
        <TextInput
          multiline
          onChangeText={(value) => setDrafts((current) => ({ ...current, [scenario.id]: value }))}
          placeholder="Schreiben Sie hier Ihre E-Mail oder Ihren Brief."
          style={styles.input}
          textAlignVertical="top"
          value={drafts[scenario.id] ?? ""}
        />
        <View style={styles.actionRow}>
          <Pressable
            onPress={() => {
              const text = drafts[scenario.id] ?? "";
              const result = text.trim().length >= 120 ? "correct" : text.trim().length >= 60 ? "partial" : "incorrect";
              submitAnswer({
                taskId: scenario.id,
                skill: "writing",
                mode: "learning",
                result,
                freeText: text,
                score: result === "correct" ? 3 : result === "partial" ? 2 : 1,
                maxScore: 3,
                reason: result === "incorrect" ? "grammar" : "self-assessment"
              });
            }}
            style={({ pressed }) => [styles.primaryAction, pressed && styles.primaryActionPressed]}
          >
            <Text style={styles.primaryActionText}>Entwurf speichern</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              setShowSample((current) => ({ ...current, [scenario.id]: !current[scenario.id] }))
            }
            style={({ pressed }) => [styles.secondaryAction, pressed && styles.choiceChipPressed]}
          >
            <Text style={styles.secondaryActionText}>
              {showSample[scenario.id] ? "Musterlösung ausblenden" : "Musterlösung zeigen"}
            </Text>
          </Pressable>
        </View>
        <View style={styles.pointsCard}>
          <Text style={styles.referenceTitle}>Tipps</Text>
          {scenario.tips.map((tip) => (
            <Text key={tip} style={styles.referenceText}>
              • {tip}
            </Text>
          ))}
        </View>
        {showSample[scenario.id] ? (
          <View style={styles.pointsCard}>
            <Text style={styles.referenceTitle}>Musterlösung</Text>
            {scenario.sampleSubject ? (
              <Text style={styles.referenceMeta}>Betreff: {scenario.sampleSubject}</Text>
            ) : null}
            <Text style={styles.longText}>{scenario.sampleText}</Text>
          </View>
        ) : null}
      </InfoCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.lg },
  eyebrow: { ...typography.caption, color: colors.secondary, textTransform: "uppercase" },
  title: { ...typography.screenTitle, color: colors.textPrimary },
  body: { ...typography.body, color: colors.textSecondary },
  sectionTitle: { ...typography.sectionTitle, color: colors.textPrimary },
  partLabel: { ...typography.caption, color: colors.primary, textTransform: "uppercase" },
  choiceWrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  choiceChip: {
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  choiceChipSelected: { backgroundColor: "#DBEAFE", borderColor: colors.primary },
  choiceChipPressed: { opacity: 0.84 },
  choiceChipText: { ...typography.caption, color: colors.textPrimary },
  choiceChipTextSelected: { color: colors.primary },
  longText: {
    ...typography.body,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    color: colors.textPrimary,
    padding: spacing.md
  },
  pointsCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.xs,
    padding: spacing.md
  },
  referenceTitle: { ...typography.bodyStrong, color: colors.textPrimary },
  referenceText: { ...typography.body, color: colors.textSecondary },
  referenceMeta: { ...typography.caption, color: colors.primary },
  input: {
    ...typography.body,
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.textPrimary,
    minHeight: 220,
    padding: spacing.md
  },
  actionRow: { gap: spacing.sm },
  primaryAction: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: spacing.lg
  },
  primaryActionPressed: { backgroundColor: colors.primaryPressed },
  primaryActionText: { ...typography.bodyStrong, color: colors.surface },
  secondaryAction: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: spacing.lg
  },
  secondaryActionText: { ...typography.caption, color: colors.textPrimary }
});
