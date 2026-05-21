// @netlify/sdk is ESM-only; mock extension.ts to avoid loading it in CJS mode
jest.mock('../../src/util/extension', () => ({
  envVarToBool: (val: boolean | string = 'false') => {
    if (typeof val === 'boolean') return val;
    return JSON.parse(val);
  },
}));
jest.mock('../../src/github/getParser');
jest.mock('../../src/github/processFileChanges');

import { resolvePathsToBuild } from '../../src/util/resolvePathsToBuild';
import { getParser } from '../../src/github/getParser';
import {
  getFileChanges,
  findContentPathsWithChanges,
} from '../../src/github/processFileChanges';
import type { AllContentData } from '../../src/contentMetadata/processContentMetadata';

const mockGetParser = getParser as jest.MockedFunction<typeof getParser>;
const mockGetFileChanges = getFileChanges as jest.MockedFunction<typeof getFileChanges>;
const mockFindContentPathsWithChanges = findContentPathsWithChanges as jest.MockedFunction<typeof findContentPathsWithChanges>;

const makeUtils = () =>
  ({
    run: jest.fn(),
    cache: jest.fn(),
    git: { modifiedFiles: [], createdFiles: [], deletedFiles: [] },
  }) as unknown as Parameters<typeof resolvePathsToBuild>[0]['utils'];

const makeAllContentData = (): AllContentData => ({
  pathsToBuild: [],
  docsPaths: {},
  atlasProjectDocuments: {},
});

const contentDirectories = ['atlas', 'manual/v8.0', 'node/current'];

beforeEach(() => {
  jest.resetAllMocks();
  delete process.env.FORCE_REBUILD_ALL;
  delete process.env.FORCE_REBUILD_PATHS;
});

describe('resolvePathsToBuild — FORCE_REBUILD_ALL', () => {
  it('pushes all contentDirectories when FORCE_REBUILD_ALL is set', async () => {
    process.env.FORCE_REBUILD_ALL = 'true';
    mockGetParser.mockResolvedValue(true);
    const allContentData = makeAllContentData();

    await resolvePathsToBuild({
      utils: makeUtils(),
      validParserCache: true,
      contentDirectories,
      allContentData,
    });

    expect(allContentData.pathsToBuild).toEqual(contentDirectories);
    expect(mockGetFileChanges).not.toHaveBeenCalled();
  });
});

describe('resolvePathsToBuild — invalid parser cache', () => {
  it('pushes all contentDirectories when the parser cache is invalid', async () => {
    mockGetParser.mockResolvedValue(false);
    const allContentData = makeAllContentData();

    await resolvePathsToBuild({
      utils: makeUtils(),
      validParserCache: false,
      contentDirectories,
      allContentData,
    });

    expect(allContentData.pathsToBuild).toEqual(contentDirectories);
    expect(mockGetFileChanges).not.toHaveBeenCalled();
  });
});

describe('resolvePathsToBuild — changed files detection', () => {
  it('only pushes paths that have changed files', async () => {
    mockGetParser.mockResolvedValue(true);
    mockGetFileChanges.mockResolvedValue(['content/atlas/current/source/index.rst']);
    mockFindContentPathsWithChanges.mockResolvedValue({
      changedContentPaths: ['atlas/current'],
      unchangedContentPaths: ['manual/v8.0', 'node/current'],
    });
    const allContentData = makeAllContentData();

    await resolvePathsToBuild({
      utils: makeUtils(),
      validParserCache: true,
      contentDirectories,
      allContentData,
    });

    expect(allContentData.pathsToBuild).toEqual(['atlas/current']);
  });

  it('results in an empty pathsToBuild when no files have changed', async () => {
    mockGetParser.mockResolvedValue(true);
    mockGetFileChanges.mockResolvedValue([]);
    mockFindContentPathsWithChanges.mockResolvedValue({
      changedContentPaths: [],
      unchangedContentPaths: contentDirectories,
    });
    const allContentData = makeAllContentData();

    await resolvePathsToBuild({
      utils: makeUtils(),
      validParserCache: true,
      contentDirectories,
      allContentData,
    });

    expect(allContentData.pathsToBuild).toEqual([]);
  });
});

describe('resolvePathsToBuild — FORCE_REBUILD_PATHS', () => {
  it('adds matching paths that are not already queued', async () => {
    process.env.FORCE_REBUILD_PATHS = 'manual/v8.0';
    mockGetParser.mockResolvedValue(true);
    mockGetFileChanges.mockResolvedValue(['content/atlas/current/source/index.rst']);
    mockFindContentPathsWithChanges.mockResolvedValue({
      changedContentPaths: ['atlas/current'],
      unchangedContentPaths: ['manual/v8.0', 'node/current'],
    });
    const allContentData = makeAllContentData();

    await resolvePathsToBuild({
      utils: makeUtils(),
      validParserCache: true,
      contentDirectories,
      allContentData,
    });

    expect(allContentData.pathsToBuild).toContain('atlas/current');
    expect(allContentData.pathsToBuild).toContain('manual/v8.0');
    expect(allContentData.pathsToBuild).not.toContain('node/current');
  });

  it('does not duplicate a path already queued by changed-file detection', async () => {
    process.env.FORCE_REBUILD_PATHS = 'atlas/current';
    mockGetParser.mockResolvedValue(true);
    mockGetFileChanges.mockResolvedValue(['content/atlas/current/source/index.rst']);
    mockFindContentPathsWithChanges.mockResolvedValue({
      changedContentPaths: ['atlas/current'],
      unchangedContentPaths: ['manual/v8.0', 'node/current'],
    });
    const allContentData = makeAllContentData();

    await resolvePathsToBuild({
      utils: makeUtils(),
      validParserCache: true,
      contentDirectories,
      allContentData,
    });

    expect(allContentData.pathsToBuild.filter((p) => p === 'atlas/current')).toHaveLength(1);
  });

  it('matches by prefix so a parent path forces all its children', async () => {
    process.env.FORCE_REBUILD_PATHS = 'atlas';
    mockGetParser.mockResolvedValue(true);
    mockGetFileChanges.mockResolvedValue([]);
    mockFindContentPathsWithChanges.mockResolvedValue({
      changedContentPaths: [],
      unchangedContentPaths: contentDirectories,
    });
    const dirs = ['atlas/current', 'atlas/upcoming', 'manual/v8.0'];
    const allContentData = makeAllContentData();

    await resolvePathsToBuild({
      utils: makeUtils(),
      validParserCache: true,
      contentDirectories: dirs,
      allContentData,
    });

    expect(allContentData.pathsToBuild).toContain('atlas/current');
    expect(allContentData.pathsToBuild).toContain('atlas/upcoming');
    expect(allContentData.pathsToBuild).not.toContain('manual/v8.0');
  });

  it('accepts a comma-separated list of paths', async () => {
    process.env.FORCE_REBUILD_PATHS = 'manual/v8.0, node/current';
    mockGetParser.mockResolvedValue(true);
    mockGetFileChanges.mockResolvedValue([]);
    mockFindContentPathsWithChanges.mockResolvedValue({
      changedContentPaths: [],
      unchangedContentPaths: contentDirectories,
    });
    const allContentData = makeAllContentData();

    await resolvePathsToBuild({
      utils: makeUtils(),
      validParserCache: true,
      contentDirectories,
      allContentData,
    });

    expect(allContentData.pathsToBuild).toContain('manual/v8.0');
    expect(allContentData.pathsToBuild).toContain('node/current');
    expect(allContentData.pathsToBuild).not.toContain('atlas/current');
  });
});
