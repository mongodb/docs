import { exec } from '../../../test/childProcessHelper';
import { getDevAccessToken } from '../../../test/private/getDevAccessToken';
import { getSandboxPath, resetSandbox } from '../../../test/sandbox';
import { getRepoOwnerAndNameFromGitRemotes } from './getRepoOwnerAndNameFromGitRemotes';

const sandboxPath = getSandboxPath({ filename: __filename });
const accessToken = getDevAccessToken();

describe('fetchRemoteProjectConfig', () => {
  describe('when the remote is a fork', () => {
    it('retrives the original owner from github', async () => {
      await resetSandbox(sandboxPath);
      const execOpts = { cwd: sandboxPath };
      await exec(`git init`, execOpts);
      await exec(
        `git remote add sorenlouv git@github.com:sorenlouv/kibana.git`,
        execOpts,
      );

      expect(
        await getRepoOwnerAndNameFromGitRemotes({
          accessToken,
          cwd: sandboxPath,
        }),
      ).toEqual({
        repoName: 'kibana',
        repoOwner: 'elastic',
      });
    });
  });

  describe('when none of the git remotes are found', () => {
    it('swallows the error and returns empty', async () => {
      await resetSandbox(sandboxPath);
      const execOpts = { cwd: sandboxPath };
      await exec(`git init`, execOpts);
      await exec(`git remote add foo git@github.com:foo/kibana.git`, execOpts);

      await exec(`git remote add bar git@github.com:bar/kibana.git`, execOpts);

      expect(
        await getRepoOwnerAndNameFromGitRemotes({
          accessToken,
          cwd: sandboxPath,
        }),
      ).toEqual({});
    });
  });

  describe('when there are no git remotes', () => {
    it('returns empty', async () => {
      await resetSandbox(sandboxPath);
      const execOpts = { cwd: sandboxPath };
      await exec(`git init`, execOpts);

      expect(
        await getRepoOwnerAndNameFromGitRemotes({
          accessToken,
          cwd: sandboxPath,
        }),
      ).toEqual({});
    });
  });
});
