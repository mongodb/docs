import { updateConfig } from '../../src/contentMetadata/config';
import type { StaticEnvVars } from '../../src/util/assertDbEnvVars';
import type { ConfigEnvironmentVariables } from '../../src/util/configEnvironment';

const dbEnvVars = {
  MARIAN_URL: 'https://marian.example/',
  MARIAN_STAGING_URL: 'https://marian-staging.example/',
} as StaticEnvVars;

const ENV_KEYS = ['ENV', 'HEAD', 'SNOOTY_DB_NAME', 'NEXT_PUBLIC_MARIAN_URL'];

describe('updateConfig', () => {
  const saved: Record<string, string | undefined> = {};

  beforeEach(() => {
    for (const key of ENV_KEYS) {
      saved[key] = process.env[key];
      delete process.env[key];
    }
    jest.spyOn(console, 'info').mockImplementation(() => undefined);
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    for (const key of ENV_KEYS) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
    jest.restoreAllMocks();
  });

  const run = async (env: Record<string, string>) => {
    Object.assign(process.env, env);
    const configEnvironment: ConfigEnvironmentVariables = {};
    await updateConfig({ configEnvironment, dbEnvVars });
    return configEnvironment;
  };

  it('sets only the values the docs-nextjs build reads', async () => {
    const config = await run({ ENV: 'dotcomprd', HEAD: 'main' });

    expect(config).toEqual({
      ENV: 'dotcomprd',
      NEXT_PUBLIC_GIT_BRANCH: 'main',
      SNOOTY_DB_NAME: 'snooty_dotcomprd',
    });
    expect(process.env.NEXT_PUBLIC_MARIAN_URL).toBe(dbEnvVars.MARIAN_URL);
  });

  it.each([
    ['dotcomprd', 'snooty_dotcomprd', dbEnvVars.MARIAN_URL],
    ['dotcomstg', 'snooty_dotcomstg', dbEnvVars.MARIAN_STAGING_URL],
    ['prd', 'snooty_prod', dbEnvVars.MARIAN_URL],
    ['stg', 'snooty_dev', dbEnvVars.MARIAN_STAGING_URL],
  ])('derives the database and Marian URL for ENV=%s', async (env, snootyDb, marianUrl) => {
    const config = await run({ ENV: env, HEAD: 'main' });

    expect(config.SNOOTY_DB_NAME).toBe(snootyDb);
    expect(process.env.NEXT_PUBLIC_MARIAN_URL).toBe(marianUrl);
  });

  it('lets SNOOTY_DB_NAME be overridden from the environment', async () => {
    const config = await run({ ENV: 'dotcomprd', HEAD: 'main', SNOOTY_DB_NAME: 'snooty_dev' });

    expect(config.SNOOTY_DB_NAME).toBe('snooty_dev');
  });

  it('replaces characters that are not allowed in a branch name', async () => {
    const config = await run({ ENV: 'prd', HEAD: 'feature/foo_bar.baz' });

    expect(config.NEXT_PUBLIC_GIT_BRANCH).toBe('feature-foo_bar-baz');
  });

  it('shortens long branch names with a stable hash suffix', async () => {
    const head = 'a'.repeat(100);
    const first = await run({ ENV: 'prd', HEAD: head });
    const second = await run({ ENV: 'prd', HEAD: head });

    expect(first.NEXT_PUBLIC_GIT_BRANCH).toMatch(/^a{35}-[0-9a-f]{8}$/);
    expect(second.NEXT_PUBLIC_GIT_BRANCH).toBe(first.NEXT_PUBLIC_GIT_BRANCH);
  });
});
