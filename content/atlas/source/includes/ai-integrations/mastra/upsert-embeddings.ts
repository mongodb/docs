import { MDocument } from "@mastra/rag";
import { voyageEmbedding } from "@mastra/voyageai";
import { embedMany } from "ai";

const embeddingModel = voyageEmbedding({
  model: "voyage-4",
  baseUrl: "https://ai.mongodb.com/v1", // MongoDB-hosted embedding endpoint
});

// Create a document from text
const doc = MDocument.fromText("Your text content...");

// Split document into chunks
const chunks = await doc.chunk();

// Generate embeddings for each chunk
const { embeddings } = await embedMany({
  values: chunks.map(chunk => chunk.text), // Text content to embed
  model: embeddingModel,                           // Embedding model
});

// Store vector embeddings with metadata
await mongoVector.upsert({
  indexName: "vector_index",                         // Name of the vector search index
  vectors: embeddings,                               // Array of vector embeddings
  metadata: chunks?.map(chunk => ({ text: chunk.text })), // Associated metadata for each embedding
});
