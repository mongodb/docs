db.movies.createIndex( 
    { "$**": 1 },
    {
      "wildcardProjection": {
          "tomatoes.viewer": 0,
          "tomatoes.critic": 0
      }
    }
)
