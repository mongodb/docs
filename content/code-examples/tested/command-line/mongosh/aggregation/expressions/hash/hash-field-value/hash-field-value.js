db.files.aggregate( [
   {
      $project: {
         filename: 1,
         hash: {
            $hash: {
               input: "$filename",
               algorithm: "sha256"
            }
         }
      }
   }
] )
