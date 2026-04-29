db.aggregate( [
   {
      $documents: [
         { val: null },
         {}
      ]
   },
   {
      $project: {
         hash: {
            $hash: {
               input: "$val",
               algorithm: "sha256"
            }
         }
      }
   }
] )
