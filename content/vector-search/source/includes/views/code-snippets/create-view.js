db.createView(
"moviesWithEmbeddings",
"embedded_movies",
  [
    {
      "$match": {
        "$expr": {
          "$ne": [
            {
              "$type": "$plot_embedding_voyage_4_large"
            },
            "missing"
          ]
        }
      }
    }
  ]
)