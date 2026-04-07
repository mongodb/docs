import { ObjectId } from 'mongodb';
import {
  bulkUpsertAll,
  db,
  insert,
  teardown,
} from '../../src/services/connector';

const mockConnect = jest.fn();
const mockDb = jest.fn();
const mockCollection = jest.fn();
const mockInsertMany = jest.fn();
const mockBulkWrite = jest.fn();
const mockClose = jest.fn();

// below is a "jest mock" of a mongodb client
// TODO: update this test module to work with MongoDB memory server
//       - create test db and verify connector's calls update memory server

jest.mock('mongodb', () => ({
  MongoClient: class MongoClient {
    constructor() {
      console.log('constructor');
    }
    connect() {
      return mockConnect();
    }
    async db(...args: unknown[]) {
      mockDb(...args);
      return this;
    }
    collection(collection: unknown) {
      mockCollection(collection);
      return this;
    }
    async insertMany() {
      return mockInsertMany();
    }
    async bulkWrite(...args: unknown[]) {
      return mockBulkWrite(...args);
    }
    close() {
      mockClose();
    }
  },
  ObjectId: jest.fn(() => 'mock-object-id'),
}));

describe('Connector module', () => {
  // mock process env. store original env and restore
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
    jest.restoreAllMocks();
  });

  describe('db', () => {
    test('calls client to connect with env variables and returns a mongoDB Db instance', async () => {
      try {
        const testEnv = {
          SNOOTY_DB_NAME: 'test-db-name',
          MONGO_ATLAS_USERNAME: 'user',
          MONGO_ATLAS_PASSWORD: 'password',
          MONGO_ATLAS_HOST: 'host',
        };
        process.env = {
          ...env,
          ...testEnv,
        };
        await db();
        expect(mockConnect).toHaveBeenCalled();
        expect(mockDb).toHaveBeenCalled();
        expect(mockDb).toHaveBeenCalledWith(testEnv.SNOOTY_DB_NAME);
      } catch (e) {
        console.error(e);
        throw e;
      }
    });

    test('returns an error if client fails', async () => {
      /**
       * Question for error catching:
       * why are they not catching in functions (ie. db, insert) when throwing mocked rejections
       * see connection/db line 32
       *
       */
      mockConnect.mockRejectedValueOnce(new Error('test error') as never);
      try {
        await db();
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect((e as Error).message).toEqual('test error');
      }
      mockConnect.mockReset();
    });

    test('safely sets new db instance if db instance is null', async () => {
      await teardown();
      await db();
      await teardown();
      const dbInstance2 = await db();
      expect(mockClose).toHaveBeenCalledTimes(2);
      expect(dbInstance2).toBeDefined();
      expect(mockConnect).toHaveBeenCalledTimes(2);
    });
  });

  describe('insert', () => {
    const docs = [
      {
        id: 1,
        name: 'doc',
      },
    ];
    const collection = 'metadata';
    const buildId = new ObjectId();
    test('it calls insert on collection specified, with docs argument', async () => {
      await insert(docs, collection, buildId);
      expect(mockCollection).toHaveBeenCalledWith(collection);
      expect(mockInsertMany).toHaveBeenCalled();
    });

    test('it throws error on collection or insertMany error', async () => {
      try {
        mockInsertMany.mockRejectedValueOnce(new Error('test error') as never);
        await insert(docs, collection, buildId);
      } catch (e) {
        expect((e as Error).message).toEqual('test error');
      }
    });
  });

  describe('bulkUpsert', () => {
    const payload = { _id: 'test-id', name: 'upsert-doc' };
    const collection = 'metadata';

    test('it calls on collection to update one with upsert option true', async () => {
      await bulkUpsertAll([payload], collection);
      expect(mockCollection).toHaveBeenCalledWith(collection);
      expect(mockBulkWrite).toHaveBeenCalledWith(
        [
          {
            updateOne: {
              filter: { _id: payload._id },
              update: { $set: payload },
              upsert: true,
            },
          },
        ],
        { ordered: false },
      );
    });

    test('it throws error on bulkWrite error', async () => {
      mockBulkWrite.mockRejectedValueOnce(new Error('test error') as never);
      try {
        await bulkUpsertAll([payload], collection);
      } catch (e) {
        expect((e as Error).message).toEqual('test error');
      }
    });

    test('it skips bulkwrite if operations are empty', async () => {
      mockBulkWrite.mockReset();
      await bulkUpsertAll([], collection);
      expect(mockBulkWrite).toHaveBeenCalledTimes(0);
    });
  });
});
