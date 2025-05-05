import { DocumentNode, print } from 'graphql';
import { getDevAccessToken } from '../../../../test/private/getDevAccessToken';
import { Commit } from '../../../sourceCommit/parseSourceCommit';
import * as apiRequestV4Module from '../apiRequestV4';
import { fetchCommitsByAuthor } from './fetchCommitsByAuthor';

const accessToken = getDevAccessToken();

describe('fetchCommitsByAuthor', () => {
  describe('snapshot request/response', () => {
    let spy: jest.SpyInstance;
    let commits: Commit[];

    beforeEach(async () => {
      spy = jest.spyOn(apiRequestV4Module, 'apiRequestV4');
      commits = await fetchCommitsByAuthor({
        accessToken,
        author: 'sorenlouv',
        maxNumber: 10,
        repoName: 'kibana',
        repoOwner: 'elastic',
        sourceBranch: 'main',
        dateSince: '2021-01-10T00:00:00Z',
        dateUntil: '2022-01-01T00:00:00Z',
        commitPaths: [] as Array<string>,
      });
    });

    it('makes the right queries', () => {
      const queries = spy.mock.calls.reduce((acc, call) => {
        const query = call[0].query as DocumentNode;
        //@ts-expect-error
        const name = query.definitions[0].name.value;
        return { ...acc, [name]: print(query) };
      }, {});

      const queryNames = Object.keys(queries);
      expect(queryNames).toEqual(['AuthorId', 'CommitsByAuthor']);

      queryNames.forEach((name) => {
        expect(queries[name]).toMatchSnapshot(`Query: ${name}`);
      });
    });

    it('returns the correct response', async () => {
      expect(commits).toMatchSnapshot();
    });
  });

  describe('commitPaths', () => {
    const getOptions = () => ({
      accessToken,
      author: 'sorenlouv',
      maxNumber: 10,
      repoName: 'repo-with-different-commit-paths',
      repoOwner: 'backport-org',
      sourceBranch: 'main',
      dateSince: null,
      dateUntil: null,
    });

    const getCommitMessages = (commits: Commit[]) => {
      return commits.map((c) =>
        c.sourceCommit.message.replace(/(\r\n|\n|\r)/gm, ''),
      );
    };

    it('returns all commits', async () => {
      const commits = await fetchCommitsByAuthor({
        ...getOptions(),
        commitPaths: [] as Array<string>,
      });

      const commitMessages = getCommitMessages(commits);
      expect(commitMessages).toEqual([
        'Edit all lyrics',
        'Update .backportrc.json',
        'Edit "Take on me"',
        'Add backportrc.json',
        'Add "Bohemian Rhapsody""',
        'Add "99 Luftballons"',
        'Add "Take on me"',
      ]);
    });

    it('only returns commits related to "99-luftballons.txt"', async () => {
      const commits = await fetchCommitsByAuthor({
        ...getOptions(),
        commitPaths: ['lyrics/99-luftballons.txt'],
      });

      const commitMessages = getCommitMessages(commits);
      expect(commitMessages).toEqual([
        'Edit all lyrics',
        'Add "99 Luftballons"',
      ]);
    });

    it('only returns commits related to "take-on-me.txt"', async () => {
      const commits = await fetchCommitsByAuthor({
        ...getOptions(),
        commitPaths: ['lyrics/take-on-me.txt'],
      });

      const commitMessages = getCommitMessages(commits);
      expect(commitMessages).toEqual([
        'Edit all lyrics',
        'Edit "Take on me"',
        'Add "Take on me"',
      ]);
    });

    it('removes duplicates and order by `committedDate`', async () => {
      const commits = await fetchCommitsByAuthor({
        ...getOptions(),
        commitPaths: [
          'lyrics/99-luftballons.txt',
          'lyrics/take-on-me.txt',
          'lyrics/bohemian-rhapsody.txt',
        ],
      });

      const commitMessages = getCommitMessages(commits);
      expect(commitMessages).toEqual([
        'Edit all lyrics',
        'Edit "Take on me"',
        'Add "Bohemian Rhapsody""',
        'Add "99 Luftballons"',
        'Add "Take on me"',
      ]);
    });
  });

  describe('targetPullRequestStates', () => {
    let res: Awaited<ReturnType<typeof fetchCommitsByAuthor>>;
    beforeEach(async () => {
      res = await fetchCommitsByAuthor({
        accessToken,
        commitPaths: [],
        maxNumber: 10,
        repoName: 'backport-e2e',
        repoOwner: 'backport-org',
        sourceBranch: 'master',
        author: null,
        dateSince: null,
        dateUntil: null,
      });
    });

    it('returns related OPEN PRs', async () => {
      const commitWithOpenPR = res.find(
        (commit) => commit.sourcePullRequest?.number === 9,
      );
      expect(commitWithOpenPR?.targetPullRequestStates).toEqual([
        {
          branch: '7.8',
          label: 'v7.8.0',
          branchLabelMappingKey: '^v(\\d+).(\\d+).\\d+$',
          isSourceBranch: false,
          state: 'OPEN',
          number: 10,
          url: 'https://github.com/backport-org/backport-e2e/pull/10',
        },
      ]);
    });

    it('returns related MERGED PRs', async () => {
      const commitWithMergedPRs = res.find(
        (commit) => commit.sourcePullRequest?.number === 5,
      );
      expect(commitWithMergedPRs?.targetPullRequestStates).toEqual([
        {
          branch: '7.8',
          label: 'v7.8.0',
          branchLabelMappingKey: '^v(\\d+).(\\d+).\\d+$',
          isSourceBranch: false,
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
          label: 'v7.9.0',
          branchLabelMappingKey: '^v7.9.0$',
          isSourceBranch: false,
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
          label: 'v8.0.0',
          branchLabelMappingKey: '^v8.0.0$',
          isSourceBranch: true,
          mergeCommit: {
            message: 'Add 🍏 emoji (#5)',
            sha: 'ee8c492334cef1ca077a56addb79a26f79821d2f',
          },
          number: 5,
          state: 'MERGED',
          url: 'https://github.com/backport-org/backport-e2e/pull/5',
        },
      ]);
    });

    it('returns missing pull requests', async () => {
      const commitWithoutPRs = res.find(
        (commit) => commit.sourcePullRequest?.number === 8,
      );
      expect(commitWithoutPRs?.targetPullRequestStates).toEqual([
        {
          branch: '7.x',
          label: 'v7.9.0',
          branchLabelMappingKey: '^v7.9.0$',
          isSourceBranch: false,
          state: 'NOT_CREATED',
        },
        {
          branch: 'master',
          label: 'v8.0.0',
          branchLabelMappingKey: '^v8.0.0$',
          isSourceBranch: true,
          mergeCommit: {
            message: 'Change Ulysses to Gretha (conflict) (#8)',
            sha: 'b484e161b705b39dbbfc5005e67ca24d05b23c37',
          },
          number: 8,
          state: 'MERGED',
          url: 'https://github.com/backport-org/backport-e2e/pull/8',
        },
      ]);
    });
  });
});
