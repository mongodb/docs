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

export async function scrapeOne(
  browser: Browser,
  url: string,
): Promise<{ url: string; title: string; content: string } | null> {
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  try {
    const page = await context.newPage();
    await sleep(jitterMs());
    const response = await page.goto(url, { timeout: 30_000, waitUntil: 'domcontentloaded' });
    if (response && isSkippableStatus(response.status())) return null;
    await page.waitForSelector('main', { timeout: 8000 }).catch(() => {});
    const title = await page.title();
    const content = await page.$eval('main', (el) => (el as HTMLElement).innerText).catch(() => '');
    // An error page or a timeout leaves `main` empty; recording that as a scrape
    // would hand the eval a blank page to score.
    if (!hasContent(content)) {
      console.warn(`empty page content for ${url} — not recorded`);
      return null;
    }
    return { url, title, content };
  } finally {
    await context.close();
  }
}
