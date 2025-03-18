import { MongoClient } from 'mongodb';
import { getEmbedding } from './get-embeddings.js';
// import { convertEmbeddingsToBSON } from './convert-embeddings.js';

// Data to embed
const texts = [ 
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

        console.log("Generating embeddings and inserting documents...");
        const insertDocuments = [];
        await Promise.all(texts.map(async text => {
            // Check if the document already exists
            const existingDoc = await collection.findOne({ text: text });

            // Generate an embedding using the function that you defined
            var embedding = await getEmbedding(text);
            
            // Uncomment the following lines to convert the generated embedding into BSON format
            // const bsonEmbedding = await convertEmbeddingsToBSON([embedding]); // Since convertEmbeddingsToBSON is designed to handle arrays
            // embedding = bsonEmbedding; // Use BSON embedding instead of the original float32 embedding
                      
            // Add the document with the embedding to array of documents for bulk insert
            if (!existingDoc) {
                insertDocuments.push({
                    text: text,
                    embedding: embedding
                })
            }
        }));

        // Continue processing documents if an error occurs during an operation
        const options = { ordered: false };

        // Insert documents with embeddings into Atlas
        const result = await collection.insertMany(insertDocuments, options);  
        console.log("Count of documents inserted: " + result.insertedCount); 

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);