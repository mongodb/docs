db.embedded_movies.aggregate([
  {
    "$vectorSearch": {
      "index": "vector_index",
      "path": "plot_embedding_voyage_3_large",
      "filter": {
        "$and": [
          {
            "genres": { "$eq": "Action" }
          }, 
          {
            "genres": { "$ne": "Comedy" }
          }
        ]
      },
      "queryVector": TIME_TRAVEL_EMBEDDING,
      "exact": true,
      "limit": 10
    }
  },
  {
    "$project": {    
      "_id": 0,
      "plot": 1,
      "title": 1,
      "genres": 1,
      "score": { $meta: "vectorSearchScore" }    
    }
  }
])