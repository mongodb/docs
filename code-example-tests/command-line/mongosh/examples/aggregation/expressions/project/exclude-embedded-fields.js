// :snippet-start: exclude-embedded-fields
db.movies.aggregate( [
   { $match: { title: "The Great Train Robbery" } },
   { $project: { "imdb.id": 0, "type": 0 } },
   { $limit: 1 }
] )
// :snippet-end:
