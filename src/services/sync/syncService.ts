export interface SyncService {
  isEnabled(): boolean;
  syncNow(): Promise<void>;
}

