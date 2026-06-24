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
import type { AllContentData, ContentBundleData } from '../../src/contentMetadata/processContentMetadata';

const mockGetParser = getParser as jest.MockedFunction<typeof getParser>;
const mockGetFileChanges = getFileChanges as jest.MockedFunction<typeof getFileChanges>;
const mockFindContentPathsWithChanges = findContentPathsWithChanges as jest.MockedFunction<typeof findContentPathsWithChanges>;

const makeUtils = () =>
  ({
    run: jest.fn(),
    cache: jest.fn(),
    git: { modifiedFiles: [], createdFiles: [], deletedFiles: [] },
  }) as unknown as Parameters<typeof resolvePathsToBuild>[0]['utils'];

const contentDirectories = ['atlas', 'manual/v8.0', 'node/current'];

/** Build docsPaths metadata for the canonical contentDirectories above.
 *  By default, marks the first two as active and the last as inactive. */
const makeDocsPaths = (
  overrides: Partial<Record<string, boolean>> = {},
): ContentBundleData => {
  const defaults: Record<string, boolean> = {
    atlas: true,
    'manual/v8.0': true,
    'node/current': false,
  };
  const active = { ...defaults, ...overrides };
  const docsPaths: ContentBundleData = {};
  for (const path of Object.keys(active)) {
    const parts = path.split('/');
    docsPaths[path] = {
      projectName: parts[0],
      projectDirName: parts[0],
      versionName: parts[1] ?? '',
      active: active[path] as boolean,
      changed: false,
      shouldRebuild: false,
      fullPath: '',
    };
  }
  return docsPaths;
};

const makeAllContentData = (
  docsPaths: ContentBundleData = makeDocsPaths(),
): AllContentData => ({
  pathsToBuild: [],
  docsPaths,
  atlasProjectDocuments: {},
});

beforeEach(() => {
  jest.resetAllMocks();
  delete process.env.FORCE_REBUILD_ALL_ACTIVE;
  delete process.env.FORCE_REBUILD_ALL_INACTIVE;
  delete process.env.FORCE_REBUILD_PATHS;
  delete process.env.ALLOW_INACTIVE_VERSIONS;
});

describe('resolvePathsToBuild — FORCE_REBUILD_ALL_ACTIVE', () => {
  it('pushes only active contentDirectories when FORCE_REBUILD_ALL_ACTIVE is set', async () => {
    process.env.FORCE_REBUILD_ALL_ACTIVE = 'true';
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

    expect(allContentData.pathsToBuild).toEqual(['atlas', 'manual/v8.0']);
    expect(allContentData.pathsToBuild).not.toContain('node/current');
  });

  it('still picks up inactive paths via git change detection', async () => {
    process.env.FORCE_REBUILD_ALL_ACTIVE = 'true';
    mockGetParser.mockResolvedValue(true);
    mockGetFileChanges.mockResolvedValue(['content/node/current/source/index.rst']);
    mockFindContentPathsWithChanges.mockResolvedValue({
      changedContentPaths: ['node/current'],
      unchangedContentPaths: ['atlas', 'manual/v8.0'],
    });
    const allContentData = makeAllContentData();

    await resolvePathsToBuild({
      utils: makeUtils(),
      validParserCache: true,
      contentDirectories,
      allContentData,
    });

    expect(allContentData.pathsToBuild).toContain('atlas');
    expect(allContentData.pathsToBuild).toContain('manual/v8.0');
    expect(allContentData.pathsToBuild).toContain('node/current');
  });
});

