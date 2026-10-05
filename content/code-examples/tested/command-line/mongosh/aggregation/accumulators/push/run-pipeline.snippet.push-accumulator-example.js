db.movies.aggregate( [
   {
      $match: {
         year: { $gte: 2010, $lte: 2015 },
         genres: { $exists: true, $ne: [] },
         directors: { $exists: true, $ne: [] }
      }
   },
   {
      $unwind: "$directors"
   },
   {
      $group: {
         _id: "$directors",
         genres: { $push: { $first: "$genres" } }
      }
   },
   {
      $sort: { _id: 1 }
   },
   {
      $limit: 5
   }
] )
