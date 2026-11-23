import type { RunManifest, SegmentPair, SegmentStatus } from '../types.js';
import {
  classifySegmentStatus,
  type SegmentBuild,
  type SegmentResult,
} from './segments.js';

export interface IncludedFileSummary {
  file: string;
  pairCount: number;
  status: SegmentStatus;
}

export interface PageSegments {
  pairs: SegmentPair[];
  ownPairCount: number;
  includedPairCount: number;
  enOnly: string[];
  esOnly: string[];
  status: SegmentStatus;
  includedFiles: IncludedFileSummary[];
}

function mergeSegmentBuilds(results: SegmentResult[]): SegmentBuild {
  return {
    pairs: results.flatMap((result) => result.pairs),
    enOnly: results.flatMap((result) =>
      result.enOnly.map((key) => `${result.rel}:${key}`),
    ),
    esOnly: results.flatMap((result) =>
      result.esOnly.map((key) => `${result.rel}:${key}`),
    ),
  };
}

/**
 * The segment bundle for one page: its own pairs plus every reachable
 * include's pairs, in ownership order. Ownership comes from the manifest's
 * `pageIncludes` map (resolve stage); all reads hit the precomputed `byRel`
 * map, so no include source or overlay is read a second time per page.
 */
export function buildPageSegments(
  manifest: RunManifest,
  pageRel: string,
  byRel: Map<string, SegmentResult>,
): PageSegments {
  const owned = manifest.translatable.pageIncludes?.[pageRel];
  if (!owned) {
    throw new Error(
      `no include ownership for "${pageRel}" in run "${manifest.runId}" — re-run resolve for this run`,
    );
  }
  const read = (rel: string): SegmentResult => {
    const result = byRel.get(rel);
    if (!result) throw new Error(`no segment result for "${rel}" in run "${manifest.runId}"`);
    return result;
  };

  const own = read(pageRel);
  const included = owned.map(read);
  const merged = mergeSegmentBuilds([own, ...included]);
  return {
    pairs: merged.pairs,
    ownPairCount: own.pairs.length,
    includedPairCount: merged.pairs.length - own.pairs.length,
    enOnly: merged.enOnly,
    esOnly: merged.esOnly,
    status: classifySegmentStatus(merged),
    includedFiles: included.map((result) => ({
      file: result.rel,
      pairCount: result.pairs.length,
      status: result.status,
    })),
  };
}
