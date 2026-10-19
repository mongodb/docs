import type AdmZip from 'adm-zip';
import { BSON } from 'mongodb';
import isEqual from 'fast-deep-equal';
import type { AnyBulkWriteOperation, FindCursor, ObjectId } from 'mongodb';
import { bulkWrite, db, insert } from '../connector/index';
import { join } from 'node:path';

interface StaticAsset {
  checksum: string;
  key: string;
}

interface UpdatedAsset extends StaticAsset {
  updated_at?: Date;
}

interface PageAst {
  [key: string]: unknown;
}

interface Facet {
  category: string;
  value: string;
  display_name: string;
  sub_facets?: Facet[] | null;
}

export interface Page {
  page_id: string;
  filename: string;
  ast: PageAst;
  static_assets: UpdatedAsset[];
  facets?: Facet[];
  page_path?: string;
  pr_id?: number; // PR ID if this is a PR build
}

export interface UpdatedPage extends Page {
  created_at: Date;
  updated_at: Date;
  deleted: boolean;
}

interface PreviousPageMapping {
  [key: string]: {
    ast: PageAst;
    static_assets: StaticAsset[];
    facets?: Facet[];
  };
}

const COLLECTION_NAME = 'documents';
const UPDATED_AST_COLL_NAME = 'updated_documents';

// Service responsible for memoization of page level documents.
// Any extraneous logic performed on page level documents as part of upload should be added here
// or within subfolders of this module
const pagesFromZip = (zip: AdmZip): Page[] => {
  const zipPages = zip.getEntries();
  return zipPages
    .filter((entry) => entry.entryName?.startsWith('documents/'))
    .map((entry) => {
      const document = BSON.deserialize(entry.getData()) as Page;
      return document;
    });
};

/**
 * Finds the page documents for a given Snooty project + branch + user combination.
 * If this is the first build for the Snooty project + branch + user, no documents
 * will be found.
 *
 * @param pageIdPrefix - Includes the Snooty project name, user (docsworker-xlarge), and branch
 * @param collection - The collection to perform the find query on
 */
const findPrevPageDocs = async (pageIdPrefix: string, collection: string) => {
  const dbSession = await db();
  const findQuery = {
    page_id: { $regex: new RegExp(`^${pageIdPrefix}/`) },
    deleted: false,
  };
  const projection = {
    _id: 0,
    page_id: 1,
    ast: 1,
    static_assets: 1,
    facets: 1,
  };

  try {
    return dbSession
      .collection<UpdatedPage>(collection)
      .find(findQuery)
      .project(projection);
  } catch (error) {
    console.error(
      `Error trying to find previous page documents using prefix ${pageIdPrefix} in ${collection}}: ${error}`,
    );
    throw error;
  }
};

const getPagePath = (
  pageId: string,
  project: string,
  prefix: string,
  branchName: string,
): string => {
  const BUILDER_NAME = 'docsworker-xlarge';

  let builderNameRemoved = false;
  let branchNameRemoved = false;

  const pathParts = pageId.split('/').reduce(
    (res, part, index, arr) => {
      // Remove project from start since prefix already contains
      if (index === 0 && part === project) {
        return res;
      }

      // Remove main and preprd from page path
      if (['main', 'preprd'].includes(part) && res.length === 1) {
        return res;
      }

      // Remove 'index' from index.txt page path
      if (index === arr.length - 1 && part === 'index') {
        return res;
      }

      // Remove the builder name from the page path
      if (part === BUILDER_NAME && !builderNameRemoved) {
        builderNameRemoved = true;
        return res;
      }
      // remove branch name from page_path
      // separating content instead by pr_id attribute, not page_path
      if (part === branchName && !branchNameRemoved) {
        branchNameRemoved = true;
        return res;
      }
      res.push(part);
      return res;
    },
    [prefix],
  );

  // Lowercase page_path for findability by Nextjs frontend
  return join(...pathParts).toLowerCase();
};

