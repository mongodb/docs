import type { ASTNode, PageTemplateType, Root, TextNode, TocTreeEntry } from './ast';

type AppData = {
  page: {
    ast: Root;
    facets: PageFacet[];
  };
  pageImage?: {
    images: ImageRelativePaths;
  } | null;
};

type ImageRelativePaths = { relativePath: string }[];

type PageFacet = {
  category: string;
  value: string;
  display_name: string;
  sub_facets: PageFacet[] | null;
};

type EOLType = 'download' | 'link';

type BranchData = {
  gitBranchName: string;
  active: boolean;
  urlSlug: string;
  urlAliases?: string[] | null;
  versionSelectorLabel: string;
  offlineUrl: string;
  noIndexing: boolean;
  eol_type?: EOLType;
};

interface Docset {
  prefix: {
    dotcomprd: string;
    dotcomstg: string;
    prd: string;
    stg: string;
  };
  url: {
    dev: string;
    dotcomprd: string;
    dotcomstg: string;
    prd: string;
    stg: string;
    regression: string;
  };
  displayName?: string;
  project: string;
  branches: BranchData[];
  hasEolVersions?: boolean;
  repoName: string;
  search?: { categoryTitle: string; categoryName?: string };
  internalOnly: boolean;
  prodDeployable: boolean;
  groups: Group[] | null;
  bucket: {
    dev: string;
    dotcomprd: string;
    dotcomstg: string;
    prd: string;
    stg: string;
    regression: string;
  };
}

type Group = {
  id?: string;
  groupLabel: string;
  includedBranches: string[];
  sharedSlugPrefix?: string;
};

type MetadataDatabaseName =
  | 'snooty_stage'
  | 'snooty_prod'
  | 'snooty_dotcomstg'
  | 'snooty_dotcomprd'
  | 'snooty_dev';
type ReposDatabaseName = 'pool' | 'pool_test';

type SiteMetadata = {
  commitHash: string;
  database: MetadataDatabaseName;
  parserBranch: string;
  parserUser: string;
  patchId: string;
  pathPrefix: string;
  project: string;
  reposDatabase: ReposDatabaseName;
  siteUrl: string;
  snootyBranch: string;
  snootyEnv: SnootyEnv;
  user: string;
};

type SnootyEnv =
  | 'dotcomprd'
  | 'production'
  | 'dotcomstg'
  | 'staging'
  | 'development';

type RemoteMetadata = {
  project: string;
  branch: string;
  title: string;
  eol: boolean;
  slugToTitle: Record<string, [TextNode]>;
  slugToBreadcrumbLabel?: Record<string, string>;
  toctree: TocTreeEntry;
  toctreeOrder: string[];
  parentPaths: Record<string, BreadcrumbType[]>;
  static_files: Record<string, Buffer>;
  canonical?: string | null;
  iatree?: IAOption;
  openapi_pages?: Record<string, OpenApiPage>;
  associated_products?: AssociatedProduct[];
  multiPageTutorials?: Record<string, MultiPageTutorial>;
  chapters?: MetadataChapters;
  guides?: MetadataGuides;
};

type SlugToTitle = RemoteMetadata['slugToTitle'];
type SlugToBreadcrumbLabel = RemoteMetadata['slugToBreadcrumbLabel'];

type BreadcrumbType = {
  title: string;
  path: string;
};

type MultiPageTutorial = {
  slugs: string[];
  total_steps: number;
};

type OpenApiPage = {
  source_type: string;
  source: string;
  api_version?: string | null;
  resource_versions?: string[] | null;
};

type AssociatedProduct = {
  name: string;
  versions: string[];
};

type PageContext = {
  title: string;
  slug: string;
  template: PageTemplateType;
  isAssociatedProduct: boolean;
  repoBranches: {
    siteBasePrefix: string;
    branches: Docset['branches'];
    groups?: Docset['groups'];
  };
  parentPaths: Record<string, string[]>;
  chapters?: MetadataChapters;
  guides?: MetadataGuides;
  // TODO: Need to specify
  associatedReposInfo?: object;
};

type PageContextRepoBranches = PageContext['repoBranches'];

type MetadataChapters = Record<string, MetadataChapter>;

type MetadataChapter = {
  id: string;
  chapter_number: number;
  description: string;
  guides: string[];
  icon: string;
};

type MetadataGuides = Record<string, MetadataGuide>;

type MetadataGuide = {
  chapter_name?: string;
  completion_time?: number;
  description: string | ASTNode[];
  title: string | ASTNode[];
};

type FacetBase = {
  id: string;
  key: string;
  name: string;
  checked?: boolean;
};

interface FacetOption extends FacetBase {
  type: 'facet-option';
  options: Array<FacetValue>;
}

interface FacetValue extends FacetBase {
  type: 'facet-value';
  facets: Array<FacetOption>;
}

interface IAOption {
  title: [TextNode];
  slug?: string;
  url?: string;
  id?: string;
  linked_data?: IALinkedData[];
  children?: IAOption[];
}

interface IALinkedData {
  headline: string;
  url: string;
  icon: string;
  'icon-alt': string;
  'icon-dark'?: string;
  checksum: string;
  width: string;
  height: string;
}

export type {
  AppData,
  BranchData,
  BreadcrumbType,
  Docset,
  EOLType,
  FacetOption,
  FacetValue,
  Group,
  IALinkedData,
  IAOption,
  ImageRelativePaths,
  MetadataChapter,
  MetadataChapters,
  MetadataGuide,
  MetadataGuides,
  MetadataDatabaseName,
  MultiPageTutorial,
  PageContext,
  PageContextRepoBranches,
  RemoteMetadata,
  ReposDatabaseName,
  SiteMetadata,
  SlugToBreadcrumbLabel,
  SlugToTitle,
  SnootyEnv,
};
