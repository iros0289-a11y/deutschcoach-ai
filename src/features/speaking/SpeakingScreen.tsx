import { useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../../core/theme";
import {
  speakingIntroPrompt,
  speakingPhotoPrompts,
  speakingPlanningTasks
} from "../../data/content/phaseOneExamContent";
import { InfoCard } from "../../ui/components/InfoCard";
import { Screen } from "../../ui/components/Screen";
import { useAppState } from "../app-state/AppStateProvider";

export function SpeakingScreen() {
  const { submitAnswer } = useAppState();
  const initialPhoto = useMemo(
    () => speakingPhotoPrompts.find((prompt) => prompt.isExamTask)?.id ?? speakingPhotoPrompts[0]?.id,
    []
  );
  const initialPlan = useMemo(
    () => speakingPlanningTasks.find((task) => task.isExamTask)?.id ?? speakingPlanningTasks[0]?.id,
    []
  );

  const [selectedPhotoId, setSelectedPhotoId] = useState(initialPhoto);
  const [selectedPlanId, setSelectedPlanId] = useState(initialPlan);

  const photo = speakingPhotoPrompts.find((entry) => entry.id === selectedPhotoId) ?? speakingPhotoPrompts[0];
  const plan = speakingPlanningTasks.find((entry) => entry.id === selectedPlanId) ?? speakingPlanningTasks[0];
  if (!photo || !plan) {
    return null;
  }

  return (
    <Screen contentContainerStyle={styles.container}>
      <InfoCard>
        <Text style={styles.eyebrow}>DTZ</Text>
        <Text style={styles.title}>Sprechen</Text>
        <Text style={styles.body}>
          Teil 1: sich vorstellen. Teil 2: Bildbeschreibung. Teil 3: gemeinsam planen.
        </Text>
      </InfoCard>

      <InfoCard>
        <Text style={styles.partLabel}>Teil 1</Text>
        <Text style={styles.sectionTitle}>Sich vorstellen</Text>
        {speakingIntroPrompt.prompts.map((prompt) => (
          <Text key={prompt} style={styles.referenceText}>
            • {prompt}
          </Text>
        ))}
        <View style={styles.phraseCard}>
          <Text style={styles.referenceTitle}>Redemittel</Text>
          {speakingIntroPrompt.phraseBank.map((phrase) => (
            <Text key={phrase} style={styles.referenceText}>
              • {phrase}
            </Text>
          ))}
        </View>
        <Text style={styles.longText}>{speakingIntroPrompt.sampleAnswer}</Text>
      </InfoCard>

      <InfoCard>
        <Text style={styles.partLabel}>Teil 2</Text>
        <Text style={styles.sectionTitle}>Bildbeschreibung</Text>
        <View style={styles.photoGrid}>
          {speakingPhotoPrompts.map((entry) => {
            const active = entry.id === photo.id;
            return (
              <Pressable
                key={entry.id}
                onPress={() => setSelectedPhotoId(entry.id)}
                style={({ pressed }) => [
                  styles.photoThumb,
                  active && styles.photoThumbActive,
                  pressed && styles.photoThumbPressed
                ]}
              >
                <Image source={entry.image} style={styles.photoThumbImage} />
                <Text style={styles.photoThumbText}>{entry.sceneLabel}</Text>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.photoDetail}>
          <Image source={photo.image} style={styles.photoLarge} />
          <View style={styles.photoInfo}>
            <Text style={styles.referenceTitle}>{photo.title}</Text>
            {photo.guidingQuestions.map((question) => (
              <Text key={question} style={styles.referenceText}>
                • {question}
              </Text>
            ))}
            <View style={styles.phraseCard}>
              <Text style={styles.referenceTitle}>Redemittel</Text>
              {photo.phraseBank.map((phrase) => (
                <Text key={phrase} style={styles.referenceText}>
                  • {phrase}
                </Text>
              ))}
            </View>
            <Text style={styles.longText}>{photo.sampleAnswer}</Text>
            <Pressable
              onPress={() =>
                submitAnswer({
                  taskId: photo.id,
                  skill: "speaking",
                  mode: "learning",
                  result: "correct",
                  score: 3,
                  maxScore: 3,
                  reason: "self-assessment"
                })
              }
              style={({ pressed }) => [styles.primaryAction, pressed && styles.primaryActionPressed]}
            >
              <Text style={styles.primaryActionText}>Als geübt markieren</Text>
            </Pressable>
          </View>
        </View>
      </InfoCard>

      <InfoCard>
        <Text style={styles.partLabel}>Teil 3</Text>
        <Text style={styles.sectionTitle}>Gemeinsam planen</Text>
        <View style={styles.choiceWrap}>
          {speakingPlanningTasks.map((entry) => {
            const active = entry.id === plan.id;
            return (
              <Pressable
                key={entry.id}
                onPress={() => setSelectedPlanId(entry.id)}
                style={({ pressed }) => [
                  styles.choiceChip,
                  active && styles.choiceChipSelected,
                  pressed && styles.photoThumbPressed
                ]}
              >
                <Text style={[styles.choiceChipText, active && styles.choiceChipTextSelected]}>
                  {entry.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={styles.longText}>{plan.setting}</Text>
        <View style={styles.planningGrid}>
          <View style={styles.phraseCard}>
            <Text style={styles.referenceTitle}>Ihre Rolle</Text>
            {plan.roleA.map((item) => (
              <Text key={item} style={styles.referenceText}>
                • {item}
              </Text>
            ))}
          </View>
          <View style={styles.phraseCard}>
            <Text style={styles.referenceTitle}>Rolle der Partnerin / des Partners</Text>
            {plan.roleB.map((item) => (
              <Text key={item} style={styles.referenceText}>
                • {item}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.phraseCard}>
          <Text style={styles.referenceTitle}>Nützliche Redemittel</Text>
          {plan.usefulPhrases.map((phrase) => (
            <Text key={phrase} style={styles.referenceText}>
              • {phrase}
            </Text>
          ))}
        </View>
        <Text style={styles.longText}>{plan.sampleDirection}</Text>
      </InfoCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.lg },
  eyebrow: { ...typography.caption, color: colors.secondary, textTransform: "uppercase" },
  title: { ...typography.screenTitle, color: colors.textPrimary },
  body: { ...typography.body, color: colors.textSecondary },
  partLabel: { ...typography.caption, color: colors.primary, textTransform: "uppercase" },
  sectionTitle: { ...typography.sectionTitle, color: colors.textPrimary },
  referenceTitle: { ...typography.bodyStrong, color: colors.textPrimary },
  referenceText: { ...typography.body, color: colors.textSecondary },
  phraseCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.xs,
    padding: spacing.md
  },
  longText: {
    ...typography.body,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    color: colors.textPrimary,
    padding: spacing.md
  },
  photoGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  photoThumb: {
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexBasis: "31%",
    overflow: "hidden"
  },
  photoThumbActive: { borderColor: colors.primary, backgroundColor: "#DBEAFE" },
  photoThumbPressed: { opacity: 0.84 },
  photoThumbImage: { height: 90, width: "100%" },
  photoThumbText: {
    ...typography.caption,
    color: colors.textPrimary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm
  },
  photoDetail: { gap: spacing.md },
  photoLarge: { borderRadius: radius.md, height: 220, width: "100%" },
  photoInfo: { gap: spacing.md },
  primaryAction: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: spacing.lg
  },
  primaryActionPressed: { backgroundColor: colors.primaryPressed },
  primaryActionText: { ...typography.bodyStrong, color: colors.surface },
  choiceWrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  choiceChip: {
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  choiceChipSelected: { backgroundColor: "#DBEAFE", borderColor: colors.primary },
  choiceChipText: { ...typography.caption, color: colors.textPrimary },
  choiceChipTextSelected: { color: colors.primary },
  planningGrid: { gap: spacing.md }
});
