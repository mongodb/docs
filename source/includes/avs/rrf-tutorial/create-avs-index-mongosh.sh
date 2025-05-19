db.embedded_movies.createSearchIndex(
  "hybrid-vector-search", 
  "vectorSearch", 
  {
    "fields": [
      {
        "type": "vector",
        "path": "plot_embedding",
        "numDimensions": 1536,
        "similarity": "dotProduct"
      }
    ]
  }
);