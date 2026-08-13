{
  "fields": [
    {
      "type": "autoEmbed",
      "modality": "text",
      "path": "<field-name>",
      "model": "voyage-4-large | voyage-4 | voyage-4-lite | voyage-code-3",
      "numDimensions": 256 | 512 | 1024 | 2048,
      "quantization": "float | scalar | binary | binaryNoRescore",
      "similarity": "dotProduct | cosine | euclidean",
      "indexingMethod": "flat | hnsw",
      "hnswOptions": {
        "maxEdges": <number-of-connected-neighbors>,
        "numEdgeCandidates": <number-of-nearest-neighbors>
      }
    },
    {
      "type": "filter",
      "path": "<field-to-index>"
    },
    ...
  ]
}