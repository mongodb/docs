const { MongoClient } = require('mongodb');

const MONGO_URL = process.env.MONGO_URL;

async function insertSampleRestaurant() {

  const client = new MongoClient(MONGO_URL);
  
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('restaurants');
    
    const doc = {
      name: "Honey Moon Coffee Shop",
      borough: "Queens",
      cuisine: "Café/Coffee/Tea",
    };
    const result = await collection.insertOne(doc);
    
    console.log('Inserted restaurant with ID:', result.insertedId);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

insertSampleRestaurant();