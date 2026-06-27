import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

import { colors, radius, spacing } from "../../core/theme";

export function InfoCard({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg
  }
});
