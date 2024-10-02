import { MongoClient } from 'mongodb';
import { getEmbedding } from './get-embeddings.js';

// Connect to your Atlas cluster
const uri = "<connectionString>";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db("sample_airbnb");
        const collection = db.collection("listingsAndReviews");

        // Filter to exclude null or empty summary fields
        const filter = { "summary": { "$nin": [ null, "" ] } };

        // Get a subset of documents from the collection
        const documents = await collection.find(filter).limit(50).toArray();

        // Create embeddings from a field in the collection
        let updatedDocCount = 0;
        console.log("Generating embeddings for documents...");
        await Promise.all(documents.map(async doc => {
           // Generate an embedding by using the function that you defined
           const embedding = await getEmbedding(doc.summary);

           // Update the document with a new embedding field
           await collection.updateOne({ "_id": doc._id },
               {
                   "$set": {
                       "embedding": embedding
                   }
               }
           );
           updatedDocCount += 1;
       }));
       console.log("Count of documents updated: " + updatedDocCount);
            
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);
