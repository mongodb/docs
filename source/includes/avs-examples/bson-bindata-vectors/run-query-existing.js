const { MongoClient } = require('mongodb');
const fs = require('fs/promises');
const { BSON } = require('bson'); // Use BSON's functionality for EJSON parsing
const dotenv = require('dotenv');

dotenv.config();

// MongoDB connection details
const mongoUri = process.env.MONGODB_URI || '<CONNECTION-STRING>';
const dbName = 'sample_airbnb'; // Update with your actual database name
const collectionName = 'listingsAndReviews'; // Update with your actual collection name

// Indices and paths should match your MongoDB vector search configuration
const VECTOR_INDEX_NAME = '<INDEX-NAME>'; // Replace with your actual index name
const NUM_CANDIDATES = 20; // Number of candidate documents for the search
const LIMIT = 5; // Limit for the number of documents to return

// Fields in the collection that contain the BSON query vectors
const FIELDS = [
  { path: 'float32', subtype: 9 }, // Ensure that the path and custom subtype match
  { path: 'int8', subtype: 9 },    // Use the custom subtype if needed
  { path: 'int1', subtype: 9 } // Use the same custom subtype
];


// Function to read BSON vectors from JSON and run vector search
async function main() {
  // Initialize MongoDB client
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Load query embeddings from JSON file using EJSON parsing
    const fileContent = await fs.readFile('query-embeddings.json', 'utf8');
    const embeddingsData = BSON.EJSON.parse(fileContent);

    // Define and run the query for each embedding type
    const results = {};

    for (const fieldInfo of FIELDS) {
      const { path, subtype } = fieldInfo;
      const bsonBinary = embeddingsData[0]?.bsonEmbeddings?.[path];
      
      if (!bsonBinary) {
        console.warn(`BSON embedding for ${path} not found in the JSON.`);
        continue;
      }

      const bsonQueryVector = bsonBinary; // Directly use BSON Binary object

      const pipeline = [
        {
          $vectorSearch: {
            index: VECTOR_INDEX_NAME,
            path: `bsonEmbeddings.${path}`,
            queryVector: bsonQueryVector,
            numCandidates: NUM_CANDIDATES,
            limit: LIMIT,
          }
        },
        {
          $project: {
            _id: 0,
            name: 1,
            summary: 1, // Adjust projection fields as necessary to match your document structure
            score: { $meta: 'vectorSearchScore' }
          }
        }
      ];

      results[path] = await collection.aggregate(pipeline).toArray();
    }

    return results;
  } catch (error) {
    console.error('Error during vector search:', error);
  } finally {
    await client.close();
  }
}

// Main execution block
(async () => {
    try {
      const results = await main();
  
      if (results) {
        console.log("Results from Float32 embeddings:");
        (results.float32 || []).forEach((result, index) => {
          console.log(`Result ${index + 1}:`, result);
        });
  
        console.log("Results from Int8 embeddings:");
        (results.int8 || []).forEach((result, index) => {
          console.log(`Result ${index + 1}:`, result);
        });
  
        console.log("Results from Packed Binary (PackedBits) embeddings:");
        (results.int1 || []).forEach((result, index) => {
          console.log(`Result ${index + 1}:`, result);
        });
      }
    } catch (error) {
      console.error('Error executing main function:', error);
    }
  })();
  
