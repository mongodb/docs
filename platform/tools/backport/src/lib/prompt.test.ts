import stripAnsi from 'strip-ansi';
import { getChoicesForCommitPrompt } from './prompts';
import { Commit } from './sourceCommit/parseSourceCommit';

describe('prompt', () => {
  describe('getChoicesForCommitPrompt', () => {
    it('should display status badges via `targetPullRequestStates`', () => {
      const commits: Commit[] = [
        {
          author: { email: 'soren.louv@elastic.co', name: 'Søren Louv-Jansen' },
          sourceBranch: 'master',
          suggestedTargetBranches: [],
          sourceCommit: {
            branchLabelMapping: {},
            committedDate: '1',
            sha: 'ae9d51b7fe3ee6f30d0d196c782e0dcabb7ac5ff',
            message:
              '[APM] Remove log-log descriptions from correlation charts (#119700)',
          },
          sourcePullRequest: {
            labels: [],
            number: 119700,
            url: 'foo',
            title: '[APM] Remove log-log descriptions from correlation charts',
            mergeCommit: {
              sha: 'ae9d51b7fe3ee6f30d0d196c782e0dcabb7ac5ff',
              message:
                '[APM] Remove log-log descriptions from correlation charts (#119700)',
            },
          },
          targetPullRequestStates: [
            {
              branchLabelMappingKey: 'foo tbd',
              number: 120178,
              branch: '8.0',
              label: '',
              isSourceBranch: false,
              state: 'MERGED',
            },
            {
              branchLabelMappingKey: 'foo tbd',
              number: 120179,
              branch: '7.16',
              state: 'MERGED',
              label: '',
              isSourceBranch: false,
            },
            {
              branchLabelMappingKey: 'foo tbd',
              number: 120179,
              branch: '7.15',
              state: 'NOT_CREATED',
              label: '',
              isSourceBranch: false,
            },
          ],
        },
      ];

      const choices = getChoicesForCommitPrompt(commits as any, false).map(
        ({ name, short }) => ({ name: stripAnsi(name), short }),
      );

      expect(choices).toEqual([
        {
          name: '1. [APM] Remove log-log descriptions from correlation charts (#119700) 8.0, 7.16, 7.15',
          short: '#119700 (ae9d51b7)',
        },
      ]);
    });

    it('should list choices', () => {
      const commits: Commit[] = [
        {
          author: { email: 'soren.louv@elastic.co', name: 'Søren Louv-Jansen' },
          sourceBranch: 'master',
          suggestedTargetBranches: [],
          sourceCommit: {
            branchLabelMapping: {},
            committedDate: '',
            sha: 'b1b491959dab47aeb83c88ee2accb2db46d23793',
            message: '[APM] Prefer service.name for logs correlation (#120694)',
          },
          sourcePullRequest: {
            labels: [],
            number: 120694,
            title: '[APM] Prefer service.name for logs correlation',
            url: 'foo',
            mergeCommit: {
              sha: 'b1b491959dab47aeb83c88ee2accb2db46d23793',
              message:
                '[APM] Prefer service.name for logs correlation (#120694)',
            },
          },
          targetPullRequestStates: [],
        },
        {
          author: { email: 'soren.louv@elastic.co', name: 'Søren Louv-Jansen' },
          sourceBranch: 'master',
          suggestedTargetBranches: [],
          sourceCommit: {
            branchLabelMapping: {},
            committedDate: '',
            sha: 'b1bb4a93959f19a653b9cfb207a5c6acb6559482',
            message:
              '[APM] Disable telemetry in agent config endpoint (#120106)',
          },
          sourcePullRequest: {
            labels: [],
            number: 120106,
            url: 'foo',
            title: '[APM] Disable telemetry in agent config endpoint',
            mergeCommit: {
              sha: 'b1bb4a93959f19a653b9cfb207a5c6acb6559482',
              message:
                '[APM] Disable telemetry in agent config endpoint (#120106)',
            },
          },
          targetPullRequestStates: [],
        },
        {
          author: { email: 'soren.louv@elastic.co', name: 'Søren Louv-Jansen' },
          sourceBranch: 'master',
          suggestedTargetBranches: [],
          sourceCommit: {
            branchLabelMapping: {},
            committedDate: '',
            sha: '434f6e6a88faf24dc1ea41f9f726db78e46355a7',
            message:
              '[APM] Remove index_pattern.json and add custom field formatters (#119915)',
          },
          sourcePullRequest: {
            labels: [],
            number: 119915,
            title:
              '[APM] Remove index_pattern.json and add custom field formatters',
            url: 'foo',
            mergeCommit: {
              sha: '434f6e6a88faf24dc1ea41f9f726db78e46355a7',
              message:
                '[APM] Remove index_pattern.json and add custom field formatters (#119915)',
            },
          },
          targetPullRequestStates: [],
        },
        {
          author: { email: 'soren.louv@elastic.co', name: 'Søren Louv-Jansen' },
          sourceBranch: 'master',
          suggestedTargetBranches: [],
          sourceCommit: {
            branchLabelMapping: {},
            committedDate: '',
            sha: 'ae9d51b7fe3ee6f30d0d196c782e0dcabb7ac5ff',
            message:
              '[APM] Remove log-log descriptions from correlation charts (#119700)',
          },
          sourcePullRequest: {
            labels: [],
            number: 119700,
            url: 'foo',
            title: '[APM] Remove log-log descriptions from correlation charts',
            mergeCommit: {
              sha: 'ae9d51b7fe3ee6f30d0d196c782e0dcabb7ac5ff',
              message:
                '[APM] Remove log-log descriptions from correlation charts (#119700)',
            },
          },
          targetPullRequestStates: [],
        },
      ];

      const choices = getChoicesForCommitPrompt(commits, false).map(
        ({ name, short }) => ({ name: stripAnsi(name), short }),
      );

      expect(choices).toEqual([
        {
          name: '1. [APM] Prefer service.name for logs correlation (#120694) ',
          short: '#120694 (b1b49195)',
        },
        {
          name: '2. [APM] Disable telemetry in agent config endpoint (#120106) ',
          short: '#120106 (b1bb4a93)',
        },
        {
          name: '3. [APM] Remove index_pattern.json and add custom field formatters (#119915) ',
          short: '#119915 (434f6e6a)',
        },
        {
          name: '4. [APM] Remove log-log descriptions from correlation charts (#119700) ',
          short: '#119700 (ae9d51b7)',
        },
      ]);
    });
  });
});
