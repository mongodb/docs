import {
  createCollection,
  queryCollectionFindOne,
  queryCollectionMetaField,
  queryCollectionTimeField,
  aggregateCollection,
  createCollectionBucketSettings,
} from '../../examples/time-series/create-query/create-query-collection.js';

import { MongoClient } from 'mongodb';
import Expect from '../../utils/Expect.js';

describe('Time series create and query tests', () => {
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

  beforeEach(async () => {
    const insertedDocCount = await createCollection();
    expect(insertedDocCount).toBe(8);
  });

  afterEach(async () => {
    const timeSeriesDB = client.db('timeseries');
    await timeSeriesDB.dropDatabase();
  });

  it('Should return the expected granularity settings after creating the collection', async () => {
    const timeSeriesDB = client.db('timeseries');
    const weather = timeSeriesDB.collection('weather');

    const actualSettings = await weather.options();

    const expectedSettings = {
      timeseries: {
        timeField: 'time',
        metaField: 'sensor',
        bucketMaxSpanSeconds: 2592000,
        granularity: 'hours',
      },
      expireAfterSeconds: 86400,
    };

    expect(actualSettings).toEqual(expectedSettings);
  });

  it('Should return the expected result from the time field query', async () => {
    const result = await queryCollectionTimeField();
    const outputFilepath =
      'time-series/create-query/create-query-time-field-output.sh';
    Expect.that(result).shouldMatch(outputFilepath);
  });

  it('Should return the expected result from the meta field query', async () => {
    const result = await queryCollectionMetaField();
    const outputFilepath =
      'time-series/create-query/create-query-meta-field-output.sh';
    Expect.that(result).shouldMatch(outputFilepath);
  });

  it('Should return the expected result from the find one query', async () => {
    const result = await queryCollectionFindOne();
    const outputFilepath =
      'time-series/create-query/create-query-find-one-output.sh';
    Expect.that(result).shouldMatch(outputFilepath);
  });

  it('Should return the expected documents from the aggregation query', async () => {
    const result = await aggregateCollection();
    const outputFilepath =
      'time-series/create-query/create-query-aggregate-document-output.sh';
    Expect.that(result).shouldMatch(outputFilepath);
  });

  it('Should return the expected bucket settings after creating the collection', async () => {
    await createCollectionBucketSettings();
    const timeSeriesDB = client.db('timeseries');
    const weatherBucket = timeSeriesDB.collection('weatherBucket');

    const actualSettings = await weatherBucket.options();

    const expectedSettings = {
      timeseries: {
        timeField: 'time',
        metaField: 'sensor',
        bucketMaxSpanSeconds: 3600,
        bucketRoundingSeconds: 3600,
      },
      expireAfterSeconds: 86400,
    };

    expect(actualSettings).toEqual(expectedSettings);
  });
});
