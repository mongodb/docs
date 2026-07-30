[
  {
    "$vectorSearch": {
      "index": "autoEmbedIndex",
      "path": "fullplot",
      "query": {
        "text": "time travel"
      },
      "numCandidates": 100,
      "limit": 10
    }
  }
]