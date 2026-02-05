db.movies.createIndex( 
    { "$**": 1 },
    {
      "wildcardProjection": {
          "tomatoes.viewer": 1,
          "tomatoes.critic": 1
      }
    }
)
