import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import type { Config } from '../config.js';
import type { ScrapedPage, PageRef, DatasetRow } from '../types.js';
import { readManifest, runDir } from '../run/manifest.js';
import { segmentTargets, readFileSegmentResult, type SegmentResult } from './segments.js';
import { buildPageSegments, type PageSegments } from './page-segments.js';
import { projectRelativeMdx } from '../resolve/run.js';
import { logLine } from '../suite/log.js';

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
  segments: PageSegments,
): DatasetRow {
  if (!en || !ref || !local) {
    throw new Error(
      `missing page scrape for "${page.mdxPath}" [${locale}] — re-run scrape-prod/scrape-local before building the dataset`,
    );
  }
  return {
    input: { source_text: en.content, target_locale: locale, local_text: local.content, segments: segments.pairs },
    expected: ref.content,
    metadata: {
      project,
      url: page.urlPath,
      slug: page.slug,
      locale,
      run,
      kind: 'page',
      mdxPath: page.mdxPath,
      case_id: [project, 'page', page.slug, locale].join(':'),
      source_digest: createHash('sha256').update(en.content).digest('hex'),
      included_files: segments.includedFiles,
      own_segments: segments.ownPairCount,
      included_segments: segments.includedPairCount,
      segmentPairs: segments.pairs.length,
      segmentStatus: segments.status,
      enOnly: segments.enOnly.length,
      esOnly: segments.esOnly.length,
    },
  };
}

/**
 * Production baseline rows: the production reference is the candidate. There
 * is no translated overlay, so each page is a single whole-page segment pair —
 * the glossary scorer only needs paired text. Include rows are omitted because
 * production has no per-file translation for them; their text is already
 * inside the page scrape.
 */
export function buildProductionBaselineRows(cfg: Config, project: string, runId: string): DatasetRow[] {
  const m = readManifest(cfg, project, runId);
  const baselineRunDir = runDir(cfg, project, runId);
  const rows: DatasetRow[] = [];
  for (const locale of m.locales) {
    for (const page of m.pages) {
      const englishProductionPage = readPage(path.join(baselineRunDir, 'prod', 'en'), page.slug);
      const translatedProductionPage = readPage(path.join(baselineRunDir, 'prod', locale), page.slug);
      if (!englishProductionPage || !translatedProductionPage) {
        throw new Error(
          `baseline needs prod/en and prod/${locale} for ${page.slug} — re-run scrape-prod`,
        );
      }
      const row = buildRows(englishProductionPage, translatedProductionPage, translatedProductionPage, page, project, runId, locale, {
        pairs: [{ key: page.slug, en: englishProductionPage.content, es: translatedProductionPage.content }],
        ownPairCount: 1,
        includedPairCount: 0,
        enOnly: [],
        esOnly: [],
        status: 'ok',
        includedFiles: [],
      });
      row.metadata.baseline = 'production';
      rows.push(row);
    }
  }
  if (rows.length === 0) throw new Error('baseline produced no rows — check the manifest locales and pages');
  const datasetDir = path.join(baselineRunDir, 'dataset');
  fs.mkdirSync(datasetDir, { recursive: true });
  fs.writeFileSync(path.join(datasetDir, 'rows.json'), JSON.stringify(rows, null, 2));
  console.error(`dataset: ${rows.length} baseline rows`);
  return rows;
}

/**
 * Join the prod-en (source), prod-<locale> (reference) and local (output)
 * scrapes into one row per (page, locale), with every reachable include's
 * segments folded into the page row. Writes `rows.json`.
 */
export function buildDataset(cfg: Config, project: string, runId: string): DatasetRow[] {
  const m = readManifest(cfg, project, runId);
  const base = runDir(cfg, project, runId);
  const rows: DatasetRow[] = [];
  const scope = process.env.SUITE_SCOPE;

  for (const locale of m.locales) {
    let built = 0;
    // Read each file once, then hand its segments to every page that needs them.
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
      const pageRel = projectRelativeMdx(m.project, page.mdxPath);
      const segments = buildPageSegments(m, pageRel, byRel);
      rows.push(
        buildRows(
          readPage(path.join(base, 'prod', 'en'), page.slug),
          readPage(path.join(base, 'prod', locale), page.slug),
          readPage(path.join(base, 'local', locale), page.slug),
          page,
          project,
          runId,
          locale,
          segments,
        ),
      );
      built++;
    }

    // Page-relative cases carry every include. Base the denominator on pages.
    logLine({
      scope,
      event: 'info',
      subject: 'stage=dataset',
      attrs: { locale, rows: `${built}/${m.pages.length}` },
    });
  }

  const out = path.join(base, 'dataset');
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'rows.json'), JSON.stringify(rows, null, 2));
  console.error(`dataset: ${rows.length} rows`);
  return rows;
}
