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
         stdDevRating: { $stdDevPop: "$imdb.rating" }
      }
   },
   {
      $match: { movieCount: { $gte: 10 } }
   },
   {
      $sort: { stdDevRating: -1 }
   },
   {
      $limit: 5
   }
] )
