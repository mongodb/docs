import { MongoClient } from 'mongodb';
import { getEmbedding } from './get-embeddings.js';

// MongoDB connection URI and options
const client = new MongoClient(process.env.MONGODB_URI);

async function run() {
    try {
        // Connect to the MongoDB client
        await client.connect();

        // Specify the database and collection
        const database = client.db("sample_airbnb"); 
        const collection = database.collection("listingsAndReviews"); 

        // Generate embedding for the search query
        const queryEmbedding = await getEmbedding("beach house");

        // Define the sample vector search pipeline
        const pipeline = [
            {
                $vectorSearch: {
                    index: "vector_index",
                    queryVector: queryEmbedding,
                    path: "embedding",
                    exact: true,
                    limit: 5
                }
            },
            {
                $project: {
                    _id: 0,
                    summary: 1,
                    score: {
                        $meta: "vectorSearchScore"
                    }
                }
            }
        ];

        // run pipeline
        const result = collection.aggregate(pipeline);

        // print results
        for await (const doc of result) {
            console.dir(JSON.stringify(doc));
        }
        } finally {
        await client.close();
    }
}
run().catch(console.dir);