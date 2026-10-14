import fs from 'node:fs';
import path from 'node:path';
import type { Config } from '../config.js';
import type { PageRef } from '../types.js';
import { readManifest, runDir, setStage } from '../run/manifest.js';
import { withBrowser, scrapeOne, COOLDOWN_EVERY, COOLDOWN_MS, sleep } from './browser.js';

export function prodUrlFor(origin: string, locale: string, page: PageRef): string {
  const prefix = locale ? `/${locale}` : '';
  const q = page.query ? `?${page.query}` : '';
  return `${origin}${prefix}${page.urlPath}/${q}`;
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
  await withBrowser(async (browser) => {
    for (const locale of targets) {
      const dirName = locale === '' ? 'en' : locale;
      const outDir = path.join(runDir(cfg, project, runId), 'prod', dirName);
      fs.mkdirSync(outDir, { recursive: true });
      for (const page of m.pages) {
        const url = prodUrlFor(cfg.prodOrigin, locale, page);
        const result = await scrapeOne(browser, url);
        if (result) fs.writeFileSync(path.join(outDir, `${page.slug}.json`), JSON.stringify(result, null, 2));
        if (++n % COOLDOWN_EVERY === 0) await sleep(COOLDOWN_MS);
      }
    }
  });
  setStage(cfg, project, runId, 'scrape-prod', 'done');
}
