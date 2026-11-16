import fs from 'node:fs';
import path from 'node:path';
import type { Config } from '../config.js';
import type { PageRef } from '../types.js';
import { readManifest, runDir, setStage } from '../run/manifest.js';
import { withBrowser, scrapeOne, COOLDOWN_EVERY, COOLDOWN_MS, sleep } from './browser.js';
import { logLine } from '../suite/log.js';
import { scrapeWarn, scrapeHeartbeat, shouldWrite } from './prod.js';

export function localUrlFor(origin: string, page: PageRef): string {
  const q = page.query ? `?${page.query}` : '';
  return `${origin}${page.urlPath}/${q}`;
}

export async function scrapeLocal(
  cfg: Config,
  project: string,
  runId: string,
  locales?: string[],
): Promise<void> {
  const m = readManifest(cfg, project, runId);
  let n = 0;
  const scope = process.env.SUITE_SCOPE;
  const pageCount = m.pages.length;
  await withBrowser(async (browser) => {
    for (const locale of locales ?? m.locales) {
      const outDir = path.join(runDir(cfg, project, runId), 'local', locale);
      fs.mkdirSync(outDir, { recursive: true });
      let pagesDone = 0;
      for (const page of m.pages) {
        const outcome = await scrapeOne(browser, localUrlFor(cfg.localOrigin, page));
        const warn = scrapeWarn(scope, page.slug, locale, outcome);
        if (warn) logLine(warn);
        if (shouldWrite(outcome)) {
          fs.writeFileSync(path.join(outDir, `${page.slug}.json`), JSON.stringify(outcome.page, null, 2));
        }
        if (++pagesDone % COOLDOWN_EVERY === 0) {
          logLine(scrapeHeartbeat(scope, locale, pagesDone, pageCount));
        }
        if (++n % COOLDOWN_EVERY === 0) await sleep(COOLDOWN_MS);
      }
      // Flush a final heartbeat for locales too small to reach a modulo tick.
      if (pageCount % COOLDOWN_EVERY !== 0) {
        logLine(scrapeHeartbeat(scope, locale, pagesDone, pageCount));
      }
    }
  });
  setStage(cfg, project, runId, 'scrape-local', 'done');
}
