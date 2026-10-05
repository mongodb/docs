db.movies.aggregate( [
   {
      $match: {
         rated: { $in: [ "G", "PG", "PG-13", "R" ] },
         year: { $type: "int" },
         title: { $regex: "^[A-Za-z0-9]" }
      }
   },
   { $sort: { title: 1 } },
   {
      $group:
         {
            _id: { rated: "$rated" },
            movies:
               {
                  $lastN:
                     {
                        input: "$title",
                        n: { $cond: { if: { $eq: ["$rated", "PG"] }, then: 3, else: 1 } }
                     }
               }
         }
   },
   { $sort: { "_id.rated": 1 } }
] )
