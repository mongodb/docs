export interface BreadCrumb {
  path: string;
  title: string;
}

export interface TocItemBase {
  label: string;
  url?: string;
  group?: boolean;
  collapsible?: boolean;
  breadcrumbs?: BreadCrumb[];
  versionDropdown?: boolean;
  showSubNav?: boolean;
  items?: TocItem[];
}

export type TocItem =
  | (TocItemBase & { isExternal: true; contentSite?: never })
  | (TocItemBase & { isExternal?: false; contentSite: DocSite });

export interface ActiveVersions {
  [project: string]: string;
}

export type DocSite =
  | "atlas-architecture"
  | "charts"
  | "atlas-cli"
  | "atlas-operator"
  | "bi-connector"
  | "c"
  | "cloud-docs"
  | "cloud-manager"
  | "cloudgov"
  | "cluster-sync"
  | "compass"
  | "cpp-driver"
  | "csharp"
  | "database-tools"
  | "datalake"
  | "django"
  | "drivers"
  | "entity-framework"
  | "golang"
  | "java"
  | "java-rs"
  | "docs-k8s-operator"
  | "kafka-connector"
  | "kotlin"
  | "kotlin-sync"
  | "laravel"
  | "mck"
  | "meta"
  | "mongocli"
  | "intellij"
  | "mcp-server"
  | "mongodb-shell"
  | "mongodb-analyzer"
  | "mongoid"
  | "node"
  | "ops-manager"
  | "php-library"
  | "pymongo-arrow"
  | "pymongo"
  | "ruby-driver"
  | "rust"
  | "scala"
  | "docs"
  | "guides"
  | "spark-connector"
  | "visual-studio-extension";

export default TocItem;
