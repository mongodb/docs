db.movies.aggregate( [
   {
      $match: { genres: "Horror" }
   },
   {
      $group:
         {
            _id: "Horror",
            minThreeRatings:
               {
                  $minN:
                  {
                     input: "$imdb.rating",
                     n: 3
                  }
               }
         }
   }
] )
