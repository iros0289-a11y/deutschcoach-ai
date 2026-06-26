import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, spacing } from "../../core/theme";

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
}>;

export function Screen({ children, contentContainerStyle, scroll = true }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const containerStyle = [
    styles.content,
    {
      paddingBottom: insets.bottom + spacing.xl,
      paddingTop: insets.top + spacing.lg
    },
    contentContainerStyle
  ];

  if (!scroll) {
    return <View style={[styles.root, containerStyle]}>{children}</View>;
  }

  return (
    <ScrollView
      alwaysBounceVertical={false}
      contentContainerStyle={containerStyle}
      style={styles.root}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.background,
    flex: 1
  },
  content: {
    paddingHorizontal: spacing.lg
  }
});

