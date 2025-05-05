import { Octokit } from '@octokit/rest';
import { flatten, uniq } from 'lodash';
import { filterNil } from '../../../utils/filterEmpty';
import { logger } from '../../logger';
import { ora } from '../../ora';

export async function getReviewersFromPullRequests({
  options,
  pullNumbers,
}: {
  options: {
    githubApiBaseUrlV3?: string;
    repoName: string;
    repoOwner: string;
    accessToken: string;
    interactive: boolean;
    authenticatedUsername: string;
  };
  pullNumbers: number[];
}) {
  const {
    githubApiBaseUrlV3,
    repoName,
    repoOwner,
    accessToken,
    interactive,
    authenticatedUsername,
  } = options;

  const text = `Retrieving original reviewers`;
  const spinner = ora(interactive, text).start();

  const octokit = new Octokit({
    auth: accessToken,
    baseUrl: githubApiBaseUrlV3,
    log: logger,
  });

  try {
    const promises = pullNumbers.map(async (pullNumber) => {
      const reviews = await octokit.pulls.listReviews({
        owner: repoOwner,
        repo: repoName,
        pull_number: pullNumber,
      });

      return reviews.data
        .map((review) => review.user?.login)
        .filter((username) => username !== authenticatedUsername)
        .filter(filterNil);
    });

    const reviewers = uniq(flatten(await Promise.all(promises)));
    spinner.stop();
    return reviewers;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    spinner.fail(`Retrieving reviewers failed`);
  }
}
