import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { colors, radius, spacing, typography } from "../../core/theme";
import { assessWritingDraft, type WritingAssessment } from "../../domain/scoring/writingAssessment";
import { writingPracticeScenarios } from "../../data/content/writingContent";
import { InfoCard } from "../../ui/components/InfoCard";
import { Screen } from "../../ui/components/Screen";
import { useAppState } from "../app-state/AppStateProvider";

export function WritingScreen() {
  const { submitAnswer } = useAppState();
  const initialScenario = useMemo(
    () => writingPracticeScenarios.find((scenario) => scenario.isExamTask)?.id ?? writingPracticeScenarios[0]?.id,
    []
  );
  const [selectedId, setSelectedId] = useState(initialScenario);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [assessments, setAssessments] = useState<Record<string, WritingAssessment>>({});

  const scenario =
    writingPracticeScenarios.find((entry) => entry.id === selectedId) ?? writingPracticeScenarios[0];
  if (!scenario) {
    return null;
  }

  const currentDraft = drafts[scenario.id] ?? "";
  const currentAssessment = assessments[scenario.id];

  return (
    <Screen contentContainerStyle={styles.container}>
      <InfoCard>
        <Text style={styles.eyebrow}>DTZ</Text>
        <Text style={styles.title}>Schreiben</Text>
        <Text style={styles.body}>
          Sie trainieren {writingPracticeScenarios.length} Alltagssituationen mit vier Inhaltspunkten, automatischer Rueckmeldung und ausfuehrlicher Musterloesung auf B1-Niveau.
        </Text>
      </InfoCard>

      <InfoCard>
        <Text style={styles.sectionTitle}>Aufgaben auswaehlen</Text>
        <View style={styles.choiceWrap}>
          {writingPracticeScenarios.map((entry) => {
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
        <Text style={styles.body}>Empfaenger: {scenario.recipient}</Text>
        <Text style={styles.longText}>{scenario.situation}</Text>

        <View style={styles.pointsCard}>
          <Text style={styles.referenceTitle}>Diese vier Punkte sollen vorkommen</Text>
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
          value={currentDraft}
        />

        <Pressable
          onPress={() => {
            const assessment = assessWritingDraft(scenario, currentDraft);
            setAssessments((current) => ({ ...current, [scenario.id]: assessment }));
            const result =
              assessment.estimatedPoints >= 14
                ? "correct"
                : assessment.estimatedPoints >= 10
                  ? "partial"
                  : "incorrect";

            submitAnswer({
              taskId: scenario.id,
              skill: "writing",
              mode: "learning",
              result,
              freeText: currentDraft,
              score: assessment.estimatedPoints,
              maxScore: assessment.maxPoints,
              reason: result === "incorrect" ? "grammar" : "self-assessment"
            });
          }}
          style={({ pressed }) => [styles.primaryAction, pressed && styles.primaryActionPressed]}
        >
          <Text style={styles.primaryActionText}>Antwort prüfen</Text>
        </Pressable>

        <View style={styles.pointsCard}>
          <Text style={styles.referenceTitle}>Tipps</Text>
          {scenario.tips.map((tip) => (
            <Text key={tip} style={styles.referenceText}>
              • {tip}
            </Text>
          ))}
        </View>
      </InfoCard>

      {currentAssessment ? (
        <>
          <InfoCard>
            <Text style={styles.sectionTitle}>Automatische Bewertung</Text>
            <Text style={styles.scoreLine}>
              Geschätzte Punktzahl: {currentAssessment.estimatedPoints} / {currentAssessment.maxPoints}
            </Text>
            <Text style={styles.scoreLine}>Geschätztes Niveau: {currentAssessment.estimatedLevel}</Text>

            <View style={styles.criteriaGrid}>
              {currentAssessment.criteria.map((criterion) => (
                <View key={criterion.id} style={styles.criteriaCard}>
                  <Text style={styles.referenceTitle}>{criterion.label}</Text>
                  <Text style={styles.criteriaScore}>
                    {criterion.score} / {criterion.maxScore}
                  </Text>
                  <Text style={styles.referenceText}>{criterion.comment}</Text>
                </View>
              ))}
            </View>
          </InfoCard>

          <InfoCard>
            <Text style={styles.sectionTitle}>Verbesserungsvorschläge</Text>
            {currentAssessment.strengths.map((item) => (
              <Text key={item} style={styles.referenceText}>
                • Stärke: {item}
              </Text>
            ))}
            {currentAssessment.improvements.map((item) => (
              <Text key={item} style={styles.referenceText}>
                • Weiter verbessern: {item}
              </Text>
            ))}
            {currentAssessment.coveredPoints.length > 0 ? (
              <Text style={styles.referenceText}>
                • Erfuellte Inhaltspunkte: {currentAssessment.coveredPoints.join(", ")}
              </Text>
            ) : null}
            {currentAssessment.missingPoints.length > 0 ? (
              <Text style={styles.referenceText}>
                • Noch nicht klar genug: {currentAssessment.missingPoints.join(", ")}
              </Text>
            ) : null}
          </InfoCard>

          <InfoCard>
            <Text style={styles.sectionTitle}>Musterlösung</Text>
            {scenario.sampleSubject ? (
              <Text style={styles.referenceMeta}>Betreff: {scenario.sampleSubject}</Text>
            ) : null}
            <Text style={styles.longText}>{scenario.expandedSampleText}</Text>
          </InfoCard>
        </>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.lg },
  eyebrow: { ...typography.caption, color: colors.secondary, textTransform: "uppercase" },
  title: { ...typography.screenTitle, color: colors.textPrimary },
  body: { ...typography.body, color: colors.textSecondary },
  sectionTitle: { ...typography.sectionTitle, color: colors.textPrimary },
  partLabel: { ...typography.caption, color: colors.writing, textTransform: "uppercase" },
  choiceWrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  choiceChip: {
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  choiceChipSelected: { backgroundColor: "#FEF3C7", borderColor: colors.writing },
  choiceChipPressed: { opacity: 0.84 },
  choiceChipText: { ...typography.caption, color: colors.textPrimary },
  choiceChipTextSelected: { color: colors.writing },
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
  referenceMeta: { ...typography.caption, color: colors.writing },
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
  primaryAction: {
    alignItems: "center",
    backgroundColor: colors.writing,
    borderRadius: radius.md,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: spacing.lg
  },
  primaryActionPressed: { opacity: 0.9 },
  primaryActionText: { ...typography.bodyStrong, color: colors.surface },
  scoreLine: { ...typography.bodyStrong, color: colors.textPrimary },
  criteriaGrid: { gap: spacing.md },
  criteriaCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.xs,
    padding: spacing.md
  },
  criteriaScore: { ...typography.bodyStrong, color: colors.writing }
});
