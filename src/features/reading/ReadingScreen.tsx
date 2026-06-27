import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../../core/theme";
import {
  readingBuildingTask,
  readingChoiceTasks,
  readingMatchingTask
} from "../../data/content/phaseOneExamContent";
import { InfoCard } from "../../ui/components/InfoCard";
import { Screen } from "../../ui/components/Screen";
import { useAppState } from "../app-state/AppStateProvider";

export function ReadingScreen() {
  const { submitAnswer } = useAppState();
  const [selectedAds, setSelectedAds] = useState<Record<string, string>>({});
  const [selectedFloors, setSelectedFloors] = useState<Record<string, string>>({});
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const adLookup = useMemo(
    () => Object.fromEntries(readingMatchingTask.ads.map((ad) => [ad.id, ad.title])),
    []
  );
  const floorLookup = useMemo(
    () => Object.fromEntries(readingBuildingTask.levels.map((level) => [level.id, level.name])),
    []
  );

  return (
    <Screen contentContainerStyle={styles.container}>
      <InfoCard>
        <Text style={styles.eyebrow}>DTZ</Text>
        <Text style={styles.title}>Lesen</Text>
        <Text style={styles.body}>
          Hier üben Sie unterschiedliche Formate: Anzeigen, E-Mails, Aushänge, Fahrpläne und Gebäudepläne.
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
            <View style={styles.choiceWrap}>
              {readingMatchingTask.ads.map((ad) => {
                const active = selectedAds[situation.id] === ad.id;
                return (
                  <Pressable
                    key={ad.id}
                    onPress={() => setSelectedAds((current) => ({ ...current, [situation.id]: ad.id }))}
                    style={({ pressed }) => [
                      styles.choiceChip,
                      active && styles.choiceChipSelected,
                      pressed && styles.choiceChipPressed
                    ]}
                  >
                    <Text style={[styles.choiceChipText, active && styles.choiceChipTextSelected]}>
                      {ad.title}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <Pressable
              onPress={() => {
                const correct = selectedAds[situation.id] === situation.correctId;
                const selectedAdId = selectedAds[situation.id];
                setRevealed((current) => ({ ...current, [situation.id]: true }));
                submitAnswer({
                  taskId: situation.id,
                  skill: "reading",
                  mode: "learning",
                  result: correct ? "correct" : "incorrect",
                  score: correct ? 1 : 0,
                  maxScore: 1,
                  reason: "wrong-option",
                  ...(selectedAdId ? { selectedOptionIds: [selectedAdId] } : {})
                });
              }}
              style={({ pressed }) => [styles.inlineAction, pressed && styles.choiceChipPressed]}
            >
              <Text style={styles.inlineActionText}>Zuordnung prüfen</Text>
            </Pressable>
            {revealed[situation.id] ? (
              <Text style={styles.explanationText}>
                Lösung: {adLookup[situation.correctId]}. {situation.explanation}
              </Text>
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
            <View style={styles.choiceWrap}>
              {readingBuildingTask.levels.map((level) => {
                const active = selectedFloors[situation.id] === level.id;
                return (
                  <Pressable
                    key={level.id}
                    onPress={() =>
                      setSelectedFloors((current) => ({ ...current, [situation.id]: level.id }))
                    }
                    style={({ pressed }) => [
                      styles.choiceChip,
                      active && styles.choiceChipSelected,
                      pressed && styles.choiceChipPressed
                    ]}
                  >
                    <Text style={[styles.choiceChipText, active && styles.choiceChipTextSelected]}>
                      {level.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <Pressable
              onPress={() => {
                const correct = selectedFloors[situation.id] === situation.correctId;
                const selectedFloorId = selectedFloors[situation.id];
                setRevealed((current) => ({ ...current, [situation.id]: true }));
                submitAnswer({
                  taskId: situation.id,
                  skill: "reading",
                  mode: "learning",
                  result: correct ? "correct" : "incorrect",
                  score: correct ? 1 : 0,
                  maxScore: 1,
                  reason: "missed-detail",
                  ...(selectedFloorId ? { selectedOptionIds: [selectedFloorId] } : {})
                });
              }}
              style={({ pressed }) => [styles.inlineAction, pressed && styles.choiceChipPressed]}
            >
              <Text style={styles.inlineActionText}>Etage prüfen</Text>
            </Pressable>
            {revealed[situation.id] ? (
              <Text style={styles.explanationText}>
                Lösung: {floorLookup[situation.correctId]}. {situation.explanation}
              </Text>
            ) : null}
          </View>
        ))}
      </InfoCard>

      {readingChoiceTasks.map((task) => {
        const selected = selectedChoices[task.id];
        const isCorrect = selected === task.correctOptionId;

        return (
          <InfoCard key={task.id}>
            <Text style={styles.partLabel}>{task.format}</Text>
            <Text style={styles.sectionTitle}>{task.title}</Text>
            <Text style={styles.referenceTitle}>{task.sourceTitle}</Text>
            <Text style={styles.longText}>{task.text}</Text>
            <Text style={styles.question}>{task.question}</Text>
            <View style={styles.optionGroup}>
              {task.options.map((option) => {
                const active = selected === option.id;
                return (
                  <Pressable
                    key={option.id}
                    onPress={() =>
                      setSelectedChoices((current) => ({ ...current, [task.id]: option.id }))
                    }
                    style={({ pressed }) => [
                      styles.optionButton,
                      active && styles.optionButtonSelected,
                      pressed && styles.choiceChipPressed
                    ]}
                  >
                    <Text style={[styles.optionLabel, active && styles.choiceChipTextSelected]}>
                      {option.label}
                    </Text>
                    <Text style={[styles.optionText, active && styles.choiceChipTextSelected]}>
                      {option.text}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <Pressable
              onPress={() => {
                setRevealed((current) => ({ ...current, [task.id]: true }));
                submitAnswer({
                  taskId: task.id,
                  skill: "reading",
                  mode: "learning",
                  result: isCorrect ? "correct" : "incorrect",
                  selectedOptionIds: selected ? [selected] : [],
                  score: isCorrect ? 1 : 0,
                  maxScore: 1,
                  reason: "wrong-option"
                });
              }}
              style={({ pressed }) => [styles.inlineAction, pressed && styles.choiceChipPressed]}
            >
              <Text style={styles.inlineActionText}>Antwort prüfen</Text>
            </Pressable>
            {revealed[task.id] ? (
              <Text style={styles.explanationText}>
                Lösung: {task.options.find((option) => option.id === task.correctOptionId)?.label}.{" "}
                {task.explanation}
              </Text>
            ) : null}
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
  sectionTitle: { ...typography.sectionTitle, color: colors.textPrimary },
  partLabel: { ...typography.caption, color: colors.primary, textTransform: "uppercase" },
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
  referenceMeta: { ...typography.caption, color: colors.primary },
  matchCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.sm,
    padding: spacing.md
  },
  question: { ...typography.bodyStrong, color: colors.textPrimary },
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
  inlineAction: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  inlineActionText: { ...typography.caption, color: colors.surface },
  explanationText: { ...typography.caption, color: colors.textSecondary },
  longText: {
    ...typography.body,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    color: colors.textPrimary,
    padding: spacing.md
  },
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
  optionLabel: { ...typography.caption, color: colors.textMuted },
  optionText: { ...typography.body, color: colors.textPrimary }
});
