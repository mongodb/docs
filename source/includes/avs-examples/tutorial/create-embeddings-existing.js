import { MongoClient } from 'mongodb';
import { getEmbedding } from './get-embeddings.js';
// import { convertEmbeddingsToBSON } from './convert-embeddings.js';

async function run() {

    // Connect to your Atlas cluster
    const client = new MongoClient(process.env.ATLAS_CONNECTION_STRING);

    try {
        await client.connect();
        const db = client.db("sample_airbnb");
        const collection = db.collection("listingsAndReviews");

        // Filter to exclude null or empty summary fields
        const filter = { "summary": { "$nin": [ null, "" ] } };

        // Get a subset of documents from the collection
        const documents = await collection.find(filter).limit(50).toArray();

        console.log("Generating embeddings and updating documents...");
        const updateDocuments = [];
        await Promise.all(documents.map(async doc => {

            // Generate an embedding using the function that you defined
            var embedding = await getEmbedding(doc.summary);

            // Uncomment the following lines to convert the generated embedding into BSON format
            // const bsonEmbedding = await convertEmbeddingsToBSON([embedding]); // Since convertEmbeddingsToBSON is designed to handle arrays
            // embedding = bsonEmbedding; // Use BSON embedding instead of the original float32 embedding
             
            // Add the embedding to an array of update operations
            updateDocuments.push(
                {
                    updateOne: { 
                        filter: { "_id": doc._id },
                        update: { $set: { "embedding": embedding } }
                    }
                }
           )
       }));

       // Continue processing documents if an error occurs during an operation
       const options = { ordered: false };

       // Update documents with the new embedding field
       const result = await collection.bulkWrite(updateDocuments, options); 
       console.log("Count of documents updated: " + result.modifiedCount); 
            
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);
