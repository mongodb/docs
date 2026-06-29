db.movies.createSearchIndex(
  "movie-semantic-index",
  "vectorSearch",
    {
      "fields": [
        {
          "type": "autoEmbed",
          "modality": "text",
          "path": "plot",
          "model": "voyage-4",
          "numDimensions": 1024,
          "similarity": "cosine",
          "indexingMethod": "hnsw",
          "hnswOptions": {
            "maxEdges": 16,
            "numEdgeCandidates": 50
          },
          "quantization": "scalar"
        },
        {
          "type": "filter",
          "path": "genre"
        }
      ]
    }
)