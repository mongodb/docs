// :snippet-start: local-rag-get-embeddings
// :uncomment-start:
// import ollama from 'ollama';
// :uncomment-end:

// Function to generate embeddings for given data
export async function getEmbedding(data) {
  // :remove-start:
  // Imported here rather than at module scope so the test file can load this
  // module without the ollama package installed. It is an optional
  // dependency; see package-models.json.
  const { default: ollama } = await import('ollama');
  // :remove-end:
  const response = await ollama.embed({
    model: 'hf.co/MongoDB/voyage-4-nano-GGUF:Q8_0',
    input: data,
  });
  return response.embeddings[0];
}
// :snippet-end:
