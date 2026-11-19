describe('env-config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    delete process.env.MONGODB_URI;
    delete process.env.SLACK_QUOKKA_OAUTH_ACCESS_TOKEN;
    delete process.env.BUILD_STATIC_PAGES;
    delete process.env.DB_ENV;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('throws when required variables are missing', async () => {
    await expect(import('./env-config')).rejects.toThrow(
      'Missing required environment variables: MONGODB_URI, SLACK_QUOKKA_OAUTH_ACCESS_TOKEN',
    );
  });

  it('does not require them for the offline static build', async () => {
    process.env.BUILD_STATIC_PAGES = 'true';
    await expect(import('./env-config')).resolves.toBeDefined();
  });

  it('still rejects an invalid DB_ENV in the offline static build', async () => {
    process.env.BUILD_STATIC_PAGES = 'true';
    process.env.DB_ENV = 'nope';
    await expect(import('./env-config')).rejects.toThrow('Invalid DB_ENV value: nope');
  });
});
