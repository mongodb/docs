import fs from 'node:fs';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { shardBundles, toBundleJobs, type BundleJob } from '../src/bundle-matrix.js';
import { contentEntry, docset, makeContentData, makeTocDir, tocItem, version } from './fixtures.js';

const job = (n: number): BundleJob => ({ tocFile: `t${n}`, version: 'main', contentPaths: [] });

describe('shardBundles', () => {
  it('returns no shards for an empty plan', () => {
    expect(shardBundles([], 4)).toEqual([]);
  });

  it('spreads bundles round-robin across ceil(n / size) shards', () => {
    const shards = shardBundles([1, 2, 3, 4, 5].map(job), 2);
    expect(shards.map((s) => s.bundles.map((b) => b.tocFile))).toEqual([
      ['t1', 't4'],
      ['t2', 't5'],
      ['t3'],
    ]);
  });
});

describe('toBundleJobs with no active versions', () => {
  it('skips a versioned bundle whose version list is empty', () => {
    const { repoRoot, offlineDocsDir } = makeTocDir({
      'go.versioned.golang.ts': `[${tocItem('golang')}]`,
    });
    try {
      expect(
        toBundleJobs({ 'go.versioned.golang.ts': [] }, offlineDocsDir, makeContentData()),
      ).toEqual([]);
    } finally {
      fs.rmSync(repoRoot, { recursive: true, force: true });
    }
  });
});

describe('toBundleJobs', () => {
  let repoRoot: string;
  let offlineDocsDir: string;

  beforeEach(() => {
    ({ repoRoot, offlineDocsDir } = makeTocDir({
      'go.versioned.golang.ts': `[${tocItem('landing')}, ${tocItem('golang')}]`,
      'intellij-plugin.ts': `[${tocItem('intellij')}]`,
    }));
  });

  afterEach(() => fs.rmSync(repoRoot, { recursive: true, force: true }));

  it('lists the content paths each bundle version needs', () => {
    const allContentData = makeContentData({
      docsetsByProject: {
        golang: docset('golang', [version('current'), version('upcoming')]),
        landing: docset('landing', [version('main')]),
        intellij: docset('intellij', [version('main')]),
      },
      docsPaths: {
        'golang/current': contentEntry('golang', 'current'),
        'golang/upcoming': contentEntry('golang', 'upcoming'),
        landing: contentEntry('landing', ''),
        intellij: contentEntry('intellij', ''),
      },
    });

    expect(
      toBundleJobs(
        { 'go.versioned.golang.ts': ['current', 'upcoming'], 'intellij-plugin.ts': [] },
        offlineDocsDir,
        allContentData,
      ),
    ).toEqual([
      { tocFile: 'go.versioned.golang', version: 'current', contentPaths: ['golang/current', 'landing'] },
      { tocFile: 'go.versioned.golang', version: 'upcoming', contentPaths: ['golang/upcoming', 'landing'] },
      { tocFile: 'intellij-plugin', version: 'main', contentPaths: ['intellij'] },
    ]);
  });
});
