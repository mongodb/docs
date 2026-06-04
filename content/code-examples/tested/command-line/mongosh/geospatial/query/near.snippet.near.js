db.theaters.find(
   {
      "location.geo": {
         $near: {
            $geometry: {
               type: "Point",
               coordinates: [ -73.9667, 40.78 ]
            },
            $minDistance: 1000,
            $maxDistance: 100000
         }
      }
   }
).limit(3)
