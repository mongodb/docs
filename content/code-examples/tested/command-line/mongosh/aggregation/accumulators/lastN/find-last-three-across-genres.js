db.movies.aggregate( [
   {
      $match: { year: { $type: "int" } }
   },
   {
      $unwind: "$genres"
   },
   {
      $sort: { year: 1, title: 1 }
   },
   {
      $group:
         {
            _id: "$genres",
            movies:
               {
                  $lastN:
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
