import type { NetlifyPluginUtils } from '@netlify/build';
import {
  type Environments,
  MONGODB_ORG,
  PARSER_SITE_NAME,
} from '../util/databaseConnection/types';
import fsExists from 'fs.promises.exists';
import path from 'node:path';
import {
  handlePoetryDeps,
  getPoetryPaths,
  restorePoetry,
} from './handlePoetryDeps';
import { repoVersionMatchesExpected } from './checkRepoVersion';

/** Find the parser and updates or clones as needed
 * @param run - the run object from the Netlify plugin utils
 * @param cache - the cache object from the Netlify plugin utils
 * @param expectedParserVersion - the expected parser version
 * @param downloadDir - the directory to download the parser to
 * @param environment - the environment the build is running in
 * @returns true if the current parser version is valid for given env, false otherwise
 */
export const getParser = async ({
  run,
  cache,
  expectedParserVersion,
  downloadDir,
  environment,
}: {
  run: NetlifyPluginUtils['run'];
  cache: NetlifyPluginUtils['cache'];
  expectedParserVersion: string;
  downloadDir: string;
  environment: Environments;
}): Promise<boolean> => {
  const parserPath = path.resolve(downloadDir, PARSER_SITE_NAME);
  const parserExists = await fsExists(parserPath);

  const { localBinDir, localLibDir, poetryPath } = getPoetryPaths();
  const poetryRestored = await restorePoetry({
    localBinDir,
    localLibDir,
    cache,
  });

  if (parserExists) {
    const parserVersionMatchesExpected = await repoVersionMatchesExpected({
      run,
      repoPath: parserPath,
      repoName: PARSER_SITE_NAME,
      expectedRepoVersion: expectedParserVersion,
    });

    if (parserVersionMatchesExpected) {
      console.log(
        `Parser version ${expectedParserVersion} already installed, skipping update`,
      );

      if (!poetryRestored) {
        await handlePoetryDeps({
          parserPath,
          run,
          cache,
          poetryPath,
          localBinDir,
          localLibDir,
        });
      } else {
        console.log('Installing parser dependencies with poetry...');
        await run.command('poetry install', {
          cwd: parserPath,
          stdout: 'ignore',
        });
      }
      // Return early if the parser version is correct, no need to update or re-install poetry
      const validParserModuleCache = true;
      return validParserModuleCache;
    }
    // If parser head does not match expected version, update the parser version
    await updateParserVersion({
      run,
      expectedParserVersion,
      parserPath,
    });
  } else {
    // Clone parser if it doesn't already exist
    console.log(
      `No snooty-parser directory found in ${parserPath}, will re-clone parser`,
    );
    await cloneParser({ run, expectedParserVersion, downloadDir, parserPath });
  }

  // Install poetry and parser dependencies if parser didn't exist or did not match the expected version
  await handlePoetryDeps({
    parserPath,
    run,
    cache,
    poetryPath,
    localBinDir,
    localLibDir,
  });

  let validParserModuleCache = false;
  if (environment !== 'dotcomstg' && environment !== 'dotcomprd') {
    validParserModuleCache = true;
    console.log(
      `Parser did not exist or did not match the expected version. However, "Environment = ${environment}", so cache will not be invalidated`,
    );
  } else {
    console.log(
      `Parser did not exist or did not match the expected version. "Environment = ${environment}", entire cache will be invalidated`,
    );
  }
  return validParserModuleCache;
};

export const cloneParser = async ({
  run,
  expectedParserVersion,
  downloadDir,
  parserPath,
}: {
  run: NetlifyPluginUtils['run'];
  expectedParserVersion: string;
  downloadDir: string;
  parserPath: string;
}) => {
  const parserRepoUrl = `https://github.com/${MONGODB_ORG}/snooty-parser.git`;
  console.log(`Downloading parser from ${parserRepoUrl} ...`);

  await run.command(`git clone ${parserRepoUrl}`, { cwd: downloadDir });

  await run.command(
    `git -c advice.detachedHead=false fetch --depth 1 --tags origin ${expectedParserVersion}`,
    {
      cwd: parserPath,
    },
  );

  await run.command('git checkout FETCH_HEAD', {
    cwd: parserPath,
  });
};

const updateParserVersion = async ({
  run,
  expectedParserVersion,
  parserPath,
}: {
  run: NetlifyPluginUtils['run'];
  expectedParserVersion: string;
  parserPath: string;
}) => {
  try {
    await run.command(
      `git fetch -f --depth 1 --tags origin ${expectedParserVersion}`,
      {
        cwd: parserPath,
        stdout: 'ignore',
      },
    );
    await run.command('git -c advice.detachedHead=false checkout FETCH_HEAD', {
      cwd: parserPath,
      stdout: 'ignore',
    });

    // Verify the checkout was successful
    const { stdout: currentSha } = await run.command('git rev-parse HEAD', {
      cwd: parserPath,
      stdout: 'pipe',
    });

    const { stdout: currentTag } = await run.command(
      'git tag --points-at HEAD',
      {
        cwd: parserPath,
        stdout: 'pipe',
      },
    );
    console.log(
      `Parser version updated successfully in ${parserPath}. Parser HEAD now points to sha: ${currentSha.trim()}, tag: ${currentTag?.trim() ?? 'No tag found at current HEAD'}`,
    );
  } catch (e) {
    throw new Error(
      `Failed to checkout parser version ${expectedParserVersion} in ${parserPath}: ${e}`,
    );
  }
};
