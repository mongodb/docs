db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   {
      $set: {
         "imdb.normalizedRating": {
            $multiply: [ "$imdb.rating", 10 ]
         }
      }
   }
] )
