const fs = require('fs/promises'); // Use fs/promises for asynchronous operations
const { MongoClient, BSON } = require('mongodb'); // Import from the 'mongodb' package

const { Binary } = BSON; // Ensure the Binary class is imported correctly

async function main() {
    const MONGODB_URI = process.env.MONGODB_URI || "<CONNECTION-STRING>";
    const DB_NAME = "<DB-NAME>";
    const COLLECTION_NAME = "<COLLECTION-NAME>";

    let client;
    try {
        client = new MongoClient(MONGODB_URI);
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        // Read and parse the contents of 'embeddings.json' file using EJSON
        const fileContent = await fs.readFile('embeddings.json', 'utf8');
        const embeddingsData = BSON.EJSON.parse(fileContent);

        // Map embeddings data to recreate BSON binary representations with the correct subtype
        const documents = embeddingsData.map(({ text, bsonEmbeddings }) => {
            return {
                text,
                bsonEmbeddings: {
                    float32: bsonEmbeddings.float32,
                    int8: bsonEmbeddings.int8,
                    int1: bsonEmbeddings.packedBits
                }
            };
        });

        const result = await collection.insertMany(documents);
        console.log(`Inserted ${result.insertedCount} documents into MongoDB`);

    } catch (error) {
        console.error('Error storing embeddings in MongoDB:', error);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

// Run the store function
main();
