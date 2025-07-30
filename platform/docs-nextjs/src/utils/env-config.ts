const ENVIRONMENT_VALUES = [
  "production",
  "dotcomprd",
  "dotcomstg",
  "dev",
] as const;

export type Environments = (typeof ENVIRONMENT_VALUES)[number];

const REQUIRED_ENV_VARS = ["MONGODB_URI"];

/**
 * Validates the environment configuration.
 * Throws an error if any required environment variables are missing or if DB_ENV is invalid.
 */
const validateEnvConfigs = () => {
  const missingVars = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
  const dbEnv = process.env.DB_ENV;
  if (dbEnv && !ENVIRONMENT_VALUES.includes(dbEnv as Environments)) {
    throw new Error(
      `Invalid DB_ENV value: ${dbEnv}. Must be one of: ${ENVIRONMENT_VALUES.join(
        ", "
      )}`
    );
  }
};

validateEnvConfigs();

type GlobalEnvConfig = {
  DB_ENV: Environments;
  MONGODB_URI: string;
};

const envConfig: GlobalEnvConfig = {
  DB_ENV: (process.env.DB_ENV ?? "dev") as Environments,
  MONGODB_URI: process.env.MONGODB_URI ?? "",
};

export default envConfig;
