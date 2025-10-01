import { matchEmbeddedDocument } from '../../../examples/crud/read/match-embedded-document.js';
import { loadSampleData } from '../../../examples/crud/read/match-embedded-document.js';
import { MongoClient } from 'mongodb';

describe('Example tests: show output printed to the console and return a value', () => {
  let client;

  beforeAll(async () => {
    //load sample data
    const insertedDocsCount = await loadSampleData();
    const expectedInsertedDocsCount = 5;
    expect(insertedDocsCount).toEqual(expectedInsertedDocsCount);
  });

  it('Should return `1` as the count of matching documents', async () => {
    const matchedDocCount = await matchEmbeddedDocument();
    const expectedMatchedDocsCount = 1;
    expect(matchedDocCount).toEqual(expectedMatchedDocsCount);
  });

  afterAll(async () => {
    // dropping the database after all tests are over
    const uri = process.env.CONNECTION_STRING;
    const client = new MongoClient(uri);
    const database = client.db('exampleDatabase');
    await database.dropDatabase();
    await client.close();
  });
});
