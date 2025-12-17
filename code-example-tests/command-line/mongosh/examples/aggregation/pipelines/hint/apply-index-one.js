// :snippet-start: agg-year-index
db.movies.createIndex( { "imdb.rating": 1, year: 1 } )
// :snippet-end:
