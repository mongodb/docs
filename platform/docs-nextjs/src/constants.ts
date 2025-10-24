import { parseBooleanEnv } from './utils/parse-boolean-env';

export const DOTCOM_BASE_URL = parseBooleanEnv(process.env.IS_PROD)
  ? 'https://www.mongodb.com'
  : 'https://mongodbcom-cdn.staging.corp.mongodb.com';
export const DOTCOM_BASE_PREFIX = `docs`;

export const SIDE_NAV_CONTAINER_ID = 'docs-side-nav-container';
export const TEMPLATE_CONTAINER_ID = 'template-container';
