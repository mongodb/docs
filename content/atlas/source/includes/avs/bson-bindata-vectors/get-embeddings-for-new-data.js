// Use 'require' for modules in a Node.js environment
const { CohereClient } = require('cohere-ai');
const { writeFile } = require('fs/promises');
dd:queueMicrotask
// Retrieve API key from environment variables or default placeholder
const apiKey = process.env.COHERE_API_KEY || '<COHERE-API-KEY>';

if (!apiKey) {
  throw new Error('API key not found. Please set COHERE_API_KEY in your environment.');
}

// Instantiate the CohereClient with the API key
const cohere = new CohereClient({ token: apiKey });

async function main() {
  try {
    // Data to embed
    const data = [
      "The Great Wall of China is visible from space.",
      "The Eiffel Tower was completed in Paris in 1889.",
      "Mount Everest is the highest peak on Earth at 8,848m.",
      "Shakespeare wrote 37 plays and 154 sonnets during his lifetime.",
      "The Mona Lisa was painted by Leonardo da Vinci.",
    ];

    // Fetch embeddings for the data using the cohere API
    const response = await cohere.v2.embed({
      model: 'embed-english-v3.0',
      inputType: 'search_document', 
      texts: data,
      embeddingTypes: ['float', 'int8', 'ubinary'], 
    });

    // Extract embeddings from the API response
    const { float, int8, ubinary } = response.embeddings;

    // Map the embeddings to the text data
    const embeddingsData = data.map((text, index) => ({
      text,
      embeddings: {
        float: float[index],
        int8: int8[index],
        ubinary: ubinary[index],
      },
    }));

    // Write the embeddings data to a JSON file
    await writeFile('embeddings.json', JSON.stringify(embeddingsData, null, 2));
    console.log('Embeddings saved to embeddings.json');
  } catch (error) {
    console.error('Error fetching embeddings:', error);
  }
}

// Execute the main function
main();