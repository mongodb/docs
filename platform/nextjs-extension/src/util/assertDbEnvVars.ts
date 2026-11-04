export type StaticEnvVars = {
  MARIAN_STAGING_URL: string;
  MARIAN_URL: string;
};

export const assertEnvVars = (vars: Record<string, string>) => {
  const missingVars = Object.entries(vars)
    .filter(([, value]) => !value)
    .map(([key]) => `- ${key}`)
    .join('\n');
  if (missingVars)
    console.warn(`Missing env var(s) ${JSON.stringify(missingVars)}`);
  return vars;
};

export const getDbConfig = (): StaticEnvVars => {
  const environmentVariables = assertEnvVars({
    MARIAN_STAGING_URL:
      (process.env.MARIAN_STAGING_URL as string) ??
      'https://docs-search-transport.docs.staging.corp.mongodb.com/',
    MARIAN_URL:
      (process.env.MARIAN_URL as string) ??
      'https://docs-search-transport.mongodb.com/',
  }) as StaticEnvVars;

  return environmentVariables;
};
