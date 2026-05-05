db.travelers.aggregate( [
   {
      $graphLookup: {
         from: "airports",
         startWith: "$nearestAirport",
         connectFromField: "connects",
         connectToField: "airport",
         maxDepth: 2,
         depthField: "numConnections",
         as: "destinations"
      }
   }
] )
