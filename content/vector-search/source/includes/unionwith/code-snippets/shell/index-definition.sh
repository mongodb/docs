db.embedded_movies.createSearchIndex(
  "multiple-vector-search", 
  "vectorSearch", 
  {
    "fields": [
      {
        "type": "vector",
        "path": "plot_embedding",
        "numDimensions": 1536,
        "similarity": "dotProduct"
      },
      {
        "type": "vector",
        "path": "plot_embedding_voyage_3_large",
        "numDimensions": 2048,
        "similarity": "dotProduct"
      },
      {
        "type": "vector",
        "path": "title_voyageai_embedding",
        "numDimensions": 2048,
        "similarity": "dotProduct"
      }
    ]
  }
);