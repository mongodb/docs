// :snippet-start: array-index
db.movies.find( { "cast.0": "Tom Hanks" } )
// :snippet-end:
.limit(5)
