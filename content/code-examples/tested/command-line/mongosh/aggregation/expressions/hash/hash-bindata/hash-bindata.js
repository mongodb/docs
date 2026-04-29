db.binaries.aggregate( [
   {
      $project: {
         hash: {
            $hash: {
               input: "$data",
               algorithm: "sha256"
            }
         }
      }
   }
] )
