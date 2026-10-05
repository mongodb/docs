db.testScores.aggregate( [
   {
      $project: {
         _id: 0,
         studentId: 1,
         testPercentiles: {
            $percentile: {
               input: "$scores",
               p: [ 0.25, 0.5, 0.75 ],
               method: 'approximate'
            }
         }
      }
   }
] )
