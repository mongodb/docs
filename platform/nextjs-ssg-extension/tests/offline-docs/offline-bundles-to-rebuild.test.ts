jest.mock('../../src/paths', () => ({
  getRepoPaths: () => ({
    repoRoot: '/repo',
    offlineDocsDir:
      '/repo/platform/docs-site/src/context/table-of-contents/offline-docs',
  }),
}));

import { getOfflineBundlesToRebuild } from '../../src/offline-docs/offline-bundles-to-rebuild/index';
import type { AllContentData } from '../../src/contentMetadata/processContentMetadata';

const TOC_DIR = 'platform/docs-site/src/context/table-of-contents/offline-docs';

const version = (versionName: string, active = true) => ({
  versionName,
  active,
  versionSelectorLabel: versionName,
  stable: false,
  noIndexing: false,
});

const allContentData: AllContentData = {
  docsetsByProject: {
    docs: {
      project: 'docs',
      displayName: 'docs',
      prefix: 'docs',
      internalOnly: false,
      versions: [version('manual'), version('upcoming'), version('v7.0', false)],
    },
  },
  pathsToBuild: [],
  docsPaths: {},
};

describe('getOfflineBundlesToRebuild when a TOC file changes', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('rebuilds every active version of a versioned bundle', () => {
    expect(
      getOfflineBundlesToRebuild(allContentData, [
        `${TOC_DIR}/development.versioned.docs.ts`,
      ]),
    ).toEqual({ 'development.versioned.docs.ts': ['manual', 'upcoming'] });
  });

  it('queues an unversioned bundle with no versions', () => {
    expect(
      getOfflineBundlesToRebuild(allContentData, [`${TOC_DIR}/landing.ts`]),
    ).toEqual({ 'landing.ts': [] });
  });

  it('ignores changed files outside the offline TOC directory', () => {
    expect(
      getOfflineBundlesToRebuild(allContentData, [
        'platform/docs-site/src/context/table-of-contents/legacy-docs/docs-v4.4.ts',
        'content/manual/upcoming/source/a.txt',
        `${TOC_DIR}-old/development.versioned.docs.ts`,
      ]),
    ).toEqual({});
  });

  it('ignores non-TypeScript and nested files in the directory', () => {
    expect(
      getOfflineBundlesToRebuild(allContentData, [
        `${TOC_DIR}/README.md`,
        `${TOC_DIR}/nested/development.versioned.docs.ts`,
      ]),
    ).toEqual({});
  });
});
