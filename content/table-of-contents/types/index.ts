export interface BreadCrumb {
  path: string;
  title: string;
}

type XOR<T, U> =
  | (T & { [K in keyof U]?: never })
  | (U & { [K in keyof T]?: never });

type Versions = XOR<{ includes: string[] }, { excludes: string[] }>;

export interface TocItemBase {
  label: string;
  url?: string;
  group?: boolean;
  collapsible?: boolean;
  breadcrumbs?: BreadCrumb[];
  versionDropdown?: boolean;
  showSubNav?: boolean;
  versions?: Versions;
  items?: TocItem[];
}

export type TocItem =
  | (TocItemBase & { isExternal: true; contentSite?: never })
  | (TocItemBase & { isExternal?: false; contentSite: DocSite });

export interface ActiveVersions {
  [project: string]: string;
}

export type DocSite =
  | 'atlas-architecture'
  | 'charts'
  | 'atlas-cli'
  | 'atlas-operator'
  | 'bi-connector'
  | 'c'
  | 'cloud-docs'
  | 'cloud-manager'
  | 'cloudgov'
  | 'mongosync'
  | 'compass'
  | 'cpp-driver'
  | 'csharp'
  | 'database-tools'
  | 'datalake'
  | 'django'
  | 'drivers'
  | 'entity-framework'
  | 'golang'
  | 'hibernate'
  | 'java'
  | 'java-rs'
  | 'docs-k8s-operator'
  | 'kafka-connector'
  | 'kotlin'
  | 'kotlin-sync'
  | 'landing'
  | 'laravel'
  | 'mck'
  | 'meta'
  | 'mongocli'
  | 'intellij'
  | 'mcp-server'
  | 'mongodb-shell'
  | 'mongodb-vscode'
  | 'mongoid'
  | 'node'
  | 'ops-manager'
  | 'php-library'
  | 'pymongo-arrow'
  | 'pymongo'
  | 'ruby-driver'
  | 'rust'
  | 'scala'
  | 'docs'
  | 'guides'
  | 'spark-connector'
  | 'atlas-charts'
  | 'docs-relational-migrator'
  | 'visual-studio-extension';

export default TocItem;
