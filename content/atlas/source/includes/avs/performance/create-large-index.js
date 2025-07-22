db.large_amazon_dataset.createSearchIndex(
  "vectorSearch",
  "large_vector_index",
  {
    "fields": [
      {
        "numDimensions": 2048,
        "path": "embedding",
        "quantization": "scalar", // adjust to binary when needed
        "similarity": "dotProduct",
        "type": "vector"
      },
      {
        "path": "category",
        "type": "filter"
      },
      {
        "path": "price",
        "type": "filter"
      }
    ]
  }
)