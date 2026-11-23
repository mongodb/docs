import { describe, it, expect } from 'vitest';
import { buildPageSegments } from './page-segments.js';
import type { SegmentResult } from './segments.js';
import type { RunManifest } from '../types.js';

const manifest: RunManifest = {
  project: 'atlas',
  runId: 'r',
  locales: ['es'],
  pages: [],
  translatable: {
    pages: ['aggregation.mdx'],
    includes: ['_includes/a.mdx', '_includes/b.mdx'],
    substitutions: [],
    pageIncludes: { 'aggregation.mdx': ['_includes/a.mdx', '_includes/b.mdx'] },
  },
  stages: {},
};

const resultFor = (rel: string, pairCount: number): SegmentResult => ({
  rel,
  pairs: Array.from({ length: pairCount }, (_, index) => ({
    key: `paragraph[${index}]`,
    en: `English ${index}`,
    es: `Traducción ${index}`,
    source: rel,
  })),
  enOnly: [],
  esOnly: [],
  status: 'ok',
});

describe('buildPageSegments', () => {
  it('folds the page and its owned includes into one ordered segment list', () => {
    const byRel = new Map<string, SegmentResult>([
      ['aggregation.mdx', resultFor('aggregation.mdx', 1)],
      ['_includes/a.mdx', resultFor('_includes/a.mdx', 1)],
      ['_includes/b.mdx', resultFor('_includes/b.mdx', 2)],
    ]);
    const bundle = buildPageSegments(manifest, 'aggregation.mdx', byRel);

    expect(bundle.pairs.map((pair) => pair.source)).toEqual([
      'aggregation.mdx',
      '_includes/a.mdx',
      '_includes/b.mdx',
      '_includes/b.mdx',
    ]);
    expect(bundle.includedFiles).toEqual([
      { file: '_includes/a.mdx', pairCount: 1, status: 'ok' },
      { file: '_includes/b.mdx', pairCount: 2, status: 'ok' },
    ]);
    expect(bundle.ownPairCount).toBe(1);
    expect(bundle.includedPairCount).toBe(3);
    expect(bundle.status).toBe('ok');
  });

  it('records an include with no translatable content as an empty summary entry', () => {
    const empty: SegmentResult = {
      rel: '_includes/empty.mdx',
      pairs: [],
      enOnly: [],
      esOnly: [],
      status: 'no-translatable-content',
    };
    const byRel = new Map<string, SegmentResult>([
      ['aggregation.mdx', resultFor('aggregation.mdx', 1)],
      ['_includes/empty.mdx', empty],
    ]);
    const m: RunManifest = {
      ...manifest,
      translatable: {
        pages: ['aggregation.mdx'],
        includes: ['_includes/empty.mdx'],
        substitutions: [],
        pageIncludes: { 'aggregation.mdx': ['_includes/empty.mdx'] },
      },
    };

    const bundle = buildPageSegments(m, 'aggregation.mdx', byRel);

    expect(bundle.includedFiles).toEqual([
      { file: '_includes/empty.mdx', pairCount: 0, status: 'no-translatable-content' },
    ]);
    expect(bundle.includedPairCount).toBe(0);
    expect(bundle.status).toBe('ok');
  });

  it('namespaces one-sided keys by the file that has them', () => {
    const page = { ...resultFor('aggregation.mdx', 1), esOnly: ['heading[0]'] };
    const include = { ...resultFor('_includes/a.mdx', 1), enOnly: ['paragraph[1]'] };
    const byRel = new Map<string, SegmentResult>([
      ['aggregation.mdx', page],
      ['_includes/a.mdx', include],
    ]);
    const m: RunManifest = {
      ...manifest,
      translatable: {
        pages: ['aggregation.mdx'],
        includes: ['_includes/a.mdx'],
        substitutions: [],
        pageIncludes: { 'aggregation.mdx': ['_includes/a.mdx'] },
      },
    };

    const bundle = buildPageSegments(m, 'aggregation.mdx', byRel);

    expect(bundle.enOnly).toEqual(['_includes/a.mdx:paragraph[1]']);
    expect(bundle.esOnly).toEqual(['aggregation.mdx:heading[0]']);
    // One-sided keys do not demote the bundle: pairs exist, so the classification
    // stays 'ok' — the same rule a single file's result follows.
    expect(bundle.status).toBe('ok');
  });

  it('throws when the manifest has no ownership entry for the page', () => {
    const byRel = new Map<string, SegmentResult>([
      ['aggregation.mdx', resultFor('aggregation.mdx', 1)],
    ]);
    const m: RunManifest = {
      ...manifest,
      translatable: { ...manifest.translatable, pageIncludes: {} },
    };

    expect(() => buildPageSegments(m, 'aggregation.mdx', byRel)).toThrow(
      'no include ownership for "aggregation.mdx" in run "r"',
    );
  });

  it('throws when an owned include has no segment result', () => {
    const byRel = new Map<string, SegmentResult>([
      ['aggregation.mdx', resultFor('aggregation.mdx', 1)],
      ['_includes/a.mdx', resultFor('_includes/a.mdx', 1)],
    ]);

    expect(() => buildPageSegments(manifest, 'aggregation.mdx', byRel)).toThrow(
      'no segment result for "_includes/b.mdx" in run "r"',
    );
  });
});
