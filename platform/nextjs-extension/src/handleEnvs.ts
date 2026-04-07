import {
  type Environments,
  isBuildEnvironment,
  type PoolDBName,
  type SearchDBName,
  type SnootyDBName,
  FRONTEND_SITE_NAME,
} from './util/databaseConnection/types';

export const isLocalDevelopment = () => {
  return !!process.env.NETLIFY_LOCAL;
};

/** Determine which environment the build will run in
 * @returns The environment the build will run in: stg, prd, dotcomstg, dotcomprd
 */
export const determineEnvironment = (): Environments => {
  // Should have environment set as an env var in netlify.toml file already. If so, use it
  if (isBuildEnvironment(process.env.ENV)) {
    return process.env.ENV as Environments;
  }
  // If not, try to determine the environment programmatically
  // Check if this was a build triggered by a frontend change or a content repo change
  const siteName = process.env.REPOSITORY_URL?.split('/')?.pop() as string;
  const isFrontendBuild = FRONTEND_SITE_NAME.includes(siteName);
  if (isFrontendBuild || isLocalDevelopment()) {
    return 'stg';
  }
  return 'prd';
};

/** Get the names of the databases associated with given build environment */
export const getDbNames = (
  env: Environments,
): { snootyDb: SnootyDBName; searchDb: SearchDBName; poolDb: PoolDBName } => {
  switch (env) {
    case 'dotcomstg':
      return {
        snootyDb: 'snooty_dotcomstg',
        searchDb: 'search-staging',
        poolDb: 'pool_test',
      };

    case 'prd':
      return {
        snootyDb: 'snooty_prod',
        searchDb: 'search-test',
        poolDb: 'pool',
      };

    case 'dotcomprd':
      return {
        snootyDb: 'snooty_dotcomprd',
        searchDb: 'search',
        poolDb: 'pool',
      };
    // Default to 'stg' databases
    default:
      return {
        snootyDb: 'snooty_dev',
        searchDb: 'search-test',
        poolDb: 'pool_test',
      };
  }
};
