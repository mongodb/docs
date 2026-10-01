const PROD_BASE = 'https://knowledge.mongodb.com/api/v1';
const STAGING_BASE = 'https://knowledge-dev.mongodb.com/api/v1';

const getRequestedUrl = async (envValue: string | undefined) => {
  jest.resetModules();
  if (envValue === undefined) {
    delete process.env.NEXT_PUBLIC_ENV;
  } else {
    process.env.NEXT_PUBLIC_ENV = envValue;
  }
  const fetchMock = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ results: [] }) });
  global.fetch = fetchMock as jest.Mock;

  const { getRelatedLinks } = await import('./related-links');
  await getRelatedLinks('https://www.mongodb.com/docs/manuall/');
  return fetchMock.mock.calls[0][0] as string;
};

describe('related-links EAI base URL by NEXT_PUBLIC_ENV', () => {
  const originalFetch = global.fetch;
  const originalEnv = process.env.NEXT_PUBLIC_ENV;

  afterEach(() => {
    global.fetch = originalFetch;
    if (originalEnv === undefined) {
      delete process.env.NEXT_PUBLIC_ENV;
    } else {
      process.env.NEXT_PUBLIC_ENV = originalEnv;
    }
  });

  it.each(['dotcomprd', 'production'])('uses the production service for explicit value %p', async (value) => {
    expect(await getRequestedUrl(value)).toContain(PROD_BASE);
  });

  it.each(['dotcomstg', 'staging', 'development'])('uses the staging service for explicit value %p', async (value) => {
    expect(await getRequestedUrl(value)).toContain(STAGING_BASE);
  });

  it.each([undefined, '', 'garbage', 'prd', 'stg', 'prod', 'dotcomprod', 'DotComPrd', 'production '])(
    'defaults to the production service for unrecognized value %p',
    async (value) => {
      expect(await getRequestedUrl(value)).toContain(PROD_BASE);
    },
  );
});
