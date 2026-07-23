import { parseBooleanEnv } from './utils/parse-boolean-env';

export const REF_TARGETS = {
  'compass-index': 'https://www.mongodb.com/docs/compass/current/#compass-index',
  'document-dot-notation': 'https://www.mongodb.com/docs/manual/core/document/#document-dot-notation',
  glossary: 'https://www.mongodb.com/docs/manual/reference/glossary',
  'install-rhel-configure-selinux':
    'https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-red-hat/#install-rhel-configure-selinux',
  manual: 'https://www.mongodb.com/docs/manual',
  'mongodb-uri': 'https://www.mongodb.com/docs/manual/reference/connection-string/#mongodb-uri',
  'mongodb-supported-platforms': 'https://www.mongodb.com/docs/manual/installation/#mongodb-supported-platforms',
  'schema-validation-json': 'https://www.mongodb.com/docs/manual/core/schema-validation/#schema-validation-json',
  'write-op-insert-behavior': 'https://www.mongodb.com/docs/manual/tutorial/insert-documents/#insert-behavior',
  'configuration-options': 'https://www.mongodb.com/docs/manual/reference/configuration-options/#configuration-options',
};

export const MARIAN_URL = process.env.NEXT_PUBLIC_MARIAN_URL || 'https://docs-search-transport.mongodb.com/';

export const DATA_TOC_NODE = 'tocnode';

export const DOTCOM_BASE_URL = !parseBooleanEnv(process.env.NEXT_PUBLIC_IS_PROD)
  ? 'https://mongodbcom-cdn.staging.corp.mongodb.com'
  : 'https://www.mongodb.com';
export const DOTCOM_BASE_PREFIX = `docs`;
export const ASSET_PREFIX = '/docs/docs_static_nextjs';

export const ICONS_BASE_URL = `https://webimages.mongodb.com/_com_assets/icons/`;

// Append "docs" to the beginning of SIDE_NAV_CONTAINER_ID due to differentiate from LG's internal side-nav-container testid
export const SIDE_NAV_CONTAINER_ID = 'docs-side-nav-container';
export const TEMPLATE_CONTAINER_ID = 'template-container';

export const CONTENT_MAX_WIDTH = 1200;

export const INTERNAL_IMAGE_API_PATH = '/docs/images/';
// Online: a static file under _next/static/images (copied there by
// copy-images-to-next-static.ts), referenced via the asset prefix so it rides
// the /docs/docs_static_nextjs/_next/* rewrite + b2k strip and stays out of the
// /docs/* soft-redirect path — no optimizer. Offline (static export) has no
// _next server, so use /docs/images/... which build-offline relativizes. Leading
// slash stripped to avoid a double slash when projectPath is empty (landing page).
export const ONLINE_IMAGE_PREFIX = `${ASSET_PREFIX}/_next/static/images/`;
