db.files.aggregate( [
   {
      $project: {
         filename: 1,
         hexHash: {
            $hexHash: {
               input: "$filename",
               algorithm: "sha256"
            }
         }
      }
   }
] )
