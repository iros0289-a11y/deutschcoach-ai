import { useEffect, useMemo, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors, radius, spacing, typography } from "../../core/theme";

type PlaybackMode = "dialogue" | "announcement" | "narration";

type SimpleAudioPlayerProps = {
  text: string;
  durationLabel: string;
  title: string;
  playbackMode?: PlaybackMode;
};

function splitIntoSentences(text: string) {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .match(/[^.!?]+[.!?]?/g)
    ?.map((part) => part.trim())
    .filter(Boolean) ?? [text.trim()];
}

function chooseGermanVoice(voices: SpeechSynthesisVoice[]) {
  const germanVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith("de"));
  const rankedVoices = germanVoices.sort((left, right) => {
    const score = (voice: SpeechSynthesisVoice) => {
      const name = voice.name.toLowerCase();
      let value = 0;

      if (voice.default) {
        value += 6;
      }
      if (voice.localService) {
        value += 4;
      }
      if (name.includes("google deutsch") || name.includes("microsoft katja") || name.includes("microsoft conrad")) {
        value += 5;
      }
      if (name.includes("deutsch")) {
        value += 3;
      }
      if (name.includes("natural") || name.includes("online")) {
        value += 2;
      }

      return value;
    };

    return score(right) - score(left);
  });

  return rankedVoices[0];
}

function buildPlaybackText(text: string, playbackMode: PlaybackMode) {
  const normalized = text.replace(/\s+/g, " ").trim();

  if (!normalized) {
    return normalized;
  }

  if (normalized.includes(":")) {
    if (playbackMode === "dialogue") {
      return normalized
        .replace(/(?:Sprecher\s*[A-Z]|Partner|Ich|Frau\s+[A-ZÄÖÜ][a-zäöüß]+|Herr\s+[A-ZÄÖÜ][a-zäöüß]+)\s*:\s*/g, "")
        .replace(/([.!?])\s+/g, "$1  ");
    }

    return normalized
      .replace(/([A-Za-zÄÖÜäöüß]+):/g, "$1. ")
      .replace(/([.!?])\s+/g, "$1  ");
  }

  const sentences = splitIntoSentences(normalized);

  if (playbackMode === "announcement") {
    return sentences.join(" ... ");
  }

  if (playbackMode === "dialogue") {
    return sentences.join("  ");
  }

  return sentences.join("  ");
}

export function SimpleAudioPlayer({
  durationLabel,
  text,
  title,
  playbackMode = "narration"
}: SimpleAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const supported = useMemo(
    () => Platform.OS === "web" && typeof window !== "undefined" && "speechSynthesis" in window,
    []
  );
  const preparedText = useMemo(() => buildPlaybackText(text, playbackMode), [playbackMode, text]);
  const selectedVoice = useMemo(() => chooseGermanVoice(voices), [voices]);

  useEffect(() => {
    if (!supported) {
      return;
    }

    const updateVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    updateVoices();
    window.speechSynthesis.addEventListener("voiceschanged", updateVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", updateVoices);
    };
  }, [supported]);

  useEffect(() => {
    return () => {
      if (supported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [supported]);

  const startPlayback = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(preparedText);
    utterance.lang = "de-DE";
    utterance.rate = playbackMode === "announcement" ? 0.82 : 0.86;
    utterance.pitch = 1;
    utterance.volume = 1;
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    }
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
