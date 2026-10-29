// :snippet-start: create-indexes
db.movies.createIndex( { year: 1, title: 1 } )
db.movies.createIndex( { rated: 1, year: 1 } )
db.movies.createIndex(
   { metacritic: 1 },
   { partialFilterExpression: { rated: "R" } }
)
// :snippet-end:
