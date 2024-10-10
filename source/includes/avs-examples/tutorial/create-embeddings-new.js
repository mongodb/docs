import { MongoClient } from 'mongodb';
import { getEmbedding } from './get-embeddings.js';

// Data to embed
const data = [ 
    "Titanic: The story of the 1912 sinking of the largest luxury liner ever built",
    "The Lion King: Lion cub and future king Simba searches for his identity",
    "Avatar: A marine is dispatched to the moon Pandora on a unique mission"
]

async function run() {
    // Connect to your Atlas cluster
    const client = new MongoClient(process.env.ATLAS_CONNECTION_STRING);
    
    try {
        await client.connect();
        const db = client.db("sample_db");
        const collection = db.collection("embeddings");

        await Promise.all(data.map(async text => {
            // Check if the document already exists
            const existingDoc = await collection.findOne({ text: text });

            // Generate an embedding by using the function that you defined
            const embedding = await getEmbedding(text);

            // Ingest data and embedding into Atlas
            if (!existingDoc) {
                await collection.insertOne({
                    text: text,
                    embedding: embedding
                });
                console.log(embedding);
            }
        }));

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);