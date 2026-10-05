db.movies.aggregate( [
   {
      $match: {
         title: { $in: [ "The Godfather", "Pulp Fiction", "Forrest Gump" ] }
      }
   },
   {
      $addFields: {
         topBilledActor: { $first: "$cast" }
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         cast: 1,
         topBilledActor: 1
      }
   },
   { $sort: { title: 1 } }
] )
