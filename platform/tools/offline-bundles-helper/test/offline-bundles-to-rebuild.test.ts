import fs from 'node:fs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getOfflineBundlesToRebuild } from '../src/offline-bundles-to-rebuild.js';
import {
  TOC_DIR_RELATIVE,
  contentEntry,
  docset,
  makeContentData,
  makeTocDir,
  tocItem,
  version,
} from './fixtures.js';

const tocFiles = {
  'development.versioned.docs.ts': `[${tocItem('docs')}, ${tocItem('landing')}, ${tocItem('cloud-docs')}]`,
  'go.versioned.golang.ts': `[${tocItem('landing')}, ${tocItem('golang')}]`,
  'atlas-cli.versioned.atlas-cli.ts': `[${tocItem('atlas-cli')}, ${tocItem('cloud-docs')}]`,
  'tools.ts': `[${tocItem('landing')}, ${tocItem('cloud-docs')}]`,
  'intellij-plugin.ts': `[${tocItem('intellij')}]`,
};

const docsetsByProject = {
  docs: docset('docs', [version('manual'), version('upcoming'), version('v7.0', false)]),
  golang: docset('golang', [version('current'), version('upcoming'), version('v1.12', false)]),
  'atlas-cli': docset('atlas-cli', [version('v1.0'), version('v0.9', false)]),
  'cloud-docs': docset('cloud-docs', [version('main')]),
  landing: docset('landing', [version('main')]),
};

describe('getOfflineBundlesToRebuild', () => {
  let repoRoot: string;
  let offlineDocsDir: string;

  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    ({ repoRoot, offlineDocsDir } = makeTocDir(tocFiles));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    fs.rmSync(repoRoot, { recursive: true, force: true });
  });

  const run = (
    gitChangedFiles: string[],
    contentData = makeContentData({ docsetsByProject }),
  ) =>
    getOfflineBundlesToRebuild({
      allContentData: contentData,
      gitChangedFiles,
      offlineDocsDir,
      repoRoot,
    });

  describe('when a TOC file changes', () => {
    it('rebuilds every active version of a versioned bundle', () => {
      expect(run([`${TOC_DIR_RELATIVE}/development.versioned.docs.ts`])).toEqual({
        'development.versioned.docs.ts': ['manual', 'upcoming'],
      });
    });

    it('queues an unversioned bundle with no versions', () => {
      expect(run([`${TOC_DIR_RELATIVE}/tools.ts`])).toEqual({ 'tools.ts': [] });
    });

    it('ignores changed files outside the offline TOC directory', () => {
      expect(
        run([
          'platform/docs-site/src/context/table-of-contents/legacy-docs/docs-v4.4.ts',
          'content/manual/upcoming/source/a.txt',
          `${TOC_DIR_RELATIVE}-old/development.versioned.docs.ts`,
        ]),
      ).toEqual({});
    });

    it('ignores non-TypeScript and nested files in the directory', () => {
      expect(
        run([
          `${TOC_DIR_RELATIVE}/README.md`,
          `${TOC_DIR_RELATIVE}/nested/development.versioned.docs.ts`,
        ]),
      ).toEqual({});
    });
  });

  describe('when content changes', () => {
    it('rebuilds only the changed versions of the versioned project (golang)', () => {
      const contentData = makeContentData({
        docsetsByProject,
        pathsToBuild: ['golang/current'],
        docsPaths: { 'golang/current': contentEntry('golang', 'current') },
      });

      expect(run([], contentData)).toEqual({
        'go.versioned.golang.ts': ['current'],
      });
    });

    it('rebuilds all active versions of a versioned bundle that cross-references the changed project', () => {
      const contentData = makeContentData({
        docsetsByProject,
        pathsToBuild: ['landing'],
        docsPaths: { landing: contentEntry('landing', '') },
      });

      expect(run([], contentData)).toEqual({
        'development.versioned.docs.ts': ['manual', 'upcoming'],
        'go.versioned.golang.ts': ['current', 'upcoming'],
        'tools.ts': [],
      });
    });

    it('does not rebuild atlas-cli when cloud-docs changes', () => {
      const contentData = makeContentData({
        docsetsByProject,
        pathsToBuild: ['cloud-docs'],
        docsPaths: { 'cloud-docs': contentEntry('cloud-docs', '') },
      });

      const result = run([], contentData);

      expect(result).not.toHaveProperty('atlas-cli.versioned.atlas-cli.ts');
      expect(result).toEqual({
        'development.versioned.docs.ts': ['manual', 'upcoming'],
        'tools.ts': [],
      });
    });

    it('does rebuild atlas-cli when atlas-cli itself changes', () => {
      const contentData = makeContentData({
        docsetsByProject,
        pathsToBuild: ['atlas-cli/v1.0'],
        docsPaths: { 'atlas-cli/v1.0': contentEntry('atlas-cli', 'v1.0') },
      });

      expect(run([], contentData)).toEqual({
        'atlas-cli.versioned.atlas-cli.ts': ['v1.0'],
      });
    });

    it('rebuilds an unversioned bundle with no versions when its own content changes', () => {
      const contentData = makeContentData({
        docsetsByProject: {
          ...docsetsByProject,
          intellij: docset('intellij', [version('main')]),
        },
        pathsToBuild: ['mongodb-intellij'],
        docsPaths: {
          'mongodb-intellij': {
            ...contentEntry('intellij', ''),
            projectDirName: 'mongodb-intellij',
          },
        },
      });

      expect(run([], contentData)).toEqual({ 'intellij-plugin.ts': [] });
    });

    it('keeps the TOC-file versions when the same bundle also has content changes', () => {
      const contentData = makeContentData({
        docsetsByProject,
        pathsToBuild: ['golang/current'],
        docsPaths: { 'golang/current': contentEntry('golang', 'current') },
      });

      expect(run([`${TOC_DIR_RELATIVE}/go.versioned.golang.ts`], contentData)).toEqual({
        'go.versioned.golang.ts': ['current', 'upcoming'],
      });
    });

    it.each([
      ['project before cross-reference', ['golang/current', 'landing']],
      ['cross-reference before project', ['landing', 'golang/current']],
    ])('adds every active version regardless of processing order (%s)', (_label, pathsToBuild) => {
      const contentData = makeContentData({
        docsetsByProject,
        pathsToBuild,
        docsPaths: {
          'golang/current': contentEntry('golang', 'current'),
          landing: contentEntry('landing', ''),
        },
      });

      expect(run([], contentData)['go.versioned.golang.ts']).toEqual(['current', 'upcoming']);
    });
  });

  it('returns an empty record when the TOC directory cannot be read', () => {
    fs.rmSync(offlineDocsDir, { recursive: true, force: true });
    const contentData = makeContentData({
      docsetsByProject,
      pathsToBuild: ['golang/current'],
      docsPaths: { 'golang/current': contentEntry('golang', 'current') },
    });

    expect(run([], contentData)).toEqual({});
  });
});
