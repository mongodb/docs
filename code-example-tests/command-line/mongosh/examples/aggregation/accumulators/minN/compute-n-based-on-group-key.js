db.movies.aggregate( [
   { $match: { rated: { $in: [ "G", "PG", "PG-13", "R" ] } } },
   {
      $group:
         {
            _id: { "rated": "$rated" },
            minMovies:
               {
                  $minN:
                     {
                        input: "$imdb.rating",
                        n: { $cond: { if: { $eq: [ "$rated", "R" ] }, then: 3, else: 1 } }
                     }
               }
         }
   }
] )
