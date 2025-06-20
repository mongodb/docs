import { PageFormat } from "./PageFormat";

/**
  Represents a page from a data source.
 */
export type Page = {
  url: string;

  /**
    A human-readable title.
   */
  title?: string;

  /**
    The text of the page.
   */
  body: string;

  /**
    The file format of the page. This format determines how the page
    should be chunked and vector-embedded.
   */
  format: PageFormat;

  /**
    Data source name.
   */
  sourceName: string;

  /**
    The version of the page. This is relevant for versioned docs.
    If the page is not versioned, this field should be undefined.
   */
  version?: {
    label: string;
    isCurrent: boolean;
  };

  /**
    Arbitrary metadata for page.
   */
  metadata?: PageMetadata;
};

export type PageMetadata = {
  /**
    Arbitrary tags.
   */
  tags?: string[];
  /**
    Page-level metadata. Should not be chunked.
   */
  page?: Record<string, unknown>;
  [k: string]: unknown;
};

export type PageAction = "created" | "updated" | "deleted";

/**
  Represents a {@link Page} stored in the database.
 */
export type PersistedPage = Page & {
  /**
    Last updated.
   */
  updated: Date;

  /**
    The action upon last update.
   */
  action: PageAction;
};

export type LoadPagesArgs<QueryShape = unknown> = {
  /**
    A custom query to refine the pages to load.
   */
  query?: QueryShape;

  /**
   The names of the sources to load pages from. If undefined, loads available
   pages from all sources.
  */
  sources?: string[];

  /**
   If specified, refines the query to load pages with an updated date later
   or equal to the given date.
  */
  updated?: Date;

  /**
   If specified, refines the query to only load pages where the url
   is included in the list.
  */
  urls?: string[];
};

export type DeletePagesArgs = {
  /**
    The names of the sources to delete pages from.
    */
  dataSources?: string[];
  /**
    Permanently remove pages from the data store,
    rather than marking them as `"deleted"`.
   */
  permanent?: boolean;
  /**
   If true, delete pages that do NOT match the query.
   */
  inverse?: boolean;
};

/**
  Data store for {@link Page} objects.
 */
export type PageStore = {
  /**
    The format that the store uses for custom queries. If not specified,
    the store does not allow custom queries.
   */
  queryType?: "mongodb" | string;

  /**
    Loads pages from the Page store.
   */
  loadPages(args?: LoadPagesArgs): Promise<PersistedPage[]>;

  /**
    Updates or adds the given pages in the store.
   */
  updatePages(pages: PersistedPage[]): Promise<void>;

  /**
    Deletes pages from the store.
   */
  deletePages(args?: DeletePagesArgs): Promise<void>;

  /**
    Close connection to data store.
   */
  close?: () => Promise<void>;

  /**
    Initialize the store.
   */
  init?: () => Promise<void>;

  /**
    Additional implementation-specific metadata about the store. This metadata is
    not directly used by the store itself, but may be useful for testing,
    debugging, and logging.
   */
  metadata?: {
    [k: string]: unknown;
  };
};
