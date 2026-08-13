// :snippet-start: create-indexes
db.movies.createIndex( { year: 1 } )
db.movies.createIndex( { year: 1, runtime: 1 } )
db.movies.createIndex(
   { year: 1, "imdb.rating": 1 },
   { partialFilterExpression: { year: { $gt: 2000 } } }
)
// :snippet-end:
