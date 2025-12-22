import { loadMigrateSampleData } from '../../examples/time-series/migrate-with-aggregation/load-sample-data.js';
import {
  runMigrationAggregation,
  queryNewTsCollection,
} from '../../examples/time-series/migrate-with-aggregation/run-aggregation.js';

import { MongoClient } from 'mongodb';
import Expect from '../../utils/Expect.js';

describe('Time series migrate with aggregation tests', () => {
  let client;

  beforeAll(async () => {
    const uri = process.env.CONNECTION_STRING;
    client = new MongoClient(uri);
    await client.connect();
  });

  afterAll(async () => {
    if (client) {
      await client.close();
    }
  });

  afterEach(async () => {
    const timeseriesDb = client.db('mydatabase');
    await timeseriesDb.dropDatabase();
  });

  it('Should migrate data to a time series collection with aggregation and return matching document', async () => {
    await loadMigrateSampleData();
    await runMigrationAggregation();
    const result = await queryNewTsCollection();
    const outputFilepath =
      'time-series/migrate-with-aggregation/find-one-output.sh';
    Expect.that(result).shouldMatch(outputFilepath);
  });
});
