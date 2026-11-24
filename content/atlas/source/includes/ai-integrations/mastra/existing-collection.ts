// start-create-index-manual
await mongoVector.createIndex({
  indexName: "movies_index",
  collectionName: "movies",
  dimension: 1024,
  filterFields: ["year"],
});

await mongoVector.waitForIndexReady({
  indexName: "movies_index",
  timeoutMs: 300000,
});
// end-create-index-manual

// start-create-index-auto
await mongoVector.createIndex({
  indexName: "movies_index",
  collectionName: "movies",
  autoEmbed: { model: "voyage-4", path: "plot" },
  filterFields: ["year"],
});

await mongoVector.waitForIndexReady({
  indexName: "movies_index",
  timeoutMs: 300000,
});
// end-create-index-auto

// start-query-manual
import { voyageEmbedding } from "@mastra/voyageai";

const voyage = voyageEmbedding({
  model: "voyage-4",
  baseUrl: "https://ai.mongodb.com/v1",
  inputType: "query",
});

const { embeddings } = await voyage.doEmbed({
  values: ["space opera about isolation"],
});
const queryEmbedding = embeddings[0];

const results = await mongoVector.query({
  indexName: "movies_index",
  queryVector: queryEmbedding,
  topK: 5,
  metadataMode: "document",
  filter: { year: { $gt: 1970 } },
});
// end-query-manual

// start-query-auto
const results = await mongoVector.query({
  indexName: "movies_index",
  queryText: "space opera about isolation",
  topK: 5,
  metadataMode: "document",
  filter: { year: { $gt: 1970 } },
});
// end-query-auto

// start-delete-index
await mongoVector.deleteIndex({ indexName: "movies_index" });
// end-delete-index
