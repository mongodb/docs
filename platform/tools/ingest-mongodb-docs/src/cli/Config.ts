import { PageStore } from "../pageStore/Page";
import { PageConcurrencyOptions } from "../pageStore/updatePages";
import { DataSource } from "../sources/DataSource";
import { IngestMetaStore } from "./IngestMetaStore";

/**
  The configuration for ingest.

  You can provide your own configuration to the ingest tool.

  Every property is a function that constructs an instance (synchronously or
  asynchronously). This allows you to run logic for construction or build async.
  It also avoids unnecessary construction and cleanup if that field of the
  config is overridden by a subsequent config.
 */
export type Config = {
  /**
    The store that holds pages downloaded from data sources.
   */
  pageStore: Constructor<PageStore>;

  ingestMetaStore: Constructor<IngestMetaStore>;

  /**
    The data sources that you want ingest to pull content from.
   */
  dataSources: Constructor<DataSource[]>;

  /**
    Options for concurrency.
   */
  concurrencyOptions?: Constructor<ConcurrencyOptions>;
};

/**
    Options for concurrency. 
    Set the number of concurrent promises to execute for the given tasks.
    If not specified, tasks will be run sequentially.
   */
export interface ConcurrencyOptions {
  /**
    Options for concurrency when ingesting
    with the `pages` command.
   */
  pages?: PageConcurrencyOptions;
}

export type Constructor<T> = (() => T) | (() => Promise<T>);
