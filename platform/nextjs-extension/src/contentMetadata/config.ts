// TODO: roll in other related "config" stuff once populate-metadata is deprecated
import type {
  Environments,
  PoolDBName,
  SnootyDBName,
  SearchDBName,
} from '../util/databaseConnection/types';
import { FrontendEnvironments } from '../util/databaseConnection/types';
import type { ConfigEnvironmentVariables } from '../util/extension';
import type { StaticEnvVars } from '../util/assertDbEnvVars';
import {
  determineEnvironment,
  getDbNames,
  isLocalDevelopment,
} from '../handleEnvs';

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
  // Get the names of the databases associated with given build environment
  const { snootyDb, searchDb, poolDb } = getDbNames(buildEnvironment);

  // Check if values for the database names have been set as environment variables through Netlify UI
  // Allows overwriting of database name values for testing
  configEnvironment.POOL_DB_NAME =
    (process.env.POOL_DB_NAME as PoolDBName) ?? poolDb;

  configEnvironment.SEARCH_DB_NAME =
    (process.env.SEARCH_DB_NAME as SearchDBName) ?? searchDb;

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

  configEnvironment.CACHED_COMMIT_REF = process.env.CACHED_COMMIT_REF;
  configEnvironment.DEPLOY_ID = process.env.DEPLOY_ID;
  configEnvironment.REVIEW_ID = process.env.REVIEW_ID;
  configEnvironment.REPOSITORY_URL = process.env.REPOSITORY_URL;
  const sanitizedBranch = (process.env.HEAD ?? '').replace(/\//g, '-');
  configEnvironment.BRANCH = sanitizedBranch;
  // Set branch name as env var so Next.js can access it at build & runtime
  configEnvironment.NEXT_PUBLIC_GIT_BRANCH = sanitizedBranch;
  configEnvironment.IS_LOCAL_DEVELOPMENT = isLocalDevelopment();

  setDbNames(buildEnvironment, configEnvironment);

  // TODO: remove snooty_env once completely transitioned to next js
  // Set process.env SNOOTY_ENV and PREFIX_PATH environment variables for frontend to retrieve at build time
  process.env.SNOOTY_ENV =
    FrontendEnvironments[buildEnvironment as Environments];
  console.log(
    'Frontend is being built with the following build environment:',
    process.env.SNOOTY_ENV,
  );

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
    '\n POOL DB NAME: ',
    configEnvironment.POOL_DB_NAME,
    '\n SEARCH DB NAME: ',
    configEnvironment.SEARCH_DB_NAME,
  );
  console.log(
    '======================================================================',
  );
};
