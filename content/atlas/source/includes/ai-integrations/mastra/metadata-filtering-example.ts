const filteredResults = await mongoVector.query({
  indexName: "vector_index",           // Name of the vector search index
  queryVector: queryVector,            // Query embedding vector
  topK: 10,                            // Number of results to return
  filter: {
    year: { $gte: 1990, $lte: 2010 },  // Range comparison
  },
});
