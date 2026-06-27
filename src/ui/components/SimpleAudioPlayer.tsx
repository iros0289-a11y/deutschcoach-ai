import { useEffect, useMemo, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors, radius, spacing, typography } from "../../core/theme";

type SimpleAudioPlayerProps = {
  text: string;
  durationLabel: string;
  title: string;
};

export function SimpleAudioPlayer({ durationLabel, text, title }: SimpleAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const supported = useMemo(
    () => Platform.OS === "web" && typeof window !== "undefined" && "speechSynthesis" in window,
    []
  );

  useEffect(() => {
    return () => {
      if (supported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [supported]);

  const handleToggle = () => {
    if (!supported) {
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.92;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <View style={styles.player}>
      <View style={styles.row}>
        <View>
          <Text style={styles.playerTitle}>{title}</Text>
          <Text style={styles.playerMeta}>{durationLabel}</Text>
        </View>
        <Pressable
          accessibilityLabel={isPlaying ? "Audio stoppen" : "Audio abspielen"}
          onPress={handleToggle}
          style={({ pressed }) => [styles.iconButton, pressed && styles.iconButtonPressed]}
        >
          <MaterialCommunityIcons
            color={colors.surface}
            name={isPlaying ? "stop" : "play"}
            size={22}
          />
        </Pressable>
      </View>
      <View style={styles.track}>
        <View style={[styles.progress, isPlaying && styles.progressActive]} />
      </View>
      <Text style={styles.helper}>
        {supported
          ? "Die Web-App liest den Hörtext mit der Web Speech API vor."
          : "Audio ist in dieser Umgebung nicht verfügbar. Sie können den Text trotzdem lesen und bearbeiten."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  player: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.sm,
    padding: spacing.md
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  playerTitle: {
    ...typography.bodyStrong,
    color: colors.textPrimary
  },
  playerMeta: {
    ...typography.caption,
    color: colors.textSecondary
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 999,
    height: 42,
    justifyContent: "center",
    width: 42
  },
  iconButtonPressed: {
    backgroundColor: colors.primaryPressed
  },
  track: {
    backgroundColor: colors.border,
    borderRadius: 999,
    height: 8,
    overflow: "hidden"
  },
  progress: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    height: 8,
    width: "32%"
  },
  progressActive: {
    width: "76%"
  },
  helper: {
    ...typography.caption,
    color: colors.textSecondary
  }
});
