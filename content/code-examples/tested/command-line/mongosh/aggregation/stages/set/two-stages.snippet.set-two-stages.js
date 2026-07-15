db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   {
     $set: {
        imdbScoreScaled: { $multiply: [ "$imdb.rating", 10 ] },
        runtimeHours: {
           $floor: { $divide: [ "$runtime", 60 ] }
        }
     }
   },
   {
     $set: {
        totalScore: {
           $add: [ "$imdbScoreScaled", "$runtimeHours" ]
        }
     }
   }
] )
