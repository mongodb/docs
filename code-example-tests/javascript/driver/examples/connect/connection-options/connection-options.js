import { MongoClient } from 'mongodb';

const uri = process.env.CONNECTION_STRING;

// Sets optional connection timeout options
export async function runConnTimeOutOptions() {
  // :snippet-start: connection-timeout-options
  const client = new MongoClient(uri, {
    connectTimeoutMS: 2000,
    socketTimeoutMS: 2000,
  });
  // :snippet-end: connection-timeout-options
  try {
    await client.connect();
    const database = client.db('sample_db');
    const collection = database.collection('sample_coll');
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
}

// Sets optional connection maxTimeMS option
export async function runConnMaxTimeMSOption() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('sample_db');
    const collection = database.collection('sample_coll');

    // :snippet-start: connection-maxTimeMS-option
    const filter = {};
    const result = await collection.distinct('my-key', filter, {
      maxTimeMS: 50,
    });
    // :snippet-end: connection-maxTimeMS-option
    return result;
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
}

// Chains maxTimeMS to cursor operation
export async function chainMaxTimeMSToCursor() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('sample_db');
    const collection = database.collection('sample_coll');

    // :snippet-start: connection-maxTimeMS-cursor
    const cursor = collection.find({ name: 'a' }).maxTimeMS(5000);
    // :snippet-end: connection-maxTimeMS-cursor
    return await cursor.toArray();
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
}
