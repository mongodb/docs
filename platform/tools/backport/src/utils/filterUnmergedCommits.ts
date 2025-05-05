import { Commit } from '../entrypoint.api';

export function filterUnmergedCommits(commit: Commit) {
  return commit.targetPullRequestStates.some((pr) => pr.state !== 'MERGED');
}
