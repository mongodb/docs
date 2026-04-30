db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   {
      $addFields: {
         runtimeHours: {
            $floor: { $divide: [ "$runtime", 60 ] }
         },
         ratingOutOf100: { $multiply: [ "$imdb.rating", 10 ] }
      }
   },
   {
      $addFields: {
         licenseFeeUSD: {
            $multiply: [ "$runtimeHours", 0.50 ]
         }
      }
   }
] )
