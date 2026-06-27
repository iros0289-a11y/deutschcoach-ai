import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

import { colors, radius, spacing, typography } from "../../core/theme";
import {
  listeningChoiceTasks,
  listeningTrueFalseTasks,
  phaseOneExamMeta,
  readingChoiceTasks,
  readingMatchingTask,
  readingBuildingTask,
  speakingPlanningTasks,
  speakingPhotoPrompts,
  writingScenarios
} from "../../data/content/phaseOneExamContent";
import { InfoCard } from "../../ui/components/InfoCard";
import { PrimaryButton } from "../../ui/components/PrimaryButton";
import { Screen } from "../../ui/components/Screen";

const examLinks = {
  listening: "/listening" as const,
  reading: "/reading" as const,
  writing: "/writing" as const,
  speaking: "/speaking" as const
};

export function ModelExamScreen() {
  return (
    <Screen contentContainerStyle={styles.container}>
      <InfoCard>
        <Text style={styles.eyebrow}>Phase 1</Text>
        <Text style={styles.title}>{phaseOneExamMeta.title}</Text>
        <Text style={styles.body}>{phaseOneExamMeta.subtitle}</Text>
        <Text style={styles.duration}>Gesamtdauer: {phaseOneExamMeta.durationLabel}</Text>
      </InfoCard>

      {phaseOneExamMeta.sections.map((section) => {
        const detail =
          section.id === "listening"
            ? `${listeningChoiceTasks.length} Aufgaben Typ A, ${listeningTrueFalseTasks.length} Aufgaben Typ B`
            : section.id === "reading"
              ? `1 Anzeigen-Zuordnung, 1 Gebäudeplan, ${readingChoiceTasks.length} Lesetexte`
              : section.id === "writing"
                ? `${writingScenarios.filter((item) => item.isExamTask).length} Prüfungsaufgaben, insgesamt ${writingScenarios.length} Schreibsituationen`
                : `${speakingPhotoPrompts.filter((item) => item.isExamTask).length} Prüfungsbilder, ${speakingPlanningTasks.length} Planungssituationen`;

        return (
          <InfoCard key={section.id}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.body}>
              Teile: {section.parts.join(", ")}
            </Text>
            <Text style={styles.body}>{detail}</Text>
            <View style={styles.row}>
              <PrimaryButton href={examLinks[section.id]} label={`${section.title} öffnen`} />
            </View>
          </InfoCard>
        );
      })}

      <InfoCard>
        <Text style={styles.sectionTitle}>Prüfungsreihenfolge</Text>
        <Text style={styles.body}>
          1. Hören, 2. Lesen, 3. Schreiben, 4. Sprechen. Jede Sektion ist in der Web-App direkt benutzbar und bereits mit Lösungen, Erklärungen oder Beispielantworten hinterlegt.
        </Text>
        <Link href="/listening" style={styles.inlineLink}>
          Mit dem ersten Prüfungsteil beginnen
        </Link>
      </InfoCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.lg },
  eyebrow: { ...typography.caption, color: colors.secondary, textTransform: "uppercase" },
  title: { ...typography.screenTitle, color: colors.textPrimary },
  body: { ...typography.body, color: colors.textSecondary },
  duration: { ...typography.bodyStrong, color: colors.primary },
  sectionTitle: { ...typography.sectionTitle, color: colors.textPrimary },
  row: { gap: spacing.sm },
  inlineLink: {
    ...typography.bodyStrong,
    color: colors.primary,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md
  }
});
