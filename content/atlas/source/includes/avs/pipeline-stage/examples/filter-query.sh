db.embedded_movies.aggregate([
  {
    "$vectorSearch": {
      "index": "vector_index",
      "path": "plot_embedding_voyage_3_large",
      "filter": {
        "$and": [
          {
            "year": {  "$gt": 1955  }
          }, 
          {
            "year": {  "$lt": 1975 }
          }
        ]
      },
      "queryVector": KIDS_ADVENTURE_EMBEDDING,
      "numCandidates": 150,
      "limit": 10
    }
  },
  {
    "$project": {
      "_id": 0,
      "title": 1,
      "plot": 1,
      "year": 1,
      "score": { $meta: "vectorSearchScore" }
    }
  }
])