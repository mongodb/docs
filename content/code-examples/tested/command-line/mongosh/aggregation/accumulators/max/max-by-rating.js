db.movies.aggregate( [
   {
      $match: {
         rated: { $in: [ "G", "PG", "PG-13", "R" ] },
         "imdb.rating": { $gt: 0 },
         runtime: { $gt: 0 }
      }
   },
   { $sort: { rated: 1 } },
   {
      $group: {
         _id: "$rated",
         maxImdbRating: { $max: "$imdb.rating" },
         maxRuntime: { $max: "$runtime" }
      }
   },
   { $sort: { _id: 1 } }
] )
