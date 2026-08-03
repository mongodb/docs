db.moviesWithEmbeddings.createSearchIndex(
  "embeddingsIndex",
  "vectorSearch",
  {
    "fields": [
      {
        "type": "vector",
        "numDimensions": 2048,
        "path": "plot_embedding_voyage_4_large",
        "similarity": "cosine"
      }
    ]
  }
)