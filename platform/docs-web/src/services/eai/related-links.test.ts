import { getRelatedLinks } from './related-links';

describe('getRelatedLinks', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('returns results on a successful response', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        inputUrl: 'https://www.mongodb.com/docs/manuall/',
        normalizedUrl: 'https://www.mongodb.com/docs/manuall/',
        inputStatus: 'not_found',
        results: [{ title: 'Manual', url: 'https://www.mongodb.com/docs/manual/', score: 0.9, confidence: 'high' }],
      }),
    }) as jest.Mock;

    const results = await getRelatedLinks('https://www.mongodb.com/docs/manuall/');
    expect(results).toHaveLength(1);
    expect(results[0].url).toBe('https://www.mongodb.com/docs/manual/');
  });

  it('returns an empty array on a valid "abstain" response', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        inputUrl: 'https://www.mongodb.com/docs/gibberish/',
        normalizedUrl: 'https://www.mongodb.com/docs/gibberish/',
        inputStatus: 'not_found',
        results: [],
      }),
    }) as jest.Mock;

    const results = await getRelatedLinks('https://www.mongodb.com/docs/gibberish/');
    expect(results).toEqual([]);
  });

  it('returns an empty array (does not throw) on a non-ok response', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 }) as jest.Mock;

    const results = await getRelatedLinks('https://www.mongodb.com/docs/manuall/');
    expect(results).toEqual([]);
  });

  it('returns an empty array (does not throw) on a network error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('network error')) as jest.Mock;

    const results = await getRelatedLinks('https://www.mongodb.com/docs/manuall/');
    expect(results).toEqual([]);
  });

  it('sends sourceType tech-docs and the X-Request-Origin header', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ inputUrl: '', normalizedUrl: '', inputStatus: 'not_found', results: [] }),
    });
    global.fetch = fetchMock as jest.Mock;

    await getRelatedLinks('https://www.mongodb.com/docs/manuall/');

    const [, options] = fetchMock.mock.calls[0];
    const body = JSON.parse(options.body as string);
    expect(body).toEqual({ url: 'https://www.mongodb.com/docs/manuall/', sourceType: ['tech-docs'] });
    expect(options.headers['X-Request-Origin']).toBeTruthy();
  });
});
