import { MongoClient } from 'mongodb';
import { getEmbedding } from './get-embeddings.js';

// MongoDB connection URI and options
const client = new MongoClient(process.env.ATLAS_CONNECTION_STRING);

async function run() {
    try {
        // Connect to the MongoDB client
        await client.connect();

        // Specify the database and collection
        const database = client.db("sample_db"); 
        const collection = database.collection("embeddings"); 

        // Generate embedding for the search query
        const queryEmbedding = await getEmbedding("ocean tragedy");

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
                    text: 1,
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