db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   {
      $addFields: { plot: "$$REMOVE" }
   }
] )
