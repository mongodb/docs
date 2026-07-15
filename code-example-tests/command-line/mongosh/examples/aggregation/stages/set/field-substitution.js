// :snippet-start: set-field-substitution
db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   { $set: { _id: "$title", title: "movie" } }
] )
// :snippet-end:
