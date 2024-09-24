import { env, pipeline } from '@xenova/transformers';

// Function to generate embeddings for given data
export async function getEmbeddings(data) {
    // Replace this path with the parent directory that contains the model files
    env.localModelPath = '/Users/<username>/local-rag-mongodb/';
    env.allowRemoteModels = false;
    const task = 'feature-extraction';
    const model = 'mxbai-embed-large-v1';
    const embedder = await pipeline(
        task, model);
    const results = await embedder(data, { pooling: 'mean', normalize: true });
    return Array.from(results.data);
}
