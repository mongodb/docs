// :snippet-start: new-array-fields-null
db.movies.aggregate( [
   { $match: { title: "The Great Train Robbery" } },
   { $project: { myArray: [ "$year", "$runtime", "$someField" ] } },
   { $limit: 1 }
] )
// :snippet-end:
