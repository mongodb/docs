// :replace-start: {
//   "terms": {
//     "const insertManyResult = ": "",
//     "bucketSettings": "settings"
//   }
// }

import { MongoClient } from 'mongodb';

const uri = process.env.CONNECTION_STRING;

// :snippet-start: create-collection-settings
const settings = {
  timeseries: {
    timeField: 'time',
    metaField: 'sensor',
    granularity: 'hours', // 'seconds' | 'minutes' | 'hours'
  },
  expireAfterSeconds: 86400, // optional
};
// :snippet-end:

// :snippet-start: create-collection-bucket-settings
const bucketSettings = {
  timeseries: {
    timeField: 'time',
    metaField: 'sensor',
    bucketMaxSpanSeconds: 3600,
    bucketRoundingSeconds: 3600,
  },
  expireAfterSeconds: 86400, // optional
};
// :snippet-end:

export async function createCollectionBucketSettings() {
  const client = new MongoClient(uri);
  try {
    const timeSeriesDB = client.db('timeseries');

    await timeSeriesDB.createCollection('weatherBucket', bucketSettings);
  } finally {
    await client.close();
  }
}

export async function createCollection() {
  const client = new MongoClient(uri);
  try {
    // :snippet-start: create-collection
    const timeSeriesDB = client.db('timeseries');
    const weather = await timeSeriesDB.createCollection('weather', settings);
    // :snippet-end:

    // :snippet-start: insert-many
    const sampleDocuments = [
      {
        sensor: { sensorId: 5578, type: 'temperature' },
        time: new Date(2021, 11, 18, 0, 0, 0, 0),
        temp: 45.2,
      },
      {
        sensor: { sensorId: 5578, type: 'temperature' },
        time: new Date(2021, 11, 18, 6, 0, 0, 0),
        temp: 47.3,
      },
      {
        sensor: { sensorId: 5578, type: 'temperature' },
        time: new Date(2021, 11, 18, 12, 0, 0, 0),
        temp: 49.1,
      },
      {
        sensor: { sensorId: 5578, type: 'temperature' },
        time: new Date(2021, 11, 18, 18, 0, 0, 0),
        temp: 48.8,
      },
      {
        sensor: { sensorId: 5578, type: 'temperature' },
        time: new Date(2021, 11, 19, 0, 0, 0, 0),
        temp: 43.3,
      },
      {
        sensor: { sensorId: 5578, type: 'temperature' },
        time: new Date(2021, 11, 19, 6, 0, 0, 0),
        temp: 47.2,
      },
      {
        sensor: { sensorId: 5578, type: 'temperature' },
        time: new Date(2021, 11, 19, 12, 0, 0, 0),
        temp: 51.5,
      },
      {
        sensor: { sensorId: 5578, type: 'temperature' },
        time: new Date(2021, 11, 19, 18, 0, 0, 0),
        temp: 48.2,
      },
    ];

    const insertManyResult = await weather.insertMany(sampleDocuments);
    // :snippet-end:

    return insertManyResult.insertedCount;
  } finally {
    await client.close();
  }
}

export async function queryCollectionFindOne() {
  const client = new MongoClient(uri);
  try {
    const timeSeriesDB = client.db('timeseries');
    const weather = timeSeriesDB.collection('weather');

    // :snippet-start: find-one
    const result = await weather.findOne(
      { time: new Date(2021, 11, 19, 18, 0, 0, 0) },
      { projection: { _id: 0 } }
    );
    // :snippet-end:

    return result;
  } finally {
    await client.close();
  }
}

export async function queryCollectionMetaField() {
  const client = new MongoClient(uri);
  try {
    const timeSeriesDB = client.db('timeseries');
    const weather = timeSeriesDB.collection('weather');

    const metaFieldResults = weather.find(
      { 'sensor.sensorId': 5578 },
      { projection: { _id: 0 } }
    );

    const documents = [];
    for await (const document of metaFieldResults) {
      documents.push(document);
    }

    return documents;
  } finally {
    await client.close();
  }
}

export async function queryCollectionTimeField() {
  const client = new MongoClient(uri);
  try {
    const timeSeriesDB = client.db('timeseries');
    const weather = timeSeriesDB.collection('weather');

    const start = new Date(2021, 11, 18, 0, 0, 0, 0);
    const end = new Date(2021, 11, 19, 0, 0, 0, 0);

    const query = {
      $and: [{ time: { $gte: start } }, { time: { $lt: end } }],
    };

    const timeFieldResults = weather.find(query, {
      projection: { _id: 0 },
    });

    const documents = [];
    for await (const document of timeFieldResults) {
      documents.push(document);
    }

    return documents;
  } finally {
    await client.close();
  }
}

export async function aggregateCollection() {
  const client = new MongoClient(uri);
  try {
    const timeSeriesDB = client.db('timeseries');
    const weather = timeSeriesDB.collection('weather');

    // :snippet-start: aggregate
    const pipeline = [
      { $match: { 'sensor.sensorId': 5578 } },
      {
        $group: {
          _id: { $dateTrunc: { date: '$time', unit: 'day' } },
          avgTemp: { $avg: '$temp' },
        },
      },
      { $sort: { avgTemp: -1 } },
    ];

    const cursor = weather.aggregate(pipeline);
    // :snippet-end:

    // :snippet-start: cursor-iterate
    // :uncomment-start:
    // for await (const document of cursor) {
    //   console.log(document);
    // }
    // :uncomment-end:
    // :snippet-end:

    const aggregationDocuments = await cursor.toArray();

    return aggregationDocuments;
  } finally {
    await client.close();
  }
}

// :replace-end:
