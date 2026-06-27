import { Platform } from "react-native";

export interface SpeechService {
  canRecord(): Promise<boolean>;
  canTranscribe(): Promise<boolean>;
}

type BrowserRecognition = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onerror: null | ((event: { error?: string }) => void);
  onresult: null | ((event: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void);
  onend: null | (() => void);
  start: () => void;
  stop: () => void;
};

type BrowserWindow = Window &
  typeof globalThis & {
    SpeechRecognition?: new () => BrowserRecognition;
    webkitSpeechRecognition?: new () => BrowserRecognition;
  };

export type SpeechCaptureResult = {
  transcript: string;
  durationSeconds: number;
};

function getBrowserWindow() {
  if (Platform.OS !== "web" || typeof window === "undefined") {
    return null;
  }

  return window as BrowserWindow;
}

export function isSpeechRecognitionSupported() {
  const browserWindow = getBrowserWindow();
  if (!browserWindow) {
    return false;
  }

  return Boolean(browserWindow.SpeechRecognition || browserWindow.webkitSpeechRecognition);
}

export function createSpeechCaptureSession(onTranscript: (transcript: string) => void) {
  const browserWindow = getBrowserWindow();
  const RecognitionCtor = browserWindow?.SpeechRecognition ?? browserWindow?.webkitSpeechRecognition;
  const recognition = RecognitionCtor ? new RecognitionCtor() : null;
  let transcript = "";
  let startedAt = 0;
  let finished = false;

  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "de-DE";
    recognition.onresult = (event) => {
      const chunks: string[] = [];
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const candidate = event.results[index]?.[0]?.transcript;
        if (candidate) {
          chunks.push(candidate);
        }
      }

      transcript = chunks.join(" ").trim();
      onTranscript(transcript);
    };
  }

  return {
    supported: Boolean(recognition),
    start() {
      finished = false;
      transcript = "";
      startedAt = Date.now();
      onTranscript("");
      recognition?.start();
    },
    async stop(): Promise<SpeechCaptureResult> {
      if (!recognition || finished) {
        return {
          transcript,
          durationSeconds: startedAt > 0 ? Math.max(1, Math.round((Date.now() - startedAt) / 1000)) : 0
        };
      }

      finished = true;
      recognition.stop();
      return {
        transcript,
        durationSeconds: startedAt > 0 ? Math.max(1, Math.round((Date.now() - startedAt) / 1000)) : 0
      };
    }
  };
}
