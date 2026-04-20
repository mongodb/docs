// :snippet-start: match-exact-array
db.movies.find( { genres: ["Action", "Comedy"] } )
// :snippet-end:
.limit(5)
