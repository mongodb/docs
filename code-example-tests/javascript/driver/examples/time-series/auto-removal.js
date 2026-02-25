// :replace-start: {
//	  "terms": {
//	    "collectionName": "\"weather24h\""
//	  }
//	}
import { MongoClient } from 'mongodb';

const uri =
  process.env.CONNECTION_STRING ||
  'Env variable not found. Verify you have a .env file with a valid connection string.';

const collectionName = 'weather24h';
const databaseName = 'timeseries';

let client;
let database;

export async function createTimeSeriesCollection() {
  if (client) {
    await client.close();
  }
  client = new MongoClient(uri);
  await client.connect();
  database = client.db(databaseName);

  // Drop the collection if it exists
  try {
    await database.dropCollection(collectionName);
  } catch (e) {
    // Collection may not exist, ignore error
  }

  // :snippet-start: create-timeseries-collection-for-removal
  const createCommand = {
    create: collectionName,
    timeseries: {
      timeField: 'timestamp',
      metaField: 'sensorId',
      granularity: 'seconds',
    },
    expireAfterSeconds: 86400,
  };

  // Execute the command to create the collection
  await database.command(createCommand);
  // :snippet-end:
}

export async function updateCollectionOptions() {
  await createTimeSeriesCollection();

  // :snippet-start: modify-timeseries-collection-for-removal
  const command = {
    collMod: collectionName,
    expireAfterSeconds: 7200, // Set expiration to 2 hours (7200 seconds)
  };

  const result = await database.command(command);
  // :snippet-end:
  return result;
}

export async function getCollectionInfo() {
  await createTimeSeriesCollection();

  // :snippet-start: get-timeseries-collection-expiry
  const collections = await database
    .listCollections({ name: collectionName })
    .toArray();
  if (collections.length > 0) {
    const collectionInfo = collections[0];
    return collectionInfo.options?.expireAfterSeconds;
  }
  // :snippet-end:
  return null;
}

export async function removeRemoval() {
  await createTimeSeriesCollection();

  // :snippet-start: remove-expireAfterSeconds
  const command = {
    collMod: collectionName,
    expireAfterSeconds: 'off',
  };

  await database.command(command);
  // :snippet-end:

  // Make sure the property was actually removed
  const collections = await database
    .listCollections({ name: collectionName })
    .toArray();
  if (collections.length > 0) {
    const collectionInfo = collections[0];
    if (
      collectionInfo.options &&
      !('expireAfterSeconds' in collectionInfo.options)
    ) {
      return true;
    }
  }

  return false;
}

export async function cleanup() {
  try {
    await database?.dropCollection(collectionName);
  } catch (e) {
    // Collection may not exist, ignore error
  }
  await client?.close();
}
// :replace-end:
