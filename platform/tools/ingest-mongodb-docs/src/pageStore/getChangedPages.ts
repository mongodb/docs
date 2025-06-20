import deepEqual from "deep-equal";
import { logger } from "../logger";
import { PersistedPage, Page } from "./Page";

/**
  Given sets of old and new pages, returns the pages that need to be created,
  updated, or deleted.
 */
export const getChangedPages = async ({
  oldPages: oldPagesIn,
  newPages: newPagesIn,
  sourceName,
}: {
  // Need to know the 'action' of the old pages in order to restore in case of
  // prior deletion
  oldPages: Omit<PersistedPage, "updated">[];
  newPages: Page[];
  sourceName?: string;
}): Promise<{
  deleted: PersistedPage[];
  created: PersistedPage[];
  updated: PersistedPage[];
}> => {
  const oldPages = new Map(oldPagesIn.map((page) => [page.url, page]));
  const newPages = new Map(newPagesIn.map((page) => [page.url, page]));

  logger.info(
    `After de-duplication based on page URL, there are ${oldPages.size} pages currently in the store and ${newPages.size} pages from the data source ${sourceName} to be processed.`
  );

  // Perform set difference to find deleted, created, and changed pages.
  logger.info(
    `Comparing pages currently in the store against pages from the data source ${sourceName} to determine which pages need to be created, updated, or deleted...`
  );
  // deleted = elements in old but not in new
  const deleted = [...oldPages]
    .filter(([url, { action }]) => {
      if (action === "deleted") {
        // If already marked deleted in the old set, no need to delete again
        return false;
      }
      // If it does not exist in the new set, it was deleted
      return !newPages.has(url);
    })
    .map(
      ([, page]): PersistedPage => ({
        ...page,
        updated: new Date(),
        action: "deleted",
      })
    );

  // created = elements in new but not in old
  const created = [...newPages]
    .filter(([url]) => {
      const oldPage = oldPages.get(url);
      if (oldPage === undefined) {
        return true;
      }
      // Was it formerly deleted? If so, restore
      return oldPage.action === "deleted";
    })
    .map(
      ([, page]): PersistedPage => ({
        ...page,
        updated: new Date(),
        action: "created",
      })
    );

  // updated = elements in both old and new (that have the same url, but different content)
  const updated = [...newPages]
    .filter(([url, page]) => {
      const oldPage = oldPages.get(url);
      if (!oldPage) {
        return false;
      }
      // Filter out pages that haven't changed
      return !deepEqual(
        comparablePartialPage(oldPage),
        comparablePartialPage(page)
      );
    })
    .map(
      ([, page]): PersistedPage => ({
        ...page,
        updated: new Date(),
        action: "updated",
      })
    );

  return { deleted, created, updated };
};

/**
  Create a page object with any fields irrelevant to comparison stripped out.
 */
const comparablePartialPage = ({
  url,
  sourceName,
  body,
  format,
  metadata,
}: Page): Partial<Page> => ({
  url,
  sourceName,
  body,
  format,
  metadata,
});
