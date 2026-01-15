type XOR<T, U> =
  | (T & { [K in keyof U]?: never })
  | (U & { [K in keyof T]?: never });

type Versions = XOR<{ includes: string[] }, { excludes: string[] }>;

export type TocItem =
  | ExternalTocItem
  | InternalTocItem
  | CollapsibleTocItem
  | GroupTocItem
  | SubNavTocItem;

type TocItemBase = {
  /**
    The title/label for the side nav item or static header. This may differ
    slightly from the on-page title for brevity/readability.
   */
  label: string;

  /**
    Optional variable that contains `includes` OR `excludes` array of versions.
    Versions in `includes` array will render this item. Versions in `excludes` array will not render this item.
    Only needed if current TocItem should not be in every single version of its content site.
   */
  versions?: Versions;

  /**
    Marks the TocItem as a collapsible drawer containing its child items.
    The `url` property of collapsible TocItems is optional.
   */
  collapsible?: boolean;

  /** 
    Defines what content directory the page lives in. This should match the
    "name" value in the snooty.toml file of the content directory.
   */
  contentSite?: DocSite;

  /**
    Marks the TocItem as a static heading - a plain text header for a group of child items.
   */
  group?: boolean;

  /**
    Indicates that the TocItem is an external link.
   */
  isExternal?: boolean;

  /**
    An array of child TocItems. The collapsible and group properties determine
    how these children get rendered.
   */
  items?: TocItem[];

  /**
    If we want the sublist of items to be displayed with the isolated
    "drill-down" view.
   */
  showSubNav?: boolean;

  /**
    The URL linked to by the TocItemem. Not used for static headers.
    For versioned docs, include the :version variable for files that appear in multiple version directories.
   */
  url?: string;

  /**
    Enables version dropdown selector for TocItem and its children.
   */
  versionDropdown?: boolean;
};

/**
  Special type for L1 items that have items that are not collapsible or grouped.
  Not a part of the TocItem type system since users may only declare items without collapsible, group or showSubNav at the L1 level. 
 */
export type L1TocItem = TocItemBase & {
  contentSite: DocSite;
  url: string;
  versions?: never;
  collapsible?: never;
  group?: never;
  isExternal?: never;
  showSubNav?: never;
  versionDropdown?: never;
};

/**
  TocItem that links to an external page.
 */
export type ExternalTocItem = TocItemBase & {
  collapsible?: never;
  contentSite?: never;
  group?: never;
  isExternal: true;
  items?: never;
  showSubNav?: never;
  url: string;
  versionDropdown?: never;
};

/**
  TocItem that links to an internal page. Most common type of TocItem.
 */
export type InternalTocItem = TocItemBase & {
  collapsible?: never;
  contentSite: DocSite;
  group?: never;
  isExternal?: never;
  items?: never;
  showSubNav?: never;
  url: string;
  versionDropdown?: never;
};

/**
  TocItem that is a collapsible drawer for its child items.
 */
export type CollapsibleTocItem = TocItemBase & {
  collapsible: true;
  group?: never;
  isExternal?: never;
  items: TocItem[];
  showSubNav?: never;
  versionDropdown?: never;
};

/**
  TocItem that is a static heading for a group of child items.
 */
export type GroupTocItem = TocItemBase & {
  collapsible?: never;
  group: true;
  isExternal?: never;
  items: TocItem[];
  showSubNav?: never;
  url?: never;
};

/**
  TocItem that is a sublist of items displayed with the isolated "drill-down" view.
 */
export type SubNavTocItem = TocItemBase & {
  collapsible?: never;
  contentSite: DocSite;
  showSubNav: true;
  group?: never;
  isExternal?: never;
  items: TocItem[];
  url: string;
  versions?: never;
};

/**
  Type for TocItems that have their content site inherited from the parent item.
  This is used in inheritContentSite to avoid repeating the content site in each item.
 */
export type InheritedTocItem =
  | ExternalTocItem
  | (Omit<CollapsibleTocItem, 'items'> & {
      items: InheritedTocItem[];
    })
  | (Omit<GroupTocItem, 'items'> & {
      items: InheritedTocItem[];
    })
  | (Omit<InternalTocItem, 'contentSite' | 'items'> & {
      contentSite?: DocSite;
      items?: InheritedTocItem[];
    })
  | (Omit<SubNavTocItem, 'contentSite' | 'items' | 'showSubNav'> & {
      contentSite?: DocSite;
      items: InheritedTocItem[];
    });

/**
  Helper function to inherit the content site of a TocItem so content site is not repeated in each item.
 */
export const inheritContentSite = (
  contentSite: DocSite,
  items: InheritedTocItem[],
): TocItem[] =>
  items.map((item): TocItem => {
    if (item.isExternal) {
      return item;
    }
    return {
      contentSite,
      ...item,
      items: item.items
        ? inheritContentSite(contentSite, item.items)
        : undefined,
    } as TocItem;
  });

/**
  Helper function to uninherit the content site of a TocItem so content site is not repeated in each item.
  To be used within inheritContentSite.
 */
export const uninherit = <T extends TocItem | TocItem[]>(items: T) => items;

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
  | "voyageai"
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
