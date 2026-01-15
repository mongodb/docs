import { Binary } from 'mongodb';

// Exported async function to convert provided embeddings to BSON format
export async function convertEmbeddingsToBSON(float32_embeddings) {
  try {
    // Validate input
    if (!Array.isArray(float32_embeddings) || float32_embeddings.length === 0) {
      throw new Error("Input must be a non-empty array of embeddings");
    }

    // Convert float32 embeddings to BSON binary representations
    const bsonFloat32Embeddings = float32_embeddings.map(embedding => {
      if (!(embedding instanceof Array)) {
        throw new Error("Each embedding must be an array of numbers");
      }
      return Binary.fromFloat32Array(new Float32Array(embedding));
    });

    // Return the BSON embedding
    return bsonFloat32Embeddings[0]; 

  } catch (error) {
    console.error('Error during BSON conversion:', error);
    throw error; // Re-throw the error for handling by the caller if needed
  }
}
