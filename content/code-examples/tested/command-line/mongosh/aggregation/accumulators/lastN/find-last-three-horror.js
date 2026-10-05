db.movies.aggregate( [
   {
      $match: { genres: "Horror", year: { $type: "int" } }
   },
   {
      $sort: { year: 1, title: 1 }
   },
   {
      $group:
         {
            _id: "Horror",
            lastThreeMovies:
               {
                  $lastN:
                  {
                     input: [ "$title", "$year" ],
                     n: 3
                  }
               }
         }
   }
] )
