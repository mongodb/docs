import os from 'os';
import { ValidConfigOptions } from '../options/options';
import { SpyHelper } from '../types/SpyHelper';
import * as childProcess from './child-process-promisified';
import {
  addRemote,
  getUnstagedFiles,
  commitChanges,
  deleteRemote,
  cherrypick,
  getConflictingFiles,
  createBackportBranch,
  pushBackportBranch,
  getLocalConfigFileCommitDate,
  isLocalConfigFileUntracked,
  isLocalConfigFileModified,
  getRepoInfoFromGitRemotes,
} from './git';
import { Commit } from './sourceCommit/parseSourceCommit';

beforeEach(() => {
  jest.spyOn(os, 'homedir').mockReturnValue('/myHomeDir');
});

afterEach(() => {
  jest.restoreAllMocks();
});

const commitAuthor = { name: 'Soren L', email: 'soren@mail.dk' };

describe('getUnstagedFiles', () => {
  it('should split lines and remove empty', async () => {
    jest.spyOn(childProcess, 'spawnPromise').mockResolvedValueOnce({
      stdout: 'conflicting-file.txt\nconflicting-file2.txt\n',
      stderr: '',
      code: 0,
      cmdArgs: [],
    });

    const options = {
      repoOwner: 'elastic',
      repoName: 'kibana',
    } as ValidConfigOptions;

    await expect(await getUnstagedFiles(options)).toEqual([
      '/myHomeDir/.backport/repositories/elastic/kibana/conflicting-file.txt',
      '/myHomeDir/.backport/repositories/elastic/kibana/conflicting-file2.txt',
    ]);
  });

  it('should not error on empty', async () => {
    jest.spyOn(childProcess, 'spawnPromise').mockResolvedValueOnce({
      stdout: '',
      stderr: '',
      code: 0,
      cmdArgs: [],
    });

    const options = {
      repoOwner: 'elastic',
      repoName: 'kibana',
    } as ValidConfigOptions;

    await expect(await getUnstagedFiles(options)).toEqual([]);
  });
});

describe('getLocalConfigFileCommitDate', () => {
  it('returns a timestamp the file exists', async () => {
    const res = {
      stdout: 'Wed Dec 16 10:10:39 2020 -0800\n',
      stderr: '',
      code: 0,
      cmdArgs: [],
    };
    jest.spyOn(childProcess, 'spawnPromise').mockResolvedValue(res);
    expect(await getLocalConfigFileCommitDate({ cwd: 'foo/bar' })).toEqual(
      1608142239000,
    );
  });

  it('returns empty when file does not exists', async () => {
    const res = { stdout: '', stderr: '', code: 0, cmdArgs: [] };
    jest.spyOn(childProcess, 'spawnPromise').mockResolvedValue(res);
    expect(await getLocalConfigFileCommitDate({ cwd: 'foo/bar' })).toEqual(
      undefined,
    );
  });

  it('handles errors', async () => {
    const err = {
      killed: false,
      code: 128,
      signal: null,
      cmd: 'any command...',
      stdout: '',
      stderr: 'any error',
    };
    jest.spyOn(childProcess, 'spawnPromise').mockRejectedValueOnce(err);
    expect(await getLocalConfigFileCommitDate({ cwd: 'foo/bar' })).toEqual(
      undefined,
    );
  });
});

describe('isLocalConfigFileUntracked', () => {
  it('returns "false" if file does not exist', async () => {
    const res = { stdout: '', stderr: '', code: 0, cmdArgs: [] };
    jest.spyOn(childProcess, 'spawnPromise').mockResolvedValue(res);
    expect(await isLocalConfigFileUntracked({ cwd: 'foo/bar' })).toEqual(false);
  });

  it('returns "true" if file is untracked', async () => {
    const res = {
      stdout: '.backportrc.json\n',
      stderr: '',
      code: 0,
      cmdArgs: [],
    };
    jest.spyOn(childProcess, 'spawnPromise').mockResolvedValue(res);
    expect(await isLocalConfigFileUntracked({ cwd: 'foo/bar' })).toEqual(true);
  });

  it('handles errors', async () => {
    const err = {
      killed: false,
      code: 128,
      signal: null,
      cmd: 'any command...',
      stdout: '',
      stderr: 'any error',
    };
    jest.spyOn(childProcess, 'spawnPromise').mockRejectedValueOnce(err);
    expect(await isLocalConfigFileUntracked({ cwd: 'foo/bar' })).toEqual(
      undefined,
    );
  });
});

