db.movies.aggregate( [
   {
      $match: {
         title: { $in: [ "The Godfather", "Spirited Away", "The Dark Knight" ] }
      }
   },
   {
      $addFields: {
         lastCast: { $last: "$cast" }
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         cast: 1,
         lastCast: 1
      }
   },
   { $sort: { title: 1 } }
] )
