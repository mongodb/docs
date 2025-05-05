import { access } from 'fs/promises';
import fs from 'fs/promises';
import path from 'path';
import makeDir from 'make-dir';
import { Commit } from '../entrypoint.api';
import { ValidConfigOptions } from '../options/options';
import { exec } from '../test/childProcessHelper';
import { getDevAccessToken } from '../test/private/getDevAccessToken';
import { getSandboxPath, resetSandbox } from '../test/sandbox';
import * as childProcess from './child-process-promisified';
import {
  cherrypick,
  cloneRepo,
  commitChanges,
  createBackportBranch,
  getShasInMergeCommit,
  getGitProjectRootPath,
  getIsCommitInBranch,
  getIsMergeCommit,
  getLocalConfigFileCommitDate,
  getLocalSourceRepoPath,
  isLocalConfigFileModified,
  isLocalConfigFileUntracked,
  pushBackportBranch,
  deleteRemote,
} from './git';
import { getShortSha } from './github/commitFormatters';

jest.unmock('del');
jest.unmock('make-dir');

const commitAuthor = { name: 'Soren L', email: 'soren@mail.dk' };
const accessToken = getDevAccessToken();

describe('git.private', () => {
  describe('getIsCommitInBranch', () => {
    let firstSha: string;
    let secondSha: string;
    const cwd = getSandboxPath({
      filename: __filename,
      specname: 'getIsCommitInBranch',
    });

    beforeEach(async () => {
      await resetSandbox(cwd);

      // create and commit first file
      await gitInit(cwd);
      firstSha = await createAndCommitFile({
        filename: 'foo.md',
        content: 'My first file',
        cwd,
      });

      // create 7.x branch (but stay on `main` branch)
      await childProcess.spawnPromise('git', ['branch', '7.x'], cwd);

      // create and commit second file
      secondSha = await createAndCommitFile({
        filename: 'bar.md',
        content: 'My second file',
        cwd,
      });

      // checkout 7.x
      await childProcess.spawnPromise('git', ['checkout', '7.x'], cwd);
    });

    it('should contain the first commit', async () => {
      const isFirstCommitInBranch = await getIsCommitInBranch(
        { dir: cwd } as ValidConfigOptions,
        firstSha,
      );

      expect(isFirstCommitInBranch).toEqual(true);
    });

    it('should not contain the second commit', async () => {
      const isSecondCommitInBranch = await getIsCommitInBranch(
        { dir: cwd } as ValidConfigOptions,
        secondSha,
      );

      expect(isSecondCommitInBranch).toEqual(false);
    });

    it('should not contain a random commit', async () => {
      const isSecondCommitInBranch = await getIsCommitInBranch(
        { dir: cwd } as ValidConfigOptions,
        'abcdefg',
      );

      expect(isSecondCommitInBranch).toEqual(false);
    });
  });

  describe('deleteRemote', () => {
    const cwd = getSandboxPath({
      filename: __filename,
      specname: 'deleteRemote',
    });

    it('should handle when deleting a remote that does not exist', async () => {
      const options = {
        repoName: 'kibana',
        repoOwner: 'elastic',
        dir: cwd,
      } as ValidConfigOptions;

      await resetSandbox(cwd);
      await gitInit(cwd);
      const res = await deleteRemote(options, 'my-remote-foo');

      expect(res).toBe(undefined);
    });
  });

  describe('createBackportBranch', () => {
    const cwd = getSandboxPath({
      filename: __filename,
      specname: 'createBackportBranch',
    });

    beforeEach(async () => {
      await resetSandbox(cwd);
      await gitClone(
        'https://github.com/backport-org/repo-with-conflicts.git',
        cwd,
      );
    });

    it('creates the backport branch when `targetBranch` exists', async () => {
      await createBackportBranch({
        options: {
          repoOwner: 'origin',
          dir: cwd,
        } as ValidConfigOptions,
        sourceBranch: 'main',
        targetBranch: '7.x',
        backportBranch: 'my-backport-branch',
      });

      expect(await getCurrentBranchName(cwd)).toEqual('my-backport-branch');
    });

    it('throws a handled error when `targetBranch` does not exist', async () => {
      await expect(async () => {
        await createBackportBranch({
          options: {
            repoOwner: 'origin',
            dir: cwd,
          } as ValidConfigOptions,
          sourceBranch: 'main',
          targetBranch: 'foo',
          backportBranch: 'my-backport-branch',
        });
      }).rejects.toThrow('The branch "foo" is invalid or doesn\'t exist');
    });
  });

  describe('pushBackportBranch', () => {
    const cwd = getSandboxPath({
      filename: __filename,
      specname: 'pushBackportBranch',
    });

    beforeEach(async () => {
      await resetSandbox(cwd);
      await gitClone(
        'https://github.com/backport-org/repo-with-conflicts.git',
        cwd,
      );
      await createBackportBranch({
        options: {
          repoOwner: 'origin',
          dir: cwd,
        } as ValidConfigOptions,
        sourceBranch: 'main',
        targetBranch: '7.x',
        backportBranch: 'my-backport-branch',
      });
      await exec(
        `git remote add sorenlouv https://x-access-token:${accessToken}@github.com/sorenlouv/repo-with-conflicts.git`,
        { cwd },
      );
    });

    it('throws error when repo does not exist', async () => {
      await expect(async () => {
        await pushBackportBranch({
          options: {
            repoOwner: 'sorenlouv',
            repoName: 'repo-with-conflicts',
            dir: cwd,
          } as ValidConfigOptions,
          backportBranch: 'my-backport-branch',
        });
      }).rejects.toThrowErrorMatchingInlineSnapshot(`
        "Error pushing to https://github.com/sorenlouv/repo-with-conflicts. Repository does not exist. Either fork the repository (https://github.com/sorenlouv/repo-with-conflicts) or disable fork mode via "--no-fork".
        Read more about fork mode in the docs: https://github.com/sorenlouv/backport/blob/main/docs/config-file-options.md#fork"
      `);
    });
  });

  describe('cherrypick', () => {
    let firstSha: string;
    let secondSha: string;
    let fourthSha: string;
    let cwd: string;
    const sandboxPath = getSandboxPath({
      filename: __filename,
      specname: 'cherrypick',
    });

    beforeEach(async () => {
      await resetSandbox(sandboxPath);
      cwd = sandboxPath;

      // create and commit first file
      await gitInit(cwd);
      firstSha = await createAndCommitFile({
        filename: 'foo.md',
        content: 'Creating first file',
        cwd,
      });

      // create 7.x branch (but stay on `main` branch)
      await childProcess.spawnPromise('git', ['branch', '7.x'], cwd);

      // create and commit second file
      secondSha = await createAndCommitFile({
        filename: 'bar.md',
        content: 'Creating second file\nHello',
        cwd,
      });

      // edit first file
      await createAndCommitFile({
        filename: 'foo.md',
        content: 'Changing first file',
        cwd,
      });

      // edit first file
      fourthSha = await createAndCommitFile({
        filename: 'foo.md',
        content: 'Some more changes to the first file',
        cwd,
      });

      // checkout 7.x
      await childProcess.spawnPromise('git', ['checkout', '7.x'], cwd);
    });

    it('should not cherrypick commit that already exists', async () => {
      const shortSha = getShortSha(firstSha);
      await expect(() =>
        cherrypick({
          options: { dir: cwd } as ValidConfigOptions,
          sha: firstSha,
          commitAuthor: { name: 'Soren L', email: 'soren@mail.dk' },
        }),
      ).rejects.toThrow(
        `Cherrypick failed because the selected commit (${shortSha}) is empty. Did you already backport this commit?`,
      );
    });

    it('should cherrypick commit cleanly', async () => {
      const res = await cherrypick({
        options: {
          cherrypickRef: false,
          dir: cwd,
        } as ValidConfigOptions,
        sha: secondSha,
        commitAuthor,
      });
      expect(res).toEqual({
        conflictingFiles: [],
        needsResolving: false,
        unstagedFiles: [],
      });

      const message = await getMostRecentCommitMessage(cwd);
      expect(message).toEqual(`Update bar.md`);
    });

    it('should cherrypick commit cleanly and append "(cherry picked from commit...)"', async () => {
      const res = await cherrypick({
        options: {
          cherrypickRef: true,
          dir: cwd,
        } as ValidConfigOptions,
        sha: secondSha,
        commitAuthor,
      });
      expect(res).toEqual({
        conflictingFiles: [],
        needsResolving: false,
        unstagedFiles: [],
      });

      const message = await getMostRecentCommitMessage(cwd);

      expect(message).toEqual(
        `Update bar.md\n\n(cherry picked from commit ${secondSha})`,
      );
    });

    it('should cherrypick commit with conflicts', async () => {
      const res = await cherrypick({
        options: { dir: cwd } as ValidConfigOptions,
        sha: fourthSha,
        commitAuthor,
      });

      expect(res).toEqual({
        needsResolving: true,
        conflictingFiles: [
          { absolute: `${sandboxPath}/foo.md`, relative: 'foo.md' },
        ],
        unstagedFiles: [`${sandboxPath}/foo.md`],
      });
    });
  });

  describe('commitChanges', () => {
    const cwd = getSandboxPath({
      filename: __filename,
      specname: 'commitChanges',
    });

    beforeEach(async () => {
      await resetSandbox(cwd);
    });

    it('should return without error if user already committed manually (and there therefore is nothing to commit)', async () => {
      const options = { dir: cwd } as ValidConfigOptions;
      const commit = { sourceCommit: { message: 'my message' } } as Commit;
      await gitInit(cwd);
      await createAndCommitFile({
        content: 'foo',
        filename: 'my-file-1.txt',
        cwd,
      });

      expect(async () => {
        return await commitChanges({ commit, commitAuthor, options });
      }).not.toThrow();

      const message = await getMostRecentCommitMessage(cwd);
      expect(message).toBe('Update my-file-1.txt');
    });

    it('should return without error if user aborts the cherrypick process', async () => {
      const options = { dir: cwd } as ValidConfigOptions;
      const commit = {
        sourceCommit: { message: 'my fallback commit message' },
      } as Commit;

      await gitInit(cwd);
      await createAndStageFile({
        content: 'foo',
        filename: 'my-file-2.txt',
        cwd,
      });

      await commitChanges({ commit, commitAuthor, options });

      const message = await getMostRecentCommitMessage(cwd);
      expect(message).toBe('my fallback commit message');
    });

    it('should commit cherypicked changes after conflicts have been resolved', async () => {
      const options = { dir: cwd } as ValidConfigOptions;
      const commit = {
        sourceCommit: { message: 'my fallback commit message' },
      } as Commit;

      await gitClone(
        'https://github.com/backport-org/repo-with-conflicts.git',
        cwd,
      );

      await exec('git checkout 7.x', { cwd });

      // cherry-pick file
      try {
        await childProcess.spawnPromise(
          'git',
          ['cherry-pick', '3a0934d1f646e4a50571cb4b137ad2b08d2e7b18'],
          cwd,
        );
      } catch (e) {
        // swallow
      }

      // disregard conflicts and stage all files
      await exec('git add -A', { cwd });

      await commitChanges({ commit, commitAuthor, options });

      const message = await getMostRecentCommitMessage(cwd);
      expect(message).toMatchInlineSnapshot(`
        "Add 🇩🇰 (#12)

        # Conflicts:
        #	la-liga.md"
      `);
    });
  });

  describe('cloneRepo', () => {
    const sandboxPath = getSandboxPath({
      filename: __filename,
      specname: 'cloneRepo',
    });

    const sourceRepo = `${sandboxPath}/source-repo`;
    const backportRepo = `${sandboxPath}/backport-repo`;

    beforeEach(async () => {
      await resetSandbox(sandboxPath);
    });

    it('clones the repo', async () => {
      await makeDir(sourceRepo);
      await gitInit(sourceRepo);
      await childProcess.spawnPromise(
        'git',
        ['remote', 'add', 'origin', 'git@github.com:elastic/kibana.git'],
        sourceRepo,
      );

      await createAndCommitFile({
        filename: 'my-file.txt',
        content: 'Hello!',
        cwd: sourceRepo,
      });

      // file should not exist before clone
      await expect(() =>
        access(`${backportRepo}/my-file.txt`),
      ).rejects.toThrow();

      await cloneRepo(
        { sourcePath: sourceRepo, targetPath: backportRepo },
        () => null,
      );

      //file should exist after clone
      await expect(() => access(`${backportRepo}/my-file.txt`)).not.toThrow();
    });

    it('clones a remote repo and continously updates the progress', async () => {
      const onProgressSpy = jest.fn();
      await cloneRepo(
        {
          sourcePath: 'https://github.com/backport-org/backport-e2e.git',
          targetPath: backportRepo,
        },
        onProgressSpy,
      );

      expect(onProgressSpy).toHaveBeenCalledWith(expect.any(Number));
    });

    it('fails to clone repo because sourcePath is incorrect', async () => {
      await expect(() =>
        cloneRepo(
          {
            sourcePath: `${sandboxPath}/source-repo-incorrect`,
            targetPath: backportRepo,
          },
          () => null,
        ),
      ).rejects.toThrow('Git clone failed with exit code: 128');
    });
  });

  describe('getLocalConfigFileCommitDate', () => {
    let cwd: string;

    beforeEach(async () => {
      cwd = getSandboxPath({
        filename: __filename,
        specname: 'getLocalConfigFileCommitDate',
      });
      await resetSandbox(cwd);
      await gitInit(cwd);
    });

    it('get the commit date for project config', async () => {
      const timeBefore = Math.floor(Date.now() / 1000) * 1000; // round to nearest second
      await createAndCommitFile({
        filename: '.backportrc.json',
        content: 'foo',
        cwd,
      });
      const timeAfter = Math.ceil(Date.now() / 1000) * 1000; // round to nearest second
      const commitedDate = await getLocalConfigFileCommitDate({ cwd });

      expect(commitedDate).toBeGreaterThanOrEqual(timeBefore);
      expect(commitedDate).toBeLessThanOrEqual(timeAfter);
    });
  });

  describe('isLocalConfigFileUntracked', () => {
    let cwd: string;

    beforeEach(async () => {
      cwd = getSandboxPath({
        filename: __filename,
        specname: 'isLocalConfigFileUntracked',
      });
      await resetSandbox(cwd);
      await gitInit(cwd);
    });

    it('is not untracked when committed', async () => {
      await createAndCommitFile({
        filename: '.backportrc.json',
        content: 'foo',
        cwd,
      });
      const isUntracked = await isLocalConfigFileUntracked({ cwd });
      expect(isUntracked).toBe(false);
    });

    it('is not untracked when staged', async () => {
      await createAndStageFile({
        filename: '.backportrc.json',
        content: 'foo',
        cwd,
      });
      const isUntracked = await isLocalConfigFileUntracked({ cwd });
      expect(isUntracked).toBe(false);
    });

    it('is untracked when neither staged nor committed', async () => {
      await fs.writeFile(path.join(cwd, '.backportrc.json'), 'foo');
      const isUntracked = await isLocalConfigFileUntracked({ cwd });
      expect(isUntracked).toBe(true);
    });
  });

  describe('getLocalSourceRepoPath', () => {
    let cwd: string;

    beforeEach(async () => {
      cwd = getSandboxPath({
        filename: __filename,
        specname: 'getLocalSourceRepoPath',
      });
      await resetSandbox(cwd);
      await gitInit(cwd);
      await childProcess.spawnPromise(
        'git',
        ['remote', 'add', 'sorenlouv', 'git@github.com:sorenlouv/kibana.git'],
        cwd,
      );
      await childProcess.spawnPromise(
        'git',
        ['remote', 'add', 'elastic', 'git@github.com:elastic/kibana.git'],
        cwd,
      );
    });

    it('returns local source repo, when one remote matches', async () => {
      const options = {
        repoName: 'kibana',
        repoOwner: 'elastic',
        cwd,
        githubApiBaseUrlV4: 'http://localhost/graphql', // required to mock the response
      } as ValidConfigOptions;

      expect(await getLocalSourceRepoPath(options)).toBe(cwd);
    });

    it('returns undefined when no remotes match', async () => {
      const options = {
        repoName: 'kibana',
        repoOwner: 'not-a-match',
        cwd,
        githubApiBaseUrlV4: 'http://localhost/graphql', // required to mock the response
      } as ValidConfigOptions;

      expect(await getLocalSourceRepoPath(options)).toBe(undefined);
    });
  });

  describe('getGitProjectRootPath', () => {
    let sandboxPath: string;
    let subDirectory: string;

    beforeEach(async () => {
      sandboxPath = getSandboxPath({
        filename: __filename,
        specname: 'getGitProjectRootPath',
      });
      subDirectory = `${sandboxPath}/foo-dir`;
      await resetSandbox(sandboxPath);
      await gitInit(sandboxPath);
      makeDir(subDirectory);
    });

    it('returns the root dir', async () => {
      const rootPath = await getGitProjectRootPath(subDirectory);
      expect(rootPath).toBe(sandboxPath);
      expect(rootPath).not.toBe(subDirectory);
    });
  });

  describe('isLocalConfigFileModified', () => {
    let cwd: string;

    beforeEach(async () => {
      cwd = getSandboxPath({
        filename: __filename,
        specname: 'isLocalConfigFileModified',
      });
      await resetSandbox(cwd);
      await gitClone(
        'https://github.com/backport-org/repo-with-project-config.git',
        cwd,
      );
    });

    it('returns false when file is unchanged', async () => {
      const isModified = await isLocalConfigFileModified({ cwd });
      expect(isModified).toBe(false);
    });

    it('returns true when file is changed', async () => {
      await fs.writeFile(path.join(cwd, '.backportrc.json'), 'foo');
      const isModified = await isLocalConfigFileModified({ cwd });
      expect(isModified).toBe(true);
    });
  });

  describe('when cloning "backport-org/different-merge-strategies"', () => {
    const MERGE_COMMIT_HASH_1 = 'bdc5a17f81e5f32129e27b05c742e055c650bc54';
    const MERGE_COMMIT_HASH_2 = '0db7f1ac1233461563d8708511d1c14adbab46da';
    const SQUASH_COMMIT_HASH = '74a76fa64b34e3ffe8f2a3f73840e1b42fd07299';
    const REBASE_COMMIT_HASH = '9059ae0ca31caa2eebc035f2542842d6c2fde83b';

    let cwd: string;
    beforeAll(async () => {
      cwd = getSandboxPath({
        filename: __filename,
        specname: 'different-merge-strategies',
      });
      await resetSandbox(cwd);

      await gitClone(
        'https://github.com/backport-org/different-merge-strategies.git',
        cwd,
      );
    });

    describe('getIsMergeCommit', () => {
      it('returns true for first merge commit', async () => {
        const res = await getIsMergeCommit(
          { dir: cwd } as ValidConfigOptions,
          MERGE_COMMIT_HASH_1,
        );

        expect(res).toBe(true);
      });

      it('returns true for second merge commit', async () => {
        const res = await getIsMergeCommit(
          { dir: cwd } as ValidConfigOptions,
          MERGE_COMMIT_HASH_2,
        );

        expect(res).toBe(true);
      });

      it('returns false for rebased commits', async () => {
        const res = await getIsMergeCommit(
          { dir: cwd } as ValidConfigOptions,
          REBASE_COMMIT_HASH,
        );

        expect(res).toBe(false);
      });

      it('returns false for squashed commits', async () => {
        const res = await getIsMergeCommit(
          { dir: cwd } as ValidConfigOptions,
          SQUASH_COMMIT_HASH,
        );

        expect(res).toBe(false);
      });
    });

    describe('getShasInMergeCommit', () => {
      it('returns a list of commit hashes - excluding the merge hash itself', async () => {
        const shas = await getShasInMergeCommit(
          { dir: cwd } as ValidConfigOptions,
          MERGE_COMMIT_HASH_1,
        );

        expect(shas).not.toContain(MERGE_COMMIT_HASH_1);

        expect(shas).toEqual([
          'f9a760e0d9eb3ebcc64f8cb75ce885714b836496',
          '7b92e29e88266004485ce0fae0260605b01df887',
          'a1facf8c006fb815d6a6ecd1b2907e6e64f29576',
          'b8d4bcfb0fd875be4ab0230f6db40ddf72f45378',
          '6f224054db5f7772b04f23f17659070216bae84c',
          '7fed54cbd1ba9cb973462670ff82ac80bf8a79f8',
          '78c24d0058859e7d511d10ce91ebf279c7b58ac2',
          '709ccf707d443dd8c001b3c3ae40fdf037bb43f5',
        ]);
      });

      it('returns empty for squash commits', async () => {
        const shas = await getShasInMergeCommit(
          { dir: cwd } as ValidConfigOptions,
          SQUASH_COMMIT_HASH,
        );

        expect(shas).toEqual([]);
      });
    });
  });
});

