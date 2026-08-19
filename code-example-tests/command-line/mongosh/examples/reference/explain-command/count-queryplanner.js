// :snippet-start: count-queryplanner
db.runCommand(
   {
     explain: { count: "movies", query: { year: { $gt: 2000 } } },
     verbosity: "queryPlanner"
   }
)
// :snippet-end:
.queryPlanner !== undefined  // :remove:
