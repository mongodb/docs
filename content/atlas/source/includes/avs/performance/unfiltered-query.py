# unfiltered query
query = [
  {
    "$vectorSearch": {
      "index": "large_vector_index",
      "path": "embedding",
      "queryVector": embedding.tolist(),
      "limit": k,
      "numCandidates": candidates,
    }
  },
  {
    "$project": {"embedding": 0}
  }
]