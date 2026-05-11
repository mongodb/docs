// :snippet-start: exclude-fields
db.movies.aggregate( [
   { $match: { title: "The Great Train Robbery" } },
   { $project : { "rated": 0 } },
   { $limit: 1 }
] )
// :snippet-end:
