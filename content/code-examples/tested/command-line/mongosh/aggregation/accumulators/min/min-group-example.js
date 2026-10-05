db.movies.aggregate( [
   {
      $match: {
         rated: { $in: [ "G", "PG", "PG-13", "R" ] },
         "imdb.rating": { $type: "double" }
      }
   },
   {
      $group: {
         _id: "$rated",
         lowestRating: { $min: "$imdb.rating" }
      }
   },
   {
      $sort: { _id: 1 }
   }
] )
