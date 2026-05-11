db.aggregate( [
   {
      $documents: [
         { student_id: 1, scores: [ 0.75, 0.65, 0.73 ] },
         { student_id: 2, scores: [ 0.9, 0.88, 0.98 ] },
         { student_id: 3, scores: [ 0.9, 0.84, 0.93 ] }
      ]
   }, {
      $match: {
         scores: { $elemMatch: { $gte: 0.9 } }
      }
   }
] )
