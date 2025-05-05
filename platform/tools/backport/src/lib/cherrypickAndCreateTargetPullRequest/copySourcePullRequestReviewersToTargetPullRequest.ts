import { ValidConfigOptions } from '../../options/options';
import { filterNil } from '../../utils/filterEmpty';
import { addReviewersToPullRequest } from '../github/v3/addReviewersToPullRequest';
import { getReviewersFromPullRequests } from '../github/v3/getReviewersFromPullRequests';
import { Commit } from '../sourceCommit/parseSourceCommit';

export async function copySourcePullRequestReviewersToTargetPullRequest(
  options: ValidConfigOptions,
  commits: Commit[],
  pullNumber: number,
) {
  const pullNumbers = commits
    .map((commit) => commit.sourcePullRequest?.number)
    .filter(filterNil);

  const reviewers = await getReviewersFromPullRequests({
    options,
    pullNumbers,
  });
  if (reviewers) {
    await addReviewersToPullRequest(options, pullNumber, reviewers);
  }
}
