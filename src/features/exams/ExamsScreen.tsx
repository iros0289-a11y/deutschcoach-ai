import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "../../core/theme";
import { mockExamSets } from "../../data/mock/dtzMockData";
import { InfoCard } from "../../ui/components/InfoCard";
import { PrimaryButton } from "../../ui/components/PrimaryButton";
import { Screen } from "../../ui/components/Screen";

export function ExamsScreen() {
  return (
    <Screen contentContainerStyle={styles.container}>
      <InfoCard>
        <Text style={styles.eyebrow}>Prüfungen</Text>
        <Text style={styles.title}>Modellprüfungen</Text>
        <Text style={styles.body}>
          Diese Web-Version zeigt Beispielprüfungen mit realistischer DTZ-Struktur. Du kannst damit sofort testen und trainieren.
        </Text>
      </InfoCard>

      {mockExamSets.map((exam) => (
        <InfoCard key={exam.id}>
          <Text style={styles.examTitle}>{exam.title}</Text>
          <Text style={styles.examMeta}>Version {exam.version}</Text>
          <View style={styles.sectionList}>
            {exam.sections.map((section) => (
              <View key={section.id} style={styles.sectionRow}>
                <View style={styles.sectionText}>
                  <Text style={styles.sectionName}>{section.title}</Text>
                  <Text style={styles.sectionMeta}>
                    {section.parts.reduce((sum, part) => sum + part.taskIds.length, 0)} Aufgabe(n)
                  </Text>
                </View>
                <Text style={styles.sectionTime}>{section.durationMinutes ?? 0} Min</Text>
              </View>
            ))}
          </View>
          <PrimaryButton href="/learn" icon="timer-outline" label="Im Lernmodus vorbereiten" />
        </InfoCard>
      ))}
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
  body: {
    ...typography.body,
    color: colors.textSecondary
  },
  examTitle: {
    ...typography.sectionTitle,
    color: colors.textPrimary
  },
  examMeta: {
    ...typography.caption,
    color: colors.textMuted
  },
  sectionList: {
    gap: spacing.sm
  },
  sectionRow: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing.md
  },
  sectionText: {
    gap: spacing.xs
  },
  sectionName: {
    ...typography.bodyStrong,
    color: colors.textPrimary
  },
  sectionMeta: {
    ...typography.caption,
    color: colors.textSecondary
  },
  sectionTime: {
    ...typography.bodyStrong,
    color: colors.primary
  }
});
