export interface ServerSideChangelogData {
  changelogMetadata: AtlasAdminApiChangelogMetadata;
  changelog: AtlasAdminApiChangelogType;
  changelogResourcesList: string[];
  mostRecentDiff: {
    mostRecentDiffLabel: string;
    mostRecentDiffData: AtlasAdminApiChangelogDiff;
  };
}

/* Metadata */

export interface AtlasAdminApiChangelogMetadata {
  runDate: string;
  specRevision: string;
  specRevisionShort: string;
  versions: string[];
}

/* Shared Change type */

export interface AtlasAdminApiChangeEntry {
  change: string;
  changeCode: string;
  backwardCompatible: boolean;
  hideFromChangelog?: boolean;
}

/* Main Changelog types */

export type AtlasAdminApiChangelogType = AtlasAdminApiChangeDateEntry[];

export interface AtlasAdminApiChangeDateEntry {
  date: string;
  paths: AtlasAdminApiPathEntry[];
}

export interface AtlasAdminApiPathEntry {
  path: string;
  httpMethod: string;
  operationId: string;
  tag: string;
  versions: AtlasAdminApiVersionEntry[];
}

export interface AtlasAdminApiVersionEntry {
  version: string;
  changes: AtlasAdminApiChangeEntry[];
  stabilityLevel: string;
  changeType: 'release' | 'deprecate' | 'update' | 'removed';
}

/* Diff types */

export type AtlasAdminApiChangelogDiff = AtlasAdminApiChangeDiffEntry[];

export interface AtlasAdminApiChangeDiffEntry {
  path: string;
  httpMethod: string;
  operationId: string;
  tag: string;
  changes: AtlasAdminApiChangeEntry[];
}
