db.movies.aggregate( [
   {
      $match: {
         "imdb.rating": { $exists: true },
         year: { $gte: 2010, $lte: 2012 }
      }
   },
   {
      $group:
      {
         _id: "$year",
         lowestRatedMovie:
            {
               $bottom:
                  {
                     output: [ "$title", "$imdb.rating" ],
                     sortBy: { "imdb.rating": -1 }
                  }
            }
      }
   },
   {
      $sort: { _id: 1 }
   }
] )
