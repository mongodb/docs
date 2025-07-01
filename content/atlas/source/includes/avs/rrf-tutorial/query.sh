db.embedded_movies.aggregate([
  {
    $rankFusion: {
      input: {
        pipelines: {
          vectorPipeline: [
            {
              "$vectorSearch": {
                "index": "hybrid-vector-search",
                "path": "plot_embedding",
                "queryVector": STAR_WARS_EMBEDDING,
                "numCandidates": 100,
                "limit": 20
              }
            }
          ],
          fullTextPipeline: [
            {
              "$search": {
                "index": "hybrid-full-text-search",
                "phrase": {
                  "query": "star wars",
                  "path": "title"
                }
              }
            },
            { "$limit": 20 }
          ]
        }
      },
      combination: {
        weights: {
          vectorPipeline: 0.7,
          fullTextPipeline: 0.3
        }
      },
      "scoreDetails": true
    }
  },
  {
    "$project": {
      _id: 1,
      title: 1,
      plot: 1,
      scoreDetails: {"$meta": "scoreDetails"}
    }
  },
  {
    "$limit": 20
  }
]);
