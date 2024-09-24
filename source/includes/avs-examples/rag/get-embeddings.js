import { pipeline } from '@xenova/transformers';

// Function to generate embeddings for given data
export async function getEmbeddings(data) {
    const embedder = await pipeline(
        'feature-extraction', 
        'Xenova/nomic-embed-text-v1');
    const results = await embedder(data, { pooling: 'mean', normalize: true });
    return Array.from(results.data);
}
