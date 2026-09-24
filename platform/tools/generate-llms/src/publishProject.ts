/**
 * Generates and publishes the llms.txt file(s) for a single content
 * project, the unit of work a Netlify site build produces (each site builds
 * one content tree, named by DOCS_PROJECT).
 *
 * This is the shared implementation behind both the `pnpm publish-project`
 * CLI and the nextjs-ssg-extension `onSuccess` hook, so a writer running it
 * by hand and the deploy that runs it automatically do exactly the same
 * thing.
 *
 * Two rules distinguish it from `pnpm generate` + `pnpm upload`:
 *
 *   - It only ever touches one project's files. Nothing else in
 *     `content/` is read, and nothing else in the output directory is
 *     uploaded.
 *   - It never uploads the root llms.txt (docs/llms.txt). That file is
 *     hand-maintained in git and published only from a merged change, so a
 *     site build can't silently overwrite it. If the files it just
 *     published aren't linked from the root llms.txt, it warns (see
 *     uploadManifest.ts) and leaves the fix to the weekly root-llms.txt
 *     pass.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { generate } from './generator.js';
import { putTextFile } from './s3Client.js';
import { buildUploadManifest, isExcludedFromUpload, type UploadEntry } from './uploadManifest.js';
import { PRODUCTION_BASE_URL } from './types.js';

export interface PublishProjectOptions {
  /** Absolute path to the docs-mongodb-internal monorepo root. */
  monorepoPath: string;
  /**
   * Content directory to publish, e.g. "atlas". Pass a raw DOCS_PROJECT
   * value (e.g. "pymongo-driver/current") through
   * `contentDirFromDocsProject` first.
   */
  project: string;
  /** Directory to generate into. Contents for this project are overwritten. */
  outputDir: string;
  bucket: string;
  descriptionsPath: string;
  /** Absolute path to the git-tracked root llms.txt, for the link check only. */
  rootLlmsPath?: string;
  /** Absolute path override for dir-name-to-prefix.json (see urlResolver). */
  dirNameToPrefixPath?: string;
  dryRun?: boolean;
}

export interface PublishProjectResult {
  project: string;
  /** Files uploaded, or that would have been on a dry run. */
  entries: UploadEntry[];
  /** True if pages were found but at least one part is over the size limit. */
  anyPartOverLimit: boolean;
  uploaded: boolean;
}

/**
 * Turns a DOCS_PROJECT value into the content directory name generate
 * expects: `pymongo-driver/current` -> `pymongo-driver`, `manual` ->
 * `manual`. Returns undefined for an unset or empty value.
 */
export function contentDirFromDocsProject(docsProject: string | undefined): string | undefined {
  const firstSegment = (docsProject ?? '').trim().replace(/^\/+/, '').split('/')[0];
  return firstSegment === '' ? undefined : firstSegment;
}

/**
 * Generates this project's llms.txt file(s) and uploads them to S3.
 *
 * Throws on failure (missing prefix map, S3 error, key collision). Callers
 * running inside a site build must catch: a stale llms.txt is not a reason
 * to fail a deploy.
 */
export async function publishProject(options: PublishProjectOptions): Promise<PublishProjectResult> {
  const { monorepoPath, project, outputDir, bucket, descriptionsPath, dryRun = false } = options;

  if (isExcludedFromUpload(project)) {
    // landing is served at the docs root, so its generated file would
    // resolve to docs/llms.txt - the key reserved for the hand-maintained
    // root llms.txt. Skip before generating rather than after.
    console.log(
      `[llms-txt] "${project}" is served at the docs root, where the hand-maintained root llms.txt lives; ` +
        'nothing to publish.',
    );
    return { project, entries: [], anyPartOverLimit: false, uploaded: false };
  }

  const results = await generate({
    monorepoPath,
    baseUrl: PRODUCTION_BASE_URL,
    descriptionsPath,
    outputDir,
    forProject: project,
    noDescriptions: false,
  });

  if (results.length === 0) {
    // Not every content directory produces an llms.txt (see
    // exclusions.ts), so this is a normal outcome, not an error.
    console.log(`[llms-txt] No llms.txt generated for "${project}"; nothing to publish.`);
    return { project, entries: [], anyPartOverLimit: false, uploaded: false };
  }

  const anyPartOverLimit = results.some((result) => result.anyPartOverLimit);
  const totalFiles = results.reduce((sum, result) => sum + result.outputPaths.length, 0);
  console.log(`[llms-txt] Generated ${totalFiles} file(s) for "${project}".`);

  const entries = await buildUploadManifest(monorepoPath, outputDir, {
    forProject: project,
    rootLlmsPath: options.rootLlmsPath,
    dirNameToPrefixPath: options.dirNameToPrefixPath,
  });

  if (entries.length === 0) {
    console.warn(`[llms-txt] Nothing to upload for "${project}" (no S3 keys resolved).`);
    return { project, entries, anyPartOverLimit, uploaded: false };
  }

  for (const entry of entries) {
    if (dryRun) {
      console.log(`[llms-txt] Would upload ${entry.localPath} -> s3://${bucket}/${entry.key}`);
      continue;
    }
    const body = await fs.readFile(entry.localPath, 'utf-8');
    await putTextFile({ bucket, key: entry.key, body });
    console.log(`[llms-txt] Uploaded ${entry.localPath} -> s3://${bucket}/${entry.key}`);
  }

  console.log(
    `[llms-txt] ${dryRun ? 'Would upload' : 'Uploaded'} ${entries.length} file(s) for "${project}" to s3://${bucket}.`,
  );
  return { project, entries, anyPartOverLimit, uploaded: !dryRun };
}

/** Default throwaway output directory for a build-time publish. */
export function defaultBuildOutputDir(project: string): string {
  return path.join('llms-build-output', project);
}
