db.theaters.find( {
   $or: [
      {
         "location.geo": {
            $geoIntersects: {
               $geometry: {
                  type: "Polygon",
                  coordinates: [
                     [ [ -74.5, 40.5 ], [ -73.5, 40.5 ],
                       [ -73.5, 41.0 ], [ -74.5, 40.5 ] ]
                  ]
               }
            }
         }
      },
      { "location.address.state": "NY" }
   ]
} )
