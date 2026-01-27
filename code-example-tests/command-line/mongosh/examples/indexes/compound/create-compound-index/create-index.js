// :snippet-start: create-compound-index-movies
db.movies.createIndex( { year: 1, runtime: 1, title: 1 } )
// :snippet-end:
