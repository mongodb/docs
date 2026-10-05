db.movies.aggregate( [
   {
      $match : { genres: "Comedy" }
   },
   {
      $group:
         {
            _id: "Comedy",
            lowestRatedMovie:
               {
                  $bottom:
                  {
                     output: [ "$title", "$imdb.rating" ],
                     sortBy: { "imdb.rating": -1 }
                  }
               }
         }
   }
] )
