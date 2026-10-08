import { describe, expect, it, vi } from 'vitest';
import { checkPublished, partitionPublished } from '../src/publishedCheck';

const URL_A = 'https://www.mongodb.com/docs/compass/llms.txt';
const URL_B = 'https://www.mongodb.com/docs/gone/llms.txt';

function respondWith(map: Record<string, number | 'throw'>): typeof fetch {
  return vi.fn(async (input: RequestInfo | URL) => {
    const url = String(input);
    const outcome = map[url];
    if (outcome === 'throw') {
      throw new Error('network down');
    }
    return { status: outcome, ok: outcome >= 200 && outcome < 300 } as Response;
  }) as unknown as typeof fetch;
}

describe('checkPublished', () => {
  it('marks a 200 as published and a 404 as missing', async () => {
    const results = await checkPublished([URL_A, URL_B], {
      fetchImpl: respondWith({ [URL_A]: 200, [URL_B]: 404 }),
    });
    expect(results).toEqual([
      { url: URL_A, state: 'published', status: 200 },
      { url: URL_B, state: 'missing', status: 404 },
    ]);
  });

  it('treats a network error as unknown rather than missing', async () => {
    const results = await checkPublished([URL_A], { fetchImpl: respondWith({ [URL_A]: 'throw' }) });
    expect(results[0].state).toBe('unknown');
  });

  it('treats a 5xx as unknown rather than missing', async () => {
    const results = await checkPublished([URL_A], { fetchImpl: respondWith({ [URL_A]: 503 }) });
    expect(results[0].state).toBe('unknown');
  });

  it('retries once before giving up on an inconclusive result', async () => {
    let calls = 0;
    const flaky = vi.fn(async () => {
      calls++;
      if (calls === 1) {
        throw new Error('transient');
      }
      return { status: 200, ok: true } as Response;
    }) as unknown as typeof fetch;

    const results = await checkPublished([URL_A], { fetchImpl: flaky });
    expect(calls).toBe(2);
    expect(results[0].state).toBe('published');
  });

  it('preserves input order regardless of completion order', async () => {
    const urls = Array.from({ length: 20 }, (_, i) => `https://www.mongodb.com/docs/p${i}/llms.txt`);
    const results = await checkPublished(urls, {
      fetchImpl: (async (input: RequestInfo | URL) => {
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 5));
        return { status: String(input).includes('p3/') ? 404 : 200, ok: !String(input).includes('p3/') } as Response;
      }) as unknown as typeof fetch,
    });
    expect(results.map((result) => result.url)).toEqual(urls);
    expect(results.filter((result) => result.state === 'missing').map((r) => r.url)).toEqual([
      'https://www.mongodb.com/docs/p3/llms.txt',
    ]);
  });
});

describe('partitionPublished', () => {
  it('counts unknown as published so a blip never removes a live link', () => {
    const { published, missing } = partitionPublished([
      { url: URL_A, state: 'unknown' },
      { url: URL_B, state: 'missing', status: 404 },
    ]);
    expect(published).toEqual([URL_A]);
    expect(missing).toEqual([URL_B]);
  });
});
