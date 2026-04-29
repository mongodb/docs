db.aggregate( [
   {
      $documents: [
         { val: null },
         {}
      ]
   },
   {
      $project: {
         hexHash: {
            $hexHash: {
               input: "$val",
               algorithm: "sha256"
            }
         }
      }
   }
] )
