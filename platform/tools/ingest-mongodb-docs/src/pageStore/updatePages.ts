import { getChangedPages } from "./getChangedPages";
import { DataSource } from "../sources/DataSource";
import { PromisePool } from "@supercharge/promise-pool";
import { logger } from "../logger";
import { PageStore, Page } from "./Page";

export interface PageConcurrencyOptions {
  /**
    Number of data sources to process concurrently.
    */
  processDataSources?: number;
}

/**
  Fetches pages from data sources and stores those that have changed in the data
  store.
 */
export const updatePages = async ({
  sources,
  pageStore,
  concurrencyOptions,
}: {
  sources: DataSource[];
  pageStore: PageStore;
  concurrencyOptions?: PageConcurrencyOptions;
}): Promise<void> => {
  await PromisePool.withConcurrency(concurrencyOptions?.processDataSources ?? 1)
    .for(sources)
    .process(async (source) => {
      logger.info(`Fetching pages for ${source.name}`);
      const pages = await source.fetchPages();
      logger.info(`${source.name} returned ${pages.length} pages to process`);
      if (pages.length === 0) {
        // If a flaky data source returns no pages, we would mark all pages in
        // that source as deleted. This is probably not wanted.
        logger.warn(
          `Expected at least 1 page from ${source.name}. Discarding result.`
        );
      }
      await persistPages({
        pages,
        store: pageStore,
        sourceName: source.name,
      });
    });
};

/**
  Persists pages that have changed.
 */
export const persistPages = async ({
  store,
  pages,
  sourceName,
}: {
  store: PageStore;
  pages: Page[];
  sourceName: string;
}): Promise<void> => {
  const oldPages = await store.loadPages({ sources: [sourceName] });
  logger.info(`${sourceName} had ${oldPages.length} in the store already`);
  const { created, updated, deleted } = await getChangedPages({
    oldPages,
    newPages: pages,
    sourceName,
  });

  logger.info(
    `${sourceName}: ${deleted.length} deleted / ${created.length} created / ${updated.length} updated`
  );
  await store.updatePages([...deleted, ...created, ...updated]);
};