describe('isLocalConfigFileModified', () => {
  it('returns "false" if file does not exist', async () => {
    const res = { stdout: '', stderr: '', code: 0, cmdArgs: [] };
    jest.spyOn(childProcess, 'spawnPromise').mockResolvedValue(res);
    expect(await isLocalConfigFileModified({ cwd: 'foo/bar' })).toEqual(false);
  });

  it('returns "false" if file is untracked', async () => {
    const res = { stdout: '', stderr: '', code: 0, cmdArgs: [] };
    jest.spyOn(childProcess, 'spawnPromise').mockResolvedValue(res);
    expect(await isLocalConfigFileModified({ cwd: 'foo/bar' })).toEqual(false);
  });

  it('returns "true" if file is staged', async () => {
    const res = {
      stdout: '.backportrc.json\n',
      stderr: '',
      code: 0,
      cmdArgs: [],
    };
    jest.spyOn(childProcess, 'spawnPromise').mockResolvedValue(res);
    expect(await isLocalConfigFileModified({ cwd: 'foo/bar' })).toEqual(true);
  });

  it('handles errors', async () => {
    const err = {
      killed: false,
      code: 128,
      signal: null,
      cmd: 'any command...',
      stdout: '',
      stderr: 'any error',
    };
    jest.spyOn(childProcess, 'spawnPromise').mockRejectedValueOnce(err);
    expect(await isLocalConfigFileModified({ cwd: 'foo/bar' })).toBe(false);
  });
});

describe('getRepoInfoFromGitRemotes', () => {
  it('returns repoName and repoOwner ssh remotes', async () => {
    const res = {
      stdout:
        'john.doe\tgit@github.com:john.doe/kibana (fetch)\n' +
        'john.doe\tgit@github.com:john.doe/kibana (push)\n' +
        'elastic\tgit@github.com:elastic/kibana.git (fetch)\n' +
        'elastic\tgit@github.com:elastic/kibana.git (push)\n' +
        'peter\tgit@github.com:peter/kibana (fetch)\n' +
        'peter\tgit@github.com:peter/kibana (push)\n' +
        'sorenlouv\tgit@github.com:sorenlouv/kibana.git (fetch)\n' +
        'sorenlouv\tgit@github.com:sorenlouv/kibana.git (push)\n',
      stderr: '',
      code: 0,
      cmdArgs: [],
    };
    jest.spyOn(childProcess, 'spawnPromise').mockResolvedValue(res);
    expect(await getRepoInfoFromGitRemotes({ cwd: 'foo/bar' })).toEqual([
      { repoName: 'kibana', repoOwner: 'john.doe' },
      { repoName: 'kibana', repoOwner: 'elastic' },
      { repoName: 'kibana', repoOwner: 'peter' },
      { repoName: 'kibana', repoOwner: 'sorenlouv' },
    ]);
  });

  it('returns repoName and repoOwner https remotes', async () => {
    jest.spyOn(childProcess, 'spawnPromise').mockResolvedValue({
      stdout:
        'origin\thttps://github.com/shay/elasticsearch.git (fetch)\n' +
        'origin\thttps://github.com/shay/elasticsearch.git (push)\n',
      stderr: '',
      code: 0,
      cmdArgs: [],
    });
    expect(await getRepoInfoFromGitRemotes({ cwd: 'foo/bar' })).toEqual([
      { repoName: 'elasticsearch', repoOwner: 'shay' },
    ]);
  });

  it('returns undefined when no remotes exist', async () => {
    const res = { stdout: '', stderr: '', code: 0, cmdArgs: [] };
    jest.spyOn(childProcess, 'spawnPromise').mockResolvedValue(res);
    expect(await getRepoInfoFromGitRemotes({ cwd: 'foo/bar' })).toEqual([]);
  });

  it('handles errors', async () => {
    const err = {
      killed: false,
      code: 128,
      signal: null,
      cmd: 'git ls-files .backportrc.js*  --exclude-standard --others',
      stdout: '',
      stderr:
        'fatal: not a git repository (or any of the parent directories): .git\n',
    };
    jest.spyOn(childProcess, 'spawnPromise').mockRejectedValueOnce(err);
    expect(await getRepoInfoFromGitRemotes({ cwd: 'foo/bar' })).toEqual([]);
  });
});

