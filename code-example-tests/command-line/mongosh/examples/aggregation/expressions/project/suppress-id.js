// :snippet-start: suppress-id
db.movies.aggregate( [
   { $match: { title: "The Great Train Robbery" } },
   { $project : { _id: 0, title : 1, rated : 1 } },
   { $limit: 1 }
] )
// :snippet-end:
