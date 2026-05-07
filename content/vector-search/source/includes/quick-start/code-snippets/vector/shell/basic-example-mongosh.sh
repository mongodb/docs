db.embedded_movies.createSearchIndex(
  "vector_index", 
  "vectorSearch", 
  {
    "fields": [
      {
        "type": "vector",
        "path": "plot_embedding_voyage_3_large",
        "numDimensions": 2048,
        "similarity": "dotProduct",
        "quantization": "scalar"
      }
    ]
  }
);