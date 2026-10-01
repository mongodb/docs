const PROD_URL = 'https://www.mongodb.com';
const STAGING_URL = 'https://mongodbcom-cdn.staging.corp.mongodb.com';

const loadBaseUrl = async (envValue: string | undefined) => {
  jest.resetModules();
  if (envValue === undefined) {
    delete process.env.NEXT_PUBLIC_IS_PROD;
  } else {
    process.env.NEXT_PUBLIC_IS_PROD = envValue;
  }
  const { DOTCOM_BASE_URL } = await import('./constants');
  return DOTCOM_BASE_URL;
};

describe('DOTCOM_BASE_URL by NEXT_PUBLIC_IS_PROD', () => {
  const originalEnv = process.env.NEXT_PUBLIC_IS_PROD;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.NEXT_PUBLIC_IS_PROD;
    } else {
      process.env.NEXT_PUBLIC_IS_PROD = originalEnv;
    }
  });

  it('uses the staging CDN only for an explicit "false"', async () => {
    expect(await loadBaseUrl('false')).toBe(STAGING_URL);
  });

  it.each(['true', 'TRUE', undefined, '', '1', 'yes', 'prod', ' true', 'garbage'])(
    'uses the production URL for value %p',
    async (value) => {
      expect(await loadBaseUrl(value)).toBe(PROD_URL);
    },
  );
});
