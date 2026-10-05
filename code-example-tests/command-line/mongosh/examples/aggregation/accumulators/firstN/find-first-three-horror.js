db.movies.aggregate( [
   {
      $match: { genres: "Horror" }
   },
   {    
      $sort: { year: 1 }
   },
   {
      $group:
         {
            _id: "Horror",
            firstThreeMovies:
               {
                  $firstN:
                  {
                     input: [ "$title", "$year" ],
                     n: 3
                  }
               }
         }
   }
] )
