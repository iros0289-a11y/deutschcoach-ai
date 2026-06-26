import { StyleSheet, View } from "react-native";

import { colors, radius } from "../../core/theme";

type ProgressBarProps = {
  value: number;
};

export function ProgressBar({ value }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(1, value));

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${safeValue * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.sm,
    height: 12,
    overflow: "hidden",
    width: "100%"
  },
  fill: {
    backgroundColor: colors.success,
    borderRadius: radius.sm,
    height: "100%"
  }
});

