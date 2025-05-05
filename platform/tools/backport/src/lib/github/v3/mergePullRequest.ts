import { Octokit } from '@octokit/rest';
import { ValidConfigOptions } from '../../../options/options';
import { logger } from '../../logger';

export function mergePullRequest(
  options: ValidConfigOptions,
  pullNumber: number,
) {
  const { accessToken, githubApiBaseUrlV3 } = options;
  const octokit = new Octokit({
    auth: accessToken,
    baseUrl: githubApiBaseUrlV3,
    log: logger,
  });

  return octokit.request(
    'PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge',
    {
      owner: options.repoOwner,
      repo: options.repoName,
      pull_number: pullNumber,
    },
  );
}
