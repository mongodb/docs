db.embedded_movies.createSearchIndex(
  "vector_index", 
  "vectorSearch", 
  {
    "fields": [
      {
        "type": "vector",
        "path": "plot_embedding_voyage_4_large",
        "numDimensions": 2048,
        "similarity": "dotProduct"
      },
      {
        "type": "vector",
        "path": "plot_embedding",
        "numDimensions": 1536,
        "similarity": "dotProduct"
      },
      {
        "type": "filter",
        "path": "genres"
      },
      {
        "type": "filter",
        "path": "year"
      }
    ]
  }
);