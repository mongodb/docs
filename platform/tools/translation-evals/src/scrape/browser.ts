import { chromium, type Browser } from 'playwright';

export const JITTER_MIN_MS = 5000;
export const JITTER_RANGE_MS = 3000;
export const COOLDOWN_EVERY = 50;
export const COOLDOWN_MS = 60_000;

export function jitterMs(): number {
  return JITTER_MIN_MS + Math.random() * JITTER_RANGE_MS;
}

export function isSkippableStatus(status: number): boolean {
  return status === 403 || status === 404;
}

export function hasContent(content: string): boolean {
  return content.trim() !== '';
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function withBrowser<T>(fn: (browser: Browser) => Promise<T>): Promise<T> {
  const browser = await chromium.launch({ headless: true });
  try {
    return await fn(browser);
  } finally {
    await browser.close();
  }
}

export type ScrapeOutcome =
  | { kind: 'ok'; page: { url: string; title: string; content: string } }
  | { kind: 'skipped'; status: number }
  | { kind: 'empty'; page: { url: string; title: string; content: string } };

export async function scrapeOne(browser: Browser, url: string): Promise<ScrapeOutcome> {
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  try {
    const page = await context.newPage();
    await sleep(jitterMs());
    const response = await page.goto(url, { timeout: 30_000, waitUntil: 'domcontentloaded' });
    if (response && isSkippableStatus(response.status())) return { kind: 'skipped', status: response.status() };
    await page.waitForSelector('main', { timeout: 8000 }).catch(() => {});
    const title = await page.title();
    const content = await page.$eval('main', (el) => (el as HTMLElement).innerText).catch(() => '');
    // An error page or a timeout leaves `main` empty; return the reason so the
    // caller can log it and skip writing a blank page.
    if (!hasContent(content)) return { kind: 'empty', page: { url, title, content } };
    return { kind: 'ok', page: { url, title, content } };
  } finally {
    await context.close();
  }
}
