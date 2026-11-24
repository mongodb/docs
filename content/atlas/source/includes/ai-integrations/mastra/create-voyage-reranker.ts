// start-imports
import { voyage, createVoyageReranker, VoyageRelevanceScorer } from "@mastra/voyageai";
import { rerankWithScorer, createVectorQueryTool } from "@mastra/rag";
// end-imports

// start-default-reranker
const defaultReranker = voyage.reranker;
// end-default-reranker

// start-reranker-factory
const customRerankerFunction = createVoyageReranker({
  model: "rerank-3",
  baseUrl: "https://ai.mongodb.com/v1",
});
// end-reranker-factory

// start-reranker-class
const customRerankerClass = new VoyageRelevanceScorer({
  model: "rerank-3-lite",
  baseUrl: "https://ai.mongodb.com/v1",
});
// end-reranker-class

// start-rerank-with-scorer
const reranker = createVoyageReranker({
  model: "rerank-3",
  baseUrl: "https://ai.mongodb.com/v1",
});

const results = await rerankWithScorer({
  results: vectorSearchResults,
  query: "How do I deploy to production?",
  scorer: reranker,
  options: { topK: 5 },  // Number of top results to return
});
// end-rerank-with-scorer

// start-vector-query-tool-reranking
const toolReranker = createVoyageReranker({
  model: "rerank-3",
  baseUrl: "https://ai.mongodb.com/v1",
});

const queryTool = createVectorQueryTool({
  vectorStoreName: "mongoVector",
  indexName: "vector_index",
  model: voyage.embedding({
    model: "voyage-4",
    baseUrl: "https://ai.mongodb.com/v1",
  }),
  reranker: { model: toolReranker, options: { topK: 5 } },
});
// end-vector-query-tool-reranking
