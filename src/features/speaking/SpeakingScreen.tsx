import { useEffect, useMemo, useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../../core/theme";
import { assessSpeakingResponse, type SpeakingAssessment } from "../../domain/scoring/speakingAssessment";
import {
  speakingIntroPractice,
  speakingPhotoPractice,
  speakingPlanningPractice,
  type SpeakingPlanningPractice,
  type SpeakingPhotoPractice
} from "../../data/content/speakingContent";
import { createSpeechCaptureSession, isSpeechRecognitionSupported } from "../../services/speech/speechService";
import { InfoCard } from "../../ui/components/InfoCard";
import { Screen } from "../../ui/components/Screen";
import { SimpleAudioPlayer } from "../../ui/components/SimpleAudioPlayer";
import { useAppState } from "../app-state/AppStateProvider";

type RecorderPanelProps = {
  title: string;
  transcript: string;
  recording: boolean;
  supported: boolean;
  durationLabel: string | undefined;
  onStart: () => void;
  onStop: () => void;
};

function FeedbackPanel({
  heading,
  accentColor = colors.speaking,
  lines
}: {
  heading: string;
  accentColor?: string;
  lines: string[];
}) {
  return (
    <View style={styles.feedbackCard}>
      <Text style={[styles.feedbackTitle, { color: accentColor }]}>{heading}</Text>
      {lines.map((line) => (
        <Text key={line} style={styles.feedbackBody}>
          {line}
        </Text>
      ))}
    </View>
  );
}

function AssessmentCard({ assessment }: { assessment: SpeakingAssessment }) {
  return (
    <View style={styles.assessmentWrap}>
      <Text style={styles.referenceTitle}>Lokale Bewertung</Text>
      <Text style={styles.scoreLine}>
        Geschätzte Punktzahl: {assessment.estimatedPoints} / {assessment.maxPoints}
      </Text>
      <Text style={styles.scoreLine}>Geschätztes Niveau: {assessment.estimatedLevel}</Text>

      <View style={styles.criteriaGrid}>
        {assessment.criteria.map((criterion) => (
          <View key={criterion.id} style={styles.criteriaCard}>
            <Text style={styles.referenceTitle}>{criterion.label}</Text>
            <Text style={styles.criteriaScore}>
              {criterion.score} / {criterion.maxScore}
            </Text>
            <Text style={styles.referenceText}>{criterion.comment}</Text>
          </View>
        ))}
      </View>

      {assessment.strengths.length > 0 ? (
        <FeedbackPanel
          heading="Stärken"
          accentColor={colors.success}
          lines={assessment.strengths.map((item) => `• ${item}`)}
        />
      ) : null}

      {assessment.improvements.length > 0 ? (
        <FeedbackPanel
          heading="Darauf sollten Sie noch achten"
          accentColor={colors.warning}
          lines={assessment.improvements.map((item) => `• ${item}`)}
        />
      ) : null}
    </View>
  );
}

function RecorderPanel({
  title,
  transcript,
  recording,
  supported,
  durationLabel,
  onStart,
  onStop
}: RecorderPanelProps) {
  return (
    <View style={styles.recorderCard}>
      <Text style={styles.referenceTitle}>{title}</Text>
      <View style={styles.recorderRow}>
        <Pressable
          disabled={!supported || recording}
          onPress={onStart}
          style={({ pressed }) => [
            styles.recordButton,
            (!supported || recording) && styles.recordButtonDisabled,
            pressed && supported && !recording && styles.recordButtonPressed
          ]}
        >
          <Text style={styles.recordButtonText}>Aufnahme starten</Text>
        </Pressable>
        <Pressable
          disabled={!supported || !recording}
          onPress={onStop}
          style={({ pressed }) => [
            styles.stopButton,
            (!supported || !recording) && styles.recordButtonDisabled,
            pressed && supported && recording && styles.recordButtonPressed
          ]}
        >
          <Text style={styles.stopButtonText}>Aufnahme stoppen</Text>
        </Pressable>
      </View>
      <Text style={styles.statusText}>
        {supported
          ? recording
            ? "Aufnahme läuft. Bitte sprechen Sie frei und vollständig."
            : durationLabel
              ? `Letzte Aufnahme: ${durationLabel}`
              : "Bereit für eine neue Aufnahme."
          : "Sprachaufnahme wird in diesem Browser nicht unterstützt."}
      </Text>
      <Text style={styles.transcriptBox}>{transcript || "Hier erscheint nach der Aufnahme Ihr erkannter Text."}</Text>
    </View>
  );
}

export function SpeakingScreen() {
  const { submitAnswer } = useAppState();
  const initialPhoto = useMemo(
    () => speakingPhotoPractice.find((prompt) => prompt.isExamTask)?.id ?? speakingPhotoPractice[0]?.id,
    []
  );
  const initialPlan = useMemo(
    () => speakingPlanningPractice.find((task) => task.isExamTask)?.id ?? speakingPlanningPractice[0]?.id,
    []
  );

  const [selectedPhotoId, setSelectedPhotoId] = useState(initialPhoto);
  const [selectedPlanId, setSelectedPlanId] = useState(initialPlan);
  const [recordingTarget, setRecordingTarget] = useState<string | null>(null);
  const [transcripts, setTranscripts] = useState<Record<string, string>>({});
  const [durations, setDurations] = useState<Record<string, number>>({});
  const [assessments, setAssessments] = useState<Record<string, SpeakingAssessment>>({});
  const supported = useMemo(() => isSpeechRecognitionSupported(), []);
  const sessionRef = useRef<ReturnType<typeof createSpeechCaptureSession> | null>(null);

  const photo =
    speakingPhotoPractice.find((entry) => entry.id === selectedPhotoId) ?? speakingPhotoPractice[0];
  const plan =
    speakingPlanningPractice.find((entry) => entry.id === selectedPlanId) ?? speakingPlanningPractice[0];
  const introAssessment = assessments["intro"];
  const photoAssessment = assessments[photo?.id ?? ""];
  const planAssessment = assessments[plan?.id ?? ""];

  useEffect(() => {
    return () => {
      sessionRef.current = null;
    };
  }, []);

  if (!photo || !plan) {
    return null;
  }

  const startRecording = (targetId: string) => {
    if (!supported || recordingTarget) {
      return;
    }

    sessionRef.current = createSpeechCaptureSession((transcript) => {
      setTranscripts((current) => ({ ...current, [targetId]: transcript }));
    });
    setRecordingTarget(targetId);
    sessionRef.current.start();
  };

  const stopRecording = async (targetId: string) => {
    if (!sessionRef.current) {
      return;
    }

    const result = await sessionRef.current.stop();
    sessionRef.current = null;
    setRecordingTarget(null);
    setDurations((current) => ({ ...current, [targetId]: result.durationSeconds }));
  };

  const evaluateIntro = () => {
    const transcript = transcripts["intro"] ?? "";
    const durationSeconds = durations["intro"] ?? 0;
    const assessment = assessSpeakingResponse({
      transcript,
      durationSeconds,
      expectedKeywords: speakingIntroPractice.expectedKeywords
    });

    setAssessments((current) => ({ ...current, intro: assessment }));
    submitAnswer({
      taskId: "speaking-intro",
      skill: "speaking",
      mode: "learning",
      result:
        assessment.estimatedPoints >= 14
          ? "correct"
          : assessment.estimatedPoints >= 10
            ? "partial"
            : "incorrect",
      freeText: transcript,
      score: assessment.estimatedPoints,
      maxScore: assessment.maxPoints,
      reason: "self-assessment"
    });
  };

  const evaluatePhoto = (item: SpeakingPhotoPractice) => {
    const transcript = transcripts[item.id] ?? "";
    const durationSeconds = durations[item.id] ?? 0;
    const assessment = assessSpeakingResponse({
      transcript,
      durationSeconds,
      expectedKeywords: item.expectedKeywords
    });

    setAssessments((current) => ({ ...current, [item.id]: assessment }));
    submitAnswer({
      taskId: item.id,
      skill: "speaking",
      mode: "learning",
      result:
        assessment.estimatedPoints >= 14
          ? "correct"
          : assessment.estimatedPoints >= 10
            ? "partial"
            : "incorrect",
      freeText: transcript,
      score: assessment.estimatedPoints,
      maxScore: assessment.maxPoints,
      reason: "self-assessment"
    });
  };

  const evaluatePlan = (item: SpeakingPlanningPractice) => {
    const responseStepIds = item.dialogueSteps
      .filter((step) => step.speaker === "user")
      .map((step) => step.id);
    const transcript = responseStepIds.map((id) => transcripts[id] ?? "").join(" ").trim();
    const durationSeconds = responseStepIds.reduce((sum, id) => sum + (durations[id] ?? 0), 0);
    const assessment = assessSpeakingResponse({
      transcript,
      durationSeconds,
      expectedKeywords: item.expectedKeywords
    });

    setAssessments((current) => ({ ...current, [item.id]: assessment }));
    submitAnswer({
      taskId: item.id,
      skill: "speaking",
      mode: "learning",
      result:
        assessment.estimatedPoints >= 14
          ? "correct"
          : assessment.estimatedPoints >= 10
            ? "partial"
            : "incorrect",
      freeText: transcript,
      score: assessment.estimatedPoints,
      maxScore: assessment.maxPoints,
      reason: "self-assessment"
    });
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <InfoCard>
        <Text style={styles.eyebrow}>DTZ</Text>
        <Text style={styles.title}>Sprechen</Text>
        <Text style={styles.body}>
          Teil 1: sich vorstellen. Teil 2: Bildbeschreibung. Teil 3: gemeinsam planen als Dialog.
        </Text>
      </InfoCard>

      <InfoCard>
        <Text style={styles.partLabel}>Teil 1</Text>
        <Text style={styles.sectionTitle}>Sich vorstellen</Text>
        {speakingIntroPractice.prompts.map((prompt) => (
          <Text key={prompt} style={styles.referenceText}>
            • {prompt}
          </Text>
        ))}
        <View style={styles.phraseCard}>
          <Text style={styles.referenceTitle}>Redemittel</Text>
          {speakingIntroPractice.phraseBank.map((phrase) => (
            <Text key={phrase} style={styles.referenceText}>
              • {phrase}
            </Text>
          ))}
        </View>
        <RecorderPanel
          title="Ihre Aufnahme"
          transcript={transcripts["intro"] ?? ""}
          recording={recordingTarget === "intro"}
          supported={supported}
          durationLabel={durations["intro"] ? `${durations["intro"]} Sek.` : undefined}
          onStart={() => startRecording("intro")}
          onStop={() => void stopRecording("intro")}
        />
        <Pressable onPress={evaluateIntro} style={({ pressed }) => [styles.primaryAction, pressed && styles.primaryActionPressed]}>
          <Text style={styles.primaryActionText}>Antwort prüfen</Text>
        </Pressable>
        {introAssessment ? <AssessmentCard assessment={introAssessment} /> : null}
        <View style={styles.phraseCard}>
          <Text style={styles.referenceTitle}>Musterlösung als Text</Text>
          <Text style={styles.longText}>{speakingIntroPractice.expandedSampleAnswer}</Text>
        </View>
        <SimpleAudioPlayer
          durationLabel="00:38"
          text={speakingIntroPractice.expandedSampleAnswer}
          title="Musterlösung anhören"
          playbackMode="narration"
        />
      </InfoCard>

      <InfoCard>
        <Text style={styles.partLabel}>Teil 2</Text>
        <Text style={styles.sectionTitle}>Bildbeschreibung</Text>
        <View style={styles.photoGrid}>
          {speakingPhotoPractice.map((entry) => {
            const active = entry.id === photo.id;
            return (
              <Pressable
                key={entry.id}
                onPress={() => setSelectedPhotoId(entry.id)}
                style={({ pressed }) => [
                  styles.photoThumb,
                  active && styles.photoThumbActive,
                  pressed && styles.photoThumbPressed
                ]}
              >
                <Image source={entry.image} resizeMode="contain" style={styles.photoThumbImage} />
                <Text style={styles.photoThumbText}>{entry.sceneLabel}</Text>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.photoDetail}>
          <Image source={photo.largeImage} resizeMode="contain" style={styles.photoLarge} />
          <View style={styles.photoInfo}>
            <Text style={styles.referenceTitle}>{photo.title}</Text>
            {photo.responsePrompts.map((question) => (
              <Text key={question} style={styles.referenceText}>
                • {question}
              </Text>
            ))}
            <View style={styles.phraseCard}>
              <Text style={styles.referenceTitle}>Redemittel</Text>
              {photo.phraseBank.map((phrase) => (
                <Text key={phrase} style={styles.referenceText}>
                  • {phrase}
                </Text>
              ))}
            </View>
            <RecorderPanel
              title="Ihre Aufnahme zur Bildbeschreibung"
              transcript={transcripts[photo.id] ?? ""}
              recording={recordingTarget === photo.id}
              supported={supported}
              durationLabel={durations[photo.id] ? `${durations[photo.id]} Sek.` : undefined}
              onStart={() => startRecording(photo.id)}
              onStop={() => void stopRecording(photo.id)}
            />
            <Pressable onPress={() => evaluatePhoto(photo)} style={({ pressed }) => [styles.primaryAction, pressed && styles.primaryActionPressed]}>
              <Text style={styles.primaryActionText}>Antwort prüfen</Text>
            </Pressable>
            {photoAssessment ? <AssessmentCard assessment={photoAssessment} /> : null}
            <View style={styles.phraseCard}>
              <Text style={styles.referenceTitle}>Musterlösung als Text</Text>
              <Text style={styles.longText}>{photo.expandedSampleAnswer}</Text>
            </View>
            <SimpleAudioPlayer
              durationLabel="00:34"
              text={photo.expandedSampleAnswer}
              title="Musterlösung anhören"
              playbackMode="narration"
            />
          </View>
        </View>
      </InfoCard>

      <InfoCard>
        <Text style={styles.partLabel}>Teil 3</Text>
        <Text style={styles.sectionTitle}>Gemeinsam planen</Text>
        <View style={styles.choiceWrap}>
          {speakingPlanningPractice.map((entry) => {
            const active = entry.id === plan.id;
            return (
              <Pressable
                key={entry.id}
                onPress={() => setSelectedPlanId(entry.id)}
                style={({ pressed }) => [
                  styles.choiceChip,
                  active && styles.choiceChipSelected,
                  pressed && styles.photoThumbPressed
                ]}
              >
                <Text style={[styles.choiceChipText, active && styles.choiceChipTextSelected]}>
                  {entry.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={styles.longText}>{plan.setting}</Text>
        <View style={styles.roleGrid}>
          <View style={styles.roleCard}>
            <Text style={styles.referenceTitle}>Ihre Rolle</Text>
            {plan.roleA.map((item) => (
              <Text key={item} style={styles.referenceText}>
                • {item}
              </Text>
            ))}
          </View>
          <View style={styles.roleCard}>
            <Text style={styles.referenceTitle}>Rolle des Partners</Text>
            {plan.roleB.map((item) => (
              <Text key={item} style={styles.referenceText}>
                • {item}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.dialogueStack}>
          {plan.dialogueSteps.map((step) =>
            step.speaker === "partner" ? (
              <View key={step.id} style={styles.partnerBubble}>
                <Text style={styles.partnerLabel}>Virtueller Partner</Text>
                <Text style={styles.referenceText}>{step.text}</Text>
              </View>
            ) : (
              <RecorderPanel
                key={step.id}
                title="Ihre mündliche Antwort"
                transcript={transcripts[step.id] ?? ""}
                recording={recordingTarget === step.id}
                supported={supported}
                durationLabel={durations[step.id] ? `${durations[step.id]} Sek.` : undefined}
                onStart={() => startRecording(step.id)}
                onStop={() => void stopRecording(step.id)}
              />
            )
          )}
        </View>
        <View style={styles.phraseCard}>
          <Text style={styles.referenceTitle}>Nützliche Redemittel</Text>
          {plan.usefulPhrases.map((phrase) => (
            <Text key={phrase} style={styles.referenceText}>
              • {phrase}
            </Text>
          ))}
        </View>
        <Pressable onPress={() => evaluatePlan(plan)} style={({ pressed }) => [styles.primaryAction, pressed && styles.primaryActionPressed]}>
          <Text style={styles.primaryActionText}>Antwort prüfen</Text>
        </Pressable>
        {planAssessment ? <AssessmentCard assessment={planAssessment} /> : null}
        <View style={styles.phraseCard}>
          <Text style={styles.referenceTitle}>Musterdialog als Text</Text>
          <Text style={styles.longText}>{plan.sampleDialogue}</Text>
        </View>
        <SimpleAudioPlayer
          durationLabel="00:42"
          text={plan.sampleDialogue}
          title="Musterdialog anhören"
          playbackMode="dialogue"
        />
      </InfoCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.lg },
  eyebrow: { ...typography.caption, color: colors.secondary, textTransform: "uppercase" },
  title: { ...typography.screenTitle, color: colors.textPrimary },
  body: { ...typography.body, color: colors.textSecondary },
  partLabel: { ...typography.caption, color: colors.speaking, textTransform: "uppercase" },
  sectionTitle: { ...typography.sectionTitle, color: colors.textPrimary },
  referenceTitle: { ...typography.bodyStrong, color: colors.textPrimary },
  referenceText: { ...typography.body, color: colors.textSecondary },
  phraseCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.xs,
    padding: spacing.md
  },
  longText: {
    ...typography.body,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    color: colors.textPrimary,
    padding: spacing.md
  },
  recorderCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.sm,
    padding: spacing.md
  },
  recorderRow: {
    flexDirection: "row",
    gap: spacing.sm
  },
  recordButton: {
    alignItems: "center",
    backgroundColor: colors.speaking,
    borderRadius: radius.md,
    flex: 1,
    justifyContent: "center",
    minHeight: 46,
    paddingHorizontal: spacing.md
  },
  stopButton: {
    alignItems: "center",
    backgroundColor: colors.danger,
    borderRadius: radius.md,
    flex: 1,
    justifyContent: "center",
    minHeight: 46,
    paddingHorizontal: spacing.md
  },
  recordButtonDisabled: {
    opacity: 0.45
  },
  recordButtonPressed: {
    opacity: 0.9
  },
  recordButtonText: { ...typography.caption, color: colors.surface },
  stopButtonText: { ...typography.caption, color: colors.surface },
  statusText: { ...typography.caption, color: colors.textMuted },
  transcriptBox: {
    ...typography.body,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    color: colors.textPrimary,
    minHeight: 100,
    padding: spacing.md
  },
  primaryAction: {
    alignItems: "center",
    backgroundColor: colors.speaking,
    borderRadius: radius.md,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: spacing.lg
  },
  primaryActionPressed: { opacity: 0.9 },
  primaryActionText: { ...typography.bodyStrong, color: colors.surface },
  assessmentWrap: { gap: spacing.md },
  scoreLine: { ...typography.bodyStrong, color: colors.textPrimary },
  criteriaGrid: { gap: spacing.md },
  criteriaCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.xs,
    padding: spacing.md
  },
  criteriaScore: { ...typography.bodyStrong, color: colors.speaking },
  feedbackCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.xs,
    padding: spacing.md
  },
  feedbackTitle: { ...typography.bodyStrong },
  feedbackBody: { ...typography.body, color: colors.textPrimary },
  photoGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  photoThumb: {
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexBasis: "31%",
    overflow: "hidden"
  },
  photoThumbActive: { borderColor: colors.speaking, backgroundColor: "#F3E8FF" },
  photoThumbPressed: { opacity: 0.84 },
  photoThumbImage: {
    backgroundColor: colors.background,
    height: 96,
    width: "100%"
  },
  photoThumbText: {
    ...typography.caption,
    color: colors.textPrimary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm
  },
  photoDetail: { gap: spacing.md },
  photoLarge: {
    alignSelf: "center",
    aspectRatio: 16 / 11,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    maxWidth: 720,
    minHeight: 240,
    width: "100%"
  },
  photoInfo: { gap: spacing.md },
  choiceWrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  choiceChip: {
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  choiceChipSelected: { backgroundColor: "#F3E8FF", borderColor: colors.speaking },
  choiceChipText: { ...typography.caption, color: colors.textPrimary },
  choiceChipTextSelected: { color: colors.speaking },
  roleGrid: { gap: spacing.md },
  roleCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    gap: spacing.xs,
    padding: spacing.md
  },
  dialogueStack: { gap: spacing.md },
  partnerBubble: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md
  },
  partnerLabel: { ...typography.caption, color: colors.speaking, textTransform: "uppercase" }
});
