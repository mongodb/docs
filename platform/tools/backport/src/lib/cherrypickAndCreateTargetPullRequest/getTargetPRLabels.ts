import { uniq } from 'lodash';
import { Commit } from '../../entrypoint.api';
import { filterNil } from '../../utils/filterEmpty';
import { getSourceBranchFromCommits } from '../getSourceBranchFromCommits';
import { logger } from '../logger';

export function getTargetPRLabels({
  interactive,
  targetPRLabels,
  commits,
  targetBranch,
}: {
  interactive: boolean;
  targetPRLabels: string[];
  commits: Commit[];
  targetBranch: string;
}) {
  const labels = getLabels({
    commits,
    targetBranch,
    targetPRLabels,
    interactive,
  });

  return uniq(labels);
}

function getLabels({
  commits,
  targetBranch,
  targetPRLabels,
  interactive,
}: {
  commits: Commit[];
  targetBranch: string;
  targetPRLabels: string[];
  interactive: boolean;
}) {
  const sourceBranch = getSourceBranchFromCommits(commits);
  const labels = commits
    .flatMap((c) => {
      const targetPullRequest = c.targetPullRequestStates.find(
        (pr) => pr.branch === targetBranch,
      );

      if (!targetPullRequest?.branchLabelMappingKey) {
        logger.info('Missing branchLabelMappingKey for target pull request');

        // remove dynamic labels like `$1` in interactive mode
        return targetPRLabels.filter((l) => {
          return l.match(/\$\d/) === null || !interactive;
        });
      }

      const regex = new RegExp(targetPullRequest.branchLabelMappingKey);

      return targetPRLabels.map((targetPRLabel) => {
        return targetPullRequest.label?.replace(regex, targetPRLabel);
      });
    })
    .filter(filterNil)
    .map((label) => {
      return label
        .replaceAll('{{targetBranch}}', targetBranch)
        .replaceAll('{{sourceBranch}}', sourceBranch);
    });

  return labels;
}
