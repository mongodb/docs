db.movies.aggregate( [
   { $match: { title: "Baseball" } },
   { $set: { rated: "UNRATED" } }
] )
