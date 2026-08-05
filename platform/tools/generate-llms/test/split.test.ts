import { describe, expect, it } from 'vitest';
import { splitPagesIntoChunks, splitPagesRecursively } from '../src/split';
import type { PageEntry } from '../src/types';

/** Builds pages with uniform-length titles/urls so every rendered line is the same length. */
function makePages(l3s: string[]): PageEntry[] {
  return l3s.map((l3, i) => {
    const n = String(i).padStart(2, '0');
    return { title: `Page${n}`, url: `https://ex.com/p${n}.md`, description: '', sourcePath: '', pagePath: l3, l3 };
  });
}

/** Builds pages from full pagePaths (for testing depth > 1 grouping), with uniform-length lines. */
function makePagesWithPaths(pagePaths: string[]): PageEntry[] {
  return pagePaths.map((pagePath, i) => {
    const n = String(i).padStart(2, '0');
    return {
      title: `Page${n}`,
      url: `https://ex.com/p${n}.md`,
      description: '',
      sourcePath: '',
      pagePath,
      l3: pagePath.split('/')[0] ?? '',
    };
  });
}

describe('splitPagesIntoChunks', () => {
  it('returns a single chunk when the content already fits', () => {
    const pages = makePages(['a', 'a', 'b']);
    const chunks = splitPagesIntoChunks(pages, 1_000, 50);
    expect(chunks).toHaveLength(1);
    expect(chunks[0].pages).toEqual(pages);
  });

  it('returns a single empty chunk for an empty page list', () => {
    const chunks = splitPagesIntoChunks([], 1_000, 50);
    expect(chunks).toHaveLength(1);
    expect(chunks[0].pages).toEqual([]);
  });

  it('snaps cut points to the nearest L3 boundary instead of cutting mid-section', () => {
    // 3 "a" pages, 6 "b" pages, 3 "c" pages. Every rendered line is the same
    // length (call it L), so with a budget of 5L per chunk this needs 3
    // parts, and the naive even-thirds cut points (4L and 8L) both fall in
    // the middle of the 6-page "b" run.
    const pages = makePages(['a', 'a', 'a', 'b', 'b', 'b', 'b', 'b', 'b', 'c', 'c', 'c']);
    const lineLength = `- [${pages[0].title}](${pages[0].url})\n`.length;
    const limit = lineLength * 5;

    const chunks = splitPagesIntoChunks(pages, limit, 0);

    expect(chunks).toHaveLength(3);
    expect(chunks[0].pages.map((p) => p.l3)).toEqual(['a', 'a', 'a']);
    expect(chunks[1].pages.map((p) => p.l3)).toEqual(['b', 'b', 'b', 'b', 'b', 'b']);
    expect(chunks[2].pages.map((p) => p.l3)).toEqual(['c', 'c', 'c']);

    // No L3 group is split across two chunks.
    for (const chunk of chunks) {
      expect(new Set(chunk.pages.map((p) => p.l3)).size).toBe(1);
    }
  });

  it('cuts at an already-aligned boundary without adjustment', () => {
    // Two equal-sized groups: the natural halfway point is already the boundary.
    const pages = makePages(['a', 'a', 'a', 'a', 'b', 'b', 'b', 'b']);
    const lineLength = `- [${pages[0].title}](${pages[0].url})\n`.length;
    const limit = lineLength * 4 + 1;

    const chunks = splitPagesIntoChunks(pages, limit, 0);

    expect(chunks).toHaveLength(2);
    expect(chunks[0].pages.map((p) => p.l3)).toEqual(['a', 'a', 'a', 'a']);
    expect(chunks[1].pages.map((p) => p.l3)).toEqual(['b', 'b', 'b', 'b']);
  });

  it('falls back to a mid-section cut when the whole range is a single L3 section', () => {
    // A single oversized L3 section can't be split without breaking it apart;
    // splitPagesIntoChunks still produces multiple chunks rather than one
    // giant chunk, as a last resort.
    const pages = makePages(new Array(10).fill('only-section'));
    const lineLength = `- [${pages[0].title}](${pages[0].url})\n`.length;
    const limit = lineLength * 4;

    const chunks = splitPagesIntoChunks(pages, limit, 0);

    expect(chunks.length).toBeGreaterThan(1);
    const totalPages = chunks.reduce((sum, c) => sum + c.pages.length, 0);
    expect(totalPages).toBe(pages.length);
  });

  it('forces the requested part count instead of the size-driven default', () => {
    // 12 pages that would otherwise fit in a single chunk under this limit.
    const pages = makePages(['a', 'a', 'a', 'b', 'b', 'b', 'b', 'b', 'b', 'c', 'c', 'c']);
    const lineLength = `- [${pages[0].title}](${pages[0].url})\n`.length;
    const generousLimit = lineLength * pages.length + 100;

    const unforced = splitPagesIntoChunks(pages, generousLimit, 0);
    expect(unforced).toHaveLength(1);

    const forced = splitPagesIntoChunks(pages, generousLimit, 0, 3);
    expect(forced).toHaveLength(3);
    expect(forced[0].pages.map((p) => p.l3)).toEqual(['a', 'a', 'a']);
    expect(forced[1].pages.map((p) => p.l3)).toEqual(['b', 'b', 'b', 'b', 'b', 'b']);
    expect(forced[2].pages.map((p) => p.l3)).toEqual(['c', 'c', 'c']);
  });

  it('groups by the first two path segments when depth is 2', () => {
    // All pages share L3 "reference", but have distinct L4 subsections
    // ("reference/operator" vs "reference/method"). At depth 2 these are
    // separate boundaries, even though depth 1 would treat them as one
    // uninterrupted "reference" run.
    const pages = makePagesWithPaths([
      'reference/operator/a',
      'reference/operator/b',
      'reference/operator/c',
      'reference/method/a',
      'reference/method/b',
      'reference/method/c',
    ]);
    const lineLength = `- [${pages[0].title}](${pages[0].url})\n`.length;
    const limit = lineLength * 4;

    const chunks = splitPagesIntoChunks(pages, limit, 0, undefined, 2);

    expect(chunks).toHaveLength(2);
    expect(chunks[0].pages.map((p) => p.pagePath)).toEqual([
      'reference/operator/a',
      'reference/operator/b',
      'reference/operator/c',
    ]);
    expect(chunks[1].pages.map((p) => p.pagePath)).toEqual([
      'reference/method/a',
      'reference/method/b',
      'reference/method/c',
    ]);
  });

  it('forces a requested part count at depth 2', () => {
    const pages = makePagesWithPaths([
      'reference/operator/a',
      'reference/operator/b',
      'reference/method/a',
      'reference/method/b',
      'reference/command/a',
      'reference/command/b',
    ]);
    const lineLength = `- [${pages[0].title}](${pages[0].url})\n`.length;
    const generousLimit = lineLength * pages.length + 100;

    const forced = splitPagesIntoChunks(pages, generousLimit, 0, 3, 2);
    expect(forced).toHaveLength(3);
    expect(forced[0].pages.map((p) => p.pagePath)).toEqual(['reference/operator/a', 'reference/operator/b']);
    expect(forced[1].pages.map((p) => p.pagePath)).toEqual(['reference/method/a', 'reference/method/b']);
    expect(forced[2].pages.map((p) => p.pagePath)).toEqual(['reference/command/a', 'reference/command/b']);
  });

  it('accounts for per-page descriptions in the render budget when withDescriptions is true', () => {
    // Every page has a description long enough that, once appended inline,
    // 2 pages no longer fit in a chunk sized for exactly 2 bare lines.
    const pages = makePages(['a', 'a', 'b', 'b']).map((p) => ({
      ...p,
      description: 'x'.repeat(200),
    }));
    const bareLineLength = `- [${pages[0].title}](${pages[0].url})\n`.length;
    const limit = bareLineLength * pages.length + 1;

    // Without descriptions, all 4 bare lines fit comfortably within the limit.
    const withoutDescriptions = splitPagesIntoChunks(pages, limit, 0, undefined, 1, false);
    expect(withoutDescriptions).toHaveLength(1);

    // With descriptions counted, the same limit is far too small for all 4
    // lines, so it must split further.
    const withDescriptions = splitPagesIntoChunks(pages, limit, 0, undefined, 1, true);
    expect(withDescriptions.length).toBeGreaterThan(1);
  });

  it('never drops or reorders pages across chunks', () => {
    const l3s = ['a', 'a', 'b', 'b', 'b', 'c', 'd', 'd', 'd', 'd', 'e'];
    const pages = makePages(l3s);
    const lineLength = `- [${pages[0].title}](${pages[0].url})\n`.length;
    const limit = lineLength * 3;

    const chunks = splitPagesIntoChunks(pages, limit, 0);
    const flattened = chunks.flatMap((c) => c.pages);
    expect(flattened).toEqual(pages);
  });
});

