import { MongoClient } from 'mongodb';
import OpenAI from 'openai';

// Setup OpenAI configuration
const openai = new OpenAI({
    apiKey: "<apiKey>",
});

// Function to get the embeddings using the OpenAI API
export async function getEmbedding(text) {
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
        encoding_format: "float",
    });
    return response.data[0].embedding;
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
            // Check if the document already exists
            const embedding = await getEmbedding(text);
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