export interface BreadCrumb {
  path: string;
  title: string;
}

export interface TocItem {
  label: string;
  url?: string;
  newUrl?: string;
  group?: boolean;
  contentSite?: string;
  collapsible?: boolean;
  breadcrumbs?: BreadCrumb[];
  showSubNav?: boolean;
  isExternal?: boolean;
  versionDropdown?: boolean;
  versions?: {
    includes?: string[];
    excludes?: string[];
  };
  items?: TocItem[];
}
