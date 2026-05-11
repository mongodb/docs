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
         adjustedCoordinates: {
            $map: {
               input: "$location.geo.coordinates",
               as: "coord",
               in: { $add: [ "$$coord", 10 ] }
            }
         }
      }
   },
   { $sort: { theaterId: 1 } }
] )
