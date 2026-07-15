// :snippet-start: set-overwrite-field
db.movies.aggregate( [
   { $match: { title: "Baseball" } },
   { $set: { rated: "UNRATED" } }
] )
// :snippet-end:
