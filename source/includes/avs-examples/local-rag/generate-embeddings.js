import { MongoClient } from 'mongodb';
import { getEmbedding } from './get-embeddings.js';

async function run() {

    // Connect to your Atlas cluster
    const client = new MongoClient(process.env.ATLAS_CONNECTION_STRING);

    try {
        // Connect to your local MongoDB deployment
        await client.connect();
        const db = client.db("sample_airbnb");
        const collection = db.collection("listingsAndReviews");

        const filter = { '$and': [
            { 'summary': { '$exists': true, '$ne': null } }, 
            { 'embeddings': { '$exists': false } }
        ]};

        // This is a long-running operation for all docs in the collection,
        // so we limit the docs for this example
        const cursor = collection.find(filter).limit(50);

        // To verify that you have the local embedding model configured properly,
        // try generating an embedding for one document
        const firstDoc = await cursor.next();
        if (!firstDoc) {
            console.log('No document found.');
            return;
        }

        const firstDocEmbeddings = await getEmbedding(firstDoc.summary);
        console.log(firstDocEmbeddings);

        // After confirming that you are successfully generating embeddings,
        // uncomment the following code to generate embeddings for all docs: 
        /* 
        cursor.rewind(); // Reset the cursor to process documents again
        console.log("Generating embeddings and updating documents...");

        // Create embeddings from a field in the collection
        const updateDocuments = [];
        for await (const doc of cursor) {

            const embedding = await getEmbedding(doc.summary);

            updateDocuments.push(
                { 
                    updateOne: {
                        filter: { "_id": doc._id },
                        update: { $set: { "embedding": embedding } }
                    }
                }
            )
        }

        // Continue processing documents if an error occurs during an operation
        const options = { ordered: false };

        // Update documents with the new embedding field
        const result = await collection.bulkWrite(updateDocuments, options)
        console.log("Count of documents updated: " + result.modifiedCount);
        */

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);