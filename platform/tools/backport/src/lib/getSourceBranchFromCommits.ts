import { Commit } from '../entrypoint.api';

export function getSourceBranchFromCommits(commits: Commit[]) {
  // sourceBranch should be the same for all commits, so picking `sourceBranch` from the first commit should be fine 🤞
  // this is specifically needed when backporting a PR like `backport --pr 123` and the source PR was merged to a non-default (aka non-master) branch.
  const { sourceBranch } = commits[0];
  return sourceBranch;
}
