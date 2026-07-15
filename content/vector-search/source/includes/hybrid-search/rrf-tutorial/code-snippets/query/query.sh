db.embedded_movies.aggregate([
  {
    $rankFusion: {
      input: {
        pipelines: {
          vectorPipeline: [
            {
              "$vectorSearch": {
                "index": "hybrid-vector-search",
                "path": "plot_embedding_voyage_4_large",
                "queryVector": CHARMING_ANIMAL_EMBEDDING,
                "numCandidates": 500,
                "limit": 50
              }
            }
          ],
          fullTextPipeline: [
            {
              "$search": {
                "index": "hybrid-full-text-search",
                "text": {
                  "query": "charming animal",
                  "path": "fullplot",
                  "fuzzy": {}
                }
              }
            },
            { "$limit": 50 }
          ]
        }
      },
      combination: {
        weights: {
          vectorPipeline: 0.5,
          fullTextPipeline: 0.5
        }
      },
      "scoreDetails": true
    }
  },
  {
    "$project": {
      _id: 1,
      title: 1,
      fullplot: 1,
      scoreDetails: {"$meta": "scoreDetails"}
    }
  },
  {
    "$limit": 10
  }
]);