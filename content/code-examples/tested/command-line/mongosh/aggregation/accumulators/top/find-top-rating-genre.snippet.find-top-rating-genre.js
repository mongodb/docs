db.movies.aggregate( [
   {
      $match: {
         genres: "Comedy",
         "imdb.rating": { $gt: 0 }
      }
   },
   {
      $group:
         {
            _id: "Comedy",
            highestRatedMovie:
               {
                  $top:
                  {
                     output: [ "$title", "$imdb.rating" ],
                     sortBy: { "imdb.rating": -1 }
                  }
               }
         }
   }
] )
