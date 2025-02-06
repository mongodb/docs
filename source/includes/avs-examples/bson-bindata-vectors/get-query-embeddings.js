const { CohereClient } = require('cohere-ai');
const { BSON } = require('mongodb');
const { writeFile } = require('fs/promises');
const dotenv = require('dotenv');
const process = require('process');

// Load environment variables
dotenv.config();

const { Binary } = BSON;

// Get the API key from environment variables or set the key here
const apiKey = process.env.COHERE_API_KEY || '<COHERE-API-KEY>';

if (!apiKey) {
  throw new Error('API key not found. Provide the COHERE_API_KEY.');
}

// Initialize CohereClient
const cohere = new CohereClient({ token: apiKey });

async function main(queryText) {
  try {
    if (typeof queryText !== 'string' || queryText.trim() === '') {
      throw new Error('Invalid query text. It must be a non-empty string.');
    }

    const data = [queryText];

    // Request embeddings from the Cohere API
    const response = await cohere.v2.embed({
      model: 'embed-english-v3.0',
      inputType: 'search_query',
      texts: data,
      embeddingTypes: ['float', 'int8', 'ubinary'], // Request all required embedding types
    });

    if (!response.embeddings) {
      throw new Error('Embeddings not found in the API response.');
    }

    const { float, int8, ubinary } = response.embeddings;

    const updatedEmbeddingsData = data.map((text, index) => {
      // Create the BSON Binary objects using VECTOR_TYPE for all embedding types
      const float32Binary = Binary.fromFloat32Array(new Float32Array(float[index])); // VECTOR_TYPE.FLOAT32
      const int8Binary = Binary.fromInt8Array(new Int8Array(int8[index])); // VECTOR_TYPE.INT8
      const packedBitsBinary = Binary.fromPackedBits(new Uint8Array(ubinary[index])); // VECTOR_TYPE.PACKED_BIT

      return {
        text,
        embeddings: {
          float: float[index],
          int8: int8[index],
          ubinary: ubinary[index],
        },
        bsonEmbeddings: {
          float32: float32Binary,
          int8: int8Binary,
          int1: packedBitsBinary,
        },
      };
    });

    // Serialize the embeddings using BSON EJSON for BSON compatibility
    const outputFileName = 'query-embeddings.json';
    const ejsonSerializedData = BSON.EJSON.stringify(updatedEmbeddingsData, null, null, { relaxed: false });
    await writeFile(outputFileName, ejsonSerializedData);
    console.log(`Embeddings with BSON data have been saved to ${outputFileName}`);
  } catch (error) {
    console.error('Error processing query text:', error);
  }
}

// Main function that takes a query string
(async () => {
  const queryText = "<QUERY-TEXT>"; // Replace with your actual query text
  await main(queryText);
})();
