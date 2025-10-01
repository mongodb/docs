// :replace-start: {
//   "terms": {
//     "const result = ": ""
//   }
// }

import { MongoClient } from 'mongodb';

const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri);

// Setup function to load sample data
export async function loadSampleData() {
  try {
    // Connect to the database and get the collection

    const database = client.db('exampleDatabase');
    const collection = database.collection('inventory');

    // Insert sample documents
    // :snippet-start: load-data
    const documentsToInsert = [
      {
        item: 'journal',
        qty: 25,
        size: { h: 14, w: 21, uom: 'cm' },
        status: 'A',
      },
      {
        item: 'notebook',
        qty: 50,
        size: { h: 8.5, w: 11, uom: 'in' },
        status: 'P',
      },
      {
        item: 'paper',
        qty: 100,
        size: { h: 8.5, w: 11, uom: 'in' },
        status: 'D',
      },
      {
        item: 'planner',
        qty: 75,
        size: { h: 22.85, w: 30, uom: 'cm' },
        status: 'D',
      },
      {
        item: 'postcard',
        qty: 45,
        size: { h: 10, w: 15.25, uom: 'cm' },
        status: 'A',
      },
    ];

    const result = await collection.insertMany(documentsToInsert);
    // :snippet-end: load-data
    return result.insertedCount;
  } catch (error) {
    console.error('Error loading sample data:', error);
    throw error;
  }
}

// Example function to demonstrate querying embedded documents
export async function matchEmbeddedDocument() {
  try {
    // Connect to the database and get the collection
    const database = client.db('exampleDatabase');
    const collection = database.collection('inventory');

    // :snippet-start: match-embedded-documents
    const cursor = collection.find({
      size: { h: 14, w: 21, uom: 'cm' },
    });
    // :snippet-end: match-embedded-documents

    // We can return something to compare expected output to actual output in our test
    const documents = await cursor.toArray();
    return documents.length;
  } catch (error) {
    console.error('Error in matchEmbeddedDocument:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// :replace-end:
