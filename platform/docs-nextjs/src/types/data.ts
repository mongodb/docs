import type { ASTNode, Root, TextNode, TocTreeEntry } from './ast';
import type { Docset, EOLType, Group, Version } from 'versioning';

/**
 * The docset version data is the source of truth for sites and versions. These
 * types are re-exported so app code can keep importing from '@/types/data'.
 */

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

export type PageFacet = {
  category: string;
  value: string;
  display_name: string;
  sub_facets: PageFacet[] | null;
};

type MetadataDatabaseName = 'snooty_stage' | 'snooty_prod' | 'snooty_dotcomstg' | 'snooty_dotcomprd' | 'snooty_dev';

type SiteMetadata = {
  commitHash: string;
  database: MetadataDatabaseName;
  parserBranch: string;
  parserUser: string;
  patchId: string;
  pathPrefix: string;
  project: string;
  siteUrl: string;
  snootyBranch: string;
  snootyEnv: SnootyEnv;
  user: string;
};

type SnootyEnv = 'dotcomprd' | 'production' | 'dotcomstg' | 'staging' | 'development';

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
  static_files: Record<string, string>;
  canonical?: string | null;
  iatree?: IAOption;
  openapi_pages?: Record<string, OpenApiPage>;
  associated_products?: AssociatedProduct[];
  multiPageTutorials?: Record<string, MultiPageTutorial>;
  chapters?: MetadataChapters;
  guides?: MetadataGuides;
  composablePages?: Record<string, Array<Record<string, string>>>;
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

type Viewport = {
  scrollY: number;
  scrollX: number;
  width?: number;
  height?: number;
};

export type {
  AppData,
  BreadcrumbType,
  Docset,
  EOLType,
  FacetOption,
  FacetValue,
  Group,
  IALinkedData,
  IAOption,
  MetadataChapter,
  MetadataChapters,
  MetadataGuide,
  MetadataGuides,
  MetadataDatabaseName,
  MultiPageTutorial,
  RemoteMetadata,
  SiteMetadata,
  SlugToBreadcrumbLabel,
  SlugToTitle,
  SnootyEnv,
  Version,
  Viewport,
};
