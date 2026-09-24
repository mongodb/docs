import path from 'node:path';
import type { NetlifyPluginUtils } from '@netlify/build';
import type { ConfigEnvironmentVariables } from '../../../nextjs-extension/src/util/extension';
import { getRepoPaths } from '../../../nextjs-extension/src/paths';
import { APP_DIR, DEFAULT_S3_BUCKET } from '../constants';

const GENERATE_LLMS_DIR = path.join('platform', 'tools', 'generate-llms');

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
  const bucket = process.env.S3_OFFLINE_BUCKET ?? DEFAULT_S3_BUCKET;

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
