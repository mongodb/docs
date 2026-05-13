// p-limit v7 is ESM-only; mock it so Jest can load it in CJS mode
jest.mock('p-limit', () => ({
  default: () => (fn: () => Promise<unknown>) => fn(),
  __esModule: true,
}));

import type { AllContentData } from '../../src/contentMetadata/processContentMetadata';
import {
  deleteOrphanedFilesFromBlobStore,
  findOwningProjectPath,
  prefixesToListForOrphanScan,
} from '../../src/blobUploads/deleteOrphanedFilesFromBlobStore';

async function* asyncPages(
  pages: Array<{ blobs: Array<{ key: string; etag: string }> }>,
) {
  for (const page of pages) {
    yield { ...page, directories: [] };
  }
}

const makeStore = (
  listImpl?: (opts: { prefix: string }) => ReturnType<typeof asyncPages>,
) => ({
  list: jest.fn().mockImplementation(
    listImpl ?? (() => asyncPages([{ blobs: [] }])),
  ),
  delete: jest.fn().mockResolvedValue(undefined),
});

const makeAllContentData = (
  entries: Array<{
    projectName: string;
    projectDirName: string;
    versionName: string;
    prefix: string;
  }>,
  pathsToBuild?: string[],
): AllContentData =>
  ({
    pathsToBuild: pathsToBuild ?? entries.map((e) => `${e.projectDirName}/${e.versionName}`),
    docsPaths: Object.fromEntries(
      entries.map((e) => [
        `${e.projectDirName}/${e.versionName}`,
        {
          projectName: e.projectName,
          projectDirName: e.projectDirName,
          versionName: e.versionName,
          changed: true,
          shouldRebuild: true,
          fullPath: '',
        },
      ]),
    ),
    atlasProjectDocuments: Object.fromEntries(
      entries.map((e) => [
        e.projectName,
        { docsetsEntry: { prefix: e.prefix } },
      ]),
    ),
  }) as unknown as AllContentData;

describe('findOwningProjectPath', () => {
  it('returns null when the key has no slash or no project matches after stripping the blob type', () => {
    expect(findOwningProjectPath('nodelimiter', ['manual/v8.0'])).toBeNull();
    expect(
      findOwningProjectPath('mdx/manual/v8.0/page.mdx', ['atlas/current']),
    ).toBeNull();
  });

  it('matches exact path or prefix, using the first list entry that fits (longest-first order)', () => {
    const pathsLongestFirst = ['atlas/operator', 'atlas'];
    expect(findOwningProjectPath('mdx/atlas/x.mdx', pathsLongestFirst)).toBe(
      'atlas',
    );
    expect(
      findOwningProjectPath('mdx/atlas/operator/y.mdx', pathsLongestFirst),
    ).toBe('atlas/operator');
    expect(findOwningProjectPath('mdx/manual/v8.0', ['manual/v8.0'])).toBe(
      'manual/v8.0',
    );
  });
});

