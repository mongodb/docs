db.embedded_movies.createSearchIndex(
  "movie-vector-index",
  "vectorSearch",
  {
    fields: [
      { type: "vector", path: "plot_embedding_voyage_4_large", numDimensions: 2048, similarity: "dotProduct" }
    ]
  }
)