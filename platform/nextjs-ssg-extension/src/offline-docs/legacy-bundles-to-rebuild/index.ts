import fs from 'node:fs';
import path from 'node:path';
import type { AllContentData } from '../../../../nextjs-extension/src/contentMetadata/processContentMetadata';
import type { BranchEntry } from '../../../../nextjs-extension/src/util/databaseConnection/types';

export type LegacyOfflineBundle = {
  bundleStem: string;
  version: string;
};

const contentExistsForVersion = (
  projectName: string,
  branch: BranchEntry,
  allContentData: AllContentData,
): boolean =>
  Object.values(allContentData.docsPaths).some((entry) => {
    if (entry.projectName !== projectName) return false;
    if (!entry.versionName) return false;
    return (
      entry.versionName === branch.urlSlug ||
      entry.versionName === branch.gitBranchName ||
      entry.versionName === branch.name
    );
  });

const tocFileExists = (legacyDocsDir: string, bundleStem: string): boolean =>
  fs.existsSync(path.join(legacyDocsDir, `${bundleStem}.ts`));

const contentPathMatchesPrefix = (contentPath: string, prefix: string): boolean =>
  contentPath === prefix || contentPath.startsWith(`${prefix}/`);

/**
 * Content-path prefixes for this Netlify site (`FORCE_REBUILD_PATHS`).
 * Used to map the current deploy onto Atlas project names without requiring
 * the EOL version itself to be in `pathsToBuild` (inactive versions are often
 * omitted from the live SSG queue).
 */
export const getDeployContentPrefixes = (): string[] =>
  [...new Set(
    (process.env.FORCE_REBUILD_PATHS ?? '')
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean),
  )];

/** Atlas `projectName` values that belong to this SSG site. */
export const getDeployProjectNames = (
  allContentData: AllContentData,
): Set<string> => {
  const prefixes = getDeployContentPrefixes();
  const names = new Set<string>();
  if (prefixes.length === 0) return names;

  for (const [contentPath, entry] of Object.entries(allContentData.docsPaths)) {
    if (
      prefixes.some(
        (prefix) =>
          contentPathMatchesPrefix(contentPath, prefix) ||
          prefix === entry.projectName,
      )
    ) {
      names.add(entry.projectName);
    }
  }
  return names;
};

/**
 * Legacy offline bundles to build for **this** SSG site: every Atlas branch
 * with eol_type === 'link' whose project is in FORCE_REBUILD_PATHS, whose
 * versioned content is in the repo, and whose `{project}-{urlSlug}.ts` TOC
 * exists.
 *
 * `docsPaths` still lists every snooty.toml in the monorepo (Manual `docs`,
 * drivers, …). Without the site-project filter, an ops-manager deploy would
 * also queue Manual EOL zips because `content/manual/v4.4` etc. are on disk.
 */
export const getLegacyOfflineBundles = ({
  allContentData,
  legacyDocsDir,
}: {
  allContentData: AllContentData;
  legacyDocsDir: string;
}): LegacyOfflineBundle[] => {
  const deployProjects = getDeployProjectNames(allContentData);
  if (deployProjects.size === 0) {
    console.log(
      '[offline-docs] No FORCE_REBUILD_PATHS match; skipping legacy bundles',
    );
    return [];
  }
  console.log(
    `[offline-docs] Scoping legacy bundles to projects: ${[...deployProjects].join(', ')}`,
  );

  const bundles: LegacyOfflineBundle[] = [];

  for (const [projectName, { reposBranchesEntry }] of Object.entries(
    allContentData.atlasProjectDocuments,
  )) {
    if (!deployProjects.has(projectName)) continue;

    for (const branch of reposBranchesEntry.branches ?? []) {
      if (branch.eol_type !== 'link') continue;
      const version = branch.urlSlug || branch.gitBranchName;
      if (!version) continue;
      if (!contentExistsForVersion(projectName, branch, allContentData)) {
        console.log(
          `[offline-docs] Skipping ${projectName}-${version}: content not in repo`,
        );
        continue;
      }
      const bundleStem = `${projectName}-${version}`;
      if (!tocFileExists(legacyDocsDir, bundleStem)) {
        console.log(
          `[offline-docs] Skipping ${bundleStem}: no legacy TOC file`,
        );
        continue;
      }
      bundles.push({ bundleStem, version });
    }
  }

  return bundles;
};
