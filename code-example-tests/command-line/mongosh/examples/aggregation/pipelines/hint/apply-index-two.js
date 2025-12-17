// :snippet-start: agg-rated-index
db.movies.createIndex( { "imdb.rating": 1, rated: 1 } )
// :snippet-end:
