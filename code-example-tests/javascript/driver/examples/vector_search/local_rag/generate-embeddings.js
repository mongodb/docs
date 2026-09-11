// :replace-start: {
//   "terms": {
//     "CONNECTION_STRING": "MONGODB_URI"
//   }
// }
import { MongoClient } from 'mongodb';
import { getEmbedding } from './get-embeddings.js';

export async function generateEmbeddings() {
  let modifiedCount = 0;

  // :snippet-start: local-rag-create-embeddings
  // :uncomment-start:
  // import { MongoClient } from 'mongodb';
  // import { getEmbedding } from './get-embeddings.js';
  // :uncomment-end:

  // Connect to your MongoDB cluster
  const client = new MongoClient(process.env.CONNECTION_STRING);

  try {
    // Connect to your local MongoDB deployment
    await client.connect();
    const db = client.db('sample_airbnb');
    const collection = db.collection('listingsAndReviews');

    const filter = {
      $and: [
        { summary: { $exists: true, $nin: [null, ''] } },
        { embeddings: { $exists: false } },
      ],
    };

    // This is a long-running operation for all docs in the collection,
    // so we limit the docs for this example
    const cursor = collection.find(filter).limit(50);

    console.log('Generating embeddings and updating documents...');

    // Create embeddings from a field in the collection
    const updateDocuments = [];
    for await (const doc of cursor) {
      const embedding = await getEmbedding(doc.summary);

      updateDocuments.push({
        updateOne: {
          filter: { _id: doc._id },
          update: { $set: { embeddings: embedding } },
        },
      });
    }

    // Continue processing documents if an error occurs during an operation
    const options = { ordered: false };

    // Update documents with the new embedding field
    const result = await collection.bulkWrite(updateDocuments, options);
    console.log('Count of documents updated: ' + result.modifiedCount);
    modifiedCount = result.modifiedCount; // :remove:
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
  // :snippet-end:

  return (
    'Generating embeddings and updating documents...\n' +
    'Count of documents updated: ' +
    modifiedCount
  );
}
// :replace-end:
