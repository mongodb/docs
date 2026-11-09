export interface ManifestEntry {
  sourceSha256: string;
  translatedAt: string;
  provider: string;
  model: string | null;
}

export interface Manifest {
  sourceRepository: string;
  sourceCommit: string | null;
  targetLocale: string;
  files: Record<string, ManifestEntry>;
}

export interface FilePlan {
  translate: string[];
  copy: string[];
  remove: string[];
  unchanged: string[];
}

export interface SyncFailure {
  file: string;
  error: string;
}

export interface SyncSummary {
  translated: string[];
  copied: string[];
  removed: string[];
  failures: SyncFailure[];
}
