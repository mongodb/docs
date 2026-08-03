db.embedded_movies.aggregate([
  {
    $rankFusion: {
      input: {
        pipelines: {
          vectorPipeline1: [
            {
              "$vectorSearch": {
                "index": "multiple-auto-embed-search",
                "path": "fullplot",
                "query": {
                  "text": "battle between good and evil"
                },
                "numCandidates": 2000,
                "limit": 200
              }
            }
          ],
          vectorPipeline2: [
            {
              "$vectorSearch": {
                "index": "multiple-auto-embed-search",
                "path": "title",
                "query": {
                  "text": "battle between good and evil"
                },
                "numCandidates": 2000,
                "limit": 200
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
      fullplot: 1,
      plot: 1,
      scoreDetails: {"$meta": "scoreDetails"}
    }
  },
  {
    "$limit": 200
  },
  {
    "$match": {
      "fullplot": { "$exists": true, "$type": "string" }
    }
  },
  {
    "$rerank": {
      "model": "rerank-2.5",
      "query": {
        "text": "battle between good and evil"
      },
      "path": "fullplot",
      "numDocsToRerank": 200
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
      "_id": 0,
      "title": 1,
      "fullplot": 1,
      "plot": 1,
      "scoreDetails": 1,
      "rerankScore": 1
    }
  }
]);