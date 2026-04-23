import { MongoClient } from "mongodb";  
import fs from "fs/promises";  
import { BSON } from "bson"; // Use the BSON package for EJSON parsing  
import dotenv from "dotenv";  
  
dotenv.config();  
  
// MongoDB connection details  
const mongoUri = process.env.MONGODB_URI || "<CONNECTION-STRING>";  
const dbName = "<DATABASE-NAME>";  
const collectionName = "<COLLECTION-NAME>";  
const VECTOR_INDEX_NAME = "<INDEX-NAME>"; 
const NUM_CANDIDATES = <NUMBER-OF-CANDIDATES-TO-CONSIDER>; 
const LIMIT = <NUMBER-OF-DOCUMENTS-TO-RETURN>;  
const dataField = "<TEXT-FIELD-NAME>";
  
// Fields in the collection containing BSON-compatible query vectors  
const FIELDS = [  
  { path: "float32", subtype: 9 },  
  { path: "int8", subtype: 9 },  
  { path: "int1", subtype: 9 },  
];  
  
async function main() {  
  const client = new MongoClient(mongoUri);  
  
  try {  
    await client.connect();  
    console.log("Connected to MongoDB");  
  
    const db = client.db(dbName);  
    const collection = db.collection(collectionName);  
  
    // Read the query embeddings from the JSON file  
    const fileContent = await fs.readFile("query-embeddings.json", "utf8");  
    const embeddingsData = BSON.EJSON.parse(fileContent, { relaxed: true });  
  
    if (!Array.isArray(embeddingsData) || embeddingsData.length === 0) {  
      throw new Error("No embeddings found in the JSON file");  
    }  
  
    const results = {};  
  
    // Perform vector search for each embedding type  
    for (const field of FIELDS) {  
      const { path } = field;  
      const bsonBinary = embeddingsData[0]?.bsonEmbeddings?.[path];  
  
      if (!bsonBinary) {  
        console.warn(`Embedding for path "${path}" not found. Skipping.`);  
        continue;  
      }  
  
      const pipeline = [  
        {  
          $vectorSearch: {  
            index: VECTOR_INDEX_NAME,  
            path: `bsonEmbeddings.${path}`,  
            queryVector: bsonBinary, // Direct raw binary  
            numCandidates: NUM_CANDIDATES,  
            limit: LIMIT,  
          },  
        },  
        {  
          $project: {  
            _id: 0,  
            [dataField]: 1,  
            score: { $meta: "vectorSearchScore" },  
          },  
        },  
      ];  
  
      console.log(`Running vector search using "${path}" embedding...`);  
      results[path] = await collection.aggregate(pipeline).toArray();  
    }  
  
    return results;  
  } catch (error) {  
    console.error("Error during vector search:", error);  
  } finally {  
    await client.close();  
    console.log("MongoDB connection closed");  
  }  
}  
  
// Parse and display search results for each embedding type  
(async () => {  
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

    console.log("Results from Int1 (PackedBits) embeddings:");
    (results.int1 || []).forEach((result, index) => {
      console.log(`Result ${index + 1}:`, result);
    });  
  }  
})();  
