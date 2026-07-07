// Mock the module dependencies of runModules so we can exercise the failure
// barrier in isolation. parse() is the source of the thrown error we care about.
jest.mock('../../src/parse/parse');
jest.mock('../../src/persistence/index', () => ({
  runPersistenceModule: jest.fn(),
  closeConnections: jest.fn().mockResolvedValue(undefined),
}));
jest.mock('../../src/parse/handleParseLogs', () => ({
  constructParserLogs: jest.fn().mockReturnValue('logs'),
  displayParserLogs: jest.fn().mockResolvedValue(undefined),
}));
jest.mock('../../src/paths', () => ({
  getRepoPaths: () => ({
    parserDir: '/parser',
    absoluteContentPath: (p: string) => `/content/${p}`,
    absoluteBundlePath: (p: string) => `/bundles/${p}`,
  }),
}));

import { runPrebuildModules } from '../../src/parse/runModules';
import { parse } from '../../src/parse/parse';
import { runPersistenceModule, closeConnections } from '../../src/persistence/index';
import type { AllContentData } from '../../src/contentMetadata/processContentMetadata';

const mockParse = parse as jest.MockedFunction<typeof parse>;
const mockRunPersistence = runPersistenceModule as jest.MockedFunction<
  typeof runPersistenceModule
>;

const makeArgs = (pathsToBuild: string[]) => ({
  netlifyPluginUtils: {
    run: jest.fn(),
    cache: jest.fn(),
    status: { show: jest.fn() },
  } as unknown as Parameters<typeof runPrebuildModules>[0]['netlifyPluginUtils'],
  branchName: 'main',
  atlasProjectDocuments: {},
  shouldRunPersistence: true,
  allContentData: {
    atlasProjectDocuments: {},
    pathsToBuild,
    docsPaths: Object.fromEntries(
      pathsToBuild.map((p) => [
        p,
        { projectName: p, versionName: 'main', projectDirName: p },
      ]),
    ),
  } as unknown as AllContentData,
});

beforeEach(() => {
  jest.clearAllMocks();
  (closeConnections as jest.Mock).mockResolvedValue(undefined);
});

describe('runPrebuildModules failure barrier', () => {
  it('throws when a content path fails to parse', async () => {
    mockParse.mockRejectedValue(new Error('exit code 1'));

    await expect(runPrebuildModules(makeArgs(['atlas']))).rejects.toThrow(
      /Aborting build/,
    );
  });

  it('throws when only one of several paths fails', async () => {
    mockParse.mockImplementation(async ({ contentPath }) => {
      if (contentPath === '/content/atlas') throw new Error('boom');
      return 'ok';
    });

    await expect(
      runPrebuildModules(makeArgs(['manual/v8.0', 'atlas'])),
    ).rejects.toThrow(/atlas/);
  });

  it('does not throw when all paths parse successfully', async () => {
    mockParse.mockResolvedValue('ok');

    await expect(
      runPrebuildModules(makeArgs(['atlas', 'manual/v8.0'])),
    ).resolves.toEqual(expect.any(Number));
    expect(mockRunPersistence).toHaveBeenCalledTimes(2);
  });
});
