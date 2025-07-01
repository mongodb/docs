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
        "path": "plot_voyageai_embedding",
        "numDimensions": 1024,
        "similarity": "dotProduct"
      },
      {
        "type": "vector",
        "path": "title_embedding",
        "numDimensions": 3072,
        "similarity": "dotProduct"
      }
    ]
  }
);