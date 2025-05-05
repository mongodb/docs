import { getDevAccessToken } from '../../../../test/private/getDevAccessToken';
import { fetchCommitsForRebaseAndMergeStrategy } from './fetchCommitsForRebaseAndMergeStrategy';

const accessToken = getDevAccessToken();

describe('fetchCommitsForRebaseAndMergeStrategy', () => {
  it('returns multiple commits for pull requests merged with "Rebase and merge" strategy', async () => {
    const commitsTotalCount = 3;
    const commits = await fetchCommitsForRebaseAndMergeStrategy(
      {
        accessToken,
        repoOwner: 'backport-org',
        repoName: 'different-merge-strategies',
        pullNumber: 21,
        sourceBranch: 'main',
      },
      commitsTotalCount,
    );

    expect(commits?.length).toBe(3);
  });

  it('returns `undefined` for pull request merged with "merge strategy"', async () => {
    const commitsTotalCount = 8;
    const commits = await fetchCommitsForRebaseAndMergeStrategy(
      {
        accessToken,
        repoOwner: 'backport-org',
        repoName: 'different-merge-strategies',
        pullNumber: 9,
        sourceBranch: 'main',
      },
      commitsTotalCount,
    );

    expect(commits).toBe(undefined);
  });
});
