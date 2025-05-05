import { getDevAccessToken } from '../../../../test/private/getDevAccessToken';
import { Commit } from '../../../sourceCommit/parseSourceCommit';
import { fetchCommitsByPullNumber } from './fetchCommitByPullNumber';
import { fetchCommitBySha } from './fetchCommitBySha';
import { fetchCommitsByAuthor } from './fetchCommitsByAuthor';
import { fetchPullRequestsBySearchQuery } from './fetchPullRequestsBySearchQuery';

const accessToken = getDevAccessToken();
jest.setTimeout(15_000);

describe('allFetchers', () => {
  let commitByAuthor: Commit;

  beforeEach(async () => {
    const commitsByAuthor = await fetchCommitsByAuthor({
      accessToken,
      author: 'sorenlouv',
      maxNumber: 1,
      repoName: 'kibana',
      repoOwner: 'elastic',
      sourceBranch: 'main',
      dateSince: '2021-01-10T00:00:00Z',
      dateUntil: '2022-01-01T00:00:00Z',
      commitPaths: [] as Array<string>,
    });

    commitByAuthor = commitsByAuthor[0];
  });

  it('matches commitByAuthor with commitByPullNumber', async () => {
    if (!commitByAuthor.sourcePullRequest) {
      throw new Error('Missing pull number!');
    }

    const commitByPullNumber = await fetchCommitsByPullNumber({
      repoOwner: 'elastic',
      repoName: 'kibana',
      accessToken,
      pullNumber: commitByAuthor.sourcePullRequest.number,
      sourceBranch: 'master',
    });

    expect(commitByAuthor).toEqual(commitByPullNumber[0]);
  });

  it('matches commitByAuthor with commitBySha', async () => {
    const commitBySha = await fetchCommitBySha({
      repoOwner: 'elastic',
      repoName: 'kibana',
      accessToken,
      sha: commitByAuthor.sourceCommit.sha,
      sourceBranch: 'main',
    });

    expect(commitByAuthor).toEqual(commitBySha);
  });

  it('matches commitByAuthor with commitBySearchQuery', async () => {
    const commitsBySearchQuery = await fetchPullRequestsBySearchQuery({
      accessToken,
      author: 'sorenlouv',
      dateSince: null,
      dateUntil: null,
      maxNumber: 1,
      prFilter: `created:2021-12-20..2021-12-20`,
      repoName: 'kibana',
      repoOwner: 'elastic',
      sourceBranch: 'main',
    });

    const commitBySearchQuery = commitsBySearchQuery[0];

    expect(commitByAuthor).toEqual(commitBySearchQuery);
  });

  it('returns correct response for commitByAuthor', async () => {
    const expectedCommit: Commit = {
      author: { email: 'soren.louv@elastic.co', name: 'Søren Louv-Jansen' },
      suggestedTargetBranches: [],
      sourceCommit: {
        branchLabelMapping: {
          '^v(\\d+).(\\d+).\\d+$': '$1.$2',
          '^v8.1.0$': 'main',
        },
        committedDate: '2021-12-20T14:20:16Z',
        message: '[APM] Add note about synthtrace to APM docs (#121633)',
        sha: 'd421ddcf6157150596581c7885afa3690cec6339',
      },
      sourcePullRequest: {
        labels: [
          'Team:APM - DEPRECATED',
          'v8.0.0',
          'release_note:skip',
          'auto-backport',
          'v8.1.0',
        ],
        number: 121633,
        title: '[APM] Add note about synthtrace to APM docs',
        url: 'https://github.com/elastic/kibana/pull/121633',
        mergeCommit: {
          message: '[APM] Add note about synthtrace to APM docs (#121633)',
          sha: 'd421ddcf6157150596581c7885afa3690cec6339',
        },
      },
      sourceBranch: 'main',
      targetPullRequestStates: [
        {
          branch: '8.0',
          label: 'v8.0.0',
          branchLabelMappingKey: '^v(\\d+).(\\d+).\\d+$',
          isSourceBranch: false,
          mergeCommit: {
            message:
              '[APM] Add note about synthtrace to APM docs (#121633) (#121643)\n\nCo-authored-by: Søren Louv-Jansen <soren.louv@elastic.co>',
            sha: '842adfdeb5541b059231857522f9009771a46107',
          },
          number: 121643,
          state: 'MERGED',
          url: 'https://github.com/elastic/kibana/pull/121643',
        },
        {
          branch: 'main',
          label: 'v8.1.0',
          branchLabelMappingKey: '^v8.1.0$',
          isSourceBranch: true,
          mergeCommit: {
            message: '[APM] Add note about synthtrace to APM docs (#121633)',
            sha: 'd421ddcf6157150596581c7885afa3690cec6339',
          },
          number: 121633,
          state: 'MERGED',
          url: 'https://github.com/elastic/kibana/pull/121633',
        },
      ],
    };
    expect(commitByAuthor).toEqual(expectedCommit);
  });
});
