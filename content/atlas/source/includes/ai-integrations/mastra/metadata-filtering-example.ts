// Query with metadata filters
const results = await mongoVector.query({
  indexName: "vector_index",           // Name of the vector search index
  queryVector: queryVector,            // Query embedding vector
  topK: 10,                            // Number of results to return
  filter: {
    category: "electronics",           // Simple equality filter
    price: { $gt: 100 },               // Numeric comparison
    tags: { $in: ["sale", "new"] },    // Array membership
  },
});
