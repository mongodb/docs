import { Commit } from '../../entrypoint.api';
import { ValidConfigOptions } from '../../options/options';
import { getBackportBranchName } from './getBackportBranchName';

describe('getBackportBranchName', () => {
  describe('when options.backportBranchName is not set', () => {
    it('returns the default name with PR number', () => {
      const commits = [{ sourcePullRequest: { number: 1234 } }] as Commit[];
      const name = getBackportBranchName({
        options: { backportBranchName: undefined } as ValidConfigOptions,
        targetBranch: '7.x',
        commits,
      });
      expect(name).toBe('backport/7.x/pr-1234');
    });

    it('returns the default name with commit sha', () => {
      const commits = [{ sourceCommit: { sha: 'abcde' } }] as Commit[];
      const name = getBackportBranchName({
        options: { backportBranchName: undefined } as ValidConfigOptions,
        targetBranch: '7.x',
        commits,
      });
      expect(name).toBe('backport/7.x/commit-abcde');
    });
  });

  describe('template variables are supported when using options.backportBranchName', () => {
    it('{{targetBranch}}', () => {
      const commits = [{ sourcePullRequest: { number: 1234 } }] as Commit[];
      const name = getBackportBranchName({
        options: {
          backportBranchName: 'bp/target-{{targetBranch}}',
        } as ValidConfigOptions,
        targetBranch: '7.x',
        commits,
      });
      expect(name).toBe('bp/target-7.x');
    });

    it('{{refValues}}', () => {
      const commits = [{ sourcePullRequest: { number: 1234 } }] as Commit[];
      const name = getBackportBranchName({
        options: {
          backportBranchName: 'bp/ref-{{refValues}}',
        } as ValidConfigOptions,
        targetBranch: '7.x',
        commits,
      });
      expect(name).toBe('bp/ref-pr-1234');
    });

    it('{{sourcePullRequest.number}}', () => {
      const commits = [{ sourcePullRequest: { number: 1234 } }] as Commit[];
      const name = getBackportBranchName({
        options: {
          backportBranchName: 'bp/pr-{{sourcePullRequest.number}}',
        } as ValidConfigOptions,
        targetBranch: '7.x',
        commits,
      });
      expect(name).toBe('bp/pr-1234');
    });

    it('{{sourcePullRequest.title}}', () => {
      const commits = [
        { sourcePullRequest: { title: 'My PR title', number: 1234 } },
      ] as Commit[];
      const name = getBackportBranchName({
        options: {
          backportBranchName: 'bp/pr-{{sourcePullRequest.title}}',
        } as ValidConfigOptions,
        targetBranch: '7.x',
        commits,
      });
      expect(name).toBe('bp/pr-My PR title');
    });
  });
});
