db.theaters.aggregate( [
   {
      $match: {
         theaterId: { $in: [ 1000, 1003, 1008 ] }
      }
   },
   {
      $project: {
         _id: 0,
         theaterId: 1,
         integerCoordinates: {
            $map: {
               input: "$location.geo.coordinates",
               as: "coord",
               in: { $trunc: "$$coord" }
            }
         }
      }
   },
   { $sort: { theaterId: 1 } }
] )
