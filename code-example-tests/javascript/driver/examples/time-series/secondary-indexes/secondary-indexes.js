import { Collection, MongoClient } from 'mongodb';

const uri =
  process.env.CONNECTION_STRING ||
  'Env variable not found. Verify you have a .env file with a valid connection string.';

const databaseName = 'timeseries';
const collectionName = 'sensorData';

let client;
let database;
let collection;

async function loadData() {
  // Close existing client if any to avoid connection leaks
  if (client) {
    await client.close();
  }
  client = new MongoClient(uri);
  await client.connect();
  database = client.db(databaseName);

  // :snippet-start: secondary-create-collection
  const createCollectionOptions = {
    timeseries: {
      timeField: 'timestamp',
      metaField: 'metadata',
    },
    expireAfterSeconds: 86400,
  };
  // :snippet-end:

  await database.createCollection(collectionName, createCollectionOptions);
  collection = database.collection(collectionName);

  // :snippet-start: secondary-data
  const sampleDocuments = [
    {
      // :snippet-start: secondary-data-schema
      metadata: {
        sensorId: 5578,
        type: 'omni',
        location: {
          type: 'Point',
          coordinates: [-77.40711, 39.03335],
        },
      },
      // :snippet-end:
      timestamp: new Date('2022-01-15T00:00:00.000Z'),
      currentConditions: {
        windDirection: 127.0,
        tempF: 71.0,
        windSpeed: 2.0,
        cloudCover: null,
        precip: 0.1,
        humidity: 94.0,
      },
    },
    {
      metadata: {
        sensorId: 5578,
        type: 'omni',
        location: {
          type: 'Point',
          coordinates: [-77.40711, 39.03335],
        },
      },
      timestamp: new Date('2022-01-15T00:01:00.000Z'),
      currentConditions: {
        windDirection: 128.0,
        tempF: 69.8,
        windSpeed: 2.2,
        cloudCover: null,
        precip: 0.1,
        humidity: 94.3,
      },
    },
    {
      metadata: {
        sensorId: 5579,
        type: 'omni',
        location: {
          type: 'Point',
          coordinates: [-80.19773, 25.77481],
        },
      },
      timestamp: new Date('2022-01-15T00:01:00.000Z'),
      currentConditions: {
        windDirection: 115.0,
        tempF: 88.0,
        windSpeed: 1.0,
        cloudCover: null,
        precip: 0.0,
        humidity: 99.0,
      },
    },
  ];
  // :snippet-end:

  await collection.insertMany(sampleDocuments);
}

export async function createAndUseSecondaryIndex() {
  await loadData();
  // :snippet-start: simple-in-example
  const filter = { 'metadata.type': { $in: ['temperature', 'pressure'] } };
  // :snippet-end:

  // :snippet-start: create-secondary-index
  await collection.createIndex({ timestamp: 1 });
  // :snippet-end:

  // :snippet-start: sort-with-secondary-index
  const matchStage = {
    $match: { timestamp: { $gte: new Date('2022-01-15T00:00:00.000Z') } },
  };
  const sortStage = { $sort: { timestamp: 1 } };

  const pipeline = [matchStage, sortStage];

  const result = await collection.aggregate(pipeline).toArray();
  // :snippet-end:

  // :snippet-start: sort-with-secondary-index-explain
  const explainResult = await database.command({
    explain: {
      aggregate: collectionName,
      pipeline: pipeline,
      cursor: {},
    },
    verbosity: 'executionStats',
  });
  // :snippet-end:

  return { result, explainResult };
}

export async function createAndUseCompoundIndexes() {
  // :snippet-start: last-point-indexes
  // Indexes on ``timeField`` descending are more performant because they
  // enable ``DISTINCT_SCAN`` optimizations.
  const indexes = [
    { key: { 'metadata.sensorId': 1, timestamp: 1 } },
    { key: { 'metadata.sensorId': 1, timestamp: -1 } },
    { key: { 'metadata.sensorId': -1, timestamp: 1 } },
    { key: { 'metadata.sensorId': -1, timestamp: -1 } },
  ];
  // :snippet-end:

  for (const index of indexes) {
    await collection.createIndex(index.key);
  }

  // :snippet-start: last-point-index-meta-up-time-down
  await collection.createIndex({ 'metadata.type': 1, timestamp: -1 });
  // :snippet-end:

  // :snippet-start: sort-and-group
  const pipeline = [
    { $sort: { 'metadata.sensorId': 1, timestamp: -1 } },
    {
      $group: {
        _id: '$metadata.sensorId',
        ts: { $first: '$timestamp' },
        temperatureF: { $first: '$currentConditions.tempF' },
      },
    },
  ];

  const result = await collection.aggregate(pipeline).toArray();
  // :snippet-end:

  // :snippet-start: sort-and-group-explain
  const explainResult = await database.command({
    explain: {
      aggregate: collectionName,
      pipeline: pipeline,
      cursor: {},
    },
    verbosity: 'executionStats',
  });
  // :snippet-end:

  // :snippet-start: hint
  const hintPipeline = [
    { $sort: { 'metadata.sensorId': 1, timestamp: -1 } },
    {
      $group: {
        _id: '$metadata.sensorId',
        ts: { $first: '$timestamp' },
        temperatureF: { $first: '$currentConditions.tempF' },
      },
    },
  ];

  const hintResult = await collection
    .aggregate(hintPipeline, {
      hint: { 'metadata.sensorId': 1, timestamp: -1 },
    })
    .toArray();
  // :snippet-end:

  return { result, explainResult, hintResult };
}

export async function createAndUseGeospatialIndex() {
  // :snippet-start: create-geospatial-index-location
  await collection.createIndex({ 'metadata.location': '2dsphere' });
  // :snippet-end:

  const pipeline = [
    {
      $geoNear: {
        near: { type: 'Point', coordinates: [-77.03653, 38.897676] },
        distanceField: 'distance',
        maxDistance: 5000000, // 5 million meters (5,000 km)
        spherical: true,
        key: 'metadata.location',
      },
    },
  ];
  const result = await collection.aggregate(pipeline).toArray();

  return result;
}

export async function cleanup() {
  await database?.dropCollection(collectionName);
  await client?.close();
}
