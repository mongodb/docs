db.movies.aggregate( [
   {
      $match: {
         rated: { $in: [ "G", "PG", "PG-13", "R" ] },
         "imdb.rating": { $gt: 0 }
      }
   },
   {
      $group: {
         _id: { rated: "$rated" },
         movies: {
            $topN: {
               output: { title: "$title", rating: "$imdb.rating" },
               n: {
                  $cond: {
                     if: { $eq: [ "$rated", "PG" ] },
                     then: 3,
                     else: 1
                  }
               },
               sortBy: { "imdb.rating": -1 }
            }
         }
      }
   },
   {
      $sort: { "_id.rated": 1 }
   }
] )
