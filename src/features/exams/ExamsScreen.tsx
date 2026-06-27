import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "../../core/theme";
import { phaseOneExamMeta } from "../../data/content/phaseOneExamContent";
import { InfoCard } from "../../ui/components/InfoCard";
import { PrimaryButton } from "../../ui/components/PrimaryButton";
import { Screen } from "../../ui/components/Screen";

const sectionTimes: Record<string, string> = {
  listening: "20 Min",
  reading: "25 Min",
  writing: "30 Min",
  speaking: "16 Min"
};

const sectionMeta: Record<string, string> = {
  listening: "Teil 1, Teil 2, Teil 3 - Dialoge, Zuordnungen und Kurzansagen",
  reading: "Anzeigen, Gebaeudeplan, Lesetexte und Lueckentext",
  writing: "1 Pruefungsaufgabe mit Bewertung und Musterloesung",
  speaking: "Teil 1, Teil 2, Teil 3 - Vorstellung, Bildbeschreibung, Planung"
};

export function ExamsScreen() {
  return (
    <Screen contentContainerStyle={styles.container}>
      <InfoCard>
        <Text style={styles.eyebrow}>Pruefungen</Text>
        <Text style={styles.title}>Modellpruefungen</Text>
        <Text style={styles.body}>
          Die erste Modellpruefung ist jetzt auf die ueberarbeiteten Bereiche Hoeren, Lesen, Schreiben und Sprechen abgestimmt und komplett im Browser nutzbar.
        </Text>
        <PrimaryButton href="/exam/model-1" icon="clipboard-check-outline" label="Modellpruefung 1 oeffnen" />
      </InfoCard>

      <InfoCard>
        <Text style={styles.examTitle}>{phaseOneExamMeta.title}</Text>
        <Text style={styles.examMeta}>Status: vollstaendig fuer Phase 2</Text>
        <View style={styles.sectionList}>
          {phaseOneExamMeta.sections.map((section) => (
            <View key={section.id} style={styles.sectionRow}>
              <View style={styles.sectionText}>
                <Text style={styles.sectionName}>{section.title}</Text>
                <Text style={styles.sectionMeta}>
                  {sectionMeta[section.id]}
                </Text>
              </View>
              <Text style={styles.sectionTime}>{sectionTimes[section.id]}</Text>
            </View>
          ))}
        </View>
        <PrimaryButton href="/exam/model-1" icon="arrow-right" label="Zur Pruefungsuebersicht" />
      </InfoCard>

      <InfoCard>
        <Text style={styles.examTitle}>Naechster Ausbau</Text>
        <Text style={styles.body}>
          Nach Ihrer Freigabe werden 19 weitere Modellpruefungen mit gleicher Struktur, aber neuen Themen, Dialogen, Texten und Bildern ergaenzt.
        </Text>
        <View style={styles.sectionList}>
          <View style={styles.sectionRow}>
            <View style={styles.sectionText}>
              <Text style={styles.sectionName}>Geplanter Umfang</Text>
              <Text style={styles.sectionMeta}>20 vollstaendige Pruefungen ohne Wiederholungen</Text>
            </View>
          </View>
        </View>
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
    flex: 1,
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
