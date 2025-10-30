import { openai } from "@ai-sdk/openai";
import { embed } from "ai";
import { MongoDBVector } from "@mastra/mongodb";

// Convert query to embedding
const { embedding } = await embed({
  value: "What are the main points in the article?",  // Query text
  model: openai.embedding("text-embedding-3-small"), // Embedding model
});

// Instantiate MongoDB as a vector store
const mongoVector = new MongoDBVector({
  uri: process.env.MONGODB_URI,        // MongoDB connection string
  dbName: process.env.MONGODB_DATABASE // Database name
});

// Query the vector store for similar documents
const results = await mongoVector.query({
  indexName: "vector_index", // Name of the vector search index
  queryVector: embedding,    // Query embedding vector
  topK: 10,                  // Number of results to return
});

// Display results
console.log(results);