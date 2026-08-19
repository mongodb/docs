db.runCommand(
   {
     explain: { count: "movies", query: { year: { $gt: 2000 } } },
     verbosity: "queryPlanner"
   }
)
