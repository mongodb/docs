import { Commit } from '../../entrypoint.api';
import { getTargetPRLabels } from './getTargetPRLabels';

const commits: Commit[] = [
  {
    author: { name: 'Søren Louv-Jansen', email: 'sorenlouv@gmail.com' },
    suggestedTargetBranches: [],
    sourceCommit: {
      branchLabelMapping: {
        '^backport-to-(.+)$': '$1',
      },
      committedDate: '2021-01-13T20:01:44Z',
      message: 'Fix major bug (#88188)',
      sha: 'd1b348e6213c5ad48653dfaad6eaf4928b2c688b',
    },
    sourcePullRequest: {
      labels: ['backport-to-7.11', 'feature-abc'],
      number: 88188,
      title: 'Fix major bug',
      url: 'https://github.com/elastic/kibana/pull/88188',
      mergeCommit: {
        message: 'Fix major bug (#88188)',
        sha: 'd1b348e6213c5ad48653dfaad6eaf4928b2c688b',
      },
    },
    sourceBranch: 'master',
    targetPullRequestStates: [
      // PR to 7.11 branch was created automatically using the label `backport-to-7.11`
      {
        url: 'https://github.com/elastic/kibana/pull/88289',
        number: 88289,
        branch: '7.11',
        label: 'backport-to-7.11',
        branchLabelMappingKey: '^backport-to-(.+)$',
        isSourceBranch: false,
        state: 'OPEN',
        mergeCommit: {
          sha: 'b8194e9ec27d69f485d8b194d1cb5e4f6d8fef6d',
          message: 'Fix major bug (#88188) (#88289)',
        },
      },

      // PR to 7.x branch was created manually (not via labels) and does not contain branchLabelMappingKey
      {
        url: 'https://github.com/elastic/kibana/pull/88288',
        number: 88288,
        branch: '7.x',
        state: 'OPEN',
        mergeCommit: {
          sha: '52710be7add6811ec4783c7d383d4159c0aa76f5',
          message: '[7.x] Fix major bug (#88188) (#88288)',
        },
      },
    ],
  },
];

describe('getTargetPRLabels', () => {
  describe('replaces template values', () => {
    it('replaces {{targetBranch}}', () => {
      const labels = getTargetPRLabels({
        interactive: false,
        commits,
        targetPRLabels: ['backported-to-{{targetBranch}}'],
        targetBranch: '7.x',
      });
      expect(labels).toEqual(['backported-to-7.x']);
    });

    it('replaces {{sourceBranch}}', () => {
      const labels = getTargetPRLabels({
        interactive: false,
        commits,
        targetPRLabels: ['backported-from-{{sourceBranch}}'],
        targetBranch: '7.x',
      });
      expect(labels).toEqual(['backported-from-master']);
    });
  });

  describe('when label is static', () => {
    describe('and when interactive=false', () => {
      it('adds static label for 7.11', () => {
        const labels = getTargetPRLabels({
          interactive: false,
          commits,
          targetPRLabels: ['some-static-label'],
          targetBranch: '7.11',
        });
        expect(labels).toEqual(['some-static-label']);
      });

      it('adds static label for 7.x', () => {
        const labels = getTargetPRLabels({
          interactive: false,
          commits,
          targetPRLabels: ['some-static-label'],
          targetBranch: '7.x',
        });
        expect(labels).toEqual(['some-static-label']);
      });
    });

    describe('and when interactive=true', () => {
      it('adds static label for 7.x', () => {
        const labels = getTargetPRLabels({
          interactive: true,
          commits,
          targetPRLabels: ['backport'],
          targetBranch: '7.x',
        });
        expect(labels).toEqual(['backport']);
      });
    });
  });

  describe('when label is dynamic', () => {
    describe('and when interactive=false', () => {
      it('adds dynamic label for 7.11', () => {
        const labels = getTargetPRLabels({
          interactive: false,
          commits,
          targetPRLabels: ['backport-$1'],
          targetBranch: '7.11',
        });
        expect(labels).toEqual(['backport-7.11']);
      });
    });

    describe('when interactive=true', () => {
      it('adds dynamic label for 7.11', () => {
        const labels = getTargetPRLabels({
          interactive: false,
          commits,
          targetPRLabels: ['backport-$1'],
          targetBranch: '7.11',
        });
        expect(labels).toEqual(['backport-7.11']);
      });

      it('does not add dynamic label for 7.x', () => {
        const labels = getTargetPRLabels({
          interactive: true,
          commits,
          targetPRLabels: ['backport-$1'],
          targetBranch: '7.x',
        });
        expect(labels).toEqual([]);
      });
    });
  });

  describe('multiple dynamic labels', () => {
    describe('interactive=false', () => {
      it('adds dynamic and static labels for 7.11', () => {
        const labels = getTargetPRLabels({
          interactive: false,
          commits,
          targetPRLabels: ['backport-$1', '$1', 'my-static-label'],
          targetBranch: '7.11',
        });
        expect(labels).toEqual(['backport-7.11', '7.11', 'my-static-label']);
      });
    });

    describe('interactive=true', () => {
      it('only add the static labels for 7.x', () => {
        const labels = getTargetPRLabels({
          interactive: true,
          commits,
          targetPRLabels: ['backport-$1', '$1', 'my-static-label'],
          targetBranch: '7.x',
        });
        expect(labels).toEqual(['my-static-label']);
      });
    });
  });
});
