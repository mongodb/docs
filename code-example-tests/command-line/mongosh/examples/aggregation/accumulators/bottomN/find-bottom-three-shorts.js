db.movies.aggregate( [
   {
      $match: {
         genres: "Short",
         "imdb.rating": { $exists: true }
      }
   },
   {
      $group: {
         _id: "Short",
         lowestRatedMovies: {
            $bottomN: {
               output: [ "$title", "$imdb.rating" ],
               sortBy: { "imdb.rating": -1, title: 1 },
               n: 3
            }
         }
      }
   }
] )
