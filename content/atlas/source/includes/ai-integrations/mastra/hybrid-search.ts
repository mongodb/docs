// start-hybrid-query-auto
const question = "space opera about isolation";

const results = await mongoVector.hybridQuery({
  indexName: "vector_index",
  vector: { query: question, limit: 50 }, // MongoDB embeds this text
  text: { query: question, paths: ["document"], limit: 50 }, // Full-text query and fields
  weights: { vector: 1, text: 2 }, // Counts full-text matches twice as heavily
  topK: 5,
});
// end-hybrid-query-auto

// start-hybrid-query-manual
import { voyageEmbedding } from "@mastra/voyageai";
import { embed } from "ai";

const embeddingModel = voyageEmbedding({
  model: "voyage-4",
  baseUrl: "https://ai.mongodb.com/v1", // MongoDB-hosted embedding endpoint
});

const question = "space opera about isolation";

// Convert the question to an embedding
const { embedding } = await embed({
  value: question,
  model: embeddingModel,
});

const results = await mongoVector.hybridQuery({
  indexName: "vector_index",
  vector: { queryVector: embedding, limit: 50 }, // Embedding that you generated
  text: { query: question, paths: ["metadata.text"], limit: 50 }, // Full-text query and fields
  weights: { vector: 1, text: 2 }, // Counts full-text matches twice as heavily
  topK: 5,
});
// end-hybrid-query-manual

// start-rerank-auto
// Uses question from the previous step
const results = await mongoVector.hybridQuery({
  indexName: "vector_index",
  vector: { query: question, limit: 50 },
  text: { query: question, paths: ["document"], limit: 50 },
  weights: { vector: 1, text: 2 }, // Counts full-text matches twice as heavily
  rerank: {
    query: question,     // Query that the reranker scores against
    paths: ["document"], // Fields that the reranker reads
    numDocsToRerank: 50, // Maximum merged documents to rerank
  },
  topK: 5,
});
// end-rerank-auto

// start-rerank-manual
// Uses question and embedding from the previous step
const results = await mongoVector.hybridQuery({
  indexName: "vector_index",
  vector: { queryVector: embedding, limit: 50 },
  text: { query: question, paths: ["metadata.text"], limit: 50 },
  weights: { vector: 1, text: 2 }, // Counts full-text matches twice as heavily
  rerank: {
    query: question,          // Query that the reranker scores against
    paths: ["metadata.text"], // Fields that the reranker reads
    numDocsToRerank: 50,      // Maximum merged documents to rerank
  },
  topK: 5,
});
// end-rerank-manual
