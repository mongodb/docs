import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { MONGODB_PROMPT } from "@mastra/mongodb";
import { createVectorQueryTool } from "@mastra/rag";

// Create a vector query tool for the agent
const vectorQueryTool = createVectorQueryTool({
  vectorStoreName: "mongoVector",                    // Name of MongoDB vector store
  indexName: "vector_index",                         // Name of Vector Search index
  model: openai.embedding("text-embedding-3-small"), // Embedding model
});

// Define an AI agent with RAG capabilities
export const ragAgent = new Agent({
  name: 'RAG Agent',                 // Agent name
  model: openai('gpt-4o-mini'),      // LLM model
  instructions: `
  Process queries using the provided context. Structure responses to be concise and relevant.
  ${MONGODB_PROMPT}
  `,
  tools: { vectorQueryTool },        // Tools available to the agent
});