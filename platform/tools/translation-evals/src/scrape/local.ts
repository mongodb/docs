import fs from 'node:fs';
import path from 'node:path';
import type { Config } from '../config.js';
import type { PageRef } from '../types.js';
import { readManifest, runDir, setStage } from '../run/manifest.js';
import { withBrowser, scrapeOne, COOLDOWN_EVERY, COOLDOWN_MS, sleep } from './browser.js';

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
  await withBrowser(async (browser) => {
    for (const locale of locales ?? m.locales) {
      const outDir = path.join(runDir(cfg, project, runId), 'local', locale);
      fs.mkdirSync(outDir, { recursive: true });
      for (const page of m.pages) {
        const result = await scrapeOne(browser, localUrlFor(cfg.localOrigin, page));
        if (result) {
          fs.writeFileSync(path.join(outDir, `${page.slug}.json`), JSON.stringify(result, null, 2));
        }
        if (++n % COOLDOWN_EVERY === 0) await sleep(COOLDOWN_MS);
      }
    }
  });
  setStage(cfg, project, runId, 'scrape-local', 'done');
}