describe('getConflictingFiles', () => {
  it('should split by linebreak and remove empty and duplicate items', async () => {
    const err = new childProcess.SpawnError({
      code: 2,
      cmdArgs: ['--no-pager', 'diff', '--check'],
      stdout:
        'conflicting-file.txt:1: leftover conflict marker\nconflicting-file.txt:3: leftover conflict marker\nconflicting-file.txt:5: leftover conflict marker\n',
      stderr: '',
    });
    jest.spyOn(childProcess, 'spawnPromise').mockRejectedValueOnce(err);

    const options = {
      repoOwner: 'elastic',
      repoName: 'kibana',
    } as ValidConfigOptions;

    expect(await getConflictingFiles(options)).toEqual([
      {
        absolute:
          '/myHomeDir/.backport/repositories/elastic/kibana/conflicting-file.txt',
        relative: 'conflicting-file.txt',
      },
    ]);
  });
});

describe('createBackportBranch', () => {
  const options = {
    repoOwner: 'elastic',
    repoName: 'kibana',
  } as ValidConfigOptions;

  const sourceBranch = 'main';
  const targetBranch = '4.x';
  const backportBranch = 'backport/4.x/commit-72f94e76';

  it(`should handle "couldn't find remote ref" error`, async () => {
    expect.assertions(1);
    const err = new childProcess.SpawnError({
      code: 128,
      cmdArgs: [],
      stdout:
        'HEAD is now at 72f94e7 Create "conflicting-file.txt" in master\n',
      stderr: "fatal: couldn't find remote ref 4.x\n",
    });

    jest.spyOn(childProcess, 'spawnPromise').mockRejectedValueOnce(err);
    await expect(
      createBackportBranch({
        options,
        sourceBranch,
        targetBranch,
        backportBranch,
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"The branch "4.x" is invalid or doesn't exist"`,
    );
  });

  it('should throw "Invalid refspec" error', async () => {
    expect.assertions(1);
    const err = new childProcess.SpawnError({
      code: 128,
      cmdArgs: [],
      stdout: '',
      stderr:
        "fatal: Invalid refspec 'https://github.com/elastic/kibana.git'\n",
    });

    jest.spyOn(childProcess, 'spawnPromise').mockRejectedValueOnce(err);
    await expect(
      createBackportBranch({
        options,
        sourceBranch,
        targetBranch,
        backportBranch,
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"The remote "'https://github.com/elastic/kibana.git'" is invalid or doesn't exist"`,
    );
  });

  it('should throw "is not a commit" error', async () => {
    expect.assertions(1);
    const err = new childProcess.SpawnError({
      code: 128,
      cmdArgs: [],
      stdout: '',
      stderr:
        "fatal: 'origin/remote-branch-name' is not a commit and a branch 'local-branch-name' cannot be created from it",
    });

    jest.spyOn(childProcess, 'spawnPromise').mockRejectedValueOnce(err);
    await expect(
      createBackportBranch({
        options,
        sourceBranch,
        targetBranch,
        backportBranch,
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"The branch "origin/remote-branch-name'" is invalid or doesn't exist"`,
    );
  });

  it('should rethrow normal error', async () => {
    expect.assertions(1);
    const err = new Error('just a normal error');
    jest.spyOn(childProcess, 'spawnPromise').mockRejectedValueOnce(err);
    expect.assertions(1);

    await expect(
      createBackportBranch({
        options,
        sourceBranch,
        targetBranch,
        backportBranch,
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"just a normal error"`);
  });
});

describe('deleteRemote', () => {
  const remoteName = 'my-remote';
  const options = {
    repoOwner: 'elastic',
    repoName: 'kibana',
  } as ValidConfigOptions;

  it('should swallow "no such remote" error on git before 2.30.0', async () => {
    const err = new childProcess.SpawnError({
      code: 128,
      cmdArgs: [],
      stdout: '',
      stderr: "fatal: No such remote: 'my-remote'\n",
    });

    jest.spyOn(childProcess, 'spawnPromise').mockRejectedValueOnce(err);
    await expect(await deleteRemote(options, remoteName)).toBe(undefined);
  });

  it('should swallow "no such remote" error on git 2.30.0 or later', async () => {
    const err = new childProcess.SpawnError({
      code: 2,
      cmdArgs: [],
      stdout: '',
      stderr: "fatal: No such remote: 'my-remote'\n",
    });

    jest.spyOn(childProcess, 'spawnPromise').mockRejectedValueOnce(err);
    await expect(await deleteRemote(options, remoteName)).toBe(undefined);
  });

  it('should swallow "no such remote" error on git 2.30.0+, even if it is not in English', async () => {
    const err = new childProcess.SpawnError({
      code: 2, // returned only by git 2.30.0 or later, earlier versions returned 128
      cmdArgs: [],
      stdout: '',
      stderr: "Fehler: Remote-Repository nicht gefunden: 'my-remote'\n",
    });

    jest.spyOn(childProcess, 'spawnPromise').mockRejectedValueOnce(err);
    await expect(await deleteRemote(options, remoteName)).toBe(undefined);
  });

  it('should rethrow normal error', async () => {
    const err = new Error('just a normal error');
    jest.spyOn(childProcess, 'spawnPromise').mockRejectedValueOnce(err);
    expect.assertions(1);

    await expect(
      deleteRemote(options, remoteName),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"just a normal error"`);
  });
});

describe('cherrypick', () => {
  const options = {
    repoOwner: 'elastic',
    repoName: 'kibana',
  } as ValidConfigOptions;

  it('should return `needsResolving: false` when no errors are encountered', async () => {
    jest
      .spyOn(childProcess, 'spawnPromise')
      .mockResolvedValueOnce({ stderr: '', stdout: '', code: 0, cmdArgs: [] }); // mock `git cherrypick`

    expect(
      await cherrypick({
        options,
        sha: 'abcd',
        commitAuthor,
      }),
    ).toEqual({
      conflictingFiles: [],
      unstagedFiles: [],
      needsResolving: false,
    });
  });

  it('should use mainline option when specified', async () => {
    const spawnSpy = jest
      .spyOn(childProcess, 'spawnPromise')
      .mockResolvedValueOnce({ stderr: '', stdout: '', code: 0, cmdArgs: [] }); // mock `git cherrypick`

    await cherrypick({
      options: { ...options, mainline: 1 },
      sha: 'abcd',
      commitAuthor,
    });

    const args = spawnSpy.mock.calls[0];
    expect(args).toEqual([
      'git',
      [
        '-c',
        'user.name="Soren L"',
        '-c',
        'user.email="soren@mail.dk"',
        'cherry-pick',
        '--mainline',
        '1',
        '-x',
        'abcd',
      ],
      '/myHomeDir/.backport/repositories/elastic/kibana',
    ]);
  });

  it('should use signoff option when specified', async () => {
    const spawnSpy = jest
      .spyOn(childProcess, 'spawnPromise')
      .mockResolvedValueOnce({ stderr: '', stdout: '', code: 0, cmdArgs: [] }); // mock `git cherrypick`

    await cherrypick({
      options: { ...options, signoff: true },
      sha: 'abcd',
      commitAuthor,
    });

    const args = spawnSpy.mock.calls[0];
    expect(args).toEqual([
      'git',
      [
        '-c',
        'user.name="Soren L"',
        '-c',
        'user.email="soren@mail.dk"',
        'cherry-pick',
        '-x',
        '--signoff',
        'abcd',
      ],
      '/myHomeDir/.backport/repositories/elastic/kibana',
    ]);
  });

  it('should return `needsResolving: true` upon cherrypick error', async () => {
    jest
      .spyOn(childProcess, 'spawnPromise')
      // mock `git cherrypick`
      .mockRejectedValueOnce(
        new childProcess.SpawnError({
          code: 128,
          cmdArgs: ['cherry-pick', '-x', 'abcd'],
          stdout: '',
          stderr: '',
        }),
      )

      // mock getConflictingFiles
      .mockRejectedValueOnce(
        new childProcess.SpawnError({
          code: 2,
          cmdArgs: ['--no-pager', 'diff', '--check'],
          stdout:
            'conflicting-file.txt:1: leftover conflict marker\nconflicting-file.txt:3: leftover conflict marker\nconflicting-file.txt:5: leftover conflict marker\n',
          stderr: '',
        }),
      )

      // mock getUnstagedFiles
      .mockResolvedValueOnce({ stdout: '', stderr: '', code: 0, cmdArgs: [] });

    expect(
      await cherrypick({
        options,
        sha: 'abcd',
        commitAuthor,
      }),
    ).toEqual({
      conflictingFiles: [
        {
          absolute:
            '/myHomeDir/.backport/repositories/elastic/kibana/conflicting-file.txt',
          relative: 'conflicting-file.txt',
        },
      ],
      needsResolving: true,
      unstagedFiles: [],
    });
  });

  it('should let the user know about the "--mainline" argument when cherry-picking a merge commit without specifying it', async () => {
    jest
      .spyOn(childProcess, 'spawnPromise')

      // mock cherry pick command
      .mockRejectedValueOnce(
        new childProcess.SpawnError({
          code: 128,
          cmdArgs: ['cherry-pick', '381c7b604110257437a289b1f1742685eb8d79c5'],
          stdout: '',
          stderr:
            'error: commit 381c7b604110257437a289b1f1742685eb8d79c5 is a merge but no -m option was given.\nfatal: cherry-pick failed\n',
        }),
      );

    await expect(
      cherrypick({
        options,
        sha: 'abcd',
        commitAuthor,
      }),
    ).rejects
      .toThrow(`Cherrypick failed because the selected commit was a merge commit. Please try again by specifying the parent with the \`mainline\` argument:

> backport --mainline

or:

> backport --mainline <parent-number>

Or refer to the git documentation for more information: https://git-scm.com/docs/git-cherry-pick#Documentation/git-cherry-pick.txt---mainlineparent-number`);
  });

  it('should gracefully handle empty commits', async () => {
    jest
      .spyOn(childProcess, 'spawnPromise')

      // mock cherry pick command
      .mockRejectedValueOnce(
        new childProcess.SpawnError({
          code: 1,
          cmdArgs: ['cherry-pick', 'fe6b13b83cc010f722548cd5a0a8c2d5341a20dd'],
          stdout:
            'On branch backport/7.x/pr-58692\nYou are currently cherry-picking commit fe6b13b83cc.\n\nnothing to commit, working tree clean\n',
          stderr:
            "The previous cherry-pick is now empty, possibly due to conflict resolution.\nIf you wish to commit it anyway, use:\n\n    git commit --allow-empty\n\nOtherwise, please use 'git cherry-pick --skip'\n",
        }),
      );

    await expect(
      cherrypick({
        options,
        sha: 'abcd',
        commitAuthor,
      }),
    ).rejects.toThrow(
      `Cherrypick failed because the selected commit (abcd) is empty. Did you already backport this commit?`,
    );
  });

  it('should re-throw non-cherrypick errors', async () => {
    jest
      .spyOn(childProcess, 'spawnPromise')

      // mock cherry pick command
      .mockRejectedValueOnce(new Error('non-cherrypick error'))

      // getConflictingFiles
      .mockResolvedValueOnce({ stdout: '', stderr: '', code: 0, cmdArgs: [] })

      // getUnstagedFiles
      .mockResolvedValueOnce({ stdout: '', stderr: '', code: 0, cmdArgs: [] });

    await expect(
      cherrypick({
        options,
        sha: 'abcd',
        commitAuthor,
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"non-cherrypick error"`);
  });
});

describe('commitChanges', () => {
  const options = {
    repoOwner: 'elastic',
    repoName: 'kibana',
  } as ValidConfigOptions;

  const commit: Commit = {
    author: { email: 'soren.louv@elastic.co', name: 'Søren Louv-Jansen' },
    suggestedTargetBranches: [],
    sourceCommit: {
      branchLabelMapping: {},
      message: 'The original commit message',
      committedDate: '2020',
      sha: 'abc',
    },
    sourceBranch: 'master',
    targetPullRequestStates: [],
  };

  it('should return when changes committed successfully', async () => {
    jest
      .spyOn(childProcess, 'spawnPromise')
      .mockResolvedValueOnce({ stderr: '', stdout: '', code: 0, cmdArgs: [] });

    await expect(await commitChanges({ commit, commitAuthor, options })).toBe(
      undefined,
    );
  });

  it('should swallow error if changes have already been committed manaully', async () => {
    const err = new childProcess.SpawnError({
      code: 1,
      cmdArgs: ['commit', '--no-edit'],
      stdout:
        'On branch backport/7.x/commit-913afb3b\nnothing to commit, working tree clean\n',
      stderr: '',
    });

    jest.spyOn(childProcess, 'spawnPromise').mockRejectedValueOnce(err);
    await expect(await commitChanges({ commit, commitAuthor, options })).toBe(
      undefined,
    );
  });

  describe('when commit fails due to empty message', () => {
    let spy: SpyHelper<typeof childProcess.spawnPromise>;
    let res: void;
    beforeEach(async () => {
      const err = new childProcess.SpawnError({
        code: 1,
        cmdArgs: ['commit', '--no-edit', '--no-verify'],
        stdout: '',
        stderr: 'Aborting commit due to empty commit message.\n',
      });

      spy = jest
        .spyOn(childProcess, 'spawnPromise')
        .mockRejectedValueOnce(err)
        .mockResolvedValueOnce({
          stderr: '',
          stdout: '',
          code: 0,
          cmdArgs: [],
        });

      res = await commitChanges({ commit, commitAuthor, options });
    });

    it('should manually set the commit message', () => {
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy.mock.calls[0]).toEqual([
        'git',
        [
          '-c',
          'user.name="Soren L"',
          '-c',
          'user.email="soren@mail.dk"',
          'commit',
          '--no-edit',
        ],
        expect.any(String),
      ]);

      expect(spy.mock.calls[1]).toEqual([
        'git',
        [
          '-c',
          'user.name="Soren L"',
          '-c',
          'user.email="soren@mail.dk"',
          'commit',
          '--message=The original commit message',
        ],
        expect.any(String),
      ]);
    });

    it('should handle the error and resolve successfully', async () => {
      await expect(res).toBe(undefined);
    });
  });

  it('should re-throw other errors', async () => {
    const err = new Error('another error');
    jest.spyOn(childProcess, 'spawnPromise').mockRejectedValueOnce(err);
    expect.assertions(1);

    await expect(
      commitChanges({ commit, commitAuthor, options }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"another error"`);
  });
});

describe('addRemote', () => {
  const options = {
    accessToken: 'myAccessToken',
    repoOwner: 'elastic',
    repoName: 'kibana',
    gitHostname: 'github.com',
  } as ValidConfigOptions;

  it('add correct origin remote', async () => {
    const spy = jest
      .spyOn(childProcess, 'spawnPromise')
      .mockResolvedValueOnce({ stderr: '', stdout: '', code: 0, cmdArgs: [] });

    await addRemote(options, 'elastic');

    return expect(spy).toHaveBeenCalledWith(
      'git',
      [
        'remote',
        'add',
        'elastic',
        'https://x-access-token:myAccessToken@github.com/elastic/kibana.git',
      ],
      '/myHomeDir/.backport/repositories/elastic/kibana',
    );
  });

  it('add correct user remote', async () => {
    const spy = jest
      .spyOn(childProcess, 'spawnPromise')
      .mockResolvedValueOnce({ stderr: '', stdout: '', code: 0, cmdArgs: [] });
    await addRemote(options, 'sorenlouv');

    return expect(spy).toHaveBeenCalledWith(
      'git',
      [
        'remote',
        'add',
        'sorenlouv',
        'https://x-access-token:myAccessToken@github.com/sorenlouv/kibana.git',
      ],
      '/myHomeDir/.backport/repositories/elastic/kibana',
    );
  });

  it('allows custom github url', async () => {
    const spy = jest
      .spyOn(childProcess, 'spawnPromise')
      .mockResolvedValueOnce({ stderr: '', stdout: '', code: 0, cmdArgs: [] });
    await addRemote(
      { ...options, gitHostname: 'github.my-company.com' },
      'sorenlouv',
    );

    return expect(spy).toHaveBeenCalledWith(
      'git',
      [
        'remote',
        'add',
        'sorenlouv',
        'https://x-access-token:myAccessToken@github.my-company.com/sorenlouv/kibana.git',
      ],
      '/myHomeDir/.backport/repositories/elastic/kibana',
    );
  });
});

describe('pushBackportBranch', () => {
  const options = {
    authenticatedUsername: 'sqren_authenticated',
    fork: true,
    repoForkOwner: 'the_fork_owner',
    repoName: 'kibana',
    repoOwner: 'elastic',
  } as ValidConfigOptions;

  const backportBranch = 'backport/7.x/pr-2';

  it('should handle missing fork error', async () => {
    jest.spyOn(childProcess, 'spawnPromise').mockRejectedValueOnce(
      new childProcess.SpawnError({
        code: 128,
        cmdArgs: [
          'push',
          'sorenlouv',
          'backport/7.x/pr-2:backport/7.x/pr-2',
          '--force',
        ],
        stdout: '',
        stderr:
          "remote: Repository not found.\nfatal: repository 'https://github.com/sorenlouv/kibana.git/' not found\n",
      }),
    );

    await expect(pushBackportBranch({ options, backportBranch })).rejects
      .toThrowErrorMatchingInlineSnapshot(`
      "Error pushing to https://github.com/the_fork_owner/kibana. Repository does not exist. Either fork the repository (https://github.com/elastic/kibana) or disable fork mode via "--no-fork".
      Read more about fork mode in the docs: https://github.com/sorenlouv/backport/blob/main/docs/config-file-options.md#fork"
    `);
  });
});
