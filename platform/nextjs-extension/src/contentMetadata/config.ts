// TODO: roll in other related "config" stuff once populate-metadata is deprecated
import { createHash } from 'crypto';
import type {
  Environments,
  SnootyDBName,
} from '../util/databaseConnection/types';
import type { ConfigEnvironmentVariables } from '../util/configEnvironment';
import type { StaticEnvVars } from '../util/assertDbEnvVars';
import { determineEnvironment, getDbNames } from '../handleEnvs';

//Returns appropriate Marian URL (Search Server URL) for the current build environment
const getMarianURL = (
  buildEnvironment: Environments,
  dbEnvVars: StaticEnvVars,
) => {
  if (buildEnvironment === 'stg' || buildEnvironment === 'dotcomstg')
    return dbEnvVars.MARIAN_STAGING_URL;
  return dbEnvVars.MARIAN_URL;
};

const setDbNames = (
  buildEnvironment: Environments,
  configEnvironment: ConfigEnvironmentVariables,
) => {
  // Get the name of the database associated with given build environment
  const { snootyDb } = getDbNames(buildEnvironment);

  // Check if a value for the database name has been set as an environment variable through Netlify UI
  // Allows overwriting of the database name for testing
  configEnvironment.SNOOTY_DB_NAME =
    (process.env.SNOOTY_DB_NAME as SnootyDBName) ?? snootyDb;
  //Set SNOOTY_DB_NAME as an env var so it can be accessed by persistence module within same build event handler
  //TODO: remove with DOP-5485
  process.env.SNOOTY_DB_NAME = configEnvironment.SNOOTY_DB_NAME;
};

export const updateConfig = async ({
  configEnvironment,
  dbEnvVars,
}: {
  configEnvironment: ConfigEnvironmentVariables;
  dbEnvVars: StaticEnvVars;
}) => {
  // Determine which environment the build will run in
  const buildEnvironment = determineEnvironment();
  configEnvironment.ENV = buildEnvironment;

  const rawBranch = process.env.HEAD ?? '';
  const sanitized = rawBranch.replace(/[^a-zA-Z0-9-_]/g, '-');
  // Netlify blob store names must be ≤ 64 bytes; branch stores are named
  // `{branch}-mdx-content` (12 chars). Cap well under 64 — truncating to the
  // exact limit has still produced BlobsInternalError 400s on long branches.
  const STORE_NAME_SUFFIX = '-mdx-content';
  const MAX_STORE_NAME_LENGTH = 56;
  const MAX_BRANCH_LENGTH = MAX_STORE_NAME_LENGTH - STORE_NAME_SUFFIX.length; // 44
  const HASH_SUFFIX_LENGTH = 9; // '-' + 8 hex chars
  const sanitizedBranch =
    sanitized.length <= MAX_BRANCH_LENGTH
      ? sanitized
      : `${sanitized.slice(0, MAX_BRANCH_LENGTH - HASH_SUFFIX_LENGTH)}-${createHash('sha256').update(rawBranch).digest('hex').slice(0, 8)}`;
  // Set branch name as env var so Next.js can access it at build & runtime
  configEnvironment.NEXT_PUBLIC_GIT_BRANCH = sanitizedBranch;

  setDbNames(buildEnvironment, configEnvironment);

  process.env.NEXT_PUBLIC_MARIAN_URL = getMarianURL(
    buildEnvironment,
    dbEnvVars,
  );

  logImportantValues(configEnvironment);
};

export const logImportantValues = (
  configEnvironment: ConfigEnvironmentVariables,
) => {
  console.info(
    'BUILD ENVIRONMENT: ',
    configEnvironment.ENV,
    '\n SNOOTY DB NAME: ',
    configEnvironment.SNOOTY_DB_NAME,
  );
  console.log(
    '======================================================================',
  );
};
