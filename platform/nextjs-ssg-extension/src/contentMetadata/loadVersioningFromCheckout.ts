import path from 'node:path';
import fs from 'node:fs/promises';
import type { BuildRunner } from '../util/buildUtils';
import type { Docset } from '../../../versioning/types';
import { getRepoPaths } from '../paths';

export type DocsetsByProject = {
  [projectName: string]: Docset;
};

const CATALOG_ARTIFACT = path.join('platform', 'versioning', 'generated', 'docsets.json');

/**
 * Loads the docset catalog from the repo checkout being built.
 *
 * This deliberately does NOT `import { docsets }`. All extensions are
 * published artifacts: their code is bundled when the extension is
 * published. A module-scope import would freeze the catalog at publish time.
 * Reading the repo checkout keeps the catalog bound to the branch.
 */
export const loadVersioningFromCheckout = async ({
  run,
}: {
  run: BuildRunner;
}): Promise<DocsetsByProject> => {
  const { repoRoot } = getRepoPaths();
  const versioningPath = path.join(repoRoot, 'platform', 'versioning');
  const artifactPath = path.join(repoRoot, CATALOG_ARTIFACT);

  // Generated here rather than committed: the TypeScript files are the source
  // of truth, and the emit is JSON.stringify(docsets) with no reshaping.
  await run.command('pnpm run emit', {
    cwd: versioningPath,
    stdout: 'inherit',
    stderr: 'inherit',
  });

  let docsets: Docset[];
  try {
    docsets = JSON.parse(await fs.readFile(artifactPath, 'utf-8')) as Docset[];
  } catch (error) {
    throw new Error(
      `[loadVersioningFromCheckout] could not read the docset catalog at ${artifactPath}: ${error}`,
    );
  }

  if (!Array.isArray(docsets) || !docsets.length) {
    throw new Error(
      `[loadVersioningFromCheckout] refusing to build with ${
        Array.isArray(docsets) ? docsets.length : 'a non-array'
      } docsets. ` +
        'Building on an empty catalog produces no paths, no search keys, and no prefixes, silently.',
    );
  }

  const byProject: DocsetsByProject = {};
  for (const docset of docsets) {
    byProject[docset.project] = docset;
  }

  console.log(`[loadVersioningFromCheckout] loaded ${docsets.length} docsets from ${CATALOG_ARTIFACT}`);
  return byProject;
};
