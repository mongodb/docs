import { MongoClient } from "mongodb";

/**
  The ingest meta has information about ingest runs so that the script can
  resume from a known successful run date.

  If the 'since' date given to the embed command is too late, pages that were
  updated during a failed run will not be picked up.

  If too early, more pages and embeddings will be checked than necessary. The
  embed command will not unnecessarily create new embeddings for page updates
  that it has already created embeddings for, but it would still be wasteful to
  have to check potentially all pages and embeddings when the date is early
  enough. 
 */
export type IngestMetaStore = {
  /**
    The ID of the specific metadata document this store is associated with.
    Generally there should be only one document per ingest_meta collection per
    database.
   */
  readonly entryId: string;

  /**
    Returns the last successful run date for the store's entry.
   */
  loadLastSuccessfulRunDate(): Promise<Date | null>;

  /**
    Sets the store's entry to the current date.
   */
  updateLastSuccessfulRunDate(): Promise<void>;

  /**
    Closes the connection. Must be called when done.
   */
  close(): Promise<void>;
};

export type IngestMetaEntry = {
  _id: string;
  lastIngestDate: Date;
};

/**
  Creates a connection to ingest meta collection.
 */
export const makeIngestMetaStore = ({
  connectionUri,
  databaseName,
  entryId,
}: {
  connectionUri: string;
  databaseName: string;
  entryId: string;
}): IngestMetaStore => {
  const client = new MongoClient(connectionUri);
  const collection = client
    .db(databaseName)
    .collection<IngestMetaEntry>("ingest_meta");
  return {
    entryId,

    async close() {
      await client.close();
    },
    async loadLastSuccessfulRunDate() {
      return (
        (await collection.findOne({ _id: entryId }))?.lastIngestDate ?? null
      );
    },
    async updateLastSuccessfulRunDate() {
      await collection.updateOne(
        {
          _id: entryId,
        },
        {
          $set: {
            _id: entryId,
            lastIngestDate: new Date(),
          },
        },
        { upsert: true }
      );
    },
  };
};
