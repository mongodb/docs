const fs = require('fs/promises'); // Use fs/promises for asynchronous operations
const { MongoClient, BSON } = require('mongodb'); // Import from the 'mongodb' package
const { EJSON, Binary } = require('bson'); // Import EJSON and Binary from bson

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI || "<CONNECTION-STRING>";
  const DB_NAME = "sample_airbnb";
  const COLLECTION_NAME = "listingsAndReviews";

  let client;
  try {
    // Connect to MongoDB
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("Connected to MongoDB");

    // Access database and collection
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Load embeddings from JSON using EJSON.parse
    const fileContent = await fs.readFile('embeddings.json', 'utf8');
    const embeddingsData = EJSON.parse(fileContent); // Use EJSON.parse

    // Map embeddings data to recreate BSON binary representations
    const documents = embeddingsData.map(({ text, bsonEmbeddings }) => {
      return {
        summary: text,
        bsonEmbeddings: {
          float32: bsonEmbeddings.float32,
          int8: bsonEmbeddings.int8,
          int1: bsonEmbeddings.packedBits
        }
      };
    });

    // Iterate over documents and upsert each into the MongoDB collection
    for (const doc of documents) {
      const filter = { summary: doc.summary };
      const update = { $set: doc };

      // Update the document with the BSON binary data
      const result = await collection.updateOne(filter, update, { upsert: true });
      if (result.matchedCount > 0) {
        console.log(`Updated document with summary: ${doc.summary}`);
      } else {
        console.log(`Inserted new document with summary: ${doc.summary}`);
      }
    }

    console.log("Embeddings stored in MongoDB successfully.");
  } catch (error) {
    console.error('Error storing embeddings in MongoDB:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// Run the main function to load the data
main();