describe('resolvePathsToBuild — FORCE_REBUILD_ALL_INACTIVE', () => {
  it('pushes only inactive contentDirectories when FORCE_REBUILD_ALL_INACTIVE is set', async () => {
    process.env.FORCE_REBUILD_ALL_INACTIVE = 'true';
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

    expect(allContentData.pathsToBuild).toEqual(['node/current']);
  });

  it('skips git change detection when both ACTIVE and INACTIVE are set', async () => {
    process.env.FORCE_REBUILD_ALL_ACTIVE = 'true';
    process.env.FORCE_REBUILD_ALL_INACTIVE = 'true';
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
  it('only rebuilds changed paths when the parser cache is invalid', async () => {
    mockGetParser.mockResolvedValue(false);
    mockGetFileChanges.mockResolvedValue(['content/atlas/source/index.rst']);
    mockFindContentPathsWithChanges.mockResolvedValue({
      changedContentPaths: ['atlas'],
      unchangedContentPaths: ['manual/v8.0', 'node/current'],
    });
    const allContentData = makeAllContentData();

    await resolvePathsToBuild({
      utils: makeUtils(),
      validParserCache: false,
      contentDirectories,
      allContentData,
    });

    expect(allContentData.pathsToBuild).toEqual(['atlas']);
    expect(allContentData.pathsToBuild).not.toContain('manual/v8.0');
    expect(allContentData.pathsToBuild).not.toContain('node/current');
  });

  it('does not rebuild any paths when the parser cache is invalid and nothing changed', async () => {
    mockGetParser.mockResolvedValue(false);
    mockGetFileChanges.mockResolvedValue([]);
    mockFindContentPathsWithChanges.mockResolvedValue({
      changedContentPaths: [],
      unchangedContentPaths: contentDirectories,
    });
    const allContentData = makeAllContentData();

    await resolvePathsToBuild({
      utils: makeUtils(),
      validParserCache: false,
      contentDirectories,
      allContentData,
    });

    expect(allContentData.pathsToBuild).toEqual([]);
  });

  it('rebuilds only inactive paths (plus changed) when parser cache is invalid AND FORCE_REBUILD_ALL_INACTIVE is set', async () => {
    process.env.FORCE_REBUILD_ALL_INACTIVE = 'true';
    mockGetParser.mockResolvedValue(false);
    mockGetFileChanges.mockResolvedValue([]);
    mockFindContentPathsWithChanges.mockResolvedValue({
      changedContentPaths: [],
      unchangedContentPaths: contentDirectories,
    });
    const allContentData = makeAllContentData();

    await resolvePathsToBuild({
      utils: makeUtils(),
      validParserCache: false,
      contentDirectories,
      allContentData,
    });

    expect(allContentData.pathsToBuild).toEqual(['node/current']);
    expect(allContentData.pathsToBuild).not.toContain('atlas');
    expect(allContentData.pathsToBuild).not.toContain('manual/v8.0');
    expect(mockGetFileChanges).toHaveBeenCalled();
  });
});

describe('resolvePathsToBuild — changed files detection', () => {
  it('only pushes paths that have changed files', async () => {
    mockGetParser.mockResolvedValue(true);
    mockGetFileChanges.mockResolvedValue(['content/atlas/source/index.rst']);
    mockFindContentPathsWithChanges.mockResolvedValue({
      changedContentPaths: ['atlas'],
      unchangedContentPaths: ['manual/v8.0', 'node/current'],
    });
    const allContentData = makeAllContentData();

    await resolvePathsToBuild({
      utils: makeUtils(),
      validParserCache: true,
      contentDirectories,
      allContentData,
    });

    expect(allContentData.pathsToBuild).toEqual(['atlas']);
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
    mockGetFileChanges.mockResolvedValue(['content/atlas/source/index.rst']);
    mockFindContentPathsWithChanges.mockResolvedValue({
      changedContentPaths: ['atlas'],
      unchangedContentPaths: ['manual/v8.0', 'node/current'],
    });
    const allContentData = makeAllContentData();

    await resolvePathsToBuild({
      utils: makeUtils(),
      validParserCache: true,
      contentDirectories,
      allContentData,
    });

    expect(allContentData.pathsToBuild).toContain('atlas');
    expect(allContentData.pathsToBuild).toContain('manual/v8.0');
    expect(allContentData.pathsToBuild).not.toContain('node/current');
  });

  it('does not duplicate a path already queued by changed-file detection', async () => {
    process.env.FORCE_REBUILD_PATHS = 'atlas';
    mockGetParser.mockResolvedValue(true);
    mockGetFileChanges.mockResolvedValue(['content/atlas/source/index.rst']);
    mockFindContentPathsWithChanges.mockResolvedValue({
      changedContentPaths: ['atlas'],
      unchangedContentPaths: ['manual/v8.0', 'node/current'],
    });
    const allContentData = makeAllContentData();

    await resolvePathsToBuild({
      utils: makeUtils(),
      validParserCache: true,
      contentDirectories,
      allContentData,
    });

    expect(allContentData.pathsToBuild.filter((p) => p === 'atlas')).toHaveLength(1);
  });

  it('matches an exact path without matching sibling directories that share a prefix', async () => {
    process.env.FORCE_REBUILD_PATHS = 'atlas';
    mockGetParser.mockResolvedValue(true);
    mockGetFileChanges.mockResolvedValue([]);
    mockFindContentPathsWithChanges.mockResolvedValue({
      changedContentPaths: [],
      unchangedContentPaths: contentDirectories,
    });
    const dirs = [
      'atlas',
      'atlas-cli',
      'atlas-architecture',
      'manual/v8.0',
    ];
    const allContentData = makeAllContentData();

    await resolvePathsToBuild({
      utils: makeUtils(),
      validParserCache: true,
      contentDirectories: dirs,
      allContentData,
    });

    expect(allContentData.pathsToBuild).toContain('atlas');
    expect(allContentData.pathsToBuild).not.toContain('atlas-cli');
    expect(allContentData.pathsToBuild).not.toContain('atlas-architecture');
    expect(allContentData.pathsToBuild).not.toContain('manual/v8.0');
  });

  it('matches a versioned parent path on segment boundaries', async () => {
    process.env.FORCE_REBUILD_PATHS = 'manual';
    mockGetParser.mockResolvedValue(true);
    mockGetFileChanges.mockResolvedValue([]);
    mockFindContentPathsWithChanges.mockResolvedValue({
      changedContentPaths: [],
      unchangedContentPaths: contentDirectories,
    });
    const dirs = ['manual/v8.0', 'manual/v7.0', 'node/current'];
    const allContentData = makeAllContentData();

    await resolvePathsToBuild({
      utils: makeUtils(),
      validParserCache: true,
      contentDirectories: dirs,
      allContentData,
    });

    expect(allContentData.pathsToBuild).toContain('manual/v8.0');
    expect(allContentData.pathsToBuild).toContain('manual/v7.0');
    expect(allContentData.pathsToBuild).not.toContain('node/current');
  });

  it('accepts a comma-separated list of paths', async () => {
    process.env.FORCE_REBUILD_PATHS = 'manual/v8.0, node/current';
    mockGetParser.mockResolvedValue(true);
    mockGetFileChanges.mockResolvedValue([]);
    mockFindContentPathsWithChanges.mockResolvedValue({
      changedContentPaths: [],
      unchangedContentPaths: contentDirectories,
    });
    const allContentData = makeAllContentData(
      makeDocsPaths({ 'node/current': true }),
    );

    await resolvePathsToBuild({
      utils: makeUtils(),
      validParserCache: true,
      contentDirectories,
      allContentData,
    });

    expect(allContentData.pathsToBuild).toContain('manual/v8.0');
    expect(allContentData.pathsToBuild).toContain('node/current');
    expect(allContentData.pathsToBuild).not.toContain('atlas');
  });

  it('skips inactive versions of a forced docset by default', async () => {
    process.env.FORCE_REBUILD_PATHS = 'manual';
    mockGetParser.mockResolvedValue(true);
    mockGetFileChanges.mockResolvedValue([]);
    mockFindContentPathsWithChanges.mockResolvedValue({
      changedContentPaths: [],
      unchangedContentPaths: ['manual/v8.0', 'manual/v7.0', 'node/current'],
    });
    const dirs = ['manual/v8.0', 'manual/v7.0', 'node/current'];
    const allContentData = makeAllContentData(
      makeDocsPaths({ 'manual/v8.0': true, 'manual/v7.0': false }),
    );

    await resolvePathsToBuild({
      utils: makeUtils(),
      validParserCache: true,
      contentDirectories: dirs,
      allContentData,
    });

    expect(allContentData.pathsToBuild).toContain('manual/v8.0');
    expect(allContentData.pathsToBuild).not.toContain('manual/v7.0');
  });

  it('includes inactive versions of a forced docset when ALLOW_INACTIVE_VERSIONS is set', async () => {
    process.env.FORCE_REBUILD_PATHS = 'manual';
    process.env.ALLOW_INACTIVE_VERSIONS = 'true';
    mockGetParser.mockResolvedValue(true);
    mockGetFileChanges.mockResolvedValue([]);
    mockFindContentPathsWithChanges.mockResolvedValue({
      changedContentPaths: [],
      unchangedContentPaths: ['manual/v8.0', 'manual/v7.0', 'node/current'],
    });
    const dirs = ['manual/v8.0', 'manual/v7.0', 'node/current'];
    const allContentData = makeAllContentData(
      makeDocsPaths({ 'manual/v8.0': true, 'manual/v7.0': false }),
    );

    await resolvePathsToBuild({
      utils: makeUtils(),
      validParserCache: true,
      contentDirectories: dirs,
      allContentData,
    });

    expect(allContentData.pathsToBuild).toContain('manual/v8.0');
    expect(allContentData.pathsToBuild).toContain('manual/v7.0');
  });
});