async function createAndCommitFile({
  filename,
  content,
  cwd,
}: {
  filename: string;
  content: string;
  cwd: string;
}) {
  await createAndStageFile({ filename, content, cwd });
  await childProcess.spawnPromise(
    'git',
    ['commit', `--message=Update ${filename}`],
    cwd,
  );

  return getCurrentSha(cwd);
}

async function createAndStageFile({
  filename,
  content,
  cwd,
}: {
  filename: string;
  content: string;
  cwd: string;
}) {
  try {
    await fs.writeFile(path.join(cwd, filename), content);
    await childProcess.spawnPromise('git', ['add', `${filename}`], cwd);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('"createAndStageFile" threw an error', {
      filename,
      content,
      cwd,
    });
    throw e;
  }
}

async function getCurrentSha(cwd: string) {
  const { stdout } = await childProcess.spawnPromise(
    'git',
    ['rev-parse', 'HEAD'],
    cwd,
  );
  return stdout.trim();
}

async function getCurrentBranchName(cwd: string) {
  const { stdout } = await exec('git rev-parse --abbrev-ref HEAD', { cwd });
  return stdout.trim();
}

async function getMostRecentCommitMessage(cwd: string) {
  try {
    const { stdout } = await childProcess.spawnPromise(
      'git',
      ['--no-pager', 'log', '-1', '--pretty=%B'],
      cwd,
    );
    return stdout.trim();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('"getMostRecentCommitMessage" threw an error', cwd);
    throw e;
  }
}

async function gitClone(repoUrl: string, cwd: string) {
  try {
    return await childProcess.spawnPromise(
      'git',
      ['clone', repoUrl, './'],
      cwd,
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Git clone failed');
    throw e;
  }
}

async function gitInit(cwd: string) {
  try {
    await childProcess.spawnPromise('git', ['init'], cwd);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Git init failed');
    throw e;
  }
}
