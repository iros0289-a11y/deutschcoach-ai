import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { Href } from "expo-router";
import { Link } from "expo-router";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../../core/theme";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

export type FeatureTileData = {
  title: string;
  subtitle: string;
  icon: IconName;
  color: string;
  href: Href;
};

export function FeatureTile({ color, href, icon, subtitle, title }: FeatureTileData) {
  return (
    <Link asChild href={href}>
      <Pressable style={({ pressed }) => [styles.tile, pressed && styles.pressed]}>
        <View style={[styles.iconBox, { backgroundColor: `${color}18` }]}>
          <MaterialCommunityIcons color={color} name={icon} size={28} />
        </View>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={2} style={styles.subtitle}>
          {subtitle}
        </Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexBasis: "47%",
    flexGrow: 1,
    gap: spacing.sm,
    minHeight: 146,
    padding: spacing.lg
  },
  pressed: {
    opacity: 0.78
  },
  iconBox: {
    alignItems: "center",
    borderRadius: radius.md,
    height: 48,
    justifyContent: "center",
    width: 48
  },
  title: {
    ...typography.bodyStrong,
    color: colors.textPrimary
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary
  }
});
