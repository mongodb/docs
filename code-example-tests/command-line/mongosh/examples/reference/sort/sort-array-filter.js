// :snippet-start: sort-array-filter
db.movies.find(
   { genres: { $gt: "P" } },
   { _id: 0, title: 1, genres: 1 }
).sort( { genres: 1 } ).limit( 3 )
// :snippet-end:
