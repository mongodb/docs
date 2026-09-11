// :replace-start: {
//   "terms": {
//     "CONNECTION_STRING": "MONGODB_URI"
//   }
// }
import { MongoClient } from 'mongodb';

let createdIndexName = null;

export async function createVectorIndex() {
  // :snippet-start: local-rag-create-index
  // :uncomment-start:
  // import { MongoClient } from 'mongodb';
  // :uncomment-end:

  // Connect to your MongoDB cluster
  const client = new MongoClient(process.env.CONNECTION_STRING);

  try {
    const database = client.db('sample_airbnb');
    const collection = database.collection('listingsAndReviews');

    // Define your Vector Search index
    const index = {
      name: 'vector_index',
      type: 'vectorSearch',
      definition: {
        fields: [
          {
            type: 'vector',
            numDimensions: 1024,
            path: 'embeddings',
            similarity: 'cosine',
          },
        ],
      },
    };

    // Call the method to create the index
    const result = await collection.createSearchIndex(index);
    console.log(result);
    createdIndexName = result; // :remove:
  } finally {
    await client.close();
  }
  // :snippet-end:

  return createdIndexName;
}
// :replace-end:
