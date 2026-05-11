db.movies.aggregate( [
   { $match: { title: "The Great Train Robbery" } },
   {
      $project: {
         title: 1,
         leadActor: { $arrayElemAt: [ "$cast", 0 ] },
         releaseYear: "$year"
      }
   },
   { $limit: 1 }
] )
