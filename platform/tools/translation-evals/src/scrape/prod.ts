import fs from 'node:fs';
import path from 'node:path';
import type { Config } from '../config.js';
import type { PageRef } from '../types.js';
import { readManifest, runDir, setStage } from '../run/manifest.js';
import { withBrowser, scrapeOne, type ScrapeOutcome, COOLDOWN_EVERY, COOLDOWN_MS, sleep } from './browser.js';
import { logLine, type LogLine } from '../suite/log.js';

export function prodUrlFor(origin: string, locale: string, page: PageRef): string {
  const prefix = locale ? `/${locale}` : '';
  const q = page.query ? `?${page.query}` : '';
  return `${origin}${prefix}${page.urlPath}/${q}`;
}

export function scrapeWarn(
  scope: string | undefined,
  slug: string,
  locale: string,
  outcome: ScrapeOutcome,
): LogLine | null {
  if (outcome.kind === 'skipped') return { scope, event: 'warn', subject: 'scrape', attrs: { status: outcome.status, slug, locale } };
  if (outcome.kind === 'empty') return { scope, event: 'warn', subject: 'scrape', attrs: { empty: 1, slug, locale } };
  return null;
}

// Empty and skipped outcomes are logged, not recorded: a blank page would be
// scored as if it were real content.
export function shouldWrite(outcome: ScrapeOutcome): outcome is Extract<ScrapeOutcome, { kind: 'ok' }> {
  return outcome.kind === 'ok';
}

export function scrapeHeartbeat(scope: string | undefined, locale: string, pagesDone: number, pageCount: number): LogLine {
  return { scope, event: 'info', subject: 'scrape', attrs: { locale, progress: `${pagesDone}/${pageCount}` } };
}

export async function scrapeProd(
  cfg: Config,
  project: string,
  runId: string,
  locales?: string[],
): Promise<void> {
  const m = readManifest(cfg, project, runId);
  const targets = ['', ...(locales ?? m.locales)];
  let n = 0;
  const scope = process.env.SUITE_SCOPE;
  const pageCount = m.pages.length;
  await withBrowser(async (browser) => {
    for (const locale of targets) {
      const dirName = locale === '' ? 'en' : locale;
      const outDir = path.join(runDir(cfg, project, runId), 'prod', dirName);
      fs.mkdirSync(outDir, { recursive: true });
      let pagesDone = 0;
      for (const page of m.pages) {
        const url = prodUrlFor(cfg.prodOrigin, locale, page);
        const outcome = await scrapeOne(browser, url);
        const warn = scrapeWarn(scope, page.slug, dirName, outcome);
        if (warn) logLine(warn);
        if (shouldWrite(outcome)) fs.writeFileSync(path.join(outDir, `${page.slug}.json`), JSON.stringify(outcome.page, null, 2));
        if (++pagesDone % COOLDOWN_EVERY === 0) {
          logLine(scrapeHeartbeat(scope, dirName, pagesDone, pageCount));
        }
        if (++n % COOLDOWN_EVERY === 0) await sleep(COOLDOWN_MS);
      }
      // Flush a final heartbeat for locales too small to reach a modulo tick.
      if (pageCount % COOLDOWN_EVERY !== 0) {
        logLine(scrapeHeartbeat(scope, dirName, pagesDone, pageCount));
      }
    }
  });
  setStage(cfg, project, runId, 'scrape-prod', 'done');
}
