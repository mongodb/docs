db.testScores.aggregate( [
   {
      $project: {
         _id: 0,
         studentId: 1,
         testMedians: {
            $median: {
               input: "$scores",
               method: 'approximate'
            }
         }
      }
   }
] )
