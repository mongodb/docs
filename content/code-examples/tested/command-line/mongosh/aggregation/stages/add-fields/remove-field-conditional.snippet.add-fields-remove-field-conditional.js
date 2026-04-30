db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   {
      $addFields:
         {
            rated: {
               $ifNull: [ "$rated", "$$REMOVE" ]
            }
         }
   }
] )
