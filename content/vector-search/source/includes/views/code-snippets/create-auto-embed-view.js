db.createView(
  "moviesWithAutomatedEmbedding",
  "embedded_movies",
  [
    {
      "$match": {
        "$expr": {
          "$ne": [
            {
              "$type": "$fullplot"
            },
            "missing"
          ]
        }
      }
    }
  ]
)