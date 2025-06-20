import { pageIdentity } from "./pageIdentity";
import { DatabaseConnection } from "./DatabaseConnection";
import {
  MakeMongoDbDatabaseConnectionParams,
  makeMongoDbDatabaseConnection,
} from "./MongoDbDatabaseConnection";
import {
  DeletePagesArgs,
  LoadPagesArgs,
  PageStore,
  PersistedPage,
} from "./Page";
import { Filter, Document } from "mongodb";

export type MongoDbPageStore = DatabaseConnection &
  // We omit loadPages so that the generic override below works
  Omit<PageStore, "loadPages"> & {
    queryType: "mongodb";
    loadPage(
      args?: LoadPagesArgs<Filter<PersistedPage>>
    ): Promise<PersistedPage | null>;
    loadPages(
      args?: LoadPagesArgs<Filter<PersistedPage>>
    ): Promise<PersistedPage[]>;
    aggregatePages<T extends Document = Document>(
      pipeline: Document[]
    ): Promise<T[]>;
    getMissingPagesByUrl(args: {
      expectedUrls: string[];
      urlTransformer?: (url: string) => string;
    }): Promise<string[]>;
    metadata: {
      databaseName: string;
      collectionName: string;
    };
    init(): Promise<void>;
  };

export type MakeMongoDbPageStoreParams = MakeMongoDbDatabaseConnectionParams & {
  /**
    The name of the collection in the database that stores {@link PersistedPage} documents.
    @default "pages"
   */
  collectionName?: string;
};

/**
  Data store for {@link Page} objects using MongoDB.
 */
export function makeMongoDbPageStore({
  connectionUri,
  databaseName,
  collectionName = "pages",
}: MakeMongoDbPageStoreParams): MongoDbPageStore {
  const { db, drop, close } = makeMongoDbDatabaseConnection({
    connectionUri,
    databaseName,
  });
  const pagesCollection = db.collection<PersistedPage>(collectionName);
  return {
    queryType: "mongodb",
    drop,
    close,
    metadata: {
      databaseName,
      collectionName,
    },
    async loadPage(args) {
      const filter: Filter<PersistedPage> = args
        ? createQueryFilterFromLoadPagesArgs(args)
        : {};
      return pagesCollection.findOne(filter);
    },
    async loadPages(args) {
      const filter: Filter<PersistedPage> = args
        ? createQueryFilterFromLoadPagesArgs(args)
        : {};
      return pagesCollection.find(filter).toArray();
    },
    async aggregatePages<T extends Document = Document>(
      pipeline: Document[]
    ): Promise<T[]> {
      return pagesCollection.aggregate<T>(pipeline).toArray();
    },
    async updatePages(pages) {
      await Promise.all(
        pages.map(async (page) => {
          const result = await pagesCollection.updateOne(
            pageIdentity(page),
            { $set: page },
            { upsert: true }
          );
          if (!result.acknowledged) {
            throw new Error(`update pages not acknowledged!`);
          }
          if (!result.modifiedCount && !result.upsertedCount) {
            throw new Error(
              `Page ${JSON.stringify(pageIdentity(page))} not updated!`
            );
          }
        })
      );
    },
    async deletePages({
      dataSources,
      permanent = false,
      inverse = false,
    }: DeletePagesArgs) {
      const filter = {
        ...(dataSources
          ? { sourceName: { [inverse ? "$nin" : "$in"]: dataSources } }
          : undefined),
      };
      if (permanent) {
        const result = await pagesCollection.deleteMany(filter);
        if (!result.acknowledged) {
          throw new Error(`Permanent-delete pages not acknowledged!`);
        }
      } else {
        const result = await pagesCollection.updateMany(filter, {
          $set: { action: "deleted" },
        });
        if (!result.acknowledged) {
          throw new Error(`Soft-delete pages not acknowledged!`);
        }
      }
    },
    async getMissingPagesByUrl(args: {
      expectedUrls: string[];
      urlTransformer?: (url: string) => string;
    }) {
      const results = await Promise.all(
        args.expectedUrls.map(async (url) => {
          const page = await this.loadPage({
            query: {
              url: {
                $regex: new RegExp(
                  args.urlTransformer ? args.urlTransformer(url) : url
                ),
              },
            },
          });
          return !page ? url : null;
        })
      );
      return results.filter((url) => url !== null) as string[];
    },
    async init() {
      await pagesCollection.createIndex({ url: 1 });
      await pagesCollection.createIndex({ sourceName: 1 });
    },
  };
}

function createQueryFilterFromLoadPagesArgs(args: LoadPagesArgs) {
  const { query, sources, updated, urls } = args;

  // We use $and to support custom queries along with the other filters.
  // The $and operator requires at least one element, so we add an empty
  // filter.
  const filter = {
    $and: [{} as Filter<PersistedPage>],
  } satisfies Filter<PersistedPage>;

  // Handle custom queries
  if (query !== undefined) {
    if (typeof query === "object" && query !== null) {
      filter["$and"].push(query);
    } else {
      throw new Error(
        `Invalid query - MongoDbPageStore expects a MongoDB query filter. Instead, got: ${query}`
      );
    }
  }

  // Handle other query filters
  if (updated !== undefined) {
    filter["$and"][0].updated = { $gte: updated };
  }
  if (urls !== undefined) {
    filter["$and"][0].url = { $in: urls };
  }
  if (sources !== undefined) {
    filter["$and"][0].sourceName = { $in: sources };
  }

  return filter;
}
