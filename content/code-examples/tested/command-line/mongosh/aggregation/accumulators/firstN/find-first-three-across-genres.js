db.movies.aggregate( [
   {
      $unwind: "$genres"
   },
   {
      $sort: { year: 1 }
   },
   {
      $group:
         {
            _id: "$genres",
            movies:
               {
                  $firstN:
                     {
                        input: [ "$title", "$year" ],
                        n: 3
                     }
               }
         }
   },
   { $sort: { _id: 1 } },
   { $limit: 5 }
] )
