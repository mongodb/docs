/**
 * Determines which generated llms.txt files are actually published, by
 * asking the docs site for each one.
 *
 * The alternative is listing the S3 bucket, which needs credentials this
 * repo's CI doesn't have. A HEAD request per file needs none, and checks
 * what the edge actually serves - which is what an agent following the
 * root llms.txt experiences.
 *
 * Conservative by design: only a definitive 404 counts as "not
 * published". A timeout, a 5xx, or a network error leaves the file
 * treated as published, because the consequence of a false negative is
 * the drift check reporting a live file as dead and an agent removing a
 * working link from the root index. A transient blip must never do that.
 */

export type PublishedState = 'published' | 'missing' | 'unknown';

export interface PublishedResult {
  url: string;
  state: PublishedState;
  status?: number;
}

export interface CheckPublishedOptions {
  /** Parallel requests. Kept modest: this runs weekly, not hot. */
  concurrency?: number;
  /** Per-request timeout in milliseconds. */
  timeoutMs?: number;
  /** Injected for tests. */
  fetchImpl?: typeof fetch;
}

const DEFAULT_CONCURRENCY = 8;
const DEFAULT_TIMEOUT_MS = 15_000;

async function headOnce(url: string, fetchImpl: typeof fetch, timeoutMs: number): Promise<PublishedResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(url, { method: 'HEAD', signal: controller.signal });
    if (response.status === 404) {
      return { url, state: 'missing', status: 404 };
    }
    if (response.ok) {
      return { url, state: 'published', status: response.status };
    }
    return { url, state: 'unknown', status: response.status };
  } catch {
    return { url, state: 'unknown' };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * HEADs every URL, retrying once for anything inconclusive so a single
 * blip doesn't decide the outcome.
 */
export async function checkPublished(
  urls: string[],
  options: CheckPublishedOptions = {},
): Promise<PublishedResult[]> {
  const {
    concurrency = DEFAULT_CONCURRENCY,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    fetchImpl = fetch,
  } = options;

  const results: PublishedResult[] = new Array(urls.length);
  let next = 0;

  async function worker(): Promise<void> {
    while (next < urls.length) {
      const index = next++;
      const url = urls[index];
      let result = await headOnce(url, fetchImpl, timeoutMs);
      if (result.state === 'unknown') {
        result = await headOnce(url, fetchImpl, timeoutMs);
      }
      results[index] = result;
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, worker));
  return results;
}

/**
 * Splits results into the sets the drift check needs. `unknown` counts as
 * published: see this module's header for why.
 */
export function partitionPublished(results: PublishedResult[]): { published: string[]; missing: string[] } {
  return {
    published: results.filter((result) => result.state !== 'missing').map((result) => result.url),
    missing: results.filter((result) => result.state === 'missing').map((result) => result.url),
  };
}
