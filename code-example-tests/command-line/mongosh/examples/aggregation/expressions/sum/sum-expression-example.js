db.movies.aggregate( [
   {
      $match: {
         title: {
            $in: [
               "The Godfather",
               "Inception",
               "The Dark Knight"
            ]
         }
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         totalAwards: { $sum: [ "$awards.wins", "$awards.nominations" ] }
      }
   },
   {
      $sort: { totalAwards: -1 }
   }
] )
