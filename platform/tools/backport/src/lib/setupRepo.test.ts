import os from 'os';
import del from 'del';
import { ValidConfigOptions } from '../options/options';
import { SpyHelper } from '../types/SpyHelper';
import * as childProcess from './child-process-promisified';
import * as gitModule from './git';
import { oraNonInteractiveMode } from './ora';
import { setupRepo } from './setupRepo';

describe('setupRepo', () => {
  let spawnSpy: SpyHelper<typeof childProcess.spawnPromise>;

  beforeEach(() => {
    jest.spyOn(os, 'homedir').mockReturnValue('/myHomeDir');

    spawnSpy = jest
      .spyOn(childProcess, 'spawnPromise')
      .mockResolvedValue({ stderr: '', stdout: '', code: 0, cmdArgs: [] });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('if an error occurs while cloning', () => {
    it('should delete repo', async () => {
      expect.assertions(2);

      jest
        .spyOn(childProcess, 'spawnStream')
        .mockImplementation((cmd, cmdArgs) => {
          if (cmdArgs.includes('clone')) {
            throw new Error('Simulated git clone failure');
          }

          throw new Error('unknown error');
        });

      await expect(
        setupRepo({
          repoName: 'kibana',
          repoOwner: 'elastic',
          cwd: '/path/to/source/repo',
          interactive: false,
        } as ValidConfigOptions),
      ).rejects.toThrow('Simulated git clone failure');

      expect(del).toHaveBeenCalledWith(
        '/myHomeDir/.backport/repositories/elastic/kibana',
        { force: true },
      );
    });
  });

  describe('while cloning the repo', () => {
    it('updates the progress', async () => {
      let onClose: (code: any, signals?: any) => void;
      let onData: (chunk: any) => void;

      const spinnerTextSpy = jest.spyOn(oraNonInteractiveMode, 'text', 'set');
      const spinnerSuccessSpy = jest.spyOn(oraNonInteractiveMode, 'succeed');

      jest
        .spyOn(gitModule, 'getLocalSourceRepoPath')
        .mockResolvedValue(undefined);

      jest
        .spyOn(childProcess, 'spawnStream')
        //@ts-expect-error
        .mockImplementation(() => {
          return {
            on: (name, cb) => {
              if (name === 'close') {
                onClose = cb;
              }
            },
            stderr: {
              on: (name, handler) => {
                if (name === 'data') {
                  onData = handler;
                }
              },
            },
          };
        });

      setTimeout(() => {
        onData('Receiving objects:   1%');
        onData('Receiving objects:   10%');
        onData('Receiving objects:   20%');
        onData('Receiving objects:   100%');
        onData('Updating files:   1%');
        onData('Updating files:   10%');
        onData('Updating files:   20%');
        onData('Updating files:   100%');
        onClose(0);
      }, 50);

      await setupRepo({
        repoName: 'kibana',
        repoOwner: 'elastic',
        gitHostname: 'github.com',
        cwd: '/path/to/source/repo',
        interactive: false,
      } as ValidConfigOptions);

      expect(spinnerTextSpy.mock.calls.map((call) => call[0]))
        .toMatchInlineSnapshot(`
        [
          "0% Cloning repository from github.com (one-time operation)",
          "1% Cloning repository from github.com (one-time operation)",
          "9% Cloning repository from github.com (one-time operation)",
          "18% Cloning repository from github.com (one-time operation)",
          "90% Cloning repository from github.com (one-time operation)",
          "90% Cloning repository from github.com (one-time operation)",
          "91% Cloning repository from github.com (one-time operation)",
          "92% Cloning repository from github.com (one-time operation)",
          "100% Cloning repository from github.com (one-time operation)",
        ]
      `);

      expect(spinnerSuccessSpy).toHaveBeenCalledWith(
        '100% Cloning repository from github.com (one-time operation)',
      );
    });
  });

  describe('if repo is already cloned', () => {
    function mockGitProjectRootPath(value: string) {
      return (
        jest
          .spyOn(childProcess, 'spawnPromise')
          //@ts-expect-error
          .mockImplementationOnce(async (cmd, cmdArgs) => {
            if (cmdArgs.includes('rev-parse')) {
              return {
                stdout: value,
              };
            }
          })
      );
    }

    beforeEach(async () => {
      jest.clearAllMocks();
      mockGitProjectRootPath(
        '/myHomeDir/.backport/repositories/elastic/kibana',
      );

      jest.spyOn(gitModule, 'cloneRepo');

      await setupRepo({
        accessToken: 'myAccessToken',
        authenticatedUsername: 'sqren_authenticated',
        cwd: '/path/to/source/repo',
        fork: true,
        repoForkOwner: 'sorenlouv',
        repoName: 'kibana',
        repoOwner: 'elastic',
      } as ValidConfigOptions);
    });

    it('should not delete the existing repo', () => {
      expect(del).not.toHaveBeenCalled();
    });

    it('should not clone repo', () => {
      expect(gitModule.cloneRepo).not.toHaveBeenCalled();
    });

    it('should re-create remotes for both source repo and fork', () => {
      expect(
        spawnSpy.mock.calls.map(([cmd, cmdArgs, cwd]) => ({
          cmd: `${cmd} ${cmdArgs.join(' ')}`,
          cwd,
        })),
      ).toEqual([
        {
          cmd: 'git rev-parse --show-toplevel',
          cwd: '/myHomeDir/.backport/repositories/elastic/kibana',
        },
        {
          cmd: 'git remote rm origin',
          cwd: '/myHomeDir/.backport/repositories/elastic/kibana',
        },
        {
          cmd: 'git remote rm sorenlouv',
          cwd: '/myHomeDir/.backport/repositories/elastic/kibana',
        },
        {
          cmd: 'git remote add sorenlouv https://x-access-token:myAccessToken@github.com/sorenlouv/kibana.git',
          cwd: '/myHomeDir/.backport/repositories/elastic/kibana',
        },
        {
          cmd: 'git remote rm elastic',
          cwd: '/myHomeDir/.backport/repositories/elastic/kibana',
        },
        {
          cmd: 'git remote add elastic https://x-access-token:myAccessToken@github.com/elastic/kibana.git',
          cwd: '/myHomeDir/.backport/repositories/elastic/kibana',
        },
      ]);
    });
  });

  function mockGitClone() {
    jest
      .spyOn(childProcess, 'spawnStream')
      //@ts-expect-error
      .mockImplementation((cmd, cmdArgs) => {
        if (cmdArgs.includes('clone')) {
          return {
            on: (name, cb) => {
              if (name === 'close') {
                //@ts-expect-error
                cb(0);
              }
            },
            stderr: { on: () => null },
          };
        }
      });
  }

  describe('if repo does not exists locally', () => {
    let spinnerSuccessSpy: jest.SpyInstance;
    beforeEach(async () => {
      spinnerSuccessSpy = jest.spyOn(oraNonInteractiveMode, 'succeed');

      mockGitClone();

      await setupRepo({
        accessToken: 'myAccessToken',
        gitHostname: 'github.com',
        repoName: 'kibana',
        repoOwner: 'elastic',
        cwd: '/path/to/source/repo',
        interactive: false,
      } as ValidConfigOptions);
    });

    it('should clone it from github.com', async () => {
      expect(spinnerSuccessSpy).toHaveBeenCalledWith(
        '100% Cloning repository from github.com (one-time operation)',
      );

      expect(childProcess.spawnStream).toHaveBeenCalledWith('git', [
        'clone',
        'https://x-access-token:myAccessToken@github.com/elastic/kibana.git',
        '/myHomeDir/.backport/repositories/elastic/kibana',
        '--progress',
      ]);
    });
  });

  describe('if repo exists locally', () => {
    let spinnerSuccessSpy: jest.SpyInstance;
    beforeEach(async () => {
      spinnerSuccessSpy = jest.spyOn(oraNonInteractiveMode, 'succeed');

      jest
        .spyOn(gitModule, 'getLocalSourceRepoPath')
        .mockResolvedValue('/path/to/source/repo');

      mockGitClone();

      await setupRepo({
        repoName: 'kibana',
        repoOwner: 'elastic',
        cwd: '/path/to/source/repo',
        interactive: false,
      } as ValidConfigOptions);
    });

    it('should clone it from local folder', async () => {
      expect(spinnerSuccessSpy).toHaveBeenCalledWith(
        '100% Cloning repository from /path/to/source/repo (one-time operation)',
      );

      expect(childProcess.spawnStream).toHaveBeenCalledWith('git', [
        'clone',
        '/path/to/source/repo',
        '/myHomeDir/.backport/repositories/elastic/kibana',
        '--progress',
      ]);
    });
  });

  describe('if `repoPath` is a parent of current working directory (cwd)', () => {
    it('should clone it from local folder', async () => {
      await expect(() =>
        setupRepo({
          repoName: 'kibana',
          repoOwner: 'elastic',
          cwd: '/myHomeDir/.backport/repositories/owner/repo/foo',
          dir: '/myHomeDir/.backport/repositories/owner/repo',
          interactive: false,
        } as ValidConfigOptions),
      ).rejects.toThrow(
        'Refusing to clone repo into "/myHomeDir/.backport/repositories/owner/repo" when current working directory is "/myHomeDir/.backport/repositories/owner/repo/foo". Please change backport directory via `--dir` option or run backport from another location',
      );
    });
  });
});
