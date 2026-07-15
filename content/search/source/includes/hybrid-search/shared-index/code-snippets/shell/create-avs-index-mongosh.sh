db.embedded_movies.createSearchIndex(
  "hybrid-vector-search", 
  "vectorSearch", 
  {
    "fields": [
      {
        "type": "vector",
        "path": "plot_embedding_voyage_4_large",
        "numDimensions": 2048,
        "similarity": "dotProduct"
      }
    ]
  }
);