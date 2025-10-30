// Create a vector search index
await mongoVector.createIndex({
  indexName: "vector_index",       // Name of the index
  dimension: 1536,                 // Must match your embedding model's dimensions
});