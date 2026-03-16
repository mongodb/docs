import { MongoClient } from 'mongodb';

const uri = process.env.CONNECTION_STRING;

// Setup function to load sample data
export async function loadSampleData() {
  const client = new MongoClient(uri);
  try {
    const myDB = client.db('myDB');
    const myColl = myDB.collection('foodTrucks');

    // Insert sample documents
    const documentsToInsert = [
      { name: 'Haute Skillet', address: '42 Avenue B' },
      { name: 'Lady of the Latke', address: '35 Fulton Rd' },
    ];

    const result = await myColl.insertMany(documentsToInsert);
    return result.insertedCount;
  } catch (error) {
    console.error('Error loading sample data:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Performs a regular update operation
export async function performUpdate() {
  const client = new MongoClient(uri);
  try {
    const myDB = client.db('myDB');
    const myColl = myDB.collection('foodTrucks');

    // :snippet-start: update-one
    const query = { name: 'Deli Llama' };
    const update = { $set: { name: 'Deli Llama', address: '3 Nassau St' } };
    const options = {};
    const result = await myColl.updateOne(query, update, options);
    // :snippet-end:

    return result;
  } catch (error) {
    console.error('Error in performUpdate:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Performs an upsert operation
export async function performUpsert() {
  const client = new MongoClient(uri);
  try {
    const myDB = client.db('myDB');
    const myColl = myDB.collection('foodTrucks');

    // :snippet-start: upsert
    const query = { name: 'Deli Llama' };
    const update = { $set: { name: 'Deli Llama', address: '3 Nassau St' } };
    const options = { upsert: true };
    const result = await myColl.updateOne(query, update, options);
    // :snippet-end:

    return result;
  } catch (error) {
    console.error('Error in performUpsert:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// :replace-end:
