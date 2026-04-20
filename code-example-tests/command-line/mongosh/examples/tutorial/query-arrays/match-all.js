// :snippet-start: match-all
db.movies.find( { genres: { $all: ["Action", "Comedy"] } } )
// :snippet-end:
.limit(5)
