db.movies.aggregate( [
   {
      $unwind: "$genres"
   },
   {
      $match: {
         "imdb.rating": { $exists: true }
      }
   },
   {
      $group: {
         _id: "$genres",
         lowestRatedMovie: {
            $bottomN: {
               output: [ "$title", "$imdb.rating" ],
               sortBy: { "imdb.rating": -1, title: 1 },
               n: 3
            }
         }
      }
   },
   {
      $sort: { _id: 1 }
   },
   {
      $limit: 5
   }
] )
