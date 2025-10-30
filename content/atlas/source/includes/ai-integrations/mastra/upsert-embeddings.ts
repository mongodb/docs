import { openai } from "@ai-sdk/openai";
import { MongoDBVector } from "@mastra/mongodb";
import { MDocument } from "@mastra/rag";
import { embedMany } from "ai";

// Create a document from text
const doc = MDocument.fromText("Your text content...");

// Split document into chunks
const chunks = await doc.chunk();

// Generate embeddings for each chunk
const { embeddings } = await embedMany({
  values: chunks.map(chunk => chunk.text), // Text content to embed
  model: openai.embedding("text-embedding-3-small"), // Embedding model
});

// Instantiate MongoDB as a vector store
const mongoVector = new MongoDBVector({
  uri: process.env.MONGODB_URI,   // MongoDB connection string
  dbName: process.env.MONGODB_DB_NAME, // Database name
});

// Store vector embeddings with metadata
await mongoVector.upsert({
  indexName: "vector_index",                         // Name of the vector search index
  vectors: embeddings,                               // Array of vector embeddings
  metadata: chunks?.map(chunk => ({ text: chunk.text })), // Associated metadata for each embedding
});