import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { Href } from "expo-router";
import { useRouter } from "expo-router";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { colors, radius, spacing, typography } from "../../core/theme";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

type PrimaryButtonProps = {
  label: string;
  icon?: IconName;
  href?: Href;
  onPress?: () => void;
};

export function PrimaryButton({ href, icon, label, onPress }: PrimaryButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    if (href) {
      router.push(href);
    }
  };

  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={handlePress}>
      {icon ? <MaterialCommunityIcons color={colors.surface} name={icon} size={24} /> : null}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
    minHeight: 54,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md
  },
  pressed: {
    backgroundColor: colors.primaryPressed
  },
  label: {
    ...typography.bodyStrong,
    color: colors.surface
  }
});

