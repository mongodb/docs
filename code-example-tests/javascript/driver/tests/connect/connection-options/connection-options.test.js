import { runConnTimeOutOptions } from '../../../examples/connect/connection-options/connection-options.js';
import { runConnMaxTimeMSOption } from '../../../examples/connect/connection-options/connection-options.js';
import { chainMaxTimeMSToCursor } from '../../../examples/connect/connection-options/connection-options.js';
import { MongoClient } from 'mongodb';
import Expect from '../../../utils/Expect.js';

describe('Connection Options tests', () => {
  let client;

  afterEach(async () => {
    const uri = process.env.CONNECTION_STRING;
    client = new MongoClient(uri);
    const database = client.db('sample_db');
    await database.dropDatabase();
    await client.close();
  });

  describe('Set optional connection timeout options', () => {
    it('Should create a client with connectTimeoutMS and socketTimeoutMS options', async () => {
      // Verify the function runs without throwing an unexpected error
      await expect(runConnTimeOutOptions()).resolves.not.toThrow();
    });
  });

  describe('Set maxTimeMS option', () => {
    it('Should call distinct with maxTimeMS set to 50', async () => {
      await client.connect();
      await client
        .db('sample_db')
        .collection('sample_coll')
        .insertOne({ 'my-key': 'value1' });
      await client.close();

      await expect(runConnMaxTimeMSOption()).resolves.toEqual(['value1']);
    });
  });

  describe('Chain maxTimeMS to cursor operation', () => {
    it('Should chain maxTimeMS to a find cursor operation', async () => {
      await client.connect();
      await client
        .db('sample_db')
        .collection('sample_coll')
        .insertMany([{ name: 'a' }, { name: 'b' }, { name: 'c' }]);
      await client.close();

      const results = await chainMaxTimeMSToCursor();
      expect(results).toEqual(
        expect.arrayContaining([expect.objectContaining({ name: 'a' })])
      );
    });
  });
});
