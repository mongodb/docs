// Service that holds responsibility for initializing and exposing mdb interfaces.
// Also exports helper functions for common operations (insert, upsert one by _id, etc.)
// When adding helpers here, ask yourself if the helper will be used by more than one service
// If no, the helper should be implemented in that service, not here

import * as mongodb from 'mongodb';
import type { ObjectId, Db, Document } from 'mongodb';
import { db as poolDb } from './pool/index';

// We should only ever have one client active at a time.
const ATLAS_URL = `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@${process.env.MONGO_ATLAS_CLUSTER0_HOST}/?retryWrites=true&w=majority&maxPoolSize=20`;
const client = new mongodb.MongoClient(ATLAS_URL);

export const teardown = async () => {
  await client.close();
  dbInstance = null;
};

// Initialize and export our pool connection
// Try to limit access to pool as much as possible - we mostly want it for just repo_branches.
export const pool = async () => {
  return poolDb(client);
};

// cached db object, so we can handle initial connection process once if unitialized
let dbInstance: Db | null = null;
// Handles memoization of db object, and initial connection logic if needs to be initialized
export const db = async () => {
  if (!dbInstance) {
    try {
      await client.connect();
      dbInstance = client.db(process.env.SNOOTY_DB_NAME);
    } catch (error) {
      console.error(`Error at db client connection: ${error}`);
      throw error;
    }
  }
  return dbInstance;
};

// all docs should be inserted with the buildId for the run.
export const insert = async (
  docs: object[],
  collection: string,
  buildId: ObjectId,
  printTime = false,
) => {
  const timerLabel = `insert - ${collection} - ${buildId?.toString()}`;
  if (printTime) console.time(timerLabel);
  const insertSession = await db();
  try {
    return insertSession.collection(collection).insertMany(
      docs.map((d) => ({
        ...d,
        build_id: buildId,
        created_at: new Date(),
      })),
      { ordered: false },
    );
  } catch (error) {
    console.error(`Error at insertion time for ${collection}: ${error}`);
    throw error;
  } finally {
    if (printTime) console.timeEnd(timerLabel);
  }
};

export const bulkWrite = async (
  operations: mongodb.AnyBulkWriteOperation[],
  collection: string,
) => {
  const dbSession = await db();
  try {
    if (!operations || !operations.length) {
      return;
    }
    return dbSession
      .collection(collection)
      .bulkWrite(operations, { ordered: false });
  } catch (error) {
    console.error(`Error at bulk write time for ${collection}: ${error}`);
    throw error;
  }
};

// Upsert wrapper, requires an _id field.
export const bulkUpsertAll = async (items: Document[], collection: string) => {
  const operations: mongodb.AnyBulkWriteOperation[] = [];

  for (const item of items) {
    const op = {
      updateOne: {
        filter: { _id: item._id },
        update: { $set: item },
        upsert: true,
      },
    };
    operations.push(op);
  }
  return bulkWrite(operations, collection);
};

export const deleteDocuments = async (_ids: ObjectId[], collection: string) => {
  const deleteSession = await db();
  try {
    const query = {
      _id: { $in: _ids },
    };
    const res = await deleteSession.collection(collection).deleteMany(query);
    console.log(`Deleted ${res.deletedCount} documents in ${collection}`);
    return res;
  } catch (error) {
    console.error(`Error at delete time for ${collection}: ${error}`);
    throw error;
  }
};
