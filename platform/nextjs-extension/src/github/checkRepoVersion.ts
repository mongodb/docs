import type { NetlifyPluginUtils } from '@netlify/build';

export const repoVersionMatchesExpected = async ({
  run,
  repoPath,
  repoName,
  expectedRepoVersion,
}: {
  run: NetlifyPluginUtils['run'];
  repoPath: string;
  repoName: string;
  expectedRepoVersion: string;
}) => {
  const { stdout: tag } = await run.command('git tag --points-at HEAD', {
    cwd: repoPath,
    stdout: 'pipe',
  });

  // If it doesn't match expected repo version, check what commit we're on.
  const { stdout: sha } = await run.command('git rev-parse HEAD', {
    cwd: repoPath,
    stdout: 'pipe',
  });

  if (tag === expectedRepoVersion || sha === expectedRepoVersion) {
    console.log(
      `Current ${repoName} version has tag: ${tag ?? 'No tag'} and SHA: ${sha}, expected ${expectedRepoVersion}`,
    );
    return true;
  }

  // If neither tag nor SHA matches, check if expectedRepoVersion is a branch name
  try {
    // Try to get the latest commit SHA of the expected branch
    const { stdout: branchSha } = await run.command(
      `git rev-parse origin/${expectedRepoVersion}`,
      {
        cwd: repoPath,
        stdout: 'pipe',
      },
    );

    const branchMatches = branchSha.trim() === sha.trim();
    if (branchMatches) {
      console.log(
        `HEAD of ${expectedRepoVersion} is ${branchSha.trim()}. Current ${repoName} SHA is ${sha.trim()}`,
      );
    } else {
      console.log(
        `HEAD of ${expectedRepoVersion} is ${branchSha.trim()}. Current ${repoName} SHA ${sha.trim()} does not match. Tag ${tag} does not match expected ${expectedRepoVersion} either.`,
      );
    }
    return branchMatches;
  } catch (error) {
    console.log(
      `${repoName} is not currently on a branch, but points to tag: ${tag ?? 'No tag'} and sha: ${sha}, expected ${expectedRepoVersion}. `,
    );
    return false;
  }
};
