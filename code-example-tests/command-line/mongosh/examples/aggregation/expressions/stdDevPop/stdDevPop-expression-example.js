db.testScores.aggregate( [
   {
      $project: {
         _id: 0,
         studentId: 1,
         scoreStdDev: {
            $stdDevPop: "$scores"
         }
      }
   }
] )
