db.movies.aggregate([
   { $match: { rated: { $in: ["G", "PG", "PG-13", "R"] } } },
   { $sort: { title: 1 } },
   {
      $group:
         {
            _id: {"rated": "$rated"},
            movies:
               {
                  $firstN:
                     {
                        input: "$title",
                        n: { $cond: { if: { $eq: ["$rated", "PG"] }, then: 3, else: 1 } }
                     }
               }
         }
   }
] )
