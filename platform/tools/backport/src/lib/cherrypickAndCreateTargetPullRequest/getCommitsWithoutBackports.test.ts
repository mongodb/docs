import stripAnsi from 'strip-ansi';
import { ValidConfigOptions } from '../../options/options';
import * as git from '../git';
import * as fetchCommitsByAuthorModule from '../github/v4/fetchCommits/fetchCommitsByAuthor';
import { TargetPullRequest } from '../sourceCommit/getPullRequestStates';
import { getCommitsWithoutBackports } from './getCommitsWithoutBackports';

describe('getCommitsWithoutBackports', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('targetPullRequestStates', () => {
    function setupExpectedPullRequests({
      targetPullRequestStates,
    }: {
      targetPullRequestStates: TargetPullRequest[];
    }) {
      // simulate 1 unbackported commit
      jest
        .spyOn(fetchCommitsByAuthorModule, 'fetchCommitsByAuthor')
        .mockResolvedValueOnce([
          {
            author: {
              email: 'soren.louv@elastic.co',
              name: 'Søren Louv-Jansen',
            },
            suggestedTargetBranches: [],
            sourceCommit: {
              branchLabelMapping: {},
              committedDate: '10',
              message: 'First commit (#1)',
              sha: 'xyz',
            },
            sourcePullRequest: {
              labels: [],
              url: 'https://www.github.com/foo/bar/pull/123',
              number: 123,
              title: 'First commit',
              mergeCommit: {
                message: 'First commit (#1)',
                sha: 'xyz',
              },
            },
            targetPullRequestStates: targetPullRequestStates,
            sourceBranch: 'main',
          },
        ]);

      // simulate commit is definitely not backported
      jest.spyOn(git, 'getIsCommitInBranch').mockResolvedValueOnce(false);

      return getCommitsWithoutBackports({
        options: {} as ValidConfigOptions,
        commit: {
          author: { email: 'soren.louv@elastic.co', name: 'Søren Louv-Jansen' },
          suggestedTargetBranches: [],
          sourceCommit: {
            branchLabelMapping: {},
            committedDate: '100',
            message: 'Second commit (#2)',
            sha: 'abc',
          },
          targetPullRequestStates: [],
          sourceBranch: 'main',
        },
        targetBranch: '7.x',
        conflictingFiles: ['/foo/bar/baz.ts'],
      });
    }

    it('should not unbackported commits if no backports were expected', async () => {
      const commitsWithoutBackports = await setupExpectedPullRequests({
        targetPullRequestStates: [],
      });
      expect(commitsWithoutBackports.length).toEqual(0);
    });

    it('should display as missing if a backport is CLOSED', async () => {
      const commitsWithoutBackports = await setupExpectedPullRequests({
        targetPullRequestStates: [
          {
            state: 'CLOSED',
            branch: '7.x',
            number: 456,
            url: 'https://www.github.com/foo/bar/pull/456',
          },
        ],
      });
      expect(stripAnsi(commitsWithoutBackports[0].formatted)).toEqual(
        ' - First commit (#1) (backport missing)\n   https://www.github.com/foo/bar/pull/123',
      );
    });

    it('should display as missing if a backport is NOT_CREATED', async () => {
      const commitsWithoutBackports = await setupExpectedPullRequests({
        targetPullRequestStates: [
          {
            branchLabelMappingKey: 'foo tbd',
            state: 'NOT_CREATED',
            branch: '7.x',
            label: 'v7.0.0',
            isSourceBranch: false,
          },
        ],
      });
      expect(stripAnsi(commitsWithoutBackports[0].formatted)).toEqual(
        ' - First commit (#1) (backport missing)\n   https://www.github.com/foo/bar/pull/123',
      );
    });

    it('should display as pending if a backport is OPEN', async () => {
      const commitsWithoutBackports = await setupExpectedPullRequests({
        targetPullRequestStates: [
          {
            state: 'OPEN',
            branch: '7.x',
            url: 'https://www.github.com/foo/bar/pull/456',
            number: 456,
          },
        ],
      });
      expect(stripAnsi(commitsWithoutBackports[0].formatted)).toEqual(
        ' - First commit (#1) (backport pending)\n   https://www.github.com/foo/bar/pull/456',
      );
    });

    it('should not display commit as unbackported if a backport was MERGED', async () => {
      const commitsWithoutBackports = await setupExpectedPullRequests({
        targetPullRequestStates: [
          {
            state: 'MERGED',
            branch: '7.x',
            number: 456,
            url: 'https://www.github.com/foo/bar/pull/456',
          },
        ],
      });
      expect(commitsWithoutBackports).toEqual([]);
    });
  });

  describe('commitDate', () => {
    function setupCommitDateDiff({
      offendingCommitDate,
      currentCommitDate,
    }: {
      offendingCommitDate: string;
      currentCommitDate: string;
    }) {
      // simulate 1 commit with a pending backport
      jest
        .spyOn(fetchCommitsByAuthorModule, 'fetchCommitsByAuthor')
        .mockResolvedValueOnce([
          {
            author: {
              email: 'soren.louv@elastic.co',
              name: 'Søren Louv-Jansen',
            },
            suggestedTargetBranches: [],
            sourceCommit: {
              branchLabelMapping: {},
              committedDate: offendingCommitDate,
              message: 'First commit (#1)',
              sha: 'xyz',
            },
            sourcePullRequest: {
              labels: [],
              number: 123,
              title: 'First commit',
              url: 'https://www.github.com/foo/bar/pull/123',
              mergeCommit: {
                message: 'First commit (#1)',
                sha: 'xyz',
              },
            },
            sourceBranch: 'main',
            targetPullRequestStates: [
              {
                state: 'OPEN',
                branch: '7.x',
                number: 456,
                url: 'https://www.github.com/foo/bar/pull/456',
              },
            ],
          },
        ]);

      // simulate commit is definitely not backported
      jest.spyOn(git, 'getIsCommitInBranch').mockResolvedValueOnce(false);

      return getCommitsWithoutBackports({
        options: {} as ValidConfigOptions,
        commit: {
          author: { email: 'soren.louv@elastic.co', name: 'Søren Louv-Jansen' },
          suggestedTargetBranches: [],
          sourceCommit: {
            branchLabelMapping: {},
            committedDate: currentCommitDate,
            message: 'Second commit (#2)',
            sha: 'abc',
          },
          sourcePullRequest: {
            labels: [],
            number: 123,
            title: 'Second commit',
            url: 'https://www.github.com/foo/bar/pull/123',
            mergeCommit: {
              message: 'Second commit (#2)',
              sha: 'abc',
            },
          },
          sourceBranch: 'main',
          targetPullRequestStates: [],
        },
        targetBranch: '7.x',
        conflictingFiles: ['/foo/bar/baz.ts'],
      });
    }

    it('should not display commit as unbackport if is newer than the commit currently being backported', async () => {
      const commitsWithoutBackports = await setupCommitDateDiff({
        offendingCommitDate: '100',
        currentCommitDate: '10',
      });
      expect(commitsWithoutBackports).toEqual([]);
    });

    it('should display commit as unbackport if is older than the commit currently being backported', async () => {
      const commitsWithoutBackports = await setupCommitDateDiff({
        offendingCommitDate: '10',
        currentCommitDate: '100',
      });
      expect(stripAnsi(commitsWithoutBackports[0].formatted)).toEqual(
        ' - First commit (#1) (backport pending)\n   https://www.github.com/foo/bar/pull/456',
      );
    });
  });

  describe('targetBranch', () => {
    function setupTargetBranchDiff({
      offendingCommitTargetBranch,
      currentCommitTargetBranch,
    }: {
      offendingCommitTargetBranch: string;
      currentCommitTargetBranch: string;
    }) {
      // return mock commits that also touched the conflicting files
      jest
        .spyOn(fetchCommitsByAuthorModule, 'fetchCommitsByAuthor')
        .mockResolvedValueOnce([
          {
            author: {
              email: 'soren.louv@elastic.co',
              name: 'Søren Louv-Jansen',
            },
            suggestedTargetBranches: [],
            sourceCommit: {
              branchLabelMapping: {},
              committedDate: '10',
              message: 'First commit (#1)',
              sha: 'xyz',
            },
            sourcePullRequest: {
              labels: [],
              number: 123,
              title: 'First commit',
              url: 'https://www.github.com/foo/bar/pull/123',
              mergeCommit: {
                message: 'First commit (#1)',
                sha: 'xyz',
              },
            },
            sourceBranch: 'main',
            targetPullRequestStates: [
              {
                branch: offendingCommitTargetBranch,
                state: 'OPEN',
                url: 'https://www.github.com/foo/bar/pull/456',
                number: 456,
              },
            ],
          },
        ]);

      // simulate commit is definitely not backported
      jest.spyOn(git, 'getIsCommitInBranch').mockResolvedValueOnce(false);

      return getCommitsWithoutBackports({
        options: {} as ValidConfigOptions,

        // commit that is being backported
        commit: {
          author: { email: 'soren.louv@elastic.co', name: 'Søren Louv-Jansen' },
          suggestedTargetBranches: [],
          sourceCommit: {
            branchLabelMapping: {},
            committedDate: '100',
            message: 'Second commit (#2)',
            sha: 'abc',
          },
          sourcePullRequest: {
            labels: [],
            url: 'https://www.github.com/foo/bar/pull/123',
            number: 123,
            title: 'Second commit',
            mergeCommit: {
              message: 'Second commit (#2)',
              sha: 'abc',
            },
          },
          targetPullRequestStates: [],
          sourceBranch: 'main',
        },
        targetBranch: currentCommitTargetBranch,
        conflictingFiles: ['/foo/bar/baz.ts'],
      });
    }

    it('should display backport as pending if target branches match', async () => {
      const commitsWithoutBackports = await setupTargetBranchDiff({
        offendingCommitTargetBranch: '7.x',
        currentCommitTargetBranch: '7.x',
      });
      expect(stripAnsi(commitsWithoutBackports[0].formatted)).toEqual(
        ' - First commit (#1) (backport pending)\n   https://www.github.com/foo/bar/pull/456',
      );
    });

    it("should not display commit if target branches don't match", async () => {
      const commitsWithoutBackports = await setupTargetBranchDiff({
        offendingCommitTargetBranch: '7.x',
        currentCommitTargetBranch: '8.x',
      });
      expect(commitsWithoutBackports.length).toBe(0);
    });
  });

  describe("when conflicting commit doesn't have an associated pull request", () => {
    it('should be ignored', async () => {
      jest
        .spyOn(fetchCommitsByAuthorModule, 'fetchCommitsByAuthor')
        .mockResolvedValueOnce([
          {
            author: {
              email: 'soren.louv@elastic.co',
              name: 'Søren Louv-Jansen',
            },
            suggestedTargetBranches: [],
            sourceCommit: {
              branchLabelMapping: {},
              committedDate: '10',
              sha: 'xyz',
              message: 'First commit (#1)',
            },
            targetPullRequestStates: [],
            sourceBranch: 'main',
          },
        ]);

      // simulate commit is definitely not backported
      jest.spyOn(git, 'getIsCommitInBranch').mockResolvedValueOnce(false);

      const commitsWithoutBackports = await getCommitsWithoutBackports({
        options: {} as ValidConfigOptions,
        commit: {
          author: { email: 'soren.louv@elastic.co', name: 'Søren Louv-Jansen' },
          suggestedTargetBranches: [],
          sourceCommit: {
            branchLabelMapping: {},
            committedDate: '100',
            message: 'Second commit (#2)',
            sha: 'abc',
          },
          sourcePullRequest: {
            labels: [],
            url: 'https://www.github.com/foo/bar/pull/123',
            number: 123,
            title: 'Second commit',
            mergeCommit: {
              message: 'Second commit (#2)',
              sha: 'abc',
            },
          },
          targetPullRequestStates: [],
          sourceBranch: 'main',
        },
        targetBranch: '7.x',
        conflictingFiles: ['/foo/bar/baz.ts'],
      });

      expect(commitsWithoutBackports.length).toEqual(0);
    });
  });
});
