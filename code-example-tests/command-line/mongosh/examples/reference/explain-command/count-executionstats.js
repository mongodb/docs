// :snippet-start: count-executionstats
db.runCommand(
   {
      explain: { count: "movies", query: { year: { $gt: 2000 } } },
      verbosity: "executionStats"
   }
)
// :snippet-end:
.queryPlanner !== undefined  // :remove:
