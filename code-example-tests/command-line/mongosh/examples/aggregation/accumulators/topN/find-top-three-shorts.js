db.movies.aggregate( [
   {
      $match: {
         genres: "Short",
         "imdb.rating": { $gt: 0 }
      }
   },
   {
      $group: {
         _id: "Short",
         topRatedMovies: {
            $topN: {
               output: [ "$title", "$imdb.rating" ],
               sortBy: { "imdb.rating": -1, title: 1 },
               n: 3
            }
         }
      }
   }
] )
