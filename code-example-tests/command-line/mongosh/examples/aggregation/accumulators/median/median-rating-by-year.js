db.movies.aggregate( [
   {
      $match: {
         genres: "Action",
         year: { $gte: 2000, $lte: 2004 },
         "imdb.rating": { $gt: 0 }
      }
   },
   {
      $group: {
         _id: "$year",
         medianRating: {
            $median: {
               input: "$imdb.rating",
               method: "approximate"
            }
         }
      }
   },
   { $sort: { _id: 1 } }
] )
