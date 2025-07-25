import { MongoClient } from 'mongodb';
import { getEmbedding } from './get-embeddings.js';

// Function to get the results of a vector query
export async function getQueryResults(query) {
    // Connect to your Atlas cluster
    const client = new MongoClient(process.env.ATLAS_CONNECTION_STRING);

    try {
        // Get embedding for a query
        const queryEmbedding = await getEmbedding(query);

        await client.connect();
        const db = client.db("sample_airbnb");
        const collection = db.collection("listingsAndReviews");

        const pipeline = [
            {
                $vectorSearch: {
                    index: "vector_index",
                    queryVector: queryEmbedding,
                    path: "embeddings",
                    exact: true,
                    limit: 5
                }
            }, {
                $project: {
                    _id: 0,
                    summary: 1,
                    listing_url: 1,
                    score: {
                        $meta: "vectorSearchScore"
                    }
                }
            }
        ];

        // Retrieve documents from Atlas using this Vector Search query
        const result = collection.aggregate(pipeline);

        const arrayOfQueryDocs = [];
        for await (const doc of result) {
            arrayOfQueryDocs.push(doc);
        }
        return arrayOfQueryDocs;
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
