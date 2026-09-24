/**
 * Builds the set of {localPath, key} entries to upload to S3 for every
 * per-project llms*.txt file `generate()` has already written under
 * outputDir.
 *
 * The root llms.txt (docs/llms.txt) is never part of that set. It's
 * hand-maintained in git and published only from a merged change, so the
 * one caller that means to publish it (`pnpm upload`) asks for it
 * explicitly via `rootLlmsUploadEntry`. A site build has no way to include
 * it by accident.
 *
 * S3 keys mirror each file's production URL path (minus the
 * https://www.mongodb.com host), matching the existing convention of
 * `s3Prefix = 'docs/offline/'` etc. in
 * platform/nextjs-extension/src/offline-docs/index.ts: e.g. the "manual"
 * project's part 1 becomes "docs/manual/manual-1-llms.txt".
 *
 * Also warns (doesn't fail) if any file about to be uploaded isn't actually
 * linked from the hand-maintained root llms.txt yet: that index is what
 * makes a project/part discoverable to an agent starting from
 * https://www.mongodb.com/docs/llms.txt, so a file that exists on disk (or
 * in S3) but isn't linked there is effectively invisible. This most often
 * happens when a project is newly split into more parts than before (e.g.
 * "manual" going from 5 to 9 parts) and the root llms.txt wasn't updated to
 * match.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { PRODUCTION_BASE_URL } from './types.js';
import { currentSourceDir } from './projectInfo.js';
import { getUrlSlugForDir, loadDirNameToPrefixMap } from './urlResolver.js';

export interface UploadManifestOptions {
  /**
   * Limit the manifest to a single content directory (e.g. "atlas"), the
   * way `generate --for-project` limits generation. Used by the per-deploy
   * publish path, which only ever builds the one project that site serves.
   */
  forProject?: string;
  /**
   * Where to read the root llms.txt from, for the "is this file linked?"
   * warning only - it is never added to the manifest. Defaults to
   * `<outputDir>/llms.txt`; callers that generate into a throwaway
   * directory point this at the git-tracked copy instead. If it's missing,
   * the check is skipped with a warning.
   */
  rootLlmsPath?: string;
  /** Absolute path override for dir-name-to-prefix.json (see urlResolver). */
  dirNameToPrefixPath?: string;
}

export interface UploadEntry {
  /** Absolute local path to the generated file. */
  localPath: string;
  /** S3 object key (path within the bucket), e.g. "docs/manual/manual-1-llms.txt". */
  key: string;
}

/**
 * The root "docs/llms.txt" key is reserved for the hand-maintained root
 * llms.txt, which links out to every project's own llms.txt. The `landing`
 * project (content/landing, the docs homepage) also generates a file that
 * would resolve to that same key; it's excluded here so it can never
 * overwrite the root llms.txt. See llms-output/llms.txt itself for the
 * index's content.
 */
const ROOT_LLMS_FILENAME = 'llms.txt';
const ROOT_LLMS_KEY = 'docs/llms.txt';
const EXCLUDED_FROM_UPLOAD = new Set(['landing']);

/**
 * Whether a project's generated file is deliberately never uploaded.
 * Exported so callers can skip the work up front instead of generating a
 * file only to drop it from the manifest.
 */
export function isExcludedFromUpload(project: string): boolean {
  return EXCLUDED_FROM_UPLOAD.has(project);
}

function buildFileKey(urlSlug: string, version: string, filename: string): string {
  const parts = ['docs'];
  if (urlSlug !== '') {
    parts.push(urlSlug);
  }
  if (version !== '') {
    parts.push(version);
  }
  parts.push(filename);
  return parts.join('/');
}