describe('deleteOrphanedFilesFromBlobStore', () => {
  const manualData = makeAllContentData([
    { projectName: 'manual', projectDirName: 'manual', versionName: 'v8.0', prefix: 'docs/manual' },
  ]);

  it('deletes a stale key that exists in the store but not in relativeFilePaths', async () => {
    const store = makeStore(({ prefix }) => {
      if (prefix === 'mdx/manual/v8.0') {
        return asyncPages([{
          blobs: [
            { key: 'mdx/manual/v8.0/index.mdx', etag: '' },
            { key: 'mdx/manual/v8.0/old-page.mdx', etag: '' },
          ],
        }]);
      }
      return asyncPages([{ blobs: [] }]);
    });

    await deleteOrphanedFilesFromBlobStore({
      relativeFilePaths: ['manual/v8.0/index.mdx'],
      allContentData: manualData,
      store: store as any,
    });

    expect(store.delete).toHaveBeenCalledTimes(1);
    expect(store.delete).toHaveBeenCalledWith('mdx/manual/v8.0/old-page.mdx');
  });

  it('does not delete a key that is in relativeFilePaths', async () => {
    const store = makeStore(({ prefix }) => {
      if (prefix === 'mdx/manual/v8.0') {
        return asyncPages([{
          blobs: [{ key: 'mdx/manual/v8.0/index.mdx', etag: '' }],
        }]);
      }
      return asyncPages([{ blobs: [] }]);
    });

    await deleteOrphanedFilesFromBlobStore({
      relativeFilePaths: ['manual/v8.0/index.mdx'],
      allContentData: manualData,
      store: store as any,
    });

    expect(store.delete).not.toHaveBeenCalled();
  });

  it('returns early without calling list when relativeFilePaths is empty', async () => {
    const store = makeStore();

    await deleteOrphanedFilesFromBlobStore({
      relativeFilePaths: [],
      allContentData: manualData,
      store: store as any,
    });

    expect(store.list).not.toHaveBeenCalled();
    expect(store.delete).not.toHaveBeenCalled();
  });

  it('scans all three blob types for each project version', async () => {
    const store = makeStore(() => asyncPages([{ blobs: [] }]));

    await deleteOrphanedFilesFromBlobStore({
      relativeFilePaths: ['manual/v8.0/index.mdx'],
      allContentData: manualData,
      store: store as any,
    });

    const listedPrefixes = store.list.mock.calls.map(
      ([opts]: [{ prefix: string }]) => opts.prefix,
    );
    expect(listedPrefixes).toContain('mdx/manual/v8.0');
    expect(listedPrefixes).toContain('image/manual/v8.0');
    expect(listedPrefixes).toContain('reference/manual/v8.0');
  });

  it('only scans prefixes for projects present in pathsToBuild', async () => {
    const twoProjectData = makeAllContentData(
      [
        { projectName: 'manual', projectDirName: 'manual', versionName: 'v8.0', prefix: 'docs/manual' },
        { projectName: 'atlas', projectDirName: 'atlas', versionName: 'current', prefix: 'docs/atlas' },
      ],
      ['manual/v8.0'],
    );
    const store = makeStore(() => asyncPages([{ blobs: [] }]));

    await deleteOrphanedFilesFromBlobStore({
      relativeFilePaths: ['manual/v8.0/index.mdx'],
      allContentData: twoProjectData,
      store: store as any,
    });

    const listedPrefixes = store.list.mock.calls.map(
      ([opts]: [{ prefix: string }]) => opts.prefix,
    );
    expect(listedPrefixes.some((p: string) => p.includes('atlas'))).toBe(false);
  });

  it('does not delete blobs for project versions not included in pathsToBuild', async () => {
    const twoVersionData = makeAllContentData(
      [
        { projectName: 'manual', projectDirName: 'manual', versionName: 'v8.0', prefix: 'docs/manual' },
        { projectName: 'manual', projectDirName: 'manual', versionName: 'v7.0', prefix: 'docs/manual' },
      ],
      ['manual/v8.0'],
    );

    const store = makeStore(({ prefix }) => {
      if (prefix === 'mdx/manual/v7.0') {
        return asyncPages([{ blobs: [{ key: 'mdx/manual/v7.0/index.mdx', etag: '' }] }]);
      }
      return asyncPages([{ blobs: [] }]);
    });

    await deleteOrphanedFilesFromBlobStore({
      relativeFilePaths: ['manual/v8.0/index.mdx'],
      allContentData: twoVersionData,
      store: store as any,
    });

    expect(store.delete).not.toHaveBeenCalled();
    const listedPrefixes = store.list.mock.calls.map(
      ([opts]: [{ prefix: string }]) => opts.prefix,
    );
    expect(listedPrefixes.some((p: string) => p.includes('v7.0'))).toBe(false);
  });

  it('handles stale keys across multiple projects in the same build', async () => {
    const twoProjectData = makeAllContentData([
      { projectName: 'manual', projectDirName: 'manual', versionName: 'v8.0', prefix: 'docs/manual' },
      { projectName: 'atlas', projectDirName: 'atlas', versionName: 'current', prefix: 'docs/atlas' },
    ]);
    const store = makeStore(({ prefix }) => {
      if (prefix === 'mdx/manual/v8.0') {
        return asyncPages([{ blobs: [{ key: 'mdx/manual/v8.0/stale.mdx', etag: '' }] }]);
      }
      if (prefix === 'mdx/atlas/current') {
        return asyncPages([{ blobs: [{ key: 'mdx/atlas/current/stale.mdx', etag: '' }] }]);
      }
      return asyncPages([{ blobs: [] }]);
    });

    await deleteOrphanedFilesFromBlobStore({
      relativeFilePaths: ['manual/v8.0/index.mdx', 'atlas/current/index.mdx'],
      allContentData: twoProjectData,
      store: store as any,
    });

    expect(store.delete).toHaveBeenCalledWith('mdx/manual/v8.0/stale.mdx');
    expect(store.delete).toHaveBeenCalledWith('mdx/atlas/current/stale.mdx');
  });

  it('does not throw when the store raises an error', async () => {
    const store = {
      list: jest.fn().mockImplementation(() => {
        throw new Error('store unavailable');
      }),
      delete: jest.fn(),
    };

    await expect(
      deleteOrphanedFilesFromBlobStore({
        relativeFilePaths: ['manual/v8.0/index.mdx'],
        allContentData: manualData,
        store: store as any,
      }),
    ).resolves.toBeUndefined();
  });

  it('flags all stale keys when multiple files are deleted from a version', async () => {
    const store = makeStore(({ prefix }) => {
      if (prefix === 'mdx/manual/v8.0') {
        return asyncPages([{
          blobs: [
            { key: 'mdx/manual/v8.0/index.mdx', etag: '' },
            { key: 'mdx/manual/v8.0/deleted-a.mdx', etag: '' },
            { key: 'mdx/manual/v8.0/deleted-b.mdx', etag: '' },
          ],
        }]);
      }
      return asyncPages([{ blobs: [] }]);
    });

    await deleteOrphanedFilesFromBlobStore({
      relativeFilePaths: ['manual/v8.0/index.mdx'],
      allContentData: manualData,
      store: store as any,
    });

    expect(store.delete).toHaveBeenCalledTimes(2);
    expect(store.delete).toHaveBeenCalledWith('mdx/manual/v8.0/deleted-a.mdx');
    expect(store.delete).toHaveBeenCalledWith('mdx/manual/v8.0/deleted-b.mdx');
  });

  it('flags the old blob key after a file is renamed, not the new one', async () => {
    const store = makeStore(({ prefix }) => {
      if (prefix === 'mdx/manual/v8.0') {
        return asyncPages([{
          blobs: [
            { key: 'mdx/manual/v8.0/old-name.mdx', etag: '' },
            { key: 'mdx/manual/v8.0/new-name.mdx', etag: '' },
          ],
        }]);
      }
      return asyncPages([{ blobs: [] }]);
    });

    await deleteOrphanedFilesFromBlobStore({
      relativeFilePaths: ['manual/v8.0/new-name.mdx'],
      allContentData: manualData,
      store: store as any,
    });

    expect(store.delete).toHaveBeenCalledWith('mdx/manual/v8.0/old-name.mdx');
    expect(store.delete).not.toHaveBeenCalledWith('mdx/manual/v8.0/new-name.mdx');
  });

  it('flags the deleted file but not the modified file in the same build', async () => {
    const store = makeStore(({ prefix }) => {
      if (prefix === 'mdx/manual/v8.0') {
        return asyncPages([{
          blobs: [
            { key: 'mdx/manual/v8.0/kept.mdx', etag: '' },
            { key: 'mdx/manual/v8.0/deleted.mdx', etag: '' },
          ],
        }]);
      }
      return asyncPages([{ blobs: [] }]);
    });

    await deleteOrphanedFilesFromBlobStore({
      relativeFilePaths: ['manual/v8.0/kept.mdx'],
      allContentData: manualData,
      store: store as any,
    });

    expect(store.delete).toHaveBeenCalledWith('mdx/manual/v8.0/deleted.mdx');
    expect(store.delete).not.toHaveBeenCalledWith('mdx/manual/v8.0/kept.mdx');
  });

  it('detects and deletes an orphaned image blob', async () => {
    const store = makeStore(({ prefix }) => {
      if (prefix === 'image/manual/v8.0') {
        return asyncPages([{
          blobs: [{ key: 'image/manual/v8.0/old-hero.png', etag: '' }],
        }]);
      }
      return asyncPages([{ blobs: [] }]);
    });

    await deleteOrphanedFilesFromBlobStore({
      relativeFilePaths: ['manual/v8.0/index.mdx'],
      allContentData: manualData,
      store: store as any,
    });

    expect(store.delete).toHaveBeenCalledWith('image/manual/v8.0/old-hero.png');
  });

  it('does not delete items in blob store when only prefix shares a string prefix with another prefix', async () => {
    const collisionData = makeAllContentData(
      [
        { projectName: 'cloud-docs', projectDirName: 'atlas', versionName: '', prefix: 'docs/atlas' },
        { projectName: 'cloud-docs-operator', projectDirName: 'atlas-operator', versionName: '', prefix: 'docs/atlas/operator' },
      ],
      ['atlas/'],
    );

    const store = makeStore(({ prefix }) => {
      if (prefix === 'mdx/atlas') {
        // Netlify returns both atlas AND atlas-operator blobs under 'mdx/atlas'
        return asyncPages([{
          blobs: [
            { key: 'mdx/atlas/page.mdx', etag: '' },
            { key: 'mdx/atlas/operator/overview.mdx', etag: '' },
          ],
        }]);
      }
      return asyncPages([{ blobs: [] }]);
    });

    await deleteOrphanedFilesFromBlobStore({
      relativeFilePaths: ['atlas/page.mdx'],
      allContentData: collisionData,
      store: store as any,
    });

    expect(store.delete).not.toHaveBeenCalled();
  });

  it('inspects blobs across multiple paginated pages', async () => {
    const store = makeStore(({ prefix }) => {
      if (prefix === 'mdx/manual/v8.0') {
        return asyncPages([
          { blobs: [{ key: 'mdx/manual/v8.0/index.mdx', etag: '' }] },
          { blobs: [{ key: 'mdx/manual/v8.0/stale.mdx', etag: '' }] },
        ]);
      }
      return asyncPages([{ blobs: [] }]);
    });

    await deleteOrphanedFilesFromBlobStore({
      relativeFilePaths: ['manual/v8.0/index.mdx'],
      allContentData: manualData,
      store: store as any,
    });

    expect(store.delete).toHaveBeenCalledTimes(1);
    expect(store.delete).toHaveBeenCalledWith('mdx/manual/v8.0/stale.mdx');
  });

  it('detects and deletes an orphaned reference blob', async () => {
    const store = makeStore(({ prefix }) => {
      if (prefix === 'reference/manual/v8.0') {
        return asyncPages([{
          blobs: [{ key: 'reference/manual/v8.0/old-ref.json', etag: '' }],
        }]);
      }
      return asyncPages([{ blobs: [] }]);
    });

    await deleteOrphanedFilesFromBlobStore({
      relativeFilePaths: ['manual/v8.0/index.mdx'],
      allContentData: manualData,
      store: store as any,
    });

    expect(store.delete).toHaveBeenCalledWith('reference/manual/v8.0/old-ref.json');
  });

  it('does not delete a blob whose project cannot be classified', async () => {
    const store = makeStore(({ prefix }) => {
      if (prefix === 'mdx/manual/v8.0') {
        return asyncPages([{
          blobs: [{ key: 'mdx/unknown-project/page.mdx', etag: '' }],
        }]);
      }
      return asyncPages([{ blobs: [] }]);
    });

    await deleteOrphanedFilesFromBlobStore({
      relativeFilePaths: ['manual/v8.0/index.mdx'],
      allContentData: manualData,
      store: store as any,
    });

    expect(store.delete).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// prefixesToListForOrphanScan — unit tests for the prefix generation logic
// ---------------------------------------------------------------------------

describe('prefixesToListForOrphanScan', () => {
  it('generates one prefix per blob type for a single versioned project', () => {
    const data = makeAllContentData([
      { projectName: 'manual', projectDirName: 'manual', versionName: 'v8.0', prefix: 'docs/manual' },
    ]);

    expect(prefixesToListForOrphanScan(data)).toEqual([
      'mdx/manual/v8.0',
      'image/manual/v8.0',
      'reference/manual/v8.0',
    ]);
  });

  it('excludes projects absent from pathsToBuild', () => {
    const data = makeAllContentData(
      [
        { projectName: 'manual', projectDirName: 'manual', versionName: 'v8.0', prefix: 'docs/manual' },
        { projectName: 'atlas', projectDirName: 'atlas', versionName: 'current', prefix: 'docs/atlas' },
      ],
      ['manual/v8.0'],
    );

    const prefixes = prefixesToListForOrphanScan(data);

    expect(prefixes).toEqual(['mdx/manual/v8.0', 'image/manual/v8.0', 'reference/manual/v8.0']);
  });

});
