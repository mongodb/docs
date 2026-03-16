import {
  loadSampleData,
  performUpdate,
  performUpsert,
} from '../../../examples/crud/write/update.js';
import { MongoClient } from 'mongodb';
import Expect from '../../../utils/Expect.js';

describe('Update operations tests', () => {
  let client;

  afterEach(async () => {
    // Clean up the database after each test
    const uri = process.env.CONNECTION_STRING;
    client = new MongoClient(uri);
    const database = client.db('myDB');
    await database.dropDatabase();
    await client.close();
  });

  describe('Regular update operation', () => {
    it('Should not modify any documents when no match is found', async () => {
      // Load sample data
      const insertedDocsCount = await loadSampleData();
      Expect.that(insertedDocsCount).shouldMatch(2);

      // Attempt to perform an update
      const result = await performUpdate();

      // Verify no documents were modified
      Expect.that(result.matchedCount).shouldMatch(0);
      Expect.that(result.modifiedCount).shouldMatch(0);
      Expect.that(result.upsertedCount).shouldMatch(0);
    });
  });

  describe('Upsert operation', () => {
    it('Should insert a new document when no match is found', async () => {
      // Load sample data
      const insertedDocsCount = await loadSampleData();
      Expect.that(insertedDocsCount).shouldMatch(2);

      // Perform upsert that inserts a new document
      const result = await performUpsert();

      // Verify a document was upserted
      Expect.that(result.matchedCount).shouldMatch(0);
      Expect.that(result.modifiedCount).shouldMatch(0);
      Expect.that(result.upsertedCount).shouldMatch(1);
    });
  });
});
