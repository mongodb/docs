// :snippet-start: array-size
db.movies.find( { genres: { $size: 3 } } )
// :snippet-end:
.limit(4)
