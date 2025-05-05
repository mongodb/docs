import os from 'os';
import { getDevAccessToken } from '../../../../test/private/getDevAccessToken';
import { getOptionsFromGithub } from './getOptionsFromGithub';

const accessToken = getDevAccessToken();

describe('getOptionsFromGithub', () => {
  beforeAll(async () => {
    jest.spyOn(os, 'homedir').mockReturnValue('/myHomeDir');
  });

  describe('access token', () => {
    describe('is invalid', () => {
      it('throws an error', async () => {
        const combinedOptions = {
          author: 'sorenlouv',
          accessToken: 'foo',
          repoOwner: 'backport-org',
          repoName: 'backport-e2e',
          cwd: process.cwd(),
        };

        await expect(getOptionsFromGithub(combinedOptions)).rejects.toThrow(
          'Please check your access token and make sure it is valid.\nConfig: /myHomeDir/.backport/config.json',
        );
      });
    });

    describe('is valid', () => {
      it('returns the options', async () => {
        const combinedOptions = {
          author: 'sorenlouv',
          accessToken,
          repoOwner: 'backport-org',
          repoName: 'backport-e2e',
          cwd: process.cwd(),
        };

        expect(await getOptionsFromGithub(combinedOptions)).toEqual({
          authenticatedUsername: 'sorenlouv',
          branchLabelMapping: {
            '^v(\\d+).(\\d+).\\d+$': '$1.$2',
            '^v7.9.0$': '7.x',
            '^v8.0.0$': 'master',
          },
          isRepoPrivate: false,
          sourceBranch: 'master',
          targetBranchChoices: [
            { checked: true, name: 'master' },
            { checked: true, name: '7.x' },
            '7.8',
          ],
          targetPRLabels: ['backport'],
          repoOwner: 'backport-org',
          repoName: 'backport-e2e',
        });
      });
    });
  });

  describe('when `repoOwner` is fork', () => {
    it('returns original repoOwner', async () => {
      const combinedOptions = {
        author: 'sorenlouv',
        accessToken,
        repoOwner: 'sorenlouv',
        repoName: 'backport-e2e',
        cwd: process.cwd(),
      };

      const options = await getOptionsFromGithub(combinedOptions);

      await expect(options.repoOwner).toEqual('backport-org');
    });
  });

  describe('sourceBranch', () => {
    describe('when no sourceBranch is specified', () => {
      it('uses the default branch of the repo', async () => {
        const combinedOptions = {
          author: 'sorenlouv',
          accessToken,
          repoOwner: 'backport-org',
          repoName: 'repo-with-non-standard-main-branch',
          cwd: process.cwd(),
        };

        const options = await getOptionsFromGithub(combinedOptions);

        await expect(options.sourceBranch).toEqual('my-custom-default-branch');
      });
    });
  });

  describe('when a branch named "backport"', () => {
    describe('exists', () => {
      it('shows a warning', async () => {
        const combinedOptions = {
          author: 'sorenlouv',
          accessToken,
          repoOwner: 'backport-org',
          repoName: 'repo-with-branch-named-backport',
          cwd: process.cwd(),
        };

        await expect(async () => {
          await getOptionsFromGithub(combinedOptions);
        }).rejects.toThrow(
          'You must delete the branch "backport" to continue. See https://github.com/sorenlouv/backport/issues/155 for details',
        );
      });
    });
  });

  describe('when a backportrc.json config was deleted from repo', () => {
    it('does not throw', async () => {
      const combinedOptions = {
        author: 'sorenlouv',
        accessToken,
        repoOwner: 'backport-org',
        repoName: 'repo-with-backportrc-removed',
        cwd: process.cwd(),
      };

      const options = await getOptionsFromGithub(combinedOptions);

      expect(options).toEqual({
        authenticatedUsername: 'sorenlouv',
        isRepoPrivate: false,
        sourceBranch: 'main',
      });
    });
  });
});
