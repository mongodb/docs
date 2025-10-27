import { VoyageAIClient } from 'voyageai';

// Set up Voyage AI configuration
const client = new VoyageAIClient({apiKey: process.env.VOYAGE_API_KEY});

// Function to generate embeddings using the Voyage AI API
export async function getEmbedding(text) {
    const results = await client.embed({
        input: text,
        model: "voyage-3-large"
    });
    return results.data[0].embedding;
}
