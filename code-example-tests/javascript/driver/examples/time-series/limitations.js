import { MongoClient, ObjectId } from 'mongodb';

const uri =
  process.env.CONNECTION_STRING ||
  'Env variable not found. Verify you have a .env file with a valid connection string.';

let client;
let database;
let collection;

async function loadData() {
  client = new MongoClient(uri);
  await client.connect();
  database = client.db('timeseries');
  await database.createCollection('limitations');
  collection = database.collection('limitations');

  const sampleDocuments = [
    {
      _id: new ObjectId(),
      name: 'example',
      meta: {
        project: 10,
        type: 'a',
      },
    },
    {
      _id: new ObjectId(),
      name: 'example',
      meta: {
        project: 10,
        type: 'b',
      },
    },
    {
      _id: new ObjectId(),
      name: 'example',
      meta: {
        project: 40,
        type: 'c',
      },
    },
  ];

  await collection.insertMany(sampleDocuments);
}

export async function getDistinctDocuments() {
  await loadData();

  // :snippet-start: agg-pipeline-for-distinct
  await collection.createIndex({ 'meta.project': 1, 'meta.type': 1 });

  const pipeline = [
    { $match: { 'meta.project': 10 } },
    { $group: { _id: '$meta.type' } },
  ];

  const result = await collection.aggregate(pipeline).toArray();
  // :snippet-end:

  return result;
}

export async function cleanup() {
  await database?.dropCollection('limitations');
  await client?.close();
}
