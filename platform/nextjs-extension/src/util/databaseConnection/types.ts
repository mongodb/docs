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

export interface VersionedBuildObj {
  /** List of subdirectories that have a snooty.toml at their root.
  Should be named according to their urlSlug*/
  allContentPaths: Array<string>;
  /**  Content paths that have changed since last build */
  contentPathsToBuild: Array<string>;
}

/** Docsets document entry for a project */
export type DocsetsDocument = {
  project: string;
  bucket: string;
  url: string;
  prefix: string;
};

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

/** Entitlement document for a user */
// TODO: investigate whether this can be removed
export type EntitledDocument = {
  slackUsername: string;
  slackId: string;
};

// TODO: rename this to version entry
export type BranchEntry = {
  id?: ObjectId;
  name?: string;
  gitBranchName: string;
  active: boolean;
  isStableBranch: boolean;
  urlSlug: string;
  publishOriginalBranchName: boolean;
  urlAliases: Array<string>;
  eol_type?: 'download' | 'link';
};

/** Repos branches entry for a project */
export type ReposBranchesDocument = {
  _id?: ObjectId;
  repoName: string;
  project: string;
  search?: {
    categoryTitle: string;
    categoryName?: string;
  };
  branches: Array<BranchEntry>;
  prodDeployable: boolean;
  internalOnly: boolean;
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

export type OASFilesDocument = {
  api: string;
  fileContent: string;
  gitHash: string;
  versions: Record<string, Array<string>>;
  lastUpdated: Date;
};

export type OASFilePartial = Pick<OASFilesDocument, 'gitHash' | 'versions'>;

export type DocumentsDocument = {
  page_id: string;
  filename: string;
  ast: Ast;
  source: string;
  static_assets: Array<StaticAsset>;
  github_username: string;
  facets?: Array<Facet>;
  build_id: ObjectId;
  created_at: Date;
};

export type BuildTelemetryDocument = {
  created_at: Date;
  versionsObj: VersionedBuildObj;
  environment: Environments;
  project_name: string;
  branch_name: string;
  deploy_id: string;
  commit_ref: string;
  parse_and_persist_duration_ms: number | undefined;
  frontend_build_duration_ms: number | undefined;
  total_duration_ms: number;
  start_ms: number;
  end_ms: number;
  status: 'Success' | 'Error';
};

export type Facet = {
  category: string;
  value: string;
  sub_facets: Array<Facet>;
  display_name: string;
};

type StaticAsset = {
  checksum: string;
  key: string;
  updated_at?: Date;
};

type Ast = {
  type: string;
  position: Record<string, Record<string, number>>;
  children: Array<Ast>;
  fileid: string;
  options: {
    headings?: Array<AstHeadings>;
  };
};

type AstHeadings = {
  depth: number;
  id: string;
  title: Array<Record<string, string>>;
  // biome-ignore: <Most selector_id fields appear to be nullish>
  selector_ids: unknown;
};

export type OrganizationName = 'mongodb' | '10gen';

export type SearchDBName = 'search' | 'search-test' | 'search-staging';

export type PoolDBName = 'pool' | 'pool_test';

export type MetadataDBName = 'docs_metadata';

export type SnootyDBName =
  | 'test'
  | 'snooty_dev'
  | 'snooty_prod'
  | 'snooty_dotcomstg'
  | 'snooty_dotcomprd';

export type ClusterZeroDBName = PoolDBName | MetadataDBName | SnootyDBName;
