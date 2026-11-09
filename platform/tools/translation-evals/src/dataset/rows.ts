import fs from 'node:fs';
import path from 'node:path';
import type { Config } from '../config.js';
import type { ScrapedPage, PageRef, DatasetRow, SegmentPair, SegmentStatus } from '../types.js';
import { readManifest, runDir } from '../run/manifest.js';
import { segmentTargets, readFileSegmentResult, type SegmentResult } from './segments.js';
import { projectRelativeMdx } from '../resolve/run.js';

function readPage(dir: string, slug: string): ScrapedPage | undefined {
  const p = path.join(dir, `${slug}.json`);
  return fs.existsSync(p) ? (JSON.parse(fs.readFileSync(p, 'utf8')) as ScrapedPage) : undefined;
}

export function buildRows(
  en: ScrapedPage | undefined,
  ref: ScrapedPage | undefined,
  local: ScrapedPage | undefined,
  page: PageRef,
  project: string,
  run: string,
  locale: string,
  segments: SegmentPair[] = [],
  status: SegmentStatus = 'ok',
): DatasetRow | null {
  if (!en || !ref || !local) return null;
  return {
    input: { source_text: en.content, target_locale: locale, local_text: local.content, segments },
    expected: ref.content,
    metadata: {
      project,
      url: page.urlPath,
      slug: page.slug,
      locale,
      run,
      kind: 'page',
      mdxPath: page.mdxPath,
      segmentStatus: status,
      segmentPairs: segments.length,
    },
  };
}

/**
 * One row per reachable include, per locale. Includes are never scraped, so the
 * three text fields are empty and only `segments` carries data. The manual
 * scoring covered all 70 translatable files (8 pages + 62 includes); without
 * these rows the population is not comparable.
 */
export function buildIncludeRow(
  rel: string,
  locale: string,
  project: string,
  run: string,
  segments: SegmentPair[],
  status: SegmentStatus,
): DatasetRow {
  return {
    input: { source_text: '', target_locale: locale, local_text: '', segments },
    expected: '',
    metadata: {
      project,
      url: '',
      slug: rel,
      locale,
      run,
      kind: 'include',
      mdxPath: rel,
      segmentStatus: status,
      segmentPairs: segments.length,
    },
  };
}

/**
 * Join the prod-en (source), prod-<locale> (reference) and local (output)
 * scrapes into rows, one per (page, locale), plus one row per translatable
 * include. Writes `rows.json`.
 */
export function buildDataset(cfg: Config, project: string, runId: string): DatasetRow[] {
  const m = readManifest(cfg, project, runId);
  const base = runDir(cfg, project, runId);
  const rows: DatasetRow[] = [];

  for (const locale of m.locales) {
    // Read each file once, then hand its segments to every row that needs them.
    // Rows are driven by `m.pages` (one per variant), not by the deduped targets.
    const byRel = new Map<string, SegmentResult>();
    for (const target of segmentTargets(m)) {
      const result = readFileSegmentResult(cfg, m, locale, target);
      byRel.set(target.rel, result);
      if (result.enOnly.length + result.esOnly.length > 0) {
        console.warn(
          `${target.mdxPath} [${locale}] one-sided keys: en ${result.enOnly.length}, es ${result.esOnly.length}`,
        );
      }
    }

    for (const page of m.pages) {
      const result = byRel.get(projectRelativeMdx(m.project, page.mdxPath));
      if (result === undefined) continue;
      const row = buildRows(
        readPage(path.join(base, 'prod', 'en'), page.slug),
        readPage(path.join(base, 'prod', locale), page.slug),
        readPage(path.join(base, 'local', locale), page.slug),
        page,
        project,
        runId,
        locale,
        result.pairs,
        result.status,
      );
      // A page whose scrape is missing is a gap to report, not a row to drop silently.
      if (row) rows.push(row);
      else console.warn(`no scrape for ${page.mdxPath} [${locale}] — page dropped`);
    }

    for (const rel of m.translatable.includes) {
      const result = byRel.get(rel);
      if (result === undefined) continue;
      rows.push(buildIncludeRow(rel, locale, project, runId, result.pairs, result.status));
    }
  }

  const out = path.join(base, 'dataset');
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'rows.json'), JSON.stringify(rows, null, 2));
  console.error(`dataset: ${rows.length} rows`);
  return rows;
}
