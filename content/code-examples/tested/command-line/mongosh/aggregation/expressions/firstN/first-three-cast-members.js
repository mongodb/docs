db.movies.aggregate( [
   {
      $match: {
         title: { $in: [ "The Godfather", "Spirited Away", "The Dark Knight" ] }
      }
   },
   {
      $addFields: {
         firstThreeCast: { $firstN: { input: "$cast", n: 3 } }
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         cast: 1,
         firstThreeCast: 1
      }
   },
   {
      $sort: { title: 1 }
   }
] )
