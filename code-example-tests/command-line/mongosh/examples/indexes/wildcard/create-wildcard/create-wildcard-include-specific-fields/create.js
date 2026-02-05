// :snippet-start: create-wildcard-include-specific-fields
db.movies.createIndex( 
    { "$**": 1 },
    {
      "wildcardProjection": {
          "tomatoes.viewer": 1,
          "tomatoes.critic": 1
      }
    }
)
// :snippet-end: