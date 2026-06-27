import { StyleSheet, Text } from "react-native";

import { colors, typography } from "../src/core/theme";
import { InfoCard } from "../src/ui/components/InfoCard";
import { PrimaryButton } from "../src/ui/components/PrimaryButton";
import { Screen } from "../src/ui/components/Screen";

export default function NotFoundScreen() {
  return (
    <Screen contentContainerStyle={styles.container}>
      <InfoCard>
        <Text style={styles.eyebrow}>DeutschCoach AI</Text>
        <Text style={styles.title}>Seite nicht gefunden</Text>
        <Text style={styles.body}>
          Dieser Link gehört aktuell nicht zu den freigegebenen Lernbereichen der App.
        </Text>
        <PrimaryButton href="/" label="Zur Startseite" />
      </InfoCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center"
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
  }
});
