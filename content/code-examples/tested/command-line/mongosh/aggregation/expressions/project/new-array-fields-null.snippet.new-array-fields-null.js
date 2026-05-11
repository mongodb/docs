db.movies.aggregate( [
   { $match: { title: "The Great Train Robbery" } },
   { $project: { myArray: [ "$year", "$runtime", "$someField" ] } },
   { $limit: 1 }
] )
