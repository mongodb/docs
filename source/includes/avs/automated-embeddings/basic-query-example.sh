db.movies.aggregate([
  {
    "$vectorSearch": {
      "index": "movies_automated_embeddings", 
      "path": "fullplot", 
      "query": "young heroes caught in epic struggles between light and darkness", 
      "numCandidates": 1000, 
      "limit": 10
    }
  },
  {
    "$project": {
      "_id": 0, 
      "title": 1, 
      "fullplot": 1, 
      "score": {"$meta": "vectorSearchScore"}
    }
  }
])