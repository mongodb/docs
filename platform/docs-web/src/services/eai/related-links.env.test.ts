const PROD_BASE = 'https://knowledge.mongodb.com/api/v1';
const STAGING_BASE = 'https://knowledge-dev.mongodb.com/api/v1';

const getRequestedUrl = async (envValue: string | undefined) => {
  jest.resetModules();
  if (envValue === undefined) {
    delete process.env.NEXT_PUBLIC_IS_PROD;
  } else {
    process.env.NEXT_PUBLIC_IS_PROD = envValue;
  }
  const fetchMock = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ results: [] }) });
  global.fetch = fetchMock as jest.Mock;

  const { getRelatedLinks } = await import('./related-links');
  await getRelatedLinks('https://www.mongodb.com/docs/manuall/');
  return fetchMock.mock.calls[0][0] as string;
};

describe('related-links EAI base URL by NEXT_PUBLIC_IS_PROD', () => {
  const originalFetch = global.fetch;
  const originalEnv = process.env.NEXT_PUBLIC_IS_PROD;

  afterEach(() => {
    global.fetch = originalFetch;
    if (originalEnv === undefined) {
      delete process.env.NEXT_PUBLIC_IS_PROD;
    } else {
      process.env.NEXT_PUBLIC_IS_PROD = originalEnv;
    }
  });

  it('uses the staging service only for an explicit "false"', async () => {
    expect(await getRequestedUrl('false')).toContain(STAGING_BASE);
  });

  it.each(['true', 'TRUE', undefined, '', '1', 'yes', 'prod', ' true', 'garbage'])(
    'uses the production service for value %p',
    async (value) => {
      expect(await getRequestedUrl(value)).toContain(PROD_BASE);
    },
  );
});
