# filtered query
query = [
  {
    "$vectorSearch": {
      "index": "large_vector_index",
      "path": "embedding",
      "queryVector": embedding.tolist(),
      "limit": k,
      "numCandidates": candidates,
      "filter": {"$and": [{'price': {'$lte': 1000}}, {'category': {'$eq': "Pet Supplies"}}]}
    }
  },
  {
    "$project": {"embedding": 0}
  }
]