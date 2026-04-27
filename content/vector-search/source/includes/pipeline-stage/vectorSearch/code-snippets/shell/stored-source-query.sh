db.embedded_movies.aggregate([
  {
    "$vectorSearch": {
      "index": "vector_index",
      "path": "plot_embedding_voyage_3_large",
      "filter": {
        "$and": [
          {
            "year": {  "$gte": 1970  }
          }, 
          {
            "year": {  "$lte": 2020 }
          },
          {  
            "genres": { "$in": ["Action", "Drama", "Comedy"] }  
          }
        ]
      },
      "queryVector": MARTIAL_ARTS_EMBEDDINGS,
      "numCandidates": 1000,
      "limit": 10,
      "returnStoredSource": true
    }
  },
  {
    "$project": {
      "_id": 0,
      "title": 1,
      "plot": 1,
      "genres": 1,
      "score": { $meta: "vectorSearchScore" }
    }
  }
])