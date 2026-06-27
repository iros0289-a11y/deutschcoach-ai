import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { appConfig } from "../../core/config/appConfig";
import { colors, spacing, typography } from "../../core/theme";
import { useAppState } from "../app-state/AppStateProvider";
import { FeatureTile } from "../../ui/components/FeatureTile";
import type { FeatureTileData } from "../../ui/components/FeatureTile";
import { PrimaryButton } from "../../ui/components/PrimaryButton";
import { ProgressBar } from "../../ui/components/ProgressBar";
import { Screen } from "../../ui/components/Screen";

const learningTiles: FeatureTileData[] = [
  {
    title: "Hören",
    subtitle: "Ansagen und Dialoge",
    icon: "headphones",
    color: colors.listening,
    href: "/listening" as const
  },
  {
    title: "Lesen",
    subtitle: "Texte und Anzeigen",
    icon: "text-box-search-outline",
    color: colors.reading,
    href: "/reading" as const
  },
  {
    title: "Schreiben",
    subtitle: "E-Mail und Brief",
    icon: "pencil-outline",
    color: colors.writing,
    href: "/writing" as const
  },
  {
    title: "Sprechen",
    subtitle: "Foto und Planung",
    icon: "microphone-outline",
    color: colors.speaking,
    href: "/speaking" as const
  },
  {
    title: "Modellprüfung",
    subtitle: "DTZ-Simulation",
    icon: "clipboard-check-outline",
    color: colors.exam,
    href: "/exams" as const
  },
  {
    title: "Fehlertrainer",
    subtitle: "Wiederholen",
    icon: "target-account",
    color: colors.trainer,
    href: "/trainer" as const
  }
];

export function HomeScreen() {
  const { progress } = useAppState();

  return (
    <Screen>
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <MaterialCommunityIcons color={colors.primary} name="school-outline" size={34} />
        </View>
        <Text style={styles.eyebrow}>Willkommen zurück</Text>
        <Text style={styles.title}>{appConfig.appName}</Text>
        <Text style={styles.subtitle}>Ziel: DTZ B1 bestehen</Text>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Fortschritt</Text>
            <Text style={styles.progressValue}>{Math.round(progress.overallCompletion * 100)}%</Text>
          </View>
          <ProgressBar value={progress.overallCompletion} />
          <Text style={styles.helperText}>
            {progress.dueErrorItems} Aufgabe(n) warten im Fehlertrainer
          </Text>
        </View>

        <PrimaryButton href="/learn" icon="play-circle-outline" label="Weiterlernen" />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>DTZ-Bereiche</Text>
      </View>

      <View style={styles.tileGrid}>
        {learningTiles.map((tile) => (
          <FeatureTile key={tile.title} {...tile} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.xl
  },
  heroIcon: {
    alignItems: "center",
    backgroundColor: colors.surfaceMuted,
    borderRadius: 8,
    height: 58,
    justifyContent: "center",
    width: 58
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
  subtitle: {
    ...typography.body,
    color: colors.textSecondary
  },
  progressCard: {
    gap: spacing.sm,
    paddingVertical: spacing.sm
  },
  progressHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  progressLabel: {
    ...typography.caption,
    color: colors.textSecondary
  },
  progressValue: {
    ...typography.bodyStrong,
    color: colors.primary
  },
  helperText: {
    ...typography.caption,
    color: colors.textSecondary
  },
  sectionHeader: {
    marginTop: spacing.xl
  },
  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.textPrimary
  },
  tileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    marginTop: spacing.md
  }
});
