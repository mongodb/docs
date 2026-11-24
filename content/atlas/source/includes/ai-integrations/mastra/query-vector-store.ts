import { voyageEmbedding } from "@mastra/voyageai";
import { embed } from "ai";

const embeddingModel = voyageEmbedding({
  model: "voyage-4",
  baseUrl: "https://ai.mongodb.com/v1", // MongoDB-hosted embedding endpoint
});

// Convert query to embedding
const { embedding } = await embed({
  value: "What are the main points in the article?",  // Query text
  model: embeddingModel,                             // Embedding model
});

// Query the vector store for similar documents
const results = await mongoVector.query({
  indexName: "vector_index", // Name of the vector search index
  queryVector: embedding,    // Query embedding vector
  topK: 10,                  // Number of results to return
});

// Display results
console.log(results);
