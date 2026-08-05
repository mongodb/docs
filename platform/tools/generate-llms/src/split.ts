/**
 * Splits an oversized project's page list into contiguous, size-limited
 * parts.
 *
 * Pages are already sorted alphabetically by URL, so pages that share a
 * path prefix under the project's source directory (e.g. "reference" or
 * "reference/operator" in /docs/manual/reference/operator/eq) always form a
 * contiguous run. Ideal cut points are chosen at even intervals across the
 * page list (so N parts come out roughly equal-sized); if an ideal cut point
 * would land in the middle of such a run, it's nudged to the nearest section
 * boundary above or below instead, so a section is never split across two
 * files.
 *
 * `depth` controls how many leading path segments define a "section" for
 * boundary purposes: depth 1 groups by the first segment ("L3", e.g.
 * "reference"), depth 2 by the first two segments ("L4", e.g.
 * "reference/operator"), and so on. Callers use depth 1 for a project's
 * initial split, then depth 2+ to recurse into any single L3 section that's
 * still too large on its own (see generator.ts).
 */
import { codePointLength, renderPageLine } from './render.js';
import type { PageEntry } from './types.js';

export interface PageChunk {
  pages: PageEntry[];
}

function renderedLineLength(page: PageEntry, withDescriptions: boolean): number {
  return codePointLength(`${renderPageLine(page, withDescriptions)}\n`);
}

/** The section key for a page at the given depth, e.g. depth 2 on "reference/operator/eq" -> "reference/operator". */
function sectionKey(page: PageEntry, depth: number): string {
  return page.pagePath.split('/').slice(0, depth).join('/');
}

/** Finds the index within [lo, hi] whose prefix-sum boundary is closest to `target`. */
function findClosestIndex(prefix: number[], target: number, lo: number, hi: number): number {
  let best = lo;
  let bestDiff = Math.abs(prefix[lo] - target);
  for (let idx = lo + 1; idx <= hi; idx++) {
    const diff = Math.abs(prefix[idx] - target);
    if (diff < bestDiff) {
      best = idx;
      bestDiff = diff;
    }
  }
  return best;
}

/**
 * Returns `idx` unchanged if it already falls on a section boundary at
 * `depth` (i.e. pages[idx - 1] and pages[idx] have different section keys).
 * Otherwise searches outward for the nearest boundary within [lo, hi],
 * preferring whichever side is closer; ties prefer the earlier (lower)
 * boundary. If no boundary exists anywhere in [lo, hi] (the whole range is a
 * single section larger than the target chunk size), returns `idx` unchanged
 * as a last resort — the section can't be split further at this depth
 * without breaking it apart, which we've chosen not to do.
 */
function snapToNearestBoundary(pages: PageEntry[], idx: number, lo: number, hi: number, depth: number): number {
  const isBoundary = (i: number): boolean => sectionKey(pages[i - 1], depth) !== sectionKey(pages[i], depth);

  if (isBoundary(idx)) {
    return idx;
  }

  for (let delta = 1; delta <= hi - lo; delta++) {
    const before = idx - delta;
    const after = idx + delta;
    const beforeValid = before >= lo && isBoundary(before);
    const afterValid = after <= hi && isBoundary(after);
    if (beforeValid && afterValid) {
      return before;
    }
    if (beforeValid) {
      return before;
    }
    if (afterValid) {
      return after;
    }
  }

  return idx;
}

/**
 * Splits `pages` into contiguous chunks, snapping each interior cut point to
 * the nearest section boundary at `depth` (default 1, i.e. L3). Returns a
 * single chunk containing all pages if they already fit within one chunk.
 *
 * By default the number of chunks is the fewest needed for each chunk's
 * rendered page-list size to fit within `limit` (after reserving
 * `overheadPerChunk` characters per chunk for its own header line). Pass
 * `forcedPartCount` to produce exactly that many chunks instead (e.g. when a
 * writer wants a specific, human-chosen number of parts rather than the
 * size-driven default) — section boundaries are still respected, so a
 * forced count may still leave a chunk over `limit` if a section can't be
 * nudged to fit, and a forced count larger than the number of available
 * boundaries at this depth may yield fewer chunks than requested.
 *
 * `withDescriptions` must match whatever will actually be passed to
 * renderContent for these pages: each page's own `: description` (see
 * render.ts) counts toward its rendered line length, so the budget this
 * splits against needs to include it too, or a part could come out over
 * `limit` once actually rendered.
 */
export function splitPagesIntoChunks(
  pages: PageEntry[],
  limit: number,
  overheadPerChunk: number,
  forcedPartCount?: number,
  depth = 1,
  withDescriptions = true,
): PageChunk[] {
  if (pages.length === 0) {
    return [{ pages: [] }];
  }

  const lineLengths = pages.map((p) => renderedLineLength(p, withDescriptions));
  const totalLength = lineLengths.reduce((sum, len) => sum + len, 0);

  const budgetPerChunk = Math.max(limit - overheadPerChunk, 1);
  const partCount = forcedPartCount ?? Math.max(1, Math.ceil(totalLength / budgetPerChunk));

  if (partCount <= 1) {
    return [{ pages }];
  }

  const prefix: number[] = [0];
  for (const len of lineLengths) {
    prefix.push(prefix[prefix.length - 1] + len);
  }

  const cutIndices: number[] = [];
  let previousCut = 0;
  for (let part = 1; part < partCount; part++) {
    const lo = previousCut + 1;
    const hi = pages.length - 1;
    if (lo > hi) {
      // No room left for another cut; the remaining pages form the last chunk.
      break;
    }
    const target = (totalLength * part) / partCount;
    const idx = snapToNearestBoundary(pages, findClosestIndex(prefix, target, lo, hi), lo, hi, depth);
    cutIndices.push(idx);
    previousCut = idx;
  }

  const chunks: PageChunk[] = [];
  let start = 0;
  for (const cut of cutIndices) {
    chunks.push({ pages: pages.slice(start, cut) });
    start = cut;
  }
  chunks.push({ pages: pages.slice(start) });
  return chunks;
}

function renderedChunkSize(pages: PageEntry[], overheadPerChunk: number, withDescriptions: boolean): number {
  return pages.reduce((sum, p) => sum + renderedLineLength(p, withDescriptions), 0) + overheadPerChunk;
}

/** True if any two adjacent pages have different section keys at `depth`. */
function hasAnyBoundary(pages: PageEntry[], depth: number): boolean {
  for (let i = 1; i < pages.length; i++) {
    if (sectionKey(pages[i - 1], depth) !== sectionKey(pages[i], depth)) {
      return true;
    }
  }
  return false;
}

/** The most path segments any of `pages` has, i.e. the deepest depth at which sectionKey can still change. */
function maxSegmentCount(pages: PageEntry[]): number {
  return pages.reduce((max, p) => Math.max(max, p.pagePath.split('/').length), 0);
}

/**
 * The deepest path-segment depth splitPagesIntoChunks will recurse to when
 * a chunk is still oversized. Section nesting in the docs source rarely
 * goes more than a few levels deep (e.g. reference/api/clusters/create is
 * 4), so this is a generous cap against runaway recursion rather than a
 * limit we expect to hit in practice.
 */
const MAX_SPLIT_DEPTH = 8;

function refineOversizedChunk(
  chunk: PageChunk,
  limit: number,
  overheadPerChunk: number,
  depth: number,
  forcedPartCount: number | undefined,
  withDescriptions: boolean,
): PageChunk[] {
  if (chunk.pages.length <= 1 || renderedChunkSize(chunk.pages, overheadPerChunk, withDescriptions) <= limit) {
    return [chunk];
  }
  if (depth > MAX_SPLIT_DEPTH) {
    return [chunk];
  }

  // If every page shares the same section key at this depth (e.g. an
  // entire chunk is "reference/api/..."), splitting here would only
  // produce arbitrary, non-boundary-respecting cuts. As long as there are
  // more path segments to look at, skip straight to the next depth rather
  // than cutting a section apart when a clean cut is available one level
  // deeper (e.g. "reference/api/clusters" vs "reference/api/agents").
  if (!hasAnyBoundary(chunk.pages, depth) && depth < maxSegmentCount(chunk.pages)) {
    return refineOversizedChunk(chunk, limit, overheadPerChunk, depth + 1, forcedPartCount, withDescriptions);
  }

  const subChunks = splitPagesIntoChunks(chunk.pages, limit, overheadPerChunk, forcedPartCount, depth, withDescriptions);
  if (subChunks.length <= 1) {
    // No boundary exists anywhere, even as a last resort (pages are
    // identical this many segments deep, and there's no deeper segment
    // left to distinguish them either) — can't split further.
    return subChunks;
  }

  // Recurse into every sub-chunk one level deeper: a sub-chunk from this
  // split may itself still be oversized (e.g. reference/api/ within an
  // already-isolated reference/ section), and a forced count only applies
  // to this first recursive step — anything beyond it falls back to the
  // automatic, size-driven count.
  return subChunks.flatMap((sub) =>
    refineOversizedChunk(sub, limit, overheadPerChunk, depth + 1, undefined, withDescriptions),
  );
}

/**
 * Splits `pages` into contiguous, size-limited parts for writing as
 * separate llms.txt files. Pages are first split at depth 1 (L3 section
 * boundaries, e.g. "reference"); any resulting part that's still over
 * `limit` on its own (a single L3 section larger than the limit) is
 * recursed into progressively deeper path segments (L4, L5, ...) until it
 * fits or MAX_SPLIT_DEPTH is reached, so a project's page list is never
 * left in one oversized file just because one of its sections is large.
 *
 * `forcedPartCount` forces the initial (L3-level) split to produce exactly
 * that many parts. `forcedSectionPartCount` forces the *first* recursive
 * step for any section that's still oversized to produce exactly that many
 * sub-parts (e.g. a writer choosing to split a section into a specific
 * number of files); any further recursion beyond that first step always
 * uses the automatic, size-driven count.
 */
export function splitPagesRecursively(
  pages: PageEntry[],
  limit: number,
  overheadPerChunk: number,
  forcedPartCount?: number,
  forcedSectionPartCount?: number,
  withDescriptions = true,
): PageChunk[] {
  const topLevelChunks = splitPagesIntoChunks(pages, limit, overheadPerChunk, forcedPartCount, 1, withDescriptions);
  return topLevelChunks.flatMap((chunk) =>
    refineOversizedChunk(chunk, limit, overheadPerChunk, 2, forcedSectionPartCount, withDescriptions),
  );
}
