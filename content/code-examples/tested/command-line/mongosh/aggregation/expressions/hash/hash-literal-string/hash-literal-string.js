db.aggregate( [
   { $documents: [ { val: "hello" } ] },
   {
      $project: {
         _id: 0,
         hash: {
            $hash: {
               input: "$val",
               algorithm: "xxh64"
            }
         }
      }
   }
] )
