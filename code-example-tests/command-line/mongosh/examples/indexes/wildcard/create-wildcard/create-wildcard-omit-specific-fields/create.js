// :snippet-start: create-wildcard-omit-specific-fields
db.movies.createIndex( 
    { "$**": 1 },
    {
      "wildcardProjection": {
          "tomatoes.viewer": 0,
          "tomatoes.critic": 0
      }
    }
)
// :snippet-end: