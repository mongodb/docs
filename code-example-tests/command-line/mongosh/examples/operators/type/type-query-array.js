// :snippet-start: type-query-array
db.movies.find(
   { genres: { $type: "array" }, runtime: { $gt: 1000 } },
   { _id: 0, title: 1, genres: 1 }
)
// :snippet-end:
