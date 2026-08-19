db.runCommand(
   {
     explain: {
        update: "movies",
        updates: [
           {
               q: { year: 2000, rated: "PG" },
               u: { $set: { available: true } }
           }
        ]
     }
   }
)
