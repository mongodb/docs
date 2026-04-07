import type { Db, ObjectId } from 'mongodb';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoMemoryServerStates } from 'mongodb-memory-server-core/lib/MongoMemoryServer';

import metadata from '../data/metadata.json';
import repoBranches from '../data/repos_branches.json';
import docsets from '../data/docsets.json';

const COLLECTIONS = ['queue', 'entitlements'];

export class TestDBManager {
  public db!: Db;
  public client!: MongoClient;
  protected server: MongoMemoryServer;

  constructor() {
    jest.setTimeout(60000);
    this.server = new MongoMemoryServer({
      instance: {
        dbName: 'jest',
      },
      binary: {
        version: '6.0.6',
      },
    });
    process.env.POOL_DB_NAME = 'jest';
    process.env.JOB_QUEUE_COL_NAME = 'queue';
    process.env.USER_ENTITLEMENT_COL_NAME = 'entitlements';
    process.env.DOCSETS_COL_NAME = 'docsets';
  }

  async start() {
    if (
      this.server.state === MongoMemoryServerStates.stopped ||
      this.server.state === MongoMemoryServerStates.new
    ) {
      await this.server.start();
    }
    const url = this.server.getUri();
    process.env.MONGO_ATLAS_URL = url;
    this.client = new MongoClient(url);
    await this.client.connect();
    this.db = this.client.db(process.env.POOL_DB_NAME);
    await this.db.createCollection(process.env.JOB_QUEUE_COL_NAME ?? 'queue');
    await this.db.createCollection(
      process.env.USER_ENTITLEMENT_COL_NAME ?? 'entitlements',
    );
    await this.db.createCollection(process.env.DOCSETS_COL_NAME ?? 'docsets');
  }

  async stop() {
    await this.client.close();
    await this.server.stop();
  }

  async cleanup() {
    return await Promise.all(
      COLLECTIONS.map((c) => this.db.collection(c).deleteMany({})),
    );
  }

  async insertDocument(
    document: Document,
    collection: string,
  ): Promise<ObjectId> {
    const resp = await this.db.collection(collection).insertOne(document);
    return resp.insertedId;
  }

  async findJob(id: ObjectId): Promise<unknown> {
    const query = { _id: id };
    return await this.db
      .collection(process.env.JOB_QUEUE_COL_NAME ?? 'queue')
      .findOne(query);
  }
}

const dbManager = new TestDBManager();

/**
 * mocks a db with test data in ./data collection
 * designed to set up test modules with fresh db
 *
 * @returns [Db, MongoClient]
 */
export const setMockDB = async (): Promise<[Db, MongoClient]> => {
  try {
    await dbManager.start();

    await dbManager.db
      .collection('repos_branches')
      .insertMany(repoBranches as unknown[] as Document[]);
    await dbManager.db
      .collection('docsets')
      .insertMany(docsets as unknown[] as Document[]);
    await dbManager.db
      .collection('metadata')
      .insertMany(metadata as unknown[] as Document[]);
    return [dbManager.db, dbManager.client];
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/**
 * Deletes all test data in all collections in documents and closes db connection
 */
export const closeDb = async () => {
  await dbManager.cleanup();
  await dbManager.stop();
};
