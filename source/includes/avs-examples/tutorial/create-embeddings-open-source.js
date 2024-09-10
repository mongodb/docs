import { MongoClient } from 'mongodb';
import { pipeline } from '@xenova/transformers';

// Function to generate embeddings for a given data source
export async function getEmbedding(data) {
    const embedder = await pipeline(
        'feature-extraction', 
        'Xenova/nomic-embed-text-v1');
    const response = await embedder(data, { pooling: 'mean', normalize: true });
    return Array.from(response.data);
}

// Data to embed
const data = [ 
    "Titanic: The story of the 1912 sinking of the largest luxury liner ever built",
    "The Lion King: Lion cub and future king Simba searches for his identity",
    "Avatar: A marine is dispatched to the moon Pandora on a unique mission"
]

async function run() {
    // Connect to your Atlas cluster
    const uri = "<connectionString>"; 
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("sample_db");
        const collection = db.collection("embeddings");

        // Ingest data and embeddings into Atlas
        await Promise.all(data.map(async text => {
            const embedding = await getEmbedding(text);
            // Check if the document already exists before inserting
            const existingDoc = await collection.findOne({ text: text });
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

