db.embedded_movies.aggregate([
  {
    "$vectorSearch": {
      "index": "vector_index",
      "path": "plot_embedding_voyage_4_large",
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
      "numCandidates": 100,
      "limit": 50
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
  },
  {
    "$rerank": {
      "query": {
        "text": "time travel"
      },
      "path": "plot",
      "numDocsToRerank": 50,
      "model": "rerank-2.5"
    }
  },
  {
    "$addFields": {
      "rerankScore": { "$meta": "score" }
    }
  },
  {
    "$project": {
      "_id": 0,
      "plot": 1,
      "title": 1,
      "genres": 1,
      "score": { $meta: "vectorSearchScore" },
      "rerankScore": { $meta: "score" }
    }
  },
  { "$limit": 10 }
])