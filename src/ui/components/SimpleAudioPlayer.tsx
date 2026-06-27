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
  const [isPaused, setIsPaused] = useState(false);
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

  const startPlayback = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.92;
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };
    setIsPlaying(true);
    setIsPaused(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleToggle = () => {
    if (!supported) {
      return;
    }

    if (!isPlaying) {
      startPlayback();
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const handleRestart = () => {
    if (!supported) {
      return;
    }

    startPlayback();
  };

  return (
    <View style={styles.player}>
      <View style={styles.row}>
        <View style={styles.metaColumn}>
          <Text style={styles.playerTitle}>{title}</Text>
          <Text style={styles.playerMeta}>{durationLabel}</Text>
        </View>
        <Pressable
          accessibilityLabel={isPlaying ? (isPaused ? "Audio fortsetzen" : "Audio pausieren") : "Audio abspielen"}
          onPress={handleToggle}
          style={({ pressed }) => [styles.iconButton, pressed && styles.iconButtonPressed]}
        >
          <MaterialCommunityIcons
            color={colors.surface}
            name={isPlaying ? (isPaused ? "play" : "pause") : "play"}
            size={22}
          />
        </Pressable>
      </View>

      <View style={styles.actionRow}>
        <Pressable
          accessibilityLabel="Hörtext neu starten"
          onPress={handleRestart}
          style={({ pressed }) => [
            styles.secondaryAction,
            !supported && styles.secondaryActionDisabled,
            pressed && supported && styles.secondaryActionPressed
          ]}
        >
          <MaterialCommunityIcons color={colors.primary} name="restart" size={18} />
          <Text style={styles.secondaryActionText}>Neu starten</Text>
        </Pressable>
        {isPlaying ? (
          <Text style={styles.statusText}>{isPaused ? "Pausiert" : "Wird vorgelesen"}</Text>
        ) : (
          <Text style={styles.statusText}>Bereit</Text>
        )}
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
  metaColumn: {
    flex: 1,
    gap: 2,
    paddingRight: spacing.md
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
  actionRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between"
  },
  secondaryAction: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  secondaryActionPressed: {
    opacity: 0.82
  },
  secondaryActionDisabled: {
    opacity: 0.5
  },
  secondaryActionText: {
    ...typography.caption,
    color: colors.primary
  },
  statusText: {
    ...typography.caption,
    color: colors.textMuted
  },
  helper: {
    ...typography.caption,
    color: colors.textSecondary
  }
});