async function isDirectory(candidate: string): Promise<boolean> {
  try {
    const stat = await fs.stat(candidate);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

/** "docs/manual/manual-1-llms.txt" -> "https://www.mongodb.com/docs/manual/manual-1-llms.txt". */
function keyToProductionUrl(key: string): string {
  const host = new URL(PRODUCTION_BASE_URL).origin;
  return `${host}/${key}`;
}

/**
 * Warns for every entry whose production URL doesn't appear anywhere in the
 * root llms.txt's own content, i.e. every file about to be uploaded that a
 * reader of https://www.mongodb.com/docs/llms.txt has no way to discover.
 * Never throws: a missing link is worth flagging loudly, but shouldn't
 * block generation or upload the way an actual key collision does.
 */
function warnAboutFilesMissingFromRootLlms(rootLlmsContent: string, entries: UploadEntry[]): void {
  const missing = entries.filter(
    (entry) => entry.key !== ROOT_LLMS_KEY && !rootLlmsContent.includes(keyToProductionUrl(entry.key)),
  );
  if (missing.length === 0) {
    return;
  }
  console.warn(
    `\nWARNING: ${missing.length} file(s) are not linked from the root llms.txt (${ROOT_LLMS_FILENAME}) and ` +
      "won't be discoverable from https://www.mongodb.com/docs/llms.txt. Add a link for each to llms-output/llms.txt:",
  );
  for (const entry of missing) {
    console.warn(`  - ${keyToProductionUrl(entry.key)}`);
  }
}

/**
 * Builds the per-project upload manifest. Throws if two entries would
 * resolve to the same S3 key (a routing collision that must be resolved
 * before uploading, not silently overwritten), including the reserved
 * root llms.txt key.
 */
export async function buildUploadManifest(
  monorepoPath: string,
  outputDir: string,
  options: UploadManifestOptions = {},
): Promise<UploadEntry[]> {
  const { forProject, dirNameToPrefixPath } = options;
  const entries: UploadEntry[] = [];

  const rootLlmsPath = options.rootLlmsPath ?? path.join(outputDir, ROOT_LLMS_FILENAME);
  let rootLlmsContent = '';
  try {
    rootLlmsContent = await fs.readFile(rootLlmsPath, 'utf-8');
  } catch {
    // Without it we can't tell whether these files are linked, but that
    // check is advisory and must never block a publish.
    console.warn(`Root llms.txt not found at ${rootLlmsPath}; skipping the "missing from root llms.txt" check.`);
  }

  const dirNameToPrefix = await loadDirNameToPrefixMap(monorepoPath, dirNameToPrefixPath);
  const contentDir = path.join(monorepoPath, 'content');

  const outputEntries = await fs.readdir(outputDir, { withFileTypes: true });
  for (const outputEntry of outputEntries) {
    if (!outputEntry.isDirectory()) {
      continue;
    }
    const project = outputEntry.name;
    if (EXCLUDED_FROM_UPLOAD.has(project)) {
      continue;
    }
    if (forProject !== undefined && project !== forProject) {
      continue;
    }

    const urlSlug = getUrlSlugForDir(dirNameToPrefix, project);
    if (urlSlug === undefined) {
      console.warn(`Skipping "${project}": no URL prefix found in dir-name-to-prefix.json`);
      continue;
    }

    const projectDir = path.join(contentDir, project);
    const found = await currentSourceDir(projectDir);
    if (!found) {
      console.warn(`Skipping "${project}": no resolvable current source directory under ${projectDir}`);
      continue;
    }

    const projectOutputDir = path.join(outputDir, project);
    if (!(await isDirectory(projectOutputDir))) {
      continue;
    }
    const filenames = (await fs.readdir(projectOutputDir)).filter((name) => name.endsWith('.txt'));
    for (const filename of filenames) {
      entries.push({
        localPath: path.join(projectOutputDir, filename),
        key: buildFileKey(urlSlug, found.version, filename),
      });
    }
  }

  const reserved = entries.find((entry) => entry.key === ROOT_LLMS_KEY);
  if (reserved) {
    throw new Error(
      `"${reserved.localPath}" resolves to "${ROOT_LLMS_KEY}", the key reserved for the hand-maintained root ` +
        'llms.txt. Add its project to EXCLUDED_FROM_UPLOAD rather than letting it overwrite the root file.',
    );
  }

  const seenKeys = new Map<string, string>();
  for (const entry of entries) {
    const existing = seenKeys.get(entry.key);
    if (existing) {
      throw new Error(
        `S3 key collision: both "${existing}" and "${entry.localPath}" resolve to key "${entry.key}". ` +
          'Resolve this before uploading (do not let one silently overwrite the other).',
      );
    }
    seenKeys.set(entry.key, entry.localPath);
  }

  entries.sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
  if (rootLlmsContent !== '') {
    warnAboutFilesMissingFromRootLlms(rootLlmsContent, entries);
  }
  return entries;
}

/**
 * The upload entry for the hand-maintained root llms.txt. Separate from
 * buildUploadManifest so publishing the root file is always a deliberate
 * act by a caller that named it, never a default a site build has to
 * remember to switch off. Throws if the file is missing.
 */
export async function rootLlmsUploadEntry(outputDir: string): Promise<UploadEntry> {
  const localPath = path.join(outputDir, ROOT_LLMS_FILENAME);
  try {
    await fs.access(localPath);
  } catch {
    throw new Error(
      `Root llms.txt not found at ${localPath}. It's hand-maintained (not generated by \`pnpm generate\`) ` +
        'and must exist before uploading.',
    );
  }
  return { localPath, key: ROOT_LLMS_KEY };
}
