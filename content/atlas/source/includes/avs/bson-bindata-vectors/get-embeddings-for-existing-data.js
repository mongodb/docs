// Import necessary modules using the CommonJS syntax
const { CohereClient } = require('cohere-ai');
const { readFile, writeFile } = require('fs/promises');

// Retrieve the API key from environment variables or provide a placeholder
const apiKey = process.env.COHERE_API_KEY || '<COHERE-API-KEY>';

if (!apiKey || apiKey === '<COHERE-API-KEY>') {
  throw new Error('API key not found. Please set COHERE_API_KEY in your environment.');
}

// Initialize the Cohere client with the API key
const cohere = new CohereClient({ token: apiKey });

async function main() {
  try {
    // Read and parse the contents of 'subset.json'
    const subsetData = await readFile('subset.json', 'utf-8');
    const documents = JSON.parse(subsetData);

    // Extract the 'summary' fields that are non-empty strings
    const data = documents
      .map(doc => doc.summary)
      .filter(summary => typeof summary === 'string' && summary.length > 0);

    if (data.length === 0) {
      throw new Error('No valid summary texts available in the data.');
    }

    // Request embeddings from the Cohere API
    const response = await cohere.v2.embed({
      model: 'embed-english-v3.0',
      inputType: 'search_document',
      texts: data,
      embeddingTypes: ['float', 'int8', 'ubinary'],
    });

    // Extract embeddings from the API response
    const { float, int8, ubinary } = response.embeddings;

    // Structure the embeddings data
    const embeddingsData = data.map((text, index) => ({
      text,
      embeddings: {
        float: float[index],
        int8: int8[index],
        ubinary: ubinary[index],
      },
    }));

    // Write the embeddings data to 'embeddings.json'
    await writeFile('embeddings.json', JSON.stringify(embeddingsData, null, 2));
    console.log('Embeddings saved to embeddings.json');
  } catch (error) {
    console.error('Error fetching embeddings:', error);
  }
}

// Execute the main function
main();