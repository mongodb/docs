import { getDevAccessToken } from '../../../../test/private/getDevAccessToken';
import { Commit } from '../../../sourceCommit/parseSourceCommit';
import { fetchPullRequestsBySearchQuery } from './fetchPullRequestsBySearchQuery';

const accessToken = getDevAccessToken();

describe('fetchPullRequestsBySearchQuery', () => {
  describe('when filter does not match any PRs', () => {
    it('throws an error', async () => {
      const options = {
        accessToken,
        author: 'sorenlouv',
        dateSince: null,
        dateUntil: null,
        maxNumber: 10,
        prFilter: 'label:non-existing',
        repoName: 'backport-e2e',
        repoOwner: 'backport-org',
        sourceBranch: 'master',
      };

      await expect(fetchPullRequestsBySearchQuery(options)).rejects
        .toThrowErrorMatchingInlineSnapshot(`
              "No commits found for query:
                  type:pr is:merged sort:created-desc repo:backport-org/backport-e2e author:sorenlouv base:master label:non-existing

              Use \`--all\` to see commits by all users or \`--author=<username>\` for commits from a specific user"
            `);
    });
  });

  describe('when filter matches PRs', () => {
    it('returns the merge commits for those PRs', async () => {
      const options = {
        accessToken,
        author: 'sorenlouv',
        dateSince: null,
        dateUntil: null,
        maxNumber: 10,
        prFilter: 'label:v7.8.0',
        repoName: 'backport-e2e',
        repoOwner: 'backport-org',
        sourceBranch: 'master',
      };

      const expectedCommits: Commit[] = [
        {
          author: { email: 'sorenlouv@gmail.com', name: 'Søren Louv-Jansen' },
          suggestedTargetBranches: [],
          sourceCommit: {
            branchLabelMapping: {
              '^v(\\d+).(\\d+).\\d+$': '$1.$2',
              '^v7.9.0$': '7.x',
              '^v8.0.0$': 'master',
            },
            committedDate: '2020-08-16T21:44:28Z',
            message: 'Add sheep emoji (#9)',
            sha: 'eebf165c82a4b718d95c11b3877e365b1949ff28',
          },
          sourcePullRequest: {
            labels: ['v7.8.0'],
            number: 9,
            title: 'Add sheep emoji',
            url: 'https://github.com/backport-org/backport-e2e/pull/9',
            mergeCommit: {
              message: 'Add sheep emoji (#9)',
              sha: 'eebf165c82a4b718d95c11b3877e365b1949ff28',
            },
          },
          sourceBranch: 'master',
          targetPullRequestStates: [
            {
              branch: '7.8',
              label: 'v7.8.0',
              branchLabelMappingKey: '^v(\\d+).(\\d+).\\d+$',
              isSourceBranch: false,
              state: 'OPEN',
              number: 10,
              url: 'https://github.com/backport-org/backport-e2e/pull/10',
            },
          ],
        },
        {
          author: { email: 'sorenlouv@gmail.com', name: 'Søren Louv-Jansen' },
          suggestedTargetBranches: [],
          sourceCommit: {
            branchLabelMapping: {
              '^v(\\d+).(\\d+).\\d+$': '$1.$2',
              '^v7.9.0$': '7.x',
              '^v8.0.0$': 'master',
            },
            committedDate: '2020-08-15T12:40:19Z',
            message: 'Add 🍏 emoji (#5)',
            sha: 'ee8c492334cef1ca077a56addb79a26f79821d2f',
          },
          sourcePullRequest: {
            labels: ['v7.8.0', 'v7.9.0', 'v8.0.0'],
            number: 5,
            title: 'Add 🍏 emoji',
            url: 'https://github.com/backport-org/backport-e2e/pull/5',
            mergeCommit: {
              message: 'Add 🍏 emoji (#5)',
              sha: 'ee8c492334cef1ca077a56addb79a26f79821d2f',
            },
          },
          sourceBranch: 'master',
          targetPullRequestStates: [
            {
              branch: '7.8',
              isSourceBranch: false,
              label: 'v7.8.0',
              branchLabelMappingKey: '^v(\\d+).(\\d+).\\d+$',
              mergeCommit: {
                message: 'Add 🍏 emoji (#5) (#7)',
                sha: '46cd6f9999effdf894a36dbc7db90e890f4be840',
              },
              number: 7,
              state: 'MERGED',
              url: 'https://github.com/backport-org/backport-e2e/pull/7',
            },
            {
              branch: '7.x',
              isSourceBranch: false,
              label: 'v7.9.0',
              branchLabelMappingKey: '^v7.9.0$',
              mergeCommit: {
                message: 'Add 🍏 emoji (#5) (#6)',
                sha: '4bcd876d4ceaa73cf437bfc89b74d1a4e704c0a6',
              },
              number: 6,
              state: 'MERGED',
              url: 'https://github.com/backport-org/backport-e2e/pull/6',
            },
            {
              branch: 'master',
              isSourceBranch: true,
              label: 'v8.0.0',
              branchLabelMappingKey: '^v8.0.0$',
              mergeCommit: {
                message: 'Add 🍏 emoji (#5)',
                sha: 'ee8c492334cef1ca077a56addb79a26f79821d2f',
              },
              number: 5,
              state: 'MERGED',
              url: 'https://github.com/backport-org/backport-e2e/pull/5',
            },
          ],
        },
      ];

      expect(await fetchPullRequestsBySearchQuery(options)).toEqual(
        expectedCommits,
      );
    });
  });
});
