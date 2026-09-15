import { VoyageAIClient } from "voyageai";

// To use a model API key created in the Atlas UI, set the
// environment option to https://ai.mongodb.com/v1
const client = new VoyageAIClient({
  apiKey: process.env.VOYAGE_API_KEY,
  environment: "https://ai.mongodb.com/v1",
});

// Each inner array contains the chunks of one document
const inputs = [
  [
    "This is the SEC filing on Leafy Inc.'s Q2 2024 performance.",
    "The company's revenue increased by 15% compared to the previous quarter.",
  ],
  [
    "This is the SEC filing on Elephant Ltd.'s Q2 2024 performance.",
    "The company's revenue decreased by 2% compared to the previous quarter.",
  ],
];

const result = await client.contextualizedEmbed({
  inputs: inputs,
  model: "voyage-context-4",
  inputType: "document",
});

console.log(`Embedding dimension: ${result.results[0].embeddings[0].length}`);
console.log(`Total tokens used: ${result.totalTokens}`);
