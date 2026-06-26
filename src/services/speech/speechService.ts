export interface SpeechService {
  canRecord(): Promise<boolean>;
  canTranscribe(): Promise<boolean>;
}

