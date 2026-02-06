db.runCommand( 
   { 
      update: "movies",
      updates: [
      {
         q: { 
            year: { $gte: 2000, $lte: 2005 },
            "imdb.rating": { $type: "number" }
         }, 
         u: { $inc: { "imdb.rating": 1 } },
         multi: true
      }
      ]
   }
)