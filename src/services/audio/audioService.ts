export type AudioPlaybackStatus = "idle" | "loading" | "ready" | "playing" | "paused" | "ended";

export interface AudioService {
  load(assetId: string): Promise<void>;
  play(): Promise<void>;
  pause(): Promise<void>;
  seekTo(seconds: number): Promise<void>;
  getStatus(): AudioPlaybackStatus;
}

