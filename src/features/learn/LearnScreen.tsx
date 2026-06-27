import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "../../core/theme";
import { phaseOneSkillSummaries } from "../../data/content/phaseOneExamContent";
import { InfoCard } from "../../ui/components/InfoCard";
import { PrimaryButton } from "../../ui/components/PrimaryButton";
import { Screen } from "../../ui/components/Screen";
import { useAppState } from "../app-state/AppStateProvider";

const learningOrder = ["listening", "reading", "writing", "speaking"] as const;

export function LearnScreen() {
  const { errorItems, progress } = useAppState();
  const weakestSkill = learningOrder.reduce((lowest, skill) =>
    progress.skillProgress[skill].accuracy < progress.skillProgress[lowest].accuracy ? skill : lowest
  );

  return (
    <Screen contentContainerStyle={styles.container}>
      <InfoCard>
        <Text style={styles.eyebrow}>Lernen</Text>
        <Text style={styles.title}>Dein nächster Schritt</Text>
        <Text style={styles.body}>
          Starte am besten mit {phaseOneSkillSummaries[weakestSkill].title}. Dort ist aktuell noch das meiste Potenzial.
        </Text>
        <PrimaryButton
          href={`/${weakestSkill}`}
          label={`Weiter mit ${phaseOneSkillSummaries[weakestSkill].title}`}
        />
      </InfoCard>

      <InfoCard>
        <Text style={styles.sectionTitle}>Heute sinnvoll</Text>
        <Text style={styles.body}>
          {errorItems.length > 0
            ? `${errorItems.length} Aufgabe(n) warten im Fehlertrainer auf Wiederholung.`
            : "Keine offenen Fehler. Nutze jetzt die vollständige Modellprüfung oder trainiere gezielt eine Fertigkeit."}
        </Text>
        <PrimaryButton
          href={errorItems.length > 0 ? "/trainer" : "/exam/model-1"}
          label={errorItems.length > 0 ? "Zum Fehlertrainer" : "Zur Modellprüfung 1"}
        />
      </InfoCard>

      <View style={styles.grid}>
        {learningOrder.map((skill) => (
          <InfoCard key={skill}>
            <Text style={styles.cardTitle}>{phaseOneSkillSummaries[skill].title}</Text>
            <Text style={styles.cardText}>{phaseOneSkillSummaries[skill].subtitle}</Text>
            <Text style={styles.cardText}>
              Trefferquote: {Math.round(progress.skillProgress[skill].accuracy * 100)}%
            </Text>
            <PrimaryButton href={`/${skill}`} label="Öffnen" />
          </InfoCard>
        ))}
      </View>
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
  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.textPrimary
  },
  body: {
    ...typography.body,
    color: colors.textSecondary
  },
  grid: {
    gap: spacing.md
  },
  cardTitle: {
    ...typography.bodyStrong,
    color: colors.textPrimary
  },
  cardText: {
    ...typography.body,
    color: colors.textSecondary
  }
});
