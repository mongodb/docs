db.movies.aggregate([
  {
    "$vectorSearch": {
      "index": "vector_index", 
      "path": "fullplot", 
      "query": {
        "text": "young heroes caught in epic struggles between light and darkness"
      }, 
      "numCandidates": 100, 
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