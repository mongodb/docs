db.theaters.aggregate( [
   {
      $geoNear: {
         near: { type: "Point", coordinates: [ -73.9667, 40.78 ] },
         spherical: true,
         query: { "location.address.state": "NY" },
         distanceField: "calcDistance"
      }
   },
   { $limit: 3 }
] )
