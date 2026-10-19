import type { ObjectId } from 'mongodb';
export const MONGODB_ORG = 'mongodb';
export const FRONTEND_SITE_NAME = 'snooty';
export const PARSER_SITE_NAME = 'snooty-parser';

export const FrontendEnvironments: Record<Environments, string> = {
  stg: 'staging',
  prd: 'production',
  dotcomstg: 'dotcomstg',
  dotcomprd: 'dotcomprd',
};

const environments = ['stg', 'prd', 'dotcomstg', 'dotcomprd'];

export type Environments = 'stg' | 'prd' | 'dotcomstg' | 'dotcomprd';

export function isBuildEnvironment(obj: unknown): obj is Environments {
  if (!obj || typeof obj !== 'string') return false;
  return environments.indexOf(obj) !== -1;
}

/** Connection info for the cluster zero database */
export type ClusterZeroConnectionInfo = {
  clusterZeroURI: string;
  databaseName: ClusterZeroDBName;
  collectionName: string;
  extensionName: string;
};

/** Connection info for the search database */
export type SearchClusterConnectionInfo = {
  searchURI: string;
  databaseName: SearchDBName;
  collectionName: string;
  extensionName: string;
};

export type SearchDocument = {
  url: string;
  slug: string;
  lastModified: Date;
  manifestRevisionId: string;
  searchProperty: Array<string>;
  includeInGlobalSearch: boolean;
};

export type ProjectsDocument = {
  name: string;
  owner: string;
  baseUrl: string;
  github: {
    organization: OrganizationName;
    repo: string;
  };
  jira: {
    component: string;
  };
};

export type OrganizationName = 'mongodb' | '10gen';

export type SearchDBName = 'search' | 'search-test' | 'search-staging';


export type MetadataDBName = 'docs_metadata';

export type SnootyDBName =
  | 'test'
  | 'snooty_dev'
  | 'snooty_prod'
  | 'snooty_dotcomstg'
  | 'snooty_dotcomprd';

export type ClusterZeroDBName = MetadataDBName | SnootyDBName;
