db.all_dims_amazon_dataset.createSearchIndex(
  "all_dims_vector_index",
  "vectorSearch",
  {
    "fields": [
      {
        "numDimensions": 2048,
        "path": "embedding", // original 2048d embedding produced by voyage-3-large
        "quantization": "scalar", // adjust to binary when needed
        "similarity": "dotProduct",
        "type": "vector"
      },
      {
        "numDimensions": 1024,
        "path": "1024_embedding",
        "quantization": "scalar",
        "similarity": "cosine", // sliced embeddings aren't normalized, so must use cosine
        "type": "vector"
      },
      {
        "numDimensions": 512,
        "path": "512_embedding",
        "quantization": "scalar",
        "similarity": "cosine",
        "type": "vector"
      },
      {
        "numDimensions": 256,
        "path": "256_embedding",
        "quantization": "scalar",
        "similarity": "cosine",
        "type": "vector"
      }
    ]
  }
)