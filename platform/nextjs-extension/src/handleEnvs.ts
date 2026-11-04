import {
  type Environments,
  isBuildEnvironment,
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

/** Get the name of the database associated with given build environment */
export const getDbNames = (env: Environments): { snootyDb: SnootyDBName } => {
  switch (env) {
    case 'dotcomstg':
      return { snootyDb: 'snooty_dotcomstg' };

    case 'prd':
      return { snootyDb: 'snooty_prod' };

    case 'dotcomprd':
      return { snootyDb: 'snooty_dotcomprd' };

    // Default to 'stg' database
    default:
      return { snootyDb: 'snooty_dev' };
  }
};
