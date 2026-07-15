/**
 * Netlify Background Function: health-check-background.ts
 *
 * Triggered by the `health-check` scheduled function every 10 minutes.
 * Pings every URL in the top-pages list. Any response outside 2xx/3xx fires
 * a Slack alert.
 *
 * Background functions get a 15-minute execution limit (vs. the 30-second
 * limit for scheduled functions), which is required here since checking
 * ~700 pages with retries can take several minutes.
 */

import { TOP_PAGES } from './health-check-utils/top-pages';
import { loadIndexPages, releaseRunLock } from './health-check-utils/blob-store';

// Background mode is enabled via the `-background` filename suffix — the
// installed @netlify/functions version doesn't yet support the newer
// `config.background` property, but the suffix convention is still fully
// supported. See https://docs.netlify.com/build/functions/background-functions/#legacy-filename-convention

// ---------------------------------------------------------------------------
// CONFIG
// ---------------------------------------------------------------------------

const SLACK_WEBHOOK_URL = process.env.SLACK_HEALTH_CHECK_PRIVATE_WEBHOOK ?? '';
const REQUEST_TIMEOUT_MS = 8_000;
const CONCURRENCY = 25;
const MAX_RETRIES = 2;        // re-check a failing URL this many times before alerting
const RETRY_DELAY_MS = 3_000; // wait between retries
// Background functions time out at 15 minutes (Netlify hard limit). We stop
// checking at 13 minutes so there's headroom to send the Slack message
// before the process is killed.
const FUNCTION_DEADLINE_MS = 13 * 60 * 1_000;

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

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Checks a URL and retries up to MAX_RETRIES times on failure before giving up.
 * Transient blips (CDN cold starts, brief timeouts) are silently recovered;
 * only consistent failures across all attempts are returned as failures.
 */
async function checkUrlWithRetry(url: string): Promise<CheckResult> {
  let lastResult = await checkUrl(url);
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    if (!isFailure(lastResult)) return lastResult;
    console.warn(
      `[health-check] ${url} failed (attempt ${attempt}/${MAX_RETRIES + 1}), retrying in ${RETRY_DELAY_MS}ms…`,
    );
    await sleep(RETRY_DELAY_MS);
    lastResult = await checkUrl(url);
  }
  if (!isFailure(lastResult)) {
    console.log(`[health-check] ${url} recovered after retry — transient failure, not alerting`);
  }
  return lastResult;
}

// ---------------------------------------------------------------------------
// CONCURRENCY HELPER
// Runs `fn` over all items with at most `limit` in-flight at once.
// Stops early and sets `aborted = true` if `deadlineMs` is exceeded between batches.
// ---------------------------------------------------------------------------

interface ConcurrencyResult<R> {
  results: R[];
  aborted: boolean;
}

async function withConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
  startTime: number,
  deadlineMs: number,
): Promise<ConcurrencyResult<R>> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += limit) {
    if (Date.now() - startTime >= deadlineMs) {
      return { results, aborted: true };
    }
    const batch = items.slice(i, i + limit);
    results.push(...(await Promise.all(batch.map(fn))));
  }
  return { results, aborted: false };
}

// ---------------------------------------------------------------------------
// SLACK
// ---------------------------------------------------------------------------

// Swallows errors rather than throwing: a network blip talking to Slack
// shouldn't fail the whole invocation and trigger Netlify's automatic
// full re-run of the (potentially multi-minute) health check.
async function postToSlack(text: string): Promise<void> {
  try {
    const res = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) {
      console.error('Slack webhook failed:', res.status, await res.text());
    }
  } catch (err) {
    console.error('Slack webhook request threw:', err);
  }
}

function formatFailureLines(failures: CheckResult[]): string[] {
  const displayed = failures.slice(0, 20);
  const lines = displayed.map((f) => {
    const statusLabel = f.timedOut ? 'TIMEOUT' : `${f.status}`;
    return `• \`${statusLabel}\` ${f.url} _(${f.durationMs}ms)_`;
  });
  if (failures.length > 20) {
    lines.push(`_…and ${failures.length - 20} more_`);
  }
  return lines;
}

function buildSlackMessage(failures: CheckResult[]): string {
  const header = `🔴 *Docs health check: ${failures.length} failure${failures.length !== 1 ? 's' : ''} detected*`;
  return [header, ...formatFailureLines(failures)].join('\n');
}

function buildTimeoutMessage({
  failures,
  checkedCount,
  totalCount,
  elapsedMs,
}: {
  failures: CheckResult[];
  checkedCount: number;
  totalCount: number;
  elapsedMs: number;
}): string {
  const elapsedMin = (elapsedMs / 60_000).toFixed(1);
  const unchecked = totalCount - checkedCount;
  const timeoutPct = failures.length > 0
    ? Math.round(failures.filter((f) => f.timedOut).length / failures.length * 100)
    : 0;

  const lines = [
    `⏱️ *Docs health check hit the time limit (${elapsedMin} min)*`,
    `Checked ${checkedCount} of ${totalCount} URLs — *${unchecked} URLs not checked*.`,
    `${failures.length} failure${failures.length !== 1 ? 's' : ''} found in the URLs that were checked (${timeoutPct}% were request timeouts — likely cause of slowdown).`,
  ];

  if (failures.length > 0) {
    lines.push('', '*Failures found so far:*', ...formatFailureLines(failures));
  }

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// HANDLER
// ---------------------------------------------------------------------------

export default async function handler(): Promise<Response> {
  try {
    if (!SLACK_WEBHOOK_URL) {
      console.error('SLACK_WEBHOOK_URL is not set — skipping health check');
      return new Response('Missing SLACK_WEBHOOK_URL', { status: 500 });
    }

    const indexPages = await loadIndexPages();
    const allPages = [...TOP_PAGES, ...indexPages];

    console.log(`Checking ${allPages.length} pages with concurrency ${CONCURRENCY}…`);

    const startTime = Date.now();
    const { results, aborted } = await withConcurrency(allPages, CONCURRENCY, checkUrlWithRetry, startTime, FUNCTION_DEADLINE_MS);
    const failures = results.filter(isFailure);
    const elapsedMs = Date.now() - startTime;

    if (aborted) {
      console.error(`[health-check] Hit time limit after ${(elapsedMs / 60_000).toFixed(1)} min — checked ${results.length}/${allPages.length} URLs, ${failures.length} failures so far`);
      await postToSlack(buildTimeoutMessage({ failures, checkedCount: results.length, totalCount: allPages.length, elapsedMs }));
      return new Response('Timed out', { status: 500 });
    }

    console.log(`Done. ${results.length} checked, ${failures.length} failed.`);

    if (failures.length > 0) {
      console.log('Failures:', failures);
      await postToSlack(buildSlackMessage(failures));
      console.log(`Sent Slack alert for ${failures.length} failure(s)`);
    }

    return new Response('OK', { status: 200 });
  } finally {
    // Always release the lock the trigger acquired, so the next scheduled
    // run isn't blocked waiting out LOCK_WINDOW_MS regardless of how this
    // run ended.
    await releaseRunLock();
  }
}
