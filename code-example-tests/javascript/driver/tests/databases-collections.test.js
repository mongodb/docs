import { accessDb } from '../examples/databases-collections.js';
import { accessCollection } from '../examples/databases-collections.js';
import { createCollection } from '../examples/databases-collections.js';
import { seeAllCollections } from '../examples/databases-collections.js';
import { seeAllCollectionNames } from '../examples/databases-collections.js';
import { deleteCollection } from '../examples/databases-collections.js';
import { deleteDatabase } from '../examples/databases-collections.js';
import { MongoClient } from 'mongodb';
import Expect from '../utils/Expect.js';

describe('Databases and Collections tests', () => {
  let client;

  beforeEach(async () => {
    // Seed collections so listCollections() returns expected data
    const uri = process.env.CONNECTION_STRING;
    client = new MongoClient(uri);
    await client.db('test_database').createCollection('example_collection');
    await client.db('test_database').createCollection('test_collection');
    await client.close();
  });

  afterEach(async () => {
    // Clean up the database after each test
    const uri = process.env.CONNECTION_STRING;
    client = new MongoClient(uri);
    const database = client.db('test_database');
    await database.dropDatabase();
    await client.close();
  });

  describe('Access a database', () => {
    it('Should return a database with the name "test_database"', async () => {
      const result = await accessDb();
      expect(result.databaseName).toBe('test_database');
    });
  });

  describe('Access a collection', () => {
    it('Should access a collection with the name "test_collection"', async () => {
      const result = await accessCollection();
      expect(result.collectionName).toBe('test_collection');
    });
  });

  describe('Create a collection', () => {
    it('Should create a collection with the name "example_collection"', async () => {
      const result = await createCollection();
      expect(result.collectionName).toBe('example_collection');
    });
  });

  describe('See all collections', () => {
    it('Should list all collections and match expected schema', async () => {
      const result = await seeAllCollections();
      const outputFilepath = 'databases-collections-list-coll-output.sh';
      Expect.that(result)
        .shouldResemble(outputFilepath)
        .withSchema({
          count: 2,
          requiredFields: ['name', 'type', 'options', 'info', 'idIndex'],
          fieldValues: {
            type: 'collection',
          },
        });
    });
  });

  describe('See all collection names', () => {
    it('Should list all collection names and match expected schema', async () => {
      const result = await seeAllCollectionNames();
      const outputFilepath = 'databases-collections-list-coll-names-output.sh';
      Expect.that(result)
        .shouldResemble(outputFilepath)
        .withSchema({
          count: 2,
          requiredFields: ['name', 'type'],
          fieldValues: {
            type: 'collection',
          },
        });
    });
  });

  describe('Delete a collection', () => {
    it('Should drop a collection without throwing an error', async () => {
      await expect(deleteCollection()).resolves.not.toThrow();
    });
  });

  describe('Delete a database', () => {
    it('Should drop a database without throwing an error', async () => {
      await expect(deleteDatabase()).resolves.not.toThrow();
    });
  });
});
