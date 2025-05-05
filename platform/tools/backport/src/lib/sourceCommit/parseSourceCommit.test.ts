import { ValidConfigOptions } from '../../options/options';
import { getMockSourceCommit } from './getMockSourceCommit';
import { Commit, parseSourceCommit } from './parseSourceCommit';

describe('parseSourceCommit', () => {
  describe('pullNumber', () => {
    it('receives `pullNumber` from the associated pull request', () => {
      const mockSourceCommit = getMockSourceCommit({
        sourceCommit: { message: 'My commit message (#1234)' },
        sourcePullRequest: { number: 55 },
      });

      const commit = parseSourceCommit({
        sourceCommit: mockSourceCommit,
        options: {} as unknown as ValidConfigOptions,
      });

      expect(commit.sourcePullRequest?.number).toBe(55);
    });
  });

  describe('sourceBranch', () => {
    it('sets sourceBranch based on `baseRefName` from associated PR', () => {
      const mockSourceCommit = getMockSourceCommit({
        sourceCommit: { message: 'My commit message (#66)' },
        sourcePullRequest: { number: 55, sourceBranch: 'a sourcebranch' },
      });

      const commit = parseSourceCommit({
        sourceCommit: mockSourceCommit,
        options: {} as unknown as ValidConfigOptions,
      });

      expect(commit.sourceBranch).toBe('a sourcebranch');
    });

    it('sets uses options.sourceBranch as fallback', () => {
      const mockSourceCommit = getMockSourceCommit({
        sourceCommit: { message: 'My commit message (#66)' },
        sourcePullRequest: null,
      });

      const commit = parseSourceCommit({
        sourceCommit: mockSourceCommit,
        options: {
          sourceBranch: 'sourcebranch-from-options',
        } as unknown as ValidConfigOptions,
      });

      expect(commit.sourceBranch).toBe('sourcebranch-from-options');
    });
  });

  describe('targetPullRequestStates', () => {
    it('uses options.branchLabelMapping when sourceCommit is empty', () => {
      const branchLabelMapping = {
        '^v6.4.0$': 'main',
        '^v(\\d+).(\\d+).\\d+$': '$1.$2',
      };
      const mockSourceCommit = getMockSourceCommit({
        sourceCommit: {
          sha: 'my sha',
          message: 'My commit message (#66)',
          commitedDate: '2021-03-03T00:00:00Z',
        },
        sourcePullRequest: {
          title: 'My commit message',
          sourceBranch: 'main',
          number: 55,
          labels: ['v6.4.0', 'v6.3.0', 'v6.2.0', 'v6.1.0'],
        },
        timelineItems: [
          {
            state: 'MERGED',
            targetBranch: '6.3',
            commitMessages: ['My commit message (#66)'],
            number: 5678,
          },
          {
            state: 'OPEN',
            targetBranch: '6.2',
            commitMessages: ['My commit message (#66)'],
            number: 9876,
          },
        ],
      });

      const commit = parseSourceCommit({
        sourceCommit: mockSourceCommit,
        options: {
          branchLabelMapping,
        } as unknown as ValidConfigOptions,
      });

      expect(commit.suggestedTargetBranches).toEqual(['6.1']);
      expect(commit.targetPullRequestStates).toEqual([
        {
          branch: 'main',
          label: 'v6.4.0',
          branchLabelMappingKey: '^v6.4.0$',
          isSourceBranch: true,
          mergeCommit: {
            message: 'My commit message (#66)',
            sha: 'my sha',
          },
          number: 55,
          state: 'MERGED',
          url: 'https://github.com/elastic/kibana/pull/55',
        },
        {
          branch: '6.3',
          label: 'v6.3.0',
          branchLabelMappingKey: '^v(\\d+).(\\d+).\\d+$',
          isSourceBranch: false,
          number: 5678,
          state: 'MERGED',
          url: 'https://github.com/elastic/kibana/pull/5678',
          mergeCommit: {
            message: 'My commit message (#66)',
            sha: 'target-merge-commit-sha',
          },
        },
        {
          branch: '6.2',
          label: 'v6.2.0',
          branchLabelMappingKey: '^v(\\d+).(\\d+).\\d+$',
          isSourceBranch: false,
          number: 9876,
          state: 'OPEN',
          url: 'https://github.com/elastic/kibana/pull/9876',
        },
        {
          branch: '6.1',
          label: 'v6.1.0',
          branchLabelMappingKey: '^v(\\d+).(\\d+).\\d+$',
          isSourceBranch: false,
          state: 'NOT_CREATED',
        },
      ]);
    });

    it('uses the sourceCommit branchLabelMapping where 6.3 is pointing to main', () => {
      const sourceCommitBranchLabelMapping = {
        '^v6.3.0$': 'main', // 6.3 is pointing to main
        '^v(\\d+).(\\d+).\\d+$': '$1.$2',
      };

      const latestBranchLabelMapping = {
        '^v6.4.0$': 'main', // 6.4 is pointing to main
        '^v(\\d+).(\\d+).\\d+$': '$1.$2',
      };

      const mockSourceCommit = getMockSourceCommit({
        sourceCommit: {
          sha: 'my-sha',
          remoteConfig: {
            branchLabelMapping: sourceCommitBranchLabelMapping,
            committedDate: '2021-02-02T00:00:00Z',
          },
          message: 'My commit message (#66)',
          commitedDate: '2021-03-03T00:00:00Z',
        },
        sourcePullRequest: {
          sourceBranch: 'main',
          number: 55,
          labels: ['v6.3.0', 'v6.2.0', 'v6.1.0'],
        },
        timelineItems: [
          {
            state: 'OPEN',
            targetBranch: '6.2',
            commitMessages: ['My commit message (#66)'],
            number: 9876,
          },
        ],
      });

      const commit = parseSourceCommit({
        sourceCommit: mockSourceCommit,
        options: {
          branchLabelMapping: latestBranchLabelMapping,
        } as unknown as ValidConfigOptions,
      });

      expect(commit.suggestedTargetBranches).toEqual(['6.1']);
      expect(commit.targetPullRequestStates).toEqual([
        {
          branch: 'main',
          isSourceBranch: true,
          label: 'v6.3.0',
          branchLabelMappingKey: '^v6.3.0$',
          mergeCommit: {
            message: 'My commit message (#66)',
            sha: 'my-sha',
          },
          number: 55,
          state: 'MERGED',
          url: 'https://github.com/elastic/kibana/pull/55',
        },
        {
          branch: '6.2',
          label: 'v6.2.0',
          branchLabelMappingKey: '^v(\\d+).(\\d+).\\d+$',
          isSourceBranch: false,
          number: 9876,
          state: 'OPEN',
          url: 'https://github.com/elastic/kibana/pull/9876',
        },
        {
          branch: '6.1',
          label: 'v6.1.0',
          branchLabelMappingKey: '^v(\\d+).(\\d+).\\d+$',
          isSourceBranch: false,
          state: 'NOT_CREATED',
        },
      ]);
    });
  });

  it('returns the correct source commit', () => {
    const branchLabelMapping = {
      '^v6.3.0$': '6.x',
      '^v(\\d+).(\\d+).\\d+$': '$1.$2',
    };

    const mockSourceCommit = getMockSourceCommit({
      sourceCommit: {
        remoteConfig: {
          branchLabelMapping,
          committedDate: '2021',
        },
        message: 'My commit message (#1234)',
        sha: 'my-sha',
      },
      sourcePullRequest: {
        title: 'My commit message',
        number: 1234,
        labels: ['v6.3.0', 'v6.2.0', 'v6.1.0'],
      },
      timelineItems: [
        {
          state: 'MERGED',
          targetBranch: '6.x',
          commitMessages: ['My commit message (#1234)'],
          number: 5678,
        },
        {
          state: 'OPEN',
          targetBranch: '6.2',
          commitMessages: ['My commit message (#1234)'],
          number: 9876,
        },
      ],
    });

    const commit = parseSourceCommit({
      sourceCommit: mockSourceCommit,
      options: { branchLabelMapping } as unknown as ValidConfigOptions,
    });

    const expectedCommit: Commit = {
      suggestedTargetBranches: ['6.1'],
      author: { email: 'soren.louv@elastic.co', name: 'Søren Louv-Jansen' },
      sourceCommit: {
        committedDate: '2021-12-22T00:00:00Z',
        message: 'My commit message (#1234)',
        sha: 'my-sha',
        branchLabelMapping,
      },
      sourcePullRequest: {
        labels: ['v6.3.0', 'v6.2.0', 'v6.1.0'],
        number: 1234,
        title: 'My commit message',
        url: 'https://github.com/elastic/kibana/pull/1234',
        mergeCommit: {
          message: 'My commit message (#1234)',
          sha: 'my-sha',
        },
      },
      sourceBranch: 'source-branch-from-associated-pull-request',
      targetPullRequestStates: [
        {
          branch: '6.x',
          label: 'v6.3.0',
          branchLabelMappingKey: '^v6.3.0$',

          isSourceBranch: false,
          number: 5678,
          state: 'MERGED',
          url: 'https://github.com/elastic/kibana/pull/5678',
          mergeCommit: {
            message: 'My commit message (#1234)',
            sha: 'target-merge-commit-sha',
          },
        },
        {
          branch: '6.2',
          label: 'v6.2.0',
          branchLabelMappingKey: '^v(\\d+).(\\d+).\\d+$',
          isSourceBranch: false,
          number: 9876,
          state: 'OPEN',
          url: 'https://github.com/elastic/kibana/pull/9876',
        },
        {
          branch: '6.1',
          label: 'v6.1.0',
          branchLabelMappingKey: '^v(\\d+).(\\d+).\\d+$',
          isSourceBranch: false,
          state: 'NOT_CREATED',
        },
      ],
    };

    expect(commit).toEqual(expectedCommit);
  });
});
