import chalk from 'chalk';
import { flatten } from 'lodash';
import { ValidConfigOptions } from '../../options/options';
import { getSourceBranchFromCommits } from '../getSourceBranchFromCommits';
import {
  createBackportBranch,
  deleteBackportBranch,
  pushBackportBranch,
  getRepoForkOwner,
} from '../git';
import { addAssigneesToPullRequest } from '../github/v3/addAssigneesToPullRequest';
import { addLabelsToPullRequest } from '../github/v3/addLabelsToPullRequest';
import { addReviewersToPullRequest } from '../github/v3/addReviewersToPullRequest';
import {
  createPullRequest,
  PullRequestPayload,
} from '../github/v3/getPullRequest/createPullRequest';
import { getPullRequestBody } from '../github/v3/getPullRequest/getPullRequestBody';
import { getTitle } from '../github/v3/getPullRequest/getTitle';
import { validateTargetBranch } from '../github/v4/validateTargetBranch';
import { consoleLog } from '../logger';
import { Target } from '../runSequentially';
import { sequentially } from '../sequentially';
import { Commit } from '../sourceCommit/parseSourceCommit';
import { autoMergeNowOrLater } from './autoMergeNowOrLater';
import { copySourcePullRequestLabelsToTargetPullRequest } from './copySourcePullRequestLabels';
import { copySourcePullRequestReviewersToTargetPullRequest } from './copySourcePullRequestReviewersToTargetPullRequest';
import { getBackportBranchName } from './getBackportBranchName';
import { getMergeCommits } from './getMergeCommit';
import { getTargetPRLabels } from './getTargetPRLabels';
import { waitForCherrypick } from './waitForCherrypick';

export async function cherrypickAndCreateTargetPullRequest({
  options,
  commits,
  target,
}: {
  options: ValidConfigOptions;
  commits: Commit[];
  target: Target;
}): Promise<{ url: string; number: number; didUpdate: boolean }> {
  const { branch: targetBranch } = target;

  const backportBranch = getBackportBranchName({
    options,
    targetBranch,
    commits,
  });

  // TODO: backportBranch must start with a valid character

  const repoForkOwner = getRepoForkOwner(options);
  consoleLog(`\n${chalk.bold(`Backporting to ${JSON.stringify(target)}:`)}`);

  await validateTargetBranch({ ...options, branchName: targetBranch });
  await createBackportBranch({
    options,
    sourceBranch: getSourceBranchFromCommits(commits),
    targetBranch,
    backportBranch,
  });

  const commitsFlattened = flatten(
    await Promise.all(commits.map((c) => getMergeCommits(options, c))),
  );

  const cherrypickResults = await sequentially(commitsFlattened, (commit) =>
    waitForCherrypick(options, commit, target),
  );
  const hasAnyCommitWithConflicts = cherrypickResults.some(
    (r) => r.hasCommitsWithConflicts,
  );

  if (!options.dryRun) {
    await pushBackportBranch({ options, backportBranch });
    await deleteBackportBranch({ options, backportBranch });
  }

  const prPayload: PullRequestPayload = {
    owner: options.repoOwner,
    repo: options.repoName,
    title: getTitle({ options, commits, targetBranch }),
    body: getPullRequestBody({ options, commits, targetBranch }),
    head: `${repoForkOwner}:${backportBranch}`, // eg. sorenlouv:backport/7.x/pr-75007
    base: targetBranch, // eg. 7.x
    draft: options.draft,
  };

  const targetPullRequest = await createPullRequest({ options, prPayload });

  // add assignees to target pull request
  const assignees = options.autoAssign
    ? [options.authenticatedUsername]
    : options.assignees;

  if (options.assignees.length > 0) {
    await addAssigneesToPullRequest({
      ...options,
      pullNumber: targetPullRequest.number,
      assignees,
    });
  }

  // add reviewers to target pull request
  if (options.reviewers.length > 0) {
    await addReviewersToPullRequest(
      options,
      targetPullRequest.number,
      options.reviewers,
    );
  }

  // add reviewers of the original PRs to the target pull request
  if (options.copySourcePRReviewers) {
    await copySourcePullRequestReviewersToTargetPullRequest(
      options,
      commits,
      targetPullRequest.number,
    );
  }

  // add labels to target pull request
  if (options.targetPRLabels.length > 0) {
    const labels = getTargetPRLabels({
      interactive: options.interactive,
      targetPRLabels: options.targetPRLabels,
      commits,
      targetBranch,
    });

    await addLabelsToPullRequest({
      ...options,
      pullNumber: targetPullRequest.number,
      labels,
    });
  }

  if (options.copySourcePRLabels) {
    await copySourcePullRequestLabelsToTargetPullRequest(
      options,
      commits,
      targetPullRequest.number,
    );
  }

  // make PR auto mergable
  if (options.autoMerge && !hasAnyCommitWithConflicts) {
    await autoMergeNowOrLater(options, targetPullRequest.number);
  }

  // add labels to source pull requests
  if (options.sourcePRLabels.length > 0) {
    const promises = commits.map((commit) => {
      if (commit.sourcePullRequest) {
        return addLabelsToPullRequest({
          ...options,
          pullNumber: commit.sourcePullRequest.number,
          labels: options.sourcePRLabels,
        });
      }
    });

    await Promise.all(promises);
  }

  consoleLog(`View pull request: ${targetPullRequest.url}`);

  return targetPullRequest;
}
