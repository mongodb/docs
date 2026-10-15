import fs from 'node:fs';
import path from 'node:path';
import type { Config } from '../config.js';
import type { ScrapedPage, PageRef, DatasetRow } from '../types.js';
import { readManifest, runDir } from '../run/manifest.js';

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
): DatasetRow | null {
  if (!en || !ref || !local) return null;
  return {
    input: { source_text: en.content, target_locale: locale, local_text: local.content },
    expected: ref.content,
    metadata: { project, url: page.urlPath, slug: page.slug, locale, run },
  };
}

/**
 * Join the prod-en (source), prod-<locale> (reference) and local (output)
 * scrapes into Braintrust rows, one per (page, locale). Pages missing any
 * side are skipped.
 */
export function buildDataset(cfg: Config, project: string, runId: string): DatasetRow[] {
  const m = readManifest(cfg, project, runId);
  const base = runDir(cfg, project, runId);
  const rows: DatasetRow[] = [];
  for (const locale of m.locales) {
    for (const page of m.pages) {
      const row = buildRows(
        readPage(path.join(base, 'prod', 'en'), page.slug),
        readPage(path.join(base, 'prod', locale), page.slug),
        readPage(path.join(base, 'local', locale), page.slug),
        page,
        project,
        runId,
        locale,
      );
      if (row) rows.push(row);
    }
  }
  const out = path.join(base, 'dataset');
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'rows.json'), JSON.stringify(rows, null, 2));
  return rows;
}
