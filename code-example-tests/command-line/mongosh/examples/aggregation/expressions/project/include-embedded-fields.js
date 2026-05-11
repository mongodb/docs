// :snippet-start: include-embedded-fields
db.movies.aggregate( [
   { $match: { title: "The Great Train Robbery" } },
   { $project: { "imdb.rating": 1 } },
   { $limit: 1 }
] )
// :snippet-end:
