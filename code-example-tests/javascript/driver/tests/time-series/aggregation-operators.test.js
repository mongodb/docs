import { loadMigrateSampleData } from '../../examples/time-series/migrate-with-aggregation/load-sample-data.js';
import {
  runAverageAggregation,
  runRollingAveragePipeline,
  cleanup as cleanupAggregationOperators,
} from '../../examples/time-series/aggregation-operators.js';

import { MongoClient } from 'mongodb';
import Expect from '../../utils/Expect.js';

describe('Aggregation operators tests', () => {
  let client;
  let db;

  beforeAll(async () => {
    const uri = process.env.CONNECTION_STRING;
    client = new MongoClient(uri);
    await client.connect();
  });

  afterAll(async () => {
    if (client) {
      db = client.db('timeseries_db');
      await db.dropDatabase();
      await client.close();
    }
    await cleanupAggregationOperators();
  });

  afterEach(async () => {
    const timeseriesDb = client.db('timeseries_db');
    await timeseriesDb.dropDatabase();
  });

  it('Should run an average aggregation and return matching document', async () => {
    await runAverageAggregation();
    const result = await runAverageAggregation();
    const outputFilepath = 'time-series/average-cost-pipeline-output.sh';
    Expect.that(result).shouldMatch(outputFilepath);
  });

  it('Should run a rolling average pipeline and return matching document', async () => {
    const result = await runRollingAveragePipeline();
    const outputFilepath = 'time-series/rolling-cost-pipeline-output.sh';
    Expect.that(result).withIgnoredFields('_id').shouldMatch(outputFilepath);
  });
});
