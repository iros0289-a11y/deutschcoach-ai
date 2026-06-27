import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "../../core/theme";
import { skillSummaries } from "../../data/mock/dtzMockData";
import { InfoCard } from "../../ui/components/InfoCard";
import { ProgressBar } from "../../ui/components/ProgressBar";
import { Screen } from "../../ui/components/Screen";
import { useAppState } from "../app-state/AppStateProvider";

const skills = ["listening", "reading", "writing", "speaking"] as const;

export function StatsScreen() {
  const { progress } = useAppState();

  return (
    <Screen contentContainerStyle={styles.container}>
      <InfoCard>
        <Text style={styles.eyebrow}>Statistik</Text>
        <Text style={styles.title}>Fortschritt bis B1</Text>
        <Text style={styles.body}>
          Geschätztes Niveau: {progress.levelEstimate === "b1-ready" ? "B1 bereit" : "zwischen A2 und B1"}
        </Text>
        <ProgressBar value={progress.overallCompletion} />
      </InfoCard>

      {skills.map((skill) => {
        const item = progress.skillProgress[skill];
        return (
          <InfoCard key={skill}>
            <View style={styles.row}>
              <Text style={styles.cardTitle}>{skillSummaries[skill].title}</Text>
              <Text style={styles.accuracy}>{Math.round(item.accuracy * 100)}%</Text>
            </View>
            <ProgressBar value={item.accuracy} />
            <Text style={styles.body}>
              {item.answeredCount} beantwortet, {item.correctCount} richtig
            </Text>
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
  body: {
    ...typography.body,
    color: colors.textSecondary
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardTitle: {
    ...typography.bodyStrong,
    color: colors.textPrimary
  },
  accuracy: {
    ...typography.bodyStrong,
    color: colors.primary
  }
});
