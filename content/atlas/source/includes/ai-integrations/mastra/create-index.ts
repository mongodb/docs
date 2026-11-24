// Create a vector search index
await mongoVector.createIndex({
  indexName: "vector_index",       // Name of the index
  dimension: 1024,                 // Must match your embedding model's dimensions
});

// Waits for the index to finish building before writing to it
await mongoVector.waitForIndexReady({
  indexName: "vector_index",
  timeoutMs: 300000,
});