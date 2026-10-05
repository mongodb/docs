db.movies.aggregate( [
   {
      $unwind: "$genres"
   },
   {
      $group:
         {
            _id: "$genres",
            minThreeRatings:
               {
                  $minN:
                     {
                        input: "$imdb.rating",
                        n: 3
                     }
               }
         }
   },
   { $sort: { _id: 1 } },
   { $limit: 5 }
] )
