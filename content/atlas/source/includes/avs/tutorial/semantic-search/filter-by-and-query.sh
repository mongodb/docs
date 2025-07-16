db.embedded_movies.aggregate([
  {
    "$vectorSearch": {
      "index": "vector_index",
      "path": "plot_embedding_voyage_3_large",
      "filter": {
        "$and": [{
          "genres": { 
            "$nin": ["Drama", "Western", "Crime"],
            "$in": ["Action", "Adventure", "Family"]
          }, 
        }, {
          "year": { 
            "$gte": 1960,
            "$lte": 2000 
          }
        }]
      },
      "queryVector": KIDS_ADVENTURE_EMBEDDING,
      "numCandidates": 200,
      "limit": 10
    }
  },
  {
    "$project": {
      "_id": 0,
      "title": 1,
      "genres": 1,
      "plot": 1,
      "year": 1,
      "score": { $meta: "vectorSearchScore" }
    }
  }
])