/**
 * Netlify Scheduled Function: health-check.ts
 *
 * Pings every URL in the top-pages list every 10 minutes.
 * Any response outside 2xx/3xx fires a Slack alert.
 *
 * Required env var: SLACK_HEALTH_CHECK_WEBHOOK_URL
 */

import type { Config } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import { TOP_PAGES, INDEX_PAGES } from './health-check-utils/top-pages';

const HEALTH_CHECK_BLOB_STORE = 'health-check-urls';
const HEALTH_CHECK_BLOB_KEY = 'index-pages';

/**
 * Loads index-page URLs from the `health-check-urls` blob store written by
 * the Nextjs Extension. Falls back to the hardcoded INDEX_PAGES constant if the
 * blob is unavailable or empty so the health check never silently stops running.
 */
async function loadIndexPages(): Promise<string[]> {
  try {
    const store = getStore(HEALTH_CHECK_BLOB_STORE);
    const data = await store.get(HEALTH_CHECK_BLOB_KEY, { type: 'json' });
    if (Array.isArray(data) && data.length > 0) {
      console.log(`[health-check] loaded ${data.length} index pages from blob store "${HEALTH_CHECK_BLOB_STORE}"`);
      return data as string[];
    }
    console.warn(
      `[health-check] blob store "${HEALTH_CHECK_BLOB_STORE}" returned empty/null — falling back to hardcoded INDEX_PAGES`,
    );
  } catch (err) {
    console.warn('[health-check] Failed to load index pages from blob store — falling back to hardcoded INDEX_PAGES:', err);
  }
  return INDEX_PAGES;
}

export const config: Config = {
  schedule: '*/10 * * * *', // every 10 minutes
};

// ---------------------------------------------------------------------------
// CONFIG
// ---------------------------------------------------------------------------

const SLACK_WEBHOOK_URL = process.env.SLACK_HEALTH_CHECK_WEBHOOK_URL ?? '';
const REQUEST_TIMEOUT_MS = 8_000;
const CONCURRENCY = 25;

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

interface CheckResult {
  url: string;
  status: number | null;
  durationMs: number;
  timedOut: boolean;
  error?: string;
}

// ---------------------------------------------------------------------------
// HTTP CHECK
// ---------------------------------------------------------------------------

async function checkUrl(url: string): Promise<CheckResult> {
  const start = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'mongodb-docs-health-check/1.0' },
    });
    clearTimeout(timeout);
    // Cancel the body stream immediately — we only need the status code,
    // not the full HTML, but GET ensures the server actually renders the page.
    await res.body?.cancel();
    return { url, status: res.status, durationMs: Date.now() - start, timedOut: false };
  } catch (err) {
    clearTimeout(timeout);
    const timedOut = (err as Error).name === 'AbortError';
    console.error('Error checking URL:', url, err);
    return {
      url,
      status: null,
      durationMs: Date.now() - start,
      timedOut,
      error: timedOut ? `Timed out after ${REQUEST_TIMEOUT_MS}ms` : (err as Error).message,
    };
  }
}

function isFailure(result: CheckResult): boolean {
  if (result.timedOut || result.status === null) return true;
  return result.status < 200 || result.status >= 300;
}

// ---------------------------------------------------------------------------
// CONCURRENCY HELPER
// Runs `fn` over all items with at most `limit` in-flight at once.
// ---------------------------------------------------------------------------

async function withConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += limit) {
    const batch = items.slice(i, i + limit);
    results.push(...(await Promise.all(batch.map(fn))));
  }
  return results;
}

// ---------------------------------------------------------------------------
// SLACK
// ---------------------------------------------------------------------------

async function postToSlack(text: string): Promise<void> {
  const res = await fetch(SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    console.error('Slack webhook failed:', res.status, await res.text());
  }
}

function buildSlackMessage(failures: CheckResult[]): string {
  const header = `🔴 *Docs health check: ${failures.length} failure${failures.length !== 1 ? 's' : ''} detected*`;

  // Show up to 20 failures; note total if more
  const displayed = failures.slice(0, 20);
  const lines = displayed.map((f) => {
    const statusLabel = f.timedOut ? 'TIMEOUT' : `${f.status}`;
    const duration = `${f.durationMs}ms`;
    return `• \`${statusLabel}\` ${f.url} _(${duration})_`;
  });

  if (failures.length > 20) {
    lines.push(`_…and ${failures.length - 20} more_`);
  }

  return [header, ...lines].join('\n');
}

// ---------------------------------------------------------------------------
// HANDLER
// ---------------------------------------------------------------------------

export default async function handler(): Promise<Response> {
  if (!SLACK_WEBHOOK_URL) {
    console.error('SLACK_WEBHOOK_URL is not set — skipping health check');
    return new Response('Missing SLACK_WEBHOOK_URL', { status: 500 });
  }

  const indexPages = await loadIndexPages();
  const allPages = [...TOP_PAGES, ...indexPages];

  console.log(`Checking ${allPages.length} pages with concurrency ${CONCURRENCY}…`);

  const results = await withConcurrency(allPages, CONCURRENCY, checkUrl);
  const failures = results.filter(isFailure);

  console.log(`Done. ${results.length} checked, ${failures.length} failed.`);

  if (failures.length > 0) {
    console.log('Failures:', failures);
    await postToSlack(buildSlackMessage(failures));
    console.log(`Sent Slack alert for ${failures.length} failure(s)`);
  }

  return new Response('OK', { status: 200 });
}
