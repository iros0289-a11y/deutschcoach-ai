import { StyleSheet, Text } from "react-native";

import { colors, spacing, typography } from "../../core/theme";
import { getListeningTaskSummary } from "../../data/content/listeningContent";
import { getReadingTaskSummary } from "../../data/content/readingContent";
import { getPhaseOneTaskSummary, phaseOneSkillSummaries } from "../../data/content/phaseOneExamContent";
import { getSpeakingTaskSummary } from "../../data/content/speakingContent";
import { getWritingTaskSummary } from "../../data/content/writingContent";
import { InfoCard } from "../../ui/components/InfoCard";
import { PrimaryButton } from "../../ui/components/PrimaryButton";
import { Screen } from "../../ui/components/Screen";
import { useAppState } from "../app-state/AppStateProvider";

export function TrainerScreen() {
  const { errorItems } = useAppState();

  return (
    <Screen contentContainerStyle={styles.container}>
      <InfoCard>
        <Text style={styles.eyebrow}>Training</Text>
        <Text style={styles.title}>Fehlertrainer</Text>
        <Text style={styles.body}>
          Falsche Aufgaben erscheinen hier automatisch wieder, damit sie gezielt wiederholt werden.
        </Text>
      </InfoCard>

      {errorItems.length === 0 ? (
        <InfoCard>
          <Text style={styles.cardTitle}>Sehr gut</Text>
          <Text style={styles.body}>Aktuell gibt es keine offenen Fehleraufgaben.</Text>
          <PrimaryButton href="/learn" label="Neue Aufgabe lernen" />
        </InfoCard>
      ) : (
        errorItems.map((item) => {
          const task =
            getListeningTaskSummary(item.taskId) ??
            getReadingTaskSummary(item.taskId) ??
            getWritingTaskSummary(item.taskId) ??
            getSpeakingTaskSummary(item.taskId) ??
            getPhaseOneTaskSummary(item.taskId);
          if (!task) {
            return null;
          }

          return (
            <InfoCard key={item.id}>
              <Text style={styles.cardTitle}>{task.title}</Text>
              <Text style={styles.body}>{task.prompt}</Text>
              <Text style={styles.meta}>
                Bereich: {phaseOneSkillSummaries[item.skill].title} • Fehler: {item.incorrectCount}
              </Text>
              <PrimaryButton href={`/${item.skill}`} label="Jetzt wiederholen" />
            </InfoCard>
          );
        })
      )}
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
  cardTitle: {
    ...typography.sectionTitle,
    color: colors.textPrimary
  },
  body: {
    ...typography.body,
    color: colors.textSecondary
  },
  meta: {
    ...typography.caption,
    color: colors.textMuted
  }
});
