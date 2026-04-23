db.movies.aggregate([
  {
    "$vectorSearch": {
      "index": "vector_index", 
      "path": "fullplot", 
      "query": {
        "text": "journey through the country side"
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