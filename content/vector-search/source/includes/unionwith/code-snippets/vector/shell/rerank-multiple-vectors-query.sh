db.embedded_movies.aggregate([
  {
    $rankFusion: {
      input: {
        pipelines: {
          vectorPipeline1: [
            {
              "$vectorSearch": {
                "index": "multiple-vector-search",
                "path": "plot_embedding_voyage_4_large",
                "queryVector": COMEDY_INVOLVING_GHOSTS,
                "numCandidates": 2000,
                "limit": 50
              }
            }
          ],
          vectorPipeline2: [
            {
              "$vectorSearch": {
                "index": "multiple-vector-search",
                "path": "plot_embedding_voyage_4_large",
                "queryVector": HUMOR_INVOLVING_PARANORMAL,
                "numCandidates": 2000,
                "limit": 50
              }
            }
          ]
        }
      },
      combination: {
        weights: {
          vectorPipeline1: 0.5,
          vectorPipeline2: 0.5
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
    "$limit": 50
  },
  {
    "$rerank": {
      "model": "rerank-2.5",
      "query": {
        "text": "light-hearted comedy with ghosts"
      },
      "path": "plot",
      "numDocsToRerank": 50
    }
  },
  {
    "$addFields": {
      "rerankScore": { "$meta": "score" }
    }
  },
  {
    "$limit": 20
  },
  {
    "$project": {
      _id: 0,
      title: 1,
      plot: 1,
      scoreDetails: 1,
      rerankScore: 1
    }
  }
]);