// :snippet-start: sort-array-descending
db.movies.find(
   { genres: { $exists: true, $ne: [] } },
   { _id: 0, title: 1, genres: 1 }
).sort( { genres: -1 } ).limit( 3 )
// :snippet-end:
