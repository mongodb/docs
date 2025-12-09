const ENVIRONMENT_VALUES = ['production', 'dotcomprd', 'dotcomstg', 'dev', 'development'] as const;

export type Environments = (typeof ENVIRONMENT_VALUES)[number];

const REQUIRED_ENV_VARS = [
  'MONGODB_URI',
  'JIRA_USERNAME',
  'JIRA_PASSWORD',
  'SLACK_QUOKKA_OAUTH_ACCESS_TOKEN',
  'CONTENTSTACK_API_KEY',
  'CONTENTSTACK_DELIVERY_TOKEN',
  'CONTENTSTACK_ENVIRONMENT',
];

/**
 * Validates the environment configuration.
 * Throws an error if any required environment variables are missing or if DB_ENV is invalid.
 */
const validateEnvConfigs = () => {
  const missingVars = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
  const dbEnv = process.env.DB_ENV;
  if (dbEnv && !ENVIRONMENT_VALUES.includes(dbEnv as Environments)) {
    throw new Error(`Invalid DB_ENV value: ${dbEnv}. Must be one of: ${ENVIRONMENT_VALUES.join(', ')}`);
  }
};

validateEnvConfigs();

type GlobalEnvConfig = {
  AWS_S3_ACCESS_KEY_ID: string;
  AWS_S3_SECRET_ACCESS_KEY: string;
  AWS_KEY_REGION: string;
  DB_ENV: Environments;
  MONGODB_URI: string;
  IPDATA_API_KEY: string;
  JIRA_USERNAME: string;
  JIRA_PASSWORD: string;
  CONTENTSTACK_API_KEY: string;
  CONTENTSTACK_DELIVERY_TOKEN: string;
  CONTENTSTACK_ENVIRONMENT: string;
  SLACK_QUOKKA_OAUTH_ACCESS_TOKEN: string;
  CONTENTSTACK_WEBHOOK_TOKEN: string;
  AHA_API_KEY: string;
};

const envConfig: GlobalEnvConfig = {
  AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID ?? '',
  AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY ?? '',
  AWS_KEY_REGION: process.env.AWS_KEY_REGION ?? 'us-east-2',
  DB_ENV: (process.env.DB_ENV ?? 'dev') as Environments,
  MONGODB_URI: process.env.MONGODB_URI ?? '',
  IPDATA_API_KEY: process.env.IPDATA_API_KEY ?? '',
  JIRA_USERNAME: process.env.JIRA_USERNAME ?? '',
  JIRA_PASSWORD: process.env.JIRA_PASSWORD ?? '',
  CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY ?? '',
  CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN ?? '',
  CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT ?? '',
  SLACK_QUOKKA_OAUTH_ACCESS_TOKEN: process.env.SLACK_QUOKKA_OAUTH_ACCESS_TOKEN ?? '',
  CONTENTSTACK_WEBHOOK_TOKEN: process.env.CONTENTSTACK_WEBHOOK_TOKEN ?? '',
  AHA_API_KEY: process.env.AHA_API_KEY ?? '',
};

export default envConfig;
