db.movies.aggregate( [
   {
      $match: {
         title: { $in: [ "The Godfather", "Spirited Away", "The Dark Knight" ] }
      }
   },
   {
      $addFields: {
         lastThreeCast: { $lastN: { input: "$cast", n: 3 } }
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         cast: 1,
         lastThreeCast: 1
      }
   },
   {
      $sort: { title: 1 }
   }
] )
