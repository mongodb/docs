// :snippet-start: update-allplansexecution
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
// :snippet-end:
.queryPlanner !== undefined  // :remove:
