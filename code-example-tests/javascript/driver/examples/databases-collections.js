import { MongoClient } from 'mongodb';

const uri = process.env.CONNECTION_STRING;

export async function accessDb() {
  const client = new MongoClient(uri);
  try {
    // :snippet-start: access-db
    const database = client.db('test_database');
    // :snippet-end:
    return database;
  } finally {
    await client.close();
  }
}

export async function accessCollection() {
  const client = new MongoClient(uri);
  try {
    const database = client.db('test_database');
    // :snippet-start: access-collection
    const collection = database.collection('test_collection');
    // :snippet-end:
    return collection;
  } finally {
    await client.close();
  }
}

export async function createCollection() {
  const client = new MongoClient(uri);
  try {
    const database = client.db('test_database');
    // :snippet-start: create-collection
    const createColl = await database.createCollection('example_collection');
    // :snippet-end:
    return createColl;
  } finally {
    await client.close();
  }
}

export async function seeAllCollections() {
  const client = new MongoClient(uri);
  try {
    const database = client.db('test_database');
    // :snippet-start: see-all-collections
    const colls = database.listCollections();
    const collsArray = []; // :remove:
    for await (const doc of colls) {
      console.log(doc);
      collsArray.push(doc); // :remove:
    }
    // :snippet-end:
    return collsArray;
  } finally {
    await client.close();
  }
}

export async function seeAllCollectionNames() {
  const client = new MongoClient(uri);
  try {
    const database = client.db('test_database');
    // :snippet-start: see-collection-names
    const names = database.listCollections({}, { nameOnly: true });
    const namesArray = []; // :remove:
    for await (const doc of names) {
      console.log(doc);
      namesArray.push(doc); // :remove:
    }
    // :snippet-end:
    return namesArray;
  } finally {
    await client.close();
  }
}

export async function deleteCollection() {
  const client = new MongoClient(uri);
  try {
    const database = client.db('test_database');
    // :snippet-start: delete-collection
    const collectionToDelete = database.collection('test_collection');
    await collectionToDelete.drop();
    // :snippet-end:
  } finally {
    await client.close();
  }
}

export async function deleteDatabase() {
  const client = new MongoClient(uri);
  try {
    // :snippet-start: delete-database
    const database = client.db('test_database');
    await database.dropDatabase();
    // :snippet-end:
  } finally {
    await client.close();
  }
}
