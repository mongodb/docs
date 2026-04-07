import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import type { NetlifyPluginUtils } from '@netlify/build';
import axios from 'axios';

import { readFile } from 'node:fs';
import { promisify } from 'node:util';
import path from 'node:path';

const readFileAsync = promisify(readFile);

interface GitHubCommitResponse {
  commit: {
    sha: string;
  };
}

interface LatestCommitRequest {
  branch?: string;
  gitRepo: string;
  org?: string;
}

/**
 * This function returns the latest commit for the netlify-poc branch which is used
 * to compare the commit of the frontend currently stored in the worker.
 * TODO: DOP-4866, Refactor this to get the latest release once we've merged the netlify-poc branch to main
 * @returns latest commit hash of the main branch
 */
async function getLatestCommit({
  gitRepo,
  org,
  branch = 'main',
}: LatestCommitRequest): Promise<string | undefined> {
  try {
    //TODO: un-hardcode these values
    const response = await axios.get<GitHubCommitResponse>(
      `https://api.github.com/repos/${org}/${gitRepo}/branches/${branch}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );

    const latestSha = response.data.commit.sha;

    return latestSha;
  } catch (e) {
    console.error(
      `Could not retrieve latest SHA for ${org}/${gitRepo}/${branch}`,
      e,
    );
  }
}

async function getPackageLockHash(projectPath: string): Promise<string> {
  const packageLock = await readFileAsync(
    path.join(projectPath, 'package-lock.json'),
  );

  const hashSum = createHash('sha256');
  hashSum.update(packageLock);

  return hashSum.digest('hex');
}

interface RepoUpdateRequest {
  run: NetlifyPluginUtils['run'];
  downloadDir: string;
  gitRepo: string;
  branch?: string;
  pathToSubProject?: string;
  org?: string;
}

/**
 * First checks if the project directory exists, and if it does,
 * it checks to see if the latest commit sha matches
 * @param run the exec util provided by Netlify
 */
export async function checkForRepoUpdates({
  run,
  downloadDir,
  gitRepo,
  branch,
  org,
  pathToSubProject,
}: RepoUpdateRequest) {
  console.log(`Checking for existence of ${gitRepo}`);
  const directoryPath = path.join(downloadDir, gitRepo);
  const dirExists = existsSync(directoryPath);

  if (!dirExists) {
    console.log(`${directoryPath} does not exist in cache`);
    return;
  }

  const latestSha = await getLatestCommit({ gitRepo, org, branch });

  const { stdout: currentSha } = await run.command('git rev-parse HEAD', {
    cwd: directoryPath,
  });

  if (currentSha === latestSha) {
    console.log(`No changes to ${org}/${gitRepo}. No update needed.`);
    return false;
  }

  console.log(
    `Current commit does not match the latest commit. Updating ${org}/${gitRepo}`,
  );

  const projectPath = path.join(directoryPath, pathToSubProject ?? '');
  const prevPackageLockHash = await getPackageLockHash(projectPath);
  // Pulls from branch specified when repo originally cloned
  await run.command('git pull --rebase', {
    cwd: projectPath,
  });

  const updatedPackageLockHash = await getPackageLockHash(projectPath);

  if (prevPackageLockHash === updatedPackageLockHash) {
    console.log(
      'Package-lock.json is unchanged. Not installing any additional dependencies',
    );
    return true;
  }

  console.log('Dependencies updating. Installing updates.');
  await run.command('npm ci', { cwd: projectPath });
  console.log('Updates for the frontend complete!');
  return true;
}