describe('splitPagesRecursively', () => {
  it('recurses past a depth with no boundary instead of cutting arbitrarily', () => {
    // "small" isolates "reference" as a single depth-1 chunk. Within
    // "reference", every page is under "reference/api" (uniform at depth
    // 2 — no L4 boundary), so a naive depth-2-only split would have to cut
    // arbitrarily. But depth 3 reveals real boundaries between
    // "reference/api/clusters" and "reference/api/agents", so those should
    // be used instead, exactly like ops-manager's reference/api/ section.
    const pages = [
      ...makePagesWithPaths(['small/a']),
      ...makePagesWithPaths(Array.from({ length: 6 }, (_, i) => `reference/api/clusters/p${i}`)),
      ...makePagesWithPaths(Array.from({ length: 6 }, (_, i) => `reference/api/agents/p${i}`)),
    ];
    const lineLength = `- [${pages[1].title}](${pages[1].url})\n`.length;
    // Small enough that "reference" (12 pages) can't fit in one chunk, but
    // each of "clusters" and "agents" (6 pages each) can.
    const limit = lineLength * 8;

    const chunks = splitPagesRecursively(pages, limit, 0);

    const chunksWithApiPages = chunks.filter((c) => c.pages.some((p) => p.pagePath.startsWith('reference/api')));
    expect(chunksWithApiPages.length).toBeGreaterThan(1);
    for (const chunk of chunksWithApiPages) {
      // Each part fits, and "clusters" and "agents" are never mixed in the
      // same part or split across two parts.
      expect(chunk.pages.length * lineLength).toBeLessThanOrEqual(limit);
      const l5s = new Set(chunk.pages.map((p) => p.pagePath.split('/')[2]));
      expect(l5s.size).toBe(1);
    }

    const flattened = chunks.flatMap((c) => c.pages);
    expect(flattened).toEqual(pages);
  });

  it('forces the section-part count only for the first recursive split', () => {
    const pages = [
      ...makePagesWithPaths(['small/a']),
      ...makePagesWithPaths(Array.from({ length: 4 }, (_, i) => `reference/one/p${i}`)),
      ...makePagesWithPaths(Array.from({ length: 4 }, (_, i) => `reference/two/p${i}`)),
    ];
    const lineLength = `- [${pages[1].title}](${pages[1].url})\n`.length;
    // 9 pages don't fit in 5 lines, so the depth-1 split isolates "small"
    // (fits fine) from "reference" (8 lines, still too big on its own).
    const limit = lineLength * 5;

    const chunks = splitPagesRecursively(pages, limit, 0, undefined, 2);

    // "small" is its own chunk (depth-1 boundary); "reference" is forced
    // into exactly 2 sub-parts at the first recursive (depth-2) step.
    expect(chunks).toHaveLength(3);
    expect(chunks[0].pages.map((p) => p.pagePath)).toEqual(['small/a']);
    expect(chunks[1].pages.every((p) => p.pagePath.startsWith('reference/one'))).toBe(true);
    expect(chunks[2].pages.every((p) => p.pagePath.startsWith('reference/two'))).toBe(true);
  });

  it('returns a single chunk when everything already fits', () => {
    const pages = makePages(['a', 'a', 'b']);
    const chunks = splitPagesRecursively(pages, 1_000, 50);
    expect(chunks).toHaveLength(1);
    expect(chunks[0].pages).toEqual(pages);
  });

  it('does not recurse or reorder pages that already fit after the initial split', () => {
    const l3s = ['a', 'a', 'b', 'b', 'b', 'c', 'd', 'd', 'd', 'd', 'e'];
    const pages = makePages(l3s);
    const lineLength = `- [${pages[0].title}](${pages[0].url})\n`.length;
    const limit = lineLength * 3;

    const chunks = splitPagesRecursively(pages, limit, 0);
    const flattened = chunks.flatMap((c) => c.pages);
    expect(flattened).toEqual(pages);
  });
});
