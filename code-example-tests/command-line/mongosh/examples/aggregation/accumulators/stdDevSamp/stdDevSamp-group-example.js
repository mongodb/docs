db.movies.aggregate( [
   {
      $match: {
         directors: { $exists: true },
         "imdb.rating": { $type: "double" }
      }
   },
   {
      $unwind: "$directors"
   },
   {
      $group: {
         _id: "$directors",
         movieCount: { $sum: 1 },
         stdDevSampRating: { $stdDevSamp: "$imdb.rating" }
      }
   },
   {
      $match: { movieCount: { $gte: 10 } }
   },
   {
      $sort: { stdDevSampRating: -1 }
   },
   {
      $limit: 5
   }
] )
