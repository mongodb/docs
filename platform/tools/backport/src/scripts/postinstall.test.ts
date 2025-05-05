import os from 'os';
import * as logger from '../lib/logger';
import * as globalConfig from '../options/config/globalConfig';
import { postinstall } from './postinstall';

describe('postinstall', () => {
  beforeEach(() => {
    jest.spyOn(os, 'homedir').mockReturnValue('/myHomeDir');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create global config if it doesn't exist", async () => {
    const createGlobalConfigAndFolderIfNotExistSpy = jest
      .spyOn(globalConfig, 'createGlobalConfigAndFolderIfNotExist')
      .mockResolvedValueOnce(true);

    await postinstall();
    expect(createGlobalConfigAndFolderIfNotExistSpy).toHaveBeenCalledTimes(1);
    expect(logger.consoleLog).toHaveBeenCalledWith(
      'Global config successfully created in /myHomeDir/.backport/config.json',
    );
  });

  it('should not create global config if it already exists', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const createGlobalConfigAndFolderIfNotExistSpy = jest
      .spyOn(globalConfig, 'createGlobalConfigAndFolderIfNotExist')
      .mockResolvedValueOnce(false);

    await postinstall();
    expect(createGlobalConfigAndFolderIfNotExistSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledTimes(0);
  });
});
