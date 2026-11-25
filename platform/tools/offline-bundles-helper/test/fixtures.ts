import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { AllContentData, ContentBundleData } from '../src/types.js';

export const TOC_DIR_RELATIVE =
  'platform/docs-site/src/context/table-of-contents/offline-docs';

export const version = (versionName: string, active = true) => ({
  versionName,
  active,
  versionSelectorLabel: versionName,
  stable: false,
  noIndexing: false,
});

export const docset = (
  project: string,
  versions: ReturnType<typeof version>[],
) => ({
  project,
  displayName: project,
  prefix: project,
  internalOnly: false,
  versions,
});

export const contentEntry = (
  projectName: string,
  versionName: string,
  active = true,
): ContentBundleData[string] => ({
  projectName,
  projectDirName: projectName,
  versionName,
  active,
  changed: false,
  shouldRebuild: false,
  fullPath: '',
});

export const makeContentData = (
  overrides: Partial<AllContentData> = {},
): AllContentData => ({
  docsetsByProject: {},
  pathsToBuild: [],
  docsPaths: {},
  ...overrides,
});

/** A page item like the ones in the offline TOC files. */
export const tocItem = (contentSite: string) =>
  `{ label: 'Page', contentSite: '${contentSite}', url: '/docs/${contentSite}' }`;

/** Writes TOC files into a temp repo and returns the paths the functions need. */
export const makeTocDir = (files: Record<string, string>) => {
  const repoRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'offline-bundles-'));
  const offlineDocsDir = path.join(repoRoot, TOC_DIR_RELATIVE);
  fs.mkdirSync(offlineDocsDir, { recursive: true });
  for (const [name, source] of Object.entries(files)) {
    fs.writeFileSync(path.join(offlineDocsDir, name), source);
  }
  return { repoRoot, offlineDocsDir };
};
