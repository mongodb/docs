import fs from 'node:fs/promises';
import path from 'node:path';
import type { NetlifyPluginUtils } from '@netlify/build';
import type { AllContentData } from '../../../nextjs-extension/src/contentMetadata/processContentMetadata';
import type { Environments } from '../../../nextjs-extension/src/util/databaseConnection/types';
import type { StaticEnvVars } from '../../../nextjs-extension/src/util/assertDbEnvVars';
import type { ConfigEnvironmentVariables } from '../../../nextjs-extension/src/util/extension';
import { getRepoPaths } from '../../../nextjs-extension/src/paths';
import { getParser } from '../../../nextjs-extension/src/github/getParser';
import {
  getParserVersion,
  runPrebuildModules,
} from '../../../nextjs-extension/src/parse/runModules';
import { runMdxConversionForContentPaths } from '../../../nextjs-extension/src/parse/runMdxConversion';
import type { OfflineBundlesToBuild } from './offline-bundles-to-rebuild/index';
import { extractContentSitesWithPages } from './extract-content-sites';

// This is an interim measure while content is still being migrated to MDX: offline
// bundles are currently built from `content-mdx/`, but that directory is generated
// on the fly during a build and isn't persisted between builds, so a project's MDX
// might not exist yet when its offline bundle needs it. This ensures the MDX exists
// (converting it here if missing) before the offline build for a bundle runs.
// Once all content sites are converted to MDX up front, this step becomes unnecessary
// and can be removed.

// filename format: <label>.versioned.<projectName>.ts (e.g., "development.versioned.docs.ts" → "docs")
const getProjectNameFromFilename = (filename: string): string | undefined => {
  const match = filename.match(/\.versioned\.([^.]+)/);
  return match?.[1];
};

/**
 * Determines the `docsPaths` content path keys required for a single offline bundle
 * (its own versioned project, plus any cross-referenced contentSites).
 *
 * There is only one versioned project per offline TOC file — the one named in the
 * filename (e.g. `docs` in `development.versioned.docs.ts`) — and it needs exactly the
 * versions in `buildVersions`. Every other contentSite referenced in the file is a
 * non-versioned project, so any single active `docsPaths` entry for it satisfies the need.
 */
const getRequiredContentPathsForBundle = (
  filename: string,
  buildVersions: string[],
  contentSites: Set<string>,
  allContentData: AllContentData,
): Set<string> => {
  const ownProjectName = getProjectNameFromFilename(filename);
  const required = new Set<string>();

  for (const [contentPath, entry] of Object.entries(allContentData.docsPaths)) {
    if (!entry.active || !contentSites.has(entry.projectName)) continue;

    if (entry.projectName === ownProjectName) {
      if (buildVersions.length === 0 || buildVersions.includes(entry.versionName)) {
        required.add(contentPath);
      }
    } else {
      required.add(contentPath);
    }
  }

  return required;
};

const hasConvertedMdx = async (mdxDir: string): Promise<boolean> => {
  try {
    const entries = await fs.readdir(mdxDir);
    return entries.length > 0;
  } catch {
    return false;
  }
};

/**
 * Given the offline bundles that are about to be rebuilt, finds any content paths whose
 * MDX hasn't been converted yet (in `content-mdx/`) and runs the parser + MDX conversion
 * for exactly those paths before the offline build proceeds.
 */
export const ensureContentConvertedForBundles = async ({
  bundlesToRebuild,
  allContentData,
  netlifyPluginUtils,
  dbEnvVars,
  configEnvironment,
}: {
  bundlesToRebuild: OfflineBundlesToBuild;
  allContentData: AllContentData;
  netlifyPluginUtils: NetlifyPluginUtils;
  dbEnvVars: StaticEnvVars;
  configEnvironment: ConfigEnvironmentVariables;
}): Promise<void> => {
  const { offlineDocsDir, mdxOutputDir } = getRepoPaths(undefined, 'docs-site');

  const requiredContentPaths = new Set<string>();
  for (const [filename, buildVersions] of Object.entries(bundlesToRebuild)) {
    const tocFilePath = path.join(offlineDocsDir, filename);
    let tocFileSource: string;
    try {
      tocFileSource = await fs.readFile(tocFilePath, 'utf-8');
    } catch (error) {
      console.error(`[offline-docs] Could not read TOC file ${tocFilePath}: ${error}`);
      continue;
    }

    const contentSites = extractContentSitesWithPages(tocFileSource);
    for (const contentPath of getRequiredContentPathsForBundle(
      filename,
      buildVersions,
      contentSites,
      allContentData,
    )) {
      requiredContentPaths.add(contentPath);
    }
  }

  const missingContentPaths: string[] = [];
  for (const contentPath of requiredContentPaths) {
    const mdxDir = path.join(mdxOutputDir, contentPath);
    if (!(await hasConvertedMdx(mdxDir))) {
      missingContentPaths.push(contentPath);
    }
  }

  if (missingContentPaths.length === 0) {
    console.log('[offline-docs] All content required for offline bundles is already converted to MDX.');
    return;
  }

  console.log(
    `[offline-docs] Converting content to MDX for offline bundles (missing): ${missingContentPaths.join(', ')}`,
  );

  const parserVersion = await getParserVersion({
    buildEnvironment: configEnvironment.ENV as string,
    dbEnvVars,
  });

  await getParser({
    run: netlifyPluginUtils.run,
    cache: netlifyPluginUtils.cache,
    expectedParserVersion: parserVersion,
    environment: configEnvironment.ENV as Environments,
  });

  const contentDataForMissingPaths: AllContentData = {
    ...allContentData,
    pathsToBuild: missingContentPaths,
  };

  await runPrebuildModules({
    netlifyPluginUtils,
    allContentData: contentDataForMissingPaths,
    atlasProjectDocuments: allContentData.atlasProjectDocuments,
    branchName: configEnvironment.BRANCH as string,
    prId: configEnvironment.REVIEW_ID
      ? Number.parseInt(configEnvironment.REVIEW_ID, 10)
      : undefined,
    shouldRunPersistence: false,
  });

  await runMdxConversionForContentPaths({
    allContentData: contentDataForMissingPaths,
    mdxOutputPath: mdxOutputDir,
  });

  console.log(
    `[offline-docs] Finished converting ${missingContentPaths.length} content path(s) to MDX.`,
  );
};
