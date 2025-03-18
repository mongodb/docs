import { MongoClient } from 'mongodb';
import { getEmbeddings } from './get-embeddings.js';

async function run() {
    const client = new MongoClient(process.env.ATLAS_CONNECTION_STRING);

    try {
        // Connect to your local MongoDB deployment
        await client.connect();
        const db = client.db("sample_airbnb");
        const collection = db.collection("listingsAndReviews");

        const filter = { '$and': [
            { 'summary': { '$exists': true, "$nin": [ null, "" ] } }, 
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

        const firstDocEmbeddings = await getEmbeddings(firstDoc.summary);
        console.log(firstDocEmbeddings);

        // After confirming you are successfully generating embeddings,
        // uncomment the following code to generate embeddings for all docs.
        /* cursor.rewind(); // Reset the cursor to process documents again
         * console.log("Generating embeddings for documents. Standby.");
         * let updatedDocCount = 0;
         *
         * for await (const doc of cursor) {
         *     const text = doc.summary;
         *     const embeddings = await getEmbeddings(text);
         *     await collection.updateOne({ "_id": doc._id },
         *         {
         *             "$set": {
         *                 "embeddings": embeddings
         *             }
         *         }
         *     );
         *     updatedDocCount += 1;
         * }
         * console.log("Count of documents updated: " + updatedDocCount);
         */
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);