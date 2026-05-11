// :snippet-start: include-fields
db.movies.aggregate( [
   { $match: { title: "The Great Train Robbery" } },
   { $project: { title: 1, rated: 1 } },
   { $limit: 1 }
] )
// :snippet-end:
