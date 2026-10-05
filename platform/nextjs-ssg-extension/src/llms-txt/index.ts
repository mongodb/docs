import path from 'node:path';
import type { NetlifyPluginUtils } from '@netlify/build';
import type { ConfigEnvironmentVariables } from '../../../nextjs-extension/src/util/extension';
import { getRepoPaths } from '../../../nextjs-extension/src/paths';
import { APP_DIR } from '../constants';

const GENERATE_LLMS_DIR = path.join('platform', 'tools', 'generate-llms');
const ROOT_LLMS_REPO_PATH = path.join('tools', 'generate-llms', 'llms-output', 'llms.txt');
const ROOT_LLMS_PUBLISHER = 'landing';

/** "pymongo-driver/current" -> "pymongo-driver". Mirrors contentDirFromDocsProject in generate-llms, kept local so the extension doesn't import that package's dependencies. */
const contentDirForProject = (docsProject: string | undefined): string =>
  (docsProject ?? '').trim().replace(/^\/+/, '').split('/')[0];

const requireOfflineBucket = (): string => {
  const bucket = process.env.S3_OFFLINE_BUCKET?.trim();
  if (!bucket) {
    throw new Error('[llms-txt] S3_OFFLINE_BUCKET is not set.');
  }
  return bucket;
};


/**
 * Publishes the hand-maintained root llms.txt (docs/llms.txt) after a
 * merge that changed it - the bot PR from the weekly drift check, or a
 * human editing it directly.
 *
 * Only the landing site does this. Landing serves the docs root, and its
 * own generated file is excluded from per-project upload precisely
 * because it would collide with this key, so the one site that publishes
 * nothing else is the one that publishes this.
 *
 * Gated on the file appearing in this deploy's changed files, so the root
 * llms.txt is only ever published as the result of a merged git change.
 */
export const handleRootLlmsTxt = async (
  utils: NetlifyPluginUtils,
  configEnvironment: ConfigEnvironmentVariables,
  gitChangedFiles: readonly string[],
): Promise<void> => {
  const docsProject = configEnvironment.DOCS_PROJECT ?? process.env.DOCS_PROJECT;
  if (contentDirForProject(docsProject) !== ROOT_LLMS_PUBLISHER) {
    return;
  }
  if (!gitChangedFiles.some((file) => file.endsWith(ROOT_LLMS_REPO_PATH))) {
    console.log('[llms-txt] Root llms.txt unchanged in this deploy; not republishing.');
    return;
  }

  const { repoRoot } = getRepoPaths(undefined, APP_DIR);
  const bucket = requireOfflineBucket();

  console.log(`[llms-txt] Root llms.txt changed; publishing to s3://${bucket}`);

  await utils.run.command(
    `pnpm --filter generate-llms run publish-root -- --bucket ${bucket} --execute`,
    { cwd: path.join(repoRoot, GENERATE_LLMS_DIR), env: { DOCS_MONOREPO_ROOT: repoRoot } },
  );
};

/**
 * Publishes this site's llms.txt to S3 after a successful dotcomprd or
 * dotcomstg deploy, so per-project indexes stay current without a writer
 * running the CLI.
 *
 * Scoped to the one project this site builds (DOCS_PROJECT), and never
 * uploads the root llms.txt (docs/llms.txt) — that file is hand-maintained
 * in git and published only from a merged change. See
 * platform/tools/generate-llms/src/publishProject.ts.
 *
 * Runs as a subprocess rather than an import so generate-llms' own
 * dependencies stay out of the extension bundle, matching how offline-docs
 * shells out to `pnpm run build:offline`.
 */
export const handleLlmsTxt = async (
  utils: NetlifyPluginUtils,
  configEnvironment: ConfigEnvironmentVariables,
): Promise<void> => {

  const docsProject = configEnvironment.DOCS_PROJECT ?? process.env.DOCS_PROJECT;
  if (!docsProject) {
    console.warn('[llms-txt] DOCS_PROJECT is not set; skipping llms.txt publish.');
    return;
  }

  const { repoRoot, generatedDir } = getRepoPaths(undefined, APP_DIR);
  // Same bucket (and same env var) offline docs already upload to; see
  // nextjs-ssg-extension/src/offline-docs/index.ts.
  const bucket = requireOfflineBucket();

  console.log(`[llms-txt] Publishing llms.txt for ${docsProject} to s3://${bucket}`);

  await utils.run.command(
    `pnpm --filter generate-llms run publish-project -- --for-project ${docsProject} --bucket ${bucket} --execute`,
    {
      cwd: path.join(repoRoot, GENERATE_LLMS_DIR),
      env: {
        DOCS_MONOREPO_ROOT: repoRoot,
        // The SSG build writes its own copy of this map under docs-site,
        // not the docs-nextjs path generate-llms defaults to.
        LLMS_DIR_NAME_TO_PREFIX_PATH: path.join(generatedDir, 'dir-name-to-prefix.json'),
      },
    },
  );
};
