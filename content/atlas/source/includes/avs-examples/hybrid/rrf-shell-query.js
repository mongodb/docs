var vector_weight = 0.1;
var full_text_weight = 0.9;

db.embedded_movies.aggregate([
  {
    "$rankFusion": {
      "input": {
        "pipelines": {
          "vectorSearchPipeline": [
            {
              "$vectorSearch": {
                "index": "hybrid-vector-search",
                "path": "plot_embedding",
                "queryVector": QUERY_EMBEDDING,
                "numCandidates": 100,
                "limit": 20
              }
            },
            {
              "$addFields": {
                "score": {
                  "$multiply": [
                    vector_weight,
                    {
                      "$divide": [
                        1.0,
                        { "$add": ["$rank", 60] }
                      ]
                    }
                  ]
                }
              }
            },
            {
              "$project": {
                "_id": 1,
                "title": 1,
                "score": 1
              }
            }
          ],
          "fullTextSearchPipeline": [
            {
              "$search": {
                "index": "hybrid-full-text-search",
                "phrase": {
                  "query": "star wars",
                  "path": "title"
                }
              }
            },
            {
              "$limit": 20
            },
            {
              "$addFields": {
                "score": {
                  "$multiply": [
                    full_text_weight,
                    {
                      "$divide": [
                        1.0,
                        { "$add": ["$rank", 60] }
                      ]
                    }
                  ]
                }
              }
            },
            {
              "$project": {
                "_id": 1,
                "title": 1,
                "score": 1
              }
            }
          ]
        }
      },
      "combination": {
        "weights": {
          "vectorSearchPipeline": vector_weight,
          "fullTextSearchPipeline": full_text_weight
        }
      },
      "scoreDetails": true
    }
  },
  {
    "$sort": { "score": -1 }
  },
  {
    "$limit": 10
  }
]);
