export type CollectionName =
  | 'repos_branches'
  | 'docsets'
  //Search dbs and Snooty dbs both contain collections referred to as 'documents'
  | 'documents'
  | 'entitled'
  | 'updated_documents'
  | 'projects'
  | 'metadata'
  | 'oas_files'
  | 'build_telemetry';

export type StaticEnvVars = {
  ATLAS_CLUSTER0_URI: string;
  ATLAS_SEARCH_URI: string;
  AWS_S3_ACCESS_KEY_ID: string;
  AWS_S3_SECRET_ACCESS_KEY: string;
  BUILD_TELEMETRY_COLLECTION: CollectionName;
  DOCSETS_COLLECTION: CollectionName;
  DOCUMENTS_COLLECTION: string;
  GATSBY_PARSER_USER: string;
  GIT_HASH_URL: string;
  GITHUB_BOT_PWD: string;
  GITHUB_BOT_USERNAME: string;
  METADATA_DB_NAME: string;
  OAS_FILES_COLLECTION: string;
  PROJECTS_COLLECTION: CollectionName;
  REDOC_CLI_VERSION: string;
  REPOS_BRANCHES_COLLECTION: CollectionName;
  SLACK_AUTH_TOKEN: string;
  SLACK_SIGNING_SECRET: string;
  S3_SEARCH_BUCKET: string;
  UPDATED_DOCUMENTS_COLLECTION: string;
  ENTITLED_COLLECTION: string;
  PARSER_VERSION: string;
  DOTCOMSTG_PARSER_VERSION: string;
  FRONTEND_VERSION: string;
  DOTCOMSTG_FRONTEND_VERSION: string;
  MARIAN_STAGING_URL: string;
  MARIAN_URL: string;
  GITHUB_REPO_OWNER: string;
  GITHUB_REPO_NAME: string;
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
    ATLAS_CLUSTER0_URI: `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@${process.env.MONGO_ATLAS_CLUSTER0_HOST}/?retryWrites=true&w=majority`,
    ATLAS_SEARCH_URI: `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@${process.env.MONGO_ATLAS_SEARCH_HOST}/?retryWrites=true&w=majority`,
    AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID as string,
    AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
    BUILD_TELEMETRY_COLLECTION:
      (process.env.BUILD_TELEMETRY_COLLECTION as CollectionName) ??
      'build_telemetry',
    DOCSETS_COLLECTION:
      (process.env.DOCSETS_COLLECTION as CollectionName) ?? 'docsets',
    DOCUMENTS_COLLECTION:
      (process.env.DOCUMENTS_COLLECTION as CollectionName) ?? 'documents',
    ENTITLED_COLLECTION:
      (process.env.ENTITLED_COLLECTION as CollectionName) ?? 'entitled',
    GATSBY_PARSER_USER: (process.env.PARSER_USER as string) ?? 'buildbot',
    GIT_HASH_URL:
      (process.env.GIT_HASH_URL as string) ??
      'https://cloud-dev.mongodb.com/version',
    METADATA_DB_NAME:
      (process.env.METADATA_DB_NAME as string) ?? 'docs_metadata',
    OAS_FILES_COLLECTION:
      (process.env.OAS_FILES_COLLECTION as string) ?? 'oas_files',
    PROJECTS_COLLECTION:
      (process.env.PROJECTS_COLLECTION as CollectionName) ?? 'projects',
    REDOC_CLI_VERSION: (process.env.REDOC_CLI_VERSION as string) ?? '1.2.3',
    REPOS_BRANCHES_COLLECTION:
      (process.env.REPOS_BRANCHES_COLLECTION as CollectionName) ??
      'repos_branches',
    SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET as string,
    SLACK_AUTH_TOKEN: process.env.SLACK_AUTH_TOKEN as string,
    S3_SEARCH_BUCKET:
      (process.env.S3_SEARCH_BUCKET as string) ?? 'docs-search-indexes-test',
    UPDATED_DOCUMENTS_COLLECTION:
      (process.env.UPDATED_DOCUMENTS as CollectionName) ?? 'updated_documents',
    PARSER_VERSION: process.env.PARSER_VERSION as string,
    DOTCOMSTG_PARSER_VERSION: process.env.DOTCOMSTG_PARSER_VERSION as string,
    FRONTEND_VERSION: process.env.FRONTEND_VERSION as string,
    DOTCOMSTG_FRONTEND_VERSION: process.env
      .DOTCOMSTG_FRONTEND_VERSION as string,
    MARIAN_STAGING_URL:
      (process.env.MARIAN_STAGING_URL as string) ??
      'https://docs-search-transport.docs.staging.corp.mongodb.com/',
    MARIAN_URL:
      (process.env.MARIAN_URL as string) ??
      'https://docs-search-transport.mongodb.com/',
    GITHUB_BOT_PWD: process.env.GITHUB_BOT_PWD as string,
    GITHUB_BOT_USERNAME: process.env.GITHUB_BOT_USERNAME as string,
    GITHUB_REPO_OWNER: '10gen',
    GITHUB_REPO_NAME: 'docs-mongodb-internal',
  }) as StaticEnvVars;

  return environmentVariables;
};
