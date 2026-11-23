import ollama from 'ollama';

// Function to generate embeddings for given data
export async function getEmbedding(data) {
  const response = await ollama.embed({
    model: 'hf.co/MongoDB/voyage-4-nano-GGUF:Q8_0',
    input: data,
  });
  return response.embeddings[0];
}
