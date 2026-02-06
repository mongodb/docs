db.runCommand(
   {
      explain: {
         update: "movies",
         updates: [ 
         { q: { "num_mflix_comments": { $lte: 5 }, "year": { $gte: 2000 } }, u: { $inc: { "num_mflix_comments": 1 } }, hint: { year: 1 }, multi: true }
         ]
      },
      verbosity: "queryPlanner"
   }
)
