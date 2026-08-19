// :snippet-start: create-compound-indexes
db.movies.createIndex( { year: 1, rated: 1 } )
db.movies.createIndex( { rated: 1, year: 1 } )
// :snippet-end:
