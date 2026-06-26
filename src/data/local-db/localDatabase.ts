export type LocalDatabaseStatus = "idle" | "opening" | "ready" | "failed";

export interface LocalDatabase {
  status: LocalDatabaseStatus;
  open(): Promise<void>;
  close(): Promise<void>;
}