const constructPages = (
  zip: AdmZip,
  project: string,
  prefix: string,
  branchName: string,
  prId?: number,
): Page[] => {
  return pagesFromZip(zip).map((page: Page) => {
    // TEMPORARY FIX FOR NETLIFY BUILDS
    // TODO: DOP-5405 remove parser user from page id altogether
    page.page_id = page.page_id.replace('buildbot', 'docsworker-xlarge');

    page.page_path = getPagePath(page.page_id, project, prefix, branchName);
    if (prId) {
      page.pr_id = prId;
    }
    return page;
  });
};

const createPageAstMapping = async (docsCursor: FindCursor) => {
  // Create mapping for page id and its AST
  const mapping: PreviousPageMapping = {};
  // Create set of all page ids. To be used for tracking unseen pages in the current build
  const pageIds = new Set<string>();
  for await (const doc of docsCursor) {
    mapping[doc.page_id] = {
      ast: doc.ast,
      static_assets: doc.static_assets,
      facets: doc.facets,
    };
    pageIds.add(doc.page_id);
  }
  return { mapping, pageIds };
};

class UpdatedPagesManager {
  currentPages: Page[];
  operations: AnyBulkWriteOperation[];
  prevPageDocsMapping: PreviousPageMapping;
  prevPageIds: Set<string>;
  updateTime: Date;
  buildId: ObjectId;

  constructor(
    prevPageDocsMapping: PreviousPageMapping,
    prevPagesIds: Set<string>,
    pages: Page[],
    buildId: ObjectId,
  ) {
    this.currentPages = pages;
    this.operations = [];
    this.prevPageDocsMapping = prevPageDocsMapping;
    this.prevPageIds = prevPagesIds;
    this.buildId = buildId;

    this.updateTime = new Date();
    this.checkForPageDiffs();
    this.markUnseenPagesAsDeleted();
  }

  /**
   * Compares the ASTs of the current pages with the previous pages. New update
   * operations are added whenever a diff in the page ASTs is found. Page IDs are
   * removed from `prevPageIds` to signal that the previous page has been "seen"
   */
  checkForPageDiffs() {
    for (const page of this.currentPages) {
      // Filter out rst (non-page) files
      if (!page.filename.endsWith('.txt')) {
        return;
      }

      const currentPageId = page.page_id;
      this.prevPageIds.delete(currentPageId);
      const prevPageData = this.prevPageDocsMapping[currentPageId];

      // Update the document if page's current AST is different from previous build's.
      // New pages should always count as having a "different" AST
      if (
        !isEqual(page.ast, prevPageData?.ast) ||
        !isEqual(page.facets, prevPageData?.facets)
      ) {
        const operation = {
          updateOne: {
            filter: { page_id: currentPageId },
            update: {
              $set: {
                page_id: currentPageId,
                filename: page.filename,
                ast: page.ast,
                static_assets: this.findUpdatedAssets(
                  page.static_assets,
                  prevPageData?.static_assets,
                ),
                updated_at: this.updateTime,
                deleted: false,
                // Track the last build ID to update the content
                build_id: this.buildId,
                facets: page.facets,
              },
              $setOnInsert: {
                created_at: this.updateTime,
              },
            },
            upsert: true,
          },
        };
        this.operations.push(operation);
      }
    }
  }

