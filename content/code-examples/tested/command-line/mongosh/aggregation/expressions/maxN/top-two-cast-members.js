db.movies.aggregate( [
   {
      $match: {
         title: { $in: [ "The Godfather", "Spirited Away", "The Dark Knight" ] }
      }
   },
   {
      $addFields: {
         topTwoCast: { $maxN: { n: 2, input: "$cast" } }
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         cast: 1,
         topTwoCast: 1
      }
   },
   {
      $sort: { title: 1 }
   }
] )
