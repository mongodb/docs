import os from 'os';
import { ValidConfigOptions } from '../options/options';
import { getGlobalConfigPath, getRepoPath } from './env';

describe('env', () => {
  beforeEach(() => {
    jest.spyOn(os, 'homedir').mockReturnValue('/myHomeDir');
  });

  describe('getGlobalConfigPath', () => {
    it('uses homedir when no argument is given', () => {
      expect(getGlobalConfigPath(undefined)).toBe(
        '/myHomeDir/.backport/config.json',
      );
    });

    it('uses custom config when given', () => {
      expect(getGlobalConfigPath('/my/path/to/global/config.json')).toBe(
        '/my/path/to/global/config.json',
      );
    });
  });

  it('getRepoPath', () => {
    expect(
      getRepoPath({
        repoOwner: 'elastic',
        repoName: 'kibana',
      } as ValidConfigOptions),
    ).toBe('/myHomeDir/.backport/repositories/elastic/kibana');
  });
});