  /**
   * Identifies any changes in assets between the current page and its previous page.
   * A new array of static assets with their last update time is returned.
   *
   * The Snooty Data API will take into account an asset's `updated_at` field to
   * compare with timestamps that it receives on requests for updated pages. When
   * the API sends an updated page, an updated page's asset will only be sent if that asset's
   * timestamp is greater than the timestamp sent in the request (denoting a change).
   * Unchanged assets with older timestamps will not be sent.
   *
   * Assets that are deleted between builds are not included since the Snooty Data API
   * will not need to return it for now.
   *
   * @param currentPageAssets
   * @param prevPageAssets
   */
  findUpdatedAssets(
    currentPageAssets: StaticAsset[],
    prevPageAssets?: UpdatedAsset[],
  ) {
    const updatedAssets: UpdatedAsset[] = [];
    if (
      currentPageAssets &&
      currentPageAssets.length === 0 &&
      prevPageAssets &&
      prevPageAssets.length === 0
    ) {
      return updatedAssets;
    }

    const prevAssetMapping: Record<string, { key: string; updated_at: Date }> =
      {};
    if (prevPageAssets) {
      for (const asset of prevPageAssets) {
        prevAssetMapping[asset.checksum] = {
          key: asset.key,
          updated_at: asset.updated_at ?? this.updateTime,
        };
      }
    }

    for (const { checksum, key } of currentPageAssets) {
      const prevAsset = prevAssetMapping[checksum];
      // Edge case: check to ensure previous asset exists with the same checksum,
      // but different key/filename. This can happen if an image is renamed
      const isSame = prevAsset && prevAsset.key === key;
      // Most common case: no change in asset; we keep the updated time the same
      const timeOfUpdate = isSame ? prevAsset.updated_at : this.updateTime;
      updatedAssets.push({
        checksum,
        key,
        updated_at: timeOfUpdate,
      });
    }

    return updatedAssets;
  }

  /**
   * Marks any pages from the previous build that were not used as "deleted"
   */
  markUnseenPagesAsDeleted() {
    for (const unseenPageId of this.prevPageIds) {
      const operation = {
        updateOne: {
          filter: { page_id: unseenPageId },
          update: {
            $set: {
              deleted: true,
              updated_at: this.updateTime,
              build_id: this.buildId,
            },
          },
        },
      };
      this.operations.push(operation);
    }
  }

  getOperations() {
    return this.operations;
  }
}

/**
 * Upserts pages in separate collection. Copies of a page are created by page_id.
 * Updated pages within the same Snooty project name + branch should only update
 * related page documents.
 *
 * @param pages
 * @param collection
 */
const updatePages = async (
  pages: Page[],
  collection: string,
  buildId: ObjectId,
) => {
  if (pages.length === 0) {
    return;
  }

  const timerLabel = `page document updates - ${buildId}`;
  console.time(timerLabel);

  try {
    // Find all pages that share the same project name + branch. Expects page IDs
    // to include these two properties after parse
    const pageIdPrefix = pages[0].page_id.split('/').slice(0, 3).join('/');
    const previousPagesCursor = await findPrevPageDocs(
      pageIdPrefix,
      collection,
    );
    const { mapping: prevPageDocsMapping, pageIds: prevPageIds } =
      await createPageAstMapping(previousPagesCursor);

    const diffsTimerLabel = `finding page differences - ${buildId}`;
    console.time(diffsTimerLabel);
    const updatedPagesManager = new UpdatedPagesManager(
      prevPageDocsMapping,
      prevPageIds,
      pages,
      buildId,
    );
    const operations = updatedPagesManager.getOperations();
    console.timeEnd(diffsTimerLabel);

    if (operations.length > 0) {
      const bulkWriteTimerLabel = `page document update writes - ${buildId}`;
      console.time(bulkWriteTimerLabel);

      try {
        await bulkWrite(operations, collection);
      } finally {
        console.timeEnd(bulkWriteTimerLabel);
      }
    }
  } catch (error) {
    console.error(`Error when trying to update pages: ${error}`);
    throw error;
  } finally {
    console.timeEnd(timerLabel);
  }
};

export const insertAndUpdatePages = async (
  buildId: ObjectId,
  zip: AdmZip,
  project: string,
  prefix: string,
  branchName: string, // preprd, main, or branch name
  prId?: number,
) => {
  try {
    const pages = constructPages(zip, project, prefix, branchName, prId);

    const ops: PromiseLike<unknown>[] = [
      insert(pages, COLLECTION_NAME, buildId, true),
    ];

    const featureEnabled = process.env.FEATURE_FLAG_UPDATE_PAGES;
    if (featureEnabled && featureEnabled.toUpperCase() === 'TRUE') {
      ops.push(updatePages(pages, UPDATED_AST_COLL_NAME, buildId));
    }

    return Promise.all(ops);
  } catch (error) {
    console.error(`Error at insertion time for ${COLLECTION_NAME}: ${error}`);
    throw error;
  }
};

export const _updatePages = updatePages;
