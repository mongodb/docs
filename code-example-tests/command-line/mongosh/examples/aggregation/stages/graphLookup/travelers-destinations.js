// :snippet-start: travelers-destinations
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
// :snippet-end:
