db.movies.aggregate( [
   {
      $unwind: "$genres"
   },
   {
      $match: {
         "imdb.rating": { $gt: 0 }
      }
   },
   {
      $group: {
         _id: "$genres",
         topRatedMovies: {
            $topN: {
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
