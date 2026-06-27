import { Alert, StyleSheet, Text } from "react-native";

import { appConfig } from "../../core/config/appConfig";
import { colors, spacing, typography } from "../../core/theme";
import { InfoCard } from "../../ui/components/InfoCard";
import { PrimaryButton } from "../../ui/components/PrimaryButton";
import { Screen } from "../../ui/components/Screen";
import { useAppState } from "../app-state/AppStateProvider";

export function SettingsScreen() {
  const { resetDemoProgress } = useAppState();

  return (
    <Screen contentContainerStyle={styles.container}>
      <InfoCard>
        <Text style={styles.eyebrow}>Einstellungen</Text>
        <Text style={styles.title}>App-Status</Text>
        <Text style={styles.body}>Version {appConfig.version}</Text>
        <Text style={styles.body}>Modus: lokal zuerst, ohne Anmeldung</Text>
        <Text style={styles.body}>
          Ziel: {appConfig.targetExam} auf Niveau {appConfig.targetLevel}
        </Text>
      </InfoCard>

      <InfoCard>
        <Text style={styles.cardTitle}>Demo-Fortschritt zurücksetzen</Text>
        <Text style={styles.body}>
          Setzt die bisherigen Übungsdaten wieder auf den Startzustand zurück.
        </Text>
        <PrimaryButton
          icon="refresh"
          label="Fortschritt zurücksetzen"
          onPress={() => {
            resetDemoProgress();
            Alert.alert("Zurückgesetzt", "Die Demo-Daten wurden neu geladen.");
          }}
        />
      </InfoCard>
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
  }
});
